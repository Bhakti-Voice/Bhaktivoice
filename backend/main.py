from __future__ import annotations

import hashlib
import json
import os
import secrets
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from markupsafe import Markup
from starlette.middleware.sessions import SessionMiddleware
from starlette.types import ASGIApp, Receive, Scope, Send

from db import get_db, turso_configured
from kinds import (
    KINDS,
    PAGE_KINDS,
    SEARCH_KINDS,
    apply_locale,
    dump_field,
    form_to_data,
    public_page,
    public_simple,
    today,
)
from json_import import coerce_entry, kind_placeholders, parse_json_text
from store import save_entry

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT.parent / ".env")
load_dotenv(ROOT / ".env")

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin").strip()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "").strip()
# Must be stable across serverless instances or login cookies bounce.
SESSION_SECRET = (
    os.environ.get("SESSION_SECRET") or os.environ.get("ADMIN_PASSWORD") or "dev-only-insecure-session"
).strip()
SITE_ORIGIN = (
    os.environ.get("SITE_ORIGIN")
    or (f"https://{os.environ['VERCEL_URL']}" if os.environ.get("VERCEL_URL") else "http://localhost:3000")
).strip()
CORS_ORIGINS = [
    origin
    for origin in {
        SITE_ORIGIN,
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "https://www.bhaktivoice.com",
        "https://bhaktivoice.com",
        "https://bhaktivoice.vercel.app",
    }
    if origin
]

class StripBackendPrefixMiddleware:
    """Vercel public rewrites keep /api/backend; FastAPI routes live at /api/..."""

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope.get("type") == "http":
            path = scope.get("path") or ""
            prefix = "/api/backend"
            if path == prefix or path.startswith(prefix + "/"):
                new_path = path[len(prefix) :] or "/"
                scope = dict(scope)
                scope["path"] = new_path
                scope["raw_path"] = new_path.encode("utf-8")
        await self.app(scope, receive, send)


app = FastAPI(title="Bhakti Voice CMS", docs_url=None, redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="lax",
    https_only=bool(os.environ.get("VERCEL")),
)
app.add_middleware(StripBackendPrefixMiddleware)
templates = Jinja2Templates(directory=str(ROOT / "templates"))
templates.env.filters["tojson"] = lambda value: Markup(json.dumps(value, ensure_ascii=False))


@app.on_event("startup")
def startup() -> None:
    if os.environ.get("VERCEL"):
        return
    try:
        from local_seed import seed_if_empty

        seed_if_empty()
    except Exception:
        pass


def db():
    return get_db()


def parse_data(raw) -> dict:
    if raw is None or raw == "":
        return {}
    if isinstance(raw, dict):
        return raw
    if isinstance(raw, (bytes, bytearray)):
        raw = raw.decode("utf-8", "replace")
    if not isinstance(raw, str):
        return {}
    try:
        value = json.loads(raw)
        return value if isinstance(value, dict) else {}
    except json.JSONDecodeError:
        return {}


def row_public(row: dict, locale: str = "en") -> dict:
    kind = KINDS[row["kind"]]
    data = parse_data(row.get("data"))
    if row["kind"] in PAGE_KINDS:
        return public_page(kind, row["slug"], row["status"], data, locale)
    return public_simple(kind, row["slug"], data, locale)


def published(kind: str, slug: str | None = None, locale: str = "en") -> list[dict] | dict | None:
    if slug:
        row = db().fetchone(
            "SELECT * FROM cms_entries WHERE kind = ? AND slug = ? AND status = 'published'",
            [kind, slug],
        )
        try:
            return row_public(row, locale) if row else None
        except Exception:
            return None
    rows = db().fetchall(
        "SELECT * FROM cms_entries WHERE kind = ? AND status = 'published' ORDER BY updated_at DESC, id DESC",
        [kind],
    )
    items: list[dict] = []
    for row in rows:
        try:
            items.append(row_public(row, locale))
        except Exception:
            continue
    return items


def require_admin(request: Request) -> None:
    if not request.session.get("admin"):
        raise HTTPException(status_code=401, detail="Admin login required")


async def read_admin_form(request: Request):
    kwargs = {"max_files": 0, "max_fields": 500, "max_part_size": 20 * 1024 * 1024}
    try:
        form = await request.form(**kwargs)
    except TypeError:
        form = await request.form()
    payload: dict[str, str] = {}
    for key, value in dict(form).items():
        if value is None:
            payload[str(key)] = ""
        elif isinstance(value, (bytes, bytearray)):
            payload[str(key)] = bytes(value).decode("utf-8", "replace")
        else:
            payload[str(key)] = str(value)
    return payload


def parse_item_id(raw: str) -> int | None:
    text = str(raw or "").strip()
    if not text:
        return None
    try:
        return int(text)
    except (TypeError, ValueError):
        return None


@app.get("/api/health")
def health():
    try:
        db().fetchone("SELECT 1 AS ok")
        return {"ok": True, "turso": turso_configured(), "connected": True}
    except Exception as error:
        return {
            "ok": False,
            "turso": turso_configured(),
            "connected": False,
            "error": str(error),
        }


@app.get("/api/stats")
def stats():
    total_row = db().fetchone("SELECT COALESCE(SUM(count), 0) AS total FROM jaap_counts")
    today_row = db().fetchone(
        "SELECT COUNT(DISTINCT user_id) AS devotees FROM jaap_counts WHERE date = ?",
        [today()],
    )
    by_mantra = db().fetchall(
        "SELECT mantra_slug AS slug, COALESCE(SUM(count), 0) AS total FROM jaap_counts GROUP BY mantra_slug"
    )
    users_row = db().fetchone("SELECT COUNT(*) AS total FROM users")
    return {
        "total": int(total_row["total"] if total_row else 0),
        "todayDevotees": int(today_row["devotees"] if today_row else 0),
        "users": int(users_row["total"] if users_row else 0),
        "byMantra": [{"slug": row["slug"], "total": int(row["total"])} for row in by_mantra],
    }


@app.get("/api/stats/user/{uid}")
def user_stats(uid: str):
    total = db().fetchone(
        "SELECT COALESCE(SUM(count), 0) AS total FROM jaap_counts WHERE user_id = ?",
        [uid],
    )
    streak_days = db().fetchall(
        "SELECT DISTINCT date FROM jaap_counts WHERE user_id = ? ORDER BY date DESC",
        [uid],
    )
    streak = 0
    cursor = date.today()
    dates = {row["date"][:10] for row in streak_days}
    while cursor.isoformat() in dates:
        streak += 1
        cursor = date.fromordinal(cursor.toordinal() - 1)
    sankalps = db().fetchone(
        "SELECT COUNT(*) AS total FROM sankalps WHERE user_id = ?",
        [uid],
    )
    return {
        "naam": int(total["total"] if total else 0),
        "streak": streak,
        "sankalps": int(sankalps["total"] if sankalps else 0),
    }


def normalize_locale(locale: str | None) -> str:
    return "hi" if (locale or "").lower().startswith("hi") else "en"


def ist_today() -> str:
    return datetime.now(timezone(timedelta(hours=5, minutes=30))).date().isoformat()


@app.get("/api/quotes/daily")
def daily_quote(locale: str = "en"):
    rows = db().fetchall(
        "SELECT * FROM cms_entries WHERE kind = 'quotes' AND status = 'published' ORDER BY id",
    )
    if not rows:
        raise HTTPException(status_code=404, detail="Not found")
    digest = hashlib.sha256(f"quotes:{ist_today()}".encode()).hexdigest()
    row = rows[int(digest, 16) % len(rows)]
    return row_public(row, normalize_locale(locale))


@app.get("/api/content/{kind}")
def list_content(kind: str, locale: str = "en"):
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    return published(kind, locale=normalize_locale(locale))


@app.get("/api/content/{kind}/{slug}")
def get_content(kind: str, slug: str, locale: str = "en"):
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    item = published(kind, slug, locale=normalize_locale(locale))
    if not item:
        # Hub SEO is optional per page; missing copy should not 404 the public UI.
        if kind == "hub_seo":
            return {}
        raise HTTPException(status_code=404, detail="Not found")
    return item


@app.get("/api/search")
def search(q: str = "", locale: str = "en"):
    query = q.strip()
    if not query:
        return []
    lang = normalize_locale(locale)
    placeholders = ",".join("?" for _ in SEARCH_KINDS)
    rows = db().fetchall(
        f"""
        SELECT kind, slug, title, data FROM cms_entries
        WHERE status = 'published' AND kind IN ({placeholders})
        ORDER BY updated_at DESC
        """,
        list(SEARCH_KINDS),
    )
    results = []
    needle = query.lower()
    for row in rows:
        raw = parse_data(row.get("data"))
        haystack = " ".join(
            [
                row.get("title") or "",
                raw.get("title") or "",
                raw.get("titleHi") or "",
                raw.get("introduction") or "",
                raw.get("introductionHi") or "",
                raw.get("category") or "",
                raw.get("categoryHi") or "",
                raw.get("excerpt") or "",
                raw.get("excerptHi") or "",
                raw.get("h1") or "",
                raw.get("h1Hi") or "",
            ]
        ).lower()
        if needle not in haystack:
            continue
        data = apply_locale(raw, lang)
        kind = KINDS[row["kind"]]
        results.append(
            {
                "title": data.get("title") or row["title"] or data.get("h1") or row["slug"],
                "introduction": data.get("introduction") or data.get("excerpt") or "",
                "href": f"{kind.path}/{row['slug']}",
                "kind": row["kind"],
                "category": data.get("category") or kind.label,
                "slug": row["slug"],
            }
        )
    return results


@app.get("/api/sitemap")
def sitemap():
    today_iso = today()
    roots = [
        {"url": "/", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 1},
        {"url": "/mantras-for-naam-jaap", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.8},
        {"url": "/sacred-yatra-guides", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.8},
        {"url": "/hindu-temples", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.8},
        {"url": "/hindu-festivals", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.8},
        {"url": "/spiritual-knowledge", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.7},
        {"url": "/bhakti-blog", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.7},
        {"url": "/katha-stories", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.8},
        {"url": "/bhakti-store", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.6},
        {"url": "/naam-jaap", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.9},
        {"url": "/daily-sadhana", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.7},
        {"url": "/devotee-community", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.6},
        {"url": "/sacred-yatra-guides/planner", "lastModified": today_iso, "changeFrequency": "weekly", "priority": 0.6},
        {"url": "/bhajan-and-kirtan", "lastModified": today_iso, "changeFrequency": "monthly", "priority": 0.4},
        {"url": "/aarti-chants", "lastModified": today_iso, "changeFrequency": "monthly", "priority": 0.4},
        {"url": "/aaj-ki-tithi", "lastModified": today_iso, "changeFrequency": "daily", "priority": 0.7},
    ]
    rows = db().fetchall(
        "SELECT kind, slug, data, updated_at FROM cms_entries WHERE status = 'published' AND kind IN ("
        + ",".join("?" for _ in PAGE_KINDS)
        + ")",
        list(PAGE_KINDS),
    )
    for row in rows:
        kind = KINDS[row["kind"]]
        data = parse_data(row.get("data"))
        roots.append(
            {
                "url": f"{kind.path}/{row['slug']}",
                "lastModified": (data.get("updatedAt") or str(row.get("updated_at") or today_iso))[:10],
                "changeFrequency": "weekly",
                "priority": 0.7,
            }
        )
    return roots


@app.post("/api/jaap")
async def save_jaap(request: Request):
    body = await request.json()
    user_id = body.get("userId")
    mantra_slug = body.get("mantraSlug")
    count = body.get("count")
    day = body.get("date") or today()
    if not user_id or not mantra_slug or not isinstance(count, int):
        raise HTTPException(status_code=400, detail="Invalid payload")
    db().execute(
        """
        INSERT INTO jaap_counts (user_id, mantra_slug, count, date)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id, mantra_slug, date) DO UPDATE SET count = excluded.count
        """,
        [user_id, mantra_slug, count, day],
    )
    return {"ok": True, "stored": True}


def _diary_payload(row: dict) -> dict:
    raw = row.get("notes") or ""
    mood = "Peaceful"
    jaap = ""
    note = raw
    try:
        parsed = json.loads(raw) if isinstance(raw, str) and raw.startswith("{") else None
        if isinstance(parsed, dict):
            mood = parsed.get("mood") or mood
            jaap = parsed.get("jaap") or ""
            note = parsed.get("note") or ""
    except json.JSONDecodeError:
        note = raw
    return {
        "mood": mood,
        "jaap": jaap,
        "note": note,
    }


@app.get("/api/diary")
async def get_diary(userId: str):
    if not userId:
        raise HTTPException(status_code=400, detail="Missing userId")
    rows = db().fetchall(
        "SELECT date, notes FROM diary_entries WHERE user_id = ? ORDER BY date DESC",
        [userId],
    )
    entries = {item["date"]: _diary_payload(item) for item in rows}
    return {"ok": True, "entries": entries}


@app.post("/api/diary")
async def save_diary(request: Request):
    body = await request.json()
    user_id = body.get("userId")
    day = body.get("date")
    if not user_id or not day:
        raise HTTPException(status_code=400, detail="Invalid payload")
    notes = json.dumps(
        {
            "mood": body.get("mood") or "Peaceful",
            "jaap": body.get("jaap") or "",
            "note": body.get("note") or "",
        },
        ensure_ascii=False,
    )
    jaap_count = 0
    try:
        jaap_count = int(str(body.get("jaap") or "0").split()[0])
    except (TypeError, ValueError):
        jaap_count = 0
    db().execute(
        """
        INSERT INTO diary_entries (user_id, date, jaap_count, notes)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id, date) DO UPDATE SET
          jaap_count = excluded.jaap_count,
          notes = excluded.notes
        """,
        [user_id, day, jaap_count, notes],
    )
    return {"ok": True, "stored": True}


@app.get("/api/saved")
async def get_saved(userId: str, type: str = "blog"):
    if not userId:
        raise HTTPException(status_code=400, detail="Missing userId")
    rows = db().fetchall(
        "SELECT slug FROM saved_items WHERE user_id = ? AND type = ?",
        [userId, type],
    )
    return {"ok": True, "slugs": [row["slug"] for row in rows]}


@app.post("/api/saved")
async def save_item(request: Request):
    body = await request.json()
    user_id = body.get("userId")
    kind = body.get("type") or "blog"
    slug = body.get("slug")
    saved = body.get("saved")
    if not user_id or not slug:
        raise HTTPException(status_code=400, detail="Invalid payload")
    if saved:
        db().execute(
            """
            INSERT INTO saved_items (user_id, type, slug)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, type, slug) DO NOTHING
            """,
            [user_id, kind, slug],
        )
    else:
        db().execute(
            "DELETE FROM saved_items WHERE user_id = ? AND type = ? AND slug = ?",
            [user_id, kind, slug],
        )
    return {"ok": True, "stored": True}


@app.post("/api/auth/sync")
async def sync_user(request: Request):
    body = await request.json()
    uid = body.get("uid")
    if not uid:
        raise HTTPException(status_code=400, detail="Missing uid")
    db().execute(
        """
        INSERT INTO users (id, firebase_uid, email, name, photo_url)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(firebase_uid) DO UPDATE SET
          email = excluded.email,
          name = excluded.name,
          photo_url = excluded.photo_url
        """,
        [uid, uid, body.get("email"), body.get("name"), body.get("photoUrl")],
    )
    return {"ok": True, "stored": True}


def admin_context(request: Request, **extra):
    counts = []
    db_error = extra.pop("error", None)
    try:
        for key, kind in KINDS.items():
            row = db().fetchone("SELECT COUNT(*) AS total FROM cms_entries WHERE kind = ?", [key])
            counts.append({"key": key, "label": kind.plural, "total": int(row["total"] if row else 0)})
    except Exception as error:
        db_error = db_error or str(error)
        counts = [{"key": key, "label": kind.plural, "total": 0} for key, kind in KINDS.items()]
    return {
        "request": request,
        "kinds": KINDS,
        "counts": counts,
        "admin": request.session.get("admin"),
        "error": db_error,
        "notice": request.query_params.get("notice"),
        "turso": turso_configured(),
        **extra,
    }


@app.get("/", response_class=HTMLResponse)
def root():
    return RedirectResponse("/admin", status_code=302)


@app.get("/admin/login", response_class=HTMLResponse)
def login_form(request: Request):
    if request.session.get("admin"):
        return RedirectResponse("/admin", status_code=302)
    ready = bool(ADMIN_PASSWORD)
    return templates.TemplateResponse(
        "login.html",
        {"request": request, "error": None, "ready": ready},
    )


@app.post("/admin/login")
def login(request: Request, username: str = Form(...), password: str = Form(...)):
    if not ADMIN_PASSWORD:
        return templates.TemplateResponse(
            "login.html",
            {
                "request": request,
                "error": "Set ADMIN_USERNAME and ADMIN_PASSWORD in backend/.env",
                "ready": False,
            },
            status_code=400,
        )
    if secrets.compare_digest(username, ADMIN_USERNAME) and secrets.compare_digest(password, ADMIN_PASSWORD):
        request.session["admin"] = username
        return RedirectResponse("/admin", status_code=302)
    return templates.TemplateResponse(
        "login.html",
        {"request": request, "error": "Those details do not match.", "ready": True},
        status_code=401,
    )


@app.post("/admin/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse("/admin/login", status_code=302)


@app.get("/admin", response_class=HTMLResponse)
def dashboard(request: Request):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    return templates.TemplateResponse("dashboard.html", admin_context(request))


def dump_entry_json(row: dict) -> str:
    return json.dumps(
        {
            "id": row.get("id"),
            "kind": row.get("kind"),
            "slug": row.get("slug") or "",
            "status": row.get("status") or "published",
            "title": row.get("title") or "",
            "data": parse_data(row.get("data")),
        },
        ensure_ascii=False,
        indent=2,
    )


def json_page_context(request: Request, kind: str = "", json_text: str = "", **extra):
    selected = kind if kind in KINDS else next(iter(KINDS))
    placeholders = kind_placeholders()
    filled = (json_text or "").strip() or json.dumps(placeholders[selected], ensure_ascii=False, indent=2)
    placeholders_json = json.dumps(placeholders, ensure_ascii=False).replace("<", "\\u003c")
    return admin_context(
        request,
        selected_kind=selected,
        selected=KINDS[selected],
        json_text=filled,
        placeholders_json=placeholders_json,
        **extra,
    )


@app.get("/admin/json", response_class=HTMLResponse)
def json_form(request: Request, kind: str = ""):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    if kind and kind not in KINDS:
        raise HTTPException(status_code=404)
    return templates.TemplateResponse("json.html", json_page_context(request, kind))


@app.post("/admin/json")
async def json_import(
    request: Request,
    json_text: str = Form(""),
    kind: str = Form(""),
    json_file: UploadFile | None = File(default=None),
):
    require_admin(request)
    default_kind = kind.strip() if kind in KINDS else ""
    raw_text = json_text
    if json_file and json_file.filename:
        raw_text = (await json_file.read()).decode("utf-8-sig")
    try:
        from json_import import import_entries, parse_json_text

        if not default_kind:
            raise ValueError("Choose a category from the dropdown first.")
        payload = parse_json_text(raw_text)
        result = import_entries(payload, default_kind)
    except Exception as error:
        return templates.TemplateResponse(
            "json.html",
            json_page_context(request, default_kind, raw_text, error=str(error)),
            status_code=400,
        )
    notice = f"Imported {result['created']} new, updated {result['updated']}."
    if result["errors"]:
        notice += " Some rows failed: " + " ".join(result["errors"][:8])
    dest = f"/admin/{default_kind}?notice={quote(notice)}"
    return RedirectResponse(dest, status_code=302)


@app.get("/admin/json/export")
def json_export(request: Request, kind: str = ""):
    require_admin(request)
    if kind and kind not in KINDS:
        raise HTTPException(status_code=404)
    sql = "SELECT kind, slug, title, status, data FROM cms_entries"
    args: list = []
    if kind:
        sql += " WHERE kind = ?"
        args = [kind]
    sql += " ORDER BY kind, id"
    rows = db().fetchall(sql, args)
    payload = [
        {
            "kind": row["kind"],
            "slug": row["slug"],
            "status": row["status"],
            "title": row["title"],
            "data": parse_data(row.get("data")),
        }
        for row in rows
    ]
    filename = f"{kind or 'cms'}-export.json"
    return JSONResponse(
        payload,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@app.get("/admin/{kind}", response_class=HTMLResponse)
def admin_list(request: Request, kind: str):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    rows = db().fetchall(
        "SELECT id, slug, title, status, updated_at FROM cms_entries WHERE kind = ? ORDER BY updated_at DESC, id DESC",
        [kind],
    )
    return templates.TemplateResponse(
        "list.html",
        admin_context(request, kind=KINDS[kind], rows=rows),
    )


@app.get("/admin/{kind}/new", response_class=HTMLResponse)
def admin_new(request: Request, kind: str):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    values = {field.name: "" for field in spec.fields}
    return templates.TemplateResponse(
        "form.html",
        admin_context(request, kind=spec, values=values, slug="", status="published", item_id=None),
    )


@app.get("/admin/{kind}/{item_id}/edit", response_class=HTMLResponse)
def admin_edit(request: Request, kind: str, item_id: int):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    try:
        row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    except Exception as error:
        return templates.TemplateResponse(
            "list.html",
            admin_context(request, kind=spec, rows=[], error=f"Could not load this entry: {error}"),
            status_code=500,
        )
    if not row:
        raise HTTPException(status_code=404)
    data = parse_data(row.get("data"))
    values = {}
    form_error = None
    for field in spec.fields:
        try:
            values[field.name] = dump_field(field, data)
        except Exception as error:
            values[field.name] = ""
            form_error = form_error or f"Could not unpack {field.label}: {error}"
    try:
        return templates.TemplateResponse(
            "form.html",
            admin_context(
                request,
                kind=spec,
                values=values,
                slug=row.get("slug") or "",
                status=row.get("status") or "published",
                item_id=item_id,
                error=form_error,
            ),
        )
    except Exception as error:
        return templates.TemplateResponse(
            "base.html",
            admin_context(request, error=f"Could not render the edit form: {error}"),
            status_code=500,
        )


@app.post("/admin/{kind}/save")
async def admin_save(request: Request, kind: str):
    require_admin(request)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    status = "published"
    slug = ""
    parsed_id = None
    values = {field.name: "" for field in spec.fields}
    try:
        form = await read_admin_form(request)
        status = form.get("status") or "published"
        slug = form.get("slug") or ""
        parsed_id = parse_item_id(form.get("item_id") or "")
        values = {field.name: form.get(field.name) or "" for field in spec.fields}
        data = form_to_data(spec, form)
        save_entry(kind, data, slug=slug, status=status, item_id=parsed_id)
    except Exception as error:
        return templates.TemplateResponse(
            "form.html",
            admin_context(
                request,
                kind=spec,
                values=values,
                slug=slug,
                status=status,
                item_id=parsed_id,
                error=str(error),
            ),
            status_code=400,
        )
    return RedirectResponse(f"/admin/{kind}?notice=Saved", status_code=302)


@app.get("/admin/{kind}/{item_id}/json", response_class=HTMLResponse)
def admin_edit_json(request: Request, kind: str, item_id: int):
    if not request.session.get("admin"):
        return RedirectResponse("/admin/login", status_code=302)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    if not row:
        raise HTTPException(status_code=404)
    return templates.TemplateResponse(
        "json_edit.html",
        admin_context(
            request,
            kind=spec,
            item_id=item_id,
            json_text=dump_entry_json(row),
        ),
    )


@app.post("/admin/{kind}/{item_id}/json")
async def admin_save_json(request: Request, kind: str, item_id: int, json_text: str = Form("")):
    require_admin(request)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    if not row:
        raise HTTPException(status_code=404)

    def render_json_error(message: str, text: str):
        return templates.TemplateResponse(
            "json_edit.html",
            admin_context(request, kind=spec, item_id=item_id, json_text=text, error=message),
            status_code=400,
        )

    try:
        payload = parse_json_text(json_text)
        if isinstance(payload, list):
            if len(payload) != 1 or not isinstance(payload[0], dict):
                raise ValueError("Paste one JSON object for this row, not a list.")
            payload = payload[0]
        if not isinstance(payload, dict):
            raise ValueError("JSON must be one object.")
        entry = coerce_entry(payload, kind)
        if entry["kind"] != kind:
            raise ValueError(f"Keep kind as {kind!r} for this row.")
        save_entry(
            kind,
            entry["data"],
            slug=entry["slug"],
            status=entry["status"],
            item_id=item_id,
        )
    except Exception as error:
        return render_json_error(str(error), json_text)
    return RedirectResponse(f"/admin/{kind}/{item_id}/json?notice=Saved", status_code=302)


@app.post("/admin/{kind}/{item_id}/delete")
def admin_delete(request: Request, kind: str, item_id: int):
    require_admin(request)
    db().execute("DELETE FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    return RedirectResponse(f"/admin/{kind}?notice=Deleted", status_code=302)


@app.exception_handler(401)
async def unauthorized(_request: Request, _exc: HTTPException):
    return RedirectResponse("/admin/login", status_code=302)

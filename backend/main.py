from __future__ import annotations

import json
import os
import secrets
from datetime import date, datetime
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

from db import get_db, turso_configured
from slugs import seo_slug
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
        "https://bhaktivoice.vercel.app",
    }
    if origin
]

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
templates = Jinja2Templates(directory=str(ROOT / "templates"))


def db():
    return get_db()


def parse_data(raw: str | None) -> dict:
    if not raw:
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
        return row_public(row, locale) if row else None
    rows = db().fetchall(
        "SELECT * FROM cms_entries WHERE kind = ? AND status = 'published' ORDER BY updated_at DESC, id DESC",
        [kind],
    )
    return [row_public(row, locale) for row in rows]


def require_admin(request: Request) -> None:
    if not request.session.get("admin"):
        raise HTTPException(status_code=401, detail="Admin login required")


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
    row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    if not row:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    data = parse_data(row.get("data"))
    values = {field.name: dump_field(field, data) for field in spec.fields}
    return templates.TemplateResponse(
        "form.html",
        admin_context(
            request,
            kind=spec,
            values=values,
            slug=row["slug"],
            status=row["status"],
            item_id=item_id,
        ),
    )


@app.post("/admin/{kind}/save")
async def admin_save(request: Request, kind: str):
    require_admin(request)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    form = dict((await request.form()))
    spec = KINDS[kind]
    status = str(form.get("status") or "published")
    item_id = str(form.get("item_id") or "").strip()
    data = form_to_data(spec, {key: str(value) for key, value in form.items()})
    title = str(data.get("title") or data.get("h1") or data.get("name") or data.get("heading") or "")
    slug = seo_slug(
        kind,
        title,
        str(data.get("h1") or ""),
        str(data.get("seoTitle") or ""),
        str(data.get("name") or ""),
        str(data.get("heading") or ""),
        str(data.get("destination") or ""),
        existing=str(form.get("slug") or ""),
    )
    if not slug:
        values = {field.name: str(form.get(field.name) or "") for field in spec.fields}
        return templates.TemplateResponse(
            "form.html",
            admin_context(
                request,
                kind=spec,
                values=values,
                slug="",
                status=status,
                item_id=int(item_id) if item_id else None,
                error="Add a title so we can build a long URL slug.",
            ),
            status_code=400,
        )
    title = title or slug
    payload = json.dumps(data, ensure_ascii=False)
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    if item_id:
        db().execute(
            """
            UPDATE cms_entries
            SET slug = ?, title = ?, status = ?, data = ?, updated_at = ?
            WHERE id = ? AND kind = ?
            """,
            [slug, title, status, payload, now, int(item_id), kind],
        )
    else:
        existing = db().fetchone(
            "SELECT id FROM cms_entries WHERE kind = ? AND slug = ?",
            [kind, slug],
        )
        if existing:
            db().execute(
                """
                UPDATE cms_entries
                SET title = ?, status = ?, data = ?, updated_at = ?
                WHERE id = ?
                """,
                [title, status, payload, now, existing["id"]],
            )
        else:
            db().execute(
                """
                INSERT INTO cms_entries (kind, slug, title, status, data, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                [kind, slug, title, status, payload, now, now],
            )
    return RedirectResponse(f"/admin/{kind}?notice=Saved", status_code=302)


@app.post("/admin/{kind}/{item_id}/delete")
def admin_delete(request: Request, kind: str, item_id: int):
    require_admin(request)
    db().execute("DELETE FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    return RedirectResponse(f"/admin/{kind}?notice=Deleted", status_code=302)


@app.exception_handler(401)
async def unauthorized(_request: Request, _exc: HTTPException):
    return RedirectResponse("/admin/login", status_code=302)

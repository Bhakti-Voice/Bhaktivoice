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
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
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
    has_hero_image,
    has_youtube_url,
    public_page,
    public_simple,
    today,
)
from json_import import coerce_entry, kind_placeholders, parse_json_text
from store import save_entry
from media import load_media, replace_hero_image, safe_image_src, safe_youtube_src
from firebase_auth import optional_user_id, require_user_id
from protect import ProtectMiddleware
from community import (
    MAX_ABOUT,
    MAX_MEMBERS,
    MAX_OWNED,
    MAX_REPLIES,
    MAX_THREADS,
    clean_body,
    clean_name,
    new_id,
    public_person,
    require_slug,
    slug_from_name,
    too_soon,
    valid_id,
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
).strip().rstrip("/")


def cors_origins() -> list[str]:
    origins = {
        SITE_ORIGIN,
        "https://www.bhaktivoice.com",
        "https://bhaktivoice.com",
    }
    if not os.environ.get("VERCEL"):
        origins.update({"http://127.0.0.1:3000", "http://localhost:3000"})
    return [origin for origin in origins if origin]


CORS_ORIGINS = cors_origins()

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
# Last added = outermost. Strip prefix first, then protect, then session/CORS.
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Vercel-Protection-Bypass", "X-Bhakti-Internal"],
    expose_headers=[],
    max_age=600,
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="lax",
    https_only=bool(os.environ.get("VERCEL")),
)
app.add_middleware(ProtectMiddleware, site_origins=CORS_ORIGINS)
app.add_middleware(StripBackendPrefixMiddleware)
templates = Jinja2Templates(directory=str(ROOT / "templates"))
templates.env.filters["tojson"] = lambda value: Markup(json.dumps(value, ensure_ascii=False))


def public_json(data, *, seconds: int = 600):
    return JSONResponse(
        content=data,
        headers={
            "Cache-Control": (
                f"public, max-age={min(seconds, 60)}, s-maxage={seconds}, "
                f"stale-while-revalidate={max(seconds * 12, 3600)}"
            ),
        },
    )


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


JAAP_SLUGS = (
    "radhe-radhe",
    "ram-naam",
    "hare-krishna",
    "om-namah-shivaya",
    "shri-ram",
    "namokar",
)
MAX_JAAP_DELTA = 1080
MAX_JAAP_SYNC = 21600


def _parse_jaap_day(raw: object) -> str:
    text = str(raw or "").strip()[:10]
    try:
        parsed = date.fromisoformat(text)
    except ValueError:
        return today()
    today_d = date.fromisoformat(today())
    if abs((parsed - today_d).days) > 1:
        return today()
    return parsed.isoformat()


def _parse_jaap_delta(raw: object, *, cap: int = MAX_JAAP_DELTA) -> int:
    try:
        value = int(raw)
    except (TypeError, ValueError):
        return 0
    if value < 1:
        return 0
    return min(value, cap)


def ensure_jaap_totals() -> None:
    db().execute(
        """
        INSERT INTO jaap_totals (mantra_slug, count)
        SELECT mantra_slug, COALESCE(SUM(count), 0)
        FROM jaap_counts
        GROUP BY mantra_slug
        ON CONFLICT(mantra_slug) DO NOTHING
        """
    )


def _global_by_mantra() -> list[dict[str, object]]:
    ensure_jaap_totals()
    rows = db().fetchall("SELECT mantra_slug AS slug, count AS total FROM jaap_totals")
    totals = {str(row["slug"]): int(row["total"] or 0) for row in rows}
    return [{"slug": slug, "total": totals.get(slug, 0)} for slug in JAAP_SLUGS]


def _claim_jaap_batch(batch_id: object) -> bool:
    text = str(batch_id or "").strip()
    if not text:
        return True
    if len(text) < 8 or len(text) > 80 or not all(char.isalnum() or char in "-_" for char in text):
        return True
    db().execute(
        """
        CREATE TABLE IF NOT EXISTS jaap_flush_batches (
          batch_id TEXT PRIMARY KEY,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    existing = db().fetchone("SELECT batch_id FROM jaap_flush_batches WHERE batch_id = ?", [text])
    if existing:
        return False
    try:
        db().execute("INSERT INTO jaap_flush_batches (batch_id) VALUES (?)", [text])
        return True
    except Exception:
        return False


def _increment_global(mantra_slug: str, delta: int) -> int:
    db().execute(
        """
        INSERT INTO jaap_totals (mantra_slug, count)
        VALUES (?, ?)
        ON CONFLICT(mantra_slug) DO UPDATE SET count = jaap_totals.count + excluded.count
        """,
        [mantra_slug, delta],
    )
    row = db().fetchone("SELECT count FROM jaap_totals WHERE mantra_slug = ?", [mantra_slug])
    return int((row or {}).get("count") or 0)


def _increment_personal(user_id: str, mantra_slug: str, delta: int, day: str) -> tuple[int, int]:
    db().execute(
        """
        INSERT INTO jaap_counts (user_id, mantra_slug, count, date)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id, mantra_slug, date) DO UPDATE SET count = jaap_counts.count + excluded.count
        """,
        [user_id, mantra_slug, delta, day],
    )
    today_row = db().fetchone(
        """
        SELECT COALESCE(SUM(count), 0) AS total
        FROM jaap_counts
        WHERE user_id = ? AND mantra_slug = ? AND date = ?
        """,
        [user_id, mantra_slug, day],
    )
    all_row = db().fetchone(
        """
        SELECT COALESCE(SUM(count), 0) AS total
        FROM jaap_counts
        WHERE user_id = ? AND mantra_slug = ?
        """,
        [user_id, mantra_slug],
    )
    return int((today_row or {}).get("total") or 0), int((all_row or {}).get("total") or 0)


def _user_streak(user_id: str) -> int:
    streak_days = db().fetchall(
        "SELECT DISTINCT date FROM jaap_counts WHERE user_id = ? ORDER BY date DESC",
        [user_id],
    )
    streak = 0
    cursor = date.today()
    dates = {str(row["date"])[:10] for row in streak_days}
    while cursor.isoformat() in dates:
        streak += 1
        cursor = date.fromordinal(cursor.toordinal() - 1)
    return streak


def _user_jaap_payload(user_id: str, day: str) -> dict[str, object]:
    today_map = {slug: 0 for slug in JAAP_SLUGS}
    total_map = {slug: 0 for slug in JAAP_SLUGS}
    today_rows = db().fetchall(
        "SELECT mantra_slug, count FROM jaap_counts WHERE user_id = ? AND date = ?",
        [user_id, day],
    )
    total_rows = db().fetchall(
        """
        SELECT mantra_slug, COALESCE(SUM(count), 0) AS total
        FROM jaap_counts
        WHERE user_id = ?
        GROUP BY mantra_slug
        """,
        [user_id],
    )
    for row in today_rows:
        slug = str(row["mantra_slug"])
        if slug in today_map:
            today_map[slug] = int(row["count"] or 0)
    for row in total_rows:
        slug = str(row["mantra_slug"])
        if slug in total_map:
            total_map[slug] = int(row["total"] or 0)
    return {
        "today": today_map,
        "totals": total_map,
        "all": sum(total_map.values()),
        "streak": _user_streak(user_id),
        "date": day,
    }


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


def form_image_kwargs(kind, values: dict | None = None) -> dict:
    values = values or {}
    return {
        "hero_src": safe_image_src(str(values.get("heroImage") or "")),
        "show_image": has_hero_image(kind),
        "youtube_src": str(values.get("youtubeUrl") or "").strip(),
        "show_youtube": has_youtube_url(kind),
    }


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
    by_mantra = _global_by_mantra()
    today_row = db().fetchone(
        "SELECT COUNT(DISTINCT user_id) AS devotees FROM jaap_counts WHERE date = ?",
        [today()],
    )
    users_row = db().fetchone("SELECT COUNT(*) AS total FROM users")
    return public_json(
        {
            "total": sum(int(row["total"]) for row in by_mantra),
            "todayDevotees": int(today_row["devotees"] if today_row else 0),
            "users": int(users_row["total"] if users_row else 0),
            "byMantra": by_mantra,
        },
        seconds=45,
    )


@app.get("/api/stats/user/{uid}")
def user_stats(uid: str, request: Request):
    user_id = require_user_id(request)
    if user_id != uid:
        raise HTTPException(status_code=403, detail="Forbidden")
    payload = _user_jaap_payload(uid, today())
    sankalps = db().fetchone(
        "SELECT COUNT(*) AS total FROM sankalps WHERE user_id = ?",
        [uid],
    )
    return {
        "naam": int(payload["all"]),
        "streak": int(payload["streak"]),
        "sankalps": int(sankalps["total"] if sankalps else 0),
        "byMantra": [{"slug": slug, "total": int(total)} for slug, total in payload["totals"].items()],
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
    return public_json(row_public(row, normalize_locale(locale)), seconds=3600)


def _quote_blob(row: dict) -> str:
    data = parse_data(row.get("data"))
    return " ".join(
        [
            str(row.get("slug") or ""),
            str(row.get("title") or ""),
            str(data.get("text") or ""),
            str(data.get("textHi") or ""),
            str(data.get("attribution") or ""),
            str(data.get("attributionHi") or ""),
        ]
    ).lower()


@app.get("/api/quotes")
def list_quotes(locale: str = "en", q: str = "", offset: int = 0, limit: int = 30):
    limit = min(max(int(limit or 30), 1), 60)
    offset = max(int(offset or 0), 0)
    rows = db().fetchall(
        "SELECT * FROM cms_entries WHERE kind = 'quotes' AND status = 'published' ORDER BY id DESC",
    )
    needle = (q or "").strip().lower()
    lang = normalize_locale(locale)
    matched = []
    for row in rows:
        if needle and needle not in _quote_blob(row):
            continue
        try:
            matched.append(row_public(row, lang))
        except Exception:
            continue
    return public_json(
        {
            "items": matched[offset : offset + limit],
            "total": len(matched),
            "offset": offset,
            "limit": limit,
        },
        seconds=300,
    )


@app.get("/media/{media_id}")
def serve_media(media_id: str):
    loaded = load_media(media_id)
    if not loaded:
        raise HTTPException(status_code=404, detail="Not found")
    payload, mime = loaded
    return Response(
        content=payload,
        media_type=mime,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )


@app.get("/api/content/{kind}")
def list_content(kind: str, locale: str = "en"):
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    return public_json(published(kind, locale=normalize_locale(locale)), seconds=600)


@app.get("/api/content/{kind}/{slug}")
def get_content(kind: str, slug: str, locale: str = "en"):
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    item = published(kind, slug, locale=normalize_locale(locale))
    if not item:
        # Hub SEO is optional per page; missing copy should not 404 the public UI.
        if kind == "hub_seo":
            return public_json({}, seconds=600)
        raise HTTPException(status_code=404, detail="Not found")
    return public_json(item, seconds=600)


@app.get("/api/search")
def search(q: str = "", locale: str = "en"):
    query = q.strip()
    if not query:
        return public_json([], seconds=60)
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
    return public_json(results, seconds=60)


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
    return public_json(roots, seconds=3600)


@app.get("/api/jaap")
def get_jaap(request: Request):
    user_id = require_user_id(request)
    return {"ok": True, "global": _global_by_mantra(), **_user_jaap_payload(user_id, today())}


@app.post("/api/jaap")
async def save_jaap(request: Request):
    user_id = optional_user_id(request)
    body = await request.json()
    day = _parse_jaap_day(body.get("date"))
    personal_only = bool(body.get("personalOnly"))
    pending = body.get("pending")
    ensure_jaap_totals()

    if isinstance(pending, dict):
        if not user_id:
            raise HTTPException(status_code=401, detail="Sign in required")
        if not personal_only:
            raise HTTPException(status_code=400, detail="Invalid payload")
        for slug, raw_delta in pending.items():
            mantra_slug = str(slug).strip()
            if mantra_slug not in JAAP_SLUGS:
                continue
            delta = _parse_jaap_delta(raw_delta, cap=MAX_JAAP_SYNC)
            if delta:
                _increment_personal(user_id, mantra_slug, delta, day)
        return {
            "ok": True,
            "stored": True,
            "global": _global_by_mantra(),
            **_user_jaap_payload(user_id, day),
        }

    counts = body.get("counts")
    if isinstance(counts, dict):
        if not _claim_jaap_batch(body.get("batchId")):
            payload = {"ok": True, "stored": True, "duplicate": True, "global": _global_by_mantra()}
            if user_id:
                payload.update(_user_jaap_payload(user_id, day))
            return payload
        stored = False
        for slug, raw_delta in counts.items():
            mantra_slug = str(slug).strip()
            if mantra_slug not in JAAP_SLUGS:
                continue
            delta = _parse_jaap_delta(raw_delta)
            if not delta:
                continue
            stored = True
            if not personal_only:
                _increment_global(mantra_slug, delta)
            if user_id:
                _increment_personal(user_id, mantra_slug, delta, day)
        if not stored:
            raise HTTPException(status_code=400, detail="Invalid payload")
        payload = {"ok": True, "stored": True, "global": _global_by_mantra()}
        if user_id:
            payload.update(_user_jaap_payload(user_id, day))
        return payload

    mantra_slug = str(body.get("mantraSlug") or "").strip()
    if mantra_slug not in JAAP_SLUGS:
        raise HTTPException(status_code=400, detail="Invalid mantra")
    delta = _parse_jaap_delta(body.get("delta"))
    if not delta:
        raise HTTPException(status_code=400, detail="Invalid payload")
    if personal_only and not user_id:
        raise HTTPException(status_code=401, detail="Sign in required")

    global_count = None
    if not personal_only:
        global_count = _increment_global(mantra_slug, delta)
    else:
        row = db().fetchone("SELECT count FROM jaap_totals WHERE mantra_slug = ?", [mantra_slug])
        global_count = int((row or {}).get("count") or 0)

    personal_today = 0
    personal_total = 0
    if user_id:
        personal_today, personal_total = _increment_personal(user_id, mantra_slug, delta, day)

    return {
        "ok": True,
        "stored": True,
        "mantraSlug": mantra_slug,
        "global": global_count,
        "personalToday": personal_today,
        "personalTotal": personal_total,
    }


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
async def get_diary(request: Request):
    user_id = require_user_id(request)
    rows = db().fetchall(
        "SELECT date, notes FROM diary_entries WHERE user_id = ? ORDER BY date DESC",
        [user_id],
    )
    entries = {item["date"]: _diary_payload(item) for item in rows}
    return {"ok": True, "entries": entries}


@app.post("/api/diary")
async def save_diary(request: Request):
    user_id = require_user_id(request)
    body = await request.json()
    day = body.get("date")
    if not day:
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
async def get_saved(request: Request, type: str = "blog"):
    user_id = require_user_id(request)
    rows = db().fetchall(
        "SELECT slug FROM saved_items WHERE user_id = ? AND type = ?",
        [user_id, type],
    )
    return {"ok": True, "slugs": [row["slug"] for row in rows]}


@app.post("/api/saved")
async def save_item(request: Request):
    user_id = require_user_id(request)
    body = await request.json()
    kind = body.get("type") or "blog"
    slug = body.get("slug")
    saved = body.get("saved")
    if not slug:
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
    uid = require_user_id(request)
    body = await request.json()
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


def _community_info(slug: str) -> dict:
    owned = db().fetchone(
        "SELECT slug, name, text, created_by FROM communities WHERE slug = ?",
        [slug],
    )
    if owned:
        return {
            "kind": "user",
            "slug": owned["slug"],
            "name": owned["name"],
            "text": owned["text"] or "",
            "created_by": owned["created_by"],
        }
    row = db().fetchone(
        """
        SELECT slug, title, status, data FROM cms_entries
        WHERE kind = 'community_group' AND slug = ? AND status = 'published'
        """,
        [slug],
    )
    if not row:
        raise HTTPException(status_code=404, detail="Community not found")
    data = parse_data(row.get("data"))
    return {
        "kind": "official",
        "slug": slug,
        "name": data.get("name") or row.get("title") or slug,
        "text": data.get("text") or "",
        "created_by": "",
    }


def _community_member(user_id: str, slug: str) -> bool:
    row = db().fetchone(
        "SELECT user_id FROM community_members WHERE user_id = ? AND community_slug = ?",
        [user_id, slug],
    )
    return bool(row)


def _ensure_member(user_id: str, slug: str) -> None:
    if not _community_member(user_id, slug):
        raise HTTPException(status_code=403, detail="Join this community to write")


def _ensure_can_post(user_id: str, info: dict) -> None:
    _ensure_member(user_id, info["slug"])
    if info["kind"] == "user" and info["created_by"] != user_id:
        raise HTTPException(status_code=403, detail="Only the admin can start a post")


def _ensure_user_row(user_id: str) -> None:
    db().execute(
        """
        INSERT INTO users (id, firebase_uid, name)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO NOTHING
        """,
        [user_id, user_id, "Devotee"],
    )


@app.get("/api/community/counts")
def community_counts():
    rows = db().fetchall(
        "SELECT community_slug AS slug, COUNT(*) AS total FROM community_members GROUP BY community_slug"
    )
    return public_json(
        {"ok": True, "counts": {row["slug"]: int(row["total"]) for row in rows}},
        seconds=30,
    )


@app.get("/api/community/user-groups")
def list_user_communities():
    rows = db().fetchall(
        """
        SELECT c.slug, c.name, c.text, c.created_by,
               (SELECT COUNT(*) FROM community_members m WHERE m.community_slug = c.slug) AS members
        FROM communities c
        ORDER BY c.created_at DESC
        LIMIT 100
        """
    )
    return {
        "ok": True,
        "groups": [
            {
                "slug": row["slug"],
                "name": row["name"],
                "text": row["text"] or "",
                "members": int(row["members"] or 0),
            }
            for row in rows
        ],
    }


@app.post("/api/community")
async def create_community(request: Request):
    user_id = require_user_id(request)
    _ensure_user_row(user_id)
    owned = db().fetchone(
        "SELECT COUNT(*) AS total FROM communities WHERE created_by = ?",
        [user_id],
    )
    if int(owned["total"] if owned else 0) >= MAX_OWNED:
        raise HTTPException(status_code=400, detail="You can create at most 3 communities")
    last = db().fetchone(
        "SELECT created_at FROM communities WHERE created_by = ? ORDER BY created_at DESC LIMIT 1",
        [user_id],
    )
    if last and too_soon(last.get("created_at")):
        raise HTTPException(status_code=429, detail="Wait a moment before creating another community")
    payload = await request.json()
    name = clean_name(payload.get("name"))
    about = clean_body(payload.get("text") or payload.get("about") or name, MAX_ABOUT)
    slug = slug_from_name(name)
    db().execute(
        "INSERT INTO communities (slug, name, text, created_by) VALUES (?, ?, ?, ?)",
        [slug, name, about, user_id],
    )
    db().execute(
        """
        INSERT INTO community_members (user_id, community_slug)
        VALUES (?, ?)
        ON CONFLICT(user_id, community_slug) DO NOTHING
        """,
        [user_id, slug],
    )
    return {"ok": True, "slug": slug, "name": name}


@app.get("/api/community/{slug}")
async def get_community(slug: str, request: Request):
    slug = require_slug(slug)
    info = _community_info(slug)
    viewer = optional_user_id(request)
    is_admin = bool(viewer and info["created_by"] and viewer == info["created_by"])
    joined = bool(viewer and _community_member(viewer, slug))
    members = db().fetchall(
        """
        SELECT m.joined_at, m.user_id, u.name, u.photo_url
        FROM community_members m
        LEFT JOIN users u ON u.id = m.user_id
        WHERE m.community_slug = ?
        ORDER BY m.joined_at DESC
        LIMIT ?
        """,
        [slug, MAX_MEMBERS],
    )
    threads = db().fetchall(
        """
        SELECT t.id, t.body, t.created_at, t.user_id, u.name, u.photo_url
        FROM community_threads t
        LEFT JOIN users u ON u.id = t.user_id
        WHERE t.community_slug = ?
        ORDER BY t.created_at DESC
        LIMIT ?
        """,
        [slug, MAX_THREADS],
    )
    replies_by_thread: dict[str, list] = {item["id"]: [] for item in threads}
    if threads:
        placeholders = ",".join("?" for _ in threads)
        reply_rows = db().fetchall(
            f"""
            SELECT r.id, r.thread_id, r.body, r.created_at, u.name, u.photo_url
            FROM community_replies r
            LEFT JOIN users u ON u.id = r.user_id
            WHERE r.thread_id IN ({placeholders})
            ORDER BY r.created_at ASC
            """,
            [item["id"] for item in threads],
        )
        for reply in reply_rows:
            bucket = replies_by_thread.get(reply["thread_id"])
            if bucket is not None and len(bucket) < MAX_REPLIES:
                bucket.append(
                    {
                        "id": reply["id"],
                        "body": reply["body"],
                        "createdAt": reply["created_at"],
                        "author": public_person(reply.get("name"), reply.get("photo_url")),
                    }
                )
    count_row = db().fetchone(
        "SELECT COUNT(*) AS total FROM community_members WHERE community_slug = ?",
        [slug],
    )
    return {
        "ok": True,
        "slug": slug,
        "name": info["name"],
        "text": info["text"],
        "kind": info["kind"],
        "joined": joined,
        "isAdmin": is_admin,
        "canPost": bool(joined and (info["kind"] == "official" or is_admin)),
        "memberCount": int(count_row["total"] if count_row else 0),
        "members": [
            {
                **public_person(item.get("name"), item.get("photo_url")),
                "joinedAt": item.get("joined_at"),
                "role": "admin" if info["created_by"] and item.get("user_id") == info["created_by"] else "member",
            }
            for item in members
        ],
        "threads": [
            {
                "id": item["id"],
                "body": item["body"],
                "createdAt": item["created_at"],
                "author": public_person(item.get("name"), item.get("photo_url")),
                "replies": replies_by_thread.get(item["id"], []),
            }
            for item in threads
        ],
    }


@app.post("/api/community/{slug}/join")
async def join_community(slug: str, request: Request):
    slug = require_slug(slug)
    _community_info(slug)
    user_id = require_user_id(request)
    _ensure_user_row(user_id)
    db().execute(
        """
        INSERT INTO community_members (user_id, community_slug)
        VALUES (?, ?)
        ON CONFLICT(user_id, community_slug) DO NOTHING
        """,
        [user_id, slug],
    )
    return {"ok": True, "joined": True}


@app.post("/api/community/{slug}/threads")
async def create_thread(slug: str, request: Request):
    slug = require_slug(slug)
    info = _community_info(slug)
    user_id = require_user_id(request)
    _ensure_can_post(user_id, info)
    body = await request.json()
    text = clean_body(body.get("body"))
    last = db().fetchone(
        """
        SELECT created_at FROM community_threads
        WHERE user_id = ? AND community_slug = ?
        ORDER BY created_at DESC LIMIT 1
        """,
        [user_id, slug],
    )
    if last and too_soon(last.get("created_at")):
        raise HTTPException(status_code=429, detail="Wait a moment before posting again")
    thread_id = new_id()
    db().execute(
        """
        INSERT INTO community_threads (id, community_slug, user_id, body)
        VALUES (?, ?, ?, ?)
        """,
        [thread_id, slug, user_id, text],
    )
    return {"ok": True, "id": thread_id}


@app.post("/api/community/{slug}/threads/{thread_id}/replies")
async def create_reply(slug: str, thread_id: str, request: Request):
    slug = require_slug(slug)
    _community_info(slug)
    user_id = require_user_id(request)
    _ensure_member(user_id, slug)
    if not valid_id(thread_id):
        raise HTTPException(status_code=400, detail="Invalid message")
    thread = db().fetchone(
        "SELECT id FROM community_threads WHERE id = ? AND community_slug = ?",
        [thread_id, slug],
    )
    if not thread:
        raise HTTPException(status_code=404, detail="Message not found")
    payload = await request.json()
    text = clean_body(payload.get("body"))
    last = db().fetchone(
        """
        SELECT created_at FROM community_replies
        WHERE user_id = ? AND community_slug = ?
        ORDER BY created_at DESC LIMIT 1
        """,
        [user_id, slug],
    )
    if last and too_soon(last.get("created_at")):
        raise HTTPException(status_code=429, detail="Wait a moment before posting again")
    reply_id = new_id()
    db().execute(
        """
        INSERT INTO community_replies (id, thread_id, community_slug, user_id, body)
        VALUES (?, ?, ?, ?, ?)
        """,
        [reply_id, thread_id, slug, user_id, text],
    )
    return {"ok": True, "id": reply_id}


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
        "error": db_error or request.query_params.get("error"),
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
    spec = KINDS[kind]
    raw_rows = db().fetchall(
        "SELECT id, slug, title, status, updated_at, data FROM cms_entries WHERE kind = ? ORDER BY updated_at DESC, id DESC",
        [kind],
    )
    show_images = has_hero_image(spec)
    show_youtube = has_youtube_url(spec)
    rows = []
    for row in raw_rows:
        item = dict(row)
        data = parse_data(item.pop("data", None))
        item["heroImage"] = safe_image_src(str(data.get("heroImage") or "")) if show_images else ""
        item["youtubeUrl"] = str(data.get("youtubeUrl") or "").strip() if show_youtube else ""
        rows.append(item)
    return templates.TemplateResponse(
        "list.html",
        admin_context(request, kind=spec, rows=rows, show_images=show_images, show_youtube=show_youtube),
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
        admin_context(request, kind=spec, values=values, slug="", status="published", item_id=None, **form_image_kwargs(spec, values)),
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
                **form_image_kwargs(spec, values),
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
                **form_image_kwargs(spec, values),
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
    data = parse_data(row.get("data"))
    return templates.TemplateResponse(
        "json_edit.html",
        admin_context(
            request,
            kind=spec,
            item_id=item_id,
            json_text=dump_entry_json(row),
            **form_image_kwargs(spec, data),
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
            admin_context(
                request,
                kind=spec,
                item_id=item_id,
                json_text=text,
                error=message,
                **form_image_kwargs(spec, parse_data(row.get("data"))),
            ),
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


@app.post("/admin/{kind}/{item_id}/image")
async def admin_save_image_url(
    request: Request,
    kind: str,
    item_id: int,
    heroImage: str = Form(""),
    next: str = Form(""),
):
    require_admin(request)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    if not has_hero_image(spec):
        raise HTTPException(status_code=400, detail="This entry type has no image field.")
    row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    if not row:
        raise HTTPException(status_code=404)
    nxt = (next or "").strip()
    if nxt == "edit":
        base = f"/admin/{kind}/{item_id}/edit"
    elif nxt == "json":
        base = f"/admin/{kind}/{item_id}/json"
    else:
        base = f"/admin/{kind}"

    def bounce(message: str, *, failed: bool = False) -> RedirectResponse:
        key = "error" if failed else "notice"
        return RedirectResponse(f"{base}?{key}={quote(message)}", status_code=302)

    url = (heroImage or "").strip()
    if url and not safe_image_src(url):
        return bounce("Use an https:// cloud URL or a site path starting with /.", failed=True)
    try:
        data = replace_hero_image(parse_data(row.get("data")), url)
        save_entry(
            kind,
            data,
            slug=row.get("slug") or "",
            status=row.get("status") or "published",
            item_id=item_id,
        )
    except Exception as error:
        return bounce(str(error), failed=True)
    return bounce("Image URL saved")


@app.post("/admin/{kind}/{item_id}/youtube")
async def admin_save_youtube_url(
    request: Request,
    kind: str,
    item_id: int,
    youtubeUrl: str = Form(""),
    next: str = Form(""),
):
    require_admin(request)
    if kind not in KINDS:
        raise HTTPException(status_code=404)
    spec = KINDS[kind]
    if not has_youtube_url(spec):
        raise HTTPException(status_code=400, detail="This entry type has no YouTube field.")
    row = db().fetchone("SELECT * FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    if not row:
        raise HTTPException(status_code=404)
    nxt = (next or "").strip()
    if nxt == "edit":
        base = f"/admin/{kind}/{item_id}/edit"
    elif nxt == "json":
        base = f"/admin/{kind}/{item_id}/json"
    else:
        base = f"/admin/{kind}"

    def bounce(message: str, *, failed: bool = False) -> RedirectResponse:
        key = "error" if failed else "notice"
        return RedirectResponse(f"{base}?{key}={quote(message)}", status_code=302)

    url = (youtubeUrl or "").strip()
    if url and not safe_youtube_src(url):
        return bounce("Paste the full YouTube embed iframe from YouTube → Share → Embed.", failed=True)
    try:
        data = parse_data(row.get("data"))
        data["youtubeUrl"] = safe_youtube_src(url)
        save_entry(
            kind,
            data,
            slug=row.get("slug") or "",
            status=row.get("status") or "published",
            item_id=item_id,
        )
    except Exception as error:
        return bounce(str(error), failed=True)
    return bounce("YouTube embed saved")


@app.post("/admin/{kind}/{item_id}/delete")
def admin_delete(request: Request, kind: str, item_id: int):
    require_admin(request)
    db().execute("DELETE FROM cms_entries WHERE id = ? AND kind = ?", [item_id, kind])
    return RedirectResponse(f"/admin/{kind}?notice=Deleted", status_code=302)


@app.exception_handler(401)
async def unauthorized(_request: Request, _exc: HTTPException):
    return RedirectResponse("/admin/login", status_code=302)


images_dir = ROOT.parent / "public" / "images"
if images_dir.is_dir():
    app.mount("/images", StaticFiles(directory=str(images_dir)), name="images")

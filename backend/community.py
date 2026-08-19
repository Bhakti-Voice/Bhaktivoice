from __future__ import annotations

import re
import uuid
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException

from profanity import abuse_hit

SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,79}$")
MAX_BODY = 1200
MAX_NAME = 80
MAX_ABOUT = 400
MAX_OWNED = 3
RATE_SECONDS = 8
MAX_THREADS = 40
MAX_REPLIES = 80
MAX_MEMBERS = 200


def require_slug(slug: str) -> str:
    value = (slug or "").strip().lower()
    if not SLUG_RE.match(value):
        raise HTTPException(status_code=400, detail="Invalid community")
    return value


def clean_body(raw: object, max_len: int = MAX_BODY) -> str:
    text = str(raw or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    if not text:
        raise HTTPException(status_code=400, detail="Write a short message first")
    if len(text) > max_len:
        raise HTTPException(status_code=400, detail="Message is too long")
    if abuse_hit(text):
        raise HTTPException(
            status_code=400,
            detail="Please keep the language gentle. That message could not be posted.",
        )
    return text


def clean_name(raw: object) -> str:
    text = clean_body(raw, MAX_NAME)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def slug_from_name(name: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:40] or "sangha"
    return f"{base}-{new_id()[:8]}"


def valid_id(value: str) -> bool:
    return bool(re.fullmatch(r"[a-f0-9]{32}", value or ""))


def new_id() -> str:
    return uuid.uuid4().hex


def parse_time(value: object) -> datetime | None:
    if not value:
        return None
    text = str(value).replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def too_soon(stamp: object) -> bool:
    parsed = parse_time(stamp)
    if not parsed:
        return False
    return datetime.now(timezone.utc) - parsed.astimezone(timezone.utc) < timedelta(seconds=RATE_SECONDS)


def public_person(name: object, photo: object) -> dict:
    label = str(name or "").strip() or "Devotee"
    if "@" in label:
        label = "Devotee"
    return {
        "name": label[:80],
        "photoUrl": str(photo or "").strip() or "",
    }

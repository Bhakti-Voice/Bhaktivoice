from __future__ import annotations

import base64
import re
import secrets
from io import BytesIO
from typing import Any

from db import get_db

MEDIA_URL_PREFIX = "/api/backend/media/"
MEDIA_ID_RE = re.compile(r"^[A-Za-z0-9_-]{8,64}$")
MAX_UPLOAD_BYTES = 8 * 1024 * 1024
MAX_STORED_BYTES = 700_000
MAX_EDGE = 1600
ALLOWED_SNIFF = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}

def public_media_url(media_id: str) -> str:
    return f"{MEDIA_URL_PREFIX}{media_id}"


def media_id_from_url(url: str) -> str | None:
    text = (url or "").strip()
    if not text.startswith(MEDIA_URL_PREFIX):
        return None
    media_id = text[len(MEDIA_URL_PREFIX) :].split("?", 1)[0].strip("/")
    if MEDIA_ID_RE.fullmatch(media_id):
        return media_id
    return None


def safe_image_src(url: str) -> str:
    text = (url or "").strip()
    if text.startswith("/") and not text.startswith("//"):
        return text
    if text.startswith("https://") or text.startswith("http://"):
        return text
    return ""


def sniff_image(raw: bytes) -> str | None:
    if len(raw) < 12:
        return None
    if raw.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if raw.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if raw[:4] == b"RIFF" and raw[8:12] == b"WEBP":
        return "image/webp"
    if raw.startswith(b"GIF87a") or raw.startswith(b"GIF89a"):
        return "image/gif"
    return None


def _flatten_rgb(image: Any) -> Any:
    from PIL import Image

    if image.mode in {"RGBA", "LA"} or (image.mode == "P" and "transparency" in image.info):
        converted = image.convert("RGBA")
        background = Image.new("RGB", converted.size, (251, 246, 238))
        background.paste(converted, mask=converted.split()[-1])
        return background
    return image.convert("RGB")


def normalize_image(raw: bytes) -> tuple[bytes, str]:
    kind = sniff_image(raw)
    if kind not in ALLOWED_SNIFF:
        raise ValueError("Upload a JPG, PNG, WEBP, or GIF image.")
    try:
        from PIL import Image
    except ImportError as error:
        raise ValueError("Image processing is not available on this server.") from error
    try:
        image = Image.open(BytesIO(raw))
        image.load()
    except Exception as error:
        raise ValueError("That file could not be read as an image.") from error
    image.thumbnail((MAX_EDGE, MAX_EDGE))
    image = _flatten_rgb(image)
    quality = 82
    payload = b""
    while quality >= 55:
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=quality, optimize=True)
        payload = buffer.getvalue()
        if len(payload) <= MAX_STORED_BYTES:
            return payload, "image/jpeg"
        quality -= 9
    raise ValueError("That image is still too large after compression. Use a smaller photo.")


def save_media(raw: bytes) -> str:
    if len(raw) > MAX_UPLOAD_BYTES:
        raise ValueError("Image is too large. Use a file under 8 MB.")
    payload, mime = normalize_image(raw)
    media_id = secrets.token_urlsafe(12)
    get_db().execute(
        "INSERT INTO cms_media (id, mime, payload) VALUES (?, ?, ?)",
        [media_id, mime, base64.b64encode(payload).decode("ascii")],
    )
    return public_media_url(media_id)


def load_media(media_id: str) -> tuple[bytes, str] | None:
    if not MEDIA_ID_RE.fullmatch(media_id or ""):
        return None
    row = get_db().fetchone("SELECT mime, payload FROM cms_media WHERE id = ?", [media_id])
    if not row:
        return None
    try:
        payload = base64.b64decode(str(row.get("payload") or ""), validate=False)
    except Exception:
        return None
    mime = str(row.get("mime") or "image/jpeg")
    if not payload:
        return None
    return payload, mime


def delete_media(media_id: str) -> None:
    if not MEDIA_ID_RE.fullmatch(media_id or ""):
        return
    get_db().execute("DELETE FROM cms_media WHERE id = ?", [media_id])


def replace_hero_image(data: dict[str, Any], url: str) -> dict[str, Any]:
    previous = media_id_from_url(str(data.get("heroImage") or ""))
    next_id = media_id_from_url(url)
    data = dict(data)
    data["heroImage"] = url
    if previous and previous != next_id:
        delete_media(previous)
    return data

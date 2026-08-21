"""Bot blocking + best-effort rate limits for Vercel serverless FastAPI."""

from __future__ import annotations

import os
import re
import time
from collections import defaultdict, deque
from threading import Lock
from typing import Callable

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.types import ASGIApp

# Search-engine / SEO scrapers — public HTML is on Next; CMS/admin must not be crawled.
_CRAWLER_RE = re.compile(
    r"("
    r"googlebot|google-inspectiontool|storebot-google|apis-google|adsbot-google|"
    r"bingbot|bingpreview|msnbot|duckduckbot|yandex(bot)?|baiduspider|"
    r"slurp|sogou|exabot|facebot|facebookexternalhit|twitterbot|linkedinbot|"
    r"applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|"
    r"gptbot|chatgpt-user|claudebot|anthropic|ccbot|dataforseobot|"
    r"scrapy"
    r")",
    re.I,
)

# Hot paths: (window_seconds, max_requests) — best-effort per serverless instance.
_RATE_LIMITS: dict[str, tuple[int, int]] = {
    "/api/search": (60, 40),
    "/api/stats": (60, 60),
    "/api/quotes": (60, 60),
    "/api/content": (60, 120),
    "/api/sitemap": (60, 20),
    "/api/community/counts": (60, 90),
    "/admin": (60, 30),
}

_NOINDEX = "noindex, nofollow, noarchive"
_INTERNAL_HEADER = "x-bhakti-internal"


class _BucketStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str, window: int, limit: int) -> bool:
        now = time.monotonic()
        with self._lock:
            bucket = self._hits[key]
            while bucket and now - bucket[0] > window:
                bucket.popleft()
            if len(bucket) >= limit:
                return False
            bucket.append(now)
            if len(self._hits) > 4000:
                stale = [k for k, v in self._hits.items() if not v or now - v[-1] > 120]
                for k in stale[:800]:
                    self._hits.pop(k, None)
            return True


_STORE = _BucketStore()


def _internal_secret() -> str:
    return (
        os.environ.get("CMS_INTERNAL_SECRET")
        or os.environ.get("SESSION_SECRET")
        or ""
    ).strip()


def client_ip(request: Request) -> str:
    forwarded = (request.headers.get("x-forwarded-for") or "").split(",")[0].strip()
    if forwarded:
        return forwarded
    real = (request.headers.get("x-real-ip") or "").strip()
    if real:
        return real
    if request.client and request.client.host:
        return request.client.host
    return "unknown"


def _is_internal(request: Request) -> bool:
    if request.headers.get("authorization"):
        return True
    if request.headers.get("x-vercel-protection-bypass"):
        return True
    secret = _internal_secret()
    if secret and (request.headers.get(_INTERNAL_HEADER) or "").strip() == secret:
        return True
    return False


def _is_crawler(request: Request) -> bool:
    ua = (request.headers.get("user-agent") or "").strip()
    if not ua:
        return False
    return bool(_CRAWLER_RE.search(ua))


def _rate_key(path: str) -> str | None:
    for prefix in _RATE_LIMITS:
        if path == prefix or path.startswith(prefix + "/"):
            return prefix
    return None


class ProtectMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, *, site_origins: list[str] | None = None) -> None:
        super().__init__(app)
        self.site_origins = {o.rstrip("/") for o in (site_origins or []) if o}

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        if request.method == "OPTIONS":
            return await call_next(request)

        path = request.url.path or "/"

        # After StripBackendPrefixMiddleware, paths are /api/... or /admin/...
        is_admin = path == "/admin" or path.startswith("/admin/")
        is_api = path == "/api" or path.startswith("/api/")

        if (is_admin or is_api) and _is_crawler(request):
            return JSONResponse(
                {"ok": False, "error": "Forbidden"},
                status_code=403,
                headers={"X-Robots-Tag": _NOINDEX, "Cache-Control": "private, no-store"},
            )

        # Admin: scrapers with no UA (browsers always send one).
        if is_admin and not (request.headers.get("user-agent") or "").strip() and not _is_internal(request):
            return JSONResponse(
                {"ok": False, "error": "Forbidden"},
                status_code=403,
                headers={"X-Robots-Tag": _NOINDEX, "Cache-Control": "private, no-store"},
            )

        rate_prefix = _rate_key(path) if (is_api or is_admin) else None
        if rate_prefix and not _is_internal(request):
            window, limit = _RATE_LIMITS[rate_prefix]
            ip = client_ip(request)
            if not _STORE.allow(f"{rate_prefix}:{ip}", window, limit):
                return JSONResponse(
                    {"ok": False, "error": "Too many requests"},
                    status_code=429,
                    headers={
                        "Retry-After": str(window),
                        "X-Robots-Tag": _NOINDEX,
                        "Cache-Control": "private, no-store",
                    },
                )

        response = await call_next(request)
        if is_admin or is_api:
            response.headers.setdefault("X-Robots-Tag", _NOINDEX)
        return response

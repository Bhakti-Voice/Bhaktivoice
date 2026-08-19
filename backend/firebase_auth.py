from __future__ import annotations

import os

from fastapi import HTTPException, Request
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

_verify_request = google_requests.Request()


def firebase_project_id() -> str:
    return (
        os.environ.get("FIREBASE_PROJECT_ID") or os.environ.get("NEXT_PUBLIC_FIREBASE_PROJECT_ID") or ""
    ).strip()


def _bearer_token(request: Request) -> str:
    header = request.headers.get("authorization") or request.headers.get("Authorization") or ""
    if header.lower().startswith("bearer "):
        return header[7:].strip()
    return ""


def require_user_id(request: Request) -> str:
    token = _bearer_token(request)
    if not token:
        raise HTTPException(status_code=401, detail="Sign in required")
    project = firebase_project_id()
    if not project:
        raise HTTPException(status_code=503, detail="Auth is not configured")
    try:
        claims = id_token.verify_firebase_token(token, _verify_request, audience=project)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid session")
    uid = str(claims.get("sub") or claims.get("user_id") or "").strip()
    if not uid:
        raise HTTPException(status_code=401, detail="Invalid session")
    return uid


def optional_user_id(request: Request) -> str | None:
    if not _bearer_token(request):
        return None
    try:
        return require_user_id(request)
    except HTTPException:
        return None

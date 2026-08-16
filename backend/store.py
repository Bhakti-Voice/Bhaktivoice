from __future__ import annotations

import json
from datetime import datetime

from db import get_db
from kinds import KINDS
from slugs import join_slug, seo_slug, tokens_from


def entry_title(data: dict) -> str:
    return str(data.get("title") or data.get("h1") or data.get("name") or data.get("heading") or "")


def entry_slug(kind: str, data: dict, existing: str = "") -> str:
    title = entry_title(data)
    return seo_slug(
        kind,
        title,
        str(data.get("h1") or ""),
        str(data.get("seoTitle") or ""),
        str(data.get("name") or ""),
        str(data.get("heading") or ""),
        str(data.get("destination") or ""),
        existing=existing,
    )


def save_entry(
    kind: str,
    data: dict,
    slug: str = "",
    status: str = "published",
    item_id: int | None = None,
) -> tuple[str, str]:
    if kind not in KINDS:
        raise ValueError(f"Unknown kind: {kind}")
    status = status if status in ("published", "draft") else "published"
    provided = (slug or "").strip().strip("/")
    if kind == "hub_seo":
        slug = seo_slug(kind, existing=provided or entry_title(data))
    elif provided:
        slug = join_slug(tokens_from(provided.replace("-", " "))) or provided
    else:
        slug = entry_slug(kind, data)
    title = entry_title(data) or slug
    if not slug:
        raise ValueError("Add a title so we can build a long URL slug.")
    payload = json.dumps(data, ensure_ascii=False)
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    conn = get_db()
    if item_id:
        conn.execute(
            """
            UPDATE cms_entries
            SET slug = ?, title = ?, status = ?, data = ?, updated_at = ?
            WHERE id = ? AND kind = ?
            """,
            [slug, title, status, payload, now, int(item_id), kind],
        )
        return slug, "updated"
    existing = conn.fetchone(
        "SELECT id FROM cms_entries WHERE kind = ? AND slug = ?",
        [kind, slug],
    )
    if existing:
        conn.execute(
            """
            UPDATE cms_entries
            SET title = ?, status = ?, data = ?, updated_at = ?
            WHERE id = ?
            """,
            [title, status, payload, now, existing["id"]],
        )
        return slug, "updated"
    conn.execute(
        """
        INSERT INTO cms_entries (kind, slug, title, status, data, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        [kind, slug, title, status, payload, now, now],
    )
    return slug, "created"

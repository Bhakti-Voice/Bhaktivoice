from __future__ import annotations

import json
from typing import Any

from kinds import KINDS, Field, form_to_data
from store import save_entry

META_KEYS = {"kind", "slug", "status", "data", "id", "title"}
STRUCTURED_TYPES = {
    "lines",
    "tags",
    "faqs",
    "related",
    "places",
    "itinerary",
    "episodes",
    "sections",
    "paragraphs",
}


def parse_json_text(raw: str) -> Any:
    text = (raw or "").strip()
    if not text:
        raise ValueError("Paste JSON or choose a .json file.")
    try:
        return json.loads(text)
    except json.JSONDecodeError as error:
        raise ValueError(f"JSON is not valid: {error}") from error


def flatten_payload(payload: Any) -> list[dict[str, Any]]:
    if payload is None:
        return []
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        raise ValueError("JSON must be an object, an array of objects, or { \"entries\": [...] }.")
    if isinstance(payload.get("entries"), list):
        return [item for item in payload["entries"] if isinstance(item, dict)]
    return [payload]


def json_to_data(kind_key: str, payload: dict[str, Any]) -> dict[str, Any]:
    spec = KINDS[kind_key]
    form: dict[str, str] = {}
    keep: dict[str, Any] = {}
    for item in spec.fields:
        if item.name not in payload:
            form[item.name] = ""
            continue
        value = payload[item.name]
        if _keep_structured(item, value):
            form[item.name] = ""
            keep[item.name] = value
        else:
            form[item.name] = "" if value is None else str(value)
    data = form_to_data(spec, form)
    data.update(keep)
    return data


def _keep_structured(item: Field, value: Any) -> bool:
    if value is None or isinstance(value, str):
        return False
    if item.type == "number":
        return isinstance(value, (int, float))
    if item.type in STRUCTURED_TYPES:
        return isinstance(value, list)
    return not isinstance(value, (str, int, float, bool))


def coerce_entry(raw: dict[str, Any], default_kind: str | None = None) -> dict[str, Any]:
    kind = str(raw.get("kind") or default_kind or "").strip()
    if kind not in KINDS:
        raise ValueError(f"Unknown kind {kind!r}. Use one of: {', '.join(KINDS)}.")
    if isinstance(raw.get("data"), dict):
        payload = dict(raw["data"])
        if "title" in raw and "title" not in payload:
            payload["title"] = raw["title"]
    else:
        payload = {key: value for key, value in raw.items() if key not in META_KEYS}
        if "title" in raw:
            payload.setdefault("title", raw["title"])
    data = json_to_data(kind, payload)
    return {
        "kind": kind,
        "slug": str(raw.get("slug") or ""),
        "status": str(raw.get("status") or "published"),
        "data": data,
    }


def import_entries(payload: Any, default_kind: str | None = None) -> dict[str, Any]:
    rows = flatten_payload(payload)
    if not rows:
        raise ValueError("No entries found in the JSON.")
    created = 0
    updated = 0
    errors: list[str] = []
    for index, raw in enumerate(rows, start=1):
        try:
            entry = coerce_entry(raw, default_kind)
            _slug, action = save_entry(
                entry["kind"],
                entry["data"],
                slug=entry["slug"],
                status=entry["status"],
            )
            if action == "created":
                created += 1
            else:
                updated += 1
        except Exception as error:
            errors.append(f"Entry {index}: {error}")
    if created == 0 and updated == 0:
        raise ValueError(errors[0] if errors else "Nothing was imported.")
    return {"created": created, "updated": updated, "errors": errors}

from __future__ import annotations

import json
from typing import Any

from kinds import KINDS, Field, as_yes_no, form_to_data
from local_seed import DUMMY_ENTRIES
from store import save_entry

SAMPLES = {item["kind"]: item for item in DUMMY_ENTRIES}

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


def empty_field_value(item: Field, kind_key: str) -> Any:
    if item.type == "number":
        return 0
    if item.type == "select" and item.options:
        return item.options[0]
    if item.type == "lines":
        return [""]
    if item.type == "tags":
        return [""]
    if item.type == "paragraphs":
        return [""]
    if item.type == "faqs":
        return [{"question": "", "answer": ""}]
    if item.type == "related":
        return [{"kind": "", "href": "", "label": ""}]
    if item.type == "places":
        return [{"name": "", "note": "", "href": ""}]
    if item.type == "itinerary":
        return [{"day": "", "plan": ""}]
    if item.type == "episodes":
        return [{"number": 0, "title": "", "duration": "", "summary": ""}]
    if item.type == "sections":
        if kind_key == "blog" or item.name in {"body", "bodyHi"}:
            return [{"heading": "", "paragraphs": [""]}]
        return [{"heading": "", "body": ""}]
    return ""


def with_sample_text(value: Any, label: str, hindi: bool) -> Any:
    if isinstance(value, str):
        if value.strip():
            return value
        return f"नमूना {label}" if hindi else f"Sample {label}"
    if isinstance(value, list):
        if not value:
            return [with_sample_text("", label, hindi)]
        return [with_sample_text(item, label, hindi) for item in value]
    if isinstance(value, dict):
        return {
            key: with_sample_text(
                item,
                key,
                hindi or str(key).endswith("Hi"),
            )
            for key, item in value.items()
        }
    if value is None:
        return with_sample_text("", label, hindi)
    return value


def kind_placeholder(kind_key: str) -> dict[str, Any]:
    spec = KINDS[kind_key]
    sample = SAMPLES.get(kind_key) or {}
    sample_data = dict(sample.get("data") or {})
    data: dict[str, Any] = {}
    for field in spec.fields:
        hindi = field.name.endswith("Hi")
        raw = sample_data[field.name] if field.name in sample_data else empty_field_value(field, kind_key)
        data[field.name] = with_sample_text(raw, field.label, hindi)
    return {
        "slug": str(sample.get("slug") or f"sample-{kind_key}"),
        "status": "published",
        "data": data,
    }


def kind_placeholders() -> dict[str, dict[str, Any]]:
    return {key: kind_placeholder(key) for key in KINDS}


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
    known = {item.name for item in spec.fields}
    extra = {key: value for key, value in payload.items() if key not in known}
    for item in spec.fields:
        if item.name not in payload:
            form[item.name] = "no" if item.name == "outOfStock" else ""
            continue
        value = payload[item.name]
        if item.name == "outOfStock":
            form[item.name] = as_yes_no(value)
            continue
        if _keep_structured(item, value):
            form[item.name] = ""
            keep[item.name] = value
        else:
            form[item.name] = "" if value is None else str(value)
    data = form_to_data(spec, form)
    data.update(keep)
    data.update(extra)
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

from __future__ import annotations

import re

KIND_SLUG_TAIL = {
    "katha": "katha stories and leelas for daily listening",
    "blog": "bhakti guide for devotees and sadhana",
    "yatra": "sacred yatra travel guide for pilgrims",
    "temple": "hindu temple history and darshan guide",
    "festival": "hindu festival meaning and puja guide",
    "spirituality": "spiritual knowledge for householders",
    "mantra": "mantra meaning pronunciation and naam jaap",
    "product": "sacred item for daily sadhana and puja",
    "bhajan": "bhajan and kirtan lyrics with meaning",
    "aarti": "aarti lyrics meaning and evening prayer",
    "store_category": "bhakti store category for sadhana",
    "community_group": "devotee community group for naam jaap",
    "sankalp_offer": "sankalp vow for daily sadhana",
    "quotes": "daily bhakti quote",
}

MIN_WORDS = 5
MAX_WORDS = 12
MAX_CHARS = 96


def tokens_from(text: str) -> list[str]:
    cleaned = re.sub(r"[^a-z0-9]+", " ", (text or "").lower())
    words = [word for word in cleaned.split() if word]
    return words


def dedupe(words: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for word in words:
        if word in seen:
            continue
        seen.add(word)
        out.append(word)
    return out


def join_slug(words: list[str]) -> str:
    slug = "-".join(words).strip("-")
    return slug[:MAX_CHARS].strip("-")


def seo_slug(kind: str, *parts: str, existing: str = "") -> str:
    """Build a long, readable slug from title fields. Hub SEO ids stay short."""
    if kind == "hub_seo":
        raw = existing or next((part for part in parts if part), "hub")
        return join_slug(tokens_from(raw)) or "hub"

    gathered: list[str] = []
    if existing:
        gathered.extend(tokens_from(existing.replace("-", " ")))
    for part in parts:
        gathered.extend(tokens_from(part))
    gathered = dedupe(gathered)

    if len(gathered) < MIN_WORDS:
        gathered.extend(tokens_from(KIND_SLUG_TAIL.get(kind, "bhakti voice guide for devotees")))
        gathered = dedupe(gathered)

    gathered = gathered[:MAX_WORDS]
    slug = join_slug(gathered)
    if len(slug.split("-")) < MIN_WORDS:
        extra = tokens_from(KIND_SLUG_TAIL.get(kind, "bhakti voice spiritual guide"))
        slug = join_slug(dedupe(slug.split("-") + extra)[:MAX_WORDS])
    return slug or "bhakti-voice-spiritual-guide"

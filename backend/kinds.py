from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from typing import Any


@dataclass(frozen=True)
class Field:
    name: str
    label: str
    type: str = "text"
    hint: str = ""
    options: tuple[str, ...] = ()
    rows: int = 4


@dataclass(frozen=True)
class Kind:
    key: str
    label: str
    plural: str
    path: str
    schema: str = "Article"
    fields: tuple[Field, ...] = field(default_factory=tuple)


SEO_FIELDS = (
    Field("title", "Title"),
    Field("h1", "H1"),
    Field("seoTitle", "SEO title"),
    Field("metaDescription", "Meta description", "textarea", rows=3),
    Field("introduction", "Introduction", "textarea", rows=5),
    Field("heroImage", "Hero image URL", hint="Paste a cloud image URL, e.g. https://...jpg"),
    Field("heroImageAlt", "Hero image alt"),
    Field("category", "Category"),
    Field("author", "Author", hint="Shown on the article"),
    Field("publishedAt", "Published (YYYY-MM-DD)"),
    Field("updatedAt", "Updated (YYYY-MM-DD)"),
    Field("faqs", "FAQs", "faqs", "One per line: Question || Answer"),
    Field("related", "Related links", "related", "kind | /path | Label"),
    Field("cta_title", "CTA title"),
    Field("cta_body", "CTA body", "textarea", rows=2),
    Field("cta_href", "CTA link", hint="e.g. /naam-jaap"),
    Field("cta_label", "CTA button"),
)

KINDS: dict[str, Kind] = {
    "katha": Kind(
        "katha",
        "Katha",
        "Katha series",
        "/katha-stories",
        fields=SEO_FIELDS
        + (
            Field("subtitle", "Subtitle"),
            Field("language", "Language"),
            Field("duration", "Duration"),
            Field("rating", "Rating", hint="Leave 0 until real reviews exist"),
            Field("ratingsCount", "Ratings count"),
            Field(
                "episodes",
                "Episodes",
                "episodes",
                "number || title || duration || summary",
            ),
        ),
    ),
    "blog": Kind(
        "blog",
        "Blog post",
        "Blog posts",
        "/bhakti-blog",
        fields=SEO_FIELDS
        + (
            Field("excerpt", "Excerpt", "textarea", rows=3),
            Field("readingTime", "Reading time", hint="e.g. 6 min"),
            Field("tags", "Tags", "tags", "Comma separated"),
            Field("body", "Body", "sections", "## Heading then paragraphs"),
        ),
    ),
    "yatra": Kind(
        "yatra",
        "Yatra / trip",
        "Yatra pages",
        "/sacred-yatra-guides",
        "TouristDestination",
        fields=SEO_FIELDS
        + (
            Field("destination", "Destination"),
            Field("state", "State"),
            Field(
                "yatraCategory",
                "Page type",
                "select",
                options=("destination", "itinerary", "places", "darshan"),
            ),
            Field("filters", "Filters", "tags", "Jyotirlinga, Krishna Dham, …"),
            Field("whyVisit", "Why visit", "textarea", rows=4),
            Field("significance", "Significance", "textarea", rows=4),
            Field("places", "Places", "places", "Name || Note || /optional-href"),
            Field("temples", "Temples", "related", "temple | /hindu-temples/slug | Label"),
            Field("bestTime", "Best time", "textarea", rows=3),
            Field("howToReach", "How to reach", "textarea", rows=3),
            Field("itinerary", "Itinerary", "itinerary", "Day 1 || Plan"),
            Field("nearby", "Nearby", "lines"),
            Field("food", "Food", "textarea", rows=3),
            Field("stay", "Stay", "textarea", rows=3),
            Field("tips", "Tips", "lines"),
        ),
    ),
    "temple": Kind(
        "temple",
        "Temple",
        "Temples",
        "/hindu-temples",
        "TouristAttraction",
        fields=SEO_FIELDS
        + (
            Field("deity", "Deity"),
            Field("location", "Location"),
            Field("destinationSlug", "Yatra destination slug"),
            Field("history", "History", "textarea", rows=4),
            Field("architecture", "Architecture", "textarea", rows=4),
            Field("bestTime", "Best time", "textarea", rows=3),
            Field("timingsNote", "Timings note", "textarea", rows=3),
            Field("darshanNote", "Darshan note", "textarea", rows=3),
            Field("howToReach", "How to reach", "textarea", rows=3),
            Field("nearbyPlaces", "Nearby places", "lines"),
        ),
    ),
    "festival": Kind(
        "festival",
        "Festival",
        "Festivals",
        "/hindu-festivals",
        fields=SEO_FIELDS
        + (
            Field("monthHint", "Month hint"),
            Field("dateNote", "Date note", "textarea", rows=3),
            Field("story", "Story", "textarea", rows=5),
            Field("traditions", "Traditions", "lines"),
            Field("puja", "Puja at home", "textarea", rows=4),
        ),
    ),
    "spirituality": Kind(
        "spirituality",
        "Spiritual knowledge",
        "Spiritual Knowledge",
        "/spiritual-knowledge",
        fields=SEO_FIELDS
        + (Field("sections", "Sections", "sections", "## Heading then body"),),
    ),
    "mantra": Kind(
        "mantra",
        "Mantra",
        "Mantras",
        "/mantras-for-naam-jaap",
        fields=SEO_FIELDS
        + (
            Field("mantra", "Mantra text", "textarea", rows=2),
            Field("pronunciation", "Pronunciation"),
            Field("suggestedCount", "Suggested count"),
            Field("deity", "Deity"),
            Field("howToChant", "How to chant", "lines"),
            Field("significance", "Significance", "textarea", rows=4),
            Field("traditionalBenefits", "Traditional benefits", "lines"),
        ),
    ),
    "product": Kind(
        "product",
        "Store product",
        "Products",
        "/bhakti-store",
        "Product",
        fields=SEO_FIELDS
        + (
            Field("name", "Product name"),
            Field("priceInr", "Price (INR)", "number"),
            Field("categorySlug", "Category slug"),
            Field(
                "outOfStock",
                "Out of stock",
                "select",
                "Yes = still shown in the store so people can see it, but they cannot add it to cart",
                options=("no", "yes"),
            ),
            Field("description", "Description", "textarea", rows=4),
        ),
    ),
    "store_category": Kind(
        "store_category",
        "Store category",
        "Store categories",
        "/bhakti-store/category",
        fields=(
            Field("name", "Name"),
            Field("description", "Description", "textarea", rows=3),
        ),
    ),
    "community_group": Kind(
        "community_group",
        "Community group",
        "Community groups",
        "/devotee-community",
        fields=(
            Field("name", "Name"),
            Field("text", "Description", "textarea", rows=3),
        ),
    ),
    "sankalp_offer": Kind(
        "sankalp_offer",
        "Sankalp offer",
        "Sankalp offers",
        "/daily-sadhana/sankalp",
        fields=(
            Field("title", "Title"),
            Field("text", "Description", "textarea", rows=3),
            Field("href", "Link", hint="e.g. /devotee-community"),
        ),
    ),
    "hub_seo": Kind(
        "hub_seo",
        "Hub SEO block",
        "Hub SEO",
        "/",
        fields=(
            Field("heading", "Heading"),
            Field("paragraphs", "Paragraphs", "paragraphs", "Separate paragraphs with a blank line"),
            Field("points", "Bullet points", "lines"),
            Field("faqs", "FAQs", "faqs", "Question || Answer"),
        ),
    ),
    "bhajan": Kind(
        "bhajan",
        "Bhajan",
        "Bhajans",
        "/bhajan-and-kirtan",
        fields=SEO_FIELDS
        + (Field("sections", "Sections", "sections", "## Heading then body"),),
    ),
    "aarti": Kind(
        "aarti",
        "Aarti",
        "Aartis",
        "/aarti-chants",
        fields=SEO_FIELDS
        + (Field("sections", "Sections", "sections", "## Heading then body"),),
    ),
    "quotes": Kind(
        "quotes",
        "Quote",
        "Quotes",
        "/daily-quotes",
        fields=(
            Field("text", "Quote", "textarea", "Shown on the homepage banner and the quotes page", rows=4),
            Field("attribution", "Attribution", hint="e.g. Lord Krishna"),
        ),
    ),
}

HINDI_FIELD_TYPES = {
    "text",
    "textarea",
    "faqs",
    "sections",
    "lines",
    "episodes",
    "paragraphs",
    "places",
    "itinerary",
    "tags",
    "related",
}
SKIP_HINDI_NAMES = {
    "heroImage",
    "publishedAt",
    "updatedAt",
    "rating",
    "ratingsCount",
    "priceInr",
    "href",
    "cta_href",
    "categorySlug",
    "destinationSlug",
    "suggestedCount",
    "yatraCategory",
    "outOfStock",
}


def with_hindi(fields: tuple[Field, ...]) -> tuple[Field, ...]:
    expanded: list[Field] = []
    for item in fields:
        expanded.append(item)
        if item.type in HINDI_FIELD_TYPES and item.name not in SKIP_HINDI_NAMES:
            expanded.append(
                Field(
                    f"{item.name}Hi",
                    f"{item.label} (Hindi)",
                    item.type,
                    item.hint,
                    item.options,
                    item.rows,
                )
            )
    return tuple(expanded)


KINDS = {
    key: Kind(kind.key, kind.label, kind.plural, kind.path, kind.schema, with_hindi(kind.fields))
    for key, kind in KINDS.items()
}

KIND_LABEL_HI = {
    "katha": "कथा",
    "blog": "ब्लॉग",
    "yatra": "यात्रा",
    "temple": "मंदिर",
    "festival": "त्योहार",
    "spirituality": "आध्यात्मिक ज्ञान",
    "mantra": "मंत्र",
    "product": "भंडार",
    "bhajan": "भजन",
    "aarti": "आरती",
    "quotes": "उद्धरण",
}
CTA_DEFAULTS = {
    "en": {
        "title": "Start Naam Jaap",
        "body": "After you read, sit.",
        "label": "Start Jaap",
    },
    "hi": {
        "title": "नाम जप शुरू करें",
        "body": "पढ़ने के बाद, बैठें।",
        "label": "जप शुरू करें",
    },
}


def as_yes_no(value: Any, default: str = "no") -> str:
    if isinstance(value, bool):
        return "yes" if value else "no"
    if isinstance(value, (int, float)) and value in (0, 1) and not isinstance(value, bool):
        return "yes" if int(value) == 1 else "no"
    text = str(value or "").strip().lower()
    if text in {"yes", "y", "true", "1"}:
        return "yes"
    if text in {"no", "n", "false", "0", ""}:
        return default if text == "" else "no"
    return default


def _filled(value: Any) -> bool:
    if value is None:
        return False
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, list):
        return len(value) > 0
    if isinstance(value, dict):
        return any(_filled(item) for item in value.values())
    return True


def apply_locale(data: dict[str, Any], locale: str) -> dict[str, Any]:
    if locale != "hi":
        return dict(data)
    out = dict(data)
    for key, value in data.items():
        if key.endswith("Hi") and _filled(value):
            out[key[:-2]] = value
    return out


def strip_hi_keys(data: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in data.items() if not key.endswith("Hi")}


def has_hero_image(kind: Kind) -> bool:
    return any(item.name == "heroImage" for item in kind.fields)


def kind_crumb_name(kind: Kind, locale: str) -> str:
    if locale == "hi":
        return KIND_LABEL_HI.get(kind.key, kind.label)
    if kind.key == "yatra":
        return "Yatra"
    return kind.label

PAGE_KINDS = (
    "katha",
    "blog",
    "yatra",
    "temple",
    "festival",
    "spirituality",
    "mantra",
    "product",
    "bhajan",
    "aarti",
)

SEARCH_KINDS = PAGE_KINDS
RELATED_BUCKETS = {
    "yatra": "relatedDestinations",
    "temple": "relatedTemples",
    "mantra": "relatedMantras",
    "festival": "relatedFestivals",
    "katha": "relatedKatha",
    "blog": "relatedArticles",
    "spirituality": "relatedArticles",
    "product": "relatedArticles",
    "page": "relatedArticles",
}


def today() -> str:
    return date.today().isoformat()


def lines(value: str) -> list[str]:
    return [item.strip() for item in (value or "").splitlines() if item.strip()]


def split_pair(line: str, sep: str = "||") -> list[str]:
    return [part.strip() for part in line.split(sep)]


def parse_faqs(value: str) -> list[dict[str, str]]:
    faqs = []
    for line in lines(value):
        parts = split_pair(line)
        if len(parts) >= 2:
            faqs.append({"question": parts[0], "answer": parts[1]})
    return faqs


def parse_related(value: str) -> list[dict[str, str]]:
    links = []
    for line in lines(value):
        parts = [part.strip() for part in line.split("|")]
        if len(parts) >= 3:
            links.append({"kind": parts[0], "href": parts[1], "label": parts[2]})
        elif len(parts) == 2:
            links.append({"kind": "page", "href": parts[0], "label": parts[1]})
    return links


def parse_places(value: str) -> list[dict[str, str]]:
    places = []
    for line in lines(value):
        parts = split_pair(line)
        place = {"name": parts[0], "note": parts[1] if len(parts) > 1 else ""}
        if len(parts) > 2 and parts[2]:
            place["href"] = parts[2]
        places.append(place)
    return places


def parse_itinerary(value: str) -> list[dict[str, str]]:
    items = []
    for line in lines(value):
        parts = split_pair(line)
        items.append({"day": parts[0], "plan": parts[1] if len(parts) > 1 else ""})
    return items


def parse_episodes(value: str) -> list[dict[str, Any]]:
    items = []
    for line in lines(value):
        parts = split_pair(line)
        number = 0
        try:
            number = int(parts[0])
        except (TypeError, ValueError):
            number = len(items) + 1
        items.append(
            {
                "number": number,
                "title": parts[1] if len(parts) > 1 else "",
                "duration": parts[2] if len(parts) > 2 else "",
                "summary": parts[3] if len(parts) > 3 else "",
            }
        )
    return items


def parse_blog_body(value: str) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []
    heading = ""
    paras: list[str] = []

    def flush() -> None:
        nonlocal heading, paras
        cleaned = [p.strip() for p in paras if p.strip()]
        if heading or cleaned:
            item: dict[str, Any] = {"paragraphs": cleaned}
            if heading:
                item["heading"] = heading
            sections.append(item)
        heading = ""
        paras = []

    for raw in (value or "").splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            flush()
            heading = line[3:].strip()
        elif line.strip() == "":
            paras.append("")
        else:
            if paras and paras[-1] not in ("", None):
                paras[-1] = f"{paras[-1]} {line.strip()}".strip()
            else:
                if paras and paras[-1] == "":
                    paras[-1] = line.strip()
                else:
                    paras.append(line.strip())
    flush()
    return sections


def parse_paragraphs(value: str) -> list[str]:
    blocks = [block.strip() for block in (value or "").split("\n\n")]
    return [block for block in blocks if block]


def form_to_data(kind: Kind, form: dict[str, str]) -> dict[str, Any]:
    data: dict[str, Any] = {}
    for item in kind.fields:
        value = form.get(item.name)
        raw = "" if value is None else str(value).strip()
        if item.type == "lines":
            data[item.name] = lines(raw)
        elif item.type == "tags":
            data[item.name] = [part.strip() for part in raw.split(",") if part.strip()]
        elif item.type == "faqs":
            data[item.name] = parse_faqs(raw)
        elif item.type == "related":
            data[item.name] = parse_related(raw)
        elif item.type == "places":
            data[item.name] = parse_places(raw)
        elif item.type == "itinerary":
            data[item.name] = parse_itinerary(raw)
        elif item.type == "episodes":
            data[item.name] = parse_episodes(raw)
        elif item.type == "sections":
            data[item.name] = parse_blog_body(raw) if kind.key == "blog" else parse_spirituality_sections(raw)
        elif item.type == "paragraphs":
            data[item.name] = parse_paragraphs(raw)
        elif item.type == "number":
            try:
                data[item.name] = int(raw or "0")
            except ValueError:
                data[item.name] = 0
        elif item.name == "outOfStock":
            data[item.name] = as_yes_no(raw)
        else:
            data[item.name] = raw
    if kind.key == "yatra":
        data["category"] = data.get("yatraCategory") or data.get("category") or "destination"
    return data


def parse_spirituality_sections(value: str) -> list[dict[str, str]]:
    sections: list[dict[str, str]] = []
    heading = ""
    body_lines: list[str] = []

    def flush() -> None:
        nonlocal heading, body_lines
        text = "\n".join(body_lines).strip()
        if heading or text:
            sections.append({"heading": heading, "body": text})
        heading = ""
        body_lines = []

    for raw in (value or "").splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            flush()
            heading = line[3:].strip()
        else:
            body_lines.append(line)
    flush()
    return sections


def _safe_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, bytes):
        text = value.decode("utf-8", "replace")
    else:
        text = str(value)
    return text.encode("utf-8", "replace").decode("utf-8").replace("\x00", "")


def _plain(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        return " ".join(part for part in (_plain(item) for item in value) if part)
    if isinstance(value, dict):
        for key in ("text", "answer", "question", "body", "label", "name"):
            if key in value:
                return _plain(value.get(key))
        return ""
    return _safe_text(value).strip()


def _str_list(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value] if value.strip() else []
    if not isinstance(value, list):
        text = _plain(value)
        return [text] if text else []
    items: list[str] = []
    for item in value:
        if item is None:
            continue
        if isinstance(item, (dict, list)):
            text = _plain(item)
        else:
            text = _safe_text(item).strip()
        if text:
            items.append(text)
    return items


def _dict_list(value: Any) -> list[dict[str, Any]]:
    if isinstance(value, dict):
        for key in ("items", "faqs", "sections", "links"):
            nested = value.get(key)
            if isinstance(nested, list):
                value = nested
                break
        else:
            return [value]
    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, dict)]


def dump_field(item: Field, data: dict[str, Any]) -> str:
    try:
        value = data.get(item.name)
        if item.name == "yatraCategory":
            value = data.get("yatraCategory") or data.get("category") or "destination"
        if value is None:
            return ""
        if item.type == "lines":
            return "\n".join(_str_list(value))
        if item.type == "tags":
            return ", ".join(_str_list(value))
        if item.type == "faqs":
            return "\n".join(
                f"{_plain(faq.get('question'))} || {_plain(faq.get('answer'))}"
                for faq in _dict_list(value)
                if _plain(faq.get("question")) or _plain(faq.get("answer"))
            )
        if item.type == "related":
            return "\n".join(
                f"{_plain(link.get('kind')) or 'page'} | {_plain(link.get('href'))} | {_plain(link.get('label'))}"
                for link in _dict_list(value)
            )
        if item.type == "places":
            rows = []
            for place in _dict_list(value):
                href = _plain(place.get("href"))
                rows.append(f"{_plain(place.get('name'))} || {_plain(place.get('note'))} || {href}".rstrip(" |"))
            return "\n".join(rows)
        if item.type == "itinerary":
            return "\n".join(
                f"{_plain(row.get('day'))} || {_plain(row.get('plan'))}" for row in _dict_list(value)
            )
        if item.type == "episodes":
            return "\n".join(
                f"{_plain(row.get('number'))} || {_plain(row.get('title'))} || {_plain(row.get('duration'))} || {_plain(row.get('summary'))}"
                for row in _dict_list(value)
            )
        if item.type == "sections":
            if isinstance(value, str):
                return _safe_text(value)
            if isinstance(value, list) and value and not any(isinstance(item, dict) for item in value):
                return "\n\n".join(_str_list(value))
            chunks = []
            for section in _dict_list(value):
                heading = _plain(section.get("heading"))
                if heading:
                    chunks.append(f"## {heading}")
                if "paragraphs" in section:
                    chunks.append("\n\n".join(_str_list(section.get("paragraphs"))))
                else:
                    chunks.append(_plain(section.get("body")))
                chunks.append("")
            return "\n".join(chunks).strip()
        if item.type == "paragraphs":
            return "\n\n".join(_str_list(value))
        if item.name == "outOfStock":
            return as_yes_no(value)
        return _safe_text(value)
    except Exception:
        value = data.get(item.name) if isinstance(data, dict) else None
        return _safe_text(value) if isinstance(value, str) else ""


def empty_related() -> dict[str, list]:
    return {
        "relatedArticles": [],
        "relatedDestinations": [],
        "relatedTemples": [],
        "relatedMantras": [],
        "relatedFestivals": [],
        "relatedKatha": [],
    }


def bucket_related(links: Any) -> dict[str, list]:
    buckets = empty_related()
    for link in _dict_list(links):
        key = RELATED_BUCKETS.get(str(link.get("kind") or "page"), "relatedArticles")
        buckets[key].append(
            {"href": link.get("href", ""), "label": link.get("label", ""), "kind": link.get("kind", "page")}
        )
    return buckets


def public_page(
    kind: Kind, slug: str, status: str, data: dict[str, Any], locale: str = "en"
) -> dict[str, Any]:
    data = strip_hi_keys(apply_locale(data, locale))
    title = data.get("title") or data.get("h1") or data.get("name") or slug
    h1 = data.get("h1") or title
    related = bucket_related(data.get("related") or [])
    if kind.key == "yatra" and data.get("temples"):
        related["relatedTemples"] = data["temples"] if isinstance(data.get("temples"), list) else []
        if related["relatedTemples"] and isinstance(related["relatedTemples"][0], dict) and "label" not in related["relatedTemples"][0]:
            pass
    defaults = CTA_DEFAULTS["hi" if locale == "hi" else "en"]
    home_name = "होम" if locale == "hi" else "Home"
    cta = {
        "title": data.get("cta_title") or defaults["title"],
        "body": data.get("cta_body") or defaults["body"],
        "href": data.get("cta_href") or "/naam-jaap",
        "label": data.get("cta_label") or defaults["label"],
    }
    page: dict[str, Any] = {
        "slug": slug,
        "title": title,
        "seoTitle": data.get("seoTitle") or title,
        "metaDescription": data.get("metaDescription") or data.get("introduction") or title,
        "h1": h1,
        "introduction": data.get("introduction") or "",
        "heroImage": data.get("heroImage") or "",
        "heroImageAlt": data.get("heroImageAlt") or title,
        "category": data.get("category") or kind_crumb_name(kind, locale),
        "author": data.get("author") or "Bhakti Voice",
        "publishedAt": data.get("publishedAt") or today(),
        "updatedAt": data.get("updatedAt") or today(),
        "faqs": data.get("faqs") or [],
        "breadcrumbs": [
            {"name": home_name, "href": "/"},
            {"name": kind_crumb_name(kind, locale), "href": kind.path},
            {"name": title, "href": f"{kind.path}/{slug}"},
        ],
        "schemaType": kind.schema,
        "status": status,
        "cta": cta,
        **related,
    }
    extras = {key: value for key, value in data.items() if key not in page and not key.startswith("cta_")}
    if kind.key == "yatra":
        extras["category"] = data.get("yatraCategory") or data.get("category") or "destination"
        extras["filters"] = data.get("filters") or []
        extras["places"] = data.get("places") or []
        extras["temples"] = data.get("temples") or []
        extras["itinerary"] = data.get("itinerary") or []
        extras["nearby"] = data.get("nearby") or []
        extras["tips"] = data.get("tips") or []
        extras["destination"] = data.get("destination") or title
        extras["state"] = data.get("state") or ""
        extras["whyVisit"] = data.get("whyVisit") or ""
        extras["significance"] = data.get("significance") or ""
        extras["bestTime"] = data.get("bestTime") or ""
        extras["howToReach"] = data.get("howToReach") or ""
        extras["food"] = data.get("food") or ""
        extras["stay"] = data.get("stay") or ""
    if kind.key == "katha":
        extras["episodes"] = data.get("episodes") or []
        extras["subtitle"] = data.get("subtitle") or ""
        extras["language"] = data.get("language") or ""
        extras["duration"] = data.get("duration") or ""
        extras["rating"] = data.get("rating") or "0"
        extras["ratingsCount"] = data.get("ratingsCount") or "0"
    if kind.key == "blog":
        extras["excerpt"] = data.get("excerpt") or data.get("introduction") or ""
        extras["readingTime"] = data.get("readingTime") or ""
        extras["tags"] = data.get("tags") or []
        extras["body"] = data.get("body") or []
    if kind.key == "mantra":
        extras["howToChant"] = data.get("howToChant") or []
        extras["traditionalBenefits"] = data.get("traditionalBenefits") or []
        extras["mantra"] = data.get("mantra") or ""
        extras["pronunciation"] = data.get("pronunciation") or ""
        extras["suggestedCount"] = data.get("suggestedCount") or ""
        extras["deity"] = data.get("deity") or ""
        extras["significance"] = data.get("significance") or ""
    if kind.key == "temple":
        extras["nearbyPlaces"] = data.get("nearbyPlaces") or []
        extras["deity"] = data.get("deity") or ""
        extras["location"] = data.get("location") or ""
        extras["destinationSlug"] = data.get("destinationSlug") or ""
        extras["history"] = data.get("history") or ""
        extras["architecture"] = data.get("architecture") or ""
        extras["bestTime"] = data.get("bestTime") or ""
        extras["timingsNote"] = data.get("timingsNote") or ""
        extras["darshanNote"] = data.get("darshanNote") or ""
        extras["howToReach"] = data.get("howToReach") or ""
    if kind.key == "festival":
        extras["traditions"] = data.get("traditions") or []
        extras["monthHint"] = data.get("monthHint") or ""
        extras["dateNote"] = data.get("dateNote") or ""
        extras["story"] = data.get("story") or ""
        extras["puja"] = data.get("puja") or ""
    if kind.key in {"spirituality", "bhajan", "aarti"}:
        extras["sections"] = data.get("sections") or []
    if kind.key == "product":
        extras["name"] = data.get("name") or title
        try:
            extras["priceInr"] = int(data.get("priceInr") or 0)
        except (TypeError, ValueError):
            extras["priceInr"] = 0
        extras["categorySlug"] = data.get("categorySlug") or ""
        extras["description"] = data.get("description") or ""
        extras["outOfStock"] = as_yes_no(data.get("outOfStock")) == "yes"
        extras["category"] = data.get("categorySlug") or data.get("category") or ""
        page["breadcrumbs"] = [
            {"name": home_name, "href": "/"},
            {"name": "भंडार" if locale == "hi" else "Store", "href": "/bhakti-store"},
            {"name": extras["name"], "href": f"/bhakti-store/{slug}"},
        ]
    page.update(extras)
    return page


def public_simple(
    kind: Kind, slug: str, data: dict[str, Any], locale: str = "en"
) -> dict[str, Any]:
    data = strip_hi_keys(apply_locale(data, locale))
    if kind.key == "store_category":
        name = data.get("name") or slug
        return {
            "slug": slug,
            "name": name,
            "description": data.get("description") or "",
            "href": f"/bhakti-store/category/{slug}",
        }
    if kind.key == "community_group":
        return {
            "slug": slug,
            "name": data.get("name") or slug,
            "text": data.get("text") or "",
            "members": 0,
        }
    if kind.key == "sankalp_offer":
        return {
            "slug": slug,
            "title": data.get("title") or slug,
            "text": data.get("text") or "",
            "href": data.get("href") or "/daily-sadhana/sankalp",
        }
    if kind.key == "hub_seo":
        return {
            "slug": slug,
            "heading": data.get("heading") or "",
            "paragraphs": data.get("paragraphs") or [],
            "points": data.get("points") or [],
            "faqs": data.get("faqs") or [],
        }
    if kind.key == "quotes":
        return {
            "slug": slug,
            "text": data.get("text") or "",
            "attribution": data.get("attribution") or "",
        }
    return {"slug": slug, **strip_hi_keys(data)}

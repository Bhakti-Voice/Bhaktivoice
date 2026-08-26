from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT.parent / ".env")
load_dotenv(ROOT / ".env")

from db import get_db, turso_configured
from store import save_entry

DUMMY_PREFIX = "local-dev-"

DUMMY_ENTRIES: list[dict] = [
    {
        "kind": "katha",
        "slug": "local-dev-krishna-leela-katha-series-for-daily-listening",
        "data": {
            "title": "Krishna Leela (local sample)",
            "titleHi": "कृष्ण लीला (स्थानीय नमूना)",
            "h1": "Krishna Leela katha for daily listening",
            "h1Hi": "रोज़ सुनने के लिए कृष्ण लीला कथा",
            "seoTitle": "Krishna Leela katha series",
            "metaDescription": "A local-only sample katha series so listings are not empty while you build.",
            "introduction": "This is dummy katha for local development. Replace it from admin before you publish.",
            "introductionHi": "यह केवल लोकल विकास के लिए नमूना कथा है।",
            "heroImage": "/images/krishna-leela.png",
            "heroImageAlt": "Krishna leela illustration",
            "category": "Krishna",
            "categoryHi": "कृष्ण",
            "author": "Bhakti Voice",
            "publishedAt": "2026-01-01",
            "updatedAt": "2026-01-01",
            "faqs": [
                {"question": "Is this live content?", "answer": "No. It is local dummy data."},
            ],
            "faqsHi": [
                {"question": "क्या यह लाइव सामग्री है?", "answer": "नहीं। यह केवल लोकल नमूना है।"},
            ],
            "cta_title": "Start Naam Jaap",
            "cta_body": "After you listen, sit.",
            "cta_href": "/naam-jaap",
            "cta_label": "Start Jaap",
            "subtitle": "Sample series",
            "language": "Hindi / English",
            "duration": "12 min",
            "rating": "0",
            "ratingsCount": "0",
            "episodes": [
                {
                    "number": 1,
                    "title": "Makhan chor",
                    "duration": "12 min",
                    "summary": "A short sample episode for local preview.",
                }
            ],
            "episodesHi": [
                {
                    "number": 1,
                    "title": "माखन चोर",
                    "duration": "12 मिनट",
                    "summary": "लोकल पूर्वावलोकन के लिए छोटा नमूना प्रकरण।",
                }
            ],
        },
    },
    {
        "kind": "blog",
        "slug": "local-dev-how-to-sit-for-naam-jaap-bhakti-guide",
        "data": {
            "title": "How to sit for Naam Jaap (local sample)",
            "titleHi": "नाम जप के लिए कैसे बैठें (स्थानीय नमूना)",
            "h1": "How to sit for Naam Jaap",
            "seoTitle": "How to sit for Naam Jaap",
            "metaDescription": "Local sample blog post about sitting for naam jaap.",
            "introduction": "Dummy blog for local listings. Keep the spine straight and the count honest.",
            "introductionHi": "लोकल लिस्टिंग के लिए नमूना ब्लॉग।",
            "heroImage": "/images/jaap-mala.png",
            "heroImageAlt": "Tulsi jaap mala",
            "category": "Sadhana",
            "author": "Bhakti Voice",
            "publishedAt": "2026-01-02",
            "updatedAt": "2026-01-02",
            "excerpt": "A short local sample on sitting for jaap.",
            "readingTime": "4 min",
            "tags": ["naam jaap", "sadhana"],
            "body": [
                {
                    "heading": "Sit first",
                    "paragraphs": ["This paragraph is dummy copy for local development only."],
                }
            ],
            "bodyHi": [
                {
                    "heading": "पहले बैठें",
                    "paragraphs": ["यह अनुच्छेद केवल लोकल विकास के लिए है।"],
                }
            ],
            "related": [
                {"text": "Hanuman Chalisa", "url": "/chalisa/local-dev-hanuman-chalisa-lyrics-meaning-and-daily-path"},
                {"text": "Explore Katha", "url": "/katha-stories"},
                {"text": "Start Naam Jaap", "url": "/naam-jaap"},
            ],
            "cta_href": "/naam-jaap",
            "cta_label": "Start Jaap",
        },
    },
    {
        "kind": "yatra",
        "slug": "local-dev-vrindavan-sacred-yatra-travel-guide-for-pilgrims",
        "data": {
            "title": "Vrindavan yatra (local sample)",
            "titleHi": "वृन्दावन यात्रा (स्थानीय नमूना)",
            "h1": "Vrindavan sacred yatra guide",
            "seoTitle": "Vrindavan yatra guide",
            "metaDescription": "Local sample yatra page for Vrindavan listings.",
            "introduction": "Dummy yatra page. Confirm current travel advice before you go.",
            "heroImage": "/images/vrindavan-temple.png",
            "heroImageAlt": "Temple in Vrindavan",
            "category": "destination",
            "destination": "Vrindavan",
            "state": "Uttar Pradesh",
            "yatraCategory": "destination",
            "filters": ["Krishna Dham"],
            "whyVisit": "Sample copy for local preview of a Krishna dham listing.",
            "significance": "Replace this with sourced history before publishing.",
            "places": [{"name": "Parikrama marg", "note": "Walk with a local guide."}],
            "bestTime": "Ask recent pilgrims; seasons change.",
            "howToReach": "Confirm trains and local transport closer to travel dates.",
            "itinerary": [{"day": "Day 1", "plan": "Arrive and rest. Do not rush darshan."}],
            "nearby": ["Mathura"],
            "food": "Simple sattvic meals; ask locally.",
            "stay": "Book near the parikrama if you will walk at dawn.",
            "tips": ["Carry water.", "Keep evenings free for rest."],
            "cta_href": "/sacred-yatra-guides/planner",
            "cta_label": "Plan yatra",
        },
    },
    {
        "kind": "temple",
        "slug": "local-dev-krishna-temple-history-and-darshan-guide",
        "data": {
            "title": "Sample Krishna temple (local)",
            "titleHi": "नमूना कृष्ण मंदिर (स्थानीय)",
            "h1": "Sample Krishna temple darshan guide",
            "seoTitle": "Sample Krishna temple",
            "metaDescription": "Local dummy temple page. Timings are not published here.",
            "introduction": "Dummy temple listing. Do not treat this as a real schedule.",
            "heroImage": "/images/vrindavan-temple.png",
            "heroImageAlt": "Temple shikhar",
            "category": "Krishna",
            "deity": "Krishna",
            "location": "Vrindavan, Uttar Pradesh",
            "destinationSlug": "local-dev-vrindavan-sacred-yatra-travel-guide-for-pilgrims",
            "history": "Replace with sourced history before publishing.",
            "architecture": "Add only what you can verify.",
            "bestTime": "Ask locally; weather and festivals change the crowd.",
            "timingsNote": "Confirm current darshan hours with the temple before you visit. This sample does not publish timings.",
            "darshanNote": "Follow the temple's own queue and dress guidance.",
            "howToReach": "Confirm local autos and walking routes on the day you go.",
            "nearbyPlaces": ["Parikrama marg"],
            "cta_href": "/hindu-temples",
            "cta_label": "More temples",
        },
    },
    {
        "kind": "festival",
        "slug": "local-dev-janmashtami-hindu-festival-meaning-and-puja-guide",
        "data": {
            "title": "Janmashtami (local sample)",
            "titleHi": "जन्माष्टमी (स्थानीय नमूना)",
            "h1": "Janmashtami meaning and home puja",
            "seoTitle": "Janmashtami guide",
            "metaDescription": "Local sample festival page for Janmashtami listings.",
            "introduction": "Dummy festival page. Use a real panchang for the date each year.",
            "heroImage": "/images/krishna-hero.png",
            "heroImageAlt": "Krishna with flute",
            "category": "Krishna",
            "monthHint": "Bhadrapada / August–September",
            "dateNote": "The tithi moves each year. Check Aaj Ki Tithi rather than a fixed calendar date.",
            "story": "Sample story paragraph for local preview only.",
            "traditions": ["Night jaagran", "Bhajan"],
            "puja": "Keep the home puja simple. Follow your family custom.",
            "cta_href": "/aaj-ki-tithi",
            "cta_label": "Aaj ki tithi",
        },
    },
    {
        "kind": "spirituality",
        "slug": "local-dev-bhakti-for-householders-spiritual-knowledge-guide",
        "data": {
            "title": "Bhakti for householders (local sample)",
            "titleHi": "गृहस्थों के लिए भक्ति (स्थानीय नमूना)",
            "h1": "Bhakti in a householder's day",
            "seoTitle": "Bhakti for householders",
            "metaDescription": "Local sample spirituality article.",
            "introduction": "Dummy article so the spiritual knowledge list has one card locally.",
            "heroImage": "/images/diyas.png",
            "heroImageAlt": "Lit diyas",
            "category": "Sadhana",
            "sections": [{"heading": "Keep a small seat", "body": "Dummy section for local preview."}],
            "sectionsHi": [{"heading": "एक छोटी सी आसन रखें", "body": "लोकल पूर्वावलोकन के लिए नमूना खंड।"}],
            "cta_href": "/daily-sadhana",
            "cta_label": "Daily sadhana",
        },
    },
    {
        "kind": "mantra",
        "slug": "local-dev-hare-krishna-mantra-meaning-pronunciation-and-naam-jaap",
        "data": {
            "title": "Hare Krishna (local sample)",
            "titleHi": "हरे कृष्ण (स्थानीय नमूना)",
            "h1": "Hare Krishna mantra for naam jaap",
            "seoTitle": "Hare Krishna mantra",
            "metaDescription": "Local sample mantra page for naam jaap listings.",
            "introduction": "Dummy mantra page for local jaap and listing previews.",
            "heroImage": "/images/krishna-pankh.png",
            "heroImageAlt": "Peacock feather",
            "category": "Krishna",
            "mantra": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
            "pronunciation": "Hare Krishna Hare Krishna Krishna Krishna Hare Hare",
            "suggestedCount": "108",
            "deity": "Krishna",
            "howToChant": ["Sit.", "Keep a mala.", "Do not rush."],
            "significance": "Sample paragraph. Replace with a sourced explanation before publishing.",
            "traditionalBenefits": ["Keeps the tongue in naam."],
            "cta_href": "/naam-jaap",
            "cta_label": "Start Jaap",
        },
    },
    {
        "kind": "store_category",
        "slug": "local-dev-malas",
        "data": {
            "name": "Malas (local)",
            "nameHi": "माला (स्थानीय)",
            "description": "Local sample store category for malas.",
            "descriptionHi": "माला के लिए लोकल नमूना श्रेणी।",
        },
    },
    {
        "kind": "product",
        "slug": "local-dev-tulsi-jaap-mala-sacred-item-for-daily-sadhana",
        "data": {
            "title": "Tulsi jaap mala (local sample)",
            "titleHi": "तुलसी जप माला (स्थानीय नमूना)",
            "h1": "Tulsi jaap mala",
            "seoTitle": "Tulsi jaap mala",
            "metaDescription": "Local sample store product.",
            "introduction": "Dummy product for the local store grid.",
            "heroImage": "/images/tulsi-mala.png",
            "heroImageAlt": "Tulsi mala",
            "category": "Malas",
            "name": "Tulsi jaap mala",
            "nameHi": "तुलसी जप माला",
            "priceInr": 251,
            "categorySlug": "local-dev-malas",
            "outOfStock": "no",
            "description": "Sample product. Not for sale on production.",
            "cta_href": "/bhakti-store",
            "cta_label": "Store",
        },
    },
    {
        "kind": "community_group",
        "slug": "local-dev-dawn-jaap-circle",
        "data": {
            "name": "Dawn jaap circle (local)",
            "nameHi": "प्रभात जप मंडल (स्थानीय)",
            "text": "Dummy community group for local preview.",
            "textHi": "लोकल पूर्वावलोकन के लिए नमूना समुदाय समूह।",
        },
    },
    {
        "kind": "sankalp_offer",
        "slug": "local-dev-forty-day-naam-jaap",
        "data": {
            "title": "40-day naam jaap (local)",
            "titleHi": "चालीस दिन का नाम जप (स्थानीय)",
            "text": "Dummy sankalp card for local sadhana pages.",
            "textHi": "लोकल साधना पृष्ठों के लिए नमूना संकल्प।",
            "href": "/naam-jaap",
        },
    },
    {
        "kind": "quotes",
        "slug": "bhakti-is-the-purest-form-of-love",
        "data": {
            "text": "Bhakti is the purest form of love — a path that turns every breath into prayer.",
            "textHi": "भक्ति प्रेम का सबसे शुद्ध रूप है — हर श्वास को प्रार्थना बनाने वाला मार्ग।",
            "attribution": "Lord Krishna",
            "attributionHi": "भगवान कृष्ण",
        },
    },
    {
        "kind": "hub_seo",
        "slug": "home",
        "data": {
            "heading": "Bhakti Voice (local sample hub)",
            "headingHi": "भक्ति वॉइस (स्थानीय नमूना)",
            "paragraphs": ["Dummy hub SEO block so the home page has a sample footer essay locally."],
            "paragraphsHi": ["होम पेज के लिए लोकल नमूना लेख।"],
            "points": ["Chant.", "Read katha.", "Return tomorrow."],
            "faqs": [
                {"question": "Is this production copy?", "answer": "No. Local dummy only."},
            ],
        },
    },
    {
        "kind": "bhajan",
        "slug": "local-dev-achutam-keshavam-bhajan-and-kirtan-lyrics-with-meaning",
        "data": {
            "title": "Achyutam Keshavam (local sample)",
            "titleHi": "अच्युतम केशवम् (स्थानीय नमूना)",
            "h1": "Achyutam Keshavam lyrics",
            "seoTitle": "Achyutam Keshavam",
            "metaDescription": "Local sample bhajan page.",
            "introduction": "Dummy bhajan listing for local preview.",
            "heroImage": "/images/krishna-hero.png",
            "heroImageAlt": "Krishna",
            "category": "Krishna",
            "sections": [{"heading": "Lyrics", "body": "Sample lines only. Add authentic lyrics before publishing."}],
            "cta_href": "/bhajan-and-kirtan",
            "cta_label": "More bhajans",
        },
    },
    {
        "kind": "aarti",
        "slug": "local-dev-om-jai-jagadish-hare-aarti-lyrics-meaning-and-evening-prayer",
        "data": {
            "title": "Om Jai Jagdish Hare (local sample)",
            "titleHi": "ॐ जय जगदीश हरे (स्थानीय नमूना)",
            "h1": "Om Jai Jagdish Hare aarti",
            "seoTitle": "Om Jai Jagdish Hare",
            "metaDescription": "Local sample aarti page.",
            "introduction": "Dummy aarti listing for local preview.",
            "heroImage": "/images/puja-thali.png",
            "heroImageAlt": "Puja thali",
            "category": "Evening",
            "sections": [{"heading": "Aarti", "body": "Sample lines only. Add authentic aarti text before publishing."}],
            "cta_href": "/aarti-chants",
            "cta_label": "More aartis",
        },
    },
    {
        "kind": "chalisa",
        "slug": "local-dev-hanuman-chalisa-lyrics-meaning-and-daily-path",
        "data": {
            "title": "Hanuman Chalisa (local sample)",
            "titleHi": "हनुमान चालीसा (स्थानीय नमूना)",
            "h1": "Hanuman Chalisa",
            "seoTitle": "Hanuman Chalisa",
            "metaDescription": "Local sample chalisa page.",
            "introduction": "Dummy chalisa listing for local preview.",
            "heroImage": "/images/hanuman-thumb.png",
            "heroImageAlt": "Hanuman",
            "category": "Hanuman",
            "sections": [{"heading": "Chalisa", "body": "Sample lines only. Add authentic chalisa text before publishing."}],
            "cta_href": "/chalisa",
            "cta_label": "More chalisas",
        },
    },
]


def can_seed_local() -> bool:
    if os.environ.get("VERCEL"):
        return False
    if turso_configured():
        return False
    return True


def seed_if_empty() -> int:
    if not can_seed_local():
        return 0
    row = get_db().fetchone("SELECT COUNT(*) AS total FROM cms_entries")
    total = int(row["total"] if row else 0)
    if total > 0:
        return 0
    return seed_dummies()


def seed_dummies() -> int:
    if not can_seed_local():
        raise RuntimeError("Local seed refuses Turso and Vercel. It only writes backend/data/bhakti.db.")
    conn = get_db()
    conn.execute("DELETE FROM cms_entries WHERE slug LIKE 'local-dev-%'")
    conn.execute("DELETE FROM cms_entries WHERE kind = 'hub_seo' AND slug = 'home'")
    count = 0
    for item in DUMMY_ENTRIES:
        save_entry(item["kind"], item["data"], slug=item["slug"], status="published")
        count += 1
    return count


if __name__ == "__main__":
    if not can_seed_local():
        print("Refusing to seed: Turso is configured or this is Vercel. Local SQLite only.")
        raise SystemExit(1)
    written = seed_dummies()
    print(f"Wrote {written} local dummy entries to SQLite.")

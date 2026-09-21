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
            "related_link": "no",
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
    {
        "kind": "angel_number",
        "slug": "angel-number-500",
        "data": {
            "number": "500",
            "title": "Angel Number 500 Meaning & Spiritual Significance",
            "titleHi": "एंजेल नंबर 500 का अर्थ एवं आध्यात्मिक महत्व",
            "h1": "Angel Number 500 Meaning: Change, Freedom & New Beginnings",
            "seoTitle": "Angel Number 500 Meaning, Spiritual Symbolism & Twin Flame",
            "metaDescription": "Discover the divine message behind Angel Number 500. A powerful sign of positive transformation, freedom, spiritual evolution, and trust in the universe.",
            "introduction": "Angel Number 500 is a celestial reminder that massive shifts and transformative opportunities are aligning in your favor. When this number appears repeatedly in your daily awareness, your spirit guides and angels are urging you to let go of self-doubt and step boldly into your personal freedom.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-11",
            "updatedAt": "2026-08-11",
            "excerpt": "A powerful sign of change, freedom, and new beginnings guiding your life toward divine harmony.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "Numerology", "Spiritual Guidance", "500"],
            "body": [
                {
                    "heading": "The Core Spiritual Meaning of Angel Number 500",
                    "paragraphs": [
                        "Angel Number 500 combines the adventurous, progressive vibration of the number 5 with the infinite, amplifying energy of double 0 (00). In sacred numerology, the digit 5 represents courage, adaptability, freedom, and life lessons learned through direct experience.",
                        "Meanwhile, the number 0 resonates with eternity, wholeness, infinite cycles, and oneness with the divine Creator. When doubled as 00, it exponentially magnifies the energetic signature of the preceding number 5, signaling that life-altering transitions are being orchestrated with divine precision."
                    ]
                },
                {
                    "heading": "Love, Twin Flames & Relationships",
                    "paragraphs": [
                        "In heart-centered matters, seeing 500 suggests a time for honest emotional expression and breaking free from repetitive karmic cycles. If you have felt restricted in your partnerships, this number brings refreshing clarity.",
                        "For twin flames, Angel Number 500 signifies a pivotal phase of inner preparation. True union begins when both souls acknowledge their personal sovereignty while surrendering fear to divine timing."
                    ]
                },
                {
                    "heading": "Career, Purpose & Abundance",
                    "paragraphs": [
                        "Professionally, 500 encourages bold innovation. If you have contemplated launching a creative pursuit, shifting your vocational trajectory, or embracing lifelong learning, the celestial realm confirms that the horizon is wide open.",
                        "Trust your instincts over skepticism. The universe honors those who take grounded risks aligned with their higher values."
                    ]
                },
                {
                    "heading": "What To Do When You Keep Seeing 500",
                    "paragraphs": [
                        "1. Stay centered through prayer, meditation, or daily naam jaap to calm the thinking mind.",
                        "2. Welcome unexpected invitations, opportunities, or synchronicities without rigid resistance.",
                        "3. Release old habits, self-limiting agreements, and outdated environments that no longer nourish your spiritual peace."
                    ]
                }
            ],
            "faqs": [
                {"question": "What does Angel Number 500 mean spiritually?", "answer": "Angel Number 500 spiritually symbolizes freedom, divine trust, and profound positive life shifts supported by the universal energy."},
                {"question": "Why do I keep seeing 500 on clocks or receipts?", "answer": "Repeated sightings of 500 signify that your guardian angels are drawing your attention to embrace upcoming transitions without anxiety."},
                {"question": "What is the numerological reduction of 500?", "answer": "5 + 0 + 0 = 5. Its core vibrational essence is the adventurous, adaptable energy of 5, magnified by the infinite divine potential of zero."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-499",
        "data": {
            "number": "499",
            "title": "Angel Number 499 Meaning & Divine Timing",
            "titleHi": "एंजेल नंबर 499 का अर्थ एवं दिव्य समय",
            "h1": "Angel Number 499 Meaning: Trust Divine Timing & Soul Purpose",
            "seoTitle": "Angel Number 499 Meaning: Complete Your Mission with Grace",
            "metaDescription": "Angel Number 499 brings guidance to complete past chapters and trust divine timing. Learn how 4 and 9 inspire your spiritual journey.",
            "introduction": "A message to trust divine timing and stay aligned with your soul mission. Angel Number 499 signals that a significant cycle in your life is drawing to a fruitful conclusion, creating space for elevated spiritual work.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-11",
            "updatedAt": "2026-08-11",
            "excerpt": "A message to trust divine timing and stay aligned with your soul mission as old chapters close peacefully.",
            "readingTime": "4 min",
            "tags": ["Angel Numbers", "499", "Soul Mission", "Divine Timing"],
            "body": [
                {
                    "heading": "The Meaning of Digits 4 and 9",
                    "paragraphs": [
                        "Angel Number 499 carries the steady, disciplined foundation of the number 4 alongside the humanitarian, compassionate closure of double 9 (99). The number 4 grounds you in practical devotion, patience, and integrity.",
                        "The double 99 signifies completion, humanitarian service, and spiritual maturity. It asks you to tie up loose ends gracefully, forgiving past grievances and blessing the path behind you."
                    ]
                }
            ],
            "faqs": [
                {"question": "What should I do if I see 499?", "answer": "Focus on bringing unfinished endeavors to completion with pride, maintaining calm faith that higher opportunities are already preparing to greet you."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-498",
        "data": {
            "number": "498",
            "title": "Angel Number 498 Meaning & Spiritual Support",
            "titleHi": "एंजेल नंबर 498 का अर्थ एवं ब्रह्मांडीय संबल",
            "h1": "Angel Number 498 Meaning: Supported Through Every Transition",
            "seoTitle": "Angel Number 498 Meaning: Abundance & Steadfast Guidance",
            "metaDescription": "Angel Number 498 serves as a celestial reassurance of unending support. Explore the union of 4, 9, and 8 in your spiritual journey.",
            "introduction": "A reminder that you are supported through every transition. The angels reassure you that as you honor your duties and release fear of scarcity, the universe fulfills all practical necessities with abundance.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-11",
            "updatedAt": "2026-08-11",
            "excerpt": "A reminder that you are supported through every transition and life change with divine abundance.",
            "readingTime": "4 min",
            "tags": ["Angel Numbers", "498", "Abundance", "Support"],
            "body": [
                {
                    "heading": "The Vibration of 4, 9, and 8",
                    "paragraphs": [
                        "In 498, the stability of 4 connects with the spiritual wisdom of 9 and the prosperous abundance of 8. This triadic vibration balances earthly effort with cosmic surrender."
                    ]
                }
            ],
            "faqs": [
                {"question": "What does 498 mean for career?", "answer": "It signifies that your past disciplined efforts are culminating in stable rewards and renewed spiritual purpose."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-497",
        "data": {
            "number": "497",
            "title": "Angel Number 497 Meaning & Inner Wisdom",
            "titleHi": "एंजेल नंबर 497 का अर्थ एवं आंतरिक प्रज्ञा",
            "h1": "Angel Number 497 Meaning: Embrace Spiritual Growth & Inner Truth",
            "seoTitle": "Angel Number 497 Meaning: Deep Insight & Intuitive Awakening",
            "metaDescription": "Angel Number 497 is an invitation to look within and trust your spiritual intuition as profound personal growth takes root.",
            "introduction": "A sign to embrace spiritual growth and inner wisdom. The divine guides congratulate you on walking your path with sincerity and discernment.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-11",
            "updatedAt": "2026-08-11",
            "excerpt": "A sign to embrace spiritual growth, contemplation, and inner wisdom as new doors open before you.",
            "readingTime": "4 min",
            "tags": ["Angel Numbers", "497", "Inner Wisdom", "Spiritual Path"],
            "body": [
                {
                    "heading": "Mystical Wisdom of the Number 7",
                    "paragraphs": [
                        "The appearance of 7 in 497 illuminates the contemplative mind. It encourages daily study of sacred texts, mindful silence, and honoring your inner compass."
                    ]
                }
            ],
            "faqs": [
                {"question": "What is the message of 497?", "answer": "Deepen your connection to your higher self and trust the quiet knowing that guides your next decision."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-555",
        "data": {
            "number": "555",
            "title": "Angel Number 555 Meaning & Monumental Transformation",
            "titleHi": "एंजेल नंबर 555 का अर्थ एवं महान परिवर्तन",
            "h1": "Angel Number 555 Meaning: Monumental Shifts & Spiritual Liberation",
            "seoTitle": "Angel Number 555 Meaning: Major Changes, Love & Twin Flame",
            "metaDescription": "Seeing Angel Number 555 everywhere? Discover the transformative energy of 555: major life shifts, soul growth, love, and divine readiness.",
            "introduction": "Angel Number 555 is among the most famous and potent cosmic codes. Triple five heralds rapid transformation, personal expansion, and an awakening to living with authenticity and freedom.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-10",
            "updatedAt": "2026-08-10",
            "excerpt": "A monumental signal that major, positive transformations are unfolding rapidly across your life path.",
            "readingTime": "6 min",
            "tags": ["Angel Numbers", "555", "Spiritual Growth", "Divine Guidance", "Life Changes"],
            "body": [
                {
                    "heading": "The Triple Vibration of 555",
                    "paragraphs": [
                        "When 5 appears three times, change is not just incremental — it is foundational. Old frameworks that no longer serve your dharma are dissolving so that authentic joy can flourish. Do not resist change with apprehension; view it as an answered prayer. The divine removes obstacles so you can spread your wings."
                    ]
                },
                {
                    "heading": "Twin Flames and Soul Connections in 555",
                    "paragraphs": [
                        "In twin flame numerology, 555 signifies dynamic shifts. Either an emotional breakthrough is occurring, or communication between mirrors is reaching a higher octave of mutual respect and spiritual unity."
                    ]
                }
            ],
            "faqs": [
                {"question": "Why do I keep seeing 555 on the clock?", "answer": "Seeing 555 repeatedly on the clock is a divine synchronicity reminding you that major positive shifts are in motion and that your guardian angels are guiding every step."},
                {"question": "What does 555 mean in love and relationships?", "answer": "In relationships, 555 brings renewal, honesty, and emotional evolution. It signifies letting go of stagnant patterns and welcoming greater soul alignment and intimacy."},
                {"question": "Is 555 a sign to make a big life change?", "answer": "Yes, 555 is the universal green light for career, creative, or lifestyle changes. It assures you that stepping courageously into the unknown is divinely protected."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-777",
        "data": {
            "number": "777",
            "title": "Angel Number 777 Meaning & Spiritual Awakening",
            "titleHi": "एंजेल नंबर 777 का अर्थ एवं आध्यात्मिक जागरण",
            "h1": "Angel Number 777 Meaning: Pure Divine Luck & Cosmic Alignment",
            "seoTitle": "Angel Number 777 Meaning: Divine Wisdom, Awakening & Miracles",
            "metaDescription": "Angel Number 777 is a sacred blessing of alignment and higher consciousness. Understand the mystical power of 777 in your life.",
            "introduction": "Angel Number 777 is a radiant confirmation that you are in perfect alignment with universal wisdom. Miracles, spiritual deepening, and auspicious guidance surround you.",
            "category": "Angel Number",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-09",
            "updatedAt": "2026-08-09",
            "excerpt": "A deeply mystical message that you are in perfect alignment with universal wisdom and divine grace.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "777", "Awakening", "Miracles"],
            "body": [
                {
                    "heading": "The Sacred Geometry of 777",
                    "paragraphs": [
                        "In spiritual traditions worldwide, seven represents completion, mystical illumination, and the bridge between human awareness and divine truth. Triple seven indicates that your inner prayers have been heard and are bearing fruit."
                    ]
                }
            ],
            "faqs": [
                {"question": "Is 777 lucky?", "answer": "Yes, 777 is traditionally known as an extremely auspicious and blessed number indicating divine approval and alignment."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-1111",
        "data": {
            "number": "1111",
            "title": "Angel Number 1111 Meaning & Spiritual Awakening Portal",
            "titleHi": "एंजेल नंबर 1111 का अर्थ एवं आध्यात्मिक जागरण",
            "h1": "Angel Number 1111 Meaning: A Powerful Portal for Manifestation & Spiritual Awakening",
            "seoTitle": "Angel Number 1111 Meaning: Twin Flame, Awakening & Manifestation",
            "metaDescription": "Keep seeing Angel Number 1111? Discover the spiritual meaning of 1111, its connection to twin flames, manifestation, and your soul purpose.",
            "introduction": "Seeing Angel Number 1111 is a powerful wake-up call from the universe. This unique sequence of ones acts as a cosmic doorway, signaling spiritual awakening, rapid manifestation, and the alignment of your deepest desires.",
            "category": "Awakening",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-15",
            "updatedAt": "2026-08-15",
            "excerpt": "A powerful spiritual wake-up call and manifestation portal, signaling that your thoughts are rapidly creating your reality.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "1111", "Manifestation", "Spiritual Awakening", "Twin Flame"],
            "body": [
                {
                    "heading": "The Awakening Portal of 1111",
                    "paragraphs": [
                        "Angel Number 1111 is traditionally called the master manifestation number. When you notice 11:11 or 1111, your consciousness is aligning directly with higher spiritual frequencies.",
                        "Monitor your thoughts carefully during this time. Choose optimism and gratitude, because whatever energy you radiate is returning to you accelerated."
                    ]
                },
                {
                    "heading": "1111 in Love and Twin Flames",
                    "paragraphs": [
                        "In love, 1111 is celebrated as the premier twin flame synchronicity. It signifies energetic convergence, soul recognition, and mutual awakening between dual souls."
                    ]
                }
            ],
            "faqs": [
                {"question": "What does 1111 mean spiritually?", "answer": "1111 is a direct signal of spiritual awakening, alignment with your life mission, and accelerated manifestation."},
                {"question": "Why do I see 11:11 on clocks?", "answer": "Seeing 11:11 prompts conscious presence, encouraging you to step out of auto-pilot and align with your true inner calling."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-888",
        "data": {
            "number": "888",
            "title": "Angel Number 888 Meaning & Infinite Abundance",
            "titleHi": "एंजेल नंबर 888 का अर्थ एवं असीम समृद्धि",
            "h1": "Angel Number 888 Meaning: Infinite Abundance, Karmic Reward & Success",
            "seoTitle": "Angel Number 888 Meaning: Wealth, Karma & Spiritual Abundance",
            "metaDescription": "Angel Number 888 is a sign of financial stability, karmic rewards, and infinite abundance. Learn what seeing 888 means for your career and spirit.",
            "introduction": "Angel Number 888 is the sacred sequence of infinite abundance. Representing the infinity symbol standing tall, it confirms that your past efforts, spiritual dedication, and patience are manifesting rich harvests.",
            "category": "Abundance",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-12",
            "updatedAt": "2026-08-12",
            "excerpt": "A divine confirmation of infinite abundance, prosperity, and karmic rewards flowing into your life.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "888", "Abundance", "Karma", "Wealth"],
            "body": [
                {
                    "heading": "The Law of Karmic Return in 888",
                    "paragraphs": [
                        "The number 8 governs the universal law of cause and effect. Triple eight indicates that cycles of lack or struggle are reaching completion, paving the way for material and spiritual stability."
                    ]
                }
            ],
            "faqs": [
                {"question": "Is 888 a money number?", "answer": "Yes, 888 is strongly connected to financial abundance, successful ventures, and the fruition of disciplined effort."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-444",
        "data": {
            "number": "444",
            "title": "Angel Number 444 Meaning & Divine Protection",
            "titleHi": "एंजेल नंबर 444 का अर्थ एवं दैवीय सुरक्षा",
            "h1": "Angel Number 444 Meaning: Solid Foundation, Protection & Guardian Care",
            "seoTitle": "Angel Number 444 Meaning: Protection, Guidance & Peace",
            "metaDescription": "Discover the comforting power of Angel Number 444. A direct sign that angels surround you with unconditional protection and guidance.",
            "introduction": "Angel Number 444 brings peaceful reassurance that you are fully enveloped in divine protection. When fear or uncertainty strikes, 444 reminds you that your foundation is unshakeable.",
            "category": "Protection",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-03",
            "updatedAt": "2026-08-03",
            "excerpt": "A sign of protection, stability, and divine support during times of change and testing.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "444", "Protection", "Stability"],
            "body": [
                {
                    "heading": "Surrounded by Celestial Guardians",
                    "paragraphs": [
                        "Four is the number of the compass directions, the four elements, and enduring structure. Triple 4 signals that divine guardians are standing with you through every challenge."
                    ]
                }
            ],
            "faqs": [
                {"question": "What does 444 mean?", "answer": "444 confirms divine protection, grounding energy, and reassurance that all is well in your journey."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-333",
        "data": {
            "number": "333",
            "title": "Angel Number 333 Meaning & Spiritual Mentorship",
            "titleHi": "एंजेल नंबर 333 का अर्थ एवं आत्मिक मार्गदर्शन",
            "h1": "Angel Number 333 Meaning: Growth, Creation & Ascended Masters",
            "seoTitle": "Angel Number 333 Meaning: Creative Power & Divine Grace",
            "metaDescription": "Seeing 333 repeatedly? Learn how Angel Number 333 connects you to spiritual guides, creative expression, and soul expansion.",
            "introduction": "Angel Number 333 resonates with the holy trinity, creative vitality, and the loving presence of spiritual guides. It encourages you to express your authentic voice with joyful confidence.",
            "category": "Awakening",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-08-02",
            "updatedAt": "2026-08-02",
            "excerpt": "A sign of expansion, creative flow, and close communion with enlightened spiritual guides.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "333", "Mentors", "Creativity"],
            "body": [
                {
                    "heading": "The Power of the Divine Trinity",
                    "paragraphs": [
                        "Three unites mind, body, and spirit. Triple three invites you to integrate your contemplation with daily action, speaking your truth without hesitation."
                    ]
                }
            ],
            "faqs": [
                {"question": "What is the message of 333?", "answer": "333 is an affirmation of creative expansion and reassurance that enlightened mentors are guiding your path."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-222",
        "data": {
            "number": "222",
            "title": "Angel Number 222 Meaning & Harmony in Love",
            "titleHi": "एंजेल नंबर 222 का अर्थ एवं संबंधों में सामंजस्य",
            "h1": "Angel Number 222 Meaning: Balance, Trust & Relationship Harmony",
            "seoTitle": "Angel Number 222 Meaning: Love, Patience & Peaceful Alignment",
            "metaDescription": "Angel Number 222 brings harmony and divine patience. Learn the spiritual meaning of 222 in love, relationships, and life choices.",
            "introduction": "Angel Number 222 reminds you that everything is falling into place according to divine order. Practice patience, nurture your relationships, and maintain unwavering faith.",
            "category": "Love & Mission",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-07-30",
            "updatedAt": "2026-07-30",
            "excerpt": "A gentle reminder to maintain peace, trust the process, and nurture balance in your relationships.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "222", "Harmony", "Love", "Balance"],
            "body": [
                {
                    "heading": "Cultivating Equanimity with 222",
                    "paragraphs": [
                        "The energy of 2 is cooperation, partnership, and duality resolved in peace. Triple two assures you that what you planted in faith is quietly taking root."
                    ]
                }
            ],
            "faqs": [
                {"question": "What does 222 mean in love?", "answer": "In love, 222 signifies mutual healing, honest communication, and deep emotional harmony."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-111",
        "data": {
            "number": "111",
            "title": "Angel Number 111 Meaning & Fresh Beginnings",
            "titleHi": "एंजेल नंबर 111 का अर्थ एवं नई शुरुआत",
            "h1": "Angel Number 111 Meaning: Pure Intention & Conscious Manifestation",
            "seoTitle": "Angel Number 111 Meaning: New Beginnings & Positive Mindset",
            "metaDescription": "Discover the manifestation power of Angel Number 111. Learn why 111 asks you to align your thoughts with your highest spiritual goals.",
            "introduction": "Angel Number 111 represents an open cosmic gateway where your thoughts materialize rapidly. Guard your mind with sattvic positivity and embrace fresh starts.",
            "category": "Awakening",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-07-28",
            "updatedAt": "2026-07-28",
            "excerpt": "A powerful sign of new beginnings, manifestation, and rapid thought creation aligning with your soul.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "111", "New Beginnings", "Manifestation"],
            "body": [
                {
                    "heading": "The Awakening of Number 1",
                    "paragraphs": [
                        "One is the seed of all numbers. Triple one marks the start of a profound personal chapter where your leadership and unique light are needed."
                    ]
                }
            ],
            "faqs": [
                {"question": "What should I do when I see 111?", "answer": "Direct your attention toward gratitude and clear intentions, releasing worry or cynicism."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-999",
        "data": {
            "number": "999",
            "title": "Angel Number 999 Meaning & Sacred Completion",
            "titleHi": "एंजेल नंबर 999 का अर्थ एवं पवित्र पूर्णता",
            "h1": "Angel Number 999 Meaning: End of a Cycle & Spiritual Graduation",
            "seoTitle": "Angel Number 999 Meaning: Closure, Release & Higher Calling",
            "metaDescription": "Angel Number 999 marks the completion of a major karmic cycle. Learn how to release the old and step into your higher calling.",
            "introduction": "Angel Number 999 signals that a significant phase of your life has come to its natural completion. Welcome closure with peace and prepare for a higher octave of service.",
            "category": "Transformation",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-07-25",
            "updatedAt": "2026-07-25",
            "excerpt": "A profound marker of spiritual completion, release of outworn karma, and readiness for a higher calling.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "999", "Completion", "Karma"],
            "body": [
                {
                    "heading": "Releasing What Has Served Its Purpose",
                    "paragraphs": [
                        "Nine represents the highest single digit of spiritual maturity. Triple nine encourages you to forgive the past, release resentment, and step into selflessness."
                    ]
                }
            ],
            "faqs": [
                {"question": "Does 999 mean something bad is ending?", "answer": "No, 999 indicates a necessary and blessed graduation into higher wisdom, peace, and new purpose."}
            ]
        }
    },
    {
        "kind": "angel_number",
        "slug": "angel-number-1212",
        "data": {
            "number": "1212",
            "title": "Angel Number 1212 Meaning & Spiritual Harmony",
            "titleHi": "एंजेल नंबर 1212 का अर्थ एवं दिव्य संतुलन",
            "h1": "Angel Number 1212 Meaning: Stepping Out of Comfort Zones in Faith",
            "seoTitle": "Angel Number 1212 Meaning: Courage, Alignment & Renewal",
            "metaDescription": "Angel Number 1212 encourages you to stay positive and pursue your divine life mission with courage and balanced faith.",
            "introduction": "Angel Number 1212 pairs the pioneering energy of 1 with the cooperative grace of 2, duplicated twice. It encourages you to step beyond comfort zones with trust in divine timing.",
            "category": "Love & Mission",
            "author": "Bhakti Voice Spiritual Desk",
            "publishedAt": "2026-07-20",
            "updatedAt": "2026-07-20",
            "excerpt": "A divine reminder to leave comfort zones, nurture peace, and walk steadfastly toward your higher mission.",
            "readingTime": "5 min",
            "tags": ["Angel Numbers", "1212", "Courage", "Alignment"],
            "body": [
                {
                    "heading": "The Harmonious Dance of 1 and 2",
                    "paragraphs": [
                        "Twelve signifies completion of cycles (12 months, 12 zodiac signs). 1212 brings renewal, spiritual elevation, and divine teamwork."
                    ]
                }
            ],
            "faqs": [
                {"question": "Why do I keep seeing 12:12 on clocks?", "answer": "12:12 asks you to keep your thoughts focused on your aspirations and trust that universal currents are supporting your growth."}
            ]
        }
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
    conn.execute("DELETE FROM cms_entries WHERE kind = 'angel_number'")
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

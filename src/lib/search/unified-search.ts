import { getGitaChapters, getGitaChapter } from "@/lib/gita/storage";
import { getAllFestivalSlugs } from "@/lib/panchang/engine";
import { PATHS } from "@/lib/seo/paths";
import type { SearchHit } from "@/lib/cms/client";

export type DirectDevotionalAnswer = {
  title: string;
  sanskrit?: string;
  meaning: string;
  significance: string;
  source: string;
  sourceUrl: string;
  category: "Gita Shloka" | "Mantra" | "Panchang" | "Chalisa" | "Spiritual Tool";
};

export type UnifiedSearchResult = {
  results: SearchHit[];
  directAnswer?: DirectDevotionalAnswer | null;
  total: number;
};

// Curated authentic direct answers for high-frequency devotee queries
const DIRECT_ANSWERS: Record<string, DirectDevotionalAnswer> = {
  "gita 2.47": {
    title: "Bhagavad Gita 2.47 — Nishkama Karma",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    meaning: "You have a sacred right to perform your prescribed duty, but you are never entitled to the fruits of your actions. Never consider yourself the cause of results, nor become attached to inaction.",
    significance: "The foundation of Karma Yoga. By acting with devotion without being anxious about outcomes, the mind attains enduring peace and freedom from stress.",
    source: "Bhagavad Gita Chapter 2, Verse 47",
    sourceUrl: "/bhagavad-gita/chapter-2",
    category: "Gita Shloka",
  },
  "karmanye vadhikaraste": {
    title: "Bhagavad Gita 2.47 — कर्मण्येवाधिकारस्ते",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    meaning: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मों के फल के हेतु मत बनो और तुम्हारी आसक्ति अकर्म (कर्म न करने) में भी न हो।",
    significance: "निष्काम कर्मयोग का यह मूल मंत्र मनुष्य को परिणाम की चिंता से मुक्त कर वर्तमान कर्तव्य में उत्कृष्टता और आंतरिक शांति प्रदान करता है।",
    source: "श्रीमद्भगवद्गीता अध्याय २, श्लोक ४७",
    sourceUrl: "/bhagavad-gita/chapter-2",
    category: "Gita Shloka",
  },
  "sarva dharman": {
    title: "Bhagavad Gita 18.66 — Complete Surrender (Sharanagati)",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    meaning: "Abandon all varieties of secondary dharmas and simply surrender unto Me alone. I shall deliver you from all sinful reactions and bondages; do not grieve.",
    significance: "Regarded as the Charama Shloka (ultimate promise) of the Bhagavad Gita, reassuring every sincere seeker of unconditional divine shelter and grace.",
    source: "Bhagavad Gita Chapter 18, Verse 66",
    sourceUrl: "/bhagavad-gita/chapter-18",
    category: "Gita Shloka",
  },
  "gayatri mantra": {
    title: "Rigvedic Gayatri Mantra — गायत्री महामंत्र",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
    meaning: "We meditate upon the divine, radiant effulgence of that Supreme Creator Sun (Savitur); may that Divine Light illuminate and inspire our intellect and inner vision.",
    significance: "Regarded as the mother of all Vedic mantras, chanting the Gayatri Mantra dispels ignorance, purifies the mind, and awakens higher consciousness.",
    source: "Rigveda Mandala 3, Sukta 62, Verse 10",
    sourceUrl: "/mantras-for-naam-jaap",
    category: "Mantra",
  },
  "maha mrityunjaya": {
    title: "Maha Mrityunjaya Mantra — महामृत्युंजय मंत्र",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥",
    meaning: "We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. Just as a ripe cucumber is naturally severed from its vine, may we be liberated from the bondage of mortality and fear, and blessed with immortality.",
    significance: "A supreme healing and protective mantra from the Rigveda and Yajurveda, invoked for mental courage, relief from illness, and freedom from fear of death.",
    source: "Rigveda 7.59.12 / Yajurveda",
    sourceUrl: "/mantras-for-naam-jaap",
    category: "Mantra",
  },
  "hare krishna": {
    title: "The Hare Krishna Mahamantra — हरे कृष्ण महामंत्र",
    sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
    meaning: "O Divine Energy of the Lord (Hare), O All-Attractive Supreme Lord Krishna, O Supreme Reservoir of Pleasure (Rama), please engage me in Your pure loving devotional service.",
    significance: "Revealed in the Kali Santarana Upanishad as the designated maha-mantra for inner purification and spiritual awakening in the current age of Kali Yuga.",
    source: "Kali Santarana Upanishad",
    sourceUrl: "/naam-jaap",
    category: "Mantra",
  },
  "hanuman chalisa": {
    title: "Shri Hanuman Chalisa — श्री हनुमान चालीसा",
    sanskrit: "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥",
    meaning: "Cleansing the mirror of my mind with the dust of the holy lotus feet of the Guru, I sing the unblemished glory of Shri Rama, which bestows the four fruits of life (Dharma, Artha, Kama, Moksha).",
    significance: "Composed by Goswami Tulsidas in 40 verses, daily recitation of Hanuman Chalisa confers courage, physical and spiritual strength, and removes planetary adversities.",
    source: "Awadhi Classic by Goswami Tulsidas",
    sourceUrl: "/chalisa/hanuman-chalisa",
    category: "Chalisa",
  },
  "today panchang": {
    title: "Aaj Ka Panchang & Shubh Muhurat",
    meaning: "Check today's accurate Hindu Panchang calculated for Indian Standard Time (IST). Includes Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurat, and Shubh Choghadiya timings.",
    significance: "Vedic Panchang aligns daily actions and ceremonies with planetary cycles to ensure auspicious beginnings and spiritual harmony.",
    source: "Bhakti Voice Astronomical Engine",
    sourceUrl: "/panchang/today",
    category: "Panchang",
  },
  "aaj ki tithi": {
    title: "Aaj Ki Tithi — आज की तिथि एवं पंचांग",
    meaning: "आज की सटीक तिथि, पक्ष (शुक्ल/कृष्ण), नक्षत्र, शुभ मुहूर्त, राहुकाल और चौघड़िया का विवरण देखें।",
    significance: "सनातन परंपरा में प्रत्येक दिन की तिथि और नक्षत्र के अनुसार व्रत, पूजन और शुभ कार्यों का निर्धारण किया जाता है।",
    source: "भक्ति वॉइस वैदिक पंचांग",
    sourceUrl: "/aaj-ki-tithi",
    category: "Panchang",
  },
  "kundli": {
    title: "Free Vedic Kundli & Horoscope Analysis",
    meaning: "Generate your comprehensive Vedic birth chart (Janma Kundli) with precise planetary degrees, Lagna chart, Navamsha chart, and current Dasha periods.",
    significance: "Astrological guidance helps individuals understand their intrinsic strengths, karmic tendencies, and auspicious timing for major life decisions.",
    source: "Bhakti Voice Spiritual Tools",
    sourceUrl: "/kundli",
    category: "Spiritual Tool",
  },
};

const STATIC_DISCOVERY_PAGES: {
  title: string;
  titleHi: string;
  introduction: string;
  introductionHi: string;
  href: string;
  kind: string;
  keywords: string[];
}[] = [
  {
    title: "Today's Panchang & Shubh Muhurat",
    titleHi: "आज का पंचांग एवं शुभ मुहूर्त",
    introduction: "Accurate daily Panchang with Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Choghadiya.",
    introductionHi: "आज की तिथि, नक्षत्र, योग, करण, राहुकाल एवं शुभ चौघड़िया का दैनिक विवरण।",
    href: "/panchang/today",
    kind: "Panchang",
    keywords: ["panchang", "tithi", "muhurat", "choghadiya", "rahu kaal", "nakshatra", "पंचांग", "तिथि"],
  },
  {
    title: "Aaj Ki Tithi — Today's Lunar Date",
    titleHi: "आज की तिथि — हिन्दू पंचांग",
    introduction: "Find current Tithi, Shukla/Krishna Paksha, sunrise, sunset, and fasts for today.",
    introductionHi: "आज कौन सी तिथि है, शुक्ल या कृष्ण पक्ष, सूर्योदय-सूर्यास्त समय और आज का व्रत।",
    href: "/aaj-ki-tithi",
    kind: "Panchang",
    keywords: ["aaj ki tithi", "tithi today", "lunar date", "ekadashi date", "purnima", "amavasya"],
  },
  {
    title: "Bhagavad Gita — All 18 Chapters & 700 Shlokas",
    titleHi: "श्रीमद्भगवद्गीता — सभी १८ अध्याय एवं ७०० श्लोक",
    introduction: "Read the entire sacred Bhagavad Gita with Sanskrit verses, English translations, and 3D scripture book.",
    introductionHi: "श्रीमद्भगवद्गीता के सभी १८ अध्याय, संस्कृत श्लोक, हिंदी भावार्थ और ३डी पवित्र ग्रंथ पाठक।",
    href: "/bhagavad-gita",
    kind: "Scripture",
    keywords: ["gita", "bhagavad gita", "krishna", "arjuna", "shlokas", "verses", "गीता", "भगवद्गीता"],
  },
  {
    title: "Online Naam Jaap Counter & Mala",
    titleHi: "ऑनलाइन नाम जप काउंटर एवं माला",
    introduction: "Perform daily Japa Sadhana with digital 108-bead mala counter and live global devotee counters.",
    introductionHi: "१०८ मनकों की डिजिटल माला के साथ दैनिक नाम जप साधना करें और विश्वभर के भक्तों से जुड़ें।",
    href: "/naam-jaap",
    kind: "Tool",
    keywords: ["naam jaap", "japa", "mala", "counter", "hare krishna", "om namah shivaya", "नाम जप", "माला"],
  },
  {
    title: "Free Vedic Kundli Calculator",
    titleHi: "मुफ्त जन्म कुंडली कैलकुलेटर",
    introduction: "Create your free Vedic birth chart with Lagna, Navamsha, planetary positions, and Dasha.",
    introductionHi: "अपनी सटीक जन्म कुंडली, लग्न चक्र, नवमांश और ग्रह स्थिति की विस्तृत जानकारी प्राप्त करें।",
    href: "/kundli",
    kind: "Tool",
    keywords: ["kundli", "horoscope", "birth chart", "astrology", "vedic", "कुंडली", "जन्म कुंडली"],
  },
  {
    title: "Kundli Milan & Horoscope Matching",
    titleHi: "कुंडली मिलान — अष्टकूट गुण मिलान",
    introduction: "Check marriage compatibility with authentic 36-Gun Ashtakoot matching.",
    introductionHi: "विवाह हेतु वर-वधू की कुंडली का ३६ गुणों के आधार पर प्रामाणिक अष्टकूट मिलान।",
    href: "/kundli-milan",
    kind: "Tool",
    keywords: ["kundli milan", "gun milan", "marriage matching", "horoscope matching", "कुंडली मिलान"],
  },
  {
    title: "Daily Suvichar & Status Card Maker",
    titleHi: "दैनिक सुविचार एवं स्टेटस कार्ड मेकर",
    introduction: "Create beautiful devotional cards with sacred Sanskrit shlokas and Hindi quotes for WhatsApp.",
    introductionHi: "व्हाट्सएप और सोशल मीडिया हेतु संस्कृत श्लोक एवं प्रेरणादायक सुविचार कार्ड बनाएं।",
    href: "/suvichar-card-maker",
    kind: "Tool",
    keywords: ["suvichar", "status", "card maker", "quotes", "whatsapp status", "सुविचार", "स्टेटस"],
  },
  {
    title: "Hanuman Chalisa with Meaning",
    titleHi: "श्री हनुमान चालीसा हिंदी भावार्थ सहित",
    introduction: "Complete 40 chaupais of Hanuman Chalisa with authentic Hindi lyrics and English translation.",
    introductionHi: "श्री हनुमान चालीसा की संपूर्ण ४० चौपाइयां, दोहे, शुद्ध पाठ एवं सरल हिंदी भावार्थ।",
    href: "/chalisa/hanuman-chalisa",
    kind: "Chalisa",
    keywords: ["hanuman chalisa", "chalisa", "hanuman", "bajrangbali", "हनुमान चालीसा"],
  },
  {
    title: "Hindu Calendar 2025–2030",
    titleHi: "हिन्दू कैलेंडर २०२५–२०३०",
    introduction: "Explore month-wise Hindu calendar with complete list of festivals, Ekadashi, and Vrats.",
    introductionHi: "माहवार हिन्दू कैलेंडर, एकादशी, प्रदोष, पूर्णिमा, अमावस्या और सभी प्रमुख व्रत-त्योहार।",
    href: "/hindu-calendar",
    kind: "Calendar",
    keywords: ["hindu calendar", "calendar 2026", "calendar 2025", "vrat", "festivals", "हिन्दू कैलेंडर"],
  },
  {
    title: "Sacred Mantras for Naam Jaap",
    titleHi: "नाम जप हेतु पावन वैदिक मंत्र संग्रह",
    introduction: "Collection of ancient Vedic and devotional mantras with pronunciation, meaning, and benefits.",
    introductionHi: "गायत्री, महामृत्युंजय, हरे कृष्ण और शिव पंचाक्षर आदि दिव्य मंत्रों का प्रामाणिक संग्रह।",
    href: "/mantras-for-naam-jaap",
    kind: "Mantra",
    keywords: ["mantras", "vedic mantra", "naam jaap", "chanting", "गायत्री मंत्र", "महामृत्युंजय"],
  },
  {
    title: "Sacred Katha Stories from Puranas",
    titleHi: "पौराणिक कथाएं — धर्म एवं भक्ति प्रसंग",
    introduction: "Inspiring spiritual stories from the Ramayana, Mahabharata, and Shrimad Bhagavatam.",
    introductionHi: "रामायण, महाभारत और श्रीमद्भागवत महापुराण से प्रेरित पावन आध्यात्मिक कथाएं।",
    href: "/katha-stories",
    kind: "Katha",
    keywords: ["katha", "stories", "ramayana", "mahabharata", "bhagavata", "पौराणिक कथाएं"],
  },
  {
    title: "Sacred Yatra & Temple Guides",
    titleHi: "पवित्र तीर्थ यात्रा एवं हिन्दू मंदिर मार्गदर्शिका",
    introduction: "Detailed pilgrimage guides for Char Dham, 12 Jyotirlingas, 51 Shakti Peethas, and Ayodhya.",
    introductionHi: "चार धाम, द्वादश ज्योतिर्लिंग, शक्तिपीठ और प्रमुख हिन्दू तीर्थस्थलों की संपूर्ण यात्रा मार्गदर्शिका।",
    href: "/sacred-yatra-guides",
    kind: "Yatra",
    keywords: ["yatra", "temples", "char dham", "jyotirlinga", "pilgrimage", "तीर्थ यात्रा", "मंदिर"],
  },
];

export async function unifiedSearch(query: string, locale: "en" | "hi" = "en"): Promise<UnifiedSearchResult> {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { results: [], directAnswer: null, total: 0 };
  }

  const isHi = locale === "hi";
  const results: SearchHit[] = [];

  // 1. Direct Answer Matching
  let directAnswer: DirectDevotionalAnswer | null = null;
  for (const [key, answer] of Object.entries(DIRECT_ANSWERS)) {
    if (q.includes(key) || key.includes(q)) {
      directAnswer = answer;
      break;
    }
  }

  // 2. Search Static Discovery Pages
  for (const page of STATIC_DISCOVERY_PAGES) {
    const haystack = [
      page.title,
      page.titleHi,
      page.introduction,
      page.introductionHi,
      page.kind,
      ...page.keywords,
    ].join(" ").toLowerCase();

    if (haystack.includes(q)) {
      results.push({
        title: isHi ? page.titleHi : page.title,
        introduction: isHi ? page.introductionHi : page.introduction,
        href: page.href,
        kind: page.kind,
        category: page.kind,
        slug: page.href.replace(/^\//, ""),
      });
    }
  }

  // 3. Search All 18 Bhagavad Gita Chapters
  const gitaChapters = await getGitaChapters();
  for (const ch of gitaChapters) {
    const haystack = [
      `chapter ${ch.chapter}`,
      `adhyaay ${ch.chapter}`,
      `अध्याय ${ch.chapter}`,
      ch.name,
      ch.nameHindi || "",
      ch.nameSanskrit || "",
      ch.nameTranslation || "",
      ch.summary || "",
      ch.summaryHindi || "",
    ].join(" ").toLowerCase();

    if (haystack.includes(q) || q.includes(`chapter ${ch.chapter}`) || q.includes(`अध्याय ${ch.chapter}`)) {
      results.push({
        title: isHi
          ? `श्रीमद्भगवद्गीता अध्याय ${ch.chapter}: ${ch.nameHindi || ch.name}`
          : `Bhagavad Gita Chapter ${ch.chapter}: ${ch.name}`,
        introduction: isHi
          ? ch.summaryHindi || ch.summary || ""
          : ch.summary || "",
        href: `/bhagavad-gita/chapter-${ch.chapter}`,
        kind: "Gita Chapter",
        category: "Bhagavad Gita",
        slug: `chapter-${ch.chapter}`,
      });
    }
  }

  // 4. If query looks like a specific verse (e.g. "2.47", "2.11", "chapter 2 verse 47")
  const verseMatch = q.match(/(?:chapter\s*)?(\d{1,2})[\s.:-]+(?:verse\s*)?(\d{1,2})/i);
  if (verseMatch) {
    const chNum = parseInt(verseMatch[1], 10);
    const vNum = parseInt(verseMatch[2], 10);
    if (chNum >= 1 && chNum <= 18) {
      const fullCh = await getGitaChapter(chNum);
      const verseObj = fullCh?.verses?.find((v) => v.verse === vNum);
      if (verseObj) {
        results.unshift({
          title: isHi
            ? `गीता श्लोक ${chNum}.${vNum}: ${fullCh?.nameHindi || fullCh?.name}`
            : `Bhagavad Gita Shloka ${chNum}.${vNum}: ${fullCh?.name}`,
          introduction: `${verseObj.sanskrit} — ${isHi ? verseObj.hindi || verseObj.english : verseObj.english || verseObj.hindi}`,
          href: `/bhagavad-gita?chapter=${chNum}&verse=${vNum}`,
          kind: "Gita Shloka",
          category: "Bhagavad Gita",
          slug: `${chNum}-${vNum}`,
        });
      }
    }
  }

  // Deduplicate by href
  const seen = new Set<string>();
  const deduped: SearchHit[] = [];
  for (const item of results) {
    if (!seen.has(item.href)) {
      seen.add(item.href);
      deduped.push(item);
    }
  }

  return {
    results: deduped,
    directAnswer,
    total: deduped.length,
  };
}

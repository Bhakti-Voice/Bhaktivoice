# Group 6: Gita, Search, and AdminPreviewBar
import re

# 1. src/app/bhagavad-gita/[chapter]/page.tsx
with open("src/app/bhagavad-gita/[chapter]/page.tsx", "r", encoding="utf-8") as f:
    bg = f.read()

# In generateMetadata
bg = bg.replace(
'''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? `श्रीमद्भगवद्गीता अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name} — सम्पूर्ण श्लोक व अर्थ`
    : `Bhagavad Gita Chapter ${chapter.chapter}: ${chapter.name} — All Verses, Meaning & Summary`;''',
'''  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const title = isTe
    ? `శ్రీమద్భగవద్గీత అధ్యాయం ${chapter.chapter}: ${chapter.nameHindi || chapter.name} — సంపూర్ణ శ్లోకాలు మరియు తాత్పర్యం`
    : isHi
    ? `श्रीमद्भगवद्गीता अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name} — सम्पूर्ण श्लोक व अर्थ`
    : `Bhagavad Gita Chapter ${chapter.chapter}: ${chapter.name} — All Verses, Meaning & Summary`;'''
)

# In GitaChapterPage
bg = bg.replace(
'''  const isHi = locale === "hi";
  const verses = chapter.verses || [];''',
'''  const isTe = locale === "te";
  const isHi = locale === "hi";
  const verses = chapter.verses || [];'''
)

bg = bg.replace(
'''  const breadcrumbs = [
    { name: isHi ? "होम" : "Home", href: "/" },
    { name: isHi ? "श्रीमद्भगवद्गीता" : "Bhagavad Gita", href: "/bhagavad-gita" },
    {
      name: isHi
        ? `अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name}`
        : `Chapter ${chapter.chapter}: ${chapter.name}`,
      href: `/bhagavad-gita/chapter-${num}`,
    },
  ];''',
'''  const breadcrumbs = [
    { name: isTe ? "హోమ్" : isHi ? "होम" : "Home", href: "/" },
    { name: isTe ? "శ్రీమద్భగవద్గీత" : isHi ? "श्रीमद्भगवद्गीता" : "Bhagavad Gita", href: "/bhagavad-gita" },
    {
      name: isTe
        ? `అధ్యాయం ${chapter.chapter}: ${chapter.nameHindi || chapter.name}`
        : isHi
        ? `अध्याय ${chapter.chapter}: ${chapter.nameHindi || chapter.name}`
        : `Chapter ${chapter.chapter}: ${chapter.name}`,
      href: `/bhagavad-gita/chapter-${num}`,
    },
  ];'''
)

bg = bg.replace(
    '{isHi ? `अध्याय ${chapter.chapter}` : `Chapter ${chapter.chapter} of 18`}',
    '{isTe ? `అధ్యాయం ${chapter.chapter}` : isHi ? `अध्याय ${chapter.chapter}` : `Chapter ${chapter.chapter} of 18`}'
)
bg = bg.replace(
    '{chapter.versesCount || verses.length} {isHi ? "श्लोक" : "Verses"}',
    '{chapter.versesCount || verses.length} {isTe ? "శ్లోకాలు" : isHi ? "श्लोक" : "Verses"}'
)
bg = bg.replace(
    '{isHi ? "अध्याय का आध्यात्मिक सार" : "Chapter Overview & Spiritual Essence"}',
    '{isTe ? "అధ్యాయం యొక్క ఆధ్యాత్మిక సారాంశం" : isHi ? "अध्याय का आध्यात्मिक सार" : "Chapter Overview & Spiritual Essence"}'
)
bg = bg.replace(
    '{isHi ? "3D गीता पुस्तक में पढ़ें" : "Read in 3D Sacred Book"}',
    '{isTe ? "3D గీతా పుస్తకంలో చదవండి" : isHi ? "3D गीता पुस्तक में पढ़ें" : "Read in 3D Sacred Book"}'
)
bg = bg.replace(
    '{isHi ? "सभी 18 अध्याय देखें" : "View All 18 Chapters"}',
    '{isTe ? "అన్ని 18 అధ్యాయాలు చూడండి" : isHi ? "सभी 18 अध्याय देखें" : "View All 18 Chapters"}'
)
bg = bg.replace(
    '{isHi ? `अध्याय ${chapter.chapter} के श्लोक` : `Verses in Chapter ${chapter.chapter}`}',
    '{isTe ? `అధ్యాయం ${chapter.chapter} శ్లోకాలు` : isHi ? `अध्याय ${chapter.chapter} के श्लोक` : `Verses in Chapter ${chapter.chapter}`}'
)
bg = bg.replace(
    '{verses.length} {isHi ? "श्लोक उपलब्ध" : "Shlokas available"}',
    '{verses.length} {isTe ? "శ్లోకాలు లభ్యం" : isHi ? "श्लोक उपलब्ध" : "Shlokas available"}'
)
bg = bg.replace(
    '{isHi ? `श्लोक ${chapter.chapter}.${v.verse}` : `Verse ${chapter.chapter}.${v.verse}`}',
    '{isTe ? `శ్లోకం ${chapter.chapter}.${v.verse}` : isHi ? `श्लोक ${chapter.chapter}.${v.verse}` : `Verse ${chapter.chapter}.${v.verse}`}'
)
bg = bg.replace(
    '{isHi ? `शेष सभी ${verses.length - 10} श्लोक पढ़ें` : `Read all ${verses.length} verses in Reader`}',
    '{isTe ? `మిగిలిన ${verses.length - 10} శ్లోకాలు చదవండి` : isHi ? `शेष सभी ${verses.length - 10} श्लोक पढ़ें` : `Read all ${verses.length} verses in Reader`}'
)
bg = bg.replace(
    '{isHi ? "पिछला अध्याय" : "Previous Chapter"}',
    '{isTe ? "మునుపటి అధ్యాయం" : isHi ? "पिछला अध्याय" : "Previous Chapter"}'
)
bg = bg.replace(
    '{isHi ? "अगला अध्याय" : "Next Chapter"}',
    '{isTe ? "తరువాతి అధ్యాయం" : isHi ? "अगला अध्याय" : "Next Chapter"}'
)
bg = bg.replace(
    'title={isHi ? "भगवद्गीता से जुड़े महत्वपूर्ण प्रश्नोत्तर" : "Frequently Asked Questions"}',
    'title={isTe ? "భగవద్గీత గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "भगवद्गीता से जुड़े महत्वपूर्ण प्रश्नोत्तर" : "Frequently Asked Questions"}'
)

with open("src/app/bhagavad-gita/[chapter]/page.tsx", "w", encoding="utf-8") as f:
    f.write(bg)
print("SUCCESS: Updated bhagavad-gita/[chapter]/page.tsx")

# 2. src/components/search/SearchResults.tsx
with open("src/components/search/SearchResults.tsx", "r", encoding="utf-8") as f:
    sr = f.read()

te_suggestions = '''const SUGGESTED_QUERIES_TE = [
  "భగవద్గీత అధ్యాయం 2",
  "హనుమాన్ చాలీసా",
  "నేటి పంచాంగం",
  "గాయత్రీ మంత్రం",
  "జన్మ కుండలి",
  "కర్మణ్యేవాధికారస్తే",
  "దైవిక సువిచార్",
  "నామ జపం",
];
'''

sr = sr.replace('const SUGGESTED_QUERIES_HI = [', te_suggestions + '\nconst SUGGESTED_QUERIES_HI = [')
sr = sr.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
sr = sr.replace(
    'const suggestions = isHi ? SUGGESTED_QUERIES_HI : SUGGESTED_QUERIES_EN;',
    'const suggestions = isTe ? SUGGESTED_QUERIES_TE : isHi ? SUGGESTED_QUERIES_HI : SUGGESTED_QUERIES_EN;'
)
sr = sr.replace(
    '{isHi ? "प्रामाणिक शास्त्र उत्तर" : "Scriptural Direct Answer"}',
    '{isTe ? "ప్రామాణిక శాస్త్ర సమాధానం" : isHi ? "प्रामाणिक शास्त्र उत्तर" : "Scriptural Direct Answer"}'
)
sr = sr.replace(
    '<strong className="text-ink font-semibold">{isHi ? "भावार्थ: " : "Meaning: "}</strong>',
    '<strong className="text-ink font-semibold">{isTe ? "తాత్పర్యం: " : isHi ? "भावार्थ: " : "Meaning: "}</strong>'
)
sr = sr.replace(
    '<strong className="text-ink font-semibold">{isHi ? "आध्यात्मिक महत्व: " : "Spiritual Essence: "}</strong>',
    '<strong className="text-ink font-semibold">{isTe ? "ఆధ్యాత్మిక ప్రాముఖ్యత: " : isHi ? "आध्यात्मिक महत्व: " : "Spiritual Essence: "}</strong>'
)
sr = sr.replace(
    '{isHi ? "स्रोत: " : "Source: "}',
    '{isTe ? "మూలం: " : isHi ? "स्रोत: " : "Source: "}'
)
sr = sr.replace(
    '<span>{isHi ? "विस्तार से पढ़ें" : "Explore Full Guide"}</span>',
    '<span>{isTe ? "వివరంగా చదవండి" : isHi ? "विस्तार से पढ़ें" : "Explore Full Guide"}</span>'
)
sr = sr.replace(
    '{isHi ? "सभी परिणाम" : "All Results"}',
    '{isTe ? "అన్ని ఫలితాలు" : isHi ? "सभी परिणाम" : "All Results"}'
)
sr = sr.replace(
'''              ? isHi
                ? `"${query}" के लिए कोई परिणाम नहीं मिला`
                : `No results found for "${query}"`
              : isHi
              ? "पवित्र शास्त्रों व पंचांग में खोजें"
              : "Search Sacred Scriptures & Panchang"''',
'''              ? isTe
                ? `"${query}" కోసం ఎటువంటి ఫలితాలు లభించలేదు`
                : isHi
                ? `"${query}" के लिए कोई परिणाम नहीं मिला`
                : `No results found for "${query}"`
              : isTe
              ? "పవిత్ర గ్రంథాలు & పంచాంగంలో శోధించండి"
              : isHi
              ? "पवित्र शास्त्रों व पंचांग में खोजें"
              : "Search Sacred Scriptures & Panchang"'''
)
sr = sr.replace(
    '{isHi ? "लोकप्रिय खोज सुझाव" : "Popular Searches"}',
    '{isTe ? "ప్రజాదరణ పొందిన శోధనలు" : isHi ? "लोकप्रिय खोज सुझाव" : "Popular Searches"}'
)

with open("src/components/search/SearchResults.tsx", "w", encoding="utf-8") as f:
    f.write(sr)
print("SUCCESS: Updated SearchResults.tsx")

# 3. src/components/admin/AdminPreviewBar.tsx
with open("src/components/admin/AdminPreviewBar.tsx", "r", encoding="utf-8") as f:
    apb = f.read()

apb = apb.replace(
'''  const isHindi = pathname.startsWith("/hi");
  const alternatePath = isHindi
    ? pathname.replace(/^\\/hi/, "") || "/"
    : `/hi${pathname}`;''',
'''  const isHindi = pathname.startsWith("/hi");
  const isTelugu = pathname.startsWith("/te");
  const cleanPath = pathname.replace(/^\\/(hi|te)/, "") || "/";
  const alternatePath = isTelugu
    ? cleanPath
    : isHindi
    ? `/te${cleanPath}`
    : `/hi${cleanPath}`;'''
)

apb = apb.replace(
'''            <Link
              href={`${alternatePath}?preview=true`}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 transition-colors text-[11px] font-medium"
              title={`Switch to ${isHindi ? "English" : "Hindi"} preview`}
            >
              {isHindi ? "🇬🇧 English" : "🇮🇳 हिंदी"}
            </Link>''',
'''            <Link
              href={`${alternatePath}?preview=true`}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 transition-colors text-[11px] font-medium"
              title="Switch preview language"
            >
              {isTelugu ? "🇬🇧 English" : isHindi ? "🚩 తెలుగు" : "🇮🇳 हिंदी"}
            </Link>'''
)

with open("src/components/admin/AdminPreviewBar.tsx", "w", encoding="utf-8") as f:
    f.write(apb)
print("SUCCESS: Updated AdminPreviewBar.tsx")

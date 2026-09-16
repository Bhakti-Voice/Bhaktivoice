import re

# Update today/page.tsx
today_file = 'src/app/panchang/today/page.tsx'
with open(today_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add TODAY_FAQS_TE
faqs_te_code = '''const TODAY_FAQS_TE = [
  {
    question: "నేటి పంచాంగం అంటే ఏమిటి?",
    answer:
      "దిన పంచాంగం వైదిక జ్యోతిష్యంలోని ఐదు ప్రధాన అంగాలైన తిథి, వారం, నక్షత్రం, యోగం మరియు కరణాలను సూచిస్తుంది. ఇది నేటి శుభ-అశుభ ముహూర్తాలు, సూర్యోదయం, సూర్యాస్తమయం, చంద్రోదయం మరియు రాహుకాలం వేళలను ఖచ్చితంగా తెలియజేస్తుంది.",
  },
  {
    question: "ఈరోజు అత్యంత శుభ ముహూర్తం ఏది?",
    answer:
      "ఈరోజు అభిజిత్ ముహూర్తం (బుధవారం మినహా మధ్యాహ్న సమయం), బ్రహ్మ ముహూర్తం (సూర్యోదయానికి ముందు) మరియు అమృత కాలం ఏదైనా నూతన లేదా శుభ కార్యాన్ని ప్రారంభించడానికి అత్యంత శ్రేష్ఠమైనవి.",
  },
  {
    question: "ఈరోజు రాహుకాలం ఎప్పుడు మరియు అందులో ఏమి చేయకూడదు?",
    answer:
      "రాహుకాలం ప్రతిరోజూ దాదాపు 90 నిమిషాల పాటు ఉండే అశుభ సమయం. ఈ సమయంలో గృహ ప్రవేశం, కొత్త వ్యాపార ప్రారంభం, ధన పెట్టుబడులు లేదా శుభ ప్రయాణాలు ప్రారంభించడం నిషిద్ధం.",
  },
];
'''

if 'const TODAY_FAQS_TE' not in content:
    content = content.replace('const TODAY_FAQS_HI = [', faqs_te_code + '\nconst TODAY_FAQS_HI = [')

# Update generateMetadata
old_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return localizedMetadata({
    title: isHi
      ? `आज का पंचांग (${dateFormatted}) — आज की तिथि, शुभ चौघड़िया मुहूर्त, नक्षत्र व राहु काल`
      : `Aaj Ka Panchang (${dateFormatted}) — Today's Panchang, Tithi, Shubh Muhurat & Choghadiya`,
    description: isHi
      ? `आज ${dateFormatted} का संपूर्ण वैदिक पंचांग। आज की तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, राहु काल, अभिजित मुहूर्त और दिन-रात का शुभ चौघड़िया। 120+ नगरों अनुसार सटीक गणना।`
      : `Get accurate Aaj Ka Panchang for today (${dateFormatted}). Live Tithi, Nakshatra, Yoga, Karana, Sunrise & Sunset, Abhijit Muhurat, Rahu Kaal, and Day-Night Choghadiya across 120+ cities. Top Hindu Vedic Panchang.`,
    path: PATHS.panchangToday,
    keywords: isHi'''

new_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return localizedMetadata({
    title: isTe
      ? `నేటి పంచాంగం (${dateFormatted}) — నేటి తిథి, శుభ చోఘడియా ముహూర్తం, నక్షత్రం & రాహుకాలం`
      : isHi
      ? `आज का पंचांग (${dateFormatted}) — आज की तिथि, शुभ चौघड़िया मुहूर्त, नक्षत्र व राहु काल`
      : `Aaj Ka Panchang (${dateFormatted}) — Today's Panchang, Tithi, Shubh Muhurat & Choghadiya`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ వైదిక పంచాంగం. నేటి తిథి, నక్షత్రం, యోగం, కరణం, సూర్యోదయం-సూర్యాస్తమయం, రాహుకాలం, అభిజిత్ ముహూర్తం మరియు పగలు-రాత్రి శుభ చోఘడియా. 120+ నగరాల ఖచ్చితమైన వివరాలు.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण वैदिक पंचांग। आज की तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, राहु काल, अभिजित मुहूर्त और दिन-रात का शुभ चौघड़िया। 120+ नगरों अनुसार सटीक गणना।`
      : `Get accurate Aaj Ka Panchang for today (${dateFormatted}). Live Tithi, Nakshatra, Yoga, Karana, Sunrise & Sunset, Abhijit Muhurat, Rahu Kaal, and Day-Night Choghadiya across 120+ cities. Top Hindu Vedic Panchang.`,
    path: PATHS.panchangToday,
    keywords: isTe
      ? [
          "నేటి పంచాంగం",
          "నేటి తిథి",
          "నేటి శుభ ముహూర్తం",
          "నేటి చోఘడియా",
          "రాహుకాలం సమయం",
          "అభిజిత్ ముహూర్తం",
          "దిన పంచాంగం 2026",
          "సూర్యోదయం సమయం",
          "నేటి నక్షత్రం",
          "నేటి పక్షం",
          "తెలుగు పంచాంగం",
          "దృక్ పంచాంగం",
        ]
      : isHi'''

content = content.replace(old_meta, new_meta)

# Update page body
content = content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? TODAY_FAQS_HI : TODAY_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? TODAY_FAQS_TE : isHi ? TODAY_FAQS_HI : TODAY_FAQS_EN;'
)

content = content.replace(
    'name: isHi ? "आज का पंचांग — दैनिक वैदिक ज्योतिष एवं मुहूर्त" : "Today\'s Panchang — Daily Vedic Astrology & Muhurat",',
    'name: isTe ? "నేటి పంచాంగం — దిన వైదిక జ్యోతిష్యం & ముహూర్తం" : isHi ? "आज का पंचांग — दैनिक वैदिक ज्योतिष एवं मुहूर्त" : "Today\'s Panchang — Daily Vedic Astrology & Muhurat",'
)
content = content.replace(
    'description: isHi\n            ? "तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, चौघड़िया और शुभ मुहूर्त के साथ दैनिक पंचांग।"',
    'description: isTe\n            ? "తిథి, నక్షత్రం, సూర్యోదయం, సూర్యాస్తమయం, చోఘడియా మరియు శుభ ముహూర్తాలతో దిన పంచాంగం."\n            : isHi\n            ? "तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, चौघड़िया और शुभ मुहूर्त के साथ दैनिक पंचांग।"'
)
content = content.replace(
    'title={isHi ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today\'s Panchang & Muhurat"}',
    'title={isTe ? "నేటి పంచాంగం & శుభ ముహూర్తం" : isHi ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today\'s Panchang & Muhurat"}'
)
content = content.replace(
    'subtitle={\n          isHi\n            ? "आज का दैनिक वैदिक पंचांग। अपने नगर के अनुसार सटीक तिथि, नक्षत्र, योग, करण, चौघड़िया, राहु काल और शुभ मुहूर्त देखें।"',
    'subtitle={\n          isTe\n            ? "నేటి దిన వైదిక పంచాంగం. మీ నగరం ప్రకారం ఖచ్చితమైన తిథి, నక్షత్రం, యోగం, కరణం, చోఘడియా, రాహుకాలం మరియు శుభ ముహూర్తాలను తెలుసుకోండి."\n            : isHi\n            ? "आज का दैनिक वैदिक पंचांग। अपने नगर के अनुसार सटीक तिथि, नक्षत्र, योग, करण, चौघड़िया, राहु काल और शुभ मुहूर्त देखें।"'
)
content = content.replace(
    '[isHi ? "पंचांग" : "Panchang", PATHS.panchang],',
    '[isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],'
)
content = content.replace(
    '[isHi ? "आज का पंचांग" : "Today\'s Panchang", PATHS.panchangToday]',
    '[isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today\'s Panchang", PATHS.panchangToday]'
)
content = content.replace(
    'title={isHi ? "आज के पंचांग से जुड़े मुख्य प्रश्नोत्तर (FAQs)" : "Frequently Asked Questions about Today\'s Panchang"}',
    'title={isTe ? "నేటి పంచాంగం గురించి తరచుగా అడిగే ప్రశ్నలు (FAQs)" : isHi ? "आज के पंचांग से जुड़े मुख्य प्रश्नोत्तर (FAQs)" : "Frequently Asked Questions about Today\'s Panchang"}'
)

with open(today_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated panchang/today/page.tsx successfully!")

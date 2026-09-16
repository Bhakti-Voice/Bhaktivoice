import re

# Update src/app/choghadiya/page.tsx
page_file = 'src/app/choghadiya/page.tsx'
with open(page_file, 'r', encoding='utf-8') as f:
    p_content = f.read()

faqs_te = '''const CHOGHADIYA_FAQS_TE = [
  {
    question: "చోఘడియా అంటే ఏమిటి మరియు దీనిని ఎలా లెక్కిస్తారు?",
    answer:
      "చోఘడియా అనేది వైదిక ముహూర్త కాల విభజన పద్ధతి. ఇందులో సూర్యోదయం నుండి సూర్యాస్తమయం వరకు పగటి సమయాన్ని 8 సమాన భాగాలుగా, సూర్యాస్తమయం నుండి మరుసటి సూర్యోదయం వరకు రాత్రి సమయాన్ని 8 సమాన భాగాలుగా విభజిస్తారు. ప్రతి భాగం సుమారు 90 నిమిషాల (3.75 ఘడియలు) పాటు ఉంటుంది.",
  },
  {
    question: "శుభ కార్యాలకు ఏ చోఘడియా శ్రేష్ఠమైనది?",
    answer:
      "మాంగలిక కార్యాలు, నూతన వ్యాపార ప్రారంభం, గృహ ప్రవేశం మరియు ప్రయాణాలకు 'అమృత', 'శుభ' మరియు 'లాభ' చోఘడియాలను అత్యుత్తమమైనవిగా భావిస్తారు. వాహన కొనుగోలు లేదా చలన కార్యకలాపాలకు 'చర' చోఘడియా కూడా అనుకూలమైనది.",
  },
  {
    question: "ఏ చోఘడియాలలో శుభ కార్యాలు చేయకూడదు?",
    answer:
      "'రోగ', 'కాల' మరియు 'ఉద్వేగ'లను అశుభ చోఘడియాలుగా పరిగణిస్తారు. వీటిలో ప్రారంభించిన పనులలో ఆటంకాలు, నష్టాలు మరియు మానసిక ఆందోళనలు కలిగే అవకాశం ఉన్నందున వీటిని నివారించాలి.",
  },
  {
    question: "వివిధ నగరాల్లో చోఘడియా సమయాలు మారుతాయా?",
    answer:
      "అవును. చోఘడియా గణన స్థానిక సూర్యోదయం మరియు సూర్యాస్తమయాల ఆధారంగా జరుగుతుంది కాబట్టి, నగరాల అక్షాంశ-రేఖాంశాలను బట్టి కొన్ని నిమిషాల తేడా ఉంటుంది.",
  },
];
'''

p_content = p_content.replace('const CHOGHADIYA_FAQS_HI = [', faqs_te + '\nconst CHOGHADIYA_FAQS_HI = [')

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
      ? `आज का चौघड़िया (${dateFormatted}) — दिन और रात का शुभ चौघड़िया मुहूर्त | Aaj Ka Choghadiya`
      : `Aaj Ka Choghadiya (आज का चौघड़िया) — Today's Choghadiya Muhurat ${dateFormatted} | Day & Night Timings`,
    description: isHi
      ? `आज ${dateFormatted} का संपूर्ण दिन और रात का शुभ चौघड़िया मुहूर्त। अमृत, शुभ, लाभ, चर, रोग, काल और उद्वेग की सटीक समय सारणी अपने शहर अनुसार देखें। यात्रा, गृह प्रवेश व नवीन कार्य हेतु सर्वोत्तम चौघड़िया।`
      : `Check accurate Aaj Ka Choghadiya for today (${dateFormatted}). Live Day & Night Choghadiya table with Amrit, Shubh, Labh timings, Rahu Kaal, and Shubh Muhurat for 120+ Indian and global cities.`,
    path: PATHS.choghadiya,
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
      ? `నేటి చోఘడియా (${dateFormatted}) — పగలు & రాత్రి శుభ చోఘడియా ముహూర్తాలు`
      : isHi
      ? `आज का चौघड़िया (${dateFormatted}) — दिन और रात का शुभ चौघड़िया मुहूर्त | Aaj Ka Choghadiya`
      : `Aaj Ka Choghadiya (आज का चौघड़िया) — Today's Choghadiya Muhurat ${dateFormatted} | Day & Night Timings`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ పగలు & రాత్రి శుభ చోఘడియా ముహూర్తాలు. అమృత, శుభ, లాభ, చర, రోగ, కాల & ఉద్వేగ సమయాలు మీ నగరం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण दिन और रात का शुभ चौघड़िया मुहूर्त। अमृत, शुभ, लाभ, चर, रोग, काल और उद्वेग की सटीक समय सारणी अपने शहर अनुसार देखें। यात्रा, गृह प्रवेश व नवीन कार्य हेतु सर्वोत्तम चौघड़िया।`
      : `Check accurate Aaj Ka Choghadiya for today (${dateFormatted}). Live Day & Night Choghadiya table with Amrit, Shubh, Labh timings, Rahu Kaal, and Shubh Muhurat for 120+ Indian and global cities.`,
    path: PATHS.choghadiya,
    keywords: isTe
      ? [
          "నేటి చోఘడియా",
          "శుభ చోఘడియా ముహూర్తం",
          "పగటి చోఘడియా",
          "రాత్రి చోఘడియా",
          "అమృత చోఘడియా సమయం",
          "లాభ చోఘడియా సమయం",
          "చోఘడియా పట్టిక 2026",
          "తెలుగు చోఘడియా",
        ]
      : isHi'''

p_content = p_content.replace(old_meta, new_meta)

p_content = p_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? CHOGHADIYA_FAQS_HI : CHOGHADIYA_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? CHOGHADIYA_FAQS_TE : isHi ? CHOGHADIYA_FAQS_HI : CHOGHADIYA_FAQS_EN;'
)

p_content = p_content.replace(
    'title={isHi ? "आज का चौघड़िया (दिन एवं रात)" : "Today\'s Choghadiya Muhurat"}',
    'title={isTe ? "నేటి చోఘడియా (పగలు & రాత్రి)" : isHi ? "आज का चौघड़िया (दिन एवं रात)" : "Today\'s Choghadiya Muhurat"}'
)
p_content = p_content.replace(
    'subtitle={\n          isHi\n            ? "सटीक वैदिक गणना अनुसार आज का अमृत, शुभ, लाभ, चर, रोग, काल एवं उद्वेग मुहूर्त। अपने शहर अनुसार तुरंत देखें।"',
    'subtitle={\n          isTe\n            ? "ఖచ్చితమైన వైదిక గణన ప్రకారం నేటి అమృత, శుభ, లాభ, చర, రోగ, కాల మరియు ఉద్వేగ ముహూర్తాలు. మీ నగరం ప్రకారం తనిఖీ చేయండి."\n            : isHi\n            ? "सटीक वैदिक गणना अनुसार आज का अमृत, शुभ, लाभ, चर, रोग, काल एवं उद्वेग मुहूर्त। अपने शहर अनुसार तुरंत देखें।\"'
)
p_content = p_content.replace(
    '[isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],',
    '[isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],'
)
p_content = p_content.replace(
    '[isHi ? "आज का चौघड़िया" : "Choghadiya", PATHS.choghadiya],',
    '[isTe ? "నేటి చోఘడియా" : isHi ? "आज का चौघड़िया" : "Choghadiya", PATHS.choghadiya],'
)
p_content = p_content.replace(
    'title={isHi ? "चौघड़िया से संबंधित प्रश्नोत्तरी" : "Frequently Asked Questions"}',
    'title={isTe ? "చోఘడియా గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "चौघड़िया से संबंधित प्रश्नोत्तरी" : "Frequently Asked Questions"}'
)

with open(page_file, 'w', encoding='utf-8') as f:
    f.write(p_content)

# Update src/components/panchang/ChoghadiyaView.tsx
view_file = 'src/components/panchang/ChoghadiyaView.tsx'
with open(view_file, 'r', encoding='utf-8') as f:
    v_content = f.read()

v_content = v_content.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)

v_content = v_content.replace(
    'return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {',
    'return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'
)

v_content = v_content.replace(
    '{isHi ? "कल (बीता हुआ)" : "Yesterday"}',
    '{isTe ? "నిన్న" : isHi ? "कल (बीता हुआ)" : "Yesterday"}'
)
v_content = v_content.replace(
    '{isHi ? "आज" : "Today"}',
    '{isTe ? "ఈరోజు" : isHi ? "आज" : "Today"}'
)
v_content = v_content.replace(
    '{isHi ? "कल (आने वाला)" : "Tomorrow"}',
    '{isTe ? "రేపు" : isHi ? "कल (आने वाला)" : "Tomorrow"}'
)

v_content = v_content.replace(
    '{isHi ? "शुभ (श्रेष्ठ)" : "Auspicious"}',
    '{isTe ? "శుభం (శ్రేష్ఠం)" : isHi ? "शुभ (श्रेष्ठ)" : "Auspicious"}'
)
v_content = v_content.replace(
    '{isHi ? "मध्यम (सामान्य)" : "Moderate"}',
    '{isTe ? "మధ్యమం (సాధారణం)" : isHi ? "मध्यम (सामान्य)" : "Moderate"}'
)
v_content = v_content.replace(
    '{isHi ? "अशुभ (त्याज्य)" : "Inauspicious"}',
    '{isTe ? "అశుభం (విసర్జించాలి)" : isHi ? "अशुभ (त्याज्य)" : "Inauspicious"}'
)

v_content = v_content.replace(
    '{isHi ? "तारीख" : "Date"}',
    '{isTe ? "తేదీ" : isHi ? "तारीख" : "Date"}'
)
v_content = v_content.replace(
    '{isHi ? "सूर्योदय" : "Sunrise"}',
    '{isTe ? "సూర్యోదయం" : isHi ? "सूर्योदय" : "Sunrise"}'
)
v_content = v_content.replace(
    '{isHi ? "सूर्यास्त" : "Sunset"}',
    '{isTe ? "సూర్యాస్తమయం" : isHi ? "सूर्यास्त" : "Sunset"}'
)
v_content = v_content.replace(
    '{isHi ? "वार / दिनमान" : "Weekday / Duration"}',
    '{isTe ? "వారం / దినప్రమాణం" : isHi ? "वार / दिनमान" : "Weekday / Duration"}'
)

v_content = v_content.replace(
    '{isHi ? "अभी सक्रिय चौघड़िया" : "Currently Active Choghadiya"}',
    '{isTe ? "ప్రస్తుతం నడుస్తున్న చోఘడియా" : isHi ? "अभी सक्रिय चौघड़िया" : "Currently Active Choghadiya"}'
)
v_content = v_content.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy / Share")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ / షేర్" : isHi ? "शेयर करें" : "Copy / Share")}'
)

v_content = v_content.replace(
    '{isHi ? "दैनिक चौघड़िया समय सारणी" : "Choghadiya Timings Table"}',
    '{isTe ? "దిన చోఘడియా సమయ పట్టిక" : isHi ? "दैनिक चौघड़िया समय सारणी" : "Choghadiya Timings Table"}'
)
v_content = v_content.replace(
    '{isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}',
    '{isTe ? "పగటి చోఘడియా" : isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}'
)
v_content = v_content.replace(
    '{isHi ? "रात का चौघड़िया" : "Night Choghadiya"}',
    '{isTe ? "రాత్రి చోఘడియా" : isHi ? "रात का चौघड़िया" : "Night Choghadiya"}'
)

with open(view_file, 'w', encoding='utf-8') as f:
    f.write(v_content)

print("Updated choghadiya files successfully!")

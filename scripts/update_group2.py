# Group 2: Baby Names suite
import re

# 1. src/app/baby-names/page.tsx
with open("src/app/baby-names/page.tsx", "r", encoding="utf-8") as f:
    bn = f.read()

# Add FAQS_TE and update metadata & page
faqs_te_block = '''const FAQS_TE = [
  {
    question: "జన్మ నక్షత్ర పాదం ప్రకారం శిశువు పేరును ఎందుకు నిర్ణయించాలి?",
    answer:
      "వైదిక జ్యోతిష్య శాస్త్రం ప్రకారం, శిశువు జన్మించిన సమయంలో చంద్రుడు సంచరించే నక్షత్రం మరియు చరణం (పాదం) ఒక పవిత్రమైన ధ్వని తరంగాన్ని (నామాక్షరం) ఉత్పత్తి చేస్తాయి. ఈ బీజాక్షరంతో పేరు ప్రారంభించడం వల్ల శిశువు ఆరోగ్యం, మేధస్సు మరియు గ్రహానుకూలత చక్కగా సమకూరుతాయి.",
  },
  {
    question: "రాశి అక్షరాలకు, నక్షత్ర నామాక్షరాలకు తేడా ఏమిటి?",
    answer:
      "ఒక రాశిలో రెండుంబావు నక్షత్రాలు (9 పాదాలు) ఉంటాయి. రాశి అక్షరాలు సాధారణ అక్షర సమూహాన్ని సూచిస్తాయి (ఉదాహరణకు మేష రాశికి అ, ల, ఇ), కానీ నక్షత్ర పాదం అనేది జనన సమయానికి అత్యంత ఖచ్చితమైన నామాక్షరాన్ని అందిస్తుంది (ఉదాహరణకు అశ్విని 1వ పాదానికి 'చు', 2వ పాదానికి 'చే'). వైదిక సంప్రదాయంలో నక్షత్ర పాదాక్షరానికే ప్రథమ ప్రాధాన్యత ఇవ్వబడుతుంది.",
  },
  {
    question: "నామకరణ సంస్కారాన్ని ఏ రోజు మరియు ముహూర్తంలో జరపాలి?",
    answer:
      "గృహ్య సూత్రాల ప్రకారం, శిశువు జన్మించిన 10వ, 11వ, 12వ లేదా 16వ రోజున సూతక విముక్తి తర్వాత నామకరణం నిర్వహిస్తారు. దీనికి స్థిర నక్షత్రాలు (రోహిణి, ఉత్తర ఫల్గుణి, ఉత్తరాషాఢ, ఉత్తరాభాద్ర), పుష్యమి, హస్త, అనురాధ మరియు రిక్త తిథులు (4, 9, 14, అమావాస్య) మినహాయించి శుభ తిథులు శ్రేష్ఠమైనవి.",
  },
  {
    question: "సనాతన సంప్రదాయంలో శిశువుకు నిర్ణయించే 4 పేర్లు ఏమిటి?",
    answer:
      "శాస్త్రాల ప్రకారం 4 రకాల పేర్ల విధానం కలదు: (1) నక్షత్ర నామం (జన్మ నక్షత్రం ఆధారంగా రహస్య నామం), (2) దేవతా నామం (కులదైవం లేదా ఇష్టదైవం పేరు), (3) మాస నామం (జన్మించిన చాంద్రమాస విష్ణు నామం), మరియు (4) వ్యవహారిక నామం (సమాజంలో, పాఠశాలలో పిలిచే అందమైన పేరు).",
  },
];
'''

bn = bn.replace('const FAQS_HI = [', faqs_te_block + '\nconst FAQS_HI = [')

bn_meta_old = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "नक्षत्र अनुसार बच्चों के नाम 2026 — 108 पाद नामाक्षर, 12 राशि के आधुनिक व वैदिक नाम"
      : "Baby Names by Nakshatra & Pada 2026 (नक्षत्र अनुसार नाम) — 108 Vedic Namkaran Syllables & Modern Names",
    description: isHi
      ? "27 नक्षत्रों के 108 पाद नामाक्षर (1, 2, 3, 4 पाद) और 12 राशियों के अनुसार नवजात बालकों और बालिकाओं के सर्वश्रेष्ठ वैदिक व आधुनिक नाम। सुंदर संस्कृत अर्थ, कुलदेवी-देवता एवं शास्त्रसम्मत नामकरण विधि।"
      : "Find auspicious Hindu baby names by Nakshatra and Pada (1, 2, 3, 4) in 2026. Complete 108 sacred Vedic syllables, 12 Rashi letters, boy & girl names with Sanskrit meanings, deities, and Namkaran rules.",
    path: PATHS.babyNames,'''

bn_meta_new = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isTe
      ? "నక్షత్రం ప్రకారం శిశువుల పేర్లు 2026 — 108 పాద నామాక్షరాలు, 12 రాశుల వైదిక & ఆధునిక పేర్లు"
      : isHi
      ? "नक्षत्र अनुसार बच्चों के नाम 2026 — 108 पाद नामाक्षर, 12 राशि के आधुनिक व वैदिक नाम"
      : "Baby Names by Nakshatra & Pada 2026 (नक्षत्र अनुसार नाम) — 108 Vedic Namkaran Syllables & Modern Names",
    description: isTe
      ? "27 నక్షత్రాల 108 పాద నామాక్షరాలు మరియు 12 రాశుల ఆధారంగా నవజాత బాలురు, బాలికలకు శ్రేష్ఠమైన వైదిక & ఆధునిక పేర్లు. సంస్కృత అర్థాలు మరియు నామకరణ పద్ధతి."
      : isHi
      ? "27 नक्षत्रों के 108 पाद नामाक्षर (1, 2, 3, 4 पाद) और 12 राशियों के अनुसार नवजात बालकों और बालिकाओं के सर्वश्रेष्ठ वैदिक व आधुनिक नाम। सुंदर संस्कृत अर्थ, कुलदेवी-देवता एवं शास्त्रसम्मत नामकरण विधि।"
      : "Find auspicious Hindu baby names by Nakshatra and Pada (1, 2, 3, 4) in 2026. Complete 108 sacred Vedic syllables, 12 Rashi letters, boy & girl names with Sanskrit meanings, deities, and Namkaran rules.",
    path: PATHS.babyNames,'''

bn = bn.replace(bn_meta_old, bn_meta_new)

bn_page_old = '''export default async function BabyNamesPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? FAQS_HI : FAQS_EN;'''

bn_page_new = '''export default async function BabyNamesPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";
  const faqs = isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN;'''

bn = bn.replace(bn_page_old, bn_page_new)

bn = bn.replace(
    'title={\n          isHi\n            ? "नक्षत्र एवं राशि अनुसार बच्चों के नाम"\n            : "Vedic Baby Names by Nakshatra & Rashi"\n        }',
    'title={\n          isTe\n            ? "నక్షత్రం & రాశి ప్రకారం శిశువుల పేర్లు"\n            : isHi\n            ? "नक्षत्र एवं राशि अनुसार बच्चों के नाम"\n            : "Vedic Baby Names by Nakshatra & Rashi"\n        }'
)

bn = bn.replace(
    'subtitle={\n          isHi\n            ? "27 नक्षत्रों के 108 पाद नामाक्षर, 12 राशियां और आध्यात्मिक अर्थों से युक्त दिव्य बाल नामों की प्रामाणिक सूची।"\n            : "Discover authentic Hindu baby names curated by 108 Nakshatra Pada syllables, Rashi letters, deities, and profound Vedic meanings."\n        }',
    'subtitle={\n          isTe\n            ? "27 నక్షత్రాల 108 పాద నామాక్షరాలు, 12 రాశులు మరియు లోతైన అర్థాలతో కూడిన వైదిక శిశు నామాల ప్రామాణిక సమాహారం."\n            : isHi\n            ? "27 नक्षत्रों के 108 पाद नामाक्षर, 12 राशियां और आध्यात्मिक अर्थों से युक्त दिव्य बाल नामों की प्रामाणिक सूची।"\n            : "Discover authentic Hindu baby names curated by 108 Nakshatra Pada syllables, Rashi letters, deities, and profound Vedic meanings."\n        }'
)

bn = bn.replace(
    '[isHi ? "वैदिक नामकरण" : "Vedic Baby Names", PATHS.babyNames]',
    '[isTe ? "నక్షత్ర నామకరణం" : isHi ? "वैदिक नामकरण" : "Vedic Baby Names", PATHS.babyNames]'
)

bn = bn.replace(
    'title={\n              isHi\n                ? "वैदिक नामकरण से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)"\n                : "Frequently Asked Questions about Vedic Baby Names"\n            }',
    'title={\n              isTe\n                ? "వైదిక నామకరణం గురించి తరచుగా అడిగే ప్రశ్నలు (FAQs)"\n                : isHi\n                ? "वैदिक नामकरण से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)"\n                : "Frequently Asked Questions about Vedic Baby Names"\n            }'
)

with open("src/app/baby-names/page.tsx", "w", encoding="utf-8") as f:
    f.write(bn)
print("SUCCESS: Updated baby-names/page.tsx")

# 2. src/components/baby-names/BabyNamesView.tsx
with open("src/components/baby-names/BabyNamesView.tsx", "r", encoding="utf-8") as f:
    bv = f.read()

bv = bv.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')

# Share text
old_share = '''    const text = isHi
      ? `🕉️ वैदिक नाम: ${item.nameHi} (${item.name})\\nअर्थ: ${item.meaningHi}\\nनक्षत्र: ${item.nakshatraHi} · राशि: ${item.rashiHi}\\n\\nBhaktiVoice पर अपने शिशु के लिए वैदिक नामकरण देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🕉️ Vedic Baby Name: ${item.name} (${item.nameHi})\\nMeaning: ${item.meaning}\\nNakshatra: ${item.nakshatra} · Rashi: ${item.rashi}\\n\\nFind auspicious Vedic baby names on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;'''

new_share = '''    const text = isTe
      ? `🕉️ వైదిక నామం: ${item.name} (${item.nameHi})\\nఅర్థం: ${item.meaning}\\nనక్షత్రం: ${item.nakshatra} · రాశి: ${item.rashi}\\n\\nభక్తి వాయిస్ లో మరిన్ని వైదిక శిశు నామాలు చూడండి: ${typeof window !== "undefined" ? window.location.href : ""}`
      : isHi
      ? `🕉️ वैदिक नाम: ${item.nameHi} (${item.name})\\nअर्थ: ${item.meaningHi}\\nनक्षत्र: ${item.nakshatraHi} · राशि: ${item.rashiHi}\\n\\nBhaktiVoice पर अपने शिशु के लिए वैदिक नामकरण देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🕉️ Vedic Baby Name: ${item.name} (${item.nameHi})\\nMeaning: ${item.meaning}\\nNakshatra: ${item.nakshatra} · Rashi: ${item.rashi}\\n\\nFind auspicious Vedic baby names on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;'''

bv = bv.replace(old_share, new_share)

# Tabs
bv = bv.replace(
    '{isHi ? "वैदिक नामकरण शोधक (Baby Names)" : "Vedic Baby Names by Nakshatra & Rashi"}',
    '{isTe ? "నక్షత్రం & రాశి ప్రకారం శిశువుల పేర్లు" : isHi ? "वैदिक नामकरण शोधक (Baby Names)" : "Vedic Baby Names by Nakshatra & Rashi"}'
)
bv = bv.replace(
    '{isHi ? "नक्षत्र अनुसार" : "By Nakshatra"}',
    '{isTe ? "నక్షత్రం ప్రకారం" : isHi ? "नक्षत्र अनुसार" : "By Nakshatra"}'
)
bv = bv.replace(
    '{isHi ? "राशि अनुसार" : "By Rashi"}',
    '{isTe ? "రాశి ప్రకారం" : isHi ? "राशि अनुसार" : "By Rashi"}'
)
bv = bv.replace(
    '{isHi ? "सभी नाम" : "All Names"}',
    '{isTe ? "అన్ని పేర్లు" : isHi ? "सभी नाम" : "All Names"}'
)
bv = bv.replace(
    '{isHi ? `पसंदीदा (${favorites.length})` : `Favorites (${favorites.length})`}',
    '{isTe ? `ఇష్టమైనవి (${favorites.length})` : isHi ? `पसंदीदा (${favorites.length})` : `Favorites (${favorites.length})`}'
)

# Selectors
bv = bv.replace(
    '{isHi ? "1. जन्म नक्षत्र चुनें (27 नक्षत्र)" : "1. Select Janma Nakshatra (27 Constellations)"}',
    '{isTe ? "1. జన్మ నక్షత్రాన్ని ఎంచుకోండి (27 నక్షత్రాలు)" : isHi ? "1. जन्म नक्षत्र चुनें (27 नक्षत्र)" : "1. Select Janma Nakshatra (27 Constellations)"}'
)
bv = bv.replace(
    '{isHi ? "सभी पाद" : "All Padas"}',
    '{isTe ? "అన్ని పాదాలు" : isHi ? "सभी पाद" : "All Padas"}'
)
bv = bv.replace(
    '{isHi ? "अपनी चंद्र राशि चुनें (12 राशियां)" : "Select Moon Sign (12 Rashis)"}',
    '{isTe ? "మీ చంద్ర రాశిని ఎంచుకోండి (12 రాశులు)" : isHi ? "अपनी चंद्र राशि चुनें (12 राशियां)" : "Select Moon Sign (12 Rashis)"}'
)
bv = bv.replace(
    '{isHi ? "लिंग:" : "Gender:"}',
    '{isTe ? "లింగం:" : isHi ? "लिंग:" : "Gender:"}'
)
bv = bv.replace(
    'placeholder={isHi ? "नाम या अर्थ खोजें..." : "Search name or meaning..."}',
    'placeholder={isTe ? "పేరు లేదా అర్థాన్ని వెతకండి..." : isHi ? "नाम या अर्थ खोजें..." : "Search name or meaning..."}'
)
bv = bv.replace(
    '{isHi ? "← वापस सभी नाम देखें" : "← View all names"}',
    '{isTe ? "← అన్ని పేర్లు చూడండి" : isHi ? "← वापस सभी नाम देखें" : "← View all names"}'
)
bv = bv.replace(
    '{isHi ? "कोई नाम नहीं मिला" : "No Matching Names Found"}',
    '{isTe ? "ఎటువంటి పేర్లు లభించలేదు" : isHi ? "कोई नाम नहीं मिला" : "No Matching Names Found"}'
)
bv = bv.replace(
    '{isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}',
    '{isTe ? "ఫిల్టర్లను రీసెట్ చేయండి" : isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}'
)
bv = bv.replace(
    'title={isHi ? "शेयर करें" : "Share"}',
    'title={isTe ? "షేర్ చేయండి" : isHi ? "शेयर करें" : "Share"}'
)
bv = bv.replace(
    '{isHi ? "वैदिक नामकरण संस्कार — शास्त्रीय विधि एवं महत्व" : "Vedic Namkaran Samskara — Ancient Classical Guidelines"}',
    '{isTe ? "వైదిక నామకరణ సంస్కారం — శాస్త్రీయ పద్ధతి మరియు ప్రాముఖ్యత" : isHi ? "वैदिक नामकरण संस्कार — शास्त्रीय विधि एवं महत्व" : "Vedic Namkaran Samskara — Ancient Classical Guidelines"}'
)

with open("src/components/baby-names/BabyNamesView.tsx", "w", encoding="utf-8") as f:
    f.write(bv)
print("SUCCESS: Updated BabyNamesView.tsx")

import re

with open('src/app/muhurat/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Metadata
content = content.replace(
    '  const locale = await getLocale();\n  const isHi = locale === "hi";\n\n  const title = isHi',
    '  const locale = await getLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n\n  const title = isTe\n    ? "శుభ ముహూర్తాలు 2026 — చోఘడియా, వివాహం, గృహ ప్రవేశం, వాహనం, ఆస్తి కొనుగోలు & శుభ హోరా"\n    : isHi'
)

content = content.replace(
    '  const description = isHi\n    ? "वैदिक दृक सिद्धान्त पर आधारित दैनिक शुभ मुहूर्त, दिन-रात का चौघड़िया, आज का अभिजित मुहूर्त, राहु काल, विवाह मुहूर्त 2026, गृह प्रवेश, वाहन क्रय एवं सर्वार्थ सिद्धि योग।"',
    '  const description = isTe\n    ? "వైదిక దృక్-సిద్ధాంత ఆధారిత దిన శుభ ముహూర్తాలు, పగలు-రాత్రి చోఘడియా, నేటి అభిజిత్ ముహూర్తం, రాహుకాలం, వివాహ ముహూర్తాలు 2026, గృహ ప్రవేశం, వాహన కొనుగోలు & సర్వార్థ సిద్ధి యోగం."\n    : isHi\n    ? "वैदिक दृक सिद्धान्त पर आधारित दैनिक शुभ मुहूर्त, दिन-रात का चौघड़िया, आज का अभिजित मुहूर्त, राहु काल, विवाह मुहूर्त 2026, गृह प्रवेश, वाहन क्रय एवं सर्वार्थ सिद्धि योग।\"'
)

old_keywords = '''    keywords: isHi
      ? [
          "शुभ मुहूर्त 2026",
          "आज का चौघड़िया",
          "विवाह मुहूर्त 2026",
          "गृह प्रवेश मुहूर्त",
          "अभिजित मुहूर्त समय",
          "राहु काल आज",
          "वाहन क्रय मुहूर्त",
          "संपत्ति खरीद मुहूर्त",
          "शुभ ग्रह होरा",
          "गौरी पंचांगम",
          "जैन पच्चक्खाण",
          "सर्वार्थ सिद्धि योग",
        ]'''

new_keywords = '''    keywords: isTe
      ? [
          "శుభ ముహూర్తాలు 2026",
          "నేటి చోఘడియా",
          "వివాహ ముహూర్తాలు 2026",
          "గృహ ప్రవేశ ముహూర్తం",
          "అభిజిత్ ముహూర్తం సమయం",
          "రాహుకాలం నేడు",
          "వాహన కొనుగోలు ముహూర్తం",
          "ఆస్తి కొనుగోలు ముహూర్తం",
          "శుభ గ్రహ హోరా",
          "గౌరీ పంచాంగం",
          "సర్వార్థ సిద్ధి యోగం",
        ]
      : isHi
      ? [
          "शुभ मुहूर्त 2026",
          "आज का चौघड़िया",
          "विवाह मुहूर्त 2026",
          "गृह प्रवेश मुहूर्त",
          "अभिजित मुहूर्त समय",
          "राहु काल आज",
          "वाहन क्रय मुहूर्त",
          "संपत्ति खरीद मुहूर्त",
          "शुभ ग्रह होरा",
          "गौरी पंचांगम",
          "जैन पच्चक्खाण",
          "सर्वार्थ सिद्धि योग",
        ]'''

content = content.replace(old_keywords, new_keywords)

faqs_te_block = '''const FAQS_TE = [
  {
    question: "ముహూర్తం అంటే ఏమిటి మరియు దైనందిన జీవితంలో దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "వైదిక కాల గణనలో 48 నిమిషాల కాలాన్ని ఒక 'ముహూర్తం' అంటారు (రోజు మరియు రాత్రి కలిపి మొత్తం 30 ముహూర్తాలు ఉంటాయి). ఏదైనా ముఖ్యమైన పని, సంస్కారం లేదా వ్యాపార ప్రయాణాన్ని విశ్వ అనుకూలత కలిగిన శుభ ముహూర్తంలో ప్రారంభించడం వల్ల విఘ్నాలు తొలగి, కార్యసిద్ధి లభిస్తుంది.",
  },
  {
    question: "చోఘడియాలో ఏ సమయాలు శుభమైనవి మరియు ఏవి విసర్జించాలి?",
    answer:
      "చోఘడియాలోని ఏడు కాలాలలో 'అమృత' (అత్యుత్తమమైనది), 'శుభ' (మాంగలిక కార్యాలకు), 'లాభ' (వ్యాపార పురోగతికి), మరియు 'చర' (ప్రయాణాలకు) శుభప్రదమైనవిగా పరిగణించబడతాయి. అలాగే 'రోగ', 'కాల' మరియు 'ఉద్వేగ'లను అశుభకరమైనవిగా భావించి, ఆ సమయాల్లో నూతన కార్యాలు ప్రారంభించకుండా ఉండాలి.",
  },
  {
    question: "అభిజిత్ ముహూర్తాన్ని సర్వదోష నివారిణిగా ఎందుకు భావిస్తారు?",
    answer:
      "అభిజిత్ ముహూర్తం ప్రతిరోజూ మధ్యాహ్న సమయానికి సుమారు 24 నిమిషాల ముందు నుండి 24 నిమిషాల తర్వాత వరకు (సూర్యుడు ఆకాశంలో అత్యున్నత బిందువులో ఉన్నప్పుడు) ఉంటుంది. దీనికి శ్రీ మహావిష్ణువు సుదర్శన చక్ర రక్షణ లభిస్తుంది, దీనివల్ల సాధారణ గ్రహ దోషాలన్నీ వాటంతట అవే తొలగిపోతాయి.",
  },
  {
    question: "వివాహం మరియు గృహ ప్రవేశ ముహూర్తాలలో త్రిబల శుద్ధి అంటే ఏమిటి?",
    answer:
      "వధూవరుల జాతకంలో గోచార రీత్యా సూర్యుడు, చంద్రుడు మరియు గురుడు (బృహస్పతి) అనుకూలంగా ఉండటాన్ని 'త్రిబల శుద్ధి' అంటారు. సూర్యుని నుండి ఆత్మబలం, చంద్రుని నుండి మనశ్శాంతి, గురుని నుండి దాంపత్య సుఖం మరియు సంతాన ప్రాప్తి సిద్ధిస్తాయి.",
  },
];
'''

content = content.replace('const FAQS_HI = [', faqs_te_block + '\nconst FAQS_HI = [')

# MuhuratHubPage body
content = content.replace(
    '  const locale = await getLocale();\n  const isHi = locale === "hi";',
    '  const locale = await getLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)

content = content.replace(
    'isHi ? "होम" : "Home",\n    [isHi ? "शुभ मुहूर्त" : "Shubh Muhurat", PATHS.muhurat]',
    'isTe ? "హోమ్" : isHi ? "होम" : "Home",\n    [isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Shubh Muhurat", PATHS.muhurat]'
)

content = content.replace(
    'title={isHi ? "वैदिक शुभ मुहूर्त एवं चौघड़िया डायरेक्टरी 2026" : "Vedic Shubh Muhurat & Timings Directory 2026"}',
    'title={isTe ? "వైదిక శుభ ముహూర్తాలు & చోఘడియా డైరెక్టరీ 2026" : isHi ? "वैदिक शुभ मुहूर्त एवं चौघड़िया डायरेक्टरी 2026" : "Vedic Shubh Muhurat & Timings Directory 2026"}'
)

content = content.replace(
    '{isHi\n            ? "दैनिक चौघड़िया, शुभ ग्रह होरा, अभिजित मुहूर्त, विवाह मुहूर्त, गृह प्रवेश, संपत्ति व वाहन क्रय के सटीक एवं शास्त्रोक्त मुहूर्त। 100% प्रामाणिक दृक सिद्धान्त गणना।"',
    '{isTe\n            ? "దిన చోఘడియా, శుభ గ్రహ హోరా, అభిజిత్ ముహూర్తం, వివాహ ముహూర్తాలు, గృహ ప్రవేశం, ఆస్తి & వాహన కొనుగోలుకు శాస్త్రోక్త ముహూర్తాలు. 100% ప్రామాణిక దృక్-సిద్ధాంత గణన."\n            : isHi\n            ? "दैनिक चौघड़िया, शुभ ग्रह होरा, अभिजित मुहूर्त, विवाह मुहूर्त, गृह प्रवेश, संपत्ति व वाहन क्रय के सटीक एवं शास्त्रोक्त मुहूर्त। 100% प्रामाणिक दृक सिद्धान्त गणना।\"'
)

# Widget
content = content.replace(
    '{isHi ? "आज के प्रमुख काल एवं मुहूर्त" : "Today\'s Key Muhurat Windows"}',
    '{isTe ? "నేటి ముఖ్య సమయాలు & ముహూర్తాలు" : isHi ? "आज के प्रमुख काल एवं मुहूर्त" : "Today\'s Key Muhurat Windows"}'
)

content = content.replace(
    '<span>{isHi ? "दृक गणित सम्मत" : "Accurate Ephemeris"}</span>',
    '<span>{isTe ? "దృక్-గణిత సిద్ధాంతం" : isHi ? "दृक गणित सम्मत" : "Accurate Ephemeris"}</span>'
)

# 4 snapshot cards
content = content.replace(
    '{isHi ? "परम शुभ काल" : "Highly Auspicious"}',
    '{isTe ? "అత్యంత శుభ సమయం" : isHi ? "परम शुभ काल" : "Highly Auspicious"}'
)
content = content.replace(
    '{isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}',
    '{isTe ? "అభిజిత్ ముహూర్తం" : isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}'
)
content = content.replace(
    '{isHi ? "सभी मांगलिक कार्यों एवं विजय प्राप्ति हेतु श्रेष्ठ।" : "Superior window for initiating any successful enterprise or travel."}',
    '{isTe ? "అన్ని మాంగలిక పనులు & విజయ ప్రాప్తికి అత్యుత్తమ సమయం." : isHi ? "सभी मांगलिक कार्यों एवं विजय प्राप्ति हेतु श्रेष्ठ।" : "Superior window for initiating any successful enterprise or travel."}'
)

content = content.replace(
    '{isHi ? "अमृत वेला" : "Nectar Period"}',
    '{isTe ? "అమృత వేళ" : isHi ? "अमृत वेला" : "Nectar Period"}'
)
content = content.replace(
    '{isHi ? "अमृत काल" : "Amrit Kaal"}',
    '{isTe ? "అమృత కాలం" : isHi ? "अमृत काल" : "Amrit Kaal"}'
)
content = content.replace(
    '{isHi ? "आरोग्य, मंत्र सिद्धि व महत्वपूर्ण अनुष्ठान हेतु।" : "Ideal for healing remedies, japa, and solemn ceremonies."}',
    '{isTe ? "ఆరోగ్యం, మంత్ర సిద్ధి & ముఖ్యమైన పూజానుష్ఠానాలకు శ్రేష్ఠం." : isHi ? "आरोग्य, मंत्र सिद्धि व महत्वपूर्ण अनुष्ठान हेतु।" : "Ideal for healing remedies, japa, and solemn ceremonies."}'
)

content = content.replace(
    '{isHi ? "साधना काल" : "Spiritual Dawn"}',
    '{isTe ? "సాధనా వేళ" : isHi ? "साधना काल" : "Spiritual Dawn"}'
)
content = content.replace(
    '{isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}',
    '{isTe ? "బ్రహ్మ ముహూర్తం" : isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}'
)
content = content.replace(
    '{isHi ? "योग, प्राणायाम, ध्यान एवं भगवन्नाम जप के लिए।" : "Optimal window for meditation, study, and divine contemplation."}',
    '{isTe ? "ధ్యానం, ప్రాణాయామం & నామ జప సాధనకు ఉత్తమ సమయం." : isHi ? "योग, प्राणायाम, ध्यान एवं भगवन्नाम जप के लिए।" : "Optimal window for meditation, study, and divine contemplation."}'
)

content = content.replace(
    '{isHi ? "अशुभ वेला (त्याज्य)" : "Inauspicious (Avoid)"}',
    '{isTe ? "అశుభ వేళ (విసర్జించాలి)" : isHi ? "अशुभ वेला (त्याज्य)" : "Inauspicious (Avoid)"}'
)
content = content.replace(
    '{isHi ? "राहु काल" : "Rahu Kaal"}',
    '{isTe ? "రాహు కాలం" : isHi ? "राहु काल" : "Rahu Kaal"}'
)
content = content.replace(
    '{isHi ? "नए अनुबंध, यात्रा व धन लेनदेन से परहेज करें।" : "Avoid new travel, major agreements, or financial undertakings."}',
    '{isTe ? "నూతన ఒప్పందాలు, ప్రయాణాలు & ధన లావాదేవీలను నివారించండి." : isHi ? "नए अनुबंध, यात्रा व धन लेनदेन से परहेज करें।" : "Avoid new travel, major agreements, or financial undertakings."}'
)

# 12 Cards
content = content.replace(
    '{isHi ? "दिन व रात का चौघड़िया" : "Day & Night Choghadiya"}',
    '{isTe ? "పగలు & రాత్రి చోఘడియా" : isHi ? "दिन व रात का चौघड़िया" : "Day & Night Choghadiya"}'
)
content = content.replace(
    '{isHi\n                    ? "सूर्य की स्थिति पर आधारित दिन एवं रात के १६ चौघड़िया काल। अमृत, शुभ, लाभ व चर का सटीक निर्धारण।"',
    '{isTe\n                    ? "సూర్య స్థితి ఆధారంగా పగలు మరియు రాత్రి 16 చోఘడియా సమయాలు. అమృత, శుభ, లాభ & చర ముహూర్తాల గణన."\n                    : isHi\n                    ? "सूर्य की स्थिति पर आधारित दिन एवं रात के १६ चौघड़िया काल। अमृत, शुभ, लाभ व चर का सटीक निर्धारण।\"'
)
content = content.replace(
    '{isHi ? "अमृत • शुभ • लाभ • चर" : "Amrut • Shubh • Labh • Char"}',
    '{isTe ? "అమృత • శుభ • లాభ • చర" : isHi ? "अमृत • शुभ • लाभ • चर" : "Amrut • Shubh • Labh • Char"}'
)
content = content.replace(
    '{isHi ? "चौघड़िया तालिका →" : "View Table →"}',
    '{isTe ? "చోఘడియా పట్టిక →" : isHi ? "चौघड़िया तालिका →" : "View Table →"}'
)

content = content.replace(
    '{isHi ? "शुभ ग्रह होरा चक्र" : "Planetary Hora Calculator"}',
    '{isTe ? "శుభ గ్రహ హోరా చక్రం" : isHi ? "शुभ ग्रह होरा चक्र" : "Planetary Hora Calculator"}'
)
content = content.replace(
    '{isHi\n                    ? "प्रत्येक घंटे का अधिपति ग्रह। सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र व शनि होरा में कार्यसिद्धि नियम।"',
    '{isTe\n                    ? "ప్రతి గంటకూ అధిపతి గ్రహం. సూర్య, చంద్ర, కుజ, బుధ, గురు, శుక్ర & శని హోరాలలో కార్యసిద్ధి నియమాలు."\n                    : isHi\n                    ? "प्रत्येक घंटे का अधिपति ग्रह। सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र व शनि होरा में कार्यसिद्धि नियम।\"'
)
content = content.replace(
    '{isHi ? "२४ घंटे का ग्रह प्रभाव" : "24-Hour Planetary Clock"}',
    '{isTe ? "24 గంటల గ్రహ ప్రభావం" : isHi ? "२४ घंटे का ग्रह प्रभाव" : "24-Hour Planetary Clock"}'
)
content = content.replace(
    '{isHi ? "होरा चक्र देखें →" : "Calculate Hora →"}',
    '{isTe ? "హోరా చక్రం చూడండి →" : isHi ? "होरा चक्र देखें →" : "Calculate Hora →"}'
)

content = content.replace(
    '{isHi ? "शुभ विवाह मुहूर्त 2026" : "Vivah Muhurat 2026 (Weddings)"}',
    '{isTe ? "శుభ వివాహ ముహూర్తాలు 2026" : isHi ? "शुभ विवाह मुहूर्त 2026" : "Vivah Muhurat 2026 (Weddings)"}'
)
content = content.replace(
    '{isHi\n                    ? "त्रिबल शुद्धि, गुरु-शुक्र अस्त विचार, रोहिणी-मृగशिरा आदि प्रशस्त नक्षत्रों में पाणिग्रहण संस्कार।"',
    '{isTe\n                    ? "త్రిబల శుద్ధి, గురు-శుక్ర అస్తమయ విచారం, రోహిణి-మృగశిర తదితర శుభ నక్షత్రాలలో పాణిగ్రహణ సంస్కారం."\n                    : isHi\n                    ? "त्रिबल शुद्धि, गुरु-शुक्र अस्त विचार, रोहिणी-मृగशिरा आदि प्रशस्त नक्षत्रों में पाणिग्रहण संस्कार।\"'
)
content = content.replace(
    '{isHi ? "माह-दर-माह विवाह तिथियाँ" : "Monthly Wedding Calendar"}',
    '{isTe ? "నెలవారీ వివాహ తేదీలు" : isHi ? "माह-दर-माह विवाह तिथियाँ" : "Monthly Wedding Calendar"}'
)
content = content.replace(
    '{isHi ? "विवाह तिथियाँ →" : "Wedding Dates →"}',
    '{isTe ? "వివాహ తేదీలు →" : isHi ? "विवाह तिथियाँ →" : "Wedding Dates →"}'
)

content = content.replace(
    '{isHi ? "गृह प्रवेश एवं वास्तु मुहूर्त" : "Griha Pravesh Muhurat (Housewarming)"}',
    '{isTe ? "గృహ ప్రవేశం & వాస్తు ముహూర్తం" : isHi ? "गृह प्रवेश एवं वास्तु मुहूर्त" : "Griha Pravesh Muhurat (Housewarming)"}'
)
content = content.replace(
    '{isHi\n                    ? "नूतन, अपूर्व व द्वंद्व गृह प्रवेश हेतु स्थिर लग्न, सूर्य दक्षिणायन-उत्तरायण एवं वास्तु कलश स्थापना।"',
    '{isTe\n                    ? "నూతన, అపూర్వ & ద్వంద్వ గృహ ప్రవేశానికి స్థిర లగ్నం, సూర్య ఉత్తరాయణం & వాస్తు కలశ స్థాపన ముహూర్తాలు."\n                    : isHi\n                    ? "नूतन, अपूर्व व द्वंद्व गृह प्रवेश हेतु स्थिर लग्न, सूर्य दक्षिणायन-उत्तरायण एवं वास्तु कलश स्थापना।\"'
)
content = content.replace(
    '{isHi ? "वास्तु शुद्धि एवं स्थिर लग्न" : "Vastu Sthira Lagna"}',
    '{isTe ? "వాస్తు శుద్ధి & స్థిర లగ్నం" : isHi ? "वास्तु शुद्धि एवं स्थिर लग्न" : "Vastu Sthira Lagna"}'
)
content = content.replace(
    '{isHi ? "गृह प्रवेश तिथियाँ →" : "Housewarming Dates →"}',
    '{isTe ? "గృహ ప్రవేశ తేదీలు →" : isHi ? "गृह प्रवेश तिथियाँ →" : "Housewarming Dates →"}'
)

content = content.replace(
    '{isHi ? "संपत्ति एवं भूमि रजिस्ट्री मुहूर्त" : "Property Purchase & Registry"}',
    '{isTe ? "ఆస్తి & భూమి రిజిస్ట్రేషన్ ముహూర్తం" : isHi ? "संपत्ति एवं भूमि रजिस्ट्री मुहूर्त" : "Property Purchase & Registry"}'
)
content = content.replace(
    '{isHi\n                    ? "भूमि, प्लॉट, फ्लैट व व्यावसायिक संपत्ति क्रय एवं अनुबंध पत्र हस्ताक्षर हेतु शुभ योग ও नक्षत्र।"',
    '{isTe\n                    ? "భూమి, ప్లాట్, ఫ్లాట్ & వ్యాపార ఆస్తి కొనుగోలు ఒప్పందాల కొరకు శుభ యోగాలు & నక్షత్రాలు."\n                    : isHi\n                    ? "भूमि, प्लॉट, फ्लैट व व्यावसायिक संपत्ति क्रय एवं अनुबंध पत्र हस्ताक्षर हेतु शुभ योग ও नक्षत्र।\"'
)
content = content.replace(
    '{isHi ? "भूमि व फ्लैट रजिस्ट्री" : "Land & Real Estate"}',
    '{isTe ? "భూమి & ఫ్లాట్ రిజిస్ట్రేషన్" : isHi ? "भूमि व फ्लैट रजिस्ट्री" : "Land & Real Estate"}'
)
content = content.replace(
    '{isHi ? "रजिस्ट्री मुहूर्त →" : "Registry Dates →"}',
    '{isTe ? "రిజిస్ట్రేషన్ తేదీలు →" : isHi ? "रजिस्ट्री मुहूर्त →" : "Registry Dates →"}'
)

content = content.replace(
    '{isHi ? "वाहन क्रय मुहूर्त (कार/बाइक)" : "Vehicle Purchase Muhurat"}',
    '{isTe ? "వాహన కొనుగోలు ముహూర్తం (కారు/బైక్)" : isHi ? "वाहन क्रय मुहूर्त (कार/बाइक)" : "Vehicle Purchase Muhurat"}'
)
content = content.replace(
    '{isHi\n                    ? "कार, दोपहिया अथवा व्यावसायिक वाहन की डिलीवरी हेतु चर नक्षत्र (पुनर्वसु, स्वाति, श्रवण) का चयन।"',
    '{isTe\n                    ? "కారు, ద్విచక్ర లేదా వ్యాపార వాహనాల కొనుగోలు మరియు డెలివరీ కొరకు చర నక్షత్రాల ఎంపిక."\n                    : isHi\n                    ? "कार, दोपहिया अथवा व्यावसायिक वाहन की डिलीवरी हेतु चर नक्षत्र (पुनर्वसु, स्वाति, श्रवण) का चयन।\"'
)
content = content.replace(
    '{isHi ? "सुरक्षित एवं सुखद यात्रा" : "Safe Vehicle Delivery"}',
    '{isTe ? "సురక్షిత & సుఖ ప్రయాణం" : isHi ? "सुरक्षित एवं सुखद यात्रा" : "Safe Vehicle Delivery"}'
)
content = content.replace(
    '{isHi ? "वाहन मुहूर्त →" : "Vehicle Dates →"}',
    '{isTe ? "వాహన ముహూర్తాలు →" : isHi ? "वाहन मुहूर्त →" : "Vehicle Dates →"}'
)

content = content.replace(
    '{isHi ? "दैनिक लग्न तालिका" : "Daily Lagna Table (Ascendant)"}',
    '{isTe ? "దిన లగ్న పట్టిక" : isHi ? "दैनिक लग्न तालिका" : "Daily Lagna Table (Ascendant)"}'
)
content = content.replace(
    '{isHi\n                    ? "प्रत्येक दिन मेष से मीन पर्यन्त १२ लग्नों का सटीक उदय एवं अस्त समय। शुभ मुहूर्त चयन का आधार।"',
    '{isTe\n                    ? "ప్రతిరోజూ మేషం నుండి మీనం వరకు 12 లగ్నాల ఉదయ-అస్తమయ సమయాలు. శుభ ముహూర్త నిర్ణయానికి ఆధారం."\n                    : isHi\n                    ? "प्रत्येक दिन मेष से मीन पर्यन्त १२ लग्नों का सटीक उदय एवं अस्त समय। शुभ मुहूर्त चयन का आधार।\"'
)
content = content.replace(
    '{isHi ? "१२ राशियों का उदय काल" : "12 Ascendant Spans"}',
    '{isTe ? "12 రాశుల ఉదయ కాలం" : isHi ? "१२ राशियों का उदय काल" : "12 Ascendant Spans"}'
)
content = content.replace(
    '{isHi ? "लग्न तालिका →" : "View Lagna →"}',
    '{isTe ? "లగ్న పట్టిక చూడండి →" : isHi ? "लग्न तालिका →" : "View Lagna →"}'
)

content = content.replace(
    '{isHi ? "गौरी पंचांगम" : "Gowri Panchangam"}',
    '{isTe ? "గౌరీ పంచాంగం" : isHi ? "गौरी पंचांगम" : "Gowri Panchangam"}'
)
content = content.replace(
    '{isHi\n                    ? "दक्षिण भारतीय वैदिक ज्योतिष पर आधारित दिन-रात के १६ गौरी मुहूर्त। उति, अमृत, लाभ ও रोग विचार।"',
    '{isTe\n                    ? "దక్షిణ భారత వైదిక జ్యోతిష్య ఆధారిత పగలు-రాత్రి 16 గౌరీ ముహూర్తాలు. ఉతి, అమృత, లాభ & రోగ సమయాలు."\n                    : isHi\n                    ? "दक्षिण भारतीय वैदिक ज्योतिष पर आधारित दिन-रात के १६ गौरी मुहूर्त। उति, अमृत, लाभ ও रोग विचार।\"'
)
content = content.replace(
    '{isHi ? "अमृत, उति व लाभ काल" : "Amrita & Uthi Windows"}',
    '{isTe ? "అమృత, ఉతి & లాభ కాలాలు" : isHi ? "अमृत, उति व लाभ काल" : "Amrita & Uthi Windows"}'
)
content = content.replace(
    '{isHi ? "गौरी पंचांगम →" : "Explore Gowri →"}',
    '{isTe ? "గౌరీ పంచాంగం చూడండి →" : isHi ? "गौरी पंचांगम →" : "Explore Gowri →"}'
)

content = content.replace(
    '{isHi ? "जैन पच्चक्खाण एवं नवकारशी" : "Jain Pachchakkhan & Navkarshi"}',
    '{isTe ? "జైన పచ్చక్ఖాణ్ & నవకార్శీ" : isHi ? "जैन पच्चक्खाण एवं नवकारशी" : "Jain Pachchakkhan & Navkarshi"}'
)
content = content.replace(
    '{isHi\n                    ? "जैन धर्मानुसार नवकारशी, पोरसी, एकासणा, बियासणा एवं उपवास के दैनिक पच्चक्खाण सूत्र ও समय।"',
    '{isTe\n                    ? "జైన సంప్రదాయం ప్రకారం నవకార్శీ, పోరసీ, ఏకాసణా, బియాసణా మరియు ఉపవాస దిన పచ్చక్ఖాణ్ సమయాలు."\n                    : isHi\n                    ? "जैन धर्मानुसार नवकारशी, पोरसी, एकासणा, बियासणा एवं उपवास के दैनिक पच्चक्खाण सूत्र ও समय।\"'
)
content = content.replace(
    '{isHi ? "अहिंसा व संयम काल" : "Ascetic Fasting Timings"}',
    '{isTe ? "అహింస & సంయమ కాలం" : isHi ? "अहिंसा व संयम काल" : "Ascetic Fasting Timings"}'
)
content = content.replace(
    '{isHi ? "पच्चक्खाण समय →" : "View Timings →"}',
    '{isTe ? "పచ్చక్ఖాణ్ సమయాలు →" : isHi ? "पच्चक्खाण समय →" : "View Timings →"}'
)

content = content.replace(
    '{isHi ? "राहु काल, यमगण्ड एवं गुलिक" : "Rahu Kala, Yamaganda & Gulika"}',
    '{isTe ? "రాహు కాలం, యమగండం & గుళిక" : isHi ? "राहु काल, यमगण्ड एवं गुलिक" : "Rahu Kala, Yamaganda & Gulika"}'
)
content = content.replace(
    '{isHi\n                    ? "दिन के तीन सर्वाधिक संवेदनशील काल। राहु काल में आरंभ वर्जित, यमगण्ड में यात्रा त्याग ও गुलिक फल।"',
    '{isTe\n                    ? "రోజులో మూడు అత్యంత సున్నితమైన కాలాలు. రాహుకాలంలో నూతన ప్రారంభాలు, యమగండంలో ప్రయాణాలు నిషిద్ధం."\n                    : isHi\n                    ? "दिन के तीन सर्वाधिक संवेदनशील काल। राहु काल में आरंभ वर्जित, यमगण्ड में यात्रा त्याग ও गुलिक फल।\"'
)
content = content.replace(
    '{isHi ? "अशुभ काल परिहार" : "Inauspicious Shielding"}',
    '{isTe ? "అశుభ కాల నివారణ" : isHi ? "अशुभ काल परिहार" : "Inauspicious Shielding"}'
)
content = content.replace(
    '{isHi ? "राहु काल घटी →" : "Rahu Kaal Clock →"}',
    '{isTe ? "రాహు కాలం గడియలు →" : isHi ? "राहु काल घटी →" : "Rahu Kaal Clock →"}'
)

content = content.replace(
    '{isHi ? "सर्वार्थ व अमृत सिद्धि योग" : "Sarvartha & Amrit Siddhi Yoga"}',
    '{isTe ? "సర్వార్థ & అమృత సిద్ధి యోగం" : isHi ? "सर्वार्थ व अमृत सिद्धि योग" : "Sarvartha & Amrit Siddhi Yoga"}'
)
content = content.replace(
    '{isHi\n                    ? "वार एवं नक्षत्र के विशिष्ट संयोग से निर्मित सिद्ध योग। इस योग में किए गए सभी कार्य निर्विघ्न सिद्ध होते हैं।"',
    '{isTe\n                    ? "వారం మరియు నక్షత్రాల విశిష్ట సంయోగంతో ఏర్పడే సిద్ధి యోగం. ఈ యోగంలో చేపట్టిన అన్ని పనులు నిర్విఘ్నంగా పూర్తవుతాయి."\n                    : isHi\n                    ? "वार एवं नक्षत्र के विशिष्ट संयोग से निर्मित सिद्ध योग। इस योग में किए गए सभी कार्य निर्विघ्न सिद्ध होते हैं।\"'
)
content = content.replace(
    '{isHi ? "पुष्य योग व सिद्धि योग" : "Pushya & Siddhi Yogas"}',
    '{isTe ? "పుష్య యోగం & సిద్ధి యోగాలు" : isHi ? "पुष्य योग व सिद्धि योग" : "Pushya & Siddhi Yogas"}'
)
content = content.replace(
    '{isHi ? "योग तिथियाँ →" : "View Yogas →"}',
    '{isTe ? "యోగ తేదీలు చూడండి →" : isHi ? "योग तिथियाँ →" : "View Yogas →"}'
)

content = content.replace(
    '{isHi ? "पंचक रहित मुहूर्त निर्णय" : "Panchaka Rahita Muhurat"}',
    '{isTe ? "పంచక రహిత ముహూర్త నిర్ణయం" : isHi ? "पंचक रहित मुहूर्त निर्णय" : "Panchaka Rahita Muhurat"}'
)
content = content.replace(
    '{isHi\n                    ? "रोग, अग्नि, राज, चोर ও मृत्यु पंचक का गणितीय शोधन। शुभ कार्यों में पंचक दोष परिहार के नियम।"',
    '{isTe\n                    ? "రోగ, అగ్ని, రాజ, చోర & మృత్యు పంచకాల గణిత శోధన. శుభకార్యాలలో పంచక దోష పరిహార నియమాలు."\n                    : isHi\n                    ? "रोग, अग्नि, राज, चोर ও मृत्यु पंचक का गणितीय शोधन। शुभ कार्यों में पंचक दोष परिहार के नियम।\"'
)
content = content.replace(
    '{isHi ? "पंचक दोष शुद्धि" : "Panchaka Free Timings"}',
    '{isTe ? "పంచక దోష శుద్ధి" : isHi ? "पंचक दोष शुद्धि" : "Panchaka Free Timings"}'
)
content = content.replace(
    '{isHi ? "पंचक तालिका →" : "Panchaka Dates →"}',
    '{isTe ? "పంచక పట్టిక →" : isHi ? "पंचक तालिका →" : "Panchaka Dates →"}'
)

# FAQ section
content = content.replace(
    '{isHi ? "शुभ मुहूर्त से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions about Vedic Muhurat"}',
    '{isTe ? "శుభ ముహూర్తాల గురించి తరచుగా అడిగే ప్రశ్నలు (FAQ)" : isHi ? "शुभ मुहूर्त से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions about Vedic Muhurat"}'
)
content = content.replace(
    '<FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />',
    '<FaqList faqs={isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN} jsonLd />'
)

with open('src/app/muhurat/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated muhurat/page.tsx successfully!")

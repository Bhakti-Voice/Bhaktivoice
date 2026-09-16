import re

# 1. Update src/app/hora/page.tsx
hora_file = 'src/app/hora/page.tsx'
with open(hora_file, 'r', encoding='utf-8') as f:
    h_content = f.read()

h_faqs_te = '''const HORA_FAQS_TE = [
  {
    question: "గ్రహ హోరా అంటే ఏమిటి?",
    answer:
      "వైదిక కాల గణనలో సూర్యోదయం నుండి మరుసటి సూర్యోదయం వరకు 24 గంటలను 24 హోరాలుగా (12 పగటి హోరాలు, 12 రాత్రి హోరాలు) విభజిస్తారు. 'అహోరాత్ర' పదం నుండే 'హోరా' మరియు ఆంగ్లంలోని 'Hour' పదం ఉద్భవించాయి. ప్రతి హోరాపై సప్త గ్రహాలలో ఒకదాని ఆధిపత్యం ఉంటుంది.",
  },
  {
    question: "ధనలాభం, వ్యాపారం మరియు మాంగలిక పనులకు ఏ హోరా శ్రేష్ఠమైనది?",
    answer:
      "గురు (బృహస్పతి) హోరా మరియు శుక్ర హోరాలు సమస్త మాంగలిక కార్యాలు, వివాహ సంబంధాలు, ధన సంచయం మరియు ఆభరణాల కొనుగోలుకు పరమ శుభప్రదమైనవి. బుధ హోరా వ్యాపార ఒప్పందాలు మరియు విద్యకు అత్యుత్తమం.",
  },
  {
    question: "రోజులో మొదటి హోరా ఎలా నిర్ణయించబడుతుంది?",
    answer:
      "సూర్యోదయ సమయంలో ప్రారంభమయ్యే రోజులోని మొదటి హోరా ఎల్లప్పుడూ ఆ వారపు అధిపతి గ్రహానికి చెందినదై ఉంటుంది (ఉదాహరణకు: ఆదివారం సూర్య హోరా, సోమవారం చంద్ర హోరా, మంగళవారం కుజ హోరా మొదలైనవి).",
  },
];
'''

h_content = h_content.replace('const HORA_FAQS_HI = [', h_faqs_te + '\nconst HORA_FAQS_HI = [')

h_old_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `आज की शुभ होरा (${dateFormatted}) — 24 दैनिक ग्रह होरा चक्र | दिन व रात का शुभ मुहूर्त`
      : `Aaj Ki Hora (${dateFormatted}) — Planetary Hora Today, Day & Night Shubh Hora Timings`,
    description: isHi
      ? `आज ${dateFormatted} की 24 दैनिक ग्रह होरा का सटीक समय। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु और मंगल होरा के शुभ फल, व्यापार, यात्रा, गृह प्रवेश व नवीन कार्य आरम्भ हेतु शुभ होरा मुहूर्त सारणी।`
      : `Check accurate Aaj Ki Hora for today (${dateFormatted}). Complete 24-hour planetary hora table (Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars) with auspicious timings for wealth, travel, business, and Puja across 120+ cities.`,
    path: PATHS.hora,
    keywords: isHi'''

h_new_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `నేటి శుభ హోరా (${dateFormatted}) — 24 దిన గ్రహ హోరా చక్రం | పగలు & రాత్రి శుభ ముహూర్తం`
      : isHi
      ? `आज की शुभ होरा (${dateFormatted}) — 24 दैनिक ग्रह होरा चक्र | दिन व रात का शुभ मुहूर्त`
      : `Aaj Ki Hora (${dateFormatted}) — Planetary Hora Today, Day & Night Shubh Hora Timings`,
    description: isTe
      ? `నేటి ${dateFormatted} 24 దిన గ్రహ హోరాల ఖచ్చితమైన సమయం. సూర్య, శుక్ర, బుధ, చంద్ర, శని, గురు మరియు కుజ హోరాల ఫలితాలు, వ్యాపారం, ప్రయాణం & పూజా కార్యాల కొరకు శుభ హోరా సమయ పట్టిక.`
      : isHi
      ? `आज ${dateFormatted} की 24 दैनिक ग्रह होरा का सटीक समय। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु और मंगल होरा के शुभ फल, व्यापार, यात्रा, गृह प्रवेश व नवीन कार्य आरम्भ हेतु शुभ होरा मुहूर्त सारणी।`
      : `Check accurate Aaj Ki Hora for today (${dateFormatted}). Complete 24-hour planetary hora table (Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars) with auspicious timings for wealth, travel, business, and Puja across 120+ cities.`,
    path: PATHS.hora,
    keywords: isTe
      ? ["నేటి హోరా", "శుభ హోరా ముహూర్తం", "గ్రహ హోరా చక్రం", "గురు హోరా సమయం", "శుక్ర హోరా సమయం", "పగలు రాత్రి హోరా", "బంగారం కొనుగోలు హోరా"]
      : isHi'''

h_content = h_content.replace(h_old_meta, h_new_meta)

h_content = h_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? HORA_FAQS_HI : HORA_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? HORA_FAQS_TE : isHi ? HORA_FAQS_HI : HORA_FAQS_EN;'
)
h_content = h_content.replace(
    'title={isHi ? "आज की ग्रह होरा एवं शुभ समय" : "Today\'s Planetary Hora & Shubh Timings"}',
    'title={isTe ? "నేటి గ్రహ హోరా & శుభ సమయాలు" : isHi ? "आज की ग्रह होरा एवं शुभ समय" : "Today\'s Planetary Hora & Shubh Timings"}'
)
h_content = h_content.replace(
    'subtitle={\n          isHi\n            ? "24 घंटे की दैनिक ग्रह होरा सारणी। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु व मंगल होरा के अनुसार अपने शुभ कार्यों की योजना बनाएं।"',
    'subtitle={\n          isTe\n            ? "24 గంటల దిన గ్రహ హోరా సమయ పట్టిక. సూర్య, శుక్ర, బుధ, చంద్ర, శని, గురు మరియు కుజ హోరాల ప్రకారం మీ పనులను ప్లాన్ చేయండి."\n            : isHi\n            ? "24 घंटे की दैनिक ग्रह होरा सारणी। सूर्य, शुक्र, बुध, चंद्र, शनि, गुरु व मंगल होरा के अनुसार अपने शुभ कार्यों की योजना बनाएं।\"'
)
h_content = h_content.replace(
    '[isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],',
    '[isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],'
)
h_content = h_content.replace(
    '[isHi ? "दैनिक होरा" : "Hora", PATHS.hora],',
    '[isTe ? "దిన హోరా" : isHi ? "दैनिक होरा" : "Hora", PATHS.hora],'
)
h_content = h_content.replace(
    'title={isHi ? "ग्रह होरा से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Planetary Hora"}',
    'title={isTe ? "గ్రహ హోరా గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "ग्रह होरा से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Planetary Hora"}'
)

with open(hora_file, 'w', encoding='utf-8') as f:
    f.write(h_content)

# 2. Update src/app/bhadra/page.tsx
bhadra_file = 'src/app/bhadra/page.tsx'
with open(bhadra_file, 'r', encoding='utf-8') as f:
    b_content = f.read()

b_faqs_te = '''const BHADRA_FAQS_TE = [
  {
    question: "భద్ర అంటే ఎవరు మరియు వైదిక జ్యోతిష్యంలో దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "పౌరాణిక విశ్వాసాల ప్రకారం భద్ర సూర్యదేవుడు మరియు ఛాయాదేవిల పుత్రిక, శనిదేవుని సోదరి. జ్యోతిష్యంలో 'విష్టి కరణం'నే భద్ర అని పిలుస్తారు. ఆమె ఉగ్ర స్వభావం కారణంగా భద్రా కాలంలో శుభ మరియు మాంగలిక కార్యాలు పూర్తిగా నిషిద్ధం.",
  },
  {
    question: "భద్రా వాసం అంటే ఏమిటి మరియు భూమిపై దీని ప్రభావం ఎలా ఉంటుంది?",
    answer:
      "చంద్రుని రాశిని బట్టి భద్ర మూడు లోకాలలో నివసిస్తుంది: 1. స్వర్గ లోకం (మేషం, వృషభం, మిథునం, వృశ్చికం) — భూమిపై శుభం; 2. పాతాళ లోకం (ధనుస్సు, మకరం, కుంభం, మీనం) — వ్యాపార ధనలాభాలకు అనుకూలం; 3. మృత్యులోకం / భూమి (కర్కాటకం, సింహం, కన్య, తుల) — అత్యంత హానికరం, ఇందులో సమస్త శుభ కార్యాలు వర్జ్యం.",
  },
  {
    question: "భద్రా పుచ్ఛ కాలంలో శుభ కార్యం చేయవచ్చా?",
    answer:
      "అవును. అత్యవసర పరిస్థితులలో పనులను వాయిదా వేయడం సాధ్యం కానప్పుడు భద్ర యొక్క పుచ్ఛ భాగంలో కార్యాన్ని పూర్తి చేయవచ్చు. అయితే భద్ర ముఖ కాలంలో పనులు చేయడం వల్ల సర్వనాశన భయం ఉంటుందని శాస్త్రాలు చెబుతున్నాయి.",
  },
];
'''

b_content = b_content.replace('const BHADRA_FAQS_HI = [', b_faqs_te + '\nconst BHADRA_FAQS_HI = [')

b_old_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `भद्रा कब है आज (${dateFormatted}) — आज भद्रा कब से कब तक है? भद्रा वास व मुख-पुच्छ समय`
      : `Bhadra Timings Today (${dateFormatted}) — Aaj Bhadra Kab Hai? Live Status, Vaas & Mukha Puchha`,
    description: isHi
      ? `आज ${dateFormatted} को भद्रा कब से कब तक है? जानें आज भद्रा है या नहीं, भद्रा का वास (स्वर्ग, पाताल, पृथ्वी), मुख और पुच्छ काल का सटीक समय, और रक्षाबंधन व होलिका दहन के शास्त्रीय नियम। 120+ शहरों अनुसार लाइव समय सारणी।`
      : `Is Bhadra active today (${dateFormatted})? Check exact Bhadra start and end timings, Bhadra Vaas (Swarga, Prithvi, Patala), Mukha & Puchha kaal, and Raksha Bandhan festival rules across 120+ cities.`,
    path: PATHS.bhadra,
    keywords: isHi'''

b_new_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `నేడు భద్ర ఎప్పుడు ఉంది (${dateFormatted}) — భద్రా కాలం సమయాలు, వాసం & ముఖ-పుచ్ఛ విచారం`
      : isHi
      ? `भद्रा कब है आज (${dateFormatted}) — आज भद्रा कब से कब तक है? भद्रा वास व मुख-पुच्छ समय`
      : `Bhadra Timings Today (${dateFormatted}) — Aaj Bhadra Kab Hai? Live Status, Vaas & Mukha Puchha`,
    description: isTe
      ? `ఈరోజు ${dateFormatted} భద్రా కాలం ఎప్పటి నుండి ఎప్పటి వరకు ఉంది? భద్రా వాసం (స్వర్గం, పాతాళం, పృథ్వి), ముఖ మరియు పుచ్ఛ కాలాల సమయం, మరియు రక్షాబంధన్, హోలికా దహన నియమాలను మీ నగరం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} को भद्रा कब से कब तक है? जानें आज भद्रा है या नहीं, भद्रा का वास (स्वर्ग, पाताल, पृथ्वी), मुख और पुच्छ काल का सटीक समय, और रक्षाबंधन व होलिका दहन के शास्त्रीय नियम। 120+ शहरों अनुसार लाइव समय सारणी।`
      : `Is Bhadra active today (${dateFormatted})? Check exact Bhadra start and end timings, Bhadra Vaas (Swarga, Prithvi, Patala), Mukha & Puchha kaal, and Raksha Bandhan festival rules across 120+ cities.`,
    path: PATHS.bhadra,
    keywords: isTe
      ? ["భద్రా కాలం", "నేడు భద్ర ఉందా", "భద్రా వాసం", "విష్టి కరణం", "భద్ర ముఖ పుచ్ఛం", "రాఖీ కట్టే ముహూర్తం"]
      : isHi'''

b_content = b_content.replace(b_old_meta, b_new_meta)

b_content = b_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? BHADRA_FAQS_HI : BHADRA_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? BHADRA_FAQS_TE : isHi ? BHADRA_FAQS_HI : BHADRA_FAQS_EN;'
)
b_content = b_content.replace(
    'title={isHi ? "आज भद्रा कब है? भद्रा काल एवं वास विचार" : "Today\'s Bhadra Timings & Vaas Status"}',
    'title={isTe ? "నేడు భద్ర ఎప్పుడు? భద్రా కాలం & వాస విచారం" : isHi ? "आज भद्रा कब है? भद्रा काल एवं वास विचार" : "Today\'s Bhadra Timings & Vaas Status"}'
)
b_content = b_content.replace(
    'subtitle={\n          isHi\n            ? "सटीक वैदिक पंचांग गणना अनुसार जानें कि क्या आज भद्रा है या नहीं। भद्रा की स्थिति, स्वर्ग-पाताल-पृथ्वी वास, मुख एवं पुच्छ काल का समय देखें।"',
    'subtitle={\n          isTe\n            ? "ఖచ్చితమైన వైదిక పంచాంగ గణన ప్రకారం నేడు భద్ర ఉందా లేదా తెలుసుకోండి. భద్రా స్థితి, స్వర్గ-పాతాళ-భూలోక వాసం, ముఖ మరియు పుచ్ఛ కాలాల సమయాలు."\n            : isHi\n            ? "सटीक वैदिक पंचांग गणना अनुसार जानें कि क्या आज भद्रा है या नहीं। भद्रा की स्थिति, स्वर्ग-पाताल-पृथ्वी वास, मुख एवं पुच्छ काल का समय देखें।\"'
)
b_content = b_content.replace(
    '[isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],',
    '[isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],'
)
b_content = b_content.replace(
    '[isHi ? "भद्रा काल" : "Bhadra", PATHS.bhadra],',
    '[isTe ? "భద్రా కాలం" : isHi ? "भद्रा काल" : "Bhadra", PATHS.bhadra],'
)
b_content = b_content.replace(
    'title={isHi ? "भद्रा काल से जुड़े महत्वपूर्ण प्रश्नोत्तर" : "Frequently Asked Questions about Bhadra"}',
    'title={isTe ? "భద్రా కాలం గురించి ముఖ్యమైన ప్రశ్నలు" : isHi ? "भद्रा काल से जुड़े महत्वपूर्ण प्रश्नोत्तर" : "Frequently Asked Questions about Bhadra"}'
)

with open(bhadra_file, 'w', encoding='utf-8') as f:
    f.write(b_content)

# 3. Update src/app/panchak/page.tsx
panchak_file = 'src/app/panchak/page.tsx'
with open(panchak_file, 'r', encoding='utf-8') as f:
    pan_content = f.read()

pan_faqs_te = '''const PANCHAK_FAQS_TE = [
  {
    question: "పంచకం అంటే ఏమిటి మరియు ఇది ఎందుకు ఏర్పడుతుంది?",
    answer:
      "చంద్రుడు కుంభ మరియు మీన రాశులలో సంచరించేటప్పుడు ధనిష్ఠ (రెండవ సగం), శతభిషం, పూర్వాభాద్ర, ఉత్తరాభాద్ర మరియు రేవతి నక్షత్రాల గుండా ప్రయాణిస్తాడు. ఈ ఐదు నక్షత్రాల సమూహాన్ని 'పంచకం' అంటారు. ఇది ప్రతి నెలా దాదాపు 5 రోజుల పాటు ఉంటుంది.",
  },
  {
    question: "పంచకాలు ఎన్ని రకాలు?",
    answer:
      "పంచకం ఏ వారంలో ప్రారంభమవుతుందనే దానిపై ఆధారపడి 5 రకాలుగా విభజించబడింది: 1. రోగ పంచకం (ఆదివారం), 2. రాజ పంచకం (సోమవారం - శుభం), 3. అగ్ని పంచకం (మంగళవారం), 4. చోర పంచకం (శుక్రవారం), 5. మృత్యు పంచకం (శనివారం - అత్యంత అశుభం). బుధ, గురువారాల పంచకాలు దోషరహితమైనవి.",
  },
  {
    question: "పంచకంలో ఏ పనులు చేయకూడదు?",
    answer:
      "పంచకంలో 5 పనులు నిషేధించబడ్డాయి: 1. ఇంటి పైకప్పు (స్లాబ్) వేయడం, 2. మంచం లేదా కొత్త పడక తయారుచేయడం, 3. దక్షిణ దిశగా ప్రయాణించడం, 4. కట్టెలు, ఇంధనం లేదా గడ్డిని నిల్వ చేయడం, 5. పంచక శాంతి చేయకుండా శవ దహనం చేయడం.",
  },
];
'''

pan_content = pan_content.replace('const PANCHAK_FAQS_HI = [', pan_faqs_te + '\nconst PANCHAK_FAQS_HI = [')

pan_old_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `पंचक कब है 2026 (${dateFormatted}) — आज पंचक है या नहीं? तारीखें, वर्जित कार्य व उपाय`
      : `Panchak Kab Hai 2026 (${dateFormatted}) — Today Panchak Status, Start-End Dates & Niyam`,
    description: isHi
      ? `आज ${dateFormatted} को पंचक है या नहीं? पंचक कब से कब तक है? 5 प्रकार (राज, रोग, अग्नि, चोर, मृत्यु पंचक), 5 वर्जित कार्य, शांति उपाय एवं 2026 की संपूर्ण पंचांग तालिका।`
      : `Is Panchak active today (${dateFormatted})? Check accurate Panchak start and end dates, 5 Panchak types (Raja, Roga, Agni, Chora, Mrityu), prohibited activities, and full 2026-2027 Panchak schedule.`,
    path: PATHS.panchak,
    keywords: isHi'''

pan_new_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `పంచకం ఎప్పుడు 2026 (${dateFormatted}) — నేడు పంచకం ఉందా లేదా? తేదీలు, వర్జ్య పనులు & నివారణలు`
      : isHi
      ? `पंचक कब है 2026 (${dateFormatted}) — आज पंचक है या नहीं? तारीखें, वर्जित कार्य व उपाय`
      : `Panchak Kab Hai 2026 (${dateFormatted}) — Today Panchak Status, Start-End Dates & Niyam`,
    description: isTe
      ? `నేడు ${dateFormatted} పంచకం ఉందా లేదా? పంచకం ఎప్పటి నుండి ఎప్పటి వరకు? 5 రకాలు (రాజ, రోగ, అగ్ని, చోర, మృత్యు పంచకం), 5 నిషేధిత పనులు మరియు 2026 సంపూర్ణ పంచక పట్టిక.`
      : isHi
      ? `आज ${dateFormatted} को पंचक है या नहीं? पंचक कब से कब तक है? 5 प्रकार (राज, रोग, अग्नि, चोर, मृत्यु पंचक), 5 वर्जित कार्य, शांति उपाय एवं 2026 की संपूर्ण पंचांग तालिका।`
      : `Is Panchak active today (${dateFormatted})? Check accurate Panchak start and end dates, 5 Panchak types (Raja, Roga, Agni, Chora, Mrityu), prohibited activities, and full 2026-2027 Panchak schedule.`,
    path: PATHS.panchak,
    keywords: isTe
      ? ["పంచకం ఎప్పుడు 2026", "నేడు పంచకం ఉందా", "పంచక రకాలు", "రాజ పంచకం", "మృత్యు పంచకం", "పంచక నివారణోపాయాలు"]
      : isHi'''

pan_content = pan_content.replace(pan_old_meta, pan_new_meta)

pan_content = pan_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const faqs = isHi ? PANCHAK_FAQS_HI : PANCHAK_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const faqs = isTe ? PANCHAK_FAQS_TE : isHi ? PANCHAK_FAQS_HI : PANCHAK_FAQS_EN;'
)
pan_content = pan_content.replace(
    'title={isHi ? "पंचक विचार एवं 2026 कैलेंडर" : "Panchak Dates & Calendar 2026"}',
    'title={isTe ? "పంచక విచారం & 2026 క్యాలెండర్" : isHi ? "पंचक विचार एवं 2026 कैलेंडर" : "Panchak Dates & Calendar 2026"}'
)
pan_content = pan_content.replace(
    'subtitle={\n          isHi\n            ? "जानें आज पंचक है या नहीं। पंचक के 5 प्रकार (राज, रोग, अग्नि, चोर, मृत्यु पंचक), 5 वर्जित कार्य एवं 2026 की संपूर्ण समय सारणी।"',
    'subtitle={\n          isTe\n            ? "నేడు పంచకం ఉందా లేదా తెలుసుకోండి. పంచకం యొక్క 5 రకాలు (రాజ, రోగ, అగ్ని, చోర, మృత్యు పంచకం), 5 నిషేధిత పనులు & 2026 సంపూర్ణ పట్టిక."\n            : isHi\n            ? "जानें आज पंचक है या नहीं। पंचक के 5 प्रकार (राज, रोग, अग्नि, चोर, मृत्यु पंचक), 5 वर्जित कार्य एवं 2026 की संपूर्ण समय सारणी।\"'
)
pan_content = pan_content.replace(
    '[isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],',
    '[isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],'
)
pan_content = pan_content.replace(
    '[isHi ? "पंचक विचार" : "Panchak", PATHS.panchak],',
    '[isTe ? "పంచక విచారం" : isHi ? "पंचक विचार" : "Panchak", PATHS.panchak],'
)
pan_content = pan_content.replace(
    'title={isHi ? "पंचक से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Panchak"}',
    'title={isTe ? "పంచకం గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "पंचक से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Panchak"}'
)

with open(panchak_file, 'w', encoding='utf-8') as f:
    f.write(pan_content)

# 4. Update src/app/gowri-panchangam/page.tsx
gowri_file = 'src/app/gowri-panchangam/page.tsx'
with open(gowri_file, 'r', encoding='utf-8') as f:
    g_content = f.read()

g_faqs_te = '''const FAQS_TE = [
  {
    question: "గౌరీ పంచాంగం అంటే ఏమిటి మరియు దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "గౌరీ పంచాంగం దక్షిణ భారతదేశంలో (ప్రత్యేకంగా తమిళనాడు, కర్ణాటక మరియు ఆంధ్రప్రదేశ్‌లలో) అత్యంత ప్రాచుర్యం పొందిన సూక్ష్మ ముహూర్త విధానం. ఇందులో పగలు మరియు రాత్రిని 8-8 సమాన భాగాలుగా విభజించి, 8 గౌరీ రూపాలుగా (అమృత, శుభ, లాభ, ధన, ఉతి, రోగ, విష, సోర) పిలుస్తారు.",
  },
  {
    question: "గౌరీ పంచాంగంలో ఏ సమయాలు శుభమైనవి (నల్ల నేరం)?",
    answer:
      "అమృత, శుభ, లాభ మరియు ధన అనే నాలుగు కాలాలను సర్వకార్య సాధకమైన 'నల్ల నేరం' (శుభ సమయం) గా పరిగణిస్తారు. వీటిలో కొత్త వ్యాపారం, ప్రయాణం, గృహ ప్రవేశం మరియు ముఖ్యమైన ఒప్పందాలు విజయవంతమవుతాయి.",
  },
  {
    question: "చోఘడియా మరియు గౌరీ పంచాంగానికి తేడా ఏమిటి?",
    answer:
      "రెండు పద్ధతులూ పగలు-రాత్రిని 8-8 భాగాలుగా విభజిస్తాయి. అయితే చోఘడియా ఉత్తర/పశ్చిమ భారతదేశంలో గ్రహాధిపతుల ఆధారంగా సాగే వ్యవస్థ కాగా, గౌరీ పంచాంగం దక్షిణ భారత ఆగమాలపై ఆధారపడిన పార్వతీ దేవి (గౌరి) పవిత్ర ముహూర్త సంప్రదాయం.",
  },
];
'''

g_content = g_content.replace('const FAQS_HI = [', g_faqs_te + '\nconst FAQS_HI = [')

g_old_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `आज का गौरी पंचांगम (${dateFormatted}) — दिन और रात का गौरी नल्ला नेरम शुभ मुहूर्त`
      : `Gowri Panchangam Today (${dateFormatted}) — Day & Night Nalla Neram Timings & Chart`,
    description: isHi
      ? `आज ${dateFormatted} का संपूर्ण गौरी पंचांगम। दिन व रात का शुभ गौरी नल्ला नेरम समय (अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष, सोर) अपने शहर के सटीक सूर्योदय अनुसार देखें। यात्रा व शुभ कार्यों हेतु समय सारणी।`
      : `Check accurate Gowri Panchangam for today (${dateFormatted}). Day & Night Gowri Nalla Neram timings (Amrutha, Shubha, Labha, Dhana, Uthi, Roga, Visha, Sora) with Rahu Kaal for 120+ Indian and world cities.`,
    path: PATHS.gowriPanchangam,
    keywords: isHi'''

g_new_meta = '''export async function generateMetadata(): Promise<Metadata> {
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
      ? `నేటి గౌరీ పంచాంగం (${dateFormatted}) — పగలు & రాత్రి గౌరీ నల్ల నేరం శుభ ముహూర్తం`
      : isHi
      ? `आज का गौरी पंचांगम (${dateFormatted}) — दिन और रात का गौरी नल्ला नेरम शुभ मुहूर्त`
      : `Gowri Panchangam Today (${dateFormatted}) — Day & Night Nalla Neram Timings & Chart`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ గౌరీ పంచాంగం. పగలు & రాత్రి శుభ గౌరీ నల్ల నేరం సమయాలు (అమృత, శుభ, లాభ, ధన, ఉతి, రోగ, విష, సోర) మీ నగర సూర్యోదయం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण गौरी पंचांगम। दिन व रात का शुभ गौरी नल्ला नेरम समय (अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष, सोर) अपने शहर के सटीक सूर्योदय अनुसार देखें। यात्रा व शुभ कार्यों हेतु समय सारणी।`
      : `Check accurate Gowri Panchangam for today (${dateFormatted}). Day & Night Gowri Nalla Neram timings (Amrutha, Shubha, Labha, Dhana, Uthi, Roga, Visha, Sora) with Rahu Kaal for 120+ Indian and world cities.`,
    path: PATHS.gowriPanchangam,
    keywords: isTe
      ? ["గౌరీ పంచాంగం", "నేటి గౌరీ పంచాంగం", "గౌరీ నల్ల నేరం", "అమృత గౌరీ సమయం", "తమిళ గౌరీ పంచాంగం"]
      : isHi'''

g_content = g_content.replace(g_old_meta, g_new_meta)

g_content = g_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const faqs = isHi ? FAQS_HI : FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const faqs = isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN;'
)
g_content = g_content.replace(
    'title={isHi ? "गौरी पंचांगम (नल्ला नेरम)" : "Gowri Panchangam (Nalla Neram)"}',
    'title={isTe ? "గౌరీ పంచాంగం (నల్ల నేరం)" : isHi ? "गौरी पंचांगम (नल्ला नेरम)" : "Gowri Panchangam (Nalla Neram)"}'
)
g_content = g_content.replace(
    'subtitle={\n          isHi\n            ? "दक्षिण भारतीय वैदिक ज्योतिष पर आधारित दिन एवं रात का सूक्ष्म मुहूर्त। अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष ও सोर का सटीक समय।"',
    'subtitle={\n          isTe\n            ? "దక్షిణ భారత వైదిక జ్యోతిష్యాధారిత పగలు మరియు రాత్రి సూక్ష్మ ముహూర్తం. అమృత, శుభ, లాభ, ధన, ఉతి, రోగ, విష & సోర కాలాల ఖచ్చితమైన సమయం."\n            : isHi\n            ? "दक्षिण भारतीय वैदिक ज्योतिष पर आधारित दिन एवं रात का सूक्ष्म मुहूर्त। अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष ও सोर का सटीक समय।\"'
)
g_content = g_content.replace(
    '[isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],',
    '[isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],'
)
g_content = g_content.replace(
    '[isHi ? "गौरी पंचांगम" : "Gowri Panchangam", PATHS.gowriPanchangam],',
    '[isTe ? "గౌరీ పంచాంగం" : isHi ? "गौरी पंचांगम" : "Gowri Panchangam", PATHS.gowriPanchangam],'
)
g_content = g_content.replace(
    'title={isHi ? "गौरी पंचांगम से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Gowri Panchangam"}',
    'title={isTe ? "గౌరీ పంచాంగం గురించి ముఖ్యమైన ప్రశ్నలు" : isHi ? "गौरी पंचांगम से जुड़े मुख्य प्रश्नोत्तर" : "Frequently Asked Questions about Gowri Panchangam"}'
)

with open(gowri_file, 'w', encoding='utf-8') as f:
    f.write(g_content)

# 5. Update src/app/grahan/page.tsx
grahan_file = 'src/app/grahan/page.tsx'
with open(grahan_file, 'r', encoding='utf-8') as f:
    gr_content = f.read()

gr_faqs_te = '''const FAQS_TE = [
  {
    question: "సూతక కాలం ఎప్పుడు ప్రారంభమవుతుంది మరియు దాని నియమాలు ఏమిటి?",
    answer:
      "సూర్య గ్రహణంలో సూతక కాలం గ్రహణ స్పర్శకు 12 గంటల (4 ప్రహరాలు) ముందు, చంద్ర గ్రహణంలో 9 గంటల (3 ప్రహరాలు) ముందు ప్రారంభమవుతుంది. సూతక కాలంలో విగ్రహ స్పర్శ, వంట చేయడం మరియు శుభ కార్యాలు నిషిద్ధం. పిల్లలు, వృద్ధులు మరియు రోగులకు ఈ నియమాలలో సడలింపు ఉంటుంది.",
  },
  {
    question: "గ్రహణ కాలంలో ఏ మంత్రాలను జపించడం వల్ల విశేష ఫలితం లభిస్తుంది?",
    answer:
      "గ్రహణ సమయంలో చేసే మంత్ర జపం సాధారణ రోజుల కంటే లక్ష రెట్లు అధిక ఫలితాన్ని ఇస్తుంది. మహా మృత్యుంజయ మంత్రం, గాయత్రీ మంత్రం మరియు 'ఓం నమో భగవతే వాసుదేవాయ' జపించడం వల్ల గ్రహణ ప్రతికూల కిరణాల నుండి రక్షణ లభిస్తుంది.",
  },
  {
    question: "గ్రహణ ముగింపు (మోక్షం) తర్వాత ఏమి చేయడం తప్పనిసరి?",
    answer:
      "గ్రహణ మోక్షం వెంటనే గంగాజలం కలిపిన నీటితో స్నానం చేయాలి. ఇంటి పూజా గదిలో గంగాజలం చల్లి శుద్ధి చేసి, తాజా సాత్విక ఆహారాన్ని వండుకోవాలి మరియు పేదలకు ధాన్యం లేదా వస్త్రాలను దానం చేయాలి.",
  },
];
'''

gr_content = gr_content.replace('const FAQS_HI = [', gr_faqs_te + '\nconst FAQS_HI = [')

gr_old_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "सूर्य एवं चंद्र ग्रहण 2026 — सूतक काल, मोक्ष समय, गर्भवती महिलाओं के नियम व मंत्र"
    : "Surya & Chandra Grahan 2026 — Solar & Lunar Eclipse Timings, Sutak Rules & Mantras";

  const description = isHi
    ? "2026 के सभी सूर्य ग्रहण और चंद्र ग्रहण की सटीक तिथियाँ। सूतक काल का समय, स्पर्श और मोक्ष काल, गर्भवती महिलाओं के लिए सावधानियां और ग्रहण कालीन जप मंत्र।"
    : "Comprehensive guide to 2026 Solar and Lunar Eclipses. Precise Sutak Kaal start & end timings, Sparsha & Moksha periods, do's & don'ts, and sacred mantras for maximum spiritual merit.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.grahan,
    keywords: isHi'''

gr_new_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "సూర్య & చంద్ర గ్రహణాలు 2026 — సూతక కాలం, మోక్ష సమయం, గర్భిణీ స్త్రీల నియమాలు & మంత్రాలు"
    : isHi
    ? "सूर्य एवं चंद्र ग्रहण 2026 — सूतक काल, मोक्ष समय, गर्भवती महिलाओं के नियम व मंत्र"
    : "Surya & Chandra Grahan 2026 — Solar & Lunar Eclipse Timings, Sutak Rules & Mantras";

  const description = isTe
    ? "2026 సంవత్సరపు అన్ని సూర్య గ్రహణాలు మరియు చంద్ర గ్రహణాల ఖచ్చితమైన తేదీలు. సూతక కాలం సమయం, స్పర్శ మరియు మోక్ష కాలాలు, గర్భిణుల జాగ్రత్తలు మరియు గ్రహణ కాల జప మంత్రాలు."
    : isHi
    ? "2026 के सभी सूर्य ग्रहण और चंद्र ग्रहण की सटीक तिथियाँ। सूतक काल का समय, स्पर्श और मोक्ष काल, गर्भवती महिलाओं के लिए सावधानियां और ग्रहण कालीन जप मंत्र।"
    : "Comprehensive guide to 2026 Solar and Lunar Eclipses. Precise Sutak Kaal start & end timings, Sparsha & Moksha periods, do's & don'ts, and sacred mantras for maximum spiritual merit.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.grahan,
    keywords: isTe
      ? [
          "సూర్య గ్రహణం 2026",
          "చంద్ర గ్రహణం 2026",
          "సూతక కాలం సమయం",
          "గ్రహణ నియమాలు",
          "గర్భిణీ స్త్రీలు గ్రహణంలో ఏమి చేయాలి",
          "గ్రహణ మోక్ష సమయం",
        ]
      : isHi'''

gr_content = gr_content.replace(gr_old_meta, gr_new_meta)

gr_content = gr_content.replace(
    '  const locale = await getLocale();\n  const isHi = locale === "hi";',
    '  const locale = await getLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
gr_content = gr_content.replace(
    'isHi ? "होम" : "Home",\n    [isHi ? "सूर्य व चंद्र ग्रहण" : "Solar & Lunar Eclipses", PATHS.grahan]',
    'isTe ? "హోమ్" : isHi ? "होम" : "Home",\n    [isTe ? "సూర్య & చంద్ర గ్రహణాలు" : isHi ? "सूर्य व चंद्र ग्रहण" : "Solar & Lunar Eclipses", PATHS.grahan]'
)
gr_content = gr_content.replace(
    'title={isHi ? "सूर्य एवं चंद्र ग्रहण मार्गदर्शिका 2026" : "Solar & Lunar Eclipse (Grahan) Guide 2026"}',
    'title={isTe ? "సూర్య & చంద్ర గ్రహణాల మార్గదర్శి 2026" : isHi ? "सूर्य एवं चंद्र ग्रहण मार्गदर्शिका 2026" : "Solar & Lunar Eclipse (Grahan) Guide 2026"}'
)
gr_content = gr_content.replace(
    '{isHi ? "सूर्य एवं चंद्र ग्रहण से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions about Eclipses"}',
    '{isTe ? "సూర్య & చంద్ర గ్రహణాల గురించి తరచుగా అడిగే ప్రశ్నలు (FAQ)" : isHi ? "सूर्य एवं चंद्र ग्रहण से जुड़े अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions about Eclipses"}'
)
gr_content = gr_content.replace(
    '<FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />',
    '<FaqList faqs={isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN} jsonLd />'
)

with open(grahan_file, 'w', encoding='utf-8') as f:
    f.write(gr_content)

print("Updated hora, bhadra, panchak, gowri, and grahan successfully!")

# Update tomorrow/page.tsx
tomorrow_file = 'src/app/panchang/tomorrow/page.tsx'
with open(tomorrow_file, 'r', encoding='utf-8') as f:
    t_content = f.read()

t_faqs_te = '''const TOMORROW_FAQS_TE = [
  {
    question: "రేపటి పంచాంగాన్ని ముందుగానే ఎందుకు చూడాలి?",
    answer:
      "రేపటి పంచాంగం ముందుగా తెలుసుకోవడం వల్ల భక్తులు ఉపవాసాలు (వ్రతాలు), పూజా సమయాలు, ప్రయాణాలు, ఆస్తి రిజిస్ట్రేషన్లు మరియు కొత్త వ్యాపార కార్యకలాపాలను శుభ ముహూర్తాల ప్రకారం ప్రణాళిక చేసుకోవచ్చు మరియు రాహుకాలాన్ని నివారించవచ్చు.",
  },
  {
    question: "రేపటి తిథిని ఎలా గణిస్తారు?",
    answer:
      "రేపటి తిథి మీ నగర స్థానిక సూర్యోదయ సమయానికి (ఉదయ తిథి) సూర్య-చంద్రుల మధ్య ఉన్న ఖగోళ దూరం ఆధారంగా లెక్కించబడుతుంది.",
  },
];
'''

t_content = t_content.replace('const TOMORROW_FAQS_HI = [', t_faqs_te + '\nconst TOMORROW_FAQS_HI = [')

old_t_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const tomorrow = new Date(Date.now() + 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tomorrow);

  return localizedMetadata({
    title: isHi
      ? `कल का पंचांग (${dateFormatted}) — कल की तिथि, शुभ मुहूर्त एवं चौघड़िया`
      : `Tomorrow's Panchang (${dateFormatted}) — Kal Ka Panchang & Shubh Muhurat`,
    description: isHi
      ? `कल का अग्रिम पंचांग (${dateFormatted})। कल की तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया के अनुसार अपने शुभ कार्यों की योजना बनाएं।`
      : `Advance Panchang for tomorrow (${dateFormatted}). Plan your auspicious events with tomorrow's Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.`,
    path: PATHS.panchangTomorrow,
    keywords: isHi
      ? ["कल का पंचांग", "कल की तिथि", "कल का शुभ मुहूर्त", "कल का राहु काल", "कल का चौघड़िया"]
      : ["kal ka panchang", "tomorrow panchang", "tomorrow tithi", "tomorrow shubh muhurat", "tomorrow rahu kaal"],
  });
}'''

new_t_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const tomorrow = new Date(Date.now() + 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tomorrow);

  return localizedMetadata({
    title: isTe
      ? `రేపటి పంచాంగం (${dateFormatted}) — రేపటి తిథి, శుభ ముహూర్తం & చోఘడియా`
      : isHi
      ? `कल का पंचांग (${dateFormatted}) — कल की तिथि, शुभ मुहूर्त एवं चौघड़िया`
      : `Tomorrow's Panchang (${dateFormatted}) — Kal Ka Panchang & Shubh Muhurat`,
    description: isTe
      ? `రేపటి ముందస్తు పంచాంగం (${dateFormatted}). రేపటి తిథి, నక్షత్రం, శుభ ముహూర్తం, రాహుకాలం మరియు చోఘడియా వివరాలతో మీ పనులను ప్లాన్ చేసుకోండి.`
      : isHi
      ? `कल का अग्रिम पंचांग (${dateFormatted})। कल की तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया के अनुसार अपने शुभ कार्यों की योजना बनाएं।`
      : `Advance Panchang for tomorrow (${dateFormatted}). Plan your auspicious events with tomorrow's Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.`,
    path: PATHS.panchangTomorrow,
    keywords: isTe
      ? ["రేపటి పంచాంగం", "రేపటి తిథి", "రేపటి శుభ ముహూర్తం", "రేపటి రాహుకాలం", "రేపటి చోఘడియా"]
      : isHi
      ? ["कल का पंचांग", "कल की तिथि", "कल का शुभ मुहूर्त", "कल का राहु काल", "कल का चौघड़िया"]
      : ["kal ka panchang", "tomorrow panchang", "tomorrow tithi", "tomorrow shubh muhurat", "tomorrow rahu kaal"],
  });
}'''

t_content = t_content.replace(old_t_meta, new_t_meta)

t_content = t_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? TOMORROW_FAQS_HI : TOMORROW_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? TOMORROW_FAQS_TE : isHi ? TOMORROW_FAQS_HI : TOMORROW_FAQS_EN;'
)
t_content = t_content.replace(
    'name: isHi ? "कल का पंचांग — अग्रिम वैदिक मुहूर्त" : "Tomorrow\'s Panchang — Advance Vedic Muhurat",',
    'name: isTe ? "రేపటి పంచాంగం — ముందస్తు వైదిక ముహూర్తం" : isHi ? "कल का पंचांग — अग्रिम वैदिक मुहूर्त" : "Tomorrow\'s Panchang — Advance Vedic Muhurat",'
)
t_content = t_content.replace(
    'description: isHi\n            ? "कल की तिथि, नक्षत्र, सूर्योदय और चौघड़िया मुहूर्त।"',
    'description: isTe\n            ? "రేపటి తిథి, నక్షత్రం, సూర్యోదయం మరియు చోఘడియా ముహూర్తాలు."\n            : isHi\n            ? "कल की तिथि, नक्षत्र, सूर्योदय और चौघड़िया मुहूर्त।"'
)
t_content = t_content.replace(
    'title={isHi ? "कल का पंचांग एवं शुभ मुहूर्त" : "Tomorrow\'s Panchang & Muhurat"}',
    'title={isTe ? "రేపటి పంచాంగం & శుభ ముహూర్తం" : isHi ? "कल का पंचांग एवं शुभ मुहूर्त" : "Tomorrow\'s Panchang & Muhurat"}'
)
t_content = t_content.replace(
    'subtitle={\n          isHi\n            ? "कल का अग्रिम वैदिक पंचांग। कल की तिथि, नक्षत्र, योग, करण, राहु काल और चौघड़िया देखकर अपने शुभ कार्यों की योजना बनाएं।"',
    'subtitle={\n          isTe\n            ? "రేపటి ముందస్తు వైదిక పంచాంగం. రేపటి తిథి, నక్షత్రం, యోగం, కరణం, రాహుకాలం మరియు చోఘడియా చూసి మీ శుభ పనులను ప్రణాళిక చేసుకోండి."\n            : isHi\n            ? "कल का अग्रिम वैदिक पंचांग। कल की तिथि, नक्षत्र, योग, करण, राहु काल और चौघड़िया देखकर अपने शुभ कार्यों की योजना बनाएं।"'
)
t_content = t_content.replace(
    '[isHi ? "पंचांग" : "Panchang", PATHS.panchang],',
    '[isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],'
)
t_content = t_content.replace(
    '[isHi ? "कल का पंचांग" : "Tomorrow\'s Panchang", PATHS.panchangTomorrow]',
    '[isTe ? "రేపటి పంచాంగం" : isHi ? "कल का पंचांग" : "Tomorrow\'s Panchang", PATHS.panchangTomorrow]'
)
t_content = t_content.replace(
    'title={isHi ? "कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Tomorrow\'s Panchang"}',
    'title={isTe ? "రేపటి పంచాంగం గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Tomorrow\'s Panchang"}'
)

with open(tomorrow_file, 'w', encoding='utf-8') as f:
    f.write(t_content)

# Update yesterday/page.tsx
yesterday_file = 'src/app/panchang/yesterday/page.tsx'
with open(yesterday_file, 'r', encoding='utf-8') as f:
    y_content = f.read()

y_faqs_te = '''const YESTERDAY_FAQS_TE = [
  {
    question: "నిన్నటి పంచాంగాన్ని ఎందుకు పరిశీలించాలి?",
    answer:
      "జన్మ సమయ గ్రహ స్థితిగతులు, గడచిన రోజు ఆచరించిన వ్రత-పూజల ధ్రువీకరణ లేదా గత ఖగోళ వివరాలను సరిచూసుకోవడానికి నిన్నటి పంచాంగం ఉపయోగపడుతుంది.",
  },
];
'''

y_content = y_content.replace('const YESTERDAY_FAQS_HI = [', y_faqs_te + '\nconst YESTERDAY_FAQS_HI = [')

old_y_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const yesterday = new Date(Date.now() - 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(yesterday);

  return localizedMetadata({
    title: isHi
      ? `बीते कल का पंचांग (${dateFormatted}) — कल की तिथि एवं मुहूर्त`
      : `Yesterday's Panchang (${dateFormatted}) — Historical Panchang & Tithi`,
    description: isHi
      ? `बीते कल (${dateFormatted}) का ऐतिहासिक पंचांग। तिथि, नक्षत्र, योग, करण और सूर्योदय-सूर्यास्त की गणना देखें।`
      : `Historical Vedic Panchang for yesterday (${dateFormatted}). View Tithi, Nakshatra, Yoga, Karana, and solar timings.`,
    path: PATHS.panchangYesterday,
    keywords: isHi
      ? ["बीते कल का पंचांग", "कल की तिथि", "पंचांग इतिहास"]
      : ["yesterday panchang", "yesterday tithi", "past panchang lookup"],
  });
}'''

new_y_meta = '''export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const yesterday = new Date(Date.now() - 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(yesterday);

  return localizedMetadata({
    title: isTe
      ? `నిన్నటి పంచాంగం (${dateFormatted}) — నిన్నటి తిథి & ముహూర్తం`
      : isHi
      ? `बीते कल का पंचांग (${dateFormatted}) — कल की तिथि एवं मुहूर्त`
      : `Yesterday's Panchang (${dateFormatted}) — Historical Panchang & Tithi`,
    description: isTe
      ? `గడచిన రోజు (${dateFormatted}) చారిత్రక పంచాంగం. తిథి, నక్షత్రం, యోగం, కరణం మరియు సూర్యోదయ-సూర్యాస్తమయ సమయాలను వీక్షించండి.`
      : isHi
      ? `बीते कल (${dateFormatted}) का ऐतिहासिक पंचांग। तिथि, नक्षत्र, योग, करण और सूर्योदय-सूर्यास्त की गणना देखें।`
      : `Historical Vedic Panchang for yesterday (${dateFormatted}). View Tithi, Nakshatra, Yoga, Karana, and solar timings.`,
    path: PATHS.panchangYesterday,
    keywords: isTe
      ? ["నిన్నటి పంచాంగం", "నిన్నటి తిథి", "గత పంచాంగ వివరాలు"]
      : isHi
      ? ["बीते कल का पंचांग", "कल की तिथि", "पंचांग इतिहास"]
      : ["yesterday panchang", "yesterday tithi", "past panchang lookup"],
  });
}'''

y_content = y_content.replace(old_y_meta, new_y_meta)

y_content = y_content.replace(
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const params = await searchParams;\n  const faqs = isHi ? YESTERDAY_FAQS_HI : YESTERDAY_FAQS_EN;',
    '  const [t, locale] = await Promise.all([getMessages(), getLocale()]);\n  const isHi = locale === "hi";\n  const isTe = locale === "te";\n  const params = await searchParams;\n  const faqs = isTe ? YESTERDAY_FAQS_TE : isHi ? YESTERDAY_FAQS_HI : YESTERDAY_FAQS_EN;'
)
y_content = y_content.replace(
    'name: isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang",',
    'name: isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang",'
)
y_content = y_content.replace(
    'description: isHi\n            ? "बीते कल की तिथि, नक्षत्र और पंचांग विवरण।"',
    'description: isTe\n            ? "నిన్నటి తిథి, నక్షత్రం మరియు పంచాంగ వివరాలు."\n            : isHi\n            ? "बीते कल की तिथि, नक्षत्र और पंचांग विवरण।"'
)
y_content = y_content.replace(
    'title={isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang"}',
    'title={isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang"}'
)
y_content = y_content.replace(
    'subtitle={\n          isHi\n            ? "बीते कल का ऐतिहासिक वैदिक पंचांग। अपने नगर अनुसार तिथि, नक्षत्र, योग और करण का विवरण देखें।"',
    'subtitle={\n          isTe\n            ? "నిన్నటి చారిత్రక వైదిక పంచాంగం. మీ నగరం ప్రకారం తిథి, నక్షత్రం, యోగం మరియు కరణాల వివరాలను పరిశీలించండి."\n            : isHi\n            ? "बीते कल का ऐतिहासिक वैदिक पंचांग। अपने नगर अनुसार तिथि, नक्षत्र, योग और करण का विवरण देखें।"'
)
y_content = y_content.replace(
    '[isHi ? "पंचांग" : "Panchang", PATHS.panchang],',
    '[isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],'
)
y_content = y_content.replace(
    '[isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang", PATHS.panchangYesterday]',
    '[isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday\'s Panchang", PATHS.panchangYesterday]'
)
y_content = y_content.replace(
    'title={isHi ? "बीते कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Yesterday\'s Panchang"}',
    'title={isTe ? "నిన్నటి పంచాంగం గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "बीते कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Yesterday\'s Panchang"}'
)

with open(yesterday_file, 'w', encoding='utf-8') as f:
    f.write(y_content)

print("Updated tomorrow and yesterday pages successfully!")

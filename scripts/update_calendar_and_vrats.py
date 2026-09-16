# Update calendar, vrats, and festival files for Telugu
import re

# ==============================================================================
# 1. src/app/hindu-calendar/page.tsx
# ==============================================================================
path = "src/app/hindu-calendar/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_cal_faqs = '''const CALENDAR_FAQS_TE = [
  {
    question: "హిందూ చంద్ర క్యాలెండర్ (పంచాంగం) ఎలా పనిచేస్తుంది?",
    answer:
      "హిందూ క్యాలెండర్ అనేది సూర్యుడు మరియు చంద్రుని ఖగోళ గతులపై ఆధారపడిన చంద్ర-సౌర (లూనిసోలార్) వ్యవస్థ. ఇందులో 5 ముఖ్య భాగాలు (పంచ-అంగాలు) ఉంటాయి: తిథి, నక్షత్రం, యోగం, కరణం మరియు వారం. వీటి ఆధారంగానే శుభ-అశుభ ముహూర్తాలు, పండుగలు నిర్ణయించబడతాయి.",
  },
  {
    question: "వివిధ నగరాల్లో తిథి సమయాలు ఎందుకు మారుతాయి?",
    answer:
      "సూర్యుడు-చంద్రుల మధ్య కోణీయ దూరం ఏ క్షణంలోనైనా విశ్వమంతటా ఒకే విధంగా మారినప్పటికీ, స్థానిక సూర్యోదయం సమయం ప్రతి నగర అక్షాంశ, రేఖాంశాల ప్రకారం మారుతుంది. చాలావరకు హిందూ వ్రతాలు, పండుగలు సూర్యోదయ సమయంలో ఉండే ఉదయ తిథి ఆధారంగా ఆచరించబడతాయి.",
  },
  {
    question: "పూర్ణిమాంత మరియు అమాంత పంచాంగాల మధ్య తేడా ఏమిటి?",
    answer:
      "ఉత్తర భారతదేశంలో పూర్ణిమాంత పద్ధతి అమలులో ఉంటుంది, ఇక్కడ నెల పౌర్ణమితో ముగుస్తుంది. ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక, మహారాష్ట్ర, గుజరాత్‌లలో అమాంత పద్ధతి పాటించబడుతుంది, ఇక్కడ నెల అమావాస్యతో ముగుస్తుంది. శుక్ల మరియు కృష్ణ పక్షాల తిథులు రెండింటిలోనూ ఒకే విధంగా ఉంటాయి.",
  },
  {
    question: "పూజలు మరియు నూతన ప్రారంభాలకు ఏ ముహూర్తాలు అత్యంత శుభప్రదమైనవి?",
    answer:
      "బ్రహ్మ ముహూర్తం (సూర్యోదయానికి 96 నుండి 48 నిమిషాల ముందు), అభిజిత్ ముహూర్తం (మధ్యాహ్నం వేళ, బుధవారం మినహా), గోధూళి ముహూర్తం మరియు అమృత కాలం ఏదైనా నూతన కార్యం, సాధన, ప్రయాణం లేదా పూజకు అత్యంత శ్రేష్ఠమైనవి.",
  },
];
'''

if "CALENDAR_FAQS_TE" not in code:
    code = te_cal_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const currentYear = new Date().getFullYear();

  const title = isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  const title = isTe
    ? `హిందూ క్యాలెండర్ ${currentYear} — తిథి, నక్షత్రం, ఏకాదశి & పండుగల పంచాంగం`
    : isHi'''
)

code = code.replace(
    '''  const description = isHi
    ? `सनातन हिन्दू कैलेंडर ${currentYear}। दैनिक तिथि, नक्षत्र, राहु काल, शुभ मुहूर्त, पूर्णिमा, अमावस्या, एकादशी व्रत एवं प्रमुख हिन्दू त्यौहारों की प्रामाणिक खगोलीय गणना।`''',
    '''  const description = isTe
    ? `సనాతన హిందూ క్యాలెండర్ ${currentYear}. దైనందిన తిథి, నక్షత్రం, రాహుకాలం, శుభ ముహూర్తాలు, పౌర్ణమి, అమావాస్య, ఏకాదశి వ్రతాలు మరియు ప్రధాన హిందూ పండుగల ఖచ్చితమైన పంచాంగం.`
    : isHi
    ? `सनातन हिन्दू कैलेंडर ${currentYear}। दैनिक तिथि, नक्षत्र, राहु काल, शुभ मुहूर्त, पूर्णिमा, अमावस्या, एकादशी व्रत एवं प्रमुख हिन्दू त्यौहारों की प्रामाणिक खगोलीय गणना।`'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;

  const currentYear = new Date().getFullYear();
  const displayYear = initialYear || currentYear;
  const faqs = isHi ? CALENDAR_FAQS_HI : CALENDAR_FAQS_EN;''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;

  const currentYear = new Date().getFullYear();
  const displayYear = initialYear || currentYear;
  const faqs = isTe ? CALENDAR_FAQS_TE : isHi ? CALENDAR_FAQS_HI : CALENDAR_FAQS_EN;'''
)

code = code.replace(
    '''          name: isHi
            ? `हिन्दू कैलेंडर ${displayYear} एवं दैनिक पंचांग`
            : `Hindu Calendar ${displayYear} & Daily Panchang`,''',
    '''          name: isTe
            ? `హిందూ క్యాలెండర్ ${displayYear} & దిన పంచాంగం`
            : isHi
            ? `हिन्दू कैलेंडर ${displayYear} एवं दैनिक पंचांग`
            : `Hindu Calendar ${displayYear} & Daily Panchang`,'''
)

code = code.replace(
    '''          description: isHi
            ? "सटीक तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल, एकादशी और हिन्दू त्यौहारों के साथ दैनिक पंचांग।"
            : "Production Hindu Calendar and Vedic Panchang with Tithi, Nakshatra, Auspicious Muhurats, Ekadashi, and Festivals.",''',
    '''          description: isTe
            ? "ఖచ్చితమైన తిథి, నక్షత్రం, శుభ ముహూర్తాలు, రాహుకాలం, ఏకాదశి మరియు హిందూ పండుగల దిన పంచాంగం."
            : isHi
            ? "सटीक तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल, एकादशी और हिन्दू त्यौहारों के साथ दैनिक पंचांग।"
            : "Production Hindu Calendar and Vedic Panchang with Tithi, Nakshatra, Auspicious Muhurats, Ekadashi, and Festivals.",'''
)

code = code.replace(
    '''        title={isHi ? `हिन्दू कैलेंडर ${displayYear}` : `Hindu Calendar ${displayYear}`}
        subtitle={
          isHi
            ? "दैनिक वैदिक पंचांग, तिथि, नक्षत्र, शुभ मुहूर्त, एकादशी एवं त्यौहार"
            : "Vedic Panchang, Tithi, Nakshatra, Auspicious Muhurats, Ekadashi & Festivals"
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
        )}''',
    '''        title={isTe ? `హిందూ క్యాలెండర్ ${displayYear}` : isHi ? `हिन्दू कैलेंडर ${displayYear}` : `Hindu Calendar ${displayYear}`}
        subtitle={
          isTe
            ? "దైనందిన వైదిక పంచాంగం, తిథి, నక్షత్రం, శుభ ముహూర్తాలు, ఏకాదశి మరియు పండుగలు"
            : isHi
            ? "दैनिक वैदिक पंचांग, तिथि, नक्षत्र, शुभ मुहूर्त, एकादशी एवं त्यौहार"
            : "Vedic Panchang, Tithi, Nakshatra, Auspicious Muhurats, Ekadashi & Festivals"
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "హిందూ క్యాలెండర్" : isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
        )}'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "हिन्दू कैलेंडर से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "హిందూ క్యాలెండర్‌కు సంబంధించిన ముఖ్య ప్రశ్నలు" : isHi ? "हिन्दू कैलेंडर से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("1. Updated src/app/hindu-calendar/page.tsx")


# ==============================================================================
# 2. src/app/hindu-calendar/[year]/page.tsx
# ==============================================================================
path = "src/app/hindu-calendar/[year]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_year_faqs = '''const YEAR_FAQS_TE = [
  {
    question: "ప్రతి సంవత్సరం హిందూ పండుగల తేదీలు ఎలా నిర్ణయించబడతాయి?",
    answer:
      "హిందూ పండుగల తేదీలు చంద్రుని కళలు (తిథి) మరియు సూర్యుని రాశి మార్పు (సంక్రాంతి) ఆధారంగా లెక్కించబడతాయి. చంద్ర సంవత్సరంలో 354 రోజులు మాత్రమే ఉంటాయి, ఇది సౌర సంవత్సరం (365 రోజులు) కంటే 11 రోజులు తక్కువ. ఈ వ్యత్యాసాన్ని సరిచేయడానికి ప్రతి 3 సంవత్సరాలకు ఒకసారి అధిక మాసం (మలమాసం) కలుపబడుతుంది.",
  },
  {
    question: "అధిక మాసం (పురుషోత్తమ మాసం) అంటే ఏమిటి?",
    answer:
      "సూర్య సంక్రమణం లేని చంద్ర మాసాన్ని అధిక మాసం లేదా పురుషోత్తమ మాసం అంటారు. ఇది సుమారు ప్రతి 32.5 నెలలకు ఒకసారి వస్తుంది. ఈ పవిత్ర మాసంలో శ్రీమహావిష్ణువు ఆరాధన, భగవద్గీతా పారాయణం మరియు దానధర్మాలు అనంత పుణ్యఫలాన్ని ఇస్తాయి.",
  },
];
'''

if "YEAR_FAQS_TE" not in code:
    code = te_year_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? `हिन्दू कैलेंडर ${year} — त्यौहार, व्रत, एकादशी एवं दैनिक पंचांग`
      : `Hindu Calendar ${year} — Festivals, Holidays, Vrats & Panchang`,
    description: isHi
      ? `${year} का सम्पूर्ण हिन्दू कैलेंडर। सभी त्यौहार (दीपावली, होली, नवरात्रि), एकादशी व्रत, प्रदोष, पूर्णिमा, अमावस्या और शुभ मुहूर्त तिथियाँ।`
      : `Complete Hindu Calendar for the year ${year}. Detailed festival dates (Diwali, Holi, Navratri), Ekadashi fasting schedule, Pradosh, and monthly Panchang.`,
    path: `${PATHS.calendar}/${year}`,
    keywords: isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return localizedMetadata({
    title: isTe
      ? `హిందూ క్యాలెండర్ ${year} — పండుగలు, వ్రతాలు, ఏకాదశి & దిన పంచాంగం`
      : isHi
      ? `हिन्दू कैलेंडर ${year} — त्यौहार, व्रत, एकादशी एवं दैनिक पंचांग`
      : `Hindu Calendar ${year} — Festivals, Holidays, Vrats & Panchang`,
    description: isTe
      ? `${year} సంవత్సరపు సంపూర్ణ హిందూ క్యాలెండర్. అన్ని పండుగలు (దీపావళి, హోలీ, దసరా), ఏకాదశి వ్రతాలు, ప్రదోషం, పౌర్ణమి, అమావాస్య మరియు శుభ ముహూర్తాల వివరాలు.`
      : isHi
      ? `${year} का सम्पूर्ण हिन्दू कैलेंडर। सभी त्यौहार (दीपावली, होली, नवरात्रि), एकादशी व्रत, प्रदोष, पूर्णिमा, अमावस्या और शुभ मुहूर्त तिथियाँ।`
      : `Complete Hindu Calendar for the year ${year}. Detailed festival dates (Diwali, Holi, Navratri), Ekadashi fasting schedule, Pradosh, and monthly Panchang.`,
    path: `${PATHS.calendar}/${year}`,
    keywords: isHi'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const sParams = await searchParams;
  const initialMonth = sParams.month ? Number(sParams.month) : 1;
  const faqs = isHi ? YEAR_FAQS_HI : YEAR_FAQS_EN;''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const sParams = await searchParams;
  const initialMonth = sParams.month ? Number(sParams.month) : 1;
  const faqs = isTe ? YEAR_FAQS_TE : isHi ? YEAR_FAQS_HI : YEAR_FAQS_EN;'''
)

code = code.replace(
    '''        title={isHi ? `हिन्दू कैलेंडर ${year}` : `Hindu Calendar ${year}`}
        subtitle={
          isHi
            ? `${year} के सभी त्यौहार, व्रत, तिथियाँ एवं दैनिक पंचांग`
            : `Festivals, Vrats, Tithi, and complete Panchang for ${year}`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [year, `${PATHS.calendar}/${year}`],
        )}''',
    '''        title={isTe ? `హిందూ క్యాలెండర్ ${year}` : isHi ? `हिन्दू कैलेंडर ${year}` : `Hindu Calendar ${year}`}
        subtitle={
          isTe
            ? `${year} లోని అన్ని పండుగలు, వ్రతాలు, తిథులు మరియు దిన పంచాంగం`
            : isHi
            ? `${year} के सभी त्यौहार, व्रत, तिथियाँ एवं दैनिक पंचांग`
            : `Festivals, Vrats, Tithi, and complete Panchang for ${year}`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "హిందూ క్యాలెండర్" : isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [year, `${PATHS.calendar}/${year}`],
        )}'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "कैलेंडर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "క్యాలెండర్‌కు సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "कैलेंडर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("2. Updated src/app/hindu-calendar/[year]/page.tsx")


# ==============================================================================
# 3. src/app/hindu-calendar/[year]/[month]/page.tsx
# ==============================================================================
path = "src/app/hindu-calendar/[year]/[month]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const { year, month } = await params;
  const locale = await getLocale();
  const isHi = locale === "hi";
  const monthNum = parseMonth(month);
  const yearNum = Number(year);

  if (monthNum === -1 || isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    return { title: isHi ? "माह नहीं मिला" : "Calendar Month Not Found" };
  }

  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];

  return localizedMetadata({
    title: isHi
      ? `हिन्दू कैलेंडर ${monthNameHi} ${year} — दैनिक तिथि, व्रत एवं पंचांग`
      : `Hindu Calendar ${monthName} ${year} — Tithi, Festivals & Panchang`,
    description: isHi
      ? `${monthNameHi} (${monthName}) ${year} का दैनिक हिन्दू कैलेंडर। तिथि, नक्षत्र, एकादशी, पूर्णिमा, अमावस्या, शुभ मुहूर्त और त्यौहारों की सम्पूर्ण जानकारी।`
      : `Daily Hindu Calendar for ${monthName} (${monthNameHi}) ${year}. Check accurate Tithi, Nakshatra, Ekadashi, Purnima, Amavasya, Shubh Muhurat, and festivals.`,
    path: `${PATHS.calendar}/${year}/${month}`,
    keywords: isHi''',
    '''  const { year, month } = await params;
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const monthNum = parseMonth(month);
  const yearNum = Number(year);

  if (monthNum === -1 || isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
    return { title: isTe ? "నెల లభించలేదు" : isHi ? "माह नहीं मिला" : "Calendar Month Not Found" };
  }

  const TE_MONTHS = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];
  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];
  const monthNameTe = TE_MONTHS[monthNum - 1];

  return localizedMetadata({
    title: isTe
      ? `హిందూ క్యాలెండర్ ${monthNameTe} ${year} — దిన తిథి, వ్రతాలు & పంచాంగం`
      : isHi
      ? `हिन्दू कैलेंडर ${monthNameHi} ${year} — दैनिक तिथि, व्रत एवं पंचांग`
      : `Hindu Calendar ${monthName} ${year} — Tithi, Festivals & Panchang`,
    description: isTe
      ? `${monthNameTe} ${year} దిన హిందూ క్యాలెండర్. తిథి, నక్షత్రం, ఏకాదశి, పౌర్ణమి, అమావాస్య, శుభ ముహూర్తాలు మరియు పండుగల పూర్తి సమాచారం.`
      : isHi
      ? `${monthNameHi} (${monthName}) ${year} का दैनिक हिन्दू कैलेंडर। तिथि, नक्षत्र, एकादशी, पूर्णिमा, अमावस्या, शुभ मुहूर्त और त्यौहारों की सम्पूर्ण जानकारी।`
      : `Daily Hindu Calendar for ${monthName} (${monthNameHi}) ${year}. Check accurate Tithi, Nakshatra, Ekadashi, Purnima, Amavasya, Shubh Muhurat, and festivals.`,
    path: `${PATHS.calendar}/${year}/${month}`,
    keywords: isHi'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];
  const sParams = await searchParams;''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const TE_MONTHS = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];
  const monthName = MONTH_NAMES_EN[monthNum - 1];
  const monthNameHi = MONTH_NAMES_HI[monthNum - 1];
  const monthNameTe = TE_MONTHS[monthNum - 1];
  const sParams = await searchParams;'''
)

code = code.replace(
    '''  const faqs = isHi
    ? [
        {
          question: `${monthNameHi} ${year} के प्रमुख व्रत एवं त्यौहार कौन से हैं?`,
          answer: `${monthNameHi} ${year} में पवित्र एकादशी व्रत, प्रदोष, पूर्णिमा, अमावस्या और कई प्रमुख पारंपरिक उत्सव आते हैं। कैलेंडर ग्रिड में किसी भी तारीख पर क्लिक करके उसकी सम्पूर्ण पूजा विधि और शुभ मुहूर्त देखें।`,
        },
        {
          question: `${monthNameHi} ${year} के लिए दैनिक तिथि और नक्षत्र कैसे देखें?`,
          answer: `ऊपर दिए गए कैलेंडर में किसी भी दिनांक के बॉक्स पर क्लिक करें। दाईं ओर के पैनल में उस दिन की उदयातिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया का सम्पूर्ण विवरण प्रदर्शित हो जाएगा।`,
        },
      ]
    : [''',
    '''  const faqs = isTe
    ? [
        {
          question: `${monthNameTe} ${year} లో ప్రధాన వ్రతాలు మరియు పండుగలు ఏవి?`,
          answer: `${monthNameTe} ${year} లో పవిత్ర ఏకాదశి వ్రతం, ప్రదోషం, పౌర్ణమి, అమావాస్య మరియు ప్రముఖ సంప్రదాయ పండుగలు వస్తాయి. క్యాలెండర్ గ్రిడ్‌లో ఏదైనా తేదీపై క్లిక్ చేసి పూర్తి పూజా విధానం, శుభ ముహూర్తాలు చూడవచ్చు.`,
        },
        {
          question: `${monthNameTe} ${year} కొరకు దిన తిథి మరియు నక్షత్రం ఎలా చూడాలి?`,
          answer: `పై క్యాలెండర్‌లో ఏదైనా తేదీ బాక్స్‌పై క్లిక్ చేయండి. పక్కనే ఉన్న ప్యానెల్‌లో ఆ రోజు ఉదయ తిథి, నక్షత్రం, శుభ ముహూర్తం, రాహుకాలం మరియు చోఘడియా పూర్తి వివరాలు కనిపిస్తాయి.`,
        },
      ]
    : isHi
    ? [
        {
          question: `${monthNameHi} ${year} के प्रमुख व्रत एवं त्यौहार कौन से हैं?`,
          answer: `${monthNameHi} ${year} में पवित्र एकादशी व्रत, प्रदोष, पूर्णिमा, अमावस्या और कई प्रमुख पारंपरिक उत्सव आते हैं। कैलेंडर ग्रिड में किसी भी तारीख पर क्लिक करके उसकी सम्पूर्ण पूजा विधि और शुभ मुहूर्त देखें।`,
        },
        {
          question: `${monthNameHi} ${year} के लिए दैनिक तिथि और नक्षत्र कैसे देखें?`,
          answer: `ऊपर दिए गए कैलेंडर में किसी भी दिनांक के बॉक्स पर क्लिक करें। दाईं ओर के पैनल में उस दिन की उदयातिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया का सम्पूर्ण विवरण प्रदर्शित हो जाएगा।`,
        },
      ]
    : ['''
)

code = code.replace(
    '''        title={isHi ? `हिन्दू कैलेंडर — ${monthNameHi} ${year}` : `Hindu Calendar — ${monthName} ${year}`}
        subtitle={
          isHi
            ? `${monthNameHi} ${year} की दैनिक तिथियाँ, व्रत, नक्षत्र एवं शुभ मुहूर्त`
            : `Daily Tithi, Vrat, Nakshatra, and Shubh Muhurat for ${monthName} ${year}`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [year, `${PATHS.calendar}/${year}`],
          [isHi ? monthNameHi : monthName, `${PATHS.calendar}/${year}/${month}`],
        )}''',
    '''        title={isTe ? `హిందూ క్యాలెండర్ — ${monthNameTe} ${year}` : isHi ? `हिन्दू कैलेंडर — ${monthNameHi} ${year}` : `Hindu Calendar — ${monthName} ${year}`}
        subtitle={
          isTe
            ? `${monthNameTe} ${year} దిన తిథులు, వ్రతాలు, నక్షత్రాలు మరియు శుభ ముహూర్తాలు`
            : isHi
            ? `${monthNameHi} ${year} की दैनिक तिथियाँ, व्रत, नक्षत्र एवं शुभ मुहूर्त`
            : `Daily Tithi, Vrat, Nakshatra, and Shubh Muhurat for ${monthName} ${year}`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "హిందూ క్యాలెండర్" : isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [year, `${PATHS.calendar}/${year}`],
          [isTe ? monthNameTe : isHi ? monthNameHi : monthName, `${PATHS.calendar}/${year}/${month}`],
        )}'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? `${monthNameHi} ${year} से संबंधित प्रश्न` : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? `${monthNameTe} ${year} కి సంబంధించిన ప్రశ్నలు` : isHi ? `${monthNameHi} ${year} से संबंधित प्रश्न` : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("3. Updated src/app/hindu-calendar/[year]/[month]/page.tsx")


# ==============================================================================
# 4. src/app/printable-calendar/page.tsx
# ==============================================================================
path = "src/app/printable-calendar/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_print_faqs = '''const PRINT_FAQS_TE = [
  {
    question: "ఈ హిందూ వాల్ క్యాలెండర్‌ను PDF రూపంలో డౌన్‌లోడ్ లేదా ప్రింట్ ఎలా చేయాలి?",
    answer:
      "కుడి ఎగువన ఉన్న 'ప్రింట్ వాల్ క్యాలెండర్ / PDF' బటన్‌పై క్లిక్ చేయండి. మీ బ్రౌజర్ ప్రింట్ డైలాగ్‌లో 'Save as PDF' ఎంచుకోండి లేదా ప్రింటర్‌తో A4 సైజులో ప్రింట్ తీయండి. ఈ పేజీ ప్రింటింగ్ కోసం ప్రత్యేకంగా రూపొందించబడింది, మెనూలు లేదా బటన్లు ఆటోమేటిక్‌గా దాచబడతాయి.",
  },
  {
    question: "ఈ క్యాలెండర్‌లోని తిథులు మరియు సూర్యోదయం నా నగరం ప్రకారం సరిగ్గా ఉంటాయా?",
    answer:
      "అవును, ఖచ్చితంగా. మార్కెట్లో దొరికే సాధారణ కాగితపు క్యాలెండర్లు వారణాసి లేదా ఉజ్జయిని సమయాలకు పరిమితమై ఉంటాయి. భక్తి వాయిస్ మీరు ఎంచుకున్న నగరం యొక్క ఖచ్చితమైన అక్షాంశ, రేఖాంశాల ప్రకారం సూర్యోదయం, సూర్యాస్తమయం మరియు ఉదయ తిథిని గణిస్తుంది.",
  },
  {
    question: "విక్రమ సంవత్సరం అంటే ఏమిటి మరియు ఇది గ్రెగోరియన్ సంవత్సరం కంటే ఎందుకు ముందు ఉంటుంది?",
    answer:
      "విక్రమ శకాన్ని ఉజ్జయిని చక్రవర్తి విక్రమాదిత్యుడు క్రీ.పూ 57 లో ప్రారంభించారు. ఇది గ్రెగోరియన్ క్యాలెండర్ కంటే 57 సంవత్సరాల ముందే ప్రారంభమైనందున ఎల్లప్పుడూ 56 నుండి 57 సంవత్సరాలు ముందుంటుంది (ఉదా. 2026 నాటికి విక్రమ సంవత్సరం 2082–2083).",
  },
  {
    question: "క్యాలెండర్ బాక్స్‌లో 'శు' మరియు 'కృ' అంటే అర్థం ఏమిటి?",
    answer:
      "'శు' అంటే శుక్ల పక్షం (అమావాస్య నుండి పౌర్ణమి వరకు పెరిగే వెన్నెల పక్షం), మరియు 'కృ' అంటే కృష్ణ పక్షం (పౌర్ణమి నుండి అమావాస్య వరకు తగ్గే చీకటి పక్షం).",
  },
];
'''

if "PRINT_FAQS_TE" not in code:
    code = te_print_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "హిందూ వాల్ క్యాలెండర్ 2026 ప్రింట్ & PDF డౌన్‌లోడ్ — సనాతన పంచాంగం A4 షీట్"
    : isHi'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;
  const faqs = isHi ? FAQS_HI : FAQS_EN;''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const initialYear = params.year ? Number(params.year) : undefined;
  const initialMonth = params.month ? Number(params.month) : undefined;
  const faqs = isTe ? PRINT_FAQS_TE : isHi ? FAQS_HI : FAQS_EN;'''
)

code = code.replace(
    '''        title={isHi ? "सनातन हिन्दू दीवार कैलेंडर (प्रिंट एवं PDF)" : "Printable Hindu Wall Calendar"}
        subtitle={
          isHi
            ? "घर अथवा कार्यालय हेतु A4 आकार में सुंदर सनातन दीवार पंचांग प्रिंट करें अथवा PDF डाउनलोड करें"
            : "High-resolution A4 Printable Wall Calendar with daily Tithi, Nakshatra, Muhurats, and festivals"
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [isHi ? "दीवार कैलेंडर" : "Printable Calendar", PATHS.printableCalendar],
        )}''',
    '''        title={isTe ? "సనాతన హిందూ వాల్ క్యాలెండర్ (ప్రింట్ & PDF)" : isHi ? "सनातन हिन्दू दीवार कैलेंडर (प्रिंट एवं PDF)" : "Printable Hindu Wall Calendar"}
        subtitle={
          isTe
            ? "ఇంటి లేదా ఆఫీస్ కొరకు A4 సైజులో అందమైన సనాతన వాల్ పంచాంగాన్ని ప్రింట్ చేయండి లేదా PDF డౌన్‌లోడ్ చేసుకోండి"
            : isHi
            ? "घर अथवा कार्यालय हेतु A4 आकार में सुंदर सनातन दीवार पंचांग प्रिंट करें अथवा PDF डाउनलोड करें"
            : "High-resolution A4 Printable Wall Calendar with daily Tithi, Nakshatra, Muhurats, and festivals"
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "హిందూ క్యాలెండర్" : isHi ? "हिन्दू कैलेंडर" : t.nav.calendar, PATHS.calendar],
          [isTe ? "వాల్ క్యాలెండర్" : isHi ? "दीवार कैलेंडर" : "Printable Calendar", PATHS.printableCalendar],
        )}'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "दीवार कैलेंडर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "వాల్ క్యాలెండర్‌కు సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "दीवार कैलेंडर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("4. Updated src/app/printable-calendar/page.tsx")


# ==============================================================================
# 5. src/app/vrat-upavas/page.tsx
# ==============================================================================
path = "src/app/vrat-upavas/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_vrat_faqs = '''const VRAT_FAQS_TE = [
  {
    question: "ఏకాదశి ఉపవాసానికి ఖచ్చితమైన పారణ సమయం ఎందుకు ముఖ్యం?",
    answer:
      "వైదిక శాస్త్రాల ప్రకారం, నిర్దేశిత ద్వాదశి పారణ సమయంలో కాకుండా ఇతర సమయాల్లో ఉపవాసం విరమిస్తే ఏకాదశి వ్రత పుణ్యం లభించదు. అంతేకాక ద్వాదశి తిథి మొదటి పాదమైన 'హరివాసరం' సమయంలో భోజనం చేయడం పూర్తిగా నిషిద్ధం.",
  },
  {
    question: "ప్రదోష వ్రత పూజకు ఏ సమయం శ్రేష్ఠమైనది?",
    answer:
      "త్రయోదశి తిథి నాడు సూర్యాస్తమయ సమయంలో — సూర్యాస్తమయానికి 45 నిమిషాల ముందు నుండి 45 నిమిషాల తర్వాత వరకు — ఉండే సంధ్యా కాలాన్ని ప్రదోష కాలం అంటారు. ఈ సమయంలో పరమశివుని ఆరాధించడం సమస్త దోషాలను తొలగిస్తుంది.",
  },
  {
    question: "సంకష్ట చతుర్థి నాడు చంద్ర దర్శనం ఎందుకు ముఖ్యం?",
    answer:
      "శ్రీ గణేశునికి అంకితమైన సంకష్ట చతుర్థి వ్రతం రాత్రి చంద్రుని దర్శించి, పాలు, గరిక మరియు పవిత్ర జలంతో అర్ఘ్యం సమర్పించిన తర్వాతే పరిపూర్ణమవుతుంది.",
  },
  {
    question: "ఉపవాస సమయంలో ఫలహార నియమాలు ఏమిటి?",
    answer:
      "ధాన్యాలు, పప్పుదినుసులు, ఉల్లి, వెల్లుల్లి మరియు సాధారణ ఉప్పు తీసుకోకూడదు. సగ్గుబియ్యం, రాజ్‌గిరా పిండి, పాలు, తాజా పండ్లు మరియు సైంధవ లవణం (రాక్ సాల్ట్) స్వీకరించవచ్చు.",
  },
];
'''

if "VRAT_FAQS_TE" not in code:
    code = te_vrat_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "सनातन व्रत एवं उपवास निर्देशिका 2026 — एकादशी, प्रदोष, संकष्टी चतुर्थी, पूर्णिमा, पारण समय व पूजा विधि"
      : "Hindu Vrat & Upavas Calendar 2026 — Ekadashi, Pradosh, Sankashti, Purnima & Fasting Rules",''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return localizedMetadata({
    title: isTe
      ? "సనాతన వ్రత & ఉపవాస మార్గదర్శి 2026 — ఏకాదశి, ప్రదోషం, సంకష్ట చతుర్థి, పౌర్ణమి, పారణ సమయాలు & పూజా విధానం"
      : isHi
      ? "सनातन व्रत एवं उपवास निर्देशिका 2026 — एकादशी, प्रदोष, संकष्टी चतुर्थी, पूर्णिमा, पारण समय व पूजा विधि"
      : "Hindu Vrat & Upavas Calendar 2026 — Ekadashi, Pradosh, Sankashti, Purnima & Fasting Rules",'''
)

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const today = new Date();
  const panchang = getPanchang(today, DEFAULT_CITY);

  const crumbs = localizedCrumbs(
    isHi ? "होम" : "Home",
    [isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas]
  );''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const today = new Date();
  const panchang = getPanchang(today, DEFAULT_CITY);

  const crumbs = localizedCrumbs(
    isTe ? "హోమ్" : isHi ? "होम" : "Home",
    [isTe ? "వ్రతాలు & ఉపవాసాలు" : isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas]
  );'''
)

code = code.replace(
    '''        title={isHi ? "सनातन व्रत, उपवास एवं पारण निर्देशिका 2026" : "Sanatana Vrat, Upavas & Fasting Guide 2026"}''',
    '''        title={isTe ? "సనాతన వ్రతాలు, ఉపవాసాలు & పారణ మార్గదర్శి 2026" : isHi ? "सनातन व्रत, उपवास एवं पारण निर्देशिका 2026" : "Sanatana Vrat, Upavas & Fasting Guide 2026"}'''
)

code = code.replace(
    '''<FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />''',
    '''<FaqList faqs={isTe ? VRAT_FAQS_TE : isHi ? FAQS_HI : FAQS_EN} jsonLd />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("5. Updated src/app/vrat-upavas/page.tsx")


# ==============================================================================
# 6. src/app/vrat-upavas/ekadashi/page.tsx
# ==============================================================================
path = "src/app/vrat-upavas/ekadashi/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

te_ekadashi_faqs = '''const EKADASHI_FAQS_TE = [
  {
    question: "ఏకాదశి వ్రత పారణ ఎప్పుడు చేయాలి?",
    answer:
      "ఏకాదశి వ్రత పారణ మరుసటి రోజు అనగా ద్వాదశి తిథి నాడు సూర్యోదయం తర్వాత, ద్వాదశి ముగియక ముందే చేయాలి. అలాగే పారణ సమయం హరివాసర కాలంలో లేకుండా జాగ్రత్త వహించాలి.",
  },
  {
    question: "హరివాసరం అంటే ఏమిటి మరియు ఇందులో పారణ ఎందుకు నిషిద్ధం?",
    answer:
      "ద్వాదశి తిథి మొదటి 25% (నాల్గవ భాగం) భాగాన్ని 'హరివాసరం' అంటారు. పద్మపురాణం ప్రకారం హరివాసరంలో భోజనం చేయడం వల్ల ఏకాదశి వ్రత ఫలితం నశిస్తుంది. కాబట్టి హరివాసరం ముగిసిన తర్వాతే పారణ చేయాలి.",
  },
  {
    question: "స్మార్త మరియు వైష్ణవ ఏకాదశి తేదీల్లో తేడా ఎందుకు వస్తుంది?",
    answer:
      "స్మార్త గృహస్థ సంప్రదాయంలో సూర్యోదయానికి ముందు అరుణోదయ వేళ దశమి తిథి ఉన్నప్పటికీ ఆ రోజే వ్రతం ఆచరిస్తారు. అయితే వైష్ణవ మరియు ఇస్కాన్ సంప్రదాయంలో సంపూర్ణ శుద్ధ ఏకాదశినే ఆచరిస్తారు, దీనివల్ల ఒక్కోసారి రెండు సంప్రదాయాల మధ్య ఒక రోజు తేడా వస్తుంది.",
  },
  {
    question: "ఒకవేళ ద్వాదశి తిథి సూర్యోదయానికి ముందే ముగిసిపోతే పారణ ఎలా చేయాలి?",
    answer:
      "శాస్త్రాల ప్రకారం ఒకవేళ ద్వాదశి తిథి సూర్యోదయానికి ముందే ముగిసిపోతే, సూర్యోదయం అయిన వెంటనే పారణ చేయాలి, ఎందుకంటే సూర్యోదయానికి ముందు పారణ చేయడం శాస్త్ర విరుద్ధం.",
  },
];
'''

if "EKADASHI_FAQS_TE" not in code:
    code = te_ekadashi_faqs + "\n" + code

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const currentYear = new Date().getFullYear();

  const title = isHi
    ? `एकादशी व्रत एवं पारणा समय ${currentYear} — स्मार्त व वैष्णव तारीखें, हरिवासर समाप्ति व मुहूर्त`
    : `Ekadashi Vrat & Parana Timings ${currentYear} — Accurate Smarta & Vaishnava Parana Windows`;''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  const title = isTe
    ? `ఏకాదశి వ్రతం & పారణ సమయాలు ${currentYear} — స్మార్త & వైష్ణవ తేదీలు, హరివాసర సమాప్తి & శుభ ముహూర్తం`
    : isHi
    ? `एकादशी व्रत एवं पारणा समय ${currentYear} — स्मार्त व वैष्णव तारीखें, हरिवासर समाप्ति व मुहूर्त`
    : `Ekadashi Vrat & Parana Timings ${currentYear} — Accurate Smarta & Vaishnava Parana Windows`;'''
)

code = code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const currentYear = new Date().getFullYear();

  const faqs = isHi''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  const faqs = isTe ? EKADASHI_FAQS_TE : isHi'''
)

code = code.replace(
    '''        title={
          isHi
            ? `एकादशी व्रत एवं पारणा समय ${currentYear}`
            : `Ekadashi Vrat & Parana Timings ${currentYear}`
        }
        subtitle={
          isHi
            ? `वर्ष ${currentYear} की सभी २४ एकादशियों की सूची, स्मार्त व वैष्णव व्रत तिथियाँ, द्वादशी पारणा समय एवं हरिवासर समाप्ति`
            : `Complete calendar of all 24 Ekadashis in ${currentYear} with Smarta & Vaishnava fast dates and Parana windows.`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas],
          [isHi ? "एकादशी कैलेंडर" : "Ekadashi", `${PATHS.vratUpavas}/ekadashi`]
        )}''',
    '''        title={
          isTe
            ? `ఏకాదశి వ్రతం & పారణ సమయాలు ${currentYear}`
            : isHi
            ? `एकादशी व्रत एवं पारणा समय ${currentYear}`
            : `Ekadashi Vrat & Parana Timings ${currentYear}`
        }
        subtitle={
          isTe
            ? `${currentYear} సంవత్సరపు 24 ఏకాదశుల పూర్తి పట్టిక, స్మార్త & వైష్ణవ వ్రత తేదీలు, ద్వాదశి పారణ సమయాలు మరియు హరివాసర సమాప్తి`
            : isHi
            ? `वर्ष ${currentYear} की सभी २४ एकादशियों की सूची, स्मार्त व वैष्णव व्रत तिथियाँ, द्वादशी पारणा समय एवं हरिवासर समाप्ति`
            : `Complete calendar of all 24 Ekadashis in ${currentYear} with Smarta & Vaishnava fast dates and Parana windows.`
        }
        hub="calendar"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "వ్రతాలు & ఉపవాసాలు" : isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas],
          [isTe ? "ఏకాదశి క్యాలెండర్" : isHi ? "एकादशी कैलेंडर" : "Ekadashi", `${PATHS.vratUpavas}/ekadashi`]
        )}'''
)

code = code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "एकादशी व्रत एवं पारणा से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "ఏకాదశి వ్రతం మరియు పారణకు సంబంధించిన ముఖ్య ప్రశ్నలు" : isHi ? "एकादशी व्रत एवं पारणा से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("6. Updated src/app/vrat-upavas/ekadashi/page.tsx")


# ==============================================================================
# 7. src/app/hindu-festivals/[slug]/page.tsx
# ==============================================================================
path = "src/app/hindu-festivals/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

code = code.replace(
    '''{isHi ? "कथा एवं पौराणिक महत्व" : "The story & significance"}''',
    '''{isTe ? "కథ మరియు పౌరాణిక ప్రాముఖ్యత" : isHi ? "कथा एवं पौराणिक महत्व" : "The story & significance"}'''
)

code = code.replace(
    '''{isHi ? "त्योहार की मुख्य परंपराएं एवं नियम" : "Traditions & Sacred Customs"}''',
    '''{isTe ? "పండుగ యొక్క ముఖ్య సంప్రదాయాలు & ఆచారాలు" : isHi ? "त्योहार की मुख्य परंपराएं एवं नियम" : "Traditions & Sacred Customs"}'''
)

code = code.replace(
    '''{isHi ? "घर पर सरल पूजा विधि" : "Puja Vidhi & Rituals at Home"}''',
    '''{isTe ? "ఇంట్లో సులభమైన పూజా విధానం" : isHi ? "घर पर सरल पूजा विधि" : "Puja Vidhi & Rituals at Home"}'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
print("7. Updated src/app/hindu-festivals/[slug]/page.tsx")

with open("src/components/calendar/CalendarHeader.tsx", "r", encoding="utf-8") as f:
    ch = f.read()

ch = ch.replace(
    '''const CATEGORIES: { id: FestivalCategory; label: string; labelHi: string; icon?: string }[] = [
  { id: "all", label: "All Days", labelHi: "सभी दिन" },
  { id: "festival", label: "Festivals", labelHi: "पर्व / त्यौहार" },
  { id: "vrat", label: "Vrat & Upvas", labelHi: "व्रत एवं उपवास" },
  { id: "ekadashi", label: "Ekadashi", labelHi: "एकादशी" },
  { id: "purnima", label: "Purnima", labelHi: "पूर्णिमा" },
  { id: "amavasya", label: "Amavasya", labelHi: "अमावस्या" },
  { id: "pradosh", label: "Pradosh", labelHi: "प्रदोष व्रत" },
  { id: "sankashti", label: "Sankashti", labelHi: "संकष्टी चतुर्थी" },
  { id: "sankranti", label: "Sankranti", labelHi: "संक्रांति" },
];''',
    '''const CATEGORIES: { id: FestivalCategory; label: string; labelHi: string; labelTe: string; icon?: string }[] = [
  { id: "all", label: "All Days", labelHi: "सभी दिन", labelTe: "అన్ని రోజులు" },
  { id: "festival", label: "Festivals", labelHi: "पर्व / त्यौहार", labelTe: "పండుగలు" },
  { id: "vrat", label: "Vrat & Upvas", labelHi: "व्रत एवं उपवास", labelTe: "వ్రతాలు & ఉపవాసాలు" },
  { id: "ekadashi", label: "Ekadashi", labelHi: "एकादशी", labelTe: "ఏకాదశి" },
  { id: "purnima", label: "Purnima", labelHi: "पूर्णिमा", labelTe: "పౌర్ణమి" },
  { id: "amavasya", label: "Amavasya", labelHi: "अमावस्या", labelTe: "అమావాస్య" },
  { id: "pradosh", label: "Pradosh", labelHi: "प्रदोष व्रत", labelTe: "ప్రదోషం" },
  { id: "sankashti", label: "Sankashti", labelHi: "संकष्टी चतुर्थी", labelTe: "సంకష్ట చతుర్థి" },
  { id: "sankranti", label: "Sankranti", labelHi: "संक्रांति", labelTe: "సంక్రాంతి" },
];'''
)

ch = ch.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

ch = ch.replace(
    '''{isHi ? cat.labelHi : cat.label}''',
    '''{isTe ? cat.labelTe : isHi ? cat.labelHi : cat.label}'''
)

ch = ch.replace(
    '''<CityPickerButton city={city} onCityChange={onCityChange} isHi={isHi} variant="compact" />''',
    '''<CityPickerButton city={city} onCityChange={onCityChange} isHi={isHi} isTe={isTe} variant="compact" />'''
)

ch = ch.replace(
    '''<span>{isHi ? "आज" : "Today"}</span>''',
    '''<span>{isTe ? "నేడు" : isHi ? "आज" : "Today"}</span>'''
)

with open("src/components/calendar/CalendarHeader.tsx", "w", encoding="utf-8") as f:
    f.write(ch)
print("8. Updated src/components/calendar/CalendarHeader.tsx")

with open("src/components/calendar/ComingSoonCard.tsx", "r", encoding="utf-8") as f:
    csc = f.read()

csc = csc.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

csc = csc.replace(
    '''{isHi ? "शीघ्र उपलब्ध" : "Coming Soon"}''',
    '''{isTe ? "త్వరలో రాబోతోంది" : isHi ? "शीघ्र उपलब्ध" : "Coming Soon"}'''
)

csc = csc.replace(
    '''            {isHi
              ? "व्यक्तिगत एकादशी एवं व्रत की सूचनाएं"
              : "Personalized Ekadashi & Vrat Notifications"}''',
    '''            {isTe
              ? "వ్యక్తిగత ఏకాదశి & వ్రత నోటిఫికేషన్లు"
              : isHi
              ? "व्यक्तिगत एकादशी एवं व्रत की सूचनाएं"
              : "Personalized Ekadashi & Vrat Notifications"}'''
)

csc = csc.replace(
    '''{isHi ? "सूचित करें" : "Notify Me"}''',
    '''{isTe ? "సమాచారం ఇవ్వండి" : isHi ? "सूचित करें" : "Notify Me"}'''
)

with open("src/components/calendar/ComingSoonCard.tsx", "w", encoding="utf-8") as f:
    f.write(csc)
print("9. Updated src/components/calendar/ComingSoonCard.tsx")

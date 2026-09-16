# Update Kundli suite for Telugu
import re

# 1. Update seo-content.ts with SPIRITUAL_TOOL_FAQS_TE
with open("src/lib/spiritual-tools/seo-content.ts", "r", encoding="utf-8") as f:
    seo = f.read()

te_faqs_block = '''export const SPIRITUAL_TOOL_FAQS_TE = {
  landing: [
    {
      question: "భక్తి వాయిస్ లోని ఆధ్యాత్మిక మరియు వైదిక సాధనాలు అన్నీ ఉచితమేనా?",
      answer:
        "అవును, 100% శాశ్వతంగా ఉచితం. దిన పంచాంగం, హిందూ క్యాలెండర్ 2026, జన్మ కుండలి మరియు కుండలి మిలనం వంటి అన్ని వైదిక సాధనాలు ఎటువంటి రుసుము లేదా లాగిన్ అవసరం లేకుండా భక్తులకు అందుబాటులో ఉన్నాయి.",
    },
    {
      question: "నా పుట్టిన తేదీ, సమయం మరియు స్థల సమాచారం సురక్షితమేనా?",
      answer:
        "ఖచ్చితంగా. అన్ని గణనలు మీ బ్రౌజర్ లోపలే క్లయింట్-సైడ్ జరుగుతాయి. మీ సమాచారం ఎక్కడా ఏ సర్వర్ లోనూ నిల్వ చేయబడదు లేదా ట్రాక్ చేయబడదు.",
    },
    {
      question: "భక్తి వాయిస్ లో ఏయే వైదిక సాధనాలు అందుబాటులో ఉన్నాయి?",
      answer:
        "భక్తి వాయిస్ లో: (1) శుభ ముహూర్తాలతో కూడిన దిన పంచాంగం & చోఘడియా, (2) తిథి, వ్రతాలతో కూడిన హిందూ క్యాలెండర్, (3) ఉచిత జన్మ కుండలి తయారీ, (4) వివాహం కొరకు 36 గుణాల అష్టకూట కుండలి మిలనం మరియు (5) నేటి తిథి లైవ్ ట్రాకర్ ఉన్నాయి.",
    },
    {
      question: "వివాహం కోసం 36 గుణాల కుండలి మిలనం ఎలా పనిచేస్తుంది?",
      answer:
        "కుండలి మిలనం సాంప్రదాయ వైదిక అష్టకూట పరీక్షను నిర్వహిస్తుంది: వర్ణ, వశ్య, తార, యోని, గ్రహ మైత్రి, గణ, భకూట మరియు నాడి — మొత్తం 36 గుణాలు. వివాహానికి కనీసం 18 గుణాలు కలవడం శుభప్రదంగా పరిగణించబడుతుంది.",
    },
  ] satisfies Faq[],

  panchang: [
    {
      question: "పంచాంగం అంటే ఏమిటి మరియు దాని 5 అంగాలు ఏవి?",
      answer:
        "పంచాంగం అనేది తిథి, వారం, నక్షత్రం, యోగం మరియు కరణం అనే ఐదు అంగాలతో కూడిన సనాతన హిందూ ఖగోళ కేలండర్. శుభకార్యాలు, వ్రతాలు మరియు రోజువారీ ఆధ్యాత్మిక సాధనలకు పంచాంగాన్ని అనుసరిస్తారు.",
    },
    {
      question: "అభిజిత్ ముహూర్తం మరియు రాహుకాలం మధ్య తేడా ఏమిటి?",
      answer:
        "అభిజిత్ ముహూర్తం అనేది మధ్యాహ్న సమయంలో ఉండే అత్యంత శుభప్రదమైన సమయం (సుమారు 48 నిమిషాలు), ఇది ఏదైనా కొత్త పని ప్రారంభించడానికి ఉత్తమం. రాహుకాలం అనేది రోజులో సుమారు 90 నిమిషాల అశుభ కాలం, ఇందులో శుభకార్యాలు ప్రారంభించకూడదు.",
    },
  ] satisfies Faq[],

  kundli: [
    {
      question: "నా జన్మ వివరాలు సురక్షితమేనా?",
      answer:
        "ఖచ్చితంగా. మీ తేదీ, సమయం మరియు పుట్టిన ప్రదేశం స్థానికంగా మీ బ్రౌజర్‌లోనే లెక్కించబడతాయి మరియు సర్వర్‌లకు పంపబడవు.",
    },
    {
      question: "ఖచ్చితమైన కుండలి కోసం ఏమి అవసరం?",
      answer:
        "ఖచ్చితమైన పుట్టిన తేదీ, పుట్టిన సమయం (గంటలు & నిమిషాలు) మరియు జన్మస్థలం నమోదు చేయండి. సరైన లగ్నం మరియు గ్రహ స్థితుల కోసం బర్త్ సర్టిఫికేట్ సమయం ఉపయోగించండి.",
    },
    {
      question: "వైదిక జ్యోతిష్యంలో 16 వర్గ కుండలులు (షోడశవర్గ) ఏమిటి?",
      answer:
        "మహర్షి పరాశరుడు ప్రతిపాదించిన 16 వర్గ చక్రాలు జీవితంలోని విభిన్న అంశాలను సూక్ష్మంగా విశ్లేషిస్తాయి: D-1 లగ్నం (శరీరం/ఆరోగ్యం), D-2 హోరా (ధనం), D-3 ద్రేక్కాణం (సోదరులు/ధైర్యం), D-9 నవాంశ (వివాహం/ధర్మం/భాగస్వామి), D-10 దశమాంశ (కెరీర్/కీర్తి), D-60 షష్ట్యంశ (పూర్వ జన్మ సంచిత కర్మ).",
    },
    {
      question: "పరాశరి అష్టకవర్గ పద్ధతి ఎలా పనిచేస్తుంది?",
      answer:
        "అష్టకవర్గ 7 ప్రధాన గ్రహాల ద్వారా 12 భావాలలో ఇవ్వబడిన శుభ బిందువులను లెక్కిస్తుంది. మొత్తం సర్వాష్టకవర్గ (SAV) స్కోరు 337 పాయింట్లు. 28 లేదా అంతకంటే ఎక్కువ బిందువులు ఉన్న భావాలు బలం మరియు సంపదను సూచిస్తాయి.",
    },
  ] satisfies Faq[],

  milan: [
    {
      question: "వివాహానికి ఎన్ని గుణాలు కలవడం అనుకూలం?",
      answer:
        "వైదిక అష్టకూట మిలనంలో మొత్తం 36 గుణాలలో కనీసం 18 గుణాలు లభిస్తే అనుకూలమైన మ్యాచ్ గా పరిగణిస్తారు. 18-24 సాధారణం, 25-32 ఉత్తమం మరియు 33-36 అత్యుత్తమ శుభం.",
    },
    {
      question: "అష్టకూట మిలనం అంటే ఏమిటి?",
      answer:
        "అష్టకూట మిలనం అనేది వర్ణ, వశ్య, తార, యోని, గ్రహ మైత్రి, గణ, భకూట మరియు నాడి అనే 8 భాగాల ద్వారా వధూవరుల శారీరక, మానసిక, ఆర్థిక మరియు వంశపారంపర్య అనుకూలతను పరీక్షించే పద్ధతి.",
    },
  ] satisfies Faq[],
} as const;
'''

if "SPIRITUAL_TOOL_FAQS_TE" not in seo:
    seo = seo + "\n" + te_faqs_block
    with open("src/lib/spiritual-tools/seo-content.ts", "w", encoding="utf-8") as f:
        f.write(seo)
    print("Updated src/lib/spiritual-tools/seo-content.ts")


# 2. Update src/app/kundli/page.tsx
with open("src/app/kundli/page.tsx", "r", encoding="utf-8") as f:
    k_code = f.read()

k_code = k_code.replace(
    '''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";''',
    '''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_FAQS_TE,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";'''
)

k_code = k_code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "मुफ्त जन्म कुंडली ऑनलाइन — 16 वर्ग कुंडलियां (नवांश D-9, दशमांश D-10) एवं अष्टाकवर्ग कैलकुलेटर"
      : "Free Janam Kundli Online (जन्म कुंडली) — 16 Divisional Charts (D9, D10) & Ashtakavarga Calculator",
    description: isHi
      ? "सटीक वैदिक जन्म कुंडली 100% मुफ्त ऑनलाइन बनाएं। 16 वर्ग कुंडलियां (D-1 से D-60), नवांश (D-9), महर्षि पराशर अष्टाकवर्ग (337 बिंदु तालिका), उत्तर/दक्षिण/पूर्व भारतीय चार्ट, मांगलिक दोष एवं विंशोत्तरी महादशा। 100% सुरक्षित और गोपनीय।"
      : "Generate your free, 100% accurate Vedic Janam Kundli online. Detailed Shodashvarga (16 divisional charts: D-1 to D-60), Parashari Ashtakavarga (337 SAV Bindus), North/South/East chart styles, Lagna, Manglik Dosha & Vimshottari Dasha.",''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return localizedMetadata({
    title: isTe
      ? "ఉచిత జన్మ కుండలి ఆన్‌లైన్ — 16 వర్గ కుండలులు (నవాంశ D-9, దశమాంశ D-10) & అష్టకవర్గ కాలిక్యులేటర్"
      : isHi
      ? "मुफ्त जन्म कुंडली ऑनलाइन — 16 वर्ग कुंडलियां (नवांश D-9, दशमांश D-10) एवं अष्टाकवर्ग कैलकुलेटर"
      : "Free Janam Kundli Online (जन्म कुंडली) — 16 Divisional Charts (D9, D10) & Ashtakavarga Calculator",
    description: isTe
      ? "100% ఖచ్చితమైన వైదిక జన్మ కుండలిని ఉచితంగా ఆన్‌లైన్‌లో పొందండి. 16 వర్గ కుండలులు (D-1 నుండి D-60), నవాంశ (D-9), అష్టకవర్గ (337 బిందువులు), దక్షిణ/ఉత్తర భారత చార్ట్ శైలులు, మాంగ్లిక్ విచారం మరియు వింశోత్తరి మహాదశ."
      : isHi
      ? "सटीक वैदिक जन्म कुंडली 100% मुफ्त ऑनलाइन बनाएं। 16 वर्ग कुंडलियां (D-1 से D-60), नवांश (D-9), महर्षि पराशर अष्टाकवर्ग (337 बिंदु तालिका), उत्तर/दक्षिण/पूर्व भारतीय चार्ट, मांगलिक दोष एवं विंशोत्तरी महादशा। 100% सुरक्षित और गोपनीय।"
      : "Generate your free, 100% accurate Vedic Janam Kundli online. Detailed Shodashvarga (16 divisional charts: D-1 to D-60), Parashari Ashtakavarga (337 SAV Bindus), North/South/East chart styles, Lagna, Manglik Dosha & Vimshottari Dasha.",'''
)

k_code = k_code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.kundli] : [...SPIRITUAL_TOOL_FAQS.kundli];''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? [...SPIRITUAL_TOOL_FAQS_TE.kundli] : isHi ? [...SPIRITUAL_TOOL_FAQS_HI.kundli] : [...SPIRITUAL_TOOL_FAQS.kundli];'''
)

k_code = k_code.replace(
    '''        title={isHi ? "मुफ्त जन्म कुंडली ऑनलाइन" : "Free Janam Kundli Online"}
        subtitle={
          isHi
            ? "सटीक वैदिक जन्म कुंडली, 16 वर्ग चक्र (नवांश, दशमांश), महर्षि पराशर अष्टाकवर्ग, उत्तर व दक्षिण भारतीय चार्ट, मांगलिक दोष एवं विंशोत्तरी महादशा।"
            : "100% accurate Vedic birth chart calculation with 16 divisional charts, Parashari Ashtakavarga, North & South Indian chart styles, and Vimshottari Dasha."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "कुंडली" : "Kundli", PATHS.kundli],
        )}''',
    '''        title={isTe ? "ఉచిత జన్మ కుండలి ఆన్‌లైన్" : isHi ? "मुफ्त जन्म कुंडली ऑनलाइन" : "Free Janam Kundli Online"}
        subtitle={
          isTe
            ? "ఖచ్చితమైన వైదిక జన్మ కుండలి, 16 వర్గ చక్రాలు (నవాంశ, దశమాంశ), పరాశరి అష్టకవర్గ, దక్షిణ & ఉత్తర భారత శైలులు, మాంగ్లిక్ మరియు వింశోత్తరి మహాదశ."
            : isHi
            ? "सटीक वैदिक जन्म कुंडली, 16 वर्ग चक्र (नवांश, दशमांश), महर्षि पराशर अष्टाकवर्ग, उत्तर व दक्षिण भारतीय चार्ट, मांगलिक दोष एवं विंशोत्तरी महादशा।"
            : "100% accurate Vedic birth chart calculation with 16 divisional charts, Parashari Ashtakavarga, North & South Indian chart styles, and Vimshottari Dasha."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
        )}'''
)

k_code = k_code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "जन्म कुंडली से संबंधित अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "జన్మ కుండలికి సంబంధించిన తరచుగా అడిగే ప్రశ్నలు" : isHi ? "जन्म कुंडली से संबंधित अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"} />'''
)

with open("src/app/kundli/page.tsx", "w", encoding="utf-8") as f:
    f.write(k_code)
print("Updated src/app/kundli/page.tsx")


# 3. Update src/app/kundli-milan/page.tsx
with open("src/app/kundli-milan/page.tsx", "r", encoding="utf-8") as f:
    km_code = f.read()

km_code = km_code.replace(
    '''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";''',
    '''import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_FAQS_TE,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";'''
)

km_code = km_code.replace(
    '''  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "मुफ्त 36 गुण कुंडली मिलान ऑनलाइन — वैदिक अष्टकूट विवाह अनुकूलता एवं मांगलिक दोष जांच"
      : "Free 36 Guna Kundli Milan Online (कुंडली मिलान) — Vedic Ashtakoot Marriage Compatibility",
    description: isHi
      ? "वर एवं कन्या की जन्म तिथि, समय और स्थान अनुसार 36 गुण अष्टकूट कुंडली मिलान। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी दोष का विस्तृत विश्लेषण। 100% मुफ्त एवं प्रामाणिक।"
      : "Perform free 36 Guna Vedic Kundli Milan for marriage compatibility. Complete Ashtakoot scoring (Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi) with Nadi and Bhakoot dosha cancellation rules.",''',
    '''  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return localizedMetadata({
    title: isTe
      ? "ఉచిత 36 గుణాల కుండలి మిలనం ఆన్‌లైన్ — వైదిక అష్టకూట వివాహ పొంతన & మాంగ్లిక్ దోష పరీక్ష"
      : isHi
      ? "मुफ्त 36 गुण कुंडली मिलान ऑनलाइन — वैदिक अष्टकूट विवाह अनुकूलता एवं मांगलिक दोष जांच"
      : "Free 36 Guna Kundli Milan Online (कुंडली मिलान) — Vedic Ashtakoot Marriage Compatibility",
    description: isTe
      ? "వధూవరుల పుట్టిన తేదీ, సమయం మరియు స్థలం ప్రకారం 36 గుణాల అష్టకూట కుండలి మిలనం. వర్ణ, వశ్య, తార, యోని, గ్రహ మైత్రి, గణ, భకూట మరియు నాడి దోషాల సమగ్ర విశ్లేషణ."
      : isHi
      ? "वर एवं कन्या की जन्म तिथि, समय और स्थान अनुसार 36 गुण अष्टकूट कुंडली मिलान। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी दोष का विस्तृत विश्लेषण। 100% मुफ्त एवं प्रामाणिक।"
      : "Perform free 36 Guna Vedic Kundli Milan for marriage compatibility. Complete Ashtakoot scoring (Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi) with Nadi and Bhakoot dosha cancellation rules.",'''
)

km_code = km_code.replace(
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.milan] : [...SPIRITUAL_TOOL_FAQS.milan];''',
    '''  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? [...SPIRITUAL_TOOL_FAQS_TE.milan] : isHi ? [...SPIRITUAL_TOOL_FAQS_HI.milan] : [...SPIRITUAL_TOOL_FAQS.milan];'''
)

km_code = km_code.replace(
    '''        title={isHi ? "36 गुण कुंडली मिलान" : "36 Guna Kundli Milan Online"}
        subtitle={
          isHi
            ? "वैदिक अष्टकूट पद्धति द्वारा वर एवं कन्या के 36 गुणों का प्रामाणिक मिलान, भकूट एवं नाड़ी दोष परिहार विश्लेषण।"
            : "Traditional 36 Guna matching for marital harmony, temperament, health, and mutual prosperity."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "कुंडली" : "Kundli", PATHS.kundli],
          [isHi ? "कुंडली मिलान" : "Kundli Milan", PATHS.kundliMilan],
        )}''',
    '''        title={isTe ? "36 గుణాల కుండలి మిలనం" : isHi ? "36 गुण कुंडली मिलान" : "36 Guna Kundli Milan Online"}
        subtitle={
          isTe
            ? "వైదిక అష్టకూట పద్ధతి ద్వారా వధూవరుల 36 గుణాల ప్రామాణిక మిలనం, భకూట మరియు నాడి దోష నివారణ విశ్లేషణ."
            : isHi
            ? "वैदिक अष्टकूट पद्धति द्वारा वर एवं कन्या के 36 गुणों का प्रामाणिक मिलान, भकूट एवं नाड़ी दोष परिहार विश्लेषण।"
            : "Traditional 36 Guna matching for marital harmony, temperament, health, and mutual prosperity."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
          [isTe ? "కుండలి మిలనం" : isHi ? "कुंडली मिलान" : "Kundli Milan", PATHS.kundliMilan],
        )}'''
)

km_code = km_code.replace(
    '''<FaqList faqs={faqs} title={isHi ? "कुंडली मिलान से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />''',
    '''<FaqList faqs={faqs} title={isTe ? "కుండలి మిలనానికి సంబంధించిన ముఖ్య ప్రశ్నలు" : isHi ? "कुंडली मिलान से संबंधित मुख्य प्रश्न" : "Frequently Asked Questions"} />'''
)

with open("src/app/kundli-milan/page.tsx", "w", encoding="utf-8") as f:
    f.write(km_code)
print("Updated src/app/kundli-milan/page.tsx")


# 4. Update BirthDetailsFields.tsx
with open("src/components/spiritual-tools/BirthDetailsFields.tsx", "r", encoding="utf-8") as f:
    bdf = f.read()

bdf = bdf.replace(
    '''  const locale = useLocale();
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

bdf = bdf.replace(
    '''setQuery(isHi ? "मेरी वर्तमान लोकेशन" : "My Current Location");''',
    '''setQuery(isTe ? "నా ప్రస్తుత ప్రదేశం" : isHi ? "मेरी वर्तमान लोकेशन" : "My Current Location");'''
)

bdf = bdf.replace(
    '''            placeholder={
              prefix === "boy"
                ? isHi ? "वर का नाम (उदा. राहुल)" : "Groom's Name (e.g. Rahul)"
                : prefix === "girl"
                ? isHi ? "कन्या का नाम (उदा. प्रिया)" : "Bride's Name (e.g. Priya)"
                : isHi ? "पूरा नाम दर्ज करें" : "Enter Full Name"
            }''',
    '''            placeholder={
              prefix === "boy"
                ? isTe ? "వరుని పేరు (ఉదా. రాహుల్)" : isHi ? "वर का नाम (उदा. राहुल)" : "Groom's Name (e.g. Rahul)"
                : prefix === "girl"
                ? isTe ? "వధువు పేరు (ఉదా. ప్రియ)" : isHi ? "कन्या का नाम (उदा. प्रिया)" : "Bride's Name (e.g. Priya)"
                : isTe ? "పూర్తి పేరును నమోదు చేయండి" : isHi ? "पूरा नाम दर्ज करें" : "Enter Full Name"
            }'''
)

bdf = bdf.replace(
    '''<span>{isHi ? "जीपीएस उपयोग करें" : "Use GPS"}</span>''',
    '''<span>{isTe ? "జీపీఎస్ ఉపయోగించండి" : isHi ? "जीपीएस उपयोग करें" : "Use GPS"}</span>'''
)

bdf = bdf.replace(
    '''placeholder={isHi ? "शहर का नाम टाइप करें..." : labels.placeHint}''',
    '''placeholder={isTe ? "నగరం లేదా గ్రామం పేరు నమోదు చేయండి..." : isHi ? "शहर का नाम टाइप करें..." : labels.placeHint}'''
)

with open("src/components/spiritual-tools/BirthDetailsFields.tsx", "w", encoding="utf-8") as f:
    f.write(bdf)
print("Updated BirthDetailsFields.tsx")


# 5. Update KundliTool.tsx
with open("src/components/spiritual-tools/KundliTool.tsx", "r", encoding="utf-8") as f:
    kt = f.read()

kt = kt.replace(
    '''  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.kundli;
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.kundli;
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

kt = kt.replace(
    '''name: name.trim() || (isHi ? "जातक" : "Devotee"),''',
    '''name: name.trim() || (isTe ? "జాతకుడు" : isHi ? "जातक" : "Devotee"),'''
)

kt = kt.replace(
    '''{isHi ? "वैदिक जन्म पत्रिका" : "Vedic Birth Horoscope"}''',
    '''{isTe ? "వైదిక జన్మ పత్రిక" : isHi ? "वैदिक जन्म पत्रिका" : "Vedic Birth Horoscope"}'''
)

kt = kt.replace(
    '''<span>{isHi ? "पीडीएफ / प्रिंट" : "Print PDF"}</span>''',
    '''<span>{isTe ? "పీడీఎఫ్ / ప్రింట్" : isHi ? "पीडीएफ / प्रिंट" : "Print PDF"}</span>'''
)

with open("src/components/spiritual-tools/KundliTool.tsx", "w", encoding="utf-8") as f:
    f.write(kt)
print("Updated KundliTool.tsx")


# 6. Update KundliMilanTool.tsx
with open("src/components/spiritual-tools/KundliMilanTool.tsx", "r", encoding="utf-8") as f:
    kmt = f.read()

kmt = kmt.replace(
    '''  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.milan;
  const isHi = locale === "hi";''',
    '''  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.milan;
  const isHi = locale === "hi";
  const isTe = locale === "te";'''
)

kmt = kmt.replace(
    '''name: boy.name.trim() || (isHi ? "वर" : "Groom")''',
    '''name: boy.name.trim() || (isTe ? "వరుడు" : isHi ? "वर" : "Groom")'''
)

kmt = kmt.replace(
    '''name: girl.name.trim() || (isHi ? "कन्या" : "Bride")''',
    '''name: girl.name.trim() || (isTe ? "వధువు" : isHi ? "कन्या" : "Bride")'''
)

with open("src/components/spiritual-tools/KundliMilanTool.tsx", "w", encoding="utf-8") as f:
    f.write(kmt)
print("Updated KundliMilanTool.tsx")

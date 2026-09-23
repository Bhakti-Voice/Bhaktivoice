import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { KaalSarpTool } from "@/components/spiritual-tools/KaalSarpTool";
import { RelatedKundliTools } from "@/components/spiritual-tools/RelatedKundliTools";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const title = isTe
    ? "కాల సర్ప దోష కాలిక్యులేటర్ — 12 రకాల కాల సర్ప యోగాలు & వైదిక నివారణలు"
    : isHi
    ? "काल सर्प दोष कैलकुलेटर — 12 प्रकार के काल सर्प योग, उदित/अनुदित एवं वैदिक उपाय"
    : "Kaal Sarp Dosha Calculator — 12 Types of Kaal Sarp Yoga, Udit/Anudit Check & Vedic Remedies";
  const description = isTe
    ? "100% ఖచ్చితమైన వైదిక గణనతో కాల సర్ప దోషాన్ని ఆన్‌లైన్‌లో లెక్కించండి. అనంత నుండి శేషనాగ వరకు 12 రకాల కాల సర్ప యోగాలు, పూర్ణ/ఆంశిక ప్రభావం మరియు ప్రామాణిక శాస్త్ర నివారణలు."
    : isHi
    ? "100% सटीक वैदिक गणना द्वारा काल सर्प दोष की ऑनलाइन जांच करें। अनंत से शेषनाग तक 12 प्रकार के काल सर्प योग, पूर्ण व आंशिक प्रभाव एवं प्रामाणिक शास्त्रीय उपाय।"
    : "Calculate Kaal Sarp Dosha online with 100% astronomical accuracy. Identify all 12 classical Kaal Sarp Yogas (Anant to Sheshnag), Udit vs Anudit Gola direction, Purna vs Anshik enclosure, life milestones, and authentic Shastric remedies.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.kaalSarpDosha,
    keywords: isTe
      ? [
          "కాల సర్ప దోష కాలిక్యులేటర్",
          "కాల సర్ప యోగం పరీక్ష",
          "12 రకాల కాల సర్ప దోషాలు",
          "అనంత కాల సర్ప యోగం",
          "పూర్ణ కాల సర్ప దోషం",
          "కాల సర్ప దోష నివారణ పూజ",
          "శ్రీకాళహస్తి కాలసర్ప దోష నివారణ",
          "మహామృత్యుంజయ మంత్ర జపం",
          "రాహు కేతు దోష పరిహారాలు",
        ]
      : isHi
      ? [
          "काल सर्प दोष कैलकुलेटर",
          "काल सर्प योग चेक करें",
          "12 प्रकार के काल सर्प दोष",
          "अनंत काल सर्प योग",
          "आंशिक काल सर्प दोष",
          "काल सर्प दोष निवारण उपाय",
          "त्र्यंबकेश्वर काल सर्प पूजा",
          "राहु केतु दोष शांति",
          "महामृत्युंजय मंत्र जप",
          "काल सर्प योग के लक्षण और उपाय",
        ]
      : [
          "kaal sarp dosha calculator",
          "kaal sarp yoga check by date of birth",
          "12 types of kaal sarp dosha",
          "anant kaal sarp yoga",
          "udit vs anudit kaal sarp",
          "anshik kaal sarp yoga",
          "kaal sarp dosha remedies",
          "trimbakeshwar kaal sarp puja",
          "rahu ketu axis in kundli",
          "mahamrityunjaya mantra for kaal sarp",
        ],
  });
}

const KAAL_SARP_FAQS_EN = [
  {
    question: "What is Kaal Sarp Yoga (Kaal Sarp Dosha) in Vedic Astrology?",
    answer:
      "Kaal Sarp Yoga is formed in a birth chart when all seven classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn) are situated on one side of the nodal axis between Rahu (the serpent's head) and Ketu (the serpent's tail). In Sanskrit, 'Kaal' signifies Time and 'Sarpa' signifies the Serpent.",
  },
  {
    question: "What are the 12 classical types of Kaal Sarp Yoga?",
    answer:
      "The 12 types are determined by the house position of Rahu (1 through 12): (1) Anant (1st H), (2) Kulik (2nd H), (3) Vasuki (3rd H), (4) Shankhpal (4th H), (5) Padma (5th H), (6) Mahapadma (6th H), (7) Takshak (7th H), (8) Karkotak (8th H), (9) Shankhachur (9th H), (10) Ghatak (10th H), (11) Vishdhar (11th H), and (12) Sheshnag (12th H). Each yoga highlights specific karmic tests and eventual breakthroughs.",
  },
  {
    question: "What is the difference between Purna Kaal Sarp and Anshik Kaal Sarp?",
    answer:
      "Purna (Full) Kaal Sarp Yoga occurs when all seven classical grahas are strictly enclosed within the Rahu-Ketu axis with zero planets outside. Anshik (Partial / Ardha) Kaal Sarp occurs when six planets are hemmed inside the axis, but exactly one planet has escaped outside. Anshik Kaal Sarp has a mild, intermittent influence that is easily managed.",
  },
  {
    question: "What do Udit Gola and Anudit Gola mean in Kaal Sarp Yoga?",
    answer:
      "Because Rahu and Ketu naturally move retrograde (backward): When the planets are progressing in zodiacal order toward Rahu's mouth, it is termed Udit Gola (Ascending) Kaal Sarp, causing intense early-life effort and tremendous later-life authority. When planets move away toward Ketu's tail, it is termed Anudit Gola (Descending) Kaal Sarp, encouraging spiritual introversion and intellectual depth.",
  },
  {
    question: "Can an individual with Kaal Sarp Yoga achieve great success?",
    answer:
      "Absolutely! Many of the world's most influential leaders, scientists, and visionaries possessed Kaal Sarp Yoga (including Jawaharlal Nehru, Sachin Tendulkar, and Abraham Lincoln). Kaal Sarp Yoga creates intense concentration and an unstoppable drive. While the years before age 33–42 involve testing trials, the subsequent years often bring phenomenal acclaim and historic achievements.",
  },
  {
    question: "What are the most authentic Shastric remedies for Kaal Sarp Dosha?",
    answer:
      "Authentic classical remedies include: (1) Daily chanting of the Maha Mrityunjaya Mantra (108 times) with a Rudraksha mala, (2) Performing Rudrabhisheka at a Jyotirlinga (such as Trimbakeshwar or Srikalahasti), (3) Offering milk to a Shiva Lingam and immersing a silver pair of Nag-Nagin on Nag Panchami, (4) Chanting Rahu and Ketu Beej Mantras, and (5) Keeping a sacred peacock feather in the bedroom.",
  },
];

const KAAL_SARP_FAQS_HI = [
  {
    question: "वैदिक ज्योतिष में काल सर्प योग (काल सर्प दोष) क्या होता है?",
    answer:
      "जन्म पत्रिका में जब सभी सातों शास्त्रीय ग्रह (सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र और शनि) राहु (सर्प का मुख) और केतु (सर्प की पूंछ) के अक्ष के एक ही तरफ स्थित हो जाते हैं, तब काल सर्प योग बनता है। संस्कृत में 'काल' का अर्थ समय और 'सर्प' का अर्थ राहु-केतु रूपी आकाशीय सर्प है।",
  },
  {
    question: "काल सर्प योग के १२ प्रमुख प्रकार कौन से हैं?",
    answer:
      "लग्न से राहु की भाव स्थिति (१ से १२) के अनुसार १२ योग बनते हैं: (१) अनंत (प्रथम भाव), (२) कुलिक (द्वितीय भाव), (३) वासुकी (तृतीय भाव), (४) शंखपाल (चतुर्थ भाव), (५) पद्म (पंचम भाव), (६) महापद्म (षष्ठ भाव), (७) तक्षक (सप्तम भाव), (८) कर्कोटक (अष्टम भाव), (९) शंखचूड़ (नवम भाव), (१०) घातक (दशम भाव), (११) विषधर (एकादश भाव), और (१२) शेषनाग (द्वादश भाव)। प्रत्येक योग विशिष्ट कर्मों व सफलताओं का संकेत देता है।",
  },
  {
    question: "पूर्ण काल सर्प और आंशिक काल सर्प योग में क्या अंतर है?",
    answer:
      "जब सातों शास्त्रीय ग्रह पूर्ण रूप से राहु-केतु अक्ष के भीतर बंद हों, तो वह 'पूर्ण काल सर्प योग' कहलाता है। जब ६ ग्रह अक्ष के भीतर हों और ठीक १ ग्रह अक्ष से बाहर निकल जाए, तो इसे 'आंशिक (अर्ध) काल सर्प दोष' कहा जाता है। आंशिक काल सर्प का प्रभाव मंद होता है और सामान्य उपायों से शांत हो जाता है।",
  },
  {
    question: "उदित गोल और अनुदित गोल काल सर्प का क्या रहस्य है?",
    answer:
      "राहु-केतु सदैव वक्री गति से चलते हैं। जब ग्रह राशि क्रम में राहु के मुख की ओर बढ़ते हैं, तो इसे 'उदित गोल काल सर्प' कहते हैं, जो जीवन के पूर्वार्ध में संघर्ष और उत्तरार्ध में प्रचंड राजयोग देता है। जब ग्रह केतु की पूंछ की ओर बढ़ते हैं, तो इसे 'अनुदित गोल काल सर्प' कहते हैं, जो जातक को आध्यात्मिक व दार्शनिक ऊंचाई देता है।",
  },
  {
    question: "क्या काल सर्प योग वाले व्यक्ति जीवन में शीर्ष सफलता प्राप्त कर सकते हैं?",
    answer:
      "अवश्य! इतिहास के अनेक महानतम विभूतियों, राजनेताओं और विचारकों की कुंडली में काल सर्प योग रहा है (जैसे जवाहरलाल नेहरू, सचिन तेंदुलकर, अब्राहम लिंकन)। यह योग व्यक्ति को अटूट एकाग्रता और असाधारण जुझारूपन देता है। परिपक्वता आयु (२८, ३३, ३६ या ४२ वर्ष) के पश्चात यह योग अभूतपूर्व यश और संपदा का कारण बनता है।",
  },
  {
    question: "काल सर्प दोष निवारण हेतु सर्वाधिक प्रामाणिक शास्त्रीय उपाय कौन से हैं?",
    answer:
      "प्रामाणिक सात्विक उपायों में: (१) रुद्राक्ष माला से प्रतिदिन १०८ बार महामृत्युंजय मंत्र का जप, (२) त्र्यंबकेश्वर या श्रीकालहस्ती में रुद्राभिषेक एवं कालसर्प शांति पूजा, (३) नागपंचमी पर शिवलिंग पर दुग्धाभिषेक व चांदी के नाग-नागिन जोड़े का दान, (४) राहु व केतु के बीज मंत्रों का नियमित जप, (५) शयनकक्ष में पवित्र मोरपंख रखना।",
  },
];

const KAAL_SARP_FAQS_TE = [
  {
    question: "వైదిక జ్యోతిష్యంలో కాల సర్ప యోగం (కాల సర్ప దోషం) అంటే ఏమిటి?",
    answer:
      "జన్మ కుండలిలో రాహువు (సర్ప ముఖం) మరియు కేతువు (సర్ప తోక) అనే ఛాయాగ్రహాల అక్షానికి ఒకే వైపున సూర్యుడు, చంద్రుడు, కుజుడు, బుధుడు, గురు, శుక్ర, శని అనే ఏడు ప్రామాణిక గ్రహాలు బంధించబడినప్పుడు కాల సర్ప యోగం ఏర్పడుతుంది. సంస్కృతంలో 'కాల' అనగా కాలచక్రం/సమయం మరియు 'సర్ప' అనగా సర్ప రూప రాహు-కేతువులు.",
  },
  {
    question: "12 రకాల కాల సర్ప యోగాలు ఏవి?",
    answer:
      "లగ్నం నుండి రాహువు ఉండే భావాన్ని (1 నుండి 12) బట్టి 12 రకాల కాల సర్ప యోగాలు ఏర్పడతాయి: (1) అనంత (1వ భావం), (2) కుళిక (2వ భావం), (3) వాసుకి (3వ భావం), (4) శంఖపాల (4వ భావం), (5) పద్మ (5వ భావం), (6) మహా పద్మ (6వ భావం), (7) తక్షక (7వ భావం), (8) కర్కోటక (8వ భావం), (9) శంఖచూడ (9వ భావం), (10) ఘాతక (10వ భావం), (11) విషధర (11వ భావం), (12) శేషనాగ (12వ భావం).",
  },
  {
    question: "పూర్ణ కాల సర్ప యోగానికి మరియు ఆంశిక కాల సర్ప యోగానికి తేడా ఏమిటి?",
    answer:
      "ఏడు గ్రహాలూ రాహు-కేతువుల అక్షం లోపలే పరిపూర్ణంగా బంధించబడి, ఒక్క గ్రహం కూడా బయటకు రాకపోతే దానిని 'పూర్ణ కాల సర్ప యోగం' అంటారు. ఏడు గ్రహాలలో ఆరు గ్రహాలు అక్షం లోపల ఉండి, ఏదైనా ఒక గ్రహం బయట ఉంటే దానిని 'ఆంశిక (అర్ధ) కాల సర్ప దోషం' అంటారు. ఆంశిక కాల సర్ప ప్రభావం చాలా తక్కువగా ఉంటుంది మరియు సులభంగా ఉపశమిస్తుంది.",
  },
  {
    question: "ఉదిత గోళం మరియు అనుదిత గోళం అంటే ఏమిటి?",
    answer:
      "రాహు-కేతువులు ఎల్లప్పుడూ అపసవ్య (రెట్రోగ్రేడ్) దిశలో కదులుతాయి. గ్రహాలు రాహువు ముఖం వైపు ప్రయాణిస్తుంటే దానిని 'ఉదిత గోళ కాల సర్ప యోగం' అంటారు; ఇది ప్రారంభ జీవితంలో తీవ్ర పోరాటాన్ని, తర్వాతి జీవితంలో అపార కీర్తి ప్రతిష్టలను ఇస్తుంది. గ్రహాలు కేతువు తోక వైపు కదులుతుంటే దానిని 'అనుదిత గోళ కాల సర్ప యోగం' అంటారు, ఇది ఆధ్యాత్మిక సాధన మరియు మేధోశక్తిని పెంపొందిస్తుంది.",
  },
  {
    question: "కాల సర్ప దోషం ఉన్నవారు జీవితంలో గొప్ప విజయాలు సాధించగలరా?",
    answer:
      "ఖచ్చితంగా సాధించగలరు! ప్రపంచ ప్రసిద్ధ నాయకులు, క్రీడాకారులు, పండితులు మరియు శాస్త్రవేత్తల జాతకాల్లో కాల సర్ప యోగం ఉంది (ఉదాహరణకు జవహర్‌లాల్ నెహ్రూ, సచిన్ టెండూల్కర్, అబ్రహం లింకన్). కాల సర్ప యోగం అసాధారణమైన సంకల్ప బలాన్ని ఇస్తుంది. 28, 33, 36 లేదా 42 సంవత్సరాల వయస్సు దాటిన తర్వాత ఈ యోగం అద్భుతమైన విజయం, కీర్తి మరియు శాశ్వత సంపదను ప్రసాదిస్తుంది.",
  },
  {
    question: "కాల సర్ప దోష నివారణకు అత్యంత ప్రామాణికమైన వైదిక పరిహారాలు ఏవి?",
    answer:
      "శాస్త్రోక్త నివారణలలో: (1) ప్రతిరోజూ రుద్రాక్ష మాలతో 108 సార్లు మహామృత్యుంజయ మంత్ర జపం, (2) శ్రీకాళహస్తి లేదా త్రయంబకేశ్వర్ జ్యోతిర్లింగ క్షేత్రంలో రుద్రాభిషేకం & రాహు-కేతు సర్ప పూజ, (3) నాగపంచమి నాడు వెండి నాగ-నాగిని జంటను శివలింగానికి సమర్పించి జల ప్రవాహంలో నిమజ్జనం చేయడం, (4) రాహు & కేతు బీజ మంత్ర జపం, (5) పూజా మందిరం లేదా పడకగదిలో నెమలి పించాన్ని ఉంచడం.",
  },
];

export default async function KaalSarpDoshaPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    isTe ? "హోమ్" : isHi ? "होम" : t.homeName,
    [isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "కాల సర్ప దోష కాలిక్యులేటర్" : isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator", PATHS.kaalSarpDosha]
  );

  const faqs = isTe ? KAAL_SARP_FAQS_TE : isHi ? KAAL_SARP_FAQS_HI : KAAL_SARP_FAQS_EN;

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isTe
      ? "వైదిక కాల సర్ప దోష కాలిక్యులేటర్"
      : isHi
      ? "वैदिक काल सर्प दोष कैलकुलेटर"
      : "Vedic Kaal Sarp Dosha Calculator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description: isTe
      ? "ఉచిత ఆన్‌లైన్ వైదిక కాల సర్ప దోష కాలిక్యులేటర్ — 12 రకాల కాల సర్ప యోగాలు, ఉదిత/అనుదిత గోళం, గ్రహ అక్ష విశ్లేషణ మరియు ప్రామాణిక నివారణలు."
      : isHi
      ? "मुफ्त ऑनलाइन वैदिक काल सर्प दोष कैलकुलेटर — १२ प्रकार के योग, उदित/अनुदित दिशा, ग्रह अक्षीय स्थिति एवं प्रामाणिक सात्विक उपाय।"
      : "Free online Vedic Kaal Sarp Dosha (Yoga) calculator identifying all 12 classical yogas, Udit vs Anudit Gola direction, planetary axis distribution, and authentic Shastric remedies.",
    url: `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : ""}${PATHS.kaalSarpDosha}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={appSchema} />

      <PageHero
        title={
          isTe
            ? "కాల సర్ప దోష కాలిక్యులేటర్"
            : isHi
            ? "काल सर्प दोष कैलकुलेटर"
            : "Kaal Sarp Dosha Calculator"
        }
        subtitle={
          isTe
            ? "100% ఖచ్చితమైన వైదిక గణనతో అనంత నుండి శేషనాగ వరకు 12 రకాల కాల సర్ప యోగాలు, ఉదిత/అనుదిత గోళం, గ్రహ అక్ష విశ్లేషణ మరియు ప్రామాణిక శాస్త్ర నివారణలు."
            : isHi
            ? "100% सटीक वैदिक गणना द्वारा 12 प्रकार के काल सर्प योग (अनंत से शेषनाग तक), उदित/अनुदित दिशा, ग्रह अक्षीय स्थिति एवं प्रामाणिक वैदिक उपाय।"
            : "100% accurate astronomical detection of all 12 Kaal Sarp Yogas (Anant to Sheshnag), Udit/Anudit direction, planetary nodal axis distribution, and authentic Vedic remedies."
        }
        crumbs={breadcrumbs}
      />

      <div className="mt-8">
        <KaalSarpTool />
      </div>

      <div className="mt-12">
        <RelatedKundliTools currentTool="kaal-sarp-dosha" isHi={isHi} isTe={isTe} />
      </div>

      {/* Educational Guide Section */}
      <section className="mt-14 rounded-3xl border border-sand bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <h2 className="font-serif text-2xl font-bold text-ink">
          {isTe
            ? "కాల సర్ప యోగం విశ్లేషణ: భయం కాదు, అద్భుత విజయానికి ప్రేరణ"
            : isHi
            ? "काल सर्प योग का रहस्य: भय नहीं, असाधारण सफलता का मार्ग"
            : "Demystifying Kaal Sarp Yoga: A Catalyst for Greatness"}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          {isTe ? (
            <>
              <p>
                సనాతన వైదిక జ్యోతిష్యంలో రాహువు భౌతిక ప్రపంచ ఆకాంక్షలు, కర్మ చైతన్యం మరియు అపరిమిత శోధనకు ప్రతీక కాగా, కేతువు
                మోక్షం, వైరాగ్యం మరియు అంతర్దృష్టికి సూచిక. ఏడు ప్రధాన గ్రహాలూ ఈ రాహు-కేతువుల అక్షంలో బంధించబడినప్పుడు, జీవితం ఒక
                తీవ్రమైన ఆధ్యాత్మిక మరియు కర్మ పరిపక్వతను సంతరించుకుంటుంది.
              </p>
              <p>
                కాల సర్ప యోగం శాపం ఎంతమాత్రం కాదు. ప్రాచీన జ్యోతిష్య మహర్షుల పరిశీలనల ప్రకారం, ఈ యోగం ఉన్న వ్యక్తులు సాధారణంగా
                ఉండలేరు. వారు కఠినమైన సవాళ్లను ఎదుర్కొని సమాజంలో విశిష్ట స్థానాన్ని సంపాదించుకుంటారు. పరమశివుని నిరంతర ఆరాధన,
                శ్రీకాళహస్తి లేదా త్రయంబకేశ్వర్ వంటి పుణ్యక్షేత్ర దర్శనం మరియు సంకల్ప బలంతో పరిపక్వత వయస్సు (28, 33, 36 లేదా 42 సంవత్సరాలు)
                దాటిన తర్వాత ఈ యోగం అపార కీర్తి, అధికారం మరియు సంపదను ప్రసాదిస్తుంది.
              </p>
              <p>
                మీ జన్మ వివరాల ద్వారా మీ కుండలిలోని కాల సర్ప వర్గీకరణను తెలుసుకోండి, ఏ భావం తీవ్ర శోధనకు గురవుతుందో గ్రహించండి
                మరియు నిర్మాణాత్మక శాస్త్రోక్త నివారణలను ఆచరించండి.
              </p>
            </>
          ) : isHi ? (
            <>
              <p>
                वैदिक ज्योतिष में राहु सांसारिक महत्वाकांक्षा, भविष्य के कर्म और असीम ऊर्जा का प्रतीक है, जबकि केतु पूर्व जन्म की सिद्धियों,
                वैराग्य और मोक्ष का कारक है। जब सातों शास्त्रीय ग्रह इस अक्ष के एक ही तरफ सिमट जाते हैं, तो जीवन में एक तीव्र कर्मिक एकाग्रता
                उत्पन्न होती है।
              </p>
              <p>
                काल सर्प योग कोई अभिशाप नहीं, अपितु असाधारण व्यक्तित्व के निर्माण की भट्टी है। शास्त्रीय ग्रंथों के अनुसार काल सर्प योग से युक्त
                व्यक्ति कभी साधारण नहीं होते; वे अप्रत्याशित बाधाओं से लड़कर शीर्ष पर पहुंचते हैं। भगवान शिव की निष्काम भक्ति, त्र्यंबकेश्वर या
                श्रीकालहस्ती में शांति अनुष्ठान और संयम के साथ जैसे ही परिपक्वता आयु (२८, ३३, ३६ या ४२ वर्ष) आती है, यह योग प्रचंड राजयोग में
                परिवर्तित हो जाता है।
              </p>
              <p>
                इस वैदिक कैलकुलेटर से अपने काल सर्प योग के प्रकार की सटीक पहचान करें, जीवन के प्रभावित क्षेत्रों को समझें और प्रामाणिक
                सात्विक उपायों का लाभ उठाएं।
              </p>
            </>
          ) : (
            <>
              <p>
                In Vedic astrology, Rahu represents the head of the cosmic serpent (worldly obsession, future karma,
                and insatiable drive), while Ketu represents the tail (past life mastery, detachment, and spiritual
                moksha). When all seven visible planets are enclosed on one side of this axis, life takes on a focused,
                karmic intensity.
              </p>
              <p>
                Far from being an insurmountable curse, classical masters note that individuals with Kaal Sarp Yoga
                are rarely ordinary. They are pushed by unseen forces to overcome extraordinary odds. The key
                to mastering Kaal Sarp Yoga lies in spiritual grounding, worshipping Lord Shiva (the lord of Time and
                Vasuki), and persevering through early hurdles until the relief milestones (ages 28, 33, 36, or 42) arrive.
              </p>
              <p>
                Use this tool to discover your exact Kaal Sarp classification, understand which life area is being
                refined, and implement constructive Shastric remedies.
              </p>
            </>
          )}
        </div>
      </section>

      <FaqList
        faqs={faqs}
        title={
          isTe
            ? "కాల సర్ప దోషంపై తరచుగా అడిగే ప్రశ్నలు (FAQs)"
            : isHi
            ? "काल सर्प योग से जुड़े अक्सर पूछे जाने वाले प्रश्न"
            : "Frequently Asked Questions about Kaal Sarp Yoga"
        }
      />
    </div>
  );
}

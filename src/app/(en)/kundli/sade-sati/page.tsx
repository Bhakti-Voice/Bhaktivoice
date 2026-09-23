import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { SadeSatiTool } from "@/components/spiritual-tools/SadeSatiTool";
import { RelatedKundliTools } from "@/components/spiritual-tools/RelatedKundliTools";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isTe
    ? "శని సాడే సతి & ధైయా కాలిక్యులేటర్ — 12 రాశుల దశలు, తేదీలు & వైదిక పరిహారాలు"
    : isHi
    ? "शनि साढ़े साती एवं ढैय्या कैलकुलेटर — 12 राशियों का चरणवार समय, तिथियां व प्रामाणिक उपाय"
    : "Shani Sade Sati & Dhaiya Calculator — Exact Phase Dates, 12 Rashis Timeline & Vedic Remedies";

  const description = isTe
    ? "మీ చంద్ర రాశి ప్రకారం శని సాడే సతి మరియు ధైయా దశలను తెలుసుకోండి. ప్రథమ, ద్వితీయ, తృతీయ దశల ఖచ్చితమైన ప్రారంభం మరియు ముగింపు తేదీలు, కంటక శని, అష్టమ శని మరియు శాస్త్రోక్త నివారణలు."
    : isHi
    ? "अपनी चंद्र राशि से जानें कि आप पर शनि की साढ़े साती अथवा ढैय्या चल रही है या नहीं। प्रथम, द्वितीय व तृतीय चरण की सटीक आरंभ व समाप्ति तिथियां, कंटक व अष्टम ढैय्या, स्वभाव प्रभाव एवं सात्विक वैदिक उपाय।"
    : "Calculate your Shani Sade Sati and Dhaiya periods with 100% astronomical accuracy. Detailed report on Rising, Peak, and Setting phases, Kantaka & Ashtama Dhaiya dates (1960–2065), Moon sign impact, and classical remedies.";

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.kundli}/sade-sati`,
    keywords: isTe
      ? [
          "శని సాడే సతి కాలిక్యులేటర్",
          "సాడే సతి ఎప్పుడు ముగుస్తుంది",
          "శని ధైయా సమయం",
          "మీన రాశి సాడే సతి",
          "మేష రాశి సాడే సతి 2026",
          "శని దోష పరిహారాలు",
          "కంటక శని నివారణలు",
          "అష్టమ శని ప్రభావం",
          "శని గోచారం 2026",
          "వైదిక శని శాంతి పూజ",
        ]
      : isHi
      ? [
          "शनि साढ़े साती कैलकुलेटर",
          "साढ़े साती कब खत्म होगी",
          "शनि ढैय्या कब तक है",
          "मीन राशि साढ़े साती",
          "मेष राशि साढ़े साती 2026",
          "शनि के उपाय",
          "कंटक शनि ढैय्या",
          "अष्टम शनि",
          "shani sade sati calculator",
          "sade sati dates today",
        ]
      : [
          "shani sade sati calculator",
          "sade sati dates 2026",
          "saturn transit sade sati",
          "pisces sade sati end date",
          "aries sade sati start date",
          "shani dhaiya calculator",
          "kantaka shani remedies",
          "ashtama shani dates",
          "sade sati phases rising peak setting",
          "vedic remedies for saturn",
        ],
  });
}

export default async function SadeSatiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    isTe ? "హోమ్" : isHi ? "होम" : t.homeName,
    [isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "ఏలినాటి శని కాలిక్యులేటర్" : isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator", `${PATHS.kundli}/sade-sati`]
  );

  const faqs = isTe
    ? [
        {
          question: "శని సాడే సతి (ఏలినాటి శని) అంటే ఏమిటి?",
          answer:
            "గోచారంలో శని భగవానుడు ఒకరి జన్మ జాతకంలోని చంద్ర రాశికి 12వ ఇల్లు (వ్యయం), జన్మ రాశి (1వ ఇల్లు) మరియు 2వ ఇల్లు (ధనం) గుండా సంచరించే మొత్తం 7.5 సంవత్సరాల కాలాన్ని 'ఏలినాటి శని' (సాడే సతి) అంటారు. శని ఒక్కో రాశిలో సుమారు 2.5 సంవత్సరాలు ఉంటాడు.",
        },
        {
          question: "ఏలినాటి శనిలోని మూడు దశలు (చరణాలు) ఏమిటి?",
          answer:
            "1. ప్రథమ దశ (ఆద్య చరణం / ఉదయం): శని చంద్రునికి 12వ ఇంట సంచరిస్తాడు (అనవసర ఖర్చులు, సుదూర ప్రయాణాలు, ఆధ్యాత్మిక ఆలోచనలు).\n2. ద్వితీయ దశ (మధ్య / శిఖర చరణం): శని జన్మ రాశిపైనే సంచరిస్తాడు (తీవ్రమైన కర్మ శుద్ధి, బాధ్యతలు, సహనం).\n3. తృతీయ దశ (అంత్య చరణం / అస్తమయం): శని 2వ ఇంట సంచరిస్తాడు (ఆర్థిక నిలకడ, ఉపశమనం మరియు స్థిరత్వం).",
        },
        {
          question: "శని ధైయా (చిన్న పనోతి) అంటే ఏమిటి?",
          answer:
            "శని జన్మ రాశి నుండి 4వ ఇంట (కంటక శని) లేదా 8వ ఇంట (అష్టమ శని) సంచరించినప్పుడు వచ్చే 2.5 సంవత్సరాల కాలాన్ని 'శని ధైయా' అంటారు.",
        },
        {
          question: "ఏలినాటి శని ఎల్లప్పుడూ చెడు ఫలితాలనే ఇస్తుందా?",
          answer:
            "ఖచ్చితంగా కాదు! శని భగవానుడు న్యాయాధికారి, కర్మఫలదాత. వృషభం, తుల (శుక్రుని రాశులు) మరియు మకరం, కుంభం (శని స్వక్షేత్రాలు) రాశులకు ఏలినాటి శని విశేషమైన పురోగతి, సమాజంలో ఉన్నత పదవులు మరియు స్థిర ఆస్తులను ప్రసాదిస్తుంది. సత్కర్మలు చేసేవారికి శని ఎల్లప్పుడూ శుభ ఫలితాలనే ఇస్తాడు.",
        },
        {
          question: "ఏలినాటి శని కాలంలో ఏ పరిహారాలు అత్యంత ప్రభావవంతమైనవి?",
          answer:
            "నిత్యం శ్రీ హనుమాన్ చాలీసా పారాయణం చేయడం, శనివారం సాయంత్రం రావి చెట్టు వద్ద నూనె దీపం వెలిగించడం, 'ఓం శం శనైశ్చరాయ నమః' జపం చేయడం మరియు పేదలకు, శ్రామికులకు సహాయం చేయడం అత్యుత్తమ సాత్విక నివారణలు.",
        },
      ]
    : isHi
    ? [
        {
          question: "शनि की साढ़े साती क्या होती है?",
          answer:
            "जब गोचर में शनिदेव किसी व्यक्ति की जन्म कुंडली की चंद्र राशि से १२वें भाव, चंद्र राशि (प्रथम भाव), और द्वितीय भाव में गोचर करते हैं, तो उस कुल ७.५ वर्ष (प्रत्येक भाव में लगभग २.५ वर्ष) की समयावधि को 'शनि की साढ़े साती' कहा जाता है।",
        },
        {
          question: "साढ़े साती के तीन चरण कौन-से हैं?",
          answer:
            "१. प्रथम चरण (उदय / आद्य चरण): शनि चंद्र से १२वें भाव में गोचर करते हैं। इसमें अनावश्यक व्यय व अनिद्रा होती है।\n२. द्वितीय चरण (शिखर / मध्य चरण): शनि जन्म राशि में गोचर करते हैं। यह सर्वाधिक चुनौतीपूर्ण व गहन आत्म-समीक्षा का काल है।\n३. तृतीय चरण (अस्त / अंत्य चरण): शनि चंद्र से द्वितीय भाव में आते हैं। इसमें धीरे-धीरे कष्टों से मुक्ति व स्थायित्व मिलता है।",
        },
        {
          question: "शनि की ढैय्या (Panoti) क्या होती है?",
          answer:
            "जब शनिदेव जन्म राशि से चतुर्थ भाव (कंटक शनि) अथवा अष्टम भाव (अष्टम शनि) में भ्रमण करते हैं, तो उसे २.५ वर्ष की 'ढैय्या' कहा जाता है।",
        },
        {
          question: "क्या साढ़े साती हमेशा अनिष्टकारी ही होती है?",
          answer:
            "नहीं! वृषभ और तुला राशि (शुक्र के स्वामित्व वाली) तथा मकर व कुंभ राशि (शनि की अपनी राशियां) के जातकों के लिए साढ़े साती प्रायः अत्यधिक उन्नति, पद, प्रतिष्ठा और स्थायी संपत्ति प्रदायक सिद्ध होती है। शनि केवल अनुचित कार्यों का दंड देते हैं, सत्कर्मों का उत्तम फल देते हैं।",
        },
        {
          question: "साढ़े साती के दौरान कौन से उपाय सबसे अधिक प्रभावी हैं?",
          answer:
            "नित्य श्री हनुमान चालीसा का पाठ, शनिवार को पीपल के नीचे सरसों के तेल का दीपक, ॐ शं शनैश्चराय नमः का १०८ बार जप, और निर्धन श्रमिकों व वृद्धों की सेवा सबसे श्रेष्ठ एवं सात्विक उपाय हैं।",
        },
      ]
    : [
        {
          question: "What is Shani Sade Sati in Vedic Astrology?",
          answer:
            "Shani Sade Sati is the 7.5-year transit of Saturn through the 12th house, 1st house (natal Moon sign), and 2nd house from one's natal Moon (Janma Rashi). Since Saturn takes ~2.5 years to transit each zodiac sign, three consecutive signs equate to 7.5 years.",
        },
        {
          question: "What are the three distinct phases of Sade Sati?",
          answer:
            "1. Rising Phase (1st Charan): Saturn transits the 12th house from Moon (financial adjustments, travel, spiritual introspection).\n2. Peak Phase (2nd Charan): Saturn transits over the natal Moon sign itself (karmic purification, heavy duties, resilience).\n3. Setting Phase (3rd Charan): Saturn transits the 2nd house from Moon (settling down, wealth consolidation, relief).",
        },
        {
          question: "What is Shani Dhaiya (Small Panoti)?",
          answer:
            "Dhaiya is a 2.5-year period when Saturn transits either the 4th house (Kantaka Shani) or the 8th house (Ashtama Shani) from the natal Moon sign.",
        },
        {
          question: "Is Sade Sati always harmful or negative?",
          answer:
            "Absolutely not! Saturn is the cosmic justice officer (Karmaphala Daata). For signs ruled by friendly planets (Taurus, Libra, Capricorn, Aquarius), Sade Sati frequently bestows career breakthroughs, public elevation, and disciplined mastery.",
        },
        {
          question: "What are the most authentic classical remedies?",
          answer:
            "Reciting Shri Hanuman Chalisa daily, lighting a mustard oil diya under a Peepal tree on Saturday evenings, chanting the Shani Beej Mantra (Om Sham Shanaishcharaye Namah), and assisting laborers and underprivileged persons.",
        },
      ];

  const pageTitle = isTe
    ? "శని సాడే సతి & ధైయా కాలిక్యులేటర్"
    : isHi
    ? "शनि साढ़े साती एवं ढैय्या कैलकुलेटर"
    : "Shani Sade Sati & Dhaiya Calculator";

  const subtitle = isTe
    ? "మీ జన్మ చంద్ర రాశి ప్రకారం ఏలినాటి శని దశలు, పూర్తి జీవితకాల కాలక్రమం & ప్రామాణిక వైదిక నివారణలు"
    : isHi
    ? "अपनी जन्म चंद्र राशि से जानें साढ़े साती के चरण, संपूर्ण जीवन चक्र तिथियां एवं प्रामाणिक वैदिक उपाय"
    : "Astronomically precise Rising, Peak, and Setting phases, complete 1960–2065 timeline & Vedic remedies";

  const faqListTitle = isTe
    ? "ఏలినాటి శని ముఖ్య ప్రశ్నలు & సమాధానాలు"
    : isHi
    ? "साढ़े साती से जुड़े मुख्य प्रश्न व उत्तर"
    : "Frequently Asked Questions";

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        title={pageTitle}
        subtitle={subtitle}
        crumbs={breadcrumbs}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <SadeSatiTool />

        <div className="mt-12">
          <RelatedKundliTools currentTool="sade-sati" isHi={isHi} isTe={isTe} />
        </div>

        <div className="mt-12">
          <FaqList faqs={faqs} title={faqListTitle} />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: pageTitle,
          url: `${SITE.url}${PATHS.kundli}/sade-sati`,
          description: subtitle,
          applicationCategory: "AstrologyApplication",
          operatingSystem: "All",
        }}
      />
    </div>
  );
}

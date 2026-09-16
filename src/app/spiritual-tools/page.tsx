import type { Metadata } from "next";
import { ToolCardGrid } from "@/components/spiritual-tools/ToolCard";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import {
  SPIRITUAL_TOOL_FAQS,
  SPIRITUAL_TOOL_FAQS_HI,
  SPIRITUAL_TOOL_FAQS_TE,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isTe
      ? "వైదిక & ఆధ్యాత్మిక సాధనాలు — నేటి పంచాంగం, హిందూ క్యాలెండర్, జన్మ కుండలి & పొంతన"
      : isHi
      ? "वैदिक एवं आध्यात्मिक उपकरण — आज का पंचांग, हिन्दू कैलेंडर, कुंडली एवं मिलान"
      : t.hubs.spiritualTools.title,
    description: isTe
      ? "భక్తి వాయిస్ 100% ఉచిత మరియు సురక్షిత వైదిక సాధనాలు. నేటి పంచాంగం, హిందూ క్యాలెండర్ 2026, ఉచిత జన్మ కుండలి మరియు 36 గుణ కుండలి మిలనం నేరుగా మీ బ్రౌజర్ లో చూడండి."
      : isHi
      ? "भक्ति वॉइस के 100% निःशुल्क एवं सुरक्षित वैदिक उपकरण। आज का पंचांग, हिन्दू कैलेंडर 2026, मुफ्त जन्म कुंडली एवं 36 गुण कुंडली मिलान सीधे अपने ब्राउज़र में देखें।"
      : t.hubs.spiritualTools.description,
    path: PATHS.spiritualTools,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.landing],
  });
}

export default async function SpiritualToolsPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isTe = locale === "te";
  const isHi = locale === "hi";
  const faqs = isTe
    ? [...SPIRITUAL_TOOL_FAQS_TE.landing]
    : isHi
    ? [...SPIRITUAL_TOOL_FAQS_HI.landing]
    : [...SPIRITUAL_TOOL_FAQS.landing];

  const tools = [
    {
      href: PATHS.suvicharMaker,
      title: isTe ? "సువిచార కార్డ్ & స్టేటస్ మేకర్" : isHi ? "सुविचार एवं व्हाट्सएप स्टेटस मेकर" : "Daily Suvichar & Status Studio",
      description: isTe
        ? "జైన వాణి, భగవద్గీత శ్లోకాలు, శివ, హనుమాన్, శ్రీరామ సూక్తులతో మీ పేరు, ఫోటో జతచేసి HD స్టేటస్ కార్డ్ తయారుచేసుకోండి."
        : isHi
        ? "जैन वाणी, गीता श्लोक, शिव, हनुमान, राम एवं पर्व सुविचार के साथ अपना नाम व फोटो जोड़कर HD स्टेटस कार्ड बनाएं।"
        : "Create personalized HD WhatsApp Status & Story cards with Jain wisdom, Gita shlokas, and daily Vedic Panchang.",
      icon: "suvichar" as const,
    },
    {
      href: PATHS.panchangToday,
      title: isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today's Panchang",
      description: isTe
        ? "నేటి తిథి, నక్షత్రం, సూర్యోదయం, రాహుకాలం, అభిజిత్ ముహూర్తం మరియు చోఘడియా పూర్తి వివరాలు."
        : isHi
        ? "आज की तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, राहु काल, अभिजित मुहूर्त और चौघड़िया का सम्पूर्ण दैनिक विवरण।"
        : "Live Vedic Panchang for today: accurate Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.",
      icon: "panchang" as const,
    },
    {
      href: PATHS.calendar,
      title: isTe ? "హిందూ క్యాలెండర్ 2026" : isHi ? "हिन्दू कैलेंडर 2026" : "Hindu Calendar 2026",
      description: isTe
        ? "మాస పట్టిక, ఏకాదశి, పౌర్ణమి, అమావాస్య, ప్రదోషం మరియు ప్రముఖ హిందూ పండుగల సమగ్ర క్యాలెండర్."
        : isHi
        ? "मासिक पंचांग ग्रिड, एकादशी, पूर्णिमा, अमावस्या, प्रदोष, संक्रांति और सभी प्रमुख हिन्दू त्यौहारों की तिथियाँ।"
        : "Interactive 7-column Hindu lunisolar calendar with monthly Tithis, Ekadashis, Vrats, and major festival dates.",
      icon: "calendar" as const,
    },
    {
      href: PATHS.kundli,
      title: isTe ? "ఉచిత జన్మ కుండలి" : isHi ? "मुफ्त जन्म कुंडली" : t.spiritualTools.tools.kundli.title,
      description: isTe
        ? "ఖచ్చితమైన జన్మ పత్రిక, లగ్నం, గ్రహ స్థానాలు మరియు భావ విశ్లేషణ. 100% ఉచితం & గోప్యమైనది."
        : isHi
        ? "सटीक जन्म पत्रिका, लग्न, ग्रह स्थिति और भाव विश्लेषण। 100% सुरक्षित और निजी।"
        : t.spiritualTools.tools.kundli.description,
      icon: "kundli" as const,
    },
    {
      href: PATHS.kundliMilan,
      title: isTe ? "కుండలి పొంతన (36 గుణాలు)" : isHi ? "कुंडली मिलान" : t.spiritualTools.tools.milan.title,
      description: isTe
        ? "వివాహ అనుకూలత కొరకు సాంప్రదాయ 36 గుణాల అష్టకూట మిలన విశ్లేషణ."
        : isHi
        ? "विवाह अनुकूलता हेतु पारंपरिक 36 गुण अष्टकूट मिलान विश्लेषण।"
        : t.spiritualTools.tools.milan.description,
      icon: "milan" as const,
    },
    {
      href: PATHS.sadeSati,
      title: isHi ? "शनि साढ़े साती कैलकुलेटर" : "Shani Sade Sati Calculator",
      description: isHi
        ? "अपनी जन्म चंद्र राशि से साढ़े साती के तीनों चरण, कंटक व अष्टम ढैय्या एवं प्रामाणिक वैदिक उपाय।"
        : "Calculate Rising, Peak, and Setting phases of Sade Sati, Kantaka & Ashtama Dhaiya with remedies.",
      icon: "sadeSati" as const,
    },
    {
      href: PATHS.manglikDosha,
      title: isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator",
      description: isHi
        ? "लग्न, चंद्र व शुक्र से सूक्ष्म त्रिपदा विचार, १६ शास्त्रीय परिहार (दोष भंग नियम) व प्रामाणिक सात्विक उपाय।"
        : "Evaluate Kuja Dosha across Lagna, Moon, and Venus with 16 classical cancellations and authentic remedies.",
      icon: "manglik" as const,
    },
    {
      href: PATHS.kaalSarpDosha,
      title: isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator",
      description: isHi
        ? "सभी १२ काल सर्प योग (अनंत से शेषनाग), उदित/अनुदित दिशा, ग्रह अक्षीय स्थिति और सात्विक शांति उपाय।"
        : "Detect all 12 classical Kaal Sarp Yogas, Udit vs. Anudit Gola direction, and Shiva shanti remedies.",
      icon: "kaalSarp" as const,
    },
    {
      href: PATHS.gochar,
      title: isHi ? "दैनिक ग्रह गोचर फल" : "Daily Planetary Transits (Gochar)",
      description: isHi
        ? "९ वैदिक ग्रहों का चंद्र राशि से भाव गोचर, शुभ-अशुभ स्कोर एवं २०२४-२०३० मुख्य गोचर कैलेंडर।"
        : "Real-time 9-Graha transit analysis from natal Moon sign with favorability score and 2024–2030 ingress calendar.",
      icon: "gochar" as const,
    },
    {
      href: PATHS.grahaSthiti,
      title: isHi ? "दैनिक ग्रह स्थिति (Ephemeris)" : "Planetary Ephemeris (Graha Sthiti)",
      description: isHi
        ? "लाहिरी अयनांश आधारित ९ वैदिक ग्रह, राशि, अंश, कला, विकला, नक्षत्र पाद, वक्री व अस्त स्थिति।"
        : "High-precision Sidereal Lahiri degrees, Nakshatra Pada, retrograde (Vakri), and combust status.",
      icon: "ephemeris" as const,
    },
    {
      href: PATHS.tarabalam,
      title: isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam & Chandrabalam",
      description: isHi
        ? "जन्म नक्षत्र और राशि से जानें आज का दिन आपके लिए कैसा रहेगा? ९ तारा चक्र एवं अष्टम चंद्र विचार।"
        : "Evaluate your personal daily strength through the 9 Tara Chakra and Ashtama Chandra checks.",
      icon: "tarabalam" as const,
    },
    {
      href: PATHS.ekadashi,
      title: isHi ? "एकादशी व्रत व पारणा समय" : "Ekadashi Vrat & Parana Timings",
      description: isHi
        ? "वर्ष की सभी २४ एकादशियों की सूची, स्मार्त व वैष्णव तारीखें, प्रातःकालीन पारणा समय व हरिवासर समाप्ति।"
        : "Complete schedule of all 24 Ekadashis, Smarta vs. Vaishnava dates, and exact morning Parana windows.",
      icon: "ekadashi" as const,
    },
    {
      href: PATHS.choghadiya,
      title: isHi ? "चौघड़िया मुहूर्त" : "Choghadiya Muhurat",
      description: isHi
        ? "दिन एवं रात के ८-८ चौघड़िया मुहूर्त (शुभ, लाभ, अमृत, चर, काल, रोग, उद्वेग) और उनके स्वामी ग्रह।"
        : "8 Day and 8 Night Choghadiya intervals with auspiciousness ratings and planetary rulers.",
      icon: "choghadiya" as const,
    },
    {
      href: PATHS.hora,
      title: isHi ? "दैनिक होरा चक्र" : "Daily Hora Chakra",
      description: isHi
        ? "सूर्योदय से सूर्यास्त एवं रात्रि के २४ होरा काल, स्वामी ग्रह एवं अनुकूल कार्यों की जानकारी।"
        : "Hourly planetary rulers (Horas) for selecting the most auspicious hours for meetings and transactions.",
      icon: "hora" as const,
    },
    {
      href: PATHS.printableCalendar,
      title: isHi ? "प्रिंट योग्य हिन्दू वॉल कैलेंडर" : "Printable Wall Calendar",
      description: isHi
        ? "पारंपरिक हिन्दू दीवार कैलेंडर जिसे आप किसी भी शहर के लिए A4 शीट पर सीधे प्रिंट या PDF सेव कर सकते हैं।"
        : "Traditional single-sheet monthly Hindu wall calendar formatted for A4 printing and PDF export.",
      icon: "printableCalendar" as const,
    },
    {
      href: PATHS.babyNames,
      title: isHi ? "नक्षत्र अनुसार शिशु नाम" : "Baby Names by Nakshatra",
      description: isHi
        ? "जन्म नक्षत्र के चरण और पाद के प्रारंभिक नामाक्षरों के अनुसार हजारों आधुनिक व वैदिक शिशु नाम।"
        : "Thousands of Vedic and modern baby names categorized by Janma Nakshatra Pada syllables.",
      icon: "babyNames" as const,
    },
    {
      href: PATHS.grahan,
      title: isHi ? "सूर्य एवं चंद्र ग्रहण 2026" : "Solar & Lunar Eclipses 2026",
      description: isHi
        ? "सटीक खगोलीय ग्रहण तिथियां, सूतक काल, स्पर्श व मोक्ष समय, भारत में दृश्यता एवं गर्भवती महिलाओं के नियम।"
        : "Precise astronomical eclipse dates, Sutak Kaal countdown, India visibility, and spiritual guidelines.",
      icon: "grahan" as const,
    },
  ];


  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi
            ? "वैदिक एवं आध्यात्मिक उपकरण — भक्ति वॉइस"
            : "Vedic & Spiritual Tools Hub — BhaktiVoice",
          description: isHi
            ? "100% सुरक्षित एवं निजी वैदिक उपकरण — पंचांग, हिन्दू कैलेंडर, जन्म कुंडली और कुंडली मिलान।"
            : "100% secure, client-side Vedic tools — Daily Panchang, Hindu Calendar 2026, Free Kundli, and Kundli Milan.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      <PageHero
        title={isTe ? "ఆధ్యాత్మిక & వైదిక సాధనాలు" : isHi ? "आध्यात्मिक एवं वैदिक उपकरण" : t.hubs.spiritualTools.h1}
        subtitle={
          isTe
            ? "100% ఉచిత & సురక్షిత వైదిక పరికరాలు — దిన పంచాంగం, హిందూ క్యాలెండర్, జన్మ కుండలి మరియు కుండలి మిలనం. మీ సమాచారం ఎప్పుడూ సర్వర్‌కు పంపబడదు."
            : isHi
            ? "100% सुरक्षित और निजी वैदिक टूल्स — दैनिक पंचांग, हिन्दू कैलेंडर, जन्म कुंडली और कुंडली मिलान। आपकी कोई भी जानकारी कभी सर्वर पर नहीं भेजी जाती।"
            : t.spiritualTools.landingLead
        }
        hub="tithi"
        crumbs={localizedCrumbs(t.homeName, [
          isTe ? "ఆధ్యాత్మిక పరికరాలు" : isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools,
          PATHS.spiritualTools,
        ])}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:pb-12">
        <ToolCardGrid tools={tools} openLabel={isTe ? "సాధనాన్ని తెరవండి" : isHi ? "उपकरण खोलें" : t.spiritualTools.openTool} />
        <FaqList faqs={faqs} title={isTe ? "తరచుగా అడిగే ప్రశ్నలు (FAQs)" : isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle} className="mt-12" />
      </div>
    </div>
  );
}

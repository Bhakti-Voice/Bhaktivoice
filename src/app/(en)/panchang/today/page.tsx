import type { Metadata } from "next";
import { PanchangHeroBanner } from "@/components/panchang/PanchangHeroBanner";
import { PanchangTodayView } from "@/components/panchang/PanchangTodayView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { faqSchema } from "@/lib/seo/schema";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
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
      ? `నేటి పంచాంగం (${dateFormatted}) — నేటి తిథి, శుభ చోఘడియా ముహూర్తం, నక్షత్రం & రాహుకాలం`
      : isHi
      ? `आज का पंचांग (${dateFormatted}) — आज की तिथि, शुभ चौघड़िया मुहूर्त, नक्षत्र व राहु काल`
      : `Aaj Ka Panchang (${dateFormatted}) — Today's Panchang, Tithi, Shubh Muhurat & Choghadiya`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ వైదిక పంచాంగం. నేటి తిథి, నక్షత్రం, యోగం, కరణం, సూర్యోదయం-సూర్యాస్తమయం, రాహుకాలం, అభిజిత్ ముహూర్తం మరియు పగలు-రాత్రి శుభ చోఘడియా. 120+ నగరాల ఖచ్చితమైన వివరాలు.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण वैदिक पंचांग। आज की तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, राहु काल, अभिजित मुहूर्त और दिन-रात का शुभ चौघड़िया। 120+ नगरों अनुसार सटीक गणना।`
      : `Get accurate Aaj Ka Panchang for today (${dateFormatted}). Live Tithi, Nakshatra, Yoga, Karana, Sunrise & Sunset, Abhijit Muhurat, Rahu Kaal, and Day-Night Choghadiya across 120+ cities. Top Hindu Vedic Panchang.`,
    path: PATHS.panchangToday,
    keywords: isTe
      ? [
          "ఈరోజు పంచాంగం తెలుగు మంచి సమయం",
          "ఈరోజు తిథి పంచాంగం good time",
          "నేటి పంచాంగం",
          "నేటి తిథి",
          "నేటి శుభ ముహూర్తం",
          "నేటి చోఘడియా",
          "రాహుకాలం సమయం",
          "అభిజిత్ ముహూర్తం",
          "దిన పంచాంగం 2026",
          "సూర్యోదయం సమయం",
          "నేటి నక్షత్రం",
          "నేటి పక్షం",
          "తెలుగు పంచాంగం",
          "దృక్ పంచాంగం",
        ]
      : isHi
      ? [
          "आज का पंचांग 2026",
          "आज का पंचांग",
          "आज की तिथि क्या है",
          "आज की तिथि",
          "आज का शुभ मुहूर्त",
          "आज का चौघड़िया मुहूर्त",
          "आज का चौघड़िया",
          "राहु काल का समय आज",
          "अभिजित मुहूर्त आज का",
          "दैनिक पंचांग 2026",
          "सूर्योदय और सूर्यास्त का समय",
          "आज का पंचांग तिथि वार नक्षत्र",
          "हिन्दू पंचांग आज का",
          "दृक पंचांग आज का",
          "aaj ka panchang hindi",
          "आज का पंचांग दिल्ली",
          "आज का पंचांग मुंबई",
        ]
      : [
          "aaj ka panchang in hindi 2026 today",
          "aaj ka panchang",
          "today panchang",
          "panchang today",
          "aaj ki tithi kya hai",
          "aaj ki tithi",
          "today tithi",
          "today nakshatra",
          "shubh muhurat today",
          "aaj ka shubh muhurat",
          "rahu kaal today",
          "rahu kaal time today",
          "today choghadiya",
          "aaj ka choghadiya muhurat",
          "abhijit muhurat today",
          "today hora timings",
          "today panchang delhi",
          "today's panchang in mumbai maharashtra",
          "drik panchang today",
          "panchang 2026",
        ],
  });
}

const TODAY_FAQS_EN = [
  {
    question: "What is a Panchang and why is it important?",
    answer:
      "A Panchang represents the five celestial limbs of Vedic astrology: Tithi (Lunar day), Vara (Weekday), Nakshatra (Constellation), Yoga, and Karana. It helps plan spiritual activities, auspicious beginnings, and avoid inauspicious hours like Rahu Kaal.",
  },
  {
    question: "How is Tithi, Nakshatra and Muhurat calculated?",
    answer:
      "Tithi is determined by the 12° longitudinal separation between Sun and Moon. Nakshatra is the stellar segment occupied by the Moon, and Muhurats are derived based on local sunrise and sunset timings.",
  },
  {
    question: "Which time is best for starting a new business or project?",
    answer:
      "Abhijit Muhurat (except Wednesdays), Shubh Choghadiya periods (Amrit, Shubh, Labh), and nakshatras like Pushya, Rohini, Hasta, or Chitra are most prosperous for starting new ventures.",
  },
  {
    question: "What is Rahu Kaal and should we avoid it?",
    answer:
      "Rahu Kaal is an inauspicious 90-minute period occurring daily governed by the shadowy planet Rahu. Auspicious beginnings, financial investments, and journeys are traditionally avoided during this window.",
  },
];

const TODAY_FAQS_TE = [
  {
    question: "పంచాంగం అంటే ఏమిటి మరియు దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "పంచాంగం అనేది వైదిక జ్యోతిష్యంలోని 5 ముఖ్య అంగాలు: తిథి, వారం, నక్షత్రం, యోగం మరియు కరణం. ప్రతి రోజు పనులను శుభ ముహూర్తంలో ప్రారంభించి, రాహుకాలం వంటి అశుభ సమయాలను విడిచిపెట్టడానికి ఇది దిశానిర్దేశం చేస్తుంది.",
  },
  {
    question: "తిథి, నక్షత్రం మరియు ముహూర్తాలను ఎలా గణిస్తారు?",
    answer:
      "సూర్యుడు మరియు చంద్రుని ఖగోళ స్థానాల మధ్య దూరం ఆధారంగా తిథి లెక్కించబడుతుంది (ప్రతి 12 డిగ్రీలకు ఒక తిథి). చంద్రుడు రాశిచక్రంలోని 27 నక్షత్రాలలో సంచరించే స్థానం ప్రకారం నక్షత్రం నిర్ణయించబడుతుంది.",
  },
  {
    question: "కొత్త వ్యాపారం లేదా ప్రాజెక్ట్ ప్రారంభించడానికి ఏ సమయం ఉత్తమం?",
    answer:
      "అభిజిత్ ముహూర్తం (బుధవారం తప్ప), శుభ చోఘడియా (అమృత, శుభ, లాభం), మరియు రోహిణి, పుష్యమి, హస్త లేదా చిత్త నక్షత్రాలు కొత్త వ్యాపారాలు లేదా ఒప్పందాలకు అత్యంత శ్రేష్ఠమైనవి.",
  },
  {
    question: "రాహుకాలం అంటే ఏమిటి మరియు దానిని ఎందుకు విడిచిపెట్టాలి?",
    answer:
      "రాహుకాలం ప్రతిరోజూ దాదాపు 90 నిమిషాలు ఉండే అశుభ సమయం. ఛాయాగ్రహమైన రాహువు ప్రభావం వల్ల ఈ సమయంలో ప్రారంభించే నూతన పనులు, ప్రయాణాలు లేదా ఒప్పందాలు ఆటంకాలను ఎదుర్కొనే అవకాశం ఉంటుంది.",
  },
];

const TODAY_FAQS_HI = [
  {
    question: "पंचांग क्या है और इसका क्या महत्व है?",
    answer:
      "पंचांग वैदिक ज्योतिष का वह दर्पण है जो पांच प्रमुख अंगों (तिथि, वार, नक्षत्र, योग और करण) को दर्शाता है। यह प्रतिदिन शुभ कार्यों के आरम्भ, पूजा-अनुष्ठान और राहु काल आदि अशुभ अवधियों से बचाव हेतु अचूक मार्गदर्शक है।",
  },
  {
    question: "तिथि, नक्षत्र और मुहूर्त की गणना कैसे की जाती है?",
    answer:
      "सूर्य और चंद्रमा के कोणीय अंतर (प्रत्येक 12 अंश) से तिथि बनती है। चंद्रमा आकाश के 27 नक्षत्र मंडलों में जिस तारा समूह पर स्थित होता है, वह दिन का नक्षत्र कहलाता है। स्थानीय सूर्योदय से शुभ-अशुभ मुहूर्त निर्धारित होते हैं।",
  },
  {
    question: "नया व्यापार या प्रोजेक्ट शुरू करने के लिए कौन सा समय सबसे उत्तम है?",
    answer:
      "अभिजित मुहूर्त (बुधवार को छोड़कर), शुभ चौघड़िया (अमृत, शुभ, लाभ) और पुष्य, रोहिणी, हस्त अथवा चित्रा नक्षत्र नए व्यापार, गृह प्रवेश या वित्तीय निवेश के लिए सर्वाधिक फलदायी माने जाते हैं।",
  },
  {
    question: "राहु काल क्या है और इसमें शुभ कार्य क्यों नहीं करने चाहिए?",
    answer:
      "राहु काल प्रतिदिन लगभग 90 मिनट की एक अशुभ अवधि है जो छाया ग्रह राहु द्वारा शासित होती है। इस काल में नए सौदे, गृह प्रवेश, विवाह वार्ता अथवा शुभ यात्रा आरम्भ करने से बचना चाहिए।",
  },
];

export default async function PanchangTodayPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const faqs = isTe ? TODAY_FAQS_TE : isHi ? TODAY_FAQS_HI : TODAY_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isTe
            ? "నేటి పంచాంగం — దిన వైదిక జ్యోతిష్యం & ముహూర్తం"
            : isHi
            ? "आज का पंचांग — दैनिक वैदिक ज्योतिष एवं मुहूर्त"
            : "Today's Panchang — Daily Vedic Astrology & Muhurat",
          description: isTe
            ? "తిథి, నక్షత్రం, సూర్యోదయం, సూర్యాస్తమయం, చోఘడియా మరియు శుభ ముహూర్తాలతో దిన పంచాంగం."
            : isHi
            ? "तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, चौघड़िया और शुभ मुहूर्त के साथ दैनिक पंचांग।"
            : "Live daily Hindu Panchang with Tithi, Nakshatra, Sunrise, Sunset, Choghadiya, and Shubh Muhurat.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <PanchangHeroBanner
        title={isTe ? "నేటి పంచాంగం & శుభ ముహూర్తం" : isHi ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today's Panchang & Muhurat"}
        subtitle={
          isTe
            ? "ఖచ్చితమైన తిథి, నక్షత్రం, యోగం, కరణం మరియు ముహూర్తాల కొరకు ప్రత్యక్ష వైదిక పంచాంగం. మీ ప్రతి పనిని శుభ సమయంలో ప్రారంభించండి."
            : isHi
            ? "सटीक तिथि, नक्षत्र, योग, करण और शुभ मुहूर्त हेतु प्रामाणिक वैदिक पंचांग। अपने दिन को सुख, शांति और समृद्धि से परिपूर्ण बनाएं।"
            : "Live Vedic Panchang for accurate Tithi, Nakshatra, Yoga, Karana, and Muhurat. Plan your day with divine timing for a more peaceful and prosperous life."
        }
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
          [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today's Panchang", PATHS.panchangToday]
        )}
        locale={locale}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="today" />
    </div>
  );
}

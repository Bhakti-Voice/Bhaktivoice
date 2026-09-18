import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PanchangTodayView } from "@/components/panchang/PanchangTodayView";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

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
    question: "What is Aaj Ka Panchang (Today's Panchang)?",
    answer:
      "Aaj Ka Panchang represents the five celestial limbs of Vedic astrology for today: Tithi (Lunar day), Nakshatra (Constellation), Yoga, Karana, and Vara (Weekday), along with solar/lunar timings and auspicious muhurats.",
  },
  {
    question: "What is the most auspicious time (Shubh Muhurat) today?",
    answer:
      "Abhijit Muhurat (midday, approximately 11:45 AM - 12:35 PM on non-Wednesdays), Brahma Muhurat (before sunrise), and Amrit Kaal are today's top auspicious periods for starting important ventures.",
  },
  {
    question: "What is Rahu Kaal today and why should it be avoided?",
    answer:
      "Rahu Kaal is an inauspicious 90-minute period occurring every day ruled by the shadow planet Rahu. Auspicious ceremonies, travel, new purchases, and financial transactions are traditionally avoided during Rahu Kaal.",
  },
];

const TODAY_FAQS_TE = [
  {
    question: "నేటి పంచాంగం అంటే ఏమిటి?",
    answer:
      "దిన పంచాంగం వైదిక జ్యోతిష్యంలోని ఐదు ప్రధాన అంగాలైన తిథి, వారం, నక్షత్రం, యోగం మరియు కరణాలను సూచిస్తుంది. ఇది నేటి శుభ-అశుభ ముహూర్తాలు, సూర్యోదయం, సూర్యాస్తమయం, చంద్రోదయం మరియు రాహుకాలం వేళలను ఖచ్చితంగా తెలియజేస్తుంది.",
  },
  {
    question: "ఈరోజు అత్యంత శుభ ముహూర్తం ఏది?",
    answer:
      "ఈరోజు అభిజిత్ ముహూర్తం (బుధవారం మినహా మధ్యాహ్న సమయం), బ్రహ్మ ముహూర్తం (సూర్యోదయానికి ముందు) మరియు అమృత కాలం ఏదైనా నూతన లేదా శుభ కార్యాన్ని ప్రారంభించడానికి అత్యంత శ్రేష్ఠమైనవి.",
  },
  {
    question: "ఈరోజు రాహుకాలం ఎప్పుడు మరియు అందులో ఏమి చేయకూడదు?",
    answer:
      "రాహుకాలం ప్రతిరోజూ దాదాపు 90 నిమిషాల పాటు ఉండే అశుభ సమయం. ఈ సమయంలో గృహ ప్రవేశం, కొత్త వ్యాపార ప్రారంభం, ధన పెట్టుబడులు లేదా శుభ ప్రయాణాలు ప్రారంభించడం నిషిద్ధం.",
  },
];

const TODAY_FAQS_HI = [
  {
    question: "आज का पंचांग क्या होता है?",
    answer:
      "दैनिक पंचांग वैदिक ज्योतिष के पांच मुख्य अंगों (तिथि, वार, नक्षत्र, योग और करण) का दर्पण है। यह आज के दिन के शुभ-अशुभ मुहूर्त, सूर्योदय, सूर्यास्त और चंद्रोदय का सटीक समय दर्शाता है।",
  },
  {
    question: "आज का सबसे शुभ मुहूर्त कौन सा है?",
    answer:
      "आज के दिन अभिजित मुहूर्त (बुधवार को छोड़कर दोपहर का समय), ब्रह्म मुहूर्त (सूर्योदय से पूर्व) और अमृत काल को किसी भी नए व मांगलिक कार्य के लिए सर्वश्रेष्ठ माना जाता है।",
  },
  {
    question: "आज राहु काल कब है और इसमें क्या नहीं करना चाहिए?",
    answer:
      "राहु काल प्रतिदिन लगभग 90 मिनट की एक अशुभ अवधि होती है। इस समय में गृह प्रवेश, नया व्यापार, धन निवेश या शुभ यात्रा का आरंभ करने से बचना चाहिए।",
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
          name: isTe ? "నేటి పంచాంగం — దిన వైదిక జ్యోతిష్యం & ముహూర్తం" : isHi ? "आज का पंचांग — दैनिक वैदिक ज्योतिष एवं मुहूर्त" : "Today's Panchang — Daily Vedic Astrology & Muhurat",
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

      <PageHero
        title={isTe ? "నేటి పంచాంగం & శుభ ముహూర్తం" : isHi ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today's Panchang & Muhurat"}
        subtitle={
          isTe
            ? "నేటి దిన వైదిక పంచాంగం. మీ నగరం ప్రకారం ఖచ్చితమైన తిథి, నక్షత్రం, యోగం, కరణం, చోఘడియా, రాహుకాలం మరియు శుభ ముహూర్తాలను తెలుసుకోండి."
            : isHi
            ? "आज का दैनिक वैदिक पंचांग। अपने नगर के अनुसार सटीक तिथि, नक्षत्र, योग, करण, चौघड़िया, राहु काल और शुभ मुहूर्त देखें।"
            : "Live Vedic Panchang for today. Accurate Tithi, Nakshatra, Yoga, Karana, Choghadiya, Rahu Kaal, and Auspicious Muhurats for your city."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today's Panchang", PATHS.panchangToday]
        )}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="today" />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isTe ? "నేటి పంచాంగం గురించి తరచుగా అడిగే ప్రశ్నలు (FAQs)" : isHi ? "आज के पंचांग से जुड़े मुख्य प्रश्नोत्तर (FAQs)" : "Frequently Asked Questions about Today's Panchang"}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ChoghadiyaView } from "@/components/panchang/ChoghadiyaView";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 300;

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
      ? `నేటి చోఘడియా (${dateFormatted}) — పగలు & రాత్రి శుభ చోఘడియా ముహూర్తాలు`
      : isHi
      ? `आज का चौघड़िया (${dateFormatted}) — दिन और रात का शुभ चौघड़िया मुहूर्त | Aaj Ka Choghadiya`
      : `Aaj Ka Choghadiya (आज का चौघड़िया) — Today's Choghadiya Muhurat ${dateFormatted} | Day & Night Timings`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ పగలు & రాత్రి శుభ చోఘడియా ముహూర్తాలు. అమృత, శుభ, లాభ, చర, రోగ, కాల & ఉద్వేగ సమయాలు మీ నగరం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण दिन और रात का शुभ चौघड़िया मुहूर्त। अमृत, शुभ, लाभ, चर, रोग, काल और उद्वेग की सटीक समय सारणी अपने शहर अनुसार देखें। यात्रा, गृह प्रवेश व नवीन कार्य हेतु सर्वोत्तम चौघड़िया।`
      : `Check accurate Aaj Ka Choghadiya for today (${dateFormatted}). Live Day & Night Choghadiya table with Amrit, Shubh, Labh timings, Rahu Kaal, and Shubh Muhurat for 120+ Indian and global cities.`,
    path: PATHS.choghadiya,
    keywords: isTe
      ? [
          "ఈరోజు చోఘడియా మంచి సమయం",
          "నేటి చోఘడియా",
          "శుభ చోఘడియా ముహూర్తం",
          "పగటి చోఘడియా",
          "రాత్రి చోఘడియా",
          "అమృత చోఘడియా సమయం",
          "లాభ చోఘడియా సమయం",
          "చోఘడియా పట్టిక 2026",
          "తెలుగు చోఘడియా",
        ]
      : isHi
      ? [
          "आज का चौघड़िया मुहूर्त",
          "आज का चौघड़िया",
          "आज का शुभ चौघड़िया मुहूर्त",
          "आज का चौघड़िया क्या है",
          "दिन का चौघड़िया",
          "रात का चौघड़िया",
          "अमृत चौघड़िया कब है",
          "लाभ चौघड़िया समय",
          "दैनिक चौघड़िया सारणी",
          "चौघड़िया मुहूर्त 2026",
          "aaj ka choghadiya hindi",
          "आज का चौघड़िया दिल्ली",
          "आज का चौघड़िया जयपुर",
        ]
      : [
          "aaj ka choghadiya muhurat",
          "aaj ka choghadiya",
          "today choghadiya",
          "today choghadiya in hindi",
          "today choghadiya in delhi",
          "choghadiya today",
          "shubh choghadiya today",
          "day night choghadiya",
          "amrit choghadiya",
          "labh choghadiya",
          "choghadiya muhurat",
          "choghadiya timings today",
          "choghadiya table 2026",
          "raat ka choghadiya",
          "shubh muhurat choghadiya",
          "choghadiya chart today",
        ],
  });
}

const CHOGHADIYA_FAQS_EN = [
  {
    question: "What is Choghadiya and how is it calculated?",
    answer:
      "Choghadiya is an ancient Vedic electional timekeeping system that divides the daytime (sunrise to sunset) and nighttime (sunset to sunrise) into eight equal segments each (~90 minutes per segment). Each segment is ruled by a planet according to classical astrological order.",
  },
  {
    question: "Which Choghadiyas are auspicious for starting important tasks?",
    answer:
      "Amrit (ruled by the Moon), Shubh (ruled by Jupiter), and Labh (ruled by Mercury) are the three most auspicious Choghadiyas for all celebrations, investments, housewarmings, and travel. Char (ruled by Venus) is favorable specifically for dynamic activities like vehicle delivery and travel.",
  },
  {
    question: "Which Choghadiyas should be strictly avoided?",
    answer:
      "Rog (ruled by Mars), Kaal (ruled by Saturn), and Udveg (ruled by Sun) are inauspicious. Important agreements, starting businesses, or entering new homes should not be initiated during these periods.",
  },
  {
    question: "Does Choghadiya change from city to city?",
    answer:
      "Yes. Because Choghadiya is calculated directly from local true Sunrise and Sunset, the exact timings shift depending on the geographic latitude and longitude of your city.",
  },
];

const CHOGHADIYA_FAQS_TE = [
  {
    question: "చోఘడియా అంటే ఏమిటి మరియు దీనిని ఎలా లెక్కిస్తారు?",
    answer:
      "చోఘడియా అనేది వైదిక ముహూర్త కాల విభజన పద్ధతి. ఇందులో సూర్యోదయం నుండి సూర్యాస్తమయం వరకు పగటి సమయాన్ని 8 సమాన భాగాలుగా, సూర్యాస్తమయం నుండి మరుసటి సూర్యోదయం వరకు రాత్రి సమయాన్ని 8 సమాన భాగాలుగా విభజిస్తారు. ప్రతి భాగం సుమారు 90 నిమిషాల (3.75 ఘడియలు) పాటు ఉంటుంది.",
  },
  {
    question: "శుభ కార్యాలకు ఏ చోఘడియా శ్రేష్ఠమైనది?",
    answer:
      "మాంగలిక కార్యాలు, నూతన వ్యాపార ప్రారంభం, గృహ ప్రవేశం మరియు ప్రయాణాలకు 'అమృత', 'శుభ' మరియు 'లాభ' చోఘడియాలను అత్యుత్తమమైనవిగా భావిస్తారు. వాహన కొనుగోలు లేదా చలన కార్యకలాపాలకు 'చర' చోఘడియా కూడా అనుకూలమైనది.",
  },
  {
    question: "ఏ చోఘడియాలలో శుభ కార్యాలు చేయకూడదు?",
    answer:
      "'రోగ', 'కాల' మరియు 'ఉద్వేగ'లను అశుభ చోఘడియాలుగా పరిగణిస్తారు. వీటిలో ప్రారంభించిన పనులలో ఆటంకాలు, నష్టాలు మరియు మానసిక ఆందోళనలు కలిగే అవకాశం ఉన్నందున వీటిని నివారించాలి.",
  },
  {
    question: "వివిధ నగరాల్లో చోఘడియా సమయాలు మారుతాయా?",
    answer:
      "అవును. చోఘడియా గణన స్థానిక సూర్యోదయం మరియు సూర్యాస్తమయాల ఆధారంగా జరుగుతుంది కాబట్టి, నగరాల అక్షాంశ-రేఖాంశాలను బట్టి కొన్ని నిమిషాల తేడా ఉంటుంది.",
  },
];

const CHOGHADIYA_FAQS_HI = [
  {
    question: "चौघड़िया क्या होता है और इसकी गणना कैसे की जाती है?",
    answer:
      "चौघड़िया वैदिक ज्योतिष का एक समय विभाजन तंत्र है। इसमें सूर्योदय से सूर्यास्त तक के दिनमान को 8 बराबर भागों में और सूर्यास्त से अगले सूर्योदय तक के रात्रिमान को 8 बराबर भागों में बांटा जाता है। प्रत्येक भाग लगभग डेढ़ घंटे (3.75 घटी) का होता है।",
  },
  {
    question: "शुभ कार्य के लिए कौन सा चौघड़िया श्रेष्ठ होता है?",
    answer:
      "मांगलिक कार्यों, व्यापार प्रारंभ, गृह प्रवेश और यात्रा के लिए 'अमृत', 'शुभ' और 'लाभ' चौघड़िया को सर्वश्रेष्ठ माना गया है। वाहन क्रय या गतिशील कार्यों के लिए 'चर' चौघड़िया भी अनुकूल होता है।",
  },
  {
    question: "किन चौघड़िया में शुभ कार्य वर्जित होते हैं?",
    answer:
      "'रोग', 'काल' और 'उद्वेग' को अशुभ चौघड़िया माना गया है। इनमें प्रारंभ किए गए कार्यों में विघ्न, हानि व मानसिक क्लेश की संभावना रहती है, अतः इनसे बचना चाहिए।",
  },
  {
    question: "क्या अलग-अलग शहरों में चौघड़िया का समय बदलता है?",
    answer:
      "हां। क्योंकि चौघड़िया की गणना स्थानीय सूर्योदय और सूर्यास्त पर आधारित होती है, इसलिए अलग-अलग शहरों के अक्षांश-देशांतर के अनुसार चौघड़िया के समय में कुछ मिनटों का अंतर होता है।",
  },
];

export default async function ChoghadiyaPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const faqs = isTe ? CHOGHADIYA_FAQS_TE : isHi ? CHOGHADIYA_FAQS_HI : CHOGHADIYA_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "आज का चौघड़िया कैलकुलेटर — भक्ति वॉइस" : "Today's Choghadiya Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "दैनिक दिन एवं रात का चौघड़िया मुहूर्त। अमृत, शुभ, लाभ, चर, रोग, काल व उद्वेग समय सारणी।"
            : "Daily Day and Night Choghadiya Muhurat calculator with Amrit, Shubh, Labh, Char, Rog, Kaal, and Udveg.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
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
        title={isTe ? "నేటి చోఘడియా (పగలు & రాత్రి)" : isHi ? "आज का चौघड़िया (दिन एवं रात)" : "Today's Choghadiya Muhurat"}
        subtitle={
          isTe
            ? "ఖచ్చితమైన వైదిక గణన ప్రకారం నేటి అమృత, శుభ, లాభ, చర, రోగ, కాల మరియు ఉద్వేగ ముహూర్తాలు. మీ నగరం ప్రకారం తనిఖీ చేయండి."
            : isHi
            ? "सटीक वैदिक गणना अनुसार आज का अमृत, शुभ, लाभ, चर, रोग, काल एवं उद्वेग मुहूर्त। अपने शहर अनुसार तुरंत देखें।"
            : "Accurate Day & Night Choghadiya timings with Amrit, Shubh, Labh, Char, Rog, Kaal, and Udveg for your city."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isTe ? "శుభ ముహూర్తాలు" : isHi ? "शुभ मुहूर्त" : "Muhurat", PATHS.muhurat],
          [isTe ? "నేటి చోఘడియా" : isHi ? "आज का चौघड़िया" : "Choghadiya", PATHS.choghadiya],
        )}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <ChoghadiyaView initialCityId={params.city} />
        <FaqList faqs={faqs} title={isTe ? "చోఘడియా గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "चौघड़िया से संबंधित प्रश्नोत्तरी" : "Frequently Asked Questions"} />
      </div>
    </div>
  );
}

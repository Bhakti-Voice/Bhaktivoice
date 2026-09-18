const EKADASHI_FAQS_TE = [
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

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { EkadashiCalendarView } from "@/components/panchang/EkadashiCalendarView";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  const title = isTe
    ? `ఏకాదశి వ్రతం & పారణ సమయాలు ${currentYear} — స్మార్త & వైష్ణవ తేదీలు, హరివాసర సమాప్తి & శుభ ముహూర్తం`
    : isHi
    ? `एकादशी व्रत एवं पारणा समय ${currentYear} — स्मार्त व वैष्णव तारीखें, हरिवासर समाप्ति व मुहूर्त`
    : `Ekadashi Vrat & Parana Timings ${currentYear} — Accurate Smarta & Vaishnava Parana Windows`;

  const description = isHi
    ? `वर्ष ${currentYear} की सभी २४ एकादशियों की प्रामाणिक सूची। स्मार्त व वैष्णव (ISKCON) व्रत दिनांक, द्वादशी पर प्रातःकाल विहित पारणा समय, हरिवासर समाप्ति समय, व्रत कथा एवं पारणा मंत्र।`
    : `Accurate Ekadashi calendar for ${currentYear}. Complete schedule of all 24 Ekadashis, Smarta vs. Vaishnava dates, exact morning Parana micro-windows, Hari Vasara end times, and fasting rules.`;

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.vratUpavas}/ekadashi`,
    keywords: isTe
      ? [
          "ఏకాదశి పారణ సమయం",
          "నేటి ఏకాదశి పారణ ఎప్పుడు",
          "ఏకాదశి వ్రతం 2026",
          "హరివాసర ముగింపు సమయం",
          "స్మార్త వైష్ణవ ఏకాదశి",
          "నిర్జల ఏకాదశి పారణ",
          "వైకుంఠ ఏకాదశి 2026",
          "ఏకాదశి వ్రత కథ",
          "ekadashi parana time telugu",
        ]
      : isHi
      ? [
          "एकादशी पारणा समय",
          "आज एकादशी पारणा कितने बजे है",
          "एकादशी व्रत 2026",
          "हरिवासर समाप्ति समय",
          "स्मार्त वैष्णव एकादशी",
          "निर्जला एकादशी पारण",
          "देवउठनी एकादशी पारणा",
          "एकादशी व्रत पारण मंत्र",
          "ekadashi parana time today",
          "ekadashi calendar 2026",
        ]
      : [
          "ekadashi parana time",
          "ekadashi calendar 2026",
          "parana time today",
          "hari vasara end time",
          "smarta vaishnava ekadashi dates",
          "parana rules dwadashi",
          "breaking ekadashi fast time",
          "nirjala ekadashi parana",
          "all 24 ekadashi list",
          "hindu calendar ekadashi",
        ],
  });
}

export default async function EkadashiPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const currentYear = new Date().getFullYear();

  const faqs = isTe ? EKADASHI_FAQS_TE : isHi
    ? [
        {
          question: "एकादशी व्रत का पारणा कब करना चाहिए?",
          answer:
            "एकादशी व्रत का पारणा अगले दिन यानी द्वादशी तिथि के दिन सूर्योदय के बाद और द्वादशी समाप्त होने से पूर्व किया जाता है। साथ ही यह ध्यान रखना आवश्यक है कि पारणा हरिवासर काल में कदापि न हो।",
        },
        {
          question: "हरिवासर क्या है और इसमें पारणा क्यों वर्जित है?",
          answer:
            "द्वादशी तिथि के प्रथम 25% (एक-चौथाई) भाग को 'हरिवासर' कहा जाता है। धर्मशास्त्रों के अनुसार हरिवासर में अन्न या जल ग्रहण करने से एकादशी व्रत का पुण्य नष्ट हो जाता है। अतः हरिवासर समाप्त होने के बाद ही पारणा करें।",
        },
        {
          question: "स्मार्त और वैष्णव एकादशी में क्या अंतर होता है?",
          answer:
            "स्मार्त गृहस्थ परंपरा में यदि दशमी तिथि सूर्योदय से पूर्व 96 मिनट (अरुणोदय) में स्पर्श कर रही हो, तो भी व्रत उसी दिन रखा जा सकता है। परंतु वैष्णव एवं ISKCON परंपरा में पूर्ण शुद्ध एकादशी का ही पालन किया जाता है, जिससे कभी-कभी दोनों की तारीखों में एक दिन का अंतर आ जाता है।",
        },
        {
          question: "यदि द्वादशी तिथि सूर्योदय से पहले समाप्त हो जाए तो पारणा कैसे करें?",
          answer:
            "शास्त्रों के अनुसार यदि द्वादशी तिथि सूर्योदय से पूर्व ही समाप्त हो जाए, तो सूर्योदय के तत्काल बाद ही पारणा किया जाना चाहिए, क्योंकि सूर्योदय से पहले पारणा करना शास्त्र विरुद्ध है।",
        },
      ]
    : [
        {
          question: "When should Ekadashi Parana be performed?",
          answer:
            "Ekadashi Parana must be performed on Dwadashi tithi after local sunrise and before Dwadashi tithi ends. Furthermore, Parana must never be performed during the inauspicious Hari Vasara period.",
        },
        {
          question: "What is Hari Vasara and why is eating forbidden during it?",
          answer:
            "The first one-fourth (25%) of Dwadashi tithi is designated as Hari Vasara. According to the Padma Purana, consuming food during Hari Vasara nullifies the spiritual fruit of the Ekadashi fast.",
        },
        {
          question: "Why do Smarta and Vaishnava Ekadashi dates sometimes differ?",
          answer:
            "Smarta householders follow rules where Ekadashi at sunrise is accepted unless contaminated by Dashami at Arunodaya (96 mins before dawn). Vaishnavas and ISKCON observe only completely unmixed (Shuddha) Ekadashis, sometimes advancing the fast by one day.",
        },
        {
          question: "What if Dwadashi ends before sunrise?",
          answer:
            "If Dwadashi tithi expires before sunrise, scriptural injunctions advise devotees to break the fast immediately following sunrise.",
        },
      ];

  const crumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "व्रत एवं उपवास" : "Vrat & Upavas", PATHS.vratUpavas],
    [isHi ? "एकादशी व्रत व पारणा समय" : "Ekadashi Parana Timings", `${PATHS.vratUpavas}/ekadashi`]
  );

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "एकादशी पारणा समय कैलकुलेटर" : "Ekadashi Parana Timings Calculator",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "सभी २४ एकादशियों के लिए सटीक प्रातःकालीन पारणा समय, हरिवासर समाप्ति व व्रत तिथियां।"
            : "Accurate morning Parana timings, Hari Vasara end times, and fasting schedules for all 24 Ekadashis.",
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
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }}
      />

      <PageHero
        title={
          isHi
            ? `एकादशी व्रत एवं पारणा समय ${currentYear}`
            : `Ekadashi Vrat & Parana Timings ${currentYear}`
        }
        subtitle={
          isHi
            ? "शास्त्रोक्त सटीक पारणा मुहूर्त, हरिवासर समाप्ति, द्वादशी समय एवं स्मार्त-वैष्णव व्रत सूची।"
            : "Scriptural Parana micro-windows, Hari Vasara end times, Dwadashi boundaries, and Smarta-Vaishnava schedules."
        }
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:pb-16 space-y-10">
        <EkadashiCalendarView initialYear={currentYear} />

        <FaqList
          faqs={faqs}
          title={isHi ? "एकादशी व्रत एवं पारणा से संबंधित अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions about Ekadashi & Parana"}
        />
      </div>
    </div>
  );
}

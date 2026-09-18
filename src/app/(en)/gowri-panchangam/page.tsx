import type { Metadata } from "next";
import { GowriView } from "@/components/panchang/GowriView";
import { PageHero } from "@/components/layout/PageHero";
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
      ? `నేటి గౌరీ పంచాంగం (${dateFormatted}) — పగలు & రాత్రి గౌరీ నల్ల నేరం శుభ ముహూర్తం`
      : isHi
      ? `आज का गौरी पंचांगम (${dateFormatted}) — दिन और रात का गौरी नल्ला नेरम शुभ मुहूर्त`
      : `Gowri Panchangam Today (${dateFormatted}) — Day & Night Nalla Neram Timings & Chart`,
    description: isTe
      ? `నేటి ${dateFormatted} సంపూర్ణ గౌరీ పంచాంగం. పగలు & రాత్రి శుభ గౌరీ నల్ల నేరం సమయాలు (అమృత, శుభ, లాభ, ధన, ఉతి, రోగ, విష, సోర) మీ నగర సూర్యోదయం ప్రకారం తెలుసుకోండి.`
      : isHi
      ? `आज ${dateFormatted} का संपूर्ण गौरी पंचांगम। दिन व रात का शुभ गौरी नल्ला नेरम समय (अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष, सोर) अपने शहर के सटीक सूर्योदय अनुसार देखें। यात्रा व शुभ कार्यों हेतु समय सारणी।`
      : `Check accurate Gowri Panchangam for today (${dateFormatted}). Day & Night Gowri Nalla Neram timings (Amrutha, Shubha, Labha, Dhana, Uthi, Roga, Visha, Sora) with Rahu Kaal for 120+ Indian and world cities.`,
    path: PATHS.gowriPanchangam,
    keywords: isTe
      ? ["గౌరీ పంచాంగం", "నేటి గౌరీ పంచాంగం", "గౌరీ నల్ల నేరం", "అమృత గౌరీ సమయం", "తమిళ గౌరీ పంచాంగం"]
      : isHi
      ? [
          "गौरी पंचांगम",
          "आज का गौरी पंचांगम",
          "गौरी नल्ला नेरम आज",
          "शुभ गौरी मुहूर्त",
          "अमृत गौरी समय",
          "दिन का गौरी पंचांगम",
          "रात का गौरी पंचांगम",
          "गौरी पंचांगम समय सारणी",
          "gowri panchangam hindi",
          "दक्षिण भारतीय पंचांग",
          "नल्ला नेरम आज का समय",
          "gowri panchangam today",
        ]
      : [
          "gowri panchangam today",
          "today gowri panchangam",
          "gowri nalla neram today",
          "gowri panchangam",
          "gowri nalla neram",
          "gowri timings today",
          "day night gowri panchangam",
          "shubha gowri timings",
          "amrutha gowri time today",
          "labha gowri timing",
          "gowri choghadiya",
          "tamil gowri panchangam 2026",
          "gowri panchangam chennai",
          "gowri panchangam bangalore",
          "gowri panchangam hyderabad",
          "nalla neram today timings",
          "gowri panchangam chart",
          "gowri panchangam calculator",
        ],
  });
}

const FAQS_EN = [
  {
    question: "What is Gowri Panchangam and how is it used?",
    answer:
      "Gowri Panchangam is an ancient South Indian Vedic time-division system popular in Tamil Nadu, Karnataka, and Andhra Pradesh. Each day and night is divided into 8 equal parts (roughly 90 minutes each), designated by Gowri aspects: Amrutha, Shubha, Labha, Dhana, Uthi, Roga, Visha, and Sora.",
  },
  {
    question: "Which Gowri periods are considered auspicious (Nalla Neram)?",
    answer:
      "Amrutha (supreme nectar), Shubha (auspicious), Labha (profit & commerce), and Dhana (wealth & prosperity) are considered highly auspicious windows (Nalla Neram) for initiating any new endeavor, purchasing assets, travel, or religious ceremonies.",
  },
  {
    question: "What is the difference between Choghadiya and Gowri Panchangam?",
    answer:
      "While both divide day and night into 8 micro-muhurat segments based on solar sunrise and sunset, Choghadiya is rooted in North/Western Indian traditions ruled by planetary lords, whereas Gowri Panchangam originates in ancient Tamil/South Indian Agamas with a distinct sequence honoring Goddess Gowri (Parvati).",
  },
];

const FAQS_TE = [
  {
    question: "గౌరీ పంచాంగం అంటే ఏమిటి మరియు దీని ప్రాముఖ్యత ఏమిటి?",
    answer:
      "గౌరీ పంచాంగం దక్షిణ భారతదేశంలో (ప్రత్యేకంగా తమిళనాడు, కర్ణాటక మరియు ఆంధ్రప్రదేశ్‌లలో) అత్యంత ప్రాచుర్యం పొందిన సూక్ష్మ ముహూర్త విధానం. ఇందులో పగలు మరియు రాత్రిని 8-8 సమాన భాగాలుగా విభజించి, 8 గౌరీ రూపాలుగా (అమృత, శుభ, లాభ, ధన, ఉతి, రోగ, విష, సోర) పిలుస్తారు.",
  },
  {
    question: "గౌరీ పంచాంగంలో ఏ సమయాలు శుభమైనవి (నల్ల నేరం)?",
    answer:
      "అమృత, శుభ, లాభ మరియు ధన అనే నాలుగు కాలాలను సర్వకార్య సాధకమైన 'నల్ల నేరం' (శుభ సమయం) గా పరిగణిస్తారు. వీటిలో కొత్త వ్యాపారం, ప్రయాణం, గృహ ప్రవేశం మరియు ముఖ్యమైన ఒప్పందాలు విజయవంతమవుతాయి.",
  },
  {
    question: "చోఘడియా మరియు గౌరీ పంచాంగానికి తేడా ఏమిటి?",
    answer:
      "రెండు పద్ధతులూ పగలు-రాత్రిని 8-8 భాగాలుగా విభజిస్తాయి. అయితే చోఘడియా ఉత్తర/పశ్చిమ భారతదేశంలో గ్రహాధిపతుల ఆధారంగా సాగే వ్యవస్థ కాగా, గౌరీ పంచాంగం దక్షిణ భారత ఆగమాలపై ఆధారపడిన పార్వతీ దేవి (గౌరి) పవిత్ర ముహూర్త సంప్రదాయం.",
  },
];

const FAQS_HI = [
  {
    question: "गौरी पंचांगम क्या है और इसका क्या महत्व है?",
    answer:
      "गौरी पंचांगम दक्षिण भारत (विशेष रूप से तमिलनाडु, कर्नाटक और आंध्र प्रदेश) में अत्यंत लोकप्रिय सूक्ष्म मुहूर्त प्रणाली है। इसमें दिन और रात को 8-8 बराबर भागों में विभाजित किया जाता है, जिन्हें 8 गौरी स्वरूप (अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष, सोर) कहा जाता है।",
  },
  {
    question: "गौरी पंचांगम में कौन से समय शुभ (नल्ला नेरम) होते हैं?",
    answer:
      "अमृत, शुभ, लाभ और धन यह चार काल सर्वसिद्धिदायक 'नल्ला नेरम' (शुभ समय) माने गए हैं। इनमें नया व्यापार, यात्रा, गृह प्रवेश, विवाह वार्ता एवं महत्वपूर्ण अनुबंध अत्यंत सफल होते हैं।",
  },
  {
    question: "चौघड़िया और गौरी पंचांगम में क्या अंतर है?",
    answer:
      "दोनों प्रणालियां दिन व रात को 8-8 भागों में बांटती हैं, परंतु चौघड़िया उत्तर व पश्चिम भारत में प्रचलित ग्रहाधिपति आधारित प्रणाली है, जबकि गौरी पंचांगम दक्षिण भारतीय आगमों पर आधारित देवी गौरी की पावन मुहूर्त परंपरा है।",
  },
];

export default async function GowriPanchangamPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? FAQS_TE : isHi ? FAQS_HI : FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi
            ? "आज का गौरी पंचांगम एवं नल्ला नेरम मुहूर्त"
            : "Today's Gowri Panchangam & Nalla Neram Timings",
          description: isHi
            ? "दिन और रात का सम्पूर्ण गौरी पंचांगम। अमृत, शुभ, लाभ, धन व अन्य गौरी मुहूर्त अपने शहर अनुसार देखें।"
            : "Real-time Day and Night Gowri Panchangam and Nalla Neram timings for all major cities.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={
          isHi
            ? "दैनिक गौरी पंचांगम (Gowri Panchangam)"
            : "Today's Gowri Panchangam & Nalla Neram"
        }
        subtitle={
          isHi
            ? "दिन एवं रात्रि के 8-8 गौरी मुहूर्त (अमृत, शुभ, लाभ, धन) का अपने शहर अनुसार सटीक व तात्कालिक समय देखें।"
            : "Accurate Day and Night Gowri Panchangam timings calculated dynamically from local sunrise for 120+ cities."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "दैनिक पंचांग" : "Panchang", PATHS.panchang],
          [isHi ? "गौरी पंचांगम" : "Gowri Panchangam", PATHS.gowriPanchangam]
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        <GowriView />

        <div className="mt-16 mx-auto max-w-4xl">
          <FaqList
            faqs={faqs}
            title={
              isHi
                ? "गौरी पंचांगम से जुड़े महत्वपूर्ण प्रश्नोत्तर (FAQs)"
                : "Frequently Asked Questions about Gowri Panchangam"
            }
          />
        </div>
      </div>
    </div>
  );
}

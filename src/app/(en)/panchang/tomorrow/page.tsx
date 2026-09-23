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
  const tomorrow = new Date(Date.now() + 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tomorrow);

  return localizedMetadata({
    title: isTe
      ? `రేపటి పంచాంగం (${dateFormatted}) — రేపటి తిథి, శుభ ముహూర్తం & చోఘడియా`
      : isHi
      ? `कल का पंचांग (${dateFormatted}) — कल की तिथि, शुभ मुहूर्त एवं चौघड़िया`
      : `Tomorrow's Panchang (${dateFormatted}) — Kal Ka Panchang & Shubh Muhurat`,
    description: isTe
      ? `రేపటి ముందస్తు పంచాంగం (${dateFormatted}). రేపటి తిథి, నక్షత్రం, శుభ ముహూర్తం, రాహుకాలం మరియు చోఘడియా వివరాలతో మీ పనులను ప్లాన్ చేసుకోండి.`
      : isHi
      ? `कल का अग्रिम पंचांग (${dateFormatted})। कल की तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया के अनुसार अपने शुभ कार्यों की योजना बनाएं।`
      : `Advance Panchang for tomorrow (${dateFormatted}). Plan your auspicious events with tomorrow's Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.`,
    path: PATHS.panchangTomorrow,
    keywords: isTe
      ? ["రేపటి పంచాంగం", "రేపటి తిథి", "రేపటి శుభ ముహూర్తం", "రేపటి రాహుకాలం", "రేపటి చోఘడియా"]
      : isHi
      ? ["कल का पंचांग", "कल की तिथि", "कल का शुभ मुहूर्त", "कल का राहु काल", "कल का चौघड़िया"]
      : ["kal ka panchang", "tomorrow panchang", "tomorrow tithi", "tomorrow shubh muhurat", "tomorrow rahu kaal"],
  });
}

const TOMORROW_FAQS_EN = [
  {
    question: "Why check tomorrow's Panchang in advance?",
    answer:
      "Checking tomorrow's Panchang allows devotees and families to plan fasting (Vrats), puja timings, travel, property registrations, and new business ventures according to auspicious Shubh Muhurats and avoid inauspicious Rahu Kaal.",
  },
  {
    question: "How is tomorrow's Tithi calculated?",
    answer:
      "Tomorrow's Tithi is calculated based on the astronomical elongation between the Sun and Moon at tomorrow's sunrise (Udaya Tithi) for your specific city.",
  },
];

const TOMORROW_FAQS_TE = [
  {
    question: "రేపటి పంచాంగాన్ని ముందుగానే ఎందుకు చూడాలి?",
    answer:
      "రేపటి పంచాంగం ముందుగా తెలుసుకోవడం వల్ల భక్తులు ఉపవాసాలు (వ్రతాలు), పూజా సమయాలు, ప్రయాణాలు, ఆస్తి రిజిస్ట్రేషన్లు మరియు కొత్త వ్యాపార కార్యకలాపాలను శుభ ముహూర్తాల ప్రకారం ప్రణాళిక చేసుకోవచ్చు మరియు రాహుకాలాన్ని నివారించవచ్చు.",
  },
  {
    question: "రేపటి తిథిని ఎలా గణిస్తారు?",
    answer:
      "రేపటి తిథి మీ నగర స్థానిక సూర్యోదయ సమయానికి (ఉదయ తిథి) సూర్య-చంద్రుల మధ్య ఉన్న ఖగోళ దూరం ఆధారంగా లెక్కించబడుతుంది.",
  },
];

const TOMORROW_FAQS_HI = [
  {
    question: "कल का पंचांग पहले से क्यों देखना चाहिए?",
    answer:
      "कल के पंचांग से अग्रिम जानकारी मिलने पर आप व्रत-उपवास, पारण का समय, यात्रा, नए व्यापार अथवा मांगलिक कार्यों की योजना शुभ मुहूर्त के अनुसार बना सकते हैं और राहु काल से बच सकते हैं।",
  },
  {
    question: "कल की तिथि का निर्धारण कैसे होता है?",
    answer:
      "कल की तिथि का निर्धारण आपके शहर के कल के स्थानीय सूर्योदय (उदयातिथि) के समय उपस्थित चंद्र-सूर्य की खगोलीय स्थिति के आधार पर होता है।",
  },
];

export default async function PanchangTomorrowPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const faqs = isTe ? TOMORROW_FAQS_TE : isHi ? TOMORROW_FAQS_HI : TOMORROW_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isTe ? "రేపటి పంచాంగం — ముందస్తు వైదిక ముహూర్తం" : isHi ? "कल का पंचांग — अग्रिम वैदिक मुहूर्त" : "Tomorrow's Panchang — Advance Vedic Muhurat",
          description: isTe
            ? "రేపటి తిథి, నక్షత్రం, సూర్యోదయం మరియు చోఘడియా ముహూర్తాలు."
            : isHi
            ? "कल की तिथि, नक्षत्र, सूर्योदय और चौघड़िया मुहूर्त।"
            : "Advance Hindu Panchang for tomorrow with Tithi, Nakshatra, Sunrise, and Muhurats.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <JsonLd data={faqSchema(faqs)} />

      <PanchangHeroBanner
        title={isTe ? "రేపటి పంచాంగం & శుభ ముహూర్తం" : isHi ? "कल का पंचांग एवं शुभ मुहूर्त" : "Tomorrow's Panchang & Muhurat"}
        subtitle={
          isTe
            ? "రేపటి ముందస్తు వైదిక పంచాంగం. రేపటి తిథి, నక్షత్రం, యోగం, కరణం, రాహుకాలం మరియు చోఘడియా చూసి మీ శుభ పనులను ప్రణాళిక చేసుకోండి."
            : isHi
            ? "कल का अग्रिम वैदिक पंचांग। कल की तिथि, नक्षत्र, योग, करण, राहु काल और चौघड़िया देखकर अपने शुभ कार्यों की योजना बनाएं।"
            : "Plan ahead with tomorrow's Vedic Panchang. Check tomorrow's Tithi, Nakshatra, Rahu Kaal, and Auspicious Muhurats for your city."
        }
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isTe ? "రేపటి పంచాంగం" : isHi ? "कल का पंचांग" : "Tomorrow's Panchang", PATHS.panchangTomorrow]
        )}
        locale={locale}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="tomorrow" />
    </div>
  );
}

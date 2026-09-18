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
  const yesterday = new Date(Date.now() - 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(yesterday);

  return localizedMetadata({
    title: isTe
      ? `నిన్నటి పంచాంగం (${dateFormatted}) — నిన్నటి తిథి & ముహూర్తం`
      : isHi
      ? `बीते कल का पंचांग (${dateFormatted}) — कल की तिथि एवं मुहूर्त`
      : `Yesterday's Panchang (${dateFormatted}) — Historical Panchang & Tithi`,
    description: isTe
      ? `గడచిన రోజు (${dateFormatted}) చారిత్రక పంచాంగం. తిథి, నక్షత్రం, యోగం, కరణం మరియు సూర్యోదయ-సూర్యాస్తమయ సమయాలను వీక్షించండి.`
      : isHi
      ? `बीते कल (${dateFormatted}) का ऐतिहासिक पंचांग। तिथि, नक्षत्र, योग, करण और सूर्योदय-सूर्यास्त की गणना देखें।`
      : `Historical Vedic Panchang for yesterday (${dateFormatted}). View Tithi, Nakshatra, Yoga, Karana, and solar timings.`,
    path: PATHS.panchangYesterday,
    keywords: isTe
      ? ["నిన్నటి పంచాంగం", "నిన్నటి తిథి", "గత పంచాంగ వివరాలు"]
      : isHi
      ? ["बीते कल का पंचांग", "कल की तिथि", "पंचांग इतिहास"]
      : ["yesterday panchang", "yesterday tithi", "past panchang lookup"],
  });
}

const YESTERDAY_FAQS_EN = [
  {
    question: "Why look up yesterday's Panchang?",
    answer:
      "Looking up yesterday's Panchang is useful for reviewing astrological alignments during births, past events, completed fasts (vrats), or astronomical research.",
  },
];

const YESTERDAY_FAQS_TE = [
  {
    question: "నిన్నటి పంచాంగాన్ని ఎందుకు పరిశీలించాలి?",
    answer:
      "జన్మ సమయ గ్రహ స్థితిగతులు, గడచిన రోజు ఆచరించిన వ్రత-పూజల ధ్రువీకరణ లేదా గత ఖగోళ వివరాలను సరిచూసుకోవడానికి నిన్నటి పంచాంగం ఉపయోగపడుతుంది.",
  },
];

const YESTERDAY_FAQS_HI = [
  {
    question: "बीते कल का पंचांग क्यों देखा जाता है?",
    answer:
      "जन्म समय की ग्रह स्थिति, पिछले दिन के व्रत-अनुष्ठान अथवा ऐतिहासिक खगोलीय गणनाओं के सत्यापन के लिए बीते कल का पंचांग देखा जाता है।",
  },
];

export default async function PanchangYesterdayPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const params = await searchParams;
  const faqs = isTe ? YESTERDAY_FAQS_TE : isHi ? YESTERDAY_FAQS_HI : YESTERDAY_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang",
          description: isTe
            ? "నిన్నటి తిథి, నక్షత్రం మరియు పంచాంగ వివరాలు."
            : isHi
            ? "बीते कल की तिथि, नक्षत्र और पंचांग विवरण।"
            : "Historical Vedic Panchang with past Tithi, Nakshatra, and Muhurats.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang"}
        subtitle={
          isTe
            ? "నిన్నటి చారిత్రక వైదిక పంచాంగం. మీ నగరం ప్రకారం తిథి, నక్షత్రం, యోగం మరియు కరణాల వివరాలను పరిశీలించండి."
            : isHi
            ? "बीते कल का ऐतिहासिक वैदिक पंचांग। अपने नगर अनुसार तिथि, नक्षत्र, योग और करण का विवरण देखें।"
            : "Historical Vedic Panchang for yesterday. Review Tithi, Nakshatra, Yoga, and solar timings."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isTe ? "పంచాంగం" : isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isTe ? "నిన్నటి పంచాంగం" : isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang", PATHS.panchangYesterday]
        )}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="yesterday" />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isTe ? "నిన్నటి పంచాంగం గురించి తరచుగా అడిగే ప్రశ్నలు" : isHi ? "बीते कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Yesterday's Panchang"}
        />
      </div>
    </div>
  );
}

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const yesterday = new Date(Date.now() - 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(yesterday);

  return localizedMetadata({
    title: isHi
      ? `बीते कल का पंचांग (${dateFormatted}) — कल की तिथि एवं मुहूर्त`
      : `Yesterday's Panchang (${dateFormatted}) — Historical Panchang & Tithi`,
    description: isHi
      ? `बीते कल (${dateFormatted}) का ऐतिहासिक पंचांग। तिथि, नक्षत्र, योग, करण और सूर्योदय-सूर्यास्त की गणना देखें।`
      : `Historical Vedic Panchang for yesterday (${dateFormatted}). View Tithi, Nakshatra, Yoga, Karana, and solar timings.`,
    path: PATHS.panchangYesterday,
    keywords: isHi
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
  const params = await searchParams;
  const faqs = isHi ? YESTERDAY_FAQS_HI : YESTERDAY_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang",
          description: isHi
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
        title={isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang"}
        subtitle={
          isHi
            ? "बीते कल का ऐतिहासिक वैदिक पंचांग। अपने नगर अनुसार तिथि, नक्षत्र, योग और करण का विवरण देखें।"
            : "Historical Vedic Panchang for yesterday. Review Tithi, Nakshatra, Yoga, and solar timings."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isHi ? "बीते कल का पंचांग" : "Yesterday's Panchang", PATHS.panchangYesterday]
        )}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="yesterday" />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isHi ? "बीते कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Yesterday's Panchang"}
        />
      </div>
    </div>
  );
}

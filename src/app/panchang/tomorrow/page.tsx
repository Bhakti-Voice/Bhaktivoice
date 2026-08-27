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
  const tomorrow = new Date(Date.now() + 24 * 3600_000);
  const dateFormatted = new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tomorrow);

  return localizedMetadata({
    title: isHi
      ? `कल का पंचांग (${dateFormatted}) — कल की तिथि, शुभ मुहूर्त एवं चौघड़िया`
      : `Tomorrow's Panchang (${dateFormatted}) — Kal Ka Panchang & Shubh Muhurat`,
    description: isHi
      ? `कल का अग्रिम पंचांग (${dateFormatted})। कल की तिथि, नक्षत्र, शुभ मुहूर्त, राहु काल और चौघड़िया के अनुसार अपने शुभ कार्यों की योजना बनाएं।`
      : `Advance Panchang for tomorrow (${dateFormatted}). Plan your auspicious events with tomorrow's Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.`,
    path: PATHS.panchangTomorrow,
    keywords: isHi
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
  const params = await searchParams;
  const faqs = isHi ? TOMORROW_FAQS_HI : TOMORROW_FAQS_EN;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isHi ? "कल का पंचांग — अग्रिम वैदिक मुहूर्त" : "Tomorrow's Panchang — Advance Vedic Muhurat",
          description: isHi
            ? "कल की तिथि, नक्षत्र, सूर्योदय और चौघड़िया मुहूर्त।"
            : "Advance Hindu Panchang for tomorrow with Tithi, Nakshatra, Sunrise, and Muhurats.",
          publisher: {
            "@type": "Organization",
            name: "BhaktiVoice",
            url: SITE.url,
          },
        }}
      />

      <PageHero
        title={isHi ? "कल का पंचांग एवं शुभ मुहूर्त" : "Tomorrow's Panchang & Muhurat"}
        subtitle={
          isHi
            ? "कल का अग्रिम वैदिक पंचांग। कल की तिथि, नक्षत्र, योग, करण, राहु काल और चौघड़िया देखकर अपने शुभ कार्यों की योजना बनाएं।"
            : "Plan ahead with tomorrow's Vedic Panchang. Check tomorrow's Tithi, Nakshatra, Rahu Kaal, and Auspicious Muhurats for your city."
        }
        hub="tithi"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
          [isHi ? "कल का पंचांग" : "Tomorrow's Panchang", PATHS.panchangTomorrow]
        )}
      />

      <PanchangTodayView initialCityId={params.city} pageMode="tomorrow" />

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <FaqList
          faqs={faqs}
          title={isHi ? "कल के पंचांग से जुड़े प्रश्नोत्तर" : "Frequently Asked Questions for Tomorrow's Panchang"}
        />
      </div>
    </div>
  );
}

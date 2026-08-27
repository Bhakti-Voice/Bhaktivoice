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
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "वैदिक एवं आध्यात्मिक उपकरण — आज का पंचांग, हिन्दू कैलेंडर, कुंडली एवं मिलान"
      : t.hubs.spiritualTools.title,
    description: isHi
      ? "भक्ति वॉइस के 100% निःशुल्क एवं सुरक्षित वैदिक उपकरण। आज का पंचांग, हिन्दू कैलेंडर 2026, मुफ्त जन्म कुंडली एवं 36 गुण कुंडली मिलान सीधे अपने ब्राउज़र में देखें।"
      : t.hubs.spiritualTools.description,
    path: PATHS.spiritualTools,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.landing],
  });
}

export default async function SpiritualToolsPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.landing] : [...SPIRITUAL_TOOL_FAQS.landing];

  const tools = [
    {
      href: PATHS.panchangToday,
      title: isHi ? "आज का पंचांग" : "Today's Panchang",
      description: isHi
        ? "आज की तिथि, नक्षत्र, सूर्योदय, सूर्यास्त, राहु काल, अभिजित मुहूर्त और चौघड़िया का सम्पूर्ण दैनिक विवरण।"
        : "Live Vedic Panchang for today: accurate Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal, and Choghadiya timings.",
      icon: "panchang" as const,
    },
    {
      href: PATHS.calendar,
      title: isHi ? "हिन्दू कैलेंडर 2026" : "Hindu Calendar 2026",
      description: isHi
        ? "मासिक पंचांग ग्रिड, एकादशी, पूर्णिमा, अमावस्या, प्रदोष, संक्रांति और सभी प्रमुख हिन्दू त्यौहारों की तिथियाँ।"
        : "Interactive 7-column Hindu lunisolar calendar with monthly Tithis, Ekadashis, Vrats, and major festival dates.",
      icon: "calendar" as const,
    },
    {
      href: PATHS.kundli,
      title: isHi ? "मुफ्त जन्म कुंडली" : t.spiritualTools.tools.kundli.title,
      description: isHi
        ? "सटीक जन्म पत्रिका, लग्न, ग्रह स्थिति और भाव विश्लेषण। 100% सुरक्षित और निजी।"
        : t.spiritualTools.tools.kundli.description,
      icon: "kundli" as const,
    },
    {
      href: PATHS.kundliMilan,
      title: isHi ? "कुंडली मिलान" : t.spiritualTools.tools.milan.title,
      description: isHi
        ? "विवाह अनुकूलता हेतु पारंपरिक 36 गुण अष्टकूट मिलान विश्लेषण।"
        : t.spiritualTools.tools.milan.description,
      icon: "milan" as const,
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
        title={isHi ? "आध्यात्मिक एवं वैदिक उपकरण" : t.hubs.spiritualTools.h1}
        subtitle={
          isHi
            ? "100% सुरक्षित और निजी वैदिक टूल्स — दैनिक पंचांग, हिन्दू कैलेंडर, जन्म कुंडली और कुंडली मिलान। आपकी कोई भी जानकारी कभी सर्वर पर नहीं भेजी जाती।"
            : t.spiritualTools.landingLead
        }
        hub="tithi"
        crumbs={localizedCrumbs(t.homeName, [
          isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools,
          PATHS.spiritualTools,
        ])}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:pb-12">
        <ToolCardGrid tools={tools} openLabel={isHi ? "उपकरण खोलें" : t.spiritualTools.openTool} />
        <FaqList faqs={faqs} title={isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : t.common.faqTitle} className="mt-12" />
      </div>
    </div>
  );
}

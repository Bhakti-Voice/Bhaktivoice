import type { Metadata } from "next";
import { KundliTool } from "@/components/spiritual-tools/KundliTool";
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
  const locale = await getLocale();
  const isHi = locale === "hi";

  return localizedMetadata({
    title: isHi
      ? "मुफ्त जन्म कुंडली — वैदिक जन्म पत्रिका, लग्न, ग्रह स्थिति एवं दशा ऑनलाइन"
      : "Free Janam Kundli — Accurate Vedic Birth Chart & Horoscope Online",
    description: isHi
      ? "सटीक वैदिक जन्म कुंडली ऑनलाइन बनाएं। लग्न, चंद्र राशि, जन्म नक्षत्र, 12 भाव, ग्रह स्पष्ट, मांगलिक दोष विश्लेषण एवं विंशोत्तरी महादशा। 100% सुरक्षित और गोपनीय।"
      : "Generate your free, 100% accurate Vedic Janam Kundli online. Detailed birth chart (D-1), Ascendant, Moon sign, Nakshatra, 12 Bhavas, Manglik Dosha, and Vimshottari Dasha.",
    path: PATHS.kundli,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.kundli],
  });
}

export default async function KundliPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.kundli] : [...SPIRITUAL_TOOL_FAQS.kundli];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "मुफ्त जन्म कुंडली कैलकुलेटर — भक्ति वॉइस" : "Free Janam Kundli Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "सटीक वैदिक जन्म कुंडली, लग्न, ग्रह स्थिति, मांगलिक दोष एवं विंशोत्तरी महादशा।"
            : "Accurate Vedic Janam Kundli birth chart generator with Lagna, planet positions, Manglik analysis, and Vimshottari dasha.",
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
        title={isHi ? "मुफ्त ऑनलाइन जन्म कुंडली" : "Free Online Janam Kundli"}
        subtitle={
          isHi
            ? "सटीक वैदिक जन्म पत्रिका, लग्न, ग्रह स्थिति, मांगलिक दोष एवं विंशोत्तरी महादशा। 100% सुरक्षित एवं निजी।"
            : "Accurate Vedic horoscope generator with Ascendant, Moon sign, 12 Houses, Manglik analysis, and Vimshottari Dasha. 100% private."
        }
        hub="spirituality"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "जन्म कुंडली" : t.spiritualTools.tools.kundli.title, PATHS.kundli],
        )}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:pb-16">
        <KundliTool />
        <FaqList
          faqs={faqs}
          title={isHi ? "जन्म कुंडली से संबंधित अक्सर पूछे जाने वाले प्रश्न" : t.common.faqTitle}
          className="mt-12"
        />
      </div>
    </div>
  );
}

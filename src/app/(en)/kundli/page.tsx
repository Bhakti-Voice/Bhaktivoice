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
  SPIRITUAL_TOOL_FAQS_TE,
  SPIRITUAL_TOOL_KEYWORDS,
} from "@/lib/spiritual-tools/seo-content";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return localizedMetadata({
    title: isTe
      ? "ఉచిత జన్మ కుండలి ఆన్‌లైన్ — 16 వర్గ కుండలులు (నవాంశ D-9, దశమాంశ D-10) & అష్టకవర్గ కాలిక్యులేటర్"
      : isHi
      ? "मुफ्त जन्म कुंडली ऑनलाइन — 16 वर्ग कुंडलियां (नवांश D-9, दशमांश D-10) एवं अष्टाकवर्ग कैलकुलेटर"
      : "Free Janam Kundli Online (जन्म कुंडली) — 16 Divisional Charts (D9, D10) & Ashtakavarga Calculator",
    description: isTe
      ? "100% ఖచ్చితమైన వైదిక జన్మ కుండలిని ఉచితంగా ఆన్‌లైన్‌లో పొందండి. 16 వర్గ కుండలులు (D-1 నుండి D-60), నవాంశ (D-9), అష్టకవర్గ (337 బిందువులు), దక్షిణ/ఉత్తర భారత చార్ట్ శైలులు, మాంగ్లిక్ విచారం మరియు వింశోత్తరి మహాదశ."
      : isHi
      ? "सटीक वैदिक जन्म कुंडली 100% मुफ्त ऑनलाइन बनाएं। 16 वर्ग कुंडलियां (D-1 से D-60), नवांश (D-9), महर्षि पराशर अष्टाकवर्ग (337 बिंदु तालिका), उत्तर/दक्षिण/पूर्व भारतीय चार्ट, मांगलिक दोष एवं विंशोत्तरी महादशा। 100% सुरक्षित और गोपनीय।"
      : "Generate your free, 100% accurate Vedic Janam Kundli online. Detailed Shodashvarga (16 divisional charts: D-1 to D-60), Parashari Ashtakavarga (337 SAV Bindus), North/South/East chart styles, Lagna, Manglik Dosha & Vimshottari Dasha.",
    path: PATHS.kundli,
    keywords: isTe
      ? [...SPIRITUAL_TOOL_KEYWORDS.kundliTe]
      : isHi
      ? [...SPIRITUAL_TOOL_KEYWORDS.kundliHi]
      : [...SPIRITUAL_TOOL_KEYWORDS.kundli],
  });
}

export default async function KundliPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? [...SPIRITUAL_TOOL_FAQS_TE.kundli] : isHi ? [...SPIRITUAL_TOOL_FAQS_HI.kundli] : [...SPIRITUAL_TOOL_FAQS.kundli];

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

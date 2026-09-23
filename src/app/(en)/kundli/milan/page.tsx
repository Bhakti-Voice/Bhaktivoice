import type { Metadata } from "next";
import { KundliMilanTool } from "@/components/spiritual-tools/KundliMilanTool";
import { KundliMilanHero } from "@/components/spiritual-tools/KundliMilanHero";
import { KundliMilanFaqSection } from "@/components/spiritual-tools/KundliMilanFaqSection";
import { KundliMilanEditorialContent } from "@/components/spiritual-tools/KundliMilanEditorialContent";
import { RelatedKundliTools } from "@/components/spiritual-tools/RelatedKundliTools";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getMessages } from "@/lib/i18n/server";
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
      ? "ఉచిత కుండలి మిలనం — 36 గుణాల జాతక పొంతన & వివాహ పొంతన ఆన్‌లైన్"
      : isHi
      ? "मुफ्त कुंडली मिलान — 36 गुण मिलान, नाड़ी दोष एवं मांगलिक मिलान ऑनलाइन"
      : "Free Kundli Milan Online — 36 Guna Matching & Marriage Compatibility",
    description: isTe
      ? "వివాహం కోసం ఖచ్చితమైన 36 గుణాల అష్టకూట మిలనం ఆన్‌లైన్‌లో పొందండి. నాడీ దోషం, భకూట్ దోష నివారణ, మాంగ్లిక్ పొంతన మరియు సమగ్ర నివేదిక. 100% ఉచితం మరియు గోప్యమైనది."
      : isHi
      ? "विवाह हेतु प्रामाणिक 36 गुण अष्टकूट मिलान ऑनलाइन करें। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट एवं नाड़ी दोष परिहार सहित सम्पूर्ण मिलान रिपोर्ट। 100% सुरक्षित और गोपनीय।"
      : "Free online Kundli Milan for marriage. Accurate 36 Guna Ashtakoot matching with Nadi Dosha, Bhakoot Dosha cancellation, Manglik match, and compatibility score. 100% free and private.",
    path: PATHS.kundliMilan,
    keywords: isTe
      ? [...SPIRITUAL_TOOL_KEYWORDS.milanTe]
      : isHi
      ? [...SPIRITUAL_TOOL_KEYWORDS.milanHi]
      : [...SPIRITUAL_TOOL_KEYWORDS.milan],
  });
}

export default async function KundliMilanPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const faqs = isTe ? [...SPIRITUAL_TOOL_FAQS_TE.milan] : isHi ? [...SPIRITUAL_TOOL_FAQS_HI.milan] : [...SPIRITUAL_TOOL_FAQS.milan];
  const canonicalUrl = `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : ""}${PATHS.kundliMilan}`;

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      {/* Schema.org WebApplication Structured Data */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isHi ? "36 गुण कुंडली मिलान कैलकुलेटर — भक्ति वॉइस" : "36 Guna Kundli Milan Calculator — BhaktiVoice",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "All",
          description: isHi
            ? "विवाह हेतु 36 गुण अष्टकूट मिलान, नाड़ी दोष, भकूट दोष एवं मांगलिक मिलान विश्लेषण।"
            : "Vedic 36 Guna Ashtakoot marriage matching calculator with Nadi, Bhakoot, and Manglik compatibility.",
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

      {/* Schema.org BreadcrumbList */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: isTe ? "హోమ్" : isHi ? "होम" : "Home",
              item: `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : "/"}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : "Spiritual Tools",
              item: `${SITE.url}${isTe ? "/te" : isHi ? "/hi" : ""}${PATHS.spiritualTools}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: isTe ? "కుండలి మిలనం" : isHi ? "कुंडली मिलान" : "Kundli Milan",
            },
          ],
        }}
      />

      {/* Schema.org FAQPage */}
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

      {/* Hero Section Matching Premium Kundli Design */}
      <KundliMilanHero isHi={isHi} isTe={isTe} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <KundliMilanTool isHi={isHi} isTe={isTe} />
        <RelatedKundliTools currentTool="kundli-milan" isHi={isHi} isTe={isTe} className="mt-12" />
        <KundliMilanEditorialContent isHi={isHi} isTe={isTe} />
        <KundliMilanFaqSection isHi={isHi} isTe={isTe} />
      </main>
    </div>
  );
}

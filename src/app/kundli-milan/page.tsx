import type { Metadata } from "next";
import { KundliMilanTool } from "@/components/spiritual-tools/KundliMilanTool";
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
      ? "मुफ्त कुंडली मिलान — 36 गुण मिलान, नाड़ी दोष एवं मांगलिक मिलान ऑनलाइन"
      : "Free Kundli Milan — 36 Guna Matching & Marriage Compatibility Online",
    description: isHi
      ? "विवाह हेतु प्रामाणिक 36 गुण अष्टकूट मिलान ऑनलाइन करें। वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट एवं नाड़ी दोष परिहार सहित सम्पूर्ण मिलान रिपोर्ट। 100% सुरक्षित।"
      : "Free online Kundli Milan for marriage. Accurate 36 Guna Ashtakoot matching with Nadi Dosha, Bhakoot Dosha cancellation, Manglik match, and compatibility score.",
    path: PATHS.kundliMilan,
    keywords: [...SPIRITUAL_TOOL_KEYWORDS.milan],
  });
}

export default async function KundliMilanPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const faqs = isHi ? [...SPIRITUAL_TOOL_FAQS_HI.milan] : [...SPIRITUAL_TOOL_FAQS.milan];

  return (
    <div>
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
        title={isHi ? "36 गुण कुंडली मिलान" : "36 Guna Kundli Milan"}
        subtitle={
          isHi
            ? "विवाह अनुकूलता हेतु पारंपरिक अष्टकूट गुण मिलान, नाड़ी दोष, भकूट दोष एवं मांगलिक सामंजस्य रिपोर्ट। 100% सुरक्षित।"
            : "Traditional Vedic Ashtakoot matchmaking with 36 Gunas, Nadi & Bhakoot dosha cancellation, and Manglik harmony. 100% private."
        }
        hub="community"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "आध्यात्मिक उपकरण" : t.nav.spiritualTools, PATHS.spiritualTools],
          [isHi ? "कुंडली मिलान" : t.spiritualTools.tools.milan.title, PATHS.kundliMilan],
        )}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:pb-16">
        <KundliMilanTool />
        <FaqList
          faqs={faqs}
          title={isHi ? "कुंडली मिलान से संबंधित अक्सर पूछे जाने वाले प्रश्न" : t.common.faqTitle}
          className="mt-12"
        />
      </div>
    </div>
  );
}

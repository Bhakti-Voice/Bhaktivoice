import type { Metadata } from "next";
import { AngelNumberListing } from "@/components/angel-numbers/AngelNumberListing";
import { listAngelNumbers } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { getLocale } from "@/lib/i18n/server";
import { withLocale } from "@/lib/i18n/config";
import { getAngelNumbersContent } from "@/lib/library/angel-numbers-content";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("angelNumbers");
}

export default async function AngelNumbersListingPage() {
  const [items, locale] = await Promise.all([listAngelNumbers(), getLocale()]);
  const content = getAngelNumbersContent(locale);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `BhaktiVoice ${content.title}`,
    description: content.description,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      url: `${SITE.url}${withLocale(`${PATHS.angelNumbers}/${item.slug}`, locale)}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <AngelNumberListing items={items} locale={locale} content={content} />

      {/* 10 Detailed High-Rich Keyword FAQs */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="border-t border-[#ebdccb]/60 pt-10">
          <FaqList
            faqs={content.faqs}
            title={content.faqTitle}
            jsonLd={true}
            className="mt-0"
          />
        </div>
      </div>
    </>
  );
}

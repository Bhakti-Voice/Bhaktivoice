import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { ProductTrustBadges } from "@/components/store/ProductTrustBadges";
import { StoreCategoryFilter } from "@/components/store/StoreCategoryFilter";
import { listProducts } from "@/lib/content";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("store");
}

export default async function StorePage() {
  const [products, t, locale] = await Promise.all([
    listProducts(),
    getMessages(),
    getLocale(),
  ]);
  const isHi = locale === "hi";

  const faqs = isHi ? [...t.listingFaqs.store] : [...t.listingFaqs.store];

  return (
    <div>
      <PageHero
        title={isHi ? "भक्ति स्टोर — प्रामाणिक साधना एवं पूजा सामग्री" : t.hubs.store.h1}
        subtitle={
          isHi
            ? "दैनिक नाम जप एवं पूजन हेतु 100% शुद्ध तुलसी माला, रुद्राक्ष, पीतल दीपक एवं सिद्ध यंत्र।"
            : "Authentic tulsi malas, rudraksha, brass diyas, and sacred yantras for your daily devotional sadhana."
        }
        hub="store"
        crumbs={localizedCrumbs(
          t.homeName,
          [isHi ? "स्टोर" : t.nav.store, PATHS.store],
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:pb-16 space-y-10">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.store.h1,
            products.map((product) => ({
              name: product.name,
              url: `${PATHS.store}/${product.slug}`,
            })),
          )}
        />

        {/* 4 Trust Pillars */}
        <ProductTrustBadges />

        {/* Dynamic Category Filter & Products Grid */}
        <section>
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              {isHi ? "दैनिक साधना सामग्री संग्रह" : "Sacred Sadhana Essentials"}
            </h2>
            <p className="text-xs text-muted sm:text-sm">
              {isHi
                ? "शुद्ध प्राकृतिक तत्वों से निर्मित, पूजा और जप हेतु उपयुक्त सामग्री।"
                : "Handcrafted, natural, and respectful companions for your shrine and daily chanting."}
            </p>
          </div>

          <StoreCategoryFilter
            products={products.map((product) => ({
              slug: product.slug,
              name: product.name,
              priceInr: product.priceInr,
              heroImage: product.heroImage,
              heroImageAlt: product.heroImageAlt,
              categorySlug: product.categorySlug,
              outOfStock: product.outOfStock,
            }))}
          />
        </section>

        <HubSeoBlock id="store" hideFaqs />
        <FaqList faqs={faqs} title={isHi ? "भक्ति स्टोर से संबंधित सामान्य प्रश्न" : t.common.faqTitle} />
      </div>
    </div>
  );
}

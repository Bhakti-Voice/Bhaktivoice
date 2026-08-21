import type { Metadata } from "next";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { listProducts } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("store");
}

export default async function StorePage() {
  const [products, t] = await Promise.all([listProducts(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.store.h1} hub="store" crumbs={pageCrumbs(["Store", PATHS.store])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.store.h1,
            products.map((product) => ({ name: product.name, url: `${PATHS.store}/${product.slug}` })),
          )}
        />

        <section className="mt-8">
          <h2 className="font-serif text-2xl text-ink">{t.common.bestSellers}</h2>
          <SearchableCardGrid
            items={products.map((product) => ({
              slug: product.slug,
              href: `${PATHS.store}/${product.slug}`,
              title: product.name,
              text: `₹${product.priceInr.toLocaleString("en-IN")}`,
              image: product.heroImage,
              imageAlt: product.heroImageAlt,
              meta: product.categorySlug,
              badge: product.outOfStock ? t.common.outOfStock : undefined,
              productName: product.name,
              outOfStock: product.outOfStock,
            }))}
            emptyKind="products"
            placeholder={t.common.listingSearch(t.nav.store)}
            className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3"
          />
        </section>
        <HubSeoBlock id="store" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.store]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}

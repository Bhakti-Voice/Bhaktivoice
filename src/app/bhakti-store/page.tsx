import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listProducts, listStoreCategories } from "@/lib/content";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { hubMetadata } from "@/lib/i18n/hub";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("store");
}

export default async function StorePage() {
  const [products, storeCategories] = await Promise.all([listProducts(), listStoreCategories()]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          "Bhakti store",
          products.map((product) => ({ name: product.name, url: `${PATHS.store}/${product.slug}` })),
        )}
      />
      <Breadcrumbs items={pageCrumbs(["Store", PATHS.store])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Bhakti Store</h1>

      {storeCategories.length ? (
        <div className="mt-10 flex flex-wrap gap-4">
          {storeCategories.map((category) => (
            <LocaleLink key={category.slug} href={category.href} className="flex w-24 flex-col items-center gap-2">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sand text-sm font-medium text-saffron-deep">
                {category.name.slice(0, 1)}
              </span>
              <span className="text-center text-sm text-ink">{category.name}</span>
            </LocaleLink>
          ))}
        </div>
      ) : null}

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">Best Sellers</h2>
        {products.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line"
              >
                <ListingCard
                  href={`${PATHS.store}/${product.slug}`}
                  title={product.name}
                  text={`₹${product.priceInr.toLocaleString("en-IN")}`}
                  image={product.heroImage}
                  imageAlt={product.heroImageAlt}
                  meta={product.categorySlug}
                />
                <div className="px-5 pb-5">
                  <AddToCartButton slug={product.slug} name={product.name} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyListing kind="products" />
        )}
      </section>
      <HubSeoBlock id="store" />
    </div>
  );
}

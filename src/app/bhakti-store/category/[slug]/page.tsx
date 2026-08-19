import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingPager } from "@/components/content/ListingPager";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getStoreCategory, listProducts } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getStoreCategory(slug);
  if (!category) return { title: "Category not found" };
  return localizedMetadata({
    title: `${category.name} — Bhakti Store`,
    description: category.description,
    path: PATHS.store,
    noIndex: true,
  });
}

export default async function StoreCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const category = await getStoreCategory(slug);
  if (!category) notFound();
  const [products, t] = await Promise.all([listProducts(), getMessages()]);
  const filtered = products.filter((product) => product.categorySlug === category.slug);
  const { items, page, pages } = getListingPage(filtered, parseListingPage(rawPage));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["Store", PATHS.store], [category.name, category.href])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">{category.name}</h1>
      {items.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((product) => (
            <ListingCard
              key={product.slug}
              href={`${PATHS.store}/${product.slug}`}
              title={product.name}
              text={`₹${product.priceInr.toLocaleString("en-IN")}`}
              image={product.heroImage}
              imageAlt={product.heroImageAlt}
              badge={product.outOfStock ? t.common.outOfStock : undefined}
              footer={<AddToCartButton slug={product.slug} name={product.name} outOfStock={product.outOfStock} />}
            />
          ))}
        </div>
      ) : (
        <EmptyListing label="products in this category" />
      )}
      <ListingPager
        page={page}
        pages={pages}
        basePath={category.href}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
        pageOf={t.common.pageOf}
      />
    </div>
  );
}

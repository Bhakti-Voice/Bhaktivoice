import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getStoreCategory, listProducts } from "@/lib/content";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

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

export default async function StoreCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getStoreCategory(slug);
  if (!category) notFound();
  const [products, t] = await Promise.all([listProducts(), getMessages()]);
  const filtered = products.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["Store", PATHS.store], [category.name, category.href])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">{category.name}</h1>
      <SearchableCardGrid
        items={filtered.map((product) => ({
          slug: product.slug,
          href: `${PATHS.store}/${product.slug}`,
          title: product.name,
          text: `₹${product.priceInr.toLocaleString("en-IN")}`,
          image: product.heroImage,
          imageAlt: product.heroImageAlt,
          badge: product.outOfStock ? t.common.outOfStock : undefined,
          productName: product.name,
          outOfStock: product.outOfStock,
        }))}
        emptyKind="products"
        placeholder={t.common.listingSearch(category.name)}
      />
    </div>
  );
}

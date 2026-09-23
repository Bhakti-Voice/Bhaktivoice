import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ProductTrustBadges } from "@/components/store/ProductTrustBadges";
import { StoreCategoryFilter } from "@/components/store/StoreCategoryFilter";
import { getStoreCategory, listProducts } from "@/lib/content";
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
    path: `${PATHS.store}/category/${slug}`,
  });
}

export default async function StoreCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getStoreCategory(slug),
    listProducts(),
  ]);
  if (!category) notFound();

  const filtered = products.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12 space-y-8">
      <Breadcrumbs items={pageCrumbs(["Store", PATHS.store], [category.name, category.href])} />

      <div>
        <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-sm text-muted leading-relaxed max-w-3xl">
            {category.description}
          </p>
        )}
      </div>

      <ProductTrustBadges />

      <StoreCategoryFilter
        products={(filtered.length > 0 ? filtered : products).map((product) => ({
          slug: product.slug,
          name: product.name,
          priceInr: product.priceInr,
          heroImage: product.heroImage,
          heroImageAlt: product.heroImageAlt,
          categorySlug: product.categorySlug,
          outOfStock: product.outOfStock,
        }))}
      />
    </div>
  );
}

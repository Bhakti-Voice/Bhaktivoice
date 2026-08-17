import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { getProduct } from "@/lib/content";
import { productSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getProduct(slug);
  if (!page) return { title: "Product not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.store}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "website",
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getProduct(slug);
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={productSchema({
          name: page.name,
          description: page.metaDescription,
          image: page.heroImage,
          path: `${PATHS.store}/${page.slug}`,
          priceInr: page.priceInr,
        })}
      />
      <Breadcrumbs items={page.breadcrumbs} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">{page.categorySlug}</p>
          <h1 className="mt-2 font-serif text-3xl text-ink lg:text-4xl">{page.h1}</h1>
          <p className="mt-4 text-2xl text-saffron-deep">₹{page.priceInr.toLocaleString("en-IN")}</p>
          <CoverMedia
            src={page.heroImage}
            alt={page.heroImageAlt}
            className="mt-6 aspect-[2/1] w-full rounded-2xl"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <div className="mt-6">
            <AddToCartButton slug={page.slug} name={page.name} />
          </div>
          <ExpandableSection title="About this item" className="mt-6" collapsible={false}>
            <p className="leading-relaxed text-muted">{page.introduction}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{page.description}</p>
          </ExpandableSection>
          <FaqList faqs={page.faqs} />
        </div>
        <aside className="h-fit lg:sticky lg:top-24">
          <ContextualCta
            title={page.cta.title}
            body={page.cta.body}
            href={page.cta.href}
            label={page.cta.label}
          />
        </aside>
      </div>
    </article>
  );
}

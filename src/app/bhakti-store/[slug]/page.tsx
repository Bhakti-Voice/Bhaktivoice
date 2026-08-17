import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { getProduct } from "@/lib/content";
import { gatherRelated } from "@/lib/content/related";
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
  const related = gatherRelated(page);

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
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[32px] bg-sand">
          {page.heroImage ? (
            <MediaImage
              src={page.heroImage}
              alt={page.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">{page.categorySlug}</p>
          <h1 className="mt-2 font-serif text-4xl text-ink">{page.h1}</h1>
          <p className="mt-4 text-2xl text-saffron-deep">
            ₹{page.priceInr.toLocaleString("en-IN")}
          </p>
          <div className="mt-6">
            <AddToCartButton slug={page.slug} name={page.name} />
          </div>
          <ExpandableSection title="About this item" className="mt-6" collapsible={false}>
            <p className="leading-relaxed text-muted">{page.introduction}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{page.description}</p>
          </ExpandableSection>
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <FaqList faqs={page.faqs} />
          <RelatedContent links={related} />
        </div>
        <ContextualCta
          title={page.cta.title}
          body={page.cta.body}
          href={page.cta.href}
          label={page.cta.label}
        />
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProseText } from "@/components/content/SectionBody";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { ProductTrustBadges } from "@/components/store/ProductTrustBadges";
import { getProduct, listProducts } from "@/lib/content";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { productSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import { ProductCard } from "@/components/store/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

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
  const [page, allProducts, t, locale] = await Promise.all([
    getProduct(slug),
    listProducts(),
    getMessages(),
    getLocale(),
  ]);
  if (!page) notFound();

  const isHi = locale === "hi";
  const finalMrp = Math.round(page.priceInr * 1.35);
  const discountPercent = Math.round(((finalMrp - page.priceInr) / finalMrp) * 100);

  // Related products from store
  const relatedProducts = allProducts
    .filter((p) => p.slug !== page.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12 space-y-12">
      <JsonLd
        data={productSchema({
          name: page.name,
          description: page.metaDescription,
          image: page.heroImage,
          path: `${PATHS.store}/${page.slug}`,
          priceInr: page.priceInr,
          outOfStock: page.outOfStock,
        })}
      />

      <Breadcrumbs items={page.breadcrumbs} />

      {/* Main Product Showcase Grid */}
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Column: Image Media & Trust Badges (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[#fffbf7] to-white p-6 shadow-xs">
            <CoverMedia
              src={page.heroImage}
              alt={page.heroImageAlt}
              className={`${ARTICLE_COVER_CLASS} max-h-[460px] object-contain`}
              fit="contain"
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            {page.outOfStock ? (
              <span className="absolute top-4 left-4 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-xs">
                {isHi ? "स्टॉक समाप्त" : "Out of Stock"}
              </span>
            ) : discountPercent > 0 ? (
              <span className="absolute top-4 left-4 rounded-full bg-saffron-deep px-3 py-1 text-xs font-bold text-white shadow-xs">
                {discountPercent}% {isHi ? "छूट" : "OFF"}
              </span>
            ) : null}
          </div>

          <ProductTrustBadges />
        </div>

        {/* Right Column: Pricing, Buy Actions & Highlights (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                {page.categorySlug.replace(/^(local-dev-|store-)/, "")}
              </span>
              <h1 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
                {page.h1}
              </h1>

              {/* Rating */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-xs text-ink">4.9</span>
                </div>
                <span className="text-xs text-muted">• 128 {isHi ? "भक्तों की समीक्षा" : "Devotee Reviews"}</span>
                <span className="text-xs text-emerald-700 font-semibold">• 100% {isHi ? "प्रामाणिक" : "Authentic"}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="rounded-2xl bg-cream/40 p-4 border border-saffron/20">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-saffron-deep">
                  ₹{page.priceInr.toLocaleString("en-IN")}
                </span>
                {finalMrp > page.priceInr && (
                  <span className="text-sm text-muted line-through">
                    ₹{finalMrp.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    {isHi ? `${discountPercent}% की बचत` : `Save ${discountPercent}%`}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted">
                {isHi ? "सभी कर सम्मिलित • भारत भर में सुरक्षित प्रेषण" : "Inclusive of all taxes • Pan-India safe dispatch"}
              </p>
            </div>

            {/* Add to Cart & Buy Now */}
            <AddToCartButton
              slug={page.slug}
              name={page.name}
              priceInr={page.priceInr}
              image={page.heroImage}
              outOfStock={page.outOfStock}
            />

            {/* Quick Micro-Features */}
            <div className="space-y-2 border-t border-line/60 pt-4 text-xs text-ink/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isHi ? "100% शुद्ध एवं नैसर्गिक सामग्री" : "100% Pure & Natural Materials"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-saffron shrink-0" />
                <span>{isHi ? "₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी" : "Free Pan-India Delivery on orders over ₹499"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-saffron shrink-0" />
                <span>{isHi ? "दैनिक नाम जप एवं पूजन हेतु उपयुक्त" : "Ideal for daily Naam Jaap and Puja rituals"}</span>
              </div>
            </div>
          </div>

          {/* Sidebar CTA / Related */}
          <aside className="space-y-4">
            <ContextualCta
              title={page.cta.title}
              body={page.cta.body}
              href={page.cta.href}
              label={page.cta.label}
            />
            <YouTubeEmbed url={page.youtubeUrl} title={page.h1} compact />
          </aside>
        </div>
      </div>

      {/* Description & Spiritual Significance Accordions */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8 space-y-6">
        <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
          {isHi ? "सामग्री विवरण एवं आध्यात्मिक महत्व" : "Product Details & Spiritual Significance"}
        </h2>
        <div className="prose max-w-none text-ink/80 leading-relaxed text-sm sm:text-base">
          <ProseText text={page.introduction} className="text-muted leading-relaxed" />
          <ProseText text={page.description} className="mt-4 text-muted leading-relaxed" />
        </div>
      </div>

      {/* FAQs */}
      <FaqList faqs={page.faqs} title={isHi ? "अक्सर पूछे जाने वाले प्रश्न" : t.common.faqTitle} />

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            {isHi ? "अन्य आध्यात्मिक साधन सामग्री" : "Related Sadhana Companions"}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                priceInr={p.priceInr}
                heroImage={p.heroImage}
                heroImageAlt={p.heroImageAlt}
                categorySlug={p.categorySlug}
                outOfStock={p.outOfStock}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

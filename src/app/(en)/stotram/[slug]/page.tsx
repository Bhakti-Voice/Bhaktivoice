import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { StotramReader } from "@/components/stotram/StotramReader";
import { getStotram, listStotrams } from "@/lib/content";
import { getLocale } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { absoluteUrl } from "@/lib/seo/site";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await listStotrams();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [page, locale] = await Promise.all([getStotram(slug), getLocale()]);
  if (!page) return { title: "Stotram not found" };

  const isHi = locale === "hi";
  const isTe = locale === "te";

  const title = isHi
    ? page.titleHi || page.seoTitle
    : isTe
    ? page.titleTe
      ? `${page.titleTe} | భక్తి వాయిస్`
      : page.seoTitle
    : page.seoTitle;
  const description = isHi
    ? page.metaDescriptionHi || page.metaDescription
    : isTe
    ? page.metaDescriptionTe || page.metaDescription
    : page.metaDescription;

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.stotram}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function StotramDetailPage({ params }: Props) {
  const { slug } = await params;
  const [page, allStotrams, locale] = await Promise.all([
    getStotram(slug),
    listStotrams(),
    getLocale(),
  ]);

  if (!page) notFound();

  const isHi = locale === "hi";
  const isTe = locale === "te";

  // Breadcrumbs
  const breadcrumbItems = [
    { name: isHi ? "होम" : isTe ? "హోమ్" : "Home", href: "/" },
    { name: isHi ? "स्तोत्र संग्रह" : isTe ? "స్తోత్రాలు" : "Stotram", href: PATHS.stotram },
    {
      name: isHi ? page.titleHi || page.h1 : isTe ? page.titleTe || page.h1 : page.h1,
      href: `${PATHS.stotram}/${page.slug}`,
    },
  ];

  // Related Stotras (exclude current)
  const relatedStotras = allStotrams.filter((s) => s.slug !== page.slug).slice(0, 3);

  // Structured Data Schema (Article + FAQPage + Breadcrumbs)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    image: absoluteUrl(page.heroImage),
    datePublished: page.publishedAt,
    dateModified: page.updatedAt,
    author: {
      "@type": "Organization",
      name: "BhaktiVoice",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "BhaktiVoice",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`${PATHS.stotram}/${page.slug}`),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <article className="min-h-screen bg-[#fcf9f2] pb-16 pt-6">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Header Card */}
        <header className="mb-8 rounded-3xl border border-amber-200/90 bg-gradient-to-b from-white via-[#fffdfa] to-amber-50/40 p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              {isHi ? page.deityHi : isTe ? page.deityTe : page.deity}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-amber-800">
              {page.totalVerses} {isHi ? "श्लोक" : isTe ? "శ్లోకాలు" : "Verses"}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {isHi ? page.titleHi || page.h1 : isTe ? page.titleTe || page.h1 : page.h1}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base sm:leading-relaxed">
            {isHi
              ? page.introductionHi || page.introduction
              : isTe
              ? page.introductionTe || page.introduction
              : page.introduction}
          </p>
        </header>

        {/* Interactive Stotram Reader */}
        <StotramReader stotram={page} locale={locale} />

        {/* Bottom CTA Banner */}
        <div className="mt-12 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-serif text-xl font-bold sm:text-2xl">
                {isHi
                  ? "नित्य पाठ करें और आत्मिक शांति प्राप्त करें"
                  : isTe
                  ? "నిత్యం పారాయణ చేసి ప్రశాంతతను పొందండి"
                  : page.cta.title}
              </h3>
              <p className="mt-1 max-w-xl text-xs text-amber-100 sm:text-sm">
                {isHi
                  ? "हमारे डिजिटल नाम जाप काउंटर से अपने मंत्र जप और साधना को ट्रैक करें।"
                  : isTe
                  ? "మీ జపం మరియు దైవ సాధనను సులభంగా రికార్డ్ చేయడానికి డిజిటల్ నామ జపం వాడండి."
                  : page.cta.body}
              </p>
            </div>
            <LocaleLink
              href={page.cta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-amber-950 shadow-md transition-all hover:bg-amber-50 hover:scale-105 active:scale-95 sm:text-sm"
            >
              <span>
                {isHi
                  ? "डिजिटल नाम जाप शुरू करें"
                  : isTe
                  ? "డిజిటల్ నామ జపం ప్రారంభించండి"
                  : page.cta.label}
              </span>
              <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </div>

        {/* Related Stotras Section */}
        {relatedStotras.length > 0 && (
          <section className="mt-14 border-t border-amber-200/80 pt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 sm:text-2xl">
                  {isHi ? "अन्य कल्याणकारी स्तोत्र" : isTe ? "ఇతర పవిత్ర స్తోత్రాలు" : "Explore Related Sacred Stotras"}
                </h3>
                <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                  {isHi
                    ? "अपनी नित्य पूजा और साधना के लिए अन्य पावन स्तोत्रों का पाठ करें।"
                    : isTe
                    ? "మీ నిత్య పూజ మరియు సాధన కోసం ఇతర పవిత్ర స్తోత్రాలను పఠించండి."
                    : "Sacred hymns to enrich your morning puja and daily spiritual practice."}
                </p>
              </div>

              <LocaleLink
                href={PATHS.stotram}
                className="hidden text-xs font-bold text-amber-800 hover:underline sm:inline-block"
              >
                {isHi ? "सभी स्तोत्र देखें →" : isTe ? "అన్ని స్తోత్రాలు చూడండి →" : "View All Stotras →"}
              </LocaleLink>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedStotras.map((rel) => (
                <LocaleLink
                  key={rel.slug}
                  href={`/stotram/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-amber-200/80 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
                >
                  <div>
                    <span className="text-2xs font-semibold text-amber-700">
                      {isHi ? rel.deityHi : isTe ? rel.deityTe : rel.deity}
                    </span>
                    <h4 className="mt-1 font-serif text-sm font-bold text-neutral-900 group-hover:text-amber-700">
                      {isHi ? rel.titleHi || rel.h1 : isTe ? rel.titleTe || rel.h1 : rel.h1}
                    </h4>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-2xs font-medium text-neutral-500">
                    <span>
                      {rel.totalVerses} {isHi ? "श्लोक" : isTe ? "శ్లోకాలు" : "Verses"}
                    </span>
                    <span className="font-semibold text-amber-800 group-hover:underline">
                      {isHi ? "पढ़ें →" : isTe ? "చదవండి →" : "Read →"}
                    </span>
                  </div>
                </LocaleLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

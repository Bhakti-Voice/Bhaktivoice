import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, ListOrdered, UserCheck } from "lucide-react";
import { BlogShare } from "@/components/blog/BlogShare";
import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProseText } from "@/components/content/SectionBody";
import { getBlog } from "@/lib/content";
import { localizedArticleSchema } from "@/lib/seo/localized-schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import { RelatedLinksCard } from "@/components/seo/RelatedLinksCard";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getBlog(slug);
  if (!page) return { title: "Article not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.blog}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const page = await getBlog(slug);
  if (!page) notFound();
  const toc = (page.body ?? []).filter((section) => section.heading);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={await localizedArticleSchema({
          headline: page.h1,
          description: page.metaDescription,
          image: page.heroImage,
          datePublished: page.publishedAt,
          dateModified: page.updatedAt,
          author: page.author,
          path: `${PATHS.blog}/${page.slug}`,
        })}
      />
      <Breadcrumbs items={page.breadcrumbs} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              {page.category ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep border border-saffron/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron-deep" />
                  {page.category}
                </span>
              ) : null}
              {page.readingTime ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-muted">
                  <Clock className="h-3 w-3 text-saffron" />
                  {page.readingTime}
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {page.h1}
            </h1>

            {/* Author & Meta Deck */}
            <div className="mt-4 flex flex-wrap items-center gap-4 py-3 border-y border-[#eddcc9] text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff2e4] text-xs font-bold text-saffron-deep ring-1 ring-[#f3d2b3]">
                  {(page.author || "Bhakti").slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-ink flex items-center gap-1">
                    <span>{page.author || "Spiritual Guide"}</span>
                    <UserCheck className="h-3 w-3 text-saffron" />
                  </p>
                  <p className="text-[10px] text-muted">Vedic & Devotional Guide</p>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-line" />

              {page.updatedAt ? (
                <div className="flex items-center gap-1.5 text-muted">
                  <Calendar className="h-3.5 w-3.5 text-saffron" />
                  <span>Updated: {page.updatedAt}</span>
                </div>
              ) : null}
            </div>
          </header>

          {/* Hero Cover Media */}
          <CoverMedia
            src={page.heroImage}
            alt={page.heroImageAlt || page.title}
            className={ARTICLE_COVER_CLASS}
            fit="contain"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />

          {/* Editorial Lead Paragraph */}
          {page.introduction ? (
            <div className="editorial-lead mt-8 p-5 sm:p-6 shadow-sm">
              <ProseText
                text={page.introduction}
                className="text-base sm:text-lg leading-relaxed text-ink/90 font-medium"
              />
            </div>
          ) : null}

          {/* Table of Contents */}
          {toc.length > 1 ? (
            <nav
              aria-label="Table of contents"
              className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#fffdf9] to-[#fff6eb] p-6 ring-1 ring-[#e8dfd2] shadow-sm"
            >
              <div className="flex items-center gap-2 text-ink font-bold font-serif text-base sm:text-lg">
                <ListOrdered className="h-5 w-5 text-saffron" />
                <span>In this guide</span>
              </div>
              <ol className="mt-3.5 space-y-2 text-sm">
                {toc.map((section, idx) => (
                  <li key={section.heading} className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-saffron-deep ring-1 ring-saffron/20 shadow-xs">
                      {idx + 1}
                    </span>
                    <a
                      href={`#${section.heading?.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-ink/80 transition-colors hover:text-saffron-deep hover:underline underline-offset-4"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {/* Article Sections */}
          <div className="mt-8 space-y-8">
            {(page.body ?? []).map((section) => {
              const headingId = section.heading?.toLowerCase().replace(/\s+/g, "-");
              return (
                <section
                  key={section.heading ?? section.paragraphs[0]?.slice(0, 24)}
                  id={headingId}
                  className="scroll-mt-24"
                >
                  {section.heading ? (
                    <div className="mb-3">
                      <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                        {section.heading}
                      </h2>
                      <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-saffron to-amber-300 rounded-full" />
                    </div>
                  ) : null}
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <ProseText
                        key={paragraph.slice(0, 40)}
                        text={paragraph}
                        className="text-base sm:text-[17px] leading-relaxed text-ink/85 font-normal"
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Tags */}
          {page.tags?.length ? (
            <div className="mt-10 pt-6 border-t border-line">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Related Topics</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sand px-3.5 py-1 text-xs font-medium text-ink ring-1 ring-line"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* FAQ Accordion */}
          <FaqList faqs={page.faqs ?? []} className="mt-12" />
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <BlogShare title={page.title} path={`${PATHS.blog}/${page.slug}`} />
          <ContextualCta
            title="Start Jaap"
            body="A short mala after reading is how sacred wisdom translates into peaceful sadhana."
            href="/naam-jaap"
            label="Start 108 Naam Jaap"
            tone="saffron"
          />
          <YouTubeEmbed url={page.youtubeUrl} title={page.h1} compact />
          <RelatedLinksCard
            relatedLink={page.relatedLink}
            relatedPosts={(page.relatedContent ?? []).map((item) => ({
              title: item.text,
              url: item.href,
            }))}
          />
        </aside>
      </div>
    </article>
  );
}


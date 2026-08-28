import type { ReactNode } from "react";
import { Calendar, UserCheck } from "lucide-react";
import { BlogShare } from "@/components/blog/BlogShare";
import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinksCard } from "@/components/seo/RelatedLinksCard";
import { ProseText } from "@/components/content/SectionBody";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import type { SeoPage } from "@/lib/content/types";
import { localizedArticleSchema } from "@/lib/seo/localized-schema";

export async function ArticleLayout({
  page,
  path,
  children,
  lead,
  schema,
  coverClassName = ARTICLE_COVER_CLASS,
}: {
  page: SeoPage;
  path: string;
  children?: ReactNode;
  lead?: ReactNode;
  schema?: object | null;
  coverClassName?: string;
}) {
  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={
          schema ??
          (await localizedArticleSchema({
            headline: page.h1,
            description: page.metaDescription,
            image: page.heroImage,
            datePublished: page.publishedAt,
            dateModified: page.updatedAt,
            author: page.author,
            path,
          }))
        }
      />
      <Breadcrumbs items={page.breadcrumbs} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <header>
            {page.category ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep border border-saffron/20">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron-deep" />
                {page.category}
              </span>
            ) : null}

            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {page.h1}
            </h1>

            {/* Author & Verification deck */}
            <div className="mt-4 flex flex-wrap items-center gap-4 py-3 border-y border-[#eddcc9] text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff2e4] text-xs font-bold text-saffron-deep ring-1 ring-[#f3d2b3]">
                  {(page.author || "Bhakti").slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-ink flex items-center gap-1">
                    <span>{page.author || "Vedic Traditions"}</span>
                    <UserCheck className="h-3 w-3 text-saffron" />
                  </p>
                  <p className="text-[10px] text-muted">Sacred Knowledge</p>
                </div>
              </div>

              {page.updatedAt ? (
                <>
                  <div className="hidden sm:block h-6 w-px bg-line" />
                  <div className="flex items-center gap-1.5 text-muted">
                    <Calendar className="h-3.5 w-3.5 text-saffron" />
                    <span>Updated: {page.updatedAt}</span>
                  </div>
                </>
              ) : null}
            </div>
          </header>

          {/* Hero Cover Media */}
          {page.heroImage ? (
            <CoverMedia
              src={page.heroImage}
              alt={page.heroImageAlt || page.title}
              className={coverClassName}
              fit="contain"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          ) : null}

          {/* Lead Section (e.g. Mantra Sanctum, Temple Attributes, etc.) */}
          {lead ? <div className="mt-6">{lead}</div> : null}

          {/* Introduction Block */}
          {page.introduction ? (
            <div className="editorial-lead mt-8 p-5 sm:p-6 shadow-xs">
              <ProseText
                text={page.introduction}
                className="text-base sm:text-lg leading-relaxed text-ink/90 font-medium"
              />
            </div>
          ) : null}

          {/* Main Article Body / Sections */}
          {children ? <div className="mt-8 space-y-8">{children}</div> : null}

          {/* FAQ List */}
          <FaqList faqs={page.faqs ?? []} className="mt-12" />
        </div>

        {/* Sticky Sidebar */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <BlogShare title={page.title} path={path} />
          {page.cta ? (
            <ContextualCta
              title={page.cta.title}
              body={page.cta.body}
              href={page.cta.href}
              label={page.cta.label}
              tone="saffron"
            />
          ) : null}
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


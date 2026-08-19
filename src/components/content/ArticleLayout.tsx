import type { ReactNode } from "react";
import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProseText } from "@/components/content/SectionBody";
import type { SeoPage } from "@/lib/content/types";
import { articleSchema } from "@/lib/seo/schema";

export function ArticleLayout({
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
          articleSchema({
            headline: page.h1,
            description: page.metaDescription,
            image: page.heroImage,
            datePublished: page.publishedAt,
            dateModified: page.updatedAt,
            author: page.author,
            path,
          })
        }
      />
      <Breadcrumbs items={page.breadcrumbs} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">{page.category}</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-ink lg:text-4xl">{page.h1}</h1>
          <CoverMedia
            src={page.heroImage}
            alt={page.heroImageAlt}
            className={coverClassName}
            fit="contain"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          {lead ? <div className="mt-6">{lead}</div> : null}
          <ExpandableSection title="Read this page" className="mt-8" collapsible={false}>
            <ProseText
              text={page.introduction}
              className="max-w-3xl text-lg leading-relaxed text-muted"
            />
            <div className="mt-6">{children}</div>
          </ExpandableSection>
          <FaqList faqs={page.faqs ?? []} />
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

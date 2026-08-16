import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { gatherRelated } from "@/lib/content/related";
import type { SeoPage } from "@/lib/content/types";
import { articleSchema } from "@/lib/seo/schema";

export function ArticleLayout({
  page,
  path,
  children,
  lead,
  schema,
  relatedTitle = "Continue the journey",
}: {
  page: SeoPage;
  path: string;
  children?: ReactNode;
  lead?: ReactNode;
  schema?: object | null;
  relatedTitle?: string;
}) {
  const related = gatherRelated(page);

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
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-saffron">{page.category}</p>
      <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-tight text-ink lg:text-5xl">
        {page.h1}
      </h1>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-sand">
        {page.heroImage ? (
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        ) : null}
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {lead}
          <ExpandableSection title="Read this page" className={lead ? "mt-3" : "mt-0"}>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">{page.introduction}</p>
            <div className="mt-6">{children}</div>
          </ExpandableSection>
          <FaqList faqs={page.faqs ?? []} />
          <RelatedContent title={relatedTitle} links={related} />
        </div>
        <div className="h-fit lg:sticky lg:top-24">
          <ContextualCta
            title={page.cta.title}
            body={page.cta.body}
            href={page.cta.href}
            label={page.cta.label}
          />
        </div>
      </div>
    </article>
  );
}

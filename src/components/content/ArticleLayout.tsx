import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import type { SeoPage } from "@/lib/content/types";
import { localizedArticleSchema } from "@/lib/seo/localized-schema";
import { SacredDetailLayout } from "@/components/content/SacredDetailLayout";
import { ARTICLE_COVER_CLASS } from "@/components/media/CoverMedia";

export async function ArticleLayout({
  page,
  path,
  children,
  lead,
  schema,
  coverClassName = ARTICLE_COVER_CLASS,
  hideCta = false,
}: {
  page: SeoPage;
  path: string;
  children?: ReactNode;
  lead?: ReactNode;
  schema?: object | null;
  coverClassName?: string;
  hideCta?: boolean;
}) {
  const relatedPosts = (page.relatedContent ?? []).map((item) => ({
    title: item.text,
    url: item.href,
    readingTime: "5 min read",
  }));

  return (
    <>
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
      <SacredDetailLayout
        title={page.title}
        h1={page.h1}
        subtitle={page.metaDescription}
        category={page.category}
        breadcrumbs={page.breadcrumbs}
        path={path}
        author={page.author}
        publishedAt={page.publishedAt}
        updatedAt={page.updatedAt}
        heroImage={page.heroImage}
        heroImageAlt={page.heroImageAlt}
        introduction={page.introduction}
        tags={page.tags}
        faqs={page.faqs}
        youtubeUrl={page.youtubeUrl}
        relatedPosts={relatedPosts}
        cta={!hideCta ? page.cta : undefined}
      >
        {lead ? <div className="mb-8">{lead}</div> : null}
        {children}
      </SacredDetailLayout>
    </>
  );
}


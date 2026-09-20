import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlog } from "@/lib/content";
import { localizedArticleSchema } from "@/lib/seo/localized-schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SacredDetailLayout } from "@/components/content/SacredDetailLayout";

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

  const numberedSections = (page.body ?? []).map((section) => ({
    heading: section.heading,
    paragraphs: section.paragraphs,
  }));

  const relatedPosts = (page.relatedContent ?? []).map((item) => ({
    title: item.text,
    url: item.href,
    readingTime: "6 min read",
  }));

  return (
    <>
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

      <SacredDetailLayout
        title={page.title}
        h1={page.h1}
        subtitle={page.metaDescription}
        category={page.category}
        readingTime={page.readingTime}
        breadcrumbs={page.breadcrumbs}
        path={`${PATHS.blog}/${page.slug}`}
        author={page.author}
        publishedAt={page.publishedAt}
        updatedAt={page.updatedAt}
        heroImage={page.heroImage}
        heroImageAlt={page.heroImageAlt}
        introduction={page.introduction}
        numberedSections={numberedSections}
        tags={page.tags}
        faqs={page.faqs}
        youtubeUrl={page.youtubeUrl}
        relatedPosts={relatedPosts}
        cta={page.cta}
      />
    </>
  );
}

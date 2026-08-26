import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">{page.category}</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-ink lg:text-4xl">{page.h1}</h1>
          <p className="mt-3 text-sm text-muted">
            {page.author} · {page.readingTime} · Updated {page.updatedAt}
          </p>
          <CoverMedia
            src={page.heroImage}
            alt={page.heroImageAlt}
            className={ARTICLE_COVER_CLASS}
            fit="contain"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <ProseText
            text={page.introduction}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-muted"
          />
          {toc.length ? (
            <nav className="mt-6 rounded-3xl bg-cream p-5 text-sm ring-1 ring-line">
              <p className="font-medium text-ink">In this guide</p>
              <ol className="mt-2 space-y-1 text-muted">
                {toc.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${section.heading?.toLowerCase().replace(/\s+/g, "-")}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {(page.body ?? []).map((section) => (
            <section
              key={section.heading ?? section.paragraphs[0]?.slice(0, 24)}
              id={section.heading?.toLowerCase().replace(/\s+/g, "-")}
              className="mt-8"
            >
              {section.heading ? <h2 className="font-serif text-2xl text-ink">{section.heading}</h2> : null}
              {section.paragraphs.map((paragraph) => (
                <ProseText
                  key={paragraph.slice(0, 40)}
                  text={paragraph}
                  className="mt-3 leading-relaxed text-muted"
                />
              ))}
            </section>
          ))}
          <FaqList faqs={page.faqs} />
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <BlogShare title={page.title} path={`${PATHS.blog}/${page.slug}`} />
          <ContextualCta
            title="Start Jaap"
            body="A short mala after reading is how a guide becomes a day."
            href="/naam-jaap"
            label="Start 108 Naam Jaap"
          />
          <YouTubeEmbed url={page.youtubeUrl} title={page.h1} compact />
          <RelatedLinksCard
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

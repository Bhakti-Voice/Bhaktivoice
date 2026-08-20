import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KathaSeriesView } from "@/components/katha/KathaSeriesView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getKatha } from "@/lib/content";
import { localizedArticleSchema } from "@/lib/seo/localized-schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getKatha(slug);
  if (!page) return { title: "Katha not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.katha}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function KathaDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getKatha(slug);
  if (!page) notFound();

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
          path: `${PATHS.katha}/${page.slug}`,
        })}
      />
      <KathaSeriesView series={page} />
    </>
  );
}

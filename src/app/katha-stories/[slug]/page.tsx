import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KathaSeriesView } from "@/components/katha/KathaSeriesView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getKatha } from "@/lib/content";
import { articleSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ listen?: string }> };

export const dynamic = "force-dynamic";

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

export default async function KathaDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { listen } = await searchParams;
  const page = await getKatha(slug);
  if (!page) notFound();
  const autoListen = listen === "1" || listen === "true";

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: page.h1,
          description: page.metaDescription,
          image: page.heroImage,
          datePublished: page.publishedAt,
          dateModified: page.updatedAt,
          author: page.author,
          path: `${PATHS.katha}/${page.slug}`,
        })}
      />
      <KathaSeriesView series={page} autoListen={autoListen} />
    </>
  );
}

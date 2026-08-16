import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { YatraDetailView } from "@/components/yatra/YatraDetailView";
import { getYatra } from "@/lib/content";
import {
  articleSchema,
  touristDestinationSchema,
} from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getYatra(slug);
  if (!page) return { title: "Yatra not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.yatra}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function YatraDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getYatra(slug);
  if (!page) notFound();

  const mainSchema =
    page.schemaType === "TouristDestination"
      ? touristDestinationSchema({
          name: page.h1,
          description: page.metaDescription,
          image: page.heroImage,
          path: `${PATHS.yatra}/${page.slug}`,
        })
      : articleSchema({
          headline: page.h1,
          description: page.metaDescription,
          image: page.heroImage,
          datePublished: page.publishedAt,
          dateModified: page.updatedAt,
          author: page.author,
          path: `${PATHS.yatra}/${page.slug}`,
        });

  return (
    <>
      <JsonLd data={mainSchema} />
      <YatraDetailView page={page} />
    </>
  );
}

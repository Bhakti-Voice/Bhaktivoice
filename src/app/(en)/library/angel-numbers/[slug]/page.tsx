import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAngelNumber, listAngelNumbers } from "@/lib/content";
import { AngelNumberDetailView } from "@/components/angel-numbers/AngelNumberDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getAngelNumber(slug);
  if (!page) return { title: "Angel Number Not Found | BhaktiVoice" };

  return localizedMetadata({
    title: page.seoTitle || page.title,
    description: page.metaDescription || page.introduction,
    path: `${PATHS.angelNumbers}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt || page.title,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author || "Bhakti Voice Spiritual Desk"],
  });
}

export default async function AngelNumberDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getAngelNumber(slug);
  if (!page) notFound();

  const allNumbers = await listAngelNumbers();
  const related = allNumbers.filter((item) => item.slug !== page.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1 || page.title,
    description: page.metaDescription || page.introduction,
    image: page.heroImage ? [page.heroImage] : undefined,
    datePublished: page.publishedAt,
    dateModified: page.updatedAt || page.publishedAt,
    author: {
      "@type": "Organization",
      name: page.author || "Bhakti Voice",
      url: "https://bhaktivoice.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Bhakti Voice",
      url: "https://bhaktivoice.com",
      logo: {
        "@type": "ImageObject",
        url: "https://bhaktivoice.com/images/brand/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bhaktivoice.com${PATHS.angelNumbers}/${page.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <AngelNumberDetailView page={page} related={related} />
    </>
  );
}

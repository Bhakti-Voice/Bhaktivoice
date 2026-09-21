import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAngelNumber, listAngelNumbers } from "@/lib/content";
import { AngelNumberDetailView } from "@/components/angel-numbers/AngelNumberDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { getLocale } from "@/lib/i18n/server";
import { withLocale } from "@/lib/i18n/config";
import type { AngelNumberPage } from "@/lib/content/types";

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

/**
 * Deterministic pseudo-random selection of 10 items from DB:
 * 1. Seeded by current slug so Googlebot and users always see stable, consistent links per page (zero SEO churn / zero hydration mismatch).
 * 2. Each page shows a different set of 10 real angel numbers from the DB.
 * 3. Never produces 404 links since every item is fetched directly from the database.
 */
function getSeededRandomRelated(pool: AngelNumberPage[], currentSlug: string, count = 10): AngelNumberPage[] {
  if (pool.length <= count) return pool;

  let seed = 0;
  for (let i = 0; i < currentSlug.length; i++) {
    seed = (seed * 31 + currentSlug.charCodeAt(i)) & 0xffffffff;
  }

  const prng = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export default async function AngelNumberDetailPage({ params }: Props) {
  const { slug } = await params;
  const [page, allNumbers, locale] = await Promise.all([
    getAngelNumber(slug),
    listAngelNumbers(),
    getLocale(),
  ]);
  if (!page) notFound();

  const candidatePool = allNumbers.filter((item) => item.slug !== page.slug);
  const related = getSeededRandomRelated(candidatePool, page.slug, 10);

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
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Bhakti Voice",
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/brand/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${withLocale(`${PATHS.angelNumbers}/${page.slug}`, locale)}`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <AngelNumberDetailView page={page} related={related} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { SectionBody } from "@/components/content/SectionBody";
import { getBhajan } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getBhajan(slug);
  if (!page) return { title: "Bhajan not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.bhajan}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function BhajanDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getBhajan(slug);
  if (!page) notFound();
  return (
    <ArticleLayout page={page} path={`${PATHS.bhajan}/${page.slug}`}>
      {(page.sections ?? []).map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
          <SectionBody body={section.body} />
        </section>
      ))}
    </ArticleLayout>
  );
}

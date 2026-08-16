import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getFestival } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getFestival(slug);
  if (!page) return { title: "Festival not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.festivals}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function FestivalDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getFestival(slug);
  if (!page) notFound();

  return (
    <ArticleLayout
      page={page}
      path={`${PATHS.festivals}/${page.slug}`}
      lead={<p className="rounded-3xl bg-cream p-5 text-sm text-muted">{page.dateNote}</p>}
    >
      <section>
        <h2 className="font-serif text-2xl text-ink">The story</h2>
        <p className="mt-3 leading-relaxed text-muted">{page.story}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Traditions</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {(page.traditions ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Puja at home</h2>
        <p className="mt-3 leading-relaxed text-muted">{page.puja}</p>
      </section>
    </ArticleLayout>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getMantra } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMantra(slug);
  if (!page) return { title: "Mantra not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.mantras}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function MantraDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getMantra(slug);
  if (!page) notFound();

  return (
    <ArticleLayout
      page={page}
      path={`${PATHS.mantras}/${page.slug}`}
      relatedTitle="Related mantras and paths"
      lead={
        <div className="rounded-3xl bg-cream p-6 ring-1 ring-line">
          <p className="font-serif text-2xl text-ink">{page.mantra}</p>
          <p className="mt-2 text-sm text-muted">{page.pronunciation}</p>
          <p className="mt-3 text-sm text-ink">
            <strong>Suggested count:</strong> {page.suggestedCount}
          </p>
          <p className="mt-1 text-sm text-ink">
            <strong>Deity:</strong> {page.deity}
          </p>
          <Link
            href="/naam-jaap"
            className="mt-5 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
          >
            Start 108 Naam Jaap
          </Link>
        </div>
      }
    >
      <section>
        <h2 className="font-serif text-2xl text-ink">How to chant</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          {(page.howToChant ?? []).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Significance</h2>
        <p className="mt-3 leading-relaxed text-muted">{page.significance}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Traditional benefits</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {(page.traditionalBenefits ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </ArticleLayout>
  );
}

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
      <div className="space-y-6">
        {(page.sections ?? []).map((section) => (
          <section
            key={section.heading}
            className="verse-sacred-card p-6 sm:p-8 ring-1 ring-[#eedec9] shadow-2xs hover:shadow-xs transition-shadow"
          >
            {section.heading ? (
              <div className="mb-4 text-center sm:text-left">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">{section.heading}</h2>
                <div className="mt-2 h-0.5 w-10 bg-saffron/40 rounded-full mx-auto sm:mx-0" />
              </div>
            ) : null}
            <SectionBody body={section.body} />
          </section>
        ))}
      </div>
    </ArticleLayout>
  );
}


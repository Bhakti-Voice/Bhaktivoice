import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getTemple } from "@/lib/content";
import { touristAttractionSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SectionBody } from "@/components/content/SectionBody";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getTemple(slug);
  if (!page) return { title: "Temple not found" };
  return localizedMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${PATHS.temples}/${page.slug}`,
    image: page.heroImage,
    imageAlt: page.heroImageAlt,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
    authors: [page.author],
  });
}

export default async function TempleDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getTemple(slug);
  if (!page) notFound();

  return (
    <ArticleLayout
      page={page}
      path={`${PATHS.temples}/${page.slug}`}
      schema={touristAttractionSchema({
        name: page.h1,
        description: page.metaDescription,
        image: page.heroImage,
        path: `${PATHS.temples}/${page.slug}`,
      })}
      lead={
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-cream p-5">
            <dt className="text-xs uppercase tracking-wide text-saffron">Deity</dt>
            <dd className="mt-1 text-ink">{page.deity}</dd>
          </div>
          <div className="rounded-3xl bg-cream p-5">
            <dt className="text-xs uppercase tracking-wide text-saffron">Location</dt>
            <dd className="mt-1 text-ink">{page.location}</dd>
          </div>
        </dl>
      }
    >
      {[
        { heading: "History", body: page.history },
        { heading: "Architecture", body: page.architecture },
        { heading: "Best time", body: page.bestTime },
        { heading: "Timings", body: page.timingsNote },
        { heading: "Darshan", body: page.darshanNote },
        { heading: "How to reach", body: page.howToReach },
      ].map((section) => (
        <section key={section.heading} className="mt-8 first:mt-0">
          <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
          <SectionBody body={section.body} />
        </section>
      ))}
      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Nearby</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
          {(page.nearbyPlaces ?? []).map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>
      </section>
    </ArticleLayout>
  );
}

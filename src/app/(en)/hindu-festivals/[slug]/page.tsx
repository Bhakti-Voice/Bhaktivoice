import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getFestival } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { ProseText, SectionBody } from "@/components/content/SectionBody";
import { getLocale } from "@/lib/i18n/server";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

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

  const locale = await getLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const hasDateNote = Boolean(page.dateNote && page.dateNote.trim().length > 0);
  const hasMonthHint = Boolean(page.monthHint && page.monthHint.trim().length > 0);
  const storyHasHeading = /^\s*(?:<h[1-6]|#{1,6}\s+)/i.test(page.story || "");
  const pujaHasHeading = /^\s*(?:<h[1-6]|#{1,6}\s+)/i.test(page.puja || "");
  const sectionsList = (page as unknown as { sections?: { heading?: string; body: string }[] }).sections;

  return (
    <ArticleLayout
      page={page}
      path={`${PATHS.festivals}/${page.slug}`}
      lead={
        hasDateNote || hasMonthHint ? (
          <div className="rounded-3xl border border-saffron/25 bg-gradient-to-br from-[#fffbf4] to-[#fdf5ea] p-5 sm:p-6 shadow-xs">
            {hasMonthHint ? (
              <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold text-saffron-deep border border-saffron/20">
                <span>🗓️</span>
                <span>{page.monthHint}</span>
              </div>
            ) : null}
            {hasDateNote ? (
              <ProseText
                text={page.dateNote}
                className="text-sm sm:text-[15px] font-medium leading-relaxed text-ink/90"
              />
            ) : null}
          </div>
        ) : undefined
      }
    >
      {/* Primary Festival Story & Significance */}
      {page.story && page.story.trim().length > 0 ? (
        <section>
          {!storyHasHeading ? (
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                {isTe ? "కథ మరియు పౌరాణిక ప్రాముఖ్యత" : isHi ? "कथा एवं पौराणिक महत्व" : "The story & significance"}
              </h2>
              <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-saffron to-amber-300 rounded-full" />
            </div>
          ) : null}
          <SectionBody body={page.story} />
        </section>
      ) : null}

      {/* Structured Sections if available */}
      {sectionsList && sectionsList.length > 0 ? (
        <div className="mt-10 space-y-6">
          {sectionsList.map((sec, idx) => (
            <section
              key={sec.heading || idx}
              className="rounded-3xl border border-[#eedec9] bg-white p-6 sm:p-8 shadow-xs"
            >
              {sec.heading ? (
                <div className="mb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">{sec.heading}</h2>
                  <div className="mt-2 h-0.5 w-10 bg-saffron/40 rounded-full" />
                </div>
              ) : null}
              <SectionBody body={sec.body} />
            </section>
          ))}
        </div>
      ) : null}

      {/* Festival Traditions & Customs */}
      {page.traditions && page.traditions.length > 0 ? (
        <section className="mt-10 rounded-3xl border border-[#eedec9] bg-gradient-to-br from-[#fffdf9] to-[#fff8ef] p-6 sm:p-8 shadow-xs">
          <div className="mb-4">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              {isTe ? "పండుగ యొక్క ముఖ్య సంప్రదాయాలు & ఆచారాలు" : isHi ? "त्योहार की मुख्य परंपराएं एवं नियम" : "Traditions & Sacred Customs"}
            </h2>
            <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-saffron to-amber-300 rounded-full" />
          </div>
          <ul className="mt-4 space-y-2.5">
            {page.traditions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-[11px] font-bold text-saffron-deep ring-1 ring-saffron/30">
                  ✓
                </span>
                <ProseText as="span" text={item} className="text-base leading-relaxed text-ink/90 font-medium" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Puja Vidhi at Home */}
      {page.puja && page.puja.trim().length > 0 ? (
        <section className="mt-10">
          {!pujaHasHeading ? (
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                {isTe ? "ఇంట్లో సులభమైన పూజా విధానం" : isHi ? "घर पर सरल पूजा विधि" : "Puja Vidhi & Rituals at Home"}
              </h2>
              <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-saffron to-amber-300 rounded-full" />
            </div>
          ) : null}
          <SectionBody body={page.puja} />
        </section>
      ) : null}
    </ArticleLayout>
  );
}


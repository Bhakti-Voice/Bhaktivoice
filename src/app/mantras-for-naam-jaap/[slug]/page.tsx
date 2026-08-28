import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { notFound } from "next/navigation";
import { CheckCircle2, Flame, HeartHandshake, Play, Sparkles } from "lucide-react";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getMantra } from "@/lib/content";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { ProseText, SectionBody } from "@/components/content/SectionBody";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

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
      lead={
        <div className="mantra-sanctum rounded-3xl p-6 sm:p-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sacred Chanting Sanctum</span>
            </span>

            <div className="mt-5 rounded-2xl bg-white/80 p-5 sm:p-7 shadow-xs ring-1 ring-saffron/20 backdrop-blur-xs">
              <ProseText
                text={page.mantra}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-[#4a1014] leading-relaxed"
              />
              {page.pronunciation ? (
                <div className="mt-3 inline-block rounded-full bg-sand/80 px-4 py-1 text-xs sm:text-sm font-medium italic text-muted">
                  {page.pronunciation}
                </div>
              ) : null}
            </div>

            {/* Quick Metadata Attributes Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-white/90 p-3.5 ring-1 ring-line/80 shadow-2xs">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-saffron-deep">Presiding Deity</p>
                <p className="mt-1 font-serif text-base font-bold text-ink">{page.deity || "Supreme Divine"}</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3.5 ring-1 ring-line/80 shadow-2xs">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-saffron-deep">Suggested Count</p>
                <p className="mt-1 font-serif text-base font-bold text-ink">{page.suggestedCount || "108 Times (1 Mala)"}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LocaleLink
                href="/naam-jaap"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-6 py-3 text-sm font-bold text-white shadow-md shadow-saffron/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-saffron/30"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Start 108 Naam Jaap</span>
              </LocaleLink>
            </div>
          </div>
        </div>
      }
    >
      {/* How to Chant: Step-by-Step Pathway */}
      {page.howToChant?.length ? (
        <section aria-labelledby="how-to-chant-heading" className="mt-8">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-saffron" />
            <h2 id="how-to-chant-heading" className="font-serif text-2xl font-bold text-ink">
              How to chant & perform sadhana
            </h2>
          </div>
          <div className="mt-4 space-y-3">
            {page.howToChant.map((step, idx) => (
              <div
                key={step.slice(0, 30)}
                className="flex items-start gap-3.5 rounded-2xl bg-white p-4 sm:p-5 ring-1 ring-[#eedec9] shadow-2xs transition-colors hover:bg-[#fffdfa]"
              >
                <span className="step-indicator-glow inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff2e4] text-xs font-bold text-saffron-deep ring-1 ring-saffron/30">
                  {idx + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <ProseText text={step} className="text-sm sm:text-base leading-relaxed text-ink/85 font-normal" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Significance */}
      {page.significance ? (
        <section aria-labelledby="significance-heading" className="mt-10">
          <h2 id="significance-heading" className="font-serif text-2xl font-bold text-ink">
            Spiritual significance
          </h2>
          <div className="mt-3 rounded-2xl bg-white/60 p-5 sm:p-6 ring-1 ring-[#eedec9]">
            <SectionBody body={page.significance} />
          </div>
        </section>
      ) : null}

      {/* Traditional Benefits & Phalasruti */}
      {page.traditionalBenefits?.length ? (
        <section aria-labelledby="benefits-heading" className="mt-10">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-saffron" />
            <h2 id="benefits-heading" className="font-serif text-2xl font-bold text-ink">
              Traditional benefits & phalasruti
            </h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {page.traditionalBenefits.map((benefit) => (
              <div
                key={benefit.slice(0, 30)}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#eedec9] shadow-2xs"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <ProseText text={benefit} className="text-sm leading-relaxed text-ink/85" />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </ArticleLayout>
  );
}


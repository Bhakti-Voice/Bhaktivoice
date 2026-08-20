import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { KathaNarrator } from "@/components/katha/KathaNarrator";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { ProseText } from "@/components/content/SectionBody";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import type { KathaSeries } from "@/lib/content/types";
import { Suspense } from "react";

export function KathaSeriesView({
  series,
}: {
  series: KathaSeries;
  autoListen?: boolean;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={series.breadcrumbs} />
      <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.4fr)_320px]">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">{series.category}</p>
          <h1 className="mt-2 font-serif text-3xl text-ink lg:text-4xl">{series.h1}</h1>
          <ProseText text={series.subtitle} className="mt-2 text-lg text-muted" />
          <Suspense fallback={null}>
            <KathaNarrator
              title={series.h1}
              subtitle={series.subtitle}
              introduction={series.introduction}
              language={series.language}
              episodes={series.episodes}
            />
          </Suspense>
          <CoverMedia
            src={series.heroImage}
            alt={series.heroImageAlt}
            className={ARTICLE_COVER_CLASS}
            fit="contain"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
            <span>{series.language}</span>
            <span>·</span>
            <span>{series.duration}</span>
            <span>·</span>
            <span>
              ★ {series.rating || "0"} ({series.ratingsCount || "0"})
            </span>
          </div>

          <ExpandableSection title="Overview" className="mt-8" collapsible={false}>
            <ProseText text={series.introduction} className="text-base leading-relaxed text-ink" />
          </ExpandableSection>

          <ExpandableSection title="Episodes" id="episodes" collapsible={false}>
            <ol className="space-y-3">
              {(series.episodes ?? []).map((episode) => (
                <li key={episode.number} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
                  <p className="text-xs text-saffron">Episode {episode.number}</p>
                  <h2 className="mt-1 font-serif text-xl text-ink">{episode.title}</h2>
                  <ProseText text={episode.summary} className="mt-2 text-sm text-muted" />
                  <p className="mt-2 text-xs text-muted">{episode.duration}</p>
                </li>
              ))}
            </ol>
          </ExpandableSection>

          <FaqList faqs={series.faqs ?? []} />
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-[28px] bg-[#f8efe4] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-saffron-deep">Inspired</p>
            <h2 className="mt-2 font-serif text-2xl text-ink">Carry the katha into a mala</h2>
            <p className="mt-2 text-sm text-muted">
              After listening, sit for 108 of the naam that the story left in your mouth.
            </p>
            <LocaleLink
              href="/naam-jaap"
              className="mt-4 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
            >
              Start Jaap
            </LocaleLink>
          </div>
          <ContextualCta
            title={series.cta.title}
            body={series.cta.body}
            href={series.cta.href}
            label={series.cta.label}
            tone="navy"
          />
          <YouTubeEmbed url={series.youtubeUrl} title={series.h1} compact />
        </aside>
      </div>
    </div>
  );
}

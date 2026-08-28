import { Headphones, Radio, Sparkles, Star } from "lucide-react";
import { ARTICLE_COVER_CLASS, CoverMedia } from "@/components/media/CoverMedia";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { BlogShare } from "@/components/blog/BlogShare";
import { KathaNarrator } from "@/components/katha/KathaNarrator";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { ProseText } from "@/components/content/SectionBody";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import { RelatedLinksCard } from "@/components/seo/RelatedLinksCard";
import type { KathaSeries } from "@/lib/content/types";
import { PATHS } from "@/lib/seo/paths";
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
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep border border-saffron/20">
                <Radio className="h-3.5 w-3.5" />
                <span>{series.category || "Katha & Stories"}</span>
              </span>
              {series.language ? (
                <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-muted">
                  {series.language}
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">{series.h1}</h1>
            {series.subtitle ? (
              <ProseText text={series.subtitle} className="mt-2 text-base sm:text-lg text-muted" />
            ) : null}
          </header>

          <div className="mt-5">
            <Suspense fallback={null}>
              <KathaNarrator
                title={series.h1}
                subtitle={series.subtitle}
                introduction={series.introduction}
                language={series.language}
                episodes={series.episodes}
              />
            </Suspense>
          </div>

          <CoverMedia
            src={series.heroImage}
            alt={series.heroImageAlt || series.title}
            className={ARTICLE_COVER_CLASS}
            fit="contain"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted">
            <span className="font-semibold text-ink">{series.language}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Headphones className="h-3.5 w-3.5 text-saffron" />
              {series.duration}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-semibold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{series.rating || "5.0"}</span>
              <span className="text-muted font-normal">({series.ratingsCount || "108+"} reviews)</span>
            </span>
          </div>

          <div className="editorial-lead mt-8 p-5 sm:p-6 shadow-xs">
            <ProseText text={series.introduction} className="text-base sm:text-lg leading-relaxed text-ink/90 font-medium" />
          </div>

          {/* Episode List */}
          <section aria-labelledby="episodes-heading" id="episodes" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-saffron" />
              <h2 id="episodes-heading" className="font-serif text-2xl font-bold text-ink">
                Story Episodes ({series.episodes?.length || 0})
              </h2>
            </div>
            <ol className="space-y-3.5">
              {(series.episodes ?? []).map((episode) => (
                <li
                  key={episode.number}
                  className="card-spiritual rounded-3xl bg-white p-5 ring-1 ring-[#eedec9] shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep">Episode {episode.number}</p>
                    <span className="text-xs font-medium text-muted">{episode.duration}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-bold text-ink">{episode.title}</h3>
                  <ProseText text={episode.summary} className="mt-2 text-sm leading-relaxed text-muted/95" />
                </li>
              ))}
            </ol>
          </section>

          <FaqList faqs={series.faqs ?? []} className="mt-12" />
        </div>

        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          <BlogShare title={series.title} path={`${PATHS.katha}/${series.slug}`} />

          <div className="card-spiritual rounded-3xl bg-gradient-to-br from-[#fffdf9] via-[#fff3e6] to-[#fde9d4] p-6 ring-1 ring-[#ebd5bd]">
            <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep">Inspired by this Katha</p>
            <h2 className="mt-2 font-serif text-xl font-bold text-ink">Carry the katha into a mala</h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              After listening, sit for 108 of the divine naam that the holy story left in your heart.
            </p>
            <LocaleLink
              href="/naam-jaap"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-saffron px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-saffron-deep transition-all"
            >
              <span>Start 108 Jaap</span>
            </LocaleLink>
          </div>

          {series.cta ? (
            <ContextualCta
              title={series.cta.title}
              body={series.cta.body}
              href={series.cta.href}
              label={series.cta.label}
              tone="navy"
            />
          ) : null}

          <YouTubeEmbed url={series.youtubeUrl} title={series.h1} compact />
          <RelatedLinksCard
            relatedLink={series.relatedLink}
            relatedPosts={(series.relatedContent ?? []).map((item) => ({
              title: item.text,
              url: item.href,
            }))}
          />
        </aside>
      </div>
    </div>
  );
}


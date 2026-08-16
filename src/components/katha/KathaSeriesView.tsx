import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { gatherRelated } from "@/lib/content/related";
import type { KathaSeries } from "@/lib/content/types";

export function KathaSeriesView({ series }: { series: KathaSeries }) {
  const related = gatherRelated(series);
  const first = series.episodes?.[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={series.breadcrumbs} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_320px]">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] bg-sand">
            {series.heroImage ? (
              <Image
                src={series.heroImage}
                alt={series.heroImageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            ) : null}
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-saffron">{series.category}</p>
          <h1 className="mt-2 font-serif text-4xl text-ink lg:text-5xl">{series.h1}</h1>
          <p className="mt-2 text-lg text-muted">{series.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
            <span>{series.language}</span>
            <span>·</span>
            <span>{series.duration}</span>
            <span>·</span>
            <span>
              ★ {series.rating || "0"} ({series.ratingsCount || "0"})
            </span>
          </div>

          <ExpandableSection title="Overview" className="mt-8">
            <div className="space-y-4 text-base leading-relaxed text-ink">
              <p>{series.introduction}</p>
              {first ? (
                <div className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                  <p className="text-xs uppercase tracking-wide text-saffron">Continue listening</p>
                  <p className="mt-1 font-serif text-2xl text-ink">
                    Episode {first.number}: {first.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{first.summary}</p>
                  <p className="mt-2 text-xs text-muted">{first.duration}</p>
                </div>
              ) : null}
            </div>
          </ExpandableSection>

          <ExpandableSection title="Episodes" id="episodes">
            <ol className="space-y-3">
              {(series.episodes ?? []).map((episode) => (
                <li
                  key={episode.number}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line"
                >
                  <p className="text-xs text-saffron">Episode {episode.number}</p>
                  <h2 className="mt-1 font-serif text-xl text-ink">{episode.title}</h2>
                  <p className="mt-2 text-sm text-muted">{episode.summary}</p>
                  <p className="mt-2 text-xs text-muted">{episode.duration}</p>
                </li>
              ))}
            </ol>
          </ExpandableSection>

          <FaqList faqs={series.faqs ?? []} />
          <RelatedContent links={related} />
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
        </aside>
      </div>
    </div>
  );
}

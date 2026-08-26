import { CoverMedia } from "@/components/media/CoverMedia";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { RelatedLinksCard } from "@/components/seo/RelatedLinksCard";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { ProseText } from "@/components/content/SectionBody";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import type { YatraPage } from "@/lib/content/types";

export function YatraDetailView({ page }: { page: YatraPage }) {

  const subtitle =
    page.category === "itinerary"
      ? `${page.destination} · a humane sequence`
      : page.category === "places"
        ? `${page.destination} · places worth a slow visit`
        : page.category === "darshan"
          ? `${page.destination} · arrive as a guest`
          : `${page.state} · ${(page.filters ?? []).slice(0, 2).join(" · ")}`;

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={page.breadcrumbs} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink lg:text-5xl">{page.h1}</h1>
          <p className="mt-2 text-lg text-muted">{subtitle}</p>
        </div>
      </div>

      <CoverMedia
        src={page.heroImage}
        alt={page.heroImageAlt}
        className="mt-8 flex justify-center px-1 sm:px-2"
        fit="contain"
        priority
        sizes="(max-width: 1280px) 100vw, 1200px"
      />

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Best time", value: page.bestTime },
          { label: "State", value: page.state },
          { label: "Why visit", value: page.whyVisit },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <dt className="text-xs uppercase tracking-wide text-saffron">{item.label}</dt>
            <dd className="mt-2">
              <ProseText text={item.value} className="line-clamp-2 text-sm leading-relaxed text-muted" />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <ExpandableSection title="Overview" className="mt-0" collapsible={false}>
            <div className="space-y-6 text-base leading-relaxed text-ink">
              <ProseText text={page.introduction} />
              <section>
                <h2 className="font-serif text-2xl">Why visit</h2>
                <ProseText text={page.whyVisit} className="mt-3 text-muted" />
              </section>
              <section>
                <h2 className="font-serif text-2xl">Significance</h2>
                <ProseText text={page.significance} className="mt-3 text-muted" />
              </section>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Places" collapsible={false}>
            <ul className="space-y-3">
              {(page.places ?? []).map((place) => (
                <li key={place.name} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                  <h2 className="font-serif text-xl text-ink">{place.name}</h2>
                  <ProseText text={place.note} className="mt-2 text-sm text-muted" />
                </li>
              ))}
            </ul>
          </ExpandableSection>

          <ExpandableSection title="Itinerary" collapsible={false}>
            <ol className="space-y-3">
              {(page.itinerary ?? []).map((item) => (
                <li key={item.day} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                  <p className="text-xs uppercase tracking-wide text-saffron">{item.day}</p>
                  <ProseText text={item.plan} className="mt-2 text-sm text-muted" />
                </li>
              ))}
            </ol>
          </ExpandableSection>

          <ExpandableSection title="Travel" collapsible={false}>
            <div className="space-y-5 text-sm leading-relaxed text-muted">
              <p>
                <strong className="text-ink">How to reach. </strong>
                <ProseText as="span" text={page.howToReach} />
              </p>
              <p>
                <strong className="text-ink">Stay. </strong>
                <ProseText as="span" text={page.stay} />
              </p>
              <p>
                <strong className="text-ink">Food. </strong>
                <ProseText as="span" text={page.food} />
              </p>
              <p>
                <strong className="text-ink">Nearby. </strong>
                {(page.nearby ?? []).join(" · ")}
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Tips" collapsible={false}>
            <ul className="space-y-3">
              {(page.tips ?? []).map((tip) => (
                <ProseText as="li" key={tip} text={tip} className="rounded-3xl bg-cream p-5 text-sm text-ink" />
              ))}
            </ul>
          </ExpandableSection>

          <FaqList faqs={page.faqs ?? []} />
        </div>
        <div className="h-fit space-y-4 lg:sticky lg:top-24">
          <ContextualCta
            title={page.cta.title}
            body={page.cta.body}
            href={page.cta.href}
            label={page.cta.label}
            tone="navy"
          />
          <YouTubeEmbed url={page.youtubeUrl} title={page.h1} compact />
          <RelatedLinksCard
            relatedLink={page.relatedLink}
            relatedPosts={(page.relatedContent ?? []).map((item) => ({
              title: item.text,
              url: item.href,
            }))}
          />
        </div>
      </div>
    </article>
  );
}

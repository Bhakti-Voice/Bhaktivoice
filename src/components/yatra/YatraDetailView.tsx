import { MapPin, Navigation, Sparkles } from "lucide-react";
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
      <header className="mt-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep border border-saffron/20">
            <Navigation className="h-3.5 w-3.5" />
            <span>Sacred Yatra Guide</span>
          </span>
          {page.state ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-muted">
              <MapPin className="h-3 w-3 text-saffron" />
              {page.state}
            </span>
          ) : null}
        </div>
        <h1 className="mt-2.5 font-serif text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">{page.h1}</h1>
        <p className="mt-2 text-base sm:text-lg text-muted">{subtitle}</p>
      </header>

      <CoverMedia
        src={page.heroImage}
        alt={page.heroImageAlt || page.title}
        className="mt-6 flex justify-center px-1 sm:px-2"
        fit="contain"
        priority
        sizes="(max-width: 1280px) 100vw, 1200px"
      />

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Best Time to Visit", value: page.bestTime },
          { label: "Sacred State", value: page.state },
          { label: "Why Devotees Visit", value: page.whyVisit },
        ].map((item) => (
          <div key={item.label} className="card-spiritual rounded-3xl bg-white p-5 shadow-2xs ring-1 ring-[#e8dfd2]">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-saffron-deep">{item.label}</dt>
            <dd className="mt-2">
              <ProseText text={item.value} className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted" />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <ExpandableSection title="Overview" className="mt-0" collapsible={false}>
            <div className="space-y-6 text-base leading-relaxed text-ink">
              <ProseText text={page.introduction} />
              <section>
                <h2 className="font-serif text-2xl font-bold text-ink">Why visit</h2>
                <ProseText text={page.whyVisit} className="mt-3 text-muted leading-relaxed" />
              </section>
              <section>
                <h2 className="font-serif text-2xl font-bold text-ink">Significance</h2>
                <ProseText text={page.significance} className="mt-3 text-muted leading-relaxed" />
              </section>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Sacred Places" collapsible={false}>
            <ul className="space-y-3.5">
              {(page.places ?? []).map((place) => (
                <li key={place.name} className="card-spiritual rounded-3xl bg-white p-5 ring-1 ring-[#eedec9]">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-saffron" />
                    <span>{place.name}</span>
                  </h2>
                  <ProseText text={place.note} className="mt-2 text-sm leading-relaxed text-muted" />
                </li>
              ))}
            </ul>
          </ExpandableSection>

          <ExpandableSection title="Pilgrimage Itinerary" collapsible={false}>
            <ol className="space-y-3.5">
              {(page.itinerary ?? []).map((item) => (
                <li key={item.day} className="rounded-3xl bg-white p-5 ring-1 ring-[#eedec9] shadow-2xs">
                  <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep">{item.day}</p>
                  <ProseText text={item.plan} className="mt-2 text-sm leading-relaxed text-ink/85" />
                </li>
              ))}
            </ol>
          </ExpandableSection>

          <ExpandableSection title="Travel & Stay Guide" collapsible={false}>
            <div className="space-y-4 text-sm leading-relaxed text-muted bg-white p-5 sm:p-6 rounded-3xl ring-1 ring-[#eedec9]">
              <p>
                <strong className="text-ink">How to reach: </strong>
                <ProseText as="span" text={page.howToReach} />
              </p>
              <p>
                <strong className="text-ink">Where to stay: </strong>
                <ProseText as="span" text={page.stay} />
              </p>
              <p>
                <strong className="text-ink">Prasad & Food: </strong>
                <ProseText as="span" text={page.food} />
              </p>
              <p>
                <strong className="text-ink">Nearby holy shrines: </strong>
                {(page.nearby ?? []).join(" · ")}
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Yatra Tips & Advice" collapsible={false}>
            <ul className="space-y-3">
              {(page.tips ?? []).map((tip) => (
                <ProseText
                  as="li"
                  key={tip}
                  text={tip}
                  className="rounded-2xl bg-[#fffdf9] p-4 text-sm text-ink ring-1 ring-[#eedec9]"
                />
              ))}
            </ul>
          </ExpandableSection>

          <FaqList faqs={page.faqs ?? []} />
        </div>
        <div className="h-fit space-y-5 lg:sticky lg:top-24">
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


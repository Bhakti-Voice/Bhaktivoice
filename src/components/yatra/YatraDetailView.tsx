import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { FaqList } from "@/components/seo/FaqList";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { gatherRelated } from "@/lib/content/related";
import type { YatraPage } from "@/lib/content/types";

export function YatraDetailView({ page }: { page: YatraPage }) {
  const related = gatherRelated(page, 6);

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

      <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-[32px] bg-sand">
        {page.heroImage ? (
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        ) : null}
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Best time", value: page.bestTime },
          { label: "State", value: page.state },
          { label: "Why visit", value: page.whyVisit },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <dt className="text-xs uppercase tracking-wide text-saffron">{item.label}</dt>
            <dd className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <ExpandableSection title="Overview" className="mt-0">
            <div className="space-y-6 text-base leading-relaxed text-ink">
              <p>{page.introduction}</p>
              <section>
                <h2 className="font-serif text-2xl">Why visit</h2>
                <p className="mt-3 text-muted">{page.whyVisit}</p>
              </section>
              <section>
                <h2 className="font-serif text-2xl">Significance</h2>
                <p className="mt-3 text-muted">{page.significance}</p>
              </section>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Places">
            <ul className="space-y-3">
              {(page.places ?? []).map((place) => (
                <li key={place.name} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                  <h2 className="font-serif text-xl text-ink">{place.name}</h2>
                  <p className="mt-2 text-sm text-muted">{place.note}</p>
                </li>
              ))}
            </ul>
          </ExpandableSection>

          <ExpandableSection title="Itinerary">
            <ol className="space-y-3">
              {(page.itinerary ?? []).map((item) => (
                <li key={item.day} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                  <p className="text-xs uppercase tracking-wide text-saffron">{item.day}</p>
                  <p className="mt-2 text-sm text-muted">{item.plan}</p>
                </li>
              ))}
            </ol>
          </ExpandableSection>

          <ExpandableSection title="Travel">
            <div className="space-y-5 text-sm leading-relaxed text-muted">
              <p>
                <strong className="text-ink">How to reach. </strong>
                {page.howToReach}
              </p>
              <p>
                <strong className="text-ink">Stay. </strong>
                {page.stay}
              </p>
              <p>
                <strong className="text-ink">Food. </strong>
                {page.food}
              </p>
              <p>
                <strong className="text-ink">Nearby. </strong>
                {(page.nearby ?? []).join(" · ")}
              </p>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Tips">
            <ul className="space-y-3">
              {(page.tips ?? []).map((tip) => (
                <li key={tip} className="rounded-3xl bg-cream p-5 text-sm text-ink">
                  {tip}
                </li>
              ))}
            </ul>
          </ExpandableSection>

          <FaqList faqs={page.faqs ?? []} />
          <RelatedContent title="Related yatra" links={related} />
        </div>
        <div className="h-fit lg:sticky lg:top-24">
          <ContextualCta
            title={page.cta.title}
            body={page.cta.body}
            href={page.cta.href}
            label={page.cta.label}
            tone="navy"
          />
        </div>
      </div>
    </article>
  );
}

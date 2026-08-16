import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listYatra } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const filtered = Boolean(category);
  return hubMetadata("yatra", { noIndex: filtered });
}

export default async function YatraIndexPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [yatraPages, t] = await Promise.all([listYatra(), getMessages()]);
  const filters = [
    "All",
    ...Array.from(new Set(yatraPages.flatMap((page) => page.filters ?? []))),
  ];
  const active = category && filters.includes(category) ? category : "All";
  const pages =
    active === "All"
      ? yatraPages.filter((page) => page.category === "destination" || !page.category)
      : yatraPages.filter((page) => page.filters?.includes(active));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.yatra.h1,
          pages.map((page) => ({ name: page.title, url: `${PATHS.yatra}/${page.slug}` })),
        )}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.nav.yatra, PATHS.yatra])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.yatra.h1}</h1>

      {filters.length > 1 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const href = filter === "All" ? PATHS.yatra : `${PATHS.yatra}?category=${encodeURIComponent(filter)}`;
            const isActive = active === filter;
            return (
              <LocaleLink
                key={filter}
                href={href}
                className={`rounded-full px-4 py-2 text-sm ${
                  isActive ? "bg-saffron text-white" : "border border-line bg-sand text-ink"
                }`}
              >
                {filter === "All" ? t.common.all : filter}
              </LocaleLink>
            );
          })}
        </div>
      ) : null}

      {pages.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.yatra}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
              meta={`${page.destination} · ${page.state}`}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="trips" />
      )}
      <HubSeoBlock id="yatra" />
    </div>
  );
}

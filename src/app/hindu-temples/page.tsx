import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingPager } from "@/components/content/ListingPager";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listTemples } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("temples");
}

export default async function TemplesIndexPage({ searchParams }: Props) {
  const [{ page: rawPage }, temples, t] = await Promise.all([
    searchParams,
    listTemples(),
    getMessages(),
  ]);
  const { items, page, pages } = getListingPage(temples, parseListingPage(rawPage));

  return (
    <div>
      <PageHero title={t.hubs.temples.h1} hub="temples" crumbs={localizedCrumbs(t.homeName, [t.hubs.temples.h1, PATHS.temples])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          "Temples",
          items.map((item) => ({ name: item.title, url: `${PATHS.temples}/${item.slug}` })),
        )}
      />
      {items.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <ListingCard
              key={item.slug}
              href={`${PATHS.temples}/${item.slug}`}
              title={item.title}
              text={item.introduction}
              image={item.heroImage}
              imageAlt={item.heroImageAlt}
              meta={`${item.deity} · ${item.location}`}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="temples" />
      )}
      <ListingPager
        page={page}
        pages={pages}
        basePath={PATHS.temples}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
        pageOf={t.common.pageOf}
      />
      <HubSeoBlock id="temples" />
      </div>
    </div>
  );
}

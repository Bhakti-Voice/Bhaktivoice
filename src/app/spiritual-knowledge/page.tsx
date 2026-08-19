import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingPager } from "@/components/content/ListingPager";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listSpirituality } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("spirituality");
}

export default async function SpiritualityIndexPage({ searchParams }: Props) {
  const [{ page: rawPage }, spiritualityPages, t] = await Promise.all([
    searchParams,
    listSpirituality(),
    getMessages(),
  ]);
  const { items, page, pages } = getListingPage(spiritualityPages, parseListingPage(rawPage));

  return (
    <div>
      <PageHero
        title={t.hubs.spirituality.h1}
        hub="spirituality"
        crumbs={localizedCrumbs(t.homeName, [t.hubs.spirituality.h1, PATHS.spirituality])}
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.spirituality.h1,
          items.map((item) => ({
            name: item.title,
            url: `${PATHS.spirituality}/${item.slug}`,
          })),
        )}
      />
      {items.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <ListingCard
              key={item.slug}
              href={`${PATHS.spirituality}/${item.slug}`}
              title={item.title}
              text={item.introduction}
              image={item.heroImage}
              imageAlt={item.heroImageAlt}
              meta={item.category}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="articles" />
      )}
      <ListingPager
        page={page}
        pages={pages}
        basePath={PATHS.spirituality}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
        pageOf={t.common.pageOf}
      />
      <HubSeoBlock id="spirituality" />
      </div>
    </div>
  );
}

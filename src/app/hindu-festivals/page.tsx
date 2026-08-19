import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingPager } from "@/components/content/ListingPager";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listFestivals } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("festivals");
}

export default async function FestivalsIndexPage({ searchParams }: Props) {
  const [{ page: rawPage }, festivals, t] = await Promise.all([
    searchParams,
    listFestivals(),
    getMessages(),
  ]);
  const { items, page, pages } = getListingPage(festivals, parseListingPage(rawPage));

  return (
    <div>
      <PageHero
        title={t.hubs.festivals.h1}
        hub="festivals"
        crumbs={localizedCrumbs(t.homeName, [t.hubs.festivals.h1, PATHS.festivals])}
      >
        <p className="mt-3 text-sm text-muted">
          {t.common.festivalTithiLead}{" "}
          <LocaleLink href={PATHS.tithi} className="text-saffron">
            {t.nav.tithi}
          </LocaleLink>
          .
        </p>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.festivals.h1,
          items.map((item) => ({ name: item.title, url: `${PATHS.festivals}/${item.slug}` })),
        )}
      />
      {items.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <ListingCard
              key={item.slug}
              href={`${PATHS.festivals}/${item.slug}`}
              title={item.title}
              text={item.introduction}
              image={item.heroImage}
              imageAlt={item.heroImageAlt}
              meta={item.monthHint}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="festivals" />
      )}
      <ListingPager
        page={page}
        pages={pages}
        basePath={PATHS.festivals}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
        pageOf={t.common.pageOf}
      />
      <HubSeoBlock id="festivals" />
      </div>
    </div>
  );
}

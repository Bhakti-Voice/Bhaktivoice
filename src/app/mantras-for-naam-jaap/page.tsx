import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingPager } from "@/components/content/ListingPager";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listMantras } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("mantras");
}

export default async function MantrasIndexPage({ searchParams }: Props) {
  const [{ page: rawPage }, mantras, t] = await Promise.all([
    searchParams,
    listMantras(),
    getMessages(),
  ]);
  const { items, page, pages } = getListingPage(mantras, parseListingPage(rawPage));

  return (
    <div>
      <PageHero
        title={t.hubs.mantras.h1}
        hub="mantras"
        crumbs={localizedCrumbs(t.homeName, [t.hubs.mantras.h1, PATHS.mantras])}
      >
        <LocaleLink
          href="/naam-jaap"
          className="mt-5 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
        >
          {t.common.startJaap}
        </LocaleLink>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.mantras.h1,
          items.map((item) => ({ name: item.title, url: `${PATHS.mantras}/${item.slug}` })),
        )}
      />
      {items.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <ListingCard
              key={item.slug}
              href={`${PATHS.mantras}/${item.slug}`}
              title={item.title}
              text={item.introduction}
              image={item.heroImage}
              imageAlt={item.heroImageAlt}
              meta={item.deity}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="mantras" />
      )}
      <ListingPager
        page={page}
        pages={pages}
        basePath={PATHS.mantras}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
        pageOf={t.common.pageOf}
      />
      <HubSeoBlock id="mantras" />
      </div>
    </div>
  );
}

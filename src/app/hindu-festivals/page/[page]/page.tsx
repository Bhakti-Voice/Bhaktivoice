import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/content/ListingCard";
import { ListingPager } from "@/components/content/ListingPager";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listFestivals } from "@/lib/content";
import { getFestivalPage, getFestivalPageCount } from "@/lib/content/festival-pagination";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  const [festivals, t] = await Promise.all([listFestivals(), getMessages()]);
  const pages = getFestivalPageCount(festivals.length);
  return localizedMetadata({
    title: `${t.hubs.festivals.h1} — ${t.common.pageOf(pageNumber, pages || pageNumber)}`,
    description: t.hubs.festivals.description,
    path: `${PATHS.festivals}/page/${pageNumber}`,
  });
}

export default async function FestivalsPagedPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  const [festivals, t] = await Promise.all([listFestivals(), getMessages()]);
  const pages = getFestivalPageCount(festivals.length);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > pages) {
    notFound();
  }
  const pageItems = getFestivalPage(festivals, pageNumber);

  return (
    <div>
      <PageHero
        title={t.hubs.festivals.h1}
        hub="festivals"
        crumbs={localizedCrumbs(
          t.homeName,
          [t.hubs.festivals.h1, PATHS.festivals],
          [t.common.pageOf(pageNumber, pages), `${PATHS.festivals}/page/${pageNumber}`],
        )}
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
            pageItems.map((item) => ({ name: item.title, url: `${PATHS.festivals}/${item.slug}` })),
          )}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {pageItems.map((item) => (
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
        <ListingPager
          page={pageNumber}
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

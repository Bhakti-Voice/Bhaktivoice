import type { Metadata } from "next";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listFestivals } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("festivals");
}

export default async function FestivalsIndexPage() {
  const [festivals, t] = await Promise.all([listFestivals(), getMessages()]);

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
          data={await localizedItemListSchema(
            t.hubs.festivals.h1,
            festivals.map((item) => ({ name: item.title, url: `${PATHS.festivals}/${item.slug}` })),
          )}
        />
        <SearchableCardGrid
          items={festivals.map((item) => ({
            slug: item.slug,
            href: `${PATHS.festivals}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            meta: item.monthHint,
          }))}
          emptyKind="festivals"
          placeholder={t.common.listingSearch(t.nav.festivals)}
        />
        <HubSeoBlock id="festivals" />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listFestivals } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

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
        data={itemListSchema(
          t.hubs.festivals.h1,
          festivals.map((page) => ({ name: page.title, url: `${PATHS.festivals}/${page.slug}` })),
        )}
      />
      {festivals.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {festivals.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.festivals}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
              meta={page.monthHint}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="festivals" />
      )}
      <HubSeoBlock id="festivals" />
      </div>
    </div>
  );
}

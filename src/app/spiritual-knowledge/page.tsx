import type { Metadata } from "next";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listSpirituality } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("spirituality");
}

export default async function SpiritualityIndexPage() {
  const [spiritualityPages, t] = await Promise.all([listSpirituality(), getMessages()]);

  return (
    <div>
      <PageHero
        title={t.hubs.spirituality.h1}
        hub="spirituality"
        ornament
        crumbs={localizedCrumbs(t.homeName, [t.hubs.spirituality.h1, PATHS.spirituality])}
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.spirituality.h1,
            spiritualityPages.map((item) => ({
              name: item.title,
              url: `${PATHS.spirituality}/${item.slug}`,
            })),
          )}
        />
        <SearchableCardGrid
          items={spiritualityPages.map((item) => ({
            slug: item.slug,
            href: `${PATHS.spirituality}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            meta: item.category,
            badge: "Knowledge",
          }))}
          emptyKind="articles"
          placeholder={t.common.listingSearch(t.nav.spirituality)}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        />
        <HubSeoBlock id="spirituality" />
      </div>
    </div>
  );
}


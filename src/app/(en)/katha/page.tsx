import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { listKatha } from "@/lib/content";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("katha");
}

export default async function KathaIndexPage() {
  const [kathaSeries, t] = await Promise.all([listKatha(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.katha.h1} hub="katha" crumbs={localizedCrumbs(t.homeName, [t.hubs.katha.h1, PATHS.katha])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.katha.h1,
            kathaSeries.map((series) => ({ name: series.title, url: `${PATHS.katha}/${series.slug}` })),
          )}
        />

        <section className="mt-8">
          <h2 className="font-serif text-2xl text-ink">{t.common.popularKatha}</h2>
          <SearchableCardGrid
            items={kathaSeries.map((series) => ({
              slug: series.slug,
              href: `${PATHS.katha}/${series.slug}`,
              title: series.title,
              text: series.subtitle || series.introduction,
              image: series.heroImage,
              imageAlt: series.heroImageAlt,
              meta: series.category,
              listenHref: `${PATHS.katha}/${series.slug}?listen=1`,
              listenLabel: t.common.listen,
            }))}
            emptyKind="katha"
            placeholder={t.common.listingSearch(t.nav.katha)}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          />
        </section>
        <HubSeoBlock id="katha" />
      </div>
    </div>
  );
}

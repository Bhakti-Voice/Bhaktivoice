import type { Metadata } from "next";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listTemples } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("temples");
}

export default async function TemplesIndexPage() {
  const [temples, t] = await Promise.all([listTemples(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.temples.h1} hub="temples" crumbs={localizedCrumbs(t.homeName, [t.hubs.temples.h1, PATHS.temples])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.temples.h1,
            temples.map((item) => ({ name: item.title, url: `${PATHS.temples}/${item.slug}` })),
          )}
        />
        <SearchableCardGrid
          items={temples.map((item) => ({
            slug: item.slug,
            href: `${PATHS.temples}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            meta: `${item.deity} · ${item.location}`,
          }))}
          emptyKind="temples"
          placeholder={t.common.listingSearch(t.nav.temples)}
        />
        <HubSeoBlock id="temples" />
      </div>
    </div>
  );
}

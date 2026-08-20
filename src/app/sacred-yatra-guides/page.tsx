import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { YatraListing } from "@/components/yatra/YatraListing";
import { listYatra } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("yatra");
}

export default async function YatraIndexPage() {
  const [yatraPages, t] = await Promise.all([listYatra(), getMessages()]);
  const filters = Array.from(new Set(yatraPages.flatMap((page) => page.filters ?? [])));
  const cards = yatraPages.map((item) => ({
    slug: item.slug,
    href: `${PATHS.yatra}/${item.slug}`,
    title: item.title,
    text: item.introduction,
    image: item.heroImage,
    imageAlt: item.heroImageAlt,
    meta: `${item.destination} · ${item.state}`,
    filters: item.filters ?? [],
    group: item.category || "destination",
  }));

  return (
    <div>
      <PageHero title={t.hubs.yatra.h1} hub="yatra" crumbs={localizedCrumbs(t.homeName, [t.nav.yatra, PATHS.yatra])} />
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.yatra.h1,
            yatraPages.map((item) => ({ name: item.title, url: `${PATHS.yatra}/${item.slug}` })),
          )}
        />
        <YatraListing items={cards} filters={filters} />
        <HubSeoBlock id="yatra" />
      </div>
    </div>
  );
}

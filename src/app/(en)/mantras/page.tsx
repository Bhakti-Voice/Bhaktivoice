import type { Metadata } from "next";
import { Sparkles, Play } from "lucide-react";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listMantras } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("mantras");
}

export default async function MantrasIndexPage() {
  const [mantras, t] = await Promise.all([listMantras(), getMessages()]);

  return (
    <div>
      <PageHero
        title={t.hubs.mantras.h1}
        hub="mantras"
        ornament
        crumbs={localizedCrumbs(t.homeName, [t.hubs.mantras.h1, PATHS.mantras])}
      >
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <LocaleLink
            href="/naam-jaap"
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-saffron/20 transition-all hover:bg-saffron-deep hover:scale-105"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>{t.common.startJaap}</span>
          </LocaleLink>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-line backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>108 Chanting Guides</span>
          </span>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.mantras.h1,
            mantras.map((item) => ({ name: item.title, url: `${PATHS.mantras}/${item.slug}` })),
          )}
        />
        <SearchableCardGrid
          items={mantras.map((item) => ({
            slug: item.slug,
            href: `${PATHS.mantras}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            meta: item.deity,
            badge: "Mantra",
            listenHref: "/naam-jaap",
            listenLabel: "Start 108 Jaap",
          }))}
          emptyKind="mantras"
          placeholder={t.common.listingSearch(t.nav.mantras)}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        />
        <HubSeoBlock id="mantras" />
      </div>
    </div>
  );
}


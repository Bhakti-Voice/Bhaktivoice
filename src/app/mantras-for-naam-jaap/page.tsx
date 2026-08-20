import type { Metadata } from "next";
import { ServerCardGrid } from "@/components/content/ServerCardGrid";
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
          data={await localizedItemListSchema(
            t.hubs.mantras.h1,
            mantras.map((item) => ({ name: item.title, url: `${PATHS.mantras}/${item.slug}` })),
          )}
        />
        <ServerCardGrid
          items={mantras.map((item) => ({
            slug: item.slug,
            href: `${PATHS.mantras}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            meta: item.deity,
          }))}
          emptyKind="mantras"
        />
        <HubSeoBlock id="mantras" />
      </div>
    </div>
  );
}

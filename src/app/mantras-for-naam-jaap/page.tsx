import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { listMantras } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

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
        data={itemListSchema(
          t.hubs.mantras.h1,
          mantras.map((page) => ({ name: page.title, url: `${PATHS.mantras}/${page.slug}` })),
        )}
      />
      {mantras.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {mantras.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.mantras}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
              meta={page.deity}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="mantras" />
      )}
      <HubSeoBlock id="mantras" />
      </div>
    </div>
  );
}

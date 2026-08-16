import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.mantras.h1,
          mantras.map((page) => ({ name: page.title, url: `${PATHS.mantras}/${page.slug}` })),
        )}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.hubs.mantras.h1, PATHS.mantras])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.mantras.h1}</h1>
      <LocaleLink
        href="/naam-jaap"
        className="mt-6 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
      >
        {t.common.startJaap}
      </LocaleLink>
      {mantras.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}

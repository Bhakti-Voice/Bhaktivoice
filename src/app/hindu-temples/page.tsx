import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listTemples } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

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
        data={itemListSchema(
          "Temples",
          temples.map((page) => ({ name: page.title, url: `${PATHS.temples}/${page.slug}` })),
        )}
      />
      {temples.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {temples.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.temples}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
              meta={`${page.deity} · ${page.location}`}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="temples" />
      )}
      <HubSeoBlock id="temples" />
      </div>
    </div>
  );
}

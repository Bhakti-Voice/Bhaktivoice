import type { Metadata } from "next";
import { ListingCard } from "@/components/content/ListingCard";
import { EmptyListing } from "@/components/content/EmptyListing";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { listSpirituality } from "@/lib/content";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { itemListSchema } from "@/lib/seo/schema";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("spirituality");
}

export default async function SpiritualityIndexPage() {
  const [spiritualityPages, t] = await Promise.all([listSpirituality(), getMessages()]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <JsonLd
        data={itemListSchema(
          t.hubs.spirituality.h1,
          spiritualityPages.map((page) => ({
            name: page.title,
            url: `${PATHS.spirituality}/${page.slug}`,
          })),
        )}
      />
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.hubs.spirituality.h1, PATHS.spirituality])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">{t.hubs.spirituality.h1}</h1>
      {spiritualityPages.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spiritualityPages.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.spirituality}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
              meta={page.category}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="articles" />
      )}
      <HubSeoBlock id="spirituality" />
    </div>
  );
}

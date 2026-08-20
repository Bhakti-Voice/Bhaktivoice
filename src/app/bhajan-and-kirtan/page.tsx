import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { ServerCardGrid } from "@/components/content/ServerCardGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { listBhajan } from "@/lib/content";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("bhajan");
}

export default async function BhajanPage() {
  const [allItems, t] = await Promise.all([listBhajan(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.bhajan.h1} hub="bhajan" crumbs={pageCrumbs(["Bhajan", PATHS.bhajan])}>
        <div className="mt-5 flex flex-wrap gap-3">
          <LocaleLink href={PATHS.katha} className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
            Explore Katha
          </LocaleLink>
          <LocaleLink href="/naam-jaap" className="rounded-full bg-saffron px-5 py-2.5 text-sm text-white">
            Start Naam Jaap
          </LocaleLink>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.bhajan.h1,
            allItems.map((item) => ({ name: item.title, url: `${PATHS.bhajan}/${item.slug}` })),
          )}
        />
        <ServerCardGrid
          items={allItems.map((item) => ({
            slug: item.slug,
            href: `${PATHS.bhajan}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
          }))}
          emptyKind="bhajans"
          className="mt-2 grid grid-cols-2 gap-4 lg:grid-cols-3"
        />
        <HubSeoBlock id="bhajan" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.bhajan]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}

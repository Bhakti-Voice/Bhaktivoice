import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { SearchableCardGrid } from "@/components/content/SearchableCardGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { localizedItemListSchema } from "@/lib/seo/localized-schema";
import { PATHS } from "@/lib/seo/paths";
import { listAarti } from "@/lib/content";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("aarti");
}

export default async function AartiPage() {
  const [allItems, t] = await Promise.all([listAarti(), getMessages()]);

  return (
    <div>
      <PageHero title={t.hubs.aarti.h1} hub="aarti" crumbs={pageCrumbs(["Aarti", PATHS.aarti])}>
        <div className="mt-5 flex flex-wrap gap-3">
          <LocaleLink href={PATHS.yatra} className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
            Explore Yatra
          </LocaleLink>
          <LocaleLink href={PATHS.store} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm">
            Diyas &amp; puja sets
          </LocaleLink>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.aarti.h1,
            allItems.map((item) => ({ name: item.title, url: `${PATHS.aarti}/${item.slug}` })),
          )}
        />
        <SearchableCardGrid
          items={allItems.map((item) => ({
            slug: item.slug,
            href: `${PATHS.aarti}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
          }))}
          emptyKind="aartis"
          placeholder={t.common.listingSearch(t.nav.aarti)}
          className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3"
        />
        <HubSeoBlock id="aarti" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.aarti]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}

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
import { listChalisa } from "@/lib/content";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("chalisa");
}

export default async function ChalisaPage() {
  const [allItems, t] = await Promise.all([listChalisa(), getMessages()]);

  return (
    <div>
      <PageHero
        title={t.hubs.chalisa.h1}
        hub="chalisa"
        ornament
        crumbs={pageCrumbs(["Chalisa", PATHS.chalisa])}
      >
        <div className="mt-4 flex flex-wrap gap-2.5">
          <LocaleLink
            href={PATHS.aarti}
            className="rounded-full bg-navy px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-neutral-800 transition-colors"
          >
            Explore Aarti Chants
          </LocaleLink>
          <LocaleLink
            href={PATHS.mantras}
            className="rounded-full border border-line bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-xs hover:bg-cream transition-colors"
          >
            Sacred Mantras
          </LocaleLink>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        <JsonLd
          data={await localizedItemListSchema(
            t.hubs.chalisa.h1,
            allItems.map((item) => ({ name: item.title, url: `${PATHS.chalisa}/${item.slug}` })),
          )}
        />
        <SearchableCardGrid
          items={allItems.map((item) => ({
            slug: item.slug,
            href: `${PATHS.chalisa}/${item.slug}`,
            title: item.title,
            text: item.introduction,
            image: item.heroImage,
            imageAlt: item.heroImageAlt,
            badge: "Chalisa",
          }))}
          emptyKind="chalisas"
          placeholder={t.common.listingSearch(t.nav.chalisa)}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        />
        <HubSeoBlock id="chalisa" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.chalisa]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { FaqList } from "@/components/seo/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingCard } from "@/components/content/ListingCard";
import { ListingPager } from "@/components/content/ListingPager";
import { getMessages } from "@/lib/i18n/server";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { listBhajan } from "@/lib/content";
import { getListingPage, parseListingPage } from "@/lib/content/listing-pagination";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("bhajan");
}

export default async function BhajanPage({ searchParams }: Props) {
  const [{ page: rawPage }, allItems, t] = await Promise.all([
    searchParams,
    listBhajan(),
    getMessages(),
  ]);
  const { items, page, pages } = getListingPage(allItems, parseListingPage(rawPage));

  return (
    <div>
      <PageHero title="Bhajan" hub="bhajan" crumbs={pageCrumbs(["Bhajan", PATHS.bhajan])}>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={PATHS.katha} className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
            Explore Katha
          </Link>
          <Link href="/naam-jaap" className="rounded-full bg-saffron px-5 py-2.5 text-sm text-white">
            Start Naam Jaap
          </Link>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        {items.length ? (
          <div className="mt-2 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {items.map((item) => (
              <ListingCard
                key={item.slug}
                href={`${PATHS.bhajan}/${item.slug}`}
                title={item.title}
                text={item.introduction}
                image={item.heroImage}
                imageAlt={item.heroImageAlt}
              />
            ))}
          </div>
        ) : (
          <EmptyListing kind="bhajans" />
        )}
        <ListingPager
          page={page}
          pages={pages}
          basePath={PATHS.bhajan}
          previousLabel={t.common.previous}
          nextLabel={t.common.next}
          pageOf={t.common.pageOf}
        />
        <HubSeoBlock id="bhajan" hideFaqs />
        <FaqList faqs={[...t.listingFaqs.bhajan]} title={t.common.faqTitle} />
      </div>
    </div>
  );
}

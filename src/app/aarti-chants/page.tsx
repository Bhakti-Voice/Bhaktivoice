import type { Metadata } from "next";
import Link from "next/link";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { PageHero } from "@/components/layout/PageHero";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingCard } from "@/components/content/ListingCard";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { listAarti } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("aarti");
}

export default async function AartiPage() {
  const items = await listAarti();
  return (
    <div>
      <PageHero title="Aarti" hub="aarti" crumbs={pageCrumbs(["Aarti", PATHS.aarti])}>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={PATHS.yatra} className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
            Explore Yatra
          </Link>
          <Link href={PATHS.store} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm">
            Diyas &amp; puja sets
          </Link>
        </div>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
        {items.length ? (
          <div className="mt-2 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {items.map((page) => (
              <ListingCard
                key={page.slug}
                href={`${PATHS.aarti}/${page.slug}`}
                title={page.title}
                text={page.introduction}
                image={page.heroImage}
                imageAlt={page.heroImageAlt}
              />
            ))}
          </div>
        ) : (
          <EmptyListing kind="aartis" />
        )}
        <HubSeoBlock id="aarti" />
      </div>
    </div>
  );
}

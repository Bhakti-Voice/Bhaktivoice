import type { Metadata } from "next";
import Link from "next/link";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EmptyListing } from "@/components/content/EmptyListing";
import { ListingCard } from "@/components/content/ListingCard";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { listBhajan } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("bhajan");
}

export default async function BhajanPage() {
  const items = await listBhajan();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <Breadcrumbs items={pageCrumbs(["Bhajan", PATHS.bhajan])} />
      <h1 className="mt-4 font-serif text-4xl text-ink">Bhajan</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={PATHS.katha} className="rounded-full bg-navy px-5 py-2.5 text-sm text-white">
          Explore Katha
        </Link>
        <Link href="/naam-jaap" className="rounded-full bg-saffron px-5 py-2.5 text-sm text-white">
          Start Naam Jaap
        </Link>
      </div>
      {items.length ? (
        <div className="mt-10 grid gap-6">
          {items.map((page) => (
            <ListingCard
              key={page.slug}
              href={`${PATHS.bhajan}/${page.slug}`}
              title={page.title}
              text={page.introduction}
              image={page.heroImage}
              imageAlt={page.heroImageAlt}
            />
          ))}
        </div>
      ) : (
        <EmptyListing kind="bhajans" />
      )}
      <HubSeoBlock id="bhajan" />
    </div>
  );
}

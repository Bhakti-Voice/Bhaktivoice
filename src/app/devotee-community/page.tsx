import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import Link from "next/link";
import { Users } from "lucide-react";
import { hubMetadata } from "@/lib/i18n/hub";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EmptyListing } from "@/components/content/EmptyListing";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { formatCount, getStats } from "@/lib/cms/client";
import { listCommunityGroups } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("community");
}

export default async function CommunityPage() {
  const [stats, groups] = await Promise.all([getStats(), listCommunityGroups()]);

  return (
    <div>
      <section className="relative min-h-[280px] overflow-hidden lg:min-h-[340px]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] max-w-[640px]">
          <MediaImage
            src="/images/krishna-hero.png"
            alt="Lord Krishna playing the flute by a river at sunset"
            fill
            priority
            className="object-cover object-[center_20%] scale-x-[-1]"
            sizes="(max-width: 1024px) 70vw, 640px"
          />
          <div className="community-krishna-fade absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="max-w-xl">
            <Breadcrumbs items={pageCrumbs(["Community", PATHS.community])} />
            <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">Devotee Community</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-navy text-white md:grid md:grid-cols-2">
          <div className="p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Sankalp</p>
            <h2 className="mt-2 font-serif text-3xl">Global Ram Naam Sankalp</h2>
            <p className="mt-4 font-serif text-4xl">{formatCount(stats.total)}</p>
            <p className="mt-1 text-sm text-white/75">Naam Chanted</p>
            <p className="mt-3 text-sm text-white/75">
              {formatCount(stats.todayDevotees)} Devotees Chanting Today
            </p>
            <Link
              href={PATHS.sankalp}
              className="mt-6 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
            >
              Join Now
            </Link>
          </div>
          <div className="relative min-h-[200px]">
            <MediaImage
              src="/images/krishna-hero.png"
              alt="Devotional light for a global Ram naam sankalp"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <h2 className="font-serif text-2xl text-ink">Popular Groups</h2>
        {groups.length ? (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {groups.map((group) => (
              <li key={group.slug} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line">
                <Users className="h-5 w-5 text-saffron" />
                <h3 className="mt-3 font-serif text-xl text-ink">{group.name}</h3>
                <p className="mt-2 text-sm text-muted">{group.text}</p>
                <p className="mt-3 text-xs text-muted">{formatCount(group.members)} devotees</p>
                <Link
                  href="/login"
                  className="mt-4 inline-flex rounded-full border border-saffron px-4 py-1.5 text-sm text-saffron"
                >
                  Join
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyListing kind="groups" />
        )}
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <HubSeoBlock id="community" />
      </div>
    </div>
  );
}

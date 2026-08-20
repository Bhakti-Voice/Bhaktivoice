import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { CommunityGroupList } from "@/components/community/CommunityGroupList";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { getStats } from "@/lib/cms/client";
import { formatCount } from "@/lib/format";
import { listCommunityGroups } from "@/lib/content";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("community");
}

export default async function CommunityPage() {
  const [stats, groups, t] = await Promise.all([getStats(), listCommunityGroups(), getMessages()]);

  return (
    <div>
      <PageHero
        title={t.hubs.community.h1}
        hub="community"
        crumbs={pageCrumbs([t.nav.community, PATHS.community])}
      />

      <section className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-navy text-white md:grid md:grid-cols-2">
          <div className="p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Sankalp</p>
            <h2 className="mt-2 font-serif text-3xl">{t.common.globalSankalp}</h2>
            <p className="mt-4 font-serif text-4xl">{formatCount(stats.total)}</p>
            <p className="mt-1 text-sm text-white/75">{t.common.naamChanted}</p>
            <p className="mt-3 text-sm text-white/75">
              {formatCount(stats.todayDevotees)} {t.common.chantingToday}
            </p>
            <LocaleLink
              href={PATHS.sankalp}
              className="mt-6 inline-flex rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-white"
            >
              {t.common.joinNow}
            </LocaleLink>
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
        <h2 className="font-serif text-2xl text-ink">{t.common.popularGroups}</h2>
        <CommunityGroupList groups={groups} />
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <HubSeoBlock id="community" />
      </div>
    </div>
  );
}

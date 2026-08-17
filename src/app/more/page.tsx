import type { Metadata } from "next";
import { HubSeoBlock } from "@/components/seo/HubSeoBlock";
import { PageHero } from "@/components/layout/PageHero";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { hubMetadata } from "@/lib/i18n/hub";
import { getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("more");
}

export default async function MorePage() {
  const t = await getMessages();
  const links = [
    { href: PATHS.naamJaap, label: t.nav.naamJaap },
    { href: PATHS.katha, label: t.nav.katha },
    { href: PATHS.yatra, label: t.nav.yatra },
    { href: PATHS.sadhana, label: t.nav.sadhana },
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.spirituality, label: t.nav.spirituality },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
    { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
    { href: PATHS.sankalp, label: t.nav.sankalp },
    { href: PATHS.diary, label: t.nav.diary },
    { href: "/profile", label: t.nav.myJourney },
  ];

  return (
    <div>
      <PageHero title={t.hubs.more.h1} hub="more" crumbs={localizedCrumbs(t.homeName, [t.hubs.more.h1, PATHS.more])} />
      <div className="mx-auto max-w-3xl px-4 pb-12 lg:px-8">
        <ul className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {links.map((link) => (
            <li key={link.href}>
              <LocaleLink href={link.href} className="block px-5 py-4 text-ink hover:text-saffron">
                {link.label}
              </LocaleLink>
            </li>
          ))}
        </ul>
        <HubSeoBlock id="more" />
      </div>
    </div>
  );
}

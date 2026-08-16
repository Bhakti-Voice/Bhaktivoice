"use client";

import { Logo } from "@/components/brand/Logo";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useMessages } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export function Footer() {
  const t = useMessages();
  const columns = [
    {
      title: t.footerCols.practice,
      links: [
        { href: PATHS.naamJaap, label: t.nav.naamJaap },
        { href: PATHS.sadhana, label: t.nav.sadhana },
        { href: PATHS.sankalp, label: t.nav.sankalp },
        { href: PATHS.diary, label: t.nav.diary },
      ],
    },
    {
      title: t.footerCols.learn,
      links: [
        { href: PATHS.katha, label: t.nav.katha },
        { href: PATHS.blog, label: t.nav.blog },
        { href: PATHS.mantras, label: t.nav.mantras },
        { href: PATHS.spirituality, label: t.nav.spirituality },
      ],
    },
    {
      title: t.footerCols.travel,
      links: [
        { href: PATHS.yatra, label: t.nav.yatra },
        { href: PATHS.temples, label: t.nav.temples },
        { href: PATHS.festivals, label: t.nav.festivals },
        { href: PATHS.tithi, label: t.nav.tithi },
        { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
      ],
    },
    {
      title: t.footerCols.together,
      links: [
        { href: PATHS.community, label: t.nav.community },
        { href: PATHS.store, label: t.nav.store },
        { href: "/profile", label: t.nav.myJourney },
        { href: "/login", label: t.signIn },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-line bg-cream pb-24 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t.footerTagline}</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-ink">{column.title}</h2>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <LocaleLink href={link.href} className="text-sm text-muted hover:text-saffron">
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Bhakti Voice. {t.footerCredit}
      </p>
    </footer>
  );
}

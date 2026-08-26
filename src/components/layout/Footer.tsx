"use client";

import { Logo } from "@/components/brand/Logo";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { useMessages } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

function SocialMark({ path, label, href }: { path: string; label: string; href?: string }) {
  const mark = (
    <span
      aria-label={href ? undefined : label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d={path} />
      </svg>
    </span>
  );
  if (!href) return mark;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-saffron"
    >
      {mark}
    </a>
  );
}

export function Footer() {
  const t = useMessages();
  const columns = [
    {
      title: t.footerCols.quickLinks,
      links: [
        { href: "/", label: t.nav.home },
        { href: PATHS.naamJaap, label: t.nav.naamJaap },
        { href: PATHS.katha, label: t.nav.katha },
        { href: PATHS.yatra, label: t.nav.yatra },
      ],
    },
    {
      title: t.footerCols.resources,
      links: [
        { href: PATHS.blog, label: t.nav.blog },
        { href: PATHS.temples, label: t.nav.temples },
        { href: PATHS.festivals, label: t.nav.festivals },
        { href: PATHS.quotes, label: t.nav.quotes },
        { href: PATHS.mantras, label: t.nav.mantras },
        { href: PATHS.aarti, label: t.nav.aarti },
        { href: PATHS.chalisa, label: t.nav.chalisa },
        { href: PATHS.bhajan, label: t.nav.bhajan },
      ],
    },
    {
      title: t.footerCols.legal,
      links: [
        { href: PATHS.more, label: t.nav.moreTitle },
        { href: PATHS.spirituality, label: t.nav.spirituality },
        { href: "/profile", label: t.nav.myJourney },
        { href: "/login", label: t.signIn },
      ],
    },
  ];

  const social = [
    {
      label: "YouTube",
      path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z",
    },
    {
      label: "Facebook",
      path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6L16 12h-3V10c0-.6.4-1 1-1z",
    },
    {
      label: "Instagram",
      path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.2 7.1a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z",
    },
    {
      label: "X",
      href: "https://x.com/bhaktivoice98",
      path: "M14.7 10.4 21.2 3h-1.6l-5.6 6.4L9.4 3H3.8l6.9 10L3.8 21h1.6l6-6.9 4.8 6.9h5.6zm-2.1 2.5-.7-1-5.8-8.2h2.5l4.7 6.7.7 1 6.1 8.7h-2.5z",
    },
  ];

  return (
    <footer className="mt-16 bg-maroon pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{t.footerMotto}</p>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/50">{t.footerTagline}</p>
          <div className="mt-5 flex gap-2">
            {social.map((item) => (
              <SocialMark key={item.label} label={item.label} path={item.path} href={item.href} />
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    prefetch={false}
                    className="text-sm text-white/70 hover:text-saffron"
                  >
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <NewsletterForm
          title={t.newsletterTitle}
          body={t.newsletterBody}
          placeholder={t.newsletterPlaceholder}
          button={t.subscribe}
          thanks={t.newsletterThanks}
        />
      </div>
      <div className="border-t border-white/10 px-4 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bhakti Voice. {t.footerCredit}
          </p>
          <p>{t.madeInIndia}</p>
        </div>
      </div>
    </footer>
  );
}

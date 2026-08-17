"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Menu, Search, UserRound, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { stripLocale, withLocale } from "@/lib/i18n/config";
import { PATHS } from "@/lib/seo/paths";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = useLocale();
  const t = useMessages();
  const { user, signInWithGoogle, configured } = useAuth();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [query, setQuery] = useState("");
  const moreRef = useRef<HTMLDivElement>(null);
  const current = stripLocale(pathname);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: PATHS.naamJaap, label: t.nav.naamJaap },
    { href: PATHS.katha, label: t.nav.katha },
    { href: PATHS.yatra, label: t.nav.yatra },
    { href: PATHS.sadhana, label: t.nav.sadhana },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
  ];
  const moreLinks = [
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.spirituality, label: t.nav.spirituality },
    { href: PATHS.yatraPlanner, label: t.nav.yatraPlanner },
    { href: PATHS.sankalp, label: t.nav.sankalp },
  ];

  function isActive(href: string) {
    if (href === "/") return current === "/";
    return current === href || current.startsWith(`${href}/`);
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(withLocale(`/search?q=${encodeURIComponent(query.trim())}`, locale));
    setOpen(false);
  }

  useEffect(() => {
    setMore(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!more) return;
    function onPointer(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMore(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMore(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [more]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-2 px-4 py-3 sm:gap-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className={`text-sm ${
                isActive(item.href)
                  ? "font-medium text-saffron-deep underline decoration-2 underline-offset-8"
                  : "text-ink/80 hover:text-saffron"
              }`}
            >
              {item.label}
            </LocaleLink>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMore((value) => !value)}
              className={`cursor-pointer text-sm ${more ? "text-saffron" : "text-ink/80 hover:text-saffron"}`}
              aria-expanded={more}
            >
              {t.more}
            </button>
            {more && (
              <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-line">
                {moreLinks.map((item) => (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setMore(false)}
                    className="block cursor-pointer rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream"
                  >
                    {item.label}
                  </LocaleLink>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <form onSubmit={onSearch} className="hidden items-center md:flex">
            <label className="sr-only" htmlFor="site-search">
              {t.search}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.search}
                className="h-10 w-44 rounded-full border border-line bg-white pl-9 pr-3 text-sm outline-none focus:border-saffron"
              />
            </div>
          </form>
          <LanguageSwitcher />
          {user ? (
            <LocaleLink
              href="/profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
              aria-label={t.profile}
            >
              <UserRound className="h-5 w-5" />
            </LocaleLink>
          ) : (
            <button
              type="button"
              onClick={() => (configured ? signInWithGoogle() : router.push(withLocale("/login", locale)))}
              className="hidden cursor-pointer rounded-full bg-navy px-5 py-2 text-sm font-medium text-white md:inline-flex"
            >
              {t.signIn}
            </button>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={t.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-line bg-ivory px-4 py-4 pb-28 lg:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-11 w-full rounded-full border border-line bg-white px-4 text-sm"
            />
          </form>
          <div className="grid gap-1">
            {[...nav, ...moreLinks].map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink hover:bg-cream"
              >
                {item.label}
              </LocaleLink>
            ))}
            {user ? (
              <LocaleLink
                href="/profile"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink hover:bg-cream"
              >
                {t.profile}
              </LocaleLink>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  configured ? signInWithGoogle() : router.push(withLocale("/login", locale));
                }}
                className="rounded-xl px-3 py-2.5 text-left text-ink hover:bg-cream"
              >
                {t.signIn}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

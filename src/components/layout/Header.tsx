"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, UserRound, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { stripLocale, withLocale } from "@/lib/i18n/config";
import { SpiritualToolsMenu } from "@/components/spiritual-tools/SpiritualToolsMenu";
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
  ];
  const moreLinks = [
    { href: PATHS.calendar, label: locale === "hi" ? "हिन्दू कैलेंडर" : "Hindu Calendar" },
    { href: PATHS.panchangToday, label: locale === "hi" ? "आज का पंचांग" : "Today's Panchang" },
    { href: PATHS.community, label: t.nav.community },
    { href: PATHS.store, label: t.nav.store },
    { href: PATHS.blog, label: t.nav.blog },
    { href: PATHS.temples, label: t.nav.temples },
    { href: PATHS.festivals, label: t.nav.festivals },
    { href: PATHS.tithi, label: t.nav.tithi },
    { href: PATHS.quotes, label: t.nav.quotes },
    { href: PATHS.mantras, label: t.nav.mantras },
    { href: PATHS.bhajan, label: t.nav.bhajan },
    { href: PATHS.aarti, label: t.nav.aarti },
    { href: PATHS.chalisa, label: t.nav.chalisa },
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
    <header className="sticky top-0 z-40 bg-[#fff9f2]/95 shadow-[0_1px_0_rgba(74,16,20,0.06)] backdrop-blur lg:bg-white/95">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-3 px-4 py-3.5 sm:gap-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-wide ${
                isActive(item.href)
                  ? "font-semibold text-maroon underline decoration-saffron decoration-2 underline-offset-[10px]"
                  : "font-medium text-ink/70 hover:text-saffron"
              }`}
            >
              {item.label}
            </LocaleLink>
          ))}
          <SpiritualToolsMenu />
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMore((value) => !value)}
              className={`inline-flex cursor-pointer items-center gap-0.5 text-[13px] tracking-wide ${
                more ? "font-semibold text-saffron" : "font-medium text-ink/70 hover:text-saffron"
              }`}
              aria-expanded={more}
            >
              {t.more}
              <ChevronDown className="h-3.5 w-3.5" />
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <form
            onSubmit={onSearch}
            className="hidden h-10 overflow-hidden rounded-full bg-[#f4efe8] md:flex"
          >
            <label className="sr-only" htmlFor="site-search">
              {t.search}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-10 w-44 border-0 bg-transparent pl-10 pr-2 text-sm text-ink outline-none placeholder:text-muted/80"
              />
            </div>
            <button
              type="submit"
              className="m-[3px] inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-saffron text-white hover:bg-saffron-deep"
              aria-label={t.search}
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <LanguageSwitcher />
          {user ? (
            <LocaleLink
              href="/profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4efe8]"
              aria-label={t.profile}
            >
              <UserRound className="h-5 w-5" />
            </LocaleLink>
          ) : (
            <button
              type="button"
              onClick={() => (configured ? signInWithGoogle() : router.push(withLocale("/login", locale)))}
              className="hidden cursor-pointer rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-white hover:bg-saffron-deep md:inline-flex"
            >
              {t.signIn}
            </button>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f4efe8] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={t.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-line bg-ivory px-4 py-4 pb-28 lg:hidden">
          <form onSubmit={onSearch} className="mb-3 flex h-11 overflow-hidden rounded-full border border-line bg-white">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-11 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm outline-none"
            />
            <button
              type="submit"
              className="m-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron text-white"
              aria-label={t.search}
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <div className="grid gap-1">
            <SpiritualToolsMenu mobile onNavigate={() => setOpen(false)} />
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

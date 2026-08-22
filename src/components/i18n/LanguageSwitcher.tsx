"use client";

import { withLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";

/** Vercel/Next can report the homepage as `/index`; that must not become `/hi/index`. */
function switcherPath(pathname: string): string {
  if (pathname === "/index" || pathname === "/index.html") return "/";
  if (pathname === "/hi/index" || pathname === "/hi/index.html") return "/hi";
  return pathname || "/";
}

export function LanguageSwitcher() {
  const pathname = switcherPath(usePathname() || "/");
  const locale = useLocale();
  const next = locale === "en" ? "hi" : "en";
  const href = withLocale(pathname, next);

  return (
    <a
      href={href}
      hrefLang={next === "hi" ? "hi-IN" : "en-IN"}
      className="inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full bg-[#f4efe8] px-2.5 text-xs font-medium text-ink/70 hover:text-saffron sm:px-3"
      aria-label={next === "hi" ? "हिंदी में देखें" : "View in English"}
    >
      {next === "hi" ? "हिंदी" : "EN"}
    </a>
  );
}

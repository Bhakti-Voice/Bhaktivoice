"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { withLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const next = locale === "en" ? "hi" : "en";
  const href = withLocale(pathname, next);

  return (
    <Link
      href={href}
      hrefLang={next === "hi" ? "hi-IN" : "en-IN"}
      className="inline-flex h-10 items-center rounded-full border border-line bg-white px-3 text-xs font-medium text-ink/80 hover:text-saffron"
      aria-label={next === "hi" ? "हिंदी में देखें" : "View in English"}
    >
      {next === "hi" ? "हिंदी" : "EN"}
    </Link>
  );
}

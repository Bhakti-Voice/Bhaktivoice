"use client";

import { withLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const next = locale === "en" ? "hi" : "en";
  const href = withLocale(pathname, next);

  return (
    <a
      href={href}
      hrefLang={next === "hi" ? "hi-IN" : "en-IN"}
      className="inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full border border-line bg-white px-2.5 text-xs font-medium text-ink/80 hover:text-saffron sm:px-3"
      aria-label={next === "hi" ? "हिंदी में देखें" : "View in English"}
    >
      {next === "hi" ? "हिंदी" : "EN"}
    </a>
  );
}

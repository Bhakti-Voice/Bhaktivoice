"use client";

import { useLocale } from "@/lib/i18n/client";

/** Marks the document language in the first HTML so Google sees Hindi vs English. */
export function LocaleRoot({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return <div lang={locale === "hi" ? "hi" : "en"}>{children}</div>;
}

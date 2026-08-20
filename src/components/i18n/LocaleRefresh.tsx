"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";

/** Sets html lang after paint; LocaleRoot already marks language in the first HTML. */
export function LocaleRefresh() {
  const locale = useLocale();
  const router = useRouter();
  const previous = useRef(locale);

  useEffect(() => {
    document.documentElement.lang = locale === "hi" ? "hi" : "en";
  }, [locale]);

  useEffect(() => {
    if (previous.current === locale) return;
    previous.current = locale;
    router.refresh();
  }, [locale, router]);

  return null;
}

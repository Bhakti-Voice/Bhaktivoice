"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";

/** Hindi is rewritten onto the same page tree, so the router cache can keep the old CMS locale. */
export function LocaleRefresh() {
  const locale = useLocale();
  const router = useRouter();
  const previous = useRef(locale);

  useEffect(() => {
    if (previous.current === locale) return;
    previous.current = locale;
    router.refresh();
  }, [locale, router]);

  return null;
}

"use client";

import { ChevronRight, Home } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";
import type { BreadcrumbItem } from "@/lib/content/types";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items, jsonLd = true }: { items: BreadcrumbItem[]; jsonLd?: boolean }) {
  const locale = useLocale();
  const localized = items.map((item) => ({ ...item, href: withLocale(item.href, locale) }));

  return (
    <>
      {jsonLd ? <JsonLd data={breadcrumbSchema(localized)} /> : null}
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {localized.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 ? (
                <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden="true" />
              ) : null}
              {index === items.length - 1 ? (
                <span className="font-semibold text-ink line-clamp-1 max-w-[240px] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <LocaleLink
                  href={item.href}
                  className="flex items-center gap-1 transition-colors hover:text-saffron-deep font-medium"
                >
                  {index === 0 ? <Home className="h-3.5 w-3.5 text-saffron/80" /> : null}
                  <span>{item.name}</span>
                </LocaleLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}


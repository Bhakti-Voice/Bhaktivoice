"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";
import type { BreadcrumbItem } from "@/lib/content/types";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const locale = useLocale();
  const localized = items.map((item) => ({ ...item, href: withLocale(item.href, locale) }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(localized)} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {localized.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">›</span>}
              {index === items.length - 1 ? (
                <span className="text-ink">{item.name}</span>
              ) : (
                <LocaleLink href={item.href} className="hover:text-saffron">
                  {item.name}
                </LocaleLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

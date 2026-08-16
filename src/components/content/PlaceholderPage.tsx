import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/content/types";

export function PlaceholderPage({
  title,
  description,
  href = "/",
  label = "Return home",
  crumbs,
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
  crumbs: BreadcrumbItem[];
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Breadcrumbs items={crumbs} />
      <div className="mt-10 text-center">
        <h1 className="font-serif text-4xl text-ink">{title}</h1>
        <p className="mt-4 text-muted">{description}</p>
        <LocaleLink
          href={href}
          className="mt-8 inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-medium text-white"
        >
          {label}
        </LocaleLink>
      </div>
    </div>
  );
}

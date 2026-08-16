import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { RelatedLink } from "@/lib/content/types";

export function RelatedContent({
  title = "Continue the journey",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  const unique = links.filter(
    (link, index, all) => all.findIndex((item) => item.href === link.href) === index,
  );
  if (!unique.length) return null;

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {unique.map((link) => (
          <li key={link.href}>
            <LocaleLink
              href={link.href}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line transition hover:ring-saffron"
            >
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted">
                  {link.kind}
                </span>
                <span className="font-medium text-ink">{link.label}</span>
              </span>
              <span aria-hidden className="text-saffron">
                →
              </span>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

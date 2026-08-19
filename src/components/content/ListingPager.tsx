import { LocaleLink } from "@/components/i18n/LocaleLink";

export function ListingPager({
  page,
  pages,
  basePath,
  previousLabel,
  nextLabel,
  pageOf,
  query,
  variant = "query",
}: {
  page: number;
  pages: number;
  basePath: string;
  previousLabel: string;
  nextLabel: string;
  pageOf: (page: number, total: number) => string;
  query?: Record<string, string>;
  variant?: "query" | "path";
}) {
  if (pages <= 1) return null;

  function hrefFor(target: number) {
    if (variant === "path") {
      return target <= 1 ? basePath : `${basePath}/page/${target}`;
    }
    const params = new URLSearchParams(query);
    if (target <= 1) params.delete("page");
    else params.set("page", String(target));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-between gap-3" aria-label="Pagination">
      {page > 1 ? (
        <LocaleLink
          href={hrefFor(page - 1)}
          className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink hover:border-saffron sm:min-w-32 sm:px-6 sm:text-base"
        >
          {previousLabel}
        </LocaleLink>
      ) : (
        <span />
      )}
      <p className="text-sm text-muted">{pageOf(page, pages)}</p>
      {page < pages ? (
        <LocaleLink
          href={hrefFor(page + 1)}
          className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full bg-saffron px-5 py-3 text-sm font-medium text-white hover:bg-saffron-deep sm:min-w-32 sm:px-8 sm:text-base"
        >
          {nextLabel}
        </LocaleLink>
      ) : (
        <span />
      )}
    </nav>
  );
}

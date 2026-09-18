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

  const pageNumbers: (number | "...")[] = [];
  if (pages <= 7) {
    for (let i = 1; i <= pages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(pages - 1, page + 1);
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    if (page < pages - 2) pageNumbers.push("...");
    pageNumbers.push(pages);
  }

  return (
    <nav className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between" aria-label="Pagination">
      <div className="flex w-full items-center justify-between sm:w-auto sm:gap-3">
        {page > 1 ? (
          <LocaleLink
            href={hrefFor(page - 1)}
            rel="prev"
            className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-stone-700 shadow-2xs hover:border-saffron hover:text-saffron-deep transition-all"
          >
            ← {previousLabel}
          </LocaleLink>
        ) : (
          <span className="min-w-24" />
        )}
        <p className="text-xs font-medium text-stone-500 sm:hidden">{pageOf(page, pages)}</p>
        {page < pages ? (
          <LocaleLink
            href={hrefFor(page + 1)}
            rel="next"
            className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all sm:hidden"
          >
            {nextLabel} →
          </LocaleLink>
        ) : (
          <span className="min-w-24 sm:hidden" />
        )}
      </div>

      <div className="hidden sm:flex items-center gap-1.5">
        {pageNumbers.map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`dots-${idx}`} className="px-2 text-xs font-bold text-stone-400">
                •••
              </span>
            );
          }
          const isCurrent = p === page;
          return (
            <LocaleLink
              key={p}
              href={hrefFor(p)}
              aria-current={isCurrent ? "page" : undefined}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                isCurrent
                  ? "bg-gradient-to-r from-saffron to-saffron-deep text-white shadow-xs ring-1 ring-saffron/30"
                  : "bg-white text-stone-700 ring-1 ring-stone-200/80 hover:bg-amber-50 hover:text-saffron-deep"
              }`}
            >
              {p}
            </LocaleLink>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <p className="text-xs font-medium text-stone-500">{pageOf(page, pages)}</p>
        {page < pages ? (
          <LocaleLink
            href={hrefFor(page + 1)}
            rel="next"
            className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            {nextLabel} →
          </LocaleLink>
        ) : (
          <span className="min-w-24" />
        )}
      </div>
    </nav>
  );
}

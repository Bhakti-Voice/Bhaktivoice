export const LISTING_PAGE_SIZE = 16;

export function parseListingPage(raw?: string | string[]) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const page = Number(value);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
}

export function getListingPageCount(length: number) {
  if (length <= 0) return 0;
  return Math.ceil(length / LISTING_PAGE_SIZE);
}

export function getListingPage<T>(items: T[], page: number) {
  const pages = getListingPageCount(items.length);
  const current = pages ? Math.min(Math.max(page, 1), pages) : 1;
  const start = (current - 1) * LISTING_PAGE_SIZE;
  return {
    items: items.slice(start, start + LISTING_PAGE_SIZE),
    page: current,
    pages,
  };
}

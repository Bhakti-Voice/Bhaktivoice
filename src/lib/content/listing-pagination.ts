export const LISTING_PAGE_SIZE = 18;

export function parseListingPage(raw?: string | string[]) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const page = Number(value);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
}

export function getListingPageCount(length: number, pageSize = LISTING_PAGE_SIZE) {
  if (length <= 0) return 0;
  return Math.ceil(length / pageSize);
}

export function getListingPage<T>(items: T[], page: number, pageSize = LISTING_PAGE_SIZE) {
  const pages = getListingPageCount(items.length, pageSize);
  const current = pages ? Math.min(Math.max(page, 1), pages) : 1;
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pages,
  };
}

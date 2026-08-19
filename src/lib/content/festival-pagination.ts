export const FESTIVAL_PAGE_SIZE = 15;

export function getFestivalPageCount(length: number) {
  if (length <= 0) return 0;
  return Math.ceil(length / FESTIVAL_PAGE_SIZE);
}

export function getFestivalPage<T>(items: T[], page: number) {
  const start = (page - 1) * FESTIVAL_PAGE_SIZE;
  return items.slice(start, start + FESTIVAL_PAGE_SIZE);
}

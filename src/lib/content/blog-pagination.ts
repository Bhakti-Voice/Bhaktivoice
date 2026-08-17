export const BLOG_PAGE_SIZE = 9;

export function getBlogPageCount(length: number) {
  if (length <= 0) return 0;
  return Math.ceil(length / BLOG_PAGE_SIZE);
}

export function getBlogPage<T>(items: T[], page: number) {
  const start = (page - 1) * BLOG_PAGE_SIZE;
  return items.slice(start, start + BLOG_PAGE_SIZE);
}

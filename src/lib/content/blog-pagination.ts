export const BLOG_PAGE_SIZE = 12;

export function getBlogPageCount(length: number, pageSize = BLOG_PAGE_SIZE) {
  if (length <= 0) return 0;
  return Math.ceil(length / pageSize);
}

export function getBlogPage<T>(items: T[], page: number, pageSize = BLOG_PAGE_SIZE) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

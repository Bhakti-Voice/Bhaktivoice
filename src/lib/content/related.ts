import type { RelatedLink, SeoPage } from "./types";

export function gatherRelated(page: SeoPage, limit = 8): RelatedLink[] {
  const links = [
    ...(page.relatedArticles ?? []),
    ...(page.relatedDestinations ?? []),
    ...(page.relatedTemples ?? []),
    ...(page.relatedMantras ?? []),
    ...(page.relatedFestivals ?? []),
    ...(page.relatedKatha ?? []),
  ];
  return links.filter(
    (link, index, all) => all.findIndex((item) => item.href === link.href) === index,
  ).slice(0, limit);
}

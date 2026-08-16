export const SITE = {
  name: "Bhakti Voice",
  tagline: "Your companion on the spiritual journey.",
  description:
    "Discover naam jaap, katha, sacred yatra, temples, festivals and daily sadhana — a peaceful home for devotion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhakti.example",
  locale: "en_IN",
  twitter: "@bhakti",
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized === "/" ? "" : normalized}`;
}

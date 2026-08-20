/** ISR / fetch cache windows. Keep these long so Vercel Active CPU stays on CDN hits. */
export const CONTENT_REVALIDATE = 1800;
export const STATS_REVALIDATE = 45;
export const SEARCH_REVALIDATE = 60;
export const SITEMAP_REVALIDATE = 3600;
export const TITHI_REVALIDATE = 3600;
export const HTML_CACHE_CONTROL = "public, s-maxage=1800, stale-while-revalidate=86400";
export const STATS_CACHE_CONTROL = "public, max-age=15, s-maxage=45, stale-while-revalidate=300";
export const PRIVATE_CACHE_CONTROL = "private, no-store";

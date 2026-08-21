import { cache } from "react";
import { unstable_cache } from "next/cache";
import { expandNewlinesDeep } from "@/lib/text/newlines";
import { CONTENT_REVALIDATE, SEARCH_REVALIDATE, SITEMAP_REVALIDATE, STATS_REVALIDATE } from "@/lib/cache";

export type ContentKind =
  | "mantra"
  | "yatra"
  | "temple"
  | "festival"
  | "spirituality"
  | "blog"
  | "katha"
  | "product"
  | "bhajan"
  | "aarti";

const PRODUCTION_ORIGIN = "https://www.bhaktivoice.com";

function hostnameOf(value: string) {
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isLoopback(value: string) {
  return /localhost|127\.0\.0\.1|\[::1\]/i.test(value);
}

function isProtectedVercelUrl(value: string) {
  const host = hostnameOf(value);
  if (!host.endsWith(".vercel.app")) return false;
  return host !== "bhaktivoice.vercel.app" && host !== "www.bhaktivoice.vercel.app" && host !== "bhaktivoice.com";
}

function withBackendPrefix(origin: string) {
  const base = origin.replace(/\/$/, "");
  return base.endsWith("/api/backend") ? base : `${base}/api/backend`;
}

function publicCmsOrigin() {
  const site = (process.env.SITE_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (site && !isLoopback(site) && !isProtectedVercelUrl(site) && !site.includes("example")) {
    return withBackendPrefix(site);
  }
  const prod = (process.env.VERCEL_PROJECT_PRODUCTION_URL || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (prod && !isProtectedVercelUrl(prod)) return `https://${prod}/api/backend`;
  if (process.env.VERCEL) return `${PRODUCTION_ORIGIN}/api/backend`;
  return "";
}

function resolveCmsUrl() {
  const raw = (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "").replace(/\/$/, "");
  // Preview *.vercel.app hosts are SSO-protected, so the server gets 401 and the UI looks empty.
  if (raw && !isLoopback(raw) && !isProtectedVercelUrl(raw)) return raw;
  return publicCmsOrigin() || "http://127.0.0.1:8000";
}

const CMS_API_URL = resolveCmsUrl();

export function cmsFetchHeaders(): HeadersInit {
  const headers: Record<string, string> = {};
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (bypass) headers["x-vercel-protection-bypass"] = bypass;
  const internal =
    process.env.CMS_INTERNAL_SECRET?.trim() || process.env.SESSION_SECRET?.trim() || "";
  if (internal) headers["x-bhakti-internal"] = internal;
  return headers;
}

export type JaapStats = {
  total: number;
  todayDevotees: number;
  users: number;
  byMantra: { slug: string; total: number }[];
};

export type UserStats = {
  naam: number;
  streak: number;
  sankalps: number;
  byMantra?: { slug: string; total: number }[];
};

export type DailyQuote = {
  slug: string;
  text: string;
  attribution: string;
};

export type SearchHit = {
  title: string;
  introduction: string;
  href: string;
  kind: ContentKind;
  category: string;
  slug: string;
};

export type IndexableUrl = {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

async function cmsGet<T>(
  path: string,
  fallback: T,
  revalidate: number | false = CONTENT_REVALIDATE,
): Promise<T> {
  const url = `${CMS_API_URL}${path}`;
  try {
    const response = await fetch(url, {
      headers: cmsFetchHeaders(),
      ...(revalidate === false
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 404) {
      return fallback;
    }
    if (!response.ok) {
      console.error(`CMS ${response.status} ${url}`);
      return fallback;
    }
    return expandNewlinesDeep((await response.json()) as T);
  } catch (error) {
    console.error(`CMS unavailable ${url}`, error instanceof Error ? error.message : error);
    return fallback;
  }
}

function cachedCmsGet<T>(path: string, fallback: T, revalidate: number) {
  return unstable_cache(
    async () => cmsGet<T>(path, fallback, revalidate),
    ["cms", path, String(revalidate)],
    { revalidate },
  )();
}

async function withLocaleQuery(path: string) {
  const { getLocale } = await import("@/lib/i18n/server");
  const locale = await getLocale();
  const join = path.includes("?") ? "&" : "?";
  return `${path}${join}locale=${locale}`;
}

export function cmsUrl(path = "") {
  return `${CMS_API_URL}${path}`;
}

export async function listContent<T>(kind: string): Promise<T[]> {
  return cachedCmsGet<T[]>(await withLocaleQuery(`/api/content/${kind}`), [], CONTENT_REVALIDATE);
}

export async function getContent<T>(kind: string, slug: string): Promise<T | null> {
  return cachedCmsGet<T | null>(
    await withLocaleQuery(`/api/content/${kind}/${encodeURIComponent(slug)}`),
    null,
    CONTENT_REVALIDATE,
  );
}

export const getStats = cache(async (): Promise<JaapStats> => {
  return cachedCmsGet<JaapStats>(
    "/api/stats",
    {
      total: 0,
      todayDevotees: 0,
      users: 0,
      byMantra: [],
    },
    STATS_REVALIDATE,
  );
});

export const getDailyQuote = cache(async (): Promise<DailyQuote | null> => {
  const quote = await cachedCmsGet<DailyQuote | null>(
    await withLocaleQuery("/api/quotes/daily"),
    null,
    CONTENT_REVALIDATE,
  );
  if (!quote?.text?.trim()) return null;
  return quote;
});

export async function getLiveCommunity(slug: string) {
  return cmsGet<{
    ok?: boolean;
    slug?: string;
    name?: string;
    text?: string;
  } | null>(`/api/community/${encodeURIComponent(slug)}`, null, false);
}

export async function getUserStats(uid: string): Promise<UserStats> {
  return cmsGet<UserStats>(
    `/api/stats/user/${encodeURIComponent(uid)}`,
    {
      naam: 0,
      streak: 0,
      sankalps: 0,
    },
    false,
  );
}

export async function searchContent(query: string): Promise<SearchHit[]> {
  const q = query.trim();
  if (!q) return [];
  return cmsGet<SearchHit[]>(
    await withLocaleQuery(`/api/search?q=${encodeURIComponent(q)}`),
    [],
    SEARCH_REVALIDATE,
  );
}

export async function sitemapEntries(): Promise<IndexableUrl[]> {
  return cachedCmsGet<IndexableUrl[]>("/api/sitemap", [], SITEMAP_REVALIDATE);
}

export type QuotesList = {
  items: DailyQuote[];
  total: number;
  offset: number;
  limit: number;
};

export const listQuotesPage = cache(async (q = "", offset = 0, limit = 30): Promise<QuotesList> => {
  const query = new URLSearchParams({
    q,
    offset: String(Math.max(offset, 0)),
    limit: String(Math.min(Math.max(limit, 1), 60)),
  });
  return cmsGet<QuotesList>(
    await withLocaleQuery(`/api/quotes?${query.toString()}`),
    { items: [], total: 0, offset, limit },
    CONTENT_REVALIDATE,
  );
});

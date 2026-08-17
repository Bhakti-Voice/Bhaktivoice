import { cache } from "react";

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

const PRODUCTION_ORIGIN = "https://bhaktivoice.vercel.app";

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
  return host !== "bhaktivoice.vercel.app" && host !== "www.bhaktivoice.vercel.app";
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
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  return bypass ? { "x-vercel-protection-bypass": bypass } : {};
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

async function cmsGet<T>(path: string, fallback: T): Promise<T> {
  const url = `${CMS_API_URL}${path}`;
  try {
    const response = await fetch(url, {
      headers: cmsFetchHeaders(),
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(12000),
    });
    if (response.status === 404) {
      return fallback;
    }
    if (!response.ok) {
      console.error(`CMS ${response.status} ${url}`);
      return fallback;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`CMS unavailable ${url}`, error instanceof Error ? error.message : error);
    return fallback;
  }
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
  return cmsGet<T[]>(await withLocaleQuery(`/api/content/${kind}`), []);
}

export async function getContent<T>(kind: string, slug: string): Promise<T | null> {
  return cmsGet<T | null>(
    await withLocaleQuery(`/api/content/${kind}/${encodeURIComponent(slug)}`),
    null,
  );
}

export const getStats = cache(async (): Promise<JaapStats> => {
  return cmsGet<JaapStats>("/api/stats", {
    total: 0,
    todayDevotees: 0,
    users: 0,
    byMantra: [],
  });
});

export async function getUserStats(uid: string): Promise<UserStats> {
  return cmsGet<UserStats>(`/api/stats/user/${encodeURIComponent(uid)}`, {
    naam: 0,
    streak: 0,
    sankalps: 0,
  });
}

export async function searchContent(query: string): Promise<SearchHit[]> {
  const q = query.trim();
  if (!q) return [];
  return cmsGet<SearchHit[]>(
    await withLocaleQuery(`/api/search?q=${encodeURIComponent(q)}`),
    [],
  );
}

export async function sitemapEntries(): Promise<IndexableUrl[]> {
  return cmsGet<IndexableUrl[]>("/api/sitemap", []);
}

export function formatCount(value: number, locale: string = "en"): string {
  return value.toLocaleString(locale === "hi" || locale === "hi-IN" ? "hi-IN" : "en-IN");
}

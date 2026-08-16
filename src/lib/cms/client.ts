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

const CMS_API_URL = (
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

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
  try {
    const response = await fetch(`${CMS_API_URL}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
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

export async function getStats(): Promise<JaapStats> {
  return cmsGet<JaapStats>("/api/stats", {
    total: 0,
    todayDevotees: 0,
    users: 0,
    byMantra: [],
  });
}

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

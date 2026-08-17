import { sitemapEntries } from "@/lib/cms/client";
import { withLocale } from "@/lib/i18n/config";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const HUBS: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: PATHS.naamJaap, changeFrequency: "weekly", priority: 0.9 },
  { path: PATHS.katha, changeFrequency: "weekly", priority: 0.8 },
  { path: PATHS.yatra, changeFrequency: "weekly", priority: 0.8 },
  { path: PATHS.sadhana, changeFrequency: "weekly", priority: 0.7 },
  { path: PATHS.blog, changeFrequency: "weekly", priority: 0.7 },
  { path: PATHS.temples, changeFrequency: "weekly", priority: 0.8 },
  { path: PATHS.festivals, changeFrequency: "weekly", priority: 0.8 },
  { path: PATHS.mantras, changeFrequency: "weekly", priority: 0.8 },
  { path: PATHS.spirituality, changeFrequency: "weekly", priority: 0.7 },
  { path: PATHS.community, changeFrequency: "weekly", priority: 0.6 },
  { path: PATHS.store, changeFrequency: "weekly", priority: 0.6 },
  { path: PATHS.tithi, changeFrequency: "daily", priority: 0.7 },
  { path: PATHS.more, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.bhajan, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.aarti, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.yatraPlanner, changeFrequency: "weekly", priority: 0.6 },
  { path: PATHS.sankalp, changeFrequency: "weekly", priority: 0.5 },
  { path: PATHS.diary, changeFrequency: "weekly", priority: 0.5 },
  { path: PATHS.mala, changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  function add(
    path: string,
    lastModified: string | Date,
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: number,
  ) {
    const alts = hreflangForPath(path);
    for (const locale of ["en", "hi"] as const) {
      const localized = withLocale(path, locale);
      const url = `${SITE.url}${localized === "/" ? "" : localized}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        lastModified,
        changeFrequency,
        priority: locale === "hi" ? Math.max(0.3, priority - 0.05) : priority,
        alternates: { languages: alts },
      });
    }
  }

  for (const hub of HUBS) {
    add(hub.path, today, hub.changeFrequency, hub.priority);
  }

  const cms = await sitemapEntries();
  for (const item of cms) {
    add(item.url, item.lastModified, item.changeFrequency, item.priority);
  }

  return entries;
}

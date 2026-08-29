import { sitemapEntries } from "@/lib/cms/client";
import { withLocale } from "@/lib/i18n/config";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";
import { getAllFestivalSlugs } from "@/lib/panchang/engine";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

const CALENDAR_YEARS = ["2025", "2026", "2027", "2028", "2029", "2030"];
const CALENDAR_MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const DETAILED_MONTH_YEARS = ["2026", "2027", "2028"];

const HUBS: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: PATHS.gita, changeFrequency: "daily", priority: 0.95 },
  { path: PATHS.calendar, changeFrequency: "daily", priority: 0.95 },
  { path: PATHS.panchang, changeFrequency: "daily", priority: 0.95 },
  { path: PATHS.panchangToday, changeFrequency: "daily", priority: 0.95 },
  { path: PATHS.panchangTomorrow, changeFrequency: "daily", priority: 0.9 },
  { path: PATHS.panchangYesterday, changeFrequency: "daily", priority: 0.7 },
  { path: PATHS.spiritualTools, changeFrequency: "weekly", priority: 0.9 },
  { path: PATHS.suvicharMaker, changeFrequency: "daily", priority: 0.85 },
  { path: PATHS.kundli, changeFrequency: "weekly", priority: 0.85 },


  { path: PATHS.kundliMilan, changeFrequency: "weekly", priority: 0.85 },
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
  { path: PATHS.quotes, changeFrequency: "weekly", priority: 0.6 },
  { path: PATHS.more, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.bhajan, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.aarti, changeFrequency: "monthly", priority: 0.4 },
  { path: PATHS.chalisa, changeFrequency: "monthly", priority: 0.4 },
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

  // 1. Hub Pages (including /spiritual-tools, /panchang/today, /panchang/tomorrow, /kundli, /kundli-milan, /hindu-calendar)
  for (const hub of HUBS) {
    add(hub.path, today, hub.changeFrequency, hub.priority);
  }

  // 2. Hindu Calendar Year pages (/hindu-calendar/2025 ... 2030)
  for (const year of CALENDAR_YEARS) {
    add(`${PATHS.calendar}/${year}`, today, "monthly", 0.9);
  }

  // 3. Hindu Calendar Month pages (/hindu-calendar/2026/january ... 2028/december)
  for (const year of DETAILED_MONTH_YEARS) {
    for (const month of CALENDAR_MONTHS) {
      add(`${PATHS.calendar}/${year}/${month}`, today, "monthly", 0.85);
    }
  }

  // 4. Panchang Festival detail pages (/panchang/festivals/[slug])
  const festivalSlugs = getAllFestivalSlugs();
  for (const slug of festivalSlugs) {
    add(`/panchang/festivals/${slug}`, today, "weekly", 0.85);
  }

  // 5. CMS Dynamic Entries
  const cms = await sitemapEntries();
  for (const item of cms) {
    add(item.url, item.lastModified, item.changeFrequency, item.priority);
  }

  return entries;
}

#!/usr/bin/env node

/**
 * Ping IndexNow and search engines with Bhakti Voice priority URLs.
 * Usage: node scripts/ping-search-engines.mjs [--dry-run]
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bhaktivoice.com";
const INDEXNOW_KEY = "3b4f6e7c8d9a4b1c2d3e";
const isDryRun = process.argv.includes("--dry-run");

const HIGH_PRIORITY_PATHS = [
  "",
  "/panchang/today",
  "/panchang/tomorrow",
  "/panchang/yesterday",
  "/tithi-today",
  "/gita",
  ...Array.from({ length: 18 }, (_, i) => `/gita/chapter-${i + 1}`),
  "/spiritual-tools",
  "/spiritual-tools/suvichar-maker",
  "/spiritual-tools/baby-names",
  "/kundli",
  "/kundli/milan",
  "/kundli/sade-sati",
  "/kundli/manglik-dosha",
  "/kundli/kaal-sarp-dosha",
  "/panchang/gochar",
  "/panchang/graha-sthiti",
  "/panchang/tarabalam",
  "/vrat",
  "/vrat/ekadashi",
  "/muhurat",
  "/muhurat/choghadiya",
  "/muhurat/panchak",
  "/muhurat/bhadra",
  "/muhurat/hora",
  "/muhurat/gowri",
  "/calendar",
  "/calendar/printable",
  "/grahan",
  "/naam-jaap",
  "/chalisa",
  "/aarti",
  "/mantras",
  "/bhajans",
  "/festivals",
  "/blog",
  "/katha",
  "/yatra",
  "/temples",
  "/sadhana",
  "/quotes",

  // Hindi paths
  "/hi",
  "/hi/panchang/today",
  "/hi/tithi-today",
  "/hi/gita",
  ...Array.from({ length: 18 }, (_, i) => `/hi/gita/chapter-${i + 1}`),
  "/hi/spiritual-tools",
  "/hi/spiritual-tools/suvichar-maker",
  "/hi/spiritual-tools/baby-names",
  "/hi/kundli",
  "/hi/kundli/milan",
  "/hi/kundli/sade-sati",
  "/hi/kundli/manglik-dosha",
  "/hi/kundli/kaal-sarp-dosha",
  "/hi/panchang/gochar",
  "/hi/panchang/graha-sthiti",
  "/hi/panchang/tarabalam",
  "/hi/vrat",
  "/hi/vrat/ekadashi",
  "/hi/muhurat",
  "/hi/muhurat/choghadiya",
  "/hi/muhurat/panchak",
  "/hi/muhurat/bhadra",
  "/hi/muhurat/hora",
  "/hi/muhurat/gowri",
  "/hi/calendar",
  "/hi/calendar/printable",
  "/hi/grahan",
  "/hi/naam-jaap",
  "/hi/chalisa",
  "/hi/aarti",
  "/hi/mantras",
  "/hi/bhajans",
  "/hi/festivals",
  "/hi/blog",
  "/hi/katha",
  "/hi/yatra",
  "/hi/temples",
  "/hi/sadhana",
  "/hi/quotes",

  // Telugu paths
  "/te",
  "/te/panchang/today",
  "/te/tithi-today",
  "/te/gita",
  "/te/spiritual-tools",
  "/te/spiritual-tools/suvichar-maker",
  "/te/spiritual-tools/baby-names",
  "/te/kundli",
  "/te/kundli/milan",
  "/te/kundli/sade-sati",
  "/te/kundli/manglik-dosha",
  "/te/kundli/kaal-sarp-dosha",
  "/te/panchang/gochar",
  "/te/panchang/graha-sthiti",
  "/te/panchang/tarabalam",
  "/te/vrat",
  "/te/vrat/ekadashi",
  "/te/muhurat",
  "/te/muhurat/choghadiya",
  "/te/muhurat/panchak",
  "/te/muhurat/bhadra",
  "/te/muhurat/hora",
  "/te/muhurat/gowri",
  "/te/calendar",
  "/te/calendar/printable",
  "/te/grahan",
];

const urlsToPing = HIGH_PRIORITY_PATHS.map((p) => `${SITE_URL}${p}`);

console.log(`[SEO Ping] Prepared ${urlsToPing.length} high-priority URLs for indexing.`);

if (isDryRun) {
  console.log("[SEO Ping] Dry-run mode enabled. Sample URLs:");
  urlsToPing.slice(0, 5).forEach((u) => console.log(`  - ${u}`));
  console.log(`  ... and ${urlsToPing.length - 5} more.`);
  process.exit(0);
}

async function pingIndexNow() {
  const host = new URL(SITE_URL).hostname;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlsToPing,
  };

  try {
    console.log("[IndexNow] Submitting URLs to https://api.indexnow.org/indexnow ...");
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 202) {
      console.log(`[IndexNow] Success! Status: ${res.status} (${urlsToPing.length} URLs submitted)`);
    } else {
      const text = await res.text();
      console.warn(`[IndexNow] Warning: Received status ${res.status}: ${text}`);
    }
  } catch (err) {
    console.error("[IndexNow] Error submitting to IndexNow:", err.message);
  }
}

async function pingBingSitemap() {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const pingUrl = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
  try {
    console.log("[Bing Ping] Notifying Bing of sitemap update ...");
    const res = await fetch(pingUrl);
    console.log(`[Bing Ping] Completed with status: ${res.status}`);
  } catch (err) {
    console.error("[Bing Ping] Error pinging Bing sitemap:", err.message);
  }
}

async function main() {
  await pingIndexNow();
  await pingBingSitemap();
  console.log("[SEO Ping] All ping tasks completed.");
}

main();

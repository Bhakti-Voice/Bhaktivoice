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
  "/aaj-ki-tithi",
  "/bhagavad-gita",
  ...Array.from({ length: 18 }, (_, i) => `/bhagavad-gita/chapter-${i + 1}`),
  "/spiritual-tools",
  "/suvichar-card-maker",
  "/kundli",
  "/kundli-milan",
  "/naam-jaap",
  "/chalisa",
  "/aarti-chants",
  "/mantras-for-naam-jaap",
  "/hindu-calendar",
  "/hindu-festivals",
  "/katha-stories",
  "/sacred-yatra-guides",
  "/hindu-temples",
  "/daily-sadhana",
  // Hindi paths
  "/hi",
  "/hi/panchang/today",
  "/hi/aaj-ki-tithi",
  "/hi/bhagavad-gita",
  ...Array.from({ length: 18 }, (_, i) => `/hi/bhagavad-gita/chapter-${i + 1}`),
  "/hi/suvichar-card-maker",
  "/hi/kundli",
  "/hi/naam-jaap",
  "/hi/chalisa",
  "/hi/aarti-chants",
  "/hi/hindu-calendar",
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

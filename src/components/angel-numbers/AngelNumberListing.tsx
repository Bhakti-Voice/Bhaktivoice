"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, Sparkles, X } from "lucide-react";
import type { AngelNumberPage } from "@/lib/content/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AngelNumberCard } from "./AngelNumberCard";
import { AngelNumberHeroCard } from "./AngelNumberHeroCard";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useLocale } from "@/lib/i18n/client";

export interface AngelNumberListingProps {
  items: AngelNumberPage[];
  locale?: string;
}

export function AngelNumberListing({ items }: AngelNumberListingProps) {
  const currentLocale = useLocale();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "num_asc" | "num_desc">("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Breadcrumbs: strictly follow user request: Home -> Library -> Angel Numbers
  const homeLabel = currentLocale === "te" ? "హోమ్" : currentLocale === "hi" ? "होम" : "Home";
  const libraryLabel = currentLocale === "te" ? "లైబ్రరీ" : currentLocale === "hi" ? "लाइब्रेरी" : "Library";
  const angelLabel = currentLocale === "te" ? "దేవదూత సంఖ్యలు" : currentLocale === "hi" ? "एंजेल नंबर्स" : "Angel Numbers";

  const breadcrumbs = [
    { name: homeLabel, href: "/" },
    { name: libraryLabel, href: "/library" },
    { name: angelLabel, href: "/library/angel-numbers" },
  ];

  // Helper to get raw numeric value
  const parseNum = (item: AngelNumberPage): number => {
    if (item.number && !isNaN(Number(item.number))) return Number(item.number);
    const m = item.slug?.match(/(\d+)/) || item.title?.match(/(\d+)/);
    return m ? Number(m[1]) : 0;
  };

  // Filtered and sorted items
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let res = items.filter((item) => {
      // Text / query search
      if (q) {
        const numStr = (item.number || "").toLowerCase();
        const titleStr = (item.title || "").toLowerCase();
        const excerptStr = (item.excerpt || "").toLowerCase();
        const slugStr = (item.slug || "").toLowerCase();
        const matches =
          numStr.includes(q) ||
          titleStr.includes(q) ||
          excerptStr.includes(q) ||
          slugStr.includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (categoryFilter === "repeating") {
        const n = String(parseNum(item));
        const isRepeating = n.length > 1 && n.split("").every((ch) => ch === n[0]);
        if (!isRepeating) return false;
      } else if (categoryFilter === "hundreds") {
        const n = parseNum(item);
        if (n < 100 || n > 999) return false;
      }

      return true;
    });

    // Sorting
    res = [...res].sort((a, b) => {
      if (sortOrder === "num_asc") {
        return parseNum(a) - parseNum(b);
      }
      if (sortOrder === "num_desc") {
        return parseNum(b) - parseNum(a);
      }
      // latest first (by publishedAt or id)
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA;
    });

    return res;
  }, [items, search, categoryFilter, sortOrder]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-3 pb-8 sm:px-6 sm:pt-4 sm:pb-10 lg:px-8">
      {/* Breadcrumbs: strictly Home > Library > Angel Numbers */}
      <div className="mb-2 sm:mb-2.5">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero Section: Compact and elegant matching user mockup */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-1 mb-4 sm:mb-5">
        {/* Left Column: Heading, Subtitle & Description */}
        <div className="max-w-xl">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2b1712]">
            Angel Numbers
          </h1>
          <p className="mt-1 text-sm sm:text-base font-serif font-medium text-[#7d4b31]">
            Divine messages in numbers to guide your life
          </p>
          <p className="mt-1.5 text-xs sm:text-[13px] text-stone-600 max-w-lg leading-relaxed">
            Angel numbers are repeating number sequences believed to carry guidance from the universe
            and your guardian angels. Explore their meanings and discover the message meant for you.
          </p>
        </div>

        {/* Right Column: Ethereal floating wings & quote */}
        <div className="shrink-0 flex justify-center md:justify-end">
          <AngelNumberHeroCard />
        </div>
      </div>

      {/* Controls Bar: Sleek and compact matching user reference */}
      <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search input with icon */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search angel numbers..."
            className="w-full h-8.5 pl-8 pr-7 text-xs bg-white rounded-full border border-[#ebdccb] text-[#2c1810] placeholder:text-stone-400 outline-none focus:border-amber-500 shadow-2xs transition-all"
          />
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>

        {/* Filter Controls (Category, Sort, View Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-8.5 px-3 pr-7 text-xs font-medium bg-white rounded-full border border-[#ebdccb] text-[#2c1810] outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
          >
            <option value="all">All Articles</option>
            <option value="repeating">Repeating (555, 777...)</option>
            <option value="hundreds">3-Digit (100–999)</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="h-8.5 px-3 pr-7 text-xs font-medium bg-white rounded-full border border-[#ebdccb] text-[#2c1810] outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
          >
            <option value="latest">Latest First</option>
            <option value="num_asc">Number: Low to High</option>
            <option value="num_desc">Number: High to Low</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-[#faf4ec] rounded-lg border border-[#eddccb] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#eed9cf] text-[#78350f] shadow-2xs"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              title="Grid View (4 columns)"
              aria-label="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#eed9cf] text-[#78350f] shadow-2xs"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cards (4 columns on desktop, compact cards) */}
      {filtered.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {filtered.map((item) => (
              <AngelNumberCard
                key={item.slug}
                slug={item.slug}
                number={item.number}
                title={item.title}
                excerpt={item.excerpt || item.introduction}
                publishedAt={item.publishedAt}
                heroImage={item.heroImage}
                category={item.category || "Angel Number"}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <LocaleLink
                key={item.slug}
                href={`/library/angel-numbers/${item.slug}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#ebdccb] hover:border-amber-400/90 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center font-serif text-2xl font-bold text-[#2d1b14] shrink-0">
                    {item.number || item.slug.replace(/[^0-9]/g, "") || "★"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-[#fdf0ec] px-2 py-0.5 text-[10px] font-semibold text-[#b8532f]">
                        {item.category || "Angel Number"}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {item.publishedAt || "Aug 11, 2026"}
                      </span>
                    </div>
                    <h2 className="font-serif text-base font-bold text-[#2c1810] group-hover:text-saffron-deep transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                      {item.excerpt || item.introduction}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-xs font-semibold text-stone-700 group-hover:text-saffron-deep transition-colors sm:pr-2">
                  Read More &rarr;
                </div>
              </LocaleLink>
            ))}
          </div>
        )
      ) : (
        /* Empty search state */
        <div className="text-center py-16 px-4 bg-[#fffdfa] rounded-3xl border border-[#eedec9] max-w-lg mx-auto">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-700 mb-3">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#2c1810]">
            No Angel Numbers Found
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            We couldn&apos;t find any angel number matching &ldquo;{search}&rdquo;. Try searching for numbers like &ldquo;500&rdquo;, &ldquo;555&rdquo;, or &ldquo;777&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategoryFilter("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-saffron text-white text-xs font-semibold hover:bg-saffron-deep transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

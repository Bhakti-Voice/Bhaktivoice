"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, BookOpen, ExternalLink, Search, ArrowRight } from "lucide-react";
import { ListingCard } from "@/components/content/ListingCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import type { SearchHit } from "@/lib/cms/client";
import type { DirectDevotionalAnswer } from "@/lib/search/unified-search";

const SUGGESTED_QUERIES_EN = [
  "Bhagavad Gita Chapter 2",
  "Hanuman Chalisa",
  "Today Panchang",
  "Gayatri Mantra",
  "Kundli",
  "Karmanye Vadhikaraste",
  "Suvichar Status",
  "Naam Jaap",
];

const SUGGESTED_QUERIES_HI = [
  "भगवद्गीता अध्याय २",
  "श्री हनुमान चालीसा",
  "आज का पंचांग",
  "गायत्री मंत्र",
  "जन्म कुंडली",
  "कर्मण्येवाधिकारस्ते",
  "दैनिक सुविचार",
  "नाम जप",
];

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const locale = useLocale();
  const isHi = locale === "hi";
  const t = useMessages();

  const [results, setResults] = useState<SearchHit[]>([]);
  const [directAnswer, setDirectAnswer] = useState<DirectDevotionalAnswer | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(Boolean(query));

  useEffect(() => {
    if (!query) {
      setResults([]);
      setDirectAnswer(null);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({ q: query, locale });

    fetch(`/api/search?${params}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) {
          setResults([]);
          setDirectAnswer(null);
        } else if (Array.isArray(data)) {
          setResults(data);
          setDirectAnswer(null);
        } else {
          setResults(Array.isArray(data.results) ? data.results : []);
          setDirectAnswer(data.directAnswer || null);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResults([]);
          setDirectAnswer(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query, locale]);

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const r of results) {
      if (r.kind) set.add(r.kind);
    }
    return Array.from(set);
  }, [results]);

  const filteredResults = useMemo(() => {
    if (selectedCategory === "all") return results;
    return results.filter((r) => r.kind === selectedCategory);
  }, [results, selectedCategory]);

  const suggestions = isHi ? SUGGESTED_QUERIES_HI : SUGGESTED_QUERIES_EN;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={localizedCrumbs(t.homeName, [t.search, "/search"])} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-ink">
        {t.search}
      </h1>

      <p className="mt-2 text-sm sm:text-base text-muted">
        {query
          ? loading
            ? t.common.searchResults(query)
            : t.common.searchCount(results.length, query)
          : t.common.searchEmpty}
      </p>

      {/* Direct Devotional Answer Card (GEO / Direct Knowledge Engine) */}
      {directAnswer ? (
        <div className="mt-6 overflow-hidden rounded-3xl border-2 border-saffron/40 bg-gradient-to-br from-[#fffdf9] to-[#fff8ee] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-saffron-deep font-semibold text-xs sm:text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>{isHi ? "प्रामाणिक शास्त्र उत्तर" : "Scriptural Direct Answer"}</span>
            <span className="rounded-full bg-saffron/10 px-2.5 py-0.5 text-xs text-saffron-deep font-medium normal-case ml-auto">
              {directAnswer.category}
            </span>
          </div>

          <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-ink">
            {directAnswer.title}
          </h2>

          {directAnswer.sanskrit ? (
            <div className="mt-4 rounded-2xl bg-white p-4 sm:p-5 border border-[#eedec9] shadow-2xs">
              <p className="font-serif text-lg sm:text-xl font-medium text-ink leading-relaxed">
                {directAnswer.sanskrit}
              </p>
            </div>
          ) : null}

          <div className="mt-4 space-y-2 text-sm sm:text-base leading-relaxed text-ink/80">
            <p>
              <strong className="text-ink font-semibold">{isHi ? "भावार्थ: " : "Meaning: "}</strong>
              {directAnswer.meaning}
            </p>
            {directAnswer.significance ? (
              <p>
                <strong className="text-ink font-semibold">{isHi ? "आध्यात्मिक महत्व: " : "Spiritual Essence: "}</strong>
                {directAnswer.significance}
              </p>
            ) : null}
          </div>

          <div className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between gap-4">
            <span className="text-xs text-muted">
              {isHi ? "स्रोत: " : "Source: "} {directAnswer.source}
            </span>
            <Link
              href={directAnswer.sourceUrl}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:text-saffron transition-colors"
            >
              <span>{isHi ? "विस्तार से पढ़ें" : "Explore Full Guide"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : null}

      {/* Filter Chips */}
      {categories.length > 1 ? (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-saffron text-white shadow-2xs"
                : "bg-sand/60 text-ink hover:bg-sand"
            }`}
          >
            {isHi ? "सभी परिणाम" : "All Results"} ({results.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-saffron text-white shadow-2xs"
                  : "bg-sand/60 text-ink hover:bg-sand"
              }`}
            >
              {cat} ({results.filter((r) => r.kind === cat).length})
            </button>
          ))}
        </div>
      ) : null}

      {/* Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredResults.map((item) => (
            <ListingCard
              key={item.href}
              href={item.href}
              title={item.title}
              text={item.introduction}
              imageAlt={item.title}
              meta={item.kind}
            />
          ))}
        </div>
      ) : null}

      {/* Empty State or Suggestions */}
      {!loading && filteredResults.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-[#eedec9] bg-white p-8 sm:p-12 text-center shadow-xs">
          <Search className="mx-auto h-10 w-10 text-saffron/60" />
          <h2 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-ink">
            {query
              ? isHi
                ? `"${query}" के लिए कोई परिणाम नहीं मिला`
                : `No results found for "${query}"`
              : isHi
              ? "पवित्र शास्त्रों व पंचांग में खोजें"
              : "Search Sacred Scriptures & Panchang"}
          </h2>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            {isHi
              ? "श्रीमद्भगवद्गीता के श्लोक, आज का पंचांग, दैनिक सुविचार, मंत्र, आरती और धार्मिक तीर्थ स्थलों की खोज करें।"
              : "Search across Bhagavad Gita verses, daily Panchang, Kundli, mantras, aartis, chalisas, and temple guides."}
          </p>

          <div className="mt-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              {isHi ? "लोकप्रिय खोज सुझाव" : "Popular Searches"}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {suggestions.map((item) => (
                <Link
                  key={item}
                  href={`/search?q=${encodeURIComponent(item)}`}
                  className="rounded-full border border-line bg-[#fffdf9] px-4 py-1.5 text-xs sm:text-sm font-medium text-ink hover:border-saffron/50 hover:bg-sand/40 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

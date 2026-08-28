"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ListingSearch } from "@/components/content/ListingSearch";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import { Sparkles } from "lucide-react";

const PAGE_SIZE = 30;

type Quote = {
  slug: string;
  text: string;
  attribution: string;
};

export type QuotesList = {
  items: Quote[];
  total: number;
  offset: number;
  limit: number;
};

function matchesQuery(quote: Quote, query: string) {
  if (!query) return true;
  return `${quote.text} ${quote.attribution}`.toLowerCase().includes(query);
}

export function QuotesExplorer({ initial }: { initial: QuotesList }) {
  const locale = useLocale();
  const t = useMessages();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [items, setItems] = useState<Quote[]>(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  const skipFirstFetch = useRef(true);

  const needle = query.trim().toLowerCase();
  const shown =
    needle && needle !== debounced.toLowerCase()
      ? items.filter((item) => matchesQuery(item, needle))
      : items;

  const load = useCallback(
    async (search: string, offset: number, append: boolean) => {
      const id = ++requestId.current;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          locale,
          q: search,
          offset: String(offset),
          limit: String(PAGE_SIZE),
        });
        const response = await fetch(`/api/quotes?${params}`);
        const data = (await response.json()) as QuotesList;
        if (id !== requestId.current) return;
        const next = Array.isArray(data.items) ? data.items : [];
        setItems((current) => (append ? [...current, ...next] : next));
        setTotal(typeof data.total === "number" ? data.total : next.length);
      } catch {
        if (id !== requestId.current) return;
        if (!append) {
          setItems([]);
          setTotal(0);
        }
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(query.trim()), 180);
    return () => window.clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    if (skipFirstFetch.current) {
      skipFirstFetch.current = false;
      if (!debounced) return;
    }
    void load(debounced, 0, false);
  }, [debounced, load]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loading) return;
        if (items.length >= total) return;
        void load(debounced, items.length, true);
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [debounced, items.length, load, loading, total]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">{t.hubs.quotes.h1}</h1>
          <p className="mt-1 text-xs text-muted">
            {locale === "hi"
              ? "दैनिक प्रेरणादायक आध्यात्मिक एवं दार्शनिक विचार"
              : "Daily inspirational spiritual and devotional wisdom"}
          </p>
        </div>

        <LocaleLink
          href={PATHS.suvicharMaker}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-amber-600 hover:to-orange-700 active:scale-[0.99]"
        >
          <Sparkles className="h-4 w-4" />
          <span>{locale === "hi" ? "🎨 व्हाट्सएप स्टेटस कार्ड बनाएं" : "🎨 Create WhatsApp Status"}</span>
        </LocaleLink>
      </div>

      <div className="mt-5">
        <ListingSearch
          value={query}
          onChange={setQuery}
          placeholder={t.common.quoteSearch}
          label={t.search}
        />
      </div>

      {shown.length ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shown.map((quote, index) => (
            <article
              key={quote.slug || `${quote.text.slice(0, 40)}-${index}`}
              className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-xs ring-1 ring-line transition hover:ring-saffron/30 sm:p-5"
            >
              <div>
                <p className="font-serif text-sm leading-relaxed text-ink sm:text-base">{quote.text}</p>
                {quote.attribution ? (
                  <p className="mt-2 text-xs font-medium text-muted">— {quote.attribution}</p>
                ) : null}
              </div>

              <div className="mt-4 border-t border-line/60 pt-3">
                <LocaleLink
                  href={PATHS.suvicharMaker}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{locale === "hi" ? "इसका स्टेटस कार्ड बनाएं →" : "Create Card →"}</span>
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">
          {query.trim() ? t.common.quotesNone : t.common.quotesEmpty}
        </p>
      )}
      <div ref={sentinel} className="h-8" aria-hidden />
    </div>
  );
}


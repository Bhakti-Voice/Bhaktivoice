"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useLocale, useMessages } from "@/lib/i18n/client";

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
      <h1 className="font-serif text-2xl text-ink">{t.hubs.quotes.h1}</h1>
      <label className="mt-5 flex h-11 items-center gap-2 rounded-full bg-white px-4 ring-1 ring-line">
        <Search className="h-4 w-4 shrink-0 text-muted" />
        <span className="sr-only">{t.common.quoteSearch}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.common.quoteSearch}
          className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </label>

      {shown.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {shown.map((quote, index) => (
            <article
              key={quote.slug || `${quote.text.slice(0, 40)}-${index}`}
              className="rounded-2xl bg-white px-3.5 py-4 ring-1 ring-line sm:px-5"
            >
              <p className="font-serif text-[13px] leading-relaxed text-ink sm:text-base">{quote.text}</p>
              {quote.attribution ? (
                <p className="mt-2 text-[11px] text-muted sm:text-xs">— {quote.attribution}</p>
              ) : null}
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

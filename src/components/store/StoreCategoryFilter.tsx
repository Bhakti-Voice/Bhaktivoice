"use client";

import React, { useState, useMemo } from "react";
import { Filter, Search, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { ProductCard } from "./ProductCard";

export type StoreProductItem = {
  slug: string;
  name: string;
  priceInr: number;
  heroImage: string;
  heroImageAlt?: string;
  categorySlug?: string;
  outOfStock?: boolean;
};

export type StoreCategoryFilterProps = {
  products: StoreProductItem[];
  className?: string;
};

export function StoreCategoryFilter({ products, className = "" }: StoreCategoryFilterProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "priceAsc" | "priceDesc" | "name">("featured");

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.categorySlug) set.add(p.categorySlug);
    });
    return Array.from(set);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCat = p.categorySlug?.toLowerCase().includes(q);
          if (!matchesName && !matchesCat) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
          return false;
        }

        // In Stock filter
        if (inStockOnly && p.outOfStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priceAsc") return a.priceInr - b.priceInr;
        if (sortBy === "priceDesc") return b.priceInr - a.priceInr;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, search, selectedCategory, inStockOnly, sortBy]);

  const getCategoryLabel = (cat: string) => {
    const clean = cat.replace(/^(local-dev-|store-)/, "");
    if (clean === "malas") return isHi ? "जाप माला" : "Jaap Malas";
    if (clean === "yantras") return isHi ? "सिद्ध यंत्र" : "Sacred Yantras";
    if (clean === "puja") return isHi ? "पूजा सामग्री" : "Puja Essentials";
    if (clean === "books") return isHi ? "धार्मिक पुस्तकें" : "Sacred Books";
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Control Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-4 shadow-2xs sm:p-5">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isHi ? "तुलसी माला, रुद्राक्ष, श्री यंत्र खोजें..." : "Search malas, yantras, diyas, puja items..."}
            className="w-full rounded-2xl border border-line bg-sand/20 py-2.5 pr-10 pl-10 text-sm text-ink placeholder:text-muted focus:border-saffron focus:bg-white focus:outline-none focus:ring-1 focus:ring-saffron"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Chips and Sorters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-3">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === "all"
                  ? "bg-saffron text-white shadow-2xs"
                  : "bg-sand/40 text-ink hover:bg-sand/70"
              }`}
            >
              {isHi ? "सभी सामग्री" : "All Items"} ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-saffron text-white shadow-2xs"
                    : "bg-sand/40 text-ink hover:bg-sand/70"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Sort & Stock Filters */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-medium text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded-sm border-line text-saffron focus:ring-saffron"
              />
              <span>{isHi ? "केवल उपलब्ध" : "In Stock"}</span>
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "priceAsc" | "priceDesc" | "name")
              }
              className="rounded-xl border border-line bg-sand/20 px-2.5 py-1.5 text-xs font-semibold text-ink focus:border-saffron focus:outline-none"
            >
              <option value="featured">{isHi ? "लोकप्रिय (Featured)" : "Featured"}</option>
              <option value="priceAsc">{isHi ? "मूल्य: कम से ज्यादा" : "Price: Low to High"}</option>
              <option value="priceDesc">{isHi ? "मूल्य: ज्यादा से कम" : "Price: High to Low"}</option>
              <option value="name">{isHi ? "नाम (A to Z)" : "Name: A to Z"}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.name}
              priceInr={product.priceInr}
              heroImage={product.heroImage}
              heroImageAlt={product.heroImageAlt}
              categorySlug={product.categorySlug}
              outOfStock={product.outOfStock}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand/50 text-muted">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-serif text-lg font-bold text-ink">
            {isHi ? "कोई सामग्री नहीं मिली" : "No Items Found"}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted">
            {isHi
              ? "कृपया खोज शब्द बदलें अथवा फ़िल्टर रीसेट करें।"
              : "Try adjusting your search or category filters to find what you're looking for."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setInStockOnly(false);
            }}
            className="mt-4 rounded-xl bg-saffron px-4 py-2 text-xs font-bold text-white shadow-xs"
          >
            {isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}
          </button>
        </div>
      )}
    </div>
  );
}

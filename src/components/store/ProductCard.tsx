"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Eye, ShoppingBag, Star } from "lucide-react";
import { MediaImage } from "@/components/media/MediaImage";
import { useLocale } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export type ProductCardProps = {
  slug: string;
  name: string;
  priceInr: number;
  heroImage: string;
  heroImageAlt?: string;
  categorySlug?: string;
  outOfStock?: boolean;
  mrpInr?: number;
  rating?: number;
  reviewsCount?: number;
  className?: string;
};

export function ProductCard({
  slug,
  name,
  priceInr,
  heroImage,
  heroImageAlt,
  categorySlug = "sadhana",
  outOfStock = false,
  mrpInr,
  rating = 4.9,
  reviewsCount = 48,
  className = "",
}: ProductCardProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [added, setAdded] = useState(false);

  const finalMrp = mrpInr || Math.round(priceInr * 1.35);
  const discountPercent = Math.round(((finalMrp - priceInr) / finalMrp) * 100);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;

    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("bhakti-cart-v1");
      const items: { slug: string; name: string; priceInr: number; image: string; quantity: number }[] = raw
        ? JSON.parse(raw)
        : [];

      const existing = items.find((item) => item.slug === slug);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({
          slug,
          name,
          priceInr,
          image: heroImage,
          quantity: 1,
        });
      }
      window.localStorage.setItem("bhakti-cart-v1", JSON.stringify(items));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  const href = `${PATHS.store}/${slug}`;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-saffron/40 hover:shadow-md ${className}`}
    >
      {/* Top Image Container */}
      <Link href={href} className="relative block aspect-square w-full overflow-hidden bg-sand/20">
        <MediaImage
          src={heroImage}
          alt={heroImageAlt || name}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {outOfStock ? (
            <span className="rounded-full bg-stone-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
              {isHi ? "स्टॉक समाप्त" : "Out of Stock"}
            </span>
          ) : discountPercent > 0 ? (
            <span className="rounded-full bg-saffron-deep px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
              {discountPercent}% {isHi ? "छूट" : "OFF"}
            </span>
          ) : null}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-3 right-3 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/95 text-ink shadow-sm backdrop-blur-xs hover:bg-saffron hover:text-white transition">
            <Eye className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-muted mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-saffron text-[11px]">
              {categorySlug.replace(/^(local-dev-|store-)/, "")}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-ink text-xs">{rating}</span>
              <span className="text-[11px] text-muted">({reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={href}>
            <h3 className="font-serif text-base font-bold text-ink leading-snug transition group-hover:text-saffron-deep sm:text-lg line-clamp-2">
              {name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-ink sm:text-xl">
                ₹{priceInr.toLocaleString("en-IN")}
              </span>
              {finalMrp > priceInr && (
                <span className="text-xs text-muted line-through">
                  ₹{finalMrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-700 font-semibold">
              {isHi ? "मुफ्त पवित्र पैकेजिंग" : "Free Sacred Packaging"}
            </p>
          </div>

          {outOfStock ? (
            <button
              disabled
              className="flex items-center gap-1 rounded-2xl bg-sand/70 px-3 py-2 text-xs font-semibold text-muted cursor-not-allowed"
            >
              <span>{isHi ? "अनुपलब्ध" : "Unavailable"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-xs active:scale-95 ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-saffron text-white hover:bg-saffron-deep"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>{isHi ? "जोड़ा गया!" : "Added!"}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>{isHi ? "कार्ट" : "Add"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

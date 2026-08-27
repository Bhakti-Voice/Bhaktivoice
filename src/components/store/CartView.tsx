"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  HeartHandshake,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { MediaImage } from "@/components/media/MediaImage";
import { useLocale } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export type CartItem = {
  slug: string;
  name: string;
  priceInr: number;
  image?: string;
  quantity: number;
};

export function CartView() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem("bhakti-cart-v1");
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  function saveItems(newItems: CartItem[]) {
    setItems(newItems);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bhakti-cart-v1", JSON.stringify(newItems));
    }
  }

  function updateQuantity(slug: string, delta: number) {
    const updated = items
      .map((item) => {
        if (item.slug === slug) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    saveItems(updated);
  }

  function removeItem(slug: string) {
    const updated = items.filter((item) => item.slug !== slug);
    saveItems(updated);
  }

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    const code = promoCode.trim().toUpperCase();

    if (code === "BHAKTI10" || code === "SADHANA") {
      setDiscountPercent(10);
      setPromoSuccess(isHi ? "10% का विशेष आशीर्वाद छूट लागू हुआ!" : "10% Sadhana Blessing Discount Applied!");
    } else {
      setPromoError(isHi ? "अमान्य कूपन कोड। कृपया 'BHAKTI10' का उपयोग करें।" : "Invalid promo code. Try 'BHAKTI10'");
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.priceInr || 351) * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  if (!mounted) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-saffron border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 text-center shadow-xs sm:p-16">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sand/40 text-saffron">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-bold text-ink sm:text-3xl">
          {isHi ? "आपकी पूजा थाल अभी रिक्त है" : "Your Devotional Cart is Empty"}
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted leading-relaxed">
          {isHi
            ? "दैनिक नाम जप एवं साधना हेतु तुलसी माला, रुद्राक्ष, शुद्ध दीपक एवं सिद्ध यंत्र स्टोर से चयन करें।"
            : "Explore genuine tulsi malas, rudraksha, brass diyas, and sadhana essentials to companion your daily spiritual practice."}
        </p>
        <Link
          href={PATHS.store}
          className="mt-6 flex items-center gap-2 rounded-2xl bg-saffron px-6 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-saffron-deep active:scale-95"
        >
          <span>{isHi ? "भक्ति स्टोर देखें" : "Explore Bhakti Store"}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Cart Items List (8 Cols) */}
      <div className="space-y-4 lg:col-span-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
            {isHi ? "साधना सामग्री थाल" : "Your Sadhana Cart"} ({items.length})
          </h2>
          <button
            type="button"
            onClick={() => saveItems([])}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            {isHi ? "थाल रिक्त करें" : "Clear All"}
          </button>
        </div>

        <div className="divide-y divide-line/70 rounded-3xl border border-line bg-white p-4 shadow-2xs sm:p-6">
          {items.map((item) => (
            <div key={item.slug} className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand/20 border border-line/60 p-2">
                  <MediaImage
                    src={item.image || "/images/tulsi-mala.png"}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <Link
                    href={`${PATHS.store}/${item.slug}`}
                    className="font-serif text-base font-bold text-ink hover:text-saffron transition"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-emerald-700 font-medium">
                    {isHi ? "100% शुद्ध वैदिक स्रोत" : "100% Authentic Vedic Source"}
                  </p>
                  <p className="mt-1 font-serif text-sm font-bold text-saffron-deep">
                    ₹{(item.priceInr || 351).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl border border-line bg-sand/20 p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink shadow-2xs hover:bg-sand transition"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-ink">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink shadow-2xs hover:bg-sand transition"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:bg-rose-50 hover:text-rose-600 transition"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Shipping Alert */}
        {subtotal < 499 ? (
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50/70 p-3.5 text-xs font-medium text-amber-900 border border-amber-200">
            <Truck className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              {isHi
                ? `₹${499 - subtotal} की और सामग्री जोड़ें और पाएं मुफ्त डिलीवरी!`
                : `Add ₹${499 - subtotal} more to unlock FREE pan-India delivery!`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50/70 p-3.5 text-xs font-medium text-emerald-900 border border-emerald-200">
            <Sparkles className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>
              {isHi
                ? "बधाई! आपके ऑर्डर पर मुफ्त डिलीवरी लागू है।"
                : "Congratulations! You have qualified for FREE Express Delivery."}
            </span>
          </div>
        )}
      </div>

      {/* Order Summary Box (4 Cols) */}
      <div className="space-y-5 lg:col-span-4">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
          <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
            {isHi ? "ऑर्डर मूल्य विवरण" : "Order Summary"}
          </h3>

          {/* Promo Code Form */}
          <form onSubmit={applyPromo} className="mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={isHi ? "कूपन कोड (BHAKTI10)" : "Promo code (BHAKTI10)"}
                  className="w-full rounded-xl border border-line bg-sand/20 py-2 pr-3 pl-8 text-xs font-semibold uppercase text-ink placeholder:normal-case placeholder:text-muted focus:border-saffron focus:bg-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-ink px-3 py-2 text-xs font-bold text-white transition hover:bg-ink/80"
              >
                {isHi ? "लागू" : "Apply"}
              </button>
            </div>
            {promoSuccess && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <Check className="h-3 w-3" /> {promoSuccess}
              </p>
            )}
            {promoError && (
              <p className="mt-1.5 text-[11px] font-medium text-rose-600">
                {promoError}
              </p>
            )}
          </form>

          {/* Price Breakdown */}
          <dl className="mt-5 divide-y divide-line/60 text-xs sm:text-sm">
            <div className="flex justify-between py-2.5">
              <dt className="text-muted">{isHi ? "कुल सामग्री मूल्य" : "Item Subtotal"}</dt>
              <dd className="font-semibold text-ink">₹{subtotal.toLocaleString("en-IN")}</dd>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between py-2.5 text-emerald-700">
                <dt>{isHi ? "साधना छूट" : "Blessing Discount"}</dt>
                <dd className="font-semibold">-₹{discountAmount.toLocaleString("en-IN")}</dd>
              </div>
            )}

            <div className="flex justify-between py-2.5">
              <dt className="text-muted">{isHi ? "पवित्र वैदिक पैकेजिंग" : "Sacred Packaging"}</dt>
              <dd className="font-semibold text-emerald-700">{isHi ? "मुफ्त (Free)" : "Free"}</dd>
            </div>

            <div className="flex justify-between py-2.5">
              <dt className="text-muted">{isHi ? "डिलीवरी शुल्क" : "Delivery Fee"}</dt>
              <dd className="font-semibold text-ink">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700">{isHi ? "मुफ्त" : "Free"}</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </dd>
            </div>

            <div className="flex justify-between py-3 font-serif text-base font-bold text-ink sm:text-lg">
              <dt>{isHi ? "देय कुल राशि" : "Estimated Total"}</dt>
              <dd className="text-saffron-deep">₹{finalTotal.toLocaleString("en-IN")}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-saffron py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-saffron-deep active:scale-95"
          >
            <span>{isHi ? "सुरक्षित ऑर्डर करें" : "Proceed to Checkout"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Trust Points */}
        <div className="space-y-2.5 rounded-2xl bg-sand/30 p-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-saffron shrink-0" />
            <span>{isHi ? "100% सुरक्षित भुगतान प्रणाली" : "100% Secure & Private Checkout"}</span>
          </div>
          <div className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4 text-saffron shrink-0" />
            <span>{isHi ? "पवित्र एवं सुरक्षित पैकिंग" : "Respectful altar-ready packaging"}</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-saffron shrink-0" />
            <span>{isHi ? "7 दिवस सुगम वापसी / सहायता" : "Hassle-free 7-day assistance"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

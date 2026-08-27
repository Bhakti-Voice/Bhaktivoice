"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";

export type AddToCartButtonProps = {
  slug: string;
  name: string;
  priceInr?: number;
  image?: string;
  outOfStock?: boolean;
};

export function AddToCartButton({
  slug,
  name,
  priceInr = 351,
  image = "/images/tulsi-mala.png",
  outOfStock = false,
}: AddToCartButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const isHi = locale === "hi";

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (outOfStock) {
    return (
      <div className="rounded-2xl border border-line bg-sand/40 p-4 text-center">
        <p className="font-serif text-sm font-bold text-stone-700">
          {isHi ? "यह सामग्री वर्तमान में स्टॉक में नहीं है" : "Currently Out of Stock"}
        </p>
        <p className="mt-1 text-xs text-muted">
          {isHi
            ? "पुनः उपलब्ध होने पर हम इसे यहाँ प्रदर्शित करेंगे।"
            : "We keep out-of-stock items visible for reference. Stock will be refreshed soon."}
        </p>
      </div>
    );
  }

  function addItemToStorage(qty: number) {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("bhakti-cart-v1");
      const items: { slug: string; name: string; priceInr: number; image: string; quantity: number }[] = raw
        ? JSON.parse(raw)
        : [];

      const existing = items.find((item) => item.slug === slug);
      if (existing) {
        existing.quantity += qty;
      } else {
        items.push({
          slug,
          name,
          priceInr,
          image,
          quantity: qty,
        });
      }
      window.localStorage.setItem("bhakti-cart-v1", JSON.stringify(items));
    }
  }

  function handleAddToCart() {
    addItemToStorage(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    addItemToStorage(quantity);
    router.push("/cart");
  }

  return (
    <div className="space-y-3">
      {/* Quantity Selector + Add To Cart Row */}
      <div className="flex items-center gap-3">
        {/* Stepper */}
        <div className="flex items-center rounded-2xl border border-line bg-sand/20 p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-2xs hover:bg-sand transition"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-bold text-ink text-sm">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink shadow-2xs hover:bg-sand transition"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 px-4 text-sm font-bold shadow-xs transition active:scale-98 ${
            added
              ? "bg-emerald-600 text-white"
              : "border border-saffron bg-saffron/10 text-saffron-deep hover:bg-saffron/20"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>{isHi ? "कार्ट में जोड़ा गया!" : "Added to Cart!"}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>{isHi ? "कार्ट में जोड़ें" : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>

      {/* Instant Buy Now Button */}
      <button
        type="button"
        onClick={handleBuyNow}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-saffron py-3.5 px-4 text-sm font-bold text-white shadow-xs transition hover:bg-saffron-deep active:scale-98"
      >
        <Zap className="h-4 w-4 fill-white" />
        <span>{isHi ? "तुरंत ऑर्डर करें (Buy Now)" : "Buy Now"}</span>
      </button>
    </div>
  );
}

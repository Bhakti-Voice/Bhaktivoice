"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessages } from "@/lib/i18n/client";

export function AddToCartButton({
  slug,
  name,
  outOfStock = false,
}: {
  slug: string;
  name: string;
  outOfStock?: boolean;
}) {
  const router = useRouter();
  const t = useMessages();
  const [added, setAdded] = useState(false);

  if (outOfStock) {
    return (
      <p className="w-full rounded-xl bg-sand px-6 py-3 text-center text-sm font-medium text-saffron-deep">
        {t.common.outOfStock}
      </p>
    );
  }

  function add() {
    const raw = window.localStorage.getItem("bhakti-cart-v1");
    const items: { slug: string; name: string; quantity: number }[] = raw
      ? (JSON.parse(raw) as { slug: string; name: string; quantity: number }[])
      : [];
    const existing = items.find((item) => item.slug === slug);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ slug, name, quantity: 1 });
    }
    window.localStorage.setItem("bhakti-cart-v1", JSON.stringify(items));
    setAdded(true);
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={add}
      className="w-full rounded-xl bg-saffron px-6 py-3 text-sm font-medium text-white"
    >
      {added ? t.common.addedToCart : t.common.addToCart}
    </button>
  );
}

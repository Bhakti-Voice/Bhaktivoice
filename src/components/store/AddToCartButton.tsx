"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddToCartButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

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
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}

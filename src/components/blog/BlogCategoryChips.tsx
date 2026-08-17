"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/content/ListingCard";
import type { BlogPost } from "@/lib/content/types";
import { PATHS } from "@/lib/seo/paths";

export function BlogCategoryChips({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm ${
              active === category ? "bg-navy text-white" : "border border-line bg-white text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {visible.map((post) => (
          <ListingCard
            key={post.slug}
            href={`${PATHS.blog}/${post.slug}`}
            title={post.title}
            text={post.excerpt}
            image={post.heroImage}
            imageAlt={post.heroImageAlt}
            meta={`${post.category} · ${post.readingTime}`}
          />
        ))}
      </div>
    </div>
  );
}

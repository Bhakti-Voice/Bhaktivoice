"use client";

import { useState } from "react";
import { useMessages } from "@/lib/i18n/client";

const PREVIEW = 10;

export function BlogTagCloud({ tags }: { tags: string[] }) {
  const t = useMessages();
  const [open, setOpen] = useState(false);
  if (!tags.length) return null;
  const extra = tags.length - PREVIEW;
  const visible = open || extra <= 0 ? tags : tags.slice(0, PREVIEW);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        {visible.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sand px-3 py-1.5 text-sm text-ink ring-1 ring-line"
          >
            {tag}
          </span>
        ))}
        {extra > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-saffron ring-1 ring-saffron/40"
          >
            {open ? t.common.showLessTags : t.common.showMoreTags(extra)}
          </button>
        ) : null}
      </div>
    </div>
  );
}

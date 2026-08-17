"use client";

import { useState } from "react";

export function CollapsedProse({
  paragraphs,
  readMore,
  readLess,
}: {
  paragraphs: string[];
  readMore: string;
  readLess: string;
}) {
  const [open, setOpen] = useState(false);
  const visible = paragraphs.filter(Boolean);
  if (!visible.length) return null;

  return (
    <section className="mt-10 max-w-3xl">
      <div className={open ? "space-y-4" : ""}>
        {visible.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 48)}
            className={`text-[15px] leading-relaxed text-muted ${
              open ? "" : index === 0 ? "line-clamp-3" : "sr-only"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {visible.length > 1 || visible[0].length > 160 ? (
        <button
          type="button"
          className="mt-2 cursor-pointer text-sm text-saffron-deep hover:underline"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? readLess : `${readMore}…`}
        </button>
      ) : null}
    </section>
  );
}

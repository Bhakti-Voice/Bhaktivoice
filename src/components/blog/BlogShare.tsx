"use client";

import { useState } from "react";

export function BlogShare({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}${path}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <aside className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line">
      <h2 className="font-serif text-xl text-ink">Share</h2>
      <p className="mt-2 text-sm text-muted">{title}</p>
      <button
        type="button"
        onClick={() => void copy()}
        className="mt-4 rounded-full border border-line px-4 py-2 text-sm"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </aside>
  );
}

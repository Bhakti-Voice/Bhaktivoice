"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

export function BlogShare({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const [igNote, setIgNote] = useState(false);

  function fullUrl() {
    if (typeof window === "undefined") return path;
    return `${window.location.origin}${path}`;
  }

  async function copy() {
    await navigator.clipboard.writeText(fullUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  async function copyForInstagram() {
    await navigator.clipboard.writeText(`${title}\n${fullUrl()}`);
    setIgNote(true);
    window.setTimeout(() => setIgNote(false), 2500);
  }

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl(),
        });
      } catch {
        /* ignore cancel */
      }
    } else {
      void copy();
    }
  }

  function openShare(kind: "whatsapp" | "facebook" | "twitter") {
    const url = fullUrl();
    const encoded = encodeURIComponent(url);
    const text = encodeURIComponent(title);
    const href =
      kind === "whatsapp"
        ? `https://wa.me/?text=${text}%20${encoded}`
        : kind === "facebook"
          ? `https://www.facebook.com/sharer/sharer.php?u=${encoded}`
          : `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const brandBtn =
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 shadow-sm";

  return (
    <aside aria-label="Share this guide" className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-[#e8dfd2]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-lg font-bold text-ink">Share Knowledge</h2>
        <button
          type="button"
          onClick={() => void handleNativeShare()}
          aria-label="Native share"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream text-saffron-deep hover:bg-[#ffe8d0] transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted/90">{title}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => void copy()}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-line bg-[#fffcf7] text-ink hover:border-saffron/40 hover:bg-cream"
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Link2 className="h-3.5 w-3.5 text-saffron" />}
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Share on WhatsApp"
            className={`${brandBtn} bg-[#25D366] hover:bg-[#20bd5a]`}
            onClick={() => openShare("whatsapp")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M17.5 14.3c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.3-.2-.3 0-.5.1-.6.2-.2.3-.4.5-.6.1-.1.2-.3.3-.4.1-.2 0-.3 0-.4 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1 0-.3-.1-.6-.2zM12.1 21.5h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.3 9.3 0 0 1-1.4-5 9.4 9.4 0 0 1 9.4-9.4c2.5 0 4.9 1 6.6 2.7a9.3 9.3 0 0 1 2.8 6.6 9.4 9.4 0 0 1-9.4 9.4zm0-17.1A7.7 7.7 0 0 0 4.4 12c0 1.4.4 2.7 1 3.9l.2.3-1.2 4.5 4.6-1.2.3.2a7.7 7.7 0 0 0 11.6-6.6 7.7 7.7 0 0 0-7.7-7.7z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Share on Facebook"
            className={`${brandBtn} bg-[#1877F2] hover:bg-[#1565cc]`}
            onClick={() => openShare("facebook")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Copy link for Instagram"
            className={`${brandBtn} bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]`}
            onClick={() => void copyForInstagram()}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm5.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 4.5c-2 0-2.3 0-3.1.1-.8 0-1.4.2-1.9.4a3.2 3.2 0 0 0-1.2.8 3.2 3.2 0 0 0-.8 1.2c-.2.5-.3 1.1-.4 1.9-.1.8-.1 1.1-.1 3.1s0 2.3.1 3.1c0 .8.2 1.4.4 1.9.2.5.4.9.8 1.2.3.4.7.6 1.2.8.5.2 1.1.3 1.9.4.8.1 1.1.1 3.1.1s2.3 0 3.1-.1c.8 0 1.4-.2 1.9-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.5.3-1.1.4-1.9.1-.8.1-1.1.1-3.1s0-2.3-.1-3.1c0-.8-.2-1.4-.4-1.9a3.2 3.2 0 0 0-.8-1.2 3.2 3.2 0 0 0-1.2-.8c-.5-.2-1.1-.3-1.9-.4-.8-.1-1.1-.1-3.1-.1zm0-1.7c2.1 0 2.3 0 3.1.1 1 0 1.8.2 2.5.5.7.3 1.3.7 1.8 1.2.5.5.9 1.1 1.2 1.8.3.7.4 1.5.5 2.5.1.8.1 1 .1 3.1s0 2.3-.1 3.1c0 1-.2 1.8-.5 2.5-.3.7-.7 1.3-1.2 1.8-.5.5-1.1.9-1.8 1.2-.7.3-1.5.4-2.5.5-.8.1-1 .1-3.1.1s-2.3 0-3.1-.1c-1 0-1.8-.2-2.5-.5a4.9 4.9 0 0 1-1.8-1.2 4.9 4.9 0 0 1-1.2-1.8c-.3-.7-.4-1.5-.5-2.5-.1-.8-.1-1-.1-3.1s0-2.3.1-3.1c0-1 .2-1.8.5-2.5.3-.7.7-1.3 1.2-1.8.5-.5 1.1-.9 1.8-1.2.7-.3 1.5-.4 2.5-.5.8-.1 1-.1 3.1-.1z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Share on X"
            className={`${brandBtn} bg-black hover:bg-neutral-800`}
            onClick={() => openShare("twitter")}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M18.2 3H21l-6.6 7.5L22 21h-6.2l-4.9-6.4L5.3 21H2.5l7-8L2 3h6.3l4.4 5.8L18.2 3zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5z" />
            </svg>
          </button>
        </div>
      </div>
      {igNote ? <p className="mt-2 text-xs font-medium text-saffron-deep">Caption & link copied — ready to paste!</p> : null}
    </aside>
  );
}


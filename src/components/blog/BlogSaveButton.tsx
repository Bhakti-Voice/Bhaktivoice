"use client";

import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";

const OLD_STORAGE_KEY = "bhakti-blog-saved";

export function BlogSaveButton({
  slug,
  saveLabel,
  savedLabel,
}: {
  slug: string;
  saveLabel: string;
  savedLabel: string;
}) {
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(
          `/api/saved?userId=${encodeURIComponent(user.uid)}&type=blog`,
          { cache: "no-store" },
        );
        const data = (await response.json()) as { slugs?: string[] };
        if (!cancelled) setSaved((data.slugs ?? []).includes(slug));
      } catch {
        if (!cancelled) setSaved(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, slug]);

  async function toggle() {
    if (busy || loading) return;
    if (!user) {
      try {
        if (configured) await signInWithGoogle();
        else router.push(withLocale("/login", locale));
      } catch {
        /* ignore */
      }
      return;
    }
    const next = !saved;
    setSaved(next);
    setBusy(true);
    try {
      const response = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          type: "blog",
          slug,
          saved: next,
        }),
      });
      if (!response.ok) setSaved(!next);
    } catch {
      setSaved(!next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? savedLabel : saveLabel}
      disabled={busy || loading}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggle();
      }}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ring-1 disabled:opacity-60 ${
        saved ? "bg-[#fff4ea] text-saffron-deep ring-[#f3d2b3]" : "bg-white text-muted ring-line hover:text-saffron"
      }`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function AdminPreviewBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [minimized, setMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  const previewParam = searchParams.get("preview");
  const adminPreviewParam = searchParams.get("admin_preview");
  const isPreview =
    (previewParam === "true" || previewParam === "1" || adminPreviewParam === "1") &&
    (typeof document === "undefined" ||
      document.cookie.includes("bhakti_admin_preview=1") ||
      document.cookie.includes("__prerender_bypass"));

  useEffect(() => {
    setMounted(true);
    if (!isPreview) return;

    // Inject noindex & nofollow meta tags directly into document head
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow, noarchive, nosnippet");

    let googlebotMeta = document.querySelector('meta[name="googlebot"]');
    if (!googlebotMeta) {
      googlebotMeta = document.createElement("meta");
      googlebotMeta.setAttribute("name", "googlebot");
      document.head.appendChild(googlebotMeta);
    }
    googlebotMeta.setAttribute("content", "noindex, nofollow, noarchive, nosnippet");
  }, [isPreview]);

  if (!mounted || !isPreview) {
    return null;
  }

  const isHindi = pathname.startsWith("/hi");
  const isTelugu = pathname.startsWith("/te");
  const cleanPath = pathname.replace(/^\/(hi|te)/, "") || "/";
  const alternatePath = isTelugu
    ? cleanPath
    : isHindi
    ? `/te${cleanPath}`
    : `/hi${cleanPath}`;

  return (
    <aside
      aria-label="Admin Preview Mode Bar"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-9999 max-w-4xl w-[calc(100%-1.5rem)] sm:w-auto transition-all duration-200"
    >
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#1f1610]/95 text-amber-200 border border-amber-500/40 rounded-full shadow-2xl backdrop-blur-md text-xs font-semibold hover:bg-[#2b1f17] transition-all cursor-pointer"
          title="Expand Admin Preview Bar"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Admin Preview Active (Hidden from Google &amp; Analytics)</span>
          <span className="text-amber-400 text-sm">▾</span>
        </button>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#1c1510]/95 text-amber-100 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-md text-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <div>
              <div className="flex items-center gap-2">
                <strong className="font-serif tracking-wide text-amber-300 font-bold uppercase text-[11px]">
                  Admin Preview
                </strong>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[10px] font-medium">
                  Untracked
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium">
                  Noindex
                </span>
              </div>
              <p className="text-[10px] text-amber-200/70 hidden sm:block">
                Excluded from Google Analytics &amp; search engines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`${alternatePath}?preview=true`}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 transition-colors text-[11px] font-medium"
              title="Switch preview language"
            >
              {isTelugu ? "🇬🇧 English" : isHindi ? "🚩 తెలుగు" : "🇮🇳 हिंदी"}
            </Link>

            <a
              href="/admin"
              className="px-2.5 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/30 transition-colors text-[11px] font-medium"
            >
              ← Admin
            </a>

            <a
              href={`/api/disable-preview?redirect=${encodeURIComponent(pathname)}`}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-amber-300/80 transition-colors text-[11px]"
              title="Exit preview mode and view public page"
            >
              Exit
            </a>

            <button
              onClick={() => setMinimized(true)}
              className="p-1 text-amber-400/80 hover:text-amber-200 text-sm leading-none ml-1 cursor-pointer"
              title="Minimize bar"
              aria-label="Minimize preview banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

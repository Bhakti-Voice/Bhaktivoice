"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: string]: unknown;
  }
}

function pagePath(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

/**
 * Safely tracks a custom Google Analytics event
 */
export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

/**
 * Checks whether the current request is an actual preview or admin session.
 * Crucially: it only flags preview mode if the current URL has preview query parameters
 * or starts with /admin or /api/preview, preventing normal public pages from having GA disabled.
 */
export function isPreviewMode(pathname: string, searchParams: URLSearchParams | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/preview")) return true;

  const isPreviewParam = (params: URLSearchParams | null) => {
    if (!params) return false;
    const preview = params.get("preview");
    const adminPreview = params.get("admin_preview");
    return preview === "true" || preview === "1" || adminPreview === "1";
  };

  if (isPreviewParam(searchParams)) return true;

  if (typeof window !== "undefined") {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (isPreviewParam(sp)) return true;
    } catch {
      // ignore
    }
  }

  return false;
}

function GaPageViews({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams ? searchParams.toString() : "";
  const firstLoad = useRef(true);

  useEffect(() => {
    const isPreview = isPreviewMode(pathname, searchParams);

    // If currently on an actual preview/admin URL, disable GA for this view
    if (isPreview) {
      if (typeof window !== "undefined") {
        window[`ga-disable-${measurementId}`] = true;
      }
      return;
    }

    // If on a normal public page, ensure GA is enabled (clearing any flag left from previous preview tabs)
    if (typeof window !== "undefined" && window[`ga-disable-${measurementId}`]) {
      try {
        delete window[`ga-disable-${measurementId}`];
      } catch {
        window[`ga-disable-${measurementId}`] = false;
      }
    }

    // Skip initial page load since gtag('config') in inline script handles the initial landing hit
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    if (!measurementId) return;

    // Small delay ensures Next.js router has mounted and updated document.title
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        const fullPath = pagePath(pathname, search);
        const title = document.title || "Bhakti Voice";

        window.gtag("event", "page_view", {
          page_title: title,
          page_location: window.location.href,
          page_path: fullPath,
          send_to: measurementId,
        });

        // Also update default config context for subsequent events
        window.gtag("config", measurementId, {
          page_title: title,
          page_location: window.location.href,
          page_path: fullPath,
        });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [measurementId, pathname, search, searchParams]);

  return null;
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;

  return (
    <>
      <script
        id="ga-gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Suspense fallback={null}>
        <GaPageViews measurementId={measurementId} />
      </Suspense>
    </>
  );
}

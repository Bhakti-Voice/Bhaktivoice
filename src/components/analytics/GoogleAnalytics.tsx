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

export function isPreviewMode(pathname: string, searchParams: URLSearchParams | null): boolean {
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/preview")) return true;
  if (searchParams) {
    const preview = searchParams.get("preview");
    const adminPreview = searchParams.get("admin_preview");
    if (preview === "true" || preview === "1" || adminPreview === "1") {
      return true;
    }
  }
  if (typeof window !== "undefined") {
    try {
      const search = window.location.search;
      if (search.includes("preview=true") || search.includes("admin_preview=1") || search.includes("preview=1")) {
        return true;
      }
      if (document.cookie.includes("bhakti_preview=1") || document.cookie.includes("__prerender_bypass")) {
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

function GaPageViews({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (isPreviewMode(pathname, searchParams)) {
      if (typeof window !== "undefined") {
        window[`ga-disable-${measurementId}`] = true;
      }
      return;
    }
    if (!measurementId || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath(pathname, search),
      send_to: measurementId,
    });
  }, [measurementId, pathname, search, searchParams]);

  return null;
}

function GoogleAnalyticsInner({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (isPreviewMode(pathname, searchParams)) {
    if (typeof window !== "undefined") {
      window[`ga-disable-${measurementId}`] = true;
    }
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
      <GaPageViews measurementId={measurementId} />
    </>
  );
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner measurementId={measurementId} />
    </Suspense>
  );
}


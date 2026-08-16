"use client";

import { useEffect } from "react";

/** Opens a parent <details> when the URL hash points at collapsed SEO copy. */
export function OpenDetailsOnHash() {
  useEffect(() => {
    const openTarget = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const details = el instanceof HTMLDetailsElement ? el : el.closest("details");
      if (details) details.open = true;
    };

    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);

  return null;
}

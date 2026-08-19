"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { useAuth } from "@/lib/auth/AuthProvider";
import { safeNextPath } from "@/lib/auth/next-path";
import { PATHS } from "@/lib/seo/paths";

export function LoginClient() {
  const { signInWithGoogle, configured, loading, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading || !user) return;
    const next = safeNextPath(
      new URLSearchParams(window.location.search).get("next"),
      PATHS.community,
    );
    router.replace(next);
  }, [user, loading, router]);

  async function onGoogle() {
    setError("");
    try {
      await signInWithGoogle();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign in could not be completed.");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Breadcrumbs items={pageCrumbs(["Sign in", "/login"])} />
      <div className="mt-8 rounded-[32px] bg-white p-8 text-center shadow-sm ring-1 ring-line">
        <p className="text-xs uppercase tracking-[0.2em] text-saffron">Welcome</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Sign in to Bhakti Voice</h1>
        <p className="mt-3 text-sm text-muted">
          Save jaap counts, sankalps, and the diary across devices.
        </p>
        <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center bg-transparent">
          <MediaImage
            src="/images/lotus-logo-mark.png"
            alt="Bhakti Voice"
            width={112}
            height={112}
            priority
            className="h-28 w-28 bg-transparent object-contain"
          />
        </div>
        {user ? (
          <p className="mt-6 text-sm text-ink">You are already signed in as {user.displayName ?? user.email}.</p>
        ) : (
          <button
            type="button"
            onClick={() => void onGoogle()}
            disabled={loading || !configured}
            className="mt-6 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            Continue with Google
          </button>
        )}
        {!configured ? (
          <p className="mt-4 text-xs text-muted">
            Google sign-in is not configured in this environment yet. You can still explore as a guest.
          </p>
        ) : null}
        {error ? <p className="mt-4 text-sm text-lotus">{error}</p> : null}
      </div>
    </div>
  );
}

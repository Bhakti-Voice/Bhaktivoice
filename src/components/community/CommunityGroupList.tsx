"use client";

import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { ProseText } from "@/components/content/SectionBody";
import { useAuth } from "@/lib/auth/AuthProvider";
import { authHeaders } from "@/lib/auth/headers";
import { withLocale } from "@/lib/i18n/config";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { formatCount } from "@/lib/format";
import { PATHS } from "@/lib/seo/paths";
import type { CommunityGroup } from "@/lib/content/types";

export function CommunityGroupCard({
  group,
  memberCount,
}: {
  group: CommunityGroup;
  memberCount: number;
}) {
  const t = useMessages().common;
  const { user, loading } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const path = `${PATHS.community}/${group.slug}`;
  const href = withLocale(path, locale);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function joinAndOpen() {
    setError("");
    if (loading) return;
    if (!user) {
      router.push(withLocale(`/login?next=${encodeURIComponent(href)}`, locale));
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/community/${encodeURIComponent(group.slug)}/join`, {
        method: "POST",
        headers: await authHeaders(user),
      });
      if (!response.ok && response.status !== 409) {
        const data = (await response.json().catch(() => ({}))) as { detail?: string };
        setError(typeof data.detail === "string" ? data.detail : t.communityNeedSignIn);
        return;
      }
      router.push(href);
    } catch {
      setError(t.communityNeedSignIn);
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line">
      <Users className="h-5 w-5 text-saffron" />
      <h3 className="mt-3 font-serif text-xl text-ink">{group.name}</h3>
      <ProseText text={group.text} className="mt-2 text-sm text-muted" />
      <p className="mt-3 text-xs text-muted">
        {formatCount(memberCount, locale)} {t.devotees}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void joinAndOpen()}
          className="inline-flex cursor-pointer rounded-full bg-saffron px-4 py-1.5 text-sm text-white disabled:opacity-60"
        >
          {t.join}
        </button>
        <a
          href={href}
          className="inline-flex rounded-full border border-line px-4 py-1.5 text-sm text-ink"
        >
          {t.openGroup}
        </a>
      </div>
      {error ? <p className="mt-3 text-xs text-lotus">{error}</p> : null}
    </li>
  );
}

export function CommunityGroupList({ groups }: { groups: CommunityGroup[] }) {
  const t = useMessages().common;
  const { user, loading } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [userGroups, setUserGroups] = useState<CommunityGroup[]>([]);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/community/counts", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { counts?: Record<string, number> }) => setCounts(data.counts ?? {}))
      .catch(() => setCounts({}));
    void fetch("/api/community/user-groups", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { groups?: CommunityGroup[] }) => setUserGroups(data.groups ?? []))
      .catch(() => setUserGroups([]));
  }, []);

  async function createCommunity() {
    setError("");
    if (!user) {
      router.push(withLocale(`/login?next=${encodeURIComponent(PATHS.community)}`, locale));
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: await authHeaders(user),
        body: JSON.stringify({ name, text: about }),
      });
      const data = (await response.json().catch(() => ({}))) as { slug?: string; detail?: string };
      if (!response.ok || !data.slug) {
        setError(typeof data.detail === "string" ? data.detail : t.communityLimit);
        return;
      }
      router.push(withLocale(`${PATHS.community}/${data.slug}`, locale));
    } catch {
      setError(t.communityNeedSignIn);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form
        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line"
        onSubmit={(event) => {
          event.preventDefault();
          void createCommunity();
        }}
      >
        <h3 className="font-serif text-xl text-ink">{t.communityCreate}</h3>
        <p className="mt-2 text-sm text-muted">{t.communityCreateHint}</p>
        <label className="mt-4 block text-sm text-muted">
          {t.communityName}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={80}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
        <label className="mt-3 block text-sm text-muted">
          {t.communityAbout}
          <textarea
            value={about}
            onChange={(event) => setAbout(event.target.value)}
            maxLength={400}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
        <button
          type="submit"
          disabled={busy || loading || !name.trim()}
          className="mt-4 cursor-pointer rounded-full bg-saffron px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {t.communityCreateCta}
        </button>
        {error ? <p className="mt-3 text-sm text-lotus">{error}</p> : null}
      </form>

      {groups.length ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <CommunityGroupCard
              key={group.slug}
              group={group}
              memberCount={counts[group.slug] ?? group.members ?? 0}
            />
          ))}
        </ul>
      ) : null}

      {userGroups.length ? (
        <>
          <h3 className="mt-10 font-serif text-xl text-ink">{t.communityDevoteeGroups}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {userGroups.map((group) => (
              <CommunityGroupCard
                key={group.slug}
                group={group}
                memberCount={counts[group.slug] ?? group.members ?? 0}
              />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

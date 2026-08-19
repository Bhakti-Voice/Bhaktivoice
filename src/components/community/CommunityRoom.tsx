"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { useAuth } from "@/lib/auth/AuthProvider";
import { authHeaders } from "@/lib/auth/headers";
import { withLocale } from "@/lib/i18n/config";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

type Person = { name: string; photoUrl: string };
type Reply = { id: string; body: string; createdAt: string; author: Person };
type Thread = {
  id: string;
  body: string;
  createdAt: string;
  author: Person;
  replies: Reply[];
};
type Member = Person & { joinedAt?: string; role?: string };
type CommunityPayload = {
  ok?: boolean;
  name?: string;
  text?: string;
  joined?: boolean;
  isAdmin?: boolean;
  canPost?: boolean;
  memberCount?: number;
  members?: Member[];
  threads?: Thread[];
  detail?: string;
};

function Avatar({ person }: { person: Person }) {
  if (person.photoUrl) {
    return (
      <span className="relative h-9 w-9 overflow-hidden rounded-full bg-sand">
        <MediaImage src={person.photoUrl} alt="" fill className="object-cover" sizes="36px" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand font-serif text-sm text-saffron-deep">
      {person.name.slice(0, 1)}
    </span>
  );
}

async function readDetail(response: Response, fallback: string) {
  const data = (await response.json().catch(() => ({}))) as { detail?: string };
  return typeof data.detail === "string" ? data.detail : fallback;
}

export function CommunityRoom({
  slug,
  name,
  text,
}: {
  slug: string;
  name: string;
  text: string;
}) {
  const t = useMessages().common;
  const { user, loading } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [draft, setDraft] = useState("");
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const headers = user ? await authHeaders(user) : undefined;
    const response = await fetch(`/api/community/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      headers,
    });
    const data = (await response.json()) as CommunityPayload;
    if (!response.ok) {
      setError(typeof data.detail === "string" ? data.detail : t.communityNeedSignIn);
      return;
    }
    setJoined(Boolean(data.joined));
    setCanPost(Boolean(data.canPost));
    setIsAdmin(Boolean(data.isAdmin));
    setMemberCount(data.memberCount ?? 0);
    setMembers(data.members ?? []);
    setThreads(data.threads ?? []);
  }, [slug, user, t.communityNeedSignIn]);

  useEffect(() => {
    void load().catch(() => setError(t.communityNeedSignIn));
  }, [load, t.communityNeedSignIn]);

  async function join() {
    setError("");
    if (!user) {
      const dest = withLocale(`${PATHS.community}/${slug}`, locale);
      router.push(withLocale(`/login?next=${encodeURIComponent(dest)}`, locale));
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/community/${encodeURIComponent(slug)}/join`, {
        method: "POST",
        headers: await authHeaders(user),
      });
      if (!response.ok) {
        setError(await readDetail(response, t.communityNeedSignIn));
        return;
      }
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function postThread() {
    setError("");
    if (!joined || !canPost) {
      await join();
      return;
    }
    if (!user) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/community/${encodeURIComponent(slug)}/threads`, {
        method: "POST",
        headers: await authHeaders(user),
        body: JSON.stringify({ body: draft }),
      });
      if (!response.ok) {
        setError(await readDetail(response, t.communityAbuse));
        return;
      }
      setDraft("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function postReply(threadId: string) {
    setError("");
    if (!joined) {
      await join();
      return;
    }
    if (!user) return;
    const body = replies[threadId] ?? "";
    setBusy(true);
    try {
      const response = await fetch(
        `/api/community/${encodeURIComponent(slug)}/threads/${encodeURIComponent(threadId)}/replies`,
        {
          method: "POST",
          headers: await authHeaders(user),
          body: JSON.stringify({ body }),
        },
      );
      if (!response.ok) {
        setError(await readDetail(response, t.communityAbuse));
        return;
      }
      setReplies((current) => ({ ...current, [threadId]: "" }));
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <p className="text-sm text-muted">{text}</p>
        {joined && canPost ? (
          <form
            className="mt-5 rounded-3xl bg-white p-5 ring-1 ring-line"
            onSubmit={(event) => {
              event.preventDefault();
              void postThread();
            }}
          >
            {isAdmin ? <p className="text-xs uppercase tracking-wide text-saffron">{t.communityAdmin}</p> : null}
            <label className="mt-1 block text-sm text-muted">
              {t.communityStart}
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={4}
                maxLength={1200}
                placeholder={t.communityWrite}
                className="mt-2 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
              />
            </label>
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="mt-3 cursor-pointer rounded-full bg-saffron px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {t.communityPost}
            </button>
          </form>
        ) : joined ? (
          <p className="mt-5 text-sm text-muted">{t.communityAdminOnly}</p>
        ) : (
          <div className="mt-5 rounded-3xl bg-white p-5 ring-1 ring-line">
            <p className="text-sm text-muted">{user ? t.communityNeedJoin : t.communityNeedSignIn}</p>
            <button
              type="button"
              disabled={busy || loading}
              onClick={() => void join()}
              className="mt-4 cursor-pointer rounded-full bg-saffron px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {t.join}
            </button>
          </div>
        )}
        {error ? <p className="mt-3 text-sm text-lotus">{error}</p> : null}

        <div className="mt-8 space-y-4">
          {!threads.length ? <p className="text-sm text-muted">{t.communityEmpty}</p> : null}
          {threads.map((thread) => (
            <article key={thread.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
              <div className="flex gap-3">
                <Avatar person={thread.author} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{thread.author.name}</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink">{thread.body}</p>
                </div>
              </div>
              {thread.replies.length ? (
                <ul className="mt-4 space-y-3 border-l border-sand pl-4">
                  {thread.replies.map((reply) => (
                    <li key={reply.id} className="flex gap-3">
                      <Avatar person={reply.author} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">{reply.author.name}</p>
                        <p className="mt-1 whitespace-pre-line text-sm text-ink">{reply.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
              {joined ? (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void postReply(thread.id);
                  }}
                >
                  <label className="sr-only" htmlFor={`reply-${thread.id}`}>
                    {t.communityReply}
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      id={`reply-${thread.id}`}
                      value={replies[thread.id] ?? ""}
                      onChange={(event) =>
                        setReplies((current) => ({ ...current, [thread.id]: event.target.value }))
                      }
                      placeholder={t.communityReplyHint}
                      maxLength={1200}
                      className="min-w-0 flex-1 rounded-full border border-line bg-ivory px-4 py-2 text-sm text-ink"
                    />
                    <button
                      type="submit"
                      disabled={busy || !(replies[thread.id] ?? "").trim()}
                      className="cursor-pointer rounded-full border border-saffron px-4 py-2 text-sm text-saffron disabled:opacity-60"
                    >
                      {t.communityReply}
                    </button>
                  </div>
                </form>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
        <h2 className="font-serif text-xl text-ink">{t.communityMembers}</h2>
        <p className="mt-1 text-sm text-muted">
          {memberCount} · {name}
        </p>
        <ul className="mt-4 max-h-[28rem] space-y-3 overflow-y-auto">
          {members.map((member, index) => (
            <li key={`${member.name}-${index}`} className="flex items-center gap-3">
              <Avatar person={member} />
              <span className="text-sm text-ink">{member.name}</span>
              {member.role === "admin" ? (
                <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] uppercase tracking-wide text-saffron">
                  {t.communityAdmin}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

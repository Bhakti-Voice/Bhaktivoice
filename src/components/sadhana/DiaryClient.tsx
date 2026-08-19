"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useAuth } from "@/lib/auth/AuthProvider";
import { authHeaders } from "@/lib/auth/headers";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type DiaryEntry = {
  mood: string;
  jaap: string;
  note: string;
};

const MOODS = ["Peaceful", "Grateful", "Restless", "Tired", "Joyful"];
const EMPTY: DiaryEntry = { mood: "Peaceful", jaap: "", note: "" };
const OLD_STORAGE_KEY = "bhakti-diary-v1";

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  return { first, count };
}

function asEntry(value: unknown): DiaryEntry {
  if (!value || typeof value !== "object") return EMPTY;
  const item = value as Partial<DiaryEntry>;
  return {
    mood: item.mood || EMPTY.mood,
    jaap: item.jaap || "",
    note: item.note || "",
  };
}

export function DiaryClient() {
  const t = useMessages().common;
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const now = new Date();
  const [year] = useState(now.getFullYear());
  const [month] = useState(now.getMonth());
  const [selected, setSelected] = useState(localDateKey(now));
  const [entries, setEntries] = useState<Record<string, DiaryEntry>>({});
  const [draft, setDraft] = useState<DiaryEntry>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      window.localStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setEntries({});
      setError("");
      return;
    }
    let cancelled = false;
    setError("");
    void (async () => {
      try {
        const response = await fetch("/api/diary", {
          cache: "no-store",
          headers: await authHeaders(user),
        });
        const data = (await response.json()) as { ok?: boolean; entries?: Record<string, unknown> };
        if (cancelled) return;
        if (!response.ok || !data.ok) {
          setError(t.diaryLoadError);
          return;
        }
        const next: Record<string, DiaryEntry> = {};
        for (const [date, value] of Object.entries(data.entries ?? {})) {
          next[date] = asEntry(value);
        }
        setEntries(next);
      } catch {
        if (!cancelled) setError(t.diaryLoadError);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, t.diaryLoadError]);

  useEffect(() => {
    setDraft(entries[selected] ?? EMPTY);
    setStatus("");
  }, [entries, selected]);

  const { first, count } = monthDays(year, month);
  const blanks = Array.from({ length: first }, (_, index) => index);
  const days = Array.from({ length: count }, (_, index) => index + 1);
  const monthLabel = new Date(year, month, 1).toLocaleString(locale === "hi" ? "hi-IN" : "en-IN", {
    month: "long",
    year: "numeric",
  });

  const loggedDays = useMemo(() => new Set(Object.keys(entries)), [entries]);
  const signedIn = Boolean(user);
  const formLocked = loading || !signedIn;

  async function onSignIn() {
    setError("");
    try {
      if (configured) {
        await signInWithGoogle();
      } else {
        router.push(withLocale("/login", locale));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.diaryNeedSignIn);
    }
  }

  async function save() {
    if (!user) {
      void onSignIn();
      return;
    }
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: await authHeaders(user),
        body: JSON.stringify({
          date: selected,
          mood: draft.mood,
          jaap: draft.jaap,
          note: draft.note,
        }),
      });
      const data = (await response.json()) as { ok?: boolean };
      if (!response.ok || !data.ok) {
        setError(t.diaryLoadError);
        return;
      }
      setEntries((current) => ({ ...current, [selected]: draft }));
      setStatus(t.diarySaved);
    } catch {
      setError(t.diaryLoadError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="rounded-[32px] bg-white p-5 shadow-sm ring-1 ring-line">
        <p className="font-serif text-xl text-ink">{monthLabel}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{t.diaryWhereHint}</p>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
          {blanks.map((item) => (
            <span key={`b-${item}`} />
          ))}
          {days.map((day) => {
            const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const active = selected === key;
            const has = loggedDays.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`h-9 cursor-pointer rounded-full text-sm ${
                  active ? "bg-saffron text-white" : has ? "bg-sand text-ink" : "text-ink hover:bg-cream"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-line sm:p-8">
        <h2 className="font-serif text-2xl text-ink">Daily log · {selected}</h2>
        {!signedIn && !loading ? (
          <p className="mt-3 text-sm text-muted">{t.diaryNeedSignIn}</p>
        ) : null}
        <label className="mt-6 block text-sm text-muted">
          Mood
          <select
            value={draft.mood}
            disabled={formLocked}
            onChange={(event) => setDraft({ ...draft, mood: event.target.value })}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {MOODS.map((mood) => (
              <option key={mood}>{mood}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm text-muted">
          Naam jaap today
          <input
            value={draft.jaap}
            disabled={formLocked}
            onChange={(event) => setDraft({ ...draft, jaap: event.target.value })}
            placeholder="108 Ram naam, one mala…"
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>
        <label className="mt-4 block text-sm text-muted">
          What stayed with you
          <textarea
            value={draft.note}
            disabled={formLocked}
            onChange={(event) => setDraft({ ...draft, note: event.target.value })}
            rows={6}
            placeholder="A line of katha, a kindness, a restlessness you offered back…"
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>
        {signedIn ? (
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving || loading}
            className="mt-6 cursor-pointer rounded-full bg-saffron px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {saving ? t.diarySaving : t.saveThisDay}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void onSignIn()}
            disabled={loading}
            className="mt-6 cursor-pointer rounded-full bg-saffron px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {t.diarySignInCta}
          </button>
        )}
        {status ? <p className="mt-3 text-sm text-saffron">{status}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        {!signedIn && !loading ? (
          <p className="mt-4 text-xs text-muted">
            <LocaleLink href="/login" className="underline decoration-saffron/50 underline-offset-4">
              {t.loginTitle}
            </LocaleLink>
          </p>
        ) : null}
      </div>
    </div>
  );
}

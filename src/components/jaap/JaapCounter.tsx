"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";
import {
  CircleDot,
  Flame,
  Hand,
  Minus,
  Mountain,
  Plus,
  RotateCcw,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const JaapChakraRing = dynamic(
  () => import("@/components/jaap/JaapChakraRing").then((mod) => mod.JaapChakraRing),
  { ssr: false },
);
import { JaapMantraSelect } from "@/components/jaap/JaapMantraSelect";
import {
  emptyJaapCounts,
  isJaapMantraSlug,
  JAAP_MANTRAS,
  type JaapCounts,
  type JaapMantraSlug,
} from "@/components/jaap/mantras";
import { PATHS } from "@/lib/seo/paths";
import { authHeaders } from "@/lib/auth/headers";

const JAAP_VOICE: Partial<Record<JaapMantraSlug, string>> = {
  "radhe-radhe": "/audio/radhe-premanand.mp3",
  namokar: "/audio/namokar-maha-mantra.mp3",
};

const OLD_STORAGE_KEY = "bhakti-jaap-v1";
const PENDING_KEY = "bhakti-jaap-pending";
const MAX_DELTA = 1080;
const syncedUsers = new Set<string>();

type FloatNaam = {
  id: number;
  text: string;
  color: string;
  x: number;
  y: number;
  drift: number;
  delay: number;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function parseCounts(raw: unknown): JaapCounts {
  const next = emptyJaapCounts();
  if (!raw || typeof raw !== "object") return next;
  for (const [slug, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!isJaapMantraSlug(slug)) continue;
    const count = Number(value);
    if (Number.isFinite(count) && count > 0) next[slug] = Math.floor(count);
  }
  return next;
}

function readPending(): JaapCounts {
  if (typeof window === "undefined") return emptyJaapCounts();
  try {
    return parseCounts(JSON.parse(window.sessionStorage.getItem(PENDING_KEY) || "null"));
  } catch {
    return emptyJaapCounts();
  }
}

function writePending(pending: JaapCounts) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
}

function clearPending() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(PENDING_KEY);
}

function pendingSum(pending: JaapCounts) {
  return Object.values(pending).reduce((sum, value) => sum + value, 0);
}

const QUICK = [
  { slug: "ram-naam", label: "Ram Naam", href: `${PATHS.mantras}/ram-naam`, tone: "bg-[#ffedd5] text-[#c2410c]" },
  { slug: "hare-krishna", label: "Hare Krishna", href: `${PATHS.mantras}/hare-krishna`, tone: "bg-[#dcfce7] text-[#15803d]" },
  { slug: "om-namah-shivaya", label: "Om Namah Shivaya", href: `${PATHS.mantras}/om-namah-shivaya`, tone: "bg-[#dbeafe] text-[#1d4ed8]" },
  { slug: "namokar", label: "Namokar", href: `${PATHS.mantras}/namokar-mantra`, tone: "bg-[#fef3c7] text-[#b45309]" },
  { slug: "hanuman", label: "Hanuman", href: `${PATHS.mantras}/hanuman-mantra`, tone: "bg-[#ffedd5] text-[#9a3412]" },
];

export function JaapCounter({ mode = "counter" }: { mode?: "counter" | "mala" }) {
  const { user, loading: authLoading } = useAuth();
  const t = useMessages();
  const locale = useLocale();
  const router = useRouter();
  const countLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const [hydrated, setHydrated] = useState(false);
  const [mantra, setMantra] = useState<JaapMantraSlug>("radhe-radhe");
  const [globalTotals, setGlobalTotals] = useState<JaapCounts>(emptyJaapCounts);
  const [personalToday, setPersonalToday] = useState<JaapCounts>(emptyJaapCounts);
  const [personalTotals, setPersonalTotals] = useState<JaapCounts>(emptyJaapCounts);
  const [pending, setPending] = useState<JaapCounts>(emptyJaapCounts);
  const [streak, setStreak] = useState(0);
  const [step, setStep] = useState(108);
  const [floats, setFloats] = useState<FloatNaam[]>([]);
  const queueRef = useRef<Partial<JaapCounts>>({});
  const postTimer = useRef<number | undefined>(undefined);
  const floatId = useRef(0);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const voiceOnRef = useRef(false);
  const userRef = useRef(user);
  const pendingRef = useRef(pending);
  const syncedUser = useRef<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const voiceSrc = JAAP_VOICE[mantra];
  const hasVoice = Boolean(voiceSrc);
  voiceOnRef.current = voiceOn;
  userRef.current = user;
  pendingRef.current = pending;

  const applyGlobalRows = useCallback((rows: { slug: string; total: number }[] | undefined) => {
    if (!rows?.length) return;
    setGlobalTotals((current) => {
      const next = { ...current };
      for (const row of rows) {
        if (!isJaapMantraSlug(row.slug)) continue;
        next[row.slug] = Math.max(next[row.slug] ?? 0, Number(row.total) || 0);
      }
      return next;
    });
  }, []);

  const loadGlobals = useCallback(async () => {
    const response = await fetch("/api/stats", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { byMantra?: { slug: string; total: number }[] };
    applyGlobalRows(data.byMantra);
  }, [applyGlobalRows]);

  const loadPersonal = useCallback(
    async (currentUser: NonNullable<typeof user>) => {
      const response = await fetch("/api/jaap", {
        headers: await authHeaders(currentUser),
        cache: "no-store",
      });
      if (!response.ok) return;
      const data = (await response.json()) as {
        today?: Record<string, number>;
        totals?: Record<string, number>;
        streak?: number;
        global?: { slug: string; total: number }[];
      };
      setPersonalToday(parseCounts(data.today));
      setPersonalTotals(parseCounts(data.totals));
      setStreak(Number(data.streak) || 0);
      applyGlobalRows(data.global);
    },
    [applyGlobalRows],
  );

  const flushQueue = useCallback(async () => {
    const queued = queueRef.current;
    queueRef.current = {};
    const entries = Object.entries(queued).filter(([, value]) => (value ?? 0) > 0) as [JaapMantraSlug, number][];
    if (!entries.length) return {};
    const currentUser = userRef.current;
    const flushed: Partial<JaapCounts> = {};
    for (const [slug, delta] of entries) {
      try {
        const headers = currentUser ? await authHeaders(currentUser) : { "Content-Type": "application/json" };
        const response = await fetch("/api/jaap", {
          method: "POST",
          headers,
          body: JSON.stringify({ mantraSlug: slug, delta, date: todayKey() }),
        });
        if (!response.ok) {
          queueRef.current[slug] = (queueRef.current[slug] ?? 0) + delta;
          continue;
        }
        flushed[slug] = delta;
        const data = (await response.json()) as {
          global?: number;
          personalToday?: number;
          personalTotal?: number;
        };
        if (typeof data.global === "number") {
          setGlobalTotals((current) => ({
            ...current,
            [slug]: Math.max(current[slug] ?? 0, data.global ?? 0),
          }));
        }
        if (currentUser && typeof data.personalToday === "number") {
          setPersonalToday((current) => ({
            ...current,
            [slug]: Math.max(current[slug] ?? 0, data.personalToday ?? 0),
          }));
        }
        if (currentUser && typeof data.personalTotal === "number") {
          setPersonalTotals((current) => ({
            ...current,
            [slug]: Math.max(current[slug] ?? 0, data.personalTotal ?? 0),
          }));
        }
      } catch {
        queueRef.current[slug] = (queueRef.current[slug] ?? 0) + delta;
      }
    }
    return flushed;
  }, []);

  const scheduleFlush = useCallback(() => {
    window.clearTimeout(postTimer.current);
    postTimer.current = window.setTimeout(() => {
      void flushQueue();
    }, 350);
  }, [flushQueue]);

  useEffect(() => {
    window.localStorage.removeItem(OLD_STORAGE_KEY);
    setPending(emptyJaapCounts());
    setHydrated(true);
    void loadGlobals();
    return () => {
      window.clearTimeout(postTimer.current);
      void flushQueue();
    };
  }, [flushQueue, loadGlobals]);

  useEffect(() => {
    if (authLoading || !hydrated) return;
    if (!user) {
      if (syncedUser.current) syncedUsers.delete(syncedUser.current);
      syncedUser.current = null;
      return;
    }
    if (syncedUsers.has(user.uid) || syncedUser.current === user.uid) return;
    syncedUsers.add(user.uid);
    syncedUser.current = user.uid;
    void (async () => {
      const unsent = await flushQueue();
      const stored = readPending();
      const remaining = emptyJaapCounts();
      for (const item of JAAP_MANTRAS) {
        const slug = item.slug;
        remaining[slug] = Math.max(
          0,
          Math.max(pendingRef.current[slug] ?? 0, stored[slug] ?? 0) - (unsent[slug] ?? 0),
        );
      }
      if (pendingSum(remaining) > 0) {
        const headers = await authHeaders(user);
        await fetch("/api/jaap", {
          method: "POST",
          headers,
          body: JSON.stringify({ pending: remaining, personalOnly: true, date: todayKey() }),
        });
      }
      clearPending();
      await loadPersonal(user);
    })().catch(() => {
      syncedUsers.delete(user.uid);
      syncedUser.current = null;
    });
  }, [authLoading, flushQueue, hydrated, loadPersonal, user]);

  useEffect(() => {
    if (voiceRef.current) voiceRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = voiceRef.current;
    if (!audio) {
      setVoiceOn(false);
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    setVoiceOn(false);
  }, [voiceSrc]);

  useEffect(() => {
    return () => {
      voiceRef.current?.pause();
    };
  }, []);

  const displayCount = pending[mantra] ?? 0;
  const malaProgress = displayCount % 108;
  const malasToday = Math.floor(displayCount / 108);
  const worldwideTotal = Object.values(globalTotals).reduce((sum, value) => sum + value, 0);
  const personalAll = Object.values(personalTotals).reduce((sum, value) => sum + value, 0);
  const selected = JAAP_MANTRAS.find((item) => item.slug === mantra) ?? JAAP_MANTRAS[0];

  const add = useCallback(
    (rawDelta: number) => {
      const delta = Math.min(MAX_DELTA, Math.max(0, Math.floor(rawDelta)));
      if (!delta) return;
      const currentUser = userRef.current;
      setGlobalTotals((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
      setPending((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
      if (currentUser) {
        setPersonalTotals((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
        setStreak((current) => Math.max(current, 1));
      }
      queueRef.current[mantra] = (queueRef.current[mantra] ?? 0) + delta;
      scheduleFlush();
    },
    [mantra, scheduleFlush],
  );

  const spawnNaam = useCallback(
    (x: number, y: number) => {
      const id = floatId.current + 1;
      floatId.current = id;
      setFloats((current) => [
        ...current.slice(-8),
        {
          id,
          text: selected.balloon,
          color: selected.color,
          x,
          y,
          drift: 200 * (Math.random() - 0.5),
          delay: 80 * Math.random(),
        },
      ]);
    },
    [selected],
  );

  function onCardClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("[data-jaap-ignore]")) return;
    add(1);
    spawnNaam(event.clientX, event.clientY);
  }

  function onContinueClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    add(step);
    spawnNaam(event.clientX, event.clientY);
  }

  function onClear(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setStep(108);
    setFloats([]);
    setPending(emptyJaapCounts());
  }

  async function onSync(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    writePending(pendingRef.current);
    await flushQueue();
    writePending(pendingRef.current);
    const next = withLocale(PATHS.naamJaap, locale);
    router.push(withLocale(`/login?next=${encodeURIComponent(next)}`, locale));
  }

  async function toggleVoice(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const audio = voiceRef.current;
    if (!audio) return;
    if (voiceOn) {
      audio.pause();
      setVoiceOn(false);
      return;
    }
    try {
      audio.loop = true;
      audio.volume = volume;
      await audio.play();
      setVoiceOn(true);
    } catch {
      setVoiceOn(false);
    }
  }

  function restartVoice() {
    const audio = voiceRef.current;
    if (!audio || !voiceOnRef.current || !hasVoice) {
      setVoiceOn(false);
      return;
    }
    try {
      audio.currentTime = 0;
      audio.loop = true;
      audio.volume = volume;
      void audio.play().catch(() => setVoiceOn(false));
    } catch {
      setVoiceOn(false);
    }
  }

  function onVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    const next = Number(event.target.value);
    setVolume(next);
    if (voiceRef.current) voiceRef.current.volume = next;
  }

  const beads = useMemo(() => Array.from({ length: 108 }, (_, index) => index), []);
  const progressCards = user
    ? [
        {
          label: t.jaap.thisSitting,
          value: displayCount.toLocaleString(countLocale),
          icon: Hand,
          tone: "bg-[#ffedd5] text-[#c2410c]",
        },
        {
          label: t.jaap.malaToday,
          value: String(malasToday),
          icon: CircleDot,
          tone: "bg-[#ffedd5] text-[#ea580c]",
        },
        {
          label: t.jaap.totalJaap,
          value: personalAll.toLocaleString(countLocale),
          icon: UserRound,
          tone: "bg-[#dbeafe] text-[#1d4ed8]",
        },
        {
          label: t.jaap.streak,
          value: t.jaap.days(streak || 0),
          icon: Mountain,
          tone: "bg-[#ede9fe] text-[#6d28d9]",
        },
      ]
    : [
        {
          label: t.jaap.thisSitting,
          value: displayCount.toLocaleString(countLocale),
          icon: Hand,
          tone: "bg-[#ffedd5] text-[#c2410c]",
        },
        {
          label: t.jaap.malaToday,
          value: String(malasToday),
          icon: CircleDot,
          tone: "bg-[#ffedd5] text-[#ea580c]",
        },
        {
          label: t.jaap.worldwide,
          value: worldwideTotal.toLocaleString(countLocale),
          icon: UserRound,
          tone: "bg-[#dbeafe] text-[#1d4ed8]",
        },
      ];

  if (!hydrated) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-line">
        <p className="text-sm text-muted">Preparing your jaap counter…</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="jaap-flow-layer" aria-hidden="true">
        {floats.map((item) => (
          <span
            key={item.id}
            className="jaap-name-flow font-devanagari"
            style={{
              left: item.x,
              top: item.y,
              color: item.color,
              ["--jaap-glow" as string]: item.color,
              ["--random-x" as string]: `${item.drift}px`,
              ["--animation-delay" as string]: `${item.delay}ms`,
            }}
            onAnimationEnd={() =>
              setFloats((current) => current.filter((float) => float.id !== item.id))
            }
          >
            {item.text}
          </span>
        ))}
      </div>

      <div
        className="relative cursor-pointer overflow-hidden rounded-[32px] bg-[#fff8f1] px-3 py-8 shadow-sm ring-1 ring-line select-none sm:overflow-visible sm:px-10 sm:py-10"
        onClick={onCardClick}
      >
        {voiceSrc ? (
          <audio
            key={voiceSrc}
            ref={voiceRef}
            src={voiceSrc}
            loop
            preload="none"
            onEnded={restartVoice}
          />
        ) : null}
        {hasVoice ? (
          <div
            data-jaap-ignore
            onClick={(event) => event.stopPropagation()}
            className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-full bg-[#fff4ea] py-1 pr-1.5 pl-1.5 shadow-sm ring-1 ring-[#f3d2b3] sm:top-4 sm:left-4 sm:py-1.5 md:pr-3"
          >
            <button
              type="button"
              onClick={toggleVoice}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-saffron sm:h-8 sm:w-8"
              aria-label={voiceOn ? t.jaap.mute : t.jaap.play}
              title={voiceOn ? t.jaap.mute : "Bhakti Voice"}
            >
              {voiceOn ? <VolumeX className="h-5 w-5 text-saffron-deep sm:h-4 sm:w-4" /> : <Volume2 className="h-5 w-5 sm:h-4 sm:w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={onVolumeChange}
              aria-label="Voice volume"
              className="jaap-volume hidden w-20 cursor-pointer md:block md:w-28"
              style={{
                background: `linear-gradient(to right, #e67e22 ${volume * 100}%, #f7e4d2 ${volume * 100}%)`,
              }}
            />
          </div>
        ) : null}
        {!user && !authLoading ? (
          <button
            type="button"
            data-jaap-ignore
            onClick={onSync}
            title={t.jaap.syncHint}
            className="absolute top-3 right-3 z-20 text-sm font-medium text-saffron-deep underline decoration-saffron/40 underline-offset-4 sm:top-4 sm:right-4"
          >
            {t.jaap.sync}
          </button>
        ) : null}
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center pt-10 sm:pt-2">
          <JaapMantraSelect value={mantra} onChange={setMantra} />

          <div className="relative mt-6 flex aspect-square w-full max-w-[320px] items-center justify-center">
            <JaapChakraRing malaProgress={malaProgress} />
            <span className="relative z-10 flex flex-col items-center">
              <span className="font-serif text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                {displayCount.toLocaleString(countLocale)}
              </span>
              <span className="mt-1 text-sm text-muted">{t.jaap.thisSitting}</span>
              <span className="mt-4 text-base font-semibold text-ink">{t.jaap.malaCount(malasToday)}</span>
              {user ? (
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-saffron-deep">
                  <Flame className="h-4 w-4 fill-saffron text-saffron" />
                  {t.jaap.dayStreak(streak)}
                </span>
              ) : null}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3" data-jaap-ignore onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setStep((value) => Math.max(1, value - 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4ea] text-saffron"
              aria-label="Decrease step"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              value={step}
              onChange={(event) => setStep(Math.max(1, Math.min(MAX_DELTA, Number(event.target.value) || 1)))}
              className="h-11 w-24 rounded-2xl bg-[#fff4ea] text-center text-lg font-medium text-saffron-deep outline-none"
              aria-label="Jaap increment"
            />
            <button
              type="button"
              onClick={() => setStep((value) => Math.min(MAX_DELTA, value + 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4ea] text-saffron"
              aria-label="Increase step"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            data-jaap-ignore
            onClick={onContinueClick}
            className="mt-5 w-full max-w-sm rounded-full bg-saffron px-8 py-3.5 text-base font-medium text-white shadow-sm"
          >
            {t.jaap.continueJaap}
          </button>
          <button
            type="button"
            data-jaap-ignore
            onClick={onClear}
            className="mt-3 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-line bg-white/80 px-8 py-3 text-sm font-medium text-muted"
          >
            <RotateCcw className="h-4 w-4" />
            {t.jaap.clear}
          </button>
        </div>
      </div>

      {mode === "mala" ? (
        <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line">
          <h2 className="font-serif text-xl text-ink">{t.jaap.malaBeads}</h2>
          <div className="mt-4 grid grid-cols-12 gap-1.5">
            {beads.map((index) => {
              const filled = index < malaProgress || (malaProgress === 0 && displayCount > 0 && index === 107);
              const active = malaProgress > 0 && index < malaProgress;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => add(1)}
                  className={`h-4 w-4 rounded-full ${
                    active || (displayCount > 0 && filled && malaProgress === 0) ? "bg-saffron" : "bg-sand"
                  }`}
                  aria-label={`Bead ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      <section className="mt-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-line sm:p-6">
        <h2 className="font-serif text-xl text-ink">{t.jaap.progress}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {progressCards.map((card) => (
            <div key={card.label} className="flex items-center gap-3 rounded-2xl bg-[#fff7ef] p-4">
              <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.tone}`}>
                <card.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">{card.label}</p>
                <p className="mt-0.5 text-lg font-semibold text-ink">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-line sm:p-6" id="history">
        <h2 className="font-serif text-xl text-ink">{t.jaap.quickActions}</h2>
        <div className="mt-5 flex flex-wrap gap-5" id="statistics">
          {QUICK.map((item) => (
            <LocaleLink key={item.slug} href={item.href} className="flex w-20 flex-col items-center gap-2">
              <span className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-xs font-medium ${item.tone}`}>
                {item.label.slice(0, 1)}
              </span>
              <span className="text-center text-xs text-ink">{item.label}</span>
            </LocaleLink>
          ))}
        </div>
      </section>
    </div>
  );
}

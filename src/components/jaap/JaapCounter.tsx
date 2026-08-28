"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";
import {
  Bell,
  CheckCircle2,
  CircleDot,
  Flame,
  Hand,
  Maximize2,
  Minus,
  Mountain,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  UserRound,
  Vibrate,
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
import { JaapShareModal } from "@/components/jaap/JaapShareModal";
import { JaapZenMode } from "@/components/jaap/JaapZenMode";
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
const UNSENT_KEY = "bhakti-jaap-unsent";
const MAX_DELTA = 1080;
const IDLE_FLUSH_MS = 5000;
const MAX_FLUSH_MS = 15000;
const COUNT_FLUSH = 27;
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

function newBatchId() {
  return `j-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function readUnsent(): { batchId: string; counts: JaapCounts } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = JSON.parse(window.localStorage.getItem(UNSENT_KEY) || "null") as {
      batchId?: string;
      counts?: unknown;
    } | null;
    if (!raw || typeof raw !== "object") return null;
    const counts = parseCounts(raw.counts ?? raw);
    if (!pendingSum(counts)) return null;
    const batchId = typeof raw.batchId === "string" && raw.batchId.length >= 8 ? raw.batchId : newBatchId();
    return { batchId, counts };
  } catch {
    return null;
  }
}

function writeUnsent(batchId: string, counts: Partial<JaapCounts>) {
  if (typeof window === "undefined") return;
  const parsed = parseCounts(counts);
  if (!pendingSum(parsed)) {
    window.localStorage.removeItem(UNSENT_KEY);
    return;
  }
  window.localStorage.setItem(UNSENT_KEY, JSON.stringify({ batchId, date: todayKey(), counts: parsed }));
}

function clearUnsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(UNSENT_KEY);
}

export function JaapCounter({ mode = "counter" }: { mode?: "counter" | "mala" }) {
  const { user, loading: authLoading } = useAuth();
  const t = useMessages();
  const locale = useLocale();
  const router = useRouter();
  const isHi = locale === "hi";
  const countLocale = isHi ? "hi-IN" : "en-IN";

  const [hydrated, setHydrated] = useState(false);
  const [mantra, setMantra] = useState<JaapMantraSlug>("radhe-radhe");
  const [globalTotals, setGlobalTotals] = useState<JaapCounts>(emptyJaapCounts);
  const [personalToday, setPersonalToday] = useState<JaapCounts>(emptyJaapCounts);
  const [personalTotals, setPersonalTotals] = useState<JaapCounts>(emptyJaapCounts);
  const [pending, setPending] = useState<JaapCounts>(emptyJaapCounts);
  const [streak, setStreak] = useState(0);
  const [step, setStep] = useState(108);
  const [floats, setFloats] = useState<FloatNaam[]>([]);
  const [targetMalas, setTargetMalas] = useState(1);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [milestoneNotice, setMilestoneNotice] = useState<string | null>(null);

  const queueRef = useRef<Partial<JaapCounts>>({});
  const postTimer = useRef<number | undefined>(undefined);
  const flushStartedAt = useRef(0);
  const flushingRef = useRef(false);
  const batchIdRef = useRef("");
  const tokenRef = useRef("");
  const floatId = useRef(0);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceOnRef = useRef(false);
  const userRef = useRef(user);
  const pendingRef = useRef(pending);
  const syncedUser = useRef<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const selected = JAAP_MANTRAS.find((item) => item.slug === mantra) ?? JAAP_MANTRAS[0];
  const voiceSrc = JAAP_VOICE[mantra];
  const hasVoice = Boolean(voiceSrc);
  voiceOnRef.current = voiceOn;
  userRef.current = user;
  pendingRef.current = pending;

  // Web Audio synthetic peaceful temple chime synthesizer
  const playSacredChime = useCallback(() => {
    if (!chimeEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Fundamental and gentle harmonic frequencies of Indian Bell (Ghantha)
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, now); // 528Hz Solfeggio / Love frequency
      osc.frequency.exponentialRampToValueAtTime(1056, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(528, now + 1.2);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [chimeEnabled]);

  const triggerHaptic = useCallback(() => {
    if (hapticsEnabled && typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignored
      }
    }
  }, [hapticsEnabled]);

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
    const response = await fetch("/api/stats");
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

  const restoreQueue = useCallback((counts: Partial<JaapCounts>) => {
    for (const [slug, value] of Object.entries(counts)) {
      if (!isJaapMantraSlug(slug) || !value) continue;
      queueRef.current[slug] = (queueRef.current[slug] ?? 0) + value;
    }
  }, []);

  const persistQueue = useCallback(() => {
    if (!batchIdRef.current) batchIdRef.current = newBatchId();
    writeUnsent(batchIdRef.current, queueRef.current);
  }, []);

  const sendKeepalive = useCallback(() => {
    persistQueue();
    const stored = readUnsent();
    if (!stored) return;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (tokenRef.current) headers.Authorization = `Bearer ${tokenRef.current}`;
    void fetch("/api/jaap", {
      method: "POST",
      headers,
      body: JSON.stringify({ counts: stored.counts, date: todayKey(), batchId: stored.batchId }),
      keepalive: true,
    });
  }, [persistQueue]);

  const flushQueue = useCallback(async () => {
    if (flushingRef.current) return {};
    let counts = Object.fromEntries(
      Object.entries(queueRef.current).filter(([, value]) => (value ?? 0) > 0),
    ) as Partial<JaapCounts>;
    if (!Object.keys(counts).length) {
      const stored = readUnsent();
      if (!stored) return {};
      counts = stored.counts;
      batchIdRef.current = stored.batchId;
    }
    if (!batchIdRef.current) batchIdRef.current = newBatchId();
    const batchId = batchIdRef.current;
    writeUnsent(batchId, counts);
    queueRef.current = {};
    flushStartedAt.current = 0;
    flushingRef.current = true;
    const currentUser = userRef.current;
    try {
      const headers = currentUser
        ? await authHeaders(currentUser)
        : tokenRef.current
          ? { Authorization: `Bearer ${tokenRef.current}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };
      if ("Authorization" in headers) {
        const token = String((headers as { Authorization?: string }).Authorization || "").replace(/^Bearer\s+/i, "");
        if (token) tokenRef.current = token;
      }
      const response = await fetch("/api/jaap", {
        method: "POST",
        headers,
        body: JSON.stringify({ counts, date: todayKey(), batchId }),
        keepalive: true,
      });
      if (!response.ok) {
        restoreQueue(counts);
        writeUnsent(batchId, { ...counts, ...queueRef.current });
        return {};
      }
      const data = (await response.json()) as {
        global?: { slug: string; total: number }[] | number;
        today?: Record<string, number>;
        totals?: Record<string, number>;
      };
      clearUnsent();
      batchIdRef.current = "";
      if (Array.isArray(data.global)) applyGlobalRows(data.global);
      if (currentUser) {
        if (data.today) setPersonalToday(parseCounts(data.today));
        if (data.totals) setPersonalTotals(parseCounts(data.totals));
      }
      return counts;
    } catch {
      restoreQueue(counts);
      writeUnsent(batchId, { ...counts, ...queueRef.current });
      return {};
    } finally {
      flushingRef.current = false;
      if (pendingSum({ ...emptyJaapCounts(), ...queueRef.current })) {
        window.clearTimeout(postTimer.current);
        postTimer.current = window.setTimeout(() => {
          void flushQueue();
        }, IDLE_FLUSH_MS);
      }
    }
  }, [applyGlobalRows, restoreQueue]);

  const scheduleFlush = useCallback(() => {
    const queued = pendingSum({ ...emptyJaapCounts(), ...queueRef.current });
    if (!queued) return;
    if (!flushStartedAt.current) flushStartedAt.current = Date.now();
    window.clearTimeout(postTimer.current);
    const waited = Date.now() - flushStartedAt.current;
    const delay =
      queued >= COUNT_FLUSH || waited >= MAX_FLUSH_MS
        ? 0
        : Math.min(IDLE_FLUSH_MS, Math.max(0, MAX_FLUSH_MS - waited));
    postTimer.current = window.setTimeout(() => {
      void flushQueue();
    }, delay);
  }, [flushQueue]);

  useEffect(() => {
    if (!user) {
      tokenRef.current = "";
      return;
    }
    let cancelled = false;
    const refresh = () => {
      void user.getIdToken().then((token) => {
        if (!cancelled) tokenRef.current = token;
      });
    };
    refresh();
    const timer = window.setInterval(refresh, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [user]);

  useEffect(() => {
    window.localStorage.removeItem(OLD_STORAGE_KEY);
    const stored = readUnsent();
    if (stored) {
      batchIdRef.current = stored.batchId;
      queueRef.current = stored.counts;
    }
    setPending(emptyJaapCounts());
    setHydrated(true);
    void loadGlobals();
    if (stored) void flushQueue();
    const onHide = () => {
      window.clearTimeout(postTimer.current);
      sendKeepalive();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onHide();
    };
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(postTimer.current);
      sendKeepalive();
    };
  }, [flushQueue, loadGlobals, sendKeepalive]);

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

  const add = useCallback(
    (rawDelta: number) => {
      const delta = Math.min(MAX_DELTA, Math.max(0, Math.floor(rawDelta)));
      if (!delta) return;
      const currentUser = userRef.current;
      const prevCount = pendingRef.current[mantra] ?? 0;
      const nextCount = prevCount + delta;

      triggerHaptic();

      // Check if a 108 mala milestone is crossed
      if (Math.floor(nextCount / 108) > Math.floor(prevCount / 108)) {
        playSacredChime();
        const newMalaNum = Math.floor(nextCount / 108);
        setMilestoneNotice(
          isHi ? `🎉 बधाई! ${newMalaNum} माला पूर्ण हुई। जय श्री राम!` : `🎉 Blessed! Completed Mala #${newMalaNum}!`,
        );
        setTimeout(() => setMilestoneNotice(null), 4000);
      }

      setGlobalTotals((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
      setPending((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
      if (currentUser) {
        setPersonalTotals((current) => ({ ...current, [mantra]: (current[mantra] ?? 0) + delta }));
        setStreak((current) => Math.max(current, 1));
      }
      queueRef.current[mantra] = (queueRef.current[mantra] ?? 0) + delta;
      persistQueue();
      scheduleFlush();
    },
    [isHi, mantra, persistQueue, playSacredChime, scheduleFlush, triggerHaptic],
  );

  const spawnNaam = useCallback(
    (x?: number, y?: number) => {
      const posX = x && x > 0 ? x : typeof window !== "undefined" ? window.innerWidth / 2 : 200;
      const posY = y && y > 0 ? y : typeof window !== "undefined" ? window.innerHeight / 2 : 300;
      const id = floatId.current + 1;
      floatId.current = id;
      setFloats((current) => [
        ...current.slice(-8),
        {
          id,
          text: selected.balloon,
          color: selected.color,
          x: posX,
          y: posY,
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

  async function toggleVoice(event?: MouseEvent<HTMLButtonElement>) {
    event?.stopPropagation();
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
      {/* Floating Devanagari Name Blossoms */}
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

      {/* Milestone Toast Celebration */}
      {milestoneNotice && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] animate-bounce px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-serif font-bold shadow-xl border border-amber-200 text-sm sm:text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-200 fill-current animate-spin" />
          <span>{milestoneNotice}</span>
        </div>
      )}

      {/* Main Devotional Sanctuary Card */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-[36px] bg-gradient-to-b from-[#fffbf5] via-[#fff6ec] to-[#ffeed9] px-4 py-6 sm:px-10 sm:py-8 shadow-md ring-1 ring-[#e8cca8] select-none transition-all duration-300"
        onClick={onCardClick}
      >
        {/* Audio Elements */}
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

        {/* Top Control Bar — Clean, Single-Line, Uncluttered */}
        <div
          data-jaap-ignore
          onClick={(event) => event.stopPropagation()}
          className="relative z-20 flex items-center justify-between gap-2 mb-3"
        >
          {/* Left Audio & Haptic Controls Pill */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/95 ring-1 ring-[#ecd9be] shadow-xs">
            {hasVoice ? (
              <button
                type="button"
                onClick={() => void toggleVoice()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-saffron hover:bg-orange-50 transition"
                aria-label={voiceOn ? t.jaap.mute : t.jaap.play}
                title={voiceOn ? t.jaap.mute : "Bhakti Dhun"}
              >
                {voiceOn ? (
                  <VolumeX className="h-4 w-4 text-saffron-deep animate-pulse" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            ) : null}

            {/* Chime Toggle */}
            <button
              type="button"
              onClick={() => setChimeEnabled((v) => !v)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
                chimeEnabled ? "bg-amber-100 text-amber-900 font-semibold" : "text-stone-400 hover:text-stone-600"
              }`}
              title={t.jaap.bellChime}
              aria-label={t.jaap.bellChime}
            >
              <Bell className="w-3.5 h-3.5" />
            </button>

            {/* Haptics Toggle */}
            <button
              type="button"
              onClick={() => setHapticsEnabled((v) => !v)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
                hapticsEnabled ? "bg-amber-100 text-amber-900 font-semibold" : "text-stone-400 hover:text-stone-600"
              }`}
              title={t.jaap.hapticFeedback}
              aria-label={t.jaap.hapticFeedback}
            >
              <Vibrate className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Zen Mode & Sync Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZenOpen(true)}
              className="inline-flex h-8 items-center gap-1.5 px-3 rounded-full bg-white/95 ring-1 ring-[#ecd9be] text-xs font-semibold text-stone-700 hover:text-saffron hover:bg-orange-50 transition shadow-xs"
              title={t.jaap.zenMode}
            >
              <Maximize2 className="w-3.5 h-3.5 text-saffron" />
              <span className="text-[11px] font-medium hidden sm:inline">{t.jaap.zenMode}</span>
            </button>

            {!user && !authLoading ? (
              <button
                type="button"
                onClick={onSync}
                title={t.jaap.syncHint}
                className="text-xs font-semibold text-saffron-deep underline decoration-saffron/40 underline-offset-2 px-1 hover:text-orange-800 transition"
              >
                {t.jaap.sync}
              </button>
            ) : null}
          </div>
        </div>

        {/* Center Sanctuary Content */}
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center pt-1">
          <JaapMantraSelect value={mantra} onChange={setMantra} />

          {/* Main Glowing Chakra Ring */}
          <div className="relative mt-5 flex aspect-square w-full max-w-[310px] items-center justify-center">
            <JaapChakraRing malaProgress={malaProgress} />
            <span className="relative z-10 flex flex-col items-center">
              <span className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl drop-shadow-xs">
                {displayCount.toLocaleString(countLocale)}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
                {t.jaap.thisSitting}
              </span>
              <span className="mt-3 text-sm font-bold text-amber-900 flex items-center gap-1.5 bg-amber-100/90 px-3.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {t.jaap.malaCount(malasToday)} ({malaProgress}/108)
              </span>
              {user ? (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-saffron-deep bg-orange-100/70 px-2.5 py-0.5 rounded-full">
                  <Flame className="h-3.5 w-3.5 fill-saffron text-saffron" />
                  {t.jaap.dayStreak(streak)}
                </span>
              ) : null}
            </span>
          </div>

          {/* Stepper increment */}
          <div
            className="mt-6 flex items-center gap-3"
            data-jaap-ignore
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setStep((value) => Math.max(1, value - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-saffron ring-1 ring-orange-200 hover:bg-orange-50 transition active:scale-95 shadow-2xs"
              aria-label="Decrease step"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <div className="relative">
              <input
                value={step}
                onChange={(event) => setStep(Math.max(1, Math.min(MAX_DELTA, Number(event.target.value) || 1)))}
                className="h-9 w-20 rounded-2xl bg-white text-center text-sm font-bold text-saffron-deep ring-1 ring-orange-200 outline-none focus:ring-2 focus:ring-saffron shadow-2xs"
                aria-label="Jaap increment"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep((value) => Math.min(MAX_DELTA, value + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-saffron ring-1 ring-orange-200 hover:bg-orange-50 transition active:scale-95 shadow-2xs"
              aria-label="Increase step"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            data-jaap-ignore
            onClick={onContinueClick}
            className="mt-4 w-full max-w-sm rounded-full bg-gradient-to-r from-saffron to-saffron-deep px-8 py-3 text-base font-semibold text-white shadow-md hover:brightness-105 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <span>{t.jaap.continueJaap} (+{step})</span>
          </button>

          {/* Secondary Action Row: Share Sadhana & Clear */}
          <div
            className="mt-3 flex items-center gap-2.5 w-full max-w-sm"
            data-jaap-ignore
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-orange-200/80 bg-white/95 py-2 px-4 text-xs font-semibold text-saffron-deep hover:bg-orange-50 transition shadow-2xs"
            >
              <Share2 className="h-3.5 w-3.5 text-saffron" />
              <span>{t.jaap.shareSadhana}</span>
            </button>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white/80 py-2 px-3.5 text-xs font-medium text-stone-500 hover:bg-stone-50 transition"
              title={t.jaap.clear}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.jaap.clear}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mala Mode Grid Display */}
      {mode === "mala" ? (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-ink">{t.jaap.malaBeads} (108)</h2>
            <span className="text-xs font-semibold text-saffron bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              {malaProgress} / 108 {isHi ? "मनके पूर्ण" : "Beads Done"}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2 sm:gap-2.5">
            {beads.map((index) => {
              const filled = index < malaProgress || (malaProgress === 0 && displayCount > 0 && index === 107);
              const active = malaProgress > 0 && index < malaProgress;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => add(1)}
                  className={`h-4 sm:h-5 w-full rounded-full transition-all duration-200 ${
                    active || (displayCount > 0 && filled && malaProgress === 0)
                      ? "bg-gradient-to-tr from-amber-500 to-orange-500 shadow-xs scale-105"
                      : "bg-[#f3ede4] hover:bg-[#e8decb]"
                  }`}
                  aria-label={`Bead ${index + 1}`}
                  title={`Bead ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Today's Progress Cards */}
      <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line sm:p-6" id="progress-section">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-ink">{t.jaap.progress}</h2>
          {streak > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              {t.jaap.dayStreak(streak)}
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {progressCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-3.5 rounded-2xl bg-gradient-to-br from-[#fffbf5] to-[#fff5ea] p-4 border border-[#f0dfcc]"
            >
              <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${card.tone} shadow-xs`}>
                <card.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted font-bold">{card.label}</p>
                <p className="mt-0.5 text-xl font-serif font-bold text-ink">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Modal Dialog */}
      <JaapShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        count={displayCount}
        malas={malasToday}
        streak={streak}
        mantraSlug={mantra}
      />

      {/* Fullscreen Zen Dhyan Mode */}
      <JaapZenMode
        isOpen={isZenOpen}
        onClose={() => setIsZenOpen(false)}
        count={displayCount}
        mantra={mantra}
        onTap={(x, y) => {
          add(1);
          spawnNaam(x, y);
        }}
        voiceOn={voiceOn}
        onToggleVoice={() => void toggleVoice()}
        streak={streak}
      />
    </div>
  );
}

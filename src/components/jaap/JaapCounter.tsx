"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale, useMessages } from "@/lib/i18n/client";
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

const JaapChakraRing = dynamic(
  () => import("@/components/jaap/JaapChakraRing").then((mod) => mod.JaapChakraRing),
  { ssr: false },
);
import { JaapMantraSelect } from "@/components/jaap/JaapMantraSelect";
import { JAAP_MANTRAS, type JaapMantraSlug } from "@/components/jaap/mantras";
import { PATHS } from "@/lib/seo/paths";

type FloatNaam = {
  id: number;
  text: string;
  color: string;
  x: number;
  y: number;
  drift: number;
  delay: number;
};

type JaapStore = {
  mantra: JaapMantraSlug;
  counts: Record<string, number>;
  total: number;
  streak: number;
  lastDate: string;
};

const STORAGE_KEY = "bhakti-jaap-v1";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function emptyStore(): JaapStore {
  return {
    mantra: "radhe-radhe",
    counts: {},
    total: 0,
    streak: 0,
    lastDate: "",
  };
}

function readStore(): JaapStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<JaapStore>;
    return {
      ...emptyStore(),
      ...parsed,
      counts: parsed.counts ?? {},
      mantra: parsed.mantra ?? "radhe-radhe",
    };
  } catch {
    return emptyStore();
  }
}

const QUICK = [
  { slug: "ram-naam", label: "Ram Naam", href: `${PATHS.mantras}/ram-naam`, tone: "bg-[#ffedd5] text-[#c2410c]" },
  { slug: "hare-krishna", label: "Hare Krishna", href: `${PATHS.mantras}/hare-krishna`, tone: "bg-[#dcfce7] text-[#15803d]" },
  { slug: "om-namah-shivaya", label: "Om Namah Shivaya", href: `${PATHS.mantras}/om-namah-shivaya`, tone: "bg-[#dbeafe] text-[#1d4ed8]" },
  { slug: "namokar", label: "Namokar", href: `${PATHS.mantras}/namokar-mantra`, tone: "bg-[#fef3c7] text-[#b45309]" },
  { slug: "hanuman", label: "Hanuman", href: `${PATHS.mantras}/hanuman-mantra`, tone: "bg-[#ffedd5] text-[#9a3412]" },
];

export function JaapCounter({ mode = "counter" }: { mode?: "counter" | "mala" }) {
  const { user } = useAuth();
  const t = useMessages();
  const locale = useLocale();
  const countLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const [hydrated, setHydrated] = useState(false);
  const [store, setStore] = useState<JaapStore>(emptyStore);
  const [date, setDate] = useState(todayKey);
  const [step, setStep] = useState(108);
  const [floats, setFloats] = useState<FloatNaam[]>([]);
  const postTimer = useRef<number | undefined>(undefined);
  const floatId = useRef(0);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const isRadhe = store.mantra === "radhe-radhe";

  useEffect(() => {
    const next = readStore();
    const today = todayKey();
    if (next.lastDate && next.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().slice(0, 10);
      next.streak = next.lastDate === yesterdayKey ? next.streak : 0;
    }
    setStore(next);
    setDate(today);
    setHydrated(true);
  }, []);

  useEffect(() => {
    const audio = voiceRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (!isRadhe) {
      audio.pause();
      audio.currentTime = 0;
      setVoiceOn(false);
    }
  }, [isRadhe, volume]);

  useEffect(() => {
    return () => {
      voiceRef.current?.pause();
    };
  }, []);

  const todayCount = store.counts[date] ?? 0;
  const malaProgress = todayCount % 108;
  const malasToday = Math.floor(todayCount / 108);

  const persist = useCallback(
    (next: JaapStore) => {
      setStore(next);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (!user) return;
      window.clearTimeout(postTimer.current);
      postTimer.current = window.setTimeout(() => {
        void fetch("/api/jaap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            mantraSlug: next.mantra,
            count: next.counts[date] ?? 0,
            date,
          }),
        });
      }, 400);
    },
    [date, user],
  );

  const add = useCallback(
    (delta: number) => {
      const current = store.counts[date] ?? 0;
      const nextCount = Math.max(0, current + delta);
      const applied = nextCount - current;
      persist({
        ...store,
        counts: { ...store.counts, [date]: nextCount },
        total: Math.max(0, store.total + applied),
        lastDate: date,
        streak: store.lastDate === date || !store.lastDate ? Math.max(store.streak, 1) : store.streak + 1,
      });
    },
    [date, persist, store],
  );

  const spawnNaam = useCallback(
    (x: number, y: number) => {
      const mantra = JAAP_MANTRAS.find((item) => item.slug === store.mantra) ?? JAAP_MANTRAS[0];
      const id = floatId.current + 1;
      floatId.current = id;
      setFloats((current) => [
        ...current.slice(-8),
        {
          id,
          text: mantra.balloon,
          color: mantra.color,
          x,
          y,
          drift: 200 * (Math.random() - 0.5),
          delay: 80 * Math.random(),
        },
      ]);
    },
    [store.mantra],
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
    persist(emptyStore());
    setStep(108);
    setFloats([]);
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
      audio.volume = volume;
      await audio.play();
      setVoiceOn(true);
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
        className="relative cursor-pointer overflow-visible rounded-[32px] bg-[#fff8f1] px-4 py-10 shadow-sm ring-1 ring-line select-none sm:px-10"
        onClick={onCardClick}
      >
        <audio
          ref={voiceRef}
          src="/audio/radhe-premanand.mp3"
          loop
          preload="none"
          onEnded={() => setVoiceOn(false)}
        />
        {isRadhe ? (
          <div
            data-jaap-ignore
            onClick={(event) => event.stopPropagation()}
            className="absolute top-4 left-4 z-20 hidden items-center gap-2 rounded-full bg-[#fff4ea] py-1.5 pr-3 pl-1.5 shadow-sm ring-1 ring-[#f3d2b3] md:flex"
          >
            <button
              type="button"
              onClick={toggleVoice}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-saffron"
              aria-label={voiceOn ? t.jaap.mute : t.jaap.play}
              title={voiceOn ? t.jaap.mute : "Bhakti Voice"}
            >
              {voiceOn ? <VolumeX className="h-4 w-4 text-saffron-deep" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={onVolumeChange}
              aria-label="Voice volume"
              className="jaap-volume w-20 cursor-pointer sm:w-28"
              style={{
                background: `linear-gradient(to right, #e67e22 ${volume * 100}%, #f7e4d2 ${volume * 100}%)`,
              }}
            />
          </div>
        ) : null}
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
          <JaapMantraSelect
            value={store.mantra}
            onChange={(slug) => persist({ ...store, mantra: slug })}
          />

          <div className="relative mt-6 flex h-[320px] w-[320px] items-center justify-center sm:h-[340px] sm:w-[340px]">
            <JaapChakraRing malaProgress={malaProgress} />
            <span className="relative z-10 flex flex-col items-center">
              <span className="font-serif text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                {todayCount.toLocaleString(countLocale)}
              </span>
              <span className="mt-1 text-sm text-muted">{t.jaap.today}</span>
              <span className="mt-4 text-base font-semibold text-ink">{t.jaap.malaCount(malasToday)}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm text-saffron-deep">
                <Flame className="h-4 w-4 fill-saffron text-saffron" />
                {t.jaap.dayStreak(store.streak)}
              </span>
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
              onChange={(event) => setStep(Math.max(1, Number(event.target.value) || 1))}
              className="h-11 w-24 rounded-2xl bg-[#fff4ea] text-center text-lg font-medium text-saffron-deep outline-none"
              aria-label="Jaap increment"
            />
            <button
              type="button"
              onClick={() => setStep((value) => value + 1)}
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
              const filled = index < malaProgress || (malaProgress === 0 && todayCount > 0 && index === 107);
              const active = malaProgress > 0 && index < malaProgress;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => add(1)}
                  className={`h-4 w-4 rounded-full ${
                    active || (todayCount > 0 && filled && malaProgress === 0) ? "bg-saffron" : "bg-sand"
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
          {[
            {
              label: t.jaap.dailyTarget,
              value: `${Math.min(todayCount, 10000).toLocaleString(countLocale)} / 10,000`,
              icon: Hand,
              tone: "bg-[#ffedd5] text-[#c2410c]",
            },
            {
              label: t.jaap.malaToday,
              value: `${malasToday} / 216`,
              icon: CircleDot,
              tone: "bg-[#ffedd5] text-[#ea580c]",
            },
            {
              label: t.jaap.totalJaap,
              value: store.total.toLocaleString(countLocale),
              icon: UserRound,
              tone: "bg-[#dbeafe] text-[#1d4ed8]",
            },
            {
              label: t.jaap.streak,
              value: t.jaap.days(store.streak || 0),
              icon: Mountain,
              tone: "bg-[#ede9fe] text-[#6d28d9]",
            },
          ].map((card) => (
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

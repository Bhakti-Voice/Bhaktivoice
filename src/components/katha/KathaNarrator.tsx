"use client";

import { Headphones, Pause, Play, Square } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useMessages } from "@/lib/i18n/client";
import {
  chunkForSpeech,
  kathaScript,
  narratorLang,
  pickIndianVoice,
} from "@/lib/speech/indian-narrator";

type Props = {
  title: string;
  subtitle?: string;
  introduction?: string;
  language?: string;
  autoStart?: boolean;
  episodes?: { number: number; title: string; summary: string }[];
};

export function KathaNarrator({
  title,
  subtitle,
  introduction,
  language,
  autoStart = false,
  episodes,
}: Props) {
  const t = useMessages();
  const searchParams = useSearchParams();
  const listen = searchParams.get("listen");
  const shouldAutoStart = autoStart || listen === "1" || listen === "true";
  const locale = useLocale();
  const lang = narratorLang(locale, language);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [voiceName, setVoiceName] = useState("");
  const indexRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    indexRef.current = 0;
    setStatus("idle");
    if (typeof window !== "undefined" && window.location.search.includes("listen=")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("listen");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  }, []);

  const speakFrom = useCallback(
    (startAt: number) => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const chunks = chunksRef.current;
      if (!chunks.length) return;

      const speakChunk = (index: number) => {
        if (index >= chunks.length) {
          setStatus("idle");
          indexRef.current = 0;
          return;
        }
        indexRef.current = index;
        const utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.lang = lang;
        utterance.rate = 0.92;
        utterance.pitch = 1;
        utterance.volume = 1;
        if (voiceRef.current) utterance.voice = voiceRef.current;
        utterance.onend = () => {
          if (window.speechSynthesis.paused) return;
          speakChunk(index + 1);
        };
        utterance.onerror = () => {
          setStatus("idle");
        };
        synth.speak(utterance);
      };

      setStatus("playing");
      speakChunk(startAt);
    },
    [lang],
  );

  const start = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const voices = synth.getVoices();
    voiceRef.current = pickIndianVoice(voices, lang);
    setVoiceName(voiceRef.current?.name ?? (lang === "hi-IN" ? "Hindi" : "Indian English"));
    chunksRef.current = chunkForSpeech(
      kathaScript({ title, subtitle, introduction, episodes, lang }),
    );
    if (!chunksRef.current.length) return;
    speakFrom(0);
  }, [episodes, introduction, lang, speakFrom, subtitle, title]);

  const didAuto = useRef(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const voice = pickIndianVoice(synth.getVoices(), lang);
      voiceRef.current = voice;
      if (voice) setVoiceName(voice.name);
    };
    load();
    synth.addEventListener("voiceschanged", load);
    return () => {
      synth.removeEventListener("voiceschanged", load);
      synth.cancel();
    };
  }, [lang]);

  useEffect(() => {
    if (!shouldAutoStart || didAuto.current) return;
    const timer = window.setTimeout(() => {
      if (didAuto.current) return;
      didAuto.current = true;
      start();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [shouldAutoStart, start]);

  function toggle() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (status === "playing") {
      synth.pause();
      setStatus("paused");
      return;
    }
    if (status === "paused") {
      synth.resume();
      setStatus("playing");
      return;
    }
    start();
  }

  const listening = status !== "idle";

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
            listening ? "bg-navy text-white" : "bg-saffron text-white"
          }`}
        >
          {status === "playing" ? <Pause className="h-4 w-4" /> : status === "paused" ? <Play className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
          {status === "playing" ? t.common.pauseListen : status === "paused" ? t.common.resumeListen : t.common.listen}
        </button>
        {listening ? (
          <button
            type="button"
            onClick={stop}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink"
          >
            <Square className="h-3.5 w-3.5" />
            {t.common.stopListen}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted">
        {listening
          ? `${t.common.listening}${voiceName ? ` · ${voiceName}` : ""}`
          : t.common.narratorHint}
      </p>

      {listening ? (
        <div className="fixed inset-x-3 bottom-[4.75rem] z-30 flex items-center justify-between gap-3 rounded-full bg-navy px-4 py-3 text-white shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:w-[min(420px,calc(100vw-2rem))]">
          <span className="flex min-w-0 items-center gap-2">
            <Headphones className="h-4 w-4 shrink-0 text-gold" />
            <span className="truncate text-sm">
              {status === "paused" ? t.common.resumeListen : t.common.listening}
            </span>
          </span>
          <span className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10"
              aria-label={status === "playing" ? t.common.pauseListen : t.common.resumeListen}
            >
              {status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={stop}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10"
              aria-label={t.common.stopListen}
            >
              <Square className="h-3.5 w-3.5" />
            </button>
          </span>
        </div>
      ) : null}
    </div>
  );
}

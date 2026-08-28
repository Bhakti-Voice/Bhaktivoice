"use client";

import { useEffect, useState } from "react";
import { Minimize2, Volume2, VolumeX, Sparkles, Hand, Flame, RotateCcw } from "lucide-react";
import { JaapChakraRing } from "./JaapChakraRing";
import { JAAP_MANTRAS, type JaapMantraSlug } from "./mantras";
import { useLocale } from "@/lib/i18n/client";

interface JaapZenModeProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  mantra: JaapMantraSlug;
  onTap: (x?: number, y?: number) => void;
  voiceOn: boolean;
  onToggleVoice: () => void;
  streak: number;
}

export function JaapZenMode({
  isOpen,
  onClose,
  count,
  mantra,
  onTap,
  voiceOn,
  onToggleVoice,
  streak,
}: JaapZenModeProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [pulse, setPulse] = useState(false);
  const selected = JAAP_MANTRAS.find((m) => m.slug === mantra) ?? JAAP_MANTRAS[0];

  const countLocale = isHi ? "hi-IN" : "en-IN";
  const malaProgress = count % 108;
  const malas = Math.floor(count / 108);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        triggerTap();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerTap = (e?: React.MouseEvent) => {
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
    onTap(e?.clientX, e?.clientY);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-between bg-gradient-to-b from-[#180d09] via-[#241209] to-[#0f0704] text-amber-100 select-none overflow-hidden p-6 sm:p-10 cursor-pointer animate-fade-in"
      onClick={triggerTap}
    >
      {/* Background ambient sacred glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selected.color }}
      />

      {/* Top Bar */}
      <header
        className="relative z-10 w-full max-w-4xl flex items-center justify-between"
        data-jaap-ignore
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="w-3 h-3 rounded-full animate-pulse shadow-md"
            style={{ backgroundColor: selected.color }}
          />
          <span className="text-sm sm:text-base font-serif font-medium text-amber-200 tracking-wide">
            {isHi ? "ध्यान साधना कक्ष (Zen Mode)" : "Zen Meditation Mode"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleVoice}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 backdrop-blur-md transition"
            aria-label="Toggle Voice"
            title="Audio Dhun"
          >
            {voiceOn ? <Volume2 className="w-5 h-5 text-amber-300" /> : <VolumeX className="w-5 h-5 opacity-70" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 backdrop-blur-md text-xs sm:text-sm font-medium transition"
            aria-label="Exit Zen Mode"
          >
            <Minimize2 className="w-4 h-4" />
            <span>{isHi ? "बाहर निकलें (Esc)" : "Exit (Esc)"}</span>
          </button>
        </div>
      </header>

      {/* Main Center Sacred Mandala */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
        {/* Mantra Title & Sacred Devanagari */}
        <div className="mb-8">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 border backdrop-blur-md"
            style={{
              borderColor: `${selected.color}60`,
              backgroundColor: `${selected.color}20`,
              color: selected.color,
            }}
          >
            {selected.label}
          </span>
          <h2 className="font-devanagari text-3xl sm:text-5xl font-bold tracking-wide text-amber-50 drop-shadow-md max-w-2xl px-4 leading-tight">
            {selected.text}
          </h2>
        </div>

        {/* Ring & Count */}
        <div
          className={`relative flex items-center justify-center aspect-square w-72 sm:w-96 transition-transform duration-200 ${
            pulse ? "scale-[1.03]" : "scale-100"
          }`}
        >
          <JaapChakraRing malaProgress={malaProgress} />

          <div className="relative z-10 flex flex-col items-center pointer-events-none">
            <span className="font-serif text-6xl sm:text-8xl font-bold text-white tracking-tight drop-shadow-lg">
              {count.toLocaleString(countLocale)}
            </span>
            <span className="mt-2 text-xs sm:text-sm font-medium tracking-wider text-amber-300/80 uppercase">
              {isHi ? "यह बैठक" : "Current Sitting"}
            </span>

            {/* Mala Progress Badge */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-amber-500/30 backdrop-blur-md text-xs text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? `${malas} माला पूर्ण (${malaProgress}/108)` : `${malas} Mala (${malaProgress}/108)`}</span>
            </div>
          </div>
        </div>

        {/* Tap Prompt */}
        <p className="mt-8 text-xs sm:text-sm text-amber-200/60 font-sans tracking-wide">
          {isHi ? "कहीं भी स्पर्श करें या Space दबाएँ" : "Tap anywhere or press Spacebar to count"}
        </p>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-lg flex items-center justify-between text-xs text-amber-200/70 border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5">
          <Hand className="w-4 h-4 text-amber-400" />
          <span>{isHi ? `मनके: ${malaProgress} / 108` : `Bead: ${malaProgress} / 108`}</span>
        </div>

        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-orange-400">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>{isHi ? `${streak} दिन की श्रृंखला` : `${streak} Day Streak`}</span>
          </div>
        )}
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import {
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Flame,
  HelpCircle,
  Moon,
  Music,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import type { FestivalDetail } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";

export type FestivalDetailViewProps = {
  festival: FestivalDetail;
  isModal?: boolean;
  onClose?: () => void;
};

export function FestivalDetailView({ festival, isModal = false, onClose }: FestivalDetailViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const shareText = isHi
      ? `🪔 ${festival.nameHi} (${festival.name})\n📅 दिनांक: ${festival.dateString2026}\n⭐ मुहूर्त: ${festival.muhuratTiming}\n\n${festival.shortDescriptionHi || festival.shortDescription}\n\nसम्पूर्ण पूजा विधि, व्रत कथा एवं मन्त्र BhaktiVoice.com पर पढ़ें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🪔 ${festival.name} (${festival.nameHi})\n📅 Date: ${festival.dateString2026}\n⭐ Muhurat: ${festival.muhuratTiming}\n\n${festival.shortDescription}\n\nRead complete Puja Vidhi, Vrat Katha & Mantra on BhaktiVoice.com: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      navigator.share({
        title: isHi ? festival.nameHi : festival.name,
        text: shareText,
        url: typeof window !== "undefined" ? window.location.href : "",
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className={`space-y-6 ${isModal ? "p-1" : ""}`}>
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-saffron/30 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-6 shadow-sm">
        {isModal && onClose && (
          <button
            onClick={onClose}
            aria-label={isHi ? "बंद करें" : "Close"}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted shadow-xs transition hover:bg-white hover:text-ink active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-2xs">
            {festival.category.toUpperCase()}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted border border-line">
            {isHi ? festival.tithiNoteHi : `${festival.tithiNote} (${festival.tithiNoteHi})`}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted border border-line">
            {isHi ? "इष्टदेव: " : "Deity: "}<strong className="text-ink">{festival.deity}</strong>
          </span>
        </div>

        <h1 className="mt-3 font-serif text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
          {isHi ? festival.nameHi : festival.name}
          <span className="ml-2.5 text-xl font-normal text-muted font-devanagari">
            ({isHi ? festival.name : festival.nameHi})
          </span>
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {isHi ? festival.shortDescriptionHi : festival.shortDescription}
        </p>

        {/* Action Row */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-2xl bg-saffron px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-saffron-deep active:scale-95 sm:text-sm"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? (isHi ? "लिंक कॉपी हो गया!" : "Copied Link!") : (isHi ? "विवरण शेयर करें" : "Share Festival Details")}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar className="h-4 w-4 text-saffron" />
            <span>2026: <strong>{festival.dateString2026}</strong></span>
            <span>•</span>
            <span>2027: <strong>{festival.dateString2027}</strong></span>
          </div>
        </div>
      </div>

      {/* Auspicious Timings & Muhurat Highlights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Shubh Muhurat Card */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Clock className="h-4 w-4 text-saffron" />
            <span>{festival.muhuratTitle}</span>
          </div>
          <div className="mt-2 font-serif text-lg font-bold text-ink">
            {festival.muhuratTiming}
          </div>
          <p className="mt-1 text-xs text-muted">
            {isHi ? "शुभ कार्य व पूजा हेतु शुभ समय।" : "Auspicious window for performing sacred rituals."}
          </p>
        </div>

        {/* Puja Timing Card */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>{isHi ? "पूजा का समय" : "Puja Timing"}</span>
          </div>
          <div className="mt-2 font-serif text-lg font-bold text-ink">
            {festival.pujaTiming}
          </div>
          <p className="mt-1 text-xs text-muted">
            {isHi ? "पारिवारिक एवं मंदिर पूजा का समय।" : "Ideal duration for family & temple worship."}
          </p>
        </div>

        {/* Vrat / Moonrise Card */}
        {(festival.vratTiming || festival.moonriseTiming) && (
          <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 shadow-2xs sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
              <Moon className="h-4 w-4 text-purple-600" />
              <span>{festival.moonriseTiming ? (isHi ? "चंद्रोदय समय" : "Moonrise Timing") : (isHi ? "व्रत एवं पारण" : "Vrat & Parana")}</span>
            </div>
            <div className="mt-2 font-serif text-lg font-bold text-ink">
              {festival.moonriseTiming || festival.vratTiming}
            </div>
            <p className="mt-1 text-xs text-muted">
              {festival.moonriseTiming
                ? (isHi ? "चंद्र दर्शन और अर्घ्य के बाद व्रत खोलें।" : "Sight the moon before breaking the holy fast.")
                : (isHi ? "पवित्र उपवास और पारण के नियम।" : "Guidelines for observing sacred fast and Parana.")}
            </p>
          </div>
        )}
      </div>

      {/* Significance & Spiritual Importance */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
          <Sparkles className="h-5 w-5 text-saffron" /> {isHi ? "धार्मिक महत्व एवं आध्यात्मिक भाव" : "Spiritual Significance"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {festival.significance}
        </p>
      </div>

      {/* Step-by-Step Puja Vidhi */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
          <Flame className="h-5 w-5 text-saffron" /> {isHi ? "क्रमबद्ध पूजा विधि" : "Step-by-Step Puja Vidhi"}
        </h2>

        <div className="mt-4 space-y-4">
          {festival.pujaVidhi.map((step) => (
            <div key={step.step} className="flex gap-4 rounded-2xl bg-cream/40 p-4 border border-line/60">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-saffron text-sm font-bold text-white shadow-xs">
                {step.step}
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-ink sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sacred Mantra */}
      {festival.mantra && (
        <div className="rounded-3xl border border-saffron/30 bg-gradient-to-br from-cream via-amber-50/40 to-cream p-6 shadow-2xs">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
            <Music className="h-5 w-5 text-saffron" /> {isHi ? "पावन मन्त्र एवं जप" : "Sacred Mantra & Japa"}
          </h2>

          <div className="mt-4 rounded-2xl bg-white p-5 border border-saffron/20 shadow-xs">
            <p className="font-serif text-base font-bold text-saffron-deep sm:text-lg">
              {festival.mantra.sanskrit}
            </p>
            <p className="mt-2 font-sans text-xs italic text-muted sm:text-sm">
              {festival.mantra.transliteration}
            </p>
            <div className="mt-3 border-t border-line/60 pt-3 text-xs leading-relaxed text-ink/80 sm:text-sm">
              <strong>{isHi ? "भावार्थ: " : "Meaning: "}</strong> {festival.mantra.meaning}
            </div>
          </div>
        </div>
      )}

      {/* Vrat Katha */}
      {festival.vratKatha && (
        <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
            <BookOpen className="h-5 w-5 text-saffron" /> {isHi ? "व्रत कथा एवं पौराणिक प्रसंग" : "Vrat Katha & Ancient Legend"}
          </h2>
          <div className="mt-4 rounded-2xl bg-cream/30 p-5 text-sm leading-relaxed text-muted border border-line/60">
            {festival.vratKatha}
          </div>
        </div>
      )}

      {/* Aarti Chants Section */}
      {festival.aarti && (
        <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
              <Music className="h-5 w-5 text-saffron" /> {festival.aarti.title}
            </h2>
            {festival.aarti.href && (
              <LocaleLink
                href={festival.aarti.href}
                className="text-xs font-semibold text-saffron hover:underline"
              >
                {isHi ? "ऑडियो व संपूर्ण लिरिक्स →" : "Listen Audio & Lyrics →"}
              </LocaleLink>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-sand/30 p-5 space-y-1.5 font-serif text-sm text-ink/90">
            {festival.aarti.lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Related BhaktiVoice Content */}
      {festival.relatedBhaktiContent.length > 0 && (
        <div className="rounded-3xl border border-line bg-gradient-to-r from-sand/30 via-white to-sand/30 p-6 shadow-2xs">
          <h2 className="font-serif text-xl font-bold text-ink">
            {isHi ? "संबंधित भक्ति आलेख, मन्त्र व यात्रा गाइड" : "Explore Related BhaktiVoice Guides & Mantras"}
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {festival.relatedBhaktiContent.map((item, idx) => (
              <LocaleLink
                key={idx}
                href={item.href}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-4 transition hover:border-saffron hover:shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">
                    {item.type}
                  </span>
                  <h3 className="mt-1 font-serif text-sm font-bold text-ink group-hover:text-saffron-deep">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-3 text-xs font-semibold text-muted group-hover:text-ink">
                  {isHi ? "गाइड पढ़ें →" : "Read Guide →"}
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {festival.faqs && festival.faqs.length > 0 && (
        <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
            <HelpCircle className="h-5 w-5 text-saffron" /> {isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : "Frequently Asked Questions"}
          </h2>

          <div className="mt-4 divide-y divide-line/60">
            {festival.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left font-serif text-sm font-bold text-ink sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

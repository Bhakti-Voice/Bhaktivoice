"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  Flame,
  Info,
  Moon,
  Music,
  Share2,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ContextualCta } from "@/components/seo/ContextualCta";
import { FaqList } from "@/components/seo/FaqList";
import { CollapsedProse } from "@/components/tithi/CollapsedProse";
import { MoonPhaseIcon } from "@/components/calendar/MoonPhaseIcon";
import type { Faq } from "@/lib/content/types";
import type { TithiPageData, TithiProse, UpcomingTithi } from "@/lib/panchang/tithi-view";
import { PATHS } from "@/lib/seo/paths";

type Copy = {
  panchang: string;
  specialTitle: string;
  timingsTitle: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  tithiStarts: string;
  tithiEnds: string;
  nextTithi: string;
  alignmentsTitle: string;
  masa: string;
  paksha: string;
  nakshatra: string;
  vikramSamvat: string;
  vara: string;
  ritu: string;
  yoga: string;
  karana: string;
  upcomingTitle: string;
  delhiNote: string;
  faqTitle: string;
  jaapTitle: string;
  jaapBody: string;
  jaapLabel: string;
  readMore: string;
  readLess: string;
};

export function TithiPageView({
  data,
  faqs,
  prose,
  copy,
}: {
  data: TithiPageData;
  faqs: Faq[];
  prose: TithiProse;
  copy: Copy;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = `🕉️ ${copy.panchang} — ${data.currentDate}\n\n• ${copy.masa}: ${data.currentMasa} (${data.currentPaksha})\n• Tithi: ${data.currentTithi}\n• ${copy.nakshatra}: ${data.currentNakshatra} (Pada ${data.nakshatraPada})\n• ${copy.sunrise}: ${data.sunriseTime} | ${copy.sunset}: ${data.sunsetTime}\n• ${copy.rahuKaal}: ${data.rahuKaalStart} – ${data.rahuKaalEnd}\n\nExplore complete Daily Panchang & Hindu Calendar on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({
        title: `${data.currentTithi} — ${data.currentDate}`,
        text: `Today's Tithi: ${data.currentTithi}, ${copy.nakshatra}: ${data.currentNakshatra} on BhaktiVoice`,
        url,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  }

  return (
    <article className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-saffron/30 bg-gradient-to-br from-cream via-ivory to-amber-50/50 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-saffron/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.panchang}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted border border-line">
                {data.location}
              </span>
            </div>

            <h1 className="pt-2 font-serif text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
              {data.currentTithi}
            </h1>

            <p className="font-serif text-sm font-medium text-muted sm:text-base">
              {data.currentPaksha} · {data.currentMasa} · {copy.vikramSamvat} {data.currentVikramSamvat}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              title="Copy Tithi Summary"
              className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={handleShare}
              title="Share Today's Tithi"
              className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              <Share2 className="h-4 w-4 text-saffron" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Observances / Festivals on this Tithi */}
        {data.observances.length > 0 && (
          <div className="mt-5 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 to-orange-50/70 p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-950">
              <Sparkles className="h-4 w-4 text-saffron" />
              <span>{copy.specialTitle}:</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {data.observances.map((item, index) => {
                const name = data.specialFestivals[index] ?? item.name;
                return (
                  <LocaleLink
                    key={item.name}
                    href={item.href || PATHS.calendar}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-2xs transition hover:border-saffron hover:bg-saffron hover:text-white"
                  >
                    <span>{name}</span>
                    <Info className="h-3.5 w-3.5 opacity-70" />
                  </LocaleLink>
                );
              })}
            </div>
          </div>
        )}

        {/* Tithi Span & Sun Timings Quick Grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tithi Duration */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{copy.tithiStarts}</span>
              <Clock className="h-3.5 w-3.5 text-saffron" />
            </div>
            <div className="mt-1 font-serif text-sm font-bold text-ink sm:text-base">
              {data.tithiStartAt}
            </div>
            <div className="mt-2 border-t border-line/60 pt-2 text-xs text-muted">
              <span>{copy.tithiEnds}: </span>
              <strong className="text-ink">{data.tithiEndAt}</strong>
            </div>
          </div>

          {/* Next Tithi */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{copy.nextTithi}</span>
              <ChevronRight className="h-3.5 w-3.5 text-saffron" />
            </div>
            <div className="mt-1 font-serif text-sm font-bold text-ink sm:text-base">
              {data.nextTithi}
            </div>
            <div className="mt-2 border-t border-line/60 pt-2 text-xs text-muted">
              <span>Starts at: </span>
              <strong className="text-ink">{data.nextTithiEndAt}</strong>
            </div>
          </div>

          {/* Sunrise / Sunset & Rahu Kaal */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-amber-700">
                <Sunrise className="h-3.5 w-3.5 text-amber-500" /> {copy.sunrise}: <strong>{data.sunriseTime}</strong>
              </span>
              <span className="flex items-center gap-1 text-orange-700">
                <Sunset className="h-3.5 w-3.5 text-orange-500" /> {copy.sunset}: <strong>{data.sunsetTime}</strong>
              </span>
            </div>
            <div className="mt-2 border-t border-line/60 pt-2 text-xs text-rose-800">
              <span>{copy.rahuKaal}: </span>
              <strong className="font-serif font-bold text-rose-950">{data.rahuKaalStart} – {data.rahuKaalEnd}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Vedic Panchang Alignments 8 Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink sm:text-2xl">
            <Compass className="h-5 w-5 text-saffron" /> {copy.alignmentsTitle}
          </h2>
          <p className="text-xs text-muted">{data.location}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Vikram Samvat */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.vikramSamvat}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.currentVikramSamvat}</div>
            <div className="text-xs text-muted">Vedic Lunar Year</div>
          </div>

          {/* Masa */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.masa}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.currentMasa}</div>
            <div className="text-xs text-muted">Amanta: {data.masaAmanta}</div>
          </div>

          {/* Paksha */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.paksha}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.currentPaksha}</div>
            <div className="text-xs text-muted">Fortnight phase</div>
          </div>

          {/* Vara (Weekday) */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.vara}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.weekday}</div>
            <div className="text-xs text-muted">Ritu: {data.ritu}</div>
          </div>

          {/* Nakshatra */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.nakshatra}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.currentNakshatra}</div>
            <div className="text-xs text-muted">Pada {data.nakshatraPada}</div>
          </div>

          {/* Yoga */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.yoga}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.yoga}</div>
            <div className="text-xs text-muted">Soli-Lunar Angle</div>
          </div>

          {/* Karana */}
          <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{copy.karana}</span>
            <div className="mt-1 font-serif text-lg font-bold text-ink">{data.karana}</div>
            <div className="text-xs text-muted">Half Lunar Tithi</div>
          </div>

          {/* Full Calendar Link */}
          <Link
            href={PATHS.calendar}
            className="group flex flex-col justify-between rounded-2xl border border-saffron/40 bg-gradient-to-br from-amber-50 to-orange-50 p-4 transition hover:border-saffron hover:shadow-xs"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-deep">Explore</span>
              <div className="mt-1 font-serif text-base font-bold text-ink group-hover:text-saffron-deep">
                Hindu Calendar 2026
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-saffron pt-2">
              <span>View Full Month</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Upcoming 7 Days Tithis Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink sm:text-2xl">
            <Calendar className="h-5 w-5 text-saffron" /> {copy.upcomingTitle}
          </h2>
          <Link href={PATHS.calendar} className="text-xs font-semibold text-saffron hover:underline">
            View 2026 Calendar →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.upcomingTithis.map((day, idx) => (
            <div
              key={`${day.date}-${day.tithi}-${idx}`}
              className="rounded-2xl border border-line bg-white p-4 shadow-2xs transition hover:border-saffron"
            >
              <div className="text-xs text-muted">
                {day.day} · {day.date}
              </div>
              <div className="mt-1 font-serif text-base font-bold text-ink">
                {day.tithi}
              </div>
              {day.festival && (
                <div className="mt-2 inline-block rounded-md bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-950">
                  {day.festival}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Daily Sadhana CTA Banner */}
      <div className="mt-8">
        <ContextualCta title={copy.jaapTitle} body={copy.jaapBody} href={PATHS.naamJaap} label={copy.jaapLabel} />
      </div>

      {/* Editorial Explanatory Spiritual Prose */}
      <CollapsedProse
        paragraphs={[
          prose.welcome,
          prose.observances,
          prose.tithiTiming,
          prose.sun,
          prose.alignments,
          prose.upcoming,
          prose.close,
        ]}
        readMore={copy.readMore}
        readLess={copy.readLess}
      />

      {/* FAQs Section */}
      <FaqList faqs={faqs} title={copy.faqTitle} className="mt-8" jsonLd={false} />
    </article>
  );
}

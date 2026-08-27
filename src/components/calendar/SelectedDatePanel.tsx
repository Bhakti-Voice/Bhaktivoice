"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Flame,
  Info,
  Moon,
  Share2,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import type { DayPanchang, Observance } from "@/lib/panchang/types";
import { MoonPhaseIcon } from "./MoonPhaseIcon";
import { useLocale } from "@/lib/i18n/client";

export type SelectedDatePanelProps = {
  panchang: DayPanchang;
  onOpenFestivalModal: (slugOrName: string) => void;
  onSharePanchang: () => void;
  onAddReminder: () => void;
};

export function SelectedDatePanel({
  panchang,
  onOpenFestivalModal,
  onSharePanchang,
  onAddReminder,
}: SelectedDatePanelProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [showChoghadiya, setShowChoghadiya] = useState(false);
  const [choghadiyaTab, setChoghadiyaTab] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);

  function formatTime(d: Date | null): string {
    if (!d) return "--:--";
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      timeZone: panchang.city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  }

  function handleCopySummary() {
    const text = isHi
      ? `🕉️ हिन्दू पंचांग (${panchang.gregorianLabelHi})\n📍 स्थान: ${panchang.city.nameHi}\n\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\n\nसम्पूर्ण वैदिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ Hindu Panchang (${panchang.gregorianLabel})\n📍 City: ${panchang.city.name}\n\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\n\nExplore complete Vedic Calendar on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="sticky top-20 flex flex-col gap-5 rounded-3xl border border-line bg-gradient-to-b from-cream/90 via-ivory to-cream/70 p-5 shadow-xs lg:p-6">
      {/* Header: Gregorian & Hindu Date */}
      <div className="border-b border-line/80 pb-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron-deep">
            {isHi ? `${panchang.city.nameHi}, ${panchang.city.stateHi}` : `${panchang.city.name}, ${panchang.city.state}`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              title={isHi ? "पंचांग का विवरण कॉपी करें" : "Copy Panchang Summary"}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-line bg-white text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={onSharePanchang}
              title={isHi ? "पंचांग शेयर करें" : "Share Panchang"}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-line bg-white text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={onAddReminder}
              title={isHi ? "कैलेंडर में जोड़ें" : "Add Reminder to Calendar"}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-line bg-white text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              <Bell className="h-4 w-4 text-saffron" />
            </button>
          </div>
        </div>

        <h2 className="mt-3 font-serif text-xl font-bold text-ink sm:text-2xl">
          {isHi ? panchang.gregorianLabelHi : panchang.gregorianLabel}
        </h2>
        <p className="font-serif text-xs font-medium text-muted sm:text-sm">
          {isHi ? panchang.weekdayNameHi : panchang.weekdayName}
        </p>

        {/* Hindu Samvat & Month Banner */}
        <div className="mt-3 rounded-2xl bg-white/90 p-3 shadow-2xs border border-saffron/15">
          <div className="flex flex-wrap items-center justify-between gap-y-1 text-xs">
            <div>
              <span className="text-muted">{isHi ? "मास (पूर्णिमान्त): " : "Masa (Purnimanta): "}</span>
              <strong className="text-ink">
                {isHi ? panchang.masaPurnimanta.nameHi : `${panchang.masaPurnimanta.name} (${panchang.masaPurnimanta.nameHi})`}
              </strong>
            </div>
            <div>
              <span className="text-muted">{isHi ? "विक्रम संवत: " : "Vikram Samvat: "}</span>
              <strong className="text-ink">{panchang.vikramSamvat}</strong>
            </div>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-y-1 text-[11px] text-muted">
            <span>{isHi ? "शक संवत: " : "Shaka Samvat: "}<strong className="text-ink font-medium">{panchang.shakaSamvat}</strong></span>
            <span>{isHi ? "ऋतु: " : "Ritu: "}<strong className="text-ink font-medium">{isHi ? panchang.ritu.nameHi : panchang.ritu.name}</strong></span>
            <span>{isHi ? "अयन: " : "Ayana: "}<strong className="text-ink font-medium">{isHi ? panchang.ayana.nameHi : panchang.ayana.name}</strong></span>
          </div>
        </div>
      </div>

      {/* Festivals & Observances Today */}
      {panchang.observances.length > 0 && (
        <div className="rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-50 to-orange-50/70 p-3.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span>{isHi ? "आज के प्रमुख व्रत एवं त्यौहार" : "Festivals & Vrats on this Date"}</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {panchang.observances.map((obs, idx) => (
              <button
                key={`${obs.name}-${idx}`}
                onClick={() => onOpenFestivalModal(obs.slug || obs.name)}
                className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs transition hover:border-saffron hover:bg-saffron hover:text-white"
              >
                <span>{isHi ? (obs.nameHi || obs.name) : obs.name}</span>
                <Info className="h-3.5 w-3.5 opacity-70" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vedic Panchang 4 Pillars (Tithi, Nakshatra, Yoga, Karana) */}
      <div>
        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-ink">
          <Clock className="h-4 w-4 text-saffron" /> {isHi ? "वैदिक पंचांग के मुख्य अंग" : "Vedic Panchang Core"}
        </h3>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {/* Tithi */}
          <div className="rounded-2xl border border-line bg-white/90 p-3 shadow-2xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">{isHi ? "तिथि" : "Tithi"}</div>
            <div className="mt-0.5 font-serif text-sm font-bold text-ink">
              {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
            </div>
            <div className="text-[11px] text-muted">
              {isHi
                ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष")
                : (panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla Paksha" : "Krishna Paksha")}
            </div>
            <div className="mt-1 text-[10px] text-muted/80">
              {isHi ? `समाप्त: ${formatTime(panchang.tithiAtSunrise.end)}` : `Ends at ${formatTime(panchang.tithiAtSunrise.end)}`}
            </div>
          </div>

          {/* Nakshatra */}
          <div className="rounded-2xl border border-line bg-white/90 p-3 shadow-2xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">{isHi ? "नक्षत्र" : "Nakshatra"}</div>
            <div className="mt-0.5 font-serif text-sm font-bold text-ink">
              {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
            </div>
            <div className="text-[11px] text-muted">
              {isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`} • {panchang.nakshatra.deity}
            </div>
            <div className="mt-1 text-[10px] text-muted/80">
              {isHi ? `तक: ${formatTime(panchang.nakshatra.end)}` : `Till ${formatTime(panchang.nakshatra.end)}`}
            </div>
          </div>

          {/* Yoga */}
          <div className="rounded-2xl border border-line bg-white/90 p-3 shadow-2xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">{isHi ? "योग" : "Yoga"}</div>
            <div className="mt-0.5 font-serif text-sm font-bold text-ink">
              {isHi ? panchang.yoga.nameHi : panchang.yoga.name}
            </div>
            <div className="text-[11px] text-muted">{isHi ? panchang.yoga.name : panchang.yoga.nameHi}</div>
            <div className="mt-1 text-[10px] text-muted/80">
              {isHi ? `तक: ${formatTime(panchang.yoga.end)}` : `Till ${formatTime(panchang.yoga.end)}`}
            </div>
          </div>

          {/* Karana */}
          <div className="rounded-2xl border border-line bg-white/90 p-3 shadow-2xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">{isHi ? "करण" : "Karana"}</div>
            <div className="mt-0.5 font-serif text-sm font-bold text-ink">
              {isHi ? panchang.karana.nameHi : panchang.karana.name}
            </div>
            <div className="text-[11px] text-muted">{isHi ? panchang.karana.name : panchang.karana.nameHi}</div>
            <div className="mt-1 text-[10px] text-muted/80">
              {isHi ? `तक: ${formatTime(panchang.karana.end)}` : `Till ${formatTime(panchang.karana.end)}`}
            </div>
          </div>
        </div>
      </div>

      {/* Sun & Moon Timings */}
      <div>
        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-ink">
          <Sun className="h-4 w-4 text-saffron" /> {isHi ? "सूर्य एवं चंद्र चक्र" : "Sun & Moon Cycle"}
        </h3>

        <div className="mt-2.5 rounded-2xl border border-line bg-white/90 p-3.5 shadow-2xs">
          <div className="grid grid-cols-2 gap-3 divide-x divide-line/60">
            {/* Sun Column */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sunrise className="h-4 w-4 text-amber-500" />
                <div>
                  <div className="text-[10px] text-muted uppercase">{isHi ? "सूर्योदय" : "Sunrise"}</div>
                  <div className="font-serif text-xs font-bold text-ink">{formatTime(panchang.sunrise)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="text-[10px] text-muted uppercase">{isHi ? "सूर्यास्त" : "Sunset"}</div>
                  <div className="font-serif text-xs font-bold text-ink">{formatTime(panchang.sunset)}</div>
                </div>
              </div>
              <div className="text-[10px] text-muted">
                {isHi ? "दिनमान: " : "Day Duration: "}<strong className="text-ink">{panchang.dayDuration}</strong>
              </div>
              <div className="text-[10px] text-muted">
                {isHi ? "सूर्य राशि: " : "Sun Sign: "}<strong className="text-ink">{isHi ? panchang.sunSignHi : panchang.sunSign}</strong>
              </div>
            </div>

            {/* Moon Column */}
            <div className="space-y-2 pl-3">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-indigo-400" />
                <div>
                  <div className="text-[10px] text-muted uppercase">{isHi ? "चंद्रोदय" : "Moonrise"}</div>
                  <div className="font-serif text-xs font-bold text-ink">{formatTime(panchang.moon.moonrise)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-slate-400" />
                <div>
                  <div className="text-[10px] text-muted uppercase">{isHi ? "चंद्रास्त" : "Moonset"}</div>
                  <div className="font-serif text-xs font-bold text-ink">{formatTime(panchang.moon.moonset)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                <MoonPhaseIcon phase={panchang.moon.illumination > 90 ? "full" : "waxing-crescent"} className="h-3 w-3" />
                <span>{isHi ? "चंद्र कला: " : "Phase: "}<strong className="text-ink">{isHi ? panchang.moon.phaseNameHi : panchang.moon.phaseName} ({panchang.moon.illumination}%)</strong></span>
              </div>
              <div className="text-[10px] text-muted">
                {isHi ? "चंद्र राशि: " : "Moon Sign: "}<strong className="text-ink">{isHi ? panchang.moon.signHi : panchang.moon.sign}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shubh Muhurats (Auspicious) */}
      <div>
        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-emerald-800">
          <Sparkles className="h-4 w-4 text-emerald-600" /> {isHi ? "शुभ मुहूर्त" : "Shubh Muhurat (Auspicious)"}
        </h3>

        <div className="mt-2 space-y-1.5">
          {/* Brahma Muhurat */}
          <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs border border-emerald-200/60">
            <div>
              <span className="font-semibold text-emerald-950">{isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}</span>
              <p className="text-[10px] text-emerald-700">{isHi ? "ध्यान एवं साधना हेतु" : "Ideal for Meditation & Jaap"}</p>
            </div>
            <strong className="font-serif text-ink">
              {formatTime(panchang.brahmaMuhurat.start)} - {formatTime(panchang.brahmaMuhurat.end)}
            </strong>
          </div>

          {/* Abhijit Muhurat */}
          {panchang.abhijitMuhurat && (
            <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs border border-emerald-200/60">
              <div>
                <span className="font-semibold text-emerald-950">{isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}</span>
                <p className="text-[10px] text-emerald-700">{isHi ? "शुभ कार्यों एवं यात्रा हेतु" : "Best for New Ventures & Travel"}</p>
              </div>
              <strong className="font-serif text-ink">
                {formatTime(panchang.abhijitMuhurat.start)} - {formatTime(panchang.abhijitMuhurat.end)}
              </strong>
            </div>
          )}

          {/* Amrit Kaal */}
          {panchang.amritKaal && (
            <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs border border-emerald-200/60">
              <div>
                <span className="font-semibold text-emerald-950">{isHi ? "अमृत काल" : "Amrit Kaal"}</span>
                <p className="text-[10px] text-emerald-700">{isHi ? "पूजा-अनुष्ठान हेतु" : "Nectar period for rituals"}</p>
              </div>
              <strong className="font-serif text-ink">
                {formatTime(panchang.amritKaal.start)} - {formatTime(panchang.amritKaal.end)}
              </strong>
            </div>
          )}

          {/* Vijaya & Godhuli */}
          <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs border border-emerald-200/60">
            <div>
              <span className="font-semibold text-emerald-950">{isHi ? "विजय मुहूर्त" : "Vijaya Muhurat"}</span>
            </div>
            <strong className="font-serif text-ink">
              {formatTime(panchang.vijayaMuhurat.start)} - {formatTime(panchang.vijayaMuhurat.end)}
            </strong>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs border border-emerald-200/60">
            <div>
              <span className="font-semibold text-emerald-950">{isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}</span>
            </div>
            <strong className="font-serif text-ink">
              {formatTime(panchang.godhuliMuhurat.start)} - {formatTime(panchang.godhuliMuhurat.end)}
            </strong>
          </div>
        </div>
      </div>

      {/* Ashubh Muhurat (Inauspicious) */}
      <div>
        <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-rose-800">
          <Flame className="h-4 w-4 text-rose-600" /> {isHi ? "अशुभ काल" : "Ashubh Kaal (Inauspicious)"}
        </h3>

        <div className="mt-2 space-y-1.5">
          {/* Rahu Kaal */}
          <div className="flex items-center justify-between rounded-xl bg-rose-50/70 px-3 py-2 text-xs border border-rose-200/60">
            <div>
              <span className="font-semibold text-rose-950">{isHi ? "राहु काल" : "Rahu Kaal"}</span>
              <p className="text-[10px] text-rose-700">{isHi ? "नए कार्य आरम्भ न करें" : "Avoid starting new tasks"}</p>
            </div>
            <strong className="font-serif text-rose-900">
              {formatTime(panchang.rahuKaal.start)} - {formatTime(panchang.rahuKaal.end)}
            </strong>
          </div>

          {/* Yamaganda */}
          <div className="flex items-center justify-between rounded-xl bg-rose-50/70 px-3 py-2 text-xs border border-rose-200/60">
            <div>
              <span className="font-semibold text-rose-950">{isHi ? "यमगण्ड काल" : "Yamaganda"}</span>
            </div>
            <strong className="font-serif text-rose-900">
              {formatTime(panchang.yamaganda.start)} - {formatTime(panchang.yamaganda.end)}
            </strong>
          </div>

          {/* Gulika Kaal */}
          <div className="flex items-center justify-between rounded-xl bg-rose-50/70 px-3 py-2 text-xs border border-rose-200/60">
            <div>
              <span className="font-semibold text-rose-950">{isHi ? "गुलिक काल" : "Gulika Kaal"}</span>
            </div>
            <strong className="font-serif text-rose-900">
              {formatTime(panchang.gulikaKaal.start)} - {formatTime(panchang.gulikaKaal.end)}
            </strong>
          </div>

          {/* Dur Muhurat */}
          {panchang.durMuhurat.map((dm, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl bg-rose-50/70 px-3 py-2 text-xs border border-rose-200/60">
              <div>
                <span className="font-semibold text-rose-950">{isHi ? `दुर्मुहूर्त ${idx + 1}` : `Dur Muhurat ${idx + 1}`}</span>
              </div>
              <strong className="font-serif text-rose-900">
                {formatTime(dm.start)} - {formatTime(dm.end)}
              </strong>
            </div>
          ))}

          {/* Varjyam */}
          {panchang.varjyam && (
            <div className="flex items-center justify-between rounded-xl bg-rose-50/70 px-3 py-2 text-xs border border-rose-200/60">
              <div>
                <span className="font-semibold text-rose-950">{isHi ? "वर्ज्यम्" : "Varjyam"}</span>
              </div>
              <strong className="font-serif text-rose-900">
                {formatTime(panchang.varjyam.start)} - {formatTime(panchang.varjyam.end)}
              </strong>
            </div>
          )}
        </div>
      </div>

      {/* Choghadiya Expandable Drawer */}
      <div className="border-t border-line/80 pt-3">
        <button
          onClick={() => setShowChoghadiya(!showChoghadiya)}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-3 text-left font-serif text-xs font-bold text-ink shadow-2xs border border-line hover:border-saffron"
        >
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-saffron" /> {isHi ? "दिन एवं रात का चौघड़िया देखें" : "View Day & Night Choghadiya"}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showChoghadiya ? "rotate-180" : ""}`} />
        </button>

        {showChoghadiya && (
          <div className="mt-3 space-y-2 rounded-2xl bg-white p-3 border border-line">
            {/* Tabs */}
            <div className="flex rounded-xl bg-sand p-1 text-xs">
              <button
                onClick={() => setChoghadiyaTab("day")}
                className={`flex-1 rounded-lg py-1.5 font-medium transition ${
                  choghadiyaTab === "day" ? "bg-white shadow-xs text-ink" : "text-muted"
                }`}
              >
                {isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
              </button>
              <button
                onClick={() => setChoghadiyaTab("night")}
                className={`flex-1 rounded-lg py-1.5 font-medium transition ${
                  choghadiyaTab === "night" ? "bg-white shadow-xs text-ink" : "text-muted"
                }`}
              >
                {isHi ? "रात का चौघड़िया" : "Night Choghadiya"}
              </button>
            </div>

            {/* Choghadiya List */}
            <div className="divide-y divide-line/60">
              {(choghadiyaTab === "day" ? panchang.dayChoghadiya : panchang.nightChoghadiya).map((ch, idx) => {
                const isGood = ch.nature === "shubh";
                const isBad = ch.nature === "ashubh";
                return (
                  <div key={idx} className="flex items-center justify-between py-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          isGood ? "bg-emerald-500" : isBad ? "bg-rose-500" : "bg-amber-500"
                        }`}
                      />
                      <span className="font-semibold text-ink">
                        {isHi ? ch.nameHi : `${ch.name} (${ch.nameHi})`}
                      </span>
                      <span className="text-[10px] text-muted">[{ch.ruler}]</span>
                    </div>
                    <span className="font-serif text-[11px] text-muted">
                      {formatTime(ch.start)} - {formatTime(ch.end)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Daily Spiritual Thought */}
      {panchang.dailyMantra && (
        <div className="rounded-2xl border border-saffron/20 bg-gradient-to-r from-orange-50/80 to-amber-50/80 p-3.5 text-xs shadow-2xs">
          <div className="font-semibold text-saffron-deep">
            {isHi ? `आज का पावन मन्त्र (${panchang.dailyMantra.deity})` : `Mantra of the Day (${panchang.dailyMantra.deity})`}
          </div>
          <p className="mt-1 font-serif text-xs italic text-ink">{panchang.dailyMantra.sanskrit}</p>
          <p className="mt-1 text-[11px] text-muted">{panchang.dailyMantra.benefit}</p>
        </div>
      )}
    </div>
  );
}

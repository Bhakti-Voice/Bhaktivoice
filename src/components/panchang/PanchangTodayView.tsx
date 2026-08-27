"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Flame,
  Info,
  MapPin,
  Moon,
  Music,
  Share2,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { CITIES, DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { getPanchang } from "@/lib/panchang/engine";
import { MoonPhaseIcon } from "@/components/calendar/MoonPhaseIcon";
import type { DayPanchang } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export type PanchangTodayViewProps = {
  initialDate?: string; // YYYY-MM-DD
  initialCityId?: string;
  pageMode?: "today" | "tomorrow" | "yesterday" | "custom";
};

export function PanchangTodayView({
  initialDate,
  initialCityId,
  pageMode = "today",
}: PanchangTodayViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [city, setCity] = useState<CityConfig>(getCityById(initialCityId));
  const [choghadiyaTab, setChoghadiyaTab] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);

  // Compute base date
  const targetDate = useMemo(() => {
    if (initialDate) {
      const [y, m, d] = initialDate.split("-").map(Number);
      return new Date(y, m - 1, d, 12, 0, 0);
    }
    const now = new Date();
    if (pageMode === "tomorrow") {
      return new Date(now.getTime() + 24 * 3600_000);
    }
    if (pageMode === "yesterday") {
      return new Date(now.getTime() - 24 * 3600_000);
    }
    return now;
  }, [initialDate, pageMode]);

  const panchang: DayPanchang = useMemo(() => {
    return getPanchang(targetDate, city);
  }, [targetDate, city]);

  function formatTime(d: Date | null): string {
    if (!d) return "--:--";
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  }

  function handleCopy() {
    const text = isHi
      ? `🕉️ ${panchang.gregorianLabelHi} — आज का पंचांग\n📍 स्थान: ${city.nameHi}\n\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• अभिजित: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\n\nसम्पूर्ण दैनिक पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ ${panchang.gregorianLabel} — Aaj Ka Panchang\n📍 City: ${city.name}\n\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• Abhijit: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\n\nExplore complete Daily Panchang on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header Card with Day Switcher & City Selector */}
      <div className="rounded-3xl border border-saffron/20 bg-gradient-to-r from-cream via-ivory to-cream p-5 shadow-xs sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/80 pb-6">
          {/* Day Navigation Tabs */}
          <div className="flex items-center gap-2">
            <LocaleLink
              href={PATHS.panchangYesterday}
              className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${
                pageMode === "yesterday"
                  ? "bg-navy text-white shadow-xs"
                  : "border border-line bg-white text-muted hover:border-saffron hover:text-ink"
              }`}
            >
              {isHi ? "कल (बीता हुआ)" : "Yesterday"}
            </LocaleLink>
            <LocaleLink
              href={PATHS.panchangToday}
              className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${
                pageMode === "today"
                  ? "bg-saffron text-white shadow-xs"
                  : "border border-line bg-white text-muted hover:border-saffron hover:text-ink"
              }`}
            >
              {isHi ? "आज" : "Today"}
            </LocaleLink>
            <LocaleLink
              href={PATHS.panchangTomorrow}
              className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${
                pageMode === "tomorrow"
                  ? "bg-navy text-white shadow-xs"
                  : "border border-line bg-white text-muted hover:border-saffron hover:text-ink"
              }`}
            >
              {isHi ? "कल (आने वाला)" : "Tomorrow"}
            </LocaleLink>
          </div>

          {/* City Selector & Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative flex items-center">
              <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-saffron" />
              <select
                value={city.id}
                onChange={(e) => {
                  const c = CITIES.find((item) => item.id === e.target.value) || CITIES[0];
                  setCity(c);
                }}
                className="rounded-2xl border border-line bg-white py-2 pl-9 pr-8 text-xs font-medium text-ink shadow-xs focus:border-saffron focus:outline-hidden sm:text-sm"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isHi ? `${c.nameHi} (${c.name})` : `${c.name} (${c.nameHi})`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-medium text-muted hover:border-saffron hover:text-ink active:scale-95 shadow-2xs"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "कॉपी" : "Copy")}</span>
            </button>

            <LocaleLink
              href={PATHS.calendar}
              className="flex items-center gap-1.5 rounded-2xl border border-saffron/40 bg-saffron/10 px-3.5 py-2 text-xs font-semibold text-saffron-deep hover:bg-saffron hover:text-white active:scale-95 shadow-2xs"
            >
              <Calendar className="h-4 w-4" />
              <span>{isHi ? "कैलेंडर देखें" : "View Calendar"}</span>
            </LocaleLink>
          </div>
        </div>

        {/* Date Details */}
        <div className="pt-6">
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
            {isHi ? panchang.gregorianLabelHi : panchang.gregorianLabel}
          </h1>
          <p className="mt-1 font-serif text-sm font-medium text-muted sm:text-base">
            {isHi ? panchang.weekdayNameHi : panchang.weekdayName} • {isHi ? panchang.city.nameHi : panchang.city.name}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-white px-3 py-1 font-medium text-muted border border-line">
              {isHi ? "मास: " : "Masa: "}<strong className="text-ink">{isHi ? panchang.masaPurnimanta.nameHi : panchang.masaPurnimanta.name}</strong>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-medium text-muted border border-line">
              {isHi ? "पक्ष: " : "Paksha: "}<strong className="text-ink">{isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : (panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna")}</strong>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-medium text-muted border border-line">
              {isHi ? "संवत: " : "Samvat: "}<strong className="text-ink">{panchang.vikramSamvat}</strong>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-medium text-muted border border-line">
              {isHi ? "ऋतु: " : "Ritu: "}<strong className="text-ink">{isHi ? panchang.ritu.nameHi : panchang.ritu.name}</strong>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-medium text-muted border border-line">
              {isHi ? "अयन: " : "Ayana: "}<strong className="text-ink">{isHi ? panchang.ayana.nameHi : panchang.ayana.name}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Observances & Festivals on this date */}
      {panchang.observances.length > 0 && (
        <div className="rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span>{isHi ? "आज के प्रमुख पर्व एवं व्रत:" : "Today's Festivals & Observances:"}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {panchang.observances.map((obs, idx) => (
              <LocaleLink
                key={idx}
                href={obs.href || `${PATHS.calendar}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-bold text-ink shadow-2xs transition hover:border-saffron hover:bg-saffron hover:text-white"
              >
                <span>{isHi ? (obs.nameHi || obs.name) : obs.name}</span>
                <Info className="h-3.5 w-3.5 opacity-70" />
              </LocaleLink>
            ))}
          </div>
        </div>
      )}

      {/* The 5 Vedic Limbs (Pancha-Anga) */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink sm:text-2xl">
          <Clock className="h-5 w-5 text-saffron" /> {isHi ? "पंचांग के पांच मुख्य अंग" : "The 5 Vedic Limbs (Pancha-Anga)"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tithi */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{isHi ? "1. तिथि" : "1. Tithi"}</span>
              <span className="rounded-full bg-saffron/10 px-2.5 py-0.5 text-[11px] font-semibold text-saffron-deep">
                {isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : (panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna")}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi ? `समाप्त: ${formatTime(panchang.tithiAtSunrise.end)} तक` : `Ends at: ${formatTime(panchang.tithiAtSunrise.end)}`}
            </p>
            <div className="mt-3 border-t border-line/60 pt-2 text-xs text-muted">
              {isHi ? "अगली तिथि: " : "Next: "}<strong className="text-ink">{isHi ? panchang.nextTithi.nameHi : panchang.nextTithi.name}</strong>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{isHi ? "2. नक्षत्र" : "2. Nakshatra"}</span>
              <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                {isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi ? `समाप्त: ${formatTime(panchang.nakshatra.end)} तक` : `Ends at: ${formatTime(panchang.nakshatra.end)}`}
            </p>
            <div className="mt-3 border-t border-line/60 pt-2 text-xs text-muted">
              {isHi ? "नक्षत्र स्वामी देवता: " : "Ruling Deity: "}<strong className="text-ink">{panchang.nakshatra.deity}</strong>
            </div>
          </div>

          {/* Yoga */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">{isHi ? "3. योग" : "3. Yoga"}</span>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.yoga.nameHi : panchang.yoga.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi ? `समाप्त: ${formatTime(panchang.yoga.end)} तक` : `Ends at: ${formatTime(panchang.yoga.end)}`}
            </p>
            <div className="mt-3 border-t border-line/60 pt-2 text-xs text-muted">
              {isHi ? "योग का स्वरूप: " : "Soli-Lunar Angle: "}
              <strong className="text-ink">{isHi ? panchang.yoga.name : panchang.yoga.nameHi}</strong>
            </div>
          </div>

          {/* Karana */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">{isHi ? "4. करण" : "4. Karana"}</span>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.karana.nameHi : panchang.karana.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi ? `समाप्त: ${formatTime(panchang.karana.end)} तक` : `Ends at: ${formatTime(panchang.karana.end)}`}
            </p>
            <div className="mt-3 border-t border-line/60 pt-2 text-xs text-muted">
              {isHi ? "अर्ध तिथि का स्वरूप: " : "Half-Tithi: "}
              <strong className="text-ink">{isHi ? panchang.karana.name : panchang.karana.nameHi}</strong>
            </div>
          </div>

          {/* Vara (Weekday) */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">{isHi ? "5. वार" : "5. Vara (Weekday)"}</span>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.weekdayNameHi : panchang.weekdayName}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi ? "दिन के स्वामी ग्रह: " : "Ruling Planet: "}
              <strong className="text-ink">
                {panchang.weekday === 0
                  ? (isHi ? "सूर्य देव" : "Sun")
                  : panchang.weekday === 1
                  ? (isHi ? "चंद्र देव" : "Moon")
                  : panchang.weekday === 2
                  ? (isHi ? "मंगल देव" : "Mars")
                  : panchang.weekday === 3
                  ? (isHi ? "बुध देव" : "Mercury")
                  : panchang.weekday === 4
                  ? (isHi ? "बृहस्पति देव (गुरु)" : "Jupiter")
                  : panchang.weekday === 5
                  ? (isHi ? "शुक्र देव" : "Venus")
                  : (isHi ? "शनि देव" : "Saturn")}
              </strong>
            </p>
            <div className="mt-3 border-t border-line/60 pt-2 text-xs text-muted">
              {isHi ? "दिनमान: " : "Day Length: "}<strong className="text-ink">{panchang.dayDuration}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Sun & Moon Cycle Card */}
      <section className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
          <Sun className="h-5 w-5 text-saffron" /> {isHi ? "सूर्य एवं चंद्र खगोलीय स्थिति" : "Sun & Moon Celestial Cycle"}
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60">
            <div className="flex items-center gap-2 text-amber-900 text-xs font-semibold uppercase">
              <Sunrise className="h-4 w-4 text-amber-500" /> {isHi ? "सूर्योदय" : "Sunrise"}
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-ink">{formatTime(panchang.sunrise)}</div>
            <div className="text-xs text-muted mt-1">{isHi ? "सूर्य राशि: " : "Sun Sign: "}{isHi ? panchang.sunSignHi : panchang.sunSign}</div>
          </div>

          <div className="rounded-2xl bg-orange-50/60 p-4 border border-orange-200/60">
            <div className="flex items-center gap-2 text-orange-900 text-xs font-semibold uppercase">
              <Sunset className="h-4 w-4 text-orange-500" /> {isHi ? "सूर्यास्त" : "Sunset"}
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-ink">{formatTime(panchang.sunset)}</div>
            <div className="text-xs text-muted mt-1">{isHi ? "दिनमान: " : "Day: "}{panchang.dayDuration}</div>
          </div>

          <div className="rounded-2xl bg-indigo-50/60 p-4 border border-indigo-200/60">
            <div className="flex items-center gap-2 text-indigo-900 text-xs font-semibold uppercase">
              <Moon className="h-4 w-4 text-indigo-500" /> {isHi ? "चंद्रोदय" : "Moonrise"}
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-ink">{formatTime(panchang.moon.moonrise)}</div>
            <div className="text-xs text-muted mt-1">{isHi ? "चंद्र राशि: " : "Moon Sign: "}{isHi ? panchang.moon.signHi : panchang.moon.sign}</div>
          </div>

          <div className="rounded-2xl bg-slate-50/60 p-4 border border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-semibold uppercase">
              <Moon className="h-4 w-4 text-slate-500" /> {isHi ? "चंद्रास्त" : "Moonset"}
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-ink">{formatTime(panchang.moon.moonset)}</div>
            <div className="text-xs text-muted mt-1">{isHi ? "चंद्र कला: " : "Illumination: "}{panchang.moon.illumination}%</div>
          </div>
        </div>
      </section>

      {/* Shubh & Ashubh Muhurats 2-Column Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Shubh Muhurats */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-2xs space-y-3">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-emerald-950">
            <Sparkles className="h-5 w-5 text-emerald-600" /> {isHi ? "आज के शुभ मुहूर्त" : "Today's Auspicious Muhurats (Shubh)"}
          </h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-emerald-100">
              <div>
                <strong className="font-serif text-sm text-emerald-950">{isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}</strong>
                <p className="text-xs text-emerald-700">{isHi ? "ध्यान, साधना एवं योग हेतु" : "Meditation & Spiritual Sadhanas"}</p>
              </div>
              <span className="font-serif text-sm font-bold text-ink">
                {formatTime(panchang.brahmaMuhurat.start)} - {formatTime(panchang.brahmaMuhurat.end)}
              </span>
            </div>

            {panchang.abhijitMuhurat && (
              <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-emerald-100">
                <div>
                  <strong className="font-serif text-sm text-emerald-950">{isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}</strong>
                  <p className="text-xs text-emerald-700">{isHi ? "नवीन कार्यों एवं यात्रा हेतु" : "Best for all auspicious beginnings"}</p>
                </div>
                <span className="font-serif text-sm font-bold text-ink">
                  {formatTime(panchang.abhijitMuhurat.start)} - {formatTime(panchang.abhijitMuhurat.end)}
                </span>
              </div>
            )}

            {panchang.amritKaal && (
              <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-emerald-100">
                <div>
                  <strong className="font-serif text-sm text-emerald-950">{isHi ? "अमृत काल" : "Amrit Kaal"}</strong>
                  <p className="text-xs text-emerald-700">{isHi ? "पूजा-अनुष्ठान हेतु" : "Nectar timing for ceremonies"}</p>
                </div>
                <span className="font-serif text-sm font-bold text-ink">
                  {formatTime(panchang.amritKaal.start)} - {formatTime(panchang.amritKaal.end)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-emerald-100">
              <div>
                <strong className="font-serif text-sm text-emerald-950">{isHi ? "विजय मुहूर्त" : "Vijaya Muhurat"}</strong>
              </div>
              <span className="font-serif text-sm font-bold text-ink">
                {formatTime(panchang.vijayaMuhurat.start)} - {formatTime(panchang.vijayaMuhurat.end)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-emerald-100">
              <div>
                <strong className="font-serif text-sm text-emerald-950">{isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}</strong>
              </div>
              <span className="font-serif text-sm font-bold text-ink">
                {formatTime(panchang.godhuliMuhurat.start)} - {formatTime(panchang.godhuliMuhurat.end)}
              </span>
            </div>
          </div>
        </div>

        {/* Ashubh Muhurats */}
        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 shadow-2xs space-y-3">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-rose-950">
            <Flame className="h-5 w-5 text-rose-600" /> {isHi ? "आज के अशुभ काल" : "Today's Inauspicious Periods (Ashubh)"}
          </h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-rose-100">
              <div>
                <strong className="font-serif text-sm text-rose-950">{isHi ? "राहु काल" : "Rahu Kaal"}</strong>
                <p className="text-xs text-rose-700">{isHi ? "शुभ कार्य आरम्भ न करें" : "Avoid starting new journeys/deals"}</p>
              </div>
              <span className="font-serif text-sm font-bold text-rose-950">
                {formatTime(panchang.rahuKaal.start)} - {formatTime(panchang.rahuKaal.end)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-rose-100">
              <div>
                <strong className="font-serif text-sm text-rose-950">{isHi ? "यमगण्ड काल" : "Yamaganda"}</strong>
              </div>
              <span className="font-serif text-sm font-bold text-rose-950">
                {formatTime(panchang.yamaganda.start)} - {formatTime(panchang.yamaganda.end)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-rose-100">
              <div>
                <strong className="font-serif text-sm text-rose-950">{isHi ? "गुलिक काल" : "Gulika Kaal"}</strong>
              </div>
              <span className="font-serif text-sm font-bold text-rose-950">
                {formatTime(panchang.gulikaKaal.start)} - {formatTime(panchang.gulikaKaal.end)}
              </span>
            </div>

            {panchang.durMuhurat.map((dm, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-2xs border border-rose-100">
                <div>
                  <strong className="font-serif text-sm text-rose-950">{isHi ? `दुर्मुहूर्त ${idx + 1}` : `Dur Muhurat ${idx + 1}`}</strong>
                </div>
                <span className="font-serif text-sm font-bold text-rose-950">
                  {formatTime(dm.start)} - {formatTime(dm.end)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choghadiya Section */}
      <section className="rounded-3xl border border-line bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
              <Clock className="h-5 w-5 text-saffron" /> {isHi ? "आज का सम्पूर्ण चौघड़िया मुहूर्त" : "Today's Complete Choghadiya Muhurat"}
            </h2>
            <p className="text-xs text-muted">
              {isHi ? "दिन एवं रात के 8-8 चौघड़िया काल" : "8 Day & 8 Night Choghadiya timings with planetary lords"}
            </p>
          </div>

          <div className="flex rounded-2xl bg-sand p-1 text-xs">
            <button
              onClick={() => setChoghadiyaTab("day")}
              className={`rounded-xl px-4 py-1.5 font-semibold transition ${
                choghadiyaTab === "day" ? "bg-white shadow-xs text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
            </button>
            <button
              onClick={() => setChoghadiyaTab("night")}
              className={`rounded-xl px-4 py-1.5 font-semibold transition ${
                choghadiyaTab === "night" ? "bg-white shadow-xs text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {isHi ? "रात का चौघड़िया" : "Night Choghadiya"}
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {(choghadiyaTab === "day" ? panchang.dayChoghadiya : panchang.nightChoghadiya).map((item, idx) => {
            const isShubh = item.nature === "shubh";
            const isAshubh = item.nature === "ashubh";

            return (
              <div
                key={idx}
                className={`rounded-2xl p-3.5 border ${
                  isShubh
                    ? "bg-emerald-50/60 border-emerald-200"
                    : isAshubh
                    ? "bg-rose-50/60 border-rose-200"
                    : "bg-amber-50/60 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-ink">
                    {isHi ? item.nameHi : `${item.name} (${item.nameHi})`}
                  </span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      isShubh
                        ? "bg-emerald-100 text-emerald-950"
                        : isAshubh
                        ? "bg-rose-100 text-rose-950"
                        : "bg-amber-100 text-amber-950"
                    }`}
                  >
                    {item.nature}
                  </span>
                </div>
                <div className="mt-2 font-serif text-xs font-semibold text-ink">
                  {formatTime(item.start)} - {formatTime(item.end)}
                </div>
                <div className="mt-1 text-[10px] text-muted">
                  {isHi ? "स्वामी ग्रह: " : "Ruler: "}{item.ruler}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Spiritual Guidance */}
      {panchang.dailyMantra && (
        <section className="rounded-3xl border border-saffron/30 bg-gradient-to-r from-cream via-amber-50/50 to-cream p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-deep">
            <Music className="h-4 w-4 text-saffron" />
            <span>{isHi ? "आज का दैनिक मन्त्र एवं जप संदेश" : "Daily Mantra & Sacred Guidance"}</span>
          </div>

          <div className="mt-3 rounded-2xl bg-white p-5 border border-saffron/20 shadow-xs">
            <div className="font-serif text-lg font-bold text-saffron-deep">
              {panchang.dailyMantra.sanskrit}
            </div>
            <div className="mt-2 text-xs text-muted">
              {isHi ? "इष्टदेव: " : "Deity: "}<strong className="text-ink">{panchang.dailyMantra.deity}</strong>
            </div>
            <div className="mt-2 border-t border-line/60 pt-2 text-xs leading-relaxed text-ink/80">
              <strong>{isHi ? "फल व लाभ: " : "Spiritual Benefit: "}</strong> {panchang.dailyMantra.benefit}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

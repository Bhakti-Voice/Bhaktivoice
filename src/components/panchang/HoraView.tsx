"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  Copy,
  Check,
} from "lucide-react";
import { DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "./CityPickerButton";
import { getSunrise, getSunset } from "@/lib/panchang/astronomy";
import { calculateHoras, type HoraPeriod } from "@/lib/panchang/hora";
import { useLocale } from "@/lib/i18n/client";

export function HoraView({ initialCityId }: { initialCityId?: string }) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [city, setCity] = useState<CityConfig>(() => getCityById(initialCityId));
  const [tab, setTab] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);
  const [dateOffset, setDateOffset] = useState<number>(0);

  // Sync with localStorage on client mount if no explicit initialCityId
  useEffect(() => {
    if (initialCityId) return;
    try {
      const stored = localStorage.getItem("bhakti_selected_city_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.id && typeof parsed.latitude === "number" && typeof parsed.longitude === "number") {
          setCity(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, [initialCityId]);

  const handleCityChange = (newCity: CityConfig) => {
    setCity(newCity);
    try {
      localStorage.setItem("bhakti_selected_city_config", JSON.stringify(newCity));
      localStorage.setItem("bhakti_selected_city", newCity.id);
    } catch {
      // Ignore
    }
  };

  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    return d;
  }, [dateOffset]);

  const sunrise = useMemo(() => getSunrise(targetDate, city), [targetDate, city]);
  const sunset = useMemo(() => getSunset(targetDate, city), [targetDate, city]);
  const nextSunrise = useMemo(() => {
    const nextDay = new Date(targetDate.getTime() + 86_400_000);
    return getSunrise(nextDay, city);
  }, [targetDate, city]);

  const weekday = targetDate.getDay();
  const now = new Date();

  const horaSchedule = useMemo(() => {
    return calculateHoras(sunrise, sunset, nextSunrise, weekday, now);
  }, [sunrise, sunset, nextSunrise, weekday, now]);

  const formatTime = (d: Date) => {
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  const handleCopy = () => {
    const title = isHi
      ? `🕉️ ग्रह होरा सारणी (${city.nameHi})\n\n`
      : `🕉️ Planetary Hora Table (${city.name})\n\n`;

    const dayText = horaSchedule.dayHoras
      .map((h) => `${h.index}. ${isHi ? h.rulerHi : h.ruler} (${formatTime(h.start)} - ${formatTime(h.end)})`)
      .join("\n");

    const text = `${title}🌅 दिन की होरा:\n${dayText}\n\nसम्पूर्ण होरा व मुहूर्त BhaktiVoice.com पर देखें।`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Selector Card */}
      <div className="rounded-3xl border border-saffron/20 bg-gradient-to-r from-cream via-ivory to-cream p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setDateOffset(-1)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                dateOffset === -1 ? "bg-maroon text-white shadow-xs" : "bg-white text-ink hover:bg-sand/40 border border-line"
              }`}
            >
              {isHi ? "कल (बीता हुआ)" : "Yesterday"}
            </button>
            <button
              onClick={() => setDateOffset(0)}
              className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition ${
                dateOffset === 0 ? "bg-maroon text-white shadow-xs" : "bg-white text-ink hover:bg-sand/40 border border-line"
              }`}
            >
              {isHi ? "आज" : "Today"}
            </button>
            <button
              onClick={() => setDateOffset(1)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                dateOffset === 1 ? "bg-maroon text-white shadow-xs" : "bg-white text-ink hover:bg-sand/40 border border-line"
              }`}
            >
              {isHi ? "कल (आने वाला)" : "Tomorrow"}
            </button>
          </div>

          <CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} variant="compact" />
        </div>
      </div>

      {/* Currently Active Hora (Today Only) */}
      {dateOffset === 0 && horaSchedule.currentHora && (
        <div
          className={`rounded-3xl border p-5 shadow-xs transition ${
            horaSchedule.currentHora.nature === "shubh"
              ? "border-emerald-300 bg-emerald-50/70"
              : horaSchedule.currentHora.nature === "madhyam"
              ? "border-amber-300 bg-amber-50/70"
              : "border-rose-300 bg-rose-50/70"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  horaSchedule.currentHora.nature === "shubh"
                    ? "bg-emerald-600 text-white"
                    : horaSchedule.currentHora.nature === "madhyam"
                    ? "bg-amber-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                <Clock className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {isHi ? "अभी सक्रिय ग्रह होरा" : "Currently Active Planetary Hora"}
                </span>
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isHi ? `${horaSchedule.currentHora.rulerHi} होरा` : `${horaSchedule.currentHora.ruler} Hora`}{" "}
                  <span className="text-sm font-normal text-muted">
                    ({formatTime(horaSchedule.currentHora.start)} - {formatTime(horaSchedule.currentHora.end)})
                  </span>
                </h3>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-2xs hover:bg-sand/30"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "कॉपी करें" : "Copy Schedule")}
            </button>
          </div>
        </div>
      )}

      {/* 24 Hora Tables (Day & Night) */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              {isHi ? "दैनिक 24 ग्रह होरा समय सारणी" : "24 Planetary Horas Schedule"}
            </h2>
            <p className="text-xs text-muted">
              {isHi
                ? "दिन की 12 होरा एवं रात्रि की 12 होरा (काल्दियन क्रम अनुसार)"
                : "12 Day Horas and 12 Night Horas in classical Chaldean planetary sequence"}
            </p>
          </div>

          <div className="flex rounded-2xl bg-sand/60 p-1 text-xs">
            <button
              onClick={() => setTab("day")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-semibold transition ${
                tab === "day" ? "bg-white text-maroon shadow-xs" : "text-muted hover:text-ink"
              }`}
            >
              <Sun className="h-4 w-4 text-amber-500" />
              {isHi ? "दिन की होरा (12)" : "Day Horas (12)"}
            </button>
            <button
              onClick={() => setTab("night")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-semibold transition ${
                tab === "night" ? "bg-white text-maroon shadow-xs" : "text-muted hover:text-ink"
              }`}
            >
              <Moon className="h-4 w-4 text-indigo-500" />
              {isHi ? "रात की होरा (12)" : "Night Horas (12)"}
            </button>
          </div>
        </div>

        {/* Hora Cards Grid */}
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {(tab === "day" ? horaSchedule.dayHoras : horaSchedule.nightHoras).map((h, idx) => {
            const isCurrent =
              dateOffset === 0 &&
              now.getTime() >= h.start.getTime() &&
              now.getTime() < h.end.getTime();

            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-4 transition ${
                  isCurrent
                    ? "ring-2 ring-saffron border-saffron bg-saffron/5 shadow-md"
                    : h.nature === "shubh"
                    ? "border-emerald-200 bg-emerald-50/30"
                    : h.nature === "madhyam"
                    ? "border-amber-200 bg-amber-50/30"
                    : "border-rose-200 bg-rose-50/30"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-xs">
                    {isHi ? "सक्रिय" : "Active"}
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-ink">
                    {h.index}. {isHi ? `${h.rulerHi} होरा` : `${h.ruler} Hora`}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      h.nature === "shubh"
                        ? "bg-emerald-100 text-emerald-900"
                        : h.nature === "madhyam"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-rose-100 text-rose-900"
                    }`}
                  >
                    {isHi ? h.natureHi : h.nature}
                  </span>
                </div>

                <div className="mt-1 font-serif text-sm font-semibold text-ink">
                  {formatTime(h.start)} - {formatTime(h.end)}
                </div>

                <div className="mt-2.5 border-t border-line/60 pt-2 text-xs text-muted">
                  <span className="font-medium text-ink">{isHi ? "श्रेष्ठ कार्य:" : "Favorable for:"}</span>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-ink/80">
                    {(isHi ? h.bestTasksHi : h.bestTasksEn).slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Compass,
  Info,
  MapPin,
  Moon,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "./CityPickerButton";
import { getPanchang } from "@/lib/panchang/engine";
import type { GowriPeriod } from "@/lib/panchang/gowri";
import { useLocale } from "@/lib/i18n/client";

export function GowriView({ initialCityId }: { initialCityId?: string }) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [city, setCity] = useState<CityConfig>(() => getCityById(initialCityId) || DEFAULT_CITY);
  const [tab, setTab] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);

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

  function formatTime(date: Date): string {
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  const now = useMemo(() => new Date(), []);
  const panchang = useMemo(() => getPanchang(now, city), [now, city]);

  const gowriData = panchang.gowriPanchangam;

  // Active Gowri period
  const activePeriod = useMemo(() => {
    if (!gowriData) return null;
    const all = [...gowriData.day, ...gowriData.night];
    return all.find((p) => now >= p.start && now < p.end) || gowriData.day[0];
  }, [gowriData, now]);

  function handleShare() {
    if (!activePeriod) return;
    const text = isHi
      ? `🕉️ आज का गौरी पंचांगम (Gowri Panchangam)\n📍 स्थान: ${city.nameHi}\n\n• वर्तमान गौरी: ${activePeriod.nameHi} (${activePeriod.name})\n• प्रकृति: ${activePeriod.natureHi}\n• समय: ${formatTime(activePeriod.start)} - ${formatTime(activePeriod.end)}\n• फल: ${activePeriod.significanceHi}\n\nसटीक दैनिक गौरी पंचांग BhaktiVoice.com पर देखें`
      : `🕉️ Today's Gowri Panchangam & Nalla Neram\n📍 City: ${city.name}\n\n• Current Gowri: ${activePeriod.name} (${activePeriod.nameHi})\n• Nature: ${activePeriod.nature.toUpperCase()}\n• Timing: ${formatTime(activePeriod.start)} - ${formatTime(activePeriod.end)}\n• Significance: ${activePeriod.significanceEn}\n\nExplore accurate Gowri Panchangam on BhaktiVoice.com`;

    if (navigator.share) {
      navigator.share({ title: "Gowri Panchangam", text }).catch(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const periodsToDisplay = tab === "day" ? gowriData?.day || [] : gowriData?.night || [];

  return (
    <div className="space-y-8">
      {/* Top Banner & City Switcher */}
      <div className="rounded-3xl border border-saffron/30 bg-gradient-to-r from-[#fff9f2] via-white to-[#fff9f2] p-6 shadow-xs sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                {isHi ? "दक्षिण भारत एवं वैदिक पद्धति" : "South Indian & Vedic Tradition"}
              </span>
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-ink">
              {isHi
                ? `आज का गौरी पंचांगम — ${city.nameHi}`
                : `Today's Gowri Panchangam — ${city.name}`}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              {isHi
                ? "दिन एवं रात्रि के 8-8 गौरी मुहूर्त (अमृत, शुभ, लाभ, धन, उत्ति, रोग, विष, सोर) का प्रामाणिक समय।"
                : "Real-time Gowri Nalla Neram timings: Amrutha, Shubha, Labha, Dhana, Uthi, Roga, Visha, and Sora."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* City Selector */}
            <CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} />

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-ink shadow-xs hover:border-saffron transition"
            >
              <Share2 className="h-4 w-4 text-saffron" />
              <span>{copied ? (isHi ? "कॉपी हुआ!" : "Copied!") : (isHi ? "शेयर" : "Share")}</span>
            </button>
          </div>
        </div>

        {/* Current Active Gowri Period Card */}
        {activePeriod && (
          <div className="mt-6 rounded-2xl border border-saffron/25 bg-[#fff6eb] p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  {isHi ? "वर्तमान सक्रिय गौरी मुहूर्त" : "Current Active Gowri Period"}
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-saffron-deep">
                    {isHi ? activePeriod.nameHi : activePeriod.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      activePeriod.nature === "shubh"
                        ? "bg-emerald-100 text-emerald-800"
                        : activePeriod.nature === "madhyam"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isHi
                      ? activePeriod.natureHi
                      : activePeriod.nature === "shubh"
                      ? "Auspicious (Shubha)"
                      : activePeriod.nature === "madhyam"
                      ? "Neutral (Uthi)"
                      : "Inauspicious (Ashubha)"}
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-stone-700">
                  {isHi ? activePeriod.significanceHi : activePeriod.significanceEn}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 border border-[#eddcc9] shadow-2xs self-start sm:self-auto">
                <Clock className="h-4 w-4 text-saffron" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted">
                    {isHi ? "समय सीमा" : "Active Window"}
                  </p>
                  <p className="font-mono text-sm font-bold text-ink">
                    {formatTime(activePeriod.start)} – {formatTime(activePeriod.end)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Day / Night Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-2xl bg-sand/40 p-1 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setTab("day")}
              className={`flex items-center gap-1.5 rounded-xl px-5 py-2 transition ${
                tab === "day"
                  ? "bg-white text-saffron-deep shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>{isHi ? "दिन का गौरी पंचांगम (Day)" : "Day Gowri Panchangam"}</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("night")}
              className={`flex items-center gap-1.5 rounded-xl px-5 py-2 transition ${
                tab === "night"
                  ? "bg-white text-saffron-deep shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>{isHi ? "रात का गौरी पंचांगम (Night)" : "Night Gowri Panchangam"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 Gowri Periods Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {periodsToDisplay.map((period: GowriPeriod, idx: number) => {
          const isCurrent = now >= period.start && now < period.end;
          let borderClass = "border-line";
          let badgeClass = "bg-stone-100 text-stone-700";

          if (period.nature === "shubh") {
            borderClass = isCurrent ? "border-emerald-500 ring-2 ring-emerald-400/40" : "border-emerald-200";
            badgeClass = "bg-emerald-100 text-emerald-800 font-bold";
          } else if (period.nature === "madhyam") {
            borderClass = isCurrent ? "border-amber-500 ring-2 ring-amber-400/40" : "border-amber-200";
            badgeClass = "bg-amber-100 text-amber-800 font-bold";
          } else {
            borderClass = isCurrent ? "border-rose-500 ring-2 ring-rose-400/40" : "border-rose-200";
            badgeClass = "bg-rose-100 text-rose-800 font-bold";
          }

          return (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-3xl border ${borderClass} bg-white p-5 shadow-2xs transition-all hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                    {isHi ? `मुहूर्त ${idx + 1}` : `Period ${idx + 1}`}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] ${badgeClass}`}>
                    {isHi
                      ? period.natureHi
                      : period.nature === "shubh"
                      ? "Auspicious"
                      : period.nature === "madhyam"
                      ? "Neutral"
                      : "Avoid"}
                  </span>
                </div>

                <div className="mt-2">
                  <h4 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
                    <span>{isHi ? period.nameHi : period.name}</span>
                    <span className="text-xs font-normal text-muted font-sans">({period.nameTa})</span>
                  </h4>
                  <p className="mt-1 font-mono text-xs font-semibold text-saffron-deep">
                    {formatTime(period.start)} – {formatTime(period.end)}
                  </p>
                </div>

                <p className="mt-3 text-xs text-muted leading-relaxed">
                  {isHi ? period.significanceHi : period.significanceEn}
                </p>
              </div>

              {isCurrent && (
                <div className="mt-4 pt-2 border-t border-line text-center">
                  <span className="inline-block rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider animate-pulse">
                    {isHi ? "अभी सक्रिय है" : "Active Right Now"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Classical Gowri Treatise */}
      <div className="rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffbf7] to-white p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2 mb-3">
          <Info className="h-5 w-5 text-saffron" />
          <span>{isHi ? "गौरी पंचांगम का शास्त्रीय महत्व एवं नियम" : "Significance of Gowri Panchangam (Nalla Neram)"}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted leading-relaxed">
          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-bold text-emerald-800 text-sm mb-1">
              {isHi ? "शुभ गौरी (अमृत, शुभ, लाभ, धन)" : "Shubha Gowri (Amrutha, Shubha, Labha, Dhana)"}
            </h4>
            <p>
              {isHi
                ? "यह चार मुहूर्त सर्वसिद्धिदायक माने गए हैं। इनमें व्यापार आरंभ, गृह प्रवेश, आभूषण क्रय, विवाह वार्ता एवं शुभ यात्राएं निर्विघ्न संपन्न होती हैं।"
                : "These 4 periods represent Nalla Neram (good time). Ideal for commercial transactions, buying property, entering a new home, and solemnizing agreements."}
            </p>
          </div>
          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-bold text-amber-800 text-sm mb-1">
              {isHi ? "उत्ति / उद्यम (Uthi)" : "Uthi (Neutral / Routine)"}
            </h4>
            <p>
              {isHi
                ? "उत्ति मध्यम फलदायी है। यह सामान्य दैनिक कार्यों, अध्ययन एवं परिश्रम के लिए उपयुक्त है, परंतु अत्यधिक महत्वपूर्ण कार्यों से बचना चाहिए।"
                : "Uthi represents enterprise and routine labor. Suitable for normal daily errands and education, but avoid inaugurating major lifetime milestones."}
            </p>
          </div>
          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-bold text-rose-800 text-sm mb-1">
              {isHi ? "अशुभ गौरी (रोग, विष, सोर)" : "Ashubha Gowri (Roga, Visha, Sora)"}
            </h4>
            <p>
              {isHi
                ? "रोग, विष और सोर में नए कार्यों का शुभारंभ, यात्रा और वित्तीय लेन-देन वर्जित हैं। इस काल में केवल ईश्वर आराधना व नाम जप हितकर है।"
                : "Prohibited windows. Avoid medical surgeries in Roga, food feasts in Visha, and journeys or financial negotiations during Sora."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

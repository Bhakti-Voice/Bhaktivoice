"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  Check,
  Share2,
} from "lucide-react";
import { DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "@/components/panchang/CityPickerButton";
import { calculateEkadashiCalendar, type EkadashiRecord } from "@/lib/panchang/ekadashi-engine";
import { useLocale } from "@/lib/i18n/client";

export function EkadashiCalendarView({
  initialYear,
  initialCityId,
}: {
  initialYear?: number;
  initialCityId?: string;
}) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [year, setYear] = useState<number>(initialYear || currentYear);
  const [city, setCity] = useState<CityConfig>(() => getCityById(initialCityId) || DEFAULT_CITY);
  const [traditionFilter, setTraditionFilter] = useState<"all" | "smarta" | "vaishnava">("all");
  const [copied, setCopied] = useState(false);

  // Sync city with localStorage
  useEffect(() => {
    if (initialCityId) return;
    try {
      const stored = localStorage.getItem("bhakti_selected_city_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.id && typeof parsed.latitude === "number") {
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

  // Compute all Ekadashis for the year and city
  const ekadashis = useMemo(() => {
    return calculateEkadashiCalendar(year, city, isHi);
  }, [year, city, isHi]);

  // Find next upcoming Ekadashi
  const now = useMemo(() => new Date(), []);
  const upcomingIndex = useMemo(() => {
    return ekadashis.findIndex((e) => e.paranaEnd.getTime() >= now.getTime());
  }, [ekadashis, now]);

  const nextEkadashi: EkadashiRecord | null =
    upcomingIndex !== -1 ? ekadashis[upcomingIndex] : ekadashis[0] || null;

  // Days until next Ekadashi
  const daysUntil = useMemo(() => {
    if (!nextEkadashi) return 0;
    const diff = nextEkadashi.fastDateSmarta.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [nextEkadashi, now]);

  function handleShareNext() {
    if (!nextEkadashi) return;
    const text = isHi
      ? `🕉️ ${nextEkadashi.nameHi} व्रत व पारणा समय\n📍 स्थान: ${city.nameHi}\n\n• व्रत दिनांक: ${nextEkadashi.fastDateSmartaString}\n• विहित पारणा समय: ${nextEkadashi.paranaWindowFormattedHi}\n• हरिवासर समाप्ति: ${nextEkadashi.hariVasaraEndFormatted}\n• द्वादशी समाप्ति: ${nextEkadashi.dwadashiEndFormatted}\n\nसटीक एकादशी पारणा समय BhaktiVoice.com पर देखें`
      : `🕉️ ${nextEkadashi.name} Fast & Parana Timings\n📍 City: ${city.name}\n\n• Fast Date: ${nextEkadashi.fastDateSmartaString}\n• Parana Time Window: ${nextEkadashi.paranaWindowFormatted}\n• Hari Vasara Ends: ${nextEkadashi.hariVasaraEndFormatted}\n• Dwadashi Ends: ${nextEkadashi.dwadashiEndFormatted}\n\nExplore accurate Ekadashi timings on BhaktiVoice.com`;

    if (navigator.share) {
      navigator.share({ title: nextEkadashi.name, text }).catch(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Controls: Year & City Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-saffron/20 bg-gradient-to-r from-cream via-ivory to-cream p-4 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-saffron/15 text-saffron">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-ink">
              {isHi
                ? `एकादशी व्रत एवं पारणा कैलेंडर ${year}`
                : `Ekadashi Vrat & Parana Calendar ${year}`}
            </h2>
            <p className="text-xs text-muted">
              {isHi
                ? "स्मार्त व वैष्णव व्रत तारीखें, हरिवासर समाप्ति एवं सटीक प्रातःकालीन पारणा मुहूर्त"
                : "Smarta & Vaishnava dates, Hari Vasara end, and exact morning Parana windows"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Year Selector */}
          <div className="flex items-center rounded-2xl border border-line bg-white px-2 py-1 shadow-2xs">
            {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
                  year === y
                    ? "bg-saffron text-white shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* City Picker Button with 100,000+ cities & auto DST */}
          <CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} />
        </div>
      </div>

      {/* Next Upcoming Ekadashi Hero Card */}
      {nextEkadashi && (
        <div className="rounded-3xl border-2 border-saffron/40 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF5E6] p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-saffron/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-saffron/15 px-3 py-1 text-xs font-bold text-saffron uppercase tracking-wider">
                  {isHi ? "आगामी एकादशी" : "Next Upcoming Ekadashi"}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {daysUntil === 0
                    ? isHi ? "आज व्रत है!" : "Today is the Fast!"
                    : isHi ? `${daysUntil} दिन शेष` : `${daysUntil} days away`}
                </span>
                <span className="text-xs text-muted">
                  📍 {isHi ? city.nameHi : city.name} ({city.timeZone})
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                {isHi ? nextEkadashi.nameHi : nextEkadashi.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-2xl">
                {isHi ? nextEkadashi.significanceHi : nextEkadashi.significance}
              </p>
            </div>

            <button
              type="button"
              onClick={handleShareNext}
              className="self-start lg:self-center flex items-center gap-2 rounded-2xl border border-saffron/40 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-saffron shadow-xs hover:bg-saffron hover:text-white transition"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              <span>{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "पारणा समय शेयर करें" : "Share Parana Window")}</span>
            </button>
          </div>

          {/* Key Timings Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-saffron/20 pt-6">
            {/* Fast Date */}
            <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-2xs">
              <span className="text-xs text-muted block mb-1">
                {isHi ? "एकादशी व्रत तारीख" : "Fasting Date"}
              </span>
              <div className="text-base sm:text-lg font-bold text-ink">
                {nextEkadashi.fastDateSmartaString}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                {nextEkadashi.isSmartaVaishnavaSame
                  ? isHi ? "स्मार्त व वैष्णव एक ही दिन" : "Smarta & Vaishnava Same Day"
                  : isHi ? `वैष्णव: ${nextEkadashi.fastDateVaishnavaString}` : `Vaishnava: ${nextEkadashi.fastDateVaishnavaString}`}
              </span>
            </div>

            {/* Parana Window (HIGH IMPACT) */}
            <div className="rounded-2xl border-2 border-saffron bg-gradient-to-br from-saffron/15 to-saffron/5 p-4 shadow-2xs sm:col-span-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-saffron mb-1">
                <Clock className="h-4 w-4" />
                <span>{isHi ? "विहित पारणा समय (व्रत खोलने का समय)" : "Exact Parana Time Window"}</span>
              </div>
              <div className="text-lg sm:text-2xl font-black text-amber-900 font-mono tracking-tight">
                {isHi ? nextEkadashi.paranaWindowFormattedHi : nextEkadashi.paranaWindowFormatted}
              </div>
              <p className="text-xs text-muted mt-1">
                {isHi ? nextEkadashi.paranaRuleNoteHi : nextEkadashi.paranaRuleNote}
              </p>
            </div>

            {/* Hari Vasara & Dwadashi End */}
            <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-2xs">
              <span className="text-xs text-muted block mb-1">
                {isHi ? "हरिवासर एवं द्वादशी" : "Hari Vasara & Dwadashi"}
              </span>
              <div className="text-xs font-semibold text-ink">
                {isHi ? "हरिवासर अंत:" : "Hari Vasara Ends:"}{" "}
                <strong className="text-amber-800">{nextEkadashi.hariVasaraEndFormatted}</strong>
              </div>
              <div className="text-xs font-semibold text-ink mt-0.5">
                {isHi ? "द्वादशी समाप्त:" : "Dwadashi Ends:"}{" "}
                <strong className="text-rose-800">{nextEkadashi.dwadashiEndFormatted}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Annual Table of all 24-26 Ekadashis */}
      <div className="rounded-3xl border border-line bg-white shadow-xs overflow-hidden">
        <div className="border-b border-line px-5 py-4 bg-cream/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-ink">
              {isHi
                ? `वर्ष ${year} की सभी 24 एकादशियां एवं पारणा मुहूर्त`
                : `All 24 Ekadashis & Parana Windows in ${year}`}
            </h3>
            <p className="text-xs text-muted">
              {isHi
                ? `${city.nameHi} के स्थानीय सूर्योदय व पंचांग गणित अनुसार`
                : `Calculated for local sunrise in ${city.name} (${city.timeZone})`}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-muted">{isHi ? "परंपरा:" : "Tradition:"}</span>
            <button
              type="button"
              onClick={() => setTraditionFilter("all")}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                traditionFilter === "all" ? "bg-navy text-white" : "border border-line bg-white text-ink"
              }`}
            >
              {isHi ? "सभी" : "All"}
            </button>
            <button
              type="button"
              onClick={() => setTraditionFilter("smarta")}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                traditionFilter === "smarta" ? "bg-navy text-white" : "border border-line bg-white text-ink"
              }`}
            >
              {isHi ? "स्मार्त" : "Smarta"}
            </button>
            <button
              type="button"
              onClick={() => setTraditionFilter("vaishnava")}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                traditionFilter === "vaishnava" ? "bg-navy text-white" : "border border-line bg-white text-ink"
              }`}
            >
              {isHi ? "वैष्णव / ISKCON" : "Vaishnava / ISKCON"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-line bg-ivory/60 text-muted font-semibold">
                <th className="py-3 px-4">{isHi ? "एकादशी नाम" : "Ekadashi Name"}</th>
                <th className="py-3 px-4">{isHi ? "माह / पक्ष" : "Masa / Paksha"}</th>
                <th className="py-3 px-4">{isHi ? "व्रत दिनांक" : "Fast Date"}</th>
                <th className="py-3 px-4 text-amber-900 font-bold bg-amber-50/50">
                  {isHi ? "विहित पारणा समय" : "Parana Time Window"}
                </th>
                <th className="py-3 px-4">{isHi ? "हरिवासर अंत" : "Hari Vasara End"}</th>
                <th className="py-3 px-4">{isHi ? "द्वादशी अंत" : "Dwadashi End"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ekadashis.map((e, idx) => {
                const isPast = e.paranaEnd.getTime() < now.getTime();
                return (
                  <tr
                    key={e.id}
                    className={`transition hover:bg-cream/40 ${
                      isPast ? "opacity-70 bg-white/40" : "bg-white"
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink">
                        {isHi ? e.nameHi : e.name}
                      </div>
                      <div className="text-[11px] text-muted">{e.deity}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>{isHi ? e.masaHi : e.masa}</div>
                      <span
                        className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold mt-0.5 ${
                          e.paksha === "shukla"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-indigo-100 text-indigo-900"
                        }`}
                      >
                        {e.paksha === "shukla"
                          ? isHi ? "शुक्ल पक्ष" : "Shukla"
                          : isHi ? "कृष्ण पक्ष" : "Krishna"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-ink">
                        {traditionFilter === "vaishnava"
                          ? e.fastDateVaishnavaString
                          : e.fastDateSmartaString}
                      </div>
                      {!e.isSmartaVaishnavaSame && (
                        <div className="text-[10px] text-saffron mt-0.5">
                          {isHi
                            ? `वैष्णव: ${e.fastDateVaishnavaString}`
                            : `Vaishnava: ${e.fastDateVaishnavaString}`}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-amber-900 bg-amber-50/40">
                      {isHi ? e.paranaWindowFormattedHi : e.paranaWindowFormatted}
                    </td>

                    <td className="py-3.5 px-4 text-muted font-mono">
                      {e.hariVasaraEndFormatted}
                    </td>

                    <td className="py-3.5 px-4 text-muted font-mono">
                      {e.dwadashiEndFormatted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classical Fasting & Parana Rules Guide */}
      <div className="rounded-3xl border border-line bg-gradient-to-r from-ivory via-cream to-ivory p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-saffron" />
          <h4 className="text-base sm:text-lg font-bold text-ink">
            {isHi
              ? "शास्त्रसम्मत एकादशी व्रत एवं पारणा नियम (Nirnayasindhu & Dharmasindhu)"
              : "Scriptural Ekadashi Fasting & Parana Rules"}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-ink/85">
          <div className="rounded-2xl border border-line/60 bg-white p-4 space-y-2">
            <h5 className="font-bold text-saffron flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {isHi ? "पारणा का सही समय कब होता है?" : "When should Parana be performed?"}
            </h5>
            <p>
              {isHi
                ? "एकादशी व्रत का पारणा अगले दिन (द्वादशी तिथि) सूर्योदय के बाद और द्वादशी तिथि समाप्त होने से पूर्व किया जाता है। यदि द्वादशी सूर्योदय से पूर्व समाप्त हो रही हो, तो भी सूर्योदय के बाद ही पारणा करें।"
                : "Parana must be done on Dwadashi tithi after sunrise and before Dwadashi ends. If Dwadashi ends before sunrise, Parana must still be performed after sunrise."}
            </p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-white p-4 space-y-2">
            <h5 className="font-bold text-saffron flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" />
              {isHi ? "हरिवासर काल में पारणा क्यों वर्जित है?" : "Why is Parana prohibited during Hari Vasara?"}
            </h5>
            <p>
              {isHi
                ? "द्वादशी तिथि के प्रथम एक-चौथाई (25%) भाग को 'हरिवासर' कहते हैं। पद्म पुराण के अनुसार हरिवासर में पारणा करने से एकादशी व्रत का पुण्य नष्ट हो जाता है। अतः हरिवासर समाप्त होने के बाद ही पारणा करें।"
                : "The first quarter of Dwadashi is Hari Vasara. According to the Padma Purana, breaking fast during Hari Vasara nullifies the merit. Always wait until Hari Vasara concludes."}
            </p>
          </div>
        </div>

        {/* Parana Mantra */}
        <div className="rounded-2xl border border-saffron/30 bg-saffron/5 p-4 space-y-1.5 text-center">
          <span className="text-xs font-bold text-saffron uppercase tracking-wider block">
            {isHi ? "एकादशी पारणा संकल्प मंत्र" : "Sacred Ekadashi Parana Mantra"}
          </span>
          <p className="font-serif text-sm sm:text-base font-bold text-ink">
            एकादश्यां निराहारः स्थित्वाहमपरेऽहनि । भोक्ष्येऽहं पुण्डरीकाक्ष शरणं मे भवाच्युत ॥
          </p>
          <p className="text-xs text-muted">
            {isHi
              ? "अर्थ: हे कमलनयन भगवान विष्णु! मैंने एकादशी को निराहार रहकर व्रत किया। अब द्वादशी को भोजन ग्रहण कर रहा हूँ। हे अच्युत! आप मुझे अपनी शरण में लें।"
              : "Meaning: O Lotus-Eyed Lord Vishnu! Having fasted on Ekadashi without food, I now partake of food on Dwadashi. O infallible Achyuta, please accept me in Your divine shelter."}
          </p>
        </div>
      </div>
    </div>
  );
}

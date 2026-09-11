"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  Share2,
  Copy,
  Check,
  Calendar,
  Info,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "./CityPickerButton";
import { getPanchang } from "@/lib/panchang/engine";
import { useLocale } from "@/lib/i18n/client";
import type { ChoghadiyaPeriod } from "@/lib/panchang/types";

export type ChoghadiyaViewProps = {
  initialCityId?: string;
};

export function ChoghadiyaView({ initialCityId }: ChoghadiyaViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [city, setCity] = useState<CityConfig>(() => getCityById(initialCityId));
  const [tab, setTab] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);
  const [dateOffset, setDateOffset] = useState<number>(0); // 0 = Today, 1 = Tomorrow, -1 = Yesterday

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

  const panchang = useMemo(() => {
    return getPanchang(targetDate, city);
  }, [targetDate, city]);

  const formatTime = (d: Date) => {
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  // Find currently active Choghadiya if dateOffset === 0
  const now = new Date();
  const allChoghadiyas = useMemo(() => {
    return [...panchang.dayChoghadiya, ...panchang.nightChoghadiya];
  }, [panchang]);

  const currentChoghadiya: ChoghadiyaPeriod | null = useMemo(() => {
    if (dateOffset !== 0) return null;
    const nowMs = now.getTime();
    return allChoghadiyas.find((c) => nowMs >= c.start.getTime() && nowMs < c.end.getTime()) || null;
  }, [allChoghadiyas, dateOffset, now]);

  const handleShare = () => {
    const title = isHi
      ? `🕉️ ${panchang.gregorianLabelHi} — आज का चौघड़िया (${city.nameHi})\n\n`
      : `🕉️ ${panchang.gregorianLabel} — Today's Choghadiya (${city.name})\n\n`;

    const dayText = panchang.dayChoghadiya
      .map((c) => `• ${isHi ? c.nameHi : c.name} (${formatTime(c.start)} - ${formatTime(c.end)})`)
      .join("\n");

    const text = `${title}🌅 दिन का चौघड़िया:\n${dayText}\n\nसम्पूर्ण मुहूर्त व पंचांग BhaktiVoice.com पर देखें।`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (nature: "shubh" | "madhyam" | "ashubh") => {
    if (nature === "shubh") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="h-3.5 w-3.5" />
          {isHi ? "शुभ (श्रेष्ठ)" : "Auspicious"}
        </span>
      );
    }
    if (nature === "madhyam") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
          <Info className="h-3.5 w-3.5" />
          {isHi ? "मध्यम (सामान्य)" : "Moderate"}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800">
        <AlertTriangle className="h-3.5 w-3.5" />
        {isHi ? "अशुभ (त्याज्य)" : "Inauspicious"}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* City & Day Selector Bar */}
      <div className="rounded-3xl border border-saffron/20 bg-gradient-to-r from-cream via-ivory to-cream p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Day Navigation */}
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

          {/* City Selector */}
          <CityPickerButton city={city} onCityChange={handleCityChange} isHi={isHi} variant="compact" />
        </div>

        {/* Date & Sun Timings Summary */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line/60 pt-4 sm:grid-cols-4">
          <div>
            <span className="text-[11px] text-muted">{isHi ? "तारीख" : "Date"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchang.gregorianLabelHi : panchang.gregorianLabel}
            </div>
          </div>
          <div>
            <span className="text-[11px] text-muted">{isHi ? "सूर्योदय" : "Sunrise"}</span>
            <div className="font-serif text-sm font-bold text-amber-700">{formatTime(panchang.sunrise)}</div>
          </div>
          <div>
            <span className="text-[11px] text-muted">{isHi ? "सूर्यास्त" : "Sunset"}</span>
            <div className="font-serif text-sm font-bold text-orange-700">{formatTime(panchang.sunset)}</div>
          </div>
          <div>
            <span className="text-[11px] text-muted">{isHi ? "वार / दिनमान" : "Weekday / Duration"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchang.weekdayNameHi : panchang.weekdayName} ({panchang.dayDuration})
            </div>
          </div>
        </div>
      </div>

      {/* Live Active Choghadiya Alert Card (Only when Today is active) */}
      {currentChoghadiya && (
        <div
          className={`rounded-3xl border p-5 shadow-xs transition ${
            currentChoghadiya.nature === "shubh"
              ? "border-emerald-300 bg-emerald-50/70"
              : currentChoghadiya.nature === "madhyam"
              ? "border-amber-300 bg-amber-50/70"
              : "border-rose-300 bg-rose-50/70"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  currentChoghadiya.nature === "shubh"
                    ? "bg-emerald-600 text-white"
                    : currentChoghadiya.nature === "madhyam"
                    ? "bg-amber-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                <Clock className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {isHi ? "अभी सक्रिय चौघड़िया" : "Currently Active Choghadiya"}
                  </span>
                  {getStatusBadge(currentChoghadiya.nature)}
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isHi ? currentChoghadiya.nameHi : currentChoghadiya.name}{" "}
                  <span className="text-sm font-normal text-muted">
                    ({formatTime(currentChoghadiya.start)} - {formatTime(currentChoghadiya.end)})
                  </span>
                </h3>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-2xs hover:bg-sand/30"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy / Share")}
            </button>
          </div>
        </div>
      )}

      {/* Choghadiya Tables (Day & Night) */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs sm:p-8">
        {/* Tab Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              {isHi ? "दैनिक चौघड़िया समय सारणी" : "Choghadiya Timings Table"}
            </h2>
            <p className="text-xs text-muted">
              {isHi
                ? "दिन एवं रात्रि के 8-8 चौघड़िया काल एवं उनके स्वामी ग्रह"
                : "Exact 8 Day & 8 Night Choghadiyas tailored to local sunrise"}
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
              {isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
            </button>
            <button
              onClick={() => setTab("night")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-semibold transition ${
                tab === "night" ? "bg-white text-maroon shadow-xs" : "text-muted hover:text-ink"
              }`}
            >
              <Moon className="h-4 w-4 text-indigo-500" />
              {isHi ? "रात का चौघड़िया" : "Night Choghadiya"}
            </button>
          </div>
        </div>

        {/* Choghadiya Grid */}
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {(tab === "day" ? panchang.dayChoghadiya : panchang.nightChoghadiya).map((period, idx) => {
            const isShubh = period.nature === "shubh";
            const isAshubh = period.nature === "ashubh";
            const isNow =
              dateOffset === 0 &&
              now.getTime() >= period.start.getTime() &&
              now.getTime() < period.end.getTime();

            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-4 transition ${
                  isNow
                    ? "ring-2 ring-saffron border-saffron bg-saffron/5 shadow-md"
                    : isShubh
                    ? "border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70"
                    : isAshubh
                    ? "border-rose-200 bg-rose-50/40 hover:bg-rose-50/70"
                    : "border-amber-200 bg-amber-50/40 hover:bg-amber-50/70"
                }`}
              >
                {isNow && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-xs">
                    {isHi ? "सक्रिय" : "Active Now"}
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-ink">
                    {isHi ? period.nameHi : `${period.name} (${period.nameHi})`}
                  </span>
                  {getStatusBadge(period.nature)}
                </div>

                <div className="mt-2 font-serif text-sm font-bold text-ink">
                  {formatTime(period.start)} - {formatTime(period.end)}
                </div>

                <div className="mt-2 border-t border-line/60 pt-2 text-xs text-muted flex items-center justify-between">
                  <span>{isHi ? "स्वामी ग्रह:" : "Ruler:"}</span>
                  <span className="font-medium text-ink">{period.ruler}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Humanized Classical Treatise Guide on the 7 Choghadiyas */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs sm:p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-ink">
          {isHi ? "सातों चौघड़िया का शास्त्रीय महत्व एवं फल" : "Significance & Recommended Activities for Each Choghadiya"}
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          {isHi
            ? "वैदिक ज्योतिष के अनुसार, दिन और रात को आठ-आठ भागों में बांटकर चौघड़िया मुहूर्त की गणना की जाती है। प्रत्येक चौघड़िया लगभग 1 घंटा 30 मिनट का होता है, जिसके स्वामी अलग-अलग नवग्रह होते हैं। शुभ कार्य सदैव 'अमृत', 'शुभ' और 'लाभ' में प्रारंभ करने का विधान है।"
            : "According to classical Vedic treatises (Muhurta Chintamani), the solar day and night are each partitioned into eight equal segments called Choghadiyas (~90 minutes each). Each segment is ruled by a planetary lord that imbues it with specific cosmic qualities. Auspicious undertakings are strictly performed during Amrit, Shubh, or Labh."}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              {isHi ? "1. अमृत चौघड़िया (अति शुभ)" : "1. Amrit (Nectar — Supreme)"}
            </h3>
            <p className="mt-2 text-xs text-emerald-900 leading-relaxed">
              {isHi
                ? "स्वामी: चंद्र देव। यह समस्त चौघड़िया में सर्वश्रेष्ठ माना गया है। गृह प्रवेश, विवाह वार्ता, चिकित्सा, नए व्यापार का आरंभ एवं सभी मांगलिक कार्य इसमें निर्विघ्न सिद्ध होते हैं।"
                : "Ruler: Moon. Considered the most potent of all. Best for ceremonies, housewarmings, medical treatments, rituals, and starting long journeys."}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              {isHi ? "2. शुभ चौघड़िया (कल्याणकारी)" : "2. Shubh (Auspicious — Blessed)"}
            </h3>
            <p className="mt-2 text-xs text-emerald-900 leading-relaxed">
              {isHi
                ? "स्वामी: बृहस्पति (गुरु)। यह ज्ञान, धर्म एवं समृद्धि का कारक है। धार्मिक अनुष्ठान, शिक्षा आरंभ, गुरु से दीक्षा, विवाह एवं नए वस्त्र-आभूषण धारण करने हेतु उत्तम है।"
                : "Ruler: Jupiter. Conducive to wisdom, religious rituals, education, meeting spiritual teachers, marriage arrangements, and purchasing gold or assets."}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              {isHi ? "3. लाभ चौघड़िया (धनप्रद)" : "3. Labh (Gain — Profitable)"}
            </h3>
            <p className="mt-2 text-xs text-emerald-900 leading-relaxed">
              {isHi
                ? "स्वामी: बुध देव। यह वाणिज्य, बुद्धि एवं व्यापार का प्रतीक है। नया बैंक खाता खोलना, शेयर निवेश, दुकान का उद्घाटन एवं महत्वपूर्ण व्यापारिक अनुबंधों हेतु श्रेष्ठ माना गया है।"
                : "Ruler: Mercury. Symbolizes commerce, intellect, and profit. Ideal for inaugurating shops, signing contracts, stock investments, and commercial bank accounts."}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-amber-950 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-amber-600" />
              {isHi ? "4. चर चौघड़िया (गतिमान)" : "4. Char (Movable — Dynamic)"}
            </h3>
            <p className="mt-2 text-xs text-amber-900 leading-relaxed">
              {isHi
                ? "स्वामी: शुक्र देव। चर का अर्थ है चलायमान। वाहन की डिलीवरी लेना, यात्रा पर प्रस्थान करना, खेलकूद एवं ऐसे कार्य जिनमें निरंतर गतिशीलता की आवश्यकता हो, इसमें सफल होते हैं।"
                : "Ruler: Venus. Char implies movement. Ideal for starting journeys, taking delivery of vehicles, shifting houses, and dynamic sports."}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              {isHi ? "5. रोग चौघड़िया (अशुभ)" : "5. Rog (Disease — Inauspicious)"}
            </h3>
            <p className="mt-2 text-xs text-rose-900 leading-relaxed">
              {isHi
                ? "स्वामी: मंगल देव। इसमें शुभ कार्य करने से कार्यों में विघ्न, शारीरिक कष्ट एवं विवाद उत्पन्न होते हैं। कोई भी मांगलिक कार्य या नया सौदा इसमें न करें।"
                : "Ruler: Mars. Associated with physical ailments and disputes. Starting new businesses or auspicious ceremonies should strictly be avoided."}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-4">
            <h3 className="font-serif text-base font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              {isHi ? "6. काल चौघड़िया (घातक)" : "6. Kaal (Loss — Malefic)"}
            </h3>
            <p className="mt-2 text-xs text-rose-900 leading-relaxed">
              {isHi
                ? "स्वामी: शनि देव। इसे काल स्वरूप माना गया है। इस कालखंड में यात्रा, धन का लेन-देन या कोई भी शुभ कार्य सर्वथा त्याज्य है। केवल मशीनरी मरम्मत या लोहा क्रय किया जा सकता है।"
                : "Ruler: Saturn. Known for destructive delays and severe loss. Avoid travel, loans, or investments; suitable only for scrap, iron, or debt settlement."}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-4 lg:col-span-3">
            <h3 className="font-serif text-base font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              {isHi ? "7. उद्वेग चौघड़िया (चिंताकारक)" : "7. Udveg (Anxiety — Inauspicious)"}
            </h3>
            <p className="mt-2 text-xs text-rose-900 leading-relaxed">
              {isHi
                ? "स्वामी: सूर्य देव। उद्वेग का अर्थ है मानसिक बेचैनी और तनाव। इसमें प्रारंभ किए गए कार्यों में मानसिक अशांति और असफलता का भय रहता है। हालांकि सरकारी व प्रशासनिक कार्यों में मध्यम फल मिलता है।"
                : "Ruler: Sun. Means restlessness and mental agitation. Avoid auspicious beginnings as they breed tension; moderately tolerable only for mandatory governmental filings."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Info,
  ShieldAlert,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import {
  calculateDailyBalam,
  type DailyBalamReport,
} from "@/lib/panchang/tarabalam-engine";
import {
  NAKSHATRA_NAMES,
  NAKSHATRA_NAMES_HI,
  NAKSHATRA_NAMES_TE,
  RASI_NAMES,
  RASI_NAMES_HI,
  RASI_NAMES_TE,
} from "@/lib/panchang/names";
import { DEFAULT_CITY, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "./CityPickerButton";
import { useLocale } from "@/lib/i18n/client";

export function TarabalamView() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  // Default birth star: Rohini (index 3), Taurus (index 1)
  const [janmaNakshatra, setJanmaNakshatra] = useState<number>(3);
  const [janmaRashi, setJanmaRashi] = useState<number>(1);
  const [city, setCity] = useState<CityConfig>(DEFAULT_CITY);

  const [dateStr, setDateStr] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  const selectedDate = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  }, [dateStr]);

  const balamReport: DailyBalamReport = useMemo(() => {
    return calculateDailyBalam(janmaNakshatra, janmaRashi, selectedDate, city);
  }, [janmaNakshatra, janmaRashi, selectedDate, city]);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate.getTime() - 24 * 3600_000);
    setDateStr(prev.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate.getTime() + 24 * 3600_000);
    setDateStr(next.toISOString().split("T")[0]);
  };

  const handleToday = () => {
    setDateStr(new Date().toISOString().split("T")[0]);
  };

  const { tarabalam, chandrabalam, overallScore } = balamReport;

  return (
    <div className="space-y-8">
      {/* Control Bar: Date & City Selection */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sand bg-white/90 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDay}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-sand/40 text-ink transition hover:bg-sand hover:text-saffron-deep"
            title={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-sand bg-white px-3 py-1.5 shadow-2xs">
            <Calendar className="h-4 w-4 text-saffron" />
            <input
              type="date"
              value={dateStr}
              onChange={(e) => e.target.value && setDateStr(e.target.value)}
              className="border-none bg-transparent font-serif text-sm font-semibold text-ink focus:outline-none"
            />
          </div>

          <button
            onClick={handleNextDay}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-sand/40 text-ink transition hover:bg-sand hover:text-saffron-deep"
            title={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={handleToday}
            className="rounded-xl border border-saffron/30 bg-saffron/10 px-3 py-1.5 text-xs font-bold text-saffron-deep transition hover:bg-saffron hover:text-white"
          >
            {isTe ? "నేడు" : isHi ? "आज" : "Today"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <CityPickerButton city={city} onCityChange={setCity} isHi={isHi} isTe={isTe} />
        </div>
      </div>

      {/* Input Selectors: Birth Nakshatra & Birth Rashi */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Janma Nakshatra Selector */}
        <div className="rounded-3xl border border-sand bg-white p-5 shadow-sm space-y-2">
          <label className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Star className="h-4 w-4 text-saffron" />
            <span>{isHi ? "आपका जन्म नक्षत्र (Birth Star)" : "Your Janma Nakshatra (Birth Star)"}</span>
          </label>
          <select
            value={janmaNakshatra}
            onChange={(e) => setJanmaNakshatra(Number(e.target.value))}
            className="w-full rounded-2xl border border-sand bg-sand/20 p-3 font-serif text-sm font-semibold text-ink focus:border-saffron focus:bg-white focus:outline-none"
          >
            {NAKSHATRA_NAMES.map((name, idx) => (
              <option key={idx} value={idx}>
                {idx + 1}. {isHi ? NAKSHATRA_NAMES_HI[idx] : name} ({isHi ? name : NAKSHATRA_NAMES_HI[idx]})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-muted">
            {isHi
              ? "जन्म कालीन चंद्र नक्षत्र के आधार पर दैनिक ताराबल का निर्धारण होता है।"
              : "Tarabalam is calculated from your birth star to today's transiting star."}
          </p>
        </div>

        {/* Janma Rashi Selector */}
        <div className="rounded-3xl border border-sand bg-white p-5 shadow-sm space-y-2">
          <label className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Compass className="h-4 w-4 text-amber-600" />
            <span>{isHi ? "आपकी जन्म राशि (Moon Sign)" : "Your Janma Rashi (Moon Sign)"}</span>
          </label>
          <select
            value={janmaRashi}
            onChange={(e) => setJanmaRashi(Number(e.target.value))}
            className="w-full rounded-2xl border border-sand bg-sand/20 p-3 font-serif text-sm font-semibold text-ink focus:border-saffron focus:bg-white focus:outline-none"
          >
            {RASI_NAMES.map((name, idx) => (
              <option key={idx} value={idx}>
                {idx + 1}. {isHi ? RASI_NAMES_HI[idx] : name} ({isHi ? name : RASI_NAMES_HI[idx]})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-muted">
            {isHi
              ? "जन्म चंद्र राशि से दैनिक गोचर चंद्रमा की स्थिति (चंद्रबलम्) देखी जाती है।"
              : "Chandrabalam is evaluated from your natal Moon sign to today's Moon sign."}
          </p>
        </div>
      </div>

      {/* Overall Daily Verdict Card */}
      <div
        className={`rounded-3xl border p-6 shadow-sm ${
          overallScore === "uttama"
            ? "border-emerald-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40"
            : overallScore === "ashubha"
            ? "border-rose-300 bg-gradient-to-br from-rose-50/80 via-white to-rose-50/40"
            : "border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40"
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                overallScore === "uttama"
                  ? "bg-emerald-100 text-emerald-700"
                  : overallScore === "ashubha"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {overallScore === "uttama" ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : overallScore === "ashubha" ? (
                <ShieldAlert className="h-7 w-7" />
              ) : (
                <Sparkles className="h-7 w-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-white/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-muted shadow-2xs">
                  {isHi ? "दैनिक मुहूर्त बल" : "Daily Strength Verdict"}
                </span>
                <span className="text-xs font-semibold text-muted">
                  📍 {balamReport.cityName} • {balamReport.asOfDate}
                </span>
              </div>

              <h2 className="mt-1 font-serif text-2xl font-bold text-ink">
                {isHi ? balamReport.overallScoreLabelHi : balamReport.overallScoreLabel}
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
                {isHi ? balamReport.overallAdviceHi : balamReport.overallAdvice}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="rounded-2xl bg-white/95 p-3 text-center border border-sand/70 shadow-xs">
              <div className="text-[10px] font-bold uppercase text-muted">
                {isHi ? "ताराबल" : "Tarabalam"}
              </div>
              <div
                className={`font-serif text-sm font-bold ${
                  tarabalam.isFavorable ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {isHi ? (tarabalam.isFavorable ? "शुभ" : "सावधानी") : tarabalam.isFavorable ? "Favorable" : "Caution"}
              </div>
            </div>

            <div className="rounded-2xl bg-white/95 p-3 text-center border border-sand/70 shadow-xs">
              <div className="text-[10px] font-bold uppercase text-muted">
                {isHi ? "चंद्रबल" : "Chandrabalam"}
              </div>
              <div
                className={`font-serif text-sm font-bold ${
                  chandrabalam.isFavorable
                    ? "text-emerald-700"
                    : chandrabalam.isAshtamaChandra
                    ? "text-rose-700"
                    : "text-amber-700"
                }`}
              >
                {isHi
                  ? chandrabalam.isAshtamaChandra
                    ? "अष्टम दोष"
                    : chandrabalam.isFavorable
                    ? "शुभ"
                    : "सामान्य"
                  : chandrabalam.isAshtamaChandra
                  ? "Ashtama"
                  : chandrabalam.isFavorable
                  ? "Favorable"
                  : "Neutral"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Split Cards: Tarabala & Chandrabala */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tarabala Detailed Breakdown */}
        <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-saffron" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {isHi ? "ताराबलम् (Tara Chakra)" : "Tarabalam (Tara Chakra)"}
              </h3>
            </div>
            <span
              className={`rounded-lg px-2.5 py-0.5 text-xs font-bold uppercase ${
                tarabalam.isFavorable
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-rose-100 text-rose-900"
              }`}
            >
              {isHi ? tarabalam.tara.natureLabelHi : tarabalam.tara.natureLabel}
            </span>
          </div>

          <div className="rounded-2xl bg-sand/20 p-4 space-y-2 border border-sand/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "आज का नक्षत्र: " : "Today's Nakshatra: "}</span>
              <strong className="text-ink">
                {isHi ? tarabalam.transitNakshatraNameHi : tarabalam.transitNakshatraName}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "तारा क्रम: " : "Tara Name: "}</span>
              <strong className="text-saffron-deep font-serif text-sm">
                {isHi ? tarabalam.tara.nameHi : tarabalam.tara.name} (#{tarabalam.taraNumber})
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "पर्याय: " : "Paryaya (Cycle): "}</span>
              <span className="text-ink font-semibold">
                {isHi ? tarabalam.paryayaNameHi : tarabalam.paryayaName}
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-ink/80">
            {isHi ? tarabalam.tara.significanceHi : tarabalam.tara.significance}
          </p>

          {!tarabalam.isFavorable && (
            <div className="rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200 text-xs">
              <span className="font-bold text-amber-950">
                {isHi ? "शास्त्रोक्त निवारक उपाय: " : "Scriptural Remedy: "}
              </span>
              <span className="text-amber-900">
                {isHi ? tarabalam.tara.remedyHi : tarabalam.tara.remedy}
              </span>
            </div>
          )}
        </div>

        {/* Chandrabala Detailed Breakdown */}
        <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-amber-600" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {isHi ? "चंद्रबलम् (Moon Strength)" : "Chandrabalam (Moon Strength)"}
              </h3>
            </div>
            <span
              className={`rounded-lg px-2.5 py-0.5 text-xs font-bold uppercase ${
                chandrabalam.isFavorable
                  ? "bg-emerald-100 text-emerald-900"
                  : chandrabalam.isAshtamaChandra
                  ? "bg-rose-100 text-rose-900"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {isHi ? (chandrabalam.isFavorable ? "शुभ" : chandrabalam.isAshtamaChandra ? "अष्टम दोष" : "सामान्य") : chandrabalam.isFavorable ? "Auspicious" : chandrabalam.isAshtamaChandra ? "Ashtama" : "Neutral"}
            </span>
          </div>

          <div className="rounded-2xl bg-sand/20 p-4 space-y-2 border border-sand/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "आज की चंद्र राशि: " : "Today's Moon Sign: "}</span>
              <strong className="text-ink">
                {isHi ? chandrabalam.transitRashiNameHi : chandrabalam.transitRashiName}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "चंद्र भाव (जन्म राशि से): " : "House from Natal Moon: "}</span>
              <strong className="text-amber-800 font-serif text-sm">
                {isHi ? `${chandrabalam.houseFromMoon}वाँ भाव` : `House ${chandrabalam.houseFromMoon}`}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{isHi ? "अष्टम चंद्र स्थिति: " : "Ashtama Chandra: "}</span>
              <span
                className={`font-semibold ${
                  chandrabalam.isAshtamaChandra ? "text-rose-700" : "text-emerald-700"
                }`}
              >
                {chandrabalam.isAshtamaChandra ? (isHi ? "हाँ (त्याज्य)" : "Yes (Inauspicious)") : (isHi ? "नहीं" : "No")}
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-ink/80">
            {isHi ? chandrabalam.descriptionHi : chandrabalam.description}
          </p>

          <div className="rounded-2xl bg-sand/30 p-3.5 border border-sand/70 text-xs text-muted">
            {isHi
              ? "शास्त्रों के अनुसार चंद्रबलम १, ३, ६, ७, १०, ११वें भावों में शुभ माना जाता है। आठवां चंद्रमा सदैव त्याज्य होता है।"
              : "Classical Jyotish considers transit Moon in houses 1, 3, 6, 7, 10, and 11 as highly auspicious. The 8th house (Ashtama) is strictly avoided."}
          </div>
        </div>
      </div>

      {/* Complete 27-Nakshatra Tara Chakra Matrix Table */}
      <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-saffron" />
          <h3 className="font-serif text-lg font-bold text-ink">
            {isHi
              ? `सम्पूर्ण २७ नक्षत्र तारा चक्र तालिका (${NAKSHATRA_NAMES_HI[janmaNakshatra]} नक्षत्र हेतु)`
              : `Complete 27 Nakshatras Tara Chakra Matrix for ${NAKSHATRA_NAMES[janmaNakshatra]}`}
          </h3>
        </div>
        <p className="text-xs text-muted">
          {isHi
            ? "इस तालिका से आप जान सकते हैं कि जब चंद्रमा किसी विशेष नक्षत्र में भ्रमण करेगा, तो वह दिन आपके लिए शुभ रहेगा अथवा नहीं।"
            : "Use this master grid to determine in advance which upcoming days will be favorable for your birth star."}
        </p>

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {balamReport.nakshatraTable.map((item) => {
            const isFav = item.nature === "shubh";
            const isCaution = item.nature === "madhyam";

            return (
              <div
                key={item.nakshatraIndex}
                className={`rounded-2xl p-3 border transition text-xs ${
                  item.isCurrent
                    ? "border-saffron bg-saffron/10 ring-2 ring-saffron/40 font-bold"
                    : isFav
                    ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                    : isCaution
                    ? "border-amber-200 bg-amber-50/40 text-amber-950"
                    : "border-rose-200 bg-rose-50/40 text-rose-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-ink">
                    {item.nakshatraIndex + 1}. {isHi ? item.nakshatraNameHi : item.nakshatraName}
                  </span>
                  {item.isCurrent && (
                    <span className="rounded-md bg-saffron px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                      {isTe ? "నేడు" : isHi ? "आज" : "Today"}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-saffron-deep">
                    {isHi ? item.taraNameHi : item.taraName}
                  </span>
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold uppercase ${
                      isFav
                        ? "bg-emerald-100 text-emerald-800"
                        : isCaution
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isHi ? (isFav ? "शुभ" : isCaution ? "मध्यम" : "अशुभ") : item.nature}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

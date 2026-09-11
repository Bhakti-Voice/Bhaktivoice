"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  Flame,
  Info,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  calculateGocharReport,
  type GocharReport,
} from "@/lib/panchang/gochar-engine";
import { RASI_NAMES, RASI_NAMES_HI } from "@/lib/panchang/names";
import { useLocale } from "@/lib/i18n/client";

const RASHI_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

export function GocharCalendarView() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [dateStr, setDateStr] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [selectedRashi, setSelectedRashi] = useState<number>(0); // 0 = Mesha / Aries default

  const selectedDate = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  }, [dateStr]);

  const report: GocharReport = useMemo(() => {
    return calculateGocharReport(selectedRashi, selectedDate);
  }, [selectedRashi, selectedDate]);

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

  return (
    <div className="space-y-8">
      {/* Control Bar: Date Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sand bg-white/90 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDay}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-sand/40 text-ink transition hover:bg-sand hover:text-saffron-deep"
            title={isHi ? "पिछला दिन" : "Previous Day"}
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
            title={isHi ? "अगला दिन" : "Next Day"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={handleToday}
            className="rounded-xl border border-saffron/30 bg-saffron/10 px-3 py-1.5 text-xs font-bold text-saffron-deep transition hover:bg-saffron hover:text-white"
          >
            {isHi ? "आज" : "Today"}
          </button>
        </div>

        <div className="text-xs text-muted">
          {isHi ? "लाहिरी निरयण गोचर स्थिति" : "Sidereal Lahiri Gochar Reference"}
        </div>
      </div>

      {/* Moon Sign (Janma Rashi) Selector Grid */}
      <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-ink">
          {isHi ? "अपनी जन्म राशि (चंद्र राशि) चुनें" : "Select Your Natal Moon Sign (Janma Rashi)"}
        </h2>
        <p className="mt-1 text-xs text-muted">
          {isHi
            ? "गोचर फल की गणना व्यक्ति की जन्म चंद्र राशि से ग्रहों के भाव स्थान (१ से १२) के अनुसार की जाती है।"
            : "Vedic Gochar analyzes planetary transits relative to the natal Moon sign (houses 1 through 12)."}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {RASI_NAMES.map((name, idx) => {
            const isSelected = selectedRashi === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedRashi(idx)}
                className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition ${
                  isSelected
                    ? "bg-gradient-to-b from-saffron/20 to-saffron/5 border-2 border-saffron shadow-xs"
                    : "border border-sand bg-sand/20 hover:bg-sand/40"
                }`}
              >
                <span className="text-2xl">{RASHI_SYMBOLS[idx]}</span>
                <span className="mt-1 font-serif text-sm font-bold text-ink">
                  {isHi ? RASI_NAMES_HI[idx] : name}
                </span>
                <span className="text-[10px] text-muted">
                  {isHi ? name : RASI_NAMES_HI[idx]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overall Transit Score Card */}
      <div className="rounded-3xl border border-sand bg-gradient-to-br from-cream via-white to-amber-50/40 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
              <TrendingUp className="h-4 w-4 text-saffron" />
              <span>{isHi ? "दैनिक गोचर अनुकूलता स्कोर" : "Daily Transit Favorability Score"}</span>
            </div>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
              {isHi ? report.overallVerdictHi : report.overallVerdict}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {isHi
                ? `${report.moonRashiNameHi} राशि हेतु कुल ९ वैदिक ग्रहों में से ${report.totalShubhCount} ग्रह अनुकूल तथा ${report.totalAshubhCount} ग्रह प्रतिकूल भावों में गोचर कर रहे हैं।`
                : `For ${report.moonRashiName} Rashi: ${report.totalShubhCount} planets in auspicious houses, ${report.totalAshubhCount} planets in testing houses.`}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="font-serif text-3xl font-extrabold text-emerald-700">
                {report.totalShubhCount}
              </div>
              <div className="text-[11px] font-semibold text-emerald-800 uppercase">
                {isHi ? "शुभ ग्रह" : "Favorable"}
              </div>
            </div>

            <div className="h-10 w-px bg-sand-dark/40" />

            <div className="text-center">
              <div className="font-serif text-3xl font-extrabold text-rose-700">
                {report.totalAshubhCount}
              </div>
              <div className="text-[11px] font-semibold text-rose-800 uppercase">
                {isHi ? "प्रतिकूल ग्रह" : "Challenging"}
              </div>
            </div>

            <div className="h-10 w-px bg-sand-dark/40" />

            <div className="text-center">
              <div className="font-serif text-3xl font-extrabold text-saffron-deep">
                {report.overallScorePercentage}%
              </div>
              <div className="text-[11px] font-semibold text-muted uppercase">
                {isHi ? "अनुकूलता" : "Score"}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-sand/60">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-saffron transition-all duration-500"
            style={{ width: `${report.overallScorePercentage}%` }}
          />
        </div>
      </div>

      {/* 9 Graha Transit Cards Grid */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-ink">
          <Sparkles className="h-5 w-5 text-saffron" />
          <span>
            {isHi
              ? `९ वैदिक ग्रहों का गोचर विश्लेषण (${report.moonRashiNameHi} राशि से)`
              : `9 Vedic Planets Transit Breakdown (from ${report.moonRashiName})`}
          </span>
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {report.planets.map((p) => {
            const isFav = p.effectType === "shubh";

            return (
              <div
                key={p.planetId}
                className={`rounded-2xl border p-4 shadow-xs transition hover:shadow-sm ${
                  isFav
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-rose-200 bg-rose-50/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-base shadow-2xs">
                      {p.symbol}
                    </span>
                    <div>
                      <div className="font-serif text-sm font-bold text-ink">
                        {isHi ? p.nameHi : p.name}
                      </div>
                      <div className="text-[11px] text-muted">
                        {isHi ? p.currentRashiNameHi : p.currentRashiName} ({p.degreeFormatted})
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase ${
                      isFav
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-rose-100 text-rose-900"
                    }`}
                  >
                    {isHi ? (isFav ? "शुभ गोचर" : "अशुभ गोचर") : isFav ? "Auspicious" : "Inauspicious"}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ink border border-sand/60">
                    {isHi ? `${p.houseFromMoon}वाँ भाव` : `House ${p.houseFromMoon}`}
                  </span>
                  {p.isRetrograde && (
                    <span className="rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-900">
                      {isHi ? "वक्री (R)" : "Retrograde (R)"}
                    </span>
                  )}
                  {p.isCombust && (
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                      {isHi ? "अस्त (Combust)" : "Combust"}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-ink/80">
                  {isHi ? p.descriptionHi : p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Major Slow-Moving Transits Calendar (Jupiter, Saturn, Rahu, Ketu) */}
      <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-saffron" />
          <h3 className="font-serif text-lg font-bold text-ink">
            {isHi
              ? "प्रमुख ग्रह गोचर कैलेंडर (गुरु, शनि, राहु एवं केतु — २०२४ से २०३०)"
              : "Major Planetary Transit Calendar (Guru, Shani, Rahu, Ketu — 2024 to 2030)"}
          </h3>
        </div>
        <p className="text-xs text-muted">
          {isHi
            ? "धीमी गति वाले ग्रह (शनि, गुरु, राहु, केतु) लंबे समय तक एक राशि में रहकर जीवन व समाज पर व्यापक प्रभाव डालते हैं।"
            : "Slow-moving planets stay in a zodiac sign for years, dictating major karmic cycles and worldwide shifts."}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-sand bg-sand/30 font-serif text-muted">
              <tr>
                <th className="p-3 font-semibold">{isHi ? "ग्रह" : "Planet"}</th>
                <th className="p-3 font-semibold">{isHi ? "गोचर दिनांक" : "Transit Date"}</th>
                <th className="p-3 font-semibold">{isHi ? "प्रवेश राशि" : "Entered Sign"}</th>
                <th className="p-3 font-semibold">{isHi ? "ज्योतिषीय प्रभाव" : "Significance"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50">
              {report.majorTransits.map((tr, idx) => (
                <tr key={idx} className="hover:bg-sand/15 transition">
                  <td className="p-3 font-semibold text-ink flex items-center gap-2">
                    <span>{tr.symbol}</span>
                    <span>{isHi ? tr.planetNameHi : tr.planetName}</span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-saffron-deep whitespace-nowrap">
                    {tr.transitDate}
                  </td>
                  <td className="p-3 font-semibold text-ink">
                    {isHi ? tr.toRashiNameHi : tr.toRashiName}
                  </td>
                  <td className="p-3 text-muted leading-relaxed">
                    {isHi ? tr.significanceHi : tr.significance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

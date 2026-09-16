"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Flame,
  Globe,
  Info,
  Moon,
  Shield,
  Sparkles,
  Sun,
} from "lucide-react";
import {
  ECLIPSE_DATABASE,
  getEclipsesForYear,
  type EclipseEvent,
} from "@/lib/panchang/grahan-engine";
import { useLocale } from "@/lib/i18n/client";

export function GrahanView() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [filter, setFilter] = useState<"all" | "solar" | "lunar" | "india">("all");

  const yearEclipses = useMemo(() => {
    return getEclipsesForYear(selectedYear);
  }, [selectedYear]);

  const filteredEclipses = useMemo(() => {
    return yearEclipses.filter((e) => {
      if (filter === "solar") return e.kind === "solar";
      if (filter === "lunar") return e.kind === "lunar";
      if (filter === "india") return e.visibleInIndia;
      return true;
    });
  }, [yearEclipses, filter]);

  return (
    <div className="space-y-8">
      {/* Year & Filter Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sand bg-white/90 p-4 shadow-sm backdrop-blur-sm">
        {/* Year Tabs */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-sand/40 p-1">
          {[2025, 2026, 2027].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedYear === yr
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === "all"
                ? "bg-ink text-white"
                : "border border-sand bg-white text-muted hover:text-ink"
            }`}
          >
            {isTe ? "అన్ని గ్రహణాలు" : isHi ? "सभी ग्रहण" : "All Eclipses"}
          </button>
          <button
            onClick={() => setFilter("solar")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === "solar"
                ? "bg-amber-600 text-white"
                : "border border-amber-200 bg-amber-50/50 text-amber-900 hover:bg-amber-100"
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
            <span>{isHi ? "सूर्य ग्रहण" : "Solar"}</span>
          </button>
          <button
            onClick={() => setFilter("lunar")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === "lunar"
                ? "bg-indigo-600 text-white"
                : "border border-indigo-200 bg-indigo-50/50 text-indigo-900 hover:bg-indigo-100"
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
            <span>{isHi ? "चंद्र ग्रहण" : "Lunar"}</span>
          </button>
          <button
            onClick={() => setFilter("india")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === "india"
                ? "bg-emerald-700 text-white"
                : "border border-emerald-200 bg-emerald-50/50 text-emerald-900 hover:bg-emerald-100"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{isHi ? "भारत में दृश्य (सूतक मान्य)" : "Visible in India"}</span>
          </button>
        </div>
      </div>

      {/* Sutak Kaal Notice Banner */}
      <div className="rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 p-5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-800">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-sm font-bold text-amber-950">
              {isHi
                ? "सूतक काल का शास्त्रीय नियम (Dharmasindhu / Nirnayasindhu)"
                : "Classical Scriptural Rule on Sutak Kaal"}
            </h4>
            <p className="text-xs leading-relaxed text-amber-900">
              {isHi
                ? "शास्त्रों के अनुसार ग्रहण का सूतक एवं धार्मिक प्रतिबंध केवल उन्हीं स्थानों पर मान्य होते हैं जहाँ ग्रहण खुली आँखों से दृश्यमान हो। यदि ग्रहण भारत में दृश्य नहीं है, तो मंदिर दर्शन, पूजा-पाठ, एवं भोजन संबंधी कोई सूतक प्रतिबंध लागू नहीं होता।"
                : "According to Vedic Shastras, Sutak restrictions apply strictly to geographical regions where the eclipse is physically visible to the naked eye. If an eclipse is not visible in India, normal temple darshan, rituals, and meals continue uninterrupted."}
            </p>
          </div>
        </div>
      </div>

      {/* Eclipses List Grid */}
      <div className="space-y-6">
        {filteredEclipses.length === 0 ? (
          <div className="rounded-3xl border border-sand bg-white p-12 text-center text-muted">
            {isHi
              ? "इस वर्ष के लिए चयनित फिल्टर के अनुरूप कोई ग्रहण उपलब्ध नहीं है।"
              : "No eclipses match the selected filter for this year."}
          </div>
        ) : (
          filteredEclipses.map((eclipse) => {
            const isSolar = eclipse.kind === "solar";

            return (
              <div
                key={eclipse.id}
                className="rounded-3xl border border-sand bg-white shadow-sm overflow-hidden transition hover:shadow-md"
              >
                {/* Header Strip */}
                <div
                  className={`p-6 border-b ${
                    isSolar
                      ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-200"
                      : "bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-200"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          isSolar ? "bg-amber-500 text-white" : "bg-indigo-600 text-white"
                        }`}
                      >
                        {isSolar ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isSolar ? "bg-amber-100 text-amber-900" : "bg-indigo-100 text-indigo-900"
                            }`}
                          >
                            {isSolar ? (isHi ? "सूर्य ग्रहण" : "Solar Eclipse") : (isHi ? "चंद्र ग्रहण" : "Lunar Eclipse")}
                          </span>

                          <span className="text-xs font-semibold text-muted font-mono">
                            {eclipse.dateString}
                          </span>
                        </div>

                        <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-ink">
                          {isHi ? eclipse.titleHi : eclipse.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {eclipse.visibleInIndia ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-900 border border-emerald-300">
                          <Eye className="h-4 w-4 text-emerald-700" />
                          <span>{isHi ? "भारत में दृश्य (सूतक मान्य)" : "Visible in India (Sutak Applies)"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-sand/60 px-3 py-1.5 text-xs font-semibold text-muted border border-sand">
                          <EyeOff className="h-4 w-4" />
                          <span>{isHi ? "भारत में अदृश्य (सूतक नहीं)" : "Not Visible in India"}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">
                  {/* Astrological & Astronomical Coordinates */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-sand/15 p-4 border border-sand/70 text-xs">
                    <div>
                      <span className="text-muted">{isHi ? "तिथि: " : "Tithi: "}</span>
                      <strong className="block font-serif text-sm text-ink">{isHi ? eclipse.tithiHi : eclipse.tithi}</strong>
                    </div>

                    <div>
                      <span className="text-muted">{isHi ? "ग्रहण राशि: " : "Zodiac Sign: "}</span>
                      <strong className="block font-serif text-sm text-ink">{isHi ? eclipse.rashiHi : eclipse.rashi}</strong>
                    </div>

                    <div>
                      <span className="text-muted">{isHi ? "नक्षत्र: " : "Nakshatra: "}</span>
                      <strong className="block font-serif text-sm text-ink">{isHi ? eclipse.nakshatraHi : eclipse.nakshatra}</strong>
                    </div>

                    <div>
                      <span className="text-muted">{isHi ? "कुल अवधि: " : "Total Duration: "}</span>
                      <strong className="block font-mono text-sm text-saffron-deep">{eclipse.durationHours}</strong>
                    </div>
                  </div>

                  {/* Timings Strip: Sparsha, Madhya, Moksha, Sutak */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                    <div className="rounded-2xl border border-sand bg-white p-3.5 shadow-2xs">
                      <div className="text-muted font-serif">{isHi ? "स्पर्श (आरम्भ)" : "Sparsha (Contact)"}</div>
                      <div className="mt-1 font-mono text-base font-bold text-ink">{eclipse.sparshaUtc}</div>
                    </div>

                    <div className="rounded-2xl border border-sand bg-white p-3.5 shadow-2xs">
                      <div className="text-muted font-serif">{isHi ? "मध्य (शिखर)" : "Madhya (Maximum Peak)"}</div>
                      <div className="mt-1 font-mono text-base font-bold text-saffron-deep">{eclipse.madhyaUtc}</div>
                    </div>

                    <div className="rounded-2xl border border-sand bg-white p-3.5 shadow-2xs">
                      <div className="text-muted font-serif">{isHi ? "मोक्ष (समाप्ति)" : "Moksha (Release)"}</div>
                      <div className="mt-1 font-mono text-base font-bold text-ink">{eclipse.mokshaUtc}</div>
                    </div>

                    <div
                      className={`rounded-2xl border p-3.5 shadow-2xs ${
                        eclipse.sutakApplicableInIndia
                          ? "border-rose-300 bg-rose-50/50"
                          : "border-sand bg-sand/20"
                      }`}
                    >
                      <div className="flex items-center justify-between font-serif">
                        <span className="text-muted">{isHi ? "सूतक काल समय" : "Sutak Kaal Window"}</span>
                        <span className="text-[10px] font-bold uppercase text-muted">
                          {eclipse.sutakHoursPrior}h {isHi ? "पूर्व" : "Prior"}
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-bold text-ink">
                        {eclipse.sutakStartIst} → {eclipse.sutakEndIst}
                      </div>
                    </div>
                  </div>

                  {/* Visibility Geography */}
                  <div className="flex items-start gap-2 text-xs">
                    <Globe className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-ink">{isHi ? "दृश्यमान क्षेत्र: " : "Visibility Regions: "}</strong>
                      <span className="text-muted">
                        {isHi ? eclipse.visibilityRegionsHi : eclipse.visibilityRegions}
                      </span>
                    </div>
                  </div>

                  {/* Spiritual Significance & Rules */}
                  <div className="rounded-2xl border border-sand bg-sand/20 p-4 space-y-3">
                    <p className="text-xs leading-relaxed text-ink/90">
                      {isHi ? eclipse.spiritualSignificanceHi : eclipse.spiritualSignificance}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-3 pt-2 border-t border-sand/60 text-xs">
                      <div>
                        <strong className="text-ink block mb-1">
                          {isHi ? "गर्भवती महिलाओं के लिए:" : "Pregnant Women Guidelines:"}
                        </strong>
                        <p className="text-muted leading-relaxed">
                          {isHi ? eclipse.guidelines.pregnantWomenHi : eclipse.guidelines.pregnantWomen}
                        </p>
                      </div>

                      <div>
                        <strong className="text-ink block mb-1">
                          {isHi ? "सिद्ध रक्षा मंत्र:" : "Prescribed Japa Mantra:"}
                        </strong>
                        <p className="font-serif font-bold text-saffron-deep">
                          {eclipse.guidelines.mantra}
                        </p>
                      </div>

                      <div>
                        <strong className="text-ink block mb-1">
                          {isHi ? "मोक्ष उपरांत दान:" : "Charity after Moksha Bath:"}
                        </strong>
                        <p className="text-muted leading-relaxed">
                          {isHi ? eclipse.guidelines.daanHi : eclipse.guidelines.daan}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

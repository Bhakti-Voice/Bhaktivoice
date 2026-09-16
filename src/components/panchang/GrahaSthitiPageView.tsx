"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
  Info,
  Sparkles,
  Compass,
} from "lucide-react";
import { getDailyEphemeris } from "@/lib/panchang/ephemeris-engine";
import { DEFAULT_CITY, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "@/components/panchang/CityPickerButton";
import { GrahaSthitiTable } from "@/components/panchang/GrahaSthitiTable";
import { useLocale } from "@/lib/i18n/client";

export function GrahaSthitiPageView() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const [dateStr, setDateStr] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [city, setCity] = useState<CityConfig>(DEFAULT_CITY);

  const selectedDate = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  }, [dateStr]);

  const ephemeris = useMemo(() => {
    return getDailyEphemeris(selectedDate, city);
  }, [selectedDate, city]);

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
    <div className="space-y-6">
      {/* Control Bar: Date Selector & City Picker */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sand bg-white/90 p-4 shadow-sm backdrop-blur-sm">
        {/* Date Controls */}
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

        {/* City Selector */}
        <div className="flex items-center gap-3">
          <CityPickerButton city={city} onCityChange={setCity} isHi={isHi} isTe={isTe} />
        </div>
      </div>

      {/* Main Ephemeris Table */}
      <GrahaSthitiTable ephemeris={ephemeris} isHi={isHi} isTe={isTe} />

      {/* Astrological Reference / Legend */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-sand bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span>{isTe ? "వక్రీ గ్రహాలు (Retrograde - R)" : isHi ? "वक्री ग्रह (Retrograde - R)" : "Retrograde Motion (Vakri)"}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {isTe
              ? "భూమికి సాపేక్షంగా విరుద్ధ దిశలో తిరుగుతున్నట్లు కనిపించడం. వైదిక జ్యోతిష్యం ప్రకారం వక్రీ గ్రహాలు చేష్టా బలం కలిగి ఉండి విశేష కర్మ ఫలితాలను ఇస్తాయి."
              : isHi
              ? "पृथ्वी के सापेक्ष विपरीत दिशा में चलने का आभास। ज्योतिषीय मान्यता के अनुसार वक्री ग्रह अत्यधिक बलवान (चेष्टा बली) होकर चेष्टा और पुनरावलोकन का फल देते हैं।"
              : "Apparent backward motion of a planet as viewed from Earth. In Vedic astrology, retrograde planets attain Chesta Bala (motional strength) with intensified karma."}
          </p>
        </div>

        <div className="rounded-2xl border border-sand bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Compass className="h-4 w-4 text-amber-600" />
            <span>{isHi ? "अस्त ग्रह (Combust - Asta)" : "Combustion (Asta)"}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {isHi
              ? "जब कोई ग्रह सूर्य के अत्यंत निकट आ जाता है, तो वह सूर्य के तेज से छिप जाता है जिसे अस्त कहते हैं। अस्त ग्रह के शुभ फल अस्थायी रूप से क्षीण माने जाते हैं।"
              : "When a planet comes within close angular proximity to the Sun, its light is overwhelmed by solar brilliance. Its external worldly significations weaken."}
          </p>
        </div>

        <div className="rounded-2xl border border-sand bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Globe className="h-4 w-4 text-emerald-600" />
            <span>{isHi ? "चित्रापक्ष अयनांश (Lahiri Ayanamsha)" : "Lahiri Ayanamsha"}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {isHi
              ? `भारत सरकार के पंचांग सुधार समिति द्वारा स्वीकृत मानक अयनांश। वर्तमान मान: ${ephemeris.ayanamsaFormatted}। निरयण (Sidereal) गणनाओं हेतु पूर्णतः प्रामाणिक।`
              : `The official Nirayana standard ratified by the Calendar Reform Committee of India. Current offset: ${ephemeris.ayanamsaFormatted}. Accurate across all centuries.`}
          </p>
        </div>
      </div>
    </div>
  );
}

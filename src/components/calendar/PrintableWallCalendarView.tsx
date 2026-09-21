"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Printer,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  Globe,
  HelpCircle,
  ChevronRight as ArrowIcon,
} from "lucide-react";
import { CITIES, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { CityPickerButton } from "@/components/panchang/CityPickerButton";
import { getMonthCalendar } from "@/lib/panchang/engine";
import { MONTH_NAMES_EN, MONTH_NAMES_HI } from "@/lib/panchang/names";
import type { CalendarDay, Observance } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";
import { MonthlyFestivalStrip, type FestivalHighlight } from "./MonthlyFestivalStrip";

export type PrintableWallCalendarViewProps = {
  initialYear?: number;
  initialMonth?: number;
  initialCityId?: string;
};

const WEEKDAY_NAMES_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_NAMES_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const WEEKDAY_NAMES_TE = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];

export function PrintableWallCalendarView({
  initialYear,
  initialMonth,
  initialCityId,
}: PrintableWallCalendarViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const today = useMemo(() => new Date(), []);
  // Default to September 2026 as per mockup, or provided initial props
  const defaultYear = initialYear || (today.getFullYear() === 2026 ? 2026 : 2026);
  const defaultMonth = initialMonth || (today.getFullYear() === 2026 ? 9 : 9);
  const defaultCity = getCityById(initialCityId || "delhi");

  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth); // 1-12
  const [city, setCity] = useState<CityConfig>(defaultCity);

  // Compute month calendar data dynamically using Drik Ganita engine
  const monthData = useMemo(() => {
    return getMonthCalendar(year, month, city);
  }, [year, month, city]);

  const monthNameEn = MONTH_NAMES_EN[month - 1];
  const monthNameHi = MONTH_NAMES_HI[month - 1];
  const displayMonthName = isTe
    ? ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"][month - 1]
    : isHi
    ? monthNameHi
    : monthNameEn;

  // Vikram Samvat & Shaka Samvat
  const vikramSamvat = month >= 4 ? year + 57 : year + 56;
  const shakaSamvat = month >= 4 ? year - 78 : year - 79;

  // Filter current month days
  const currentMonthDays = useMemo(() => {
    return monthData.days.filter((d) => d.isCurrentMonth);
  }, [monthData]);

  // Extract major festivals & vrats for the monthly festival strip
  const monthlyFestivals: FestivalHighlight[] = useMemo(() => {
    const list: FestivalHighlight[] = [];
    currentMonthDays.forEach((d) => {
      const weekdayStr = isHi ? WEEKDAY_NAMES_HI[d.weekday] : isTe ? WEEKDAY_NAMES_TE[d.weekday] : WEEKDAY_NAMES_EN[d.weekday];
      const tithiStr = isHi ? d.tithiNameHi : d.tithiName;

      if (d.observances.length > 0) {
        d.observances.forEach((obs: Observance) => {
          list.push({
            day: d.dayNumber,
            weekday: weekdayStr,
            name: isHi ? obs.nameHi || obs.name : obs.name,
            tithi: tithiStr,
            category: obs.category === "ekadashi" ? "ekadashi" : obs.category === "pradosh" ? "pradosh" : obs.category === "purnima" ? "purnima" : obs.category === "amavasya" ? "amavasya" : obs.category === "sankashti" ? "chaturthi" : "festival",
          });
        });
      } else if (d.hasEkadashi) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "एकादशी व्रत" : isTe ? "ఏకాదశి వ్రతం" : "Ekadashi Vrat",
          tithi: tithiStr,
          category: "ekadashi",
        });
      } else if (d.hasPurnima) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "पूर्णिमा व्रत" : isTe ? "పౌర్ణమి వ్రతం" : "Purnima Vrat",
          tithi: tithiStr,
          category: "purnima",
        });
      } else if (d.hasAmavasya) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "अमावस्या (पितृ तर्पण)" : isTe ? "అమావాస్య (పితృ తర్పణం)" : "Amavasya (Pitru Tarpan)",
          tithi: tithiStr,
          category: "amavasya",
        });
      } else if (d.hasPradosh) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "प्रदोष व्रत" : isTe ? "ప్రదోష వ్రతం" : "Pradosh Vrat",
          tithi: tithiStr,
          category: "pradosh",
        });
      } else if (d.hasSankashti) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "संकष्टी चतुर्थी" : isTe ? "సంకష్ట చతుర్థి" : "Sankashti Chaturthi",
          tithi: tithiStr,
          category: "chaturthi",
        });
      }
    });
    return list;
  }, [currentMonthDays, isHi, isTe]);

  function handlePrevMonth() {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function scrollToSection(id: string) {
    if (typeof document !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const weekHeaders = [
    { en: "Sun", hi: "रविवार", te: "ఆది", isSun: true },
    { en: "Mon", hi: "सोमवार", te: "సోమ", isSun: false },
    { en: "Tue", hi: "मंगलवार", te: "మంగళ", isSun: false },
    { en: "Wed", hi: "बुधवार", te: "బుధ", isSun: false },
    { en: "Thu", hi: "गुरुवार", te: "గురు", isSun: false },
    { en: "Fri", hi: "शुक्रवार", te: "శుక్ర", isSun: false },
    { en: "Sat", hi: "शनिवार", te: "శని", isSun: false },
  ];

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* 1. TOP CONTROL BAR (Hidden during Print) */}
      {/* ========================================================= */}
      <div className="print:hidden rounded-2xl border border-[#ecdac8] bg-white p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Month & Year Navigation + Vikram Samvat Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#ecdac8] bg-white text-stone-700 hover:border-[#d9531e] hover:bg-[#fff7ed] transition shadow-2xs"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="px-3 min-w-[170px] sm:min-w-[200px] text-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#3b1812] tracking-tight">
                {displayMonthName} {year}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#ecdac8] bg-white text-stone-700 hover:border-[#d9531e] hover:bg-[#fff7ed] transition shadow-2xs"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Vikram Samvat Badge */}
          <div className="hidden sm:flex flex-col items-center justify-center rounded-2xl bg-[#fff7ed] border border-[#fed7aa] px-3.5 py-1 text-center shadow-2xs">
            <span className="text-xs font-extrabold text-[#c2410c] tracking-wide">
              VS {vikramSamvat}
            </span>
            <span className="text-[9px] font-semibold text-[#9a3412] -mt-0.5">
              Vikram Samvat
            </span>
          </div>
        </div>

        {/* City Selector Dropdown & Print Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* City Picker Button */}
          <CityPickerButton
            city={city}
            onCityChange={setCity}
            isHi={isHi}
            isTe={isTe}
            variant="default"
            className="rounded-2xl border-[#ecdac8] bg-white shadow-2xs hover:border-[#d9531e]"
          />

          {/* Print Wall Calendar / PDF Button (Matches mockup exactly) */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-2xl bg-[#d9531e] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#b84214] active:scale-95 transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>
              {isTe
                ? "వాల్ క్యాలెండర్ ప్రింట్ / PDF"
                : isHi
                ? "प्रिंट वॉल कैलेंडर / PDF"
                : "Print Wall Calendar / PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN 2-COLUMN LAYOUT: CALENDAR SHEET (LEFT) + GUIDE (RIGHT) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================================================== */}
        {/* LEFT COLUMN: AUTHENTIC HINDU WALL CALENDAR POSTER SHEET */}
        {/* ===================================================== */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="wall-calendar-printable bg-white rounded-3xl border border-[#ecdac8] p-4 sm:p-6 shadow-sm print:p-0 print:border-none print:shadow-none print:rounded-none">
            {/* Poster Header */}
            <div className="border-b border-[#e7d8c6] pb-3 text-center">
              <div className="flex items-center justify-between px-1 sm:px-2">
                {/* Left Header: Ganeshaaya Namah & Samvat */}
                <div className="text-left text-[11px] sm:text-xs text-stone-700 leading-tight">
                  <p className="font-bold text-[#c2410c] text-xs sm:text-sm font-serif">
                    {isHi ? "॥ श्री गणेशाय नमः ॥" : "|| Sri Ganeshaaya Namah ||"}
                  </p>
                  <p className="mt-1">
                    {isHi ? "विक्रम संवत्: " : "Vikram Samvat: "}
                    <span className="font-bold text-stone-900">{vikramSamvat}</span>
                  </p>
                  <p>
                    {isHi ? "शक संवत्: " : "Shaka Samvat: "}
                    <span className="font-bold text-stone-900">{shakaSamvat}</span>
                  </p>
                </div>

                {/* Center Header: Large Month Year Title */}
                <div className="text-center px-2">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-[#3b1812]">
                    {isHi ? `${monthNameHi} ${year}` : `${monthNameEn} ${year}`}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-stone-600 tracking-wide mt-0.5">
                    {isHi
                      ? `सनातन पंचांग एवं हिन्दू दीवार कैलेंडर — ${city.nameHi}`
                      : `Sanatan Panchang & Hindu Wall Calendar — ${city.name}`}
                  </p>
                </div>

                {/* Right Header: BhaktiVoice & City Coordinates */}
                <div className="text-right text-[11px] sm:text-xs text-stone-700 leading-tight">
                  <p className="font-bold text-emerald-800 text-xs sm:text-sm font-serif">
                    BhaktiVoice.com
                  </p>
                  <p className="mt-1">
                    {isHi ? "स्थान: " : "City: "}
                    <span className="font-bold text-stone-900">{isHi ? city.nameHi : city.name}</span>
                  </p>
                  <p className="text-[10px] text-stone-500">
                    {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar Grid Matrix */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse border border-[#e7d8c6] text-center table-fixed min-w-[620px]">
                {/* Weekday Table Headers */}
                <thead>
                  <tr className="bg-gradient-to-r from-[#fef3c7]/60 via-[#ffedd5] to-[#fef3c7]/60 border-b border-[#e7d8c6]">
                    {weekHeaders.map((w, idx) => (
                      <th
                        key={w.en}
                        className={`py-2 px-1 text-xs sm:text-sm font-bold border-r border-[#e7d8c6] last:border-r-0 ${
                          w.isSun ? "bg-[#ffe0b2]/80 text-[#991b1b]" : "text-[#78350f]"
                        }`}
                      >
                        <span className="block font-serif text-sm sm:text-base font-extrabold">
                          {w.en}
                        </span>
                        <span className="block text-[10px] font-medium opacity-85 mt-0.5">
                          {isHi ? w.hi : isTe ? w.te : w.hi}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Calendar Days Matrix */}
                <tbody>
                  {Array.from({ length: Math.ceil(monthData.days.length / 7) }, (_, weekIdx) => {
                    const weekDays = monthData.days.slice(weekIdx * 7, weekIdx * 7 + 7);
                    return (
                      <tr key={weekIdx} className="border-b border-[#e7d8c6] last:border-b-0">
                        {weekDays.map((day: CalendarDay, dIdx: number) => {
                          const isSunday = dIdx === 0;
                          const hasObservance = day.observances.length > 0;

                          // Cell background styling
                          let cellBg = isSunday ? "bg-[#fffdf9]" : "bg-white";
                          if (!day.isCurrentMonth) {
                            cellBg = "bg-stone-50/70 text-stone-300";
                          } else if (day.hasEkadashi) {
                            cellBg = "bg-[#fefce8]/60";
                          } else if (day.hasPurnima) {
                            cellBg = "bg-[#f0f9ff]/50";
                          } else if (day.hasAmavasya) {
                            cellBg = "bg-[#f8fafc]/70";
                          }

                          return (
                            <td
                              key={day.dateString}
                              className={`h-22 sm:h-26 p-1 sm:p-1.5 align-top border-r border-[#e7d8c6] last:border-r-0 relative transition-colors ${cellBg}`}
                            >
                              {/* Top Row: Date Number & Paksha Badge */}
                              <div className="flex items-start justify-between">
                                <span
                                  className={`text-base sm:text-xl font-bold font-serif leading-none ${
                                    !day.isCurrentMonth
                                      ? "text-stone-300 font-normal"
                                      : isSunday
                                      ? "text-[#b91c1c] font-extrabold"
                                      : "text-stone-900"
                                  }`}
                                >
                                  {day.dayNumber}
                                </span>

                                {day.isCurrentMonth && (
                                  <span
                                    className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded-sm ${
                                      day.paksha === "shukla"
                                        ? "bg-amber-100/80 text-amber-900 border border-amber-200/60"
                                        : "bg-stone-100 text-stone-700 border border-stone-200"
                                    }`}
                                  >
                                    {day.paksha === "shukla" ? "Sh" : "Kr"}
                                  </span>
                                )}
                              </div>

                              {/* Interior Tithi & Tags */}
                              {day.isCurrentMonth && (
                                <div className="mt-1 space-y-0.5 text-left">
                                  {/* Tithi Name */}
                                  <p className="text-[10px] sm:text-[11px] font-bold text-[#c2410c] truncate leading-tight">
                                    {isHi ? day.tithiNameHi : day.tithiName}
                                  </p>

                                  {/* Special Tags: Ekadashi */}
                                  {day.hasEkadashi && (
                                    <span className="inline-block rounded-xs bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-1 py-0.2 text-[8.5px] sm:text-[9px] font-bold truncate max-w-full">
                                      {isHi ? "एकादशी" : isTe ? "ఏకాదశి" : "Ekadashi"}
                                    </span>
                                  )}

                                  {/* Special Tags: Purnima */}
                                  {day.hasPurnima && (
                                    <span className="inline-block rounded-xs bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd] px-1 py-0.2 text-[8.5px] sm:text-[9px] font-bold truncate max-w-full">
                                      {isHi ? "पूर्णिमा" : isTe ? "పౌర్ణమి" : "Purnima"}
                                    </span>
                                  )}

                                  {/* Special Tags: Amavasya */}
                                  {day.hasAmavasya && (
                                    <span className="inline-block rounded-xs bg-[#f1f5f9] text-[#334155] border border-[#cbd5e1] px-1 py-0.2 text-[8.5px] sm:text-[9px] font-bold truncate max-w-full">
                                      {isHi ? "अमावस्या" : isTe ? "అమావాస్య" : "Amavasya"}
                                    </span>
                                  )}

                                  {/* Observances and Festivals */}
                                  {hasObservance && (
                                    <div className="space-y-0.5">
                                      {day.observances.slice(0, 2).map((obs: Observance, oIdx: number) => {
                                        const obsName = isHi ? obs.nameHi || obs.name : obs.name;
                                        const isChaturthi = obs.category === "sankashti" || obsName.toLowerCase().includes("chaturthi");
                                        const isPradosh = obs.category === "pradosh" || obsName.toLowerCase().includes("pradosh");
                                        
                                        const tagClass = isChaturthi
                                          ? "bg-[#fce7f3] text-[#9d174d] border-[#fbcfe8]"
                                          : isPradosh
                                          ? "bg-[#ede9fe] text-[#6b21a8] border-[#ddd6fe]"
                                          : "bg-rose-50 text-rose-800 border-rose-200";

                                        return (
                                          <p
                                            key={obs.slug || oIdx}
                                            className={`text-[8.5px] sm:text-[9px] font-bold rounded-xs px-1 py-0.2 truncate border ${tagClass}`}
                                            title={obsName}
                                          >
                                            {obsName}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Legend Strip (Matching Mockup) */}
            <div className="mt-3.5 pt-2.5 border-t border-[#e7d8c6] flex flex-wrap items-center justify-start gap-4 text-[11px] sm:text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200 inline-block" />
                <span>Festival / Vrat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-amber-200 inline-block" />
                <span>Ekadashi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500 ring-2 ring-purple-200 inline-block" />
                <span>Pradosh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-sky-200 inline-block" />
                <span>Purnima / Amavasya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-stone-300 ring-2 ring-stone-200 inline-block" />
                <span>Other Tithi</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* RIGHT COLUMN: CALENDAR GUIDE & INSPIRATION SIDEBAR */}
        {/* ===================================================== */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5 print:hidden">
          {/* Card 1: Your Calendar Guide */}
          <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#d9531e]">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                  {isTe ? "మీ క్యాలెండర్ గైడ్" : isHi ? "कैलेंडर मार्गदर्शिका" : "Your Calendar Guide"}
                </h3>
                <p className="text-[11px] text-stone-500 -mt-0.5">
                  {isTe ? "మీరు తెలుసుకోవలసిన ప్రతిదీ" : isHi ? "मुख्य बातें एवं आवश्यक नियम" : "Everything you need to know"}
                </p>
              </div>
            </div>

            {/* Interactive Guide Item Links */}
            <div className="mt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => scrollToSection("guide-content")}
                className="w-full text-left p-2.5 rounded-2xl border border-stone-100 bg-[#fffdfa] hover:bg-[#fff7ed] hover:border-[#d9531e]/30 transition group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#d9531e]">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate group-hover:text-[#d9531e] transition-colors">
                      {isTe ? "ఈ క్యాలెండర్‌ను ఎలా వాడాలి" : isHi ? "इस कैलेंडर का उपयोग कैसे करें" : "How to use this calendar"}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      {isTe ? "తిథి, గుర్తులు అర్థం చేసుకోండి" : isHi ? "तिथि, संकेत व नियम समझें" : "Understand tithi, symbols and more"}
                    </p>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-stone-400 group-hover:text-[#d9531e] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full text-left p-2.5 rounded-2xl border border-stone-100 bg-[#fffdfa] hover:bg-[#fff7ed] hover:border-[#d9531e]/30 transition group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#b45309]">
                    <Printer className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate group-hover:text-[#d9531e] transition-colors">
                      {isTe ? "ఉత్తమ ప్రింట్ చిట్కాలు" : isHi ? "उत्तम प्रिंट हेतु सुझाव" : "Print tips for best results"}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      {isTe ? "ఖచ్చితమైన A4 ప్రింట్ పొందండి" : isHi ? "सटीक A4 प्रिंट प्राप्त करें" : "Get the perfect A4 print"}
                    </p>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-stone-400 group-hover:text-[#d9531e] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("guide-content")}
                className="w-full text-left p-2.5 rounded-2xl border border-stone-100 bg-[#fffdfa] hover:bg-[#fff7ed] hover:border-[#d9531e]/30 transition group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate group-hover:text-[#d9531e] transition-colors">
                      {isTe ? "ఏమేమి చేర్చబడింది?" : isHi ? "कैलेंडर में क्या-क्या शामिल है?" : "What's included?"}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      {isTe ? "తిథులు, పండుగలు, వ్రతాలు & మరిన్ని" : isHi ? "तिथियां, व्रत, त्यौहार व मुहर्त" : "Tithis, festivals, vrat dates & more"}
                    </p>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-stone-400 group-hover:text-[#d9531e] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("guide-content")}
                className="w-full text-left p-2.5 rounded-2xl border border-stone-100 bg-[#fffdfa] hover:bg-[#fff7ed] hover:border-[#d9531e]/30 transition group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate group-hover:text-[#d9531e] transition-colors">
                      {isTe ? "నగర & పంచాంగ వివరాలు" : isHi ? "शहर व पंचांग गणना विवरण" : "City & Panchang details"}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      {isTe ? "ఖచ్చితమైన ఖగోళ గణనలు" : isHi ? "सटीक खगोलीय गणित व स्रोत" : "About data, calculations and sources"}
                    </p>
                  </div>
                </div>
                <ArrowIcon className="h-4 w-4 text-stone-400 group-hover:text-[#d9531e] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Inspirational Spiritual Quote Card (Matching Mockup) */}
          <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-b from-[#fffcf8] via-[#fffaf2] to-[#fbf5ea] p-6 text-center shadow-xs relative overflow-hidden">
            <span className="text-4xl font-serif text-[#d97706]/70 leading-none select-none block mb-2">
              “
            </span>
            <p className="font-serif text-sm sm:text-[15px] font-bold italic text-[#4a1815] leading-relaxed">
              {isTe
                ? "క్యాలెండర్ అనేది కేవలం రోజుల జాబితా మాత్రమే కాదు, మీ ఆధ్యాత్మిక ప్రయాణంలో ఒక దివ్య సహచరి."
                : isHi
                ? "एक कैलेंडर केवल दिनों की सूची नहीं, बल्कि आपकी आध्यात्मिक यात्रा का एक पावन साथी है।"
                : "A calendar is not just a list of days, but a companion on your spiritual journey."}
            </p>
            <div className="mt-4 flex items-center justify-center text-[#d97706]/70 text-xs">
              ❖
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAJOR FASTS, VRATS & FESTIVALS STRIP */}
      {/* ========================================================= */}
      <MonthlyFestivalStrip
        monthName={displayMonthName}
        year={year}
        festivals={monthlyFestivals}
        isHi={isHi}
        isTe={isTe}
      />
    </div>
  );
}

"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react";
import { CITIES, type CityConfig } from "@/lib/panchang/cities";
import { MONTH_NAMES_EN, MONTH_NAMES_HI } from "@/lib/panchang/names";
import type { FestivalCategory } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";

export type CalendarHeaderProps = {
  year: number;
  month: number; // 1-12
  city: CityConfig;
  activeCategory: FestivalCategory;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onCityChange: (city: CityConfig) => void;
  onCategoryChange: (cat: FestivalCategory) => void;
  onTodayClick: () => void;
  onPrintClick: () => void;
  onExportIcs: () => void;
  onShare: () => void;
};

const CATEGORIES: { id: FestivalCategory; label: string; labelHi: string; icon?: string }[] = [
  { id: "all", label: "All Days", labelHi: "सभी दिन" },
  { id: "festival", label: "Festivals", labelHi: "पर्व / त्यौहार" },
  { id: "vrat", label: "Vrat & Upvas", labelHi: "व्रत एवं उपवास" },
  { id: "ekadashi", label: "Ekadashi", labelHi: "एकादशी" },
  { id: "purnima", label: "Purnima", labelHi: "पूर्णिमा" },
  { id: "amavasya", label: "Amavasya", labelHi: "अमावस्या" },
  { id: "pradosh", label: "Pradosh", labelHi: "प्रदोष व्रत" },
  { id: "sankashti", label: "Sankashti", labelHi: "संकष्टी चतुर्थी" },
  { id: "sankranti", label: "Sankranti", labelHi: "संक्रांति" },
];

const AVAILABLE_YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

export function CalendarHeader({
  year,
  month,
  city,
  activeCategory,
  onYearChange,
  onMonthChange,
  onCityChange,
  onCategoryChange,
  onTodayClick,
  onPrintClick,
  onExportIcs,
  onShare,
}: CalendarHeaderProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  function handlePrevMonth() {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  }

  function handleNextMonth() {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Top Bar: Navigation, City Selector, Utilities */}
      <div className="flex flex-col gap-3 rounded-2xl border border-saffron/20 bg-gradient-to-r from-cream via-ivory to-cream p-3 shadow-xs sm:rounded-3xl sm:p-5 md:flex-row md:items-center md:justify-between lg:p-6">
        
        {/* Navigation Row (Month/Year dropdowns + Prev/Next + Today) */}
        <div className="flex w-full min-w-0 items-center justify-between gap-1.5 sm:gap-2 md:w-auto">
          {/* Previous Month */}
          <button
            onClick={handlePrevMonth}
            aria-label={isHi ? "पिछला महीना" : "Previous Month"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white/90 text-ink shadow-2xs transition hover:border-saffron hover:bg-saffron/10 hover:text-saffron active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Month & Year Selectors */}
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:flex-initial sm:gap-2">
            {/* Month Dropdown */}
            <select
              value={month}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              aria-label={isHi ? "महीना चुनें" : "Select Month"}
              className="min-w-0 flex-1 truncate rounded-xl border border-line bg-white px-2 py-1.5 font-serif text-sm font-bold text-ink shadow-2xs transition focus:border-saffron focus:outline-hidden sm:flex-initial sm:rounded-2xl sm:px-3 sm:py-2 sm:text-base md:text-lg"
            >
              {MONTH_NAMES_EN.map((name, idx) => (
                <option key={name} value={idx + 1}>
                  {isHi ? `${MONTH_NAMES_HI[idx]} (${name})` : `${name} (${MONTH_NAMES_HI[idx]})`}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              aria-label={isHi ? "वर्ष चुनें" : "Select Year"}
              className="shrink-0 rounded-xl border border-line bg-white px-2 py-1.5 font-serif text-sm font-bold text-ink shadow-2xs transition focus:border-saffron focus:outline-hidden sm:rounded-2xl sm:px-3 sm:py-2 sm:text-base md:text-lg"
            >
              {AVAILABLE_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Next Month */}
          <button
            onClick={handleNextMonth}
            aria-label={isHi ? "अगला महीना" : "Next Month"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white/90 text-ink shadow-2xs transition hover:border-saffron hover:bg-saffron/10 hover:text-saffron active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Today Button */}
          <button
            onClick={onTodayClick}
            className="group flex shrink-0 items-center gap-1.5 rounded-xl border border-saffron/30 bg-saffron/10 px-2.5 py-1.5 text-xs font-semibold text-saffron-deep shadow-2xs transition hover:bg-saffron hover:text-white active:scale-95 sm:rounded-2xl sm:px-3.5 sm:py-2 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{isHi ? "आज" : "Today"}</span>
          </button>
        </div>

        {/* City Selector & Action Utilities */}
        <div className="flex w-full min-w-0 items-center justify-between gap-2 border-t border-line/60 pt-2.5 sm:gap-3 md:w-auto md:border-t-0 md:pt-0">
          {/* Location Selector */}
          <div className="relative min-w-0 flex-1 md:w-52">
            <MapPin className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-saffron sm:left-3 sm:h-4 sm:w-4" />
            <select
              value={city.id}
              onChange={(e) => {
                const selected = CITIES.find((c) => c.id === e.target.value) || CITIES[0];
                onCityChange(selected);
              }}
              aria-label={isHi ? "पंचांग गणना हेतु शहर चुनें" : "Select City for Panchang Calculations"}
              className="w-full truncate rounded-xl border border-line bg-white py-1.5 pl-8 pr-6 text-xs font-medium text-ink shadow-2xs transition focus:border-saffron focus:outline-hidden sm:rounded-2xl sm:py-2 sm:pl-9 sm:pr-8 sm:text-sm"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isHi ? `${c.nameHi} (${c.name})` : `${c.name} (${c.nameHi})`}
                </option>
              ))}
            </select>
          </div>

          {/* Action Icons (Export, Print, Share) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Export / Add to Calendar */}
            <button
              onClick={onExportIcs}
              title={isHi ? "कैलेंडर में जोड़ें (.ics फ़ाइल डाउनलोड करें)" : "Add festivals to Google/Apple Calendar (.ics)"}
              className="flex h-8.5 items-center gap-1 rounded-xl border border-line bg-white/90 px-2.5 text-xs font-medium text-muted transition hover:border-saffron hover:text-ink active:scale-95 shadow-2xs sm:h-9.5 sm:rounded-2xl sm:px-3"
            >
              <Download className="h-3.5 w-3.5 text-saffron sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{isHi ? "एक्सपोर्ट" : "Export"}</span>
            </button>

            {/* Print */}
            <button
              onClick={onPrintClick}
              title={isHi ? "इस महीने का कैलेंडर प्रिंट करें" : "Print this month's Hindu calendar"}
              className="flex h-8.5 items-center gap-1 rounded-xl border border-line bg-white/90 px-2.5 text-xs font-medium text-muted transition hover:border-saffron hover:text-ink active:scale-95 shadow-2xs sm:h-9.5 sm:rounded-2xl sm:px-3"
            >
              <Printer className="h-3.5 w-3.5 text-saffron sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{isHi ? "प्रिंट" : "Print"}</span>
            </button>

            {/* Share */}
            <button
              onClick={onShare}
              title={isHi ? "यह कैलेंडर शेयर करें" : "Share this calendar"}
              className="flex h-8.5 items-center gap-1 rounded-xl border border-line bg-white/90 px-2.5 text-xs font-medium text-muted transition hover:border-saffron hover:text-ink active:scale-95 shadow-2xs sm:h-9.5 sm:rounded-2xl sm:px-3"
            >
              <Share2 className="h-3.5 w-3.5 text-saffron sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{isHi ? "शेयर" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:gap-2">
        <span className="flex shrink-0 items-center gap-1 pl-1 text-[11px] font-semibold uppercase tracking-wider text-muted/80 sm:text-xs">
          <Sparkles className="h-3 w-3 text-saffron sm:h-3.5 sm:w-3.5" /> {isHi ? "फ़िल्टर:" : "Filters:"}
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition sm:px-3.5 sm:py-1.5 ${
                isActive
                  ? "bg-navy text-white shadow-xs"
                  : "border border-line/80 bg-white/80 text-muted hover:border-saffron/50 hover:bg-cream hover:text-ink"
              }`}
            >
              {isHi ? cat.labelHi : cat.label}{" "}
              <span className="text-[10px] opacity-75">
                ({isHi ? cat.label : cat.labelHi})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

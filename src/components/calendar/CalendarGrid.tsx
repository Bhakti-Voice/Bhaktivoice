"use client";

import React from "react";
import type { CalendarDay, FestivalCategory } from "@/lib/panchang/types";
import { MoonPhaseIcon } from "./MoonPhaseIcon";

export type CalendarGridProps = {
  days: CalendarDay[];
  selectedDateString: string;
  activeCategory: FestivalCategory;
  onSelectDay: (day: CalendarDay) => void;
};

const WEEKDAYS = [
  { en: "Sun", hi: "रवि", full: "Sunday" },
  { en: "Mon", hi: "सोम", full: "Monday" },
  { en: "Tue", hi: "मंगल", full: "Tuesday" },
  { en: "Wed", hi: "बुध", full: "Wednesday" },
  { en: "Thu", hi: "गुरु", full: "Thursday" },
  { en: "Fri", hi: "शुक्र", full: "Friday" },
  { en: "Sat", hi: "शनि", full: "Saturday" },
];

export function CalendarGrid({
  days,
  selectedDateString,
  activeCategory,
  onSelectDay,
}: CalendarGridProps) {
  function dayMatchesFilter(day: CalendarDay): boolean {
    if (activeCategory === "all") return true;
    if (activeCategory === "festival") return day.hasMajorFestival;
    if (activeCategory === "vrat") return day.hasVrat;
    if (activeCategory === "ekadashi") return day.hasEkadashi;
    if (activeCategory === "purnima") return day.hasPurnima;
    if (activeCategory === "amavasya") return day.hasAmavasya;
    if (activeCategory === "pradosh") return day.hasPradosh;
    if (activeCategory === "sankashti") return day.hasSankashti;
    if (activeCategory === "sankranti") return day.hasSankranti;
    return true;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
      {/* 7-Column Weekday Header */}
      <div className="grid grid-cols-7 border-b border-line bg-gradient-to-b from-sand/50 to-sand/20 text-center">
        {WEEKDAYS.map((w, idx) => {
          const isWeekend = idx === 0 || idx === 6;
          return (
            <div
              key={w.en}
              className={`py-3 px-1 text-center font-serif text-xs font-semibold sm:text-sm ${
                idx === 0 ? "text-lotus" : isWeekend ? "text-saffron-deep" : "text-ink"
              }`}
            >
              <div>{w.en}</div>
              <div className="text-[10px] font-normal text-muted sm:text-xs">({w.hi})</div>
            </div>
          );
        })}
      </div>

      {/* 7-Column Days Grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-line/60">
        {days.map((day, idx) => {
          const isSelected = day.dateString === selectedDateString;
          const matches = dayMatchesFilter(day);
          const isCurrent = day.isCurrentMonth;
          const isToday = day.isToday;

          return (
            <button
              key={`${day.dateString}-${idx}`}
              onClick={() => onSelectDay(day)}
              type="button"
              className={`group relative flex min-h-[82px] flex-col justify-between p-1 text-left transition sm:min-h-[115px] sm:p-2 lg:min-h-[125px] ${
                !isCurrent ? "bg-sand/30 opacity-40 hover:opacity-75" : "bg-white hover:bg-cream/40"
              } ${
                isSelected
                  ? "z-10 ring-2 ring-saffron ring-inset bg-cream/70 shadow-sm"
                  : ""
              } ${
                isToday && !isSelected
                  ? "bg-amber-50/60 ring-1 ring-amber-400/80"
                  : ""
              } ${
                !matches && activeCategory !== "all" ? "opacity-30" : ""
              }`}
            >
              {/* Top Row: Day Number, Moon Icon, Today Tag */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold sm:h-7 sm:w-7 sm:text-sm ${
                      isToday
                        ? "bg-saffron text-white shadow-xs"
                        : isSelected
                        ? "bg-navy text-white"
                        : day.weekday === 0
                        ? "text-lotus font-bold"
                        : "text-ink"
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {isToday && (
                    <span className="hidden rounded-md bg-amber-100 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 sm:inline-block">
                      Today
                    </span>
                  )}
                </div>

                {/* Moon Phase Icon */}
                <div className="pt-0.5">
                  <MoonPhaseIcon
                    phase={day.moonPhaseIcon}
                    illumination={day.moonIllumination}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  />
                </div>
              </div>

              {/* Middle: Tithi Name */}
              <div className="my-1">
                <p className="line-clamp-1 font-serif text-[11px] font-medium text-muted/90 sm:text-xs">
                  {day.tithiName}
                </p>
                <p className="line-clamp-1 text-[9px] text-muted/70 sm:text-[10px]">
                  {day.paksha === "shukla" ? "शुक्ल" : "कृष्ण"} {day.tithiNameHi}
                </p>
              </div>

              {/* Bottom: Badges / Observance Indicators */}
              <div className="space-y-1">
                {/* Major Festival Badge */}
                {day.observances.slice(0, 2).map((obs, obsIdx) => {
                  const isFest = obs.category === "festival";
                  const isEk = obs.category === "ekadashi";
                  const isPur = obs.category === "purnima";
                  const isAma = obs.category === "amavasya";

                  let badgeColor = "bg-amber-100 text-amber-900 border-amber-300/60";
                  if (isFest) badgeColor = "bg-orange-100 text-orange-950 border-orange-300 font-semibold";
                  if (isEk) badgeColor = "bg-purple-100 text-purple-950 border-purple-300";
                  if (isPur) badgeColor = "bg-yellow-100 text-yellow-950 border-yellow-300";
                  if (isAma) badgeColor = "bg-slate-200 text-slate-900 border-slate-300";

                  return (
                    <div
                      key={`${obs.name}-${obsIdx}`}
                      title={obs.name}
                      className={`truncate rounded-md border px-1 py-0.5 text-[9px] leading-tight sm:text-[10px] ${badgeColor}`}
                    >
                      {obs.name}
                    </div>
                  );
                })}

                {/* Indicator Dots if more observances */}
                {day.observances.length > 2 && (
                  <div className="text-[9px] font-medium text-saffron">
                    +{day.observances.length - 2} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

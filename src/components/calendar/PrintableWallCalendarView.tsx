"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Printer,
  Sparkles,
} from "lucide-react";
import { CITIES, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { getMonthCalendar } from "@/lib/panchang/engine";
import { MONTH_NAMES_EN, MONTH_NAMES_HI } from "@/lib/panchang/names";
import type { CalendarDay, Observance } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";

export type PrintableWallCalendarViewProps = {
  initialYear?: number;
  initialMonth?: number;
  initialCityId?: string;
};

const WEEKDAY_NAMES_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_NAMES_HI = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];

export function PrintableWallCalendarView({
  initialYear,
  initialMonth,
  initialCityId,
}: PrintableWallCalendarViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const today = useMemo(() => new Date(), []);
  const defaultYear = initialYear || today.getFullYear();
  const defaultMonth = initialMonth || today.getMonth() + 1;
  const defaultCity = getCityById(initialCityId);

  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth); // 1-12
  const [city, setCity] = useState<CityConfig>(defaultCity);

  // Compute month calendar data
  const monthData = useMemo(() => {
    return getMonthCalendar(year, month, city);
  }, [year, month, city]);

  const monthNameEn = MONTH_NAMES_EN[month - 1];
  const monthNameHi = MONTH_NAMES_HI[month - 1];

  // Vikram Samvat approximation
  const vikramSamvat = month >= 4 ? year + 57 : year + 56;
  const shakaSamvat = month >= 4 ? year - 78 : year - 79;

  // Filter current month days
  const currentMonthDays = useMemo(() => {
    return monthData.days.filter((d) => d.isCurrentMonth);
  }, [monthData]);

  // Monthly festivals & vrats
  const monthlyFestivals = useMemo(() => {
    const list: { day: number; weekday: string; name: string; tithi: string; isMajor?: boolean }[] = [];
    currentMonthDays.forEach((d) => {
      const weekdayStr = isHi ? WEEKDAY_NAMES_HI[d.weekday] : WEEKDAY_NAMES_EN[d.weekday];
      const tithiStr = isHi ? d.tithiNameHi : d.tithiName;

      if (d.observances.length > 0) {
        d.observances.forEach((obs: Observance) => {
          list.push({
            day: d.dayNumber,
            weekday: weekdayStr,
            name: isHi ? obs.nameHi || obs.name : obs.name,
            tithi: tithiStr,
            isMajor: obs.isMajor,
          });
        });
      } else if (d.hasEkadashi) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "एकादशी व्रत" : "Ekadashi Vrat",
          tithi: tithiStr,
          isMajor: true,
        });
      } else if (d.hasPurnima) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "पूर्णिमा व्रत" : "Purnima Vrat",
          tithi: tithiStr,
          isMajor: true,
        });
      } else if (d.hasAmavasya) {
        list.push({
          day: d.dayNumber,
          weekday: weekdayStr,
          name: isHi ? "दर्श अमावस्या" : "Amavasya",
          tithi: tithiStr,
          isMajor: true,
        });
      }
    });
    return list;
  }, [currentMonthDays, isHi]);

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

  const weekHeaders = isHi
    ? [
        { en: "Sun", hi: "रविवार", short: "रवि" },
        { en: "Mon", hi: "सोमवार", short: "सोम" },
        { en: "Tue", hi: "मंगलवार", short: "मंगल" },
        { en: "Wed", hi: "बुधवार", short: "बुध" },
        { en: "Thu", hi: "गुरुवार", short: "गुरु" },
        { en: "Fri", hi: "शुक्रवार", short: "शुक्र" },
        { en: "Sat", hi: "शनिवार", short: "शनि" },
      ]
    : [
        { en: "Sun", hi: "रविवार", short: "Sun" },
        { en: "Mon", hi: "सोमवार", short: "Mon" },
        { en: "Tue", hi: "मंगलवार", short: "Tue" },
        { en: "Wed", hi: "बुधवार", short: "Wed" },
        { en: "Thu", hi: "गुरुवार", short: "Thu" },
        { en: "Fri", hi: "शुक्रवार", short: "Fri" },
        { en: "Sat", hi: "शनिवार", short: "Sat" },
      ];

  return (
    <div className="space-y-6">
      {/* On-Screen Action Bar (Hidden during Print) */}
      <div className="print:hidden rounded-3xl border border-saffron/25 bg-gradient-to-r from-[#fff9f2] via-white to-[#fff9f2] p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Month & Year Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink hover:border-saffron hover:bg-[#fff7ed] transition shadow-xs"
            title="Previous Month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 px-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-ink">
              {isHi ? `${monthNameHi} ${year}` : `${monthNameEn} ${year}`}
            </span>
            <span className="rounded-full bg-saffron/10 border border-saffron/20 px-2.5 py-0.5 text-xs font-bold text-saffron-deep">
              VS {vikramSamvat}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink hover:border-saffron hover:bg-[#fff7ed] transition shadow-xs"
            title="Next Month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* City Switcher & Print Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3 py-1.5 shadow-xs">
            <MapPin className="h-3.5 w-3.5 text-saffron" />
            <select
              value={city.id}
              onChange={(e) => setCity(getCityById(e.target.value))}
              className="bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isHi ? c.nameHi : c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Direct Print / Save as PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-2xl bg-saffron-deep px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#963806] active:scale-95 transition"
          >
            <Printer className="h-4 w-4" />
            <span>{isHi ? "वॉल कैलेंडर प्रिंट करें / PDF" : "Print Wall Calendar / PDF"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* AUTHENTIC SANATAN PANCHANG PRINTABLE POSTER CONTAINER */}
      {/* ========================================================= */}
      <div className="wall-calendar-printable bg-white rounded-3xl border-2 border-[#b45309] p-4 sm:p-6 shadow-sm print:p-0 print:border-none print:shadow-none print:rounded-none">
        {/* Poster Header */}
        <div className="border-b-2 border-[#b45309] pb-3 text-center">
          <div className="flex items-center justify-between px-2">
            <div className="text-left text-[11px] sm:text-xs text-stone-700">
              <p className="font-bold text-saffron-deep">
                {isHi ? "॥ श्री गणेशाय नमः ॥" : "|| Sri Ganeshaya Namah ||"}
              </p>
              <p>
                {isHi ? "विक्रम संवत्: " : "Vikram Samvat: "}
                <span className="font-bold">{vikramSamvat}</span>
              </p>
              <p>
                {isHi ? "शक संवत्: " : "Shaka Samvat: "}
                <span className="font-bold">{shakaSamvat}</span>
              </p>
            </div>

            <div className="text-center">
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#8a2f05]">
                {isHi ? `${monthNameHi} ${year}` : `${monthNameEn} ${year}`}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-stone-800 tracking-wide mt-0.5">
                {isHi
                  ? `सनातन पंचांग एवं हिन्दू दीवार कैलेंडर — ${city.nameHi}`
                  : `Sanatan Panchang & Hindu Wall Calendar — ${city.name}`}
              </p>
            </div>

            <div className="text-right text-[11px] sm:text-xs text-stone-700">
              <p className="font-bold text-emerald-800">
                {isHi ? "भक्ति वॉइस पंचांग" : "BhaktiVoice.com"}
              </p>
              <p>
                {isHi ? "स्थान: " : "City: "}
                <span className="font-bold">{isHi ? city.nameHi : city.name}</span>
              </p>
              <p className="text-[10px] text-muted">
                {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse border border-[#b45309] text-center table-fixed min-w-[650px]">
            {/* Weekday Table Headers */}
            <thead>
              <tr className="bg-[#fff3e0] text-[#8a2f05] border-b-2 border-[#b45309]">
                {weekHeaders.map((w, idx) => (
                  <th
                    key={w.en}
                    className={`py-2 px-1 text-xs sm:text-sm font-extrabold border-r border-[#b45309] last:border-r-0 ${
                      idx === 0 ? "bg-[#ffe0b2] text-rose-900" : ""
                    }`}
                  >
                    <span className="block text-sm sm:text-base">{w.short}</span>
                    <span className="block text-[10px] font-normal text-stone-600 opacity-90">
                      {isHi ? w.en : w.hi}
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
                  <tr key={weekIdx} className="border-b border-[#b45309] last:border-b-0">
                    {weekDays.map((day: CalendarDay, dIdx: number) => {
                      const isSunday = dIdx === 0;
                      const hasObservance = day.observances.length > 0;

                      let cellBg = isSunday ? "bg-[#fffaf0]" : "bg-white";
                      if (!day.isCurrentMonth) {
                        cellBg = "bg-stone-50/70 text-stone-400";
                      } else if (hasObservance) {
                        cellBg = "bg-[#fff6e6]";
                      }

                      return (
                        <td
                          key={day.dateString}
                          className={`h-24 sm:h-28 p-1 sm:p-1.5 align-top border-r border-[#b45309] last:border-r-0 relative ${cellBg}`}
                        >
                          {/* Top Row: Date & Paksha */}
                          <div className="flex items-start justify-between">
                            <span
                              className={`text-lg sm:text-2xl font-bold font-serif leading-none ${
                                !day.isCurrentMonth
                                  ? "text-stone-400"
                                  : isSunday
                                  ? "text-rose-700 font-extrabold"
                                  : "text-stone-900"
                              }`}
                            >
                              {day.dayNumber}
                            </span>

                            {day.isCurrentMonth && (
                              <span
                                className={`text-[9px] font-bold px-1 rounded ${
                                  day.paksha === "shukla"
                                    ? "bg-amber-100 text-amber-900"
                                    : "bg-stone-200 text-stone-800"
                                }`}
                              >
                                {isHi ? (day.paksha === "shukla" ? "शु" : "कृ") : day.paksha === "shukla" ? "Sh" : "Kr"}
                              </span>
                            )}
                          </div>

                          {day.isCurrentMonth && (
                            <div className="mt-1 space-y-0.5 text-left">
                              {/* Tithi Name */}
                              <p className="text-[10px] sm:text-[11px] font-bold text-saffron-deep truncate leading-tight">
                                {isHi ? day.tithiNameHi : day.tithiName}
                              </p>

                              {/* Special Markers: Ekadashi / Purnima / Amavasya */}
                              {day.hasEkadashi && (
                                <span className="inline-block mt-0.5 rounded bg-purple-100 text-purple-900 px-1 py-0.2 text-[9px] font-bold">
                                  {isHi ? "एकादशी" : "Ekadashi"}
                                </span>
                              )}
                              {day.hasPurnima && (
                                <span className="inline-block mt-0.5 rounded bg-amber-200 text-amber-900 px-1 py-0.2 text-[9px] font-bold">
                                  {isHi ? "पूर्णिमा" : "Purnima"}
                                </span>
                              )}
                              {day.hasAmavasya && (
                                <span className="inline-block mt-0.5 rounded bg-stone-700 text-white px-1 py-0.2 text-[9px] font-bold">
                                  {isHi ? "अमावस्या" : "Amavasya"}
                                </span>
                              )}

                              {/* Major Observances/Festivals */}
                              {hasObservance && (
                                <div className="mt-1">
                                  {day.observances.slice(0, 2).map((obs: Observance, oIdx: number) => (
                                    <p
                                      key={obs.slug || oIdx}
                                      className="text-[9px] font-bold text-rose-800 bg-rose-50 rounded px-1 py-0.2 truncate border border-rose-200"
                                      title={isHi ? obs.nameHi || obs.name : obs.name}
                                    >
                                      {isHi ? obs.nameHi || obs.name : obs.name}
                                    </p>
                                  ))}
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

        {/* Bottom Festival & Vrat List Table (Traditional Wall Calendar Lower Strip) */}
        <div className="mt-4 border-t-2 border-[#b45309] pt-3">
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#8a2f05] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>
              {isHi
                ? `${monthNameHi} ${year} — प्रमुख व्रत, पर्व एवं त्यौहार सूची`
                : `${monthNameEn} ${year} — Major Fasts, Vrats & Festivals`}
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
            {monthlyFestivals.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-1.5 rounded-lg border border-[#eddcc9] bg-[#fffaf5]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-saffron text-white text-[10px] font-bold">
                    {f.day}
                  </span>
                  <span className="font-semibold text-ink truncate text-[11px]">{f.name}</span>
                </div>
                <span className="text-[10px] text-muted shrink-0 ml-1">({f.weekday})</span>
              </div>
            ))}
          </div>

          {/* Bottom Sanatan Footer */}
          <div className="mt-4 pt-2 border-t border-line text-center text-[10px] text-stone-600 flex flex-wrap items-center justify-between">
            <p>
              {isHi
                ? "प्रामाणिक दृक-सिद्ध गणितीय पंचांग · सूर्य-चंद्र की तात्कालिक स्थिति पर आधारित"
                : "Authentic Drik-Siddha Vedic calculations based on exact solar & lunar coordinates."}
            </p>
            <p className="font-bold text-saffron-deep">
              www.BhaktiVoice.com — {isHi ? "सनातन धर्म की पावन वाणी" : "Voice of Sanatana Dharma"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

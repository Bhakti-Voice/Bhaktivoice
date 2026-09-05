"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Info,
  Car,
  Home,
  Building,
  Heart,
  Baby,
  Scissors,
} from "lucide-react";
import type { ShubhMonthCalendar, ShubhDayDetail, ShubhDatesCategory } from "@/lib/panchang/shubh-dates-engine";

interface ShubhDatesCalendarViewProps {
  calendars: ShubhMonthCalendar[];
  category: ShubhDatesCategory;
  locale: string;
  selectedYear: number;
}

const CATEGORY_ICONS: Record<ShubhDatesCategory, any> = {
  "vehicle-purchase": Car,
  "property-purchase": Building,
  "griha-pravesh": Home,
  "vivah-muhurat": Heart,
  naamkaran: Baby,
  mundan: Scissors,
};

export function ShubhDatesCalendarView({
  calendars,
  category,
  locale,
  selectedYear,
}: ShubhDatesCalendarViewProps) {
  const isHi = locale === "hi";
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<ShubhDayDetail | null>(null);

  const activeCalendar = calendars[activeMonthIdx] || calendars[0];
  const IconComponent = CATEGORY_ICONS[category] || Sparkles;

  const weekDayLabels = isHi
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Determine starting weekday offset for the active month (0 = Sun, 1 = Mon...)
  const firstDayWeekday = activeCalendar?.days[0]?.date.getDay() || 0;
  const emptyLeadingDays = Array.from({ length: firstDayWeekday }, (_, i) => i);

  // Total auspicious days in the year
  const totalShubhDaysInYear = calendars.reduce((acc, m) => acc + m.shubhDaysCount, 0);

  return (
    <div className="space-y-8">
      {/* Overview Summary Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/30 dark:to-neutral-900 border border-amber-200/80 dark:border-amber-800/40 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {totalShubhDaysInYear} {isHi ? "शुभ दिन" : "Auspicious Days"}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              {isHi ? `वर्ष ${selectedYear} में कुल सर्वोत्तम मुहूर्त` : `Total Best Muhurat Days in ${selectedYear}`}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/30 dark:to-neutral-900 border border-emerald-200/80 dark:border-emerald-800/40 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
              {activeCalendar.shubhDaysCount} {isHi ? "शुभ दिन" : "Shubh Days"}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              {isHi ? `${activeCalendar.monthNameHi} ${selectedYear} में` : `In ${activeCalendar.monthNameEn} ${selectedYear}`}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 dark:from-purple-950/30 dark:to-neutral-900 border border-purple-200/80 dark:border-purple-800/40 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              12 {isHi ? "महीने" : "Months"}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              {isHi ? "पंचांग आधारित संपूर्ण वार्षिक चक्र" : "Complete Full-Year Panchang Grid"}
            </div>
          </div>
        </div>
      </div>

      {/* Month Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {calendars.map((cal, idx) => {
          const isActive = idx === activeMonthIdx;
          return (
            <button
              key={cal.month}
              onClick={() => {
                setActiveMonthIdx(idx);
                setSelectedDay(null);
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/25 ring-2 ring-amber-500/20"
                  : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-amber-50 dark:hover:bg-neutral-800 hover:text-amber-700"
              }`}
            >
              <span>{isHi ? cal.monthNameHi : cal.monthNameEn}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : cal.shubhDaysCount > 0
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                }`}
              >
                {cal.shubhDaysCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 7-Column Monthly Calendar Grid (Like Drik Panchang) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {isHi
                  ? `${activeCalendar.monthNameHi} ${selectedYear} कैलेंडर`
                  : `${activeCalendar.monthNameEn} ${selectedYear} Calendar`}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {isHi
                  ? "हरे रंग की तिथियाँ शुभ मुहूर्त दर्शाती हैं, किसी भी दिन पर क्लिक करके विवरण देखें"
                  : "Highlighted green dates are auspicious; click any day for deep Vedic breakdown"}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {isHi ? "शुभ" : "Auspicious"}
              </span>
              <span className="flex items-center gap-1.5 text-neutral-400">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                {isHi ? "वर्जित / सामान्य" : "Restricted"}
              </span>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {weekDayLabels.map((w, i) => (
              <div
                key={w}
                className={`py-1.5 ${
                  i === 0 ? "text-rose-600 dark:text-rose-400" : i === 6 ? "text-amber-600" : ""
                }`}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots for start of month */}
            {emptyLeadingDays.map((i) => (
              <div key={`empty-${i}`} className="h-14 rounded-xl bg-neutral-50/50 dark:bg-neutral-950/20" />
            ))}

            {/* Actual Days */}
            {activeCalendar.days.map((day) => {
              const isSelected = selectedDay?.dateString === day.dateString;
              return (
                <button
                  key={day.dateString}
                  onClick={() => setSelectedDay(day)}
                  className={`h-14 p-1 rounded-xl transition-all relative flex flex-col justify-between items-center text-left border ${
                    isSelected
                      ? "ring-2 ring-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40"
                      : day.isAuspicious
                      ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 hover:border-emerald-500 text-emerald-900 dark:text-emerald-100"
                      : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-100 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <div className="w-full flex items-center justify-between px-1">
                    <span className={`text-sm font-bold ${day.isAuspicious ? "text-emerald-700 dark:text-emerald-300 font-extrabold" : ""}`}>
                      {day.dayNumber}
                    </span>
                    {day.isAuspicious && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <div className="w-full text-center truncate px-0.5">
                    <span
                      className={`text-[9px] block truncate font-medium ${
                        day.isAuspicious
                          ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                          : "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {isHi ? day.nakshatraNameHi : day.nakshatraNameEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend Guide */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-neutral-400" />
              {isHi
                ? "प्रत्येक दिन के नीचे नक्षत्र का संक्षिप्त नाम दिया गया है।"
                : "Nakshatra constellation is indicated below each solar date."}
            </span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {isHi ? `गणना मानक: नई दिल्ली समय` : `Standard Base: New Delhi (IST)`}
            </span>
          </div>
        </div>

        {/* Day Detail Inspector / Auspicious Dates Card */}
        <div className="lg:col-span-5 space-y-4">
          {selectedDay ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-md transition-all">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {isHi ? "चयनित तिथि विवरण" : "Selected Date Analysis"}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedDay.dayNumber} {isHi ? activeCalendar.monthNameHi : activeCalendar.monthNameEn} {selectedYear} ({isHi ? selectedDay.weekdayNameHi : selectedDay.weekdayNameEn})
                  </h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    selectedDay.isAuspicious
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  }`}
                >
                  {selectedDay.isAuspicious ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isHi ? "शुभ मुहूर्त" : "Shubh Muhurat"}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      {isHi ? "वर्जित / अशोभन" : "Inauspicious"}
                    </>
                  )}
                </div>
              </div>

              {/* Status Message */}
              <div
                className={`p-3.5 rounded-xl text-sm font-medium mb-4 ${
                  selectedDay.isAuspicious
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/40"
                }`}
              >
                {isHi ? selectedDay.statusMessageHi : selectedDay.statusMessageEn}
              </div>

              {/* Exact Muhurat Window if Auspicious */}
              {selectedDay.isAuspicious && selectedDay.muhuratWindowEn && (
                <div className="mb-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    {isHi ? "श्रेष्ठ समय अवधि (Auspicious Window)" : "Exact Shubh Muhurat Window"}
                  </div>
                  <div className="text-base font-extrabold text-amber-950 dark:text-amber-100">
                    {isHi ? selectedDay.muhuratWindowHi : selectedDay.muhuratWindowEn}
                  </div>
                </div>
              )}

              {/* Reasons if Inauspicious */}
              {!selectedDay.isAuspicious && selectedDay.reasonsInauspiciousEn && (
                <div className="mb-4 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">
                    {isHi ? "शास्त्र सम्मत कारण:" : "Scriptural Reason:"}
                  </span>
                  {isHi ? selectedDay.reasonsInauspiciousHi : selectedDay.reasonsInauspiciousEn}
                </div>
              )}

              {/* Panchang Pillars Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                  <div className="text-neutral-400 font-semibold">{isHi ? "तिथि" : "Tithi"}</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {isHi ? selectedDay.tithiNameHi : selectedDay.tithiNameEn}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                  <div className="text-neutral-400 font-semibold">{isHi ? "नक्षत्र" : "Nakshatra"}</div>
                  <div className="font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {isHi ? selectedDay.nakshatraNameHi : selectedDay.nakshatraNameEn}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {isHi
                    ? `${activeCalendar.monthNameHi} ${selectedYear} के सभी शुभ दिन`
                    : `All Shubh Days in ${activeCalendar.monthNameEn} ${selectedYear}`}
                </h3>
              </div>

              {activeCalendar.days.filter((d) => d.isAuspicious).length === 0 ? (
                <div className="py-8 text-center text-sm text-neutral-500">
                  <Info className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600 mb-2" />
                  {isHi
                    ? "इस माह में शास्त्रीय वर्जनाओं अथवा मलमास के कारण कोई शुभ मुहूर्त उपलब्ध नहीं है।"
                    : "No auspicious dates available this month due to astrological restrictions or solar transit."}
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {activeCalendar.days
                    .filter((d) => d.isAuspicious)
                    .map((d) => (
                      <div
                        key={d.dateString}
                        onClick={() => setSelectedDay(d)}
                        className="p-3.5 rounded-xl border border-emerald-200/70 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40 transition cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm flex items-center gap-2">
                            <span>
                              {d.dayNumber} {isHi ? activeCalendar.monthNameHi : activeCalendar.monthNameEn}
                            </span>
                            <span className="text-xs font-medium text-neutral-500">
                              ({isHi ? d.weekdayNameHi : d.weekdayNameEn})
                            </span>
                          </div>
                          <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium mt-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            {isHi ? d.muhuratWindowHi : d.muhuratWindowEn}
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">
                            {isHi ? d.nakshatraNameHi : d.nakshatraNameEn} • {isHi ? d.tithiNameHi : d.tithiNameEn}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-emerald-600" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Vedic Tip Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                {isHi ? "वैदिक लग्न एवं ताराबल शुद्धि निर्देश" : "Vedic Lagna & Tarabalam Advice"}
              </span>
              {isHi
                ? "शुभ तिथियों में भी जातक की अपनी जन्म राशि के अनुसार चंद्रबलम तथा उस दिन का राहुकाल टालकर कार्य करना सर्वोत्तम सिद्धिदायक होता है।"
                : "Even on an auspicious day, ensure avoidance of Rahu Kala and check your personal Janma Rashi Moon strength before executing the transaction."}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Annual Date Breakdown Table (For SEO & Fast Reference) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {isHi
                ? `वर्ष ${selectedYear} के संपूर्ण शुभ मुहूर्त तिथियों की विस्तृत तालिका`
                : `Complete Full Year ${selectedYear} Auspicious Dates Table`}
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              {isHi
                ? "महीना-दर-महीना शुभ दिनों की सूची, नक्षत्र, तिथि और श्रेष्ठ समयावधि"
                : "Month-by-month table of auspicious dates, nakshatra, tithi, and optimal timing"}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                <th className="py-3 px-4">{isHi ? "दिनांक व वार" : "Date & Day"}</th>
                <th className="py-3 px-4">{isHi ? "शुभ मुहूर्त समय" : "Muhurat Window"}</th>
                <th className="py-3 px-4">{isHi ? "नक्षत्र" : "Nakshatra"}</th>
                <th className="py-3 px-4">{isHi ? "तिथि (पक्ष)" : "Tithi (Paksha)"}</th>
                <th className="py-3 px-4 text-right">{isHi ? "स्थिति" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {calendars.flatMap((cal) =>
                cal.days
                  .filter((d) => d.isAuspicious)
                  .map((d) => (
                    <tr
                      key={d.dateString}
                      className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100">
                        {d.dayNumber} {isHi ? cal.monthNameHi : cal.monthNameEn} {selectedYear}
                        <span className="block text-xs font-normal text-neutral-500">
                          {isHi ? d.weekdayNameHi : d.weekdayNameEn}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                        {isHi ? d.muhuratWindowHi : d.muhuratWindowEn}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                        {isHi ? d.nakshatraNameHi : d.nakshatraNameEn}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                        {isHi ? d.tithiNameHi : d.tithiNameEn}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          {isHi ? "शुभ वेला" : "Auspicious"}
                        </span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

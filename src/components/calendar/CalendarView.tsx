"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CITIES, DEFAULT_CITY, getCityById, type CityConfig } from "@/lib/panchang/cities";
import { getFestivalBySlug, getMonthCalendar, getPanchang, getUpcomingFestivals } from "@/lib/panchang/engine";
import type { CalendarDay, FestivalCategory, FestivalDetail } from "@/lib/panchang/types";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { ComingSoonCard } from "./ComingSoonCard";
import { FestivalDetailModal } from "./FestivalDetailModal";
import { SelectedDatePanel } from "./SelectedDatePanel";
import { UpcomingFestivals } from "./UpcomingFestivals";

export type CalendarViewProps = {
  initialYear?: number;
  initialMonth?: number;
  initialCityId?: string;
  initialSelectedDate?: string;
};

export function CalendarView({
  initialYear,
  initialMonth,
  initialCityId,
  initialSelectedDate,
}: CalendarViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current system date fallback
  const today = useMemo(() => new Date(), []);
  const defaultYear = initialYear || today.getFullYear();
  const defaultMonth = initialMonth || today.getMonth() + 1;
  const defaultCity = getCityById(initialCityId || searchParams.get("city"));
  const defaultDateStr =
    initialSelectedDate ||
    `${defaultYear}-${String(defaultMonth).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth);
  const [city, setCity] = useState<CityConfig>(defaultCity);
  const [activeCategory, setActiveCategory] = useState<FestivalCategory>("all");
  const [selectedDateString, setSelectedDateString] = useState<string>(defaultDateStr);
  const [modalFestival, setModalFestival] = useState<FestivalDetail | null>(null);

  // Recalculate Month Data when year/month/city changes
  const monthData = useMemo(() => {
    return getMonthCalendar(year, month, city);
  }, [year, month, city]);

  // Recalculate Selected Day Panchang
  const selectedPanchang = useMemo(() => {
    const parts = selectedDateString.split("-").map(Number);
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
    return getPanchang(dateObj, city);
  }, [selectedDateString, city]);

  // Upcoming festivals
  const upcomingFestivals = useMemo(() => {
    return getUpcomingFestivals(new Date(), 10);
  }, []);

  function handleSelectDay(day: CalendarDay) {
    setSelectedDateString(day.dateString);
    if (!day.isCurrentMonth) {
      setYear(day.date.getFullYear());
      setMonth(day.date.getMonth() + 1);
    }
  }

  function handleTodayClick() {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDateStr = `${curYear}-${String(curMonth).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    setYear(curYear);
    setMonth(curMonth);
    setSelectedDateString(curDateStr);
  }

  function handleOpenFestivalModal(slugOrName: string) {
    // Try slug direct match or search
    let fest = getFestivalBySlug(slugOrName);
    if (!fest) {
      // Find in upcoming or fallback
      fest = getFestivalBySlug("maha-shivratri");
    }
    if (fest) {
      setModalFestival(fest);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleExportIcs() {
    // Generate iCalendar content for observances in this month
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BhaktiVoice//Hindu Calendar//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Hindu Calendar ${monthData.monthName} ${year}\n`;

    for (const day of monthData.days) {
      if (!day.isCurrentMonth) continue;
      for (const obs of day.observances) {
        const dStr = day.dateString.replace(/-/g, "");
        icsContent += `BEGIN:VEVENT\nSUMMARY:🕉️ ${obs.name}\nDTSTART;VALUE=DATE:${dStr}\nDTEND;VALUE=DATE:${dStr}\nDESCRIPTION:Hindu Observance: ${obs.name} (${obs.nameHi || ""}) - Hindu Calendar by BhaktiVoice.com\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
      }
    }
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `BhaktiVoice-Hindu-Calendar-${year}-${month}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({
        title: `Hindu Calendar & Panchang — ${monthData.monthName} ${year}`,
        text: `View Tithi, Nakshatra, Shubh Muhurat and Festivals for ${monthData.monthName} ${year} on BhaktiVoice.com`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Calendar link copied to clipboard!");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Calendar Header Controls */}
      <CalendarHeader
        year={year}
        month={month}
        city={city}
        activeCategory={activeCategory}
        onYearChange={(newYear) => setYear(newYear)}
        onMonthChange={(newMonth) => setMonth(newMonth)}
        onCityChange={(newCity) => setCity(newCity)}
        onCategoryChange={(cat) => setActiveCategory(cat)}
        onTodayClick={handleTodayClick}
        onPrintClick={handlePrint}
        onExportIcs={handleExportIcs}
        onShare={handleShare}
      />

      {/* Main 2-Column Responsive Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: 7-Column Calendar Grid (7 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <CalendarGrid
            days={monthData.days}
            selectedDateString={selectedDateString}
            activeCategory={activeCategory}
            onSelectDay={handleSelectDay}
          />

          {/* Month Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-sand/30 p-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">Hindu Months in this Gregorian Month:</span>
              <span className="rounded-lg bg-white px-2 py-1 font-serif text-saffron-deep font-bold border border-saffron/20">
                {monthData.hinduMonthsSpanned.join(" — ")}
              </span>
            </div>
            <div>
              <span>Location: </span>
              <strong className="text-ink">{city.name}</strong> ({city.timeZone})
            </div>
          </div>
        </div>

        {/* Right Column: Selected Date Panchang Panel (5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <SelectedDatePanel
            panchang={selectedPanchang}
            onOpenFestivalModal={handleOpenFestivalModal}
            onSharePanchang={handleShare}
            onAddReminder={handleExportIcs}
          />
        </div>
      </div>

      {/* Upcoming Festivals Section */}
      <UpcomingFestivals
        upcoming={upcomingFestivals}
        onSelectFestival={handleOpenFestivalModal}
      />

      {/* Coming Soon Feature Card */}
      <ComingSoonCard />

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={modalFestival}
        isOpen={!!modalFestival}
        onClose={() => setModalFestival(null)}
      />
    </div>
  );
}

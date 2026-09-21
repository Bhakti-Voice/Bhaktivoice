"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { PATHS } from "@/lib/seo/paths";

export interface FestivalHighlight {
  day: number;
  weekday: string;
  name: string;
  tithi: string;
  category?: "ekadashi" | "pradosh" | "purnima" | "amavasya" | "chaturthi" | "festival" | "other";
}

interface MonthlyFestivalStripProps {
  monthName: string;
  year: number;
  festivals: FestivalHighlight[];
  isHi?: boolean;
  isTe?: boolean;
}

export function MonthlyFestivalStrip({
  monthName,
  year,
  festivals,
  isHi = false,
  isTe = false,
}: MonthlyFestivalStripProps) {
  if (!festivals || festivals.length === 0) {
    return null;
  }

  // Get card style theme based on festival category / name
  function getCardTheme(f: FestivalHighlight) {
    const lower = f.name.toLowerCase();
    if (lower.includes("ekadashi") || lower.includes("एकादशी") || lower.includes("ఏకాదశి")) {
      return {
        bg: "bg-[#fffbeb]",
        border: "border-[#fef3c7] hover:border-[#f59e0b]/40",
        badgeBg: "bg-[#fef3c7]",
        badgeText: "text-[#b45309]",
        iconColor: "text-[#d97706]",
        dayBg: "bg-[#fef3c7]",
        dayText: "text-[#92400e]",
      };
    }
    if (lower.includes("amavasya") || lower.includes("अमावस्या") || lower.includes("అమావాస్య") || lower.includes("pitru")) {
      return {
        bg: "bg-[#f0f9ff]",
        border: "border-[#e0f2fe] hover:border-[#0284c7]/40",
        badgeBg: "bg-[#e0f2fe]",
        badgeText: "text-[#0369a1]",
        iconColor: "text-[#0284c7]",
        dayBg: "bg-[#e0f2fe]",
        dayText: "text-[#0369a1]",
      };
    }
    if (lower.includes("purnima") || lower.includes("पूर्णिमा") || lower.includes("పౌర్ణమి") || lower.includes("satyanarayan")) {
      return {
        bg: "bg-[#f0fdf4]",
        border: "border-[#dcfce7] hover:border-[#16a34a]/40",
        badgeBg: "bg-[#dcfce7]",
        badgeText: "text-[#15803d]",
        iconColor: "text-[#16a34a]",
        dayBg: "bg-[#dcfce7]",
        dayText: "text-[#166534]",
      };
    }
    if (lower.includes("pradosh") || lower.includes("प्रदोष") || lower.includes("ప్రదోషం")) {
      return {
        bg: "bg-[#faf5ff]",
        border: "border-[#f3e8ff] hover:border-[#9333ea]/40",
        badgeBg: "bg-[#f3e8ff]",
        badgeText: "text-[#7e22ce]",
        iconColor: "text-[#9333ea]",
        dayBg: "bg-[#f3e8ff]",
        dayText: "text-[#6b21a8]",
      };
    }
    if (lower.includes("chaturthi") || lower.includes("चतुर्थी") || lower.includes("చతుర్థి") || lower.includes("ganesh") || lower.includes("गणेश")) {
      return {
        bg: "bg-[#fff1f2]",
        border: "border-[#ffe4e6] hover:border-[#e11d48]/40",
        badgeBg: "bg-[#ffe4e6]",
        badgeText: "text-[#be123c]",
        iconColor: "text-[#e11d48]",
        dayBg: "bg-[#ffe4e6]",
        dayText: "text-[#9f1239]",
      };
    }
    // Default festive theme
    return {
      bg: "bg-[#fffaf0]",
      border: "border-[#faeade] hover:border-[#ea580c]/40",
      badgeBg: "bg-[#fdede0]",
      badgeText: "text-[#c2410c]",
      iconColor: "text-[#ea580c]",
      dayBg: "bg-[#fed7aa]",
      dayText: "text-[#9a3412]",
    };
  }

  const title = isTe
    ? `${monthName} ${year} — ముఖ్యమైన ఉపవాసాలు, వ్రతాలు & పండుగలు`
    : isHi
    ? `${monthName} ${year} — प्रमुख व्रत, पर्व एवं त्यौहार`
    : `${monthName} ${year} — Major Fasts, Vrats & Festivals`;

  return (
    <section className="mt-8 pt-6 border-t border-[#ecdac8]/80 print:hidden">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="diya">
            🪔
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
            {title}
          </h2>
        </div>

        <Link
          href={PATHS.festivals}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#d9531e] hover:text-[#963806] transition-colors group"
        >
          <span>{isTe ? "అన్ని పండుగలు చూడండి" : isHi ? "सभी त्यौहार देखें" : "View All Festivals"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Horizontal Scroll / Responsive Grid of Festival Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {festivals.slice(0, 7).map((f, idx) => {
          const theme = getCardTheme(f);
          return (
            <div
              key={idx}
              className={`rounded-2xl border ${theme.border} ${theme.bg} p-3 sm:p-3.5 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[96px]`}
            >
              {/* Top Row: Flame Icon + Day Number / Weekday Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className={`flex items-center gap-1 rounded-lg ${theme.badgeBg} px-2 py-0.5`}>
                  <Flame className={`h-3 w-3 ${theme.iconColor}`} />
                  <span className={`text-[10px] sm:text-[11px] font-bold ${theme.badgeText}`}>
                    {f.weekday.slice(0, 3)}
                  </span>
                </div>

                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${theme.dayBg} ${theme.dayText} text-[11px] font-bold font-serif shadow-2xs`}
                >
                  {f.day}
                </span>
              </div>

              {/* Bottom: Festival Name */}
              <div className="min-w-0">
                <p
                  className="font-serif text-xs sm:text-[13px] font-bold text-stone-900 leading-snug line-clamp-2"
                  title={f.name}
                >
                  {f.name}
                </p>
                {f.tithi && (
                  <p className="text-[10px] text-stone-500 truncate mt-0.5 font-medium">
                    {f.tithi}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

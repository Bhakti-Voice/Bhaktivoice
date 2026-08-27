"use client";

import React, { useEffect, useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import {
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Sparkles,
  Timer,
} from "lucide-react";
import type { FestivalDetail } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export type UpcomingFestivalsProps = {
  upcoming: {
    festival: FestivalDetail;
    date: Date;
    dateString: string;
    daysRemaining: number;
  }[];
  onSelectFestival: (slug: string) => void;
};

export function UpcomingFestivals({ upcoming, onSelectFestival }: UpcomingFestivalsProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  const nextFestival = upcoming[0];
  const otherFestivals = upcoming.slice(1);

  // Live countdown for next major festival
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextFestival) return;

    function updateTimer() {
      const targetTime = new Date(`${nextFestival.dateString}T06:00:00+05:30`).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextFestival]);

  if (!nextFestival) return null;

  return (
    <div className="space-y-6">
      {/* Hero Spotlight: Immediate Next Major Festival */}
      <div className="relative overflow-hidden rounded-3xl border border-saffron/30 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 text-white shadow-md sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5" /> {isHi ? "आगामी प्रमुख महापर्व" : "Next Major Festival Spotlight"}
            </div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl lg:text-4xl">
              {isHi ? nextFestival.festival.nameHi : nextFestival.festival.name}
              <span className="ml-2 text-xl font-normal font-devanagari text-white/90">
                ({isHi ? nextFestival.festival.name : nextFestival.festival.nameHi})
              </span>
            </h2>
            <p className="text-xs text-white/90 sm:text-sm">
              {isHi ? nextFestival.festival.shortDescriptionHi : nextFestival.festival.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-white/95">
              <span>📅 {nextFestival.dateString}</span>
              <span>•</span>
              <span>⭐ {isHi ? "मुहूर्त: " : "Muhurat: "} {nextFestival.festival.muhuratTiming}</span>
            </div>
          </div>

          {/* Countdown Clock Block */}
          <div className="flex flex-col items-center rounded-2xl bg-black/20 p-4 backdrop-blur-xs border border-white/20">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/90">
              <Timer className="h-4 w-4" /> {isHi ? "उल्टी गिनती (काउंटडाउन)" : "Countdown"}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <div className="rounded-xl bg-white/10 px-3 py-2 min-w-[55px]">
                <span className="font-serif text-2xl font-bold">{timeLeft.days}</span>
                <span className="block text-[10px] text-white/80 uppercase">{isHi ? "दिन" : "Days"}</span>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 min-w-[55px]">
                <span className="font-serif text-2xl font-bold">{timeLeft.hours}</span>
                <span className="block text-[10px] text-white/80 uppercase">{isHi ? "घंटे" : "Hours"}</span>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 min-w-[55px]">
                <span className="font-serif text-2xl font-bold">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-white/80 uppercase">{isHi ? "मिनट" : "Mins"}</span>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 min-w-[55px]">
                <span className="font-serif text-2xl font-bold">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-white/80 uppercase">{isHi ? "सेकंड" : "Secs"}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectFestival(nextFestival.festival.slug)}
              className="mt-4 w-full rounded-xl bg-white px-4 py-2 text-xs font-bold text-ink shadow-xs transition hover:bg-cream active:scale-95"
            >
              {isHi ? "पूजा विधि एवं कथा देखें →" : "View Puja Vidhi & Katha →"}
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming 10 Festivals & Vrats Grid */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-ink">
              {isHi ? "आगामी व्रत एवं त्यौहार" : "Upcoming Festivals & Vrats"}
            </h3>
            <p className="text-xs text-muted">
              {isHi ? "अपने आगामी धार्मिक अनुष्ठानों व व्रतों की योजना बनाएं" : "Plan your auspicious celebrations and fasts"}
            </p>
          </div>
          <LocaleLink
            href={PATHS.calendar}
            className="flex items-center gap-1 text-xs font-semibold text-saffron hover:underline"
          >
            <span>{isHi ? "सम्पूर्ण कैलेंडर देखें" : "View Full Calendar"}</span>
            <ChevronRight className="h-4 w-4" />
          </LocaleLink>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherFestivals.map((item, idx) => {
            const isFest = item.festival.category === "festival";
            const isEk = item.festival.category === "ekadashi";

            return (
              <button
                key={`${item.festival.slug}-${idx}`}
                onClick={() => onSelectFestival(item.festival.slug)}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-4 text-left shadow-2xs transition hover:border-saffron hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isFest
                          ? "bg-orange-100 text-orange-950"
                          : isEk
                          ? "bg-purple-100 text-purple-950"
                          : "bg-amber-100 text-amber-950"
                      }`}
                    >
                      {item.festival.category}
                    </span>
                    <span className="text-xs font-semibold text-saffron-deep">
                      {isHi ? `${item.daysRemaining} दिन में` : `in ${item.daysRemaining} days`}
                    </span>
                  </div>

                  <h4 className="mt-2 font-serif text-base font-bold text-ink group-hover:text-saffron-deep">
                    {isHi ? item.festival.nameHi : item.festival.name}
                  </h4>
                  <p className="font-serif text-xs text-muted font-devanagari">
                    {isHi ? item.festival.name : item.festival.nameHi}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs text-muted">
                    {isHi ? item.festival.shortDescriptionHi : item.festival.shortDescription}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                  <span className="text-muted">{item.dateString}</span>
                  <span className="font-semibold text-saffron group-hover:underline">
                    {isHi ? "विधि देखें →" : "View Vidhi →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

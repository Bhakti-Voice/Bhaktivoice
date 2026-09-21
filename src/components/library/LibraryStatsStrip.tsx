import React from "react";
import { BookOpen, Users, Globe2, Heart } from "lucide-react";
import type { LibraryStat } from "@/lib/library/library-content";

interface LibraryStatsStripProps {
  stats: LibraryStat[];
  lotusMotto: {
    words: string[];
  };
}

const iconMap = {
  book: BookOpen,
  topics: Users,
  globe: Globe2,
  heart: Heart,
};

export function LibraryStatsStrip({ stats, lotusMotto }: LibraryStatsStripProps) {
  return (
    <section
      aria-label="Library Highlights and Value"
      className="my-10 sm:my-12 overflow-hidden rounded-3xl border border-[#ebdccb] bg-[#fcfaf6] p-6 sm:p-8 shadow-[0_2px_12px_rgba(220,100,30,0.03)]"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* 4 Stat items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1 w-full">
          {stats.map((item, idx) => {
            const Icon = iconMap[item.icon] || BookOpen;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#faece1] text-[#c85a24] border border-[#f3d7c4] shadow-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#2c1810]">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-stone-600 truncate">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side: Lotus Flower + Read Reflect Grow Repeat */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#ecd8c4]/70 lg:pl-10">
          {/* Stylized Lotus Icon SVG */}
          <div className="relative text-[#df8f5f] flex items-center justify-center">
            <svg
              className="w-20 h-16 sm:w-24 sm:h-18 opacity-90 transition-transform duration-500 hover:scale-105"
              viewBox="0 0 100 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Left Petal */}
              <path
                d="M50 58 C38 52 18 42 12 28 C8 18 16 10 24 16 C32 22 42 38 50 58 Z"
                fill="url(#lotus-grad-1)"
                opacity="0.8"
              />
              {/* Outer Right Petal */}
              <path
                d="M50 58 C62 52 82 42 88 28 C92 18 84 10 76 16 C68 22 58 38 50 58 Z"
                fill="url(#lotus-grad-1)"
                opacity="0.8"
              />
              {/* Mid Left Petal */}
              <path
                d="M50 60 C40 50 25 35 28 20 C30 10 40 12 44 22 C47 30 49 46 50 60 Z"
                fill="url(#lotus-grad-2)"
                opacity="0.9"
              />
              {/* Mid Right Petal */}
              <path
                d="M50 60 C60 50 75 35 72 20 C70 10 60 12 56 22 C53 30 51 46 50 60 Z"
                fill="url(#lotus-grad-2)"
                opacity="0.9"
              />
              {/* Center Petal */}
              <path
                d="M50 62 C46 45 42 22 50 6 C58 22 54 45 50 62 Z"
                fill="url(#lotus-grad-center)"
              />
              {/* Lotus Base Calyx */}
              <path
                d="M34 60 C42 65 58 65 66 60 C58 64 42 64 34 60 Z"
                fill="#d97736"
              />
              <defs>
                <linearGradient id="lotus-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5c7a9" />
                  <stop offset="100%" stopColor="#e2834c" />
                </linearGradient>
                <linearGradient id="lotus-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3b893" />
                  <stop offset="100%" stopColor="#db7235" />
                </linearGradient>
                <linearGradient id="lotus-grad-center" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#f7d4bd" />
                  <stop offset="100%" stopColor="#ce6323" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Script / Editorial words + Curved Arrow */}
          <div className="relative flex flex-col justify-center">
            <div className="font-serif italic text-sm sm:text-base font-semibold text-[#5a483f] leading-tight space-y-0.5">
              {lotusMotto.words.map((w, idx) => (
                <div key={idx} className="tracking-wide">
                  {w}
                </div>
              ))}
            </div>

            {/* Delicate curved arrow under motto */}
            <svg
              className="w-14 h-4 text-[#c85a24] mt-1 -ml-1 opacity-75"
              viewBox="0 0 60 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6 C20 18 42 16 54 8" />
              <path d="M48 5 L55 8 L50 13" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

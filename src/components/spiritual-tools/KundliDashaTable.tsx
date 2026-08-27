"use client";

import React from "react";
import type { DashaPeriod } from "@/lib/spiritual-tools/types";
import { useLocale } from "@/lib/i18n/client";
import { Clock, Sparkles } from "lucide-react";

export type KundliDashaTableProps = {
  vimshottari: {
    birthBalancePlanet: string;
    birthBalancePlanetHi: string;
    birthBalanceYears: number;
    periods: DashaPeriod[];
  };
};

export function KundliDashaTable({ vimshottari }: KundliDashaTableProps) {
  const locale = useLocale();
  const isHi = locale === "hi";

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
            {isHi ? "विंशोत्तरी महादशा चक्र" : "Vimshottari Mahadasha Timeline"}
          </h3>
          <p className="text-xs text-muted sm:text-sm">
            {isHi
              ? `जन्म समय दशा शेष: ${vimshottari.birthBalancePlanetHi} (${vimshottari.birthBalanceYears} वर्ष)`
              : `Birth Balance Dasha: ${vimshottari.birthBalancePlanet} (${vimshottari.birthBalanceYears} yrs)`}
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron-deep">
          <Clock className="h-3.5 w-3.5" />
          <span>120 {isHi ? "वर्षीय चक्र" : "Year Cycle"}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-3">
        {vimshottari.periods.map((period, idx) => {
          const isCurrent = period.isCurrent;
          return (
            <div
              key={`${period.planetId}-${idx}`}
              className={`relative flex items-center justify-between rounded-2xl border p-3.5 transition ${
                isCurrent
                  ? "border-saffron bg-saffron/10 ring-1 ring-saffron/40 shadow-xs"
                  : "border-line/70 bg-cream/30 hover:border-line hover:bg-cream/60"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                    isCurrent
                      ? "bg-saffron text-white shadow-xs"
                      : "bg-sand/60 text-ink"
                  }`}
                >
                  {period.planetName.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">
                    {isHi ? `${period.planetNameHi} महादशा` : `${period.planetName} Mahadasha`}
                  </h4>
                  <p className="text-xs text-muted">
                    {period.startYear} – {period.endYear} ({period.durationYears} {isHi ? "वर्ष" : "yrs"})
                  </p>
                </div>
              </div>

              {isCurrent && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <Sparkles className="h-3 w-3" />
                  {isHi ? "वर्तमान" : "Active"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

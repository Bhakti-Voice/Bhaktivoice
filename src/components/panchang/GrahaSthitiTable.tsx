"use client";

import React, { useState } from "react";
import { Compass, Sparkles, Orbit, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { DailyEphemerisReport, PlanetEphemeris } from "@/lib/panchang/ephemeris-engine";

export interface GrahaSthitiTableProps {
  ephemeris: DailyEphemerisReport;
  isHi?: boolean;
  isTe?: boolean;
  className?: string;
  showAllPlanetsDefault?: boolean;
}

export function GrahaSthitiTable({
  ephemeris,
  isHi = false,
  isTe = false,
  className = "",
  showAllPlanetsDefault = false,
}: GrahaSthitiTableProps) {
  const [showOuterPlanets, setShowOuterPlanets] = useState(showAllPlanetsDefault);

  const displayedPlanets = showOuterPlanets
    ? ephemeris.planets
    : ephemeris.planets.filter((p) =>
        ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"].includes(
          p.id
        )
      );

  return (
    <div className={`rounded-3xl border border-line bg-white shadow-xs overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="border-b border-line bg-gradient-to-r from-cream/80 via-ivory to-cream/80 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
            <Orbit className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-ink">
              {isTe ? "దైనందిన గ్రహ స్థితి (Planetary Ephemeris)" : isHi ? "दैनिक ग्रह स्थिति (Planetary Ephemeris)" : "Daily Planetary Ephemeris (Graha Sthiti)"}
            </h3>
            <p className="text-[11px] text-muted">
              {isTe
                ? `అయనాంశం: ${ephemeris.ayanamsaFormatted} • దైనందిన గతి, వక్ర & అస్తంగత స్థితి`
                : isHi
                ? `अयनंश: ${ephemeris.ayanamsaFormatted} • दैनिक गति, वक्र एवं अस्त स्थिति`
                : `Ayanamsa: ${ephemeris.ayanamsaFormatted} • Exact degrees, Vakri (R) & Combust`}
            </p>
          </div>
        </div>

        {/* Filter / Toggle Button */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setShowOuterPlanets(!showOuterPlanets)}
            className="rounded-xl border border-line bg-white px-3 py-1.5 font-medium text-muted hover:border-saffron hover:text-ink transition shadow-2xs"
          >
            {showOuterPlanets
              ? isTe ? "కేవలం నవగ్రహాలు (9 Grahas)" : isHi ? "केवल नवग्रह (9 Grahas)" : "Show 9 Grahas Only"
              : isTe ? "అన్ని గ్రహాలు (+యూరేనస్, నెప్ట్యూన్)" : isHi ? "सभी ग्रह (+अरुण, वरुण, यम)" : "Show Outer Planets (+Uranus, Neptune)"}
          </button>
        </div>
      </div>

      {/* Planetary Positions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-line bg-ivory/60 text-muted font-semibold">
              <th className="py-3 px-4">{isTe ? "గ్రహం (Planet)" : isHi ? "ग्रह (Planet)" : "Planet"}</th>
              <th className="py-3 px-4">{isTe ? "రాశి (Zodiac Sign)" : isHi ? "राशि (Zodiac Sign)" : "Rashi (Sign)"}</th>
              <th className="py-3 px-4 font-mono">{isTe ? "అంశలు (Degrees)" : isHi ? "अंश (Degrees)" : "Degrees in Sign"}</th>
              <th className="py-3 px-4">{isTe ? "నక్షత్రం & పాదం" : isHi ? "नक्षत्र एवं पाद" : "Nakshatra & Pada"}</th>
              <th className="py-3 px-4">{isTe ? "గతి (Speed)" : isHi ? "गति (Speed)" : "Speed (Deg/Day)"}</th>
              <th className="py-3 px-4">{isTe ? "స్థితి (Status)" : isHi ? "स्थिति (Status)" : "Motion & Combustion"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {displayedPlanets.map((p) => {
              const isVakri = p.isRetrograde && p.id !== "rahu" && p.id !== "ketu";
              const isRahuKetu = p.id === "rahu" || p.id === "ketu";

              return (
                <tr key={p.id} className="transition hover:bg-cream/40 bg-white">
                  {/* Planet Name & Symbol */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-saffron w-5 text-center">
                        {p.symbol}
                      </span>
                      <div>
                        <div className="font-bold text-ink">
                          {isHi ? p.nameHi : p.name}
                        </div>
                        <div className="text-[10px] text-muted">
                          {isHi ? p.name : p.nameHi}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Rashi & Lord */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-ink">
                      {isHi ? p.rashiNameHi : p.rashiName}
                    </div>
                    <div className="text-[11px] text-muted">
                      {isHi ? `स्वामी: ${p.rashiLordHi}` : `Lord: ${p.rashiLord}`}
                    </div>
                  </td>

                  {/* Degree DMS */}
                  <td className="py-3 px-4 font-mono font-bold text-amber-900 bg-amber-50/20">
                    {p.degreeInRashiFormatted}
                  </td>

                  {/* Nakshatra & Pada */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-ink">
                      {isHi ? p.nakshatraNameHi : p.nakshatraName}
                    </div>
                    <div className="text-[11px] text-muted">
                      {isHi ? `पाद ${p.pada} • स्वामी: ${p.nakshatraLordHi}` : `Pada ${p.pada} • Lord: ${p.nakshatraLord}`}
                    </div>
                  </td>

                  {/* Daily Speed */}
                  <td className="py-3 px-4 font-mono text-xs">
                    <span className={p.dailySpeed < 0 ? "text-rose-600 font-bold" : "text-emerald-700"}>
                      {p.dailySpeed > 0 ? `+${p.dailySpeed}` : p.dailySpeed}°/d
                    </span>
                  </td>

                  {/* Motion & Combustion Status Badges */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Retrograde Badge */}
                      {isVakri ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                          <span>{isHi ? "वक्र (R)" : "Retrograde (R)"}</span>
                        </span>
                      ) : isRahuKetu ? (
                        <span className="inline-flex items-center rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-800">
                          {isHi ? "वक्री (स्वाभाविक)" : "Retrograde (Mean)"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                          {isHi ? "मार्गी (Direct)" : "Direct"}
                        </span>
                      )}

                      {/* Combustion Badge */}
                      {p.isCombust && (
                        <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                          <AlertTriangle className="h-3 w-3 text-amber-700" />
                          <span>{isHi ? "अस्त (Combust)" : "Combust"}</span>
                        </span>
                      )}

                      {/* Dignity Badge */}
                      {p.dignity !== "neutral" && (
                        <span
                          className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                            p.dignity === "exalted"
                              ? "bg-emerald-100 text-emerald-900 font-bold"
                              : p.dignity === "debilitated"
                              ? "bg-rose-100 text-rose-900 font-bold"
                              : "bg-blue-50 text-blue-900"
                          }`}
                        >
                          {isHi ? p.dignityHi : p.dignity.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="border-t border-line bg-cream/40 px-5 py-2.5 text-[11px] text-muted flex items-center justify-between">
        <span>
          {isHi
            ? "चित्रापक्षीय / लाहिड़ी अयनंश पर आधारित प्रामाणिक द्रिक गणित।"
            : "Computed using high-precision Sidereal Chitrapaksha Lahiri Ephemeris."}
        </span>
        <span className="hidden sm:inline text-saffron font-medium">
          {isHi ? "व = वक्री (Retrograde) • अ = अस्त (Combust)" : "R = Retrograde • Combust = within Solar orb"}
        </span>
      </div>
    </div>
  );
}

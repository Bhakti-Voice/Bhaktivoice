"use client";

import React, { useMemo, useState } from "react";
import type { KundliChart, PlanetPosition } from "@/lib/spiritual-tools/types";
import {
  calculateVargaRashi,
  DIVISIONAL_CHARTS,
  type DivisionalChartId,
} from "@/lib/spiritual-tools/divisional-charts";
import { useLocale } from "@/lib/i18n/client";
import { Moon, Sparkles, Sun } from "lucide-react";

export type KundliChartSvgProps = {
  chart: KundliChart;
  className?: string;
};

export function KundliChartSvg({ chart, className = "" }: KundliChartSvgProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [chartType, setChartType] = useState<"north" | "south" | "east">("north");
  const [chartBase, setChartBase] = useState<"lagna" | "chandra">("lagna");
  const [varga, setVarga] = useState<DivisionalChartId>("D1");

  const planetAbbrEn: Record<string, string> = {
    sun: "Su",
    moon: "Mo",
    mars: "Ma",
    mercury: "Me",
    jupiter: "Ju",
    venus: "Ve",
    saturn: "Sa",
    rahu: "Ra",
    ketu: "Ke",
    lagna: "Asc",
  };

  const planetAbbrHi: Record<string, string> = {
    sun: "सूर्य",
    moon: "चन्द्र",
    mars: "मंगल",
    mercury: "बुध",
    jupiter: "गुरु",
    venus: "शुक्र",
    saturn: "शनि",
    rahu: "राहु",
    ketu: "केतु",
    lagna: "लग्न",
  };

  const rashiNamesEn = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const rashiNamesHi = [
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
  ];

  const getPlanetLabel = (id: string, retro?: boolean) => {
    const base = isHi ? planetAbbrHi[id] || id : planetAbbrEn[id] || id;
    return retro ? `${base}(R)` : base;
  };

  // Compute active Lagna rashi for selected varga
  const activeLagnaRashiIndex = useMemo(() => {
    if (chartBase === "chandra") {
      return calculateVargaRashi(chart.moon.siderealLongitude, varga);
    }
    return calculateVargaRashi(chart.lagna.siderealLongitude, varga);
  }, [chart, chartBase, varga]);

  // Compute active planets in selected varga
  const activePlanets: PlanetPosition[] = useMemo(() => {
    return chart.planets.map((p) => {
      const vargaRashiIndex = calculateVargaRashi(p.siderealLongitude, varga);
      const house = ((vargaRashiIndex - activeLagnaRashiIndex + 12) % 12) + 1;
      return {
        ...p,
        rashiIndex: vargaRashiIndex,
        house,
      };
    });
  }, [chart.planets, activeLagnaRashiIndex, varga]);

  // Map each house's planets
  const housePlanets: Record<number, PlanetPosition[]> = useMemo(() => {
    const map: Record<number, PlanetPosition[]> = {};
    for (let i = 1; i <= 12; i++) {
      map[i] = [];
    }
    activePlanets.forEach((p) => {
      map[p.house]?.push(p);
    });
    return map;
  }, [activePlanets]);

  const house1RashiNum = activeLagnaRashiIndex + 1;
  const getHouseRashiNum = (house: number) => ((house1RashiNum - 1 + house - 1) % 12) + 1;

  const currentVargaMeta = DIVISIONAL_CHARTS.find((d) => d.id === varga) || DIVISIONAL_CHARTS[0];

  return (
    <div className={`flex flex-col items-center rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffbf7] via-white to-[#fff9f2] p-5 shadow-xs sm:p-6 ${className}`}>
      {/* Top Controls Bar */}
      <div className="mb-5 flex flex-col gap-3.5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-ink sm:text-xl flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-saffron" />
              <span>
                {isHi ? currentVargaMeta.nameHi : currentVargaMeta.name}
              </span>
            </h3>
            <p className="text-xs text-muted">
              {isHi ? currentVargaMeta.significationHi : currentVargaMeta.signification}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Lagna vs Chandra Base Toggle */}
            <div className="flex rounded-xl bg-sand/40 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartBase("lagna")}
                className={`rounded-lg px-2.5 py-1 transition flex items-center gap-1 ${
                  chartBase === "lagna"
                    ? "bg-white text-saffron-deep shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Sun className="h-3 w-3" />
                <span>{isHi ? "लग्न" : "Lagna"}</span>
              </button>
              <button
                type="button"
                onClick={() => setChartBase("chandra")}
                className={`rounded-lg px-2.5 py-1 transition flex items-center gap-1 ${
                  chartBase === "chandra"
                    ? "bg-white text-saffron-deep shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Moon className="h-3 w-3" />
                <span>{isHi ? "चन्द्र" : "Chandra"}</span>
              </button>
            </div>

            {/* North vs South vs East Style Switcher */}
            <div className="flex rounded-xl bg-sand/40 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartType("north")}
                className={`rounded-lg px-2 py-1 transition ${
                  chartType === "north"
                    ? "bg-white text-saffron-deep shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                {isHi ? "उत्तर (North)" : "North"}
              </button>
              <button
                type="button"
                onClick={() => setChartType("south")}
                className={`rounded-lg px-2 py-1 transition ${
                  chartType === "south"
                    ? "bg-white text-saffron-deep shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                {isHi ? "दक्षिण (South)" : "South"}
              </button>
              <button
                type="button"
                onClick={() => setChartType("east")}
                className={`rounded-lg px-2 py-1 transition ${
                  chartType === "east"
                    ? "bg-white text-saffron-deep shadow-xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                {isHi ? "पूर्व (East)" : "East"}
              </button>
            </div>
          </div>
        </div>

        {/* Divisional Chart (Varga) Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="font-bold text-muted shrink-0 text-[11px] uppercase tracking-wider mr-1">
            {isHi ? "वर्ग चक्र:" : "Varga Chart:"}
          </span>
          {DIVISIONAL_CHARTS.slice(0, 8).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setVarga(d.id)}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                varga === d.id
                  ? "bg-saffron text-white shadow-xs"
                  : "bg-sand/35 text-ink hover:bg-sand/60"
              }`}
            >
              <span>{d.id}</span>
              <span className="ml-1 text-[10px] opacity-85">({d.sanskritName})</span>
            </button>
          ))}
        </div>
      </div>

      {chartType === "north" ? (
        /* North Indian Diamond Chart SVG */
        <div className="relative w-full max-w-[370px] aspect-square sm:max-w-[440px]">
          <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-sm select-none">
            {/* Outer Box */}
            <rect
              x="12"
              y="12"
              width="376"
              height="376"
              fill="#fffaf3"
              stroke="#b45309"
              strokeWidth="2.5"
              rx="4"
            />

            {/* Subtle inner grid glow */}
            <rect x="18" y="18" width="364" height="364" fill="none" stroke="#fde68a" strokeWidth="0.8" />

            {/* Diagonal Lines */}
            <line x1="12" y1="12" x2="388" y2="388" stroke="#b45309" strokeWidth="1.8" />
            <line x1="12" y1="388" x2="388" y2="12" stroke="#b45309" strokeWidth="1.8" />

            {/* Inner Diamond */}
            <polygon
              points="200,12 388,200 200,388 12,200"
              fill="#fffdfa"
              stroke="#b45309"
              strokeWidth="1.8"
            />

            {/* Center Om Symbol & Varga Label */}
            <text x="200" y="196" textAnchor="middle" className="fill-saffron/25 font-serif text-3xl font-bold select-none pointer-events-none">
              ॐ
            </text>
            <text x="200" y="216" textAnchor="middle" className="fill-saffron-deep font-sans text-xs font-bold select-none pointer-events-none">
              {varga}
            </text>

            {/* House 1 (Top Diamond) */}
            <text x="200" y="62" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(1)}
            </text>
            <text x="200" y="105" textAnchor="middle" className="fill-stone-900 text-[13px] font-bold">
              {[chartBase === "lagna" ? (isHi ? "लग्न" : "Asc") : "", ...(housePlanets[1] || []).map((p) => getPlanetLabel(p.id, p.retrograde))].filter(Boolean).join(" ")}
            </text>

            {/* House 2 (Top Left Triangle) */}
            <text x="135" y="45" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(2)}
            </text>
            <text x="100" y="80" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[2] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 3 (Left Top Triangle) */}
            <text x="45" y="135" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(3)}
            </text>
            <text x="75" y="115" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[3] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 4 (Left Diamond) */}
            <text x="65" y="200" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(4)}
            </text>
            <text x="110" y="205" textAnchor="middle" className="fill-stone-900 text-[13px] font-bold">
              {(housePlanets[4] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 5 (Left Bottom Triangle) */}
            <text x="45" y="265" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(5)}
            </text>
            <text x="75" y="285" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[5] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 6 (Bottom Left Triangle) */}
            <text x="135" y="355" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(6)}
            </text>
            <text x="100" y="325" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[6] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 7 (Bottom Diamond) */}
            <text x="200" y="335" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(7)}
            </text>
            <text x="200" y="295" textAnchor="middle" className="fill-stone-900 text-[13px] font-bold">
              {(housePlanets[7] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 8 (Bottom Right Triangle) */}
            <text x="265" y="355" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(8)}
            </text>
            <text x="300" y="325" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[8] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 9 (Right Bottom Triangle) */}
            <text x="355" y="265" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(9)}
            </text>
            <text x="325" y="285" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[9] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 10 (Right Diamond) */}
            <text x="335" y="200" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(10)}
            </text>
            <text x="290" y="205" textAnchor="middle" className="fill-stone-900 text-[13px] font-bold">
              {(housePlanets[10] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 11 (Right Top Triangle) */}
            <text x="355" y="135" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(11)}
            </text>
            <text x="325" y="115" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[11] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* House 12 (Top Right Triangle) */}
            <text x="265" y="45" textAnchor="middle" className="fill-amber-800 text-[12px] font-bold">
              {getHouseRashiNum(12)}
            </text>
            <text x="300" y="80" textAnchor="middle" className="fill-stone-800 text-[12px] font-bold">
              {(housePlanets[12] || []).map((p) => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>
          </svg>
        </div>
      ) : chartType === "south" ? (
        /* South Indian Grid Chart SVG */
        <div className="relative w-full max-w-[370px] aspect-square sm:max-w-[440px]">
          <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-sm select-none">
            {/* 4x4 Grid with empty center 2x2 */}
            <rect x="12" y="12" width="376" height="376" fill="#fffaf3" stroke="#b45309" strokeWidth="2.5" rx="4" />
            <line x1="106" y1="12" x2="106" y2="388" stroke="#b45309" strokeWidth="1.5" />
            <line x1="200" y1="12" x2="200" y2="106" stroke="#b45309" strokeWidth="1.5" />
            <line x1="200" y1="294" x2="200" y2="388" stroke="#b45309" strokeWidth="1.5" />
            <line x1="294" y1="12" x2="294" y2="388" stroke="#b45309" strokeWidth="1.5" />

            <line x1="12" y1="106" x2="388" y2="106" stroke="#b45309" strokeWidth="1.5" />
            <line x1="12" y1="200" x2="106" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="294" y1="200" x2="388" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="12" y1="294" x2="388" y2="294" stroke="#b45309" strokeWidth="1.5" />

            {/* Center Box */}
            <rect x="106" y="106" width="188" height="188" fill="#fff5ea" />
            <text x="200" y="185" textAnchor="middle" className="fill-saffron-deep font-serif text-base font-bold">
              {varga} {isHi ? currentVargaMeta.nameHi : currentVargaMeta.name}
            </text>
            <text x="200" y="210" textAnchor="middle" className="fill-stone-800 text-xs font-semibold">
              {chartBase === "lagna"
                ? isHi
                  ? `लग्न: ${rashiNamesHi[activeLagnaRashiIndex]}`
                  : `Asc: ${rashiNamesEn[activeLagnaRashiIndex]}`
                : isHi
                ? `चन्द्र: ${rashiNamesHi[activeLagnaRashiIndex]}`
                : `Moon: ${rashiNamesEn[activeLagnaRashiIndex]}`}
            </text>

            {/* Fixed Signs in South Indian System */}
            {/* Box 12: Pisces (Top-Left) */}
            <text x="20" y="30" className="fill-amber-800 text-[10px] font-bold">12 {isHi ? "मीन" : "Pisces"}</text>
            <text x="59" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 11 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 11).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 1: Aries (Top Col 2) */}
            <text x="115" y="30" className="fill-amber-800 text-[10px] font-bold">1 {isHi ? "मेष" : "Aries"}</text>
            <text x="153" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 0 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 0).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 2: Taurus (Top Col 3) */}
            <text x="210" y="30" className="fill-amber-800 text-[10px] font-bold">2 {isHi ? "वृषभ" : "Taurus"}</text>
            <text x="247" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 1 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 1).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 3: Gemini (Top-Right) */}
            <text x="305" y="30" className="fill-amber-800 text-[10px] font-bold">3 {isHi ? "मिथुन" : "Gemini"}</text>
            <text x="341" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 2 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 2).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 4: Cancer (Right Row 2) */}
            <text x="305" y="125" className="fill-amber-800 text-[10px] font-bold">4 {isHi ? "कर्क" : "Cancer"}</text>
            <text x="341" y="160" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 3 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 3).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 5: Leo (Right Row 3) */}
            <text x="305" y="220" className="fill-amber-800 text-[10px] font-bold">5 {isHi ? "सिंह" : "Leo"}</text>
            <text x="341" y="255" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 4 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 4).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 6: Virgo (Bottom-Right) */}
            <text x="305" y="315" className="fill-amber-800 text-[10px] font-bold">6 {isHi ? "कन्या" : "Virgo"}</text>
            <text x="341" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 5 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 5).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 7: Libra (Bottom Col 3) */}
            <text x="210" y="315" className="fill-amber-800 text-[10px] font-bold">7 {isHi ? "तुला" : "Libra"}</text>
            <text x="247" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 6 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 6).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 8: Scorpio (Bottom Col 2) */}
            <text x="115" y="315" className="fill-amber-800 text-[10px] font-bold">8 {isHi ? "वृश्चिक" : "Scorpio"}</text>
            <text x="153" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 7 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 7).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 9: Sagittarius (Bottom-Left) */}
            <text x="20" y="315" className="fill-amber-800 text-[10px] font-bold">9 {isHi ? "धनु" : "Sagittarius"}</text>
            <text x="59" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 8 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 8).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 10: Capricorn (Left Row 3) */}
            <text x="20" y="220" className="fill-amber-800 text-[10px] font-bold">10 {isHi ? "मकर" : "Capricorn"}</text>
            <text x="59" y="255" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 9 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 9).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 11: Aquarius (Left Row 2) */}
            <text x="20" y="125" className="fill-amber-800 text-[10px] font-bold">11 {isHi ? "कुंभ" : "Aquarius"}</text>
            <text x="59" y="160" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 10 && chartBase === "lagna" ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 10).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>
          </svg>
        </div>
      ) : (
        /* East Indian (Bengali / Odia / Assamese) Chart SVG */
        <div className="relative w-full max-w-[370px] aspect-square sm:max-w-[440px]">
          <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-sm select-none">
            {/* Outer Box */}
            <rect x="12" y="12" width="376" height="376" fill="#fffaf3" stroke="#b45309" strokeWidth="2.5" rx="4" />

            {/* Horizontal & Vertical Crosses */}
            <line x1="12" y1="200" x2="388" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="200" y1="12" x2="200" y2="388" stroke="#b45309" strokeWidth="1.5" />

            {/* Corner Cross Diagonals */}
            <line x1="12" y1="12" x2="200" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="388" y1="12" x2="200" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="12" y1="388" x2="200" y2="200" stroke="#b45309" strokeWidth="1.5" />
            <line x1="388" y1="388" x2="200" y2="200" stroke="#b45309" strokeWidth="1.5" />

            {/* Center Label */}
            <circle cx="200" cy="200" r="28" fill="#fff5ea" stroke="#b45309" strokeWidth="1" />
            <text x="200" y="204" textAnchor="middle" className="fill-saffron-deep font-serif text-xs font-bold">
              {varga} East
            </text>

            {/* 12 Fixed Signs of East Indian Chart */}
            {/* 1. Aries (Mesha) - Top Diamond Upper */}
            <text x="200" y="40" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">1 {isHi ? "मेष" : "Aries"}</text>
            <text x="200" y="85" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 0 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 0).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 2. Taurus (Vrishabha) - Top-Left Upper */}
            <text x="75" y="40" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">2 {isHi ? "वृषभ" : "Taurus"}</text>
            <text x="80" y="85" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 1 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 1).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 3. Gemini (Mithuna) - Left-Top */}
            <text x="40" y="145" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">3 {isHi ? "मिथुन" : "Gemini"}</text>
            <text x="65" y="180" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 2 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 2).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 4. Cancer (Karka) - Left-Bottom */}
            <text x="40" y="255" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">4 {isHi ? "कर्क" : "Cancer"}</text>
            <text x="65" y="235" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 3 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 3).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 5. Leo (Simha) - Bottom-Left Lower */}
            <text x="75" y="375" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">5 {isHi ? "सिंह" : "Leo"}</text>
            <text x="80" y="325" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 4 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 4).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 6. Virgo (Kanya) - Bottom Center */}
            <text x="200" y="375" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">6 {isHi ? "कन्या" : "Virgo"}</text>
            <text x="200" y="325" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 5 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 5).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 7. Libra (Tula) - Bottom-Right Lower */}
            <text x="325" y="375" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">7 {isHi ? "तुला" : "Libra"}</text>
            <text x="320" y="325" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 6 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 6).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 8. Scorpio (Vrischika) - Right-Bottom */}
            <text x="360" y="255" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">8 {isHi ? "वृश्चिक" : "Scorpio"}</text>
            <text x="335" y="235" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 7 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 7).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 9. Sagittarius (Dhanu) - Right-Top */}
            <text x="360" y="145" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">9 {isHi ? "धनु" : "Sagittarius"}</text>
            <text x="335" y="180" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 8 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 8).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 10. Capricorn (Makara) - Top-Right Upper */}
            <text x="325" y="40" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold">10 {isHi ? "मकर" : "Capricorn"}</text>
            <text x="320" y="85" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {activeLagnaRashiIndex === 9 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 9).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 11. Aquarius (Kumbha) - Inner Right-Top Diamond */}
            <text x="255" y="145" textAnchor="middle" className="fill-amber-800 text-[10px] font-bold">11 {isHi ? "कुंभ" : "Aquarius"}</text>
            <text x="245" y="170" textAnchor="middle" className="fill-stone-900 text-[11px] font-bold">
              {activeLagnaRashiIndex === 10 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 10).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* 12. Pisces (Meena) - Inner Left-Top Diamond */}
            <text x="145" y="145" textAnchor="middle" className="fill-amber-800 text-[10px] font-bold">12 {isHi ? "मीन" : "Pisces"}</text>
            <text x="155" y="170" textAnchor="middle" className="fill-stone-900 text-[11px] font-bold">
              {activeLagnaRashiIndex === 11 ? "Asc " : ""}{activePlanets.filter(p => p.rashiIndex === 11).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

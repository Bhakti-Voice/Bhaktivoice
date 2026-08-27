"use client";

import React, { useState } from "react";
import type { KundliChart, PlanetPosition } from "@/lib/spiritual-tools/types";
import { useLocale } from "@/lib/i18n/client";
import { Moon, Sparkles, Sun } from "lucide-react";

export type KundliChartSvgProps = {
  chart: KundliChart;
  className?: string;
};

export function KundliChartSvg({ chart, className = "" }: KundliChartSvgProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [chartType, setChartType] = useState<"north" | "south">("north");
  const [chartBase, setChartBase] = useState<"lagna" | "chandra">("lagna");

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

  const getPlanetLabel = (id: string, retro?: boolean) => {
    const base = isHi ? planetAbbrHi[id] || id : planetAbbrEn[id] || id;
    return retro ? `${base}(R)` : base;
  };

  // Base Rashi for House 1 (Lagna vs Chandra)
  const house1RashiIndex = chartBase === "lagna" ? chart.lagna.rashiIndex : chart.moon.rashiIndex;
  const house1RashiNum = house1RashiIndex + 1; // 1 to 12

  // Map each planet's house based on selected base
  const housePlanets: Record<number, PlanetPosition[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }

  chart.planets.forEach((p) => {
    const h = ((p.rashiIndex - house1RashiIndex + 12) % 12) + 1;
    housePlanets[h]?.push(p);
  });

  const getHouseRashiNum = (house: number) => ((house1RashiNum - 1 + house - 1) % 12) + 1;

  return (
    <div className={`flex flex-col items-center rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffbf7] via-white to-[#fff9f2] p-5 shadow-xs sm:p-6 ${className}`}>
      {/* Chart Header & Controls */}
      <div className="mb-4 flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-ink sm:text-xl flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span>
              {chartBase === "lagna"
                ? isHi
                  ? "लग्न कुंडली चक्र (D-1)"
                  : "Lagna Kundli Chart (D-1)"
                : isHi
                ? "चन्द्र कुंडली चक्र"
                : "Chandra Kundli (Moon Chart)"}
            </span>
          </h3>
          <p className="text-xs text-muted">
            {chartBase === "lagna"
              ? isHi
                ? `प्रथम भाव: ${chart.lagna.rashiHi} लग्न`
                : `House 1: ${chart.lagna.rashi} Ascendant`
              : isHi
              ? `प्रथम भाव: ${chart.moon.rashiHi} चन्द्र राशि`
              : `House 1: ${chart.moon.rashi} Moon Sign`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Lagna vs Chandra Toggle */}
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

          {/* North vs South Indian Style Switcher */}
          <div className="flex rounded-xl bg-sand/40 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setChartType("north")}
              className={`rounded-lg px-2.5 py-1 transition ${
                chartType === "north"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {isHi ? "उत्तर" : "North"}
            </button>
            <button
              type="button"
              onClick={() => setChartType("south")}
              className={`rounded-lg px-2.5 py-1 transition ${
                chartType === "south"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {isHi ? "दक्षिण" : "South"}
            </button>
          </div>
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

            {/* Center Om Symbol */}
            <text x="200" y="206" textAnchor="middle" className="fill-saffron/20 font-serif text-3xl font-bold select-none pointer-events-none">
              ॐ
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
      ) : (
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
            <text x="200" y="190" textAnchor="middle" className="fill-saffron-deep font-serif text-base font-bold">
              {chartBase === "lagna" ? (isHi ? "लग्न कुंडली" : "Lagna Kundli") : (isHi ? "चन्द्र कुंडली" : "Chandra Kundli")}
            </text>
            <text x="200" y="215" textAnchor="middle" className="fill-stone-800 text-xs font-semibold">
              {chartBase === "lagna"
                ? isHi
                  ? `लग्न: ${chart.lagna.rashiHi}`
                  : `Asc: ${chart.lagna.rashi}`
                : isHi
                ? `चन्द्र: ${chart.moon.rashiHi}`
                : `Moon: ${chart.moon.rashi}`}
            </text>

            {/* Fixed Signs in South Indian System */}
            {/* Box 12: Pisces (Top-Left) */}
            <text x="20" y="30" className="fill-amber-800 text-[10px] font-bold">12 {isHi ? "मीन" : "Pisces"}</text>
            <text x="59" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 11 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 11).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 1: Aries (Top Col 2) */}
            <text x="115" y="30" className="fill-amber-800 text-[10px] font-bold">1 {isHi ? "मेष" : "Aries"}</text>
            <text x="153" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 0 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 0).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 2: Taurus (Top Col 3) */}
            <text x="210" y="30" className="fill-amber-800 text-[10px] font-bold">2 {isHi ? "वृषभ" : "Taurus"}</text>
            <text x="247" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 1 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 1).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 3: Gemini (Top-Right) */}
            <text x="305" y="30" className="fill-amber-800 text-[10px] font-bold">3 {isHi ? "मिथुन" : "Gemini"}</text>
            <text x="341" y="65" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 2 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 2).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 4: Cancer (Right Row 2) */}
            <text x="305" y="125" className="fill-amber-800 text-[10px] font-bold">4 {isHi ? "कर्क" : "Cancer"}</text>
            <text x="341" y="160" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 3 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 3).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 5: Leo (Right Row 3) */}
            <text x="305" y="220" className="fill-amber-800 text-[10px] font-bold">5 {isHi ? "सिंह" : "Leo"}</text>
            <text x="341" y="255" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 4 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 4).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 6: Virgo (Bottom-Right) */}
            <text x="305" y="315" className="fill-amber-800 text-[10px] font-bold">6 {isHi ? "कन्या" : "Virgo"}</text>
            <text x="341" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 5 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 5).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 7: Libra (Bottom Col 3) */}
            <text x="210" y="315" className="fill-amber-800 text-[10px] font-bold">7 {isHi ? "तुला" : "Libra"}</text>
            <text x="247" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 6 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 6).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 8: Scorpio (Bottom Col 2) */}
            <text x="115" y="315" className="fill-amber-800 text-[10px] font-bold">8 {isHi ? "वृश्चिक" : "Scorpio"}</text>
            <text x="153" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 7 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 7).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 9: Sagittarius (Bottom-Left) */}
            <text x="20" y="315" className="fill-amber-800 text-[10px] font-bold">9 {isHi ? "धनु" : "Sagittarius"}</text>
            <text x="59" y="350" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 8 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 8).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 10: Capricorn (Left Row 3) */}
            <text x="20" y="220" className="fill-amber-800 text-[10px] font-bold">10 {isHi ? "मकर" : "Capricorn"}</text>
            <text x="59" y="255" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 9 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 9).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>

            {/* Box 11: Aquarius (Left Row 2) */}
            <text x="20" y="125" className="fill-amber-800 text-[10px] font-bold">11 {isHi ? "कुंभ" : "Aquarius"}</text>
            <text x="59" y="160" textAnchor="middle" className="fill-stone-900 text-[12px] font-bold">
              {chart.lagna.rashiIndex === 10 && chartBase === "lagna" ? "Asc " : ""}{chart.planets.filter(p => p.rashiIndex === 10).map(p => getPlanetLabel(p.id, p.retrograde)).join(" ")}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

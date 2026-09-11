"use client";

import React, { useMemo, useState } from "react";
import { Award, Compass, Info, ShieldCheck, Sparkles } from "lucide-react";
import type { KundliChart } from "@/lib/spiritual-tools/types";
import { calculateAshtakavarga, type PlanetAshtakaKey } from "@/lib/spiritual-tools/ashtakavarga";
import { useLocale } from "@/lib/i18n/client";

export function AshtakavargaTable({ chart }: { chart: KundliChart }) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [viewMode, setViewMode] = useState<"house" | "rashi">("house");

  const result = useMemo(() => calculateAshtakavarga(chart), [chart]);

  const planets: { key: PlanetAshtakaKey; name: string; nameHi: string; symbol: string }[] = [
    { key: "sun", name: "Sun", nameHi: "सूर्य", symbol: "☉" },
    { key: "moon", name: "Moon", nameHi: "चंद्र", symbol: "☽" },
    { key: "mars", name: "Mars", nameHi: "मंगल", symbol: "♂" },
    { key: "mercury", name: "Mercury", nameHi: "बुध", symbol: "☿" },
    { key: "jupiter", name: "Jupiter", nameHi: "गुरु", symbol: "♃" },
    { key: "venus", name: "Venus", nameHi: "शुक्र", symbol: "♀" },
    { key: "saturn", name: "Saturn", nameHi: "शनि", symbol: "♄" },
  ];

  const rashiNamesEn = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const rashiNamesHi = [
    "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या",
    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
  ];

  // Highest & lowest house
  const sortedHouses = [...result.savByHouse].sort((a, b) => b.totalPoints - a.totalPoints);
  const strongestHouse = sortedHouses[0];
  const weakestHouse = sortedHouses[sortedHouses.length - 1];
  const strongHouseCount = result.savByHouse.filter((h) => h.totalPoints >= 30).length;

  return (
    <div className="rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffcf8] via-white to-[#fff9f3] p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#eddcc9] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
              <Award className="h-4 w-4" />
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              {isHi ? "सर्वाष्टकवर्ग चक्र एवं अंक तालिका" : "Sarvashtakavarga (SAV) Matrix"}
            </h3>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            {isHi
              ? "महर्षि पराशर कृत 337 बिंदुओं की अष्टकवर्ग प्रणाली — प्रत्येक भाव व राशि की वास्तविक शक्ति।"
              : "Maharishi Parashara's classical 337-Bindu planetary strength matrix and transit shield."}
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex rounded-xl bg-sand/40 p-1 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("house")}
            className={`rounded-lg px-3 py-1.5 transition ${
              viewMode === "house" ? "bg-white text-saffron-deep shadow-xs font-bold" : "text-muted hover:text-ink"
            }`}
          >
            {isHi ? "भाव अनुसार (1–12 भाव)" : "By House (1–12 Bhavas)"}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("rashi")}
            className={`rounded-lg px-3 py-1.5 transition ${
              viewMode === "rashi" ? "bg-white text-saffron-deep shadow-xs font-bold" : "text-muted hover:text-ink"
            }`}
          >
            {isHi ? "राशि अनुसार (मेष–मीन)" : "By Sign (Aries–Pisces)"}
          </button>
        </div>
      </div>

      {/* Highlights Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-saffron/20 bg-[#fff5ea] p-3.5 text-center">
          <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
            {isHi ? "कुल अष्टकवर्ग बिंदु" : "Total Bindus"}
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-saffron-deep">
            {result.totalPoints}{" "}
            <span className="text-xs text-muted font-normal">/ 337</span>
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-center">
          <p className="text-[11px] font-medium text-emerald-800 uppercase tracking-wider">
            {isHi ? "सर्वाधिक बली भाव" : "Strongest House"}
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-emerald-700">
            {isHi ? `${strongestHouse.houseNumber}वां भाव` : `House ${strongestHouse.houseNumber}`}{" "}
            <span className="text-xs font-semibold text-emerald-800/80">({strongestHouse.totalPoints} pts)</span>
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3.5 text-center">
          <p className="text-[11px] font-medium text-blue-800 uppercase tracking-wider">
            {isHi ? "उत्तम भाव (≥30 अंक)" : "Auspicious Houses"}
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-blue-700">
            {strongHouseCount}{" "}
            <span className="text-xs text-muted font-normal">/ 12</span>
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 text-center">
          <p className="text-[11px] font-medium text-amber-800 uppercase tracking-wider">
            {isHi ? "साधना योग्य भाव (<28)" : "Needs Care (<28)"}
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-amber-800">
            {isHi ? `${weakestHouse.houseNumber}वां भाव` : `House ${weakestHouse.houseNumber}`}{" "}
            <span className="text-xs text-muted font-normal">({weakestHouse.totalPoints} pts)</span>
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#eddcc9] bg-white shadow-2xs">
        <table className="w-full text-center text-xs">
          <thead>
            <tr className="bg-[#fbf4ea] text-ink border-b border-[#eddcc9]">
              <th className="p-3 text-left font-bold min-w-[110px]">
                {viewMode === "house" ? (isHi ? "भाव / राशि" : "House / Sign") : isHi ? "राशि / भाव" : "Sign / House"}
              </th>
              {planets.map((p) => (
                <th key={p.key} className="p-2.5 font-bold min-w-[42px]">
                  <span className="block text-[10px] text-muted">{p.symbol}</span>
                  <span>{isHi ? p.nameHi : p.name}</span>
                </th>
              ))}
              <th className="p-2.5 font-extrabold text-saffron-deep bg-[#faebd7] min-w-[55px]">
                {isHi ? "कुल SAV" : "SAV Total"}
              </th>
              <th className="p-2.5 font-bold text-muted min-w-[90px]">
                {isHi ? "प्रभाव" : "Strength"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e2d3]">
            {Array.from({ length: 12 }, (_, i) => {
              const houseNum = i + 1;
              const signIdx = viewMode === "house" ? (chart.lagna.rashiIndex + i) % 12 : i;
              const correspondingHouse = viewMode === "house" ? houseNum : ((i - chart.lagna.rashiIndex + 12) % 12) + 1;
              const points = result.savByRashi[signIdx];

              let badgeColor = "bg-stone-100 text-stone-700";
              let label = isHi ? "मध्यम" : "Average";
              if (points >= 30) {
                badgeColor = "bg-emerald-100 text-emerald-800 font-semibold";
                label = isHi ? "उत्तम (बलवान)" : "Strong (Uttama)";
              } else if (points >= 28) {
                badgeColor = "bg-blue-100 text-blue-800 font-medium";
                label = isHi ? "संतुलित" : "Balanced";
              } else {
                badgeColor = "bg-amber-100 text-amber-800 font-medium";
                label = isHi ? "संवेदनशील" : "Needs Sadhana";
              }

              return (
                <tr key={i} className="hover:bg-[#fff9f2] transition-colors">
                  <td className="p-3 text-left font-semibold text-ink">
                    {viewMode === "house" ? (
                      <div>
                        <span className="font-bold text-saffron-deep">
                          {isHi ? `${houseNum}वां भाव` : `House ${houseNum}`}
                        </span>
                        <span className="ml-1.5 text-[11px] text-muted">
                          ({isHi ? rashiNamesHi[signIdx] : rashiNamesEn[signIdx]})
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-bold text-ink">
                          {isHi ? rashiNamesHi[signIdx] : rashiNamesEn[signIdx]}
                        </span>
                        <span className="ml-1.5 text-[11px] text-muted">
                          (H{correspondingHouse})
                        </span>
                      </div>
                    )}
                  </td>
                  {planets.map((p) => {
                    const val = result.bav[p.key][signIdx];
                    return (
                      <td key={p.key} className="p-2.5 font-medium text-stone-800">
                        <span
                          className={`inline-block w-6 py-0.5 rounded ${
                            val >= 5 ? "bg-emerald-50 text-emerald-700 font-bold" : val <= 2 ? "text-amber-800" : ""
                          }`}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}
                  <td className="p-2.5 font-extrabold text-saffron-deep bg-[#fff3e2] text-sm">
                    {points}
                  </td>
                  <td className="p-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] ${badgeColor}`}>
                      {label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#f5e9d9] font-bold text-ink border-t-2 border-[#eddcc9]">
              <td className="p-3 text-left">{isHi ? "कुल ग्रह बिंदु (BAV)" : "Planet Totals"}</td>
              <td className="p-2.5">48</td>
              <td className="p-2.5">49</td>
              <td className="p-2.5">39</td>
              <td className="p-2.5">54</td>
              <td className="p-2.5">56</td>
              <td className="p-2.5">52</td>
              <td className="p-2.5">39</td>
              <td className="p-2.5 text-saffron-deep font-extrabold text-sm">{result.totalPoints}</td>
              <td className="p-2.5 text-[11px] text-muted">{isHi ? "337 बिंदु" : "337 Bindus"}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Classical Vedic Interpretation Guide */}
      <div className="mt-6 rounded-2xl border border-sand bg-[#fffaf5] p-5 text-xs text-muted leading-relaxed">
        <h4 className="font-serif text-sm font-bold text-ink flex items-center gap-1.5 mb-2">
          <Info className="h-4 w-4 text-saffron" />
          <span>{isHi ? "महर्षि पराशर अष्टकवर्ग व्याख्या निर्देशिका" : "How to Read Ashtakavarga (Parashara Treatise)"}</span>
        </h4>
        <div className="grid gap-3 sm:grid-cols-3 mt-3">
          <div className="rounded-xl border border-[#eedcc9] bg-white p-3">
            <p className="font-bold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHi ? "≥ 30 बिंदु: उत्तम ढाल" : "≥ 30 Points: Protective Shield"}</span>
            </p>
            <p className="mt-1 text-[11px]">
              {isHi
                ? "जब कोई भी ग्रह (विशेषकर गुरु या शनि) इस भाव से गोचर करेगा, तो वह बिना किसी बाधा के राजयोग, धन, आरोग्य और उन्नति प्रदान करेगा।"
                : "Planetary transits through houses with 30+ Bindus bestow protective grace, shielding you against adversities and amplifying success."}
            </p>
          </div>
          <div className="rounded-xl border border-[#eedcc9] bg-white p-3">
            <p className="font-bold text-blue-800 flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-blue-600" />
              <span>{isHi ? "28–29 बिंदु: संतुलित कर्म" : "28–29 Points: Neutral & Steady"}</span>
            </p>
            <p className="mt-1 text-[11px]">
              {isHi
                ? "यह अष्टकवर्ग का संतुलित मानक है। यहाँ ग्रह आपके द्वारा किए गए निष्ठावान पुरुषार्थ के अनुरूप निष्पक्ष फल देते हैं।"
                : "Represents the standard cosmic equilibrium (337/12 ≈ 28.08). Hard work and disciplined effort receive fair and stable returns."}
            </p>
          </div>
          <div className="rounded-xl border border-[#eedcc9] bg-white p-3">
            <p className="font-bold text-amber-800 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>{isHi ? "< 28 बिंदु: साधना व सतर्कता" : "< 28 Points: Sadhana Required"}</span>
            </p>
            <p className="mt-1 text-[11px]">
              {isHi
                ? "इस भाव से गोचर के दौरान बड़े वित्तीय या भावनात्मक जोखिम से बचें। नित्य नाम जप, दान एवं शांत चित्त से अनुकूलता बनती है।"
                : "Points below 28 require mindful action during transits. Counterbalance with Naam Jaap, charity, and patient endurance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  Compass,
  Flame,
  LayoutGrid,
  MapPin,
  Moon,
  Printer,
  Share2,
  Sparkles,
  Sun,
  Table,
} from "lucide-react";
import { defaultCity } from "@/lib/spiritual-tools/geo";
import { loadKundliEngine } from "@/lib/spiritual-tools/engine-loader";
import type { BirthPlace, KundliChart } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { BirthDetailsFields } from "./BirthDetailsFields";
import { ToolSection, primaryButtonClassName } from "./ToolUi";
import { KundliChartSvg } from "./KundliChartSvg";
import { ManglikCard } from "./ManglikCard";
import { KundliDashaTable } from "./KundliDashaTable";

export function KundliTool() {
  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.kundli;
  const isHi = locale === "hi";

  const [name, setName] = useState("");
  const [date, setDate] = useState("1995-06-15");
  const [time, setTime] = useState("06:30");
  const [place, setPlace] = useState<BirthPlace>(() => defaultCity());
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState<KundliChart | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"chart" | "planets" | "houses" | "dasha" | "manglik">("chart");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const engine = await loadKundliEngine();
      setChart(
        engine.generateKundli({
          name: name.trim() || (isHi ? "जातक" : "Devotee"),
          date,
          time,
          place,
        }),
      );
      setActiveTab("chart");
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  async function handleShare() {
    if (!chart) return;
    const shareText = isHi
      ? `🕉️ जन्म कुंडली — ${chart.name}\n📍 स्थान: ${chart.place.name}\n📅 जन्म: ${chart.birthDate} ${chart.birthTime}\n\n• लग्न: ${chart.lagna.rashiHi} (${chart.lagna.formattedDegree})\n• चंद्र राशि: ${chart.moon.rashiHi} (${chart.moon.nakshatraHi}, पाद ${chart.moon.pada})\n• सूर्य राशि: ${chart.sun.rashiHi}\n• मांगलिक स्थिति: ${chart.manglik.levelHi}\n\nअपनी 100% सटीक वैदिक जन्म कुंडली BhaktiVoice पर बनाएं: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🕉️ Janam Kundli — ${chart.name}\n📍 Place: ${chart.place.name}\n📅 Birth: ${chart.birthDate} ${chart.birthTime}\n\n• Lagna (Ascendant): ${chart.lagna.rashi} (${chart.lagna.formattedDegree})\n• Moon Sign: ${chart.moon.rashi} (${chart.moon.nakshatra}, Pada ${chart.moon.pada})\n• Sun Sign: ${chart.sun.rashi}\n• Manglik Status: ${chart.manglik.level}\n\nGenerate your free Vedic Janam Kundli on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: isHi ? "जन्म कुंडली — भक्ति वॉइस" : "Janam Kundli — BhaktiVoice",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Form Section */}
      <ToolSection title={copy.formTitle}>
        <form onSubmit={(event) => void onSubmit(event)} className="space-y-6">
          <BirthDetailsFields
            prefix="kundli"
            name={name}
            date={date}
            time={time}
            place={place}
            onNameChange={setName}
            onDateChange={setDate}
            onTimeChange={setTime}
            onPlaceChange={setPlace}
            labels={{
              name: copy.name,
              date: copy.date,
              time: copy.time,
              place: copy.place,
              placeHint: copy.placeHint,
            }}
          />
          <button type="submit" disabled={loading} className={primaryButtonClassName(loading)}>
            {loading ? (
              <>
                <span className="mr-2 inline h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {copy.calculating}
              </>
            ) : (
              copy.submit
            )}
          </button>
        </form>
      </ToolSection>

      {/* Results Dashboard */}
      {chart && (
        <div className="space-y-6">
          {/* Devotional Hero Banner */}
          <div className="flex flex-col gap-4 rounded-3xl border border-saffron/30 bg-gradient-to-r from-[#fff9f2] via-white to-[#fff9f2] p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-saffron-deep">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isHi ? "वैदिक जन्म पत्रिका" : "Vedic Birth Horoscope"}
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  Lahiri Ayanamsa
                </span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
                {chart.name}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted sm:text-sm">
                <span className="flex items-center gap-1 font-medium text-ink/80">
                  <Calendar className="h-3.5 w-3.5 text-saffron" /> {chart.birthDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-ink/80">
                  <Clock className="h-3.5 w-3.5 text-saffron" /> {chart.birthTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-ink/80">
                  <MapPin className="h-3.5 w-3.5 text-saffron" /> {chart.place.name} ({chart.place.latitude.toFixed(1)}°N, {chart.place.longitude.toFixed(1)}°E)
                </span>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-saffron active:scale-95 sm:text-sm"
              >
                <Printer className="h-4 w-4 text-saffron" />
                <span>{isHi ? "प्रिंट पत्रिका" : "Print Kundli"}</span>
              </button>
              <button
                type="button"
                onClick={() => void handleShare()}
                className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-saffron active:scale-95 sm:text-sm"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Share2 className="h-4 w-4 text-saffron" />
                )}
                <span>{copied ? (isHi ? "कॉपी हुआ!" : "Copied!") : (isHi ? "शेयर" : "Share")}</span>
              </button>
            </div>
          </div>

          {/* Vital Astrological Metrics (4 Cards) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Lagna */}
            <div className="rounded-3xl border border-line bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{isHi ? "लग्न (Ascendant)" : "Ascendant"}</span>
                <Compass className="h-4 w-4 text-saffron" />
              </div>
              <p className="mt-2 font-serif text-xl font-bold text-ink">
                {isHi ? chart.lagna.rashiHi : chart.lagna.rashi}
              </p>
              <p className="text-xs font-mono text-muted">{chart.lagna.formattedDegree}</p>
            </div>

            {/* Moon Sign */}
            <div className="rounded-3xl border border-line bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{isHi ? "चन्द्र राशि" : "Moon Sign"}</span>
                <Moon className="h-4 w-4 text-saffron" />
              </div>
              <p className="mt-2 font-serif text-xl font-bold text-ink">
                {isHi ? chart.moon.rashiHi : chart.moon.rashi}
              </p>
              <p className="text-xs font-mono text-muted">{chart.moon.formattedDegree}</p>
            </div>

            {/* Sun Sign */}
            <div className="rounded-3xl border border-line bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{isHi ? "सूर्य राशि" : "Sun Sign"}</span>
                <Sun className="h-4 w-4 text-saffron" />
              </div>
              <p className="mt-2 font-serif text-xl font-bold text-ink">
                {isHi ? chart.sun.rashiHi : chart.sun.rashi}
              </p>
              <p className="text-xs font-mono text-muted">{chart.sun.formattedDegree}</p>
            </div>

            {/* Birth Nakshatra */}
            <div className="rounded-3xl border border-line bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{isHi ? "जन्म नक्षत्र" : "Nakshatra"}</span>
                <Sparkles className="h-4 w-4 text-saffron" />
              </div>
              <p className="mt-2 font-serif text-lg font-bold text-ink truncate sm:text-xl">
                {isHi ? chart.moon.nakshatraHi : chart.moon.nakshatra}
              </p>
              <p className="text-xs font-medium text-saffron-deep">{isHi ? `पाद ${chart.moon.pada}` : `Pada ${chart.moon.pada}`}</p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex overflow-x-auto rounded-2xl border border-line bg-sand/30 p-1.5 gap-1.5 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("chart")}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "chart"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{isHi ? "कुंडली चक्र (Charts)" : "Kundli Charts"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("planets")}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "planets"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>{isHi ? "ग्रह स्पष्ट तालिका" : "Planetary Positions"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("houses")}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "houses"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{isHi ? "द्वादश भाव (12 Houses)" : "12 Houses"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dasha")}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "dasha"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{isHi ? "विंशोत्तरी महादशा" : "Vimshottari Dasha"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("manglik")}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "manglik"
                  ? "bg-white text-saffron-deep shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>{isHi ? "मांगलिक विश्लेषण" : "Manglik Analysis"}</span>
            </button>
          </div>

          {/* Tab 1: Visual Charts & Summary */}
          {activeTab === "chart" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <KundliChartSvg chart={chart} />
              </div>
              <div className="space-y-5 lg:col-span-5">
                <ManglikCard manglik={chart.manglik} />

                {/* Quick Planetary Snapshot */}
                <div className="rounded-3xl border border-line bg-white p-5 shadow-xs">
                  <h3 className="font-serif text-base font-bold text-ink sm:text-lg mb-3">
                    {isHi ? "लग्न एवं राशि स्वामी" : "Ascendant & Moon Lords"}
                  </h3>
                  <dl className="divide-y divide-line/60 text-xs sm:text-sm">
                    <div className="flex justify-between py-2">
                      <dt className="text-muted">{isHi ? "लग्न भाव स्वामी" : "Ascendant Lord"}</dt>
                      <dd className="font-bold text-ink">{chart.houses[0]?.rashiLord}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-muted">{isHi ? "चंद्र राशि स्वामी" : "Moon Sign Lord"}</dt>
                      <dd className="font-bold text-ink">{chart.houses[chart.moon.house - 1]?.rashiLord}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-muted">{isHi ? "जन्म नक्षत्र स्वामी" : "Nakshatra Lord"}</dt>
                      <dd className="font-bold text-ink">{chart.vimshottariDasha.birthBalancePlanet}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-muted">{isHi ? "अयनांश प्रणाली" : "Ayanamsa"}</dt>
                      <dd className="font-semibold text-saffron-deep">Lahiri (23° 47&apos;)</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Planetary Positions Table */}
          {activeTab === "planets" && (
            <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
              <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                {isHi ? "ग्रह स्पष्ट स्थिति तालिका (Graha Spashta)" : "Planetary Positions (Graha Spashta)"}
              </h3>
              <p className="text-xs text-muted mb-4">
                {isHi
                  ? "प्रत्येक ग्रह की राशि, अंश, नक्षत्र, पाद, भाव एवं स्थिति का सम्पूर्ण विवरण।"
                  : "Exact sidereal longitudes, constellations, padas, houses, and dignity for all 9 celestial grahas."}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line bg-sand/30 text-[11px] font-bold uppercase tracking-wider text-muted">
                      <th className="py-3 px-3">{isHi ? "ग्रह" : "Planet"}</th>
                      <th className="py-3 px-3">{isHi ? "राशि" : "Sign (Rashi)"}</th>
                      <th className="py-3 px-3">{isHi ? "अंश (Degree)" : "Degree"}</th>
                      <th className="py-3 px-3">{isHi ? "नक्षत्र (पाद)" : "Nakshatra (Pada)"}</th>
                      <th className="py-3 px-3">{isHi ? "भाव" : "House"}</th>
                      <th className="py-3 px-3">{isHi ? "स्थिति" : "Dignity / Status"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {chart.planets.map((planet) => (
                      <tr key={planet.id} className="hover:bg-cream/40 transition">
                        <td className="py-3 px-3 font-bold text-ink">
                          <span className="mr-1.5 text-saffron font-normal">{planet.symbol}</span>
                          {isHi ? planet.nameHi : planet.name}
                          {planet.retrograde && (
                            <span className="ml-1 text-[10px] font-bold text-rose-600">(R)</span>
                          )}
                          {planet.isCombust && (
                            <span className="ml-1 text-[10px] font-bold text-amber-600">(C)</span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-medium text-ink">
                          {isHi ? planet.rashiHi : planet.rashi}
                        </td>
                        <td className="py-3 px-3 font-mono text-muted">{planet.formattedDegree}</td>
                        <td className="py-3 px-3 text-ink">
                          {isHi ? planet.nakshatraHi : planet.nakshatra}{" "}
                          <span className="text-muted text-xs">({planet.pada})</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-saffron-deep">
                          {isHi ? `${planet.house} भाव` : `House ${planet.house}`}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                              planet.status === "Exalted"
                                ? "bg-emerald-100 text-emerald-800"
                                : planet.status === "Debilitated"
                                ? "bg-rose-100 text-rose-800"
                                : planet.status === "Own Sign"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-sand/40 text-muted"
                            }`}
                          >
                            {isHi ? planet.statusHi : planet.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: 12 Houses */}
          {activeTab === "houses" && (
            <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
              <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                {isHi ? "द्वादश भाव विश्लेषण (12 Houses Breakdown)" : "Twelve Houses (Bhava Breakdown)"}
              </h3>
              <p className="text-xs text-muted mb-5">
                {isHi
                  ? "जीवन के 12 प्रमुख क्षेत्रों में ग्रहों की स्थिति और उनका प्रभाव।"
                  : "Planetary occupants, zodiac signs, lords, and life significations for all 12 houses."}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {chart.houses.map((house) => (
                  <div
                    key={house.houseNumber}
                    className="flex flex-col justify-between rounded-2xl border border-line/80 bg-cream/20 p-4 transition hover:border-saffron/40 hover:bg-cream/50"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-saffron-deep">
                          {isHi ? `${house.houseNumber}वाँ भाव` : `House ${house.houseNumber}`}
                        </span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-ink shadow-2xs">
                          {isHi ? house.rashiHi : house.rashi}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted">
                        {isHi ? `स्वामी: ${house.rashiLordHi}` : `Lord: ${house.rashiLord}`}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-ink/80 line-clamp-2">
                        {isHi ? house.significationHi : house.signification}
                      </p>
                    </div>

                    <div className="mt-3 border-t border-line/60 pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-muted">{isHi ? "विद्यमान ग्रह:" : "Occupants:"}</span>
                      <div className="flex flex-wrap gap-1">
                        {house.planets.length > 0 ? (
                          house.planets.map((p) => (
                            <span
                              key={p.id}
                              className="rounded-md bg-saffron/10 px-1.5 py-0.5 text-[11px] font-bold text-saffron-deep"
                            >
                              {isHi ? p.nameHi : p.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-muted/60 italic">{isHi ? "रिक्त" : "None"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Vimshottari Dasha */}
          {activeTab === "dasha" && (
            <KundliDashaTable vimshottari={chart.vimshottariDasha} />
          )}

          {/* Tab 5: Manglik Analysis */}
          {activeTab === "manglik" && (
            <div className="space-y-6">
              <ManglikCard manglik={chart.manglik} />

              <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                  {isHi ? "मांगलिक दोष शांति उपाय एवं ज्योतिषीय मार्गदर्शन" : "Kuja Dosha Remedies & Astrological Guidance"}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs sm:text-sm text-ink/85 leading-relaxed">
                  <div className="rounded-2xl bg-cream/40 p-4 border border-line/60">
                    <h4 className="font-bold text-saffron-deep mb-1">
                      {isHi ? "1. शिव एवं हनुमान साधना" : "1. Shiva & Hanuman Worship"}
                    </h4>
                    <p>
                      {isHi
                        ? "प्रतिदिन हनुमान चालीसा का पाठ अथवा शिवलिंग पर जलाभिषेक करने से मंगल का प्रभाव शांत होता है।"
                        : "Daily recitation of Hanuman Chalisa or Jalabhishekam on Shivling calms aggressive Mars energy."}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-cream/40 p-4 border border-line/60">
                    <h4 className="font-bold text-saffron-deep mb-1">
                      {isHi ? "2. कुंभ / तुलसी विवाह" : "2. Kumbh / Tulsi Vivah"}
                    </h4>
                    <p>
                      {isHi
                        ? "उच्च मांगलिक दोष की स्थिति में विवाह पूर्व कुंभ अथवा तुलसी विवाह की शास्त्रीय परंपरा है।"
                        : "Classical tradition recommends symbolic Kumbh or Tulsi Vivah before solemnizing marriage in high dosha."}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-cream/40 p-4 border border-line/60">
                    <h4 className="font-bold text-saffron-deep mb-1">
                      {isHi ? "3. परस्पर कुंडली मिलान" : "3. Mutual Kundli Matching"}
                    </h4>
                    <p>
                      {isHi
                        ? "यदि दोनों साथी मांगलिक हों तो यह दोष स्वतः निष्प्रभावी (दोष परिहार) हो जाता है।"
                        : "When both partners are Manglik, the dosha is mutually cancelled and harmonized."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

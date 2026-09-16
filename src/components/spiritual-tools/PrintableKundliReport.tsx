"use client";

import React from "react";
import { Printer, Download, X } from "lucide-react";
import type { KundliChart } from "@/lib/spiritual-tools/types";
import { KundliChartSvg } from "./KundliChartSvg";
import { useLocale } from "@/lib/i18n/client";

export interface PrintableKundliReportProps {
  chart: KundliChart;
  isHi?: boolean;
  onClose?: () => void;
}

export function PrintableKundliReport({
  chart,
  isHi: initialIsHi = false,
  onClose,
}: PrintableKundliReportProps) {
  const locale = useLocale();
  const isTe = locale === "te";
  const isHi = initialIsHi || locale === "hi";
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      {/* Print Trigger & Close Action Header (Hidden in print) */}
      <div className="fixed top-4 right-4 z-60 flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-2xl bg-saffron px-5 py-2.5 font-serif text-sm font-bold text-white shadow-lg transition hover:bg-saffron-deep active:scale-95"
        >
          <Printer className="h-4 w-4" />
          <span>{isTe ? "ప్రింట్ / PDF సేవ్ చేయండి" : isHi ? "प्रिंट / PDF सेव करें" : "Print / Save as PDF"}</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-ink shadow-md transition hover:bg-white active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Printable Paper Canvas (A4 Styled) */}
      <div className="relative my-8 w-full max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-2xl print:m-0 print:w-full print:max-w-none print:p-6 print:shadow-none border border-sand">
        {/* Sacred Vedic Header */}
        <div className="text-center border-b-2 border-saffron/40 pb-4">
          <div className="font-serif text-xl font-bold tracking-wider text-saffron-deep">
            ॥ श्री गणेशाय नमः ॥
          </div>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-ink">
            {isTe ? "వైదిక జన్మ పత్రిక (జన్మ కుండలి)" : isHi ? "वैदिक जन्म पत्रिका (जन्म कुंडली)" : "Vedic Horoscope (Janam Patrika)"}
          </h1>
          <p className="text-xs text-muted">
            {isTe
              ? "చిత్రపక్ష (లాహిరి) అయనాంశ ఆధారిత ప్రామాణిక జన్మ వివరాలు"
              : isHi
              ? "चित्रापक्ष (लाहिरी) अयनांश आधारित प्रामाणिक जन्म विवरण"
              : "Calculated using high-precision Chitrapaksha (Lahiri) Sidereal Ayanamsha"}
          </p>
        </div>

        {/* Janma Vivarana (Birth Details Card) */}
        <div className="mt-6 rounded-2xl border border-sand bg-sand/15 p-4 sm:p-6">
          <div className="font-serif text-sm font-bold uppercase tracking-wider text-saffron-deep mb-3">
            {isTe ? "౧. జాతక జన్మ వివరాలు" : isHi ? "१. जातक जन्म विवरण" : "1. Birth Credentials"}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted">{isTe ? "పేరు: " : isHi ? "जातक नाम: " : "Name: "}</span>
              <strong className="block font-serif text-sm text-ink">{chart.name}</strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "జన్మ తేదీ: " : isHi ? "जन्म दिनांक: " : "Date of Birth: "}</span>
              <strong className="block font-mono text-sm text-ink">{chart.birthDate}</strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "జన్మ సమయం: " : isHi ? "जन्म समय: " : "Time of Birth: "}</span>
              <strong className="block font-mono text-sm text-ink">{chart.birthTime}</strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "జన్మ స్థలం: " : isHi ? "जन्म स्थान: " : "Birth Place: "}</span>
              <strong className="block font-serif text-sm text-ink">{chart.place.name}</strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "లగ్నం: " : isHi ? "लग्न (Ascendant): " : "Ascendant (Lagna): "}</span>
              <strong className="block font-serif text-sm text-saffron-deep">
                {isHi ? chart.lagna.rashiHi : chart.lagna.rashi} ({chart.lagna.formattedDegree})
              </strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "చంద్ర రాశి: " : isHi ? "चंद्र राशि (Moon Sign): " : "Moon Sign (Rashi): "}</span>
              <strong className="block font-serif text-sm text-ink">
                {isHi ? chart.moon.rashiHi : chart.moon.rashi}
              </strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "జన్మ నక్షత్రం: " : isHi ? "जन्म नक्षत्र: " : "Nakshatra: "}</span>
              <strong className="block font-serif text-sm text-ink">
                {isHi ? chart.moon.nakshatraHi : chart.moon.nakshatra} ({isTe ? "పాదం" : isHi ? "पाद" : "Pada"} {chart.moon.pada})
              </strong>
            </div>

            <div>
              <span className="text-muted">{isTe ? "మాంగళిక స్థితి: " : isHi ? "मांगलिक स्थिति: " : "Manglik Status: "}</span>
              <strong
                className={`block font-serif text-sm ${
                  chart.manglik.isManglik ? "text-rose-700" : "text-emerald-700"
                }`}
              >
                {isTe ? (chart.manglik.isManglik ? "కుజ దోషం కలదు" : "దోష రహితం") : isHi ? chart.manglik.levelHi : chart.manglik.level}
              </strong>
            </div>
          </div>
        </div>

        {/* Charts & Ephemeris Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* North Indian Diamond Chart */}
          <div className="rounded-2xl border border-sand bg-white p-4 text-center">
            <div className="font-serif text-xs font-bold text-ink mb-2">
              {isTe ? "లగ్న కుండలి (D-1 జన్మ చక్రం)" : isHi ? "लग्न कुण्डली (D-1 Lagna Chart)" : "Lagna Birth Chart (D-1)"}
            </div>
            <div className="mx-auto max-w-[320px]">
              <KundliChartSvg chart={chart} />
            </div>
          </div>

          {/* Planetary Position Table */}
          <div className="rounded-2xl border border-sand bg-white p-4">
            <div className="font-serif text-xs font-bold text-ink mb-2">
              {isTe ? "గ్రహ స్పష్ట స్థితి (గ్రహాల స్థానాలు)" : isHi ? "ग्रह स्पष्ट स्थिति (Graha Sthiti)" : "Planetary Ephemeris"}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="border-b border-sand bg-sand/30 font-serif text-muted">
                  <tr>
                    <th className="p-1.5">{isTe ? "గ్రహం" : isHi ? "ग्रह" : "Planet"}</th>
                    <th className="p-1.5">{isTe ? "రాశి" : isHi ? "राशि" : "Rashi"}</th>
                    <th className="p-1.5">{isTe ? "డిగ్రీ" : isHi ? "अंश" : "Deg"}</th>
                    <th className="p-1.5">{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}</th>
                    <th className="p-1.5">{isTe ? "అవస్థ" : isHi ? "अवस्था" : "Dignity"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/50">
                  {chart.planets.map((p) => (
                    <tr key={p.id}>
                      <td className="p-1.5 font-bold text-ink flex items-center gap-1">
                        <span>{p.symbol}</span>
                        <span>{isHi ? p.nameHi : p.name}</span>
                        {p.retrograde && <span className="text-purple-700 font-bold">(R)</span>}
                        {p.isCombust && <span className="text-amber-700 font-bold">(A)</span>}
                      </td>
                      <td className="p-1.5 text-ink">{isHi ? p.rashiHi : p.rashi}</td>
                      <td className="p-1.5 font-mono text-muted">{p.formattedDegree}</td>
                      <td className="p-1.5 text-muted">
                        {isHi ? p.nakshatraHi : p.nakshatra} ({p.pada})
                      </td>
                      <td className="p-1.5 text-ink font-medium">
                        {isHi ? p.statusHi : p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Vimshottari Mahadasha Timeline */}
        <div className="mt-6 rounded-2xl border border-sand bg-sand/15 p-4 sm:p-6">
          <div className="font-serif text-sm font-bold uppercase tracking-wider text-saffron-deep mb-2">
            {isTe ? "౨. వింశోత్తరీ మహాదశా కాలచక్రం" : isHi ? "२. विंशोत्तरी महादशा चक्र" : "2. Vimshottari Mahadasha Timeline"}
          </div>
          <p className="text-[11px] text-muted mb-3">
            {isHi
              ? `जन्म समय भुक्त दशा: ${chart.vimshottariDasha.birthBalancePlanetHi} (अवशेष: ${chart.vimshottariDasha.birthBalanceYears.toFixed(2)} वर्ष)`
              : `Balance of Dasha at Birth: ${chart.vimshottariDasha.birthBalancePlanet} (${chart.vimshottariDasha.birthBalanceYears.toFixed(2)} years remaining)`}
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {chart.vimshottariDasha.periods.map((d, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-2 text-center text-xs border ${
                  d.isCurrent
                    ? "bg-saffron/20 border-saffron font-bold text-ink"
                    : "bg-white border-sand/70 text-muted"
                }`}
              >
                <div className="font-serif font-bold text-ink">
                  {isHi ? d.planetNameHi : d.planetName}
                </div>
                <div className="font-mono text-[10px] mt-0.5">
                  {d.startYear} - {d.endYear}
                </div>
                {d.isCurrent && (
                  <div className="text-[9px] text-saffron-deep font-bold mt-0.5 uppercase">
                    {isTe ? "ప్రస్తుతం" : isHi ? "वर्तमान" : "Current"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Classical Footer Signature */}
        <div className="mt-8 border-t border-sand pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted">
          <div>
            {isTe
              ? "భక్తి వాయిస్ — BhaktiVoice.com ద్వారా రూపొందించబడిన ప్రామాణిక వైదిక జన్మ పత్రిక"
              : isHi
              ? "भक्ति वॉयस — BhaktiVoice.com द्वारा निर्मित प्रामाणिक वैदिक जन्म पत्रिका"
              : "Generated by BhaktiVoice.com — Authentic Vedic Astrology & Panchang"}
          </div>
          <div className="font-mono text-[11px] mt-1 sm:mt-0">
            {new Date().toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

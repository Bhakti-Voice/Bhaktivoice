"use client";

import React, { useState } from "react";
import { Printer, X, FileText, Heart } from "lucide-react";
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

  const [mode, setMode] = useState<"patrika" | "biodata">("patrika");

  // Editable / customizable matrimonial biodata details
  const [biodata, setBiodata] = useState({
    gotra: "Kashyap",
    caste: "Jain / Hindu",
    height: "5 ft 9 in (175 cm)",
    complexion: "Fair",
    education: "B.Tech / Post Graduate",
    profession: "Software Engineer / Professional",
    income: "Confidential / Negotiable",
    fatherName: "Mr. R. K. Jain",
    fatherOcc: "Businessman / Executive",
    motherName: "Mrs. S. Jain",
    motherOcc: "Homemaker",
    siblings: "1 Brother (Married), 1 Sister",
    nativePlace: "New Delhi, India",
    contactPerson: "Family / Parents",
    contactPhone: "+91 98765 43210",
    contactEmail: "contact@family.com",
    address: "New Delhi, India",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      {/* Print Trigger & Mode Selector Header (Hidden in print) */}
      <div className="fixed top-4 left-4 right-4 z-60 flex flex-wrap items-center justify-between gap-3 print:hidden max-w-4xl mx-auto">
        {/* Mode Toggle */}
        <div className="flex items-center rounded-2xl bg-white/95 p-1.5 shadow-lg border border-[#ecdac8] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setMode("patrika")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition ${
              mode === "patrika"
                ? "bg-[#d9531e] text-white shadow-xs"
                : "text-stone-700 hover:bg-[#fff7ed]"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{isTe ? "వైదిక జన్మ పత్రిక" : isHi ? "वैदिक जन्म पत्रिका" : "Vedic Janam Patrika"}</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("biodata")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition ${
              mode === "biodata"
                ? "bg-[#d9531e] text-white shadow-xs"
                : "text-stone-700 hover:bg-[#fff7ed]"
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>{isTe ? "వివాహ బయోడేటా" : isHi ? "विवाह बायोडाटा (Biodata)" : "Matrimonial Biodata"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-2xl bg-[#d9531e] px-5 py-2.5 font-serif text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-[#b43d10] active:scale-95"
          >
            <Printer className="h-4 w-4" />
            <span>{isTe ? "ప్రింట్ / PDF సేవ్ చేయండి" : isHi ? "प्रिंट / PDF सेव करें" : "Print / Save as PDF"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-stone-800 shadow-md transition hover:bg-white active:scale-95"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Printable Paper Canvas (A4 Styled) */}
      <div className="relative my-16 w-full max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-2xl print:m-0 print:w-full print:max-w-none print:p-6 print:shadow-none border border-[#ecdac8]">
        {/* ========================================================= */}
        {/* MODE A: VEDIC PATRIKA */}
        {/* ========================================================= */}
        {mode === "patrika" && (
          <div>
            {/* Sacred Vedic Header */}
            <div className="text-center border-b-2 border-[#d9531e]/40 pb-4">
              <div className="font-serif text-xl font-bold tracking-wider text-[#9a3412]">
                ॥ श्री गणेशाय नमः ॥
              </div>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#3b1812]">
                {isTe ? "వైదిక జన్మ పత్రిక (జన్మ కుండలి)" : isHi ? "वैदिक जन्म पत्रिका (जन्म कुंडली)" : "Vedic Horoscope (Janam Patrika)"}
              </h2>
              <p className="text-xs text-stone-500">
                {isTe
                  ? "చిత్రపక్ష (లాహిరి) అయనాంశ ఆధారిత ప్రామాణిక జన్మ వివరాలు"
                  : isHi
                  ? "चित्रापक्ष (लाहिरी) अयनांश आधारित प्रामाणिक जन्म विवरण"
                  : "Calculated using high-precision Chitrapaksha (Lahiri) Sidereal Ayanamsha"}
              </p>
            </div>

            {/* Janma Vivarana (Birth Details Card) */}
            <div className="mt-6 rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4 sm:p-6">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#9a3412] mb-3">
                {isTe ? "౧. జాతక జన్మ వివరాలు" : isHi ? "१. जातक जन्म विवरण" : "1. Birth Credentials"}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500">{isTe ? "పేరు: " : isHi ? "जातक नाम: " : "Name: "}</span>
                  <strong className="block font-serif text-sm text-[#3b1812]">{chart.name}</strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "జన్మ తేదీ: " : isHi ? "जन्म दिनांक: " : "Date of Birth: "}</span>
                  <strong className="block font-mono text-sm text-[#3b1812]">{chart.birthDate}</strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "జన్మ సమయం: " : isHi ? "जन्म समय: " : "Time of Birth: "}</span>
                  <strong className="block font-mono text-sm text-[#3b1812]">{chart.birthTime}</strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "జన్మ స్థలం: " : isHi ? "जन्म स्थान: " : "Birth Place: "}</span>
                  <strong className="block font-serif text-sm text-[#3b1812]">{chart.place.name}</strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "లగ్నం: " : isHi ? "लग्न (Ascendant): " : "Ascendant (Lagna): "}</span>
                  <strong className="block font-serif text-sm text-[#c2410c]">
                    {isHi ? chart.lagna.rashiHi : chart.lagna.rashi} ({chart.lagna.formattedDegree})
                  </strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "చంద్ర రాశి: " : isHi ? "चंद्र राशि (Moon Sign): " : "Moon Sign (Rashi): "}</span>
                  <strong className="block font-serif text-sm text-[#3b1812]">
                    {isHi ? chart.moon.rashiHi : chart.moon.rashi}
                  </strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "జన్మ నక్షత్రం: " : isHi ? "जन्म नक्षत्र: " : "Nakshatra: "}</span>
                  <strong className="block font-serif text-sm text-[#3b1812]">
                    {isHi ? chart.moon.nakshatraHi : chart.moon.nakshatra} ({isTe ? "పాదం" : isHi ? "पाद" : "Pada"} {chart.moon.pada})
                  </strong>
                </div>

                <div>
                  <span className="text-stone-500">{isTe ? "మాంగళిక స్థితి: " : isHi ? "मांगलिक स्थिति: " : "Manglik Status: "}</span>
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
              <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 text-center">
                <div className="font-serif text-xs font-bold text-[#3b1812] mb-2">
                  {isTe ? "లగ్న కుండలి (D-1 జన్మ చక్రం)" : isHi ? "लग्न कुण्डली (D-1 Lagna Chart)" : "Lagna Birth Chart (D-1)"}
                </div>
                <div className="mx-auto max-w-[320px]">
                  <KundliChartSvg chart={chart} />
                </div>
              </div>

              {/* Planetary Position Table */}
              <div className="rounded-2xl border border-[#ecdac8] bg-white p-4">
                <div className="font-serif text-xs font-bold text-[#3b1812] mb-2">
                  {isTe ? "గ్రహ స్పష్ట స్థితి (గ్రహాల స్థానాలు)" : isHi ? "ग्रह स्पष्ट स्थिति (Graha Sthiti)" : "Planetary Ephemeris"}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead className="border-b border-[#ecdac8] bg-[#fff7ed] font-serif text-stone-600">
                      <tr>
                        <th className="p-1.5">{isTe ? "గ్రహం" : isHi ? "ग्रह" : "Planet"}</th>
                        <th className="p-1.5">{isTe ? "రాశి" : isHi ? "राशि" : "Rashi"}</th>
                        <th className="p-1.5">{isTe ? "డిగ్రీ" : isHi ? "अंश" : "Deg"}</th>
                        <th className="p-1.5">{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}</th>
                        <th className="p-1.5">{isTe ? "అవస్థ" : isHi ? "अवस्था" : "Dignity"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ecdac8]/60">
                      {chart.planets.map((p) => (
                        <tr key={p.id}>
                          <td className="p-1.5 font-bold text-[#3b1812] flex items-center gap-1">
                            <span>{p.symbol}</span>
                            <span>{isHi ? p.nameHi : p.name}</span>
                            {p.retrograde && <span className="text-purple-700 font-bold">(R)</span>}
                            {p.isCombust && <span className="text-amber-700 font-bold">(A)</span>}
                          </td>
                          <td className="p-1.5 text-stone-800">{isHi ? p.rashiHi : p.rashi}</td>
                          <td className="p-1.5 font-mono text-stone-600">{p.formattedDegree}</td>
                          <td className="p-1.5 text-stone-600">
                            {isHi ? p.nakshatraHi : p.nakshatra} ({p.pada})
                          </td>
                          <td className="p-1.5 text-stone-800 font-medium">
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
            <div className="mt-6 rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4 sm:p-6">
              <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#9a3412] mb-2">
                {isTe ? "౨. వింశోత్తరీ మహాదశా కాలచక్రం" : isHi ? "२. विंशोत्तरी महादशा चक्र" : "2. Vimshottari Mahadasha Timeline"}
              </div>
              <p className="text-[11px] text-stone-500 mb-3">
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
                        ? "bg-[#ffedd5] border-[#fdba74] font-bold text-[#9a3412]"
                        : "bg-white border-[#ecdac8] text-stone-600"
                    }`}
                  >
                    <div className="font-serif font-bold text-[#3b1812]">
                      {isHi ? d.planetNameHi : d.planetName}
                    </div>
                    <div className="font-mono text-[10px] mt-0.5">
                      {d.startYear} - {d.endYear}
                    </div>
                    {d.isCurrent && (
                      <div className="text-[9px] text-[#c2410c] font-bold mt-0.5 uppercase">
                        {isTe ? "ప్రస్తుతం" : isHi ? "वर्तमान" : "Current"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE B: MATRIMONIAL BIODATA (వివాహ బయోడేటా / विवाह बायोडाटा) */}
        {/* ========================================================= */}
        {mode === "biodata" && (
          <div>
            {/* Sacred Vedic Header */}
            <div className="text-center border-b-2 border-[#d9531e]/40 pb-4">
              <div className="font-serif text-xl font-bold tracking-wider text-[#9a3412]">
                ॥ श्री गणेशाय नमः ॥
              </div>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812]">
                {isTe ? "వివాహ బయోడేటా (కుండలి వివరాలతో)" : isHi ? "विवाह बायोडाटा (सकुण्डली विवरण)" : "Matrimonial Biodata & Janam Kundli"}
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {isTe
                  ? "వైదిక జన్మ కుండలి చక్రం మరియు వివాహ అనుకూల వివరాలు"
                  : isHi
                  ? "वैदिक जन्म चक्र, नवग्रह स्थिति एवं सम्पूर्ण वैवाहिक परिचय"
                  : "Authentic Vedic horoscope, planetary coordinates & marriage profile"}
              </p>
            </div>

            {/* 2-Column Biodata Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Personal & Astrological Particulars */}
              <div className="space-y-4">
                {/* 1. Personal Details */}
                <div className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "వ్యక్తిగత వివరాలు" : isHi ? "१. व्यक्तिगत विवरण" : "1. Personal Particulars"}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isHi ? "पूरा नाम:" : "Full Name:"}</span>
                      <strong className="font-serif text-[#3b1812]">{chart.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isHi ? "जन्म तिथि:" : "Date of Birth:"}</span>
                      <strong className="font-mono text-stone-800">{chart.birthDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isHi ? "जन्म समय:" : "Time of Birth:"}</span>
                      <strong className="font-mono text-stone-800">{chart.birthTime}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isHi ? "जन्म स्थान:" : "Place of Birth:"}</span>
                      <strong className="text-stone-800">{chart.place.name}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "कद (ऊंचाई):" : "Height:"}</span>
                      <input
                        type="text"
                        value={biodata.height}
                        onChange={(e) => setBiodata({ ...biodata, height: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "वर्ण/रंग:" : "Complexion:"}</span>
                      <input
                        type="text"
                        value={biodata.complexion}
                        onChange={(e) => setBiodata({ ...biodata, complexion: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "गोत्र:" : "Gotra:"}</span>
                      <input
                        type="text"
                        value={biodata.gotra}
                        onChange={(e) => setBiodata({ ...biodata, gotra: e.target.value })}
                        className="text-right text-xs font-medium text-[#9a3412] font-serif bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Astrological Summary */}
                <div className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "జ్యోతిష వివరాలు" : isHi ? "२. ज्योतिषीय विवरण" : "2. Astrological Attributes"}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-500 block">{isHi ? "लग्न:" : "Ascendant (Lagna):"}</span>
                      <strong className="font-serif text-[#c2410c]">
                        {isHi ? chart.lagna.rashiHi : chart.lagna.rashi}
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">{isHi ? "चन्द्र राशि:" : "Moon Sign (Rashi):"}</span>
                      <strong className="font-serif text-stone-900">
                        {isHi ? chart.moon.rashiHi : chart.moon.rashi}
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">{isHi ? "नक्षत्र:" : "Nakshatra:"}</span>
                      <strong className="font-serif text-stone-900">
                        {isHi ? chart.moon.nakshatraHi : chart.moon.nakshatra} (P{chart.moon.pada})
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">{isHi ? "मांगलिक स्थिति:" : "Manglik Status:"}</span>
                      <strong className={`font-serif ${chart.manglik.isManglik ? "text-rose-700" : "text-emerald-700"}`}>
                        {chart.manglik.isManglik ? (isHi ? "मांगलिक" : "Manglik") : (isHi ? "अमांगलिक (दोष रहित)" : "Non-Manglik")}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 3. Education & Profession */}
                <div className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "విద్య & వృత్తి" : isHi ? "३. शिक्षा एवं व्यवसाय" : "3. Education & Career"}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "उच्च शिक्षा:" : "Education:"}</span>
                      <input
                        type="text"
                        value={biodata.education}
                        onChange={(e) => setBiodata({ ...biodata, education: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none w-1/2"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "कार्य/व्यवसाय:" : "Profession:"}</span>
                      <input
                        type="text"
                        value={biodata.profession}
                        onChange={(e) => setBiodata({ ...biodata, profession: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none w-1/2"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "आय/पैकेज:" : "Annual Income:"}</span>
                      <input
                        type="text"
                        value={biodata.income}
                        onChange={(e) => setBiodata({ ...biodata, income: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none w-1/2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Kundli Chart + Family & Contact Details */}
              <div className="space-y-4">
                {/* Janam Kundli D-1 Chart */}
                <div className="rounded-2xl border border-[#ecdac8] bg-white p-4 text-center">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-2 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "లగ్న కుండలి చక్రం (D-1)" : isHi ? "लग्न कुण्डली चक्र (D-1 Chart)" : "Vedic Birth Chart (D-1 Rasi)"}
                  </h3>
                  <div className="mx-auto max-w-[260px]">
                    <KundliChartSvg chart={chart} />
                  </div>
                </div>

                {/* Family Details */}
                <div className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "కుటుంబ వివరాలు" : isHi ? "४. पारिवारिक पृष्ठभूमि" : "4. Family Background"}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "पिता का नाम:" : "Father:"}</span>
                      <input
                        type="text"
                        value={biodata.fatherName}
                        onChange={(e) => setBiodata({ ...biodata, fatherName: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "माता का नाम:" : "Mother:"}</span>
                      <input
                        type="text"
                        value={biodata.motherName}
                        onChange={(e) => setBiodata({ ...biodata, motherName: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "भाई-बहन:" : "Siblings:"}</span>
                      <input
                        type="text"
                        value={biodata.siblings}
                        onChange={(e) => setBiodata({ ...biodata, siblings: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "मूल निवास:" : "Native Place:"}</span>
                      <input
                        type="text"
                        value={biodata.nativePlace}
                        onChange={(e) => setBiodata({ ...biodata, nativePlace: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3 pb-1 border-b border-[#ecdac8]/60">
                    {isTe ? "సంప్రదింపు వివరాలు" : isHi ? "५. संपर्क सूत्र" : "5. Contact Particulars"}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "संपर्क व्यक्ति:" : "Contact Person:"}</span>
                      <input
                        type="text"
                        value={biodata.contactPerson}
                        onChange={(e) => setBiodata({ ...biodata, contactPerson: e.target.value })}
                        className="text-right text-xs font-medium text-stone-800 bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">{isHi ? "मोबाइल नंबर:" : "Phone / Mobile:"}</span>
                      <input
                        type="text"
                        value={biodata.contactPhone}
                        onChange={(e) => setBiodata({ ...biodata, contactPhone: e.target.value })}
                        className="text-right text-xs font-mono font-bold text-[#c2410c] bg-transparent border-b border-dashed border-stone-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Classical Footer Signature */}
        <div className="mt-8 border-t border-[#ecdac8] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
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

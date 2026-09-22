"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Heart,
  HelpCircle,
  Lock,
  MapPin,
  Navigation,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  Users,
} from "lucide-react";
import { defaultCity, filterCities, readDeviceLocation, type CityEntry } from "@/lib/spiritual-tools/geo";
import { calculateMilan } from "@/lib/spiritual-tools/milan";
import type { BirthPlace, MilanResult } from "@/lib/spiritual-tools/types";
import { useLocale } from "@/lib/i18n/client";
import { KundliChartSvg } from "./KundliChartSvg";
import { PrintableMilanReport } from "./PrintableMilanReport";

type PersonFormState = {
  name: string;
  date: string;
  time: string;
  place: BirthPlace;
  cityQuery: string;
};

export interface KundliMilanToolProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function KundliMilanTool({ isHi: propIsHi, isTe: propIsTe }: KundliMilanToolProps = {}) {
  const locale = useLocale();
  const isHi = propIsHi !== undefined ? propIsHi : locale === "hi";
  const isTe = propIsTe !== undefined ? propIsTe : locale === "te";

  const defaultBirthPlace: BirthPlace = useMemo(() => defaultCity(), []);

  // Clean initial state (no sample user data)
  const [boy, setBoy] = useState<PersonFormState>({
    name: "",
    date: "",
    time: "",
    place: defaultBirthPlace,
    cityQuery: "",
  });

  const [girl, setGirl] = useState<PersonFormState>({
    name: "",
    date: "",
    time: "",
    place: defaultBirthPlace,
    cityQuery: "",
  });

  const [boyDropdownOpen, setBoyDropdownOpen] = useState(false);
  const [girlDropdownOpen, setGirlDropdownOpen] = useState(false);
  const [boyLocating, setBoyLocating] = useState(false);
  const [girlLocating, setGirlLocating] = useState(false);

  const boyDropdownRef = useRef<HTMLDivElement>(null);
  const girlDropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MilanResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"gunas" | "boyChart" | "girlChart" | "doshas" | "remedies">("gunas");

  const boyCitySuggestions = useMemo(() => filterCities(boy.cityQuery), [boy.cityQuery]);
  const girlCitySuggestions = useMemo(() => filterCities(girl.cityQuery), [girl.cityQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boyDropdownRef.current && !boyDropdownRef.current.contains(event.target as Node)) {
        setBoyDropdownOpen(false);
      }
      if (girlDropdownRef.current && !girlDropdownRef.current.contains(event.target as Node)) {
        setGirlDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectBoyCity(city: CityEntry | BirthPlace) {
    setBoy((cur) => ({ ...cur, place: city, cityQuery: city.name }));
    setBoyDropdownOpen(false);
  }

  function handleSelectGirlCity(city: CityEntry | BirthPlace) {
    setGirl((cur) => ({ ...cur, place: city, cityQuery: city.name }));
    setGirlDropdownOpen(false);
  }

  async function handleUseBoyGPS() {
    setBoyLocating(true);
    try {
      const loc = await readDeviceLocation();
      if (loc) {
        setBoy((cur) => ({
          ...cur,
          place: loc,
          cityQuery: isTe ? "నా ప్రస్తుత ప్రదేశం" : isHi ? "वर्तमान लोकेशन" : "My Current Location",
        }));
        setBoyDropdownOpen(false);
      }
    } finally {
      setBoyLocating(false);
    }
  }

  async function handleUseGirlGPS() {
    setGirlLocating(true);
    try {
      const loc = await readDeviceLocation();
      if (loc) {
        setGirl((cur) => ({
          ...cur,
          place: loc,
          cityQuery: isTe ? "నా ప్రస్తుత ప్రదేశం" : isHi ? "वर्तमान लोकेशन" : "My Current Location",
        }));
        setGirlDropdownOpen(false);
      }
    } finally {
      setGirlLocating(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!boy.date || !boy.time || !girl.date || !girl.time) return;

    setLoading(true);
    try {
      const boyPlace = boy.place || (boy.cityQuery ? filterCities(boy.cityQuery)[0] : defaultBirthPlace) || defaultBirthPlace;
      const girlPlace = girl.place || (girl.cityQuery ? filterCities(girl.cityQuery)[0] : defaultBirthPlace) || defaultBirthPlace;

      const milanResult = calculateMilan(
        {
          name: boy.name.trim() || (isTe ? "వరుడు" : isHi ? "वर" : "Groom"),
          date: boy.date,
          time: boy.time,
          place: boyPlace,
        },
        {
          name: girl.name.trim() || (isTe ? "వధువు" : isHi ? "कन्या" : "Bride"),
          date: girl.date,
          time: girl.time,
          place: girlPlace,
        },
      );

      setResult(milanResult);
      setActiveTab("gunas");

      setTimeout(() => {
        document.getElementById("milan-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    setShowPrintModal(true);
  }

  async function handleShare() {
    if (!result) return;
    const shareText = isHi
      ? `💖 वैदिक अष्टकूट कुंडली मिलान परिणाम\n🤵 वर: ${result.boy.name} (${result.boy.moon.rashiHi}, ${result.boy.moon.nakshatraHi})\n👰 कन्या: ${result.girl.name} (${result.girl.moon.rashiHi}, ${result.girl.moon.nakshatraHi})\n\n⭐ कुल प्राप्त गुण: ${result.total} / 36 (${result.percentage}%)\n📜 निष्कर्ष: ${result.verdictHi}\n\nसम्पूर्ण कुंडली मिलान रिपोर्ट BhaktiVoice पर देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `💖 Vedic Ashtakoot Kundli Milan Report\n🤵 Groom: ${result.boy.name} (${result.boy.moon.rashi}, ${result.boy.moon.nakshatra})\n👰 Bride: ${result.girl.name} (${result.girl.moon.rashi}, ${result.girl.moon.nakshatra})\n\n⭐ Total Score: ${result.total} / 36 Gunas (${result.percentage}%)\n📜 Verdict: ${result.verdict}\n\nCheck full Kundli Milan report on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: isTe ? "కుండలి మిలనం — భక్తి వాయిస్" : isHi ? "कुंडली मिलान — भक्ति वॉइस" : "Kundli Milan — BhaktiVoice",
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
      {/* ========================================================= */}
      {/* 1. ENTER BIRTH DETAILS DUAL FORM (Matching Kundli Page) */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
        {/* Form Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-[#f0e4d8]">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812] flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="diya">🪔</span>
              <span>{isTe ? "వివాహ పొంతన కొరకు జన్మ వివరాలు" : isHi ? "विवाह मिलान हेतु जन्म विवरण दर्ज करें" : "Enter Birth Details for Matchmaking"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {isTe
                ? "36 గుణాల అష్టకూట లెక్కింపు కొరకు వధూవరుల ఖచ్చితమైన సమాచారాన్ని అందించండి"
                : isHi
                ? "36 गुण अष्टकूट गणना हेतु वर एवं कन्या का सटीक जन्म विवरण भरें"
                : "Provide accurate birth information for both Groom and Bride to calculate 36 Gunas"}
            </p>
          </div>

          {/* Privacy Trust Badge */}
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#fffcf7] border border-amber-200/70 px-3.5 py-2 shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#b45309] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] sm:text-xs font-bold text-[#9a3412] leading-tight">
                {isTe ? "మీ గోప్యత మా ప్రాధాన్యత" : isHi ? "आपकी गोपनीयता हमारी प्राथमिकता" : "Your Privacy is Our Priority"}
              </p>
              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                {isTe ? "సమాచారం 100% సురక్షితం" : isHi ? "डेटा पूर्णतः सुरक्षित व गोपनीय" : "Your information is 100% private and secure."}
              </p>
            </div>
          </div>
        </div>

        {/* Dual Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Groom's Details Card */}
            <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-b from-[#fffcf8] via-[#fffdfb] to-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-[#9a3412] font-bold text-sm mb-4 pb-2.5 border-b border-[#f0e4d8]">
                <User className="h-4 w-4 text-[#d9531e]" />
                <span className="font-serif">{isTe ? "వరుడి వివరాలు (Groom)" : isHi ? "वर का विवरण (Groom's Details)" : "Groom's Details (वर)"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="boy-name" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "పూర్తి పేరు" : isHi ? "पूरा नाम" : "Full Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="boy-name"
                      type="text"
                      value={boy.name}
                      onChange={(e) => setBoy({ ...boy, name: e.target.value })}
                      placeholder={isTe ? "వరుడి పేరు" : isHi ? "वर का नाम" : "Groom's Name"}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="boy-date" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ తేదీ *" : isHi ? "जन्म तिथि *" : "Date of Birth *"}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="boy-date"
                      type="date"
                      value={boy.date}
                      onChange={(e) => setBoy({ ...boy, date: e.target.value })}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                      required
                    />
                  </div>
                </div>

                {/* Time of Birth */}
                <div>
                  <label htmlFor="boy-time" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ సమయం *" : isHi ? "जन्म समय *" : "Time of Birth *"}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="boy-time"
                      type="time"
                      value={boy.time}
                      onChange={(e) => setBoy({ ...boy, time: e.target.value })}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                      required
                    />
                  </div>
                </div>

                {/* Place of Birth */}
                <div className="sm:col-span-2 relative" ref={boyDropdownRef}>
                  <label htmlFor="boy-place" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ స్థలం" : isHi ? "जन्म स्थान" : "Place of Birth"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="boy-place"
                      type="text"
                      value={boy.cityQuery}
                      onChange={(e) => {
                        setBoy({ ...boy, cityQuery: e.target.value });
                        setBoyDropdownOpen(true);
                      }}
                      onFocus={() => setBoyDropdownOpen(true)}
                      placeholder={isTe ? "నగరం పేరు (ఉదా. New Delhi)" : isHi ? "शहर का नाम (उदा. नई दिल्ली)" : "New Delhi"}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-20 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                    />
                    <button
                      type="button"
                      onClick={handleUseBoyGPS}
                      disabled={boyLocating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-xl bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-[#d9531e] hover:bg-amber-500/20 transition disabled:opacity-50"
                      title="Use GPS Location"
                    >
                      <Navigation className="h-3 w-3" />
                      <span>{boyLocating ? "..." : "GPS"}</span>
                    </button>
                  </div>

                  {boyDropdownOpen && boyCitySuggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-2xl border border-[#ecdac8] bg-white p-1.5 shadow-lg">
                      {boyCitySuggestions.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectBoyCity(c)}
                          className="w-full text-left rounded-xl px-3 py-1.5 text-xs text-stone-800 hover:bg-[#fff7ed] hover:text-[#d9531e] transition flex items-center justify-between"
                        >
                          <span className="font-medium">{c.name}</span>
                          <span className="text-[10px] text-stone-400">{c.state || "India"}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bride's Details Card */}
            <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-b from-[#fffafb] via-[#fffdfd] to-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4 pb-2.5 border-b border-rose-200/60">
                <Heart className="h-4 w-4 text-rose-600 fill-rose-600" />
                <span className="font-serif">{isTe ? "వధువు వివరాలు (Bride)" : isHi ? "कन्या का विवरण (Bride's Details)" : "Bride's Details (कन्या)"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="girl-name" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "పూర్తి పేరు" : isHi ? "पूरा नाम" : "Full Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="girl-name"
                      type="text"
                      value={girl.name}
                      onChange={(e) => setGirl({ ...girl, name: e.target.value })}
                      placeholder={isTe ? "వధువు పేరు" : isHi ? "कन्या का नाम" : "Bride's Name"}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="girl-date" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ తేదీ *" : isHi ? "जन्म तिथि *" : "Date of Birth *"}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="girl-date"
                      type="date"
                      value={girl.date}
                      onChange={(e) => setGirl({ ...girl, date: e.target.value })}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                      required
                    />
                  </div>
                </div>

                {/* Time of Birth */}
                <div>
                  <label htmlFor="girl-time" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ సమయం *" : isHi ? "जन्म समय *" : "Time of Birth *"}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="girl-time"
                      type="time"
                      value={girl.time}
                      onChange={(e) => setGirl({ ...girl, time: e.target.value })}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                      required
                    />
                  </div>
                </div>

                {/* Place of Birth */}
                <div className="sm:col-span-2 relative" ref={girlDropdownRef}>
                  <label htmlFor="girl-place" className="block text-xs font-bold text-stone-700 mb-1">
                    {isTe ? "జన్మ స్థలం" : isHi ? "जन्म स्थान" : "Place of Birth"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      id="girl-place"
                      type="text"
                      value={girl.cityQuery}
                      onChange={(e) => {
                        setGirl({ ...girl, cityQuery: e.target.value });
                        setGirlDropdownOpen(true);
                      }}
                      onFocus={() => setGirlDropdownOpen(true)}
                      placeholder={isTe ? "నగరం పేరు (ఉదా. New Delhi)" : isHi ? "शहर का नाम (उदा. नई दिल्ली)" : "New Delhi"}
                      className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2 pl-9 pr-20 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                    />
                    <button
                      type="button"
                      onClick={handleUseGirlGPS}
                      disabled={girlLocating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-xl bg-rose-500/10 px-2 py-1 text-[11px] font-bold text-rose-700 hover:bg-rose-500/20 transition disabled:opacity-50"
                      title="Use GPS Location"
                    >
                      <Navigation className="h-3 w-3" />
                      <span>{girlLocating ? "..." : "GPS"}</span>
                    </button>
                  </div>

                  {girlDropdownOpen && girlCitySuggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-2xl border border-[#ecdac8] bg-white p-1.5 shadow-lg">
                      {girlCitySuggestions.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectGirlCity(c)}
                          className="w-full text-left rounded-xl px-3 py-1.5 text-xs text-stone-800 hover:bg-[#fff9fa] hover:text-rose-700 transition flex items-center justify-between"
                        >
                          <span className="font-medium">{c.name}</span>
                          <span className="text-[10px] text-stone-400">{c.state || "India"}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button & Subtext */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d9531e] via-[#c2410c] to-[#9a3412] px-9 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:opacity-75"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>{loading ? (isTe ? "గుణ మిలనం జరుగుతోంది..." : isHi ? "गुण मिलान जारी है..." : "Matching Kundlis...") : (isTe ? "కుండలి మిలనం చేయండి (36 గుణాలు) →" : isHi ? "कुंडली मिलान करें (Match Kundli) →" : "Match Kundli (36 Gunas) →")}</span>
            </button>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-2 font-medium">
              {isTe
                ? "ఖచ్చితమైన 36 గుణాల అష్టకూట గణనలు • తక్షణ ఫలితాలు • 100% ఉచితం"
                : isHi
                ? "सटीक 36 गुण अष्टकूट गणना • तात्कालिक परिणाम • 100% निःशुल्क"
                : "Authentic 36 Guna Ashtakoot calculations • Instant results • 100% Free"}
            </p>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* 2. PRE-MATCH WELCOME CARD (When result is null) */}
      {/* ========================================================= */}
      {!result && (
        <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#fffdfa] via-white to-[#fff9f0] p-6 sm:p-8 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 text-2xl font-serif mb-3">
            ॐ
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
            {isTe ? "వైదిక 36 గుణాల వివాహ పొంతన తెలుసుకోండి" : isHi ? "वैदिक 36 गुण अष्टकूट विवाह मिलान करें" : "Discover Your 36-Guna Marital Compatibility"}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed font-medium">
            {isTe
              ? "పై ఫారమ్‌లో వరుడు మరియు వధువు జన్మ వివరాలను నమోదు చేసి 'కుండలి మిలనం చేయండి' బటన్‌ను క్లిక్ చేయండి."
              : isHi
              ? "कृपया ऊपर दिए गए फॉर्म में वर एवं कन्या का जन्म विवरण भरें और 'कुंडली मिलान करें' पर क्लिक करें।"
              : "Enter the birth details of both the Groom and Bride above and click 'Match Kundli' to receive an instant compatibility verdict."}
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">✨</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "36 గుణాల అష్టకూటం" : isHi ? "36 गुण अष्टकूट" : "36 Gunas Matrix"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "వర్ణం, వశ్యం, తార, యోని మొదలైనవి" : isHi ? "वर्ण, वश्य, तारा, योनि आदि" : "8 classical Vedic factors"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">🧬</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "నాడీ దోష పరిహారం" : isHi ? "नाड़ी दोष परिहार" : "Nadi Dosha Check"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "8 గుణాల జన్యు పరిశీలన" : isHi ? "8 अंकों का अनुवांशिक विचार" : "8-point genetic harmony"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">💫</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "భకూట్ దోష పరిహారం" : isHi ? "भकूट दोष परिहार" : "Bhakoot Harmony"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "7 గుణాల అనుబంధం" : isHi ? "7 अंकों का भाव संबंध" : "7-point emotional bond"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">♂️</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "మాంగ్లిక్ సామరస్యం" : isHi ? "मांगलिक सामंजस्य" : "Manglik Matching"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "16 పరిహార నియమాలు" : isHi ? "16 परिहार एवं उपाय" : "16 classical exceptions"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. RESULTS SECTION (Rendered when matched) */}
      {/* ========================================================= */}
      {result && (
        <div id="milan-results" className="space-y-6">
          {/* A. Profile Comparison Banner Card */}
          <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-r from-[#fffcf8] via-[#fffdf9] to-[#fff7f0] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden">
            <div className="flex items-center gap-4 z-10">
              {/* Couple Avatar */}
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fef3c7] via-[#fed7aa] to-[#fecdd3] border-2 border-amber-300 shadow-xs">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-[#d9531e] text-[#d9531e]" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c2410c] block">
                  {isTe ? "కుండలి మిలనం ఫలితం" : isHi ? "वैदिक अष्टकूट मिलान परिणाम" : "Vedic Matchmaking Result"}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#3b1812] tracking-tight mt-0.5 flex flex-wrap items-center gap-2">
                  <span>{result.boy.name}</span>
                  <span className="text-rose-500">&</span>
                  <span>{result.girl.name}</span>
                </h2>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
                  <span>🤵 {result.boy.moon.rashi} ({result.boy.moon.nakshatra})</span>
                  <span>•</span>
                  <span>👰 {result.girl.moon.rashi} ({result.girl.moon.nakshatra})</span>
                </p>
              </div>
            </div>

            {/* Right Side: Score Pill & Print/Share */}
            <div className="flex flex-col items-start md:items-end gap-3 z-10">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#c2410c]">
                  {result.total} <span className="text-sm font-bold text-stone-400">/ 36</span>
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    result.total >= 28
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : result.total >= 21
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : result.total >= 18
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200"
                  }`}
                >
                  {isHi ? result.verdictHi.split("—")[0] : result.verdict.split("—")[0]}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-2xl border border-[#ecdac8] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-stone-700 shadow-2xs hover:border-[#d9531e] hover:text-[#d9531e] transition active:scale-95"
                >
                  <Printer className="h-4 w-4 text-[#d9531e]" />
                  <span>{isTe ? "రిపోర్ట్ ప్రింట్" : isHi ? "प्रिंट रिपोर्ट" : "Print Report"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className="flex items-center gap-1.5 rounded-2xl border border-[#ecdac8] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-stone-700 shadow-2xs hover:border-[#d9531e] hover:text-[#d9531e] transition active:scale-95"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Share2 className="h-4 w-4 text-[#d9531e]" />
                  )}
                  <span>{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हुआ!" : "Copied!") : (isTe ? "షేర్" : isHi ? "शेयर" : "Share")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* B. 4 Vital Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Total Gunas */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#b45309]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "మొత్తం గుణాలు" : isHi ? "कुल प्राप्त गुण" : "Total Gunas"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {result.total} / 36 ({result.percentage}%)
                  </h3>
                  <p className="text-xs font-bold text-[#d9531e]">
                    {result.total >= 18 ? (isTe ? "కనీస అర్హత పూర్తి" : isHi ? "न्यूनतम सीमा पूर्ण" : "Passes Threshold") : (isTe ? "కనీసం కంటే తక్కువ" : isHi ? "सामान्य से कम" : "Below Threshold")}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isTe ? "18+ తప్పనిసరి • 28+ ఉత్తమం" : isHi ? "18+ अनिवार्य • 28+ सर्वोत्तम" : "18+ Min • 28+ Auspicious"}
              </div>
            </div>

            {/* 2. Manglik Compatibility */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                  result.manglikMatch.compatible
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-700"
                }`}>
                  <span className="text-lg font-bold">♂</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "మాంగ్లిక్ సామరస్యం" : isHi ? "मांगलिक सामंजस्य" : "Manglik Harmony"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {result.manglikMatch.compatible ? (isTe ? "అనుకూలమైనది" : isHi ? "सामंजस्य पूर्ण" : "Compatible") : (isTe ? "అనుకూలం కాదు" : isHi ? "विषमता" : "Mismatch")}
                  </h3>
                  <p className="text-xs font-mono font-bold text-stone-600 truncate">
                    {isHi ? (result.boy.manglik.isManglik ? "वर: मांगलिक" : "वर: दोष रहित") : (result.boy.manglik.isManglik ? "Groom: Manglik" : "Groom: Non-M")}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isHi ? (result.girl.manglik.isManglik ? "कन्या: मांगलिक" : "कन्या: दोष रहित") : (result.girl.manglik.isManglik ? "Bride: Manglik" : "Bride: Non-M")}
              </div>
            </div>

            {/* 3. Nadi Dosha Status */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                  !result.nadiDosha.present || result.nadiDosha.cancelled
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-700"
                }`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "నాడీ దోషం (8 గుణాలు)" : isHi ? "नाड़ी दोष (8 गुण)" : "Nadi Dosha (8 Pts)"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {result.nadiDosha.cancelled
                      ? (isHi ? "दोष परिहार" : "Cancelled")
                      : result.nadiDosha.present
                      ? (isHi ? "दोष उपस्थित" : "Dosha Present")
                      : (isHi ? "दोष मुक्त (शुभ)" : "Free of Dosha")}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    {result.gunas.find((g) => g.id === "nadi")?.score || 0} / 8 {isHi ? "अंक" : "Pts"}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isTe ? "సంతాన & జన్యు పరిశీలన" : isHi ? "संतान व अनुवांशिक विचार" : "Genetics & Childbirth"}
              </div>
            </div>

            {/* 4. Bhakoot Dosha Status */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                  !result.bhakootDosha.present || result.bhakootDosha.cancelled
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-700"
                }`}>
                  <Heart className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "భకూట్ దోషం (7 గుణాలు)" : isHi ? "भकूट दोष (7 गुण)" : "Bhakoot Dosha (7 Pts)"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {result.bhakootDosha.cancelled
                      ? (isHi ? "दोष परिहार" : "Cancelled")
                      : result.bhakootDosha.present
                      ? (isHi ? "दोष उपस्थित" : "Dosha Present")
                      : (isHi ? "दोष मुक्त (शुभ)" : "Free of Dosha")}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    {result.gunas.find((g) => g.id === "bhakoot")?.score || 0} / 7 {isHi ? "अंक" : "Pts"}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isTe ? "కుటుంబ శ్రేయస్సు & అనురాగం" : isHi ? "पारिवारिक समृद्धि व प्रेम" : "Emotional & Family Bond"}
              </div>
            </div>
          </div>

          {/* C. Quick Navigation Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-[#ecdac8] scrollbar-none gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("gunas")}
              className={`py-3 px-3.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "gunas"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isTe ? "36 గుణాల అష్టకూట పట్టిక" : isHi ? "36 गुण अष्टकूट तालिका" : "36 Gunas Matrix"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("boyChart")}
              className={`py-3 px-3.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "boyChart"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <User className="h-4 w-4" />
              <span>{isTe ? "వరుడి కుండలి (D-1)" : isHi ? "वर कुंडली (D-1)" : "Groom Chart (D-1)"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("girlChart")}
              className={`py-3 px-3.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "girlChart"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>{isTe ? "వధువు కుండలి (D-1)" : isHi ? "कन्या कुंडली (D-1)" : "Bride Chart (D-1)"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("doshas")}
              className={`py-3 px-3.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "doshas"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <span>{isTe ? "దోష విశ్లేషణ" : isHi ? "दोष विश्लेषण" : "Dosha Analysis"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("remedies")}
              className={`py-3 px-3.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "remedies"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>{isTe ? "శాస్త్రీయ పరిహారాలు" : isHi ? "शास्त्रीय उपाय" : "Remedial Guidance"}</span>
            </button>
          </div>

          {/* D. Tab Content Panes */}

          {/* Tab 1: 36 Gunas Matrix */}
          {activeTab === "gunas" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Gunas Table (~65% width) */}
              <div className="lg:col-span-8 rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f0e4d8]">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                      {isTe ? "అష్టకూట 8 గుణాల సమగ్ర విభజన" : isHi ? "अष्टकूट 8 गुण विस्तृत विभाजन" : "Ashtakoot 8-Factor Breakdown"}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {isTe ? "మహర్షి పరాశర ప్రామాణిక అష్టకూట గుణ పట్టిక" : isHi ? "महर्षि पराशर विहित अष्टकूट गुण तालिका" : "Classical Maharishi Parashara scoring criteria"}
                    </p>
                  </div>
                  <span className="font-serif text-sm sm:text-base font-bold text-[#d9531e]">
                    {result.total} / 36 {isTe ? "గుణాలు" : isHi ? "गुण" : "Gunas"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#ecdac8] bg-[#fffcf8] text-[11px] font-bold text-stone-700">
                      <tr>
                        <th className="p-2.5">{isTe ? "కూటం" : isHi ? "कूट" : "Factor"}</th>
                        <th className="p-2.5">{isTe ? "వరుడు" : isHi ? "वर" : "Groom"}</th>
                        <th className="p-2.5">{isTe ? "వధువు" : isHi ? "कन्या" : "Bride"}</th>
                        <th className="p-2.5">{isTe ? "పొందిన / గరిష్ట" : isHi ? "प्राप्त / अधिकतम" : "Score / Max"}</th>
                        <th className="p-2.5">{isTe ? "ప్రాముఖ్యత" : isHi ? "महत्व" : "Meaning"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ecdac8]/60">
                      {result.gunas.map((g) => {
                        const pct = Math.round((g.score / g.max) * 100);
                        return (
                          <tr key={g.id} className="hover:bg-[#fff7ed]/50 transition">
                            <td className="p-2.5 font-bold text-stone-900">
                              {isHi ? g.nameHi : g.name}
                            </td>
                            <td className="p-2.5 text-stone-700">{isHi ? g.boyValueHi : g.boyValue}</td>
                            <td className="p-2.5 text-stone-700">{isHi ? g.girlValueHi : g.girlValue}</td>
                            <td className="p-2.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#c2410c]">{g.score}/{g.max}</span>
                                <div className="hidden sm:block h-1.5 w-12 bg-stone-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-amber-500" : "bg-rose-400"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-2.5 text-[11px] text-stone-600 max-w-xs">{isHi ? g.detailHi : g.detail}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Sidebar: Verdict & Shastra Box (~35% width) */}
              <div className="lg:col-span-4 space-y-4">
                {/* 1. Verdict Card */}
                <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#3b1812] mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#d9531e]" />
                    <span>{isTe ? "జ్యోతిష తీర్పు & సారాంశం" : isHi ? "ज्योतिषीय निष्कर्ष" : "Astrological Verdict"}</span>
                  </h4>
                  <p className="text-xs text-stone-700 font-bold text-[#c2410c]">
                    {isHi ? result.verdictHi : result.verdict}
                  </p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {isHi ? result.verdictSummaryHi : result.verdictSummary}
                  </p>
                </div>

                {/* 2. Classical Shastra Rules Box */}
                <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#3b1812] mb-2 flex items-center gap-2">
                    <span className="text-sm">📜</span>
                    <span>{isTe ? "శాస్త్రీయ నియమాలు" : isHi ? "शास्त्रीय नियम" : "Parashara Guidelines"}</span>
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                    <li>• <strong>18-24 {isHi ? "गुण" : "Gunas"}</strong>: {isHi ? "मध्यम मिलान (स्वीकार्य)" : "Average / Acceptable"}</li>
                    <li>• <strong>25-32 {isHi ? "गुण" : "Gunas"}</strong>: {isHi ? "उत्तम मिलान (अत्यंत शुभ)" : "Good / Highly Auspicious"}</li>
                    <li>• <strong>33-36 {isHi ? "गुण" : "Gunas"}</strong>: {isHi ? "सर्वोत्तम मिलान (अति दुर्लभ)" : "Excellent / Divine Union"}</li>
                    <li>• <strong>{isHi ? "नाड़ी एवं भकूट" : "Nadi & Bhakoot"}</strong>: {isHi ? "इन दोनों को सर्वाधिक 15 अंक प्राप्त हैं, इनका परिहार अनिवार्य है।" : "Carry 15/36 points; cancellation checks are critical."}</li>
                  </ul>
                </div>

                {/* 3. Remedial Guidance Box */}
                <div className="rounded-2xl bg-[#fff7ed] border border-[#fed7aa] p-3.5 text-xs text-[#9a3412] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <span className="text-sm">💡</span>
                    <div>
                      <strong>{isHi ? "शास्त्रीय परामर्श:" : "Remedial Guidance:"}</strong>{" "}
                      {isHi
                        ? "भगवान शिव एवं माता पार्वती की संयुक्त आराधना से दांपत्य जीवन में सुख, शांति एवं समृद्धि की प्राप्ति होती है।"
                        : "Worship of Lord Shiva and Goddess Parvati fosters mutual love, longevity, and marital bliss."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Groom Kundli (D-1) */}
          {activeTab === "boyChart" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0e4d8]">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                  {isHi ? `वर की जन्म कुण्डली (D-1 Rasi) — ${result.boy.name}` : `Groom's Lagna Chart (D-1 Rasi) — ${result.boy.name}`}
                </h3>
                <span className="text-xs font-bold text-[#d9531e]">
                  Lagna: {result.boy.lagna.rashi} ({result.boy.lagna.formattedDegree})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 flex justify-center">
                  <div className="w-full max-w-[340px] aspect-square">
                    <KundliChartSvg chart={result.boy} />
                  </div>
                </div>

                <div className="md:col-span-5 rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-3.5 shadow-2xs">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3b1812] pb-2 border-b border-[#f0e4d8] mb-2 flex items-center justify-between">
                    <span>{isTe ? "గ్రహ స్థితులు" : isHi ? "ग्रह स्थिति" : "Planetary Positions"}</span>
                    <span className="text-[10px] text-stone-400">Deg (Rashi)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {result.boy.planets.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#fff7ed]">
                        <span className="font-bold text-stone-800">{isHi ? p.nameHi : p.name}</span>
                        <span className="font-mono text-[11px] text-stone-600">
                          {p.formattedDegree} ({isHi ? p.rashiHi : p.rashi})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Bride Kundli (D-1) */}
          {activeTab === "girlChart" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0e4d8]">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                  {isHi ? `कन्या की जन्म कुण्डली (D-1 Rasi) — ${result.girl.name}` : `Bride's Lagna Chart (D-1 Rasi) — ${result.girl.name}`}
                </h3>
                <span className="text-xs font-bold text-rose-700">
                  Lagna: {result.girl.lagna.rashi} ({result.girl.lagna.formattedDegree})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 flex justify-center">
                  <div className="w-full max-w-[340px] aspect-square">
                    <KundliChartSvg chart={result.girl} />
                  </div>
                </div>

                <div className="md:col-span-5 rounded-2xl border border-rose-200 bg-[#fffdfd] p-3.5 shadow-2xs">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3b1812] pb-2 border-b border-[#f0e4d8] mb-2 flex items-center justify-between">
                    <span>{isHi ? "ग्रह स्थिति" : "Planetary Positions"}</span>
                    <span className="text-[10px] text-stone-400">Deg (Rashi)</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {result.girl.planets.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#fff9fa]">
                        <span className="font-bold text-stone-800">{isHi ? p.nameHi : p.name}</span>
                        <span className="font-mono text-[11px] text-stone-600">
                          {p.formattedDegree} ({isHi ? p.rashiHi : p.rashi})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Doshas Analysis */}
          {activeTab === "doshas" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nadi Dosha Card */}
              <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-sm font-bold text-[#3b1812]">{isTe ? "నాడీ దోష విశ్లేషణ" : isHi ? "नाड़ी दोष विचार" : "Nadi Dosha"}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    !result.nadiDosha.present || result.nadiDosha.cancelled
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200"
                  }`}>
                    {result.nadiDosha.cancelled
                      ? (isTe ? "పరిహారం" : isHi ? "परिहार" : "Cancelled")
                      : result.nadiDosha.present
                      ? (isTe ? "దోషం ఉంది" : isHi ? "उपस्थित" : "Present")
                      : (isTe ? "దోష రహితం" : isHi ? "मुक्त" : "Free")}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi ? result.nadiDosha.noteHi : result.nadiDosha.note}
                </p>
              </div>

              {/* Bhakoot Dosha Card */}
              <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-sm font-bold text-[#3b1812]">{isTe ? "భకూట్ దోష విశ్లేషణ" : isHi ? "भकूट दोष विचार" : "Bhakoot Dosha"}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    !result.bhakootDosha.present || result.bhakootDosha.cancelled
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {result.bhakootDosha.cancelled
                      ? (isTe ? "పరిహారం" : isHi ? "परिहार" : "Cancelled")
                      : result.bhakootDosha.present
                      ? (isTe ? "దోషం ఉంది" : isHi ? "उपस्थित" : "Present")
                      : (isTe ? "దోష రహితం" : isHi ? "मुक्त" : "Free")}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi ? result.bhakootDosha.noteHi : result.bhakootDosha.note}
                </p>
              </div>

              {/* Manglik Match Card */}
              <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-sm font-bold text-[#3b1812]">{isTe ? "మాంగ్లిక్ సామరస్యం" : isHi ? "मांगलिक सामंजस्य" : "Manglik Match"}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    result.manglikMatch.compatible
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200"
                  }`}>
                    {result.manglikMatch.compatible ? (isTe ? "అనుకూలం" : isHi ? "अनुकूल" : "Compatible") : (isTe ? "అసమానత" : isHi ? "असंगत" : "Mismatch")}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isHi ? result.manglikMatch.noteHi : result.manglikMatch.note}
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Remedial Guidance */}
          {activeTab === "remedies" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                {isTe ? "వైదిక వివాహ శాంతి & కళ్యాణ పరిహారాలు" : isHi ? "वैदिक वैवाहिक शांति एवं कल्याणकारी उपाय" : "Vedic Remedies & Marital Harmony Guidance"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <div className="rounded-2xl bg-[#fffcf7] p-4 border border-[#ecdac8]">
                  <h4 className="font-bold text-[#b45309] mb-1">
                    {isTe ? "1. శివ-పార్వతి & గౌరీ పూజ" : isHi ? "1. शिव-पार्वती एवं गौरी पूजा" : "1. Shiva-Parvati Sadhana"}
                  </h4>
                  <p className="text-xs text-stone-600">
                    {isHi
                      ? "विवाह पूर्व अथवा उपरांत भगवान शिव एवं माता पार्वती का रुद्राभिषेक तथा गौरी मंत्र का नियमित जप अखंड सौभाग्य प्रदान करता है।"
                      : "Joint worship of Lord Shiva and Maa Parvati with daily Gauri Stotra recitation bestows divine harmony and peace."}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffcf7] p-4 border border-[#ecdac8]">
                  <h4 className="font-bold text-[#b45309] mb-1">
                    {isTe ? "2. కుంభ వివాహం & శాంతి పూజ" : isHi ? "2. कुंभ विवाह एवं शांति अनुष्ठान" : "2. Kumbh Vivah & Shanti"}
                  </h4>
                  <p className="text-xs text-stone-600">
                    {isHi
                      ? "यदि कुंडलियों में उच्च मांगलिक अथवा गंभीर नाड़ी दोष हो, तो शास्त्रीय मान्यता अनुसार विवाह से पूर्व कुंभ विवाह या अश्वत्थ विवाह अनुशंसित है।"
                      : "In cases of severe uncancelled Manglik or Nadi dosha, classical shastras recommend symbolic Kumbh Vivah before the wedding."}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffcf7] p-4 border border-[#ecdac8]">
                  <h4 className="font-bold text-[#b45309] mb-1">
                    {isTe ? "3. శుభ వివాహ ముహూర్త నిర్ణయం" : isHi ? "3. शुभ विवाह मुहूर्त चयन" : "3. Auspicious Vivah Muhurat"}
                  </h4>
                  <p className="text-xs text-stone-600">
                    {isHi
                      ? "दोषों के निवारण में शुद्ध एवं बलवान विवाह लग्न मुहूर्त (त्रिबल शुद्धि, गुरु-सूर्य-चंद्र बल) अत्यंत प्रभावी सुरक्षा कवच बनता है।"
                      : "Selecting an astrologically fortified marriage muhurat with Tribala Shuddhi overrides minor astronomical afflictions."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Print Milan Modal */}
      {showPrintModal && result && (
        <PrintableMilanReport result={result} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
}

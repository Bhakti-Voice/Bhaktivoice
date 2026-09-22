"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Compass,
  Crown,
  Flame,
  LayoutGrid,
  Lock,
  MapPin,
  Moon,
  Navigation,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Table,
  User,
  ArrowRight,
} from "lucide-react";
import { defaultCity, filterCities, readDeviceLocation, type CityEntry } from "@/lib/spiritual-tools/geo";
import { generateKundli } from "@/lib/spiritual-tools/kundli";
import type { BirthPlace, KundliChart, PlanetPosition } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { KundliChartSvg } from "./KundliChartSvg";
import { ManglikCard } from "./ManglikCard";
import { KundliDashaTable } from "./KundliDashaTable";
import { AshtakavargaTable } from "./AshtakavargaTable";
import { PrintableKundliReport } from "./PrintableKundliReport";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";

// Zodiac traits mapping
const RASHI_TRAITS: Record<number, { en: string; hi: string; te: string }> = {
  0: { en: "Dynamic • Courageous • Pioneering", hi: "उत्साही • साहसी • कर्मठ", te: "ఉత్సాహవంతుడు • ధైర్యవంతుడు • చురుకైన" },
  1: { en: "Steadfast • Patient • Grounded", hi: "धैर्यवान • स्थिर • व्यावहारिक", te: "స్థిరత్వం • సహనం • ఆచరణాత్మక" },
  2: { en: "Curious • Intellectual • Adaptable", hi: "जिज्ञासु • बुद्धिमान • मिलनसार", te: "జిజ్ఞాస • మేధావి • సర్దుబాటు" },
  3: { en: "Intuitive • Nurturing • Empathetic", hi: "संवेदनशील • स्नेही • करुणामय", te: "సున్నితమైన • ప్రేమగల • దయామయుడు" },
  4: { en: "Confident • Generous • Natural Leader", hi: "आत्मविश्वासी • उदार • तेजस्वी", te: "ఆత్మవిశ్వాసం • ఉదారత • నాయకత్వం" },
  5: { en: "Analytical • Meticulous • Practical", hi: "विश्लेषणात्मक • परिश्रमी • कुशल", te: "విశ్లేషణాత్మక • నైపుణ్యం • ఆచరణాత్మక" },
  6: { en: "Harmonious • Diplomatic • Just", hi: "संतुलित • न्यायप्रिय • कलात्मक", te: "సమతుల్యత • న్యాయబద్ధత • కళాత్మక" },
  7: { en: "Intense • Passionate • Perceptive", hi: "गूढ़ • दृढ़निश्चयी • अनुसंधानी", te: "తీవ్రమైన • పట్టుదల • లోతైన ఆలోచన" },
  8: { en: "Philosophical • Optimistic • Truth-Seeker", hi: "दार्शनिक • आशावादी • धर्मनिष्ठ", te: "తాత్విక • ఆశావాద • ధర్మబద్ధత" },
  9: { en: "Disciplined • Practical • Ambitious", hi: "अनुशासित • व्यावहारिक • महत्वाकांक्षी", te: "క్రమశిక్షణ • ఆచరణాత్మక • ప్రతిష్టాత్మక" },
  10: { en: "Independent • Humanitarian • Wise", hi: "स्वतंत्र • मानवतावादी • विचारवान", te: "స్వతంత్ర • మానవతావాది • వివేకి" },
  11: { en: "Compassionate • Spiritual • Imaginative", hi: "दयालु • आध्यात्मिक • कल्पनाशील", te: "దయగల • ఆధ్యాత్మిక • సృజనాత్మక" },
};

// Nakshatra traits mapping
const NAKSHATRA_TRAITS: Record<string, { en: string; hi: string; te: string }> = {
  Shatabhisha: { en: "Mysterious • Healing • Innovative", hi: "गूढ़ • आरोग्यदायी • नवीन दृष्टिकोण", te: "రహస్యమయం • వైద్యం • నూతనత్వం" },
  Ashwini: { en: "Swift • Healing • Energetic", hi: "तीव्र • आरोग्यकारक • उत्साही", te: "వేగవంతమైన • వైద్యం • ఉత్సాహవంతుడు" },
  Bharani: { en: "Determined • Truthful • Creative", hi: "दृढ़संकल्पी • सत्यवादी • सहनशील", te: "దృఢనిశ్చయం • సత్యసంధుడు • సృజనాత్మక" },
  Krittika: { en: "Luminous • Courageous • Direct", hi: "तेजस्वी • साहसी • स्पष्टवक्ता", te: "తేజోవంతమైన • ధైర్యం • స్పష్టత" },
  Rohini: { en: "Charming • Artistic • Steadfast", hi: "आकर्षक • कलाप्रिय • स्थिर", te: "ఆకర్షణీయమైన • కళాకారుడు • స్థిరత్వం" },
  Mrigashira: { en: "Searching • Gentle • Curious", hi: "जिज्ञासु • कोमल • अन्वेषी", te: "శోధన • సున్నితమైన • ఆసక్తిగల" },
  Ardra: { en: "Transformative • Sharp • Intellectual", hi: "परिवर्तनशील • कुशाग्र • परिश्रमी", te: "పరివర్తన • చురుకైన • మేధస్సు" },
  Punarvasu: { en: "Benevolent • Restorative • Wise", hi: "उदार • धार्मिक • ज्ञानवान", te: "దాతృత్వం • పునరుద్ధరణ • జ్ఞానం" },
  Pushya: { en: "Auspicious • Nourishing • Spiritual", hi: "कल्याणकारी • पोषणकर्ता • धर्मपरायण", te: "శుభప్రదం • పోషణ • ఆధ్యాత్మికం" },
  Ashlesha: { en: "Intuitive • Mystical • Strategic", hi: "रहस्यमयी • चतुर • अंतर्मुखी", te: "అంతర్దృష్టి • మర్మమైన • వ్యూహాత్మక" },
  Magha: { en: "Royal • Ancestral • Dignified", hi: "तेजस्वी • स्वाभिमानी • पितृभक्त", te: "గౌరవప్రదమైన • వంశాభిమాని • నాయకత్వం" },
  PurvaPhalguni: { en: "Joyful • Creative • Prosperous", hi: "उल्लासी • कलाप्रेमी • भाग्यवान", te: "ఆనందమయం • సృజనాత్మక • భాగ్యవంతుడు" },
  UttaraPhalguni: { en: "Generous • Honorable • Supportive", hi: "सहायक • सत्यनिष्ठ • यशवान", te: "ఉదార • గౌరవనీయ • సహాయకారి" },
  Hasta: { en: "Skilled • Dexterous • Clever", hi: "हस्तशिल्पी • चतुर • साधनसम्पन्न", te: "నైపుణ్యం • చతురత • ప్రజ్ఞావంతుడు" },
  Chitra: { en: "Brilliant • Elegant • Designing", hi: "चित्रात्मक • सुरुचिपूर्ण • निर्माता", te: "అద్భుతమైన • సౌందర్యవంతమైన • సృష్టికర్త" },
  Swati: { en: "Independent • Adaptable • Gentle", hi: "स्वतंत्र • लचीला • सौम्य", te: "స్వతంత్ర • అనుకూల • మృదువైన" },
  Vishakha: { en: "Goal-Oriented • Focused • Resolute", hi: "लक्ष्योन्मुखी • एकाग्र • समर्पित", te: "లక్ష్యసాధన • ఏకాగ్రత • సంకల్పం" },
  Anuradha: { en: "Devoted • Harmonious • Friendly", hi: "भक्तिभाव • मैत्रिक • सहृदय", te: "భక్తిభావం • సామరస్యం • స్నేహశీలి" },
  Jyeshtha: { en: "Protective • Senior • Formidable", hi: "रक्षक • वरिष्ठ • प्रभावशाली", te: "రక్షణ • నాయకత్వం • ప్రభావవంతమైన" },
  Mula: { en: "Deep-Rooted • Investigative • Powerful", hi: "गंभीर • खोजी • शक्तिशाली", te: "లోతైన • విచారణ • శక్తివంతమైన" },
  PurvaAshadha: { en: "Invincible • Confident • Victorious", hi: "अजेय • विश्वासी • विजयी", te: "అజేయమైన • ఆత్మవిశ్వాసం • విజేత" },
  UttaraAshadha: { en: "Righteous • Steadfast • Enduring", hi: "सत्यवादी • धीर • यशस्वी", te: "ధర్మబద్ధమైన • స్థిరత్వం • చిరస్థాయి" },
  Shravana: { en: "Receptive • Attentive • Learned", hi: "श्रवणशील • ज्ञानी • विनम्र", te: "వినికిడి • విద్వాంసుడు • వినయం" },
  Dhanishta: { en: "Vibrant • Musical • Prosperous", hi: "उत्साही • संगीतप्रिय • धनवान", te: "సంగీతప్రియం • ఐశ్వర్యం • ప్రకాశవంతమైన" },
  PurvaBhadrapada: { en: "Passionate • Idealistic • Austere", hi: "तपस्वी • आदर्शवादी • दृढ़", te: "తపస్సు • ఆదర్శవంతమైన • తీవ్రమైన" },
  UttaraBhadrapada: { en: "Wise • Peaceful • Deeply Spiritual", hi: "शांत • ज्ञानी • मोक्षगामी", te: "ప్రశాంత • ఆధ్యాత్మిక • జ్ఞాని" },
  Revati: { en: "Compassionate • Wealthy • Nurturing", hi: "कल्याणमयी • समृद्ध • परोपकारी", te: "కారుణ్యం • సమృద్ధి • సంరక్షణ" },
};

export interface KundliToolProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function KundliTool({ isHi: propIsHi, isTe: propIsTe }: KundliToolProps = {}) {
  const locale = useLocale();
  const isHi = propIsHi !== undefined ? propIsHi : locale === "hi";
  const isTe = propIsTe !== undefined ? propIsTe : locale === "te";

  // Empty initial form state for user to enter their own birth details
  const defaultBirthPlace: BirthPlace = useMemo(() => defaultCity(), []);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState<BirthPlace>(defaultBirthPlace);
  const [cityQuery, setCityQuery] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [chart, setChart] = useState<KundliChart | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"chart" | "ashtakavarga" | "planets" | "houses" | "dasha" | "manglik">("chart");
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");

  const citySuggestions = useMemo(() => filterCities(cityQuery), [cityQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectCity(city: CityEntry | BirthPlace) {
    setCityQuery(city.name);
    setPlace(city);
    setCityDropdownOpen(false);
  }

  async function handleUseGPS() {
    setLocating(true);
    try {
      const loc = await readDeviceLocation();
      if (loc) {
        setCityQuery(isTe ? "నా ప్రస్తుత ప్రదేశం" : isHi ? "मेरी वर्तमान लोकेशन" : "My Current Location");
        setPlace(loc);
        setCityDropdownOpen(false);
      }
    } finally {
      setLocating(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!date || !time) return;
    setLoading(true);
    try {
      const selectedPlace = place || (cityQuery ? filterCities(cityQuery)[0] : defaultBirthPlace) || defaultBirthPlace;
      const newChart = generateKundli({
        name: name.trim() || (isTe ? "జాతకుడు" : isHi ? "जातक" : "Devotee"),
        date,
        time,
        place: selectedPlace,
      });
      setChart(newChart);
      setActiveTab("chart");
      setTimeout(() => {
        document.getElementById("kundli-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    setShowPrintModal(true);
  }

  async function handleShare() {
    if (!chart) return;
    const shareText = isHi
      ? `🕉️ जन्म कुंडली — ${chart.name}\n📍 स्थान: ${chart.place.name}\n📅 जन्म: ${chart.birthDate} ${chart.birthTime}\n\n• लग्न: ${chart.lagna.rashiHi} (${chart.lagna.formattedDegree})\n• चंद्र राशि: ${chart.moon.rashiHi} (${chart.moon.nakshatraHi}, पाद ${chart.moon.pada})\n• सूर्य राशि: ${chart.sun.rashiHi}\n• मांगलिक स्थिति: ${chart.manglik.levelHi}\n\nBhaktiVoice पर अपनी मुफ्त जन्म कुंडली देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🕉️ Janam Kundli — ${chart.name}\n📍 Place: ${chart.place.name}\n📅 Birth: ${chart.birthDate} ${chart.birthTime}\n\n• Lagna (Ascendant): ${chart.lagna.rashi} (${chart.lagna.formattedDegree})\n• Moon Sign: ${chart.moon.rashi} (${chart.moon.nakshatra}, Pada ${chart.moon.pada})\n• Sun Sign: ${chart.sun.rashi}\n• Manglik Status: ${chart.manglik.level}\n\nGenerate your free Vedic Janam Kundli on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: isTe ? "జన్మ కుండలి — భక్తి వాయిస్" : isHi ? "जन्म कुंडली — भक्ति वॉइस" : "Janam Kundli — BhaktiVoice",
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

  // Format birth date in full textual format (e.g. 15 June 1995)
  const formattedBirthDate = useMemo(() => {
    if (!date) return "";
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return date;
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthsHi = [
      "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ];
    const monthsTe = ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"];
    return isTe ? `${d} ${monthsTe[m - 1]} ${y}` : isHi ? `${d} ${monthsHi[m - 1]} ${y}` : `${d} ${months[m - 1]} ${y}`;
  }, [date, isHi]);

  // Format birth time (e.g. 06:30 AM)
  const formattedBirthTime = useMemo(() => {
    if (!time) return "";
    const [hStr, mStr] = time.split(":");
    const h = Number(hStr);
    const m = Number(mStr);
    if (isNaN(h) || isNaN(m)) return time;
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
  }, [time]);

  // Planet glyph/icon display helper
  const planetIcons: Record<string, string> = {
    sun: "☀️",
    moon: "🌙",
    mars: "♂",
    mercury: "☿",
    jupiter: "♃",
    venus: "♀",
    saturn: "♄",
    rahu: "☊",
    ketu: "☋",
  };

  const displayRashi = (rashi: string) => rashi.replace(/^Makara\b/, "Makar");
  const lagnaTraits = chart ? (RASHI_TRAITS[chart.lagna.rashiIndex] || RASHI_TRAITS[9]) : RASHI_TRAITS[9];
  const moonTraits = chart ? (RASHI_TRAITS[chart.moon.rashiIndex] || RASHI_TRAITS[10]) : RASHI_TRAITS[10];
  const sunTraits = chart ? (RASHI_TRAITS[chart.sun.rashiIndex] || RASHI_TRAITS[2]) : RASHI_TRAITS[2];
  const nakshatraTraits = chart ? (NAKSHATRA_TRAITS[chart.moon.nakshatra] || { en: "Mysterious • Healing • Innovative", hi: "गूढ़ • आरोग्यदायी • नवीन", te: "రహస్యమయం • వైద్యం • నూతనత్వం" }) : NAKSHATRA_TRAITS.Shatabhisha;

  return (
    <div className="space-y-8">
      {/* ========================================================= */}
      {/* 1. ENTER YOUR BIRTH DETAILS FORM (Matching Mockup) */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
        {/* Form Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-[#f0e4d8]">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812] flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="diya">🪔</span>
              <span>{isTe ? "మీ జన్మ వివరాలను నమోదు చేయండి" : isHi ? "अपना जन्म विवरण दर्ज करें" : "Enter Your Birth Details"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {isTe
                ? "మీ జన్మ కుండలిని రూపొందించడానికి ఖచ్చితమైన సమాచారాన్ని అందించండి"
                : isHi
                ? "सटीक जन्म कुंडली बनाने हेतु आवश्यक जन्म विवरण भरें"
                : "Provide accurate birth information to generate your Janam Kundli"}
            </p>
          </div>

          {/* Privacy Trust Badge */}
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#fffcf7] border border-amber-200/70 px-3.5 py-2">
            <ShieldCheck className="h-5 w-5 text-[#b45309] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] sm:text-xs font-bold text-[#9a3412] leading-tight">
                {isTe ? "మీ గోప్యత మా ప్రాధాన్యత" : isHi ? "आपकी गोपनीयता हमारी प्राथमिकता" : "Your Privacy is Our Priority"}
              </p>
              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                {isTe ? "మీ సమాచారం 100% సురక్షితం" : isHi ? "आपका डेटा 100% निजी व सुरक्षित है" : "Your information is 100% private and secure."}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Inputs Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="kundli-name" className="block text-xs font-bold text-stone-700 mb-1.5">
                {isTe ? "పూర్తి పేరు *" : isHi ? "पूरा नाम *" : "Full Name *"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  id="kundli-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isTe ? "మీ పూర్తి పేరు నమోదు చేయండి" : isHi ? "अपना पूरा नाम दर्ज करें" : "Enter your full name"}
                  className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                />
              </div>
              <p className="text-[10.5px] text-stone-400 mt-1 pl-1">
                {isTe ? "మీ పూర్తి పేరును నమోదు చేయండి" : isHi ? "अपना नाम दर्ज करें" : "Enter your full name"}
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="kundli-date" className="block text-xs font-bold text-stone-700 mb-1.5">
                {isTe ? "జన్మ తేదీ *" : isHi ? "जन्म तिथि *" : "Date of Birth *"}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  id="kundli-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                  required
                />
              </div>
              <p className="text-[10.5px] text-stone-400 mt-1 pl-1">
                {isTe ? "జన్మ తేదీని ఎంచుకోండి" : isHi ? "अपनी जन्म तिथि चुनें" : "Select your date of birth"}
              </p>
            </div>

            {/* Time of Birth */}
            <div>
              <label htmlFor="kundli-time" className="block text-xs font-bold text-stone-700 mb-1.5">
                {isTe ? "జన్మ సమయం *" : isHi ? "जन्म समय *" : "Time of Birth *"}
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  id="kundli-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                  required
                />
              </div>
              <p className="text-[10.5px] text-stone-400 mt-1 pl-1">
                {isTe ? "ఖచ్చితమైన సమయాన్ని ఎంచుకోండి (HH:MM)" : isHi ? "सटीक समय दर्ज करें (HH:MM)" : "Select exact time (HH:MM)"}
              </p>
            </div>

            {/* Place of Birth */}
            <div className="relative" ref={dropdownRef}>
              <label htmlFor="kundli-place" className="block text-xs font-bold text-stone-700 mb-1.5">
                {isTe ? "జన్మ స్థలం *" : isHi ? "जन्म स्थान *" : "Place of Birth *"}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  id="kundli-place"
                  type="text"
                  value={cityQuery}
                  onChange={(e) => {
                    setCityQuery(e.target.value);
                    setCityDropdownOpen(true);
                  }}
                  onFocus={() => setCityDropdownOpen(true)}
                  placeholder={isTe ? "నగరం పేరు (ఉదా. New Delhi)" : isHi ? "शहर का नाम (उदा. नई दिल्ली)" : "New Delhi"}
                  className="w-full rounded-2xl border border-[#ecdac8] bg-[#fffdfa] py-2.5 pl-9 pr-20 text-xs sm:text-sm text-stone-800 focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
                />
                <button
                  type="button"
                  onClick={handleUseGPS}
                  disabled={locating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-xl bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-[#d9531e] hover:bg-amber-500/20 transition disabled:opacity-50"
                  title="Use GPS Location"
                >
                  <Navigation className="h-3 w-3" />
                  <span>{locating ? "..." : "Use GPS"}</span>
                </button>
              </div>
              <p className="text-[10.5px] text-stone-400 mt-1 pl-1 truncate">
                {isTe ? "నగరం పేరు లేదా GPS వాడండి" : isHi ? "शहर का नाम चुनें अथवा GPS का उपयोग करें" : "Enter city name or use GPS for accurate location"}
              </p>

              {/* City Autocomplete Dropdown */}
              {cityDropdownOpen && citySuggestions.length > 0 && (
                <div className="absolute z-50 left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto rounded-2xl border border-[#ecdac8] bg-white p-1.5 shadow-lg">
                  {citySuggestions.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCity(c)}
                      className="w-full text-left rounded-xl px-3 py-2 text-xs text-stone-800 hover:bg-[#fff7ed] hover:text-[#d9531e] transition flex items-center justify-between"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-[10px] text-stone-400">{c.state || "India"}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Button & Subtext */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d9531e] via-[#c2410c] to-[#9a3412] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:opacity-75"
            >
              <Sun className="h-4 w-4" />
              <span>{loading ? (isTe ? "గణన జరుగుతోంది..." : isHi ? "गणना जारी है..." : "Generating Kundli...") : (isTe ? "కుండలిని రూపొందించండి →" : isHi ? "कुंडली बनाएं →" : "Generate Kundli →")}</span>
            </button>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-2 font-medium">
              {isTe
                ? "అధునాతన వైదిక గణనలు • తక్షణ ఫలితాలు • రిజిస్ట్రేషన్ అవసరం లేదు"
                : isHi
                ? "उन्नत वैदिक खगोलीय गणित • तात्कालिक परिणाम • पंजीकरण की आवश्यकता नहीं"
                : "Advanced Vedic calculations • Instant results • No registration required"}
            </p>
          </div>
        </form>
      </div>

      {/* Empty State Invitation when no chart generated yet */}
      {!chart && (
        <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#fffdfa] via-white to-[#fff9f0] p-6 sm:p-8 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#b45309] text-2xl font-serif mb-3">
            ॐ
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
            {isTe ? "మీ సంపూర్ణ జన్మ కుండలిని రూపొందించండి" : isHi ? "अपनी सम्पूर्ण वैदिक जन्म पत्रिका प्राप्त करें" : "Discover Your Complete Vedic Horoscope"}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed font-medium">
            {isTe
              ? "పై ఫారమ్‌లో మీ జన్మ వివరాలను నమోదు చేసి 'కుండలిని రూపొందించండి' బటన్‌ను క్లిక్ చేయండి."
              : isHi
              ? "कृपया ऊपर दिए गए फॉर्म में अपना जन्म विवरण भरें और 'कुंडली बनाएं' पर क्लिक करें।"
              : "Enter your birth date, exact time, and birthplace above and click 'Generate Kundli →' to instantly unlock your personal horoscope."}
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">📐</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "లగ్నం & నవాంశ (D1, D9)" : isHi ? "लग्न व नवांश (D1, D9)" : "Lagna & Navamsha"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "ఉత్తర & దక్షిణ శైలి" : isHi ? "उत्तर व दक्षिण शैली" : "North & South charts"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">🪐</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "నవగ్రహ స్థితులు" : isHi ? "नवग्रह स्थिति" : "Planetary Ephemeris"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "డిగ్రీలు & వక్రీ స్థితి" : isHi ? "अंश व वक्री स्थिति" : "Exact degrees & status"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">⏳</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "వింశోత్తరి మహాదశ" : isHi ? "विंशोत्तरी महादशा" : "Vimshottari Dasha"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "120 సంవత్సరాల కాలచక్రం" : isHi ? "120 वर्ष की कालचक्र गणना" : "120-year timeline"}</p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-white p-3 shadow-2xs">
              <span className="text-base">♂️</span>
              <h4 className="font-serif text-xs font-bold text-stone-900 mt-1">{isTe ? "మాంగ్లిక్ విశ్లేషణ" : isHi ? "मांगलिक दोष विचार" : "Manglik Analysis"}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{isTe ? "పరిహారాలు & మార్గాలు" : isHi ? "परिहार एवं उपाय" : "Dosha & remedies"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. RESULTS SECTION (Rendered when chart is generated) */}
      {/* ========================================================= */}
      {chart && (
        <div id="kundli-results" className="space-y-6">
          {/* A. Top Profile Banner Card */}
          <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-r from-[#fffcf8] via-[#fffdf9] to-[#fbf5ea] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden">
            <div className="flex items-center gap-4 z-10">
              {/* Om Avatar Circle */}
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fef3c7] to-[#fed7aa] border-2 border-amber-300 shadow-xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b45309]">
                  ॐ
                </span>
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c2410c] block">
                  {isTe ? "మీ జన్మ కుండలి" : isHi ? "आपकी जन्म पत्रिका" : "Your Janam Kundli"}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight mt-0.5">
                  {chart.name}
                </h2>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#d9531e]" /> {formattedBirthDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#d9531e]" /> {formattedBirthTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#d9531e]" /> {chart.place.name} ({chart.place.latitude.toFixed(1)}°N, {chart.place.longitude.toFixed(1)}°E)
                  </span>
                </p>
              </div>
            </div>

            {/* Right Side: Quote & Buttons */}
            <div className="flex flex-col items-start md:items-end gap-3 z-10">
              <p className="font-serif text-xs sm:text-sm font-bold italic text-[#4a1815] text-left md:text-right max-w-xs">
                “Every soul has a cosmic story — yours is written in the stars.”
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-2xl border border-[#ecdac8] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-stone-700 shadow-2xs hover:border-[#d9531e] hover:text-[#d9531e] transition active:scale-95"
                >
                  <Printer className="h-4 w-4 text-[#d9531e]" />
                  <span>{isTe ? "కుండలి ప్రింట్" : isHi ? "प्रिंट कुंडली" : "Print Kundli"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
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

          {/* B. 4 Vital Astrological Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Ascendant (Lagna) */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#b45309]">
                  <span className="text-xl">♑</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "లగ్నం" : isHi ? "लग्न (Ascendant)" : "Ascendant (Lagna)"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {isHi ? chart.lagna.rashiHi : isTe ? chart.lagna.rashi : displayRashi(chart.lagna.rashi)}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#d9531e]">{chart.lagna.formattedDegree}</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isHi ? lagnaTraits.hi : isTe ? lagnaTraits.te : lagnaTraits.en}
              </div>
            </div>

            {/* 2. Moon Sign */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-700">
                  <span className="text-xl">♒</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "చంద్ర రాశి" : isHi ? "चन्द्र राशि" : "Moon Sign"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {isHi ? chart.moon.rashiHi : isTe ? chart.moon.rashi : displayRashi(chart.moon.rashi)}
                  </h3>
                  <p className="text-xs font-mono font-bold text-cyan-700">{chart.moon.formattedDegree}</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isHi ? moonTraits.hi : isTe ? moonTraits.te : moonTraits.en}
              </div>
            </div>

            {/* 3. Sun Sign */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
                  <span className="text-xl">♊</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "సూర్య రాశి" : isHi ? "सूर्य राशि" : "Sun Sign"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {isHi ? chart.sun.rashiHi : isTe ? chart.sun.rashi : displayRashi(chart.sun.rashi)}
                  </h3>
                  <p className="text-xs font-mono font-bold text-amber-700">{chart.sun.formattedDegree}</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isHi ? sunTraits.hi : isTe ? sunTraits.te : sunTraits.en}
              </div>
            </div>

            {/* 4. Nakshatra */}
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700">
                  <span className="text-xl">✦</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isTe ? "జన్మ నక్షత్రం" : isHi ? "जन्म नक्षत्र" : "Nakshatra"}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-extrabold text-stone-900 truncate">
                    {isHi ? chart.moon.nakshatraHi : chart.moon.nakshatra}
                  </h3>
                  <p className="text-xs font-bold text-rose-700">
                    {isHi ? `पाद ${chart.moon.pada}` : `Pada ${chart.moon.pada}`}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#f0e4d8] text-[10.5px] text-stone-500 font-medium truncate">
                {isHi ? nakshatraTraits.hi : isTe ? nakshatraTraits.te : nakshatraTraits.en}
              </div>
            </div>
          </div>

          {/* C. Specialized Astrological Tools Bar */}
          <div className="rounded-2xl border border-[#ecdac8] bg-gradient-to-r from-[#fffcf8] via-white to-[#fffcf8] p-3 shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 text-[#b45309]">
              <span className="text-base">⭐</span>
              <span className="font-serif text-xs sm:text-sm font-bold text-[#3b1812]">
                {isTe ? "ప్రత్యేక జ్యోతిష్య సాధనాలు" : isHi ? "विशिष्ट ज्योतिषीय उपकरण" : "Specialized Astrological Tools"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("chart")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                🧭 Kundli Charts (16 Vargas)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("ashtakavarga")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                🏆 Ashtakavarga (SAV/BAV)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("planets")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                ☀️ Planetary Positions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("houses")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                🪟 12 Houses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dasha")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                ⏱️ Vimshottari Dasha
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("manglik")}
                className="rounded-xl border border-[#ecdac8] bg-white px-3 py-1 font-bold text-stone-700 hover:border-[#d9531e] hover:text-[#d9531e] transition shadow-2xs shrink-0"
              >
                🔥 Manglik Analysis
              </button>
            </div>
          </div>

          {/* D. Tab Navigation Bar */}
          <div className="border-b border-[#ecdac8] flex overflow-x-auto gap-2 sm:gap-6 text-xs sm:text-sm font-bold scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("chart")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "chart"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "కుండలి చక్రం (D-1)" : isHi ? "कुंडली चक्र (D-1)" : "Kundli Charts (D-1)"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ashtakavarga")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "ashtakavarga"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "అష్టకవర్గ" : isHi ? "अष्टकवर्ग" : "Ashtakavarga"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("planets")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "planets"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "గ్రహ స్థితులు" : isHi ? "ग्रह स्पष्ट" : "Planetary Positions"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("houses")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "houses"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "ద్వాదశ భావాలు" : isHi ? "द्वादश भाव" : "12 Houses"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("dasha")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "dasha"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "వింశోత్తరి మహాదశ" : isHi ? "विंशोत्तरी महादशा" : "Vimshottari Dasha"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manglik")}
              className={`pb-3 border-b-2 transition whitespace-nowrap px-1 ${
                activeTab === "manglik"
                  ? "border-[#d9531e] text-[#d9531e]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {isTe ? "మాంగ్లిక్ విశ్లేషణ" : isHi ? "मांगलिक विश्लेषण" : "Manglik Analysis"}
            </button>
          </div>

          {/* E. Tab 1 Content: Kundli Charts (D-1) & Right Sidebar */}
          {activeTab === "chart" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Rasi Chart (D-1) Card (~65% width) */}
              <div className="lg:col-span-8 rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-6 shadow-xs">
                {/* Chart Header with North/South Indian Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-[#f0e4d8]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#d9531e] font-serif font-bold">
                      ॐ
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812]">
                        {isTe ? "లగ్న చక్రం (D-1)" : isHi ? "लग्न चक्र (D-1)" : "Rasi Chart (D-1)"}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {isTe ? "జన్మ సమయ నవగ్రహ భావ స్థితులను చూపే చక్రం" : isHi ? "जन्म समय ग्रहों की भाव स्थिति दर्शाने वाला चक्र" : "Your birth chart showing the position of planets at the time of your birth"}
                      </p>
                    </div>
                  </div>

                  {/* North / South Indian Toggle */}
                  <div className="flex rounded-xl bg-[#fff7ed] border border-[#fed7aa] p-0.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setChartStyle("north")}
                      className={`rounded-lg px-3 py-1 transition ${
                        chartStyle === "north"
                          ? "bg-[#d9531e] text-white shadow-xs"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {isTe ? "ఉత్తర భారత శైలి" : isHi ? "उत्तर भारतीय" : "North Indian"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartStyle("south")}
                      className={`rounded-lg px-3 py-1 transition ${
                        chartStyle === "south"
                          ? "bg-[#d9531e] text-white shadow-xs"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {isTe ? "దక్షిణ భారత శైలి" : isHi ? "दक्षिण भारतीय" : "South Indian"}
                    </button>
                  </div>
                </div>

                {/* Main Body: Chart SVG on left + Planets Table on right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left Column: Chart Drawing */}
                  <div className="md:col-span-7 flex justify-center">
                    <div className="w-full max-w-[340px] aspect-square">
                      <KundliChartSvg chart={chart} />
                    </div>
                  </div>

                  {/* Right Column: Planets in D1 (Rasi) Table */}
                  <div className="md:col-span-5 rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-3.5 shadow-2xs">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#3b1812] pb-2 border-b border-[#f0e4d8] mb-2 flex items-center justify-between">
                      <span>{isTe ? "గ్రహ స్థితులు (D-1)" : isHi ? "ग्रह स्थिति (D-1)" : "Planets in D1 (Rasi)"}</span>
                      <span className="text-[10px] font-sans font-semibold text-stone-400">Deg (Sign)</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {chart.planets.map((p) => {
                        const degFormatted = `${Math.floor(p.degreeInSign)}°`;
                        const isRetro = p.retrograde;
                        return (
                          <div
                            key={p.id}
                            className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#fff7ed] transition"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{planetIcons[p.id] || "✦"}</span>
                              <span className="font-bold text-stone-800">
                                {isHi ? p.nameHi : p.name}
                                {isRetro && <span className="text-[#d9531e] ml-0.5">(R)</span>}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] font-semibold text-stone-600">
                              {degFormatted} ({isHi ? p.rashiHi : p.rashi})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Sidebar Cards (~35% width) */}
              <div className="lg:col-span-4 space-y-4">
                {/* 1. Manglik Dosha Analysis Card */}
                <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-500/15 text-rose-700 font-bold">
                        ♂
                      </div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#3b1812]">
                        {isTe ? "మాంగ్లిక్ దోష విశ్లేషణ" : isHi ? "मांगलिक दोष विश्लेषण" : "Manglik Dosha Analysis"}
                      </h4>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        chart.manglik.isManglik
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {chart.manglik.isManglik ? (isTe ? "దోషం ఉంది" : isHi ? "दोष उपस्थित" : "High") : (isTe ? "దోష రహితం" : isHi ? "दोष रहित" : "None")}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 font-medium">
                    Status: <strong className="text-stone-800">{chart.manglik.isManglik ? (isTe ? "మాంగ్లిక్ జాతకం" : isHi ? "मांगलिक पत्रिका" : "High Manglik") : (isTe ? "మాంగ్లిక్ దోష రహితం" : isHi ? "दोष रहित" : "Non-Manglik")}</strong>
                  </p>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {chart.manglik.isManglik
                      ? (isHi ? chart.manglik.descriptionHi : `Manglik Dosha present with Mars placed in House ${chart.manglik.fromLagna.house} from Lagna.`)
                      : (isHi ? "पत्रिका में कोई गंभीर मांगलिक दोष नहीं है।" : "No major Manglik Dosha found from Lagna or Moon.")}
                  </p>

                  {/* Remedial Guidance Box */}
                  <div className="mt-3.5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] p-3 text-[11px] text-[#9a3412] leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm">💡</span>
                      <div>
                        <strong>{isHi ? "शास्त्रीय उपाय:" : "Remedial Guidance:"}</strong>{" "}
                        {isHi
                          ? "भगवान शिव एवं हनुमान जी की उपासना शुभ है। विवाह पूर्व पारस्परिक कुंडली मिलान अनुशंसित है।"
                          : "Worship of Lord Shiva & Lord Hanuman is auspicious. Mutual horoscope matching is recommended before marriage."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Ascendant & Moon Lords Card */}
                <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/15 text-[#b45309]">
                      <Crown className="h-4 w-4" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#3b1812]">
                      {isTe ? "లగ్న & రాశ్యాధిపతులు" : isHi ? "लग्न एवं राशि स्वामी" : "Ascendant & Moon Lords"}
                    </h4>
                  </div>

                  <div className="divide-y divide-[#f0e4d8] text-xs">
                    <div className="flex justify-between py-2">
                      <span className="text-stone-500">{isTe ? "లగ్న భావాధిపతి" : isHi ? "लग्न भाव स्वामी" : "Ascendant Lord"}</span>
                      <strong className="text-stone-900">{chart.houses[0]?.rashiLord || "Saturn"}</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-stone-500">{isTe ? "చంద్ర రాశ్యాధిపతి" : isHi ? "चंद्र राशि स्वामी" : "Moon Sign Lord"}</span>
                      <strong className="text-stone-900">{chart.houses[chart.moon.house - 1]?.rashiLord || "Saturn"}</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-stone-500">{isTe ? "నక్షత్రాధిపతి" : isHi ? "नक्षत्र स्वामी" : "Nakshatra Lord"}</span>
                      <strong className="text-stone-900">{chart.vimshottariDasha.birthBalancePlanet || "Rahu"}</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-stone-500">{isTe ? "అయనాంశ పద్ధతి" : isHi ? "अयनांश प्रणाली" : "Ayanamsa"}</span>
                      <span className="font-bold text-[#d9531e]">Lahiri (23° 47&apos;)</span>
                    </div>
                  </div>
                </div>

                {/* 3. Understanding Your Kundli Educational Card */}
                <div className="rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]/40 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-[#0369a1] mb-2">
                    <BookOpen className="h-4 w-4" />
                    <h4 className="font-serif text-sm font-bold">
                      {isTe ? "కుండలిని ఎలా అర్థం చేసుకోవాలి" : isHi ? "कुंडली को कैसे समझें" : "Understanding Your Kundli"}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isHi
                      ? "आपकी कुंडली आपकी आत्मा की इस जन्म की यात्रा का मानचित्र है। नवग्रहों, द्वादश भावों और दशा चक्र के माध्यम से अपने जीवन, संबंधों और आध्यात्मिक पथ को समझें।"
                      : "Your Kundli is a map of your soul's journey. Explore the position of planets, houses and dashas to gain deeper insights into your life, relationships, career and spiritual path."}
                  </p>
                  <LocaleLink
                    href={PATHS.kundli}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline mt-2.5"
                  >
                    <span>{isHi ? "कुंडली पढ़ने के नियम जानें →" : "Learn more about reading your Kundli →"}</span>
                  </LocaleLink>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ashtakavarga */}
          {activeTab === "ashtakavarga" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <AshtakavargaTable chart={chart} />
            </div>
          )}

          {/* Tab 3: Planetary Positions Table */}
          {activeTab === "planets" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs overflow-x-auto">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812] mb-4">
                {isTe ? "సంపూర్ణ గ్రహ స్పష్ట పట్టిక" : isHi ? "सम्पूर्ण ग्रह स्पष्ट तालिका" : "Detailed Planetary Positions"}
              </h3>
              <table className="w-full border-collapse text-xs text-left min-w-[500px]">
                <thead>
                  <tr className="bg-[#fff7ed] border-b border-[#ecdac8] text-stone-700">
                    <th className="py-2.5 px-3 font-bold">Planet</th>
                    <th className="py-2.5 px-3 font-bold">Rashi (Sign)</th>
                    <th className="py-2.5 px-3 font-bold">Degree</th>
                    <th className="py-2.5 px-3 font-bold">House</th>
                    <th className="py-2.5 px-3 font-bold">Retrograde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e4d8]">
                  {chart.planets.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fffcf7]">
                      <td className="py-2.5 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{planetIcons[p.id] || "✦"}</span>
                        <span>{isHi ? p.nameHi : p.name}</span>
                      </td>
                      <td className="py-2.5 px-3">{isHi ? p.rashiHi : p.rashi}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#d9531e]">{p.formattedDegree}</td>
                      <td className="py-2.5 px-3 font-bold">House {p.house}</td>
                      <td className="py-2.5 px-3">{p.retrograde ? "Yes (R)" : "Direct"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 4: 12 Houses */}
          {activeTab === "houses" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812] mb-4">
                {isTe ? "ద్వాదశ భావాలు & భావ స్పష్టం" : isHi ? "द्वादश भाव एवं भाव स्पष्ट" : "12 Houses (Bhava Sphuta)"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {chart.houses.map((h) => (
                  <div key={h.houseNumber} className="rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-3 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-[#f0e4d8] pb-1.5 mb-1.5">
                      <span className="font-serif font-bold text-stone-900">House {h.houseNumber}</span>
                      <span className="text-[11px] font-bold text-[#d9531e]">{isHi ? h.rashiHi : h.rashi}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Lord: <strong>{h.rashiLord}</strong></p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Planets: {h.planets.length > 0 ? h.planets.map((p) => p.name).join(", ") : "None"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Vimshottari Dasha */}
          {activeTab === "dasha" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <KundliDashaTable vimshottari={chart.vimshottariDasha} />
            </div>
          )}

          {/* Tab 6: Manglik Analysis */}
          {activeTab === "manglik" && (
            <div className="rounded-3xl border border-[#ecdac8] bg-white p-5 sm:p-7 shadow-xs">
              <ManglikCard manglik={chart.manglik} />
            </div>
          )}
        </div>
      )}

      {/* Print Kundli Modal */}
      {showPrintModal && chart && (
        <PrintableKundliReport chart={chart} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
}

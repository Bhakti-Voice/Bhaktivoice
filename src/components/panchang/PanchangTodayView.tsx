"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  Globe,
  HelpCircle,
  Landmark,
  MapPin,
  Moon,
  Search,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Trophy,
  Target,
  XCircle,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getCityById, createGpsCity, type CityConfig } from "@/lib/panchang/cities";
import { CitySelectorModal } from "./CitySelectorModal";
import { getPanchang } from "@/lib/panchang/engine";
import { getDailyEphemeris } from "@/lib/panchang/ephemeris-engine";
import { GrahaSthitiTable } from "./GrahaSthitiTable";
import { PanchangShareCardModal } from "./PanchangShareCardModal";
import { NakshatraConstellationCard } from "./NakshatraConstellationCard";
import { MajorTempleTimings } from "./MajorTempleTimings";
import { PanchangExplanationModal } from "./PanchangExplanationModal";
import { MoonPhaseIcon } from "@/components/calendar/MoonPhaseIcon";
import type { DayPanchang } from "@/lib/panchang/types";
import { useLocale } from "@/lib/i18n/client";
import { PATHS } from "@/lib/seo/paths";

export type PanchangTodayViewProps = {
  initialDate?: string; // YYYY-MM-DD
  initialCityId?: string;
  pageMode?: "today" | "tomorrow" | "yesterday" | "custom";
};

// Namaste with Lotuses Artwork Component
function NamasteLotusIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-24 w-32 sm:h-28 sm:w-40 drop-shadow-xs ${className}`}
      aria-hidden="true"
    >
      {/* Soft Divine Aura */}
      <circle cx="80" cy="50" r="42" fill="url(#sunGlow)" opacity="0.6" />

      {/* Lotus Leaves & Petals Base */}
      <path
        d="M35 95 C 45 80, 70 85, 80 92 C 90 85, 115 80, 125 95 C 105 105, 55 105, 35 95 Z"
        fill="#a7f3d0"
        opacity="0.7"
      />
      {/* Pink Lotus Petals Left */}
      <path
        d="M50 92 C 40 75, 52 65, 62 76 C 58 84, 52 90, 50 92 Z"
        fill="url(#lotusPink)"
      />
      <path
        d="M62 90 C 56 70, 70 60, 76 75 C 72 82, 65 88, 62 90 Z"
        fill="url(#lotusPinkDark)"
      />
      {/* Pink Lotus Petals Right */}
      <path
        d="M110 92 C 120 75, 108 65, 98 76 C 102 84, 108 90, 110 92 Z"
        fill="url(#lotusPink)"
      />
      <path
        d="M98 90 C 104 70, 90 60, 84 75 C 88 82, 95 88, 98 90 Z"
        fill="url(#lotusPinkDark)"
      />

      {/* Hands in Namaste (Anjali Mudra) */}
      {/* Left Hand */}
      <path
        d="M74 40 C 74 33, 79 28, 80 25 C 81 28, 86 33, 86 40 L 86 65 C 86 70, 82 75, 80 75 C 78 75, 74 70, 74 65 Z"
        fill="#fcd34d"
        stroke="#f59e0b"
        strokeWidth="1.2"
      />
      {/* Left Wrist & Sleeves */}
      <path
        d="M65 72 C 68 62, 74 55, 76 42 C 78 43, 79 46, 78 55 C 77 65, 72 74, 68 76 Z"
        fill="#fbbf24"
      />
      {/* Right Wrist & Sleeves */}
      <path
        d="M95 72 C 92 62, 86 55, 84 42 C 82 43, 81 46, 82 55 C 83 65, 88 74, 92 76 Z"
        fill="#f59e0b"
      />

      {/* Bangles / Sacred Thread */}
      <ellipse cx="73" cy="74" rx="4" ry="2" fill="#ef4444" />
      <ellipse cx="87" cy="74" rx="4" ry="2" fill="#ef4444" />

      {/* Little Sparkles */}
      <circle cx="55" cy="30" r="1.5" fill="#f59e0b" />
      <circle cx="105" cy="32" r="1.5" fill="#f59e0b" />
      <circle cx="80" cy="15" r="2" fill="#fbbf24" />

      <defs>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lotusPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="lotusPinkDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function getMoonPhaseType(
  phaseAngle: number
): "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "full" | "waning-gibbous" | "third-quarter" | "waning-crescent" {
  if (phaseAngle < 15 || phaseAngle >= 345) return "new";
  if (phaseAngle < 75) return "waxing-crescent";
  if (phaseAngle < 105) return "first-quarter";
  if (phaseAngle < 165) return "waxing-gibbous";
  if (phaseAngle < 195) return "full";
  if (phaseAngle < 255) return "waning-gibbous";
  if (phaseAngle < 285) return "third-quarter";
  return "waning-crescent";
}

export function PanchangTodayView({
  initialDate,
  initialCityId,
  pageMode = "today",
}: PanchangTodayViewProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const [city, setCity] = useState<CityConfig>(() => getCityById(initialCityId));
  const [choghadiyaTab, setChoghadiyaTab] = useState<"day" | "night">("day");
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showPanchangModal, setShowPanchangModal] = useState(false);
  const [activeNavPill, setActiveNavPill] = useState<string>("panchang");
  const [showFullPanchang, setShowFullPanchang] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sync with localStorage on client mount if no explicit initialCityId
  useEffect(() => {
    if (initialCityId) return;
    try {
      const stored = localStorage.getItem("bhakti_selected_city_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.id && typeof parsed.latitude === "number" && typeof parsed.longitude === "number") {
          setCity(parsed);
        }
      }
    } catch {
      // Ignore storage error
    }
  }, [initialCityId]);

  const handleCityChange = (newCity: CityConfig) => {
    setCity(newCity);
    try {
      localStorage.setItem("bhakti_selected_city_config", JSON.stringify(newCity));
      localStorage.setItem("bhakti_selected_city", newCity.id);
    } catch {
      // Ignore storage error
    }
  };

  // Compute base date
  const targetDate = useMemo(() => {
    if (initialDate) {
      const [y, m, d] = initialDate.split("-").map(Number);
      return new Date(y, m - 1, d, 12, 0, 0);
    }
    const now = new Date();
    if (pageMode === "tomorrow") {
      return new Date(now.getTime() + 24 * 3600_000);
    }
    if (pageMode === "yesterday") {
      return new Date(now.getTime() - 24 * 3600_000);
    }
    return now;
  }, [initialDate, pageMode]);

  const panchang: DayPanchang = useMemo(() => {
    return getPanchang(targetDate, city);
  }, [targetDate, city]);

  const ephemeris = useMemo(() => {
    return getDailyEphemeris(targetDate, city);
  }, [targetDate, city]);

  function formatTime(d: Date | null): string {
    if (!d) return "--:--";
    return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  }

  // Date Parsing for Big Orange Calendar Tile
  const monthAbbr = targetDate
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const dayNumber = targetDate.getDate();
  const fullYear = targetDate.getFullYear();
  const fullWeekday = targetDate.toLocaleString("en-US", { weekday: "long" });

  const formattedFullDate = new Intl.DateTimeFormat(
    isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(targetDate);

  // Lunar Tithi & Samvat Subheader String
  const tithiName = isHi
    ? panchang.tithiAtSunrise.nameHi
    : isTe
    ? panchang.tithiAtSunrise.name
    : panchang.tithiAtSunrise.name;

  const pakshaName =
    panchang.tithiAtSunrise.paksha === "shukla"
      ? isTe
        ? "శుక్ల పక్షం"
        : isHi
        ? "शुक्ल पक्ष"
        : "Shukla"
      : isTe
      ? "కృష్ణ పక్షం"
      : isHi
      ? "कृष्ण पक्ष"
      : "Krishna";

  const masaName = isHi
    ? panchang.masaPurnimanta.nameHi
    : panchang.masaPurnimanta.name;

  const samvatString = `${masaName} ${pakshaName} ${tithiName}, ${
    isTe ? "విక్రమ సంవత్" : isHi ? "विक्रम संवत" : "Vikram Samvat"
  } ${panchang.vikramSamvat}`;

  // Actions
  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: isTe
            ? `నేటి పంచాంగం (${panchang.gregorianLabel})`
            : isHi
            ? `आज का पंचांग (${panchang.gregorianLabelHi})`
            : `Today's Panchang (${panchang.gregorianLabel})`,
          text: `${formattedFullDate} — ${tithiName} (${pakshaName}), ${isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}`,
          url: window.location.href,
        });
        return;
      } catch {
        // User dismissed share
      }
    }
    setShowCardModal(true);
  }

  function handleAddToCalendar() {
    const title = isTe
      ? `పంచాంగం - ${panchang.gregorianLabel}`
      : isHi
      ? `पंचांग - ${panchang.gregorianLabelHi}`
      : `Panchang - ${panchang.gregorianLabel}`;

    const details = `Tithi: ${tithiName} (${pakshaName}) | Nakshatra: ${
      isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name
    } | Sunrise: ${formatTime(panchang.sunrise)} | Rahu Kaal: ${formatTime(
      panchang.rahuKaal.start
    )} - ${formatTime(panchang.rahuKaal.end)}`;

    const yyyymmdd = targetDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&dates=${yyyymmdd}/${yyyymmdd}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleMyLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setShowCityModal(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsCity = createGpsCity({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          elevationMeters: pos.coords.altitude || 0,
          label: isTe
            ? "నా స్థానం (GPS)"
            : isHi
            ? "मेरा स्थान (GPS)"
            : "My Location (GPS)",
        });
        handleCityChange(gpsCity);
      },
      () => {
        // If permission denied or error, open city modal
        setShowCityModal(true);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }

  // Smooth scroll to sections from Navigation Pills Bar
  function scrollToSection(id: string, pillKey: string) {
    setActiveNavPill(pillKey);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // FAQ Items with Localized Content
  const faqData = useMemo(() => {
    return [
      {
        question: isTe
          ? "పంచాంగం అంటే ఏమిటి మరియు దీని ప్రాముఖ్యత ఏమిటి?"
          : isHi
          ? "पंचांग क्या है और इसका क्या महत्व है?"
          : "What is a Panchang and why is it important?",
        answer: isTe
          ? "పంచాంగం అనేది వైదిక జ్యోతిష్యంలోని 5 ముఖ్య అంగాలు: తిథి, వారం, నక్షత్రం, యోగం మరియు కరణం. ప్రతి రోజు పనులను శుభ ముహూర్తంలో ప్రారంభించి, రాహుకాలం వంటి అశుభ సమయాలను విడిచిపెట్టడానికి ఇది దిశానిర్దేశం చేస్తుంది."
          : isHi
          ? "पंचांग वैदिक ज्योतिष का वह दर्पण है जो पांच प्रमुख अंगों (तिथि, वार, नक्षत्र, योग और करण) को दर्शाता है। यह प्रतिदिन शुभ कार्यों के आरम्भ, पूजा-अनुष्ठान और राहु काल आदि अशुभ अवधियों से बचाव हेतु अचूक मार्गदर्शक है।"
          : "A Panchang represents the five celestial limbs of Vedic astrology: Tithi (Lunar day), Vara (Weekday), Nakshatra (Constellation), Yoga, and Karana. It helps plan spiritual activities, auspicious beginnings, and avoid inauspicious hours like Rahu Kaal.",
      },
      {
        question: isTe
          ? "తిథి, నక్షత్రం మరియు ముహూర్తాలను ఎలా గణిస్తారు?"
          : isHi
          ? "तिथि, नक्षत्र और मुहूर्त की गणना कैसे की जाती है?"
          : "How is Tithi, Nakshatra and Muhurat calculated?",
        answer: isTe
          ? "సూర్యుడు మరియు చంద్రుని ఖగోళ స్థానాల మధ్య దూరం ఆధారంగా తిథి లెక్కించబడుతుంది (ప్రతి 12 డిగ్రీలకు ఒక తిథి). చంద్రుడు రాశిచక్రంలోని 27 నక్షత్రాలలో సంచరించే స్థానం ప్రకారం నక్షత్రం నిర్ణయించబడుతుంది."
          : isHi
          ? "सूर्य और चंद्रमा के कोणीय अंतर (प्रत्येक 12 अंश) से तिथि बनती है। चंद्रमा आकाश के 27 नक्षत्र मंडलों में जिस तारा समूह पर स्थित होता है, वह दिन का नक्षत्र कहलाता है। स्थानीय सूर्योदय से शुभ-अशुभ मुहूर्त निर्धारित होते हैं।"
          : "Tithi is determined by the 12° longitudinal separation between Sun and Moon. Nakshatra is the stellar segment occupied by the Moon, and Muhurats are derived based on local sunrise and sunset timings.",
      },
      {
        question: isTe
          ? "కొత్త వ్యాపారం లేదా ప్రాజెక్ట్ ప్రారంభించడానికి ఏ సమయం ఉత్తమం?"
          : isHi
          ? "नया व्यापार या प्रोजेक्ट शुरू करने के लिए कौन सा समय सबसे उत्तम है?"
          : "Which time is best for starting a new business or project?",
        answer: isTe
          ? "అభిజిత్ ముహూర్తం (బుధవారం తప్ప), శుభ చోఘడియా (అమృత, శుభ, లాభం), మరియు రోహిణి, పుష్యమి, హస్త లేదా చిత్త నక్షత్రాలు కొత్త వ్యాపారాలు లేదా ఒప్పందాలకు అత్యంత శ్రేష్ఠమైనవి."
          : isHi
          ? "अभिजित मुहूर्त (बुधवार को छोड़कर), शुभ चौघड़िया (अमृत, शुभ, लाभ) और पुष्य, रोहिणी, हस्त अथवा चित्रा नक्षत्र नए व्यापार, गृह प्रवेश या वित्तीय निवेश के लिए सर्वाधिक फलदायी माने जाते हैं।"
          : "Abhijit Muhurat (except Wednesdays), Shubh Choghadiya periods (Amrit, Shubh, Labh), and nakshatras like Pushya, Rohini, Hasta, or Chitra are most prosperous for starting new ventures.",
      },
      {
        question: isTe
          ? "రాహుకాలం అంటే ఏమిటి మరియు దానిని ఎందుకు విడిచిపెట్టాలి?"
          : isHi
          ? "राहु काल क्या है और इसमें शुभ कार्य क्यों नहीं करने चाहिए?"
          : "What is Rahu Kaal and should we avoid it?",
        answer: isTe
          ? "రాహుకాలం ప్రతిరోజూ దాదాపు 90 నిమిషాలు ఉండే అశుభ సమయం. ఛాయాగ్రహమైన రాహువు ప్రభావం వల్ల ఈ సమయంలో ప్రారంభించే నూతన పనులు, ప్రయాణాలు లేదా ఒప్పందాలు ఆటంకాలను ఎదుర్కొనే అవకాశం ఉంటుంది."
          : isHi
          ? "राहु काल प्रतिदिन लगभग 90 मिनट की एक अशुभ अवधि है जो छाया ग्रह राहु द्वारा शासित होती है। इस काल में नए सौदे, गृह प्रवेश, विवाह वार्ता अथवा शुभ यात्रा आरम्भ करने से बचना चाहिए।"
          : "Rahu Kaal is an inauspicious 90-minute period occurring daily governed by the shadowy planet Rahu. Auspicious beginnings, financial investments, and journeys are traditionally avoided during this window.",
      },
    ];
  }, [isHi, isTe]);

  const filteredFaqs = useMemo(() => {
    if (!faqSearchQuery.trim()) return faqData;
    const query = faqSearchQuery.toLowerCase();
    return faqData.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query)
    );
  }, [faqData, faqSearchQuery]);

  // Day Navigation Hrefs
  const prevDayHref =
    pageMode === "tomorrow"
      ? PATHS.panchangToday
      : pageMode === "today"
      ? PATHS.panchangYesterday
      : null;

  const nextDayHref =
    pageMode === "yesterday"
      ? PATHS.panchangToday
      : pageMode === "today"
      ? PATHS.panchangTomorrow
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* 1. TOP MAIN DATE & EPHEMERIS CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-white p-5 shadow-xs sm:p-6 lg:p-7">
        {/* Top Control Bar: Day Navigation Tabs with Arrows & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-amber-100/90">
          {/* Day Navigation Tabs with Left/Right Arrows */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 max-w-full">
            {prevDayHref ? (
              <LocaleLink
                href={prevDayHref}
                aria-label={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}
                title={isTe ? "మునుపటి రోజు" : isHi ? "पिछला दिन" : "Previous Day"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200/90 bg-amber-50/50 text-amber-900 hover:border-amber-400 hover:bg-white transition shadow-2xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </LocaleLink>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200/40 bg-amber-50/20 text-amber-300/60 cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </span>
            )}

            <LocaleLink
              href={PATHS.panchangYesterday}
              className={`shrink-0 rounded-xl px-2.5 sm:px-3.5 py-1.5 text-xs transition active:scale-95 ${
                pageMode === "yesterday"
                  ? "bg-[#ea580c] text-white shadow-xs font-bold ring-2 ring-orange-300/50"
                  : "border border-amber-200/80 bg-amber-50/40 text-[#5c4033] hover:border-amber-400 hover:bg-white hover:text-ink font-semibold"
              }`}
            >
              {isTe ? "నిన్న" : isHi ? "कल (बीता हुआ)" : "Yesterday"}
            </LocaleLink>

            <LocaleLink
              href={PATHS.panchangToday}
              className={`shrink-0 rounded-xl px-3 sm:px-4 py-1.5 text-xs transition active:scale-95 ${
                pageMode === "today"
                  ? "bg-[#ea580c] text-white shadow-xs font-bold ring-2 ring-orange-300/50"
                  : "border border-amber-200/80 bg-amber-50/40 text-[#5c4033] hover:border-amber-400 hover:bg-white hover:text-ink font-semibold"
              }`}
            >
              {isTe ? "ఈరోజు" : isHi ? "आज" : "Today"}
            </LocaleLink>

            <LocaleLink
              href={PATHS.panchangTomorrow}
              className={`shrink-0 rounded-xl px-2.5 sm:px-3.5 py-1.5 text-xs transition active:scale-95 ${
                pageMode === "tomorrow"
                  ? "bg-[#ea580c] text-white shadow-xs font-bold ring-2 ring-orange-300/50"
                  : "border border-amber-200/80 bg-amber-50/40 text-[#5c4033] hover:border-amber-400 hover:bg-white hover:text-ink font-semibold"
              }`}
            >
              {isTe ? "రేపు" : isHi ? "कल (आने वाला)" : "Tomorrow"}
            </LocaleLink>

            {nextDayHref ? (
              <LocaleLink
                href={nextDayHref}
                aria-label={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}
                title={isTe ? "తరువాతి రోజు" : isHi ? "अगला दिन" : "Next Day"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200/90 bg-amber-50/50 text-amber-900 hover:border-amber-400 hover:bg-white transition shadow-2xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </LocaleLink>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200/40 bg-amber-50/20 text-amber-300/60 cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-[#3b2b20] shadow-2xs hover:border-amber-400 hover:bg-amber-50/50 transition active:scale-95 cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5 text-muted" />
              <span>{isTe ? "షేర్ చేయండి" : isHi ? "शेयर करें" : "Share"}</span>
            </button>

            {/* Add to Calendar */}
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50/70 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 shadow-2xs hover:bg-emerald-100 transition active:scale-95 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-emerald-700" />
              <span>{isTe ? "+ క్యాలెండర్‌కు జోడించు" : isHi ? "+ कैलेंडर में जोड़ें" : "+ Add to Calendar"}</span>
            </button>

            {/* My Location Button */}
            <button
              type="button"
              onClick={handleMyLocation}
              className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50/80 px-3.5 py-1.5 text-xs font-semibold text-orange-950 shadow-2xs hover:bg-orange-100 transition active:scale-95 cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 text-orange-600" />
              <span>{isTe ? "నా స్థానం" : isHi ? "मेरा स्थान" : "My Location"}</span>
            </button>
          </div>
        </div>

        {/* Date Display and Sacred Artwork Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Large Orange Calendar Tile + Date Titles */}
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Orange Calendar Tile */}
            <div className="flex shrink-0 flex-col overflow-hidden rounded-2xl border border-orange-600 bg-gradient-to-b from-[#ea580c] to-[#c2410c] text-center shadow-md w-24 sm:w-28">
              {/* Month Header Banner */}
              <div className="bg-[#9a3412]/60 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-100">
                {monthAbbr}
              </div>
              {/* Day Big Number */}
              <div className="py-1 font-serif text-4xl sm:text-5xl font-black text-white leading-none">
                {dayNumber}
              </div>
              {/* Day & Year Footer */}
              <div className="border-t border-orange-500/50 bg-[#9a3412]/30 py-1 text-[11px] font-bold text-orange-100">
                <span>{fullWeekday}</span>
                <span className="block text-[10px] opacity-90">{fullYear}</span>
              </div>
            </div>

            {/* Date Details & Location */}
            <div className="space-y-1.5 pt-0.5">
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#271b12]">
                {formattedFullDate}
              </h2>

              <p className="font-serif text-xs sm:text-sm font-semibold text-[#7c6351]">
                {samvatString}
              </p>

              {/* Location Badge + Change Link */}
              <div className="pt-1 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-[#3d2c20]">
                  <MapPin className="h-3.5 w-3.5 text-saffron-deep" />
                  <span>{isHi ? city.nameHi : city.name}, {city.country === "India" ? (isHi ? "भारत" : "India") : city.country}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowCityModal(true)}
                  className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition cursor-pointer"
                >
                  {isTe ? "మార్చండి" : isHi ? "बदलें" : "Change"}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Sacred Namaste Lotus Illustration */}
          <div className="hidden md:flex items-center justify-end pr-2 opacity-90">
            <NamasteLotusIllustration className="h-20 w-28 lg:h-24 lg:w-32" />
          </div>
        </div>

        {/* Bottom 5-Metric Celestial Strip */}
        <div className="mt-6 pt-5 border-t border-line/70 grid grid-cols-2 gap-2 sm:gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {/* Sunrise */}
          <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50/60 to-white p-2.5 shadow-2xs min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Sunrise className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-muted uppercase truncate">
                {isTe ? "సూర్యోదయం" : isHi ? "सूर्योदय" : "Sunrise"}
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-ink whitespace-nowrap block">
                {formatTime(panchang.sunrise)}
              </span>
            </div>
          </div>

          {/* Sunset */}
          <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-orange-200/70 bg-gradient-to-r from-orange-50/60 to-white p-2.5 shadow-2xs min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Sunset className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-muted uppercase truncate">
                {isTe ? "సూర్యాస్తమయం" : isHi ? "सूर्यास्त" : "Sunset"}
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-ink whitespace-nowrap block">
                {formatTime(panchang.sunset)}
              </span>
            </div>
          </div>

          {/* Moonrise */}
          <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-indigo-200/70 bg-gradient-to-r from-indigo-50/60 to-white p-2.5 shadow-2xs min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Moon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-muted uppercase truncate">
                {isTe ? "చంద్రోదయం" : isHi ? "चंद्रोदय" : "Moonrise"}
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-ink whitespace-nowrap block">
                {formatTime(panchang.moon.moonrise)}
              </span>
            </div>
          </div>

          {/* Moonset */}
          <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-slate-200/70 bg-gradient-to-r from-slate-50/60 to-white p-2.5 shadow-2xs min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Moon className="h-4 w-4 rotate-180" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold text-muted uppercase truncate">
                {isTe ? "చంద్రాస్తమయం" : isHi ? "चंद्रास्त" : "Moonset"}
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-ink whitespace-nowrap block">
                {formatTime(panchang.moon.moonset)}
              </span>
            </div>
          </div>

          {/* Moon Phase */}
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-sky-200/70 bg-gradient-to-r from-sky-50/60 to-white p-2.5 shadow-2xs min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <MoonPhaseIcon phase={getMoonPhaseType(panchang.moon.phaseAngle)} className="h-4 w-4" illumination={panchang.moon.illumination} />
            </div>
            <div className="min-w-0 truncate">
              <span className="block text-[10px] font-semibold text-muted uppercase truncate">
                {isTe ? "చంద్ర దశ" : isHi ? "चंद्र कला" : "Moon Phase"}
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-ink truncate block">
                {isHi ? panchang.moon.phaseNameHi : panchang.moon.phaseName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HORIZONTAL NAVIGATION PILLS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => scrollToSection("panchang-limbs", "panchang")}
          className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "panchang"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          {isTe ? "నేటి పంచాంగం" : isHi ? "आज का पंचांग" : "Today's Panchang"}
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("shubh-muhurat", "shubh")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "shubh"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>{isTe ? "శుభ ముహూర్తం" : isHi ? "शुभ मुहूर्त" : "Shubh Muhurat"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("festivals-section", "festivals")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "festivals"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
          <span>{isTe ? "వ్రతాలు & పండుగలు" : isHi ? "व्रत एवं पर्व" : "Vrat & Festivals"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("choghadiya-section", "choghadiya")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "choghadiya"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Clock className="h-3.5 w-3.5 text-indigo-500" />
          <span>{isTe ? "చోఘడియా" : isHi ? "चौघड़िया" : "Choghadiya"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("ashubh-muhurat", "rahu")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "rahu"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Shield className="h-3.5 w-3.5 text-rose-500" />
          <span>{isTe ? "రాహుకాలం" : isHi ? "राहु काल" : "Rahu Kaal"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("ashubh-muhurat", "yamgandam")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "yamgandam"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Clock className="h-3.5 w-3.5 text-rose-500" />
          <span>{isTe ? "యమగండం" : isHi ? "यमगण्ड" : "Yamgandam"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("ashubh-muhurat", "gulika")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "gulika"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
          <span>{isTe ? "గుళిక కాలం" : isHi ? "गुलिक काल" : "Gulika Kaal"}</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("graha-sthiti-section", "graha")}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer ${
            activeNavPill === "graha"
              ? "bg-[#ea580c] text-white shadow-xs"
              : "border border-line bg-white text-muted hover:border-amber-400 hover:text-ink"
          }`}
        >
          <Globe className="h-3.5 w-3.5 text-blue-500" />
          <span>{isTe ? "గ్రహ స్థితులు" : isHi ? "ग्रह स्थिति" : "Planetary Positions"}</span>
        </button>
      </div>

      {/* 3. THE 5 VEDIC LIMBS (PANCHANG) + AAJ KA VICHAR */}
      <section id="panchang-limbs" className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-xl sm:text-2xl font-bold text-ink">
            <span className="text-xl sm:text-2xl">🕉️</span>
            <span>{isTe ? "పంచాంగం యొక్క 5 ముఖ్య అంగాలు" : isHi ? "पंचांग के पांच मुख्य अंग" : "The 5 Vedic Limbs (Panchang)"}</span>
          </h2>

          <button
            type="button"
            onClick={() => setShowPanchangModal(true)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-muted hover:border-amber-400 hover:text-ink transition shadow-2xs cursor-pointer"
          >
            {isTe ? "పంచాంగం అంటే ఏమిటి?" : isHi ? "पंचांग क्या है?" : "What is Panchang?"}
          </button>
        </div>

        {/* 5 Limb Cards + Aaj Ka Vichar in Responsive Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* 1. Tithi */}
          <div className="rounded-3xl border border-line/80 bg-white p-4 shadow-2xs transition hover:border-amber-300">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Flame className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {isTe ? "తిథి" : isHi ? "तिथि" : "Tithi"}
              </span>
            </div>
            <h3 className="mt-2.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted truncate">
              {isTe
                ? `${formatTime(panchang.tithiAtSunrise.end)} వరకు`
                : isHi
                ? `${formatTime(panchang.tithiAtSunrise.end)} तक`
                : `till ${formatTime(panchang.tithiAtSunrise.end)}`}
            </p>
          </div>

          {/* 2. Nakshatra */}
          <div className="rounded-3xl border border-line/80 bg-white p-4 shadow-2xs transition hover:border-sky-300">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}
              </span>
            </div>
            <h3 className="mt-2.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted truncate">
              {isTe
                ? `${formatTime(panchang.nakshatra.end)} వరకు`
                : isHi
                ? `${formatTime(panchang.nakshatra.end)} तक`
                : `till ${formatTime(panchang.nakshatra.end)}`}
            </p>
          </div>

          {/* 3. Yoga */}
          <div className="rounded-3xl border border-line/80 bg-white p-4 shadow-2xs transition hover:border-rose-300">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {isTe ? "యోగం" : isHi ? "योग" : "Yoga"}
              </span>
            </div>
            <h3 className="mt-2.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isHi ? panchang.yoga.nameHi : panchang.yoga.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted truncate">
              {isTe
                ? `${formatTime(panchang.yoga.end)} వరకు`
                : isHi
                ? `${formatTime(panchang.yoga.end)} तक`
                : `till ${formatTime(panchang.yoga.end)}`}
            </p>
          </div>

          {/* 4. Karana */}
          <div className="rounded-3xl border border-line/80 bg-white p-4 shadow-2xs transition hover:border-emerald-300">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {isTe ? "కరణం" : isHi ? "करण" : "Karana"}
              </span>
            </div>
            <h3 className="mt-2.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isHi ? panchang.karana.nameHi : panchang.karana.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted truncate">
              {isTe
                ? `${formatTime(panchang.karana.end)} వరకు`
                : isHi
                ? `${formatTime(panchang.karana.end)} तक`
                : `till ${formatTime(panchang.karana.end)}`}
            </p>
          </div>

          {/* 5. Vara */}
          <div className="rounded-3xl border border-line/80 bg-white p-4 shadow-2xs transition hover:border-purple-300">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {isTe ? "వారం" : isHi ? "वार" : "Vara"}
              </span>
            </div>
            <h3 className="mt-2.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isHi ? panchang.weekdayNameHi : panchang.weekdayName}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted truncate">
              {panchang.weekdayNameHi}
            </p>
          </div>

          {/* 6. Aaj Ka Vichar */}
          <div className="col-span-2 sm:col-span-1 rounded-3xl border border-rose-200/70 bg-gradient-to-br from-rose-50/70 via-orange-50/50 to-rose-50/60 p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <Flame className="h-4 w-4 text-orange-600" />
              <span>{isTe ? "నేటి సుభాషితం" : isHi ? "आज का विचार" : "Aaj ka Vichar"}</span>
            </div>
            <p className="my-2 font-serif text-xs italic text-[#4a2e22] leading-snug">
              {isTe
                ? "క్రమశిక్షణతో కూడిన మనస్సు శాంతి, శ్రేయస్సు మరియు ప్రయోజనాన్ని చేకూరుస్తుంది."
                : isHi
                ? "अनुशासित मन ही शांति, समृद्धि और सार्थकता की कुंजी है।"
                : "A disciplined mind brings peace, prosperity and purpose."}
            </p>
            <span className="text-[10px] text-rose-400 font-bold">—</span>
          </div>
        </div>
      </section>

      {/* 4. 3-COLUMN ROW: AUSPICIOUS MUHURAT | INAUSPICIOUS PERIODS | NAKSHATRA DETAILS */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Column 1: Today's Auspicious Muhurat (Shubh) */}
        <div
          id="shubh-muhurat"
          className="flex flex-col justify-between rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white p-4 sm:p-5 shadow-2xs"
        >
          <div>
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-emerald-950 truncate">
                  {isTe
                    ? "నేటి శుభ ముహూర్తాలు (శుభ)"
                    : isHi
                    ? "आज के शुभ मुहूर्त"
                    : "Today's Auspicious Muhurat (Shubh)"}
                </h3>
              </div>
              <LocaleLink
                href={PATHS.muhurat}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition shrink-0"
              >
                {isTe ? "అన్నీ చూడండి" : isHi ? "सभी देखें" : "View All"}
              </LocaleLink>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Brahma Muhurat */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-emerald-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <Sunrise className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "బ్రహ్మ ముహూర్తం" : isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}
                  </span>
                </div>
                <span className="font-serif text-xs font-semibold text-emerald-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.brahmaMuhurat.start)} – {formatTime(panchang.brahmaMuhurat.end)}
                </span>
              </div>

              {/* Abhijit Muhurat */}
              {panchang.abhijitMuhurat ? (
                <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-emerald-100/80 shadow-2xs gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <Target className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-ink truncate">
                      {isTe ? "అభిజిత్ ముహూర్తం" : isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}
                    </span>
                  </div>
                  <span className="font-serif text-xs font-semibold text-emerald-950 shrink-0 whitespace-nowrap">
                    {formatTime(panchang.abhijitMuhurat.start)} – {formatTime(panchang.abhijitMuhurat.end)}
                  </span>
                </div>
              ) : null}

              {/* Vijaya Muhurat */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-emerald-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <Trophy className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "విజయ ముహూర్తం" : isHi ? "विजय मुहूर्त" : "Vijaya Muhurat"}
                  </span>
                </div>
                <span className="font-serif text-xs font-semibold text-emerald-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.vijayaMuhurat.start)} – {formatTime(panchang.vijayaMuhurat.end)}
                </span>
              </div>

              {/* Godhuli Muhurat */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-emerald-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <Sunset className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "గోధూళి ముహూర్తం" : isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}
                  </span>
                </div>
                <span className="font-serif text-xs font-semibold text-emerald-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.godhuliMuhurat.start)} – {formatTime(panchang.godhuliMuhurat.end)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Today's Inauspicious Periods (Ashubh) */}
        <div
          id="ashubh-muhurat"
          className="flex flex-col justify-between rounded-3xl border border-rose-200/80 bg-gradient-to-b from-rose-50/40 to-white p-4 sm:p-5 shadow-2xs"
        >
          <div>
            <div className="flex items-center justify-between border-b border-rose-100 pb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-rose-950 truncate">
                  {isTe
                    ? "నేటి అశుభ కాలాలు (అశుభ)"
                    : isHi
                    ? "आज के अशुभ काल"
                    : "Today's Inauspicious Periods (Ashubh)"}
                </h3>
              </div>
              <LocaleLink
                href={PATHS.muhurat}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 transition shrink-0"
              >
                {isTe ? "అన్నీ చూడండి" : isHi ? "सभी देखें" : "View All"}
              </LocaleLink>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Rahu Kaal */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-rose-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <Shield className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "రాహు కాలం" : isHi ? "राहु काल" : "Rahu Kaal"}
                  </span>
                </div>
                <span className="font-serif text-xs font-bold text-rose-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.rahuKaal.start)} – {formatTime(panchang.rahuKaal.end)}
                </span>
              </div>

              {/* Yamgandam */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-rose-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <Clock className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "యమగండం" : isHi ? "यमगण्ड काल" : "Yamgandam"}
                  </span>
                </div>
                <span className="font-serif text-xs font-bold text-rose-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.yamaganda.start)} – {formatTime(panchang.yamaganda.end)}
                </span>
              </div>

              {/* Gulika Kaal */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-rose-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <ShieldCheck className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "గుళిక కాలం" : isHi ? "गुलिक काल" : "Gulika Kaal"}
                  </span>
                </div>
                <span className="font-serif text-xs font-bold text-rose-950 shrink-0 whitespace-nowrap">
                  {formatTime(panchang.gulikaKaal.start)} – {formatTime(panchang.gulikaKaal.end)}
                </span>
              </div>

              {/* Dur Muhurat */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-rose-100/80 shadow-2xs gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-bold text-ink truncate">
                    {isTe ? "దుర్ముహూర్తం" : isHi ? "दुर्मुहूर्त" : "Dur Muhurat"}
                  </span>
                </div>
                <span className="font-serif text-xs font-bold text-rose-950 shrink-0 whitespace-nowrap">
                  {panchang.durMuhurat[0]
                    ? `${formatTime(panchang.durMuhurat[0].start)} – ${formatTime(panchang.durMuhurat[0].end)}`
                    : "--:--"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Nakshatra Details */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <NakshatraConstellationCard
            nakshatraName={panchang.nakshatra.name}
            nakshatraNameHi={panchang.nakshatra.nameHi}
            endTime={formatTime(panchang.nakshatra.end)}
            isHi={isHi}
            isTe={isTe}
          />
        </div>
      </section>

      {/* 5. TODAY'S COMPLETE PANCHANG DETAILS (10-CARD GRID) */}
      <section className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-xs sm:p-6 lg:p-7">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Clock className="h-4 w-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-ink sm:text-xl">
              {isTe
                ? "నేటి సంపూర్ణ పంచాంగ వివరాలు"
                : isHi
                ? "आज का सम्पूर्ण पंचांग विवरण"
                : "Today's Complete Panchang Details"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowFullPanchang(!showFullPanchang)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-muted hover:border-amber-400 hover:text-ink transition shadow-2xs cursor-pointer"
          >
            {showFullPanchang
              ? isTe
                ? "తక్కువ వివరాలు"
                : isHi
                ? "संक्षिप्त करें"
                : "Hide Details"
              : isTe
              ? "పూర్తి పక్కా పంచాంగం"
              : isHi
              ? "सम्पूर्ण पंचांग देखें"
              : "View Full Panchang"}
          </button>
        </div>

        {/* 10 Visual Detail Cards */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Vikram Samvat */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{isTe ? "విక్రమ సంవత్" : isHi ? "विक्रम संवत" : "Vikram Samvat"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink">
              {panchang.vikramSamvat}
            </div>
          </div>

          {/* Shaka Samvat */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Target className="h-4 w-4 text-teal-600" />
              <span>{isTe ? "శక సంవత్" : isHi ? "शक संवत" : "Shaka Samvat"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink">
              {panchang.shakaSamvat}
            </div>
          </div>

          {/* Maas */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Flame className="h-4 w-4 text-orange-600" />
              <span>{isTe ? "మాసం" : isHi ? "मास" : "Maas"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink truncate">
              {masaName} ({pakshaName})
            </div>
          </div>

          {/* Paksha */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Moon className="h-4 w-4 text-rose-600" />
              <span>{isTe ? "పక్షం" : isHi ? "पक्ष" : "Paksha"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink">
              {pakshaName}
            </div>
          </div>

          {/* Tithi */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>{isTe ? "తిథి" : isHi ? "तिथि" : "Tithi"}</span>
            </div>
            <div className="mt-1.5 font-serif text-sm sm:text-base font-bold text-ink truncate">
              {tithiName}
            </div>
            <div className="text-[10px] text-muted">
              till {formatTime(panchang.tithiAtSunrise.end)}
            </div>
          </div>

          {/* Nakshatra */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}</span>
            </div>
            <div className="mt-1.5 font-serif text-sm sm:text-base font-bold text-ink truncate">
              {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
            </div>
            <div className="text-[10px] text-muted">
              till {formatTime(panchang.nakshatra.end)}
            </div>
          </div>

          {/* Yoga */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Compass className="h-4 w-4 text-rose-600" />
              <span>{isTe ? "యోగం" : isHi ? "योग" : "Yoga"}</span>
            </div>
            <div className="mt-1.5 font-serif text-sm sm:text-base font-bold text-ink truncate">
              {isHi ? panchang.yoga.nameHi : panchang.yoga.name}
            </div>
            <div className="text-[10px] text-muted">
              till {formatTime(panchang.yoga.end)}
            </div>
          </div>

          {/* Karana */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{isTe ? "కరణం" : isHi ? "करण" : "Karana"}</span>
            </div>
            <div className="mt-1.5 font-serif text-sm sm:text-base font-bold text-ink truncate">
              {isHi ? panchang.karana.nameHi : panchang.karana.name}
            </div>
            <div className="text-[10px] text-muted">
              till {formatTime(panchang.karana.end)}
            </div>
          </div>

          {/* Vara */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span>{isTe ? "వారం" : isHi ? "वार" : "Vara"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink">
              {isHi ? panchang.weekdayNameHi : panchang.weekdayName}
            </div>
          </div>

          {/* Ritu */}
          <div className="rounded-2xl border border-line bg-sand/30 p-3.5 transition hover:border-amber-300">
            <div className="flex items-center gap-1.5 text-muted text-[11px] font-bold">
              <Sun className="h-4 w-4 text-amber-600" />
              <span>{isTe ? "ఋతువు" : isHi ? "ऋतु" : "Ritu"}</span>
            </div>
            <div className="mt-1.5 font-serif text-base sm:text-lg font-bold text-ink">
              {isHi ? panchang.ritu.nameHi : panchang.ritu.name}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TODAY'S FESTIVALS & SPECIAL DAYS */}
      <section
        id="festivals-section"
        className="rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 p-5 shadow-xs sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-200/60 pb-3 gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Landmark className="h-4 w-4" />
            </div>
            <h2 className="font-serif text-base sm:text-lg font-bold text-ink truncate">
              {isTe
                ? "నేటి పండుగలు & ప్రత్యేక పర్వదినాలు"
                : isHi
                ? "आज के त्यौहार एवं विशेष पर्व"
                : "Today's Festivals & Special Days"}
            </h2>
          </div>

          <LocaleLink
            href={PATHS.festivals}
            className="self-start sm:self-auto shrink-0 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-muted hover:border-amber-400 hover:text-ink transition shadow-2xs"
          >
            {isTe ? "అన్ని పండుగలు చూడండి" : isHi ? "सभी त्यौहार देखें" : "View Full Festivals"}
          </LocaleLink>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Festival Description or Observances List */}
          <div className="space-y-2 max-w-xl">
            {panchang.observances.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {isTe ? "నేటి విశేష పూజలు & వ్రతాలు:" : isHi ? "आज के प्रमुख व्रत एवं उत्सव:" : "Today's Observances:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {panchang.observances.map((obs, idx) => (
                    <LocaleLink
                      key={idx}
                      href={obs.href || PATHS.festivals}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-bold text-ink shadow-2xs hover:bg-saffron hover:text-white transition"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-saffron" />
                      <span>{isHi ? obs.nameHi || obs.name : obs.name}</span>
                    </LocaleLink>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-ink">
                  {isTe
                    ? "ఈరోజు ప్రధాన పండుగ ఏదీ లేదు"
                    : isHi
                    ? "आज कोई प्रमुख त्यौहार नहीं है"
                    : "No major festival today"}
                </h3>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {isTe
                    ? "రాబోయే పండుగలు, ఏకాదశి మరియు ముఖ్యమైన వ్రతాల వివరాలను తెలుసుకోవడానికి క్యాలెండర్‌ను తనిఖీ చేయండి."
                    : isHi
                    ? "आगामी त्यौहारों, एकादशी एवं महत्वपूर्ण व्रतों की जानकारी के लिए उत्सव कैलेंडर देखें।"
                    : "Check upcoming festivals and mark your calendar for important vrat, utsav, and spiritual observances."}
                </p>
              </div>
            )}
          </div>

          {/* Right Praying Hands Namaste with Lotus Artwork */}
          <div className="flex shrink-0 items-center justify-end">
            <NamasteLotusIllustration />
          </div>
        </div>
      </section>

      {/* 7. MAJOR TEMPLE TIMINGS TABLE */}
      <MajorTempleTimings
        city={city}
        cityName={city.name}
        cityNameHi={city.nameHi}
        cityNameTe={city.name}
        isHi={isHi}
        isTe={isTe}
        onNearMeClick={handleMyLocation}
        onSelectCity={handleCityChange}
      />

      {/* 8. CHOGHADIYA (DAY & NIGHT) */}
      <section id="choghadiya-section" className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-ink sm:text-xl">
              <Clock className="h-5 w-5 text-saffron" />
              <span>{isTe ? "నేటి సంపూర్ణ చోఘడియా ముహూర్తం" : isHi ? "आज का सम्पूर्ण चौघड़िया मुहूर्त" : "Today's Complete Choghadiya Muhurat"}</span>
            </h2>
            <p className="text-xs text-muted">
              {isTe
                ? "పగలు మరియు రాత్రి 8-8 చోఘడియా సమయాలు"
                : isHi
                ? "दिन एवं रात के 8-8 चौघड़िया काल"
                : "8 Day & 8 Night Choghadiya timings with planetary lords"}
            </p>
          </div>

          <div className="flex rounded-2xl bg-sand p-1 text-xs">
            <button
              type="button"
              onClick={() => setChoghadiyaTab("day")}
              className={`rounded-xl px-4 py-1.5 font-semibold transition cursor-pointer ${
                choghadiyaTab === "day"
                  ? "bg-white shadow-xs text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {isTe ? "పగటి చోఘడియా" : isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
            </button>
            <button
              type="button"
              onClick={() => setChoghadiyaTab("night")}
              className={`rounded-xl px-4 py-1.5 font-semibold transition cursor-pointer ${
                choghadiyaTab === "night"
                  ? "bg-white shadow-xs text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {isTe ? "రాత్రి చోఘడియా" : isHi ? "रात का चौघड़िया" : "Night Choghadiya"}
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {(choghadiyaTab === "day" ? panchang.dayChoghadiya : panchang.nightChoghadiya).map((item, idx) => {
            const isShubh = item.nature === "shubh";
            const isAshubh = item.nature === "ashubh";

            return (
              <div
                key={idx}
                className={`rounded-2xl p-3 border ${
                  isShubh
                    ? "bg-emerald-50/60 border-emerald-200"
                    : isAshubh
                    ? "bg-rose-50/60 border-rose-200"
                    : "bg-amber-50/60 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-ink">
                    {isHi ? item.nameHi : `${item.name} (${item.nameHi})`}
                  </span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      isShubh
                        ? "bg-emerald-100 text-emerald-950"
                        : isAshubh
                        ? "bg-rose-100 text-rose-950"
                        : "bg-amber-100 text-amber-950"
                    }`}
                  >
                    {item.nature}
                  </span>
                </div>
                <div className="mt-1.5 font-serif text-xs font-semibold text-ink">
                  {formatTime(item.start)} – {formatTime(item.end)}
                </div>
                <div className="mt-1 text-[10px] text-muted">
                  {isTe ? "అధిపతి గ్రహం: " : isHi ? "स्वामी ग्रह: " : "Ruler: "}
                  {item.ruler}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. PLANETARY EPHEMERIS (GRAHA STHITI) */}
      <section id="graha-sthiti-section" className="space-y-4">
        <GrahaSthitiTable ephemeris={ephemeris} isHi={isHi} />
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) WITH LIVE SEARCH */}
      <section className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-xs sm:p-6 lg:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <HelpCircle className="h-4 w-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-ink sm:text-xl">
              {isTe
                ? "తరచుగా అడిగే ప్రశ్నలు (FAQ)"
                : isHi
                ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)"
                : "Frequently Asked Questions (FAQ)"}
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              placeholder={isTe ? "ప్రశ్నలను వెతకండి..." : isHi ? "प्रश्न खोजें..." : "Search questions..."}
              className="w-full rounded-full border border-line bg-sand/30 py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-muted focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="mt-4 divide-y divide-line/60">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left font-serif text-sm font-bold text-ink hover:text-saffron-deep transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted transition-transform shrink-0 ml-2 ${
                      isOpen ? "rotate-180 text-saffron" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs leading-relaxed text-muted animate-in fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. WHATSAPP CTA BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9a3412] via-[#b45309] to-[#78350f] p-6 text-white shadow-md sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          {/* Left: Namaste Icon & Heading */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-inner backdrop-blur-xs">
              🙏
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                {isTe
                  ? "వాట్సాప్‌లో దిన పంచాంగం పొందండి"
                  : isHi
                  ? "व्हाट्सएप पर दैनिक पंचांग प्राप्त करें"
                  : "Get Daily Panchang on WhatsApp"}
              </h3>
              <p className="mt-0.5 text-xs text-amber-100/90 leading-relaxed">
                {isTe
                  ? "రోజువారీ తిథి, ముహూర్తం మరియు పండుగల సమాచారం నేరుగా మీ ఫోన్‌లో పొందండి."
                  : isHi
                  ? "दैनिक तिथि, शुभ मुहूर्त और त्यौहारों के ताज़ा अपडेट्स सीधे अपने फोन पर प्राप्त करें।"
                  : "Receive daily tithi, muhurat and festival updates directly on your phone."}
              </p>
            </div>
          </div>

          {/* Right: Subscribe Button + Holy Diya Artwork */}
          <div className="flex items-center gap-4 self-start md:self-auto shrink-0">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-xs font-bold text-[#78350f]/70 shadow-sm cursor-not-allowed opacity-75 select-none"
            >
              <span className="text-emerald-600/70 font-bold text-sm">💬</span>
              <span>{isTe ? "సబ్‌స్క్రయిబ్ చేసుకోండి" : isHi ? "सब्सक्राइब करें" : "Subscribe Now"}</span>
            </button>

            {/* Holy Diya */}
            <div className="hidden sm:block text-2xl drop-shadow-md">
              🪔
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {/* 1. City Selector Modal */}
      <CitySelectorModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        selectedCity={city}
        onSelectCity={(newCity) => {
          handleCityChange(newCity);
          setShowCityModal(false);
        }}
        isHi={isHi}
        isTe={isTe}
      />

      {/* 2. Educational What is Panchang Modal */}
      <PanchangExplanationModal
        isOpen={showPanchangModal}
        onClose={() => setShowPanchangModal(false)}
        isHi={isHi}
        isTe={isTe}
      />

      {/* 3. Social / WhatsApp Status Share Card Modal */}
      {showCardModal && (
        <PanchangShareCardModal
          panchang={panchang}
          city={city}
          isHi={isHi}
          onClose={() => setShowCardModal(false)}
        />
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Check,
  Clock,
  Copy,
  Download,
  MapPin,
  Moon,
  Printer,
  Share2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import type { DayPanchang } from "@/lib/panchang/types";
import type { CityConfig } from "@/lib/panchang/cities";

export interface PanchangShareCardModalProps {
  panchang: DayPanchang;
  city: CityConfig;
  isHi?: boolean;
  isTe?: boolean;
  onClose: () => void;
}

export function PanchangShareCardModal({
  panchang,
  city,
  isHi = false,
  isTe = false,
  onClose,
}: PanchangShareCardModalProps) {
  const [copied, setCopied] = useState(false);

  function formatTime(d: Date | null): string {
    if (!d) return "--:--";
    return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {
      timeZone: city.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  }

  const shareText = isTe
    ? `🕉️ ${panchang.gregorianLabel} — దిన పంచాంగం\n📍 ప్రాంతం: ${city.name}\n\n• తిథి: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం"})\n• నక్షత్రం: ${panchang.nakshatra.name} (పాదము ${panchang.nakshatra.pada})\n• యోగం: ${panchang.yoga.name} | కరణం: ${panchang.karana.name}\n• సూర్యోదయం: ${formatTime(panchang.sunrise)} | సూర్యాస్తమయం: ${formatTime(panchang.sunset)}\n• రాహు కాలం: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• అభిజిత్ ముహూర్తం: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "ఏదీ లేదు"}\n\n🌸 నేటి మంత్రం: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "ఓం నమో భగవతే వాసుదేవాయ"}\n\nసంపూర్ణ దిన పంచాంగం మరియు శుభ ముహూర్తాలు చూడండి:\nhttps://bhaktivoice.com/te/panchang/today`
    : isHi
    ? `🕉️ ${panchang.gregorianLabelHi} — दैनिक पंचांग\n📍 स्थान: ${city.nameHi}\n\n• तिथि: ${panchang.tithiAtSunrise.nameHi} (${panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष"})\n• नक्षत्र: ${panchang.nakshatra.nameHi} (पाद ${panchang.nakshatra.pada})\n• योग: ${panchang.yoga.nameHi} | करण: ${panchang.karana.nameHi}\n• सूर्योदय: ${formatTime(panchang.sunrise)} | सूर्यास्त: ${formatTime(panchang.sunset)}\n• राहु काल: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• अभिजित मुहूर्त: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "कोई नहीं"}\n\n🌸 आज का मंत्र: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "ॐ नमो भगवते वासुदेवाय"}\n\nसम्पूर्ण दैनिक पंचांग व शुभ मुहूर्त देखें:\nhttps://bhaktivoice.com/panchang/today`
    : `🕉️ ${panchang.gregorianLabel} — Daily Panchang\n📍 City: ${city.name}\n\n• Tithi: ${panchang.tithiAtSunrise.name} (${panchang.tithiAtSunrise.paksha === "shukla" ? "Shukla" : "Krishna"} Paksha)\n• Nakshatra: ${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})\n• Yoga: ${panchang.yoga.name} | Karana: ${panchang.karana.name}\n• Sunrise: ${formatTime(panchang.sunrise)} | Sunset: ${formatTime(panchang.sunset)}\n• Rahu Kaal: ${formatTime(panchang.rahuKaal.start)} - ${formatTime(panchang.rahuKaal.end)}\n• Abhijit Muhurat: ${panchang.abhijitMuhurat ? `${formatTime(panchang.abhijitMuhurat.start)} - ${formatTime(panchang.abhijitMuhurat.end)}` : "None"}\n\n🌸 Sacred Mantra: ${panchang.dailyMantra ? panchang.dailyMantra.sanskrit : "Om Namo Bhagavate Vasudevaya"}\n\nExplore complete daily Panchang & Shubh Muhurats:\nhttps://bhaktivoice.com/panchang/today`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-6 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-sand">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-sand pb-3">
          <div className="flex items-center gap-2 font-serif text-sm font-bold text-ink">
            <Share2 className="h-4 w-4 text-saffron" />
            <span>{isTe ? "దిన పంచాంగ స్టేటస్ కార్డ్" : isHi ? "दैनिक पंचांग स्टेटस कार्ड" : "Daily Panchang Status Card"}</span>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-sand/40 text-ink hover:bg-sand transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Visual Social Card (Ready to Print / Screenshot) */}
        <div
          id="panchang-social-card"
          className="mt-4 rounded-2xl border-2 border-saffron/40 bg-gradient-to-b from-amber-50/70 via-cream to-amber-50/70 p-5 shadow-sm space-y-4"
        >
          {/* Card Top Banner */}
          <div className="text-center border-b border-saffron/30 pb-3">
            <div className="text-xs font-serif font-bold text-saffron-deep">॥ श्री गणेशाय नमः ॥</div>
            <h2 className="mt-1 font-serif text-xl font-bold text-ink">
              {isHi ? panchang.gregorianLabelHi : panchang.gregorianLabel}
            </h2>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-saffron" />
              <span>{isHi ? city.nameHi : city.name}</span>
              <span>•</span>
              <span>{isTe ? "సంవత్సరం " + panchang.vikramSamvat : isHi ? "संवत " + panchang.vikramSamvat : "Samvat " + panchang.vikramSamvat}</span>
            </div>
          </div>

          {/* Core Panchanga Limbs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-white/90 p-2.5 border border-sand/70">
              <span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "తిథి" : isHi ? "तिथि" : "Tithi"}</span>
              <strong className="font-serif text-ink text-sm block">
                {isHi ? panchang.tithiAtSunrise.nameHi : panchang.tithiAtSunrise.name}
              </strong>
              <span className="text-[10px] text-muted">
                {isTe ? (panchang.tithiAtSunrise.paksha === "shukla" ? "శుక్ల పక్షం" : "కృష్ణ పక్షం") : isHi ? (panchang.tithiAtSunrise.paksha === "shukla" ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : panchang.tithiAtSunrise.paksha + " Paksha"}
              </span>
            </div>

            <div className="rounded-xl bg-white/90 p-2.5 border border-sand/70">
              <span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}</span>
              <strong className="font-serif text-ink text-sm block">
                {isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name}
              </strong>
              <span className="text-[10px] text-muted">
                {isTe ? `పాదము ${panchang.nakshatra.pada}` : isHi ? `पाद ${panchang.nakshatra.pada}` : `Pada ${panchang.nakshatra.pada}`}
              </span>
            </div>

            <div className="rounded-xl bg-white/90 p-2.5 border border-sand/70">
              <span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "సూర్యోదయం / సూర్యాస్తమయం" : isHi ? "सूर्योदय / सूर्यास्त" : "Sun Times"}</span>
              <div className="text-[11px] font-semibold text-ink flex items-center justify-between">
                <span>🌅 {formatTime(panchang.sunrise)}</span>
                <span>🌇 {formatTime(panchang.sunset)}</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/90 p-2.5 border border-sand/70">
              <span className="text-muted block text-[10px] uppercase font-bold">{isTe ? "రాహు కాలం" : isHi ? "राहु काल" : "Rahu Kaal"}</span>
              <strong className="text-rose-900 font-mono text-xs block">
                {formatTime(panchang.rahuKaal.start)} - {formatTime(panchang.rahuKaal.end)}
              </strong>
            </div>
          </div>

          {/* Abhijit Muhurat */}
          {panchang.abhijitMuhurat && (
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-2.5 border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                {isTe ? "అభిజిత్ ముహూర్తం (సర్వకార్య సిద్ధి):" : isHi ? "अभिजित मुहूर्त (सर्वकार्य सिद्धि):" : "Abhijit Muhurat (Best Shubh):"}
              </span>
              <span className="font-bold text-ink font-mono">
                {formatTime(panchang.abhijitMuhurat.start)} - {formatTime(panchang.abhijitMuhurat.end)}
              </span>
            </div>
          )}

          {/* Daily Mantra */}
          {panchang.dailyMantra && (
            <div className="rounded-xl bg-white/95 p-3 border border-saffron/30 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-saffron-deep">
                {isTe ? "నేటి దిన మంత్రం" : isHi ? "आज का दैनिक मन्त्र" : "Daily Sacred Mantra"}
              </div>
              <div className="mt-1 font-serif text-xs font-bold text-ink">
                {panchang.dailyMantra.sanskrit}
              </div>
            </div>
          )}

          {/* Card Footer Brand */}
          <div className="text-center text-[10px] text-muted pt-1 border-t border-saffron/20">
            BhaktiVoice.com • {isTe ? "దిన వైదిక పంచాంగం" : isHi ? "दैनिक वैदिक पंचांग" : "Vedic Panchang & Muhurat"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-sand bg-white px-3 py-2.5 text-xs font-bold text-ink shadow-xs transition hover:border-saffron hover:bg-sand/30 active:scale-95"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "टेक्स्ट कॉपी" : "Copy Text")}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-sand bg-white px-3 py-2.5 text-xs font-bold text-ink shadow-xs transition hover:border-saffron hover:bg-sand/30 active:scale-95"
          >
            <Printer className="h-4 w-4 text-saffron" />
            <span>{isHi ? "प्रिंट / PDF" : "Print Card"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

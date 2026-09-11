"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Flame,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { getPanchakInfo, PANCHAK_CALENDAR_2026, type PanchakInfo } from "@/lib/panchang/panchak";
import { useLocale } from "@/lib/i18n/client";

export function PanchakView() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [copied, setCopied] = useState(false);
  const now = useMemo(() => new Date(), []);
  const panchakInfo: PanchakInfo = useMemo(() => getPanchakInfo(now), [now]);

  const handleShare = () => {
    const text = isHi
      ? `🕉️ पंचक विचार — BhaktiVoice\n\n• आज पंचक स्थिति: ${panchakInfo.isActive ? `सक्रिय (${panchakInfo.typeNameHi})` : "पंचक नहीं है (दोषमुक्त)"}\n• चंद्र नक्षत्र: ${panchakInfo.moonNakshatraHi}\n• चंद्र राशि: ${panchakInfo.moonRasiHi}\n\nसम्पूर्ण 2026 पंचक कैलेंडर व नियम BhaktiVoice.com पर देखें।`
      : `🕉️ Panchak Status — BhaktiVoice\n\n• Today's Status: ${panchakInfo.isActive ? `Active (${panchakInfo.typeNameEn})` : "No Panchak Today"}\n• Moon Nakshatra: ${panchakInfo.moonNakshatraEn}\n• Moon Sign: ${panchakInfo.moonRasiEn}\n\nCheck full 2026 Panchak dates & remedies on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Real-time Panchak Status Banner */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition ${
          panchakInfo.isActive
            ? "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/50"
            : "border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50"
        }`}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                panchakInfo.isActive ? "bg-amber-600 text-white" : "bg-emerald-600 text-white"
              }`}
            >
              {panchakInfo.isActive ? <AlertTriangle className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {isHi ? "वर्तमान पंचक स्थिति" : "Current Panchak Status"}
                </span>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                    panchakInfo.isActive
                      ? "bg-amber-200 text-amber-900"
                      : "bg-emerald-200 text-emerald-900"
                  }`}
                >
                  {panchakInfo.isActive
                    ? isHi ? "आज पंचक सक्रिय है" : "Panchak is Active Today"
                    : isHi ? "आज पंचक नहीं है" : "No Panchak Today"}
                </span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
                {panchakInfo.isActive ? (isHi ? panchakInfo.typeNameHi : panchakInfo.typeNameEn) : (isHi ? "शुभ व दोषमुक्त समय" : "Auspicious & Safe Window")}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isHi ? panchakInfo.effectHi : panchakInfo.effectEn}
              </p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-2xs hover:bg-sand/30"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy Status")}
          </button>
        </div>

        {/* Constellation & Astronomical Placement Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line/60 pt-5 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "चंद्र नक्षत्र" : "Moon Nakshatra"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchakInfo.moonNakshatraHi : panchakInfo.moonNakshatraEn}
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "चंद्र राशि" : "Moon Sign"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchakInfo.moonRasiHi : panchakInfo.moonRasiEn}
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "पंचक का प्रकार" : "Panchak Classification"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchakInfo.typeNameHi : panchakInfo.typeNameEn}
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "आरंभ वार" : "Starting Day"}</span>
            <div className="font-serif text-sm font-bold text-ink">
              {isHi ? panchakInfo.startWeekdayHi : panchakInfo.startWeekday}
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Prohibited Works & Remedies (2 Columns) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Prohibitions */}
        <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 shadow-2xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-rose-950 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-600" />
            {isHi ? "पंचक में वर्जित पांच कार्य (शास्त्रानुसार)" : "5 Prohibited Activities in Panchak"}
          </h3>
          <p className="text-xs text-rose-900 leading-relaxed">
            {isHi
              ? "मुहूर्त चिंतामणि एवं गरुड़ पुराण के अनुसार, पंचक काल में निम्नलिखित पांच कार्यों को करने से पांच गुना दुष्परिणाम भोगने पड़ते हैं:"
              : "According to Muhurta Chintamani and classical Garuda Purana canons, initiating the following five activities during Panchak is strictly cautioned:"}
          </p>
          <ul className="space-y-2.5">
            {(isHi ? panchakInfo.prohibitedActivitiesHi : panchakInfo.prohibitedActivitiesEn).map((act, idx) => (
              <li key={idx} className="flex items-start gap-2.5 rounded-2xl bg-white/90 p-3 text-xs sm:text-sm text-rose-950 border border-rose-100 shadow-2xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-200 text-[10px] font-bold text-rose-900">
                  {idx + 1}
                </span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remedies */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-2xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            {isHi ? "पंचक शांति एवं निवारण उपाय" : "Panchak Shanti & Remedies"}
          </h3>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {isHi
              ? "यदि परिस्थिति वश पंचक काल में कोई अनिवार्य कार्य करना ही पड़े, तो इन शास्त्रीय उपायों से दोष का निवारण संभव है:"
              : "If urgent activities cannot be postponed during Panchak, classical Jyotish prescribes effective mitigating remedies:"}
          </p>
          <ul className="space-y-2.5">
            {(isHi ? panchakInfo.remediesHi : panchakInfo.remediesEn).map((rem, idx) => (
              <li key={idx} className="flex items-start gap-2.5 rounded-2xl bg-white/90 p-3 text-xs sm:text-sm text-emerald-950 border border-emerald-100 shadow-2xs">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Complete 2026 Panchak Calendar Table */}
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            {isHi ? "वर्ष 2026 पंचक कैलेंडर (तिथि एवं समय सारणी)" : "Panchak Calendar 2026 — Verified Dates & Timings"}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isHi
              ? "वर्ष 2026 के सभी पंचक का आरंभ, समाप्ति, समय और प्रकार"
              : "Complete schedule of all Panchaks in 2026 with exact start/end dates, timings, and types"}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-sand/40 font-serif text-ink border-b border-line">
              <tr>
                <th className="p-3.5 sm:p-4">{isHi ? "पंचक आरंभ" : "Panchak Starts"}</th>
                <th className="p-3.5 sm:p-4">{isHi ? "पंचक समाप्त" : "Panchak Ends"}</th>
                <th className="p-3.5 sm:p-4">{isHi ? "पंचक का नाम" : "Panchak Type"}</th>
                <th className="p-3.5 sm:p-4">{isHi ? "आरंभ वार" : "Start Day"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {PANCHAK_CALENDAR_2026.map((row, idx) => (
                <tr key={idx} className="hover:bg-sand/10 transition">
                  <td className="p-3.5 sm:p-4 font-medium text-ink">
                    {row.startDate} <span className="text-muted font-normal">({row.startTime})</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-medium text-ink">
                    {row.endDate} <span className="text-muted font-normal">({row.endTime})</span>
                  </td>
                  <td className="p-3.5 sm:p-4">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${
                        row.type === "raja"
                          ? "bg-emerald-100 text-emerald-900"
                          : row.type === "neutral"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-rose-100 text-rose-900"
                      }`}
                    >
                      {isHi ? row.typeNameHi : row.typeNameEn}
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-muted">{isHi ? row.startDayHi : row.startDayEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

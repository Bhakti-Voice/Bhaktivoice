"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Heart,
  Printer,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import { loadMilanEngine } from "@/lib/spiritual-tools/engine-loader";
import type { BirthPlace, MilanResult } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { BirthDetailsFields, emptyBirth } from "./BirthDetailsFields";
import { primaryButtonClassName } from "./ToolUi";

type BirthFormState = {
  name: string;
  date: string;
  time: string;
  place: BirthPlace;
};

export function KundliMilanTool() {
  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.milan;
  const isHi = locale === "hi";

  const [boy, setBoy] = useState<BirthFormState>(() => emptyBirth("boy"));
  const [girl, setGirl] = useState<BirthFormState>(() => emptyBirth("girl"));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MilanResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const engine = await loadMilanEngine();
      setResult(
        engine.calculateMilan(
          { name: boy.name.trim() || (isHi ? "वर" : "Groom"), date: boy.date, time: boy.time, place: boy.place },
          { name: girl.name.trim() || (isHi ? "कन्या" : "Bride"), date: girl.date, time: girl.time, place: girl.place },
        ),
      );
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
    if (!result) return;
    const shareText = isHi
      ? `💖 36 गुण कुंडली मिलान परिणाम\n🤵 वर: ${result.boy.name} (${result.boy.moon.rashiHi}, ${result.boy.moon.nakshatraHi})\n👰 कन्या: ${result.girl.name} (${result.girl.moon.rashiHi}, ${result.girl.moon.nakshatraHi})\n\n⭐ कुल गुण: ${result.total} / 36 (${result.percentage}%)\n📜 निष्कर्ष: ${result.verdictHi}\n\nसम्पूर्ण कुंडली मिलान रिपोर्ट BhaktiVoice.com पर देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `💖 36 Guna Kundli Milan Report\n🤵 Groom: ${result.boy.name} (${result.boy.moon.rashi}, ${result.boy.moon.nakshatra})\n👰 Bride: ${result.girl.name} (${result.girl.moon.rashi}, ${result.girl.moon.nakshatra})\n\n⭐ Total Gunas: ${result.total} / 36 (${result.percentage}%)\n📜 Verdict: ${result.verdict}\n\nCheck full Kundli Milan report on BhaktiVoice.com: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: isHi ? "कुंडली मिलान — भक्ति वॉइस" : "Kundli Milan — BhaktiVoice",
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
      {/* Dual Input Form */}
      <form onSubmit={(event) => void onSubmit(event)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Groom's Details */}
          <div className="rounded-3xl border border-saffron/30 bg-gradient-to-b from-[#fffbf7] via-white to-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 text-saffron-deep font-bold text-sm mb-4 border-b border-line/60 pb-3">
              <User className="h-4 w-4" />
              <span>{copy.boyTitle}</span>
            </div>
            <BirthDetailsFields
              prefix="boy"
              name={boy.name}
              date={boy.date}
              time={boy.time}
              place={boy.place}
              onNameChange={(value) => setBoy((cur) => ({ ...cur, name: value }))}
              onDateChange={(value) => setBoy((cur) => ({ ...cur, date: value }))}
              onTimeChange={(value) => setBoy((cur) => ({ ...cur, time: value }))}
              onPlaceChange={(place) => setBoy((cur) => ({ ...cur, place }))}
              labels={{
                name: copy.name,
                date: copy.date,
                time: copy.time,
                place: copy.place,
                placeHint: copy.placeHint,
              }}
            />
          </div>

          {/* Bride's Details */}
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-b from-[#fff9fa] via-white to-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4 border-b border-line/60 pb-3">
              <User className="h-4 w-4" />
              <span>{copy.girlTitle}</span>
            </div>
            <BirthDetailsFields
              prefix="girl"
              name={girl.name}
              date={girl.date}
              time={girl.time}
              place={girl.place}
              onNameChange={(value) => setGirl((cur) => ({ ...cur, name: value }))}
              onDateChange={(value) => setGirl((cur) => ({ ...cur, date: value }))}
              onTimeChange={(value) => setGirl((cur) => ({ ...cur, time: value }))}
              onPlaceChange={(place) => setGirl((cur) => ({ ...cur, place }))}
              labels={{
                name: copy.name,
                date: copy.date,
                time: copy.time,
                place: copy.place,
                placeHint: copy.placeHint,
              }}
            />
          </div>
        </div>

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

      {/* Matching Results Dashboard */}
      {result && (
        <div className="space-y-6">
          {/* Result Score Banner */}
          <div className="flex flex-col gap-6 rounded-3xl border border-saffron/30 bg-gradient-to-r from-[#fff9f2] via-white to-[#fff9f2] p-6 shadow-xs sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-deep">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isHi ? "वैदिक अष्टकूट गुण मिलान रिपोर्ट" : "Vedic Ashtakoot Matchmaking Report"}
                </span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl flex items-center gap-2">
                  <span>{result.boy.name}</span>
                  <Heart className="h-5 w-5 fill-rose-500 text-rose-500 inline shrink-0" />
                  <span>{result.girl.name}</span>
                </h2>
                <p className="mt-1 text-sm font-medium text-muted">
                  {isHi ? result.verdictHi : result.verdict}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xs transition hover:border-saffron active:scale-95 sm:text-sm"
                >
                  <Printer className="h-4 w-4 text-saffron" />
                  <span>{isHi ? "प्रिंट पत्रिका" : "Print Report"}</span>
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

            {/* Score Radial Ring & Summary Box */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center rounded-2xl bg-white/90 p-5 shadow-2xs border border-saffron/20">
              {/* Circular Gauge (4 Cols) */}
              <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-line/70 pb-5 sm:pb-0 sm:col-span-4">
                <div className="relative flex h-36 w-36 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-sand/50"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className={`transition-all duration-1000 ${
                        result.total >= 28
                          ? "stroke-emerald-600"
                          : result.total >= 21
                          ? "stroke-blue-600"
                          : result.total >= 18
                          ? "stroke-amber-600"
                          : "stroke-rose-600"
                      }`}
                      strokeWidth="9"
                      strokeDasharray="264"
                      strokeDashoffset={264 - (264 * result.total) / 36}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-3xl font-extrabold text-ink leading-none">
                      {result.total}
                    </span>
                    <span className="text-[11px] font-bold text-muted uppercase">/ 36 {isHi ? "गुण" : "Gunas"}</span>
                  </div>
                </div>

                <span
                  className={`mt-3 rounded-full px-3.5 py-0.5 text-xs font-bold ${
                    result.total >= 28
                      ? "bg-emerald-100 text-emerald-800"
                      : result.total >= 21
                      ? "bg-blue-100 text-blue-800"
                      : result.total >= 18
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {result.percentage}% {isHi ? "वैवाहिक अनुकूलता" : "Compatibility"}
                </span>
              </div>

              {/* Summary Text (8 Cols) */}
              <div className="sm:col-span-8 sm:pl-4">
                <h4 className="font-serif text-lg font-bold text-ink">
                  {isHi ? "ज्योतिषीय निष्कर्ष एवं विवेचना" : "Astrological Verdict & Summary"}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-ink/80 sm:text-sm">
                  {isHi ? result.verdictSummaryHi : result.verdictSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-xl bg-sand/40 px-3 py-1 font-semibold text-saffron-deep">
                    {isHi ? "न्यूनतम आवश्यक: 18 गुण" : "Minimum Required: 18 Gunas"}
                  </span>
                  <span className="rounded-xl bg-sand/40 px-3 py-1 font-semibold text-ink">
                    {isHi ? "उत्तम मिलान: 28+ गुण" : "Excellent Match: 28+ Gunas"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Boy vs Girl Comparison Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Groom's Vedic Profile */}
            <div className="rounded-3xl border border-saffron/30 bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center gap-2 text-saffron-deep font-bold text-sm">
                <User className="h-4 w-4" />
                <span>{isHi ? "वर की जन्म पत्रिका" : "Groom's Vedic Alignment"}</span>
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-ink">{result.boy.name}</h3>

              <dl className="mt-4 divide-y divide-line/60 text-xs sm:text-sm">
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "लग्न" : "Lagna (Ascendant)"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.boy.lagna.rashiHi : result.boy.lagna.rashi}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "चंद्र राशि" : "Moon Sign (Rashi)"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.boy.moon.rashiHi : result.boy.moon.rashi}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "जन्म नक्षत्र" : "Birth Nakshatra"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.boy.moon.nakshatraHi : result.boy.moon.nakshatra} ({result.boy.moon.pada})</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "मांगलिक स्थिति" : "Manglik Status"}</dt>
                  <dd className={`font-bold ${result.boy.manglik.isManglik ? "text-orange-700" : "text-emerald-700"}`}>
                    {isHi ? result.boy.manglik.levelHi : result.boy.manglik.level}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Bride's Vedic Profile */}
            <div className="rounded-3xl border border-rose-200 bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <User className="h-4 w-4" />
                <span>{isHi ? "कन्या की जन्म पत्रिका" : "Bride's Vedic Alignment"}</span>
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-ink">{result.girl.name}</h3>

              <dl className="mt-4 divide-y divide-line/60 text-xs sm:text-sm">
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "लग्न" : "Lagna (Ascendant)"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.girl.lagna.rashiHi : result.girl.lagna.rashi}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "चंद्र राशि" : "Moon Sign (Rashi)"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.girl.moon.rashiHi : result.girl.moon.rashi}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "जन्म नक्षत्र" : "Birth Nakshatra"}</dt>
                  <dd className="font-bold text-ink">{isHi ? result.girl.moon.nakshatraHi : result.girl.moon.nakshatra} ({result.girl.moon.pada})</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-muted">{isHi ? "मांगलिक स्थिति" : "Manglik Status"}</dt>
                  <dd className={`font-bold ${result.girl.manglik.isManglik ? "text-orange-700" : "text-emerald-700"}`}>
                    {isHi ? result.girl.manglik.levelHi : result.girl.manglik.level}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Key Dosha Analysis Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Nadi Dosha */}
            <div className={`rounded-2xl border p-4 shadow-2xs ${
              !result.nadiDosha.present || result.nadiDosha.cancelled
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-rose-200 bg-rose-50/60"
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-ink">
                {!result.nadiDosha.present || result.nadiDosha.cancelled ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                )}
                <span>{isHi ? "नाड़ी दोष" : "Nadi Dosha"}</span>
              </div>
              <p className="mt-2 text-xs font-bold text-ink">
                {result.nadiDosha.cancelled
                  ? (isHi ? "दोष परिहार (दोष रहित)" : "Dosha Cancelled")
                  : result.nadiDosha.present
                  ? (isHi ? "नाड़ी दोष उपस्थित" : "Dosha Present")
                  : (isHi ? "दोष मुक्त (शुभ)" : "Free of Dosha")}
              </p>
              <p className="mt-1 text-[11px] text-muted leading-relaxed">
                {isHi ? result.nadiDosha.noteHi : result.nadiDosha.note}
              </p>
            </div>

            {/* Bhakoot Dosha */}
            <div className={`rounded-2xl border p-4 shadow-2xs ${
              !result.bhakootDosha.present || result.bhakootDosha.cancelled
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-amber-200 bg-amber-50/60"
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-ink">
                {!result.bhakootDosha.present || result.bhakootDosha.cancelled ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                )}
                <span>{isHi ? "भकूट दोष" : "Bhakoot Dosha"}</span>
              </div>
              <p className="mt-2 text-xs font-bold text-ink">
                {result.bhakootDosha.cancelled
                  ? (isHi ? "दोष परिहार (दोष रहित)" : "Dosha Cancelled")
                  : result.bhakootDosha.present
                  ? (isHi ? "भकूट दोष उपस्थित" : "Dosha Present")
                  : (isHi ? "दोष मुक्त (शुभ)" : "Free of Dosha")}
              </p>
              <p className="mt-1 text-[11px] text-muted leading-relaxed">
                {isHi ? result.bhakootDosha.noteHi : result.bhakootDosha.note}
              </p>
            </div>

            {/* Manglik Match */}
            <div className={`rounded-2xl border p-4 shadow-2xs ${
              result.manglikMatch.compatible
                ? "border-emerald-200 bg-emerald-50/50"
                : "border-orange-200 bg-orange-50/60"
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-ink">
                {result.manglikMatch.compatible ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                )}
                <span>{isHi ? "मांगलिक सामंजस्य" : "Manglik Harmony"}</span>
              </div>
              <p className="mt-2 text-xs font-bold text-ink">
                {result.manglikMatch.compatible
                  ? (isHi ? "मांगलिक अनुकूल" : "Manglik Compatible")
                  : (isHi ? "मांगलिक विषमता" : "Mismatch")}
              </p>
              <p className="mt-1 text-[11px] text-muted leading-relaxed">
                {isHi ? result.manglikMatch.noteHi : result.manglikMatch.note}
              </p>
            </div>
          </div>

          {/* Detailed 8-Guna Ashtakoot Matrix Table with Progress Bars */}
          <div className="rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
              {isHi ? "अष्टकूट 8 गुण विस्तृत विभाजन (36 Gunas Breakdown)" : "Ashtakoot 8-Guna Detailed Matrix"}
            </h3>
            <p className="text-xs text-muted mb-2">
              {isHi
                ? "वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट एवं नाड़ी के 36 गुणों का विस्तृत विश्लेषण।"
                : "Comprehensive score breakdown and compatibility indicators for all 8 classical Vedic factors."}
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line bg-sand/30 text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="py-3 px-3">{isHi ? "कूट (Guna)" : "Guna"}</th>
                    <th className="py-3 px-3">{isHi ? "वर (Groom)" : "Groom"}</th>
                    <th className="py-3 px-3">{isHi ? "कन्या (Bride)" : "Bride"}</th>
                    <th className="py-3 px-3">{isHi ? "प्राप्त / अधिकतम" : "Score / Max"}</th>
                    <th className="py-3 px-3">{isHi ? "प्रभाव एवं विवरण" : "Significance"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {result.gunas.map((guna) => {
                    const isFull = guna.score === guna.max;
                    const isZero = guna.score === 0;
                    return (
                      <tr key={guna.id} className="hover:bg-cream/40 transition">
                        <td className="py-3.5 px-3 font-bold text-ink">
                          {isHi ? guna.nameHi : guna.name}
                        </td>
                        <td className="py-3.5 px-3 text-ink font-medium">
                          {isHi ? guna.boyValueHi : guna.boyValue}
                        </td>
                        <td className="py-3.5 px-3 text-ink font-medium">
                          {isHi ? guna.girlValueHi : guna.girlValue}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-col gap-1 w-24">
                            <span
                              className={`font-mono font-bold text-xs ${
                                isFull
                                  ? "text-emerald-700 font-extrabold"
                                  : isZero
                                  ? "text-rose-600"
                                  : "text-amber-700"
                              }`}
                            >
                              {guna.score} / {guna.max}
                            </span>
                            <div className="h-1.5 w-full rounded-full bg-sand/40 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isFull
                                    ? "bg-emerald-600"
                                    : isZero
                                    ? "bg-rose-500"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${(guna.score / guna.max) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-xs text-ink/80 leading-relaxed max-w-xs">
                          {isHi ? guna.detailHi : guna.detail}
                          {guna.cancellationNote && (
                            <p className="mt-1 text-[11px] font-semibold text-saffron-deep">
                              {isHi ? guna.cancellationNoteHi : guna.cancellationNote}
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-line bg-sand/40 font-bold text-ink">
                    <td className="py-3.5 px-3 font-serif text-base text-saffron-deep" colSpan={3}>
                      {isHi ? "कुल प्राप्तांक (Total Score)" : "Total Score"}
                    </td>
                    <td className="py-3.5 px-3 font-serif text-lg text-saffron-deep">
                      {result.total} / 36
                    </td>
                    <td className="py-3.5 px-3 text-xs text-saffron-deep font-semibold">
                      {result.percentage}% ({isHi ? result.verdictHi : result.verdict})
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

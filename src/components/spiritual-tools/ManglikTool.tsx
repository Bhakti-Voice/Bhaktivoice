"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  Heart,
  HelpCircle,
  Info,
  Printer,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import type { BirthPlace } from "@/lib/spiritual-tools/types";
import { defaultCity } from "@/lib/spiritual-tools/geo";
import {
  analyzeManglikFromBirth,
  type ComprehensiveManglikReport,
} from "@/lib/spiritual-tools/manglik-engine";
import { BirthDetailsFields } from "./BirthDetailsFields";
import { ToolSection, primaryButtonClassName } from "./ToolUi";
import { useLocale, useMessages } from "@/lib/i18n/client";

export function ManglikTool() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const t = useMessages();

  const [name, setName] = useState("");
  const [date, setDate] = useState("1995-05-18");
  const [time, setTime] = useState("08:15");
  const [place, setPlace] = useState<BirthPlace>(() => defaultCity());
  const [submitted, setSubmitted] = useState(true);
  const [showAllRules, setShowAllRules] = useState(false);

  const report: ComprehensiveManglikReport = useMemo(() => {
    return analyzeManglikFromBirth({
      name: name.trim() || (isHi ? "जातक" : "Devotee"),
      date,
      time,
      place,
    });
  }, [name, date, time, place]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const badgeColor =
    report.severity === "none"
      ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:border-emerald-800 dark:text-emerald-400"
      : report.severity === "cancelled"
      ? "bg-teal-500/10 text-teal-700 border-teal-300 dark:border-teal-800 dark:text-teal-400"
      : report.severity === "anshik"
      ? "bg-amber-500/10 text-amber-700 border-amber-300 dark:border-amber-800 dark:text-amber-400"
      : "bg-rose-500/10 text-rose-700 border-rose-300 dark:border-rose-800 dark:text-rose-400";

  const meterBarColor =
    report.severity === "none"
      ? "bg-emerald-500"
      : report.severity === "cancelled"
      ? "bg-teal-500"
      : report.severity === "anshik"
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="space-y-8">
      {/* Input Form Card */}
      <div className="rounded-3xl border border-sand bg-white/95 p-6 shadow-sm backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-sand/60 pb-4">
            <h2 className="font-serif text-lg font-bold text-ink">
              {isHi ? "जन्म विवरण दर्ज करें" : "Enter Birth Details"}
            </h2>
            <p className="text-xs text-muted">
              {isHi
                ? "मांगलिक दोष (कुज दोष) की प्रामाणिक गणना हेतु जन्म समय व जन्म स्थान की सटीकता अनिवार्य है।"
                : "Accurate birth time and coordinates are essential for precise Lagna, Moon, and Venus house calculations."}
            </p>
          </div>

          <BirthDetailsFields
            prefix="manglik"
            name={name}
            date={date}
            time={time}
            place={place}
            onNameChange={setName}
            onDateChange={setDate}
            onTimeChange={setTime}
            onPlaceChange={setPlace}
            labels={{
              name: isHi ? "जातक का नाम (वैकल्पिक)" : "Name (Optional)",
              date: isHi ? "जन्म तिथि" : "Birth Date",
              time: isHi ? "जन्म समय" : "Birth Time",
              place: isHi ? "जन्म स्थान / शहर" : "Birth Place / City",
              placeHint: isHi ? "शहर खोजें (उदा. दिल्ली, मुंबई, जयपुर...)" : "Search city (e.g. New Delhi, Mumbai, London...)",
            }}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-saffron to-vermilion px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-95"
            >
              <Flame className="h-4 w-4" />
              {isHi ? "मांगलिक दोष की जांच करें" : "Analyze Manglik Dosha"}
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <>
          {/* Main Verdict Card */}
          <div className="overflow-hidden rounded-3xl border border-sand bg-white p-6 shadow-md md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${badgeColor}`}
                  >
                    {report.severity === "none" || report.severity === "cancelled" ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : report.severity === "anshik" ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <ShieldAlert className="h-4 w-4" />
                    )}
                    {isHi ? report.severityLabelHi : report.severityLabelEn}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl font-bold text-ink md:text-3xl">
                  {name ? `${name} ` : ""}
                  {isHi ? "मांगलिक दोष विश्लेषण" : "Manglik Dosha Report"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted max-w-2xl">
                  {isHi ? report.summaryHi : report.summaryEn}
                </p>
              </div>

              {/* Severity Meter Gauge */}
              <div className="rounded-2xl border border-sand bg-sand/30 p-5 text-center min-w-[200px]">
                <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                  {isHi ? "दोष तीव्रता स्तर" : "Dosha Severity Meter"}
                </div>
                <div className="mt-2 font-serif text-3xl font-black text-ink">
                  {report.percentage}%
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sand">
                  <div
                    className={`h-full transition-all duration-700 ${meterBarColor}`}
                    style={{ width: `${report.percentage}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] font-medium text-muted">
                  {isHi ? report.severityLabelHi : report.severityLabelEn}
                </div>
              </div>
            </div>

            {/* Mars Astrological Placement Details */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-sand/60 pt-6 text-xs">
              <div className="rounded-2xl bg-sand/40 p-3">
                <span className="text-muted block">{isHi ? "मंगल की राशि" : "Mars Zodiac Sign"}</span>
                <span className="font-bold text-ink text-sm">
                  {isHi ? report.marsPlacement.rashiNameHi : report.marsPlacement.rashiName}
                </span>
              </div>
              <div className="rounded-2xl bg-sand/40 p-3">
                <span className="text-muted block">{isHi ? "अंश (Degree)" : "Exact Longitude"}</span>
                <span className="font-bold text-ink text-sm">{report.marsPlacement.degree}</span>
              </div>
              <div className="rounded-2xl bg-sand/40 p-3">
                <span className="text-muted block">{isHi ? "लग्न से भाव" : "House from Lagna"}</span>
                <span className="font-bold text-ink text-sm">
                  {report.marsPlacement.houseFromLagna} {isHi ? "भाव" : "House"}
                </span>
              </div>
              <div className="rounded-2xl bg-sand/40 p-3">
                <span className="text-muted block">{isHi ? "वक्री / अस्त" : "Retrograde / Combust"}</span>
                <span className="font-bold text-ink text-sm">
                  {report.marsPlacement.isRetrograde
                    ? isHi
                      ? "वक्री (R)"
                      : "Retrograde (R)"
                    : isHi
                    ? "मार्गी"
                    : "Direct"}
                  {report.marsPlacement.isCombust ? (isHi ? " / अस्त" : " / Combust") : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Tripada Vichara (3-Way Reference Evaluation) */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-saffron" />
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi ? "त्रिपदा विचार (लग्न, चंद्र व शुक्र से विश्लेषण)" : "Tripada Vichara: 3-Way Reference Evaluation"}
              </h3>
            </div>
            <p className="text-xs text-muted mb-6">
              {isHi
                ? "प्रामाणिक पराशरीय ज्योतिष में केवल लग्न से ही नहीं, अपितु चंद्र (मन के कारक) और शुक्र (विवाह के कारक) से भी मंगल की स्थिति का सूक्ष्म परीक्षण किया जाता है।"
                : "Classical Parashari astrology mandates evaluating Mars from three distinct anchor points: Lagna (physical body/temperament), Chandra (mind/emotions), and Shukra (spouse/marital karaka)."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.references.map((ref) => (
                <div
                  key={ref.reference}
                  className={`rounded-2xl border p-5 transition-all ${
                    ref.isManglik
                      ? "border-rose-200 bg-rose-50/40 dark:border-rose-900/50 dark:bg-rose-950/20"
                      : "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">
                      {isHi ? ref.labelHi : ref.labelEn}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        ref.isManglik
                          ? "bg-rose-500/10 text-rose-700 dark:text-rose-400"
                          : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      }`}
                    >
                      {ref.isManglik
                        ? isHi
                          ? "दोष उपस्थित"
                          : "Dosha Present"
                        : isHi
                        ? "दोष मुक्त"
                        : "Dosha Free"}
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-lg font-bold text-ink">
                    {isHi ? `${ref.marsHouse}वें भाव में मंगल` : `Mars in House ${ref.marsHouse}`}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {isHi ? ref.explanationHi : ref.explanationEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Classical Cancellations (Apavadas) Section */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isHi
                    ? "शास्त्रीय मांगलिक दोष परिहार (16 Classical Cancellations)"
                    : "16 Classical Shastric Cancellation Rules (Apavadas)"}
                </h3>
              </div>

              <button
                onClick={() => setShowAllRules(!showAllRules)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron hover:underline"
              >
                {showAllRules
                  ? isHi
                    ? "केवल लागू नियम देखें"
                    : "Show Applied Only"
                  : isHi
                  ? "सभी १६ नियम देखें"
                  : "View All 16 Rules"}
                {showAllRules ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <p className="text-xs text-muted mt-2 mb-6">
              {isHi
                ? "महर्षि पराशर व मुहूर्त चिंतामणि के अनुसार यदि मंगल विशेष राशियों अथवा गुरु की दृष्टि में हो, तो दोष स्वतः निष्प्रभावी हो जाता है।"
                : "According to Brihat Parashara Hora Shastra, Phaladeepika, and Muhurta Chintamani, specific sign placements and Jupiter's aspects neutralize Kuja Dosha without creating marital harm."}
            </p>

            {report.appliedCancellations.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <strong>{isHi ? "लागू हुए परिहार: " : "Applied Cancellations: "}</strong>
                  {isHi
                    ? `आपकी कुंडली में ${report.appliedCancellations.length} शास्त्रीय परिहार पूर्णतः घटित हो रहे हैं, जिससे मंगल का उग्र प्रभाव शांत हो गया है।`
                    : `${report.appliedCancellations.length} classical cancellation rule(s) apply to your chart, neutralizing malefic Martian affliction.`}
                </div>

                {report.appliedCancellations.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20"
                  >
                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      {isHi ? c.nameHi : c.nameEn}
                    </div>
                    <p className="mt-1 text-muted text-xs leading-relaxed">
                      {isHi ? c.descriptionHi : c.descriptionEn}
                    </p>
                    <span className="mt-2 inline-block rounded-md bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                      {isHi ? "शास्त्र प्रमाण: " : "Treatise Reference: "} {c.shastricReference}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-sand bg-sand/30 p-4 text-xs text-muted">
                {isHi
                  ? "वर्तमान में इस कुंडली पर कोई मुख्य राशिगत परिहार लागू नहीं होता।"
                  : "No primary sign-based cancellation applies to this specific Mars placement."}
              </div>
            )}

            {/* Expandable list of other classical rules */}
            {showAllRules && (
              <div className="mt-6 border-t border-sand/60 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                  {isHi ? "अन्य शास्त्रीय परिहार नियम" : "Other Classical Cancellation Rules"}
                </h4>
                {report.allCancellations
                  .filter((c) => !c.applied)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-sand/60 bg-sand/10 p-3.5 text-xs text-muted"
                    >
                      <div className="font-semibold text-ink">
                        {isHi ? c.nameHi : c.nameEn}
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed">
                        {isHi ? c.descriptionHi : c.descriptionEn}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Marriage Compatibility & Guidance */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-vermilion" />
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi ? report.marriageAdvice.titleHi : report.marriageAdvice.titleEn}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {isHi ? report.marriageAdvice.detailHi : report.marriageAdvice.detailEn}
            </p>
          </div>

          {/* House-Specific Influence Card */}
          {report.houseImpacts.length > 0 && (
            <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-saffron" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isHi
                    ? report.houseImpacts[0].titleHi
                    : report.houseImpacts[0].titleEn}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {isHi
                  ? report.houseImpacts[0].impactHi
                  : report.houseImpacts[0].impactEn}
              </p>
            </div>
          )}

          {/* Authentic Shastric Remedies Card */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-saffron" />
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi ? "प्रामाणिक वैदिक एवं सात्विक उपाय" : "Authentic Vedic & Shastric Remedies"}
              </h3>
            </div>
            <p className="text-xs text-muted mb-6">
              {isHi
                ? "मांगलिक दोष से भयभीत होने की आवश्यकता नहीं है। वैदिक शास्त्रों में मंगल देव की कृपा प्राप्ति के सात्विक व सहज उपाय वर्णित हैं।"
                : "Vedic astrology offers constructive remedies focused on spiritual discipline, charity, and self-mastery to channel Mars's fiery courage productively."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.remedies.map((remedy, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-sand/80 bg-sand/20 p-5 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-serif text-base font-bold text-ink">
                      {isHi ? remedy.titleHi : remedy.titleEn}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {isHi ? remedy.descriptionHi : remedy.descriptionEn}
                    </p>
                  </div>

                  {remedy.mantra && (
                    <div className="mt-3 rounded-xl border border-sand bg-white p-2.5 text-center font-serif text-xs font-semibold text-vermilion">
                      {remedy.mantra}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

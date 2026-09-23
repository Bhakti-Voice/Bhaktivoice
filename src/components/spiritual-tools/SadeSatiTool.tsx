"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  calculateSadeSatiReport,
  type SadeSatiReport,
} from "@/lib/panchang/sade-sati-engine";
import { RASI_NAMES, RASI_NAMES_HI, RASI_NAMES_TE } from "@/lib/panchang/names";
import { useLocale } from "@/lib/i18n/client";

const RASHI_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

export function SadeSatiTool() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  // Default to Pisces (Meena - currently under Sade Sati in 2025/2026)
  const [selectedRashi, setSelectedRashi] = useState<number>(11);

  const report: SadeSatiReport = useMemo(() => {
    return calculateSadeSatiReport(selectedRashi, new Date());
  }, [selectedRashi]);

  return (
    <div className="space-y-8">
      {/* Moon Sign (Janma Rashi) Selector Grid */}
      <div className="rounded-3xl border border-sand bg-white/90 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-ink">
              {isTe
                ? "మీ జన్మ చంద్ర రాశిని ఎంచుకోండి"
                : isHi
                ? "अपनी जन्म राशि (चंद्र राशि) चुनें"
                : "Select Your Moon Sign (Janma Rashi)"}
            </h2>
            <p className="text-xs text-muted">
              {isTe
                ? "ఏలినాటి శని గణన ఎల్లప్పుడూ జన్మ కుండలిలోని చంద్ర రాశి ఆధారంగా మాత్రమే చేయబడుతుంది."
                : isHi
                ? "साढ़े साती की गणना सदैव जन्म कुंडली की चंद्र राशि के आधार पर की जाती है।"
                : "Shani Sade Sati is strictly evaluated from the natal Moon sign (Janma Rashi)."}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-sand/60 px-3 py-1.5 text-xs font-semibold text-ink">
            <Clock className="h-4 w-4 text-saffron" />
            <span>
              {isTe
                ? "ప్రస్తుత శని స్థితి: "
                : isHi
                ? "वर्तमान शनि स्थिति: "
                : "Saturn Currently in: "}
              <strong>
                {isTe
                  ? report.currentSaturnRashiNameTe
                  : isHi
                  ? report.currentSaturnRashiNameHi
                  : report.currentSaturnRashiName}
              </strong>
            </span>
          </div>
        </div>

        {/* 12 Rashi Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {RASI_NAMES.map((name, idx) => {
            const isSelected = selectedRashi === idx;
            const rashiReport = calculateSadeSatiReport(idx, new Date());
            const hasSadeSati = rashiReport.isInSadeSati;
            const hasDhaiya = rashiReport.isInDhaiya;

            return (
              <button
                key={idx}
                onClick={() => setSelectedRashi(idx)}
                className={`relative flex flex-col items-center justify-center rounded-2xl p-3 text-center transition ${
                  isSelected
                    ? "bg-gradient-to-b from-saffron/15 to-saffron/5 border-2 border-saffron shadow-sm"
                    : "border border-sand bg-sand/20 hover:bg-sand/40 hover:border-sand-dark"
                }`}
              >
                <span className="text-2xl">{RASHI_SYMBOLS[idx]}</span>
                <span className="mt-1 font-serif text-sm font-bold text-ink">
                  {isTe ? RASI_NAMES_TE[idx] : isHi ? RASI_NAMES_HI[idx] : name}
                </span>
                <span className="text-[10px] text-muted">
                  {isTe ? name : isHi ? name : RASI_NAMES_HI[idx]}
                </span>

                {/* Status Dot */}
                {hasSadeSati && (
                  <span className="mt-1 inline-flex items-center rounded-md bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-800">
                    {isTe ? "ఏలినాటి శని" : isHi ? "साढ़े साती" : "Sade Sati"}
                  </span>
                )}
                {!hasSadeSati && hasDhaiya && (
                  <span className="mt-1 inline-flex items-center rounded-md bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                    {isTe ? "ధైయా" : isHi ? "ढैय्या" : "Dhaiya"}
                  </span>
                )}
                {!hasSadeSati && !hasDhaiya && (
                  <span className="mt-1 inline-flex items-center rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                    {isTe ? "విముక్తి" : isHi ? "मुक्त" : "Free"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Status Overview Card */}
      <div
        className={`rounded-3xl border p-6 shadow-sm ${
          report.isInSadeSati
            ? "border-rose-200 bg-gradient-to-br from-rose-50/70 via-white to-rose-50/30"
            : report.isInDhaiya
            ? "border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30"
            : "border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30"
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                report.isInSadeSati
                  ? "bg-rose-100 text-rose-700"
                  : report.isInDhaiya
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {report.isInSadeSati ? (
                <AlertTriangle className="h-7 w-7" />
              ) : report.isInDhaiya ? (
                <Clock className="h-7 w-7" />
              ) : (
                <CheckCircle2 className="h-7 w-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-white/80 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-muted shadow-2xs">
                  {isTe
                    ? "ప్రస్తుత గోచార స్థితి"
                    : isHi
                    ? "वर्तमान गोचर स्थिति"
                    : "Current Status"}
                </span>
                <span className="font-serif text-sm font-semibold text-ink">
                  {isTe
                    ? `${report.moonRashiNameTe} రాశి`
                    : isHi
                    ? `${report.moonRashiNameHi} राशि`
                    : `${report.moonRashiName} Rashi`}
                </span>
              </div>

              <h3 className="mt-1 font-serif text-xl font-bold text-ink">
                {isTe
                  ? report.statusSummaryTe
                  : isHi
                  ? report.statusSummaryHi
                  : report.statusSummary}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-muted">
                {isTe
                  ? report.temperamentExplanationTe
                  : isHi
                  ? report.temperamentExplanationHi
                  : report.temperamentExplanation}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-white/90 p-4 border border-sand/80 shadow-xs">
            <div className="text-[11px] text-muted">
              {isTe
                ? "శని ప్రభావం (మీ రాశికి):"
                : isHi
                ? "शनि की प्रकृति (आपकी राशि हेतु):"
                : "Saturn's Influence on this Sign:"}
            </div>
            <div
              className={`mt-1 font-serif text-sm font-bold ${
                report.temperament === "favorable"
                  ? "text-emerald-700"
                  : report.temperament === "challenging"
                  ? "text-rose-700"
                  : "text-amber-700"
              }`}
            >
              {isTe
                ? report.temperamentTitleTe
                : isHi
                ? report.temperamentTitleHi
                : report.temperamentTitle}
            </div>
          </div>
        </div>

        {/* Current Active Period Banner */}
        {report.currentPeriodDetails && (
          <div className="mt-5 rounded-2xl bg-white/95 p-4 border border-sand/80 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-ink">
                {isTe
                  ? "ప్రస్తుత చురుకైన దశ వివరాలు:"
                  : isHi
                  ? "सक्रिय चरण विवरण:"
                  : "Active Period Timeline:"}{" "}
                <span className="text-saffron-deep">
                  {isTe
                    ? report.currentPeriodDetails.labelTe
                    : isHi
                    ? report.currentPeriodDetails.labelHi
                    : report.currentPeriodDetails.label}
                </span>
              </span>
              <span className="font-mono font-semibold text-muted">
                {report.currentPeriodDetails.startDate}{" "}
                {isTe ? "నుండి" : isHi ? "से" : "to"}{" "}
                {report.currentPeriodDetails.endDate} {isTe ? "వరకు" : ""}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Complete Sade Sati Cycles Across Lifetime (1960–2065) */}
      <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-saffron" />
          <h3 className="font-serif text-lg font-bold text-ink">
            {isTe
              ? `సంపూర్ణ ఏలినాటి శని చక్రాల జాబితా (${report.moonRashiNameTe} రాశి — 1960–2065)`
              : isHi
              ? `सम्पूर्ण साढ़े साती चक्र सूची (${report.moonRashiNameHi} राशि)`
              : `All Sade Sati Cycles for ${report.moonRashiName} (1960–2065)`}
          </h3>
        </div>
        <p className="text-xs text-muted">
          {isTe
            ? "మానవ జీవితంలో సాధారణంగా 2 నుండి 3 సార్లు ఏలినాటి శని ప్రభావం వస్తుంది. ప్రతి చక్రం సుమారు 7.5 సంవత్సరాలు ఉండి 3 దశలుగా (ఆద్య, మధ్య, అంత్య) విభజించబడుతుంది."
            : isHi
            ? "मनुष्य के जीवन में प्रायः २ से ३ बार साढ़े साती का प्रभाव आता है। प्रत्येक चक्र लगभग ७.५ वर्ष तक रहता है जिसे ३ चरणों (उदय, मध्य, अस्त) में बांटा जाता है।"
            : "An individual typically experiences 2 to 3 Sade Sati cycles in a lifetime. Each 7.5-year cycle comprises three distinct 2.5-year phases."}
        </p>

        <div className="space-y-4">
          {report.allSadeSatiCycles.map((cycle) => (
            <div
              key={cycle.cycleNumber}
              className={`rounded-2xl border p-4 transition ${
                cycle.isCurrent
                  ? "border-saffron bg-amber-50/30 shadow-xs"
                  : "border-sand/70 bg-sand/10"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-ink">
                    {isTe
                      ? `ఏలినాటి శని చక్రం ${cycle.cycleNumber}`
                      : isHi
                      ? `साढ़े साती चक्र ${cycle.cycleNumber}`
                      : `Sade Sati Cycle ${cycle.cycleNumber}`}
                  </span>
                  {cycle.isCurrent && (
                    <span className="rounded-md bg-saffron px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      {isTe
                        ? "ప్రస్తుతం చురుకుగా ఉంది"
                        : isHi
                        ? "वर्तमान में सक्रिय"
                        : "Currently Active"}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-semibold text-muted">
                  {cycle.overallStartDate} {isTe ? "నుండి" : isHi ? "से" : "to"}{" "}
                  {cycle.overallEndDate} {isTe ? "వరకు" : ""}
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {cycle.phases.map((ph, pIdx) => (
                  <div
                    key={pIdx}
                    className={`rounded-xl p-3 text-xs ${
                      ph.isCurrent
                        ? "bg-saffron/15 border border-saffron/50 text-ink font-semibold"
                        : "bg-white/80 border border-sand/50 text-muted"
                    }`}
                  >
                    <div className="font-bold text-ink">
                      {isTe ? ph.labelTe : isHi ? ph.labelHi : ph.label}
                    </div>
                    <div className="mt-1 font-mono text-[11px]">
                      {ph.startDate} → {ph.endDate}
                    </div>
                    <div className="mt-1 text-[10px]">
                      {isTe
                        ? "శని రాశి: "
                        : isHi
                        ? "शनि राशि: "
                        : "Saturn in: "}
                      <strong className="text-ink">
                        {isTe
                          ? ph.rashiNameTe
                          : isHi
                          ? ph.rashiNameHi
                          : ph.rashiName}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dhaiya (Small Panoti) Timeline */}
      <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-ink">
            {isTe
              ? "శని ధైయా (కంటక & అష్టమ శని) కాలాలు"
              : isHi
              ? "शनि ढैय्या (कंटक एवं अष्टम) तिथियां"
              : "Shani Dhaiya Periods (Kantaka & Ashtama)"}
          </h3>
        </div>
        <p className="text-xs text-muted">
          {isTe
            ? "శని జన్మ రాశి నుండి 4వ ఇంట (కంటక శని) లేదా 8వ ఇంట (అష్టమ శని) సంచరించినప్పుడు 2.5 సంవత్సరాల ధైయా కాలం ఏర్పడుతుంది."
            : isHi
            ? "जब शनि जन्म राशि से चतुर्थ भाव (कंटक) अथवा अष्टम भाव (अष्टम शनि) में गोचर करते हैं, तो २.५ वर्ष की ढैय्या लगती है।"
            : "When Saturn transits the 4th house (Kantaka) or 8th house (Ashtama) from natal Moon, the 2.5-year Dhaiya period occurs."}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {report.allDhaiyaPeriods.slice(-6).map((dh, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition ${
                dh.isCurrent
                  ? "border-amber-400 bg-amber-50/50 shadow-xs"
                  : "border-sand bg-sand/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-ink">
                  {isTe ? dh.labelTe : isHi ? dh.labelHi : dh.label}
                </span>
                {dh.isCurrent && (
                  <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {isTe ? "ప్రస్తుతం" : isHi ? "वर्तमान" : "Current"}
                  </span>
                )}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                {dh.startDate} {isTe ? "నుండి" : isHi ? "से" : "to"}{" "}
                {dh.endDate} {isTe ? "వరకు" : ""}
              </div>
              <div className="mt-1 text-xs text-muted">
                {isTe
                  ? "శని రాశి: "
                  : isHi
                  ? "शनि राशि: "
                  : "Saturn in: "}
                <strong className="text-ink">
                  {isTe
                    ? dh.rashiNameTe
                    : isHi
                    ? dh.rashiNameHi
                    : dh.rashiName}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classical Vedic Remedies (Shani Shanti Upay) */}
      <div className="rounded-3xl border border-saffron/30 bg-gradient-to-br from-cream via-amber-50/40 to-cream p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-saffron-deep" />
          <h3 className="font-serif text-lg font-bold text-ink">
            {isTe
              ? "శని శాంతి & సాత్విక వైదిక పరిహారాలు"
              : isHi
              ? "शनि शांति एवं सात्विक वैदिक उपाय"
              : "Authentic Vedic Remedies for Saturn (Shani Upay)"}
          </h3>
        </div>
        <p className="text-xs text-muted">
          {isTe
            ? "వైదిక ఋషులచే ఉపదేశించబడిన ప్రామాణిక నివారణలు — ఇవి ఏలినాటి శని మరియు ధైయా కాలంలో మనోధైర్యం, శాంతి మరియు అనుకూలతను ప్రసాదిస్తాయి."
            : isHi
            ? "वैदिक ऋषियों द्वारा निर्देशित प्रामाणिक उपाय जो साढ़े साती और ढैय्या के दौरान आत्मबल, शांति और अनुकूलता प्रदान करते हैं।"
            : "Time-tested classical remedies according to Vedic tradition to mitigate friction and invoke Saturn's benevolent blessings."}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {report.remedies.map((rem, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-sand bg-white p-4 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2 font-serif text-sm font-bold text-saffron-deep">
                <Sparkles className="h-4 w-4 text-saffron" />
                <span>
                  {isTe ? rem.titleTe : isHi ? rem.titleHi : rem.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {isTe
                  ? rem.descriptionTe
                  : isHi
                  ? rem.descriptionHi
                  : rem.description}
              </p>
              {rem.mantra && (
                <div className="rounded-xl bg-sand/30 p-2.5 font-serif text-xs font-semibold text-ink border border-sand/50">
                  {rem.mantra}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

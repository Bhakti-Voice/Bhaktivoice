"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Compass,
  Flame,
  HelpCircle,
  Info,
  Layers,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { BirthPlace } from "@/lib/spiritual-tools/types";
import { defaultCity } from "@/lib/spiritual-tools/geo";
import {
  analyzeKaalSarpFromBirth,
  type KaalSarpReport,
  KAAL_SARP_YOGAS,
} from "@/lib/spiritual-tools/kaalsarp-engine";
import { BirthDetailsFields } from "./BirthDetailsFields";
import { useLocale } from "@/lib/i18n/client";

export function KaalSarpTool() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [name, setName] = useState("");
  const [date, setDate] = useState("1996-03-24");
  const [time, setTime] = useState("11:45");
  const [place, setPlace] = useState<BirthPlace>(() => defaultCity());
  const [submitted, setSubmitted] = useState(true);

  const report: KaalSarpReport = useMemo(() => {
    return analyzeKaalSarpFromBirth({
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
    report.type === "none"
      ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:border-emerald-800 dark:text-emerald-400"
      : report.type === "anshik"
      ? "bg-amber-500/10 text-amber-700 border-amber-300 dark:border-amber-800 dark:text-amber-400"
      : "bg-purple-500/10 text-purple-700 border-purple-300 dark:border-purple-800 dark:text-purple-400";

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
                ? "काल सर्प योग की गणना हेतु राहु-केतु के सूक्ष्म अक्ष व सातों शास्त्रीय ग्रहों की भाव स्थिति का विश्लेषण किया जाता है।"
                : "Accurate date, time, and coordinates are required to evaluate the Rahu-Ketu nodal axis and planetary longitude hemming."}
            </p>
          </div>

          <BirthDetailsFields
            prefix="kaalsarp"
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
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-95"
            >
              <Compass className="h-4 w-4" />
              {isHi ? "काल सर्प दोष की जांच करें" : "Analyze Kaal Sarp Dosha"}
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
                    {report.type === "none" ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : report.type === "anshik" ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <ShieldAlert className="h-4 w-4" />
                    )}
                    {isHi ? report.typeLabelHi : report.typeLabelEn}
                  </span>

                  {report.hasKaalSarp && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sand/60 px-3 py-1 text-xs font-semibold text-ink">
                      <Sparkles className="h-3.5 w-3.5 text-saffron" />
                      {isHi ? report.directionLabelHi : report.directionLabelEn}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-serif text-2xl font-bold text-ink md:text-3xl">
                  {name ? `${name}: ` : ""}
                  {report.hasKaalSarp && report.yoga
                    ? isHi
                      ? report.yoga.nameHi
                      : report.yoga.nameEn
                    : isHi
                    ? "काल सर्प दोष रहित कुंडली"
                    : "No Kaal Sarp Yoga Present"}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted max-w-3xl">
                  {isHi ? report.summaryHi : report.summaryEn}
                </p>
              </div>

              {/* Nodal Axis Quick Badge */}
              <div className="rounded-2xl border border-sand bg-sand/30 p-5 text-center min-w-[200px]">
                <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                  {isHi ? "राहु-केतु अक्ष" : "Rahu-Ketu Axis"}
                </div>
                <div className="mt-2 font-serif text-lg font-bold text-ink">
                  {isHi ? "राहु: " : "Rahu: "}
                  {report.rahuPlacement.house} {isHi ? "भाव" : "H"} /{" "}
                  {isHi ? "केतु: " : "Ketu: "}
                  {report.ketuPlacement.house} {isHi ? "भाव" : "H"}
                </div>
                <div className="mt-2 text-xs text-muted">
                  {isHi
                    ? `${report.planetsHemmedCount} / 7 ग्रह अक्ष के भीतर`
                    : `${report.planetsHemmedCount} of 7 planets enclosed`}
                </div>
                {report.yoga && (
                  <div className="mt-2 rounded-xl bg-purple-500/10 px-2 py-1 text-[11px] font-bold text-purple-700 dark:text-purple-400">
                    {isHi ? "उन्नति आयु: " : "Relief / Rise Age: "} {report.yoga.reliefAge}+{" "}
                    {isHi ? "वर्ष" : "Yrs"}
                  </div>
                )}
              </div>
            </div>

            {/* Rahu & Ketu Positions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-sand/60 pt-6">
              <div className="rounded-2xl border border-sand/80 bg-sand/30 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted">
                  {isHi ? "राहु स्थिति (सर्प का मुख)" : "Rahu Position (Serpent's Head)"}
                </div>
                <div className="mt-1 font-serif text-base font-bold text-ink">
                  {report.rahuPlacement.house}
                  {isHi ? "वां भाव" : "th House"} —{" "}
                  {isHi ? report.rahuPlacement.rashiNameHi : report.rahuPlacement.rashiName} (
                  {report.rahuPlacement.degree})
                </div>
              </div>

              <div className="rounded-2xl border border-sand/80 bg-sand/30 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted">
                  {isHi ? "केतु स्थिति (सर्प की पूंछ)" : "Ketu Position (Serpent's Tail)"}
                </div>
                <div className="mt-1 font-serif text-base font-bold text-ink">
                  {report.ketuPlacement.house}
                  {isHi ? "वां भाव" : "th House"} —{" "}
                  {isHi ? report.ketuPlacement.rashiNameHi : report.ketuPlacement.rashiName} (
                  {report.ketuPlacement.degree})
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Enclosure Table */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-saffron" />
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi ? "ग्रह अक्षीय स्थिति विवरण" : "Planetary Nodal Axis Distribution"}
              </h3>
            </div>
            <p className="text-xs text-muted mb-6">
              {isHi
                ? "काल सर्प योग का निर्माण तभी होता है जब सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र व शनि सातों ग्रह राहु-केतु के एक ही ओर बंधे हों।"
                : "A classical Kaal Sarp Yoga requires all 7 celestial grahas to be hemmed on one hemisphere of the Rahu-Ketu nodal axis."}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sand text-muted">
                    <th className="pb-3 font-semibold">{isHi ? "ग्रह" : "Planet"}</th>
                    <th className="pb-3 font-semibold">{isHi ? "भाव" : "House"}</th>
                    <th className="pb-3 font-semibold">{isHi ? "अंश (Degree)" : "Degree"}</th>
                    <th className="pb-3 font-semibold">{isHi ? "अक्षीय स्थिति" : "Nodal Side"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/40">
                  {report.planetChecks.map((p) => (
                    <tr key={p.id} className="py-2.5">
                      <td className="py-2.5 font-bold text-ink">
                        {isHi ? p.nameHi : p.nameEn}
                      </td>
                      <td className="py-2.5">
                        {p.house} {isHi ? "भाव" : "House"}
                      </td>
                      <td className="py-2.5 text-muted">{p.degree}</td>
                      <td className="py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            p.side === "hemmed"
                              ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          }`}
                        >
                          {p.side === "hemmed"
                            ? isHi
                              ? "अक्ष के भीतर (बद्ध)"
                              : "Hemmed in Axis"
                            : isHi
                            ? "अक्ष से बाहर (मुक्त)"
                            : "Escaped Outside"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Yoga Details & Life Impacts (If Yoga Present) */}
          {report.yoga && (
            <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-saffron" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isHi
                    ? `${report.yoga.nameHi}: जीवन क्षेत्रों पर प्रभाव`
                    : `${report.yoga.nameEn}: Life Area Insights`}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-sand/80 bg-sand/20 p-5">
                  <div className="flex items-center gap-2 text-ink font-bold font-serif text-base mb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    {isHi ? "कार्यक्षेत्र व आजीविका" : "Career & Professional Rise"}
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    {isHi ? report.yoga.careerImpactHi : report.yoga.careerImpactEn}
                  </p>
                </div>

                <div className="rounded-2xl border border-sand/80 bg-sand/20 p-5">
                  <div className="flex items-center gap-2 text-ink font-bold font-serif text-base mb-2">
                    <Award className="h-4 w-4 text-saffron" />
                    {isHi ? "दांपत्य व परिवार" : "Marriage & Family Harmony"}
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    {isHi ? report.yoga.maritalImpactHi : report.yoga.maritalImpactEn}
                  </p>
                </div>

                <div className="rounded-2xl border border-sand/80 bg-sand/20 p-5">
                  <div className="flex items-center gap-2 text-ink font-bold font-serif text-base mb-2">
                    <Shield className="h-4 w-4 text-indigo-600" />
                    {isHi ? "स्वास्थ्य व मानसिक शांति" : "Health & Mental Vitality"}
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    {isHi ? report.yoga.healthImpactHi : report.yoga.healthImpactEn}
                  </p>
                </div>
              </div>

              {/* Silver Lining Card */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
                <div className="font-serif text-base font-bold text-amber-900 dark:text-amber-300">
                  {isHi ? "सकारात्मक पक्ष व ऐतिहासिक प्रमाण" : "The Silver Lining: Greatness & High Achievement"}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                  {isHi ? report.yoga.silverLiningHi : report.yoga.silverLiningEn}
                </p>
              </div>
            </div>
          )}

          {/* Authentic Shastric Remedies Card */}
          <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-saffron" />
              <h3 className="font-serif text-xl font-bold text-ink">
                {isHi ? "प्रामाणिक काल सर्प शांति एवं सात्विक उपाय" : "Authentic Kaal Sarp Shanti & Shastric Remedies"}
              </h3>
            </div>
            <p className="text-xs text-muted mb-6">
              {isHi
                ? "काल सर्प योग से भयभीत होने की आवश्यकता नहीं है। भगवान शिव की आराधना व सात्विक नियमों के पालन से यह योग असीम प्रतिष्ठा व समृद्धि का कारक बन जाता है।"
                : "Kaal Sarp Yoga is not a curse but an intense karmic catalyst. Classical Jyotish texts prescribe empowering Shiva sadhanas and Rahu-Ketu harmony rituals."}
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
                    <div className="mt-3 rounded-xl border border-sand bg-white p-2.5 text-center font-serif text-xs font-semibold text-purple-700 dark:text-purple-400">
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

"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Flame, Info } from "lucide-react";
import type { ManglikResult } from "@/lib/spiritual-tools/types";
import { useLocale } from "@/lib/i18n/client";

export type ManglikCardProps = {
  manglik: ManglikResult;
};

export function ManglikCard({ manglik }: ManglikCardProps) {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const isFree = !manglik.isManglik;
  const isCancelled = manglik.isCancelled;

  return (
    <div
      className={`rounded-3xl border p-5 shadow-xs transition sm:p-6 ${
        isFree
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white"
          : isCancelled
          ? "border-amber-200 bg-gradient-to-br from-amber-50/60 to-white"
          : "border-orange-300 bg-gradient-to-br from-orange-50/80 to-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              isFree
                ? "bg-emerald-100 text-emerald-700"
                : isCancelled
                ? "bg-amber-100 text-amber-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {isFree ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Flame className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
              {isTe ? "మాంగళిక దోష విశ్లేషణ (కుజ దోషం)" : isHi ? "मांगलिक दोष विश्लेषण (Kuja Dosha)" : "Manglik Dosha Analysis"}
            </h3>
            <p className="text-xs text-muted sm:text-sm">
              {isTe
                ? `స్థితి: ${manglik.level === "None" ? "దోష రహితం" : manglik.level + " మాంగళిక దోషం"}`
                : isHi
                ? `स्थिति: ${manglik.levelHi}`
                : `Status: ${manglik.level === "None" ? "No Dosha" : manglik.level + " Manglik"}`}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            isFree
              ? "bg-emerald-100 text-emerald-800"
              : isCancelled
              ? "bg-amber-100 text-amber-800"
              : "bg-orange-100 text-orange-900"
          }`}
        >
          {isTe ? (manglik.level === "None" ? "దోష రహితం" : manglik.level === "Low" ? "సాధారణ మాంగళికం" : "పూర్ణ మాంగళికం") : isHi ? manglik.levelHi : manglik.level}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {isTe ? (manglik.isManglik ? "కుండలిలో కుజుడు లగ్నం, 4, 7, 8 లేదా 12వ స్థానంలో ఉన్నందున కుజ దోష ప్రభావం కలదు." : "మీ జన్మ కుండలిలో ఎటువంటి మాంగళిక లేదా కుజ దోషం లేదు. వైవాహిక జీవితం శుభప్రదం.") : isHi ? manglik.descriptionHi : manglik.description}
      </p>

      {isCancelled && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-amber-100/60 p-3 text-xs text-amber-900">
          <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
          <span>{isTe ? (manglik.cancellationReasonHi || manglik.cancellationReason) : isHi ? manglik.cancellationReasonHi : manglik.cancellationReason}</span>
        </div>
      )}

      {!isFree && !isCancelled && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-orange-100/60 p-3 text-xs text-orange-950">
          <AlertCircle className="h-4 w-4 shrink-0 text-orange-700 mt-0.5" />
          <span>
            {isTe
              ? "శాంతి పరిహారం: ప్రతిరోజూ హనుమాన్ చాలీసా పఠించండి లేదా పరమశివునికి రుద్రాభిషేకం జరిపించండి. వివాహానికి ముందు ఇరువైపుల కుండలి పొంతన పరిశీలించడం శ్రేయస్కరం."
              : isHi
              ? "उपाय: भगवान शिव एवं हनुमान जी की आराधना करें। विवाह से पूर्व वर-वधू दोनों की कुंडलियों का सामंजस्य आवश्यक है।"
              : "Remedial Guidance: Worship of Lord Shiva & Lord Hanuman is auspicious. Mutual horoscope matching is recommended before marriage."}
          </span>
        </div>
      )}
    </div>
  );
}

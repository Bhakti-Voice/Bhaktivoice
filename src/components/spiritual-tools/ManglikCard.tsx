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
              {isHi ? "मांगलिक दोष विश्लेषण (Kuja Dosha)" : "Manglik Dosha Analysis"}
            </h3>
            <p className="text-xs text-muted sm:text-sm">
              {isHi
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
          {isHi ? manglik.levelHi : manglik.level}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        {isHi ? manglik.descriptionHi : manglik.description}
      </p>

      {isCancelled && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-amber-100/60 p-3 text-xs text-amber-900">
          <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
          <span>{isHi ? manglik.cancellationReasonHi : manglik.cancellationReason}</span>
        </div>
      )}

      {!isFree && !isCancelled && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-orange-100/60 p-3 text-xs text-orange-950">
          <AlertCircle className="h-4 w-4 shrink-0 text-orange-700 mt-0.5" />
          <span>
            {isHi
              ? "उपाय: भगवान शिव एवं हनुमान जी की आराधना करें। विवाह से पूर्व वर-वधू दोनों की कुंडलियों का सामंजस्य आवश्यक है।"
              : "Remedial Guidance: Worship of Lord Shiva & Lord Hanuman is auspicious. Mutual horoscope matching is recommended before marriage."}
          </span>
        </div>
      )}
    </div>
  );
}

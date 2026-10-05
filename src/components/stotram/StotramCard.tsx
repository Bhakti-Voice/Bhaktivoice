import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { StotramPage } from "@/lib/stotram/types";
import { BookOpen, Calendar, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

export type StotramCardProps = {
  stotram: StotramPage;
  locale?: string;
};

export function StotramCard({ stotram, locale = "en" }: StotramCardProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";

  return (
    <LocaleLink
      href={`/stotram/${stotram.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-200/90 bg-white p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg sm:p-6"
    >
      {/* Top Banner Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 opacity-80 transition-opacity group-hover:opacity-100" />

      <div>
        {/* Badges */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
            <Sparkles className="h-3 w-3 text-amber-600" />
            {isHi ? stotram.deityHi : isTe ? stotram.deityTe : stotram.deity}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/60 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            <ShieldCheck className="h-3 w-3 text-amber-600" />
            {stotram.totalVerses} {isHi ? "श्लोक" : isTe ? "శ్లోకాలు" : "Verses"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-neutral-900 transition-colors group-hover:text-amber-700 sm:text-xl">
          {isHi
            ? stotram.titleHi || stotram.h1
            : isTe
            ? stotram.titleTe || stotram.h1
            : stotram.h1}
        </h3>

        {/* Introduction */}
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">
          {isHi
            ? stotram.introductionHi || stotram.introduction
            : isTe
            ? stotram.introductionTe || stotram.introduction
            : stotram.introduction}
        </p>

        {/* Meta Pills */}
        <div className="mt-4 space-y-1.5 border-t border-amber-100 pt-3 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span className="truncate">
              {isHi ? "रचयिता:" : isTe ? "రచయిత:" : "By:"}{" "}
              <strong className="font-medium text-neutral-800">
                {isHi
                  ? stotram.authorComposerHi
                  : isTe
                  ? stotram.authorComposerTe || stotram.authorComposer
                  : stotram.authorComposer}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span className="truncate">
              {isHi ? "शुभ दिन:" : isTe ? "శుభ దినం:" : "Best Day:"}{" "}
              <strong className="font-medium text-neutral-800">
                {isHi
                  ? stotram.bestDayToChantHi
                  : isTe
                  ? stotram.bestDayToChantTe || stotram.bestDayToChant
                  : stotram.bestDayToChant}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-amber-100/70 pt-3">
        <span className="text-xs font-semibold text-amber-800 group-hover:underline">
          {isHi ? "सम्पूर्ण स्तोत्र पढ़ें" : isTe ? "పూర్తి స్తోత్రం చదవండి" : "Read Full Stotram"}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-800 transition-colors group-hover:bg-amber-600 group-hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </LocaleLink>
  );
}

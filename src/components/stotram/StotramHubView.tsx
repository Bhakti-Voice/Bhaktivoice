"use client";

import { useMemo, useState } from "react";
import type { StotramPage } from "@/lib/stotram/types";
import { StotramCard } from "./StotramCard";
import { Filter, Search, Sparkles } from "lucide-react";

export type StotramHubViewProps = {
  stotrams: StotramPage[];
  locale?: string;
};

const CATEGORIES = [
  { id: "all", labelEn: "All Stotras & Suktas", labelHi: "सभी स्तोत्र एवं सूक्त", labelTe: "అన్ని స్తోత్రాలు" },
  { id: "rama", labelEn: "Sri Rama", labelHi: "श्री राम", labelTe: "శ్రీరాముడు" },
  { id: "shiva", labelEn: "Lord Shiva", labelHi: "भगवान शिव", labelTe: "శివుడు" },
  { id: "surya", labelEn: "Surya Dev", labelHi: "सूर्य देव", labelTe: "సూర్యుడు" },
  { id: "lakshmi", labelEn: "Maha Lakshmi", labelHi: "महालक्ष्मी", labelTe: "మహాలక్ష్మి" },
  { id: "ganesha", labelEn: "Lord Ganesha", labelHi: "गणेश जी", labelTe: "వినాయకుడు" },
  { id: "hanuman", labelEn: "Hanuman Ji", labelHi: "हनुमान जी", labelTe: "హనుమంతుడు" },
  { id: "durga", labelEn: "Maa Durga", labelHi: "मां दुर्गा", labelTe: "దుర్గాదేవి" },
  { id: "vedic_suktam", labelEn: "Vedic Suktas", labelHi: "वैदिक सूक्त", labelTe: "వేద సూక్తాలు" },
  { id: "vishnu", labelEn: "Lord Vishnu", labelHi: "भगवान विष्णु", labelTe: "మహావిష్ణువు" },
];

export function StotramHubView({ stotrams, locale = "en" }: StotramHubViewProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredStotrams = useMemo(() => {
    return stotrams.filter((item) => {
      // Category match
      const categoryMatch = selectedCategory === "all" || item.stotramCategory === selectedCategory;
      if (!categoryMatch) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.titleHi && item.titleHi.toLowerCase().includes(q)) ||
        (item.titleTe && item.titleTe.toLowerCase().includes(q)) ||
        item.h1.toLowerCase().includes(q) ||
        item.deity.toLowerCase().includes(q) ||
        (item.deityHi && item.deityHi.toLowerCase().includes(q)) ||
        (item.deityTe && item.deityTe.toLowerCase().includes(q)) ||
        item.authorComposer.toLowerCase().includes(q) ||
        (item.authorComposerTe && item.authorComposerTe.toLowerCase().includes(q)) ||
        item.introduction.toLowerCase().includes(q) ||
        (item.introductionTe && item.introductionTe.toLowerCase().includes(q))
      );
    });
  }, [stotrams, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Search and Filters Bar */}
      <div className="mb-8 rounded-2xl border border-amber-200/90 bg-white/95 p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHi
                  ? "स्तोत्र, देवता अथवा ऋषि का नाम खोजें (उदा. राम रक्षा, शिव तांडव, कनकधारा)..."
                  : isTe
                  ? "స్తోత్రం లేదా దేవత పేరు శోధించండి..."
                  : "Search stotra by name, deity, or rishi (e.g. Ram Raksha, Shiva Tandava, Kanakadhara)..."
              }
              className="w-full rounded-xl border border-amber-200 bg-amber-50/30 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results count badge */}
          <div className="flex items-center gap-1.5 self-end text-xs font-medium text-amber-900 md:self-auto">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>
              {isHi
                ? `${filteredStotrams.length} स्तोत्र उपलब्ध`
                : isTe
                ? `${filteredStotrams.length} స్తోత్రాలు లభ్యం`
                : `${filteredStotrams.length} Sacred Stotras Available`}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-100 pt-3">
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-900/70">
            <Filter className="h-3 w-3" />
            {isHi ? "देवता:" : isTe ? "దేవత:" : "Filter:"}
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = isHi ? cat.labelHi : isTe ? cat.labelTe : cat.labelEn;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-amber-700 text-white shadow-xs"
                    : "bg-amber-50/80 text-amber-950 hover:bg-amber-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredStotrams.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {filteredStotrams.map((stotram) => (
            <StotramCard key={stotram.slug} stotram={stotram} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 p-12 text-center">
          <p className="font-serif text-lg font-semibold text-neutral-800">
            {isHi
              ? "आपकी खोज के अनुसार कोई स्तोत्र नहीं मिला।"
              : isTe
              ? "మీ శోధనకు సరిపోలే స్తోత్రం కనుగొనబడలేదు."
              : "No stotra found matching your search."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 rounded-xl bg-amber-700 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-amber-800"
          >
            {isHi ? "सभी स्तोत्र देखें" : isTe ? "అన్ని స్తోత్రాలు చూడండి" : "Reset Filters"}
          </button>
        </div>
      )}
    </div>
  );
}

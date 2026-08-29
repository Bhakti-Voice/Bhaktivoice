"use client";

import React, { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Type,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";

interface GitaControlsProps {
  currentSpreadIndex: number;
  totalSpreads: number;
  currentVerseNumber: number;
  totalVersesInChapter: number;
  onFirstSpread: () => void;
  onPrevSpread: () => void;
  onNextSpread: () => void;
  onLastSpread: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  fontSize: "sm" | "md" | "lg" | "xl";
  onChangeFontSize: (size: "sm" | "md" | "lg" | "xl") => void;
  isMobileSinglePage: boolean;
  onToggleSinglePage: () => void;
  onJumpToQuoteVerse?: (chapter: number, verse: number) => void;
}

const FAMOUS_QUOTES = [
  {
    chapter: 4,
    verse: 7,
    text: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
    attribution: "Bhagavad Gita 4.7",
  },
  {
    chapter: 2,
    verse: 47,
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    attribution: "Bhagavad Gita 2.47",
  },
  {
    chapter: 9,
    verse: 22,
    text: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
    attribution: "Bhagavad Gita 9.22",
  },
  {
    chapter: 18,
    verse: 66,
    text: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    attribution: "Bhagavad Gita 18.66",
  },
];

export function GitaControls({
  currentSpreadIndex,
  totalSpreads,
  currentVerseNumber,
  totalVersesInChapter,
  onFirstSpread,
  onPrevSpread,
  onNextSpread,
  onLastSpread,
  hasPrev,
  hasNext,
  fontSize,
  onChangeFontSize,
  isMobileSinglePage,
  onToggleSinglePage,
  onJumpToQuoteVerse,
}: GitaControlsProps) {
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const activeQuote = FAMOUS_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % FAMOUS_QUOTES.length);
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-4">
      {/* Floating Sacred Navigation Dock */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-md border border-amber-900/15 backdrop-blur-md">
        {/* First Page */}
        <button
          onClick={onFirstSpread}
          disabled={!hasPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-950 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="First Spread"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={onPrevSpread}
          disabled={!hasPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-950 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Previous Page (Click Left Page)"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page / Verse Indicator Badge */}
        <div className="mx-2 flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-serif font-semibold text-amber-950 border border-amber-300/60 shadow-2xs">
          {totalVersesInChapter > 0 ? (
            <>
              <span>
                {currentVerseNumber} / {totalVersesInChapter}
              </span>
              <span className="text-amber-800/40 text-[10px]">
                (Spread {currentSpreadIndex + 1}/{Math.max(1, totalSpreads)})
              </span>
            </>
          ) : (
            <span className="text-amber-800/60">0 Verses</span>
          )}
        </div>

        {/* Next Page */}
        <button
          onClick={onNextSpread}
          disabled={!hasNext}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-950 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Next Page (Click Right Page)"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={onLastSpread}
          disabled={!hasNext}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-950 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Last Spread"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-[1px] bg-stone-300" />

        {/* Font Size Adjuster Popover */}
        <div className="relative">
          <button
            onClick={() => setFontMenuOpen(!fontMenuOpen)}
            className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-950 transition-colors"
            title="Adjust Scripture Text Size"
          >
            <span className="font-serif font-bold text-sm">Aa</span>
          </button>

          {fontMenuOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex items-center gap-1 rounded-xl bg-white p-1.5 shadow-xl border border-amber-200 z-50">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    onChangeFontSize(size);
                    setFontMenuOpen(false);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    fontSize === size
                      ? "bg-amber-600 text-white font-bold"
                      : "text-stone-700 hover:bg-amber-100"
                  }`}
                >
                  {size === "sm" ? "Compact" : size === "md" ? "Medium" : size === "lg" ? "Large" : "Grand"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spread Mode Toggle (Mobile / Tablet) */}
        <button
          onClick={onToggleSinglePage}
          className={`hidden md:flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${
            isMobileSinglePage ? "bg-amber-100 text-amber-900" : "text-stone-600 hover:bg-stone-100"
          }`}
          title={isMobileSinglePage ? "Switch to 2-Page Open Spread" : "Switch to Single Page Focus"}
        >
          {isMobileSinglePage ? <Layers className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
          <span>{isMobileSinglePage ? "1 Page" : "2 Pages"}</span>
        </button>
      </div>

      {/* Inspirational Bottom Shloka Banner */}
      <div
        onClick={() => {
          if (onJumpToQuoteVerse) {
            onJumpToQuoteVerse(activeQuote.chapter, activeQuote.verse);
          } else {
            handleNextQuote();
          }
        }}
        className="group relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 px-4 py-2.5 shadow-2xs border border-amber-300/60 transition-all hover:bg-amber-100/90"
        title="Click to jump to this shloka / click next quote"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-amber-700 font-serif text-sm">❝</span>
          <p
            className="truncate text-xs sm:text-sm font-semibold text-amber-950 font-devanagari"
            style={{ fontFamily: "var(--font-devanagari), var(--font-playfair), serif" }}
          >
            {activeQuote.text}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span className="text-[11px] font-medium text-amber-800/90">
            — {activeQuote.attribution}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-amber-700 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}

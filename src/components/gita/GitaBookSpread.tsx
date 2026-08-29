"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GitaVerse } from "@/lib/gita/types";
import { GitaVersePage } from "./GitaVersePage";
import { gitaAudio } from "@/lib/gita/audio";

interface GitaBookSpreadProps {
  leftVerse?: GitaVerse | null;
  rightVerse?: GitaVerse | null;
  chapterNumber: number;
  chapterName: string;
  totalVersesInChapter: number;
  currentSpreadIndex: number;
  totalSpreads: number;
  fontSize?: "sm" | "md" | "lg" | "xl";
  bookmarkedVerses: Set<string>;
  onToggleBookmark: (verse: GitaVerse) => void;
  onShareVerse?: (verse: GitaVerse) => void;
  onPrevSpread: () => void;
  onNextSpread: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isMobileSinglePage?: boolean;
}

export function GitaBookSpread({
  leftVerse,
  rightVerse,
  chapterNumber,
  chapterName,
  totalVersesInChapter,
  currentSpreadIndex,
  totalSpreads,
  fontSize = "md",
  bookmarkedVerses,
  onToggleBookmark,
  onShareVerse,
  onPrevSpread,
  onNextSpread,
  hasPrev,
  hasNext,
  isMobileSinglePage = false,
}: GitaBookSpreadProps) {
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Trigger realistic windy top-to-bottom curvy page flip animation
  const handleNext = () => {
    if (!hasNext || isFlipping) return;
    gitaAudio.playPageTurnSound();
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      onNextSpread();
      setFlipDirection(null);
      setIsFlipping(false);
    }, 650);
  };

  const handlePrev = () => {
    if (!hasPrev || isFlipping) return;
    gitaAudio.playPageTurnSound();
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      onPrevSpread();
      setFlipDirection(null);
      setIsFlipping(false);
    }, 650);
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasNext, hasPrev, isFlipping]);

  return (
    <div
      className="relative mx-auto w-full max-w-5xl py-6 sm:py-8 px-1 sm:px-4 select-none"
      style={{
        perspective: "1600px",
        perspectiveOrigin: "50% 85%",
      }}
    >
      {/* 3D Sacred Scripture Stand with realistic reading recline tilt from bottom */}
      <div
        className="relative rounded-2xl bg-gradient-to-b from-[#2a130e] via-[#3a1d15] to-[#1c0c08] p-2.5 sm:p-4 md:p-5 shadow-[0_35px_70px_-15px_rgba(30,12,8,0.7),0_15px_30px_rgba(0,0,0,0.5)] border border-amber-900/40 transition-transform duration-500 ease-out"
        style={{
          transform: "rotateX(5deg)",
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Embossed Leather Spine Details */}
        <div className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 opacity-60 blur-[0.5px]" />
        
        {/* Layered Paper Edge Thickness (Left Side) */}
        <div className="pointer-events-none absolute top-4 bottom-4 left-1 w-2 sm:w-3 rounded-l-md bg-gradient-to-r from-[#d8caa8] via-[#ede3cc] to-[#c7b58c] opacity-85 shadow-inner" />
        
        {/* Layered Paper Edge Thickness (Right Side) */}
        <div className="pointer-events-none absolute top-4 bottom-4 right-1 w-2 sm:w-3 rounded-r-md bg-gradient-to-l from-[#d8caa8] via-[#ede3cc] to-[#c7b58c] opacity-85 shadow-inner" />

        {/* Sacred Wooden Rehal / Bookstand Bottom Shelf Lip */}
        <div className="pointer-events-none absolute -bottom-3 left-4 right-4 h-4 rounded-b-xl bg-gradient-to-r from-[#1b0a06] via-[#3d1910] to-[#1b0a06] border-t border-amber-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <div className="h-[2px] w-24 rounded-full bg-amber-600/40" />
        </div>

        {/* The Open Pages Spread with 3D Perspective */}
        <div
          className="relative flex flex-col md:flex-row overflow-hidden rounded-lg bg-gradient-to-r from-[#fbf6ea] via-[#f7efe0] to-[#fbf6ea] text-stone-900 shadow-[inset_0_0_25px_rgba(163,117,54,0.22)]"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dynamic sweeping page shadow behind the curving leaf */}
          {isFlipping && (
            <div
              className={`pointer-events-none absolute inset-0 z-20 ${
                flipDirection === "next" ? "animate-curl-shadow-next" : "animate-curl-shadow-prev"
              }`}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-amber-950/30 to-transparent blur-md" />
            </div>
          )}

          {/* Left Page (Clicking turns to previous spread) */}
          <div
            onClick={handlePrev}
            className={`w-full md:w-1/2 relative bg-gradient-to-r from-[#f7f0df] via-[#faf5e8] to-[#f3ebd5] transition-all duration-300 group ${
              hasPrev ? "cursor-pointer" : "cursor-default"
            } ${isMobileSinglePage && rightVerse ? "hidden md:block" : "block"}`}
            title={hasPrev ? "Click to flip to Previous Page" : ""}
          >
            {/* Left Page Inner Spine Shadow Crease */}
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-amber-950/20 via-amber-950/10 to-transparent hidden md:block" />

            {/* Left Corner Page Turn Curled Ear on Hover */}
            {hasPrev && (
              <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                <div
                  className="absolute -bottom-6 -left-6 h-12 w-12 bg-gradient-to-tr from-amber-200 via-[#fff8eb] to-[#e4d4b2] shadow-md transform rotate-45 border-t border-r border-amber-600/40"
                  style={{
                    boxShadow: "2px -2px 8px rgba(74, 16, 20, 0.25)",
                  }}
                />
              </div>
            )}

            <GitaVersePage
              verse={leftVerse}
              chapterNumber={chapterNumber}
              chapterName={chapterName}
              pageSide={isMobileSinglePage ? "single" : "left"}
              fontSize={fontSize}
              isBookmarked={leftVerse ? bookmarkedVerses.has(leftVerse.verseNumber) : false}
              onToggleBookmark={onToggleBookmark}
              onShareVerse={onShareVerse}
            />
          </div>

          {/* Center Book Spine Crease & Shadow */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 hidden md:block z-10">
            <div className="h-full w-full bg-gradient-to-r from-amber-950/20 via-amber-950/35 to-amber-950/20" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-amber-950/40" />
          </div>

          {/* Right Page (Clicking turns to next spread) */}
          <div
            onClick={handleNext}
            className={`w-full md:w-1/2 relative bg-gradient-to-l from-[#f7f0df] via-[#faf5e8] to-[#f3ebd5] transition-all duration-300 group ${
              hasNext ? "cursor-pointer" : "cursor-default"
            } ${isMobileSinglePage && !rightVerse ? "hidden md:block" : "block"}`}
            title={hasNext ? "Click to flip to Next Page" : ""}
          >
            {/* Right Page Inner Spine Shadow Crease */}
            <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-amber-950/20 via-amber-950/10 to-transparent hidden md:block" />

            {/* Realistic Dog-ear Curled Corner on Hover */}
            {hasNext && (
              <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                <div
                  className="absolute -bottom-7 -right-7 h-14 w-14 bg-gradient-to-tl from-amber-200 via-[#fff8eb] to-[#e4d4b2] shadow-lg transform -rotate-45 border-t border-l border-amber-600/50"
                  style={{
                    boxShadow: "-4px -4px 10px rgba(74, 16, 20, 0.3)",
                  }}
                />
              </div>
            )}

            <GitaVersePage
              verse={rightVerse || (isMobileSinglePage ? leftVerse : null)}
              chapterNumber={chapterNumber}
              chapterName={chapterName}
              pageSide={isMobileSinglePage ? "single" : "right"}
              fontSize={fontSize}
              isBookmarked={
                rightVerse
                  ? bookmarkedVerses.has(rightVerse.verseNumber)
                  : leftVerse
                  ? bookmarkedVerses.has(leftVerse.verseNumber)
                  : false
              }
              onToggleBookmark={onToggleBookmark}
              onShareVerse={onShareVerse}
            />
          </div>

          {/* 3D Realistic Double-Sided Windy Top-to-Bottom Curving Leaf */}
          {isFlipping && (
            <div
              className={`pointer-events-none absolute inset-0 z-30 flex ${
                flipDirection === "next" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative h-full w-1/2 overflow-hidden border-amber-900/30 shadow-2xl ${
                  flipDirection === "next"
                    ? "animate-page-turn-next border-r"
                    : "animate-page-turn-prev border-l"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #fdf8ec 0%, #f4e8cb 40%, #eadaae 50%, #fdf8ec 70%, #f4ebd6 100%)",
                }}
              >
                {/* Curved Light Reflection down the crest of the arched paper */}
                <div className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[1px] animate-pulse" />

                {/* Antique Border Accents on the Turning Sheet */}
                <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-amber-700/40" />
                <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-amber-700/40" />
                <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-700/40" />
                <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-700/40" />

                {/* Watermark in center of turning parchment */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-[120px] font-serif font-black text-amber-950">ॐ</span>
                </div>

                {/* Cylinder Shadow along the fold edge */}
                <div
                  className={`absolute inset-y-0 w-8 ${
                    flipDirection === "next"
                      ? "right-0 bg-gradient-to-l from-amber-950/40 to-transparent"
                      : "left-0 bg-gradient-to-r from-amber-950/40 to-transparent"
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Crimson Silk Ribbon Bookmark */}
        <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="h-9 w-4 bg-gradient-to-b from-[#8b0000] via-[#b22222] to-[#800000] shadow-md clip-ribbon border-x border-red-950/40">
            <div className="mx-auto h-full w-[1px] bg-red-400/40" />
          </div>
        </div>

        {/* Floating Page Flip Navigation Chevron Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={!hasPrev || isFlipping}
          className={`absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-800 to-amber-700 text-amber-50 shadow-lg border border-amber-400/40 transition-all hover:scale-105 hover:from-amber-700 hover:to-amber-600 active:scale-95 disabled:opacity-30 disabled:pointer-events-none ${
            !hasPrev ? "hidden sm:flex opacity-30" : ""
          }`}
          title="Previous Page (Click Left Page)"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={!hasNext || isFlipping}
          className={`absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 shadow-lg border border-amber-400/40 transition-all hover:scale-105 hover:from-amber-600 hover:to-amber-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none ${
            !hasNext ? "hidden sm:flex opacity-30" : ""
          }`}
          title="Next Page (Click Right Page)"
          aria-label="Next Page"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Book Spread Sub-indicator Bar */}
      <div className="mt-4 flex items-center justify-between px-2 text-xs font-serif text-amber-900/70">
        <div>
          {leftVerse ? (
            <span>
              Page {currentSpreadIndex * 2 + 1}
              {rightVerse ? ` - ${currentSpreadIndex * 2 + 2}` : ""} • Chapter {chapterNumber}
            </span>
          ) : (
            <span>Chapter {chapterNumber}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold text-amber-950">
            {currentSpreadIndex + 1} of {Math.max(1, totalSpreads)} Spreads
          </span>
          <span className="text-amber-800/40">({totalVersesInChapter} verses)</span>
        </div>
      </div>
    </div>
  );
}

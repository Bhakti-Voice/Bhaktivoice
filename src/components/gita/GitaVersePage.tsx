"use client";

import React, { useState } from "react";
import { Bookmark, Share2, Check } from "lucide-react";
import { GitaVerse } from "@/lib/gita/types";

interface GitaVersePageProps {
  verse?: GitaVerse | null;
  chapterNumber: number;
  chapterName?: string;
  pageSide: "left" | "right" | "single";
  fontSize?: "sm" | "md" | "lg" | "xl";
  isBookmarked?: boolean;
  onToggleBookmark?: (verse: GitaVerse) => void;
  onShareVerse?: (verse: GitaVerse) => void;
}

export function GitaVersePage({
  verse,
  chapterNumber,
  chapterName,
  pageSide,
  fontSize = "md",
  isBookmarked = false,
  onToggleBookmark,
  onShareVerse,
}: GitaVersePageProps) {
  const [copied, setCopied] = useState(false);

  if (!verse) {
    return (
      <div className="flex h-full min-h-[460px] flex-col items-center justify-center p-8 text-center text-amber-900/60 select-none">
        <div className="mb-3 text-4xl font-serif text-amber-800/40">ॐ</div>
        <p className="text-base font-serif font-bold text-amber-950/70">श्रीमद्भगवद्गीता</p>
        <p className="mt-1 text-xs font-medium text-amber-900/60">
          {chapterName ? `Chapter ${chapterNumber} • ${chapterName}` : `Chapter ${chapterNumber}`}
        </p>
        <p className="mt-4 max-w-xs text-xs text-stone-400 italic">
          No shlokas uploaded yet for this chapter. Content can be imported by an authorized administrator via the Admin panel.
        </p>
      </div>
    );
  }

  const handleShare = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onShareVerse) {
      onShareVerse(verse);
    } else {
      const shareText = `॥ श्रीमद्भगवद्गीता श्लोक ${verse.verseNumber} ॥\n\n${verse.sanskrit}\n\n${verse.transliteration}\n\nहिंदी अर्थ:\n${verse.hindi}\n\nEnglish Meaning:\n${verse.english}\n\n— BhaktiVoice`;
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Font size classes
  const fontSizes = {
    sm: {
      sanskrit: "text-base sm:text-lg leading-relaxed",
      translit: "text-xs sm:text-xs leading-normal",
      hindi: "text-xs sm:text-sm leading-relaxed",
      english: "text-xs sm:text-xs leading-relaxed",
    },
    md: {
      sanskrit: "text-lg sm:text-xl md:text-2xl leading-relaxed",
      translit: "text-xs sm:text-sm leading-relaxed",
      hindi: "text-xs sm:text-sm md:text-base leading-relaxed",
      english: "text-xs sm:text-sm leading-relaxed",
    },
    lg: {
      sanskrit: "text-xl sm:text-2xl md:text-3xl leading-relaxed",
      translit: "text-sm sm:text-base leading-relaxed",
      hindi: "text-sm sm:text-base md:text-lg leading-relaxed",
      english: "text-sm sm:text-base leading-relaxed",
    },
    xl: {
      sanskrit: "text-2xl sm:text-3xl md:text-4xl leading-relaxed font-bold",
      translit: "text-base sm:text-lg leading-relaxed",
      hindi: "text-base sm:text-lg md:text-xl leading-relaxed",
      english: "text-base sm:text-lg leading-relaxed",
    },
  }[fontSize];

  return (
    <div
      className={`relative flex h-full min-h-[520px] flex-col justify-between p-6 sm:p-8 md:p-10 select-text ${
        pageSide === "left"
          ? "border-r border-amber-900/10"
          : pageSide === "right"
          ? "border-l border-amber-900/10"
          : ""
      }`}
    >
      {/* Antique Gilded Corner Accents */}
      <div className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-amber-600/30 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-amber-600/30 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-amber-600/30 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-amber-600/30 rounded-br-sm" />

      {/* Subtle Devotional Background Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.025] select-none">
        <span className="text-[160px] font-serif font-black text-amber-950">ॐ</span>
      </div>

      {/* Top Header / Shloka Reference */}
      <div>
        <div className="flex items-center justify-between border-b border-amber-900/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800/80">
              Chapter {verse.chapter} • Verse {verse.verse}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark?.(verse);
              }}
              className={`rounded-full p-1.5 transition-colors ${
                isBookmarked
                  ? "text-amber-600 bg-amber-100/70 hover:bg-amber-200/80"
                  : "text-amber-800/40 hover:text-amber-800 hover:bg-amber-100/50"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark this shloka"}
              aria-label="Bookmark verse"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Shloka Header Title */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-amber-900/80">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-700/40" />
            <h3 className="font-serif text-sm font-semibold tracking-wide text-amber-950 sm:text-base">
              श्लोक {verse.verseNumber}
            </h3>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-700/40" />
          </div>

          {/* Speaker Badge */}
          {verse.speaker && (
            <div className="mt-1.5">
              <span className="inline-block rounded-full bg-amber-100/80 px-3 py-0.5 text-xs font-medium text-amber-900 border border-amber-300/40">
                {verse.speaker}
              </span>
            </div>
          )}
        </div>

        {/* Sanskrit Shloka Verse */}
        <div className="mt-5 text-center px-1">
          <p
            className={`font-serif font-bold text-amber-950 tracking-wide text-balance ${fontSizes.sanskrit}`}
            style={{ fontFamily: "var(--font-devanagari), var(--font-playfair), serif" }}
          >
            {verse.sanskrit.split("\n").map((line, idx) => (
              <span key={`sk-${verse.verseNumber}-${idx}`} className="block my-1">
                {line}
              </span>
            ))}
          </p>

          {/* Transliteration */}
          {verse.transliteration && (
            <div className={`mt-3 text-amber-900/75 italic font-serif text-balance ${fontSizes.translit}`}>
              {verse.transliteration.split("\n").map((line, idx) => (
                <p key={`tr-${verse.verseNumber}-${idx}`} className="my-0.5">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Decorative Divider */}
        <div className="my-5 flex items-center justify-center gap-2 opacity-50">
          <div className="h-[1px] w-12 bg-amber-800/30" />
          <span className="text-amber-800/60 text-xs">❖</span>
          <div className="h-[1px] w-12 bg-amber-800/30" />
        </div>

        {/* Hindi Meaning */}
        {verse.hindi && (
          <div className="mt-2 rounded-lg bg-amber-50/50 p-3 sm:p-3.5 border border-amber-200/40">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              हिंदी भावार्थ
            </div>
            <p
              className={`text-amber-950 font-medium ${fontSizes.hindi}`}
              style={{ fontFamily: "var(--font-devanagari), var(--font-inter), sans-serif" }}
            >
              {verse.hindi}
            </p>
          </div>
        )}

        {/* English Meaning */}
        {verse.english && (
          <div className="mt-3 rounded-lg bg-white/40 p-3 sm:p-3.5 border border-amber-900/10">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800/90">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600/70" />
              English Meaning
            </div>
            <p className={`text-stone-800 font-normal leading-relaxed ${fontSizes.english}`}>
              {verse.english}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Footer on each page */}
      <div className="mt-6 flex items-center justify-between border-t border-amber-900/15 pt-3">
        <div className="flex items-center gap-1 text-[11px] font-serif text-amber-800/60">
          <span>श्रीमद्भगवद्गीता</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 rounded-full bg-amber-100/50 px-2.5 py-1.5 text-xs text-amber-900/80 hover:bg-amber-100 hover:text-amber-950 transition-colors"
            title="Share this shloka"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, BookOpen, Search, Bookmark, Sparkles, Check } from "lucide-react";
import { GitaChapter, GitaVerse } from "@/lib/gita/types";

interface GitaSidebarProps {
  chapters: Omit<GitaChapter, "verses">[];
  currentChapter: GitaChapter;
  activeVerseNumber: number;
  onSelectChapter: (chapterNumber: number) => void;
  onSelectVerse: (verseNumber: number) => void;
  bookmarkedVerses: Set<string>;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
}

export function GitaSidebar({
  chapters,
  currentChapter,
  activeVerseNumber,
  onSelectChapter,
  onSelectVerse,
  bookmarkedVerses,
  onOpenBookmarks,
  onOpenSearch,
}: GitaSidebarProps) {
  const [chapterDropdownOpen, setChapterDropdownOpen] = useState(false);
  const [verseDropdownOpen, setVerseDropdownOpen] = useState(false);

  const verses = currentChapter.verses || [];
  const verseNumbers = verses.map((v) => v.verse);

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-5 rounded-2xl bg-white/80 p-5 shadow-sm border border-amber-900/10 backdrop-blur-md">
      {/* Chapter Information Banner */}
      <div className="relative z-30 rounded-xl bg-gradient-to-br from-amber-50 via-[#fbf7ee] to-amber-100/60 p-4 border border-amber-200/60 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Chapter {currentChapter.chapter}
          </span>
          <span className="rounded-full bg-amber-200/60 px-2 py-0.5 text-[11px] font-medium text-amber-900">
            {verses.length} {verses.length === 1 ? "Verse" : "Verses"}
          </span>
        </div>

        <h2 className="mt-1.5 font-serif text-lg font-bold text-amber-950">
          {currentChapter.name}
        </h2>
        <p
          className="text-sm font-semibold text-amber-800 font-devanagari"
          style={{ fontFamily: "var(--font-devanagari), var(--font-playfair), serif" }}
        >
          {currentChapter.nameHindi}
        </p>

        {currentChapter.nameTranslation && (
          <p className="mt-1 text-xs italic text-stone-600">
            &quot;{currentChapter.nameTranslation}&quot;
          </p>
        )}

        {/* Chapter Switcher Dropdown Trigger */}
        <div className="relative mt-4">
          <button
            onClick={() => setChapterDropdownOpen(!chapterDropdownOpen)}
            className="flex w-full items-center justify-between rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-amber-950 shadow-2xs border border-amber-200 hover:bg-white transition-colors"
          >
            <span>
              {chapters.length > 0
                ? `Change Chapter (${currentChapter.chapter} / ${chapters.length})`
                : "No Chapters Available"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-amber-700 transition-transform ${
                chapterDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {chapterDropdownOpen && (
            <>
              {/* Invisible Click-outside Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setChapterDropdownOpen(false)}
              />

              <div className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-72 overflow-y-auto rounded-xl bg-white p-1.5 shadow-2xl border border-amber-300">
                {chapters.length === 0 ? (
                  <div className="p-4 text-center text-xs text-stone-400">
                    No chapters found. Please import Gita data from the Admin panel.
                  </div>
                ) : (
                  chapters.map((ch, idx) => (
                    <button
                      key={`ch-${ch.chapter}-${idx}`}
                      onClick={() => {
                        onSelectChapter(ch.chapter);
                        setChapterDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg p-2 text-left text-xs transition-colors ${
                        ch.chapter === currentChapter.chapter
                          ? "bg-amber-100 font-bold text-amber-950"
                          : "text-stone-700 hover:bg-amber-50"
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="font-semibold text-amber-950 truncate">
                          {ch.chapter}. {ch.name}
                        </span>
                        {ch.nameHindi && (
                          <span className="text-[11px] text-amber-800/80 font-devanagari truncate">
                            {ch.nameHindi}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-amber-800/80 shrink-0 font-semibold bg-amber-200/50 px-1.5 py-0.5 rounded">
                        {ch.versesCount || 0} shlokas
                      </span>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Verses Number Matrix Pad */}
      <div className="relative z-10 rounded-xl bg-amber-50/40 p-4 border border-amber-900/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Verses in this chapter
          </h3>
          <span className="text-xs text-amber-800/60 font-medium">
            {verseNumbers.length > 0 ? `Active: #${activeVerseNumber}` : "0 Verses"}
          </span>
        </div>

        {/* Number Grid or Empty Notice */}
        {verseNumbers.length === 0 ? (
          <div className="py-8 px-2 text-center text-xs text-amber-900/50 italic">
            No verses uploaded yet for this chapter.
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {verseNumbers.map((vNum) => {
              const isActive = vNum === activeVerseNumber;
              const verseKey = `${currentChapter.chapter}.${vNum}`;
              const isBookmarked = bookmarkedVerses.has(verseKey);

              return (
                <button
                  key={`ch-${currentChapter.chapter}-v-${vNum}`}
                  onClick={() => onSelectVerse(vNum)}
                  className={`relative flex h-8 w-full items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-tr from-amber-700 to-amber-600 text-white font-bold shadow-xs scale-105"
                      : "bg-white text-stone-700 hover:bg-amber-100/70 hover:text-amber-950 border border-amber-900/10"
                  }`}
                  title={`Shloka ${currentChapter.chapter}.${vNum}`}
                >
                  {vNum}
                  {isBookmarked && (
                    <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Navigation Action Tabs */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setChapterDropdownOpen(!chapterDropdownOpen)}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-2.5 text-stone-700 hover:bg-amber-50 hover:text-amber-950 transition-colors border border-amber-900/10"
        >
          <BookOpen className="h-4 w-4 text-amber-700" />
          <span className="text-[11px] font-medium">Chapters</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-2.5 text-stone-700 hover:bg-amber-50 hover:text-amber-950 transition-colors border border-amber-900/10"
        >
          <Search className="h-4 w-4 text-amber-700" />
          <span className="text-[11px] font-medium">Search</span>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-2.5 text-stone-700 hover:bg-amber-50 hover:text-amber-950 transition-colors border border-amber-900/10"
        >
          <Bookmark className="h-4 w-4 text-amber-700" />
          <span className="text-[11px] font-medium">Saved ({bookmarkedVerses.size})</span>
        </button>
      </div>

      {/* Sacred Quote Card */}
      <div className="rounded-xl bg-gradient-to-br from-amber-100/60 via-amber-50 to-white p-4 border border-amber-300/50 shadow-2xs">
        <div className="text-amber-600 text-lg font-serif">“</div>
        <p
          className="text-sm font-bold text-amber-950 -mt-2 font-devanagari leading-snug"
          style={{ fontFamily: "var(--font-devanagari), var(--font-playfair), serif" }}
        >
          योगः कर्मसु कौशलम्
        </p>
        <p className="mt-1 text-xs text-stone-700 italic">
          Yoga is skill in action.
        </p>
        <p className="mt-2 text-[11px] text-amber-800 font-medium text-right">
          — Bhagavad Gita (2.50)
        </p>
      </div>

      {/* Kurukshetra Chariot Devotional Artwork */}
      <div className="relative overflow-hidden rounded-xl border border-amber-300/60 shadow-xs group">
        <Image
          src="/images/kurukshetra-chariot.jpg"
          alt="Lord Krishna and Arjuna on chariot at Kurukshetra battlefield"
          width={320}
          height={320}
          className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent flex items-end p-3">
          <p className="text-[11px] font-serif text-amber-100 font-medium tracking-wide">
            श्रीमद्भगवद्गीता • श्रीकृष्णार्जुन संवाद
          </p>
        </div>
      </div>
    </aside>
  );
}

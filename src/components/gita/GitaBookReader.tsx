"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Type,
  Bookmark,
  Search,
  Settings,
  BookOpen,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";
import { GitaChapter, GitaVerse, GitaBookmark } from "@/lib/gita/types";
import { GitaSidebar } from "./GitaSidebar";
import { GitaBookSpread } from "./GitaBookSpread";
import { GitaControls } from "./GitaControls";
import { GitaShareModal } from "./GitaShareModal";

interface GitaBookReaderProps {
  initialChapters?: Omit<GitaChapter, "verses">[];
  initialChapterData?: GitaChapter | null;
  initialChapterNumber?: number;
  initialVerseNumber?: number;
}

export function GitaBookReader({
  initialChapters = [],
  initialChapterData = null,
  initialChapterNumber = 2,
  initialVerseNumber = 11,
}: GitaBookReaderProps) {
  const [chapters, setChapters] = useState<Omit<GitaChapter, "verses">[]>(initialChapters);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(initialChapterNumber);
  const [currentChapterData, setCurrentChapterData] = useState<GitaChapter | null>(initialChapterData);
  const [loadingChapter, setLoadingChapter] = useState(false);

  // Spread & Verse Navigation
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [activeVerseNumber, setActiveVerseNumber] = useState(initialVerseNumber);

  // Customization settings
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [isMobileSinglePage, setIsMobileSinglePage] = useState(false);

  // Bookmarks & Modals
  const [mounted, setMounted] = useState(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sharingVerse, setSharingVerse] = useState<GitaVerse | null>(null);

  // Load chapters list if not provided
  useEffect(() => {
    if (chapters.length === 0) {
      fetch("/api/gita/chapters")
        .then((res) => res.json())
        .then((data) => {
          if (data.ok && data.chapters) {
            setChapters(data.chapters);
          }
        })
        .catch(console.error);
    }
  }, [chapters.length]);

  // Load chapter data dynamically from API
  const fetchChapter = useCallback(async (chNum: number, targetVerseNum?: number) => {
    setLoadingChapter(true);
    try {
      const res = await fetch(`/api/gita/chapters/${chNum}`);
      const data = await res.json();
      if (data.ok && data.chapter) {
        setCurrentChapterData(data.chapter);
        setCurrentChapterNumber(chNum);

        // Position to specified verse or first verse
        const verses: GitaVerse[] = data.chapter.verses || [];
        const target = targetVerseNum ?? (verses[0]?.verse || 1);
        setActiveVerseNumber(target);

        // Calculate spread index (2 verses per spread)
        const vIndex = verses.findIndex((v) => v.verse === target);
        const spreadIdx = vIndex >= 0 ? Math.floor(vIndex / 2) : 0;
        setCurrentSpreadIndex(spreadIdx);
      }
    } catch (err) {
      console.error("Failed to load chapter:", err);
    } finally {
      setLoadingChapter(false);
    }
  }, []);

  // Initial load if no chapter data
  useEffect(() => {
    if (!currentChapterData) {
      fetchChapter(currentChapterNumber, initialVerseNumber);
    } else {
      // Find initial spread index
      const verses = currentChapterData.verses || [];
      const vIndex = verses.findIndex((v) => v.verse === initialVerseNumber);
      if (vIndex >= 0) {
        setCurrentSpreadIndex(Math.floor(vIndex / 2));
      }
    }
  }, [fetchChapter, currentChapterNumber, currentChapterData, initialVerseNumber]);

  // Load bookmarks from localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("bhakti_gita_bookmarks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBookmarkedVerses(new Set(parsed.map((b: any) => b.verseNumber || `${b.chapter}.${b.verse}`)));
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleBookmark = (verse: GitaVerse) => {
    const key = verse.verseNumber || `${verse.chapter}.${verse.verse}`;
    const nextSet = new Set(bookmarkedVerses);

    try {
      const saved = localStorage.getItem("bhakti_gita_bookmarks");
      let list: GitaBookmark[] = saved ? JSON.parse(saved) : [];

      if (nextSet.has(key)) {
        nextSet.delete(key);
        list = list.filter((b) => b.verseNumber !== key);
      } else {
        nextSet.add(key);
        list.push({
          id: `${verse.chapter}-${verse.verse}`,
          chapter: verse.chapter,
          verse: verse.verse,
          verseNumber: key,
          sanskritPreview: verse.sanskrit.slice(0, 60),
          hindiPreview: verse.hindi.slice(0, 80),
          englishPreview: verse.english.slice(0, 80),
          savedAt: new Date().toISOString(),
        });
      }

      setBookmarkedVerses(nextSet);
      localStorage.setItem("bhakti_gita_bookmarks", JSON.stringify(list));
    } catch {
      setBookmarkedVerses(nextSet);
    }
  };

  const verses = currentChapterData?.verses || [];
  const totalVerses = verses.length;
  const totalSpreads = Math.max(1, Math.ceil(totalVerses / 2));

  // Determine left and right verses for current spread
  const leftVerse = verses[currentSpreadIndex * 2] || null;
  const rightVerse = verses[currentSpreadIndex * 2 + 1] || null;

  const handleSelectChapter = (chNum: number) => {
    fetchChapter(chNum);
  };

  const handleSelectVerse = (verseNum: number) => {
    setActiveVerseNumber(verseNum);
    const vIndex = verses.findIndex((v) => v.verse === verseNum);
    if (vIndex >= 0) {
      setCurrentSpreadIndex(Math.floor(vIndex / 2));
    }
  };

  const handlePrevSpread = () => {
    if (currentSpreadIndex > 0) {
      const newSpread = currentSpreadIndex - 1;
      setCurrentSpreadIndex(newSpread);
      if (verses[newSpread * 2]) {
        setActiveVerseNumber(verses[newSpread * 2].verse);
      }
    } else if (currentChapterNumber > 1) {
      // Jump to last spread of previous chapter
      fetchChapter(currentChapterNumber - 1);
    }
  };

  const handleNextSpread = () => {
    if (currentSpreadIndex < totalSpreads - 1) {
      const newSpread = currentSpreadIndex + 1;
      setCurrentSpreadIndex(newSpread);
      if (verses[newSpread * 2]) {
        setActiveVerseNumber(verses[newSpread * 2].verse);
      }
    } else if (currentChapterNumber < 18) {
      // Jump to next chapter
      fetchChapter(currentChapterNumber + 1, 1);
    }
  };

  const handleFirstSpread = () => {
    setCurrentSpreadIndex(0);
    if (verses[0]) {
      setActiveVerseNumber(verses[0].verse);
    }
  };

  const handleLastSpread = () => {
    const lastSpread = totalSpreads - 1;
    setCurrentSpreadIndex(lastSpread);
    if (verses[lastSpread * 2]) {
      setActiveVerseNumber(verses[lastSpread * 2].verse);
    }
  };

  // Filtered search results
  const filteredVerses = searchQuery.trim()
    ? verses.filter(
        (v) =>
          v.sanskrit.includes(searchQuery) ||
          v.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.hindi.includes(searchQuery) ||
          v.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.verseNumber.includes(searchQuery),
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf8f2] via-[#f7f2e7] to-[#f4ede0] py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Header Bar */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 shadow-sm border border-amber-900/10 backdrop-blur-md">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white font-serif text-lg font-bold shadow-xs">
              ॐ
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-amber-950 sm:text-2xl">
                Bhagavad Gita
              </h1>
              <p className="text-xs text-amber-900/70 font-medium">
                The Sacred Song of God • श्रीमद्भगवद्गीता
              </p>
            </div>
          </div>

          {/* Quick Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-amber-50 hover:text-amber-950 border border-stone-200 transition-colors shadow-2xs"
              title="Search Shlokas"
            >
              <Search className="h-3.5 w-3.5 text-amber-700" />
              <span>Search</span>
            </button>

            {/* Bookmarks Quick Drawer */}
            <button
              onClick={() => setBookmarksDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-amber-50 hover:text-amber-950 border border-stone-200 transition-colors shadow-2xs"
              title="Saved Shlokas"
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-700" />
              <span>Bookmarks ({mounted ? bookmarkedVerses.size : 0})</span>
            </button>
          </div>
        </header>

        {/* Main Interactive Book Workspace Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          {currentChapterData && (
            <GitaSidebar
              chapters={chapters}
              currentChapter={currentChapterData}
              activeVerseNumber={activeVerseNumber}
              onSelectChapter={handleSelectChapter}
              onSelectVerse={handleSelectVerse}
              bookmarkedVerses={bookmarkedVerses}
              onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
              onOpenSearch={() => setSearchModalOpen(true)}
            />
          )}

          {/* Center 3D Book & Controls Container */}
          <main className="w-full flex-1 flex flex-col">
            {loadingChapter ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl bg-white/50 p-12 text-center backdrop-blur-sm border border-amber-900/10">
                <div className="h-12 w-12 animate-spin rounded-full border-3 border-amber-600 border-t-transparent" />
                <p className="mt-4 font-serif text-base text-amber-950 font-medium">
                  Loading sacred shlokas...
                </p>
              </div>
            ) : currentChapterData ? (
              <>
                <GitaBookSpread
                  leftVerse={leftVerse}
                  rightVerse={rightVerse}
                  chapterNumber={currentChapterData.chapter}
                  chapterName={currentChapterData.name}
                  totalVersesInChapter={totalVerses}
                  currentSpreadIndex={currentSpreadIndex}
                  totalSpreads={totalSpreads}
                  fontSize={fontSize}
                  bookmarkedVerses={bookmarkedVerses}
                  onToggleBookmark={handleToggleBookmark}
                  onShareVerse={(v) => setSharingVerse(v)}
                  onPrevSpread={handlePrevSpread}
                  onNextSpread={handleNextSpread}
                  hasPrev={currentSpreadIndex > 0 || currentChapterNumber > 1}
                  hasNext={currentSpreadIndex < totalSpreads - 1 || currentChapterNumber < 18}
                  isMobileSinglePage={isMobileSinglePage}
                />

                <GitaControls
                  currentSpreadIndex={currentSpreadIndex}
                  totalSpreads={totalSpreads}
                  currentVerseNumber={activeVerseNumber}
                  totalVersesInChapter={totalVerses}
                  onFirstSpread={handleFirstSpread}
                  onPrevSpread={handlePrevSpread}
                  onNextSpread={handleNextSpread}
                  onLastSpread={handleLastSpread}
                  hasPrev={currentSpreadIndex > 0 || currentChapterNumber > 1}
                  hasNext={currentSpreadIndex < totalSpreads - 1 || currentChapterNumber < 18}
                  fontSize={fontSize}
                  onChangeFontSize={setFontSize}
                  isMobileSinglePage={isMobileSinglePage}
                  onToggleSinglePage={() => setIsMobileSinglePage(!isMobileSinglePage)}
                  onJumpToQuoteVerse={(ch, v) => fetchChapter(ch, v)}
                />
              </>
            ) : (
              <div className="flex min-h-[460px] flex-col items-center justify-center rounded-2xl bg-white/90 p-12 text-center shadow-xs border border-amber-900/10 backdrop-blur-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-serif text-amber-900 mb-4 shadow-xs">
                  ॐ
                </div>
                <h2 className="font-serif text-xl font-bold text-amber-950">
                  Bhagavad Gita
                </h2>
                <p className="mt-1 text-xs text-amber-800/80 font-medium">
                  श्रीमद्भगवद्गीता
                </p>
                <p className="mt-4 max-w-md text-xs sm:text-sm text-stone-500 leading-relaxed">
                  No chapters or shlokas uploaded yet. Content can be imported and updated by an authorized administrator in the Admin panel.
                </p>
              </div>
            )}
          </main>
        </div>

        {/* Share Shloka Modal */}
        <GitaShareModal
          verse={sharingVerse}
          isOpen={Boolean(sharingVerse)}
          onClose={() => setSharingVerse(null)}
        />

        {/* Bookmarks Drawer Modal */}
        {bookmarksDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-amber-600" />
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Saved Shlokas ({bookmarkedVerses.size})
                    </h3>
                  </div>
                  <button
                    onClick={() => setBookmarksDrawerOpen(false)}
                    className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {bookmarkedVerses.size === 0 ? (
                    <p className="py-12 text-center text-xs text-stone-400">
                      No shlokas bookmarked yet. Click the bookmark icon on any page to save your favorite verses.
                    </p>
                  ) : (
                    Array.from(bookmarkedVerses).map((key) => {
                      const [chStr, vStr] = key.split(".");
                      const ch = parseInt(chStr, 10);
                      const v = parseInt(vStr, 10);

                      return (
                        <div
                          key={`bm-${key}`}
                          onClick={() => {
                            fetchChapter(ch, v);
                            setBookmarksDrawerOpen(false);
                          }}
                          className="group cursor-pointer rounded-xl bg-amber-50/60 p-3.5 border border-amber-200/70 hover:bg-amber-100/70 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                            <span>Chapter {ch} • Verse {v}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-amber-700 transition-transform group-hover:translate-x-1" />
                          </div>
                          <p className="mt-1 text-xs text-stone-700 line-clamp-2">
                            Shloka {key} saved in your reading library.
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-stone-200 pt-4 text-center">
                <button
                  onClick={() => setBookmarksDrawerOpen(false)}
                  className="rounded-xl bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Modal */}
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-amber-600" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Search Bhagavad Gita Shlokas
                  </h3>
                </div>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sanskrit, English, Hindi words or verse (e.g. 2.47, yoga, karma)..."
                  className="w-full rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-900 border border-stone-300 focus:bg-white focus:border-amber-600 focus:outline-hidden"
                  autoFocus
                />
              </div>

              <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
                {searchQuery.trim() && filteredVerses.length === 0 && (
                  <p className="py-8 text-center text-xs text-stone-400">
                    No matching verses found in the current chapter.
                  </p>
                )}

                {filteredVerses.map((v) => (
                  <div
                    key={`search-${v.chapter}-${v.verse}-${v.verseNumber}`}
                    onClick={() => {
                      handleSelectVerse(v.verse);
                      setSearchModalOpen(false);
                    }}
                    className="cursor-pointer rounded-xl bg-amber-50/50 p-3 border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>Verse {v.verseNumber}</span>
                      <span className="text-[10px] font-normal text-amber-700">Click to read</span>
                    </div>
                    <p className="mt-1 font-devanagari text-xs font-semibold text-amber-950 line-clamp-1">
                      {v.sanskrit}
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone-600 line-clamp-1">
                      {v.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

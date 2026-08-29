"use client";

import React, { useState } from "react";
import { X, Copy, Check, Share2, Link as LinkIcon, Sparkles } from "lucide-react";
import { GitaVerse } from "@/lib/gita/types";

interface GitaShareModalProps {
  verse: GitaVerse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GitaShareModal({ verse, isOpen, onClose }: GitaShareModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !verse) return null;

  const formattedShareText = `॥ श्रीमद्भगवद्गीता • श्लोक ${verse.verseNumber} ॥\n\n${verse.sanskrit}\n\n${verse.transliteration}\n\nहिंदी भावार्थ:\n${verse.hindi}\n\nEnglish Meaning:\n${verse.english}\n\nRead more at BhaktiVoice: https://www.bhaktivoice.com/bhagavad-gita?chapter=${verse.chapter}&verse=${verse.verse}`;

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/bhagavad-gita?chapter=${verse.chapter}&verse=${verse.verse}`
    : `https://www.bhaktivoice.com/bhagavad-gita?chapter=${verse.chapter}&verse=${verse.verse}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedShareText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Bhagavad Gita Verse ${verse.verseNumber}`,
          text: `${verse.sanskrit}\n\n${verse.hindi}\n\n${verse.english}`,
          url: shareUrl,
        });
      } catch {
        // Fallback to copy
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-b from-[#fffcf7] to-[#fbf7ee] p-6 shadow-2xl border border-amber-300/60">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-amber-900 mb-4">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-amber-950">
            Share Sacred Shloka {verse.verseNumber}
          </h3>
        </div>

        {/* Shloka Card Preview */}
        <div className="rounded-xl bg-white p-5 shadow-inner border border-amber-200 text-center select-text">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            श्रीमद्भगवद्गीता • अध्याय {verse.chapter}
          </div>

          <p
            className="mt-3 font-serif text-lg font-bold text-amber-950 font-devanagari"
            style={{ fontFamily: "var(--font-devanagari), var(--font-playfair), serif" }}
          >
            {verse.sanskrit}
          </p>

          <p className="mt-2 text-xs italic text-amber-900/80">
            {verse.transliteration}
          </p>

          <div className="my-3 mx-auto h-[1px] w-24 bg-amber-200" />

          <p className="text-xs text-stone-800 font-devanagari font-medium">
            {verse.hindi}
          </p>

          <p className="mt-2 text-xs text-stone-600">
            {verse.english}
          </p>

          <div className="mt-4 pt-3 border-t border-amber-100 text-[10px] font-semibold text-amber-800 tracking-wider">
            BHAKTIVOICE • DEVOTIONAL WISDOM
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700 active:scale-95 transition-all shadow-xs"
          >
            {copiedText ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedText ? "Copied!" : "Copy Shloka"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-200 active:scale-95 transition-all"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <LinkIcon className="h-4 w-4" />}
            <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-200 active:scale-95 transition-all"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

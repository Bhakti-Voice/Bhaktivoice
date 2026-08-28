"use client";

import { Check, Copy, Heart, Link2, MessageCircle, Share2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { JAAP_MANTRAS, type JaapMantraSlug } from "./mantras";
import { useLocale } from "@/lib/i18n/client";

interface JaapShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  malas: number;
  streak: number;
  mantraSlug: JaapMantraSlug;
}

export function JaapShareModal({
  isOpen,
  onClose,
  count,
  malas,
  streak,
  mantraSlug,
}: JaapShareModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const locale = useLocale();
  const selected = JAAP_MANTRAS.find((m) => m.slug === mantraSlug) ?? JAAP_MANTRAS[0];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const appUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${locale === "hi" ? "/hi" : ""}/naam-jaap`
      : `https://www.bhaktivoice.com${locale === "hi" ? "/hi" : ""}/naam-jaap`;

  const isHi = locale === "hi";

  const shareTitle = isHi
    ? `🙏 आज का पावन नाम जप | भक्ति वॉइस`
    : `🙏 Today's Sacred Naam Jaap | Bhakti Voice`;

  const shareText = isHi
    ? `🌸 आज मैंने भक्ति वॉइस पर "${selected.text}" का ${count > 0 ? `${count} बार (${malas} माला)` : `108 बार`} भावपूर्ण जप किया।\n\n✨ निरंतर साधना श्रृंखला: ${streak > 0 ? `${streak} दिन` : `आज से आरम्भ!`}\n\n📿 आप भी प्रभु नाम का पावन जप करें और आंतरिक शांति का अनुभव करें:`
    : `🌸 I chanted "${selected.label}" (${selected.text}) ${count > 0 ? `${count} times (${malas} Malas)` : `108 times`} today on Bhakti Voice.\n\n✨ Sadhana Streak: ${streak > 0 ? `${streak} Days` : `Started Today!`}\n\n📿 Join me in daily Naam Jaap and experience divine peace:`;

  const fullSharePayload = `${shareTitle}\n\n${shareText}\n${appUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(appUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = appUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyText = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullSharePayload);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullSharePayload;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullSharePayload)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWebShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: appUrl,
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-jaap-ignore
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#fffaf4] to-[#fff3e4] p-6 shadow-2xl ring-1 ring-[#e8cca8] select-none transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {isHi ? "साधना प्रसाद एवं साझा करें" : "Share Sadhana Blessing"}
          </span>
        </div>

        {/* Visual Share Card Preview */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2c1810] via-[#3d1e13] to-[#1e0e09] text-white p-6 shadow-inner border border-amber-500/30">
          {/* Decorative Background Accents */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs text-amber-200/80 uppercase tracking-wider mb-3">
            <span>Bhakti Voice • Daily Jaap</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              {streak > 0 ? `${streak} Day Streak` : "Sadhana"}
            </span>
          </div>

          <div className="my-3 text-center">
            <span
              className="inline-block px-3 py-0.5 rounded-full text-xs font-medium mb-2"
              style={{ backgroundColor: `${selected.color}25`, color: selected.color }}
            >
              {selected.label}
            </span>
            <p className="font-devanagari text-2xl sm:text-3xl font-bold text-amber-100 tracking-wide drop-shadow-sm leading-snug">
              {selected.text}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/5 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="block text-[11px] text-amber-200/70">{isHi ? "आज का जप" : "Today's Count"}</span>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {count.toLocaleString()}
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="block text-[11px] text-amber-200/70">{isHi ? "माला पूर्ण" : "Mala Completed"}</span>
              <span className="font-serif text-2xl font-bold text-amber-300 tracking-tight">
                {malas} <span className="text-xs font-normal text-amber-200/80">({malas * 108})</span>
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-center text-amber-200/60 italic font-serif">
            &ldquo;हरि नाम ही कलिकाल में परम नौका है।&rdquo;
          </p>
        </div>

        {/* Direct Link Copy Box */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white p-1.5 pl-3 border border-[#ebd6be] shadow-2xs">
          <Link2 className="w-4 h-4 text-saffron shrink-0" />
          <input
            type="text"
            readOnly
            value={appUrl}
            className="w-full bg-transparent text-xs text-stone-600 outline-none font-mono truncate select-all"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-saffron-deep font-semibold text-xs transition active:scale-95 border border-orange-200"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{isHi ? "कॉपी!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isHi ? "कॉपी" : "Copy"}</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] transition shadow-md shadow-emerald-600/20"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{isHi ? "व्हाट्सएप पर साझा करें" : "Share on WhatsApp"}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 active:scale-[0.99] transition shadow-2xs"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 text-xs sm:text-sm font-semibold">{isHi ? "संदेश कॉपी!" : "Text Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-saffron" />
                  <span className="text-xs sm:text-sm">{isHi ? "पूरा संदेश कॉपी" : "Copy Message"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWebShare}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 active:scale-[0.99] transition shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-stone-500" />
              <span className="text-xs sm:text-sm">{isHi ? "अन्य ऍप्स" : "More Apps"}</span>
            </button>
          </div>
        </div>

        {/* Footer gentle hint */}
        <p className="mt-4 text-center text-[11px] text-stone-500">
          {isHi
            ? "सत्संग और शुभ संकल्प बांटने से भक्ति का पुण्य अनन्त गुना बढ़ता है।"
            : "Sharing devotion inspires loved ones to pause and connect with the Divine."}
        </p>
      </div>
    </div>
  );
}

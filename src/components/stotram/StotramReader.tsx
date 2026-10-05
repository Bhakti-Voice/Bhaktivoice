"use client";

import { useMemo, useState } from "react";
import type { StotramPage, StotramVerse } from "@/lib/stotram/types";
import {
  BookOpen,
  Check,
  Clock,
  Compass,
  Copy,
  Flame,
  HelpCircle,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Printer,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Volume2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export type StotramReaderProps = {
  stotram: StotramPage;
  locale?: string;
};

type ViewMode = "all" | "devanagari" | "transliteration" | "meaning";
type FontSize = "sm" | "base" | "lg" | "xl";

export function StotramReader({ stotram, locale = "en" }: StotramReaderProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";

  // State
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [chantCount, setChantCount] = useState<number>(0);
  const [targetRounds, setTargetRounds] = useState<number>(1);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<"verses" | "vidhi" | "benefits" | "faqs">("verses");
  const [zenMode, setZenMode] = useState(false);

  // Dynamic font styles
  const fontSizes = useMemo(() => {
    switch (fontSize) {
      case "sm":
        return {
          sanskrit: "text-lg sm:text-xl",
          translit: "text-xs sm:text-sm",
          meaning: "text-xs sm:text-sm",
        };
      case "lg":
        return {
          sanskrit: "text-2xl sm:text-3xl",
          translit: "text-base sm:text-lg",
          meaning: "text-base sm:text-lg",
        };
      case "xl":
        return {
          sanskrit: "text-3xl sm:text-4xl",
          translit: "text-lg sm:text-xl",
          meaning: "text-lg sm:text-xl",
        };
      case "base":
      default:
        return {
          sanskrit: "text-xl sm:text-2xl",
          translit: "text-sm sm:text-base",
          meaning: "text-sm sm:text-base",
        };
    }
  }, [fontSize]);

  // Copy Shloka
  function handleCopy(verse: StotramVerse) {
    const textToCopy = `${stotram.h1}\n\n[Verse ${verse.verseNumber}]\n${verse.sanskrit}\n\n${verse.transliteration}\n\n${isHi ? verse.hindiMeaning : verse.englishMeaning}\n\nRead more on BhaktiVoice.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedVerse(verse.verseNumber);
    setTimeout(() => setCopiedVerse(null), 2500);
  }

  // WhatsApp Share
  function handleShareWhatsApp() {
    const shareText = `📿 Read sacred *${stotram.h1}* on BhaktiVoice:\n\n${stotram.introduction.slice(0, 180)}...\n\nRead full verses, Sanskrit lyrics and meaning here: ${typeof window !== "undefined" ? window.location.href : ""}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  }

  // Increment chant counter
  function handleChant() {
    setChantCount((prev) => prev + 1);
  }

  function handleResetCounter() {
    setChantCount(0);
  }

  // Print Clean
  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  return (
    <div className={`relative ${zenMode ? "fixed inset-0 z-50 overflow-y-auto bg-[#fbf7f0] p-4 sm:p-8" : "w-full"}`}>
      {/* Top Floating Control Bar */}
      <div className="sticky top-16 z-30 mb-8 rounded-2xl border border-amber-200/80 bg-white/95 px-4 py-3 shadow-md backdrop-blur-md transition-all sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-amber-900/60">
              {isHi ? "दृश्य:" : isTe ? "వీక్షణ:" : "View:"}
            </span>
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === "all"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-amber-50 text-amber-950 hover:bg-amber-100"
              }`}
            >
              {isHi ? "सम्पूर्ण (मूल + अर्थ)" : isTe ? "అన్నీ (శ్లోకం + అర్థం)" : "All (Full)"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("devanagari")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === "devanagari"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-amber-50 text-amber-950 hover:bg-amber-100"
              }`}
            >
              {isHi ? "केवल देवनागरी" : isTe ? "సంస్కృతం మాత్రమే" : "Sanskrit Only"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("transliteration")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === "transliteration"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-amber-50 text-amber-950 hover:bg-amber-100"
              }`}
            >
              {isHi ? "रोमन (अंग्रेजी)" : isTe ? "ఇంగ్లీష్ లిపి" : "English Script"}
            </button>
          </div>

          {/* Quick Tools: Font Size, Print, WhatsApp, Zen Mode */}
          <div className="flex items-center gap-2">
            {/* Font Sizer */}
            <div className="flex items-center rounded-lg border border-amber-200 bg-amber-50/70 p-0.5">
              <button
                type="button"
                onClick={() => setFontSize(fontSize === "xl" ? "lg" : fontSize === "lg" ? "base" : "sm")}
                title="Decrease font size"
                className="rounded p-1 text-amber-900 hover:bg-amber-200/60"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="px-1.5 text-xs font-semibold text-amber-950 uppercase">{fontSize}</span>
              <button
                type="button"
                onClick={() => setFontSize(fontSize === "sm" ? "base" : fontSize === "base" ? "lg" : "xl")}
                title="Increase font size"
                className="rounded p-1 text-amber-900 hover:bg-amber-200/60"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              title="Print clean stotra"
              className="hidden rounded-lg border border-amber-200 bg-white p-1.5 text-amber-900 hover:bg-amber-50 sm:flex"
            >
              <Printer className="h-3.5 w-3.5" />
            </button>

            {/* Share WhatsApp */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              title="Share to WhatsApp"
              className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              <Share2 className="h-3 w-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Zen Mode Toggle */}
            <button
              type="button"
              onClick={() => setZenMode(!zenMode)}
              title={zenMode ? "Exit Zen Mode" : "Zen Meditation Mode"}
              className="rounded-lg border border-amber-300 bg-amber-100/70 p-1.5 text-amber-900 hover:bg-amber-200"
            >
              {zenMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="flex flex-col rounded-xl border border-amber-100 bg-white/90 p-3.5 shadow-2xs">
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            {isHi ? "रचयिता / ऋषि" : isTe ? "రచయిత / ఋషి" : "Composer / Rishi"}
          </span>
          <span className="mt-1 font-serif text-sm font-bold text-neutral-900">
            {isHi ? stotram.authorComposerHi : stotram.authorComposer}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-amber-100 bg-white/90 p-3.5 shadow-2xs">
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
            <BookOpen className="h-3.5 w-3.5 text-amber-600" />
            {isHi ? "मूल शास्त्र / स्रोत" : isTe ? "మూల గ్రంథం" : "Scriptural Source"}
          </span>
          <span className="mt-1 font-serif text-sm font-bold text-neutral-900">
            {isHi ? stotram.sourceScriptureHi : stotram.sourceScripture}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-amber-100 bg-white/90 p-3.5 shadow-2xs">
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            {isHi ? "शुभ दिन व समय" : isTe ? "శుభ దినం & సమయం" : "Best Day & Time"}
          </span>
          <span className="mt-1 text-xs font-semibold text-neutral-900">
            {isHi ? stotram.bestDayToChantHi : stotram.bestDayToChant}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-amber-100 bg-white/90 p-3.5 shadow-2xs">
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            {isHi ? "कुल श्लोक संख्या" : isTe ? "మొత్తం శ్లోకాలు" : "Total Verses"}
          </span>
          <span className="mt-1 text-sm font-bold text-amber-900">
            {stotram.totalVerses} {isHi ? "श्लोक" : isTe ? "శ్లోకాలు" : "Verses"}
          </span>
        </div>
      </div>

      {/* Interactive Chanting Round Tracker */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 p-5 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="flex items-center gap-2 font-serif text-base font-bold text-amber-950 sm:text-lg">
              <Flame className="h-5 w-5 text-orange-600 animate-pulse" />
              {isHi ? "दैनिक पाठ एवं माला ट्रैकर" : isTe ? "దైనందిన పారాయణ ట్రాకర్" : "Daily Recitation & Round Tracker"}
            </h3>
            <p className="mt-1 text-xs text-amber-900/80">
              {isHi
                ? `सुझाव: नित्य ${stotram.recommendedRounds} पाठ करें। प्रत्येक पाठ के बाद 'गिनें' पर टैप करें।`
                : isTe
                ? `సిఫార్సు: రోజూ ${stotram.recommendedRounds} సార్లు పఠించండి.`
                : `Recommendation: ${stotram.recommendedRounds}. Tap the counter each time you finish a recitation.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-2 ring-1 ring-amber-200">
              <span className="text-2xs font-bold uppercase tracking-wider text-amber-800">
                {isHi ? "पाठ संख्या" : isTe ? "పారాయణ" : "Completed"}
              </span>
              <span className="font-serif text-2xl font-extrabold text-amber-950">{chantCount}</span>
            </div>

            <button
              type="button"
              onClick={handleChant}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-sm">
                {isHi ? "पाठ पूर्ण (+1)" : isTe ? "పూర్తయింది (+1)" : "Mark 1 Round (+1)"}
              </span>
            </button>

            {chantCount > 0 && (
              <button
                type="button"
                onClick={handleResetCounter}
                title="Reset counter"
                className="rounded-xl border border-amber-200 bg-white p-2.5 text-neutral-600 hover:bg-neutral-50"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 flex border-b border-amber-200">
        <button
          type="button"
          onClick={() => setActiveTab("verses")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 font-serif text-sm font-semibold transition-all ${
            activeTab === "verses"
              ? "border-amber-700 text-amber-950"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          {isHi ? "मूल श्लोक एवं अर्थ" : isTe ? "మూల శ్లోకాలు & భావార్థం" : "Core Verses & Meaning"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vidhi")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 font-serif text-sm font-semibold transition-all ${
            activeTab === "vidhi"
              ? "border-amber-700 text-amber-950"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Clock className="h-4 w-4" />
          {isHi ? "पठन विधि व नियम" : isTe ? "పఠన విధానం & నియమాలు" : "Chanting Vidhi & Rules"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("benefits")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 font-serif text-sm font-semibold transition-all ${
            activeTab === "benefits"
              ? "border-amber-700 text-amber-950"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          {isHi ? "फलश्रुति एवं लाभ" : isTe ? "ఫలశ్రుతి & ప్రయోజనాలు" : "Benefits & Phalashruti"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 font-serif text-sm font-semibold transition-all ${
            activeTab === "faqs"
              ? "border-amber-700 text-amber-950"
              : "border-transparent text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : isTe ? "తరచుగా అడిగే ప్రశ్నలు" : "FAQs"}
        </button>
      </div>

      {/* Tab 1: Verses & Dhyanam */}
      {activeTab === "verses" && (
        <div className="space-y-6">
          {/* Dhyanam Card */}
          {stotram.dhyanamSanskrit && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-100/50 p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white shadow-2xs">
                    ॐ
                  </span>
                  <h3 className="font-serif text-lg font-bold text-amber-950 sm:text-xl">
                    {isHi ? "॥ ध्यानम् (प्रार्थना) ॥" : isTe ? "॥ ధ్యాన శ్లోకం ॥" : "॥ Dhyānam (Meditation Shloka) ॥"}
                  </h3>
                </div>
                <span className="text-2xs font-semibold uppercase tracking-wider text-amber-800">
                  {isHi ? "पाठ से पूर्व ध्यान" : "Pre-Chant Meditation"}
                </span>
              </div>

              {/* Sanskrit Dhyanam */}
              {(viewMode === "all" || viewMode === "devanagari") && (
                <div className="my-3 text-center sm:text-left">
                  <p className={`font-serif ${fontSizes.sanskrit} font-semibold leading-relaxed text-amber-950 whitespace-pre-line`}>
                    {stotram.dhyanamSanskrit}
                  </p>
                </div>
              )}

              {/* Transliteration */}
              {(viewMode === "all" || viewMode === "transliteration") && stotram.dhyanamTransliteration && (
                <div className="my-3 text-center sm:text-left">
                  <p className={`${fontSizes.translit} italic leading-relaxed text-amber-900/90 whitespace-pre-line`}>
                    {stotram.dhyanamTransliteration}
                  </p>
                </div>
              )}

              {/* Meaning */}
              {(viewMode === "all" || viewMode === "meaning") && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-white/80 p-4">
                  <span className="text-2xs font-bold uppercase tracking-wider text-amber-800">
                    {isHi ? "भावार्थ:" : isTe ? "తాత్పర్యం:" : "Meaning:"}
                  </span>
                  <p className={`mt-1 ${fontSizes.meaning} leading-relaxed text-neutral-800`}>
                    {isHi
                      ? stotram.dhyanamHindi
                      : isTe
                      ? stotram.dhyanamTelugu || stotram.dhyanamEnglish
                      : stotram.dhyanamEnglish}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Verses List */}
          <div className="space-y-5">
            {stotram.verses.map((verse) => (
              <div
                key={verse.verseNumber}
                className="group relative rounded-2xl border border-amber-200/90 bg-white p-5 shadow-2xs transition-all hover:border-amber-400 hover:shadow-md sm:p-7"
              >
                {/* Verse Header Badge & Copy Button */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 font-serif text-xs font-bold text-amber-900">
                    <span>{isHi ? "श्लोक" : isTe ? "శ్లోకం" : "Verse"}</span>
                    <span>{verse.verseNumber}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(verse)}
                      title="Copy Shloka with Meaning"
                      className="flex items-center gap-1 rounded-lg border border-amber-200 px-2 py-1 text-xs text-amber-900 hover:bg-amber-50"
                    >
                      {copiedVerse === verse.verseNumber ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{isHi ? "कॉपी हुआ" : isTe ? "కాపీ అయింది" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-neutral-600" />
                          <span className="text-neutral-700">{isHi ? "कॉपी" : isTe ? "కాపీ" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sanskrit Verse */}
                {(viewMode === "all" || viewMode === "devanagari") && (
                  <div className="my-2 text-center sm:text-left">
                    <p className={`font-serif ${fontSizes.sanskrit} font-semibold leading-relaxed text-neutral-900 whitespace-pre-line tracking-wide`}>
                      {isTe && verse.sanskritTe ? verse.sanskritTe : verse.sanskrit}
                    </p>
                  </div>
                )}

                {/* Transliteration */}
                {(viewMode === "all" || viewMode === "transliteration") && (
                  <div className="my-2.5 text-center sm:text-left">
                    <p className={`${fontSizes.translit} italic leading-relaxed text-neutral-600 whitespace-pre-line`}>
                      {verse.transliteration}
                    </p>
                  </div>
                )}

                {/* Meaning */}
                {(viewMode === "all" || viewMode === "meaning") && (
                  <div className="mt-3.5 rounded-xl border border-amber-100 bg-[#fffdfa] p-3.5 sm:p-4">
                    <span className="text-2xs font-bold uppercase tracking-wider text-amber-900/70">
                      {isHi ? "सरल हिंदी भावार्थ:" : isTe ? "సమగ్ర తెలుగు తాత్పర్యం:" : "Translation & Meaning:"}
                    </span>
                    <p className={`mt-1 ${fontSizes.meaning} leading-relaxed text-neutral-800`}>
                      {isHi
                        ? verse.hindiMeaning
                        : isTe
                        ? verse.teluguMeaning || verse.englishMeaning
                        : verse.englishMeaning}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Phalashruti Card at the end of verses */}
          {stotram.phalashrutiText && (
            <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6 shadow-sm sm:p-8">
              <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-emerald-950 sm:text-xl">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                {isHi ? "फलश्रुति (शास्त्रोक्त फल)" : isTe ? "ఫలశ్రుతి (శాస్త్రోక్త ఫలం)" : "Phalaśruti (Sacred Fruits of Recitation)"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900 sm:text-base">
                {isHi
                  ? stotram.phalashrutiTextHi
                  : isTe
                  ? stotram.phalashrutiTextTe || stotram.phalashrutiText
                  : stotram.phalashrutiText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Chanting Vidhi & Rules */}
      {activeTab === "vidhi" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-2xs sm:p-8">
            <h3 className="font-serif text-xl font-bold text-amber-950">
              {isHi
                ? "स्तोत्र पठन की प्रामाणिक विधि एवं नियम"
                : isTe
                ? "స్తోత్ర పారాయణ ప్రామాణిక విధానం & నియమాలు"
                : "Authentic Chanting Vidhi & Ritual Guidelines"}
            </h3>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              {isHi
                ? "शास्त्रों के अनुसार शुद्ध मन और सही विधि से किया गया पाठ शीघ्र फलदायी होता है।"
                : isTe
                ? "శాస్త్రాల ప్రకారం శుద్ధ మనస్సు మరియు సరైన విధానంతో చేసిన పారాయణ త్వరిత ఫలితాన్ని ఇస్తుంది."
                : "Reciting sacred Sanskrit hymns with reverence, pure intention, and proper posture maximizes spiritual benefits."}
            </p>

            <div className="mt-6 space-y-4">
              {(isHi
                ? stotram.vidhiHi
                : isTe
                ? stotram.vidhiTe || stotram.vidhi
                : stotram.vidhi
              ).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-100 bg-[#fffdf9] p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 font-serif text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-800">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Benefits */}
      {activeTab === "benefits" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-2xs sm:p-8">
            <h3 className="font-serif text-xl font-bold text-amber-950">
              {isHi
                ? "आध्यात्मिक एवं भौतिक लाभ"
                : isTe
                ? "ఆధ్యాత్మిక & భౌతిక ప్రయోజనాలు"
                : "Spiritual, Mental & Physical Benefits"}
            </h3>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              {isHi
                ? "इस दिव्य स्तोत्र के नित्य पाठ से प्राप्त होने वाले शास्त्रसम्मत लाभ:"
                : isTe
                ? "ఈ దివ్య స్తోత్ర నిత్య పారాయణ ద్వారా లభించే శాస్త్రోక్త ఫలాలు:"
                : "Scripturally verified fruits of steady, devotional recitation:"}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(isHi
                ? stotram.benefitsHi
                : isTe
                ? stotram.benefitsTe || stotram.benefits
                : stotram.benefits
              ).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-sm leading-relaxed text-neutral-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-4">
          {stotram.faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-2xs sm:p-6">
              <h4 className="flex items-center gap-2 font-serif text-base font-bold text-amber-950 sm:text-lg">
                <HelpCircle className="h-4 w-4 text-amber-600 shrink-0" />
                {faq.question}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

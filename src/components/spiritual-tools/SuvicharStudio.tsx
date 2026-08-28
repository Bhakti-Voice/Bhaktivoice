"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Share2,
  Sparkles,
  Shuffle,
  Upload,
  X,
  Copy,
  Check,
  Languages,
  RotateCcw,
  Link2,
} from "lucide-react";


import {
  ASPECT_RATIOS,
  CARD_THEMES,
  SALUTATION_PRESETS,
  SUVICHAR_DATABASE,
  type CardAspectRatio,
  type CardTheme,
  type SuvicharCategory,
  type SuvicharItem,
} from "@/lib/spiritual-tools/suvichar-data";
import {
  exportCanvasBlob,
  exportCanvasDataUrl,
  renderSuvicharCard,
} from "@/lib/spiritual-tools/card-renderer";
import { getClientPanchang } from "@/lib/spiritual-tools/client-panchang";
import { DEFAULT_GEO } from "@/lib/spiritual-tools/geo";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";

const CATEGORY_TABS: { id: SuvicharCategory; labelHi: string; labelEn: string; icon: string }[] = [
  { id: "all", labelHi: "सभी सुविचार", labelEn: "All Quotes", icon: "✨" },
  { id: "jain", labelHi: "जैन धर्म / महावीर", labelEn: "Jainism / Mahavira", icon: "✋" },
  { id: "krishna", labelHi: "श्री कृष्ण / गीता", labelEn: "Shri Krishna / Gita", icon: "🪈" },
  { id: "mahadev", labelHi: "महादेव / शिव", labelEn: "Mahadev / Shiva", icon: "🔱" },
  { id: "hanuman", labelHi: "हनुमान जी", labelEn: "Hanuman Ji", icon: "🚩" },
  { id: "ram", labelHi: "श्री राम", labelEn: "Shri Ram", icon: "🏹" },
  { id: "devi", labelHi: "माँ शक्ति / दुर्गा", labelEn: "Maa Durga / Shakti", icon: "🌸" },
  { id: "ganesh", labelHi: "गणपति बाप्पा", labelEn: "Ganpati Bappa", icon: "🪔" },
  { id: "sant", labelHi: "संत वाणी / कबीर", labelEn: "Sant Vani / Kabir", icon: "🌺" },
  { id: "suprabhat", labelHi: "शुभ प्रभात", labelEn: "Good Morning / Suprabhat", icon: "🌅" },
  { id: "festivals", labelHi: "त्यौहार एवं पर्व", labelEn: "Festivals & Special", icon: "🎉" },
];

export function SuvicharStudio() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams?.get("category") as SuvicharCategory | null;
  const initialQuoteIdParam = searchParams?.get("quoteId");

  const [quoteLangMode, setQuoteLangMode] = useState<"hinglish" | "hi" | "en">(isHi ? "hi" : "hinglish");

  const [selectedCategory, setSelectedCategory] = useState<SuvicharCategory>(
    initialCategoryParam && CATEGORY_TABS.some((t) => t.id === initialCategoryParam)
      ? initialCategoryParam
      : "all",
  );

  const filteredQuotes = useMemo(() => {
    if (selectedCategory === "all") return SUVICHAR_DATABASE;
    return SUVICHAR_DATABASE.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const [selectedQuote, setSelectedQuote] = useState<SuvicharItem>(() => {
    if (initialQuoteIdParam) {
      const match = SUVICHAR_DATABASE.find((q) => q.id === initialQuoteIdParam);
      if (match) return match;
    }
    return SUVICHAR_DATABASE[0];
  });

  const [selectedTheme, setSelectedTheme] = useState<CardTheme>(CARD_THEMES[0]);
  const [selectedAspect, setSelectedAspect] = useState<CardAspectRatio>(ASPECT_RATIOS[0]);

  // Personalization fields
  const [devoteeName, setDevoteeName] = useState("");
  const [devoteeCity, setDevoteeCity] = useState("");
  const [salutation, setSalutation] = useState(
    isHi
      ? (selectedQuote.tradition === "jain" ? "सप्रेम जय जिनेन्द्र" : "जय श्री कृष्णा")
      : (selectedQuote.tradition === "jain" ? "Saprem Jai Jinendra 🙏" : "Jai Shree Krishna 🪈"),
  );
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Quote overrides helper
  const getQuoteTextForLang = (item: SuvicharItem, lang: "hinglish" | "hi" | "en") => {
    if (lang === "hinglish") return item.quoteHinglish || item.quoteHi;
    if (lang === "en") return item.quoteEn || item.quoteHinglish || item.quoteHi;
    return item.quoteHi;
  };

  const getShlokaTextForLang = (item: SuvicharItem, lang: "hinglish" | "hi" | "en") => {
    if (lang === "hinglish") return item.shlokaHinglish || item.shlokaOrSutra || "";
    if (lang === "en") return item.shlokaHinglish || item.shlokaOrSutra || "";
    return item.shlokaOrSutra || "";
  };

  const getSourceTextForLang = (item: SuvicharItem, lang: "hinglish" | "hi" | "en") => {
    if (lang === "hinglish" || lang === "en") return item.sourceEn || item.sourceHi;
    return item.sourceHi;
  };

  // State for editable quote fields
  const [customQuote, setCustomQuote] = useState(() => getQuoteTextForLang(selectedQuote, isHi ? "hi" : "hinglish"));
  const [customShloka, setCustomShloka] = useState(() => getShlokaTextForLang(selectedQuote, isHi ? "hi" : "hinglish"));
  const [customSource, setCustomSource] = useState(() => getSourceTextForLang(selectedQuote, isHi ? "hi" : "hinglish"));

  // Panchang toggle
  const [showPanchang, setShowPanchang] = useState(true);
  const [fontSizeScale, setFontSizeScale] = useState(1.0);

  // Status & feedback
  const [isRendering, setIsRendering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live client panchang data
  const panchangDetails = useMemo(() => {
    try {
      const now = new Date();
      const panchang = getClientPanchang(
        DEFAULT_GEO.latitude,
        DEFAULT_GEO.longitude,
        DEFAULT_GEO.timeZone,
        DEFAULT_GEO.name,
        now,
      );

      const dateStr = now.toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
        day: "numeric",
        month: "short",
      });
      return {
        dateStr,
        tithi: isHi ? `${panchang.tithi.pakshaHi} ${panchang.tithi.nameHi}` : `${panchang.tithi.paksha} ${panchang.tithi.name}`,
        nakshatra: isHi ? panchang.nakshatra.nameHi : panchang.nakshatra.name,
        muhurat: isHi ? "शुभ मुहूर्त" : "Shubh Muhurat",
      };
    } catch {
      return {
        dateStr: isHi ? "आज" : "Today",
        tithi: isHi ? "शुभ तिथि" : "Shubh Tithi",
        nakshatra: isHi ? "शुभ नक्षत्र" : "Shubh Nakshatra",
        muhurat: isHi ? "शुभ मुहूर्त" : "Auspicious Timing",
      };
    }
  }, [isHi]);

  // Read URL search params on mount to support incoming shared links
  const [sharedCreator, setSharedCreator] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    const qParam = searchParams.get("q") || searchParams.get("quote");
    const tParam = searchParams.get("t") || searchParams.get("theme");
    const nParam = searchParams.get("n") || searchParams.get("name");
    const cParam = searchParams.get("c") || searchParams.get("city");
    const sParam = searchParams.get("s") || searchParams.get("salutation");

    if (qParam) {
      const found = SUVICHAR_DATABASE.find((i) => i.id === qParam);
      if (found) {
        setSelectedQuote(found);
        setSelectedCategory(found.category);
        setCustomQuote(getQuoteTextForLang(found, isHi ? "hi" : "hinglish"));
        setCustomShloka(getShlokaTextForLang(found, isHi ? "hi" : "hinglish"));
        setCustomSource(getSourceTextForLang(found, isHi ? "hi" : "hinglish"));
      }
    }
    if (tParam) {
      const foundTheme = CARD_THEMES.find((t) => t.id === tParam);
      if (foundTheme) setSelectedTheme(foundTheme);
    }
    if (nParam) {
      setDevoteeName(nParam);
      setSharedCreator(nParam);
    }
    if (cParam) setDevoteeCity(cParam);
    if (sParam) setSalutation(sParam);
  }, [searchParams, isHi]);

  // Sync quote changes
  const handleSelectQuote = useCallback((item: SuvicharItem, langMode = quoteLangMode) => {
    setSelectedQuote(item);
    setCustomQuote(getQuoteTextForLang(item, langMode));
    setCustomShloka(getShlokaTextForLang(item, langMode));
    setCustomSource(getSourceTextForLang(item, langMode));

    if (item.tradition === "jain") {
      setSalutation(isHi ? "सप्रेम जय जिनेन्द्र" : "Saprem Jai Jinendra 🙏");
      const jainTheme = CARD_THEMES.find((t) => t.id === "jain-swarna");
      if (jainTheme) setSelectedTheme(jainTheme);
    } else if (item.category === "mahadev") {
      setSalutation(isHi ? "हर हर महादेव ॐ" : "Har Har Mahadev ॐ");
      const shivTheme = CARD_THEMES.find((t) => t.id === "kailash-mahadev");
      if (shivTheme) setSelectedTheme(shivTheme);
    } else if (item.category === "hanuman" || item.category === "ram") {
      setSalutation(
        item.category === "hanuman"
          ? (isHi ? "जय बजरंगबली संकटमोचन" : "Jai Bajrangbali Sankatmochan")
          : (isHi ? "जय श्री राम 🚩" : "Jai Shree Ram 🚩"),
      );
      const ramTheme = CARD_THEMES.find((t) => t.id === "ayodhya-saffron");
      if (ramTheme) setSelectedTheme(ramTheme);
    } else if (item.category === "devi") {
      setSalutation(isHi ? "जय माता दी 🌸" : "Jai Mata Di 🌸");
      const deviTheme = CARD_THEMES.find((t) => t.id === "devi-sindoor");
      if (deviTheme) setSelectedTheme(deviTheme);
    } else {
      setSalutation(isHi ? "जय श्री कृष्णा" : "Jai Shree Krishna 🪈");
    }
  }, [isHi, quoteLangMode]);

  const handleLangModeChange = (mode: "hinglish" | "hi" | "en") => {
    setQuoteLangMode(mode);
    setCustomQuote(getQuoteTextForLang(selectedQuote, mode));
    setCustomShloka(getShlokaTextForLang(selectedQuote, mode));
    setCustomSource(getSourceTextForLang(selectedQuote, mode));
  };

  const handleShuffleQuote = () => {
    const list = filteredQuotes.length > 0 ? filteredQuotes : SUVICHAR_DATABASE;
    const randomIndex = Math.floor(Math.random() * list.length);
    handleSelectQuote(list[randomIndex]);
  };

  // Trigger canvas re-render
  const drawCard = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsRendering(true);
    try {
      await renderSuvicharCard(canvasRef.current, {
        theme: selectedTheme,
        aspect: selectedAspect,
        item: selectedQuote,
        customQuote,
        customShloka,
        customSource,
        devoteeName,
        devoteeCity,
        salutation,
        devoteeAvatarUrl: avatarUrl,
        showPanchang,
        panchangDetails,
        fontSizeScale,
        isHindi: isHi || quoteLangMode === "hi",
      });
    } catch (err) {
      console.error("Canvas render error:", err);
    } finally {
      setIsRendering(false);
    }
  }, [
    selectedTheme,
    selectedAspect,
    selectedQuote,
    customQuote,
    customShloka,
    customSource,
    devoteeName,
    devoteeCity,
    salutation,
    avatarUrl,
    showPanchang,
    panchangDetails,
    fontSizeScale,
    isHi,
    quoteLangMode,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawCard();
    }, 80);
    return () => clearTimeout(timer);
  }, [drawCard]);

  // Avatar Upload Handlers
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setAvatarUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Download Image Handler
  const handleDownloadImage = () => {
    if (!canvasRef.current) return;
    const dataUrl = exportCanvasDataUrl(canvasRef.current);
    const link = document.createElement("a");
    link.download = `bhakti-suvichar-${selectedQuote.id}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await exportCanvasBlob(canvasRef.current);
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        handleDownloadImage();
      }
    } catch {
      handleDownloadImage();
    }
  };

  // Generate Smart Shareable Web URL that automatically renders photo preview in WhatsApp
  const getShareableSmartUrl = useCallback(() => {
    if (typeof window === "undefined") return "https://www.bhaktivoice.com/suvichar-card-maker";
    const baseUrl = `${window.location.origin}${isHi ? "/hi" : ""}/suvichar-card-maker`;
    const params = new URLSearchParams();
    params.set("q", selectedQuote.id);
    params.set("t", selectedTheme.id);
    if (devoteeName.trim()) params.set("n", devoteeName.trim());
    if (devoteeCity.trim()) params.set("c", devoteeCity.trim());
    if (salutation.trim()) params.set("s", salutation.trim());
    return `${baseUrl}?${params.toString()}`;
  }, [selectedQuote.id, selectedTheme.id, devoteeName, devoteeCity, salutation, isHi]);

  // Copy Smart Share Link
  const handleCopySmartLink = async () => {
    const smartUrl = getShareableSmartUrl();
    try {
      await navigator.clipboard.writeText(smartUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  // 1-Click WhatsApp Share (Sends message with smart URL so WhatsApp renders the automatic photo card preview)
  const handleWhatsAppShare = async () => {
    const smartUrl = getShareableSmartUrl();
    const shareText = isHi
      ? `*${salutation}*\n\n"${customQuote}"\n\n— *${customSource}*${
          devoteeName ? `\n\n🙏 _शुभकामनाएं प्रेषक: ${devoteeName}${devoteeCity ? ` (${devoteeCity})` : ""}_` : ""
        }\n\n✨ *यह पावन कार्ड देखने व 10 सेकंड में अपना खुद का कार्ड बनाने के लिए लिंक खोलें:* 👇\n${smartUrl}`
      : `*${salutation}*\n\n"${customQuote}"\n\n— *${customSource}*${
          devoteeName ? `\n\n🙏 _From: ${devoteeName}${devoteeCity ? ` (${devoteeCity})` : ""}_` : ""
        }\n\n✨ *Tap to view full card & create yours in 10 seconds:* 👇\n${smartUrl}`;

    try {
      if (canvasRef.current) {
        const blob = await exportCanvasBlob(canvasRef.current);
        if (blob && navigator.share && navigator.canShare) {
          const file = new File([blob], "bhakti-suvichar-status.png", {
            type: "image/png",
          });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: isHi ? selectedQuote.titleHi : selectedQuote.titleEn,
              text: shareText,
              files: [file],
            });
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 3000);
            return;
          }
        }
      }
    } catch (e) {
      console.log("Web share not completed or cancelled:", e);
    }

    // Direct WhatsApp web/app link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText,
    )}`;
    window.open(whatsappUrl, "_blank");
  };


  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Shared Creator Welcome Banner (Viral Loop Anchor) */}
      {sharedCreator ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 p-4 ring-2 ring-amber-500/40 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-xl text-white shadow-xs">
              ✨
            </span>
            <div>
              <p className="text-sm font-bold text-ink">
                {isHi
                  ? `🙏 आप ${sharedCreator} द्वारा भेजा गया सुविचार कार्ड देख रहे हैं!`
                  : `🙏 You are viewing a devotional card shared by ${sharedCreator}!`}
              </p>
              <p className="text-xs text-ink/75">
                {isHi
                  ? "आप भी अपना नाम व फोटो जोड़कर 10 सेकंड में खुद का कार्ड बनाएं और WhatsApp पर शेयर करें।"
                  : "Create your own personalized card with your name & photo in 10 seconds to share on WhatsApp."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setDevoteeName("");
              setSharedCreator(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isHi ? "अपना खुद का कार्ड बनाएं" : "Customize My Own Card"}
          </button>
        </div>
      ) : null}

      {/* Top Banner Notice */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-4 ring-1 ring-amber-500/20">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-lg">
            🪔
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 sm:text-sm">
              {isHi
                ? "⚡ 10 सेकंड में बनाएं अपना व्यक्तिगत स्टेटस कार्ड"
                : "⚡ Create your personalized spiritual card in 10 seconds"}
            </p>
            <p className="text-xs text-muted">
              {isHi
                ? "जैन नवकार, गीता, शिव, हनुमान, राम सुविचार • 1-क्लिक व्हाट्सएप शेयर व HD डाउनलोड"
                : "Jain Navkar, Gita, Mahadev, Hanuman & Ram quotes • 1-Click WhatsApp Share & HD Download"}
            </p>
          </div>
        </div>

        <button
          onClick={handleShuffleQuote}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700 active:scale-95 sm:text-sm"
        >
          <Shuffle className="h-4 w-4" />
          {isHi ? "रैंडम सुविचार बदलें" : "Shuffle Random Quote"}
        </button>
      </div>


      {/* Main Studio Grid: Left Controls (55%), Right Live Preview (45%) */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* ================= LEFT CONTROLS COLUMN (7 cols) ================= */}
        <div className="space-y-6 lg:col-span-7">
          {/* STEP 1: Categories & Traditions Tabs */}
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs font-bold text-white">
                  1
                </span>
                <h3 className="font-serif text-lg font-bold text-ink">
                  {isHi ? "श्रेणी व परंपरा चुनें" : "Select Sacred Category & Tradition"}
                </h3>
              </div>

              {/* Language Switcher for Quotes on English Page */}
              <div className="flex items-center gap-1 rounded-xl bg-sand/60 p-1 text-xs">
                <Languages className="h-3.5 w-3.5 text-muted ml-1" />
                <button
                  type="button"
                  onClick={() => handleLangModeChange("hinglish")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition ${
                    quoteLangMode === "hinglish"
                      ? "bg-saffron text-white shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Hinglish
                </button>
                <button
                  type="button"
                  onClick={() => handleLangModeChange("hi")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition ${
                    quoteLangMode === "hi"
                      ? "bg-saffron text-white shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => handleLangModeChange("en")}
                  className={`rounded-lg px-2 py-0.5 font-medium transition ${
                    quoteLangMode === "en"
                      ? "bg-saffron text-white shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      isSelected
                        ? "bg-saffron text-white shadow-xs ring-1 ring-saffron"
                        : "bg-sand/60 text-ink/80 hover:bg-sand ring-1 ring-line/50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{isHi ? tab.labelHi : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Quote Selector Header & Count */}
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="text-xs font-bold text-ink/80">
                {isHi
                  ? `इस श्रेणी के सुविचार (${filteredQuotes.length})`
                  : `Quotes in this Category (${filteredQuotes.length})`}
              </span>
              <button
                type="button"
                onClick={handleShuffleQuote}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition"
              >
                <Shuffle className="h-3.5 w-3.5" />
                {isHi ? "कोई भी सुविचार चुनें" : "Pick Random"}
              </button>
            </div>

            {/* Quote Selector Cards (Spacious, Zero-Clipping Scrollable Container) */}
            <div className="mt-2.5 max-h-[380px] space-y-2.5 overflow-y-auto p-1.5 scrollbar-thin">
              {filteredQuotes.map((item) => {
                const isSelected = selectedQuote.id === item.id;
                const titleText = isHi ? item.titleHi : item.titleEn;
                const quoteSnippet = isHi ? item.quoteHi : (item.quoteHinglish || item.quoteHi);
                const sourceText = isHi ? item.sourceHi : (item.sourceEn || item.sourceHi);
                const tagText = isHi ? item.tag : (item.tagEn || item.tag);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectQuote(item)}
                    className={`w-full text-left rounded-2xl p-4 transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/90 border-2 border-amber-500 shadow-md ring-2 ring-amber-500/20"
                        : "bg-white border border-line/80 hover:border-amber-400 hover:shadow-xs hover:bg-amber-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink">{titleText}</span>
                        {isSelected ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            ✓ {isHi ? "चयनित" : "Active"}
                          </span>
                        ) : null}
                      </div>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 shrink-0">
                        {tagText}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-ink/85 leading-relaxed">
                      {`"${quoteSnippet}"`}
                    </p>


                    <p className="mt-2 text-xs font-semibold text-amber-700">
                      — {sourceText}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>


          {/* STEP 2: Personalization (Name, City, Avatar & Salutation) */}
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs font-bold text-white">
                2
              </span>
              <h3 className="font-serif text-lg font-bold text-ink">
                {isHi ? "नाम, स्थान एवं फोटो जोड़ें" : "Add Your Name, City & Photo"}
              </h3>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Devotee Name */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  {isHi ? "आपका नाम / परिवार का नाम" : "Your Name / Family Name"}
                </label>
                <input
                  type="text"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder={
                    isHi
                      ? "उदा. अमित जैन एवं परिवार / राहुल शर्मा"
                      : "e.g. Amit Jain & Family / Rahul Sharma"
                  }
                  className="mt-1.5 w-full rounded-xl border border-line bg-sand/20 px-3.5 py-2 text-sm text-ink outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* Devotee City */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  {isHi ? "शहर / स्थान (वैकल्पिक)" : "City / Location (Optional)"}
                </label>
                <input
                  type="text"
                  value={devoteeCity}
                  onChange={(e) => setDevoteeCity(e.target.value)}
                  placeholder={isHi ? "उदा. जयपुर, मुंबई, दिल्ली" : "e.g. Mumbai, Jaipur, London"}
                  className="mt-1.5 w-full rounded-xl border border-line bg-sand/20 px-3.5 py-2 text-sm text-ink outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </div>
            </div>

            {/* Salutation Selector */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-ink">
                {isHi ? "अभिनंदन / अभिवादन संदेश (हैडर बैज)" : "Devotional Greeting / Salutation Badge"}
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SALUTATION_PRESETS.map((p) => {
                  const label = isHi ? p.textHi : p.textEn;
                  const isSelected = salutation === label;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSalutation(label)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                        isSelected
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-sand/60 text-ink/75 hover:bg-sand"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                placeholder={isHi ? "या अपना पसंदीदा अभिवादन लिखें..." : "Or type custom salutation..."}
                className="mt-2 w-full rounded-xl border border-line bg-sand/20 px-3 py-1.5 text-xs text-ink outline-none focus:border-saffron"
              />
            </div>

            {/* Avatar Photo Upload */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-amber-50/50 p-3 ring-1 ring-amber-200/60">
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Devotee Avatar"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-500"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200/70 text-xl">
                    📸
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-ink">
                    {isHi ? "अपनी फोटो जोड़ें (स्वर्ण चक्र में प्रदर्शित)" : "Add Devotee Photo (Golden Medallion)"}
                  </p>
                  <p className="text-[11px] text-muted">
                    {isHi ? "कार्ड पर आपका फोटो गोल स्वर्ण फ्रेम में दिखेगा" : "Displays your circular photo in a golden aura frame"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                {avatarUrl ? (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="rounded-lg bg-rose-100 p-2 text-rose-700 hover:bg-rose-200"
                    title={isHi ? "फोटो हटाएं" : "Remove photo"}
                  >

                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {isHi ? "फोटो चुनें" : "Upload Photo"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: Theme & Ratio Selection */}
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs font-bold text-white">
                3
              </span>
              <h3 className="font-serif text-lg font-bold text-ink">
                {isHi ? "दिव्य थीम एवं कार्ड साइज़" : "Visual Theme & Aspect Ratio"}
              </h3>
            </div>

            {/* Aspect Ratio Tabs */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {ASPECT_RATIOS.map((ratio) => {
                const isSelected = selectedAspect.id === ratio.id;
                return (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedAspect(ratio)}
                    className={`flex flex-col items-center justify-center rounded-2xl p-3 text-xs transition border ${
                      isSelected
                        ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-900 font-bold"
                        : "bg-sand/30 border-line/70 hover:bg-sand text-ink/80"
                    }`}
                  >
                    <span className="text-lg">{ratio.iconText}</span>
                    <span className="mt-1 font-semibold">{isHi ? ratio.nameHi : ratio.nameEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Color Themes */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-ink">
                {isHi ? "पसंदीदा रंग थीम चुनें (8 दिव्य शैलियाँ)" : "Choose Divine Color Theme (8 Aesthetics)"}
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {CARD_THEMES.map((theme) => {
                  const isSelected = selectedTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`relative flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition border ${
                        isSelected
                          ? "ring-2 ring-amber-500 border-amber-500 shadow-sm"
                          : "border-line/60 hover:border-amber-300"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${theme.bgColors[0]}, ${theme.bgColors[1]})`,
                      }}
                    >
                      <span className="text-sm">{theme.motif}</span>
                      <span className="mt-1 text-[11px] font-bold text-white drop-shadow-xs">
                        {isHi ? theme.nameHi.split("(")[0] : theme.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options Toggles */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4 text-xs">
              <label className="flex cursor-pointer items-center gap-2 font-medium text-ink">
                <input
                  type="checkbox"
                  checked={showPanchang}
                  onChange={(e) => setShowPanchang(e.target.checked)}
                  className="h-4 w-4 rounded text-saffron accent-saffron"
                />
                <span>
                  {isHi
                    ? "📅 आज का पंचांग व तिथि पट्टी शामिल करें"
                    : "📅 Include Today's Live Panchang & Tithi Ribbon"}
                </span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-muted">{isHi ? "फ़ॉन्ट साइज़:" : "Font Size:"}</span>
                <button
                  type="button"
                  onClick={() => setFontSizeScale((s) => Math.max(0.8, Number((s - 0.1).toFixed(1))))}
                  className="rounded-lg bg-sand px-2.5 py-1 font-bold text-ink hover:bg-sand/80"
                >
                  A-
                </button>
                <span className="font-semibold text-ink">{fontSizeScale}x</span>
                <button
                  type="button"
                  onClick={() => setFontSizeScale((s) => Math.min(1.3, Number((s + 0.1).toFixed(1))))}
                  className="rounded-lg bg-sand px-2.5 py-1 font-bold text-ink hover:bg-sand/80"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4: Inline Text Editor (Quote, Shloka, Source) */}
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs font-bold text-white">
                  4
                </span>
                <h3 className="font-serif text-lg font-bold text-ink">
                  {isHi ? "सुविचार व श्लोक पाठ संपादित करें" : "Edit / Customize Devotional Text"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCustomQuote(getQuoteTextForLang(selectedQuote, quoteLangMode));
                  setCustomShloka(getShlokaTextForLang(selectedQuote, quoteLangMode));
                  setCustomSource(getSourceTextForLang(selectedQuote, quoteLangMode));
                }}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-amber-700"
              >
                <RotateCcw className="h-3 w-3" />
                {isHi ? "मूल पाठ रीसेट करें" : "Reset Original"}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Shloka / Sutra */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  {isHi ? "संस्कृत श्लोक / प्राकृत सूत्र (वैकल्पिक)" : "Sanskrit Shloka / Sacred Sutra (Optional)"}
                </label>
                <input
                  type="text"
                  value={customShloka}
                  onChange={(e) => setCustomShloka(e.target.value)}
                  placeholder={isHi ? "उदा. अहिंसा परमो धर्मः / ॐ त्र्यम्बकं यजामहे..." : "e.g. Ahimsa Paramo Dharmah / Om Namah Shivaya..."}
                  className="mt-1 w-full rounded-xl border border-line bg-sand/20 px-3 py-1.5 text-xs text-ink outline-none focus:border-saffron"
                />
              </div>

              {/* Main Quote */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  {isHi ? "मुख्य सुविचार संदेश" : "Main Devotional Quote Message"}
                </label>
                <textarea
                  rows={3}
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-sand/20 px-3 py-2 text-xs leading-relaxed text-ink outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  {isHi ? "स्रोत / वक्ता (उदा. — भगवान महावीर / श्रीमद्भगवद्गीता)" : "Wisdom Source / Attribution (e.g. — Bhagwan Mahavira / Bhagavad Gita)"}
                </label>
                <input
                  type="text"
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-sand/20 px-3 py-1.5 text-xs text-ink outline-none focus:border-saffron"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PREVIEW & 1-CLICK EXPORT (5 cols) ================= */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 space-y-4">
            {/* Action Bar: WhatsApp Share + Smart Link Copy + Download + Copy */}
            <div className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-amber-500/25">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-md transition hover:bg-emerald-700 active:scale-98"
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Share2 className="h-5 w-5" />
                  <span>
                    {shareSuccess
                      ? isHi
                        ? "✓ संदेश साझा किया गया!"
                        : "✓ Shared Successfully!"
                      : isHi
                      ? "व्हाट्सएप पर शेयर करें (ऑटो फोटो कार्ड सहित)"
                      : "Share on WhatsApp (With Auto Photo Card)"}
                  </span>
                </div>
                <span className="text-[11px] font-normal text-emerald-100">
                  {isHi
                    ? "✨ चैट में फोटो दिखेगी • क्लिक करने पर आपकी साइट खुलेगी"
                    : "✨ Photo appears in chat • Clicks open website directly"}
                </span>
              </button>

              <div className="mt-2.5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleCopySmartLink}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-[11px] font-semibold transition active:scale-95 ${
                    linkCopied
                      ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500"
                      : "bg-sand/70 text-ink hover:bg-sand ring-1 ring-line/60"
                  }`}
                >
                  {linkCopied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Link2 className="h-4 w-4 text-amber-700" />
                  )}
                  <span>{linkCopied ? (isHi ? "लिंक कॉपी!" : "Copied!") : (isHi ? "स्मार्ट लिंक" : "Smart Link")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-amber-600 p-2.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-amber-700 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  <span>{isHi ? "HD डाउनलोड" : "Download HD"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-sand/70 p-2.5 text-[11px] font-semibold text-ink transition hover:bg-sand active:scale-95 ring-1 ring-line/60"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "इमेज कॉपी" : "Copy Image")}</span>
                </button>
              </div>
            </div>


            {/* Live Canvas Card Container */}
            <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-2 shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isHi ? "लाइव HD प्रीव्यू (कैनवास)" : "Live HD Preview (Canvas)"}
                </span>
                <span className="text-[11px] text-white/50">
                  {selectedAspect.width} × {selectedAspect.height}px
                </span>
              </div>

              <div className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/60 p-2">
                {isRendering ? (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs text-xs font-semibold text-white">
                    <Sparkles className="mr-2 h-4 w-4 animate-spin text-amber-400" />
                    {isHi ? "कार्ड रेंडर हो रहा है..." : "Rendering card..."}
                  </div>
                ) : null}

                {/* HTML5 Canvas Element */}
                <canvas
                  ref={canvasRef}
                  className="max-h-[580px] w-auto max-w-full rounded-xl shadow-2xl object-contain transition-all duration-300"
                />
              </div>

              <p className="mt-2 text-center text-[11px] text-white/60">
                {isHi
                  ? "💡 टिप: व्हाट्सएप स्टेटस पर लगाएं और अपने मित्रों व परिवारजनों के साथ साझा करें।"
                  : "💡 Tip: Put on your WhatsApp Status and share devotional blessings with friends & family."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

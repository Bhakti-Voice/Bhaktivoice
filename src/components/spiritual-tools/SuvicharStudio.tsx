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
  Calendar,
  Layers,
  Palette,
  User,
  Type,
  Smartphone,
  ExternalLink,
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

const CATEGORY_TABS: { id: SuvicharCategory; labelHi: string; icon: string }[] = [
  { id: "all", labelHi: "सभी सुविचार", icon: "✨" },
  { id: "jain", labelHi: "जैन धर्म / महावीर", icon: "✋" },
  { id: "krishna", labelHi: "श्री कृष्ण / गीता", icon: "🪈" },
  { id: "mahadev", labelHi: "महादेव / शिव", icon: "🔱" },
  { id: "hanuman", labelHi: "हनुमान जी", icon: "🚩" },
  { id: "ram", labelHi: "श्री राम", icon: "🏹" },
  { id: "devi", labelHi: "माँ शक्ति / दुर्गा", icon: "🌸" },
  { id: "ganesh", labelHi: "गणपति बाप्पा", icon: "🪔" },
  { id: "sant", labelHi: "संत वाणी / कबीर", icon: "🌺" },
  { id: "suprabhat", labelHi: "शुभ प्रभात", icon: "🌅" },
  { id: "festivals", labelHi: "त्यौहार एवं पर्व", icon: "🎉" },
];

export function SuvicharStudio() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams?.get("category") as SuvicharCategory | null;
  const initialQuoteIdParam = searchParams?.get("quoteId");

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
    selectedQuote.tradition === "jain" ? "सप्रेम जय जिनेन्द्र" : "जय श्री कृष्णा",
  );
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Quote overrides
  const [customQuote, setCustomQuote] = useState(selectedQuote.quoteHi);
  const [customShloka, setCustomShloka] = useState(selectedQuote.shlokaOrSutra || "");
  const [customSource, setCustomSource] = useState(selectedQuote.sourceHi);

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

      const dateStr = now.toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "short",
      });
      return {
        dateStr,
        tithi: `${panchang.tithi.pakshaHi} ${panchang.tithi.nameHi}`,
        nakshatra: panchang.nakshatra.nameHi,
        muhurat: "शुभ मुहूर्त",
      };
    } catch {
      return {
        dateStr: "आज",
        tithi: "शुभ तिथि",
        nakshatra: "शुभ नक्षत्र",
        muhurat: "शुभ मुहूर्त",
      };
    }
  }, []);

  // Sync quote changes
  const handleSelectQuote = useCallback((item: SuvicharItem) => {
    setSelectedQuote(item);
    setCustomQuote(item.quoteHi);
    setCustomShloka(item.shlokaOrSutra || "");
    setCustomSource(item.sourceHi);

    if (item.tradition === "jain") {
      setSalutation("सप्रेम जय जिनेन्द्र");
      // Auto-fit theme for Jain if on default
      const jainTheme = CARD_THEMES.find((t) => t.id === "jain-swarna");
      if (jainTheme) setSelectedTheme(jainTheme);
    } else if (item.category === "mahadev") {
      setSalutation("हर हर महादेव ॐ");
      const shivTheme = CARD_THEMES.find((t) => t.id === "kailash-mahadev");
      if (shivTheme) setSelectedTheme(shivTheme);
    } else if (item.category === "hanuman" || item.category === "ram") {
      setSalutation(item.category === "hanuman" ? "जय बजरंगबली" : "जय श्री राम 🚩");
      const ramTheme = CARD_THEMES.find((t) => t.id === "ayodhya-saffron");
      if (ramTheme) setSelectedTheme(ramTheme);
    } else if (item.category === "devi") {
      setSalutation("जय माता दी 🌸");
      const deviTheme = CARD_THEMES.find((t) => t.id === "devi-sindoor");
      if (deviTheme) setSelectedTheme(deviTheme);
    } else {
      setSalutation("जय श्री कृष्णा");
    }
  }, []);

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
  ]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  // Handle Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Download HD Image
  const handleDownloadImage = async () => {
    if (!canvasRef.current) return;
    const dataUrl = exportCanvasDataUrl(canvasRef.current);
    const link = document.createElement("a");
    const safeTitle = selectedQuote.titleHi.replace(/\s+/g, "-").slice(0, 20);
    link.download = `bhakti-voice-suvichar-${safeTitle}.png`;
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

  // 1-Click WhatsApp Share (Native Web Share with fallback to WhatsApp URL)
  const handleWhatsAppShare = async () => {
    if (!canvasRef.current) return;
    const shareText = `*${salutation}*\n\n"${customQuote}"\n\n— *${customSource}*\n${
      devoteeName ? `\n_सौजन्य से: ${devoteeName}_` : ""
    }\n\n✨ अपना दैनिक सुविचार एवं व्हाट्सएप स्टेटस कार्ड बनाएं:\nhttps://www.bhaktivoice.com/suvichar-card-maker`;

    try {
      const blob = await exportCanvasBlob(canvasRef.current);
      if (blob && navigator.share && navigator.canShare) {
        const file = new File([blob], "bhakti-suvichar-status.png", {
          type: "image/png",
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: selectedQuote.titleHi,
            text: shareText,
            files: [file],
          });
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 3000);
          return;
        }
      }
    } catch (e) {
      console.log("Web share not completed or cancelled:", e);
    }

    // Fallback to direct WhatsApp web/app link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Banner Notice */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-4 ring-1 ring-amber-500/20">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-lg text-white shadow-sm">
            🪔
          </span>
          <div>
            <h2 className="text-sm font-bold text-ink sm:text-base">
              दिव्य सुविचार एवं व्हाट्सएप स्टेटस स्टूडियो
            </h2>
            <p className="text-xs text-muted">
              जैन, गीता, महादेव, राम-हनुमान, देवी एवं संत वाणी के साथ 10 सेकंड में अपना नाम और फोटो जोड़कर HD कार्ड बनाएं।
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleShuffleQuote}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-saffron shadow-sm ring-1 ring-line transition hover:bg-cream hover:shadow"
        >
          <Shuffle className="h-4 w-4" />
          नया सुविचार (Shuffle)
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Live Canvas Preview & Viral Action Buttons */}
        <div className="flex flex-col items-center lg:col-span-6 xl:col-span-5">
          <div className="sticky top-20 flex w-full flex-col items-center">
            {/* Canvas Container */}
            <div
              className={`relative flex w-full max-w-[420px] items-center justify-center overflow-hidden rounded-3xl bg-neutral-900/90 p-2.5 shadow-2xl ring-1 ring-white/10 ${
                selectedAspect.id === "story"
                  ? "aspect-[9/16]"
                  : selectedAspect.id === "square"
                  ? "aspect-square"
                  : "aspect-[16/9]"
              }`}
            >
              <canvas
                ref={canvasRef}
                className="h-full w-full rounded-2xl object-contain shadow-inner"
              />
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/40 backdrop-blur-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-sm text-white">
                    <Sparkles className="h-4 w-4 animate-spin text-amber-400" />
                    कार्ड तैयार हो रहा है...
                  </div>
                </div>
              )}
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="mt-4 flex w-full max-w-[420px] items-center justify-center gap-2 rounded-2xl bg-white p-1.5 shadow-xs ring-1 ring-line">
              {ASPECT_RATIOS.map((aspect) => (
                <button
                  key={aspect.id}
                  type="button"
                  onClick={() => setSelectedAspect(aspect)}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition ${
                    selectedAspect.id === aspect.id
                      ? "bg-saffron text-white shadow-xs"
                      : "text-ink/80 hover:bg-cream"
                  }`}
                >
                  <span>{aspect.iconText}</span>
                  <span className="truncate">{aspect.nameHi.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Viral Share / Download Action Buttons */}
            <div className="mt-4 flex w-full max-w-[420px] flex-col gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                <Share2 className="h-5 w-5" />
                <span>📱 WhatsApp पर स्टेटस / शेयर करें</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-saffron px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-saffron-dark active:scale-[0.99]"
                >
                  <Download className="h-4 w-4" />
                  <span>⬇️ HD इमेज डाउनलोड</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-bold text-ink shadow-sm ring-1 ring-line transition hover:bg-cream active:scale-[0.99]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">कॉपी हो गया!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-muted" />
                      <span>📋 कॉपी करें</span>
                    </>
                  )}
                </button>
              </div>

              {shareSuccess && (
                <div className="rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                  ✨ कार्ड सफलतापूर्वक शेयर करने हेतु तैयार है!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="space-y-6 lg:col-span-6 xl:col-span-7">
          {/* Category Tabs */}
          <div className="rounded-3xl bg-white p-5 shadow-xs ring-1 ring-line">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <Layers className="h-4 w-4 text-saffron" />
              <span>1. विषय व श्रेणी चुनें (Select Tradition / Deity)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    const matching =
                      tab.id === "all"
                        ? SUVICHAR_DATABASE
                        : SUVICHAR_DATABASE.filter((q) => q.category === tab.id);
                    if (matching.length > 0) {
                      handleSelectQuote(matching[0]);
                    }
                  }}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === tab.id
                      ? "bg-amber-600 text-white shadow-xs ring-1 ring-amber-700"
                      : "bg-cream text-ink/80 hover:bg-amber-100/60 ring-1 ring-line"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.labelHi}</span>
                </button>
              ))}
            </div>

            {/* Quick Quote Carousel / Picker */}
            <div className="mt-4 border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">
                  इस श्रेणी के सुविचार ({filteredQuotes.length})
                </span>
                <button
                  type="button"
                  onClick={handleShuffleQuote}
                  className="text-xs font-bold text-saffron hover:underline"
                >
                  🎲 कोई भी सुविचार चुनें
                </button>
              </div>
              <div className="mt-2.5 flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {filteredQuotes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectQuote(item)}
                    className={`flex min-w-[200px] max-w-[240px] shrink-0 cursor-pointer flex-col rounded-2xl p-3 text-left transition ${
                      selectedQuote.id === item.id
                        ? "bg-amber-50 ring-2 ring-saffron"
                        : "bg-neutral-50 ring-1 ring-line hover:bg-amber-50/50"
                    }`}
                  >
                    <span className="text-[11px] font-bold text-saffron">
                      {item.tag}
                    </span>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-ink">
                      {item.quoteHi}
                    </p>
                    <span className="mt-1 text-[10px] text-muted">
                      {item.sourceHi}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Personalization Section (Devotee Name, City, Photo, Salutation) */}
          <div className="rounded-3xl bg-white p-5 shadow-xs ring-1 ring-line">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
              <User className="h-4 w-4 text-saffron" />
              <span>2. अपना नाम एवं अभिवादन जोड़ें (Personalization)</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Devotee Name */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  आपका नाम / परिवार का नाम
                </label>
                <input
                  type="text"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="उदा. अमित जैन परिवार / राहुल शर्मा"
                  className="mt-1.5 w-full rounded-xl border border-line bg-cream/40 px-3.5 py-2.5 text-xs text-ink placeholder:text-muted/70 focus:border-saffron focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* City / Location */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  शहर / स्थान (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={devoteeCity}
                  onChange={(e) => setDevoteeCity(e.target.value)}
                  placeholder="उदा. जयपुर, इंदौर, मुंबई"
                  className="mt-1.5 w-full rounded-xl border border-line bg-cream/40 px-3.5 py-2.5 text-xs text-ink placeholder:text-muted/70 focus:border-saffron focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* Salutation Dropdown / Custom */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  अभिवादन / शुभकामना संदेश
                </label>
                <select
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs text-ink focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                >
                  {SALUTATION_PRESETS.map((sal) => (
                    <option key={sal.id} value={sal.textHi}>
                      {sal.textHi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  आपकी फोटो (गोल्डन फ्रेम में जुड़ेगी)
                </label>
                <div className="mt-1.5 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  {avatarUrl ? (
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-saffron">
                        <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarUrl(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        <X className="h-3 w-3" />
                        हटाएं
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-cream px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-line hover:bg-amber-100/50"
                    >
                      <Upload className="h-3.5 w-3.5 text-saffron" />
                      <span>फोटो अपलोड करें</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Panchang & Tithi Toggle */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-amber-50/70 p-3 ring-1 ring-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-saffron" />
                <div>
                  <p className="text-xs font-bold text-ink">
                    आज की तिथि एवं पंचांग जोड़ें
                  </p>
                  <p className="text-[11px] text-muted">
                    {panchangDetails.dateStr} • {panchangDetails.tithi}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={showPanchang}
                  onChange={(e) => setShowPanchang(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-neutral-300 peer-checked:bg-saffron after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>

          {/* Visual Theme Selection */}
          <div className="rounded-3xl bg-white p-5 shadow-xs ring-1 ring-line">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <Palette className="h-4 w-4 text-saffron" />
              <span>3. दिव्य थीम एवं रंग चुनें (Divine Themes)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CARD_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className={`flex cursor-pointer flex-col rounded-2xl p-3 text-left transition ${
                    selectedTheme.id === theme.id
                      ? "ring-2 ring-saffron shadow-sm"
                      : "ring-1 ring-line hover:ring-amber-300"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.bgColors[0]}, ${theme.bgColors[1]})`,
                  }}
                >
                  <span className="text-sm">{theme.motif}</span>
                  <p className="mt-2 line-clamp-1 text-[11px] font-bold text-white">
                    {theme.nameHi.split(" ")[0]}
                  </p>
                  <span className="text-[10px] text-white/70">
                    {theme.nameEn.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Edit Custom Quote Text */}
          <div className="rounded-3xl bg-white p-5 shadow-xs ring-1 ring-line">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <Type className="h-4 w-4 text-saffron" />
                <span>4. सुविचार या श्लोक संपादित करें (Edit Text)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCustomQuote(selectedQuote.quoteHi);
                  setCustomShloka(selectedQuote.shlokaOrSutra || "");
                  setCustomSource(selectedQuote.sourceHi);
                }}
                className="text-xs font-semibold text-muted hover:text-saffron"
              >
                मूल पाठ रीसेट करें
              </button>
            </div>

            <div className="space-y-3">
              {/* Shloka */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  श्लोक / मूल सूत्र (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={customShloka}
                  onChange={(e) => setCustomShloka(e.target.value)}
                  placeholder="उदा. अहिंसा परमो धर्मः / कर्मण्येवाधिकारस्ते..."
                  className="mt-1 w-full rounded-xl border border-line bg-cream/30 px-3.5 py-2 text-xs font-serif text-ink focus:border-saffron focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* Main Quote */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  मुख्य सुविचार / संदेश
                </label>
                <textarea
                  rows={3}
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  placeholder="अपना मनपसंद सुविचार यहाँ लिखें..."
                  className="mt-1 w-full rounded-xl border border-line bg-cream/30 px-3.5 py-2 text-xs font-serif text-ink focus:border-saffron focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>

              {/* Source Attribution */}
              <div>
                <label className="block text-xs font-semibold text-ink">
                  स्रोत / रचयिता
                </label>
                <input
                  type="text"
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value)}
                  placeholder="उदा. भगवान महावीर / श्रीमद्भगवद्गीता / संत कबीर"
                  className="mt-1 w-full rounded-xl border border-line bg-cream/30 px-3.5 py-2 text-xs text-ink focus:border-saffron focus:bg-white focus:outline-none focus:ring-2 focus:ring-saffron/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

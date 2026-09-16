"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Baby,
  Bookmark,
  BookmarkCheck,
  Check,
  Compass,
  Filter,
  Heart,
  Info,
  Moon,
  Search,
  Share2,
  Sparkles,
  Sun,
} from "lucide-react";
import {
  NAKSHATRA_SYLLABLES,
  RASHI_LETTERS,
  VEDIC_BABY_NAMES,
  type Gender,
  type NakshatraPadaSyllable,
  type VedicBabyName,
} from "@/lib/baby-names/data";
import { useLocale } from "@/lib/i18n/client";

export function BabyNamesView() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const [mode, setMode] = useState<"nakshatra" | "rashi" | "all">("nakshatra");
  const [selectedNakshatraIdx, setSelectedNakshatraIdx] = useState<number>(0);
  const [selectedPada, setSelectedPada] = useState<number | null>(null); // null = all padas
  const [selectedRashiIdx, setSelectedRashiIdx] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bv_baby_name_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  function toggleFavorite(name: string) {
    setFavorites((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      try {
        localStorage.setItem("bv_baby_name_favorites", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function handleShare(item: VedicBabyName) {
    const text = isTe
      ? `🕉️ వైదిక నామం: ${item.name} (${item.nameHi})\nఅర్థం: ${item.meaning}\nనక్షత్రం: ${item.nakshatra} · రాశి: ${item.rashi}\n\nభక్తి వాయిస్ లో మరిన్ని వైదిక శిశు నామాలు చూడండి: ${typeof window !== "undefined" ? window.location.href : ""}`
      : isHi
      ? `🕉️ वैदिक नाम: ${item.nameHi} (${item.name})\nअर्थ: ${item.meaningHi}\nनक्षत्र: ${item.nakshatraHi} · राशि: ${item.rashiHi}\n\nBhaktiVoice पर अपने शिशु के लिए वैदिक नामकरण देखें: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `🕉️ Vedic Baby Name: ${item.name} (${item.nameHi})\nMeaning: ${item.meaning}\nNakshatra: ${item.nakshatra} · Rashi: ${item.rashi}\n\nFind auspicious Vedic baby names on BhaktiVoice: ${typeof window !== "undefined" ? window.location.href : ""}`;

    if (navigator.share) {
      navigator.share({ title: item.name, text }).catch(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard.writeText(text);
    }
    setCopiedName(item.name);
    setTimeout(() => setCopiedName(null), 2000);
  }

  const currentNakshatra: NakshatraPadaSyllable = NAKSHATRA_SYLLABLES[selectedNakshatraIdx] || NAKSHATRA_SYLLABLES[0];

  // Active syllables based on Nakshatra + Pada selection
  const activeSyllables = useMemo(() => {
    if (mode !== "nakshatra") return [];
    if (selectedPada !== null) {
      return [currentNakshatra.padas[selectedPada - 1]];
    }
    return currentNakshatra.padas;
  }, [mode, selectedPada, currentNakshatra]);

  // Filtered names list
  const filteredNames = useMemo(() => {
    return VEDIC_BABY_NAMES.filter((item) => {
      // Favorite filter
      if (onlyFavorites && !favorites.includes(item.name)) {
        return false;
      }

      // Gender filter
      if (selectedGender !== "all" && item.gender !== selectedGender && item.gender !== "unisex") {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q) || item.nameHi.includes(q);
        const matchesMeaning = item.meaning.toLowerCase().includes(q) || item.meaningHi.includes(q);
        const matchesDeity = item.deity?.toLowerCase().includes(q) || item.deityHi?.includes(q);
        if (!matchesName && !matchesMeaning && !matchesDeity) return false;
      }

      // Mode-specific filter
      if (mode === "nakshatra") {
        if (item.nakshatra.toLowerCase() !== currentNakshatra.nakshatraName.toLowerCase()) {
          // If not matching exact nakshatra, check if starting syllable matches
          const nameLower = item.name.toLowerCase();
          const matchesSyllable = activeSyllables.some((syl) => nameLower.startsWith(syl.toLowerCase()));
          if (!matchesSyllable) return false;
        }
      } else if (mode === "rashi") {
        if (selectedRashiIdx !== null) {
          const rashi = RASHI_LETTERS[selectedRashiIdx];
          const matchesRashiName = item.rashi.toLowerCase().includes(rashi.name.toLowerCase());
          const matchesLetter = rashi.letters.some((letter) =>
            item.name.toUpperCase().startsWith(letter.toUpperCase())
          );
          if (!matchesRashiName && !matchesLetter) return false;
        }
      }

      return true;
    });
  }, [
    mode,
    selectedGender,
    searchQuery,
    favorites,
    onlyFavorites,
    currentNakshatra,
    activeSyllables,
    selectedRashiIdx,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Search & Filter Control Bar */}
      <div className="rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffbf7] via-white to-[#fff9f2] p-5 sm:p-7 shadow-xs">
        {/* Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#eddcc9] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
                <Baby className="h-4 w-4" />
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                {isTe ? "నక్షత్రం & రాశి ప్రకారం శిశువుల పేర్లు" : isHi ? "वैदिक नामकरण शोधक (Baby Names)" : "Vedic Baby Names by Nakshatra & Rashi"}
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              {isHi
                ? "27 नक्षत्रों के 108 पाद नामाक्षर, 12 राशियां और आध्यात्मिक अर्थों से युक्त दिव्य नाम।"
                : "108 sacred Nakshatra Pada syllables, 12 Rashis, and divine Sanskrit names with deep meanings."}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex rounded-2xl bg-sand/40 p-1 text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setMode("nakshatra");
                setOnlyFavorites(false);
              }}
              className={`rounded-xl px-3 py-1.5 transition flex items-center gap-1.5 ${
                mode === "nakshatra" && !onlyFavorites
                  ? "bg-white text-saffron-deep shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isTe ? "నక్షత్రం ప్రకారం" : isHi ? "नक्षत्र अनुसार" : "By Nakshatra"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("rashi");
                setOnlyFavorites(false);
              }}
              className={`rounded-xl px-3 py-1.5 transition flex items-center gap-1.5 ${
                mode === "rashi" && !onlyFavorites
                  ? "bg-white text-saffron-deep shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>{isTe ? "రాశి ప్రకారం" : isHi ? "राशि अनुसार" : "By Rashi"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("all");
                setOnlyFavorites(false);
              }}
              className={`rounded-xl px-3 py-1.5 transition flex items-center gap-1.5 ${
                mode === "all" && !onlyFavorites
                  ? "bg-white text-saffron-deep shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{isTe ? "అన్ని పేర్లు" : isHi ? "सभी नाम" : "All Names"}</span>
            </button>
            <button
              type="button"
              onClick={() => setOnlyFavorites(true)}
              className={`rounded-xl px-3 py-1.5 transition flex items-center gap-1.5 ${
                onlyFavorites
                  ? "bg-saffron text-white shadow-xs font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{isTe ? `ఇష్టమైనవి (${favorites.length})` : isHi ? `पसंदीदा (${favorites.length})` : `Favorites (${favorites.length})`}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Selector based on Mode */}
        {mode === "nakshatra" && !onlyFavorites && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                {isTe ? "1. జన్మ నక్షత్రాన్ని ఎంచుకోండి (27 నక్షత్రాలు)" : isHi ? "1. जन्म नक्षत्र चुनें (27 नक्षत्र)" : "1. Select Janma Nakshatra (27 Constellations)"}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-1.5">
                {NAKSHATRA_SYLLABLES.map((nak, idx) => (
                  <button
                    key={nak.nakshatraName}
                    type="button"
                    onClick={() => {
                      setSelectedNakshatraIdx(idx);
                      setSelectedPada(null);
                    }}
                    className={`rounded-xl p-2 text-center text-xs font-medium transition ${
                      selectedNakshatraIdx === idx
                        ? "bg-saffron text-white shadow-xs font-bold ring-2 ring-saffron/30"
                        : "bg-sand/25 text-ink hover:bg-sand/60"
                    }`}
                  >
                    <span className="block truncate">{isHi ? nak.nakshatraNameHi : nak.nakshatraName}</span>
                    <span className="text-[10px] opacity-75">{nak.rashiName.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pada Syllable Banner */}
            <div className="rounded-2xl border border-saffron/20 bg-[#fff5e9] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-ink">
                    {isHi ? currentNakshatra.nakshatraNameHi : currentNakshatra.nakshatraName}{" "}
                    <span className="text-xs text-muted font-normal">
                      ({isHi ? `राशि: ${currentNakshatra.rashiNameHi}` : `Rashi: ${currentNakshatra.rashiName}`})
                    </span>
                  </h4>
                  <p className="text-xs text-muted">
                    {isHi
                      ? "इस नक्षत्र के 4 चरणों (पादों) के वैदिक नामाक्षर निम्नलिखित हैं:"
                      : "The sacred Namakshara syllables for the 4 quarters (Padas) of this constellation:"}
                  </p>
                </div>

                {/* Pada selector pills */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedPada(null)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                      selectedPada === null
                        ? "bg-saffron-deep text-white shadow-xs"
                        : "bg-white text-muted hover:text-ink"
                    }`}
                  >
                    {isTe ? "అన్ని పాదాలు" : isHi ? "सभी पाद" : "All Padas"}
                  </button>
                  {[1, 2, 3, 4].map((pNum) => {
                    const sylEn = currentNakshatra.padas[pNum - 1];
                    const sylHi = currentNakshatra.padasHi[pNum - 1];
                    const isSelected = selectedPada === pNum;
                    return (
                      <button
                        key={pNum}
                        type="button"
                        onClick={() => setSelectedPada(pNum)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition flex items-center gap-1 ${
                          isSelected
                            ? "bg-saffron-deep text-white shadow-xs"
                            : "bg-white text-saffron-deep border border-saffron/30 hover:bg-saffron/10"
                        }`}
                      >
                        <span>{isHi ? `पाद ${pNum}: ${sylHi}` : `Pada ${pNum}: ${sylEn}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === "rashi" && !onlyFavorites && (
          <div className="mt-5">
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
              {isTe ? "మీ చంద్ర రాశిని ఎంచుకోండి (12 రాశులు)" : isHi ? "अपनी चंद्र राशि चुनें (12 राशियां)" : "Select Moon Sign (12 Rashis)"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {RASHI_LETTERS.map((rashi, idx) => {
                const isSelected = selectedRashiIdx === idx;
                return (
                  <button
                    key={rashi.name}
                    type="button"
                    onClick={() => setSelectedRashiIdx(isSelected ? null : idx)}
                    className={`rounded-2xl p-3 text-left transition ${
                      isSelected
                        ? "bg-saffron text-white shadow-xs font-bold ring-2 ring-saffron/30"
                        : "bg-sand/25 text-ink hover:bg-sand/60"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{isHi ? rashi.nameHi : rashi.name}</span>
                      <span className="text-[10px] opacity-80">{isHi ? rashi.lordHi : rashi.lord}</span>
                    </div>
                    <p className="mt-1.5 text-[11px] opacity-85 truncate">
                      {isHi ? "अक्षर: " : "Letters: "}
                      {rashi.letters.join(", ")}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Secondary Filter Bar: Gender & Live Search */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[#eddcc9]">
          {/* Gender Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-muted font-bold text-[11px] uppercase mr-1">
              {isTe ? "లింగం:" : isHi ? "लिंग:" : "Gender:"}
            </span>
            {(["all", "boy", "girl", "unisex"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  selectedGender === g
                    ? "bg-saffron text-white shadow-xs"
                    : "bg-sand/30 text-ink hover:bg-sand/60"
                }`}
              >
                {g === "all"
                  ? isHi
                    ? "सभी"
                    : "All"
                  : g === "boy"
                  ? isHi
                    ? "बालक (Boy)"
                    : "Boy"
                  : g === "girl"
                  ? isHi
                    ? "बालिका (Girl)"
                    : "Girl"
                  : isHi
                  ? "उभयलिंगी / आध्यात्मिक"
                  : "Unisex"}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTe ? "పేరు లేదా అర్థాన్ని వెతకండి..." : isHi ? "नाम या अर्थ खोजें..." : "Search name or meaning..."}
              className="w-full rounded-xl border border-line bg-white pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted focus:border-saffron focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-medium text-muted">
          {isHi
            ? `कुल ${filteredNames.length} वैदिक नाम उपलब्ध`
            : `Showing ${filteredNames.length} auspicious Vedic baby names`}
        </p>
        {onlyFavorites && (
          <button
            type="button"
            onClick={() => setOnlyFavorites(false)}
            className="text-xs font-bold text-saffron-deep hover:underline"
          >
            {isTe ? "← అన్ని పేర్లు చూడండి" : isHi ? "← वापस सभी नाम देखें" : "← View all names"}
          </button>
        )}
      </div>

      {/* Baby Names Card Grid */}
      {filteredNames.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sand bg-white p-12 text-center">
          <Baby className="mx-auto h-10 w-10 text-muted/40" />
          <h3 className="mt-3 font-serif text-lg font-bold text-ink">
            {isTe ? "ఎటువంటి పేర్లు లభించలేదు" : isHi ? "कोई नाम नहीं मिला" : "No Matching Names Found"}
          </h3>
          <p className="mt-1 text-xs text-muted max-w-md mx-auto">
            {isHi
              ? "कृपया अपने फ़िल्टर बदलें या खोज शब्द हटाकर पुनः प्रयास करें।"
              : "Try adjusting your search query, switching constellations, or resetting the gender filter."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedGender("all");
              setSelectedPada(null);
              setOnlyFavorites(false);
            }}
            className="mt-4 rounded-xl bg-saffron px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-saffron-deep transition"
          >
            {isTe ? "ఫిల్టర్లను రీసెట్ చేయండి" : isHi ? "फ़िल्टर रीसेट करें" : "Reset Filters"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.name);
            const isCopied = copiedName === item.name;

            return (
              <div
                key={item.name}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#eedcc9] bg-gradient-to-b from-white to-[#fffaf4] p-5 shadow-2xs hover:shadow-md hover:border-saffron/50 transition-all"
              >
                <div>
                  {/* Top Meta Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          item.gender === "boy"
                            ? "bg-blue-100 text-blue-800"
                            : item.gender === "girl"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.gender === "boy"
                          ? isHi
                            ? "बालक"
                            : "Boy"
                          : item.gender === "girl"
                          ? isHi
                            ? "बालिका"
                            : "Girl"
                          : isHi
                          ? "उभयलिंगी"
                          : "Unisex"}
                      </span>

                      {item.deity && (
                        <span className="rounded-full bg-saffron/10 border border-saffron/20 px-2 py-0.5 text-[10px] font-semibold text-saffron-deep truncate max-w-[120px]">
                          {isHi ? item.deityHi || item.deity : item.deity}
                        </span>
                      )}
                    </div>

                    {/* Bookmark Favorite Button */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleShare(item)}
                        className="rounded-full p-1.5 text-muted hover:bg-sand/30 hover:text-ink transition"
                        title={isTe ? "షేర్ చేయండి" : isHi ? "शेयर करें" : "Share"}
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.name)}
                        className={`rounded-full p-1.5 transition ${
                          isFav
                            ? "text-rose-600 bg-rose-50"
                            : "text-muted hover:bg-sand/30 hover:text-rose-500"
                        }`}
                        title={isFav ? "Remove Favorite" : "Save Favorite"}
                      >
                        {isFav ? (
                          <BookmarkCheck className="h-4 w-4 fill-rose-600" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Name in Devanagari & English */}
                  <div className="mt-3">
                    <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-saffron-deep transition-colors">
                      {item.nameHi}{" "}
                      <span className="text-base font-sans font-medium text-muted">({item.name})</span>
                    </h3>
                  </div>

                  {/* Spiritual Meaning */}
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    {isHi ? item.meaningHi : item.meaning}
                  </p>
                </div>

                {/* Footer Astrological Alignment */}
                <div className="mt-4 pt-3 border-t border-[#f0e2d3] flex items-center justify-between text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-saffron" />
                    <span>{isHi ? item.nakshatraHi : item.nakshatra}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Moon className="h-3 w-3 text-saffron" />
                    <span>{isHi ? item.rashiHi : item.rashi}</span>
                  </span>
                  <span className="rounded bg-sand/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
                    Life Path: {item.numerology}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Classical Vedic Namkaran Samskara Treatise (Beating Drik Panchang) */}
      <div className="rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#fffbf7] to-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
            <Info className="h-4 w-4" />
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
            {isTe ? "వైదిక నామకరణ సంస్కారం — శాస్త్రీయ పద్ధతి మరియు ప్రాముఖ్యత" : isHi ? "वैदिक नामकरण संस्कार — शास्त्रीय विधि एवं महत्व" : "Vedic Namkaran Samskara — Ancient Classical Guidelines"}
          </h3>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
          {isHi
            ? "सनातन धर्म के 16 संस्कारों में 'नामकरण' पांचवां संस्कार है। पारस्कर एवं आश्वलायन गृह्यसूत्रों के अनुसार, नाम केवल पहचान का माध्यम नहीं है, अपितु यह बालक के संपूर्ण जीवन के सूक्ष्म स्पंदन (vibration) और प्रारब्ध को निर्धारित करता है।"
            : "Among the 16 sacred Vedic rites (Shodasha Samskaras), Naamkaran is the fifth rite. According to the Paraskara and Ashvalayana Grihya Sutras, a name is not merely a social tag; it creates an electromagnetic vibration that attunes the child's soul to cosmic frequencies."}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-serif text-sm font-bold text-saffron-deep">
              {isHi ? "1. नक्षत्र नाम (Guhya Nama)" : "1. Nakshatra Nama (Secret Name)"}
            </h4>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {isHi
                ? "जन्म नक्षत्र के पाद (चरण) के प्रथम बीज अक्षर पर आधारित नाम। इसे पारंपरिक रूप से गोपनीय रखा जाता है ताकि नकारात्मक ऊर्जा से रक्षा हो।"
                : "Derived from the exact Janma Nakshatra Pada syllable. Traditionally whispered into the child's right ear as a spiritual seed shield."}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-serif text-sm font-bold text-saffron-deep">
              {isHi ? "2. देवता नाम (Devata Nama)" : "2. Devata Nama (Ishta Name)"}
            </h4>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {isHi
                ? "कुलदेवता अथवा इष्टदेव (जैसे शिव, कृष्ण, नारायण, दुर्गा) के पावन स्वरूप को समर्पित नाम, जो नित्य ईश्वरीय कृपा बनाए रखता है।"
                : "Honors the family deity (Kula Devata) or Ishta Devata (e.g. Shiva, Krishna, Devi, Vishnu) ensuring lifelong divine grace."}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-serif text-sm font-bold text-saffron-deep">
              {isHi ? "3. मास नाम (Masa Nama)" : "3. Masa Nama (Month Deity)"}
            </h4>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {isHi
                ? "जन्म के चंद्र मास के अधिपति विष्णु स्वरूप के अनुसार नामकरण (जैसे मार्गशीर्ष में केशव, पौष में नारायण, माघ में माधव आदि)।"
                : "Corresponds to the 12 cosmic manifestations of Lord Vishnu ruling each lunar month (e.g. Madhava, Govinda, Damodara)."}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eddcc9] bg-white p-4">
            <h4 className="font-serif text-sm font-bold text-saffron-deep">
              {isHi ? "4. व्यावहारिक नाम (Vyavaharika)" : "4. Vyavaharika (Calling Name)"}
            </h4>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">
              {isHi
                ? "संसार में पुकारे जाने वाला नाम। यह मधुर, शुभ अर्थ वाला, सम अक्षरों वाला (लड़कों के लिए 2 या 4 अक्षर, कन्याओं के लिए विषम 3 अक्षर) होना चाहिए।"
                : "The daily social name. Sages prescribe even letters (2 or 4 syllables) for boys and odd letters (3 or 5 syllables) for girls ending in soft vowels."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

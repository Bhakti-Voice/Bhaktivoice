"use client";

import { useMemo, useRef, useState } from "react";
import type { AngelNumberPage } from "@/lib/content/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AngelNumberCard } from "./AngelNumberCard";
import { CelestialPoster } from "./CelestialPoster";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Feather,
  Flower2,
  Heart,
  HelpCircle,
  Lightbulb,
  Link as LinkIcon,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { useLocale } from "@/lib/i18n/client";

export interface AngelNumberDetailViewProps {
  page: AngelNumberPage;
  related: AngelNumberPage[];
}

// Curated themes for the horizontal scroll showcase
const THEMES = [
  { id: "all", label: "All Numbers", icon: "🌟" },
  { id: "transformation", label: "Transformation & Growth", icon: "✨", match: ["555", "500", "505", "55"] },
  { id: "abundance", label: "Abundance & Wealth", icon: "💎", match: ["888", "498", "808", "88"] },
  { id: "awakening", label: "Spiritual Awakening", icon: "🕊️", match: ["777", "111", "497", "717"] },
  { id: "protection", label: "Divine Protection", icon: "🛡️", match: ["444", "498", "414", "44"] },
  { id: "love", label: "Love & Twin Flame", icon: "💖", match: ["222", "499", "666", "212"] },
];

export function AngelNumberDetailView({ page, related }: AngelNumberDetailViewProps) {
  const locale = useLocale();
  const displayNumber = page.number || page.slug.match(/(\d+)/)?.[1] || "555";

  // Breadcrumbs: strictly Home > Library > Angel Numbers > Title
  const homeLabel = locale === "te" ? "హోమ్" : locale === "hi" ? "होम" : "Home";
  const libraryLabel = locale === "te" ? "లైబ్రరీ" : locale === "hi" ? "लाइब्रेरी" : "Library";
  const angelLabel = locale === "te" ? "దేవదూత సంఖ్యలు" : locale === "hi" ? "एंजेल नंबर्स" : "Angel Numbers";

  const breadcrumbs = [
    { name: homeLabel, href: "/" },
    { name: libraryLabel, href: "/library" },
    { name: angelLabel, href: "/library/angel-numbers" },
    { name: page.h1 || page.title, href: `/library/angel-numbers/${page.slug}` },
  ];

  // Section tabs
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Interaction states
  const [copied, setCopied] = useState(false);

  // Theme-based horizontal scroll state
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Accordion state for FAQs
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({
    0: true, // First item expanded by default
  });

  const faqs = page.faqs && page.faqs.length > 0 ? page.faqs : [
    {
      question: `Why do I keep seeing ${displayNumber} on the clock?`,
      answer: `Seeing ${displayNumber} repeatedly on clocks, receipts, or timestamps is a sacred synchronicity confirming that your guardian angels are sending divine guidance and that major positive shifts are in motion.`,
    },
    {
      question: `What does ${displayNumber} mean in love and relationships?`,
      answer: `In love, ${displayNumber} signifies passionate breakthroughs, healing past karmic patterns, and welcoming deep vulnerability, authentic communication, and spiritual alignment.`,
    },
    {
      question: `Is ${displayNumber} a sign to make a big life change?`,
      answer: `Yes, ${displayNumber} is widely recognized as a cosmic green light from the universe encouraging you to step out of fear and courageously embrace your soul's true calling.`,
    },
  ];

  const allFaqsExpanded = useMemo(() => {
    return faqs.length > 0 && faqs.every((_, i) => expandedFaqs[i]);
  }, [faqs, expandedFaqs]);

  const toggleAllFaqs = () => {
    if (allFaqsExpanded) {
      setExpandedFaqs({});
    } else {
      const next: Record<number, boolean> = {};
      faqs.forEach((_, i) => {
        next[i] = true;
      });
      setExpandedFaqs(next);
    }
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };



  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tags = page.tags && page.tags.length > 0 ? page.tags : [
    "Angel Number",
    displayNumber,
    "Spiritual Growth",
    "Divine Guidance",
    "Life Changes",
  ];

  // Themed items for horizontal scroll from DB
  const themedItems = useMemo(() => {
    const baseList = related || [];
    if (selectedTheme === "all") return baseList;

    const currentTheme = THEMES.find((t) => t.id === selectedTheme);
    if (!currentTheme || !currentTheme.match) return baseList;

    const matchSet = new Set(currentTheme.match);
    const matched = baseList.filter((item) => {
      const num = item.number || item.slug.replace(/[^0-9]/g, "");
      return (
        matchSet.has(num) ||
        (item.category && item.category.toLowerCase().includes(selectedTheme))
      );
    });

    return matched.length > 0 ? matched : baseList;
  }, [related, selectedTheme]);

  return (
    <article className="min-h-screen bg-[#fdfbf7] text-[#2c1810] pt-3 pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Page Layout Grid (12 Columns) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ============================================================== */}
          {/* LEFT 8 COLUMNS: Top Hero + Tabs + Body Sections                */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 space-y-6">

            {/* TOP HERO ROW: Meta & Text (Left) + Celestial Poster (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Meta, Title, Lead, Tags, Stats */}
              <div className="md:col-span-7 xl:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Meta Tag Row */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mb-2.5">
                    <span className="inline-flex items-center rounded-full bg-[#fdf0ec] border border-[#fbd4c8] px-2.5 py-0.5 text-[10.5px] font-bold tracking-wider text-[#b8532f] uppercase">
                      ANGEL NUMBER
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{page.readingTime || "6 min read"}</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-medium text-stone-700">
                      {page.author || "Bhakti Voice Spiritual Desk"}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{page.publishedAt || "Aug 10, 2026"}</span>
                    </span>
                  </div>

                  {/* Grand H1 Title */}
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#28130a] leading-[1.25]">
                    {page.h1 || page.title}
                  </h1>

                  {/* Subtitle / Lead paragraph */}
                  <p className="mt-2.5 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                    {page.metaDescription ||
                      page.introduction ||
                      `Seeing Angel Number ${displayNumber} everywhere? Discover the transformative energy of ${displayNumber}: major life shifts, soul growth, love, and divine readiness.`}
                  </p>

                  {/* Hashtags Row */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full bg-[#f8f3ec] border border-[#ebdccb] px-2.5 py-0.5 text-[11px] font-medium text-[#78350f] hover:bg-amber-100/60 transition-colors select-none"
                      >
                        #{tag.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                </div>


              </div>

              {/* Right Column: Celestial Artwork Poster */}
              <div className="md:col-span-5 xl:col-span-5 flex items-center justify-center">
                <CelestialPoster number={displayNumber} />
              </div>
            </div>

            {/* SECTION NAVIGATION TABS (Horizontal Pill Bar) */}
            <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-[#fdfbf7]/95 backdrop-blur-md border-y border-[#eddccb]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: "overview", label: "Overview", icon: Sparkles },
                  { id: "meaning", label: "Meaning", icon: Feather },
                  { id: "love", label: "Love & Relationships", icon: Heart },
                  { id: "career", label: "Career & Money", icon: Briefcase },
                  { id: "spiritual", label: "Spiritual Growth", icon: Flower2 },
                  { id: "what-to-do", label: "What to Do", icon: Lightbulb },
                  { id: "faqs", label: "FAQs", icon: HelpCircle },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => scrollToSection(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#923d26] text-white shadow-xs"
                          : "bg-white text-stone-600 border border-[#ebdccb] hover:bg-amber-50 hover:text-stone-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 1: Divine Guidance & Overview (with Om icon + Lotus Watermark) */}
            <section
              id="overview"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#fdf0e4] border border-[#fadcc5] flex items-center justify-center font-serif text-lg font-bold text-[#b45309] shrink-0">
                  ॐ
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#28130a]">
                  Divine Guidance & Overview
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10 max-w-xl">
                <p>
                  {page.introduction ||
                    `Angel Number ${displayNumber} is among the most famous and potent cosmic codes. Triple five heralds rapid transformation, personal expansion, and an awakening to living with authenticity and freedom.`}
                </p>
                {page.excerpt && page.excerpt !== page.introduction && (
                  <p>{page.excerpt}</p>
                )}
              </div>

              {/* Watermark Illustration: Soft Golden Lotus */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none opacity-25">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-amber-600">
                  <path
                    d="M50 20 C42 40 30 50 50 80 C70 50 58 40 50 20 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32 35 C32 50 38 65 50 78 C38 65 24 55 32 35 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M68 35 C68 50 62 65 50 78 C62 65 76 55 68 35 Z"
                    fill="currentColor"
                  />
                  <circle cx="50" cy="80" r="4" fill="currentColor" />
                </svg>
              </div>
            </section>

            {/* CARD 2: The Triple Vibration of [Number] (with Geometric Symbol + Dove Watermark) */}
            <section
              id="meaning"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f3fb] border border-[#cbe3f7] flex items-center justify-center text-[#0369a1] shrink-0 font-serif font-bold text-base">
                  △
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#28130a]">
                  {page.body?.[0]?.heading || `The Triple Vibration of ${displayNumber}`}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10 max-w-xl">
                {page.body?.[0]?.paragraphs ? (
                  page.body[0].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <>
                    <p>
                      When {displayNumber.charAt(0) || "5"} appears three times, change is not just
                      incremental — it is foundational. Old frameworks that no longer serve your
                      dharma are dissolving so that authentic joy can flourish.
                    </p>
                    <p>
                      Do not resist change with apprehension; view it as an answered prayer. The
                      divine removes obstacles so you can spread your wings and soar into new horizons.
                    </p>
                  </>
                )}
              </div>

              {/* Watermark Illustration: Flying Peace Dove */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 pointer-events-none opacity-25">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-sky-600">
                  <path
                    d="M80 30 C70 25 50 35 45 45 C35 30 20 28 10 32 C22 45 35 52 45 55 C40 68 35 80 50 78 C52 68 56 60 62 56 C72 52 85 45 80 30 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </section>

            {/* CARD 3: Twin Flames and Soul Connections (with Heart + Soulmate Silhouette Watermark) */}
            <section
              id="love"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#fdeef1] border border-[#fad2da] flex items-center justify-center text-[#be123c] shrink-0">
                  <Heart className="w-5 h-5 fill-[#be123c]" />
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#28130a]">
                  {page.body?.[1]?.heading || `Twin Flames and Soul Connections in ${displayNumber}`}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10 max-w-xl">
                {page.body?.[1]?.paragraphs ? (
                  page.body[1].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>
                    In twin flame numerology, {displayNumber} signifies dynamic shifts. Either an
                    emotional breakthrough is occurring, or communication between soul mirrors is
                    reaching a higher octave of mutual respect, healing, and spiritual unity.
                  </p>
                )}
              </div>

              {/* Watermark Illustration: Twin Soul Connection Silhouette */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 pointer-events-none opacity-25">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-rose-500">
                  <circle cx="35" cy="40" r="14" fill="currentColor" />
                  <circle cx="65" cy="42" r="13" fill="currentColor" />
                  <path
                    d="M15 90 C15 70 30 60 42 62 C48 64 52 64 58 62 C70 60 85 70 85 90 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </section>

            {/* CARD 4: Frequently Asked Questions (Accordion with Expand All) */}
            <section
              id="faqs"
              className="rounded-2xl bg-white border border-[#ebdccb] p-5 sm:p-6 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#f2e7db] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fdeee9] border border-[#facdc2] flex items-center justify-center text-[#c2410c] shrink-0 font-serif font-bold text-sm">
                    ?
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#28130a]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={toggleAllFaqs}
                  className="text-xs font-semibold text-[#8f3d26] hover:underline cursor-pointer"
                >
                  {allFaqsExpanded ? "Collapse All −" : "Expand All +"}
                </button>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isExpanded = !!expandedFaqs[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#ebdccb] bg-[#faf7f2] overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-3 p-3.5 text-left text-xs sm:text-sm font-semibold text-[#28130a] hover:text-[#8f3d26] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-amber-700" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed border-t border-[#f0e4d7]/70 mt-1">
                          <p className="pt-2">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* ============================================================== */}
          {/* RIGHT 4 COLUMNS: Sidebar Cards Stack                           */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 space-y-4">

            {/* SIDEBAR CARD 1: Divine Message for You + CTA */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-serif font-bold text-sm shrink-0">
                  ॐ
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#28130a]">
                    Divine Message for You
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    A monumental signal that major, positive transformations are unfolding rapidly
                    across your life path.
                  </p>
                </div>
              </div>
              <LocaleLink
                href="/naam-jaap"
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs font-semibold hover:brightness-110 shadow-xs transition-all cursor-pointer"
              >
                <span>Begin Nama Jaap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </LocaleLink>
            </div>

            {/* SIDEBAR CARD 2: Share This Knowledge */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#28130a]">
                Share This Knowledge
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5 mb-3">
                Spread divine wisdom with others.
              </p>
              
              {/* Circular Social Share Buttons matching image */}
              <div className="flex items-center justify-between gap-1.5 mb-3">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on Telegram"
                >
                  <SendIcon className="w-4 h-4 fill-white" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on Facebook"
                >
                  <FacebookIcon className="w-4 h-4 fill-white" />
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#000000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on X"
                >
                  <XIcon className="w-3.5 h-3.5 fill-white" />
                </a>

                {/* General Link / Copy */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
                  title="Copy Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Full Width Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-[#ebdccb] bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-3.5 h-3.5 text-stone-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* SIDEBAR CARD 3: Related Tools */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#28130a] mb-2.5">
                Related Tools
              </h3>
              <div className="space-y-1.5">
                {[
                  {
                    title: "Name Jaap Counter",
                    desc: "Keep your mind connected",
                    href: "/naam-jaap",
                    icon: Sparkles,
                    color: "text-amber-700 bg-amber-50",
                  },
                  {
                    title: "Daily Panchang",
                    desc: "Check today's tithi & muhurat",
                    href: "/panchang",
                    icon: Calendar,
                    color: "text-orange-700 bg-orange-50",
                  },
                  {
                    title: "Zodiac & Kundli",
                    desc: "Discover your cosmic blueprint",
                    href: "/panchang",
                    icon: Flower2,
                    color: "text-rose-700 bg-rose-50",
                  },
                  {
                    title: "Festival Calendar",
                    desc: "Never miss a sacred day",
                    href: "/festivals",
                    icon: Clock,
                    color: "text-emerald-700 bg-emerald-50",
                  },
                ].map((tool, idx) => {
                  const ToolIcon = tool.icon;
                  return (
                    <LocaleLink
                      key={idx}
                      href={tool.href}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#faf5ee] border border-transparent hover:border-[#eddccb] transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}
                        >
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#28130a] group-hover:text-amber-900 transition-colors">
                            {tool.title}
                          </div>
                          <div className="text-[10px] text-stone-500">{tool.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all" />
                    </LocaleLink>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ================================================================ */}
        {/* BOTTOM SECTION: "Explore More Angel Numbers" (THEME SCROLLER)     */}
        {/* ================================================================ */}
        <section className="mt-12 pt-8 border-t border-[#ebdccb]">
          {/* Header Row with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#28130a]">
                Explore More Angel Numbers
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Browse divine number sequences categorized by cosmic vibration and theme.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              <LocaleLink
                href="/library/angel-numbers"
                className="text-xs font-semibold text-[#8f3d26] hover:underline inline-flex items-center gap-1 mr-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </LocaleLink>

              {/* Horizontal Scroll Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="w-8 h-8 rounded-full border border-[#ebdccb] bg-white hover:bg-[#faf5ee] text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Scroll left"
                  title="Previous Numbers"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="w-8 h-8 rounded-full border border-[#ebdccb] bg-white hover:bg-[#faf5ee] text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Scroll right"
                  title="Next Numbers"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Theme Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-4">
            {THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#923d26] text-white shadow-xs"
                      : "bg-white text-stone-600 border border-[#ebdccb] hover:bg-[#faf5ee] hover:text-stone-900"
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Scroll Carousel of Angel Numbers */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {themedItems.map((item) => (
              <div
                key={item.slug}
                className="w-[240px] sm:w-[260px] shrink-0 snap-start flex"
              >
                <AngelNumberCard
                  slug={item.slug}
                  number={item.number}
                  title={item.title}
                  excerpt={item.excerpt || (item as any).introduction || ""}
                  publishedAt={item.publishedAt}
                  heroImage={(item as any).heroImage}
                  category={item.category || "Angel Number"}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}

// Social SVG helper icons
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

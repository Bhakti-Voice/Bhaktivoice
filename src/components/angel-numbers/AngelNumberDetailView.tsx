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
  Star,
  Users,
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

// Rich At-a-Glance attributes and subtitles for angel numbers
const GLANCE_DATA: Record<
  string,
  {
    coreMeaning: string;
    love: string;
    career: string;
    twinFlame: string;
    spirituality: string;
    quote: string;
    subtitle: string;
    keywords: string;
  }
> = {
  "333": {
    coreMeaning: "Divine alignment",
    love: "Growth & harmony",
    career: "Creativity & expansion",
    twinFlame: "Union & support",
    spirituality: "Guidance from Ascended Masters",
    quote: "You are exactly where you need to be.",
    subtitle: "Cosmic alignment and mastery",
    keywords: "Creativity  •  Protection  •  Support",
  },
  "111": {
    coreMeaning: "New beginnings",
    love: "Fresh start & open heart",
    career: "New opportunities & focus",
    twinFlame: "Manifestation & union",
    spirituality: "Thoughts turning into reality",
    quote: "Your thoughts are rapidly manifesting into physical reality.",
    subtitle: "New beginnings and manifestation",
    keywords: "New Beginnings  •  Intention  •  Manifestation",
  },
  "222": {
    coreMeaning: "Divine balance",
    love: "Growth & harmony",
    career: "Patience & collaboration",
    twinFlame: "Alignment & soul connection",
    spirituality: "Trust in universal timing",
    quote: "Have faith. Everything is working out for your highest good.",
    subtitle: "Balance and alignment",
    keywords: "Balance  •  Trust  •  Harmony",
  },
  "444": {
    coreMeaning: "Divine protection",
    love: "Security & honest devotion",
    career: "Diligence & solid foundations",
    twinFlame: "Anchored & enduring bond",
    spirituality: "Surrounded by guardian angels",
    quote: "You are surrounded by angels who love, guide, and protect you.",
    subtitle: "Protection and stability",
    keywords: "Protection  •  Stability  •  Guidance",
  },
  "555": {
    coreMeaning: "Major transformation",
    love: "Positive change & passion",
    career: "Bold career breakthroughs",
    twinFlame: "Soul evolution & freedom",
    spirituality: "Embracing your destiny",
    quote: "Embrace the changes unfolding; they are aligning your life.",
    subtitle: "Change and transformation",
    keywords: "Change  •  Growth  •  Freedom",
  },
  "777": {
    coreMeaning: "Spiritual awakening",
    love: "Soulmate depth & sacred union",
    career: "Divine luck & intuition",
    twinFlame: "Deep spiritual synchronicity",
    spirituality: "Highest cosmic alignment",
    quote: "You are in perfect harmony with universal wisdom and timing.",
    subtitle: "Spiritual awakening and fortune",
    keywords: "Luck  •  Intuition  •  Awakening",
  },
  "888": {
    coreMeaning: "Infinite abundance",
    love: "Generosity & emotional fullness",
    career: "Financial reward & success",
    twinFlame: "Karmic balance & harmony",
    spirituality: "Universal flow of prosperity",
    quote: "The universe is endlessly abundant and showering you with blessings.",
    subtitle: "Infinite abundance and prosperity",
    keywords: "Abundance  •  Karma  •  Prosperity",
  },
  "999": {
    coreMeaning: "Sacred completion",
    love: "Closure of old cycles & rebirth",
    career: "Stepping into soul purpose",
    twinFlame: "Final phase of readiness",
    spirituality: "Surrendering to divine culmination",
    quote: "A significant chapter is closing so a glorious one can begin.",
    subtitle: "Completion and higher purpose",
    keywords: "Completion  •  Closure  •  Rebirth",
  },
  "1111": {
    coreMeaning: "Cosmic portal",
    love: "Twin flame awakening & reunion",
    career: "Visionary leadership & purpose",
    twinFlame: "Sacred divine mirror",
    spirituality: "Direct gateway to higher realms",
    quote: "Your spirit is awakening to its highest divine truth.",
    subtitle: "Manifestation and divine awakening",
    keywords: "Awakening  •  Portal  •  Intuition",
  },
  "1212": {
    coreMeaning: "Higher consciousness",
    love: "Mutual respect & shared vision",
    career: "Courage to pursue passions",
    twinFlame: "Synchronistic soul journey",
    spirituality: "Ascension into peace and clarity",
    quote: "Step fearlessly out of your comfort zone toward your dreams.",
    subtitle: "Higher consciousness and courage",
    keywords: "Ascension  •  Courage  •  Clarity",
  },
  "500": {
    coreMeaning: "Freedom & expansion",
    love: "Authentic self-expression",
    career: "New horizons & liberation",
    twinFlame: "Spontaneous connection",
    spirituality: "Walking in total faith",
    quote: "Release all limitations; new adventures await your spirit.",
    subtitle: "Freedom and new horizons",
    keywords: "Freedom  •  Expansion  •  New Paths",
  },
  "499": {
    coreMeaning: "Soul mission",
    love: "Patience & sacred service",
    career: "Fulfilling your dharma",
    twinFlame: "Mutual spiritual growth",
    spirituality: "Devotion to your true path",
    quote: "Trust divine timing and dedicate yourself to your purpose.",
    subtitle: "Soul mission and divine timing",
    keywords: "Purpose  •  Dharma  •  Divine Timing",
  },
  "498": {
    coreMeaning: "Divine support",
    love: "Emotional grounding & care",
    career: "Abundant rewards for service",
    twinFlame: "Balanced life partnership",
    spirituality: "Unconditional universal support",
    quote: "You are held and sustained by divine grace through every step.",
    subtitle: "Support and material stability",
    keywords: "Support  •  Stability  •  Abundance",
  },
  "497": {
    coreMeaning: "Inner wisdom",
    love: "Spiritual companionship",
    career: "Research, insight & advisory",
    twinFlame: "Telepathic understanding",
    spirituality: "Deep contemplative reflection",
    quote: "Quiet your mind; the answers already reside within your soul.",
    subtitle: "Inner wisdom and contemplation",
    keywords: "Wisdom  •  Contemplation  •  Intuition",
  },
};

function getGlanceData(num: string, page: AngelNumberPage) {
  if (GLANCE_DATA[num]) return GLANCE_DATA[num];
  return {
    coreMeaning: page.category || "Divine alignment",
    love: "Growth & soul harmony",
    career: "Expansion & clarity",
    twinFlame: "Union & support",
    spirituality: "Guidance from Ascended Masters",
    quote: page.excerpt || "You are exactly where you need to be.",
    subtitle: page.category || "Spiritual significance and meaning",
    keywords: "Creativity  •  Protection  •  Support",
  };
}

export function AngelNumberDetailView({ page, related }: AngelNumberDetailViewProps) {
  const locale = useLocale();
  const displayNumber = page.number || page.slug.match(/(\d+)/)?.[1] || "333";
  const glance = getGlanceData(displayNumber, page);

  // Breadcrumbs: strictly Home > Library > Angel Numbers > Angel Number [Number] Meaning
  const homeLabel = locale === "te" ? "హోమ్" : locale === "hi" ? "होम" : "Home";
  const libraryLabel = locale === "te" ? "లైబ్రరీ" : locale === "hi" ? "लाइब्रेरी" : "Library";
  const angelLabel = locale === "te" ? "దేవదూత సంఖ్యలు" : locale === "hi" ? "एंजेल नंबर्स" : "Angel Numbers";
  const shortBreadcrumbTitle = `Angel Number ${displayNumber} Meaning`;

  const breadcrumbs = [
    { name: homeLabel, href: "/" },
    { name: libraryLabel, href: "/library" },
    { name: angelLabel, href: "/library/angel-numbers" },
    { name: shortBreadcrumbTitle, href: `/library/angel-numbers/${page.slug}` },
  ];

  // Section tabs
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Interaction states
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      answer: `Seeing ${displayNumber} repeatedly on clocks, receipts, or timestamps is a sacred synchronicity confirming that your guardian angels and the universe are sending divine guidance.`,
    },
    {
      question: `What does ${displayNumber} mean in love and relationships?`,
      answer: `In love, ${displayNumber} signifies growth, harmony, and mutual spiritual evolution. It encourages vulnerability, authentic communication, and trusting divine timing.`,
    },
    {
      question: `Is ${displayNumber} a sign of Ascended Masters?`,
      answer: `Yes, ${displayNumber} is widely recognized as the signature frequency of Ascended Masters, assuring you that you are protected, supported, and surrounded by enlightened guides.`,
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

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Tags
  const tags = page.tags && page.tags.length > 0 ? page.tags : [
    "Angel Numbers",
    displayNumber,
    "Ascended Masters",
    "Creativity",
    "Spiritual Growth",
  ];

  // Themed items for horizontal scroll from DB
  const themedItems = useMemo(() => {
    const baseList = related || [];
    if (selectedTheme === "all") return baseList;

    const currentTheme = THEMES.find((t) => t.id === selectedTheme);
    if (!currentTheme?.match) return baseList;

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
    <article className="min-h-screen bg-[#faf8f5] text-[#1c1917] pt-4 pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ============================================================== */}
        {/* TOP ROW: Left Hero Content + Right Golden Poster + Sidebar      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Main Hero Column (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Badges, H1 Title, Excerpt, Tags */}
              <div className="md:col-span-7 flex flex-col justify-center">
                {/* Meta Badge & Info Row */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mb-3">
                  <span className="inline-flex items-center rounded-full bg-[#feece4] border border-[#fbd4c8] px-2.5 py-0.5 text-[10.5px] font-bold tracking-wider text-[#c2410c] uppercase">
                    ANGEL NUMBER
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{page.publishedAt || "2026-09-21"}</span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{page.readingTime || "6 min read"}</span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="font-medium text-stone-700">
                    {page.author || "Bhakti Voice Spiritual Desk"}
                  </span>
                </div>

                {/* Main H1 Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#1c1917] leading-[1.2]">
                  {page.h1 || page.title}
                </h1>

                {/* Subtitle / Excerpt */}
                <p className="mt-3 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed max-w-xl">
                  {page.metaDescription ||
                    page.introduction ||
                    `What does ${displayNumber} mean? Explore the spiritual significance of angel number ${displayNumber}. Discover how seeing ${displayNumber} everywhere influences your love life, career, and twin flame journey.`}
                </p>

                {/* Tags Row */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-[#fdfaf6] border border-[#ebdccb] px-3 py-1 text-[11px] font-medium text-[#78350f] hover:bg-amber-100/60 transition-colors select-none"
                    >
                      #{tag.replace(/^#/, "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Celestial Artwork Poster */}
              <div className="md:col-span-5 flex items-center justify-center">
                <CelestialPoster
                  number={displayNumber}
                  keywords={glance.keywords}
                  quote={glance.quote}
                />
              </div>

            </div>
          </div>

          {/* RIGHT 4 COLUMNS: Sticky Sidebar with Glance, Nama Jaap, Share & Tools */}
          <aside className="lg:col-span-4 space-y-6 lg:row-span-2">

            {/* SIDEBAR CARD 1: [Number] at a Glance */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-5 shadow-2xs">
              {/* Header with Winged Halo and Title */}
              <div className="flex items-center gap-3 mb-5">
                <WingedHaloEmblem className="w-14 h-9 shrink-0 text-amber-500" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight">
                  {displayNumber} at a Glance
                </h3>
              </div>

              {/* Key-Value Attributes List */}
              <div className="space-y-3.5 text-xs sm:text-[13px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Star className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Core Meaning</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.coreMeaning}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Love</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.love}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Career</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.career}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Twin Flame</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.twinFlame}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Flower2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Spirituality</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.spirituality}</span>
                </div>
              </div>

              {/* Quote Callout Box */}
              <div className="mt-5 pt-1">
                <div className="rounded-xl bg-[#fcf6ed] border border-[#f5ebd7] p-3.5 flex items-start gap-2.5">
                  <span className="font-serif text-2xl font-bold text-[#d35400] leading-none select-none shrink-0">❝</span>
                  <p className="font-serif italic text-xs sm:text-[12.5px] leading-snug pt-0.5 text-[#2c1810]">
                    &ldquo;{glance.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR CARD 2: Divine Message for You (Nama Jaap CTA) */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fdf0e4] border border-[#fadcc5] flex items-center justify-center font-serif text-lg font-bold text-[#b45309] shrink-0">
                  ॐ
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#1c1917]">
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

            {/* SIDEBAR CARD 3: Share This Knowledge */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#1c1917]">
                Share This Knowledge
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5 mb-3">
                Spread divine wisdom with others.
              </p>
              
              {/* Circular Social Share Buttons */}
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

            {/* SIDEBAR CARD 4: Related Tools */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#1c1917] mb-2.5">
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
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#faf5ee] border border-transparent hover:border-[#ebdccb] transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}
                        >
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1c1917] group-hover:text-amber-900 transition-colors">
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

          </aside>

          {/* ============================================================== */}
          {/* MAIN COLUMN BODY: Horizontal Nav Tabs + Content Sections      */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 space-y-6">

            {/* SECTION NAVIGATION TABS (Horizontal Pill Bar) */}
            <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-[#faf8f5]/95 backdrop-blur-md border-y border-[#e8dfd2]">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
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
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold"
                          : "bg-white text-stone-700 border border-[#e8dfd2] hover:border-amber-400 hover:text-amber-800 hover:bg-[#fff9f2]"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-amber-600/80"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 1: Overview */}
            <section
              id="overview"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
                Overview
              </h2>
              
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                <p>
                  {page.introduction ||
                    `Angel number ${displayNumber} is a powerful message from the universe and the Ascended Masters. It is a sign that you are not alone, and divine guidance is surrounding you. This number carries the energies of creativity, growth, protection, and support. When you repeatedly see ${displayNumber}, it's a reminder to trust your path and embrace the opportunities coming your way.`}
                </p>
                {page.excerpt && page.excerpt !== page.introduction && (
                  <p>{page.excerpt}</p>
                )}
              </div>

              {/* Callout Quote Box with Lotus Icon */}
              <div className="mt-5 rounded-r-xl bg-[#fffbf2] border-l-4 border-amber-500 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Flower2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-serif italic text-xs sm:text-[13.5px] text-stone-700 leading-relaxed">
                  &ldquo;Seeing {displayNumber} is a gentle reminder from the universe that you are supported, guided, and aligned with your higher purpose.&rdquo;
                </p>
              </div>
            </section>

            {/* CARD 2: Meaning */}
            <section
              id="meaning"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f3fb] border border-[#cbe3f7] flex items-center justify-center text-[#0369a1] shrink-0 font-serif font-bold text-base">
                  △
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  {page.body?.[0]?.heading || `The Spiritual Meaning of ${displayNumber}`}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                {page.body?.[0]?.paragraphs ? (
                  page.body[0].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <>
                    <p>
                      When {displayNumber} appears repeatedly in your daily experience, it signals a strong alignment between your mental intentions and cosmic law. Your prayers have been heard, and universal forces are actively organizing circumstances to assist you.
                    </p>
                    <p>
                      Maintain focused optimism and let go of doubts. Every step you take in devotion and clarity creates a ripple of positive manifestations in your reality.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* CARD 3: Love & Relationships */}
            <section
              id="love"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#fdeef1] border border-[#fad2da] flex items-center justify-center text-[#be123c] shrink-0">
                  <Heart className="w-4 h-4 fill-[#be123c]" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  {page.body?.[1]?.heading || `Love & Twin Flames in ${displayNumber}`}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                {page.body?.[1]?.paragraphs ? (
                  page.body[1].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>
                    In twin flame numerology and relationships, {displayNumber} emphasizes harmony, mutual respect, and honest communication. It calls for dissolving past resentments and allowing heart-centered understanding to heal all bonds.
                  </p>
                )}
              </div>
            </section>

            {/* CARD 4: FAQs */}
            <section
              id="faqs"
              className="rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#f2e7db] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fdeee9] border border-[#facdc2] flex items-center justify-center text-[#c2410c] shrink-0 font-serif font-bold text-sm">
                    ?
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={toggleAllFaqs}
                  className="text-xs font-semibold text-[#d35400] hover:text-amber-600 hover:underline cursor-pointer"
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
                        className="w-full flex items-center justify-between gap-3 p-3.5 text-left text-xs sm:text-sm font-semibold text-[#1c1917] hover:text-[#d35400] cursor-pointer"
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

        </div>

        {/* ================================================================ */}
        {/* BOTTOM SECTION: "Explore More Angel Numbers" (THEME SCROLLER)     */}
        {/* ================================================================ */}
        <section className="mt-12 pt-8 border-t border-[#ebdccb]">
          {/* Header Row with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                Explore More Angel Numbers
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Browse divine number sequences categorized by cosmic vibration and theme.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              <LocaleLink
                href="/library/angel-numbers"
                className="text-xs font-semibold text-[#d35400] hover:text-amber-600 hover:underline inline-flex items-center gap-1 mr-1"
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
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold"
                      : "bg-white text-stone-700 border border-[#e8dfd2] hover:border-amber-400 hover:text-amber-800 hover:bg-[#fff9f2]"
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

// Beautiful Winged Halo Emblem matching the reference UI
function WingedHaloEmblem({ className = "w-14 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 56"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="haloRingGrad" x1="25" y1="4" x2="75" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="angelWingL" x1="48" y1="20" x2="6" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" />
          <stop offset="0.4" stopColor="#f59e0b" />
          <stop offset="0.8" stopColor="#fef08a" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
        <linearGradient id="angelWingR" x1="52" y1="20" x2="94" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" />
          <stop offset="0.4" stopColor="#f59e0b" />
          <stop offset="0.8" stopColor="#fef08a" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
      </defs>

      {/* Floating Golden Halo Ring */}
      <ellipse
        cx="50"
        cy="9"
        rx="18"
        ry="4.5"
        stroke="url(#haloRingGrad)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Left Angel Wing */}
      <path
        d="M46 22 C38 17 26 13 8 16 C14 22 22 28 34 30 C22 29 13 33 10 39 C18 40 28 38 38 35 C28 38 22 43 20 48 C28 47 37 42 46 32 Z"
        fill="url(#angelWingL)"
        opacity="0.9"
      />

      {/* Right Angel Wing */}
      <path
        d="M54 22 C62 17 74 13 92 16 C86 22 78 28 66 30 C78 29 87 33 90 39 C82 40 72 38 62 35 C72 38 78 43 80 48 C72 47 63 42 54 32 Z"
        fill="url(#angelWingR)"
        opacity="0.9"
      />
    </svg>
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

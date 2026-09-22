"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Home,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PATHS } from "@/lib/seo/paths";

interface KundliMilanHeroProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function KundliMilanHero({ isHi = false, isTe = false }: KundliMilanHeroProps) {
  const tagline = isTe
    ? "దివ్య వైదిక వివాహ పొంతన (36 గుణాల మిలనం)"
    : isHi
    ? "प्रामाणिक वैदिक विवाह अनुकूलता (36 गुण मिलान)"
    : "Sacred Vedic Matchmaking (36 Guna Milan)";

  const title = isTe
    ? "ఉచిత ఆన్‌లైన్ కుండలి మిలనం"
    : isHi
    ? "मुफ्त ऑनलाइन कुंडली मिलान"
    : "Free Online Kundli Milan";

  const subtitle = isTe
    ? "వివాహ అనుకూలత కొరకు ఖచ్చితమైన 36 గుణాల అష్టకూట మిలనం. నాడీ దోషం, భకూట్ దోష పరిహారం, మాంగ్లిక్ సామరస్యం మరియు సమగ్ర జాతక విశ్లేషణ — 100% ఉచితం, గోప్యమైనది మరియు ప్రామాణికమైనది."
    : isHi
    ? "विवाह हेतु महर्षि पराशर अष्टकूट 36 गुण मिलान। नाड़ी दोष, भकूट दोष परिहार, मांगलिक सामंजस्य एवं सम्पूर्ण वैवाहिक अनुकूलता रिपोर्ट — पूर्णतः निःशुल्क, सुरक्षित व प्रामाणिक।"
    : "Accurate Vedic Ashtakoot horoscope matching for marriage. Calculate 36 Gunas, Nadi & Bhakoot dosha cancellation, Manglik compatibility, and marital harmony — 100% free, private and trustworthy.";

  const trustBadges = [
    {
      icon: <Sparkles className="h-5 w-5 text-[#d9531e]" />,
      title: isTe ? "100% ఉచితం" : isHi ? "100% मुफ्त" : "100% Free",
      desc: isTe ? "ఎల్లప్పుడూ" : isHi ? "हमेशा" : "Always",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#b45309]" />,
      title: isTe ? "36 గుణాలు & అష్టకూటం" : isHi ? "36 गुण एवं अष्टकूट" : "36 Gunas & Ashtakoot",
      desc: isTe ? "ప్రామాణిక గణనలు" : isHi ? "शास्त्रीय गणना" : "Authentic Rules",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      icon: <Lock className="h-5 w-5 text-[#9a3412]" />,
      title: isTe ? "సురక్షితం & గోప్యమైనది" : isHi ? "सुरक्षित एवं निजी" : "Private & Secure",
      desc: isTe ? "మీ డేటా భద్రంగా ఉంటుంది" : isHi ? "डेटा पूर्णतः सुरक्षित" : "Your data stays safe",
      bg: "bg-stone-500/10",
      border: "border-stone-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#ecdac8]/60 bg-gradient-to-b from-[#fdfbf7] via-[#fffdf9] to-[#fbf7f0] pt-6 pb-8 lg:pb-12 print:hidden">
      {/* Background Scenic Artwork for Desktop & Tablet */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none select-none opacity-30 lg:opacity-45 mix-blend-multiply overflow-hidden">
        <Image
          src="/images/kundli/shiva-meditation.webp"
          alt="Lord Shiva in deep meditation amidst the Himalayas"
          fill
          priority
          className="object-cover object-right-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf7f0] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 mb-4"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#d9531e] transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>{isTe ? "హోమ్" : isHi ? "होम" : "Home"}</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
          <Link
            href={PATHS.spiritualTools}
            className="hover:text-[#d9531e] transition-colors"
          >
            {isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : "Spiritual Tools"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
          <span className="font-medium text-[#3b1812]" aria-current="page">
            {isTe ? "కుండలి మిలనం" : isHi ? "कुंडली मिलान" : "Kundli Milan"}
          </span>
        </nav>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Heading, Subtitle, Trust Badges */}
          <div className="lg:col-span-7 xl:col-span-8 z-10">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-[#c2410c] uppercase mb-1">
              <Heart className="h-3.5 w-3.5 fill-[#c2410c] text-[#c2410c]" />
              <span>{tagline}</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3b1812] leading-[1.15]">
              {title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-medium">
              {subtitle}
            </p>

            {/* 3 Trust Badges Row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#ecdac8] bg-white/90 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xs backdrop-blur-xs flex items-center gap-2.5 transition hover:border-[#d9531e]/40 hover:shadow-xs"
                >
                  <div
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl ${badge.bg} border ${badge.border}`}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-stone-900 leading-tight">
                      {badge.title}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight mt-0.5 font-medium">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Divine Spiritual Quote Card & Om Motif */}
          <div className="lg:col-span-5 xl:col-span-4 z-10 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-[#e8d5c0]/90 bg-gradient-to-br from-[#fffdfa]/95 via-[#fff9f0]/90 to-[#fbf4e8]/95 p-5 shadow-xs backdrop-blur-sm text-center">
              <span className="text-2xl font-serif text-[#d97706]/70 leading-none select-none block mb-1">
                “
              </span>
              <p className="font-serif text-sm sm:text-base font-bold italic text-[#4a1815] leading-relaxed">
                {isTe
                  ? "రెండు ఆత్మలు ధర్మం, ప్రేమ మరియు దివ్య సామరస్యంతో ఏకం అగుగాక."
                  : isHi
                  ? "दो आत्माएं धर्म, प्रेम और दिव्य सामंजस्य के साथ एक पवित्र बंधन में बंधें।"
                  : "May two souls unite in dharma, love, and divine harmony."}
              </p>
              <p className="mt-2 text-xs font-serif tracking-widest text-[#b45309] font-bold">
                — Bhakti Voice
              </p>

              <div className="my-3 mx-auto h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              <div className="flex items-center justify-center gap-2 text-[#4a1815]">
                <span className="text-lg font-serif font-bold text-[#c2410c]">ॐ</span>
                <span className="text-[11px] sm:text-xs font-medium tracking-wide text-stone-700 font-serif">
                  {isTe
                    ? "వివాహః పవిత్రం బంధనమ్"
                    : isHi
                    ? "विवाहः पवित्रं बन्धनम्"
                    : "Marriage is a Sacred Union"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import {
  FileText,
  MapPin,
  Sparkles,
  Download,
  Home,
  ChevronRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PATHS } from "@/lib/seo/paths";

interface PrintableCalendarHeroProps {
  locale?: string;
  isHi?: boolean;
  isTe?: boolean;
}

export function PrintableCalendarHero({
  isHi = false,
  isTe = false,
}: PrintableCalendarHeroProps) {
  const title = isTe
    ? "ప్రింట్ చేయదగిన హిందూ వాల్ క్యాలెండర్"
    : isHi
    ? "प्रिंट योग्य हिन्दू दीवार कैलेंडर"
    : "Printable Hindu Wall Calendar";

  const subtitle = isTe
    ? "మీ పూజా మందిరం కోసం ప్రామాణిక నెలవారీ సనాతన పంచాంగం వాల్ క్యాలెండర్."
    : isHi
    ? "अपने पूजा घर अथवा दीवार के लिए प्रामाणिक मासिक सनातन पंचांग कैलेंडर।"
    : "Authentic monthly Sanatan Panchang wall calendar for your home altar.";

  const tagline = isTe
    ? "ఏ భారతీయ లేదా అంతర్జాతీయ నగరానికైనా సులభంగా A4 PDF లో ప్రింట్ చేయండి లేదా సేవ్ చేసుకోండి."
    : isHi
    ? "भारत या विश्व के किसी भी नगर के लिए A4 PDF में आसानी से प्रिंट करें अथवा सेव करें।"
    : "Easily print or save as A4 PDF for any Indian or global city.";

  const featurePills = [
    {
      icon: <FileText className="h-5 w-5 text-[#d9531e]" />,
      title: isTe ? "A4 ప్రింటబుల్" : isHi ? "A4 प्रिंट योग्य" : "A4 Printable",
      desc: isTe ? "హై-క్వాలిటీ PDF" : isHi ? "उच्च गुणवत्ता PDF" : "High-quality PDF",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#c2410c]" />,
      title: isTe ? "నగర ఆధారిత పంచాంగం" : isHi ? "नगर आधारित पंचांग" : "City-based Panchang",
      desc: isTe ? "ఖచ్చితమైన తిథి & వేళలు" : isHi ? "सटीक तिथि व समय" : "Accurate tithi & timings",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#b45309]" />,
      title: isTe ? "పండుగల విశేషాలు" : isHi ? "प्रमुख पर्व व त्यौहार" : "Festival Highlights",
      desc: isTe ? "ముఖ్యమైన రోజులను మిస్ అవ్వద్దు" : isHi ? "महत्वपूर्ण दिन कभी न भूलें" : "Never miss important days",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      icon: <Download className="h-5 w-5 text-[#9a3412]" />,
      title: isTe ? "ఉచిత డౌన్‌లోడ్" : isHi ? "मुफ्त डाउनलोड" : "Free to Download",
      desc: isTe ? "తక్షణమే ప్రింట్ లేదా సేవ్ చేయండి" : isHi ? "तुरंत प्रिंट या सेव करें" : "Print or save instantly",
      bgColor: "bg-stone-500/10",
      borderColor: "border-stone-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#ecdac8]/60 bg-gradient-to-b from-[#fdfbf7] via-[#fffdf9] to-[#fbf7f0] pt-6 pb-8 lg:pb-12 print:hidden">

      {/* Background Scenic Artwork for Desktop & Tablet (Varanasi Ghats at Sunrise) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none select-none opacity-25 lg:opacity-40 mix-blend-multiply overflow-hidden">
        <Image
          src="/images/library/hero-temple-sunrise.jpg"
          alt="Sacred temple ghat at golden sunrise"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf7f0] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation with JSON-LD Schema */}
        <div className="mb-5">
          <Breadcrumbs
            items={[
              { name: isTe ? "హోమ్" : isHi ? "होम" : "Home", href: "/" },
              { name: isTe ? "ఆధ్యాత్మిక సాధనాలు" : isHi ? "आध्यात्मिक उपकरण" : "Spiritual Tools", href: PATHS.spiritualTools },
              { name: isTe ? "ప్రింట్ క్యాలెండర్" : isHi ? "प्रिंट कैलेंडर" : "Printable Calendar", href: PATHS.printableCalendar },
            ]}
          />
        </div>

        {/* Hero Main Flex Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Title, Subtitle, Feature Badges */}
          <div className="lg:col-span-8 z-10">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3b1812] leading-[1.15]">
              {title}
            </h1>
            <p className="mt-3 text-base sm:text-lg font-medium text-stone-700 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 leading-normal max-w-2xl">
              {tagline}
            </p>

            {/* 4 Feature Pills in a Row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl">
              {featurePills.map((pill, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#ecdac8] bg-white/90 p-2.5 sm:p-3 shadow-xs backdrop-blur-xs flex items-center gap-2.5 transition hover:border-[#d9531e]/40 hover:shadow-sm"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${pill.bgColor} border ${pill.borderColor}`}
                  >
                    {pill.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13px] font-bold text-stone-900 truncate leading-tight">
                      {pill.title}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-stone-500 truncate leading-tight mt-0.5">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sanskrit Shloka Blessing Box */}
          <div className="w-full lg:col-span-4 z-10 flex justify-center lg:justify-end">
            <div className="w-full lg:max-w-xs rounded-2xl border border-[#e8d5c0] bg-gradient-to-br from-[#fffcf8]/95 via-[#fffaf2]/90 to-[#fbf4e8]/95 p-4 sm:p-5 shadow-xs backdrop-blur-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1.5">
                <span className="text-xs">❖</span>
                <span className="text-xs font-serif tracking-widest text-[#b45309]">|| शान्ति मन्त्रः ||</span>
                <span className="text-xs">❖</span>
              </div>
              <p className="font-serif text-base sm:text-lg font-bold text-[#4a1815] tracking-wide">
                ॥ सर्वे भवन्तु सुखिनः ॥
              </p>
              <div className="my-2 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <p className="text-xs sm:text-sm font-medium italic text-stone-600 leading-relaxed">
                {isTe
                  ? "ఈ పవిత్ర క్యాలెండర్ మీ గృహంలో భక్తి, సానుకూలత మరియు శాంతిని నింపుగాక."
                  : isHi
                  ? "यह पावन कैलेंडर आपके घर में सकारात्मकता, भक्ति और सुख-शांति का संचार करे।"
                  : "May this calendar bring positivity and devotion to your home."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

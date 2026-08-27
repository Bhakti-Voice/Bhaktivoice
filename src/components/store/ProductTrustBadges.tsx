"use client";

import React from "react";
import { HeartHandshake, PackageCheck, Sparkles, Truck } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";

export function ProductTrustBadges() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const badges = [
    {
      icon: Sparkles,
      title: isHi ? "100% प्रामाणिक एवं शुद्ध" : "100% Pure & Authentic",
      desc: isHi
        ? "प्राकृतिक तुलसी, रुद्राक्ष एवं शुद्ध धातु"
        : "Genuine natural beads, pure metals & organic materials",
    },
    {
      icon: PackageCheck,
      title: isHi ? "पवित्र एवं सुरक्षित पैकिंग" : "Sanctified Packaging",
      desc: isHi
        ? "पूजन सामग्री के सम्मान अनुसार सुरक्षित डिब्बे"
        : "Handled with respect and packed in secure boxes",
    },
    {
      icon: HeartHandshake,
      title: isHi ? "साधना हेतु यथार्थ भाव" : "True Sadhana Purpose",
      desc: isHi
        ? "बिना किसी अंधविश्वास व चमत्कारी दावों के"
        : "Practical spiritual tools without false promises",
    },
    {
      icon: Truck,
      title: isHi ? "अखिल भारतीय सुरक्षित डिलीवरी" : "Pan-India Safe Delivery",
      desc: isHi
        ? "त्वरित प्रेषण एवं विश्वसनीय ट्रैकिंग"
        : "Dispatched promptly with end-to-end tracking",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 rounded-3xl border border-saffron/20 bg-gradient-to-br from-[#fffbf7] via-white to-[#fff9f2] p-5 shadow-2xs sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div key={idx} className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron/10 text-saffron-deep ring-1 ring-saffron/20">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">{badge.title}</h4>
              <p className="mt-0.5 text-xs text-muted leading-relaxed">{badge.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

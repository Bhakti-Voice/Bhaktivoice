"use client";

import React, { useState } from "react";
import { Bell, Check, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";

export function ComingSoonCard() {
  const locale = useLocale();
  const isHi = locale === "hi";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <div className="rounded-3xl border border-saffron/30 bg-gradient-to-r from-cream via-amber-50/50 to-cream p-6 shadow-2xs">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron-deep">
            <Sparkles className="h-3.5 w-3.5" /> {isHi ? "शीघ्र उपलब्ध" : "Coming Soon"}
          </div>
          <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">
            {isHi
              ? "व्यक्तिगत एकादशी एवं व्रत की सूचनाएं"
              : "Personalized Ekadashi & Vrat Notifications"}
          </h3>
          <p className="text-xs leading-relaxed text-muted sm:text-sm">
            {isHi
              ? "कभी भी कोई एकादशी व्रत, प्रदोष अथवा शुभ मुहूर्त न भूलें। अपने शहर और इष्टदेव के अनुसार समय पर व्हाट्सएप एवं कैलेंडर अलर्ट प्राप्त करें।"
              : "Never miss an Ekadashi fast, Pradosh Vrat, or auspicious Muhurat. Get timely WhatsApp and calendar alerts tailored to your city and chosen deities."}
          </p>
        </div>

        {/* Subscribe Form */}
        <div className="w-full max-w-sm">
          {subscribed ? (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>{isHi ? "धन्यवाद! आपको सबसे पहले सूचना प्राप्त होगी।" : "Thank you! You will be the first to get early access."}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isHi ? "अपना ईमेल दर्ज करें" : "Enter your email"}
                className="w-full rounded-2xl border border-line bg-white px-4 py-2.5 text-xs text-ink shadow-xs focus:border-saffron focus:outline-hidden sm:text-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-2xl bg-saffron px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-saffron-deep active:scale-95 sm:text-sm"
              >
                {isHi ? "सूचित करें" : "Notify Me"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

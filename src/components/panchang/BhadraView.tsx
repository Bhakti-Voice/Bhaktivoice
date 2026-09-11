"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Flame,
  Clock,
  Sparkles,
  Info,
  XCircle,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { getBhadraInfo, type BhadraInfo } from "@/lib/panchang/bhadra";
import { useLocale } from "@/lib/i18n/client";

export function BhadraView() {
  const locale = useLocale();
  const isHi = locale === "hi";

  const [copied, setCopied] = useState(false);
  const now = useMemo(() => new Date(), []);
  const bhadraInfo: BhadraInfo = useMemo(() => getBhadraInfo(now), [now]);

  const formatTime = (d: Date | null | undefined) => {
    if (!d) return "--:--";
    return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  const handleShare = () => {
    const text = isHi
      ? `🕉️ भद्रा विचार — BhaktiVoice\n\n• आज भद्रा स्थिति: ${bhadraInfo.isActive ? `सक्रिय (${bhadraInfo.residenceHi})` : "भद्रा नहीं है (मांगलिक कार्य हेतु अनुकूल)"}\n• भद्रा वास: ${bhadraInfo.residenceHi}\n• चंद्र राशि: ${bhadraInfo.moonSignHi}\n\nसम्पूर्ण भद्रा काल, मुख-पुच्छ व रक्षाबंधन नियम BhaktiVoice.com पर देखें।`
      : `🕉️ Bhadra Status — BhaktiVoice\n\n• Today's Status: ${bhadraInfo.isActive ? `Active (${bhadraInfo.residenceEn})` : "No Bhadra Active"}\n• Residence: ${bhadraInfo.residenceEn}\n• Moon Sign: ${bhadraInfo.moonSign}\n\nCheck full Bhadra timings, Mukha-Puchha & festival rules on BhaktiVoice.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Real-time Bhadra Status Banner */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition ${
          bhadraInfo.isMaleficOnEarth && bhadraInfo.isActive
            ? "border-rose-300 bg-gradient-to-br from-rose-50 via-white to-rose-50/50"
            : bhadraInfo.isActive
            ? "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/50"
            : "border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50"
        }`}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                bhadraInfo.isMaleficOnEarth && bhadraInfo.isActive
                  ? "bg-rose-600 text-white"
                  : bhadraInfo.isActive
                  ? "bg-amber-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {bhadraInfo.isMaleficOnEarth && bhadraInfo.isActive ? (
                <Flame className="h-7 w-7 animate-pulse" />
              ) : bhadraInfo.isActive ? (
                <AlertTriangle className="h-7 w-7" />
              ) : (
                <ShieldCheck className="h-7 w-7" />
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {isHi ? "वर्तमान भद्रा स्थिति" : "Current Bhadra Status"}
                </span>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                    bhadraInfo.isMaleficOnEarth && bhadraInfo.isActive
                      ? "bg-rose-200 text-rose-900"
                      : bhadraInfo.isActive
                      ? "bg-amber-200 text-amber-900"
                      : "bg-emerald-200 text-emerald-900"
                  }`}
                >
                  {bhadraInfo.isActive
                    ? isHi
                      ? `भद्रा सक्रिय है (${bhadraInfo.residenceHi})`
                      : `Bhadra is Active (${bhadraInfo.residenceEn})`
                    : isHi
                    ? "आज भद्रा नहीं है (शुभ)"
                    : "No Bhadra Active (Safe)"}
                </span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">
                {bhadraInfo.isActive
                  ? isHi
                    ? `भद्रा वास: ${bhadraInfo.residenceHi}`
                    : `Bhadra Residence: ${bhadraInfo.residenceEn}`
                  : isHi
                  ? "मांगलिक कार्य हेतु निर्दोष समय"
                  : "All Auspicious Works Permitted"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {isHi ? bhadraInfo.guidanceHi : bhadraInfo.guidanceEn}
              </p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-2xs hover:bg-sand/30"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy Status")}
          </button>
        </div>

        {/* Timings & Residence Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line/60 pt-5 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "भद्रा आरंभ" : "Bhadra Starts"}</span>
            <div className="font-serif text-sm font-bold text-ink">{formatTime(bhadraInfo.start)}</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "भद्रा समाप्ति" : "Bhadra Ends"}</span>
            <div className="font-serif text-sm font-bold text-ink">{formatTime(bhadraInfo.end)}</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "भद्रा पुच्छ (पुच्छ काल)" : "Bhadra Puchha (Tail)"}</span>
            <div className="font-serif text-sm font-bold text-emerald-700">
              {formatTime(bhadraInfo.puchhaStart)} - {formatTime(bhadraInfo.puchhaEnd)}
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-3.5 border border-line/60">
            <span className="text-[11px] font-medium text-muted">{isHi ? "भद्रा मुख (वर्जित)" : "Bhadra Mukha (Mouth)"}</span>
            <div className="font-serif text-sm font-bold text-rose-700">
              {formatTime(bhadraInfo.mukhaStart)} - {formatTime(bhadraInfo.mukhaEnd)}
            </div>
          </div>
        </div>
      </div>

      {/* Classical Doctrine of Bhadra Vaas (3 Lokas) */}
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            {isHi ? "भद्रा वास का शास्त्रीय नियम (स्वर्ग, पृथ्वी एवं पाताल)" : "Classical Doctrine of Bhadra Vaas (Residence)"}
          </h2>
          <p className="text-xs text-muted mt-1">
            {isHi
              ? "मुहूर्त चिंतामणि अनुसार चंद्रमा की राशि तय करती है कि भद्रा का वास किस लोक में है"
              : "According to Muhurta Chintamani, the Moon's zodiac position dictates where Bhadra resides"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-1.5 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              {isHi ? "1. स्वर्ग लोक वास (शुभ)" : "1. Swarga Loka (Heaven)"}
            </div>
            <h3 className="font-serif text-base font-bold text-emerald-950 mt-1">
              {isHi ? "मेष, वृषभ, मिथुन, वृश्चिक" : "Aries, Taurus, Gemini, Scorpio"}
            </h3>
            <p className="mt-2 text-xs text-emerald-900 leading-relaxed">
              {isHi
                ? "जब चंद्रमा इन राशियों में होता है, तो भद्रा स्वर्ग में निवास करती है। इसका विष स्वर्ग में ही रहता है, अतः पृथ्वी पर किए जाने वाले सभी शुभ व मांगलिक कार्य निर्दोष माने जाते हैं।"
                : "When the Moon transits these signs, Bhadra resides in heaven. Its sting remains in the celestial realm, leaving earthly rituals unhindered and auspicious."}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4">
            <div className="flex items-center gap-1.5 text-rose-900 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-4 w-4 text-rose-600" />
              {isHi ? "2. पृथ्वी लोक वास (अति अशुभ)" : "2. Prithvi Loka (Earth — Severe)"}
            </div>
            <h3 className="font-serif text-base font-bold text-rose-950 mt-1">
              {isHi ? "कर्क, सिंह, कन्या, तुला" : "Cancer, Leo, Virgo, Libra"}
            </h3>
            <p className="mt-2 text-xs text-rose-900 leading-relaxed">
              {isHi
                ? "जब चंद्रमा इन राशियों में होता है, तो भद्रा मृत्युलोक (पृथ्वी) पर निवास करती है। यह सर्वाधिक अमंगलकारी अवस्था है। इसमें राखी बांधना, होलिका दहन, विवाह व गृह प्रवेश सर्वथा वर्जित हैं।"
                : "When Moon transits these signs, Bhadra walks directly on Earth. This is the most malefic state. Raksha Bandhan, Holika Dahan, Vivah, and Griha Pravesh are strictly forbidden."}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4">
            <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Info className="h-4 w-4 text-amber-600" />
              {isHi ? "3. पाताल लोक वास (धनप्रद)" : "3. Patala Loka (Netherworld)"}
            </div>
            <h3 className="font-serif text-base font-bold text-amber-950 mt-1">
              {isHi ? "धनु, मकर, कुंभ, मीन" : "Sagittarius, Capricorn, Aquarius, Pisces"}
            </h3>
            <p className="mt-2 text-xs text-amber-900 leading-relaxed">
              {isHi
                ? "जब चंद्रमा इन राशियों में होता है, तो भद्रा पाताल में रहती है। पाताल वासिनी भद्रा पृथ्वी वासियों के लिए धन-धान्य की वृद्धि एवं व्यापारिक सौदों में विजय प्रदान करने वाली कही गई है।"
                : "When Moon transits these signs, Bhadra resides in the netherworld. Classical scriptures state that Patala Bhadra brings commercial growth and material wealth on Earth."}
            </p>
          </div>
        </div>
      </div>

      {/* Bhadra Mukha vs Puchha & Festival Rules */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-ink">
            {isHi ? "भद्रा मुख एवं भद्रा पुच्छ का रहस्य" : "Bhadra Mukha vs Bhadra Puchha"}
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            {isHi
              ? "भद्रा के मुख भाग में समस्त विघ्न और विनाश का वास होता है, अतः मुख काल (आरंभ की 5 घटियां) में कोई भी कार्य करना सर्वनाशकारी माना गया है। इसके विपरीत भद्रा के पुच्छ भाग (अंतिम 3 घटियां) में विजय और सिद्धि का वास होता है। अपरिहार्य परिस्थितियों में भद्रा पुच्छ काल में शुभ कार्य किए जा सकते हैं।"
              : "The jaws (Mukha) of Bhadra embody destruction and failure; initiating any ritual during Bhadra Mukha is strictly prohibited. Conversely, the tail (Puchha) carries the blessing of completion. In inevitable emergencies, rituals may be conducted during Bhadra Puchha."}
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-ink">
            {isHi ? "रक्षाबंधन एवं होलिका दहन में भद्रा का महत्व" : "Bhadra in Raksha Bandhan & Holika Dahan"}
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            {isHi
              ? "पौराणिक मान्यता है कि लंकापति रावण की बहन शूर्पणखा ने भद्रा काल में ही रावण को रक्षासूत्र बांधा था, जिससे रावण के कुल का विनाश हुआ। इसलिए रक्षाबंधन पर भद्रा समाप्ति के उपरांत ही राखी बांधी जाती है। इसी प्रकार फाल्गुन पूर्णिमा को प्रदोष काल में भद्रा रहित समय में ही होलिका दहन का विधान है।"
              : "Ancient lore recounts that Surpanakha tied a protective amulet (Rakhi) to King Ravana during Bhadra, which precipitated the downfall of his entire dynasty. Hence, Raksha Bandhan is solemnized only after Bhadra concludes. Similarly, Holika Dahan requires a Bhadra-free Pradosh Kaal."}
          </p>
        </div>
      </div>
    </div>
  );
}

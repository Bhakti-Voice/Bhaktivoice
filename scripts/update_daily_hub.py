import re

code = '''"use client";

import { useMemo, useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ArrowRight, Calendar as CalendarIcon, Clock, Sparkles, Sun } from "lucide-react";
import type { HomeVedicData } from "@/lib/panchang/home-vedic-data";
import { PATHS } from "@/lib/seo/paths";

interface HomeDailyVedicHubProps {
  locale: string;
  data: HomeVedicData;
}

const RASHI_NAMES_TE: Record<string, string> = {
  aries: "మేషం",
  taurus: "వృషభం",
  gemini: "మిథునం",
  cancer: "కర్కాటకం",
  leo: "సింహం",
  virgo: "కన్య",
  libra: "తుల",
  scorpio: "వృశ్చికం",
  sagittarius: "ధనుస్సు",
  capricorn: "మకరం",
  aquarius: "కుంభం",
  pisces: "మీనం",
};

const RASHI_RULER_TE: Record<string, string> = {
  aries: "కుజుడు",
  taurus: "శుక్రుడు",
  gemini: "బుధుడు",
  cancer: "చంద్రుడు",
  leo: "సూర్యుడు",
  virgo: "బుధుడు",
  libra: "శుక్రుడు",
  scorpio: "కుజుడు",
  sagittarius: "గురుడు",
  capricorn: "శని",
  aquarius: "శని",
  pisces: "గురుడు",
};

export function HomeDailyVedicHub({ locale, data }: HomeDailyVedicHubProps) {
  const isHi = locale === "hi";
  const isTe = locale === "te";
  const { panchang, days, rashifalList, formattedToday, monthLabel, upcomingObservances } = data;

  // Selected Rashi state (defaults to Aries or based on current moon sign)
  const [selectedRashiId, setSelectedRashiId] = useState<string>("aries");
  const selectedRashi = useMemo(
    () => rashifalList.find((r) => r.id === selectedRashiId) || rashifalList[0],
    [rashifalList, selectedRashiId],
  );

  const weekdaysShort = isTe
    ? ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"]
    : isHi
    ? ["रवि", "सोम", "मं", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end border-b border-line/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-saffron animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-maroon">
              {isTe ? "దిన వైదిక మార్గదర్శనం" : isHi ? "दैनिक वैदिक मार्गदर्शन" : "Daily Vedic Wisdom"}
            </span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {isTe
              ? "నేటి పంచాంగం • క్యాలెండర్ • రాశిఫలాలు"
              : isHi
              ? "आज का पञ्चाङ्ग • कैलेंडर • राशिफल"
              : "Today's Panchang • Calendar • Horoscope"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            {isTe
              ? "ఖచ్చితమైన దిన పంచాంగం, చంద్ర క్యాలెండర్ మరియు 12 రాశుల దిన భవిష్యత్తు"
              : isHi
              ? "सटीक दैनिक वैदिक पंचांग, मासिक चंद्र कैलेंडर एवं १२ राशियों का दैनिक भविष्यफल"
              : "Live daily updated Vedic Panchang, lunar calendar timings & 12 Rashi forecasts"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-saffron-deep bg-saffron/10 px-3 py-1.5 rounded-full w-fit">
          <Clock className="h-3.5 w-3.5" />
          <span>{formattedToday}</span>
        </div>
      </div>

      {/* 3-Card Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* CARD 1: आज का पञ्चाङ्ग (Today's Panchang) */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#eedec9] bg-[#fffbf6] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div>
            {/* Header pill */}
            <div className="flex items-center justify-between border-b border-line/70 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/15 text-saffron-deep">
                  <Sun className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                    {isTe ? "నేటి పంచాంగం" : isHi ? "आज का पञ्चाङ्ग" : "Today's Panchang"}
                  </h3>
                  <p className="text-xs text-muted">
                    {panchang.masaPurnimantaHi} • {isTe ? `సంవత్సరం ${panchang.vikramSamvat}` : isHi ? `संवत ${panchang.vikramSamvat}` : `Samvat ${panchang.vikramSamvat}`}
                  </p>
                </div>
              </div>
              <LocaleLink
                href={PATHS.panchangToday}
                className="text-xs sm:text-sm font-bold text-saffron-deep hover:underline"
              >
                {isTe ? "వివరాలు →" : isHi ? "विस्तार →" : "Details →"}
              </LocaleLink>
            </div>

            {/* Panchang Grid Tiles */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
              <div className="rounded-xl border border-[#edd8c4] bg-[#fdf8f0] p-3">
                <span className="block text-[11px] uppercase font-bold text-muted">
                  {isTe ? "తిథి" : isHi ? "तिथि" : "Tithi"}
                </span>
                <span className="mt-0.5 block font-bold text-ink text-sm sm:text-base truncate">
                  {isTe ? panchang.tithiNameHi : isHi ? panchang.tithiNameHi : panchang.tithiName}
                </span>
                <span className="text-xs text-muted truncate block">
                  {panchang.paksha === "shukla"
                    ? isTe
                      ? "శుక్ల పక్షం"
                      : isHi
                      ? "शुक्ल पक्ष"
                      : "Shukla"
                    : isTe
                    ? "కృష్ణ పక్షం"
                    : isHi
                    ? "कृष्ण पक्ष"
                    : "Krishna"}
                </span>
              </div>

              <div className="rounded-xl border border-[#edd8c4] bg-[#fdf8f0] p-3">
                <span className="block text-[11px] uppercase font-bold text-muted">
                  {isTe ? "నక్షత్రం" : isHi ? "नक्षत्र" : "Nakshatra"}
                </span>
                <span className="mt-0.5 block font-bold text-ink text-sm sm:text-base truncate">
                  {isTe ? panchang.nakshatraNameHi : isHi ? panchang.nakshatraNameHi : panchang.nakshatraName}
                </span>
                <span className="text-xs text-muted block">
                  {isTe
                    ? `పాదం ${panchang.nakshatraPada}`
                    : isHi
                    ? `पाद ${panchang.nakshatraPada}`
                    : `Pada ${panchang.nakshatraPada}`}
                </span>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                <span className="block text-[11px] uppercase font-bold text-emerald-800">
                  {isTe ? "శుభ ముహూర్తం (అభిజిత్)" : isHi ? "शुभ मुहूर्त (अभिजित)" : "Abhijit Muhurat"}
                </span>
                <span className="mt-0.5 block font-bold text-emerald-950 text-sm sm:text-base truncate">
                  {panchang.abhijitTime
                    ? panchang.abhijitTime
                    : isTe
                    ? "ఈరోజు లేదు"
                    : isHi
                    ? "बुधवार परिहार"
                    : "None Today"}
                </span>
                <span className="text-xs text-emerald-700">
                  {isTe ? "శ్రేష్ఠమైన శుభ సమయం" : isHi ? "श्रेष्ठ शुभ समय" : "Most Auspicious"}
                </span>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3">
                <span className="block text-[11px] uppercase font-bold text-rose-800">
                  {isTe ? "రాహు కాలం (అశుభం)" : isHi ? "राहु काल (अशुभ)" : "Rahu Kaal"}
                </span>
                <span className="mt-0.5 block font-bold text-rose-950 text-sm sm:text-base truncate">
                  {panchang.rahuKaalTime}
                </span>
                <span className="text-xs text-rose-700">
                  {isTe ? "శుభ కార్యాలు నిషిద్ధం" : isHi ? "शुभ कार्य वर्जित" : "Avoid Key Work"}
                </span>
              </div>
            </div>

            {/* Sunrise / Sunset & Yoga */}
            <div className="mt-3.5 flex items-center justify-between rounded-xl bg-sand/60 px-3.5 py-2.5 text-xs sm:text-sm text-ink">
              <div className="flex items-center gap-1.5 font-medium">
                <Sun className="h-4 w-4 text-saffron" />
                <span>{panchang.sunTimes}</span>
              </div>
              <div className="text-muted truncate">
                {isTe ? panchang.yogaNameHi : isHi ? panchang.yogaNameHi : panchang.yogaName} •{" "}
                {isTe ? panchang.karanaNameHi : isHi ? panchang.karanaNameHi : panchang.karanaName}
              </div>
            </div>

            {/* Quick Micro-Muhurat Badges */}
            <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
              <LocaleLink
                href={PATHS.choghadiya}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 transition"
              >
                <Clock className="h-3 w-3 text-amber-700" />
                <span>{isTe ? "నేటి చోఘడియా" : isHi ? "आज का चौघड़िया" : "Choghadiya"}</span>
              </LocaleLink>
              <LocaleLink
                href={PATHS.hora}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 transition"
              >
                <Sparkles className="h-3 w-3 text-amber-700" />
                <span>{isTe ? "గ్రహ హోరా" : isHi ? "ग्रह होरा" : "Planetary Hora"}</span>
              </LocaleLink>
              <LocaleLink
                href={PATHS.panchak}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/80 px-2 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 transition"
              >
                <span>{isTe ? "పంచకం" : isHi ? "पंचक" : "Panchak"}</span>
              </LocaleLink>
              <LocaleLink
                href={PATHS.bhadra}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/80 px-2 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 transition"
              >
                <span>{isTe ? "భద్రా" : isHi ? "भद्रा" : "Bhadra"}</span>
              </LocaleLink>
            </div>
          </div>

          {/* Card Links */}
          <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between gap-2">
            <LocaleLink
              href={PATHS.panchangToday}
              className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-saffron-deep transition-colors"
            >
              <span>{isTe ? "సంపూర్ణ పంచాంగం" : isHi ? "सम्पूर्ण पंचांग" : "Full Panchang"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </LocaleLink>
            <LocaleLink
              href={PATHS.muhurat}
              className="text-xs sm:text-sm font-semibold text-muted hover:text-maroon transition-colors"
            >
              {isTe ? "ముహూర్తాలు & చోఘడియా →" : isHi ? "मुहूर्त व चौघड़िया →" : "All Muhurats →"}
            </LocaleLink>
          </div>
        </div>

        {/* CARD 2: हिन्दू कैलेंडर (Hindu Calendar & Month Grid) */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#eedec9] bg-[#fffbf6] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div>
            {/* Header pill */}
            <div className="flex items-center justify-between border-b border-line/70 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-800">
                  <CalendarIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                    {isTe ? "హిందూ క్యాలెండర్" : isHi ? "हिन्दू कैलेंडर" : "Hindu Calendar"}
                  </h3>
                  <p className="text-xs text-muted">{monthLabel}</p>
                </div>
              </div>
              <LocaleLink
                href={PATHS.calendar}
                className="text-xs sm:text-sm font-bold text-saffron-deep hover:underline"
              >
                {isTe ? "క్యాలెండర్ →" : isHi ? "कैलेंडर →" : "Calendar →"}
              </LocaleLink>
            </div>

            {/* Mini Calendar 7-Column Grid */}
            <div className="mt-3.5">
              {/* Weekday labels */}
              <div className="grid grid-cols-7 text-center text-xs font-bold text-muted pb-1.5">
                {weekdaysShort.map((w, i) => (
                  <div key={i} className={i === 0 ? "text-rose-600" : ""}>
                    {w}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                {days.map((day, idx) => {
                  const isCurrentDay = day.isCurrentMonth && day.isToday;

                  return (
                    <div
                      key={idx}
                      className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
                        isCurrentDay
                          ? "bg-saffron text-white font-bold shadow-xs"
                          : day.isCurrentMonth
                          ? "text-ink hover:bg-[#fae7cf]/60"
                          : "text-muted/40"
                      }`}
                      title={day.observanceTitle}
                    >
                      <span className="leading-none">{day.dayNumber}</span>
                      {/* Event dot */}
                      {day.hasFast && !isCurrentDay && (
                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming fasts/festivals preview */}
            {upcomingObservances.length > 0 && (
              <div className="mt-3.5 rounded-xl bg-[#fbf3e7] p-2.5 text-xs sm:text-sm border border-[#edd8c4]">
                <span className="block text-xs font-bold text-maroon uppercase tracking-wider mb-1">
                  {isTe ? "రాబోయే ముఖ్య వ్రతాలు & పండుగలు" : isHi ? "आगामी प्रमुख व्रत व पर्व" : "Upcoming Sacred Days"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {upcomingObservances.map((obs, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-ink border border-line"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {obs.dateNumber} {isTe ? "తేదీ" : isHi ? "तारीख" : "th"}: {obs.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card Links */}
          <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between gap-2">
            <LocaleLink
              href={PATHS.calendar}
              className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-saffron-deep transition-colors"
            >
              <span>{isTe ? "సంపూర్ణ క్యాలెండర్" : isHi ? "सम्पूर्ण कैलेंडर" : "Full Calendar"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </LocaleLink>
            <LocaleLink
              href={PATHS.vratUpavas}
              className="text-xs sm:text-sm font-semibold text-muted hover:text-maroon transition-colors"
            >
              {isTe ? "వ్రతాలు & ఉపవాసాల జాబితా →" : isHi ? "व्रत व उपवास सूची →" : "All Vrats →"}
            </LocaleLink>
          </div>
        </div>

        {/* CARD 3: आज का राशिफल (Today's Rashifal) */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#eedec9] bg-[#fffbf6] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div>
            {/* Header pill */}
            <div className="flex items-center justify-between border-b border-line/70 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-900">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                    {isTe ? "నేటి రాశిఫలాలు" : isHi ? "आज का राशिफल" : "Today's Horoscope"}
                  </h3>
                  <p className="text-xs text-muted">
                    {isTe ? "దిన గ్రహ గోచార ఫలితాలు" : isHi ? "दैनिक ग्रह गोचर फल" : "Daily Planetary Guidance"}
                  </p>
                </div>
              </div>
              <LocaleLink
                href={PATHS.kundli}
                className="text-xs sm:text-sm font-bold text-saffron-deep hover:underline"
              >
                {isTe ? "కుండలి →" : isHi ? "कुंडली →" : "Kundli →"}
              </LocaleLink>
            </div>

            {/* 12 Rashi Interactive Chips */}
            <div className="mt-3.5">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
                {isTe ? "మీ రాశిని ఎంచుకోండి:" : isHi ? "अपनी राशि चुनें:" : "Select your Rashi:"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {rashifalList.map((rashi) => {
                  const isSelected = rashi.id === selectedRashi.id;
                  const rashiName = isTe ? RASHI_NAMES_TE[rashi.id] || rashi.nameHi : isHi ? rashi.nameHi : rashi.nameEn;
                  return (
                    <button
                      key={rashi.id}
                      type="button"
                      onClick={() => setSelectedRashiId(rashi.id)}
                      className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs sm:text-[13px] font-semibold transition-all duration-150 border ${
                        isSelected
                          ? "bg-maroon border-maroon text-white shadow-xs"
                          : "bg-[#fbf3e7] border-[#edd8c4] text-ink hover:bg-[#fae7cf] hover:border-saffron"
                      }`}
                    >
                      <span>{rashi.symbol} </span>
                      <span>{rashiName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Forecast for Selected Rashi */}
            <div className="mt-3.5 rounded-2xl bg-[#fdf8f0] border border-[#edd8c4] p-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-line/60 pb-2 mb-2">
                <span className="font-serif font-bold text-ink text-sm sm:text-base">
                  {selectedRashi.symbol} {isTe ? RASHI_NAMES_TE[selectedRashi.id] || selectedRashi.nameHi : isHi ? selectedRashi.nameHi : selectedRashi.nameEn}
                  <span className="text-xs font-normal text-muted ml-1.5">
                    ({isTe ? `అధిపతి: ${RASHI_RULER_TE[selectedRashi.id] || selectedRashi.rulerHi}` : isHi ? `स्वामी: ${selectedRashi.rulerHi}` : `Ruler: ${selectedRashi.rulerEn}`})
                  </span>
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                    {isTe ? `సంఖ్య: ${selectedRashi.luckyNumber}` : isHi ? `अंक: ${selectedRashi.luckyNumber}` : `No: ${selectedRashi.luckyNumber}`}
                  </span>
                  <span className="bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full font-bold truncate max-w-[110px]">
                    {isTe ? selectedRashi.luckyColorHi : isHi ? selectedRashi.luckyColorHi : selectedRashi.luckyColorEn}
                  </span>
                </div>
              </div>

              <p className="text-ink/80 leading-relaxed text-xs sm:text-sm">
                {isTe ? selectedRashi.predictionHi : isHi ? selectedRashi.predictionHi : selectedRashi.predictionEn}
              </p>

              {/* Remedy / Mantra */}
              <div className="mt-2.5 pt-2 border-t border-line/50 text-xs sm:text-sm text-maroon flex items-center gap-1.5">
                <span className="font-bold shrink-0">{isTe ? "పరిహారం:" : isHi ? "उपाय:" : "Remedy:"}</span>
                <span className="truncate text-ink/80">{isTe ? selectedRashi.remedyHi : isHi ? selectedRashi.remedyHi : selectedRashi.remedyEn}</span>
              </div>
            </div>
          </div>

          {/* Card Links */}
          <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between gap-2">
            <LocaleLink
              href={PATHS.kundli}
              className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-saffron-deep transition-colors"
            >
              <span>{isTe ? "ఉచిత జన్మ కుండలి" : isHi ? "मुफ्त जन्म कुंडली" : "Free Kundli"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </LocaleLink>
            <LocaleLink
              href={PATHS.kundliMilan}
              className="text-xs sm:text-sm font-semibold text-muted hover:text-maroon transition-colors"
            >
              {isTe ? "36 గుణాల మిలనం →" : isHi ? "३६ गुण मिलान →" : "Kundli Milan →"}
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

with open('src/components/home/HomeDailyVedicHub.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("HomeDailyVedicHub.tsx updated successfully!")

"use client";

import React from "react";
import { Printer, X } from "lucide-react";
import type { MilanResult } from "@/lib/spiritual-tools/types";
import { KundliChartSvg } from "./KundliChartSvg";
import { useLocale } from "@/lib/i18n/client";

export interface PrintableMilanReportProps {
  result: MilanResult;
  onClose?: () => void;
}

export function PrintableMilanReport({ result, onClose }: PrintableMilanReportProps) {
  const locale = useLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      {/* Print Trigger & Close Action Header (Hidden in print) */}
      <div className="fixed top-4 right-4 z-60 flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-2xl bg-[#d9531e] px-5 py-2.5 font-serif text-sm font-bold text-white shadow-lg transition hover:bg-[#b43d10] active:scale-95"
        >
          <Printer className="h-4 w-4" />
          <span>{isTe ? "ప్రింట్ / PDF సేవ్ చేయండి" : isHi ? "प्रिंट / PDF सेव करें" : "Print / Save as PDF"}</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-stone-800 shadow-md transition hover:bg-white active:scale-95"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Printable Paper Canvas (A4 Styled) */}
      <div className="relative my-8 w-full max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-2xl print:m-0 print:w-full print:max-w-none print:p-6 print:shadow-none border border-[#ecdac8]">
        {/* Sacred Vedic Header */}
        <div className="text-center border-b-2 border-[#d9531e]/40 pb-4">
          <div className="font-serif text-xl font-bold tracking-wider text-[#9a3412]">
            ॥ श्री गणेशाय नमः ॥
          </div>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812]">
            {isTe
              ? "వైదిక అష్టకూట వివాహ పొంతన నివేదిక"
              : isHi
              ? "वैदिक अष्टकूट विवाह मिलान पत्रिका"
              : "Vedic Ashtakoot Marriage Compatibility Report"}
          </h2>
          <p className="text-xs text-stone-500 font-medium">
            {isTe
              ? "36 గుణాలు, నాడీ & భకూట్ దోష పరిహారం మరియు మాంగ్లిక్ సామరస్య సమగ్ర విశ్లేషణ"
              : isHi
              ? "महर्षि पराशर 36 गुण, नाड़ी-भकूट परिहार एवं मांगलिक सामंजस्य विश्लेषण"
              : "36 Gunas, Nadi & Bhakoot Cancellation, and Manglik Harmony Assessment"}
          </p>
        </div>

        {/* Score Summary Box */}
        <div className="mt-6 rounded-2xl border border-[#ecdac8] bg-[#fffdfa] p-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
            <div>
              <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">
                {isHi ? "कुल प्राप्त गुण" : "Total Gunas Obtained"}
              </span>
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#c2410c]">
                {result.total} <span className="text-base text-stone-400 font-normal">/ 36</span>
              </span>
              <span className="block text-xs font-semibold text-stone-600 mt-0.5">
                ({result.percentage}% {isHi ? "अनुकूलता" : "Compatibility"})
              </span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-[#ecdac8] sm:pl-6 text-left">
              <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">
                {isHi ? "ज्योतिषीय निष्कर्ष" : "Astrological Verdict"}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1812] mt-0.5">
                {isHi ? result.verdictHi : result.verdict}
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-md leading-relaxed">
                {isHi ? result.verdictSummaryHi : result.verdictSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Groom & Bride Comparison */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Groom */}
          <div className="rounded-2xl border border-[#ecdac8] bg-[#fffcf7] p-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] pb-1 border-b border-[#ecdac8]/60 mb-2">
              {isTe ? "వరుడి వివరాలు" : isHi ? "वर विवरण (Groom)" : "Groom's Details"}
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "नाम:" : "Name:"}</span>
                <strong className="font-serif text-[#3b1812]">{result.boy.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "जन्म विवरण:" : "Birth:"}</span>
                <strong className="font-mono text-stone-800">{result.boy.birthDate} {result.boy.birthTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "जन्म स्थान:" : "Place:"}</span>
                <strong className="text-stone-800">{result.boy.place.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "लग्न:" : "Lagna:"}</span>
                <strong className="text-[#c2410c]">{isHi ? result.boy.lagna.rashiHi : result.boy.lagna.rashi}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "चन्द्र राशि:" : "Moon Sign:"}</span>
                <strong className="text-stone-800">{isHi ? result.boy.moon.rashiHi : result.boy.moon.rashi}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "नक्षत्र:" : "Nakshatra:"}</span>
                <strong className="text-stone-800">{isHi ? result.boy.moon.nakshatraHi : result.boy.moon.nakshatra} (P{result.boy.moon.pada})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "मांगलिक स्थिति:" : "Manglik:"}</span>
                <strong className={result.boy.manglik.isManglik ? "text-rose-700" : "text-emerald-700"}>
                  {isHi ? result.boy.manglik.levelHi : result.boy.manglik.level}
                </strong>
              </div>
            </div>
          </div>

          {/* Bride */}
          <div className="rounded-2xl border border-rose-200 bg-[#fff9fa] p-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-rose-700 pb-1 border-b border-rose-200/60 mb-2">
              {isTe ? "వధువు వివరాలు" : isHi ? "कन्या विवरण (Bride)" : "Bride's Details"}
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "नाम:" : "Name:"}</span>
                <strong className="font-serif text-[#3b1812]">{result.girl.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "जन्म विवरण:" : "Birth:"}</span>
                <strong className="font-mono text-stone-800">{result.girl.birthDate} {result.girl.birthTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "जन्म स्थान:" : "Place:"}</span>
                <strong className="text-stone-800">{result.girl.place.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "लग्न:" : "Lagna:"}</span>
                <strong className="text-[#c2410c]">{isHi ? result.girl.lagna.rashiHi : result.girl.lagna.rashi}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "चन्द्र राशि:" : "Moon Sign:"}</span>
                <strong className="text-stone-800">{isHi ? result.girl.moon.rashiHi : result.girl.moon.rashi}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "नक्षत्र:" : "Nakshatra:"}</span>
                <strong className="text-stone-800">{isHi ? result.girl.moon.nakshatraHi : result.girl.moon.nakshatra} (P{result.girl.moon.pada})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isHi ? "मांगलिक स्थिति:" : "Manglik:"}</span>
                <strong className={result.girl.manglik.isManglik ? "text-rose-700" : "text-emerald-700"}>
                  {isHi ? result.girl.manglik.levelHi : result.girl.manglik.level}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* 36 Gunas Detailed Table */}
        <div className="mt-6 rounded-2xl border border-[#ecdac8] bg-white p-4">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#9a3412] pb-1 border-b border-[#ecdac8]/60 mb-2">
            {isTe ? "అష్టకూట 8 గుణాల విశ్లేషణ" : isHi ? "अष्टकूट 8 गुण तालिका" : "Ashtakoot 8-Factor Compatibility Matrix"}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#ecdac8] bg-[#fff7ed] text-[11px] font-bold text-stone-700">
                <tr>
                  <th className="p-2">{isHi ? "कूट (Guna)" : "Guna"}</th>
                  <th className="p-2">{isHi ? "वर (Groom)" : "Groom"}</th>
                  <th className="p-2">{isHi ? "कन्या (Bride)" : "Bride"}</th>
                  <th className="p-2">{isHi ? "प्राप्त / अधिकतम" : "Score / Max"}</th>
                  <th className="p-2">{isHi ? "विवरण व प्रभाव" : "Significance"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ecdac8]/60">
                {result.gunas.map((g) => (
                  <tr key={g.id}>
                    <td className="p-2 font-bold text-stone-900">{isHi ? g.nameHi : g.name}</td>
                    <td className="p-2 text-stone-700">{isHi ? g.boyValueHi : g.boyValue}</td>
                    <td className="p-2 text-stone-700">{isHi ? g.girlValueHi : g.girlValue}</td>
                    <td className="p-2 font-mono font-bold text-[#c2410c]">
                      {g.score} / {g.max}
                    </td>
                    <td className="p-2 text-[11px] text-stone-600">{isHi ? g.detailHi : g.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classical Charts Side-by-Side */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="rounded-2xl border border-[#ecdac8] bg-white p-3">
            <h5 className="font-serif text-xs font-bold text-stone-900 mb-2">
              {isHi ? "वर कुण्डली (D-1 Lagna)" : "Groom Lagna Chart (D-1)"}
            </h5>
            <div className="mx-auto max-w-[220px]">
              <KundliChartSvg chart={result.boy} />
            </div>
          </div>

          <div className="rounded-2xl border border-[#ecdac8] bg-white p-3">
            <h5 className="font-serif text-xs font-bold text-stone-900 mb-2">
              {isHi ? "कन्या कुण्डली (D-1 Lagna)" : "Bride Lagna Chart (D-1)"}
            </h5>
            <div className="mx-auto max-w-[220px]">
              <KundliChartSvg chart={result.girl} />
            </div>
          </div>
        </div>

        {/* Classical Footer */}
        <div className="mt-8 border-t border-[#ecdac8] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <div>
            {isTe
              ? "భక్తి వాయిస్ — BhaktiVoice.com ద్వారా రూపొందించబడిన ప్రామాణిక వైదిక వివాహ మిలనం"
              : isHi
              ? "भक्ति वॉयस — BhaktiVoice.com द्वारा निर्मित प्रामाणिक वैदिक कुंडली मिलान"
              : "Generated by BhaktiVoice.com — Authentic Vedic Astrology & Matchmaking"}
          </div>
          <div className="font-mono text-[11px] mt-1 sm:mt-0">
            {new Date().toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

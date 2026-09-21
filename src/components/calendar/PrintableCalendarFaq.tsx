"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, MessageSquare, Search } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface PrintableCalendarFaqProps {
  faqs: FaqItem[];
  isHi?: boolean;
  isTe?: boolean;
}

export function PrintableCalendarFaq({
  faqs,
  isHi = false,
  isTe = false,
}: PrintableCalendarFaqProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs based on search input
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const title = isTe
    ? "ప్రింటబుల్ హిందూ క్యాలెండర్ తరచుగా అడిగే ప్రశ్నలు (FAQs)"
    : isHi
    ? "हिन्दू दीवार कैलेंडर से जुड़े मुख्य प्रश्नोत्तर (FAQs)"
    : "Frequently Asked Questions about Printable Hindu Calendar";

  const searchPlaceholder = isTe
    ? "ప్రశ్నలను వెతకండి..."
    : isHi
    ? "प्रश्नोत्तर खोजें..."
    : "Search questions...";

  return (
    <section className="mt-12 pt-8 border-t border-[#ecdac8]/80 print:hidden">
      {/* FAQ Header & Live Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#d9531e]">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
            {title}
          </h2>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-2xl border border-[#ecdac8] bg-white py-2 pl-9.5 pr-4 text-xs sm:text-sm text-stone-800 placeholder-stone-400 shadow-2xs focus:border-[#d9531e] focus:outline-hidden focus:ring-2 focus:ring-[#d9531e]/20 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Responsive FAQ Accordion Grid */}
      {filteredFaqs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ecdac8] p-8 text-center text-sm text-stone-500">
          {isTe
            ? "మీ శోధనకు సంబంధించిన ప్రశ్నలు కనుగొనబడలేదు."
            : isHi
            ? "आपकी खोज के अनुसार कोई प्रश्न नहीं मिला।"
            : "No questions match your search. Try different keywords."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-[#d9531e]/40 shadow-xs ring-1 ring-[#d9531e]/15"
                    : "border-[#ecdac8] hover:border-[#d9531e]/30 shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xs sm:text-[13.5px] font-bold text-[#3b1812] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-orange-100 text-[#d9531e]"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed border-t border-[#ecdac8]/40 mt-1">
                    <p className="pt-2.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

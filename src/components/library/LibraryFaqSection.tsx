"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Sparkles, ArrowRight } from "lucide-react";
import type { Faq } from "@/lib/content/types";
import { faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

interface LibraryFaqSectionProps {
  faqs: Faq[];
  faqTitle: string;
  searchPlaceholder: string;
  sidebarQuote: {
    text: string;
  };
  sidebarCta: {
    title: string;
    description: string;
    buttonText: string;
    tagline: string;
  };
}

export function LibraryFaqSection({
  faqs,
  faqTitle,
  searchPlaceholder,
  sidebarQuote,
  sidebarCta,
}: LibraryFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // In the target mockup, question 6 (index 5) is open by default:
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({
    5: true,
  });

  const toggleAccordion = (idx: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return faqs.map((faq, idx) => ({ faq, originalIndex: idx }));
    }
    return faqs
      .map((faq, idx) => ({ faq, originalIndex: idx }))
      .filter(
        ({ faq }) =>
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q)
      );
  }, [faqs, searchQuery]);

  const handleExploreClick = () => {
    const collectionsElem = document.getElementById("collections");
    if (collectionsElem) {
      collectionsElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-12 sm:mt-16 pt-10 border-t border-[#ebdccb]/70">
      {/* Schema.org FAQPage for Google Crawling & Rich Snippets */}
      <JsonLd data={faqSchema(faqs)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: FAQs (8 columns) */}
        <div className="lg:col-span-8">
          {/* FAQ Header with circle question mark */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#faece1] text-[#c85a24] font-serif font-bold text-base sm:text-lg border border-[#f3d7c4]">
              ?
            </div>
            <h2
              id="faq-heading"
              className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-[#2c1810]"
            >
              {faqTitle}
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#e8dac9] p-8 text-center text-stone-500 bg-[#fdfbf7]">
                No matching questions found. Try a different search term.
              </div>
            ) : (
              filteredFaqs.map(({ faq, originalIndex }) => {
                const isOpen = searchQuery.trim() ? true : !!expandedIndices[originalIndex];

                return (
                  <div
                    key={originalIndex}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-[#e36d23] bg-[#fffaf5] shadow-xs ring-1 ring-[#e36d23]/25"
                        : "border-[#ebdccb] bg-white hover:border-amber-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(originalIndex)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between gap-4 text-left focus:outline-hidden"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-sm sm:text-base font-semibold transition-colors duration-150 ${
                          isOpen ? "text-[#b94e15]" : "text-[#2c1810] hover:text-[#b94e15]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isOpen
                            ? "bg-[#faece1] text-[#c85a24]"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#f2e6d8]">
                        <p className="whitespace-pre-line mt-2">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Sidebar (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full rounded-full border border-[#ebdccb] bg-white pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2c1810] placeholder:text-stone-400 shadow-2xs focus:border-[#e36d23] focus:outline-hidden focus:ring-1 focus:ring-[#e36d23] transition-all"
            />
          </div>

          {/* 2. Spiritual Botanical Quote Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#ebd8c4] bg-gradient-to-b from-[#f8f1e5] to-[#f2e7d7] p-6 sm:p-8 text-center shadow-xs">
            {/* Left Botanical Laurel SVG */}
            <div className="absolute left-1 bottom-3 w-14 h-28 opacity-40 pointer-events-none text-[#9a7e63]">
              <svg viewBox="0 0 40 80" fill="currentColor">
                <path d="M20 75 C18 60 10 40 4 25 C12 28 16 32 17 38 C14 26 22 16 28 8 C26 18 22 26 19 32 C26 28 32 30 36 34 C30 36 24 38 20 45 C25 43 32 46 34 52 C27 52 23 54 21 60 Z" />
              </svg>
            </div>

            {/* Right Botanical Laurel SVG */}
            <div className="absolute right-1 bottom-3 w-14 h-28 opacity-40 pointer-events-none text-[#9a7e63] transform scale-x-[-1]">
              <svg viewBox="0 0 40 80" fill="currentColor">
                <path d="M20 75 C18 60 10 40 4 25 C12 28 16 32 17 38 C14 26 22 16 28 8 C26 18 22 26 19 32 C26 28 32 30 36 34 C30 36 24 38 20 45 C25 43 32 46 34 52 C27 52 23 54 21 60 Z" />
              </svg>
            </div>

            <div className="relative z-10 px-2 py-4">
              <p className="font-serif italic text-lg sm:text-xl lg:text-[21px] font-medium text-[#4a3429] leading-snug">
                {sidebarQuote.text}
              </p>

              {/* Decorative Golden Lotus Divider */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#d8beaa]" />
                <svg
                  className="w-5 h-4 text-[#c87642]"
                  viewBox="0 0 24 20"
                  fill="currentColor"
                >
                  <path d="M12 2 C13 6 15 11 19 14 C15 13 13 15 12 18 C11 15 9 13 5 14 C9 11 11 6 12 2 Z" />
                </svg>
                <div className="h-px w-8 bg-[#d8beaa]" />
              </div>
            </div>
          </div>

          {/* 3. Begin Your Journey Callout Card */}
          <div className="rounded-3xl border border-[#ebdccb] bg-[#fdfbf7] p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faece1] text-[#c85a24]">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c1810]">
                {sidebarCta.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
              {sidebarCta.description}
            </p>

            <button
              type="button"
              onClick={handleExploreClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#e36d23] hover:bg-[#cc5a12] text-white font-semibold py-3 px-6 text-xs sm:text-sm shadow-xs transition-colors group cursor-pointer"
            >
              <span>{sidebarCta.buttonText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-[11px] sm:text-xs text-stone-400 text-center">
              {sidebarCta.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

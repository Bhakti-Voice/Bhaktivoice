"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export interface KundliMilanFaqItem {
  question: string;
  answer: string;
}

interface KundliMilanFaqSectionProps {
  isHi?: boolean;
  isTe?: boolean;
  customFaqs?: KundliMilanFaqItem[];
}

export function KundliMilanFaqSection({
  isHi = false,
  isTe = false,
  customFaqs,
}: KundliMilanFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFaqs: KundliMilanFaqItem[] = isTe
    ? [
        {
          question: "వివాహం కోసం కనీసం ఎన్ని గుణాలు కలవాలి?",
          answer:
            "వైదిక అష్టకూట విధానంలో మొత్తం 36 గుణాలు ఉంటాయి. వివాహం ఆమోదయోగ్యంగా ఉండటానికి కనీసం 18 గుణాలు కలవాలి. 18 నుండి 24 గుణాలు సాధారణమైనవి, 25 నుండి 32 గుణాలు చాలా శుభప్రదమైనవి, మరియు 32 కంటే ఎక్కువ గుణాలు అత్యుత్తమమైనవిగా పరిగణించబడతాయి.",
        },
        {
          question: "నాడీ దోషం అంటే ఏమిటి? దాని పరిహారం ఎలా జరుగుతుంది?",
          answer:
            "అష్టకూటంలో నాడీకి అత్యధికంగా 8 గుణాలు కేటాయించబడ్డాయి (ఆది, మధ్య, అంత్య నాడీలు). ఇద్దరి నాడీలు ఒకటే అయితే నాడీ దోషం ఏర్పడుతుంది. అయితే, ఇద్దరికీ ఒకే రాశి కానీ వేర్వేరు నక్షత్రాలు లేదా ఒకే నక్షత్రం కానీ వేర్వేరు పాదాలు ఉంటే శాస్త్రోక్తంగా నాడీ దోషం స్వయంచాలకంగా రద్దవుతుంది (దోష పరిహారం).",
        },
        {
          question: "మాంగ్లిక్ ఉన్న వ్యక్తి నాన్-మాంగ్లిక్ వ్యక్తిని వివాహం చేసుకోవచ్చా?",
          answer:
            "అవును, చేసుకోవచ్చు. వైదిక జ్యోతిషంలో 16 ప్రామాణిక మాంగ్లిక్ దోష పరిహార సూత్రాలు ఉన్నాయి. ఉదాహరణకు, మేషంలో కుజుడు 1వ భావంలో ఉన్నా, వృశ్చికంలో 4వ భావంలో ఉన్నా, మకరంలో 7వ భావంలో ఉన్నా లేదా గురువు శుక్రుల దృష్టి ఉన్నా దోషం రద్దవుతుంది.",
        },
        {
          question: "భకూట్ దోషం అంటే ఏమిటి? దాని ప్రభావం ఏమిటి?",
          answer:
            "వధూవరుల చంద్ర రాశుల మధ్య 2-12, 6-8 లేదా 9-5 సంబంధం ఏర్పడినప్పుడు 7 గుణాల భకూట్ దోషం వస్తుంది. అయితే రాశ్యాధిపతులు పరస్పర మిత్రులైనా లేదా ఒకే అధిపతి ఉన్నా (ఉదా. మకర-కుంభ శని, మేష-వృశ్చిక కుజుడు) భకూట్ దోష పరిహారం లభిస్తుంది.",
        },
      ]
    : isHi
    ? [
        {
          question: "विवाह के लिए 36 में से कितने गुण मिलना आवश्यक है?",
          answer:
            "वैदिक अष्टकूट पद्धति में कुल 36 गुण होते हैं। सफल वैवाहिक जीवन हेतु न्यूनतम 18 गुणों का मिलना अनिवार्य माना गया है। 18 से 24 गुण मध्यम, 25 से 32 गुण उत्तम, तथा 32 से अधिक गुण सर्वोत्तम वैवाहिक अनुकूलता का संकेत देते हैं।",
        },
        {
          question: "नाड़ी दोष क्या होता है और इसका परिहार कैसे होता है?",
          answer:
            "अष्टकूट मिलान में नाड़ी को सर्वाधिक 8 अंक दिए गए हैं (आद्य, मध्य, अंत्य नाड़ी)। वर और कन्या की समान नाड़ी होने पर नाड़ी दोष माना जाता है। किंतु यदि वर-कन्या की एक ही राशि हो और नक्षत्र भिन्न हों, अथवा नक्षत्र एक हो और चरण भिन्न हों, तो शास्त्रों के अनुसार नाड़ी दोष स्वतः निष्प्रभावी (परिहार) हो जाता है।",
        },
        {
          question: "क्या मांगलिक व्यक्ति गैर-मांगलिक से विवाह कर सकता है?",
          answer:
            "हाँ, बिल्कुल कर सकता है। महर्षि पराशर के अनुसार मांगलिक दोष के 16 शास्त्रीय अपवाद व परिहार नियम हैं। यदि मंगल स्वराशि या उच्च राशि (जैसे मकर में 7वें भाव) में हो, या बृहस्पति/शुक्र की शुभ दृष्टि हो, तो मांगलिक प्रभाव पूर्णतः समाप्त हो जाता है।",
        },
        {
          question: "भकूट दोष क्या है और यह कब निरस्त होता है?",
          answer:
            "वर और कन्या की जन्म राशियों के बीच 2-12, 6-8 या 9-5 का संबंध होने पर 7 अंकों का भकूट दोष बनता है। किंतु यदि दोनों राशियों के स्वामी एक ही हों (जैसे मेष-वृश्चिक के मंगल, वृषभ-तुला के शुक्र) अथवा दोनों के राशि स्वामी परस्पर परम मित्र हों, तो भकूट दोष पूरी तरह निरस्त माना जाता है।",
        },
      ]
    : [
        {
          question: "How many Gunas must match for a successful marriage?",
          answer:
            "According to the classical Vedic Ashtakoot system of 36 Gunas, a minimum of 18 Gunas is required for matrimonial approval. A score of 18–24 Gunas is considered an acceptable/average match, 25–32 Gunas is deemed a very good match, and 33–36 Gunas represents an exceptional, heavenly union.",
        },
        {
          question: "What is Nadi Dosha and how does its cancellation (Parihara) work?",
          answer:
            "Nadi holds the maximum weight of 8 points in Ashtakoot matching, governing biological, psychological, and hereditary harmony across Aadi, Madhya, and Antya Nadis. If both partners share the same Nadi, Nadi Dosha occurs. However, classical shastras define well-known exceptions—such as having different Nakshatras within the same Rashi, or different padas—which completely cancel the dosha.",
        },
        {
          question: "Can a Manglik person marry a Non-Manglik partner?",
          answer:
            "Yes, absolutely. Vedic astrology specifies 16 classical Manglik cancellation rules (Apavadas). For instance, if Mars is exalted in Capricorn in the 7th house, placed in friendly movable signs, aspected by Jupiter or Venus, or if Saturn occupies the 1st/4th/7th/8th/12th house in the spouse's chart, the dosha is nullified.",
        },
        {
          question: "What is Bhakoot Dosha and when is it cancelled?",
          answer:
            "Bhakoot carries 7 points and assesses mutual relationship compatibility based on moon sign placement (2-12 Dwirdwadashe, 6-8 Shadashtak, or 9-5 Navam-Pancham). It is cancelled if the planetary lords of both Rashis are the same (e.g. Aries-Scorpio ruled by Mars, Taurus-Libra ruled by Venus) or mutual natural friends.",
        },
      ];

  const faqs = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  return (
    <section className="mt-12 pt-8 border-t border-[#ecdac8]/80 print:hidden">
      {/* FAQ Header with Help Center Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#b45309]">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#3b1812] tracking-tight">
            {isTe
              ? "తరచుగా అడిగే ప్రశ్నలు"
              : isHi
              ? "अक्सर पूछे जाने वाले प्रश्न"
              : "Frequently asked questions"}
          </h2>
        </div>

        <Link
          href="/spiritual-tools"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#c2410c] hover:text-[#9a3412] transition"
        >
          <span>
            {isTe
              ? "ఇంకా ప్రశ్నలు ఉన్నాయా? ఆధ్యాత్మిక సాధనాలను చూడండి"
              : isHi
              ? "अधिक जानकारी चाहिए? हमारे साधना केंद्र पर जाएं"
              : "Still have questions? Visit our Help Center"}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 2-Column Responsive FAQ Accordion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-[#d9531e]/50 bg-white shadow-xs"
                  : "border-[#ecdac8] bg-[#fffdfa] hover:border-[#ecdac8]/90 hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3"
              >
                <span className="font-serif text-xs sm:text-sm font-bold text-[#3b1812] leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                    isOpen
                      ? "rotate-180 bg-[#d9531e]/10 text-[#d9531e]"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal border-t border-[#f3e6d8] mt-1">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

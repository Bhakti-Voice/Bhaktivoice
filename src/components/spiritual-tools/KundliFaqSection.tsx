"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export interface KundliFaqItem {
  question: string;
  answer: string;
}

interface KundliFaqSectionProps {
  isHi?: boolean;
  isTe?: boolean;
  customFaqs?: KundliFaqItem[];
}

export function KundliFaqSection({
  isHi = false,
  isTe = false,
  customFaqs,
}: KundliFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFaqs: KundliFaqItem[] = isTe
    ? [
        {
          question: "నా జన్మ వివరాలు సురక్షితంగా ఉంటాయా?",
          answer:
            "అవును, ఖచ్చితంగా 100% సురక్షితం. మీ జన్మ వివరాలు (పేరు, తేదీ, సమయం, ప్రదేశం) ఏ సర్వర్‌లోనూ నిల్వ చేయబడవు. అన్ని ఖగోళ గణనలు పూర్తిగా మీ బ్రౌజర్‌లోనే గోప్యంగా జరుగుతాయి.",
        },
        {
          question: "వైదిక జ్యోతిషంలో 16 వర్గ కుండలులు (షోడశవర్గ) అంటే ఏమిటి?",
          answer:
            "మహర్షి పరాశర హోరా శాస్త్రం ప్రకారం, ఒక రాశిని సూక్ష్మ భాగాలుగా విభజించి జీవితంలోని నిర్దిష్ట అంశాలను పరిశీలించేందుకు 16 వర్గ కుండలులు (D-1 నుండి D-60) వాడతారు. వీటిలో ముఖ్యంగా నవాంశ (D-9, వివాహం & భాగ్యం) మరియు దశమాంశ (D-10, కెరీర్ & ఉద్యోగం) అత్యంత ప్రాముఖ్యమైనవి.",
        },
        {
          question: "కుండలిని రూపొందించడానికి నాకు ఏమి అవసరం?",
          answer:
            "మీ ఖచ్చితమైన జన్మ తేదీ (Date of Birth), జన్మ సమయం (Time of Birth - గంటలు మరియు నిమిషాలు), మరియు జన్మ ప్రదేశం (Place of Birth) అవసరం. ఖచ్చితమైన సమయం లగ్నాన్ని మరియు గ్రహాల సరైన భావాలను నిర్ణయించడంలో అత్యంత కీలకమైనది.",
        },
        {
          question: "పరాశరి అష్టకవర్గ వ్యవస్థ గ్రహ బలాన్ని ఎలా అంచనా వేస్తుంది?",
          answer:
            "అష్టకవర్గ అనేది గ్రహాలు ఒకదానికొకటి ఇచ్చే శుభ బిందువులను (బిందువులు) లెక్కించే ఖచ్చితమైన సంఖ్యా పద్ధతి. సర్వాష్టకవర్గ (SAV) లో మొత్తం 337 బిందువులు ఉంటాయి. 28 లేదా అంతకంటే ఎక్కువ బిందువులు ఉన్న భావాలు జీవితంలో అత్యున్నత శుభ ఫలితాలను, సౌభాగ్యాన్ని ప్రసాదిస్తాయి.",
        },
      ]
    : isHi
    ? [
        {
          question: "क्या मेरा जन्म विवरण सुरक्षित और निजी है?",
          answer:
            "हाँ, बिल्कुल 100% सुरक्षित और गोपनीय है। आपके जन्म का विवरण (नाम, तारीख, समय, स्थान) हमारे सर्वर पर स्थायी रूप से सहेजा नहीं जाता है। सभी गणितीय गणनाएँ सीधे आपके ब्राउज़र में संपन्न होती हैं।",
        },
        {
          question: "वैदिक ज्योतिष में 16 वर्ग कुंडलियां (षोडशवर्ग) क्या हैं?",
          answer:
            "महर्षि पराशर के बृहत्पाराशर होराशास्त्र के अनुसार, लग्न कुंडली (D-1) के अतिरिक्त सूक्ष्म फलकथन के लिए 16 वर्ग कुंडलियां (D-1 से D-60) बनाई जाती हैं। इनमें विशेष रूप से नवांश कुंडली (D-9, वैवाहिक जीवन व भाग्य) एवं दशमांश (D-10, आजीविका व करियर) अत्यंत महत्वपूर्ण हैं।",
        },
        {
          question: "जन्म कुंडली बनाने के लिए मुझे क्या जानकारी चाहिए?",
          answer:
            "जन्म कुंडली बनाने हेतु आपको जन्म की सही तारीख, सटीक जन्म समय (घंटे व मिनट) और जन्म स्थान (शहर/गाँव) की आवश्यकता होती है। सटीक समय होने से लग्न का स्पष्ट अंश और ग्रहों के भाव सही निर्धारित होते हैं।",
        },
        {
          question: "पराशरी अष्टाकवर्ग प्रणाली ग्रहों के बल का मूल्यांकन कैसे करती है?",
          answer:
            "अष्टाकवर्ग वैदिक ज्योतिष की गणितीय प्रणाली है जिसमें 7 मुख्य ग्रह एवं लग्न एक-दूसरे के संदर्भ में शुभ 'बिंदु' प्रदान करते हैं। सर्वाष्टाकवर्ग (SAV) में कुल 337 बिंदु होते हैं। 28 या अधिक बिंदुओं वाला भाव अत्यंत शुभ एवं फलदायी माना जाता है।",
        },
      ]
    : [
        {
          question: "Is my birth data safe?",
          answer:
            "Yes, 100% safe and private. Your birth information (name, date, time, and location) is processed securely in real-time. We do not sell or store your personal astrological data on external servers.",
        },
        {
          question: "What are the 16 Divisional Charts (Shodashvarga) in Vedic astrology?",
          answer:
            "According to the classical Brihat Parasara Hora Shastra, a single Rasi chart (D-1) only provides an overview. The 16 divisional charts (Shodashvarga from D-1 to D-60) examine specialized dimensions of destiny—most notably Navamsha (D-9 for marriage and inner strength) and Dashamsha (D-10 for profession and social stature).",
        },
        {
          question: "What do I need to generate a Kundli?",
          answer:
            "You only need three essential details: exact Date of Birth, exact Time of Birth (hours and minutes), and Place of Birth (city or coordinates). Accurate time is critical because the Ascendant (Lagna) changes approximately every two hours.",
        },
        {
          question: "How does the Parashari Ashtakavarga system evaluate strength?",
          answer:
            "The Ashtakavarga system is an objective, mathematical scoring grid where each of the 7 classical planets and Lagna contribute benefic points (Bindus) to the 12 houses. In the Sarvashtakavarga (SAV) chart with 337 total bindus, any house scoring 28 or more points signifies abundant strength, stability, and positive transit manifestations.",
        },
      ];

  const faqs = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  return (
    <section className="mt-12 pt-8 border-t border-[#ecdac8]/80 print:hidden">
      {/* FAQ Header with Help Center Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#d9531e]">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#3b1812]">
            {isTe
              ? "తరచుగా అడిగే ప్రశ్నలు"
              : isHi
              ? "अक्सर पूछे जाने वाले प्रश्न"
              : "Frequently asked questions"}
          </h2>
        </div>

        <Link
          href="/more"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#d9531e] hover:text-[#963806] transition-colors group"
        >
          <span>
            {isTe
              ? "ఇంకా సందేహాలు ఉన్నాయా? సహాయ కేంద్రాన్ని సందర్శించండి"
              : isHi
              ? "कोई अन्य प्रश्न? सहायता केंद्र देखें"
              : "Still have questions? Visit our Help Center"}
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* 2-Column Responsive FAQ Accordion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
        {faqs.map((faq, idx) => {
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
                onClick={() => setOpenIndex(isOpen ? null : idx)}
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
    </section>
  );
}

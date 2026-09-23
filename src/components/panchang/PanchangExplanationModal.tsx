import React from "react";
import { X, Sparkles, Sun, Moon, Compass, ShieldCheck, Calendar } from "lucide-react";

export interface PanchangExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHi?: boolean;
  isTe?: boolean;
}

export function PanchangExplanationModal({
  isOpen,
  onClose,
  isHi = false,
  isTe = false,
}: PanchangExplanationModalProps) {
  if (!isOpen) return null;

  const limbs = [
    {
      title: isTe ? "1. తిథి (Tithi) — చంద్ర కళ" : isHi ? "1. तिथि (Tithi) — चंद्र तिथि" : "1. Tithi — Lunar Day",
      desc: isTe
        ? "సూర్యుడు మరియు చంద్రుని మధ్య ఉండే 12 డిగ్రీల కోణాన్ని తిథి అంటారు. ఇది మానసిక స్థితి మరియు సంకల్ప శక్తిని ప్రభావితం చేస్తుంది."
        : isHi
        ? "सूर्य और चंद्रमा के बीच प्रत्येक 12 अंश की कोणीय दूरी को तिथि कहते हैं। यह मानसिक शक्ति, संकल्प एवं धार्मिक अनुष्ठानों की शुभता निर्धारित करती है।"
        : "The longitudinal angle of 12° between the Sun and Moon. Determines mental state, auspicious rituals, and religious observances.",
      icon: Moon,
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: isTe ? "2. నక్షత్రం (Nakshatra) — నక్షత్ర కూటమి" : isHi ? "2. नक्षत्र (Nakshatra) — चंद्र का तारा मंडल" : "2. Nakshatra — Lunar Mansion",
      desc: isTe
        ? "రాశిచక్రం లోని 27 నక్షత్రాలలో చంద్రుడు ప్రయాణించే భాగం. ఇది మానవ ప్రవృత్తి, ఆలోచనలు మరియు చేష్టలను నిర్దేశిస్తుంది."
        : isHi
        ? "आकाश मंडल के 27 नक्षत्र खंड, जिनमें चंद्रमा 27.3 दिनों में भ्रमण करता है। यह स्वभाव, प्रतिभा एवं कर्मफल को प्रभावित करता है।"
        : "One of the 27 stellar divisions of the zodiac where the Moon resides. Influences subconscious impulses, temperament, and success.",
      icon: Compass,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: isTe ? "3. యోగం (Yoga) — సూర్యచంద్రుల కలయిక" : isHi ? "3. योग (Yoga) — सूर्य-चंद्र संयोग" : "3. Yoga — Soli-Lunar Union",
      desc: isTe
        ? "సూర్యుడు మరియు చంద్రుని స్థానాల కలయికతో ఏర్పడే 27 నిత్య యోగాలు. ఇవి ఆరోగ్యం మరియు శరీర శ్రేయస్సుకు సూచికలు."
        : isHi
        ? "सूर्य व चंद्रमा के भोगांशों का योग। कुल 27 योग होते हैं जो आरोग्य, शारीरिक बल एवं समग्र जीवन शक्ति के सूचक हैं।"
        : "The mathematical sum of solar and lunar longitudes forming 27 Yogas. Signifies physical health, vitality, and harmony.",
      icon: Sparkles,
      color: "bg-rose-100 text-rose-800",
    },
    {
      title: isTe ? "4. కరణం (Karana) — సగం తిథి" : isHi ? "4. करण (Karana) — आधी तिथि" : "4. Karana — Half-Tithi",
      desc: isTe
        ? "ఒక తిథిలోని సగభాగం (6 డిగ్రీలు). మొత్తం 11 కరణాలు ఉండగా, ఇవి పనుల విజయానికి, వ్యాపార లావాదేవీలకు ఉపయోగపడతాయి."
        : isHi
        ? "तिथि का आधा भाग (6 अंश)। कुल 11 करण होते हैं (7 चर और 4 स्थिर), जो कर्म सिद्धि एवं व्यापारिक निर्णयों हेतु अत्यंत महत्वपूर्ण हैं।"
        : "Half of a lunar day (6° elongation). There are 11 Karanas in total. Governing immediate actions, commercial success, and work efficiency.",
      icon: ShieldCheck,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      title: isTe ? "5. వారం (Vara) — సౌర దినం" : isHi ? "5. वार (Vara) — सौर दिन" : "5. Vara — Solar Weekday",
      desc: isTe
        ? "సూర్యోదయం నుండి మరుసటి సూర్యోదయం వరకు ఉండే కాలం. ప్రతి రోజు ఒక అధిపతి గ్రహం చేత పాలించబడుతుంది (ఉదా: ఆదిత్య, సోమ)."
        : isHi
        ? "सूर्योदय से अगले सूर्योदय तक का दिनमान। सप्ताह के सातों दिनों के अधिपति अलग-अलग ग्रह होते हैं जो उस दिन की मूलभूत ऊर्जा तय करते हैं।"
        : "The solar weekday from one sunrise to the next, ruled by a planetary deity (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).",
      icon: Calendar,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl border border-amber-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted hover:bg-sand hover:text-ink transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-saffron/15 text-saffron">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
              {isTe
                ? "పంచాంగం అంటే ఏమిటి? (వైదిక అంగాలు)"
                : isHi
                ? "पंचांग क्या है? (वैदिक पांच अंग)"
                : "What is a Panchang? (The 5 Vedic Limbs)"}
            </h2>
            <p className="text-xs text-muted">
              {isTe
                ? "వైదిక కాలగణనలోని ఐదు పవిత్ర సూత్రాల శాస్త్రీయ వివరణ"
                : isHi
                ? "वैदिक काल गणना के पांच मूलभूत स्तम्भों का रहस्य"
                : "The astronomical principles behind traditional Vedic timing"}
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-4 rounded-2xl bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 leading-relaxed border border-amber-200/60">
          {isTe
            ? "‘పంచ’ అంటే ఐదు, ‘అంగ’ అంటే భాగాలు. సూర్యుడు మరియు చంద్రుల ఖగోళ స్థితి ఆధారంగా గణించబడే తిథి, వారం, నక్షత్రం, యోగం మరియు కరణం అనే 5 అంగాల సమాహారమే పంచాంగం. ఇది ప్రతి పనిని అత్యుత్తమ దైవిక సమయంలో ప్రారంభించడానికి మనకు మార్గనిర్దేశం చేస్తుంది."
            : isHi
            ? "‘पंच’ का अर्थ है पाँच और ‘अंग’ का अर्थ है भाग। सूर्य और चंद्रमा की खगोलीय गति पर आधारित पाँच अंगों (तिथि, वार, नक्षत्र, योग और करण) का दर्पण ही पंचांग है। यह हमें हर कार्य को सर्वाधिक शुभ एवं कल्याणकारी समय में आरम्भ करने की दिव्य दृष्टि देता है।"
            : "Derived from Sanskrit 'Pancha' (Five) and 'Anga' (Limbs), the Panchang maps the daily cosmic interplay of the Sun and Moon. Devotees and seekers utilize these five principles to align their worldly duties with auspicious celestial energy."}
        </div>

        {/* 5 Limbs List */}
        <div className="mt-5 space-y-3">
          {limbs.map((limb, idx) => {
            const IconComp = limb.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-line bg-sand/30 p-3.5 hover:border-amber-300 transition"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${limb.color}`}
                >
                  <IconComp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-ink">{limb.title}</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{limb.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Button at bottom */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="rounded-2xl bg-saffron px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-saffron-deep transition active:scale-95"
          >
            {isTe ? "సరే, అర్థమైంది" : isHi ? "ठीक है, समझ गया" : "Got It"}
          </button>
        </div>
      </div>
    </div>
  );
}

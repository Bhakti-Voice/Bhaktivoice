import React from "react";
import { Sparkles, Compass } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";

export interface NakshatraConstellationCardProps {
  nakshatraName: string;
  nakshatraNameHi?: string;
  nakshatraNameTe?: string;
  endTime: string;
  isHi?: boolean;
  isTe?: boolean;
}

// Vedic Nakshatra Qualities & Guidance Database (all 27 Nakshatras)
const NAKSHATRA_TRAITS: Record<
  string,
  {
    en: string;
    hi: string;
    te: string;
  }
> = {
  Ashwini: {
    en: "Swift, energetic, and healing. Ideal for initiating treatments, travel, and ventures requiring quick execution.",
    hi: "ऊर्जावान, तीव्र एवं आरोग्यकारी। नई औषधियों, यात्रा एवं त्वरित कार्यों के शुभारंभ हेतु अत्यंत शुभ।",
    te: "చురుకైన, శక్తివంతమైన మరియు చికిత్సా గుణం కలది. ప్రయాణాలు, ఔషధ సేవ మరియు నూతన ప్రారంభాలకు శ్రేష్ఠమైనది.",
  },
  Bharani: {
    en: "Courageous, determined, and transformative. Suitable for competitive endeavors, discipline, and resolving deep challenges.",
    hi: "साहसी, दृढ़निश्चयी एवं परिवर्तनकारी। प्रतिस्पर्धा, तपस्या एवं कठिन चुनौतियों के समाधान हेतु श्रेष्ठ।",
    te: "సాహసోపేతమైనది మరియు దృఢనిశ్చయం కలది. పోటీ పరీక్షలు, క్రమశిక్షణ మరియు గృహ శుద్ధి పనులకు మంచిది.",
  },
  Krittika: {
    en: "Sharp, courageous, and purifying. Excellent for technical work, culinary arts, courage, and focused problem solving.",
    hi: "तेजस्वी, साहसी एवं शोधक। तकनीकी कार्यों, अग्नि कार्य, नेतृत्व एवं दृढ़ निर्णयों हेतु उत्तम।",
    te: "తీక్షణమైన, స్వచ్ఛమైన మరియు నాయకత్వ లక్షణాలు కలది. సాంకేతిక పనులు మరియు సాహసోపేత నిర్ణయాలకు శుభం.",
  },
  Rohini: {
    en: "Growth-oriented, charming, and prosperous. Highly auspicious for trade, weddings, agriculture, and creative arts.",
    hi: "समृद्धिदायक, मोहक एवं सृजनशील। विवाह, व्यापार, गृह निर्माण एवं कलात्मक कार्यों हेतु सर्वोत्कृष्ट।",
    te: "వృద్ధి, ఆకర్షణ మరియు సమృద్ధిని ఇస్తుంది. వివాహాలు, వ్యాపారాలు మరియు శుభకార్యాలకు అత్యంత పవిత్రమైనది.",
  },
  Mrigashira: {
    en: "Inquisitive, gentle, and seeking truth. Best for research, artistic creations, travel, and friendships.",
    hi: "जिज्ञासु, सौम्य एवं अन्वेषक। अनुसंधान, कला, वस्त्र-आभूषण क्रय एवं मित्रता हेतु शुभ।",
    te: "పరిశోధనాత్మక, సౌమ్యమైన స్వభావం. కొత్త విద్యలు నేర్చుకోవడానికి, ప్రయాణాలు మరియు స్నేహానికి మంచిది.",
  },
  Ardra: {
    en: "Intellectual, resilient, and purifying. Favorable for deep research, spiritual sadhana, and overcoming obstacles.",
    hi: "तर्कशील, दृढ़ एवं परिशोधक। गहन अध्ययन, तंत्र-मंत्र साधना एवं बाधाओं के निवारण हेतु उपयुक्त।",
    te: "మేధోపరమైనది, స్థిరమైనది. లోతైన అధ్యయనం, రుద్ర పూజ మరియు ఆటంకాలను అధిగమించడానికి అనుకూలమైనది.",
  },
  Punarvasu: {
    en: "Nurturing, benevolent, and rejuvenating. Great for returning home, starting over, spirituality, and family gatherings.",
    hi: "कल्याणकारी, उदार एवं पुनर्जीवन प्रदाता। गृह वापसी, नूतन आरम्भ, धार्मिक अनुष्ठान हेतु फलदायी।",
    te: "పునరుజ్జీవనం మరియు శ్రేయస్సు కలిగించేది. ఇల్లు మారడం, ప్రార్థనలు మరియు శాంతి కార్యాలకు శ్రేష్ఠం.",
  },
  Pushya: {
    en: "Supreme auspiciousness, nourishing, and spiritual. Best for investments, charity, education, and sacred ceremonies.",
    hi: "सर्वश्रेष्ठ कल्याणकारी एवं पोषणकारी नक्षत्र। स्वर्ण क्रय, व्यापार, विद्यारम्भ व महापूजा हेतु सर्वोत्तम।",
    te: "అత్యంత శుభప్రదమైన గురు నక్షత్రం. బంగారం కొనుగోలు, విద్యాభ్యాసం, వ్యాపార ప్రారంభానికి మహోత్కృష్టం.",
  },
  Ashlesha: {
    en: "Intuitive, profound, and strategic. Suitable for meditation, kundalini yoga, diplomacy, and medical investigations.",
    hi: "अंतर्ज्ञानी, गूढ़ एवं कूटनीतिक। साधना, योग, कूटनीति एवं चिकित्सा परामर्श हेतु उचित।",
    te: "జ్ఞానయుతమైన మరియు వ్యూహాత్మకమైనది. ధ్యానం, యోగం, నాగ పూజలు మరియు పరిశోధనలకు అనుకూలం.",
  },
  Magha: {
    en: "Noble, authoritative, and ancestral blessing. Auspicious for ancestral rituals (Pitru Puja), administration, and honours.",
    hi: "तेजस्वी, पैतृक आशीर्वाद युक्त एवं नेतृत्वकारी। पितृ तर्पण, पदभार ग्रहण एवं सम्मान प्राप्ति हेतु श्रेष्ठ।",
    te: "రాజసం, పితృదేవతల ఆశీస్సులు కలది. పితృ పూజలు, పదవీ స్వీకారం మరియు ఉన్నత కార్యాలకు మంచిది.",
  },
  "Purva Phalguni": {
    en: "Joyful, loving, and artistic. Auspicious for romance, social celebrations, entertainment, and leisurely arts.",
    hi: "आनंदमयी, प्रेमपूर्ण एवं कलाप्रिय। संगीत, उत्सव, विवाह चर्चा एवं मनोरंजन के लिए अनुकूल।",
    te: "ఆనందం, ప్రేమ మరియు కళాత్మకత. వేడుకలు, సంగీతం, స్నేహపూర్వక కలయికలకు అత్యంత అనుకూలం.",
  },
  "Uttara Phalguni": {
    en: "Generous, enduring, and honourable. Splendid for contracts, matrimonial alliances, philanthropy, and partnerships.",
    hi: "उदार, स्थायी एवं सम्मानीय। विवाह संस्कार, दीर्घकालिक समझौते एवं दान-पुण्य हेतु उत्तम।",
    te: "శాశ్వతమైన శ్రేయస్సునిచ్చేది. వివాహం, భాగస్వామ్య ఒప్పందాలు మరియు దానధర్మాలకు ఉత్తమమైనది.",
  },
  Hasta: {
    en: "Dexterous, witty, and skillful. Excellent for craftsmanship, commerce, medical surgery, and intellectual pursuits.",
    hi: "हस्तशिल्प प्रवीण, चतुर एवं फलदायी। व्यापार, दस्तकारी, हस्ताक्षर एवं बौद्धिक कार्यों हेतु अनुकूल।",
    te: "చేతివృత్తులు, వ్యాపారం, నైపుణ్యం కలది. వాణిజ్య లావాదేవీలు మరియు చతురతతో కూడిన పనులకు శ్రేష్ఠం.",
  },
  Chitra: {
    en: "Creative, artistic and ambitious. Good for new projects, learning, craftsmanship, and design innovations.",
    hi: "सृजनशील, कलात्मक एवं महत्वाकांक्षी। नए प्रोजेक्ट, शिक्षा, वस्त्र-शिल्प एवं व्यापार हेतु अत्यंत शुभ।",
    te: "సృజనాత్మక, కళాత్మక మరియు ప్రతిష్టాత్మకమైనది. కొత్త ప్రాజెక్టులు, విద్య మరియు వ్యాపార ప్రారంభానికి శుభం.",
  },
  Swati: {
    en: "Independent, flexible, and communicative. Highly beneficial for trade, travel, learning technology, and diplomacy.",
    hi: "स्वतंत्र, लचीला एवं संचार निपुण। व्यापार, यात्रा, तकनीक शिक्षण एवं सामंजस्य स्थापित करने हेतु उत्तम।",
    te: "స్వతంత్ర భావాలు, వాక్చాతుర్యం కలది. వ్యాపార విస్తరణ, విదేశీ ప్రయాణాలు మరియు వాణిజ్యానికి మంచిది.",
  },
  Vishakha: {
    en: "Goal-driven, focused, and triumphant. Ideal for achieving long-sought goals, competitive success, and celebrations.",
    hi: "लक्ष्योन्मुखी, दृढ़ एवं विजय प्रदाता। प्रतियोगिताओं, लंबित कार्यों की पूर्णता एवं उत्सव हेतु शुभ।",
    te: "లక్ష్యసాధన మరియు విజయాన్ని చేకూర్చేది. పట్టుదలతో సాధించే పనులకు, విజయ ముహూర్తాలకు అనుకూలం.",
  },
  Anuradha: {
    en: "Devotional, friendly, and harmonious. Excellent for friendship, group meditation, foreign travel, and spiritual study.",
    hi: "भक्तिभावपूर्ण, सौहार्दपूर्ण एवं कल्याणकारी। मित्रता, सामूहिक साधना, विदेश यात्रा एवं सत्संग हेतु श्रेष्ठ।",
    te: "భక్తి, స్నేహం మరియు సమన్వయం కలది. స్నేహితుల కలయిక, తీర్థయాత్రలు మరియు భక్తి సాధనకు శ్రేష్ఠం.",
  },
  Jyeshtha: {
    en: "Authoritative, protective, and commanding. Suitable for elder guidance, protecting family wealth, and bold steps.",
    hi: "ज्येष्ठ, संरक्षक एवं प्रभावकारी। प्रशासनिक कार्यों, सुरक्षा, बड़े निर्णयों एवं साहस हेतु उपयुक्त।",
    te: "నాయకత్వ లక్షణాలు, రక్షణ స్వభావం. కుటుంబ బాధ్యతలు, పరిపాలనా వ్యవహారాలకు మంచిది.",
  },
  Mula: {
    en: "Rooted, investigatory, and deep. Ideal for discovering underlying causes, herbal medicine, and philosophical studies.",
    hi: "मूल अन्वेषक, गूढ़ एवं परिवर्तनकारी। जड़ी-बूटी, औषधि निर्माण, शोध एवं दार्शनिक चिंतन हेतु शुभ।",
    te: "మూలాలను శోధించేది. పరిశోధన, ఆయుర్వేద ఔషధాలు మరియు ఆధ్యాత్మిక చింతనకు అనుకూలం.",
  },
  "Purva Ashadha": {
    en: "Invincible, purifying, and uplifting. Excellent for building alliances, water rituals, resilience, and negotiations.",
    hi: "अपराजेय, शुद्धिकारी एवं उत्साहवर्धक। जल सम्बन्धी कार्य, धैर्य, समझौते एवं विजय संकल्प हेतु उत्तम।",
    te: "అజేయమైన శక్తినిచ్చేది. సంప్రదింపులు, తీర్థస్నానాలు మరియు ఆత్మవిశ్వాసంతో కూడిన పనులకు శ్రేష్ఠం.",
  },
  "Uttara Ashadha": {
    en: "Victorious, righteous, and enduring. Auspicious for inaugurations, laying foundation stones, and vows.",
    hi: "सदा विजयी, धर्मपरायण एवं स्थायी। शिलान्यास, नूतन प्रतिष्ठान, प्रतिज्ञा एवं मांगलिक कार्यों हेतु श्रेष्ठ।",
    te: "నిరంతర విజయం, ధర్మబద్ధమైనది. శంకుస్థాపనలు, గృహప్రవేశం మరియు ఉన్నత ఆశయాలకు మహోత్కృష్టం.",
  },
  Shravana: {
    en: "Attentive, wise, and scholarly. Exceptional for listening to sacred scriptures, education, and mantra diksha.",
    hi: "श्रवणशील, ज्ञानी एवं पुण्यदायी। कथा श्रवण, वेद-पुराण पाठ, विद्यारम्भ एवं गुरु दीक्षा हेतु सर्वोत्तम।",
    te: "శ్రవణం, విజ్ఞానం మరియు సదాచార గుణం. వేద పఠనం, గురుదీక్ష, విద్యాభ్యాసానికి అత్యంత పవిత్రం.",
  },
  Dhanishta: {
    en: "Prosperous, musical, and celebrated. Splendid for real estate, music, purchasing vehicles, and grand events.",
    hi: "समृद्धिदायक, संगीतप्रिय एवं यशस्वी। भूमि-भवन क्रय, वाहन, संगीत साधना एवं सार्वजनिक उत्सव हेतु शुभ।",
    te: "ధన సమృద్ధి, సంగీత ప్రియత్వం. నూతన వాహనాలు, ఆస్తుల కొనుగోలు మరియు కళా రంగానికి అత్యుత్తమం.",
  },
  Shatabhisha: {
    en: "Healing, visionary, and mysterious. Best for medical treatments, yoga therapy, astronomy, and meditation.",
    hi: "आरोग्यवर्धक, दूरदर्शी एवं गूढ़। चिकित्सा आरम्भ, योग, प्राकृतिक चिकित्सा एवं ध्यान हेतु अत्यंत लाभकारी।",
    te: "శత సంఖ్యలో రోగ నివారిణి. ఆయుర్వేదం, వైద్య చికిత్సలు, యోగాభ్యాసానికి పరమ పవిత్రం.",
  },
  "Purva Bhadrapada": {
    en: "Transformative, fiery, and philosophical. Favorable for repentance, charity, deep esoteric knowledge, and austerity.",
    hi: "तपस्वी, वैराग्ययुक्त एवं आध्यात्मिक। दान-पुण्य, स्वाध्याय, साधना एवं आत्मनिरीक्षण हेतु श्रेष्ठ।",
    te: "ఆధ్యాత్మిక పరివర్తన, తపస్సు. ధ్యానం, ఉపవాసాలు, ఆధ్యాత్మిక సాధనలకు అనుకూలం.",
  },
  "Uttara Bhadrapada": {
    en: "Peaceful, serene, and benevolent. Ideal for charity, water conservation, meditation, and long-term peace.",
    hi: "शांत, कल्याणकारी एवं स्थिर। दीर्घकालीन शांति, ध्यान, परोपकार एवं स्थायी प्रतिष्ठान हेतु उत्तम।",
    te: "శాంతస్వరూపం, ధర్మనిరతి. శాశ్వత శాంతి, ధ్యానం, దాతృత్వం మరియు దీర్ఘకాలిక పనులకు శ్రేష్ఠం.",
  },
  Revati: {
    en: "Gentle, prosperous, and nurturing. Ideal for safe travel, commerce, pets, marriages, and spiritual completion.",
    hi: "सौम्य, पोषक एवं धनधान्य प्रदाता। सुखद यात्रा, व्यापार, विवाह, आभूषण क्रय एवं कार्य सिद्धि हेतु श्रेष्ठ।",
    te: "సౌమ్యమైనది, సంపూర్ణత్వమునిచ్చేది. సురక్షిత ప్రయాణాలు, వివాహం, వ్యాపారం మరియు కార్యసిద్ధికి శ్రేష్ఠం.",
  },
};

export function NakshatraConstellationCard({
  nakshatraName,
  nakshatraNameHi,
  nakshatraNameTe,
  endTime,
  isHi = false,
  isTe = false,
}: NakshatraConstellationCardProps) {
  // Normalize key
  const matchedKey =
    Object.keys(NAKSHATRA_TRAITS).find(
      (k) => k.toLowerCase() === nakshatraName.toLowerCase()
    ) || "Chitra";

  const trait = NAKSHATRA_TRAITS[matchedKey] || NAKSHATRA_TRAITS["Chitra"];
  const displayName = isTe
    ? nakshatraNameTe || nakshatraName
    : isHi
    ? nakshatraNameHi || nakshatraName
    : nakshatraName;

  const description = isTe ? trait.te : isHi ? trait.hi : trait.en;

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-sky-200/80 bg-gradient-to-b from-sky-50/50 to-white p-5 shadow-2xs">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-sky-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <Compass className="h-4 w-4" />
          </div>
          <h2 className="font-serif text-base font-bold text-sky-950 sm:text-lg">
            {isTe ? "నక్షత్ర విశేషాలు" : isHi ? "नक्षत्र विवरण" : "Nakshatra Details"}
          </h2>
        </div>

        {/* Visual Night Sky Constellation Box */}
        <div className="mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1427] via-[#111c38] to-[#1c1938] p-4 text-white shadow-inner">
          {/* Subtle starry background dots & lines */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 120"
              preserveAspectRatio="none"
            >
              {/* Constellation star points and connections */}
              <circle cx="25" cy="30" r="2.2" fill="#fff" opacity="0.9" />
              <circle cx="75" cy="20" r="2.8" fill="#ffd700" opacity="0.95" />
              <circle cx="120" cy="50" r="2.5" fill="#fff" opacity="0.9" />
              <circle cx="170" cy="35" r="2" fill="#87ceeb" opacity="0.85" />
              <circle cx="95" cy="85" r="2.2" fill="#fff" opacity="0.9" />
              <circle cx="150" cy="90" r="2.5" fill="#ffd700" opacity="0.95" />

              <line x1="25" y1="30" x2="75" y2="20" stroke="#87ceeb" strokeWidth="0.75" strokeDasharray="3,2" opacity="0.6" />
              <line x1="75" y1="20" x2="120" y2="50" stroke="#87ceeb" strokeWidth="0.75" opacity="0.7" />
              <line x1="120" y1="50" x2="170" y2="35" stroke="#87ceeb" strokeWidth="0.75" strokeDasharray="3,2" opacity="0.6" />
              <line x1="75" y1="20" x2="95" y2="85" stroke="#87ceeb" strokeWidth="0.75" opacity="0.65" />
              <line x1="95" y1="85" x2="150" y2="90" stroke="#87ceeb" strokeWidth="0.75" opacity="0.7" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isTe ? "ప్రస్తుత నక్షత్రం" : isHi ? "सक्रिय नक्षत्र" : "Active Constellation"}</span>
              </div>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-wide text-white">
                {displayName}
              </h3>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-2.5 py-1 text-right backdrop-blur-xs">
              <span className="block text-[10px] font-medium text-sky-200">
                {isTe ? "సమయం వరకు" : isHi ? "समाप्ति काल" : "Till"}
              </span>
              <span className="font-serif text-xs font-bold text-white">{endTime}</span>
            </div>
          </div>
        </div>

        {/* Nakshatra Characteristic Description */}
        <p className="mt-3.5 text-xs text-sky-950/80 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-sky-100">
        <LocaleLink
          href={`${PATHS.tarabalam}`}
          className="group inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 transition"
        >
          <span>
            {isTe
              ? `${displayName} నక్షత్రం గురించి మరింత తెలుసుకోండి`
              : isHi
              ? `${displayName} नक्षत्र के बारे में और जानें`
              : `Know more about ${displayName} Nakshatra`}
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </LocaleLink>
      </div>
    </div>
  );
}

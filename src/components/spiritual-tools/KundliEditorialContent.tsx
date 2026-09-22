import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  Flame,
  Layers,
  Sparkles,
  Table,
  Sun,
  Clock,
  Heart,
} from "lucide-react";
import { PATHS } from "@/lib/seo/paths";

interface KundliEditorialContentProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function KundliEditorialContent({ isHi = false, isTe = false }: KundliEditorialContentProps) {
  return (
    <article className="mt-14 space-y-12 border-t border-[#ecdac8]/80 pt-10 text-stone-800 print:hidden">
      {/* 1. Introduction: What is Janam Kundli? */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#d9531e] mb-3">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isTe ? "వైదిక జ్యోతిష ప్రామాణిక విజ్ఞానం" : isHi ? "वैदिक ज्योतिष प्रामाणिक मीमांसा" : "Authentic Vedic Astrological Science"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe
            ? "జన్మ కుండలి అంటే ఏమిటి? (కర్మ చక్రం & జీవిత నమూనా)"
            : isHi
            ? "जन्म कुंडली क्या है? (कर्म चक्र एवं दिव्य जीवन-नक्शा)"
            : "What is a Janam Kundli? The Cosmic Blueprint of Your Destiny"}
        </h2>

        <div className="mt-4 space-y-3.5 text-xs sm:text-sm leading-relaxed text-stone-600 font-normal">
          <p>
            {isTe
              ? "వైదిక జ్యోతిషం (జ్యోతిష వేదాంగం) ప్రకారం, జన్మ కుండలి (హోరోస్కోప్ లేదా జాతక చక్రం) అనేది ఒక వ్యక్తి భూమిపై జన్మించిన ఖచ్చితమైన క్షణంలో అంతరిక్షంలో నవగ్రహాలు, రాశులు మరియు నక్షత్రాల ఖచ్చితమైన స్థానాలను ప్రతిబింబించే ఖగోళ ఛాయాచిత్రం. మహర్షి పరాశరుడు తన 'బృహత్ పరాశర హోరా శాస్త్రం' గ్రంథంలో జన్మ లగ్నాన్ని జీవుడి పూర్వజన్మ సంచిత కర్మల ఫలితంగా అభివర్ణించారు."
              : isHi
              ? "वैदिक ज्योतिष (वेदांग ज्योतिष) के अनुसार, जन्म कुंडली (Janam Kundli) वह खगोलीय मानचित्र है जो किसी जातक के जन्म के सटीक क्षण पर आकाश में 12 राशियों, 9 ग्रहों और 27 नक्षत्रों की वास्तविक स्थिति को दर्शाता है। महर्षि पराशर विरचित 'बृहत्पाराशर होराशास्त्र' में जन्म लग्न को आत्मा के पूर्वजन्म के संचित कर्मों और वर्तमान जीवन के प्रारब्ध का दर्पण कहा गया है।"
              : "In Vedic astrology (Jyotish Vedanga), a Janam Kundli (natal birth chart) is an exact astronomical map of the cosmos captured at the precise second and coordinate of an individual's birth. As codified in Maharishi Parashara's classical treatise, Brihat Parashara Hora Shastra, the horoscope reflects the soul's Sanchita (accumulated) and Prarabdha (current life) karmic blueprint across physical vitality, intellect, career, marriage, and spiritual liberation (Moksha)."}
          </p>
          <p>
            {isTe
              ? "లగ్నం (Ascendant) అనేది ఒక వ్యక్తి జన్మించిన సమయంలో తూర్పు దిగంతంలో ఉదయించే రాశి. ఇది మొదటి భావంగా ఏర్పడి, మిగిలిన 11 భావాల ద్వారా జీవితంలోని ఆరోగ్యం, సంపద, విద్య, సంతానం, వివాహం, ఆయుష్షు మరియు మోక్షాలను నిర్ణయిస్తుంది."
              : isHi
              ? "जन्म के समय पूर्वी क्षितिज पर जो राशि उदित हो रही होती है, उसे 'लग्न' (Ascendant) कहा जाता है। यही लग्न जातक का प्रथम भाव बनता है, जिसके आधार पर द्वादश भावों (12 Houses) में ग्रहों का विभाजन होता है और मनुष्य के स्वास्थ्य, वित्त, वैवाहिक सुख, करियर एवं आध्यात्मिक उत्थान की दिशा तय होती है।"
              : "The Ascendant (Lagna) is the specific zodiac sign rising on the eastern horizon at the moment of birth. It anchors the 1st house, establishing the personal foundation upon which all remaining 11 houses (Bhavas) distribute their governance over vitality, wealth, siblings, domestic peace, intellect, enemies, marriage, longevity, destiny, profession, gains, and spiritual liberation."}
          </p>
        </div>
      </section>

      {/* 2. The 12 Houses (Bhavas) Table & Significations */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#d9531e] mb-3">
          <Layers className="h-5 w-5" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isTe ? "ద్వాదశ భావాలు & జీవన అంశాలు" : isHi ? "द्वादश भाव एवं जीवन फल" : "The 12 Houses (Bhavas) of Vedic Astrology"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe ? "కుండలిలోని 12 భావాలు మరియు వాటి ప్రాముఖ్యత" : isHi ? "कुंडली के 12 भाव एवं उनका जीवन पर प्रभाव" : "The 12 Houses of a Kundli and Their Life Significations"}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          {isTe
            ? "జన్మ చక్రంలోని 12 భావాలు జీవితంలోని ప్రతి విభాగాన్ని పాలిస్తాయి. క్రింది పట్టికలో ప్రతి భావానికి సంబంధించిన కారకత్వాలు మరియు ప్రాముఖ్యత వివరించబడ్డాయి:"
            : isHi
            ? "वैदिक जन्म पत्रिका के 12 भाव मनुष्य जीवन के 12 प्रमुख आयामों का प्रतिनिधित्व करते हैं। नीचे दी गई तालिका में प्रत्येक भाव का कारकत्व एवं शास्त्रीय महत्व वर्णित है:"
            : "Every dimension of human experience is governed by one of the 12 Bhavas. The table below outlines the Sanskrit name, classical significations, and governing natural indicators (Karaka planets) for each house:"}
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="border-b border-[#ecdac8] bg-[#fffcf8] text-stone-700 font-serif">
              <tr>
                <th className="p-3 font-bold">{isTe ? "భావం" : isHi ? "भाव" : "House"}</th>
                <th className="p-3 font-bold">{isTe ? "సంస్కృత నామం" : isHi ? "संस्कृत नाम" : "Sanskrit Name"}</th>
                <th className="p-3 font-bold">{isTe ? "కారక గ్రహం" : isHi ? "कारक ग्रह" : "Natural Karaka"}</th>
                <th className="p-3 font-bold">{isTe ? "జీవన ఫలితాలు & కారకత్వాలు" : isHi ? "जीवन क्षेत्र एवं फल" : "Key Life Significations"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecdac8]/60 text-stone-600">
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "1వ భావం" : isHi ? "प्रथम भाव (1st)" : "1st House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "తను భావం (Tanu)" : "तनु भाव (Tanu)"}</td>
                <td className="p-3">{isTe ? "సూర్యుడు (Sun)" : isHi ? "सूर्य (Sun)" : "Sun (सूर्य)"}</td>
                <td className="p-3">
                  {isTe
                    ? "శారీరక ఆరోగ్యం, రూపం, వ్యక్తిత్వం, తల, ఆత్మగౌరవం మరియు ఆయుష్షు."
                    : isHi
                    ? "शारीरिक स्वास्थ्य, व्यक्तित्व, रूप-रंग, आत्म-पहचान, मस्तक एवं दीर्घायु।"
                    : "Physical vitality, body constitution, personality, head, self-identity, and longevity."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "2వ భావం" : isHi ? "द्वितीय भाव (2nd)" : "2nd House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "ధన భావం (Dhana)" : "धन भाव (Dhana)"}</td>
                <td className="p-3">{isTe ? "గురుడు (Jupiter)" : isHi ? "बृहस्पति (Jupiter)" : "Jupiter (बृहस्पति)"}</td>
                <td className="p-3">
                  {isTe
                    ? "సంపాదించిన సంపద, కుటుంబం, వాక్కు, ప్రాథమిక విద్య, ముఖ వర్చస్సు మరియు ఆహారపు అలవాట్లు."
                    : isHi
                    ? "संचित धन, पैतृक संपत्ति, वाणी, प्राथमिक शिक्षा, मुख एवं पारिवारिक संबंध।"
                    : "Accumulated wealth, speech, primary education, family heritage, facial features, and food habits."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "3వ భావం" : isHi ? "तृतीय भाव (3rd)" : "3rd House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "సహజ / భ్రాతృ (Sahaja)" : "सहज/भ्रातृ (Sahaja)"}</td>
                <td className="p-3">{isTe ? "కుజుడు (Mars)" : isHi ? "मंगल (Mars)" : "Mars (मंगल)"}</td>
                <td className="p-3">
                  {isTe
                    ? "ధైర్యం, పరాక్రమం, తోబుట్టువులు, చిన్న ప్రయాణాలు, రచన మరియు సమాచార నైపుణ్యాలు."
                    : isHi
                    ? "पराक्रम, साहस, छोटे भाई-बहन, लघु यात्राएं, लेखन, पराक्रम एवं संवाद क्षमता।"
                    : "Courage, initiative, siblings, short journeys, writing, arms/shoulders, and communicative skills."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "4వ భావం" : isHi ? "चतुर्थ भाव (4th)" : "4th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "సుఖ భావం (Sukha)" : "सुख भाव (Sukha)"}</td>
                <td className="p-3">{isTe ? "చంద్రుడు (Moon)" : isHi ? "चंद्र (Moon)" : "Moon (चंद्र)"}</td>
                <td className="p-3">
                  {isTe
                    ? "తల్లి, గృహం, వాహనాలు, మానసిక శాంతి, అంతర్గత సంతోషం మరియు స్థిరాస్తులు."
                    : isHi
                    ? "माता, भूमि, भवन, वाहन, आंतरिक सुख, मानसिक शांति, हृदय एवं पारिवारिक जड़ें।"
                    : "Mother, real estate, vehicles, inner contentment, mental peace, chest/heart, and domestic roots."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "5వ భావం" : isHi ? "पंचम भाव (5th)" : "5th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "పుత్ర / ధీ భావం (Putra)" : "पुत्र/धी भाव (Putra)"}</td>
                <td className="p-3">{isTe ? "గురుడు (Jupiter)" : isHi ? "बृहस्पति (Jupiter)" : "Jupiter (बृहस्पति)"}</td>
                <td className="p-3">
                  {isTe
                    ? "సంతానం, ఉన్నత విద్య, మేధస్సు, పూర్వ పుణ్యం, మంత్ర దీక్ష మరియు సృజనాత్మకత."
                    : isHi
                    ? "संतान, उच्च बुद्धि, विद्या, पूर्व जन्म के पुण्य (पूर्व पुण्य), मंत्र साधना एवं विवेक।"
                    : "Progeny, higher intellect, creativity, Purva Punya (past karmas), mantras, and speculative wisdom."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "6వ భావం" : isHi ? "षष्ठ भाव (6th)" : "6th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "రిపు / రోగ (Ari)" : "रिपु/रोग (Ari)"}</td>
                <td className="p-3">{isTe ? "కుజుడు / శని" : isHi ? "मंगल / शनि" : "Mars / Saturn"}</td>
                <td className="p-3">
                  {isTe
                    ? "శత్రువులు, రోగాలు, రుణాలు, ఉద్యోగం, పోటీలు మరియు న్యాయ వివాదాలు."
                    : isHi
                    ? "रोग, ऋण, शत्रु, दैनिक नौकरी, सेवा, कानूनी विवाद, रोग प्रतिरोधक क्षमता।"
                    : "Overcoming debts, litigations, diseases, daily employment, service, immune resilience, and competitors."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "7వ భావం" : isHi ? "सप्तम भाव (7th)" : "7th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "యువతి / కలత్ర (Yuvati)" : "युवति/कलत्र (Yuvati)"}</td>
                <td className="p-3">{isTe ? "శుక్రుడు (Venus)" : isHi ? "शुक्र (Venus)" : "Venus (शुक्र)"}</td>
                <td className="p-3">
                  {isTe
                    ? "జీవిత భాగస్వామి, వివాహం, వ్యాపార భాగస్వామ్యం, విదేశీ ప్రయాణం, సామాజిక హోదా."
                    : isHi
                    ? "जीवनसाथी, वैवाहिक सुख, व्यापारिक साझेदारी, विदेश यात्राएं, सामाजिक प्रतिष्ठा।"
                    : "Spouse, marital harmony, business partnerships, foreign travels, legal agreements, and social image."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "8వ భావం" : isHi ? "अष्टम भाव (8th)" : "8th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "రంధ్ర / ఆయు (Randhra)" : "रन्ध्र/आयु (Randhra)"}</td>
                <td className="p-3">{isTe ? "శని (Saturn)" : isHi ? "शनि (Saturn)" : "Saturn (शनि)"}</td>
                <td className="p-3">
                  {isTe
                    ? "ఆయుష్షు, ఆకస్మిక ధనలాభం, నిగూఢ శాస్త్రాలు, పరిశోధన మరియు రహస్యాలు."
                    : isHi
                    ? "आयु, गूढ़ विद्या, आकस्मिक धन/विरासत, रूपांतरण, दीर्घकालिक कष्ट, गुप्त रहस्य।"
                    : "Longevity, unearned wealth/inheritance, occult knowledge, transformations, chronic ailments, and mysteries."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "9వ భావం" : isHi ? "नवम भाव (9th)" : "9th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "ధర్మ / భాగ్య (Dharma)" : "धर्म/भाग्य (Dharma)"}</td>
                <td className="p-3">{isTe ? "గురుడు / సూర్యుడు" : isHi ? "बृहस्पति / सूर्य" : "Jupiter / Sun"}</td>
                <td className="p-3">
                  {isTe
                    ? "భాగ్యం, ధర్మం, తండ్రి, గురువు, తీర్థయాత్రలు, ఉన్నత విద్య మరియు పుణ్యకార్యాలు."
                    : isHi
                    ? "भाग्य, धर्म, पिता, गुरु, लंबी तीर्थ यात्राएं, उच्च दर्शन, नीति एवं सत्कर्म।"
                    : "Fortune (Bhagya), father, spiritual guru, long pilgrimages, dharma, higher philosophy, and righteousness."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "10వ భావం" : isHi ? "दशम भाव (10th)" : "10th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "కర్మ భావం (Karma)" : "कर्म भाव (Karma)"}</td>
                <td className="p-3">{isTe ? "బుధుడు / సూర్యుడు" : isHi ? "बुध / सूर्य" : "Mercury / Sun"}</td>
                <td className="p-3">
                  {isTe
                    ? "వృత్తి, ఉద్యోగం, కీర్తి, ప్రభుత్వ గౌరవం, నాయకత్వం మరియు వ్యాపార విజయం."
                    : isHi
                    ? "कर्म, आजीविका, पद-प्रतिष्ठा, प्रशासनिक अधिकार, सामाजिक ख्याति एवं नेतृत्व।"
                    : "Career, social status, government authority, leadership, professional achievements, and public fame."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "11వ భావం" : isHi ? "एकादश भाव (11th)" : "11th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "లాభ భావం (Labha)" : "लाभ भाव (Labha)"}</td>
                <td className="p-3">{isTe ? "గురుడు (Jupiter)" : isHi ? "बृहस्पति (Jupiter)" : "Jupiter (बृहस्पति)"}</td>
                <td className="p-3">
                  {isTe
                    ? "ఆర్థిక లాభాలు, కోరికల నెరవేర్పు, పెద్ద తోబుట్టువులు, మిత్రులు మరియు ఆశయాలు."
                    : isHi
                    ? "आर्थिक लाभ, मनोकामना पूर्ति, बड़े भाई-बहन, मित्र मंडली, उपहार एवं आय के स्रोत।"
                    : "Financial gains, fulfillment of aspirations, elder siblings, social network, awards, and cash inflows."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "12వ భావం" : isHi ? "द्वादश भाव (12th)" : "12th House"}</td>
                <td className="p-3 font-medium text-[#c2410c] font-serif">{isTe ? "వ్యయ భావం (Vyaya)" : "व्यय भाव (Vyaya)"}</td>
                <td className="p-3">{isTe ? "శని / కేతువు" : isHi ? "शनि / केतु" : "Saturn / Ketu"}</td>
                <td className="p-3">
                  {isTe
                    ? "ఖర్చులు, విదేశీ నివాసం, మోక్షం, నిద్ర, ధ్యానం మరియు ఆధ్యాత్మిక విముక్తి."
                    : isHi
                    ? "व्यय, विदेश प्रवास, मोक्ष, अवचेतन मन, एकांत साधना, निद्रा एवं आध्यात्मिक मुक्ति।"
                    : "Expenditures, foreign relocation, subconscious mind, meditation retreats, dreams, and spiritual Moksha."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. The 16 Divisional Charts (Shodashvarga) */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#d9531e] mb-3">
          <Table className="h-5 w-5" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isTe ? "16 వర్గ కుండలులు (షోడశవర్గ)" : isHi ? "16 वर्ग कुंडलियां (षोडशवर्ग रहस्य)" : "The 16 Divisional Charts (Shodashvarga)"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe
            ? "షోడశవర్గ చక్రాల ప్రాముఖ్యత (D-1 నుండి D-60)"
            : isHi
            ? "षोडशवर्ग कुंडलियों की शक्ति: सूक्ष्म फलकथन का आधार"
            : "Why the 16 Divisional Charts (Shodashvarga) Matter"}
        </h2>

        <div className="mt-4 space-y-3.5 text-xs sm:text-sm leading-relaxed text-stone-600 font-normal">
          <p>
            {isTe
              ? "ఒకే సమయంలో జన్మించిన ఇద్దరు వ్యక్తుల జీవితాలు ఎందుకు వేర్వేరుగా ఉంటాయో వివరించేందుకు మహర్షి పరాశరుడు 'షోడశవర్గ' పద్ధతిని ప్రవేశపెట్టారు. ప్రధాన లగ్న చక్రం (D-1) బాహ్య రూపాన్ని సూచిస్తే, నవాంశ (D-9) వ్యక్తి యొక్క అంతర్గత బలం మరియు వివాహ సౌభాగ్యాన్ని, దశమాంశ (D-10) సమాజంలో ఉన్నత పదవులను, షష్ట్యంశ (D-60) పూర్వజన్మ కర్మలను సూచిస్తుంది."
              : isHi
              ? "एक ही समय एवं स्थान पर जन्मे दो बालकों का भाग्य अलग क्यों होता है? इस गूढ़ प्रश्न का उत्तर महर्षि पराशर ने 'षोडशवर्ग' (16 Harmonic Charts) के रूप में दिया है। मुख्य लग्न कुंडली (D-1) मात्र बीज रूप है, जबकि उसका वास्तविक पल्लवन वर्ग कुंडलियों में दिखाई देता है। उदाहरण के लिए, यदि कोई ग्रह D-1 में नीच का हो किंतु नवांश (D-9) में उच्च का हो जाए, तो वह असाधारण राजयोग प्रदान करता है।"
              : "Why do twin births occurring within minutes of each other experience dramatically different fortunes? The answer lies in Maharishi Parashara's Shodashvarga system. While the Rasi chart (D-1) represents the tree trunk, the 16 harmonic subdivisions reveal the specific fruit. A planet appearing debilitated in the D-1 chart can achieve Neecha Bhanga Raja Yoga if it is exalted in the Navamsha (D-9), bestowing extraordinary success and spiritual growth in mid-to-late life."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-[#ecdac8] bg-[#fffcf8] p-3.5 shadow-2xs">
              <span className="font-serif font-bold text-[#c2410c] text-sm block">D-1 • Rasi</span>
              <p className="text-xs text-stone-700 font-semibold mt-1">
                {isTe ? "శారీరక జీవితం & లగ్నం" : isHi ? "शारीरिक जीवन एवं लग्न" : "Physical Life & Vitality"}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isTe
                  ? "12 భావాలలో నవగ్రహాల ప్రాథమిక స్థానాన్ని చూపే ప్రధాన జన్మ చక్రం."
                  : isHi
                  ? "द्वादश भावों में ग्रहों की प्राथमिक स्थिति दर्शाने वाली मूल जन्म पत्रिका।"
                  : "The primary chart mapping planetary placements across the 12 houses."}
              </p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-[#fffcf8] p-3.5 shadow-2xs">
              <span className="font-serif font-bold text-[#c2410c] text-sm block">D-9 • Navamsha</span>
              <p className="text-xs text-stone-700 font-semibold mt-1">
                {isTe ? "జీవిత భాగస్వామి & ధర్మం" : isHi ? "जीवनसाथी, भाग्य एवं धर्म" : "Spouse, Fortune & Dharma"}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isTe
                  ? "ప్రతి రాశిని 9 భాగాలుగా విభజించే చక్రం. దాంపత్య సుఖానికి సర్వోన్నత సూచిక."
                  : isHi
                  ? "प्रत्येक राशि का 9वां भाग (3°20')। वैवाहिक सुख और आंतरिक बल का सर्वोच्च सूचक।"
                  : "Dividing each sign into 9 parts (3°20'). Supreme indicator of marital bliss and inner strength."}
              </p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-[#fffcf8] p-3.5 shadow-2xs">
              <span className="font-serif font-bold text-[#c2410c] text-sm block">D-10 • Dashamsha</span>
              <p className="text-xs text-stone-700 font-semibold mt-1">
                {isTe ? "కెరీర్, ఉద్యోగం & కీర్తి" : isHi ? "करियर, अधिकार एवं प्रतिष्ठा" : "Career, Power & Fame"}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isTe
                  ? "వృత్తిపరమైన ఉన్నతి, వ్యాపార విజయం మరియు సామాజిక గౌరవాన్ని తెలియజేస్తుంది."
                  : isHi
                  ? "प्रत्येक राशि का 10वां भाग (3°00')। कार्यक्षेत्र, पद-प्रतिष्ठा एवं सफलता का विश्लेषण।"
                  : "Dividing each sign into 10 parts (3°00'). Essential for decoding professional zenith and authority."}
              </p>
            </div>
            <div className="rounded-2xl border border-[#ecdac8] bg-[#fffcf8] p-3.5 shadow-2xs">
              <span className="font-serif font-bold text-[#c2410c] text-sm block">D-60 • Shashtiamsha</span>
              <p className="text-xs text-stone-700 font-semibold mt-1">
                {isTe ? "పూర్వ జన్మ సంచిత కర్మలు" : isHi ? "पूर्व जन्म के संचित कर्म" : "Past Life Karmas"}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {isTe
                  ? "ప్రతి రాశిని 60 సూక్ష్మ భాగాలుగా విభజించే అత్యంత రహస్యమైన ఖచ్చితమైన చక్రం."
                  : isHi
                  ? "प्रत्येक राशि का 60वां सूक्ष्म भाग (0°30')। पराशर अनुसार सभी वर्गों में सर्वाधिक प्रभावशाली।"
                  : "Dividing each sign into 60 micro-arcs (0°30'). Ranked by Parashara as highest in weight."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Vimshottari Mahadasha & Ashtakavarga Systems */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vimshottari Dasha */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-[#d9531e] mb-2.5">
            <Clock className="h-4 w-4" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
              {isTe
                ? "వింశోత్తరి మహాదశ (120 సంవత్సరాల కాలచక్రం)"
                : isHi
                ? "विंशोत्तरी महादशा (120 वर्षीय कालचक्र)"
                : "Vimshottari Dasha (120-Year Timeline)"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isTe
              ? "వింశోత్తరి దశ పద్ధతి వైదిక జ్యోతిషంలో కాల-గణనానికి అత్యంత ప్రామాణికమైన విధానం. మానవుని 120 సంవత్సరాల ఆయుష్షును 9 గ్రహాల మహాదశలుగా విభజిస్తారు (సూర్య 6 సం, చంద్ర 10 సం, కుజ 7 సం, రాహు 18 సం, గురు 16 సం, శని 19 సం, బుధ 17 సం, కేతు 7 సం, శుక్ర 20 సం). జన్మ నక్షత్రం ఆధారంగా దశల కాలక్రమం మరియు జీవిత ఘట్టాలు ఖచ్చితంగా నిర్ణయించబడతాయి."
              : isHi
              ? "विंशोत्तरी दशा वैदिक ज्योतिष का काल-मापक यंत्र है। मनुष्य की 120 वर्ष की संभावित आयु को 9 ग्रहों के महादशा चक्र में विभाजित किया जाता है (सूर्य 6 वर्ष, चंद्र 10 वर्ष, मंगल 7 वर्ष, राहु 18 वर्ष, गुरु 16 वर्ष, शनि 19 वर्ष, बुध 17 वर्ष, केतु 7 वर्ष, शुक्र 20 वर्ष)। जन्म के समय चंद्रमा जिस नक्षत्र में होता है, उससे पहली महादशा प्रारंभ होती है और सटीक फलादेश प्राप्त होता है।"
              : "Vimshottari Dasha is the premier timing technique in Parashari astrology. Based on the exact degree of the Moon in its birth Nakshatra, an individual's lifetime is apportioned across the 9 planetary lords totaling 120 solar years (Sun 6y, Moon 10y, Mars 7y, Rahu 18y, Jupiter 16y, Saturn 19y, Mercury 17y, Ketu 7y, Venus 20y). It pinpoints precisely when karmic fruits mature."}
          </p>
        </div>

        {/* Parashari Ashtakavarga */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-[#d9531e] mb-2.5">
            <Sparkles className="h-4 w-4" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
              {isTe
                ? "సర్వాష్టకవర్గ (SAV 337 బిందువులు) & గోచార బలం"
                : isHi
                ? "सर्वाष्टाकवर्ग (SAV) एवं गोचर शक्ति"
                : "Parashari Ashtakavarga (337 Bindus)"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isTe
              ? "అష్టకవర్గ విధానం గ్రహాల పరస్పర శుభత్వాన్ని గణిత శాస్త్రబద్ధంగా కొలుస్తుంది. సర్వాష్టకవర్గంలో మొత్తం 337 శుభ బిందువులు ఉంటాయి. ఏదైనా భావంలో 28 లేదా అంతకంటే ఎక్కువ బిందువులు ఉంటే ఆ భావం సంపూర్ణ బలాన్ని కలిగి ఉంటుంది. శని లేదా గురు గ్రహాలు అధిక బిందువులు గల రాశులలో గోచరించినప్పుడు జీవితంలో అద్భుత విజయాలు లభిస్తాయి."
              : isHi
              ? "अष्टाकवर्ग प्रणाली ग्रहों के सापेक्षिक बल का गणितीय मापन है। सर्वाष्टाकवर्ग में कुल 337 शुभ बिंदु होते हैं। किसी भाव में 28 या अधिक बिंदु उस भाव की दृढ़ता और समृद्धि सुनिश्चित करते हैं। जब शनि, गुरु या राहु जैसे मंद गति ग्रह उच्च बिंदु वाले भावों से गोचर करते हैं, तब जीवन में अप्रत्याशित सफलता और उन्नति प्राप्त होती है।"
              : "Ashtakavarga translates to 'eight-fold division'. In this objective mathematical matrix, the 7 physical planets and Lagna cast positive points (Bindus) across all 12 houses, creating a baseline of 337 total points. Any house scoring 28 or more Bindus represents resilient karmic strength; transits of Saturn and Jupiter over high-point houses trigger major auspicious milestones."}
          </p>
        </div>
      </section>

      {/* 5. Related Vedic Spiritual Tools Cross-Links */}
      <section className="rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#fffdfa] via-white to-[#fff8ef] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#3b1812] mb-2 text-center">
          {isTe ? "సంబంధిత ప్రామాణిక వైదిక సాధనాలు" : isHi ? "संबंधित वैदिक उपकरण एवं गणनाएं" : "Explore Related Authentic Vedic Astrological Tools"}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 text-center max-w-2xl mx-auto mb-6">
          {isTe
            ? "మీ జాతక విశ్లేషణను మరింత లోతుగా అర్థం చేసుకోవడానికి మా ఉచిత సాధనాలను ఉపయోగించండి:"
            : isHi
            ? "अपनी जन्म पत्रिका के विभिन्न आयामों को गहराई से समझने हेतु हमारे अन्य वैदिक उपकरणों का निःशुल्क लाभ लें:"
            : "Deepen your astrological discovery with our comprehensive suite of free, authentic Vedic calculators:"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={isTe ? `/te${PATHS.kundliMilan}` : isHi ? `/hi${PATHS.kundliMilan}` : PATHS.kundliMilan}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Heart className="h-4 w-4" />
              <span>{isTe ? "కుండలి మిలనం" : isHi ? "कुंडली मिलान" : "Kundli Milan"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "36 గుణాల వివాహ పొంతన" : isHi ? "36 गुण विवाह मिलान" : "36 Guna Ashtakoot"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "వధూవరుల 36 గుణాల మిలనం, నాడీ దోషం మరియు భకూట్ పరిహార పరిశీలన."
                : isHi
                ? "वर-वधू के 36 गुण, नाड़ी दोष एवं भकूट परिहार का सम्पूर्ण विश्लेषण।"
                : "Check marriage compatibility, Nadi dosha, and Bhakoot parihara between bride and groom."}
            </p>
          </Link>

          <Link
            href={isTe ? `/te${PATHS.manglikDosha}` : isHi ? `/hi${PATHS.manglikDosha}` : PATHS.manglikDosha}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Flame className="h-4 w-4" />
              <span>{isTe ? "మాంగ్లిక్ దోషం" : isHi ? "मांगलिक दोष" : "Manglik Dosha"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "16 పరిహార నియమాలు" : isHi ? "16 परिहार कैलकुलेटर" : "16 Apavada Check"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "లగ్నం, చంద్రుడు, శుక్రుడి నుండి కుజ దోష విశ్లేషణ మరియు శాస్త్రీయ పరిహారాలు."
                : isHi
                ? "लग्न, चंद्र व शुक्र से कुज दोष तथा 16 शास्त्रीय परिहार नियमों की जांच।"
                : "Analyze Kuja Dosha from Lagna, Moon, and Venus with authentic Parashara cancellation rules."}
            </p>
          </Link>

          <Link
            href={isTe ? `/te${PATHS.kaalSarpDosha}` : isHi ? `/hi${PATHS.kaalSarpDosha}` : PATHS.kaalSarpDosha}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Compass className="h-4 w-4" />
              <span>{isTe ? "కాల సర్ప యోగం" : isHi ? "काल सर्प दोष" : "Kaal Sarp Yoga"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "12 కాల సర్ప యోగాలు" : isHi ? "12 काल सर्प योग" : "12 Classical Yogas"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "అనంత, కుళిక, వాసుకి మొదలైన 12 యోగాల విశ్లేషణ మరియు నివారణా మార్గాలు."
                : isHi
                ? "अनंत, कुलिक, वासुकि आदि 12 काल सर्प योगों की पहचान एवं वैदिक उपाय।"
                : "Identify Anant, Kulik, Vasuki, and Sheshnag formations with Vedic remedies and guidance."}
            </p>
          </Link>

          <Link
            href={isTe ? `/te${PATHS.panchang}` : isHi ? `/hi${PATHS.panchang}` : PATHS.panchang}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Sun className="h-4 w-4" />
              <span>{isTe ? "దిన పంచాంగం" : isHi ? "दैनिक पंचांग" : "Daily Panchang"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "శుభ ముహూర్తం & చోఘడియా" : isHi ? "शुभ मुहूर्त एवं चौघड़िया" : "Shubh Muhurat & Tithi"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "రాహుకాలం, అభిజిత్ ముహూర్తం, తిథి, నక్షత్రం మరియు చోఘడియా ప్రత్యక్ష గణనలు."
                : isHi
                ? "राहु काल, अभिजित मुहूर्त, नक्षत्र, तिथि एवं दिन-रात चौघड़िया की सटीक गणना।"
                : "Real-time astronomical almanac with Rahu Kaal, Abhijit Muhurat, Nakshatra, and Choghadiya."}
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}

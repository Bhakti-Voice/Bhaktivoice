import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Compass,
  Flame,
  Heart,
  Sparkles,
  Sun,
  Table,
} from "lucide-react";
import { PATHS } from "@/lib/seo/paths";

interface KundliMilanEditorialContentProps {
  isHi?: boolean;
  isTe?: boolean;
}

export function KundliMilanEditorialContent({ isHi = false, isTe = false }: KundliMilanEditorialContentProps) {
  return (
    <article className="mt-14 space-y-12 border-t border-[#ecdac8]/80 pt-10 text-stone-800 print:hidden">
      {/* 1. Introduction: The Sacred Science of Kundli Milan */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#d9531e] mb-3">
          <Heart className="h-5 w-5 fill-[#d9531e]" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isTe ? "ప్రామాణిక వైదిక వివాహ మేళాపకం" : isHi ? "वैदिक विवाह मेलापक शास्त्र" : "The Sacred Science of Vedic Matchmaking"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe
            ? "కుండలి మిలనం ప్రాముఖ్యత: వైదిక వివాహ పొంతన (36 గుణాలు)"
            : isHi
            ? "कुंडली मिलान का शास्त्रीय महत्व: 36 गुण एवं अष्टकूट रहस्य"
            : "The Significance of Kundli Milan: Understanding 36 Gunas & Ashtakoot Matching"}
        </h2>

        <div className="mt-4 space-y-3.5 text-xs sm:text-sm leading-relaxed text-stone-600 font-normal">
          <p>
            {isTe
              ? "సనాతన ధర్మంలో వివాహం అనేది కేవలం ఇద్దరు వ్యక్తుల సాంఘిక కలయిక మాత్రమే కాదు, రెండు ఆత్మల పవిత్ర బంధం (ధర్మ, అర్థ, కామ, మోక్షాల సాధన). మహర్షి పరాశర మరియు వరాహమిహిరుల ప్రకారం, వధూవరుల మానసిక, శారీరక, ఆర్థిక మరియు ఆధ్యాత్మిక సామరస్యాన్ని నిర్ణయించడానికి 'అష్టకూట గుణ మేళాపకం' ప్రామాణిక కొలమానంగా పరిగణించబడుతుంది."
              : isHi
              ? "सनातन धर्म में विवाह केवल दो शरीरों का मिलन नहीं, अपितु दो आत्माओं का पवित्र आध्यात्मिक गठबंधन है जो धर्म, अर्थ, काम और मोक्ष के चतुर्विध पुरुषार्थों की सिद्धि हेतु किया जाता है। महर्षि पराशर एवं वराहमिहिर ने विवाह पूर्व वर एवं कन्या की कुंडलियों के परीक्षण हेतु 'अष्टकूट गुण मेलापक' प्रणाली का विधान किया है, जिसमें कुल 36 गुणों का मिलान किया जाता है।"
              : "In Vedic Sanatana tradition, marriage (Vivaha Samskara) is a sacred spiritual union binding two souls across lifetimes in pursuit of the four Purusharthas: Dharma (duty), Artha (prosperity), Kama (desire), and Moksha (spiritual liberation). As systematized in Muhurta Chintamani and Brihat Parashara Hora Shastra, Ashtakoot Milan evaluates the natal Moon positions of the bride and groom across 8 essential life parameters, totaling 36 Gunas."}
          </p>
          <p>
            {isTe
              ? "చంద్రుడు మానసిక స్థితిని, భావోద్వేగాలను పాలిస్తాడు (చంద్రమా మనసో జాతః). అష్టకూట మిలనం ద్వారా చంద్ర నక్షత్రం మరియు రాశి ఆధారంగా వధూవరుల స్వభావం, శారీరక అనుకూలత, వంశాభివృద్ధి మరియు సుదీర్ఘ ఆయుష్షు యొక్క సమగ్ర విశ్లేషణ జరుగుతుంది."
              : isHi
              ? "ज्योतिष में चंद्रमा को मन का कारक (चंद्रमा मनसो जातः) माना गया है। दांपत्य जीवन की सफलता परस्पर मानसिक तारतम्य, सहिष्णुता और भावनात्मक तालमेल पर निर्भर करती है। अष्टकूट मिलान चंद्रमा के नक्षत्र और राशि के आधार पर वर-कन्या के स्वभाव, शारीरिक अनुकूलता, संतति सुख एवं दीर्घायु का विश्लेषण करता है।"
              : "In Vedic cosmology, the Moon rules the subconscious mind and emotions ('Chandrama Manaso Jatah'). Ashtakoot matchmaking specifically interrogates the natal Moon's Nakshatra and Rashi to assess temperamental compatibility, genetic viability, mutual respect, psychological bonding, and enduring family harmony."}
          </p>
        </div>
      </section>

      {/* 2. The 8 Kootas Detailed Table */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#d9531e] mb-3">
          <Table className="h-5 w-5" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {isTe ? "అష్టకూట 8 గుణాల విశ్లేషణ" : isHi ? "अष्टकूट के 8 कूट एवं 36 गुणों का विभाजन" : "The 8 Kootas & 36 Gunas Explained"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight">
          {isTe ? "36 గుణాల సమగ్ర పట్టిక & కారకత్వాలు" : isHi ? "36 गुणों की विस्तृत तालिका एवं उनका प्रभाव" : "Detailed Breakdown of the 36 Gunas Matrix"}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          {isTe
            ? "అష్టకూట పద్ధతిలో 8 వేర్వేరు విభాగాలకు 1 నుండి 8 వరకు గుణాలు కేటాయించబడ్డాయి. వీటి మొత్తం 36 గుణాలు:"
            : isHi
            ? "अष्टकूट पद्धति में 8 विभिन्न कूटों को 1 से 8 तक अंक आवंटित किए गए हैं, जिनका कुल योग 36 होता है:"
            : "Each of the 8 Kootas carries an escalating numerical weight from 1 to 8, evaluating increasingly critical levels of domestic and physiological compatibility:"}
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="border-b border-[#ecdac8] bg-[#fffcf8] text-stone-700 font-serif">
              <tr>
                <th className="p-3 font-bold">{isTe ? "కూటం" : isHi ? "कूट" : "Koota"}</th>
                <th className="p-3 font-bold">{isTe ? "గరిష్ట గుణాలు" : isHi ? "अधिकतम गुण" : "Max Points"}</th>
                <th className="p-3 font-bold">{isTe ? "పరీక్షించే అంశం" : isHi ? "परीक्षण का विषय" : "Area of Compatibility"}</th>
                <th className="p-3 font-bold">{isTe ? "శాస్త్రీయ ప్రాముఖ్యత" : isHi ? "शास्त्रीय प्रभाव एवं महत्व" : "Astrological Significance"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecdac8]/60 text-stone-600">
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "1. వర్ణం (Varna)" : isHi ? "1. वर्ण (Varna)" : "1. Varna (वर्ण)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "1 గుణం" : isHi ? "1 अंक" : "1 Point"}</td>
                <td className="p-3">
                  {isTe ? "ఆధ్యాత్మిక దృక్పథం & పని స్వభావం" : isHi ? "आध्यात्मिक प्रवृत्ति एवं कार्य प्रकृति" : "Spiritual Ego & Work Nature"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "బ్రాహ్మణ, క్షత్రియ, వైశ్య, శూద్ర ప్రవృత్తుల ఆధారంగా మానసిక మరియు ఆధ్యాత్మిక సామరస్య పరిశీలన."
                    : isHi
                    ? "ब्राह्मण, क्षत्रिय, वैश्य, शूद्र स्वभाव के आधार पर मानसिक व आध्यात्मिक अनुकूलता की जांच।"
                    : "Assesses spiritual compatibility and social outlook across Brahmin, Kshatriya, Vaishya, and Shudra mentalities."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "2. వశ్యం (Vashya)" : isHi ? "2. वश्य (Vashya)" : "2. Vashya (वश्य)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "2 గుణాలు" : isHi ? "2 अंक" : "2 Points"}</td>
                <td className="p-3">
                  {isTe ? "పరస్పర ఆకర్షణ & సమతుల్యత" : isHi ? "परस्पर आकर्षण एवं संतुलन" : "Mutual Dominance & Attraction"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "దంపతుల మధ్య పరస్పర ఆకర్షణ, సహజీవనం మరియు ప్రేమానురాగాల సమతుల్యత."
                    : isHi
                    ? "दंपति के मध्य पारस्परिक प्रभाव, समर्पण भाव, प्रेम और संतुलन का परीक्षण।"
                    : "Measures balance of power, mutual emotional attraction, and healthy respect between spouses."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "3. తార (Tara)" : isHi ? "3. तारा (Tara)" : "3. Tara (तारा)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "3 గుణాలు" : isHi ? "3 अंक" : "3 Points"}</td>
                <td className="p-3">
                  {isTe ? "భాగ్యం, ఆరోగ్యం & ఆయుష్షు" : isHi ? "भाग्य, स्वास्थ्य एवं दीर्घायु" : "Destiny, Health & Longevity"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "జన్మ నక్షత్రాల దూరం (9 తారలు) ఆధారంగా క్షేమ, సంపద, ఆయుష్షు మరియు అదృష్ట విశ్లేషణ."
                    : isHi
                    ? "जन्म नक्षत्रों की दूरी (9 तारा चक्र) द्वारा सुख-सौभाग्य, आरोग्य और दीर्घायु की गणना।"
                    : "Evaluates birth Nakshatra inter-distance across 9 Taras (Janma, Sampat, Vipat, Kshema, etc.)."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "4. యోని (Yoni)" : isHi ? "4. योनि (Yoni)" : "4. Yoni (योनि)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "4 గుణాలు" : isHi ? "4 अंक" : "4 Points"}</td>
                <td className="p-3">
                  {isTe ? "శారీరక & జీవ సంబంధిత పొంతన" : isHi ? "शारीरिक एवं जैविक सामंजस्य" : "Physical & Biological Harmony"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "14 జంతు ప్రతీకల ద్వారా దంపతుల మధ్య శారీరక సాన్నిహిత్యం మరియు పరస్పర సంతోషం."
                    : isHi
                    ? "14 पशु प्रतीकों के माध्यम से प्राकृतिक आकर्षण, आत्मीయता और शारीरिक अनुकूलता।"
                    : "Maps biological instincts and physical attraction through 14 animal archetypes."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "5. గ్రహ మైత్రి (Graha Maitri)" : isHi ? "5. ग्रह मैत्री (Graha Maitri)" : "5. Graha Maitri (ग्रह मैत्री)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "5 గుణాలు" : isHi ? "5 अंक" : "5 Points"}</td>
                <td className="p-3">
                  {isTe ? "మేధో సంపత్తి & మానసిక స్నేహం" : isHi ? "मानसिक मित्रता एवं बौद्धिक तालमेल" : "Intellectual Bond & Friendship"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "చంద్ర రాశ్యాధిపతుల మధ్య స్నేహం ద్వారా ఆలోచనా సఖ్యత, సంభాషణ మరియు పరస్పర గౌరవం."
                    : isHi
                    ? "चंद्र राशि स्वामियों की परस्पर मित्रता से विचार-सामंजस्य, संवाद सुख एवं बौद्धिक तालमेल।"
                    : "Assesses natural friendship or enmity between Moon sign lords, vital for intellectual companionship."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "6. గణం (Gana)" : isHi ? "6. गण (Gana)" : "6. Gana (गण)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "6 గుణాలు" : isHi ? "6 अंक" : "6 Points"}</td>
                <td className="p-3">
                  {isTe ? "స్వభావం & జీవన విలువలు" : isHi ? "स्वभाव, आचरण एवं जीवन मूल्य" : "Temperament & Core Values"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "దేవ (సాత్విక), మనుష్య (వ్యవహారిక), రాక్షస (ఆవేశ) ప్రవృత్తుల స్వభావ సామరస్య పరిశీలన."
                    : isHi
                    ? "देव (सात्विक), मनुष्य (व्यावहारिक), राक्षस (आक्रामक) गणों द्वारा स्वभाव एवं आचरण का मिलान।"
                    : "Categorizes soul inclination into Deva, Manushya, and Rakshasa temperaments."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900">{isTe ? "7. భకూట్ (Bhakoot)" : isHi ? "7. भकूट (Bhakoot)" : "7. Bhakoot (भकूट)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "7 గుణాలు" : isHi ? "7 अंक" : "7 Points"}</td>
                <td className="p-3">
                  {isTe ? "ఆర్థిక శ్రేయస్సు & దాంపత్య ప్రేమ" : isHi ? "पारिवारिक सुख, प्रेम एवं धन वृद्धि" : "Emotional & Financial Welfare"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "2-12 (ద్విర్ద్వాదశ), 6-8 (షడాష్టక), 9-5 (నవమ-పంచమ) రాశి సంబంధాల ద్వారా సంపద మరియు ఆరోగ్యం."
                    : isHi
                    ? "2-12 (द्विर्द्वादश), 6-8 (षडाष्टक), 9-5 (नवम-पंचम) राशि अंतर की जांच ताकि आर्थिक समृद्धि व स्वास्थ्य सुरक्षित रहे।"
                    : "Analyzes angular moon sign distance to safeguard family wealth, health, and emotional warmth."}
                </td>
              </tr>
              <tr className="bg-[#fffdfa]">
                <td className="p-3 font-bold text-stone-900">{isTe ? "8. నాడీ (Nadi)" : isHi ? "8. नाड़ी (Nadi)" : "8. Nadi (नाड़ी)"}</td>
                <td className="p-3 font-mono font-bold text-[#c2410c]">{isTe ? "8 గుణాలు" : isHi ? "8 अंक" : "8 Points"}</td>
                <td className="p-3">
                  {isTe ? "జన్యుపరమైన ఆరోగ్యం & సంతాన భాగ్యం" : isHi ? "आनुवंशिक स्वास्थ्य एवं संतति सुख" : "Genetic Health & Progeny"}
                </td>
                <td className="p-3">
                  {isTe
                    ? "ఆది (వాత), మధ్య (పిత్త), అంత్య (కఫ) నాడుల ద్వారా సంతాన సౌఖ్యం మరియు సంపూర్ణ ఆరోగ్యం (సర్వోన్నత 8 గుణాలు)."
                    : isHi
                    ? "आदि (वात), मध्य (पित्त), अंत्य (कफ) नाड़ी द्वारा स्वस्थ संतान एवं दीर्घायु का परीक्षण (सर्वाधिक 8 अंक)।"
                    : "Holds highest weight (8/36). Checks physiological constitution to guarantee robust health and progeny."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Scoring Interpretation Thresholds */}
      <section className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b1812] tracking-tight mb-4">
          {isTe ? "గుణ మిలనం స్కోరు వివరణ & ఫలితం" : isHi ? "गुण मिलान स्कोर का अर्थ एवं निर्णय" : "How to Interpret the 36 Guna Score"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 shadow-2xs">
            <span className="font-serif font-black text-rose-700 text-lg sm:text-xl block">
              {isTe ? "18 కన్నా తక్కువ" : isHi ? "18 से कम गुण" : "< 18 Gunas"}
            </span>
            <h4 className="font-bold text-stone-900 text-xs mt-1">
              {isTe ? "అనుకూలం కాదు / అశుభం" : isHi ? "अशुभ / प्रतिकूल" : "Inauspicious / Unfavorable"}
            </h4>
            <p className="text-[11px] text-stone-600 mt-1">
              {isTe
                ? "కనీస ప్రమాణం కంటే తక్కువ. వివాహానికి ముందు జ్యోతిష నిపుణుల సలహా మరియు శాంతి పరిహారాలు అవసరం."
                : isHi
                ? "पारंपरिक मान्यता से कम। विवाह पूर्व योग्य ज्योतिषी से परामर्श एवं शांति विधान आवश्यक है।"
                : "Below the traditional Vedic threshold. Deep astrological review and remedial rituals are recommended."}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
            <span className="font-serif font-black text-amber-700 text-lg sm:text-xl block">
              {isTe ? "18 – 24 గుణాలు" : isHi ? "18 – 24 गुण" : "18 – 24 Gunas"}
            </span>
            <h4 className="font-bold text-stone-900 text-xs mt-1">
              {isTe ? "మధ్యమం / అంగీకారయోగ్యం" : isHi ? "मध्यम / स्वीकार्य" : "Average / Acceptable"}
            </h4>
            <p className="text-[11px] text-stone-600 mt-1">
              {isTe
                ? "కనీస అర్హత గల పొంతన. నాడీ మరియు భకూట్ దోషాలు లేకపోతే లేదా పరిహారం ఉంటే వివాహం శుభప్రదం."
                : isHi
                ? "न्यूनतम सीमा पूर्ण। यदि नाड़ी और भकूट दोष न हों या उनका परिहार हो, तो विवाह शुभ माना जाता है।"
                : "Meets minimum requirements. Marriage can proceed if Nadi and Bhakoot doshas are absent or cancelled."}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
            <span className="font-serif font-black text-blue-700 text-lg sm:text-xl block">
              {isTe ? "25 – 32 గుణాలు" : isHi ? "25 – 32 गुण" : "25 – 32 Gunas"}
            </span>
            <h4 className="font-bold text-stone-900 text-xs mt-1">
              {isTe ? "ఉత్తమం / ఎంతో శుభకరం" : isHi ? "उत्तम / अत्यंत शुभ" : "Good / Highly Auspicious"}
            </h4>
            <p className="text-[11px] text-stone-600 mt-1">
              {isTe
                ? "ఆరోగ్యం, భావోద్వేగాలు, సంపద మరియు స్వభావంలో ఉత్తమ సమతుల్యత. ఆనందకరమైన దాంపత్యం లభిస్తుంది."
                : isHi
                ? "स्वास्थ्य, विचार, धन और स्वभाव का श्रेष्ठ संतुलन। दीर्घायु और सुखद दांपत्य जीवन हेतु उत्तम।"
                : "Strong alignment across health, emotions, finances, and temperament. Promotes lasting marital joy."}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
            <span className="font-serif font-black text-emerald-700 text-lg sm:text-xl block">
              {isTe ? "33 – 36 గుణాలు" : isHi ? "33 – 36 गुण" : "33 – 36 Gunas"}
            </span>
            <h4 className="font-bold text-stone-900 text-xs mt-1">
              {isTe ? "అత్యుత్తమం / దైవిక సంయోగం" : isHi ? "अति उत्तम / दिव्य संयोग" : "Exceptional / Divine Union"}
            </h4>
            <p className="text-[11px] text-stone-600 mt-1">
              {isTe
                ? "అరుదైన అత్యుత్తమ మేళాపకం. జీవితంలో అంతులేని ఐశ్వర్యం, శాశ్వత ప్రేమ, వంశాభివృద్ధి మరియు సుఖసంతోషాలు."
                : isHi
                ? "दुर्लभ स्वर्गीय अनुकूलता (उत्तमोत्तम मिलान)। जीवन में अपार समृद्धि, पारस्परिक निष्ठा एवं सुख की प्राप्ति।"
                : "Rare heavenly compatibility (Uttamottam Milan). Bestows immense prosperity, mutual devotion, and longevity."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Nadi & Bhakoot Dosha Cancellation Rules */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nadi Dosha Cancellation */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-[#d9531e] mb-2.5">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
              {isTe ? "నాడీ దోష పరిహార నియమాలు" : isHi ? "नाड़ी दोष के शास्त्रीय परिहार नियम" : "Nadi Dosha Cancellation (Parihara)"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
            {isTe
              ? "ఒకే నాడీ ఉన్నప్పుడు 8 గుణాలు కోల్పోతారు, కానీ శాస్త్రాల ప్రకారం క్రింది సందర్భాలలో నాడీ దోషం రద్దవుతుంది:"
              : isHi
              ? "समान नाड़ी होने पर 8 अंकों का नुकसान होता है, किंतु शास्त्रों में इसके स्पष्ट परिहार वर्णित हैं:"
              : "While sharing the same Nadi forfeits 8 points, classical treatises define absolute cancellations:"}
          </p>
          <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <li>
              • <strong>{isTe ? "ఒకే రాశి, వేర్వేరు నక్షత్రాలు" : isHi ? "एक ही राशि, भिन्न नक्षत्र" : "Same Rashi, Different Nakshatras"}</strong>:{" "}
              {isTe ? "నాడీ దోషాన్ని సంపూర్ణంగా రద్దు చేస్తుంది." : isHi ? "नाड़ी दोष को पूर्णतः समाप्त करता है।" : "Completely cancels Nadi Dosha."}
            </li>
            <li>
              • <strong>{isTe ? "ఒకే నక్షత్రం, వేర్వేరు రాశులు" : isHi ? "एक ही नक्षत्र, भिन्न राशियां" : "Same Nakshatra, Different Rashis"}</strong>:{" "}
              {isTe ? "రాశి సరిహద్దు విభజన వలన దోష ప్రభావం తొలగిపోతుంది." : isHi ? "राशि सीमा अंतर से दोष स्वतः निष्प्रभावी हो जाता है।" : "Moon spanning sign boundary nullifies affliction."}
            </li>
            <li>
              • <strong>{isTe ? "నక్షత్ర పాదం వేరుగా ఉండడం" : isHi ? "नक्षत्र पाद (चरण) भिन्न होना" : "Same Nakshatra, Different Padas (Quarters)"}</strong>:{" "}
              {isTe ? "శారీరక మరియు జన్యుపరమైన విభేదాలను సమతుల్యం చేస్తుంది." : isHi ? "जैविक विरोध को निष्प्रभावित कर देता है।" : "Neutralizes bio-karmic clash."}
            </li>
            <li>
              • <strong>{isTe ? "శుభ రాశ్యాధిపతులు" : isHi ? "शुभ राशि स्वामी" : "Benefic Rashi Lords"}</strong>:{" "}
              {isTe ? "గురుడు, బుధుడు లేదా శుక్రుడు రాశ్యాధిపతులైతే దోష తీవ్రత గణనీయంగా తగ్గుతుంది." : isHi ? "यदि राशि स्वामी गुरु, बुध अथवा शुक्र हों, तो दोष न्यून हो जाता है।" : "If Moon lords are Jupiter, Mercury, or Venus, severity drops sharply."}
            </li>
          </ul>
        </div>

        {/* Bhakoot Dosha Cancellation */}
        <div className="rounded-3xl border border-[#ecdac8] bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 text-[#d9531e] mb-2.5">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b1812]">
              {isTe ? "భకూట్ దోష పరిహార నియమాలు" : isHi ? "भकूट दोष के शास्त्रीय परिहार नियम" : "Bhakoot Dosha Cancellation (Parihara)"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
            {isTe
              ? "2-12 (ద్విర్ద్వాదశ), 6-8 (షడాష్టక) లేదా 9-5 (నవమ-పంచమ) భకూట్ దోషాలు క్రింది స్థితులలో రద్దవుతాయి:"
              : isHi
              ? "2-12 (द्विर्द्वादश), 6-8 (षडाष्टक) या 9-5 (नवम-पंचम) भकूट दोष निम्नलिखित स्थितियों में निरस्त होता है:"
              : "Angular moon sign mismatches (2-12, 6-8, or 9-5) are cancelled under the following conditions:"}
          </p>
          <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <li>
              • <strong>{isTe ? "ఒకే గ్రహాధిపత్యం" : isHi ? "एक ही ग्रह का स्वामित्व" : "Same Planetary Lord"}</strong>:{" "}
              {isTe ? "మేషం-వృశ్చికం (కుజుడు) లేదా వృషభం-తుల (శుక్రుడు) 6-8 భకూట్ దోషాన్ని నివారిస్తాయి." : isHi ? "मेष-वृश्चिक (मंगल) अथवा वृषभ-तुला (शुक्र) होने पर 6-8 भकूट दोष नष्ट होता है।" : "Aries-Scorpio (Mars) or Taurus-Libra (Venus) cancels 6-8 Bhakoot."}
            </li>
            <li>
              • <strong>{isTe ? "పరస్పర మైత్రి" : isHi ? "परस्पर मित्रता" : "Mutual Friendship"}</strong>:{" "}
              {isTe ? "ఇరు రాశుల అధిపతులు మిత్రులైతే (ఉదా: సూర్యుడు & గురుడు) భకూట్ దోషం ఉండదు." : isHi ? "यदि दोनों राशि स्वामी नैसर्गिक मित्र हों (जैसे सूर्य व गुरु), तो भकूट का परिहार होता है।" : "If lords of both Moon signs are natural friends (e.g. Sun & Jupiter)."}
            </li>
            <li>
              • <strong>{isTe ? "శుభ నవాంశ (D-9) అమరిక" : isHi ? "शुभ नवांश (D-9) स्थिति" : "Benefic Navamsha (D-9) Alignment"}</strong>:{" "}
              {isTe ? "నవాంశ చక్రంలో శుభ స్థానాలు బాహ్య భకూట్ దోషాన్ని పూర్తిగా తొలగిస్తాయి." : isHi ? "नवांश में शुभ ग्रह स्थिति होने पर राशि भकूट की बाधा दूर हो जाती है।" : "Favorable D-9 placements override physical Bhakoot tension."}
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Related Astrological Tools Cross-Links */}
      <section className="rounded-3xl border border-[#ecdac8] bg-gradient-to-br from-[#fffdfa] via-white to-[#fff8ef] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#3b1812] mb-2 text-center">
          {isTe ? "సంబంధిత ప్రామాణిక వైదిక సాధనాలు" : isHi ? "संबंधित ज्योतिषीय एवं विवाह उपकरण" : "Explore Related Vedic Marriage & Astrological Tools"}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 text-center max-w-2xl mx-auto mb-6">
          {isTe
            ? "మీ జాతక విశ్లేషణను మరియు వివాహ నిర్ణయాన్ని బలపరచడానికి మా ఇతర సాధనాలను ఉపయోగించండి:"
            : isHi
            ? "अपने वैवाहिक निर्णय और ग्रह विश्लेषण को अधिक पुख्ता बनाने हेतु हमारे अन्य प्रामाणिक उपकरणों का लाभ लें:"
            : "Complete your matrimonial evaluation with our specialized Vedic astrological analyzers:"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={isTe ? `/te${PATHS.kundli}` : isHi ? `/hi${PATHS.kundli}` : PATHS.kundli}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Sparkles className="h-4 w-4" />
              <span>{isTe ? "జన్మ కుండలి" : isHi ? "जन्म कुंडली" : "Janam Kundli"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "ఉచిత జన్మ చక్రం" : isHi ? "मुफ्त जन्म चक्र" : "Individual Horoscope"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "16 వర్గ కుండలులు (D-1 నుండి D-60), నవగ్రహ స్థితులు మరియు వింశోత్తరి మహాదశ."
                : isHi
                ? "16 वर्ग कुंडलियां (D-1 से D-60), नवग्रह स्थिति एवं विंशोत्तरी महादशा रिपोर्ट।"
                : "Generate full 16 divisional charts (D-1 to D-60), planetary degrees, and Vimshottari Dasha."}
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
              {isTe ? "16 పరిహార పరిశీలన" : isHi ? "16 परिहार जांच" : "16 Cancellation Check"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "లగ్నం, చంద్రుడు, శుక్రుడి నుండి కుజ దోష విశ్లేషణ మరియు సమగ్ర పరిహారాలు."
                : isHi
                ? "लग्न, चंद्र एवं शुक्र से कुज दोष तथा पराशर अनुसार 16 परिहार नियमों की जांच।"
                : "In-depth Kuja Dosha analysis from Lagna, Moon, and Venus with authentic Parashara rules."}
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
              {isTe ? "శుభ ముహూర్తం & తిథి" : isHi ? "शुभ मुहूर्त एवं तिथि" : "Shubh Muhurat & Tithi"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "వివాహ శుభ ముహూర్తాలు, చోఘడియా, అభిజిత్ ముహూర్తం మరియు రాహుకాల సమయాలు."
                : isHi
                ? "विवाह के शुभ मुहूर्त, चौघड़िया, अभिजित मुहूर्त एवं राहु काल की दैनिक स्थिति।"
                : "Check auspicious wedding dates, Choghadiya, Abhijit Muhurat, and Rahu Kaal."}
            </p>
          </Link>

          <Link
            href={isTe ? `/te${PATHS.kaalSarpDosha}` : isHi ? `/hi${PATHS.kaalSarpDosha}` : PATHS.kaalSarpDosha}
            className="rounded-2xl border border-[#ecdac8] bg-white p-4 shadow-2xs hover:border-[#d9531e] hover:shadow-xs transition group"
          >
            <div className="flex items-center gap-2 text-[#c2410c] font-bold text-xs">
              <Compass className="h-4 w-4" />
              <span>{isTe ? "కాల సర్ప యోగం" : isHi ? "काल सर्प योग" : "Kaal Sarp Yoga"}</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mt-1.5 group-hover:text-[#d9531e] transition">
              {isTe ? "12 కాల సర్ప యోగాలు" : isHi ? "12 काल सर्प योग" : "12 Classical Yogas"}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {isTe
                ? "రాహు-కేతువుల ప్రభావం మరియు దాంపత్య జీవితంపై దాని పరిష్కారాలు."
                : isHi
                ? "राहु-केतु के प्रभाव एवं वैवाहिक स्थिरता पर उनके असर का ज्योतिषीय विश्लेषण।"
                : "Identify Rahu-Ketu planetary entrapment and its impact on matrimonial stability."}
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}

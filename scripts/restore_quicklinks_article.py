import re

with open("src/components/home/HomeQuickLinksCard.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# We want to insert the rich SEO article right before the footer info ribbon (line 481: {/* Footer info ribbon */})
article_block = '''        {/* Rich SEO Foundational Article & Long-Form Guide: Eliminating Thin Content & Ranking Top on Google */}
        <article className="mt-8 border-t border-amber-500/15 pt-6 text-ink/80">
          <div className="rounded-2xl bg-amber-50/40 p-5 ring-1 ring-amber-400/20 sm:p-7">
            {isTe ? (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl leading-snug">
                  సనాతన వైదిక పంచాంగం, శుభ ముహూర్తం మరియు వ్రత నిర్ణయం యొక్క వైజ్ఞానిక సంప్రదాయం — సమగ్ర మార్గదర్శి
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/85">
                  సనాతన ధర్మంలో కాలం అనేది కేవలం క్షణాల గడియారం కాదు, అదొక దివ్యమైన మరియు చేతన శక్తి. మన ప్రాచీన మహర్షులు ఆకాశమండలంలోని సూర్యుడు, చంద్రుడు, 27 నక్షత్రాలు మరియు నవగ్రహాల సంచారాన్ని పరిశీలించి <strong>కాల-విజ్ఞానం (జ్యోతిష శాస్త్రం)</strong> యొక్క అద్భుతమైన గణితాన్ని రూపొందించారు. భక్తి వాయిస్ యొక్క ఈ <strong>త్వరిత నావిగేషన్ హబ్ (Quick Navigation Hub)</strong> యొక్క ముఖ్య ఉద్దేశ్యం ప్రతి సాధకుడికి, గృహస్థునికి మరియు పరిశోధకుడికి ఖచ్చితమైన, స్వచ్ఛమైన మరియు ప్రామాణికమైన వైదిక విజ్ఞానాన్ని అందించడమే.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Clock className="h-5 w-5 text-saffron" />
                      ౧. శుభ ముహూర్తం యొక్క ప్రాముఖ్యత &amp; శుభాశుభ కాల చక్రం
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      శాస్త్రాలలో చెప్పబడినట్లు: <em>&apos;ముహూర్తం చాప్యనుకూలం యత్కర్మ తత్సిద్ధిభాజనమ్&apos;</em> — శుభ ముహూర్తంలో ప్రారంభించిన ఏ కార్యమైనా ఎలాంటి ఆటంకాలు లేకుండా శీఘ్ర సిద్ధిని మరియు విజయాన్ని అందిస్తుంది.
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>చోఘడియా చక్రం:</strong> పగలు మరియు రాత్రిని 8 సమ భాగాలుగా విభజించి అమృత, శుభ, లాభ, చర (శుభకరమైనవి) మరియు రోగ, కాల, ఉద్వేగ (వర్జించదగినవి) సమయాలను నిర్ణయించడం.</li>
                      <li><strong>అభిజిత్ ముహూర్తం:</strong> పగటివేళ 8వ ముహూర్త కాలం సాక్షాత్తూ శ్రీమహావిష్ణువు యొక్క ఆశీస్సులతో కూడినది. ఇది సకల దోషాలను హరించి సకల కార్యాలలో విజయాన్ని చేకూరుస్తుంది.</li>
                      <li><strong>గ్రహ హోరా చక్రం:</strong> సూర్యోదయం నుండి మరుసటి సూర్యోదయం వరకు 24 గంటలలో ప్రతి గంటకు ఒక అధిపతి గ్రహం ఉంటుంది. విద్యాభ్యాసానికి గురు హోరా, వ్యాపారానికి శుక్ర హోరా అత్యంత శ్రేష్ఠమైనవి.</li>
                      <li><strong>వివాహ &amp; గృహ ప్రవేశ ముహూర్తాలు:</strong> త్రిబల శుద్ధి (సూర్య, చంద్ర, గురు బలాలు), శుద్ధ లగ్నం మరియు బాణ దోష రహిత శుభ తిథుల ఎంపిక అత్యంత ఆవశ్యకం.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Flame className="h-5 w-5 text-orange-600" />
                      ౨. సనాతన వ్రతాలు, ఏకాదశి &amp; ఉపవాస నియమాలు
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      ఉపవాసం అంటే కేవలం భోజనం మానడం మాత్రమే కాదు; &apos;ఉప + వాస&apos; అనగా పరమాత్మకు అత్యంత సమీపంలో నివసించడం.
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>24 ఏకాదశి వ్రతాలు:</strong> సంవత్సరంలోని ప్రతి ఏకాదశి (నిర్జల, మోక్షద, శయన, ప్రబోధిని మొదలైనవి) మానసిక మాలిన్యాలను పోగొట్టి మోక్ష మార్గాన్ని సుగమం చేస్తాయి. హరివాసర మరియు ద్వాదశి పారణ సమయం పాటించడం అత్యంత ముఖ్యం.</li>
                      <li><strong>ప్రదోష వ్రతం:</strong> ప్రతి పక్ష త్రయోదశి నాడు ప్రదోష కాలంలో (సూర్యాస్తమయ సమయం) పరమశివుడు మరియు పార్వతీదేవిని ఆరాధించడం వల్ల సమస్త పాపాలు, రుణ బాధలు నశిస్తాయి.</li>
                      <li><strong>సంకష్ట చతుర్థి:</strong> విఘ్నేశ్వరుడైన గణపతి వ్రతం, చంద్రోదయ సమయంలో అర్ఘ్యం సమర్పించి పూర్తిచేస్తారు. సంకటాల నివారణకు ఇది అత్యద్భుతమైన వ్రతం.</li>
                      <li><strong>పౌర్ణమి &amp; సత్యనారాయణ వ్రతం:</strong> చంద్రుని సంపూర్ణ శోభతో ప్రకాశించే పౌర్ణమి నాడు శ్రీ సత్యనారాయణ స్వామి వ్రతం మరియు దీపారాధన కుటుంబంలో సుఖసంతోషాలను నింపుతాయి.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                  <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    ౩. పంచాంగం యొక్క 5 మూల అంగాలు (పంచాంగ విజ్ఞానం)
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                    వైదిక కాల గణనలో ఐదు ముఖ్యమైన అంగాలు ఉంటాయి:
                  </p>
                  <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">౧. తిథి (Tithi)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">సూర్య-చంద్రుల మధ్య 12° కోణీయ అంతరం తిథిని నిర్ధారిస్తుంది, ఇది మానసిక శక్తిని మరియు సంకల్పాన్ని నియంత్రిస్తుంది.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">౨. వారం (Vara)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">ఆదివారం నుండి శనివారం వరకు ఏడు రోజుల అధిపతి గ్రహాలు మానవ ఆరోగ్యాన్ని, ఆయుష్షును ప్రభావితం చేస్తాయి.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">౩. నక్షత్రం (Nakshatra)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">27 నక్షత్రాలలో చంద్రుని సంచారం మానవ మనస్తత్వాన్ని, స్వభావాన్ని మరియు తారాబలాన్ని నిర్దేశిస్తుంది.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">౪. యోగం (Yoga)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">సూర్య-చంద్రుల స్పష్ట రేఖాంశాల కలయికతో ఏర్పడే 27 యోగాలు శరీర ప్రాణ శక్తిని మరియు సంబంధాలను ప్రభావితం చేస్తాయి.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">౫. కరణం (Karana)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">తిథిలో సగభాగాన్ని కరణం అంటారు (11 కరణాలు), ఇది ఏ పనికైనా తక్షణ విజయం లేదా ఆటంకాలను నిర్ణయిస్తుంది.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-ink/70">
                  <p>
                    <strong>ముఖ్యమైన శోధనలు:</strong> నేటి పంచాంగం, శుభ వివాహ ముహూర్తాలు 2026, చోఘడియా పట్టిక, ఏకాదశి పారణ సమయం, రాహుకాలం, గృహ ప్రవేశ ముహూర్తం, ప్రదోష వ్రతం, శ్రీమద్భగవద్గీత శ్లోకాలు తాత్పర్యంతో.
                  </p>
                  <LocaleLink href={PATHS.spiritualTools} className="inline-flex items-center gap-1 font-semibold text-saffron-deep hover:underline">
                    అన్ని వైదిక సాధనాలు చూడండి <ArrowUpRight className="h-4 w-4" />
                  </LocaleLink>
                </div>
              </div>
            ) : isHi ? (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl leading-snug">
                  सनातन वैदिक पंचांग, शुभ मुहूर्त एवं व्रत निर्णय की वैज्ञानिक परंपरा — विस्तृत दिग्दर्शिका
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/85">
                  सनातन धर्म में समय केवल क्षणों का व्यतीत होना नहीं, बल्कि एक दिव्य एवं चेतन शक्ति है। हमारे ऋषियों ने आकाशमण्डल के सूर्य, चन्द्रमा, नक्षत्रों एवं ग्रहों के परिभ्रमण को देखकर <strong>काल-विज्ञान</strong> का ऐसा सूक्ष्म गणित रचा, जो सहस्रों वर्षों से अक्षुण्ण है। भक्ति वॉइस के इस <strong>त्वरित नेविगेशन हब (Quick Navigation Hub)</strong> का मुख्य उद्देश्य प्रत्येक साधक, गृहस्थ और ज्योतिष शोधार्थी को सटीक, शुद्ध और प्रामाणिक वैदिक ज्ञान सुलभ कराना है।
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Clock className="h-5 w-5 text-saffron" />
                      १. शुभ मुहूर्त का महत्व एवं शुभाशुभ समय-चक्र
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      शास्त्रों में कहा गया है: <em>&apos;मुहूर्तं चाप्यनुकूलं यत्कर्म तत्सिद्धिभाजनम्&apos;</em> अर्थात् अनुकूल मुहूर्त में किया गया कर्म अनायास ही सिद्धि और सफलता प्रदान करता है।
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>चौघड़िया चक्र:</strong> दिन और रात को ८-८ भागों में बाँटकर अमृत, शुभ, लाभ, चर (शुभ) तथा रोग, काल, उद्वेग (त्याज्य) का सटीक विचार।</li>
                      <li><strong>अभिजित मुहूर्त:</strong> दिन के आठवें मुहूर्त को भगवान श्रीहरि का आशीर्वाद प्राप्त है, जो सभी प्रकार के सामान्य ग्रह-दोषों का शमन कर विजय दिलाता है।</li>
                      <li><strong>ग्रह होरा:</strong> सूर्योदय से अगले सूर्योदय तक २४ घंटों में प्रत्येक घंटे का ग्रह स्वामी निश्चित होता है, जो विशिष्ट कार्यों (जैसे गुरु होरा में विद्यारंभ, शुक्र होरा में व्यापार) के लिए सर्वोत्तम है।</li>
                      <li><strong>विवाह व गृह प्रवेश मुहूर्त:</strong> त्रिबल शुद्धि (सूर्य, चन्द्र और गुरु का बल), शुद्ध लग्न और बाण-दोष रहित शुभ तिथियों का चयन अनिवार्य होता है।</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Flame className="h-5 w-5 text-orange-600" />
                      २. सनातन व्रत, एकादशी एवं उपवास के नियम
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      उपवास केवल भोजन का त्याग नहीं, बल्कि &apos;उप + वास&apos; अर्थात् परमात्मा के सानिध्य में वास करना है।
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>२४ एकादशी व्रत:</strong> वर्ष की प्रत्येक एकादशी (निर्जला, मोक्षदा, देवशयनी, देवप्रबोधिनी आदि) मानसिक विकारों का नाश कर मोक्ष का मार्ग प्रशस्त करती है। हरिवासर और द्वादशी पारण समय का पालन अनिवार्य है।</li>
                      <li><strong>प्रदोष व्रत:</strong> प्रत्येक पक्ष की त्रयोदशी को प्रदोष काल (सूर्यास्त के समय) में भगवान शिव और माता पार्वती की उपासना से सभी पापों और ऋणों से मुक्ति मिलती है।</li>
                      <li><strong>संकष्टी चतुर्थी:</strong> विघ्नहर्ता भगवान गणेश का व्रत, जो चंद्रोदय के समय अर्घ्य देकर पूर्ण होता है। संकटों के निवारण हेतु यह अचूक व्रत है।</li>
                      <li><strong>पूर्णिमा व सत्यनारायण व्रत:</strong> मन के कारक चंद्रमा की पूर्ण आभा में श्री सत्यनारायण भगवान की कथा और दीपदान से परिवार में सुख-समृद्धि का वास होता है।</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                  <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    ३. पंचांग के पाँच मूल अंग (पंचांग विज्ञान)
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                    वैदिक काल गणना में पाँच अंगों की प्रमुखता होती है:
                  </p>
                  <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">१. तिथि (Tithi)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">सूर्य-चंद्र के १२° कोणीय अंतर से तिथि बनती है, जो मानसिक शक्ति एवं संकल्प को संचालित करती है।</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">२. वार (Vara)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">रविवार से शनिवार तक सातों दिनों के अधिपति ग्रह मनुष्य के दैनिक स्वास्थ्य व आयु को प्रभावित करते हैं।</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">३. नक्षत्र (Nakshatra)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">२७ नक्षत्रों में चंद्रमा का संचरण मानव चेतना, स्वभाव और कर्म के परिणामों की दिशा तय करता है।</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">४. योग (Yoga)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">सूर्य और चंद्रमा के भोगांशों का योग (विष्कम्भ से वैधृति तक २७ योग) शरीर के प्राण और संबंधों को नियंत्रित करता है।</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">५. करण (Karana)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">तिथि का आधा भाग करण कहलाता है (११ करण), जो किसी भी भौतिक कर्म की तात्कालिक सफलता या बाधा का निर्धारण करता है।</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-ink/70">
                  <p>
                    <strong>लोकप्रिय खोजें:</strong> आज का पंचांग, शुभ विवाह मुहूर्त 2026, चौघड़िया तालिका, एकादशी पारण समय, राहुकाल आज, गृह प्रवेश मुहूर्त, प्रदोष व्रत 2026, श्रीमद्भगवद्गीता श्लोक अर्थ सहित।
                  </p>
                  <LocaleLink href={PATHS.spiritualTools} className="inline-flex items-center gap-1 font-semibold text-saffron-deep hover:underline">
                    सभी वैदिक उपकरण देखें <ArrowUpRight className="h-4 w-4" />
                  </LocaleLink>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl leading-snug">
                  The Science of Vedic Panchang, Auspicious Muhurats &amp; Sacred Fasting (Vrats)
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/85">
                  In Sanatana Dharma, time is not a passive continuum; it is a conscious, sacred dimension governed by the cosmic dance of the Sun, the Moon, and stellar constellations. The ancient Vedic Rishis established <strong>Jyotisha (Astronomy &amp; Astrology)</strong> as the eye of the Vedas (<em>&apos;Jyotisham Netramuchyate&apos;</em>). Our <strong>Quick Navigation Hub</strong> connects you with authentic ephemeris calculations, auspicious timings, and liturgical guidelines to harmonize your daily life with cosmic rhythms.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Clock className="h-5 w-5 text-saffron" />
                      1. Vedic Muhurat Shastra: Synchronizing Action with Planetary Cycles
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      Classical treatises like <em>Muhurta Chintamani</em> and <em>Brihat Samhita</em> declare that actions initiated during favorable cosmic windows yield effortless prosperity and protection.
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>Choghadiya Timings:</strong> The partition of daytime and nighttime into 8 equal slots (Amrit, Shubh, Labh, Char for auspicious starts; Rog, Kaal, Udveg to be avoided).</li>
                      <li><strong>Abhijit Muhurat:</strong> The sacred 8th diurnal Muhurat occurring around midday, blessed by Lord Vishnu to dissolve minor afflictions and ensure triumph.</li>
                      <li><strong>Planetary Horas:</strong> 24-hour planetary divisions tuning commercial, spiritual, medical, and learning endeavors to the governing planetary energy.</li>
                      <li><strong>Major Life Muhurats:</strong> Rigorous parameters for Vivah (weddings), Griha Pravesh (housewarming), property acquisition, and vehicle purchases.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                      <Flame className="h-5 w-5 text-orange-600" />
                      2. Sacred Vrats &amp; Fasting Science (Upavas)
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                      Fasting in the Vedic tradition (<em>Upavas</em>, literally &apos;dwelling near the divine&apos;) purifies the physical physiology and mental faculties.
                    </p>
                    <ul className="mt-3.5 space-y-2.5 text-sm sm:text-[14.5px] leading-relaxed text-ink/80">
                      <li><strong>24 Ekadashi Fasts:</strong> Occurring on the 11th lunar day of both fortnights to detoxify the mind, eliminate karmic residues, and awaken devotion. Observing Parana timing is paramount.</li>
                      <li><strong>Pradosh Vrat:</strong> Observed on Trayodashi during twilight (Pradosham) for the propitiation of Lord Shiva, dissolving debts and spiritual stagnation.</li>
                      <li><strong>Sankashti Chaturthi:</strong> Devoted to Lord Ganesha, observed during Krishna Paksha Chaturthi and concluded after sighting the moon to remove stubborn obstacles.</li>
                      <li><strong>Purnima &amp; Satyanarayan Puja:</strong> Honoring the complete brilliance of the Full Moon to invite peace, emotional harmony, and familial abundance.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-amber-500/10">
                  <h4 className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-amber-950">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    3. The 5 Pillars of Vedic Panchang (Pancha-Anga)
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                    Every daily calculation rests upon five astronomical pillars:
                  </p>
                  <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">1. Tithi (Lunar Day)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">Progression of the Moon 12° ahead of the Sun, governing vital emotional stability and vows.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">2. Vara (Solar Day)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">The 7 planetary weekdays influencing bodily energy, longevity, and worldly interactions.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">3. Nakshatra</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">The 27 stellar lunar mansions directing the mind, destiny, mental inclination, and Tarabalam.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">4. Yoga (Angular Sum)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">The 27 soli-lunar yogas dictating the subtle pranic field and inner vitality of relationships.</p>
                    </div>
                    <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs">
                      <span className="block font-bold text-ink text-sm sm:text-base">5. Karana (Half-Tithi)</span>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-ink/75">The 11 Karana divisions governing the immediate physical accomplishment or obstruction of work.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-ink/70">
                  <p>
                    <strong>High-Frequency Keywords:</strong> Today Panchang, Hindu Calendar 2026, Choghadiya Today, Vivah Muhurat 2026, Griha Pravesh Muhurat, Ekadashi Vrat Dates, Pradosh Vrat, Rahu Kaal Timing, Bhagavad Gita Shlokas with Meaning.
                  </p>
                  <LocaleLink href={PATHS.spiritualTools} className="inline-flex items-center gap-1 font-semibold text-saffron-deep hover:underline">
                    Explore All Vedic Tools <ArrowUpRight className="h-4 w-4" />
                  </LocaleLink>
                </div>
              </div>
            )}
          </div>
        </article>
'''

target = "        {/* Footer info ribbon */}"
if target in content:
    new_content = content.replace(target, article_block + "\n" + target)
    with open("src/components/home/HomeQuickLinksCard.tsx", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESS: Restored full SEO article with Telugu, Hindi, and English in HomeQuickLinksCard.tsx")
else:
    print("ERROR: Target not found")

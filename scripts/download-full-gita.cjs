const fs = require("fs");
const path = require("path");

const CHAPTER_METADATA = [
  {
    chapter: 1,
    name: "Arjuna Vishada Yoga",
    nameHindi: "अर्जुनविषादयोग",
    nameSanskrit: "अर्जुनविषादयोगः",
    nameTranslation: "The Yoga of the Despondency of Arjuna",
    versesCount: 47,
    summary:
      "On the battlefield of Kurukshetra, witnessing beloved relatives, teachers, and elders standing in opposing ranks, Arjuna is overwhelmed by profound grief, moral despair, and existential confusion, casting aside his Gandiva bow.",
    summaryHindi:
      "कुरुक्षेत्र के धर्मक्षेत्र में अपने स्वजनों, गुरुजनों और पूज्यों को युद्धभूमि में सामने देखकर अर्जुन अत्यंत शोक, मोह और विषाद से व्याकुल होकर अपना गाण्डीव धनुष त्याग देते हैं।",
  },
  {
    chapter: 2,
    name: "Sankhya Yoga",
    nameHindi: "सांख्ययोग",
    nameSanskrit: "सांख्ययोगः",
    nameTranslation: "The Yoga of Eternal Knowledge & Self-Realization",
    versesCount: 72,
    summary:
      "Lord Krishna reveals the eternal, indestructible nature of the Atman (Soul), instructs Arjuna in Nishkama Karma Yoga (selfless duty without attachment to fruits), and describes the attributes of a Sthitaprajna (person of steady wisdom).",
    summaryHindi:
      "भगवान श्रीकृष्ण आत्मा की अमरता और अविनाशी स्वरूप का उपदेश देते हैं, निष्काम कर्मयोग का मार्ग दिखाते हैं तथा स्थितप्रज्ञ पुरुष के लक्षणों और शांति के मार्ग का वर्णन करते हैं।",
  },
  {
    chapter: 3,
    name: "Karma Yoga",
    nameHindi: "कर्मयोग",
    nameSanskrit: "कर्मयोगः",
    nameTranslation: "The Yoga of Selfless Action",
    versesCount: 43,
    summary:
      "Lord Krishna explains why action is inevitable in cosmic order (Yajna) and guides Arjuna to perform rightful duties without selfish desire, leading to spiritual liberation and societal harmony (Lokasangraha).",
    summaryHindi:
      "श्रीकृष्ण निष्काम कर्मयोग का महत्व बताते हुए कहते हैं कि कर्तव्य कर्म का त्याग उचित नहीं है। अनासक्त भाव से ईश्वरार्पण बुद्धि द्वारा किया गया कर्म ही मनुष्य को मुक्ति दिलाता है।",
  },
  {
    chapter: 4,
    name: "Jnana Karma Sannyasa Yoga",
    nameHindi: "ज्ञानकर्मसंन्यासयोग",
    nameSanskrit: "ज्ञानकर्मसंन्यासयोगः",
    nameTranslation: "The Yoga of Wisdom and Renunciation of Action",
    versesCount: 42,
    summary:
      "Lord Krishna reveals the divine secret of His periodic descent (Avatara) to protect Dharma and destroy evil, explaining how the transcendental fire of spiritual knowledge burns all karmic reactions to ashes.",
    summaryHindi:
      "भगवान अपने अवतार के दिव्य रहस्य (यदा यदा हि धर्मस्य) को प्रकट करते हैं और समझाते हैं कि आत्मज्ञान की पवित्र अग्नि समस्त कर्म बंधनों और संशयों को भस्म कर देती है।",
  },
  {
    chapter: 5,
    name: "Karma Sannyasa Yoga",
    nameHindi: "कर्मसंन्यासयोग",
    nameSanskrit: "कर्मसंन्यासयोगः",
    nameTranslation: "The Yoga of Renunciation & Detachment",
    versesCount: 29,
    summary:
      "Krishna harmonizes renunciation (Sannyasa) with selfless service (Karma Yoga), demonstrating that a pure-hearted devotee who acts dedicating everything to God remains untouched by sin like a lotus leaf on water.",
    summaryHindi:
      "ज्ञानयोग और कर्मयोग के समन्वय का निरूपण करते हुए भगवान बताते हैं कि कर्म करते हुए भी जो फल की कामना त्यागकर सब ईश्वर को समर्पित करता है, वह जल में कमल-पत्र के समान निष्पाप रहता है।",
  },
  {
    chapter: 6,
    name: "Dhyana Yoga",
    nameHindi: "ध्यानयोग (आत्मसंयमयोग)",
    nameSanskrit: "ध्यानयोगः",
    nameTranslation: "The Yoga of Meditation and Self-Control",
    versesCount: 47,
    summary:
      "The science of mind control, posture, pranayama, and meditation to achieve equanimity, culminating in seeing God in all beings and all beings in God.",
    summaryHindi:
      "मन के संयम, ध्यान की विधि, योगाभ्यास के नियम और समत्व दृष्टि का दिव्य विज्ञान, जिसके द्वारा साधक सभी प्राणियों में परमात्मा को देखता है।",
  },
  {
    chapter: 7,
    name: "Jnana Vijnana Yoga",
    nameHindi: "ज्ञानविज्ञानयोग",
    nameSanskrit: "ज्ञानविज्ञानयोगः",
    nameTranslation: "The Yoga of Knowledge and Realization",
    versesCount: 30,
    summary:
      "The revelation of God's material and spiritual energies (Prakriti and Purusha), the four types of virtuous devotees, and the rare soul who realizes 'Vasudeva sarvam iti' (God is everything).",
    summaryHindi:
      "परमात्मा की अपरा और परा प्रकृति का रहस्य, चार प्रकार के भक्त (आर्त, अर्थार्थी, जिज्ञासु, ज्ञानी) और 'वासुदेवः सर्वम्' का परम सत्य।",
  },
  {
    chapter: 8,
    name: "Aksara Brahma Yoga",
    nameHindi: "अक्षरब्रह्मयोग",
    nameSanskrit: "अक्षरब्रह्मयोगः",
    nameTranslation: "The Yoga of the Imperishable Absolute",
    versesCount: 28,
    summary:
      "The spiritual path of remembering God at the time of death (Anta-kale smaran), the cosmic cycles of creation and dissolution, and the supreme eternal abode beyond the material universe.",
    summaryHindi:
      "अंतकाल में भगवत्स्मरण का महत्व, ब्रह्मांड की उत्पत्ति-प्रलय के चक्र और भगवान के उस परम अविनाशी धाम का वर्णन जहां पहुंचकर पुनः जन्म नहीं होता।",
  },
  {
    chapter: 9,
    name: "Raja Vidya Raja Guhya Yoga",
    nameHindi: "राजविद्याराजगुह्ययोग",
    nameSanskrit: "राजविद्याराजगुह्ययोगः",
    nameTranslation: "The Yoga of Sovereign Science & Supreme Secret",
    versesCount: 34,
    summary:
      "The most confidential knowledge of devotion: God maintains the cosmos effortlessly, accepts even a leaf, flower, fruit, or water offered with love, and promises 'Na me bhaktah pranashyati' (My devotee never perishes).",
    summaryHindi:
      "परम गोपनीय राजविद्या: प्रेमपूर्वक अर्पित एक पत्र, पुष्प, फल या जल का भगवान द्वारा सादर स्वीकार, और 'न मे भक्तः प्रणश्यति' का अभय वरदान।",
  },
  {
    chapter: 10,
    name: "Vibhuti Yoga",
    nameHindi: "विभूतियोग",
    nameSanskrit: "विभूतियोगः",
    nameTranslation: "The Yoga of Divine Glories & Manifestations",
    versesCount: 42,
    summary:
      "Lord Krishna describes His opulences in the universe: among the radiant He is the Sun, among rivers the Ganges, among mountains Meru, and the source of all majesty, beauty, and might.",
    summaryHindi:
      "संसार के कण-कण और समस्त विभूतियों में भगवान के तेज का दर्शन: तेजस्वियों में सूर्य, नदियों में गंगा, पर्वतों में मेरु और समस्त ऐश्वर्य का आदि कारण।",
  },
  {
    chapter: 11,
    name: "Vishwarupa Darshana Yoga",
    nameHindi: "विश्वरूपदर्शनयोग",
    nameSanskrit: "विश्वरूपदर्शनयोगः",
    nameTranslation: "The Vision of the Cosmic Universal Form",
    versesCount: 55,
    summary:
      "Granting Arjuna divine vision (Divya-Chakshu), Lord Krishna reveals His boundless, awe-inspiring Vishwarupa containing all universes, gods, suns, time, and cosmic destruction.",
    summaryHindi:
      "दिव्य दृष्टि द्वारा भगवान के विराट विश्वरूप का रोमांचक दर्शन जिसमें अनंत सूर्य, समस्त देवता, कालपुरुष और चराचर जगत एक साथ दिखाई देते हैं।",
  },
  {
    chapter: 12,
    name: "Bhakti Yoga",
    nameHindi: "भक्तियोग",
    nameSanskrit: "भक्तियोगः",
    nameTranslation: "The Yoga of Supreme Devotion",
    versesCount: 20,
    summary:
      "The comparative glory of worshipping the Personal vs. Impersonal Divine, and the beloved qualities of a pure devotee who is free from malice, friendly, compassionate, and unwavering in love.",
    summaryHindi:
      "सगुण-साकार और निर्गुण-निराकार उपासना का भेद तथा प्रभु के प्रिय भक्त के 35 दिव्य गुण: द्वेषरहित, दयालु, समदुःखसुख, क्षमाशील और पूर्ण समर्पित।",
  },
  {
    chapter: 13,
    name: "Kshetra Kshetrajna Vibhaga Yoga",
    nameHindi: "क्षेत्रक्षेत्रज्ञविभागयोग",
    nameSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोगः",
    nameTranslation: "The Yoga of Distinguishing Field & Knower of Field",
    versesCount: 35,
    summary:
      "The profound metaphysical distinction between the mortal physical body (Kshetra) and the eternal Conscious Soul / Supreme Soul (Kshetrajna).",
    summaryHindi:
      "नश्वर शरीर (क्षेत्र) और अविनाशी साक्षी आत्मा व परमात्मा (क्षेत्रज्ञ) के तात्विक भेद और सच्चे ज्ञान का गहन रहस्य।",
  },
  {
    chapter: 14,
    name: "Gunatraya Vibhaga Yoga",
    nameHindi: "गुणत्रयविभागयोग",
    nameSanskrit: "गुणत्रयविभागयोगः",
    nameTranslation: "The Yoga of Understanding the Three Gunas",
    versesCount: 27,
    summary:
      "The detailed exposition of Nature's three modes (Sattva, Rajas, Tamas), how they bind the soul, and how to transcend them (Gunatita) to achieve divine liberation.",
    summaryHindi:
      "प्रकृति के तीन गुणों (सत्त्व, रज, तम) का स्वरूप, उनके द्वारा जीव का बंधन और तीनों गुणों से अतीत (गुणातीत) होकर परमानंद पाने की विधि।",
  },
  {
    chapter: 15,
    name: "Purushottama Yoga",
    nameHindi: "पुरुषोत्तमयोग",
    nameSanskrit: "पुरुषोत्तमयोगः",
    nameTranslation: "The Yoga of the Supreme Divine Personality",
    versesCount: 20,
    summary:
      "The metaphor of the inverted Ashvattha tree of samsara, the nature of the conditioned soul, and the revelation of Krishna as Purushottama—the Supreme Being transcending both perishable matter and imperishable souls.",
    summaryHindi:
      "उर्ध्वमूल संसार रूपी अश्वत्थ वृक्ष का छेदन, जीवात्मा का स्वरूप तथा क्षर और अक्षर दोनों से परे भगवान का 'पुरुषोत्तम' स्वरूप।",
  },
  {
    chapter: 16,
    name: "Daivasura Sampad Vibhaga Yoga",
    nameHindi: "दैवासुरसम्पद्विभागयोग",
    nameSanskrit: "दैवासुरसम्पद्विभागयोगः",
    nameTranslation: "The Yoga of Discerning Divine & Demonic Qualities",
    versesCount: 24,
    summary:
      "The 26 divine virtues (fearlessness, purity, charity, truth) that lead to liberation versus the demonic traits (lust, anger, greed, egoism) that drag souls into darkness.",
    summaryHindi:
      "मुक्ति देने वाली 26 दैवी संपदाएं (अभय, दान, दया, सत्य) और नरक के तीन द्वार (काम, क्रोध, लोभ) रूपी आसुरी संपदा का स्पष्ट वर्गीकरण।",
  },
  {
    chapter: 17,
    name: "Shraddhatraya Vibhaga Yoga",
    nameHindi: "श्रद्धात्रयविभागयोग",
    nameSanskrit: "श्रद्धात्रयविभागयोगः",
    nameTranslation: "The Yoga of the Threefold Division of Faith",
    versesCount: 28,
    summary:
      "The classification of faith, food, sacrifice (Yajna), austerity (Tapas), and charity (Dana) into Sattvic, Rajasic, and Tamasic, concluding with the sacred mystic mantra Om Tat Sat.",
    summaryHindi:
      "मनुष्य के स्वभाव अनुसार श्रद्धा, आहार, यज्ञ, तप और दान के तीन भेदों का विश्लेषण तथा परम सत्य के बोधक महामंत्र 'ॐ तत् सत्' का पावन रहस्य।",
  },
  {
    chapter: 18,
    name: "Moksha Sannyasa Yoga",
    nameHindi: "मोक्षसंन्यासयोग",
    nameSanskrit: "मोक्षसंन्यासयोगः",
    nameTranslation: "The Yoga of Supreme Liberation & Complete Surrender",
    versesCount: 78,
    summary:
      "The crowning synthesis of all yoga systems, concluding with Lord Krishna's immortal promise of absolute refuge and grace: 'Sarva-dharman parityajya mam ekam sharanam vraja' (Surrender all dharmas unto Me; I shall liberate you from all sins).",
    summaryHindi:
      "सम्पूर्ण गीता का सार, त्याग और संन्यास की पराकाष्ठा, और भगवान का पावन आश्वासन: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज' — सब धर्मों को मुझे समर्पित कर केवल मेरी शरण में आओ, मैं तुम्हें समस्त पापों से मुक्त कर दूंगा।",
  },
];

function cleanHindiTranslation(text) {
  if (!text) return "";
  let clean = text
    .replace(/^।।\s*\d+[\.\-]\d+\s*।।\s*/g, "")
    .replace(/^॥\s*\d+[\.\-]\d+\s*॥\s*/g, "")
    .replace(/\s*।।\s*$/g, "")
    .replace(/\s*॥\s*$/g, "")
    .replace(/\(टिप्पणी[^\)]*\)/g, "")
    .trim();
  return clean;
}

function cleanEnglishTranslation(text) {
  if (!text) return "";
  let clean = text
    .replace(/^\d+[\.\-]\d+\s+/g, "")
    .replace(/^\d+\s+/g, "")
    .trim();
  return clean;
}

function extractSpeakerAndSanskrit(slokText, translitText) {
  const lines = (slokText || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const translitLines = (translitText || "").split("\n").map((l) => l.trim()).filter(Boolean);

  let speaker = undefined;
  let sanskritLines = lines;
  let translitCleanLines = translitLines;

  if (lines.length > 0) {
    const firstLine = lines[0];
    if (
      firstLine.includes("उवाच") ||
      firstLine.includes("श्रीभगवानुवाच") ||
      firstLine.includes("सञ्जय उवाच") ||
      firstLine.includes("अर्जुन उवाच") ||
      firstLine.includes("धृतराष्ट्र उवाच")
    ) {
      speaker = firstLine.replace(/[\s\|\:\।]/g, "").trim();
      // Add a clean standard speaker label
      if (speaker.includes("श्रीभगवानुवाच")) speaker = "श्रीभगवानुवाच";
      else if (speaker.includes("सञ्जय") || speaker.includes("संजय")) speaker = "संजय उवाच";
      else if (speaker.includes("अर्जुन")) speaker = "अर्जुन उवाच";
      else if (speaker.includes("धृतराष्ट्र")) speaker = "धृतराष्ट्र उवाच";

      sanskritLines = lines.slice(1);

      if (
        translitLines.length > 0 &&
        (translitLines[0].toLowerCase().includes("uvāca") ||
          translitLines[0].toLowerCase().includes("uvaca"))
      ) {
        translitCleanLines = translitLines.slice(1);
      }
    }
  }

  return {
    speaker,
    sanskrit: sanskritLines.join("\n"),
    transliteration: translitCleanLines.join("\n"),
  };
}

async function fetchVerseWithRetry(ch, sl, maxRetries = 3) {
  const url = `https://vedicscriptures.github.io/slok/${ch}/${sl}`;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "BhaktiVoice-Compiler/1.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function downloadChapter(chapterMeta) {
  const ch = chapterMeta.chapter;
  const count = chapterMeta.versesCount;
  console.log(`Starting Chapter ${ch}: ${chapterMeta.name} (${count} verses)...`);

  const versePromises = [];
  for (let sl = 1; sl <= count; sl++) {
    versePromises.push(
      (async () => {
        const raw = await fetchVerseWithRetry(ch, sl);
        const { speaker, sanskrit, transliteration } = extractSpeakerAndSanskrit(
          raw.slok,
          raw.transliteration
        );

        const hindi =
          cleanHindiTranslation(raw.tej?.ht) ||
          cleanHindiTranslation(raw.rams?.ht) ||
          "";

        const english =
          cleanEnglishTranslation(raw.siva?.et) ||
          cleanEnglishTranslation(raw.purohit?.et) ||
          cleanEnglishTranslation(raw.san?.et) ||
          cleanEnglishTranslation(raw.adi?.et) ||
          "";

        const wordMeanings = raw.siva?.ec
          ? cleanEnglishTranslation(raw.siva.ec)
          : undefined;

        const commentary = raw.chinmay?.hc || raw.rams?.hc || undefined;

        return {
          verse: sl,
          chapter: ch,
          verseNumber: `${ch}.${sl}`,
          ...(speaker ? { speaker } : {}),
          sanskrit: sanskrit || raw.slok,
          transliteration: transliteration || raw.transliteration,
          hindi,
          english,
          ...(wordMeanings ? { wordMeanings } : {}),
          ...(commentary ? { commentary } : {}),
        };
      })()
    );
  }

  // Execute chapter in small concurrent chunks to be polite to the host
  const verses = [];
  const chunkSize = 15;
  for (let i = 0; i < versePromises.length; i += chunkSize) {
    const chunk = versePromises.slice(i, i + chunkSize);
    const results = await Promise.all(chunk);
    verses.push(...results);
  }

  // Sort by verse number
  verses.sort((a, b) => a.verse - b.verse);

  return {
    ...chapterMeta,
    verses,
  };
}

async function main() {
  console.log("=== Downloading complete Bhagavad Gita dataset (All 18 chapters, 700 verses) ===");
  const startTime = Date.now();

  const chapters = [];
  for (const meta of CHAPTER_METADATA) {
    const fullChapter = await downloadChapter(meta);
    chapters.push(fullChapter);
    console.log(`✓ Chapter ${meta.chapter} finished (${fullChapter.verses.length} verses)`);
  }

  const totalVerses = chapters.reduce((sum, ch) => sum + ch.verses.length, 0);

  const payload = {
    title: "Shrimad Bhagavad Gita",
    language: "sa-hi-en",
    version: "2.0.0",
    totalChapters: chapters.length,
    totalVerses,
    chapters,
  };

  const outPath = path.join(process.cwd(), "data", "bhagavad_gita.json");
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");

  console.log(`\n========================================`);
  console.log(` Successfully generated: ${outPath}`);
  console.log(` Total Chapters: ${chapters.length}`);
  console.log(` Total Verses: ${totalVerses}`);
  console.log(` Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  console.log(`========================================`);
}

main().catch((err) => {
  console.error("Failed to build Gita dataset:", err);
  process.exit(1);
});

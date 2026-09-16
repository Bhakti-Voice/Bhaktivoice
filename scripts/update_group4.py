# Group 4: Naam Jaap Counter Suite
import re

# 1. src/app/naam-jaap/page.tsx
with open("src/app/naam-jaap/page.tsx", "r", encoding="utf-8") as f:
    nj = f.read()

nj = nj.replace(
'''  const t = await getMessages();
  const locale = await getLocale();
  const isHi = locale === "hi";''',
'''  const t = await getMessages();
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";'''
)

nj = nj.replace(
    'name: isHi ? "भक्ति वॉइस डिजिटल नाम जप काउंटर" : "Bhakti Voice Digital Naam Jaap Counter",',
    'name: isTe ? "భక్తి వాయిస్ డిజిటల్ నామ జప కౌంటర్" : isHi ? "भक्ति वॉइस डिजिटल नाम जप काउंटर" : "Bhakti Voice Digital Naam Jaap Counter",'
)

nj = nj.replace(
'''    description: isHi
      ? "मुफ़्त ऑनलाइन १०८ माला जप काउंटर — राधे राधे, राम नाम, हरे कृष्ण महामंत्र एवं ॐ नमः शिवाय का शांत व भावपूर्ण जप।"
      : "Free online 108 Mala Jaap counter for Radhe Radhe, Ram Naam, Hare Krishna Mahamantra and Om Namah Shivaya with daily streak tracking and sound cues.",''',
'''    description: isTe
      ? "ఉచిత ఆన్‌లైన్ 108 మాల జప కౌంటర్ — రాధే రాధే, రామ నామం, హరే కృష్ణ మహామంత్రం మరియు ఓం నమః శివాయ శాంతమైన జపం."
      : isHi
      ? "मुफ़्त ऑनलाइन १०८ माला जप काउंटर — राधे राधे, राम नाम, हरे कृष्ण महामंत्र एवं ॐ नमः शिवाय का शांत व भावपूर्ण जप।"
      : "Free online 108 Mala Jaap counter for Radhe Radhe, Ram Naam, Hare Krishna Mahamantra and Om Namah Shivaya with daily streak tracking and sound cues.",'''
)

nj = nj.replace(
    '📿 {isHi ? "दैनिक आध्यात्मिक साधना" : "Daily Sadhana"}',
    '📿 {isTe ? "దైవిక సాధన" : isHi ? "दैनिक आध्यात्मिक साधना" : "Daily Sadhana"}'
)

nj = nj.replace(
'''        <p className="mt-1.5 text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          {isHi
            ? "राधे राधे, राम नाम, हरे कृष्ण एवं ॐ नमः शिवाय का शांत १०८ जप काउंटर। अपनी दैनिक माला और श्रृंखला बनाए रखें।"
            : "A peaceful digital jaap counter for Radhe Radhe, Ram naam, Hare Krishna, and Om Namah Shivaya. Count a mala of 108, sustain your daily streak, and experience stillness."}
        </p>''',
'''        <p className="mt-1.5 text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          {isTe
            ? "రాధే రాధే, రామ నామం, హరే కృష్ణ మరియు ఓం నమః శివాయ ప్రశాంత 108 జప కౌంటర్. మీ దినచర్య మాలను సాధన చేయండి."
            : isHi
            ? "राधे राधे, राम नाम, हरे कृष्ण एवं ॐ नमः शिवाय का शांत १०८ जप काउंटर। अपनी दैनिक माला और श्रृंखला बनाए रखें।"
            : "A peaceful digital jaap counter for Radhe Radhe, Ram naam, Hare Krishna, and Om Namah Shivaya. Count a mala of 108, sustain your daily streak, and experience stillness."}
        </p>'''
)

nj = nj.replace(
    '<JaapSeoGuide isHi={isHi} />',
    '<JaapSeoGuide isHi={isHi} isTe={isTe} />'
)

with open("src/app/naam-jaap/page.tsx", "w", encoding="utf-8") as f:
    f.write(nj)
print("SUCCESS: Updated naam-jaap/page.tsx")

# 2. src/components/jaap/JaapSeoGuide.tsx
with open("src/components/jaap/JaapSeoGuide.tsx", "r", encoding="utf-8") as f:
    jsg = f.read()

jsg = jsg.replace(
    'export function JaapSeoGuide({ isHi = false }: { isHi?: boolean }) {',
    'export function JaapSeoGuide({ isHi = false, isTe = false }: { isHi?: boolean; isTe?: boolean }) {'
)
jsg = jsg.replace(
    '{isHi ? "नाम जप विज्ञान एवं साधना महिमा" : "The Science & Glory of Naam Jaap"}',
    '{isTe ? "నామ జప విజ్ఞానం & సాధనా మహిమ" : isHi ? "नाम जप विज्ञान एवं साधना महिमा" : "The Science & Glory of Naam Jaap"}'
)
jsg = jsg.replace(
    '{isHi\n              ? "कलियुग में केवल नाम अधारा — नाम जप का महत्व और विधि"\n              : "Why Naam Jaap is the Highest Spiritual Practice (Sadhana)"}',
    '{isTe\n              ? "కలియుగంలో నామ స్మరణయే శ్రేష్ఠమైన సాధన — నామ జప విశిష్టత & విధి"\n              : isHi\n              ? "कलियुग में केवल नाम अधारा — नाम जप का महत्व और विधि"\n              : "Why Naam Jaap is the Highest Spiritual Practice (Sadhana)"}'
)
jsg = jsg.replace(
    '{isHi ? "108 मनकों का रहस्य" : "Significance of 108"}',
    '{isTe ? "108 పూసల రహస్యం" : isHi ? "108 मनकों का रहस्य" : "Significance of 108"}'
)
jsg = jsg.replace(
    '{isHi ? "चित्त शुद्धि और शांति" : "Mental Purification"}',
    '{isTe ? "చిత్త శుద్ధి మరియు శాంతి" : isHi ? "चित्त शुद्धि और शांति" : "Mental Purification"}'
)
jsg = jsg.replace(
    '{isHi ? "डिजिटल जप एवं एकाग्रता" : "Digital Mala Practice"}',
    '{isTe ? "డిజిటల్ జపం & ఏకాగ్రత" : isHi ? "डिजिटल जप एवं एकाग्रता" : "Digital Mala Practice"}'
)
jsg = jsg.replace(
    '{isHi ? "सरल जप विधि" : "How to Practice Naam Jaap (Step-by-Step)"}',
    '{isTe ? "సులభ జప విధి" : isHi ? "सरल जप विधि" : "How to Practice Naam Jaap (Step-by-Step)"}'
)
jsg = jsg.replace(
    '{isHi ? "दैनिक नाम जप की सही एवं फलदायी विधि" : "The 4 Sacred Steps for Fruitful Naam Jaap"}',
    '{isTe ? "దైనందిన నామ జపానికి 4 పవిత్ర సోపానాలు" : isHi ? "दैनिक नाम जप की सही एवं फलदायी विधि" : "The 4 Sacred Steps for Fruitful Naam Jaap"}'
)

with open("src/components/jaap/JaapSeoGuide.tsx", "w", encoding="utf-8") as f:
    f.write(jsg)
print("SUCCESS: Updated JaapSeoGuide.tsx")

# 3. src/components/jaap/JaapCounter.tsx
with open("src/components/jaap/JaapCounter.tsx", "r", encoding="utf-8") as f:
    jc = f.read()

jc = jc.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
jc = jc.replace(
    '  const countLocale = isHi ? "hi-IN" : "en-IN";',
    '  const countLocale = isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN";'
)
jc = jc.replace(
    'isHi ? `🎉 बधाई! ${newMalaNum} माला पूर्ण हुई। जय श्री राम!` : `🎉 Blessed! Completed Mala #${newMalaNum}!`',
    'isTe ? `🎉 అభినందనలు! ${newMalaNum}వ మాల పూర్తయింది. జై శ్రీ రామ్!` : isHi ? `🎉 बधाई! ${newMalaNum} माला पूर्ण हुई। जय श्री राम!` : `🎉 Blessed! Completed Mala #${newMalaNum}!`'
)
jc = jc.replace(
    '{malaProgress} / 108 {isHi ? "मनके पूर्ण" : "Beads Done"}',
    '{malaProgress} / 108 {isTe ? "పూసలు పూర్తయ్యాయి" : isHi ? "मनके पूर्ण" : "Beads Done"}'
)

with open("src/components/jaap/JaapCounter.tsx", "w", encoding="utf-8") as f:
    f.write(jc)
print("SUCCESS: Updated JaapCounter.tsx")

# 4. src/components/jaap/JaapShareModal.tsx
with open("src/components/jaap/JaapShareModal.tsx", "r", encoding="utf-8") as f:
    jsm = f.read()

jsm = jsm.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
jsm = jsm.replace(
    '{isHi ? "साधना प्रसाद एवं साझा करें" : "Share Sadhana Blessing"}',
    '{isTe ? "సాధనా ప్రసాదం & షేర్ చేయండి" : isHi ? "साधना प्रसाद एवं साझा करें" : "Share Sadhana Blessing"}'
)
jsm = jsm.replace(
    '{isHi ? "आज का जप" : "Today\'s Count"}',
    '{isTe ? "నేటి జపం" : isHi ? "आज का जप" : "Today\'s Count"}'
)
jsm = jsm.replace(
    '{isHi ? "माला पूर्ण" : "Mala Completed"}',
    '{isTe ? "మాల పూర్తయింది" : isHi ? "माला पूर्ण" : "Mala Completed"}'
)
jsm = jsm.replace(
    '{isHi ? "व्हाट्सएप पर साझा करें" : "Share on WhatsApp"}',
    '{isTe ? "వాట్సాప్‌లో షేర్ చేయండి" : isHi ? "व्हाट्सएप पर साझा करें" : "Share on WhatsApp"}'
)
jsm = jsm.replace(
    '{isHi ? "पूरा संदेश कॉपी" : "Copy Message"}',
    '{isTe ? "సందేశం కాపీ చేయండి" : isHi ? "पूरा संदेश कॉपी" : "Copy Message"}'
)

with open("src/components/jaap/JaapShareModal.tsx", "w", encoding="utf-8") as f:
    f.write(jsm)
print("SUCCESS: Updated JaapShareModal.tsx")

# 5. src/components/jaap/JaapSidebar.tsx
with open("src/components/jaap/JaapSidebar.tsx", "r", encoding="utf-8") as f:
    jsb = f.read()

jsb = jsb.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
jsb = jsb.replace(
    '{isHi ? "दैनिक नाम सुमिरन" : "Daily Remembrance"}',
    '{isTe ? "దైవిక నామ స్మరణ" : isHi ? "दैनिक नाम सुमिरन" : "Daily Remembrance"}'
)
jsb = jsb.replace(
    '{isHi ? "मन को शांत रखें, 108 नाम जपें।" : "Pause, sit, and chant 108 divine names."}',
    '{isTe ? "మనస్సును ప్రశాంతంగా ఉంచి, 108 దివ్య నామాలను జపించండి." : isHi ? "मन को शांत रखें, 108 नाम जपें।" : "Pause, sit, and chant 108 divine names."}'
)

with open("src/components/jaap/JaapSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(jsb)
print("SUCCESS: Updated JaapSidebar.tsx")

# 6. src/components/jaap/JaapZenMode.tsx
with open("src/components/jaap/JaapZenMode.tsx", "r", encoding="utf-8") as f:
    jzm = f.read()

jzm = jzm.replace('  const isHi = locale === "hi";', '  const isHi = locale === "hi";\n  const isTe = locale === "te";')
jzm = jzm.replace(
    '  const countLocale = isHi ? "hi-IN" : "en-IN";',
    '  const countLocale = isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN";'
)
jzm = jzm.replace(
    '{isHi ? "ध्यान साधना कक्ष (Zen Mode)" : "Zen Meditation Mode"}',
    '{isTe ? "ధ్యాన సాధనా మందిరం (Zen Mode)" : isHi ? "ध्यान साधना कक्ष (Zen Mode)" : "Zen Meditation Mode"}'
)
jzm = jzm.replace(
    '{isHi ? "बाहर निकलें (Esc)" : "Exit (Esc)"}',
    '{isTe ? "నిష్క్రమించండి (Esc)" : isHi ? "बाहर निकलें (Esc)" : "Exit (Esc)"}'
)
jzm = jzm.replace(
    '{isHi ? "कहीं भी स्पर्श करें या Space दबाएँ" : "Tap anywhere or press Spacebar to count"}',
    '{isTe ? "కౌంట్ చేయడానికి ఎక్కడైనా తాకండి లేదా Space నొక్కండి" : isHi ? "कहीं भी स्पर्श करें या Space दबाएँ" : "Tap anywhere or press Spacebar to count"}'
)
jzm = jzm.replace(
    '{isHi ? `मनके: ${malaProgress} / 108` : `Bead: ${malaProgress} / 108`}',
    '{isTe ? `పూసలు: ${malaProgress} / 108` : isHi ? `मनके: ${malaProgress} / 108` : `Bead: ${malaProgress} / 108`}'
)

with open("src/components/jaap/JaapZenMode.tsx", "w", encoding="utf-8") as f:
    f.write(jzm)
print("SUCCESS: Updated JaapZenMode.tsx")

import re

# 1. Update HoraView.tsx
hora_view_file = 'src/components/panchang/HoraView.tsx'
with open(hora_view_file, 'r', encoding='utf-8') as f:
    hv = f.read()

hv = hv.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
hv = hv.replace(
    'return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {',
    'return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'
)
hv = hv.replace(
    '{isHi ? "कल (बीता हुआ)" : "Yesterday"}',
    '{isTe ? "నిన్న" : isHi ? "कल (बीता हुआ)" : "Yesterday"}'
)
hv = hv.replace(
    '{isHi ? "आज" : "Today"}',
    '{isTe ? "ఈరోజు" : isHi ? "आज" : "Today"}'
)
hv = hv.replace(
    '{isHi ? "कल (आने वाला)" : "Tomorrow"}',
    '{isTe ? "రేపు" : isHi ? "कल (आने वाला)" : "Tomorrow"}'
)
hv = hv.replace(
    '{isHi ? "अभी सक्रिय ग्रह होरा" : "Currently Active Planetary Hora"}',
    '{isTe ? "ప్రస్తుతం నడుస్తున్న గ్రహ హోరా" : isHi ? "अभी सक्रिय ग्रह होरा" : "Currently Active Planetary Hora"}'
)
hv = hv.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "कॉपी करें" : "Copy Schedule")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ చేయండి" : isHi ? "कॉपी करें" : "Copy Schedule")}'
)
hv = hv.replace(
    '{isHi ? "दैनिक 24 ग्रह होरा समय सारणी" : "24 Planetary Horas Schedule"}',
    '{isTe ? "దిన 24 గ్రహ హోరా సమయ పట్టిక" : isHi ? "दैनिक 24 ग्रह होरा समय सारणी" : "24 Planetary Horas Schedule"}'
)
hv = hv.replace(
    '{isHi ? "दिन की होरा (12)" : "Day Horas (12)"}',
    '{isTe ? "పగటి హోరalu (12)" : isHi ? "दिन की होरा (12)" : "Day Horas (12)"}'
)
hv = hv.replace(
    '{isHi ? "रात की होरा (12)" : "Night Horas (12)"}',
    '{isTe ? "రాత్రి హోరalu (12)" : isHi ? "रात की होरा (12)" : "Night Horas (12)"}'
)
hv = hv.replace(
    '{isHi ? "श्रेष्ठ कार्य:" : "Favorable for:"}',
    '{isTe ? "అనుకూల పనులు:" : isHi ? "श्रेष्ठ कार्य:" : "Favorable for:"}'
)

with open(hora_view_file, 'w', encoding='utf-8') as f:
    f.write(hv)

# 2. Update BhadraView.tsx
bhadra_view_file = 'src/components/panchang/BhadraView.tsx'
with open(bhadra_view_file, 'r', encoding='utf-8') as f:
    bv = f.read()

bv = bv.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
bv = bv.replace(
    '{isHi ? "वर्तमान भद्रा स्थिति" : "Current Bhadra Status"}',
    '{isTe ? "ప్రస్తుత భద్రా స్థితి" : isHi ? "वर्तमान भद्रा स्थिति" : "Current Bhadra Status"}'
)
bv = bv.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy Status")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ / షేర్" : isHi ? "शेयर करें" : "Copy Status")}'
)

with open(bhadra_view_file, 'w', encoding='utf-8') as f:
    f.write(bv)

# 3. Update PanchakView.tsx
panchak_view_file = 'src/components/panchang/PanchakView.tsx'
with open(panchak_view_file, 'r', encoding='utf-8') as f:
    pv = f.read()

pv = pv.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
pv = pv.replace(
    '{isHi ? "वर्तमान पंचक स्थिति" : "Current Panchak Status"}',
    '{isTe ? "ప్రస్తుత పంచక స్థితి" : isHi ? "वर्तमान पंचक स्थिति" : "Current Panchak Status"}'
)
pv = pv.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Copy Status")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ / షేర్" : isHi ? "शेयर करें" : "Copy Status")}'
)

with open(panchak_view_file, 'w', encoding='utf-8') as f:
    f.write(pv)

# 4. Update GowriView.tsx
gowri_view_file = 'src/components/panchang/GowriView.tsx'
with open(gowri_view_file, 'r', encoding='utf-8') as f:
    gv = f.read()

gv = gv.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
gv = gv.replace(
    'return new Intl.DateTimeFormat(isHi ? "hi-IN" : "en-IN", {',
    'return new Intl.DateTimeFormat(isTe ? "te-IN" : isHi ? "hi-IN" : "en-IN", {'
)
gv = gv.replace(
    '{isHi ? "दिन का गौरी पंचांगम" : "Day Gowri Panchangam"}',
    '{isTe ? "పగటి గౌరీ పంచాంగం" : isHi ? "दिन का गौरी पंचांगम" : "Day Gowri Panchangam"}'
)
gv = gv.replace(
    '{isHi ? "रात का गौरी पंचांगम" : "Night Gowri Panchangam"}',
    '{isTe ? "రాత్రి గౌరీ పంచాంగం" : isHi ? "रात का गौरी पंचांगम" : "Night Gowri Panchangam"}'
)
gv = gv.replace(
    '{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "शेयर करें" : "Share Gowri Timings")}',
    '{copied ? (isTe ? "కాపీ అయింది!" : isHi ? "कॉपी हो गया!" : "Copied!") : (isTe ? "కాపీ / షేర్" : isHi ? "शेयर करें" : "Share Gowri Timings")}'
)

with open(gowri_view_file, 'w', encoding='utf-8') as f:
    f.write(gv)

# 5. Update GrahanView.tsx
grahan_view_file = 'src/components/panchang/GrahanView.tsx'
with open(grahan_view_file, 'r', encoding='utf-8') as f:
    grv = f.read()

grv = grv.replace(
    '  const locale = useLocale();\n  const isHi = locale === "hi";',
    '  const locale = useLocale();\n  const isHi = locale === "hi";\n  const isTe = locale === "te";'
)
grv = grv.replace(
    '{isHi ? "सभी ग्रहण" : "All Eclipses"}',
    '{isTe ? "అన్ని గ్రహణాలు" : isHi ? "सभी ग्रहण" : "All Eclipses"}'
)
grv = grv.replace(
    '{isHi ? "सूर्य ग्रहण" : "Solar Eclipses"}',
    '{isTe ? "సూర్య గ్రహణాలు" : isHi ? "सूर्य ग्रहण" : "Solar Eclipses"}'
)
grv = grv.replace(
    '{isHi ? "चंद्र ग्रहण" : "Lunar Eclipses"}',
    '{isTe ? "చంద్ర గ్రహణాలు" : isHi ? "चंद्र ग्रहण" : "Lunar Eclipses"}'
)
grv = grv.replace(
    '{isHi ? "भारत में दृश्य" : "Visible in India"}',
    '{isTe ? "భారతదేశంలో దృశ్యమయ్యేవి" : isHi ? "भारत में दृश्य" : "Visible in India"}'
)

with open(grahan_view_file, 'w', encoding='utf-8') as f:
    f.write(grv)

print("Updated view components successfully!")

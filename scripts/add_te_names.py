# Add Telugu arrays to src/lib/panchang/names.ts
with open("src/lib/panchang/names.ts", "r", encoding="utf-8") as f:
    code = f.read()

te_tithis = '''export const TITHI_NAMES_TE = [
  "పాడ్యమి",
  "విదియ",
  "తదియ",
  "చవితి",
  "పంచమి",
  "షష్ఠి",
  "సప్తమి",
  "అష్టమి",
  "నవమి",
  "దశమి",
  "ఏకాదశి",
  "ద్వాదశి",
  "త్రయోదశి",
  "చతుర్దశి",
  "పౌర్ణమి / అమావాస్య",
] as const;
'''

te_masas = '''export const MASA_NAMES_TE = [
  "చైత్రము",
  "వైశాఖము",
  "జ్యేష్ఠము",
  "ఆషాఢము",
  "శ్రావణము",
  "భాద్రపదము",
  "ఆశ్వయుజము",
  "కార్తీకము",
  "మార్గశిరము",
  "పుష్యము",
  "మాఘము",
  "ఫాల్గుణము",
] as const;
'''

te_rasis = '''export const RASI_NAMES_TE = [
  "మేషం",
  "వృషభం",
  "మిథునం",
  "కర్కాటకం",
  "సింహం",
  "కన్య",
  "తుల",
  "వృశ్చికం",
  "ధనుస్సు",
  "మకరం",
  "కుంభం",
  "మీనం",
] as const;
'''

te_nakshatras = '''export const NAKSHATRA_NAMES_TE = [
  "అశ్విని",
  "భరణి",
  "కృత్తిక",
  "రోహిణి",
  "మృగశిర",
  "ఆర్ద్ర",
  "పునర్వసు",
  "పుష్యమి",
  "ఆశ్లేష",
  "మఖ",
  "పూర్వ ఫల్గుణి",
  "ఉత్తర ఫల్గుణి",
  "హస్త",
  "చిత్త",
  "స్వాతి",
  "విశాఖ",
  "అనూరాధ",
  "జ్యేష్ఠ",
  "మూల",
  "పూర్వాషాఢ",
  "ఉత్తరాషాఢ",
  "శ్రవణం",
  "ధనిష్ఠ",
  "శతభిషం",
  "పూర్వాభాద్ర",
  "ఉత్తరాభాద్ర",
  "రేవతి",
] as const;
'''

if "TITHI_NAMES_TE" not in code:
    code = code.replace("export const TITHI_NAMES_HI = [", te_tithis + "\nexport const TITHI_NAMES_HI = [")

if "MASA_NAMES_TE" not in code:
    code = code.replace("export const MASA_NAMES_HI = [", te_masas + "\nexport const MASA_NAMES_HI = [")

if "RASI_NAMES_TE" not in code:
    code = code.replace("export const RASI_NAMES_HI = [", te_rasis + "\nexport const RASI_NAMES_HI = [")

if "NAKSHATRA_NAMES_TE" not in code:
    code = code.replace("export const NAKSHATRA_NAMES_HI = [", te_nakshatras + "\nexport const NAKSHATRA_NAMES_HI = [")

with open("src/lib/panchang/names.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("Added Telugu arrays to src/lib/panchang/names.ts successfully!")

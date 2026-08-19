from __future__ import annotations

import re

_LEET = str.maketrans(
    {
        "@": "a",
        "0": "o",
        "1": "i",
        "3": "e",
        "4": "a",
        "5": "s",
        "$": "s",
        "!": "i",
    }
)

# Whole-word / phrase list. Keep this a gate, not a slur encyclopedia.
_BANNED = frozenset(
    {
        "fuck",
        "fucker",
        "fucking",
        "motherfucker",
        "motherfucking",
        "shit",
        "bitch",
        "bastard",
        "asshole",
        "dick",
        "dickhead",
        "cock",
        "pussy",
        "slut",
        "whore",
        "cunt",
        "nigger",
        "nigga",
        "faggot",
        "retard",
        "rape",
        "rapist",
        "porn",
        "xxx",
        "nude",
        "nudes",
        "horny",
        "madarchod",
        "madarchodh",
        "behenchod",
        "bhenchod",
        "bhenchod",
        "behanchod",
        "bhosdike",
        "bhosdi",
        "bhosada",
        "bhosda",
        "bsdk",
        "chutiya",
        "chutia",
        "chutya",
        "chutiye",
        "gaandu",
        "gandu",
        "gaand",
        "harami",
        "haraami",
        "randi",
        "raand",
        "loda",
        "lawda",
        "lauda",
        "lund",
        "laund",
        "jhatu",
        "kamine",
        "kameene",
        "kutte",
        "kutta",
        "saali",
        "teri maa",
        "teri ma",
        "behen ke",
        "maa ki",
        "मादरचोद",
        "मदरचोद",
        "बहनचोद",
        "भेनचोद",
        "भोसड़ीके",
        "भोसडीके",
        "चूतिया",
        "चूतिये",
        "गांडू",
        "गाण्डू",
        "रंडी",
        "रण्डी",
        "लौड़ा",
        "लौडा",
        "लंड",
        "लण्ड",
        "कमीने",
        "हरामी",
    }
)

_WORD = re.compile(r"[a-z]+|[\u0900-\u097f]+")
_SPACE = re.compile(r"\s+")
_JUNK = re.compile(r"[^a-z\u0900-\u097f\s]")


def normalize_text(value: str) -> str:
    text = (value or "").lower().translate(_LEET)
    text = _JUNK.sub(" ", text)
    return _SPACE.sub(" ", text).strip()


def abuse_hit(value: str) -> bool:
    compact = normalize_text(value)
    if not compact:
        return False
    squashed = compact.replace(" ", "")
    tokens = set(_WORD.findall(compact))
    for banned in _BANNED:
        needle = banned.lower()
        if " " in needle:
            if needle in compact:
                return True
            continue
        if needle in tokens or needle in squashed:
            return True
    return False

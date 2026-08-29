import { GitaChapter, GitaPayload, GitaValidationError, GitaValidationSummary, GitaVerse } from "./types";

/**
 * Validates raw Gita JSON or JavaScript object against the Gita schema.
 * Returns a comprehensive validation summary with statistics and errors.
 */
export function validateGitaJson(input: unknown): GitaValidationSummary {
  const errors: GitaValidationError[] = [];
  const warnings: string[] = [];

  let payload: any = input;

  if (typeof input === "string") {
    try {
      payload = JSON.parse(input);
    } catch (e: any) {
      return {
        isValid: false,
        totalChapters: 0,
        totalVerses: 0,
        totalWords: 0,
        languages: [],
        errors: [
          {
            code: "INVALID_JSON",
            message: `JSON syntax error: ${e?.message || "Invalid JSON"}`,
          },
        ],
        warnings: [],
        sampleChapters: [],
      };
    }
  }

  if (!payload || typeof payload !== "object") {
    return {
      isValid: false,
      totalChapters: 0,
      totalVerses: 0,
      totalWords: 0,
      languages: [],
      errors: [
        {
          code: "MISSING_CHAPTERS",
          message: "Root payload must be an object with a 'chapters' array or an array of chapters.",
        },
      ],
      warnings: [],
      sampleChapters: [],
    };
  }

  // Support either { "chapters": [...] } or direct array [...]
  let rawChapters: any[] = [];
  if (Array.isArray(payload)) {
    rawChapters = payload;
  } else if (Array.isArray(payload.chapters)) {
    rawChapters = payload.chapters;
  } else {
    errors.push({
      code: "MISSING_CHAPTERS",
      field: "chapters",
      message: "Root object must include a 'chapters' array property.",
    });
  }

  if (rawChapters.length === 0 && errors.length === 0) {
    errors.push({
      code: "MISSING_CHAPTERS",
      field: "chapters",
      message: "The 'chapters' array is empty. At least 1 chapter is required.",
    });
  }

  const seenChapters = new Set<number>();
  let totalVerses = 0;
  let totalWords = 0;
  const detectedLanguages = new Set<string>();
  const normalizedChapters: GitaChapter[] = [];

  for (let cIdx = 0; cIdx < rawChapters.length; cIdx++) {
    const rawCh = rawChapters[cIdx];
    if (!rawCh || typeof rawCh !== "object") {
      errors.push({
        code: "INVALID_JSON",
        message: `Chapter at index ${cIdx} is not a valid object.`,
      });
      continue;
    }

    const chapterNum = Number(rawCh.chapter ?? rawCh.chapterNumber ?? cIdx + 1);
    if (!Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > 108) {
      errors.push({
        chapter: chapterNum,
        field: "chapter",
        code: "INVALID_CHAPTER_NUM",
        message: `Chapter at index ${cIdx} has an invalid chapter number: ${rawCh.chapter}. Must be an integer >= 1.`,
      });
    } else if (seenChapters.has(chapterNum)) {
      errors.push({
        chapter: chapterNum,
        field: "chapter",
        code: "DUPLICATE_CHAPTER",
        message: `Duplicate chapter number ${chapterNum} found in payload.`,
      });
    } else {
      seenChapters.add(chapterNum);
    }

    const chapterName = String(rawCh.name || rawCh.title || "").trim();
    if (!chapterName) {
      errors.push({
        chapter: chapterNum,
        field: "name",
        code: "MISSING_NAME",
        message: `Chapter ${chapterNum} is missing a required 'name' field.`,
      });
    }

    const rawVerses = Array.isArray(rawCh.verses) ? rawCh.verses : [];
    if (rawVerses.length === 0) {
      warnings.push(`Chapter ${chapterNum} has 0 verses.`);
    }

    const seenVerses = new Set<number>();
    const normalizedVerses: GitaVerse[] = [];

    for (let vIdx = 0; vIdx < rawVerses.length; vIdx++) {
      const rawV = rawVerses[vIdx];
      if (!rawV || typeof rawV !== "object") {
        errors.push({
          chapter: chapterNum,
          code: "INVALID_JSON",
          message: `Verse at index ${vIdx} in Chapter ${chapterNum} is not a valid object.`,
        });
        continue;
      }

      const verseNum = Number(rawV.verse ?? rawV.verseNumber ?? vIdx + 1);
      if (!Number.isInteger(verseNum) || verseNum < 1) {
        errors.push({
          chapter: chapterNum,
          verse: verseNum,
          field: "verse",
          code: "INVALID_VERSE_NUM",
          message: `Verse at index ${vIdx} in Chapter ${chapterNum} has an invalid number: ${rawV.verse}.`,
        });
      } else if (seenVerses.has(verseNum)) {
        errors.push({
          chapter: chapterNum,
          verse: verseNum,
          field: "verse",
          code: "DUPLICATE_VERSE",
          message: `Duplicate verse number ${verseNum} in Chapter ${chapterNum}.`,
        });
      } else {
        seenVerses.add(verseNum);
      }

      const sanskrit = String(rawV.sanskrit || rawV.sloka || rawV.shloka || "").trim();
      if (!sanskrit) {
        errors.push({
          chapter: chapterNum,
          verse: verseNum,
          field: "sanskrit",
          code: "MISSING_SANSKRIT",
          message: `Verse ${chapterNum}.${verseNum} is missing required 'sanskrit' text.`,
        });
      } else {
        detectedLanguages.add("Sanskrit");
        totalWords += sanskrit.split(/\s+/).filter(Boolean).length;
      }

      const transliteration = String(rawV.transliteration || rawV.translit || "").trim();
      if (transliteration) {
        totalWords += transliteration.split(/\s+/).filter(Boolean).length;
      }

      const hindi = String(rawV.hindi || rawV.hindiTranslation || rawV.bhavarth || "").trim();
      if (hindi) {
        detectedLanguages.add("Hindi");
        totalWords += hindi.split(/\s+/).filter(Boolean).length;
      }

      const english = String(rawV.english || rawV.englishTranslation || rawV.translation || "").trim();
      if (english) {
        detectedLanguages.add("English");
        totalWords += english.split(/\s+/).filter(Boolean).length;
      }

      if (!hindi && !english) {
        warnings.push(`Verse ${chapterNum}.${verseNum} has neither Hindi nor English meaning.`);
      }

      totalVerses++;

      normalizedVerses.push({
        verse: verseNum,
        chapter: chapterNum,
        verseNumber: `${chapterNum}.${verseNum}`,
        speaker: rawV.speaker ? String(rawV.speaker).trim() : undefined,
        sanskrit,
        transliteration,
        hindi,
        english,
        wordMeanings: rawV.wordMeanings ? String(rawV.wordMeanings).trim() : undefined,
        commentary: rawV.commentary ? String(rawV.commentary).trim() : undefined,
      });
    }

    normalizedChapters.push({
      chapter: chapterNum,
      name: chapterName,
      nameHindi: rawCh.nameHindi ? String(rawCh.nameHindi).trim() : chapterName,
      nameSanskrit: rawCh.nameSanskrit ? String(rawCh.nameSanskrit).trim() : chapterName,
      nameTranslation: rawCh.nameTranslation ? String(rawCh.nameTranslation).trim() : chapterName,
      versesCount: normalizedVerses.length,
      summary: rawCh.summary ? String(rawCh.summary).trim() : "",
      summaryHindi: rawCh.summaryHindi ? String(rawCh.summaryHindi).trim() : "",
      verses: normalizedVerses,
    });
  }

  const languagesList = Array.from(detectedLanguages);
  if (languagesList.length === 0) languagesList.push("Sanskrit", "Hindi", "English");

  return {
    isValid: errors.length === 0,
    totalChapters: normalizedChapters.length,
    totalVerses,
    totalWords,
    languages: languagesList,
    errors,
    warnings,
    sampleChapters: normalizedChapters,
  };
}

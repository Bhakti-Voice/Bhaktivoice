export interface GitaVerse {
  verse: number;
  chapter: number;
  verseNumber: string; // e.g. "2.11"
  speaker?: string; // e.g. "श्रीभगवानुवाच", "संजय उवाच", "अर्जुन उवाच", "धृतराष्ट्र उवाच"
  sanskrit: string; // Original Devanagari verse
  transliteration: string; // IAST Romanized pronunciation
  hindi: string; // Hindi translation & Bhavarth
  english: string; // English translation & meaning
  wordMeanings?: string; // Word-by-word breakdown (optional)
  commentary?: string; // Extended philosophical commentary (optional)
}

export interface GitaChapter {
  chapter: number; // 1 to 18
  name: string; // e.g. "Sankhya Yoga"
  nameHindi: string; // e.g. "सांख्य योग"
  nameSanskrit: string; // e.g. "सांख्ययोगः"
  nameTranslation: string; // e.g. "The Yoga of Knowledge"
  versesCount: number; // e.g. 72
  summary: string; // English overview
  summaryHindi: string; // Hindi overview
  verses?: GitaVerse[]; // Populated when loading full chapter
}

export interface GitaPayload {
  title?: string;
  language?: string;
  version?: string;
  totalChapters?: number;
  totalVerses?: number;
  chapters: GitaChapter[];
}

export interface GitaChapterPayload {
  chapter: number;
  name: string;
  nameHindi?: string;
  nameSanskrit?: string;
  nameTranslation?: string;
  versesCount?: number;
  summary?: string;
  summaryHindi?: string;
  verses: GitaVersePayload[];
}

export interface GitaVersePayload {
  verse: number;
  chapter?: number;
  verseNumber?: string;
  speaker?: string;
  sanskrit: string;
  transliteration?: string;
  hindi?: string;
  english?: string;
  wordMeanings?: string;
  commentary?: string;
}

export interface GitaValidationSummary {
  isValid: boolean;
  totalChapters: number;
  totalVerses: number;
  totalWords: number;
  languages: string[];
  errors: GitaValidationError[];
  warnings: string[];
  sampleChapters: GitaChapter[];
}

export interface GitaValidationError {
  chapter?: number;
  verse?: number;
  field?: string;
  message: string;
  code:
    | "INVALID_JSON"
    | "MISSING_CHAPTERS"
    | "INVALID_CHAPTER_NUM"
    | "MISSING_NAME"
    | "DUPLICATE_CHAPTER"
    | "MISSING_VERSES"
    | "INVALID_VERSE_NUM"
    | "MISSING_SANSKRIT"
    | "MISSING_TRANSLATION"
    | "DUPLICATE_VERSE"
    | "UNKNOWN_ERROR";
}

export interface GitaStats {
  totalChapters: number;
  totalVerses: number;
  totalWords: number;
  languages: string[];
  lastUpdated?: string;
}

export interface GitaBookmark {
  id: string; // e.g. "2-11"
  chapter: number;
  verse: number;
  verseNumber: string;
  sanskritPreview: string;
  hindiPreview: string;
  englishPreview: string;
  savedAt: string;
}

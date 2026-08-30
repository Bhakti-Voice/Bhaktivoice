import fs from "fs";
import path from "path";
import { GitaChapter, GitaPayload, GitaStats, GitaVerse } from "./types";
import { buildInitialGitaDataset, GITA_ALL_18_CHAPTERS_METADATA } from "./seed-data";

// In-memory runtime cache (loaded only when Gita functions are called)
let memoryGitaData: GitaPayload | null = null;

function getDataFilePath(): string {
  return path.join(process.cwd(), "data", "bhagavad_gita.json");
}

function loadGitaData(): GitaPayload {
  if (memoryGitaData && memoryGitaData.chapters && memoryGitaData.chapters.length > 0) {
    return memoryGitaData;
  }

  const filePath = getDataFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.chapters) && parsed.chapters.length > 0) {
        memoryGitaData = parsed;
        return memoryGitaData!;
      }
    }
  } catch (error) {
    console.error("Error reading saved Gita JSON from disk:", error);
  }

  // Fallback to bundled seed dataset
  memoryGitaData = buildInitialGitaDataset();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(memoryGitaData, null, 2), "utf-8");
  } catch {
    // Ignore in read-only / serverless environments
  }

  return memoryGitaData;
}

/**
 * Returns all 18 chapters overview metadata.
 * Loaded on demand from the single JSON dataset.
 */
export async function getGitaChapters(): Promise<Omit<GitaChapter, "verses">[]> {
  const data = loadGitaData();
  return data.chapters.map((ch) => ({
    chapter: ch.chapter,
    name: ch.name,
    nameHindi: ch.nameHindi,
    nameSanskrit: ch.nameSanskrit,
    nameTranslation: ch.nameTranslation,
    versesCount: ch.versesCount || ch.verses?.length || 0,
    summary: ch.summary,
    summaryHindi: ch.summaryHindi,
  }));
}

/**
 * Returns a specific chapter with its verses from the single JSON.
 */
export async function getGitaChapter(chapterNumber: number): Promise<GitaChapter | null> {
  const data = loadGitaData();
  const found = data.chapters.find((c) => c.chapter === chapterNumber);
  if (!found) {
    const meta = GITA_ALL_18_CHAPTERS_METADATA.find((c) => c.chapter === chapterNumber);
    if (meta) {
      return {
        ...meta,
        verses: [],
      };
    }
    return null;
  }

  return {
    ...found,
    verses: found.verses || [],
  };
}

/**
 * Returns a specific verse with previous/next navigation context.
 */
export async function getGitaVerse(
  chapterNumber: number,
  verseNumber: number,
): Promise<{
  verse: GitaVerse | null;
  chapter: Omit<GitaChapter, "verses"> | null;
  previous: { chapter: number; verse: number } | null;
  next: { chapter: number; verse: number } | null;
}> {
  const chapter = await getGitaChapter(chapterNumber);
  if (!chapter || !chapter.verses || chapter.verses.length === 0) {
    return { verse: null, chapter: null, previous: null, next: null };
  }

  const verseIdx = chapter.verses.findIndex((v) => v.verse === verseNumber);
  const chMeta: Omit<GitaChapter, "verses"> = {
    chapter: chapter.chapter,
    name: chapter.name,
    nameHindi: chapter.nameHindi,
    nameSanskrit: chapter.nameSanskrit,
    nameTranslation: chapter.nameTranslation,
    versesCount: chapter.verses.length,
    summary: chapter.summary,
    summaryHindi: chapter.summaryHindi,
  };

  if (verseIdx === -1) {
    return {
      verse: null,
      chapter: chMeta,
      previous: null,
      next: null,
    };
  }

  const verse = chapter.verses[verseIdx];
  let previous: { chapter: number; verse: number } | null = null;
  let next: { chapter: number; verse: number } | null = null;

  if (verseIdx > 0) {
    previous = { chapter: chapterNumber, verse: chapter.verses[verseIdx - 1].verse };
  } else if (chapterNumber > 1) {
    const prevChapter = await getGitaChapter(chapterNumber - 1);
    if (prevChapter && prevChapter.verses && prevChapter.verses.length > 0) {
      previous = {
        chapter: chapterNumber - 1,
        verse: prevChapter.verses[prevChapter.verses.length - 1].verse,
      };
    }
  }

  if (verseIdx < chapter.verses.length - 1) {
    next = { chapter: chapterNumber, verse: chapter.verses[verseIdx + 1].verse };
  } else if (chapterNumber < 18) {
    const nextChapter = await getGitaChapter(chapterNumber + 1);
    if (nextChapter && nextChapter.verses && nextChapter.verses.length > 0) {
      next = { chapter: chapterNumber + 1, verse: nextChapter.verses[0].verse };
    }
  }

  return {
    verse,
    chapter: chMeta,
    previous,
    next,
  };
}

/**
 * Returns overall statistics for Gita scripture.
 */
export async function getGitaStats(): Promise<GitaStats> {
  const data = loadGitaData();
  let totalVerses = 0;
  let totalWords = 0;
  const languages = new Set<string>();

  for (const ch of data.chapters) {
    for (const v of ch.verses || []) {
      totalVerses++;
      if (v.sanskrit) {
        languages.add("Sanskrit");
        totalWords += v.sanskrit.split(/\s+/).filter(Boolean).length;
      }
      if (v.transliteration) {
        totalWords += v.transliteration.split(/\s+/).filter(Boolean).length;
      }
      if (v.hindi) {
        languages.add("Hindi");
        totalWords += v.hindi.split(/\s+/).filter(Boolean).length;
      }
      if (v.english) {
        languages.add("English");
        totalWords += v.english.split(/\s+/).filter(Boolean).length;
      }
    }
  }

  return {
    totalChapters: data.chapters.length,
    totalVerses,
    totalWords,
    languages: Array.from(languages),
  };
}

/**
 * Returns a random uplifting shloka for daily reflection.
 */
export async function getRandomGitaVerse(): Promise<GitaVerse> {
  const data = loadGitaData();
  const allVerses: GitaVerse[] = [];
  for (const ch of data.chapters) {
    if (ch.verses) {
      allVerses.push(...ch.verses);
    }
  }

  if (allVerses.length === 0) {
    return {
      chapter: 2,
      verse: 47,
      verseNumber: "2.47",
      speaker: "श्रीभगवानुवाच",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ २.४७ ॥",
      transliteration: "karmaṇyevādhikāraste mā phaleṣu kadācana |\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi || 2.47 ||",
      hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं।",
      english: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    };
  }

  const randomIndex = Math.floor(Math.random() * allVerses.length);
  return allVerses[randomIndex];
}

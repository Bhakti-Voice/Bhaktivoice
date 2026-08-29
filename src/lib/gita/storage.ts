import fs from "fs";
import path from "path";
import { GitaChapter, GitaPayload, GitaStats, GitaVerse } from "./types";
import { buildInitialGitaDataset } from "./seed-data";
import { validateGitaJson } from "./validator";

// In-memory runtime cache
let memoryGitaData: GitaPayload | null = null;

function getDataFilePath(): string {
  // Use workspace data directory or fallback
  return path.join(process.cwd(), "data", "bhagavad_gita.json");
}

function loadGitaData(): GitaPayload {
  if (memoryGitaData) {
    return memoryGitaData;
  }

  const filePath = getDataFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.chapters)) {
        memoryGitaData = parsed;
        return memoryGitaData!;
      }
    }
  } catch (error) {
    console.error("Error reading saved Gita JSON from disk:", error);
  }

  // Fallback to initial seed dataset
  memoryGitaData = buildInitialGitaDataset();
  // Attempt to write out initial file asynchronously so data folder exists
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

function saveGitaData(data: GitaPayload): void {
  memoryGitaData = data;
  const filePath = getDataFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not persist Gita JSON to filesystem:", error);
  }
}

/**
 * Returns all 18 chapters overview metadata.
 */
export async function getGitaChapters(): Promise<Omit<GitaChapter, "verses">[]> {
  const data = loadGitaData();
  return data.chapters.map((ch) => ({
    chapter: ch.chapter,
    name: ch.name,
    nameHindi: ch.nameHindi,
    nameSanskrit: ch.nameSanskrit,
    nameTranslation: ch.nameTranslation,
    versesCount: ch.verses?.length || 0,
    summary: ch.summary,
    summaryHindi: ch.summaryHindi,
  }));
}

/**
 * Returns a specific chapter with its verses.
 */
export async function getGitaChapter(chapterNumber: number): Promise<GitaChapter | null> {
  const data = loadGitaData();
  const found = data.chapters.find((c) => c.chapter === chapterNumber);
  if (!found) return null;
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
  if (!chapter || !chapter.verses) {
    return { verse: null, chapter: null, previous: null, next: null };
  }

  const verseIdx = chapter.verses.findIndex((v) => v.verse === verseNumber);
  if (verseIdx === -1) {
    return {
      verse: null,
      chapter: {
        chapter: chapter.chapter,
        name: chapter.name,
        nameHindi: chapter.nameHindi,
        nameSanskrit: chapter.nameSanskrit,
        nameTranslation: chapter.nameTranslation,
        versesCount: chapter.verses.length,
        summary: chapter.summary,
        summaryHindi: chapter.summaryHindi,
      },
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
    chapter: {
      chapter: chapter.chapter,
      name: chapter.name,
      nameHindi: chapter.nameHindi,
      nameSanskrit: chapter.nameSanskrit,
      nameTranslation: chapter.nameTranslation,
      versesCount: chapter.verses.length,
      summary: chapter.summary,
      summaryHindi: chapter.summaryHindi,
    },
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

/**
 * Imports and merges validated Gita JSON.
 * Can do full replace or chapter-level upsert.
 */
export async function importGitaJson(
  input: unknown,
  mode: "merge" | "replace" = "merge",
): Promise<{
  success: boolean;
  importedChapters: number;
  importedVerses: number;
  message: string;
}> {
  const validation = validateGitaJson(input);
  if (!validation.isValid) {
    throw new Error(validation.errors.map((e) => e.message).join("; "));
  }

  const current = loadGitaData();
  let updatedChapters: GitaChapter[] = [];

  if (mode === "replace") {
    updatedChapters = validation.sampleChapters;
  } else {
    // Merge mode: map existing chapters, updating any matching imported chapters
    const importedMap = new Map<number, GitaChapter>();
    validation.sampleChapters.forEach((ch) => importedMap.set(ch.chapter, ch));

    // Update existing chapters
    const mergedList: GitaChapter[] = [];
    const processedChapters = new Set<number>();

    for (const existingCh of current.chapters) {
      if (importedMap.has(existingCh.chapter)) {
        const incoming = importedMap.get(existingCh.chapter)!;
        // Merge verses
        const verseMap = new Map<number, GitaVerse>();
        (existingCh.verses || []).forEach((v) => verseMap.set(v.verse, v));
        (incoming.verses || []).forEach((v) => verseMap.set(v.verse, v));

        const sortedVerses = Array.from(verseMap.values()).sort((a, b) => a.verse - b.verse);

        mergedList.push({
          ...existingCh,
          ...incoming,
          versesCount: sortedVerses.length,
          verses: sortedVerses,
        });
        processedChapters.add(existingCh.chapter);
      } else {
        mergedList.push(existingCh);
      }
    }

    // Add any completely new chapters
    for (const [chNum, incoming] of importedMap.entries()) {
      if (!processedChapters.has(chNum)) {
        mergedList.push(incoming);
      }
    }

    mergedList.sort((a, b) => a.chapter - b.chapter);
    updatedChapters = mergedList;
  }

  const totalVerses = updatedChapters.reduce((acc, ch) => acc + (ch.verses?.length || 0), 0);

  const newPayload: GitaPayload = {
    title: "Bhagavad Gita — The Sacred Song of God",
    language: "sa-hi-en",
    version: "1.1.0",
    totalChapters: updatedChapters.length,
    totalVerses,
    chapters: updatedChapters,
  };

  saveGitaData(newPayload);

  return {
    success: true,
    importedChapters: validation.sampleChapters.length,
    importedVerses: validation.totalVerses,
    message: `Successfully imported ${validation.sampleChapters.length} chapters with ${validation.totalVerses} verses into the system.`,
  };
}

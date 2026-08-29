import { GitaChapter, GitaPayload } from "./types";

export const GITA_ALL_18_CHAPTERS_METADATA: Omit<GitaChapter, "verses">[] = [];

/**
 * Builds clean, empty initial Gita dataset ready for admin import.
 */
export function buildInitialGitaDataset(): GitaPayload {
  return {
    title: "Bhagavad Gita — The Sacred Song of God",
    language: "sa-hi-en",
    version: "1.0.0",
    totalChapters: 0,
    totalVerses: 0,
    chapters: [],
  };
}

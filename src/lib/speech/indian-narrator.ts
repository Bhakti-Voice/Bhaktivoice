export type NarratorLang = "en-IN" | "hi-IN";

const INDIAN_NAME =
  /india|indian|hindi|हिन्दी|हिंदी|heera|ravi|rishi|veena|lekha|neerja|hemant|kalpana|priya|aditi|google hindi/i;

export function narratorLang(locale: string, seriesLanguage?: string): NarratorLang {
  const raw = (seriesLanguage ?? "").toLowerCase();
  if (locale === "hi" || /hindi|हिंदी|हिन्दी/.test(raw)) return "hi-IN";
  return "en-IN";
}

export function pickIndianVoice(
  voices: SpeechSynthesisVoice[],
  lang: NarratorLang,
): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const prefix = lang.slice(0, 2).toLowerCase();
  const normalized = (value: string) => value.replace("_", "-").toLowerCase();

  const scored = voices.map((voice) => {
    const voiceLang = normalized(voice.lang || "");
    let score = 0;
    if (voiceLang === lang.toLowerCase() || voiceLang.startsWith(`${lang.toLowerCase()}`)) score += 80;
    else if (voiceLang.startsWith(prefix)) score += 30;
    if (INDIAN_NAME.test(voice.name)) score += 40;
    if (voice.localService) score += 8;
    if (/female|heera|veena|lekha|neerja|priya|aditi/i.test(voice.name)) score += 4;
    return { voice, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score ? scored[0].voice : voices[0] ?? null;
}

export function chunkForSpeech(text: string, max = 160): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.match(/[^.!?।]+[.!?।]+|[^.!?।]+$/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) continue;
    if ((current + " " + next).trim().length > max && current) {
      chunks.push(current.trim());
      current = next;
    } else {
      current = `${current} ${next}`.trim();
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}

export function kathaScript(input: {
  title: string;
  subtitle?: string;
  introduction?: string;
  episodes?: { number: number; title: string; summary: string }[];
  lang: NarratorLang;
}): string {
  const hi = input.lang === "hi-IN";
  const parts = [
    hi ? `कथा। ${input.title}।` : `Katha. ${input.title}.`,
    input.subtitle,
    input.introduction,
  ].filter(Boolean) as string[];

  for (const episode of input.episodes ?? []) {
    parts.push(
      hi
        ? `प्रसंग ${episode.number}। ${episode.title}। ${episode.summary}`
        : `Episode ${episode.number}. ${episode.title}. ${episode.summary}`,
    );
  }
  return parts.join(" ");
}

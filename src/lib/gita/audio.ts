/**
 * Web Speech API and Devotional Sound synthesis for Bhagavad Gita Shlokas
 */

class GitaAudioEngine {
  private ambientAudio: HTMLAudioElement | null = null;
  private isAmbientPlaying = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  /**
   * Speak Sanskrit / Hindi / English shloka text using Web Speech API with meditative cadence.
   */
  public speakVerse(
    text: string,
    language: "sa" | "hi" | "en" = "sa",
    onStart?: () => void,
    onEnd?: () => void,
  ): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text of dandas and numbers for natural pronunciation
    const cleanText = text
      .replace(/॥[^॥]*॥/g, "")
      .replace(/[१२३४५६७८९०0-9.]/g, "")
      .replace(/\|/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Pick suitable voice
    const voices = window.speechSynthesis.getVoices();
    let voice = null;

    if (language === "sa" || language === "hi") {
      voice =
        voices.find((v) => v.lang.startsWith("hi") || v.lang.startsWith("sa")) ||
        voices.find((v) => v.lang.includes("IN")) ||
        voices[0];
      utterance.lang = "hi-IN";
      utterance.rate = 0.82; // Meditative, solemn pace
      utterance.pitch = 0.95; // Calm, resonant tone
    } else {
      voice =
        voices.find((v) => v.lang.startsWith("en-IN")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
    }

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    return window.speechSynthesis.speaking;
  }

  /**
   * Play devotional temple bell sound effect using Web Audio API oscillator
   */
  public playTempleBell(): void {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(528, now); // 528 Hz - Sacred Solfeggio / Temple Bell tone
      osc.frequency.exponentialRampToValueAtTime(264, now + 2.5);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // Audio context might be restricted
    }
  }

  /**
   * Play soft page-turn paper rustle sound effect
   */
  public playPageTurnSound(): void {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const bufferSize = ctx.sampleRate * 0.15; // 150ms buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate soft filtered pink noise for paper rustle
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        data[i] = (b0 + b1 + b2) * 0.08 * (1 - i / bufferSize);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }
}

export const gitaAudio = new GitaAudioEngine();

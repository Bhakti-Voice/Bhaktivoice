import React from "react";

type MoonPhaseType =
  | "new"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full"
  | "waning-gibbous"
  | "third-quarter"
  | "waning-crescent";

export function MoonPhaseIcon({
  phase,
  className = "h-4 w-4",
  illumination,
}: {
  phase: MoonPhaseType;
  className?: string;
  illumination?: number;
}) {
  if (phase === "full") {
    return (
      <span
        title={`Full Moon (Purnima) ${illumination !== undefined ? `• ${illumination}%` : ""}`}
        className={`inline-block rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)] border border-amber-300 ${className}`}
      />
    );
  }

  if (phase === "new") {
    return (
      <span
        title={`New Moon (Amavasya) ${illumination !== undefined ? `• ${illumination}%` : ""}`}
        className={`inline-block rounded-full bg-slate-800 border border-slate-600 shadow-inner ${className}`}
      />
    );
  }

  if (phase === "waxing-crescent" || phase === "first-quarter" || phase === "waxing-gibbous") {
    return (
      <span
        title={`Shukla Paksha ${illumination !== undefined ? `• ${illumination}%` : ""}`}
        className={`inline-flex items-center justify-center relative rounded-full bg-slate-800 overflow-hidden border border-amber-400/40 ${className}`}
      >
        <span className="absolute right-0 top-0 bottom-0 w-1/2 bg-amber-300 rounded-r-full shadow-[0_0_4px_rgba(245,158,11,0.4)]" />
      </span>
    );
  }

  return (
    <span
      title={`Krishna Paksha ${illumination !== undefined ? `• ${illumination}%` : ""}`}
      className={`inline-flex items-center justify-center relative rounded-full bg-slate-800 overflow-hidden border border-amber-400/30 ${className}`}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1/2 bg-amber-200/80 rounded-l-full" />
    </span>
  );
}

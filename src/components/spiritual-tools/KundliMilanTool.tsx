"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { loadMilanEngine } from "@/lib/spiritual-tools/engine-loader";
import type { MilanResult } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { BirthDetailsFields, emptyBirth } from "./BirthDetailsFields";
import { PrivacyNotice, ToolSection, primaryButtonClassName } from "./ToolUi";

export function KundliMilanTool() {
  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.milan;
  const hi = locale === "hi";
  const [boy, setBoy] = useState(emptyBirth("boy"));
  const [girl, setGirl] = useState(emptyBirth("girl"));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MilanResult | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const engine = await loadMilanEngine();
      setResult(
        engine.calculateMilan(
          { name: boy.name || copy.boyDefault, date: boy.date, time: boy.time, place: boy.place },
          { name: girl.name || copy.girlDefault, date: girl.date, time: girl.time, place: girl.place },
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PrivacyNotice text={t.spiritualTools.privacyNotice} />

      <form onSubmit={(event) => void onSubmit(event)} className="space-y-6">
        <ToolSection title={copy.boyTitle}>
          <BirthDetailsFields
            prefix="boy"
            name={boy.name}
            date={boy.date}
            time={boy.time}
            place={boy.place}
            onNameChange={(value) => setBoy((current) => ({ ...current, name: value }))}
            onDateChange={(value) => setBoy((current) => ({ ...current, date: value }))}
            onTimeChange={(value) => setBoy((current) => ({ ...current, time: value }))}
            onPlaceChange={(place) => setBoy((current) => ({ ...current, place }))}
            labels={{
              name: copy.name,
              date: copy.date,
              time: copy.time,
              place: copy.place,
              placeHint: copy.placeHint,
            }}
          />
        </ToolSection>

        <ToolSection title={copy.girlTitle}>
          <BirthDetailsFields
            prefix="girl"
            name={girl.name}
            date={girl.date}
            time={girl.time}
            place={girl.place}
            onNameChange={(value) => setGirl((current) => ({ ...current, name: value }))}
            onDateChange={(value) => setGirl((current) => ({ ...current, date: value }))}
            onTimeChange={(value) => setGirl((current) => ({ ...current, time: value }))}
            onPlaceChange={(place) => setGirl((current) => ({ ...current, place }))}
            labels={{
              name: copy.name,
              date: copy.date,
              time: copy.time,
              place: copy.place,
              placeHint: copy.placeHint,
            }}
          />
        </ToolSection>

        <button type="submit" disabled={loading} className={primaryButtonClassName(loading)}>
          {loading ? (
            <>
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
              {copy.calculating}
            </>
          ) : (
            copy.submit
          )}
        </button>
      </form>

      {result ? (
        <ToolSection title={copy.resultTitle}>
          <div className="rounded-2xl bg-[#fff7f0] px-5 py-4 ring-1 ring-saffron/20">
            <p className="text-3xl font-serif text-saffron-deep">
              {result.total}
              <span className="text-lg text-muted"> / {result.maxTotal}</span>
            </p>
            <p className="mt-2 text-sm font-medium text-ink">{hi ? result.verdictHi : result.verdict}</p>
          </div>

          <div className="mt-6 space-y-2">
            {result.gunas.map((guna) => (
              <div
                key={guna.name}
                className="flex items-center justify-between rounded-2xl bg-cream/60 px-4 py-3 ring-1 ring-line/70"
              >
                <div>
                  <p className="font-medium text-ink">{hi ? guna.nameHi : guna.name}</p>
                  <p className="text-xs text-muted">{guna.detail}</p>
                </div>
                <p className="font-serif text-lg text-saffron-deep">
                  {guna.score}/{guna.max}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
              <p className="text-xs uppercase tracking-wide text-muted">{copy.boyMoon}</p>
              <p className="mt-1 font-medium text-ink">
                {hi ? result.boy.moon.rashiHi : result.boy.moon.rashi} ·{" "}
                {hi ? result.boy.moon.nakshatraHi : result.boy.moon.nakshatra}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
              <p className="text-xs uppercase tracking-wide text-muted">{copy.girlMoon}</p>
              <p className="mt-1 font-medium text-ink">
                {hi ? result.girl.moon.rashiHi : result.girl.moon.rashi} ·{" "}
                {hi ? result.girl.moon.nakshatraHi : result.girl.moon.nakshatra}
              </p>
            </div>
          </div>
        </ToolSection>
      ) : null}
    </div>
  );
}

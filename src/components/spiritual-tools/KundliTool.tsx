"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { defaultCity } from "@/lib/spiritual-tools/geo";
import { loadKundliEngine } from "@/lib/spiritual-tools/engine-loader";
import type { KundliChart } from "@/lib/spiritual-tools/types";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { BirthDetailsFields } from "./BirthDetailsFields";
import { PrivacyNotice, ResultGrid, ToolSection, primaryButtonClassName } from "./ToolUi";

export function KundliTool() {
  const locale = useLocale();
  const t = useMessages();
  const copy = t.spiritualTools.kundli;
  const hi = locale === "hi";
  const [name, setName] = useState("");
  const [date, setDate] = useState("1995-06-15");
  const [time, setTime] = useState("06:30");
  const [place, setPlace] = useState(defaultCity());
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState<KundliChart | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const engine = await loadKundliEngine();
      setChart(
        engine.generateKundli({
          name: name.trim() || "Devotee",
          date,
          time,
          place,
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PrivacyNotice text={t.spiritualTools.privacyNotice} />

      <ToolSection title={copy.formTitle}>
        <form onSubmit={(event) => void onSubmit(event)} className="space-y-5">
          <BirthDetailsFields
            prefix="kundli"
            name={name}
            date={date}
            time={time}
            place={place}
            onNameChange={setName}
            onDateChange={setDate}
            onTimeChange={setTime}
            onPlaceChange={setPlace}
            labels={{
              name: copy.name,
              date: copy.date,
              time: copy.time,
              place: copy.place,
              placeHint: copy.placeHint,
            }}
          />
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
      </ToolSection>

      {chart ? (
        <ToolSection title={copy.resultTitle}>
          <p className="mb-4 text-sm text-muted">
            {chart.place.name} · {date} · {time}
          </p>
          <ResultGrid
            items={[
              { label: copy.lagna, value: hi ? chart.lagna.rashiHi : chart.lagna.rashi },
              { label: copy.moonSign, value: hi ? chart.moon.rashiHi : chart.moon.rashi },
              { label: copy.sunSign, value: hi ? chart.sun.rashiHi : chart.sun.rashi },
              {
                label: copy.nakshatra,
                value: hi
                  ? `${chart.moon.nakshatraHi} · Pada ${chart.moon.pada}`
                  : `${chart.moon.nakshatra} · Pada ${chart.moon.pada}`,
              },
            ]}
          />
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">{copy.planet}</th>
                  <th className="py-2 pr-4">{copy.sign}</th>
                  <th className="py-2 pr-4">{copy.nakshatraCol}</th>
                  <th className="py-2">{copy.retrograde}</th>
                </tr>
              </thead>
              <tbody>
                {[chart.lagna, ...chart.planets].map((row) => (
                  <tr key={row.id} className="border-b border-line/60">
                    <td className="py-2.5 pr-4 font-medium text-ink">{hi ? row.nameHi : row.name}</td>
                    <td className="py-2.5 pr-4 text-ink">{hi ? row.rashiHi : row.rashi}</td>
                    <td className="py-2.5 pr-4 text-muted">
                      {hi ? row.nakshatraHi : row.nakshatra} · {row.pada}
                    </td>
                    <td className="py-2.5 text-muted">{row.retrograde ? copy.yes : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolSection>
      ) : null}
    </div>
  );
}

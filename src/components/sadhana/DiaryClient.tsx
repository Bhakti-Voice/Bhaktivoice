"use client";

import { useEffect, useMemo, useState } from "react";

type DiaryEntry = {
  mood: string;
  jaap: string;
  note: string;
};

const MOODS = ["Peaceful", "Grateful", "Restless", "Tired", "Joyful"];

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  return { first, count };
}

export function DiaryClient() {
  const now = new Date();
  const [year] = useState(now.getFullYear());
  const [month] = useState(now.getMonth());
  const [selected, setSelected] = useState(now.toISOString().slice(0, 10));
  const [entries, setEntries] = useState<Record<string, DiaryEntry>>({});
  const [draft, setDraft] = useState<DiaryEntry>({ mood: "Peaceful", jaap: "", note: "" });

  useEffect(() => {
    const raw = window.localStorage.getItem("bhakti-diary-v1");
    if (raw) {
      try {
        setEntries(JSON.parse(raw) as Record<string, DiaryEntry>);
      } catch {
        setEntries({});
      }
    }
  }, []);

  useEffect(() => {
    setDraft(entries[selected] ?? { mood: "Peaceful", jaap: "", note: "" });
  }, [entries, selected]);

  const { first, count } = monthDays(year, month);
  const blanks = Array.from({ length: first }, (_, index) => index);
  const days = Array.from({ length: count }, (_, index) => index + 1);
  const monthLabel = new Date(year, month, 1).toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const loggedDays = useMemo(() => new Set(Object.keys(entries)), [entries]);

  function save() {
    const next = { ...entries, [selected]: draft };
    setEntries(next);
    window.localStorage.setItem("bhakti-diary-v1", JSON.stringify(next));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="rounded-[32px] bg-white p-5 shadow-sm ring-1 ring-line">
        <p className="font-serif text-xl text-ink">{monthLabel}</p>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
          {blanks.map((item) => (
            <span key={`b-${item}`} />
          ))}
          {days.map((day) => {
            const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const active = selected === key;
            const has = loggedDays.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`h-9 rounded-full text-sm ${
                  active ? "bg-saffron text-white" : has ? "bg-sand text-ink" : "text-ink hover:bg-cream"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-line sm:p-8">
        <h2 className="font-serif text-2xl text-ink">Daily log · {selected}</h2>
        <label className="mt-6 block text-sm text-muted">
          Mood
          <select
            value={draft.mood}
            onChange={(event) => setDraft({ ...draft, mood: event.target.value })}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          >
            {MOODS.map((mood) => (
              <option key={mood}>{mood}</option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm text-muted">
          Naam jaap today
          <input
            value={draft.jaap}
            onChange={(event) => setDraft({ ...draft, jaap: event.target.value })}
            placeholder="108 Ram naam, one mala…"
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
        <label className="mt-4 block text-sm text-muted">
          What stayed with you
          <textarea
            value={draft.note}
            onChange={(event) => setDraft({ ...draft, note: event.target.value })}
            rows={6}
            placeholder="A line of katha, a kindness, a restlessness you offered back…"
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
        <button
          type="button"
          onClick={save}
          className="mt-6 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-white"
        >
          Save this day
        </button>
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";

export function YatraPlannerForm({ destinations }: { destinations: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [destination, setDestination] = useState(destinations[0] ?? "");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-line">
        <p className="text-xs uppercase tracking-[0.2em] text-saffron">Itinerary started</p>
        <h2 className="mt-2 font-serif text-3xl text-ink">A gentle outline for {destination}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We have saved your intention. Arrive a day early if you can, keep one major darshan at the
          centre, and leave an evening for the river or a mala. Confirm aarti and passes locally the
          week you travel.
        </p>
        <ol className="mt-6 space-y-3 text-sm text-ink">
          <li className="rounded-2xl bg-cream p-4">Day 1 — Arrive, rest, evening walk, naam.</li>
          <li className="rounded-2xl bg-cream p-4">Day 2 — Main darshan while you are fresh.</li>
          <li className="rounded-2xl bg-cream p-4">Day 3 — A companion shrine, then home without hurry.</li>
        </ol>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-line sm:p-8"
    >
      <label className="block text-sm text-muted">
        Destination
        {destinations.length ? (
          <select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          >
            {destinations.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        ) : (
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            required
            placeholder="No trips published yet — type a place"
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        )}
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-muted">
          Start date
          <input
            type="date"
            required
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
        <label className="block text-sm text-muted">
          Days
          <input
            type="number"
            min={1}
            max={14}
            defaultValue={3}
            className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm text-muted">
        Travellers
        <input
          type="number"
          min={1}
          max={20}
          defaultValue={2}
          className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
        />
      </label>
      <label className="mt-4 block text-sm text-muted">
        What matters most
        <textarea
          rows={4}
          placeholder="Darshan, rest for elders, a ghat evening, a nearby temple…"
          className="mt-1 w-full rounded-2xl border border-line bg-ivory px-4 py-3 text-ink"
        />
      </label>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-saffron py-3 text-sm font-medium text-white"
      >
        Build My Itinerary
      </button>
    </form>
  );
}

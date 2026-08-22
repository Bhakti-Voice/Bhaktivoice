"use client";

import { useMemo, useState } from "react";
import type { BirthPlace } from "@/lib/spiritual-tools/types";
import { defaultCity, filterCities } from "@/lib/spiritual-tools/geo";
import { fieldClassName } from "./ToolUi";

export function BirthDetailsFields({
  prefix,
  name,
  date,
  time,
  place,
  onNameChange,
  onDateChange,
  onTimeChange,
  onPlaceChange,
  labels,
}: {
  prefix: string;
  name: string;
  date: string;
  time: string;
  place: BirthPlace;
  onNameChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onPlaceChange: (place: BirthPlace) => void;
  labels: {
    name: string;
    date: string;
    time: string;
    place: string;
    placeHint: string;
  };
}) {
  const [query, setQuery] = useState(place.name);
  const suggestions = useMemo(() => filterCities(query), [query]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-ink">{labels.name}</span>
        <input
          id={`${prefix}-name`}
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          className={fieldClassName()}
          autoComplete="name"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">{labels.date}</span>
        <input
          id={`${prefix}-date`}
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className={fieldClassName()}
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">{labels.time}</span>
        <input
          id={`${prefix}-time`}
          type="time"
          value={time}
          onChange={(event) => onTimeChange(event.target.value)}
          className={fieldClassName()}
          required
        />
      </label>
      <div className="relative sm:col-span-2">
        <label htmlFor={`${prefix}-place`} className="mb-1.5 block text-sm font-medium text-ink">
          {labels.place}
        </label>
        <input
          id={`${prefix}-place`}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            const match = filterCities(event.target.value)[0];
            if (match && match.name.toLowerCase() === event.target.value.trim().toLowerCase()) {
              onPlaceChange(match);
            }
          }}
          placeholder={labels.placeHint}
          className={fieldClassName()}
          autoComplete="off"
          required
        />
        {suggestions.length ? (
          <ul className="absolute z-20 mt-1 max-h-44 w-full overflow-auto rounded-2xl bg-white py-1 shadow-lg ring-1 ring-line">
            {suggestions.map((city) => (
              <li key={city.name}>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-cream"
                  onClick={() => {
                    setQuery(city.name);
                    onPlaceChange(city);
                  }}
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-1.5 text-xs text-muted">
          {place.name} · {place.latitude.toFixed(2)}°, {place.longitude.toFixed(2)}° · {place.timeZone}
        </p>
      </div>
    </div>
  );
}

export function emptyBirth(prefix: "boy" | "girl") {
  return {
    name: prefix === "boy" ? "" : "",
    date: "1995-01-01",
    time: "06:00",
    place: defaultCity(),
  };
}

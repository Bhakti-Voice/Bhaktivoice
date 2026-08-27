"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Calendar, Clock, MapPin, Navigation, User } from "lucide-react";
import type { BirthPlace } from "@/lib/spiritual-tools/types";
import { defaultCity, filterCities, readDeviceLocation, type CityEntry } from "@/lib/spiritual-tools/geo";
import { useLocale } from "@/lib/i18n/client";

export function emptyBirth(prefix: "boy" | "girl"): {
  name: string;
  date: string;
  time: string;
  place: BirthPlace;
} {
  return {
    name: "",
    date: prefix === "boy" ? "1994-04-12" : "1996-08-20",
    time: "07:15",
    place: defaultCity(),
  };
}

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
  const locale = useLocale();
  const isHi = locale === "hi";

  const [query, setQuery] = useState(place.name);
  const [isOpen, setIsOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => filterCities(query), [query]);

  useEffect(() => {
    setQuery(place.name);
  }, [place.name]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectCity(city: CityEntry | BirthPlace) {
    setQuery(city.name);
    onPlaceChange(city);
    setIsOpen(false);
  }

  async function handleUseGPS() {
    setLocating(true);
    try {
      const loc = await readDeviceLocation();
      if (loc) {
        setQuery(isHi ? "मेरी वर्तमान लोकेशन" : "My Current Location");
        onPlaceChange(loc);
        setIsOpen(false);
      }
    } finally {
      setLocating(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Name Field */}
      <div className="sm:col-span-2">
        <label htmlFor={`${prefix}-name`} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-ink">
          <User className="h-3.5 w-3.5 text-saffron" />
          <span>{labels.name}</span>
        </label>
        <div className="relative">
          <input
            id={`${prefix}-name`}
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder={
              prefix === "boy"
                ? isHi ? "वर का नाम (उदा. राहुल)" : "Groom's Name (e.g. Rahul)"
                : prefix === "girl"
                ? isHi ? "कन्या का नाम (उदा. प्रिया)" : "Bride's Name (e.g. Priya)"
                : isHi ? "पूरा नाम दर्ज करें" : "Enter Full Name"
            }
            className="w-full rounded-2xl border border-line bg-sand/20 py-2.5 px-3.5 text-sm text-ink placeholder:text-muted focus:border-saffron focus:bg-white focus:outline-none focus:ring-1 focus:ring-saffron transition"
            autoComplete="name"
          />
        </div>
      </div>

      {/* Date of Birth Field */}
      <div>
        <label htmlFor={`${prefix}-date`} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-ink">
          <Calendar className="h-3.5 w-3.5 text-saffron" />
          <span>{labels.date}</span>
        </label>
        <input
          id={`${prefix}-date`}
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className="w-full rounded-2xl border border-line bg-sand/20 py-2.5 px-3.5 text-sm text-ink focus:border-saffron focus:bg-white focus:outline-none focus:ring-1 focus:ring-saffron transition"
          required
        />
      </div>

      {/* Time of Birth Field */}
      <div>
        <label htmlFor={`${prefix}-time`} className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-ink">
          <Clock className="h-3.5 w-3.5 text-saffron" />
          <span>{labels.time}</span>
        </label>
        <input
          id={`${prefix}-time`}
          type="time"
          value={time}
          onChange={(event) => onTimeChange(event.target.value)}
          className="w-full rounded-2xl border border-line bg-sand/20 py-2.5 px-3.5 text-sm text-ink focus:border-saffron focus:bg-white focus:outline-none focus:ring-1 focus:ring-saffron transition"
          required
        />
      </div>

      {/* Place of Birth Field with Pan-India Autocomplete & GPS */}
      <div ref={dropdownRef} className="relative sm:col-span-2">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={`${prefix}-place`} className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <MapPin className="h-3.5 w-3.5 text-saffron" />
            <span>{labels.place}</span>
          </label>

          <button
            type="button"
            onClick={() => void handleUseGPS()}
            disabled={locating}
            className="flex items-center gap-1 text-[11px] font-semibold text-saffron-deep hover:underline transition"
          >
            <Navigation className={`h-3 w-3 ${locating ? "animate-spin" : ""}`} />
            <span>{locating ? (isHi ? "खोज रहे हैं..." : "Locating...") : (isHi ? "GPS लोकेशन प्रयोग करें" : "Use GPS")}</span>
          </button>
        </div>

        <div className="relative">
          <input
            id={`${prefix}-place`}
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(event) => {
              const val = event.target.value;
              setQuery(val);
              setIsOpen(true);
              const match = filterCities(val)[0];
              if (match && (match.name.toLowerCase() === val.trim().toLowerCase() || match.nameHi === val.trim())) {
                onPlaceChange(match);
              }
            }}
            placeholder={isHi ? "शहर, कस्बा अथवा राज्य का नाम खोजें (उदा. वाराणसी, पटना, सूरत, लखनऊ)..." : labels.placeHint}
            className="w-full rounded-2xl border border-line bg-sand/20 py-2.5 pr-10 pl-3.5 text-sm text-ink placeholder:text-muted focus:border-saffron focus:bg-white focus:outline-none focus:ring-1 focus:ring-saffron transition"
            autoComplete="off"
            required
          />
          <MapPin className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted pointer-events-none" />
        </div>

        {/* Dropdown Suggestions (Pan-India Cities with State & Coordinates) */}
        {isOpen && (
          <div className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-2xl bg-white shadow-2xl ring-1 ring-line border border-saffron/25 scrollbar-thin">
            {suggestions.length > 0 ? (
              <ul className="divide-y divide-line/40 py-1">
                {suggestions.map((city) => (
                  <li key={`${city.name}-${city.latitude}`}>
                    <button
                      type="button"
                      onClick={() => handleSelectCity(city)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs text-ink hover:bg-cream/60 transition group"
                    >
                      <div>
                        <span className="font-bold text-ink group-hover:text-saffron-deep transition">
                          {isHi ? city.nameHi || city.name : city.name}
                        </span>
                        <span className="ml-1.5 text-[11px] text-muted">
                          ({isHi ? city.stateHi || city.state : city.state})
                        </span>
                        {city.aliases && city.aliases.length > 0 && (
                          <span className="block text-[10px] text-muted/80">
                            {city.aliases.join(", ")}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-muted bg-sand/30 px-1.5 py-0.5 rounded">
                        {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-xs text-muted">
                <p className="font-semibold text-ink">{isHi ? "कोई शहर सूची में नहीं मिला" : "City not found in preset list"}</p>
                <p className="mt-1 text-[11px]">
                  {isHi
                    ? "आप अपना शहर लिख सकते हैं, निकटतम जिला स्वतः चयनित हो जाएगा।"
                    : "You can keep typing your city name and we will use the nearest geographical coordinates."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

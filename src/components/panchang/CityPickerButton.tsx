"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { CitySelectorModal } from "./CitySelectorModal";
import type { CityConfig } from "@/lib/panchang/cities";

export interface CityPickerButtonProps {
  city: CityConfig;
  onCityChange: (city: CityConfig) => void;
  isHi?: boolean;
  isTe?: boolean;
  className?: string;
  variant?: "default" | "compact" | "pill";
}

export function CityPickerButton({
  city,
  onCityChange,
  isHi = false,
  isTe = false,
  className = "",
  variant = "default",
}: CityPickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group flex items-center justify-between gap-2.5 rounded-2xl border transition focus:outline-hidden focus:ring-2 focus:ring-saffron/30 ${
          variant === "pill"
            ? "border-saffron/30 bg-white/90 px-3.5 py-1.5 text-xs text-ink hover:border-saffron hover:bg-white shadow-xs"
            : variant === "compact"
            ? "border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-saffron shadow-xs"
            : "border-line bg-white/95 px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:border-saffron hover:bg-white shadow-xs"
        } ${className}`}
        title={isTe ? "ప్రాంతాన్ని మార్చండి (100,000+ నగరాలు & పుణ్యక్షేత్రాలు)" : isHi ? "स्थान बदलें (100,000+ नगर व तीर्थ)" : "Change location (100,000+ cities & temples)"}
      >
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-saffron/15 text-saffron group-hover:bg-saffron group-hover:text-white transition">
            <MapPin className="h-3.5 w-3.5" />
          </div>
          <div className="truncate">
            <span className="font-bold text-ink truncate block">
              {isHi ? city.nameHi : city.name}
            </span>
            {variant !== "pill" && (
              <span className="text-[10px] text-muted truncate block">
                {isHi ? city.stateHi : city.state}
                {city.country && city.country !== "India" ? `, ${isHi ? city.countryHi || city.country : city.country}` : ""}
              </span>
            )}
          </div>
        </div>

        <ChevronDown className="h-3.5 w-3.5 text-muted group-hover:text-saffron transition shrink-0 ml-1" />
      </button>

      <CitySelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedCity={city}
        onSelectCity={onCityChange}
        isHi={isHi}
        isTe={isTe}
      />
    </>
  );
}

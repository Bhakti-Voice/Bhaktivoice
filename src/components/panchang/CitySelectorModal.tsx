"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  MapPin,
  Search,
  Navigation,
  Sliders,
  X,
  Check,
  Globe,
  Loader2,
  History,
} from "lucide-react";
import {
  CITIES,
  POPULAR_CITIES,
  createCustomCity,
  createGpsCity,
  searchCities,
  type CityConfig,
} from "@/lib/panchang/cities";

const COMMON_TIMEZONES = [
  { value: "Asia/Kolkata", label: "India Standard Time (IST, UTC+05:30)" },
  { value: "Asia/Kathmandu", label: "Nepal Time (NPT, UTC+05:45)" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST, UTC+04:00 - UAE, Oman)" },
  { value: "Asia/Singapore", label: "Singapore / Malaysia (SGT, UTC+08:00)" },
  { value: "Europe/London", label: "London / UK (GMT/BST)" },
  { value: "Europe/Berlin", label: "Central European Time (CET/CEST - Germany, France)" },
  { value: "America/New_York", label: "US Eastern (ET - NY, NJ, Atlanta, Toronto)" },
  { value: "America/Chicago", label: "US Central (CT - Chicago, Dallas, Houston)" },
  { value: "America/Denver", label: "US Mountain (MT - Denver, Phoenix, Calgary)" },
  { value: "America/Los_Angeles", label: "US Pacific (PT - Bay Area, LA, Seattle)" },
  { value: "Australia/Sydney", label: "Australia Eastern (AEST/AEDT - Sydney, Melbourne)" },
  { value: "Australia/Perth", label: "Australia Western (AWST - Perth)" },
  { value: "Pacific/Auckland", label: "New Zealand (NZST/NZDT - Auckland)" },
  { value: "Indian/Mauritius", label: "Mauritius (MUT, UTC+04:00)" },
  { value: "Pacific/Fiji", label: "Fiji (FJT, UTC+12:00)" },
];

const RECENT_STORAGE_KEY = "bhakti_recent_cities";

export interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: CityConfig) => void;
  selectedCity: CityConfig;
  isHi?: boolean;
}

export function CitySelectorModal({
  isOpen,
  onClose,
  onSelectCity,
  selectedCity,
  isHi = false,
}: CitySelectorModalProps) {
  const [activeTab, setActiveTab] = useState<"search" | "custom">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CityConfig[]>(() => CITIES.slice(0, 25));
  const [recentCities, setRecentCities] = useState<CityConfig[]>([]);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Custom Form State
  const [customName, setCustomName] = useState("");
  const [customLat, setCustomLat] = useState("");
  const [customLon, setCustomLon] = useState("");
  const [customElevation, setCustomElevation] = useState("0");
  const [customTz, setCustomTz] = useState("Asia/Kolkata");
  const [customError, setCustomError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dialogTitleId = useId();
  const searchInputId = useId();
  const customNameId = useId();
  const customLatId = useId();
  const customLonId = useId();
  const customElevId = useId();
  const customTzId = useId();

  // Load recent cities from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      if (stored) {
        const parsed: CityConfig[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentCities(parsed.slice(0, 5));
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
      setGpsError(null);
      setCustomError(null);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live search handler with API fallback for 100,000+ cities
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults(CITIES.slice(0, 25));
      setIsLoading(false);
      return;
    }

    // Instant local matches
    const local = searchCities(q, 15);
    setSearchResults(local);

    if (q.length < 2) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/panchang/cities?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.cities) && data.cities.length > 0) {
            setSearchResults(data.cities);
          }
        }
      } catch {
        // Keep local matches
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  function saveToRecent(city: CityConfig) {
    try {
      const updated = [city, ...recentCities.filter((c) => c.id !== city.id)].slice(0, 5);
      setRecentCities(updated);
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }

  function handleSelect(city: CityConfig) {
    saveToRecent(city);
    onSelectCity(city);
    onClose();
  }

  // 1-Click GPS Location Detector
  function handleDetectGps() {
    if (!navigator.geolocation) {
      setGpsError(
        isHi
          ? "आपका ब्राउज़र जीपीएस लोकेशन का समर्थन नहीं करता है।"
          : "Geolocation is not supported by your browser."
      );
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const alt = pos.coords.altitude || 0;
        const tz =
          typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "Asia/Kolkata";

        const gpsCity = createGpsCity({
          latitude: lat,
          longitude: lon,
          elevationMeters: Math.round(alt),
          timeZone: tz,
          label: `GPS (${lat.toFixed(3)}°, ${lon.toFixed(3)}°)`,
          labelHi: `जीपीएस स्थान (${lat.toFixed(3)}°, ${lon.toFixed(3)}°)`,
        });

        setGpsLoading(false);
        handleSelect(gpsCity);
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(
          err.code === 1
            ? isHi
              ? "स्थान अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।"
              : "Location permission denied. Please allow access in browser."
            : isHi
            ? "स्थान प्राप्त करने में असमर्थ। कृपया पुनः प्रयास करें।"
            : "Unable to retrieve your location. Please try again."
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  // Submit custom coordinates form
  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCustomError(null);

    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);
    const elev = parseFloat(customElevation) || 0;

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setCustomError(isHi ? "मान्य अक्षांश (-90 से +90) दर्ज करें।" : "Enter valid latitude (-90 to +90).");
      return;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      setCustomError(isHi ? "मान्य देशांतर (-180 से +180) दर्ज करें।" : "Enter valid longitude (-180 to +180).");
      return;
    }

    const name = customName.trim() || `Custom (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;
    const newCity = createCustomCity({
      name,
      nameHi: name,
      latitude: lat,
      longitude: lon,
      elevationMeters: Math.round(elev),
      timeZone: customTz,
    });

    handleSelect(newCity);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-saffron/30 bg-cream shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line/80 bg-gradient-to-r from-ivory to-cream px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron/15 text-saffron">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 id={dialogTitleId} className="text-base sm:text-lg font-bold text-ink">
                {isHi ? "स्थान चुनें (100,000+ विश्व नगर व तीर्थ)" : "Select Location (100,000+ Global Cities & Tirthas)"}
              </h2>
              <p className="text-xs text-muted">
                {isHi
                  ? "सटीक सूर्योदय, सूर्यास्त व पंचांग हेतु स्थान खोजें या जीपीएस उपयोग करें"
                  : "Search any city worldwide, use GPS, or enter custom coordinates"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isHi ? "बंद करें" : "Close"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 hover:text-ink transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-line/60 bg-ivory/50 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === "search"
                ? "border-saffron text-saffron"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <Search className="h-4 w-4" />
            {isHi ? "शहर / तीर्थ खोजें" : "Search Cities & Tirthas"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("custom")}
            className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${
              activeTab === "custom"
                ? "border-saffron text-saffron"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <Sliders className="h-4 w-4" />
            {isHi ? "कस्टम अक्षांश / देशांतर" : "Custom Coordinates"}
          </button>
        </div>

        {/* Body Content */}
        {activeTab === "search" ? (
          <div className="flex flex-1 flex-col overflow-hidden p-4 sm:p-5 space-y-4">
            {/* Search Input & GPS Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                <input
                  ref={inputRef}
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isHi
                      ? "शहर, जिला, तीर्थ का नाम लिखें (उदा. वाराणसी, Edison, Udupi)..."
                      : "Search any city, town, or temple (e.g. Varanasi, Edison, Udupi)..."
                  }
                  className="w-full rounded-2xl border border-line bg-white pl-10 pr-9 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-saffron focus:outline-hidden focus:ring-2 focus:ring-saffron/20 transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* GPS Button */}
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={gpsLoading}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-saffron/40 bg-saffron/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-saffron hover:bg-saffron hover:text-white transition shrink-0 disabled:opacity-50"
              >
                {gpsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>{isHi ? "मेरा स्थान (GPS)" : "Detect GPS"}</span>
              </button>
            </div>

            {/* GPS Error Message */}
            {gpsError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
                {gpsError}
              </div>
            )}

            {/* Popular Quick Chips (when no query entered) */}
            {!searchQuery && (
              <div>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  {isHi ? "प्रमुख तीर्थ एवं लोकप्रिय नगर:" : "Popular Tirthas & Metros:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelect(c)}
                      className={`rounded-xl px-2.5 py-1 text-xs font-medium border transition ${
                        selectedCity.id === c.id
                          ? "border-saffron bg-saffron/15 text-saffron font-bold"
                          : "border-line bg-white text-ink hover:border-saffron hover:bg-saffron/5"
                      }`}
                    >
                      {isHi ? c.nameHi : c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Cities (if any) */}
            {!searchQuery && recentCities.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <History className="h-3 w-3" />
                  {isHi ? "हाल ही में देखे गए स्थान:" : "Recently Selected:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recentCities.map((c) => (
                    <button
                      key={`recent-${c.id}`}
                      type="button"
                      onClick={() => handleSelect(c)}
                      className="rounded-xl px-2.5 py-1 text-xs font-medium border border-line/80 bg-white text-muted hover:border-saffron hover:text-ink transition"
                    >
                      {isHi ? c.nameHi : c.name} ({c.state})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cities Search Results List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-[220px] max-h-[360px]">
              {isLoading && (
                <div className="flex items-center justify-center py-6 text-xs text-muted gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-saffron" />
                  <span>{isHi ? "वैश्विक डेटाबेस में खोज रहे हैं..." : "Searching 100,000+ global locations..."}</span>
                </div>
              )}

              {!isLoading && searchResults.length === 0 ? (
                <div className="text-center py-10 text-muted">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-muted/50" />
                  <p className="text-xs sm:text-sm font-medium">
                    {isHi ? "कोई स्थान नहीं मिला।" : "No locations found."}
                  </p>
                  <p className="text-xs text-muted/80 mt-1">
                    {isHi
                      ? "आप 'कस्टम अक्षांश / देशांतर' टैब में जाकर सीधे निर्देशांक दर्ज कर सकते हैं।"
                      : "You can enter exact coordinates in the 'Custom Coordinates' tab."}
                  </p>
                </div>
              ) : (
                searchResults.map((city) => {
                  const isCurrent = selectedCity.id === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelect(city)}
                      className={`w-full flex items-center justify-between rounded-2xl p-3 text-left border transition ${
                        isCurrent
                          ? "border-saffron bg-saffron/10 text-ink"
                          : "border-line/70 bg-white hover:border-saffron/60 hover:bg-saffron/5"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          className={`h-4 w-4 mt-0.5 shrink-0 ${
                            isCurrent ? "text-saffron" : "text-muted"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-bold text-ink">
                              {isHi ? city.nameHi : city.name}
                            </span>
                            {city.nameHi !== city.name && (
                              <span className="text-xs text-muted">
                                ({isHi ? city.name : city.nameHi})
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted mt-0.5">
                            {city.district ? `${city.district}, ` : ""}
                            {isHi ? city.stateHi : city.state}
                            {city.country && city.country !== "India" ? `, ${isHi ? city.countryHi || city.country : city.country}` : ""}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-right">
                        <div className="hidden sm:block text-[11px] text-muted">
                          <div>
                            {Math.abs(city.latitude).toFixed(2)}°{city.latitude >= 0 ? "N" : "S"},{" "}
                            {Math.abs(city.longitude).toFixed(2)}°{city.longitude >= 0 ? "E" : "W"}
                          </div>
                          <div className="text-[10px] text-muted/80 font-mono">
                            {city.timeZone.split("/").pop()}
                          </div>
                        </div>
                        {isCurrent && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-white">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* Custom Coordinates Form */
          <form onSubmit={handleCustomSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
            {customError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                {customError}
              </div>
            )}

            <div>
              <label htmlFor={customNameId} className="block text-xs font-semibold text-ink mb-1">
                {isHi ? "स्थान का नाम (वैकल्पिक)" : "Location Name (Optional)"}
              </label>
              <input
                id={customNameId}
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={isHi ? "उदा. मेरा घर, आश्रम, गाँव" : "e.g. Home, My Ashram, Hometown"}
                className="w-full rounded-2xl border border-line bg-white px-3.5 py-2 text-sm text-ink focus:border-saffron focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={customLatId} className="block text-xs font-semibold text-ink mb-1">
                  {isHi ? "अक्षांश (Latitude: -90.00 to +90.00)" : "Latitude (-90.00 to +90.00) *"}
                </label>
                <input
                  id={customLatId}
                  type="number"
                  step="any"
                  required
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  placeholder="28.6139"
                  className="w-full rounded-2xl border border-line bg-white px-3.5 py-2 text-sm text-ink focus:border-saffron focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor={customLonId} className="block text-xs font-semibold text-ink mb-1">
                  {isHi ? "देशांतर (Longitude: -180.00 to +180.00)" : "Longitude (-180.00 to +180.00) *"}
                </label>
                <input
                  id={customLonId}
                  type="number"
                  step="any"
                  required
                  value={customLon}
                  onChange={(e) => setCustomLon(e.target.value)}
                  placeholder="77.2090"
                  className="w-full rounded-2xl border border-line bg-white px-3.5 py-2 text-sm text-ink focus:border-saffron focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={customElevId} className="block text-xs font-semibold text-ink mb-1">
                  {isHi ? "समुद्र तल से ऊंचाई (मीटर)" : "Elevation (Meters)"}
                </label>
                <input
                  id={customElevId}
                  type="number"
                  value={customElevation}
                  onChange={(e) => setCustomElevation(e.target.value)}
                  placeholder="200"
                  className="w-full rounded-2xl border border-line bg-white px-3.5 py-2 text-sm text-ink focus:border-saffron focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor={customTzId} className="block text-xs font-semibold text-ink mb-1">
                  {isHi ? "समय क्षेत्र (Timezone) *" : "Timezone (IANA) *"}
                </label>
                <select
                  id={customTzId}
                  value={customTz}
                  onChange={(e) => setCustomTz(e.target.value)}
                  className="w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-saffron focus:outline-hidden"
                >
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("search")}
                className="rounded-2xl border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
              >
                {isHi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-saffron px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-saffron/90 transition"
              >
                {isHi ? "पंचांग गणना करें" : "Apply & Calculate Panchang"}
              </button>
            </div>
          </form>
        )}

        {/* Footer info bar */}
        <div className="border-t border-line/80 bg-ivory/80 px-5 py-2.5 text-[11px] text-muted flex items-center justify-between">
          <span>
            {isHi ? "वर्तमान चयनित स्थान:" : "Current Location:"}{" "}
            <strong className="text-ink">{isHi ? selectedCity.nameHi : selectedCity.name}</strong> (
            {selectedCity.timeZone})
          </span>
          <span className="hidden sm:inline text-saffron font-medium">
            {isHi ? "100% सटीक वैदिक गणित" : "100% Accurate Vedic Astronomy"}
          </span>
        </div>
      </div>
    </div>
  );
}

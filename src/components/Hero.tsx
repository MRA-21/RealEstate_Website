import { ChevronDown, Search, MapPin, Home, Banknote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  LOCATIONS,
  PROPERTY_TYPES,
  PRICE_RANGES,
  type LocationOption,
  type PropertyTypeOption,
  type PriceRangeOption,
} from "@/lib/types";
import { HERO_IMAGE } from "@/lib/data";

interface SearchFilters {
  location: LocationOption | "Any";
  propertyType: PropertyTypeOption | "Any";
  priceRange: PriceRangeOption | "Any";
}

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

export function Hero({ onSearch, onReset }: HeroProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "Any",
    propertyType: "Any",
    priceRange: "Any",
  });

  return (
    <section id="top" className="relative">
      <div className="relative min-h-[88vh] sm:min-h-[92vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Lagos skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b]/80 via-[#064e3b]/40 to-[#064e3b]/85" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 sm:pb-40 pt-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fdfbf7]/15 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-[#fdfbf7] border border-[#fdfbf7]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Luxury short-lets across Lagos
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fdfbf7] leading-[1.05] tracking-tight">
              Find Premium Short-Lets &amp; Apartments in Lagos.
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-[#fdfbf7]/85 leading-relaxed">
              Handpicked residences in Lekki, Ikoyi, and Victoria Island —
              solar-powered, security-staffed, and ready to book in minutes.
            </p>
          </div>
        </div>
      </div>

      <SearchBanner
        filters={filters}
        setFilters={setFilters}
        onSearch={onSearch}
        onReset={onReset}
      />
    </section>
  );
}

interface SearchBannerProps {
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  onSearch: (f: SearchFilters) => void;
  onReset: () => void;
}

function SearchBanner({
  filters,
  setFilters,
  onSearch,
  onReset,
}: SearchBannerProps) {
  return (
    <div className="sticky top-16 sm:top-20 z-30 -mt-20 sm:-mt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#fdfbf7] shadow-xl ring-1 ring-[#064e3b]/10 p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <FilterDropdown
              icon={<MapPin className="h-4 w-4 text-[#064e3b]" />}
              label="Location"
              value={filters.location}
              options={["Any", ...LOCATIONS]}
              onChange={(v) =>
                setFilters({ ...filters, location: v as LocationOption | "Any" })
              }
            />
            <FilterDropdown
              icon={<Home className="h-4 w-4 text-[#064e3b]" />}
              label="Property Type"
              value={filters.propertyType}
              options={["Any", ...PROPERTY_TYPES]}
              onChange={(v) =>
                setFilters({
                  ...filters,
                  propertyType: v as PropertyTypeOption | "Any",
                })
              }
            />
            <FilterDropdown
              icon={<Banknote className="h-4 w-4 text-[#064e3b]" />}
              label="Price Range"
              value={filters.priceRange}
              options={["Any", ...PRICE_RANGES]}
              onChange={(v) =>
                setFilters({
                  ...filters,
                  priceRange: v as PriceRangeOption | "Any",
                })
              }
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onSearch(filters)}
              className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-[#064e3b] px-8 py-3 text-sm font-semibold text-[#fdfbf7] transition-all hover:bg-[#0a5f48] hover:shadow-lg active:scale-95"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              onClick={onReset}
              className="text-sm font-medium text-[#064e3b]/70 hover:text-[#064e3b] transition-colors px-3 py-3"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

function FilterDropdown({
  icon,
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-semibold uppercase tracking-wide text-[#064e3b]/60 mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-[#064e3b]/15 bg-white px-4 py-3 text-sm font-medium text-[#1f2937] transition-all hover:border-[#064e3b]/40 focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20"
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{value}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#064e3b]/50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-40 mt-1.5 w-full rounded-xl border border-[#064e3b]/10 bg-white shadow-lg py-1.5 max-h-60 overflow-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                opt === value
                  ? "bg-[#064e3b]/8 text-[#064e3b] font-semibold"
                  : "text-[#1f2937] hover:bg-[#064e3b]/5"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

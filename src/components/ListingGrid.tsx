import { SearchX } from "lucide-react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

interface ListingGridProps {
  properties: Property[];
  totalCount: number;
  isFiltered: boolean;
  onSelect: (p: Property) => void;
  onReset: () => void;
}

export function ListingGrid({
  properties,
  totalCount,
  isFiltered,
  onSelect,
  onReset,
}: ListingGridProps) {
  return (
    <section id="explore" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#064e3b] tracking-tight">
            Available Residences
          </h2>
          <p className="mt-1.5 text-sm text-[#1f2937]/60">
            {isFiltered
              ? `Showing ${properties.length} of ${totalCount} properties`
              : `${totalCount} curated luxury listings`}
          </p>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="self-start text-sm font-medium text-[#064e3b] underline underline-offset-4 hover:text-[#0a5f48]"
          >
            Clear filters
          </button>
        )}
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#064e3b]/20 py-20 text-center">
          <SearchX className="h-12 w-12 text-[#064e3b]/30" />
          <h3 className="mt-4 text-lg font-semibold text-[#1f2937]">
            No properties match your filters
          </h3>
          <p className="mt-1 text-sm text-[#1f2937]/60 max-w-sm">
            Try broadening your search — adjust the location, property type, or
            price range.
          </p>
          <button
            onClick={onReset}
            className="mt-5 rounded-full bg-[#064e3b] px-6 py-2.5 text-sm font-semibold text-[#fdfbf7] hover:bg-[#0a5f48] transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

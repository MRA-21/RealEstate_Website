import { useState, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ListingGrid } from "@/components/ListingGrid";
import { BookingModal } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";
import { PROPERTIES } from "@/lib/data";
import {
  priceRangeMatches,
  type Property,
  type LocationOption,
  type PropertyTypeOption,
  type PriceRangeOption,
} from "@/lib/types";

interface ActiveFilters {
  location: LocationOption | "Any";
  propertyType: PropertyTypeOption | "Any";
  priceRange: PriceRangeOption | "Any";
}

const DEFAULT_FILTERS: ActiveFilters = {
  location: "Any",
  propertyType: "Any",
  priceRange: "Any",
};

function App() {
  const [filters, setFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (filters.location !== "Any" && p.location !== filters.location)
        return false;
      if (filters.propertyType !== "Any" && p.type !== filters.propertyType)
        return false;
      if (!priceRangeMatches(p.pricePerNight, filters.priceRange)) return false;
      return true;
    });
  }, [filters]);

  const isFiltered =
    filters.location !== "Any" ||
    filters.propertyType !== "Any" ||
    filters.priceRange !== "Any";

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Header />
      <main>
        <Hero onSearch={setFilters} onReset={handleReset} />
        <ListingGrid
          properties={filteredProperties}
          totalCount={PROPERTIES.length}
          isFiltered={isFiltered}
          onSelect={setSelected}
          onReset={handleReset}
        />
      </main>
      <Footer />

      {selected && (
        <BookingModal
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;

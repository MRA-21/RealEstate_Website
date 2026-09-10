export type LocationOption =
  | "Lekki Phase 1"
  | "Ikoyi"
  | "Victoria Island"
  | "Ikeja GRA";

export type PropertyTypeOption =
  | "1-Bed Studio"
  | "2-Bed Apartment"
  | "4-Bed Penthouse";

export type PriceRangeOption =
  | "Under ₦100k/night"
  | "₦100k - ₦250k/night"
  | "Above ₦250k/night";

export interface Amenity {
  label: string;
  icon: string;
}

export interface Property {
  id: string;
  title: string;
  location: LocationOption;
  type: PropertyTypeOption;
  pricePerNight: number;
  image: string;
  gallery: string[];
  amenities: Amenity[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  bookedDates: string[]; // ISO yyyy-mm-dd
}

export interface BookingForm {
  fullName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export const LOCATIONS: LocationOption[] = [
  "Lekki Phase 1",
  "Ikoyi",
  "Victoria Island",
  "Ikeja GRA",
];

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  "1-Bed Studio",
  "2-Bed Apartment",
  "4-Bed Penthouse",
];

export const PRICE_RANGES: PriceRangeOption[] = [
  "Under ₦100k/night",
  "₦100k - ₦250k/night",
  "Above ₦250k/night",
];

export function priceRangeMatches(
  price: number,
  range: PriceRangeOption | "Any"
): boolean {
  if (range === "Any") return true;
  if (range === "Under ₦100k/night") return price < 100_000;
  if (range === "₦100k - ₦250k/night") return price >= 100_000 && price <= 250_000;
  if (range === "Above ₦250k/night") return price > 250_000;
  return true;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

import type { Property } from "./types";

export const AGENT_PHONE = "+2348012345678";

export const PROPERTIES: Property[] = [
  {
    id: "obsidian",
    title: "The Obsidian 1-Bed Studio",
    location: "Lekki Phase 1",
    type: "1-Bed Studio",
    pricePerNight: 85_000,
    image:
      "https://images.pexels.com/photos/6444968/pexels-photo-6444968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/6444968/pexels-photo-6444968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/6758516/pexels-photo-6758516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    amenities: [
      { label: "24/7 Solar Power", icon: "Sun" },
      { label: "Fitted Kitchen", icon: "ChefHat" },
      { label: "Uniformed Security", icon: "ShieldCheck" },
      { label: "Fast WiFi", icon: "Wifi" },
    ],
    description:
      "A meticulously designed studio in the heart of Lekki Phase 1, blending dark stone finishes with warm ambient lighting. Perfect for the discerning solo traveller or couple seeking a refined short-let experience.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    bookedDates: [
      nextDateOffset(3),
      nextDateOffset(4),
      nextDateOffset(5),
      nextDateOffset(12),
    ],
  },
  {
    id: "zenith",
    title: "Zenith 2-Bedroom Serviced Apartment",
    location: "Victoria Island",
    type: "2-Bed Apartment",
    pricePerNight: 150_000,
    image:
      "https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8135496/pexels-photo-8135496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    amenities: [
      { label: "24/7 Solar Power", icon: "Sun" },
      { label: "Swimming Pool", icon: "Waves" },
      { label: "Uniformed Security", icon: "ShieldCheck" },
      { label: "Fitted Kitchen", icon: "ChefHat" },
    ],
    description:
      "An expansive two-bedroom serviced apartment on Victoria Island, featuring floor-to-ceiling windows, designer furnishings, and a private pool. Daily housekeeping and concierge service included.",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    bookedDates: [
      nextDateOffset(7),
      nextDateOffset(8),
      nextDateOffset(15),
      nextDateOffset(16),
      nextDateOffset(17),
    ],
  },
  {
    id: "lagoon",
    title: "Lagoon View 4-Bed Penthouse",
    location: "Ikoyi",
    type: "4-Bed Penthouse",
    pricePerNight: 320_000,
    image:
      "https://images.pexels.com/photos/36362/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/36362/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8135496/pexels-photo-8135496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
    amenities: [
      { label: "Swimming Pool", icon: "Waves" },
      { label: "Uniformed Security", icon: "ShieldCheck" },
      { label: "24/7 Solar Power", icon: "Sun" },
      { label: "Fitted Kitchen", icon: "ChefHat" },
    ],
    description:
      "A crown jewel above the Ikoyi lagoon — four sumptuous bedrooms, a rooftop infinity pool, and panoramic water views. The ultimate address for executives, dignitaries, and celebratory stays.",
    bedrooms: 4,
    bathrooms: 5,
    maxGuests: 8,
    bookedDates: [
      nextDateOffset(2),
      nextDateOffset(9),
      nextDateOffset(10),
      nextDateOffset(11),
      nextDateOffset(20),
    ],
  },
];

function nextDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const HERO_IMAGE =
  "https://images.pexels.com/photos/38513712/pexels-photo-38513712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

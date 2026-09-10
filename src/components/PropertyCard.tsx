import { Star, ChevronRight, MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatNaira } from "@/lib/types";
import { AmenityIcon } from "./AmenityIcon";

interface PropertyCardProps {
  property: Property;
  onSelect: (p: Property) => void;
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <article
      onClick={() => onSelect(property)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white ring-1 ring-[#064e3b]/8 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-[#064e3b]/20 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#fdfbf7]/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-[#064e3b]">
          <Star className="h-3 w-3 fill-[#064e3b]" />
          Premium
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-[#064e3b]/90 backdrop-blur-sm px-3 py-1.5 text-right">
          <div className="text-sm font-bold text-[#fdfbf7]">
            {formatNaira(property.pricePerNight)}
          </div>
          <div className="text-[10px] text-[#fdfbf7]/70">per night</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#064e3b]/70">
          <MapPin className="h-3.5 w-3.5" />
          {property.location}
          <span className="mx-1 text-[#064e3b]/30">·</span>
          {property.type}
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[#1f2937] group-hover:text-[#064e3b] transition-colors">
          {property.title}
        </h3>
        <p className="mt-2 text-sm text-[#1f2937]/70 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((a) => (
            <span
              key={a.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#064e3b]/6 px-2.5 py-1 text-xs font-medium text-[#064e3b]"
            >
              <AmenityIcon name={a.icon} className="h-3.5 w-3.5" />
              {a.label}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-[#064e3b]/6 px-2.5 py-1 text-xs font-medium text-[#064e3b]">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#064e3b]/8 pt-4">
          <div className="text-sm text-[#1f2937]/60">
            Up to {property.maxGuests} guests · {property.bedrooms} bed
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#064e3b]">
            View &amp; Book
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

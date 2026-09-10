import { useState, useEffect, useMemo } from "react";
import {
  X,
  MapPin,
  BedDouble,
  Bath,
  Users,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import type { Property } from "@/lib/types";
import { formatNaira } from "@/lib/types";
import { AmenityIcon } from "./AmenityIcon";
import { BookingCalendar } from "./BookingCalendar";

interface BookingModalProps {
  property: Property;
  onClose: () => void;
}

export function BookingModal({ property, onClose }: BookingModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const ci = new Date(form.checkIn);
    const co = new Date(form.checkOut);
    return Math.max(0, Math.round((co.getTime() - ci.getTime()) / 86_400_000));
  }, [form.checkIn, form.checkOut]);

  const totalCost = nights * property.pricePerNight;

  function buildWhatsAppLink(): string {
    const phone = "2348012345678";
    const lines = [
      `*New Booking Request — LekkiHaven*`,
      ``,
      `*Property:* ${property.title}`,
      `*Location:* ${property.location}`,
      ``,
      `*Guest Name:* ${form.fullName || "—"}`,
      `*Check-in:* ${form.checkIn || "—"}`,
      `*Check-out:* ${form.checkOut || "—"}`,
      `*Nights:* ${nights}`,
      `*Guests:* ${form.guests}`,
      ``,
      `*Total:* ${formatNaira(totalCost)} (${nights} × ${formatNaira(
        property.pricePerNight
      )})`,
      ``,
      `Please confirm availability. Thank you!`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${phone}?text=${message}`;
  }

  function handleBook() {
    if (!form.fullName.trim()) return setError("Please enter your full name.");
    if (!form.checkIn) return setError("Please select a check-in date.");
    if (!form.checkOut) return setError("Please select a check-out date.");
    if (nights < 1) return setError("Check-out must be after check-in.");
    if (form.guests > property.maxGuests)
      return setError(`This property accommodates up to ${property.maxGuests} guests.`);
    setError("");
    window.open(buildWhatsAppLink(), "_blank");
  }

  const gallery = property.gallery.length ? property.gallery : [property.image];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full sm:max-w-4xl sm:my-6 bg-[#fdfbf7] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] animate-[slideUp_0.3s_ease]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#064e3b]/10 bg-[#fdfbf7] sticky top-0 z-10">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-[#064e3b] truncate">
              {property.title}
            </h3>
            <p className="text-xs text-[#1f2937]/60 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {property.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#064e3b] hover:bg-[#064e3b]/8 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
          {/* Gallery */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#064e3b]/5">
            <img
              src={gallery[activeImg]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfbf7]/90 text-[#064e3b] hover:bg-white transition-colors shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfbf7]/90 text-[#064e3b] hover:bg-white transition-colors shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeImg ? "w-6 bg-[#fdfbf7]" : "w-1.5 bg-[#fdfbf7]/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <Stat icon={<BedDouble className="h-4 w-4" />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={<Users className="h-4 w-4" />} label="Max Guests" value={property.maxGuests} />
          </div>

          <p className="text-sm text-[#1f2937]/80 leading-relaxed">
            {property.description}
          </p>

          {/* Amenities */}
          <div>
            <h4 className="text-sm font-semibold text-[#064e3b] mb-3">
              Amenities &amp; Features
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {property.amenities.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-2.5 rounded-xl bg-[#064e3b]/5 px-3.5 py-3"
                >
                  <AmenityIcon name={a.icon} className="h-5 w-5 text-[#064e3b]" />
                  <span className="text-sm font-medium text-[#1f2937]">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking calendar */}
          <div>
            <h4 className="text-sm font-semibold text-[#064e3b] mb-3 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              Select Your Dates
            </h4>
            <BookingCalendar
              bookedDates={property.bookedDates}
              checkIn={form.checkIn}
              checkOut={form.checkOut}
              onCheckIn={(d) => setForm((f) => ({ ...f, checkIn: d }))}
              onCheckOut={(d) => setForm((f) => ({ ...f, checkOut: d }))}
            />
          </div>

          {/* Booking form */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#064e3b]">Your Details</h4>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-[#064e3b]/60 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                placeholder="e.g. Adaeze Okonkwo"
                className="w-full rounded-xl border border-[#064e3b]/15 bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#1f2937]/40 focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 focus:border-[#064e3b]/40 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#064e3b]/60 mb-1.5">
                  Check-in
                </label>
                <input
                  type="date"
                  value={form.checkIn}
                  onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                  className="w-full rounded-xl border border-[#064e3b]/15 bg-white px-3 py-3 text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#064e3b]/60 mb-1.5">
                  Check-out
                </label>
                <input
                  type="date"
                  value={form.checkOut}
                  onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                  className="w-full rounded-xl border border-[#064e3b]/15 bg-white px-3 py-3 text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-[#064e3b]/60 mb-1.5">
                Total Guests
              </label>
              <select
                value={form.guests}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guests: Number(e.target.value) }))
                }
                className="w-full rounded-xl border border-[#064e3b]/15 bg-white px-4 py-3 text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
              >
                {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Cost summary */}
          <div className="rounded-2xl bg-[#064e3b] p-5 text-[#fdfbf7]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#fdfbf7]/75">Rate</span>
              <span>{formatNaira(property.pricePerNight)} / night</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-[#fdfbf7]/75">Nights</span>
              <span>{nights || "—"}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#fdfbf7]/20 flex items-center justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-xl font-bold">
                {nights ? formatNaira(totalCost) : formatNaira(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="border-t border-[#064e3b]/10 bg-[#fdfbf7] px-4 sm:px-6 py-4 sticky bottom-0">
          <button
            onClick={handleBook}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-[#20bd5a] hover:shadow-lg active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Book via WhatsApp
          </button>
          <p className="mt-2 text-center text-xs text-[#1f2937]/50">
            Opens WhatsApp with your booking details pre-filled
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-[#064e3b]/5 px-3 py-3 text-center">
      <div className="inline-flex items-center justify-center text-[#064e3b]">
        {icon}
      </div>
      <div className="mt-1 text-base font-bold text-[#1f2937]">{value}</div>
      <div className="text-[11px] text-[#1f2937]/55">{label}</div>
    </div>
  );
}

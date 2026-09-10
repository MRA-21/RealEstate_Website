import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  bookedDates: string[];
  checkIn: string;
  checkOut: string;
  onCheckIn: (d: string) => void;
  onCheckOut: (d: string) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function BookingCalendar({
  bookedDates,
  checkIn,
  checkOut,
  onCheckIn,
  onCheckOut,
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const bookedSet = new Set(bookedDates);
  const ci = checkIn ? fromISO(checkIn) : null;
  const co = checkOut ? fromISO(checkOut) : null;

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function dayState(d: Date): string {
    const iso = toISO(d);
    const isPast = d < today;
    const isBooked = bookedSet.has(iso);
    const isCheckIn = ci && toISO(ci) === iso;
    const isCheckOut = co && toISO(co) === iso;
    const inRange = ci && co && d > ci && d < co;

    if (isCheckIn) return "checkin";
    if (isCheckOut) return "checkout";
    if (inRange) return "range";
    if (isBooked || isPast) return "disabled";
    return "available";
  }

  function handleDayClick(d: Date) {
    const iso = toISO(d);
    const state = dayState(d);
    if (state === "disabled") return;

    if (!checkIn || (checkIn && checkOut)) {
      onCheckIn(iso);
      onCheckOut("");
      return;
    }
    const ciDate = fromISO(checkIn);
    if (d <= ciDate) {
      onCheckIn(iso);
      onCheckOut("");
      return;
    }
    // ensure no booked dates in range
    let cursor = new Date(ciDate);
    cursor.setDate(cursor.getDate() + 1);
    while (cursor < d) {
      if (bookedSet.has(toISO(cursor))) {
        onCheckIn(iso);
        onCheckOut("");
        return;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    onCheckOut(iso);
  }

  return (
    <div className="rounded-2xl border border-[#064e3b]/12 bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#064e3b] hover:bg-[#064e3b]/8 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h4 className="text-base font-semibold text-[#064e3b]">
          {MONTHS[viewMonth]} {viewYear}
        </h4>
        <button
          onClick={nextMonth}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#064e3b] hover:bg-[#064e3b]/8 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {DOW.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-[#064e3b]/50">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />;
          const state = dayState(d);
          const base =
            "relative flex h-9 sm:h-10 items-center justify-center rounded-lg text-sm transition-all";
          let cls = "";
          if (state === "available")
            cls = "text-[#1f2937] hover:bg-[#064e3b]/10 cursor-pointer";
          if (state === "disabled")
            cls = "text-[#1f2937]/25 cursor-not-allowed line-through";
          if (state === "checkin")
            cls = "bg-[#064e3b] text-[#fdfbf7] font-semibold cursor-pointer";
          if (state === "checkout")
            cls = "bg-[#064e3b] text-[#fdfbf7] font-semibold cursor-pointer";
          if (state === "range")
            cls = "bg-[#064e3b]/15 text-[#064e3b] cursor-pointer";
          if (state === "disabled" && bookedSet.has(toISO(d)))
            cls = "bg-[#9c6f5e]/10 text-[#9c6f5e]/70 cursor-not-allowed line-through";

          return (
            <button
              key={toISO(d)}
              onClick={() => handleDayClick(d)}
              className={`${base} ${cls}`}
            >
              {d.getDate()}
              {state === "checkin" && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-emerald-300" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#1f2937]/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-[#064e3b]" /> Selected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-[#064e3b]/15" /> In range
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-[#9c6f5e]/20" /> Booked
        </span>
      </div>
    </div>
  );
}

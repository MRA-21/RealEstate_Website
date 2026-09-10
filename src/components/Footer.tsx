import { Phone, Mail, MapPin, House, Instagram, Twitter, Facebook } from "lucide-react";
import { AGENT_PHONE } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#064e3b] text-[#fdfbf7]">
      <div id="list" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fdfbf7]/10">
                <House className="h-5 w-5 text-[#fdfbf7]" />
              </span>
              <span className="text-xl font-semibold">
                Lekki<span className="font-light">Haven</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-[#fdfbf7]/70 leading-relaxed max-w-xs">
              Lagos' premier luxury short-let platform. Solar-powered, secure,
              and serviced residences in the city's most exclusive
              neighbourhoods.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#fdfbf7]/80">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#fdfbf7]/70">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#fdfbf7]/50" />
                <a
                  href={`tel:${AGENT_PHONE.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-[#fdfbf7] transition-colors"
                >
                  {AGENT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#fdfbf7]/50" />
                <a
                  href="mailto:bookings@lekkihaven.ng"
                  className="hover:text-[#fdfbf7] transition-colors"
                >
                  bookings@lekkihaven.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#fdfbf7]/50" />
                Admiralty Way, Lekki Phase 1, Lagos
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#fdfbf7]/80">
              List Your Property
            </h4>
            <p className="mt-4 text-sm text-[#fdfbf7]/70 leading-relaxed">
              Own a premium residence in Lagos? Join our curated portfolio and
              reach discerning guests.
            </p>
            <a
              href="mailto:partners@lekkihaven.ng"
              className="mt-4 inline-flex items-center rounded-full bg-[#fdfbf7]/10 px-5 py-2.5 text-sm font-semibold text-[#fdfbf7] hover:bg-[#fdfbf7]/15 transition-colors"
            >
              Become a Host
            </a>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#fdfbf7]/10 text-[#fdfbf7] hover:bg-[#fdfbf7]/20 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#fdfbf7]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#fdfbf7]/50">
          <span>© {new Date().getFullYear()} LekkiHaven. All rights reserved.</span>
          <span>Crafted for the Lagos luxury market.</span>
        </div>
      </div>
    </footer>
  );
}

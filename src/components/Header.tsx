import { useState, useEffect } from "react";
import { Phone, Menu, X, House } from "lucide-react";
import { AGENT_PHONE } from "@/lib/data";

const NAV_LINKS = [
  { label: "Explore", href: "#explore" },
  { label: "List Your Property", href: "#list" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#fdfbf7]/95 backdrop-blur-md shadow-sm border-b border-[#064e3b]/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                scrolled ? "bg-[#064e3b]" : "bg-[#064e3b]"
              }`}
            >
              <House className="h-5 w-5 text-[#fdfbf7]" />
            </span>
            <span
              className={`text-lg sm:text-xl font-semibold tracking-tight ${
                scrolled ? "text-[#064e3b]" : "text-[#fdfbf7]"
              }`}
            >
              Lekki<span className="font-light">Haven</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#1f2937] hover:text-[#064e3b]"
                    : "text-[#fdfbf7]/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${AGENT_PHONE.replace(/[^0-9+]/g, "")}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#064e3b] px-4 py-2.5 text-sm font-semibold text-[#fdfbf7] shadow-sm transition-all hover:bg-[#0a5f48] hover:shadow-md active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Call Agent
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                scrolled ? "text-[#064e3b]" : "text-[#fdfbf7]"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#064e3b]/10 bg-[#fdfbf7]">
          <nav className="flex flex-col px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base font-medium text-[#1f2937] hover:text-[#064e3b]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${AGENT_PHONE.replace(/[^0-9+]/g, "")}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#064e3b] px-4 py-3 text-sm font-semibold text-[#fdfbf7]"
            >
              <Phone className="h-4 w-4" />
              Call Agent
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

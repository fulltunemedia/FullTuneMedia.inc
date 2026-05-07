import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center gap-3 group"
        >
          <span className="w-2 h-2 bg-[#FF3B30] rounded-full group-hover:scale-150 transition-transform" />
          <span className="font-stencil text-lg font-semibold uppercase tracking-[0.2em]">
            FullTune<span className="text-[#FF3B30]">Media</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-stencil text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF3B30] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Hamilton · ON
          </span>
          <a
            href="#contact"
            data-testid="navbar-book-button"
            className="px-5 py-2.5 bg-[#FF3B30] hover:bg-[#FF5247] text-white font-stencil text-xs uppercase tracking-[0.2em] transition-colors"
          >
            Book a Shoot
          </a>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0c] border-t border-white/5 px-6 py-6 space-y-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`nav-link-mobile-${l.label.toLowerCase()}`}
              className="block font-stencil text-sm uppercase tracking-[0.25em] text-zinc-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            data-testid="navbar-mobile-book"
            className="inline-block mt-3 px-5 py-2.5 bg-[#FF3B30] text-white font-stencil text-xs uppercase tracking-[0.2em]"
          >
            Book a Shoot
          </a>
        </div>
      )}
    </header>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative bg-[#070708] border-t border-white/5"
    >
      {/* Marquee */}
      <div className="overflow-hidden border-b border-white/5 py-8">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 items-center">
              {[
                "FullTuneMedia",
                "Hamilton · ON",
                "Cinematic Photography",
                "Est. 2025",
                "Build · Moto · Arch · Portrait",
                "Now Booking",
              ].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-display italic text-5xl md:text-7xl text-zinc-700"
                >
                  {t} <span className="text-[#FF3B30] not-italic">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-[#FF3B30] rounded-full" />
              <span className="font-stencil text-sm uppercase tracking-[0.25em] text-white">
                FullTuneMedia
              </span>
            </div>
            <p className="font-body text-zinc-500 max-w-md leading-relaxed">
              A Hamilton-based photographer chasing the light on builds and the
              people behind them.
            </p>
          </div>
          <div>
            <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Navigate
            </div>
            <ul className="space-y-2 font-body text-sm text-zinc-300">
              <li><a href="#work" className="hover:text-[#FF3B30]">Work</a></li>
              <li><a href="#about" className="hover:text-[#FF3B30]">About</a></li>
              <li><a href="#services" className="hover:text-[#FF3B30]">Services</a></li>
              <li><a href="#contact" className="hover:text-[#FF3B30]">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Contact
            </div>
            <ul className="space-y-2 font-body text-sm text-zinc-300">
              <li>hello@fulltunemedia.com</li>
              <li>Hamilton, Ontario</li>
              <li>
                <a href="https://instagram.com" className="hover:text-[#FF3B30]">
                  @fulltunemedia
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-3">
          <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            © {new Date().getFullYear()} FullTuneMedia. All frames reserved.
          </span>
          <Link
            to="/admin"
            data-testid="footer-admin-link"
            className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-[#FF3B30]"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

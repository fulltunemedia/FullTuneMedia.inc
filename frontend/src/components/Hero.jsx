import { ArrowDown, MapPin } from "lucide-react";
import { HERO_IMAGE } from "../lib/placeholders";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Cinematic silver convertible at night"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-[#0a0a0c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 min-h-screen flex flex-col">
        {/* Top meta */}
        <div className="reveal flex items-center gap-3 text-zinc-400">
          <MapPin size={14} className="text-[#FF3B30]" />
          <span className="font-stencil text-xs uppercase tracking-[0.3em]">
            Hamilton, Ontario · Est. 2025
          </span>
        </div>

        <div className="flex-1" />

        {/* Headline */}
        <div className="max-w-5xl reveal" style={{ animationDelay: "0.1s" }}>
          <h1 className="font-display tracking-mega text-[14vw] md:text-[10vw] leading-[0.85] font-bold text-white">
            Driven <span className="italic font-normal text-zinc-300">By</span>{" "}
            <span className="relative inline-block">
              Passion
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF3B30]" />
            </span>
          </h1>
        </div>

        {/* Sub */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 reveal" style={{ animationDelay: "0.25s" }}>
          <div className="md:col-span-5 md:col-start-7">
            <p className="font-body text-base md:text-lg text-zinc-300 leading-relaxed">
              FullTuneMedia is a Hamilton-based photographer chasing the
              light on custom builds, two-wheeled obsessions, brutalist
              skylines and the people brave enough to step in front of the
              lens.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#work"
                data-testid="hero-cta-work"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-stencil text-xs uppercase tracking-[0.2em] hover:bg-[#FF3B30] hover:text-white transition-colors"
              >
                See the Work
                <ArrowDown
                  size={14}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                data-testid="hero-cta-contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-stencil text-xs uppercase tracking-[0.2em] hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-zinc-500">
          <span className="font-stencil text-[10px] uppercase tracking-[0.4em]">
            Automotive · Moto · Architecture · Portrait
          </span>
          <span className="font-stencil text-[10px] uppercase tracking-[0.4em]">
            Scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}

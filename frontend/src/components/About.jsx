import { ABOUT_IMAGE } from "../lib/placeholders";

const stats = [
  { value: "01", label: "Photographer" },
  { value: "04", label: "Disciplines" },
  { value: "∞", label: "Frames Left" },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-[#0a0a0c] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Image side */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#121214]">
              <img
                src={ABOUT_IMAGE}
                alt="Photographer at work"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10">
                <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-300">
                  Behind the Lens
                </span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="md:col-span-7 md:pl-8">
            <p className="font-stencil text-xs uppercase tracking-[0.3em] text-[#FF3B30] mb-4">
              § 02 — The Photographer
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-mega leading-[1.02] text-white mb-8">
              I&apos;m chasing a dream <br />
              <em className="italic font-normal text-zinc-400">
                one frame at a time.
              </em>
            </h2>

            <div className="space-y-6 text-zinc-300 font-body leading-relaxed text-lg max-w-2xl">
              <p>
                I&apos;m a beginner photographer based in Hamilton, Ontario —
                still in the part of the journey where every shutter click
                feels like a small bet on myself. I started this because I was
                tired of scrolling past beautiful builds and beautiful people
                without a way to honor either of them.
              </p>
              <p className="border-l-2 border-[#FF3B30] pl-6 italic font-display text-xl text-zinc-200">
                &ldquo;The car you spent two years building deserves more than
                a phone shot in a Tim Hortons parking lot.&rdquo;
              </p>
              <p>
                FullTuneMedia is built around two ideas: capture machines the
                way their owners see them in their head, and photograph people
                in a way that feels less like a pose and more like a portrait
                of who they&apos;re becoming.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label} data-testid={`about-stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="font-display text-4xl md:text-5xl text-white">
                    {s.value}
                  </div>
                  <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

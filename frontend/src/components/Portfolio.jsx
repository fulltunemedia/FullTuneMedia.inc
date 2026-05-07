import { useEffect, useState } from "react";
import { api } from "../lib/apiClient";
import { CATEGORIES, PLACEHOLDER_PHOTOS } from "../lib/placeholders";

export default function Portfolio() {
  const [active, setActive] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/photos");
        if (!mounted) return;
        const list = Array.isArray(res.data) && res.data.length > 0 ? res.data : PLACEHOLDER_PHOTOS;
        setPhotos(list);
      } catch (e) {
        setPhotos(PLACEHOLDER_PHOTOS);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered =
    active === "all" ? photos : photos.filter((p) => p.category === active);

  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="relative bg-[#0a0a0c] py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7">
            <p className="font-stencil text-xs uppercase tracking-[0.3em] text-[#FF3B30] mb-4">
              § 01 — Selected Work
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-mega leading-[0.95] text-white">
              A field guide to <em className="italic font-normal text-zinc-400">light, metal,</em>
              <br />
              and the people in between.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="font-body text-zinc-400 leading-relaxed">
              Every shoot starts with a conversation. Bring the build. Bring
              yourself. Leave with images that feel less like documentation
              and more like a movie still you can hang on your wall.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-1 mb-12 border-b border-white/10">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              data-testid={`portfolio-filter-${c.key}`}
              onClick={() => setActive(c.key)}
              className={`px-4 md:px-6 py-3 font-stencil text-xs uppercase tracking-[0.25em] transition-colors relative ${
                active === c.key
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {c.label}
              {active === c.key && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#FF3B30]" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-zinc-500 font-stencil text-sm uppercase tracking-[0.3em]">
            Loading frames…
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-testid="portfolio-empty"
            className="py-32 text-center text-zinc-500 font-stencil text-sm uppercase tracking-[0.3em]"
          >
            No frames in this category yet.
          </div>
        ) : (
          <div
            data-testid="portfolio-grid"
            className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[260px]"
          >
            {filtered.map((p, i) => {
              // asymmetric tetris
              const span = getSpan(i, filtered.length);
              return (
                <a
                  key={p.id}
                  href={p.image_data}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`portfolio-tile-${p.id}`}
                  className={`group relative overflow-hidden bg-[#121214] ${span}`}
                >
                  <img
                    src={p.image_data}
                    alt={p.title}
                    loading="lazy"
                    className="zoom-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-stencil text-[10px] uppercase tracking-[0.3em] text-[#FF3B30] mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-white">
                      {p.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 border border-white/20 group-hover:border-[#FF3B30] transition-colors flex items-center justify-center">
                    <span className="font-stencil text-[10px] uppercase tracking-[0.2em] text-white/70 group-hover:text-[#FF3B30]">
                      ↗
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function getSpan(i, total) {
  // Tetris-like pattern
  const pattern = [
    "col-span-12 md:col-span-8 row-span-2",
    "col-span-6 md:col-span-4 row-span-1",
    "col-span-6 md:col-span-4 row-span-1",
    "col-span-12 md:col-span-5 row-span-2",
    "col-span-6 md:col-span-4 row-span-1",
    "col-span-6 md:col-span-3 row-span-1",
    "col-span-12 md:col-span-7 row-span-2",
    "col-span-6 md:col-span-5 row-span-1",
  ];
  return pattern[i % pattern.length];
}

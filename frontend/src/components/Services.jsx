import { Car, Bike, Building2, User } from "lucide-react";

const services = [
  {
    icon: Car,
    name: "Build Sessions",
    sub: "Cars · Trucks · Customs",
    desc:
      "A 2-3 hour location shoot tuned to your build. Rolling shots, static hero frames, and detail work — all delivered with cinematic color and the kind of attention your project deserves.",
    price: "From $250 CAD",
    deliver: "25–40 edited frames",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Bike,
    name: "Two-Wheel Stories",
    sub: "Sportbikes · Cruisers · Cafe",
    desc:
      "Built for riders. We map a route, scout angles, and shoot during the golden hour into blue hour. Rider portraits with the bike included at no extra charge.",
    price: "From $220 CAD",
    deliver: "20–35 edited frames",
    image:
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Building2,
    name: "Architecture & Spaces",
    sub: "Brutalist · Industrial · Editorial",
    desc:
      "Hamilton has bones. Whether it's your shop, your studio, or a structure you're obsessed with — we shoot it like it matters, because it does.",
    price: "From $300 CAD",
    deliver: "30+ edited frames",
    image:
      "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: User,
    name: "Portrait Sessions",
    sub: "Step out of your comfort zone",
    desc:
      "For people who don't love being in front of a camera but know it's time. We talk first. We shoot second. The result is you, on a day you actually liked yourself.",
    price: "From $180 CAD",
    deliver: "15–25 edited frames",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-[#0a0a0c] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-3xl">
          <p className="font-stencil text-xs uppercase tracking-[0.3em] text-[#FF3B30] mb-4">
            § 03 — What I Shoot
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-mega leading-[0.95] text-white">
            Four lenses. <em className="italic font-normal text-zinc-400">One obsession.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                data-testid={`service-card-${s.name.toLowerCase().replace(/\s/g, "-")}`}
                className="group relative bg-[#121214] border border-white/5 overflow-hidden hover:border-[#FF3B30]/40 transition-colors duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="zoom-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10">
                    <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-white">
                      {s.price}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 w-12 h-12 border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-[#FF3B30] group-hover:bg-[#FF3B30]/10 transition-all">
                    <Icon size={20} className="text-white group-hover:text-[#FF3B30] transition-colors" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl text-white leading-none">
                        {s.name}
                      </h3>
                      <p className="font-stencil text-[10px] uppercase tracking-[0.3em] text-[#FF3B30] mt-2">
                        {s.sub}
                      </p>
                    </div>
                    <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400 hidden md:block">
                      0{i + 1} / 04
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                  <p className="font-body text-zinc-400 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-white/10">
                    <span className="font-stencil text-xs uppercase tracking-[0.25em] text-white">
                      {s.price}
                    </span>
                    <span className="font-stencil text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      {s.deliver}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          * Custom packages, multi-day projects, and commercial work — let&apos;s talk.
        </p>
      </div>
    </section>
  );
}

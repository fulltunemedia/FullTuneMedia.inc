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
  },
  {
    icon: Bike,
    name: "Two-Wheel Stories",
    sub: "Sportbikes · Cruisers · Cafe",
    desc:
      "Built for riders. We map a route, scout angles, and shoot during the golden hour into blue hour. Rider portraits with the bike included at no extra charge.",
    price: "From $220 CAD",
    deliver: "20–35 edited frames",
  },
  {
    icon: Building2,
    name: "Architecture & Spaces",
    sub: "Brutalist · Industrial · Editorial",
    desc:
      "Hamilton has bones. Whether it&apos;s your shop, your studio, or a structure you&apos;re obsessed with — we shoot it like it matters, because it does.",
    price: "From $300 CAD",
    deliver: "30+ edited frames",
  },
  {
    icon: User,
    name: "Portrait Sessions",
    sub: "Step out of your comfort zone",
    desc:
      "For people who don&apos;t love being in front of a camera but know it&apos;s time. We talk first. We shoot second. The result is you, on a day you actually liked yourself.",
    price: "From $180 CAD",
    deliver: "15–25 edited frames",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                data-testid={`service-card-${s.name.toLowerCase().replace(/\s/g, "-")}`}
                className="group relative bg-[#0a0a0c] p-8 md:p-12 hover:bg-[#121214] transition-colors duration-500 cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 border border-white/15 flex items-center justify-center group-hover:border-[#FF3B30] group-hover:bg-[#FF3B30]/5 transition-all">
                    <Icon size={22} className="text-white group-hover:text-[#FF3B30] transition-colors" />
                  </div>
                  <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    0{i + 1} / 04
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-white mb-1">
                  {s.name}
                </h3>
                <p className="font-stencil text-xs uppercase tracking-[0.25em] text-[#FF3B30] mb-6">
                  {s.sub}
                </p>
                <p className="font-body text-zinc-400 leading-relaxed mb-8">
                  {s.desc}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="font-stencil text-xs uppercase tracking-[0.2em] text-zinc-300">
                    {s.price}
                  </span>
                  <span className="font-stencil text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {s.deliver}
                  </span>
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

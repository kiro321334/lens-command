import Image from "next/image";
import { posterSrc } from "@/lib/cloud";
export default function Hero({ c }) {
  const h = c.hero,
    src = posterSrc(h.image) || "/hero.jpg";
  return (
    <section className="flex h-svh min-h-[640px] flex-col pt-16">
      <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col md:max-w-3xl">
        <div className="brk relative min-h-[220px] flex-1 overflow-hidden bg-[#14121b]">
          <Image
            src={src}
            alt={`${c.site.name} – ${h.pill}`}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width:768px) 768px, 100vw"
            className="hero-img object-cover object-[50%_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-[#1a1030]/50 to-[#14121b]/70" />
          <span className="fade-up absolute left-4 top-4 z-[3] flex items-center gap-2 rounded-md bg-bg/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-lav backdrop-blur">
            <i className="blink h-2 w-2 rounded-full bg-[#f9a8b8]" />
            {h.badge}
          </span>
          <span className="absolute bottom-4 right-6 z-[3] text-[11px] font-bold tracking-[.15em] text-cream/80">
            {h.meta}
          </span>
        </div>
        <div className="px-5 pb-6 pt-4 text-center">
          <p className="fade-up mx-auto w-fit rounded-xl border border-line bg-panel/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider">
            {h.pill}
          </p>
          <h1 className="fade-up d1 mt-4 font-display text-[2rem] font-bold uppercase leading-none md:text-5xl">
            {h.titleA} <span className="text-lav">{h.titleB}</span>
          </h1>
          <div className="fade-up d2 mt-5 grid grid-cols-2 gap-3 md:mx-auto md:max-w-md">
            <a href="#work" className="btn-p glow">
              {h.cta1} ↓
            </a>
            <a href="#contact" className="btn-o">
              {h.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

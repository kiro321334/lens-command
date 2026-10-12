"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { coverOf } from "@/lib/cloud";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
const CaseModal = dynamic(() => import("@/components/ui/CaseModal"), {
  ssr: false,
});
const LIMIT = 6;
const Ph = () => (
  <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#2a2150,#141220)] text-lav/30">
    <Icon n="camera" size={34} />
  </span>
);
export default function Work({ c }) {
  const w = c.work,
    featured = c.projects.find((p) => p.featured),
    grid = c.projects.filter((p) => !p.featured);
  const [f, setF] = useState("ALL");
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState(null);
  const list = grid.filter(
    (p) => f === "ALL" || (p.categories || []).includes(f),
  );
  const shown = all ? list : list.slice(0, LIMIT);
  const pick = (k) => {
    setF(k);
    setAll(false);
  };
  const fc = featured && coverOf(featured),
    thumbs = featured
      ? (featured.gallery || []).filter((g) => g.media?.url).slice(0, 2)
      : [];
  return (
    <section id="work" className="bg-[#120f1a] px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <Heading eyebrow={w.eyebrow} title={w.title} sub={w.sub} />
        {featured && (
          <article className="card brk reveal mt-6 p-3">
            <div className="flex items-center justify-between px-2 py-2">
              <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-lav">
                <Icon n="star" size={14} />
                Featured campaign
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-gold">
                {featured.badge}
              </span>
            </div>
            <div className="grid grid-cols-[1fr_32%] gap-2 md:grid-cols-[1fr_22%]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black md:aspect-[16/10]">
                {fc ? (
                  <Image
                    src={fc}
                    alt={featured.title}
                    fill
                    sizes="(min-width:768px) 600px, 70vw"
                    className="object-cover"
                  />
                ) : (
                  <Ph />
                )}
              </div>
              <div className="grid grid-rows-2 gap-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-xl bg-black"
                  >
                    {thumbs[i] ? (
                      <Image
                        src={coverOf({ gallery: [thumbs[i]] })}
                        alt={`${featured.title} detail ${i + 1}`}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    ) : (
                      <Ph />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 px-2 pb-2 pt-4">
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-none">
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm text-cream/85">{featured.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(featured)}
                className="btn-p w-auto shrink-0 gap-2 px-5 py-3"
              >
                <Icon n="camera" size={16} />
                View
              </button>
            </div>
          </article>
        )}
        <div
          role="tablist"
          aria-label="Filter projects"
          className="noscroll -mx-4 mt-6 flex gap-2 overflow-x-auto px-4"
        >
          <button
            role="tab"
            aria-selected={f === "ALL"}
            className="chip"
            onClick={() => pick("ALL")}
          >
            All
          </button>
          {w.filters.slice(0, 2).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={f === k}
              className="chip"
              onClick={() => pick(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div
          role="tablist"
          aria-label="Filter by tag"
          className="noscroll -mx-4 mt-3 flex gap-2 overflow-x-auto px-4"
        >
          {w.filters.slice(2).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={f === k}
              className="chip-s"
              onClick={() => pick(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {shown.map((p) => {
            const cv = coverOf(p);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpen(p)}
                aria-label={`Open project: ${p.title}`}
                className="card group overflow-hidden rounded-2xl p-0 text-left transition hover:border-lav/50"
              >
                <span
                  className="relative block w-full overflow-hidden bg-black"
                  style={{ aspectRatio: p.ratio || "4/5" }}
                >
                  {cv ? (
                    <Image
                      src={cv}
                      alt={`${p.title} – ${p.sub}`}
                      fill
                      sizes="(min-width:768px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Ph />
                  )}
                  <span className="tagb absolute left-2 top-2">
                    <Icon n={p.type} size={13} />
                    {p.type === "video"
                      ? "VIDEO"
                      : p.type === "design"
                        ? "DESIGN"
                        : "PHOTO"}
                  </span>
                  {p.type === "video" && (
                    <span className="ping absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-violet text-white">
                      <Icon n="play" size={18} fill />
                    </span>
                  )}
                  {p.badge && (
                    <span className="absolute bottom-2 right-2 rounded-md bg-bg/80 px-2 py-1 text-[10px] font-bold">
                      {p.badge}
                    </span>
                  )}
                </span>
                <span className="block p-3">
                  <span className="block text-sm font-extrabold uppercase leading-snug">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-xs text-cream/75">
                    {p.sub}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {list.length === 0 && (
          <p className="mt-8 text-center text-sm text-mute">
            No projects in this category yet.
          </p>
        )}
        {list.length > LIMIT && (
          <button
            type="button"
            aria-expanded={all}
            onClick={() => setAll(!all)}
            className="btn-o mt-6 w-full text-lav"
          >
            {all ? "SHOW LESS" : w.moreLabel}
          </button>
        )}
        {open && <CaseModal p={open} onClose={() => setOpen(null)} />}
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posterSrc, videoSrc } from "@/lib/cloud";
import Icon from "@/components/ui/Icon";
function Tile({ g, big }) {
  const [play, setPlay] = useState(false);
  const m = g.media,
    isV = m?.type === "video",
    ps = posterSrc(m);
  return (
    <div
      style={g.ratio ? { aspectRatio: g.ratio } : undefined}
      className={`relative overflow-hidden rounded-2xl bg-panel2 ${g.ratio ? "" : big ? "aspect-[16/10]" : "aspect-square"}`}
    >
      {play && isV ? (
        <video
          src={videoSrc(m)}
          poster={ps || undefined}
          controls
          autoPlay
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          disabled={!isV}
          onClick={() => setPlay(true)}
          aria-label={isV ? `Play ${g.title}` : g.title}
          className="group absolute inset-0 block h-full w-full text-left"
        >
          {ps ? (
            <Image
              src={ps}
              alt={g.title}
              fill
              sizes={
                big
                  ? "(min-width:768px) 640px, 100vw"
                  : "(min-width:768px) 300px, 50vw"
              }
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#2a2150,#141220)]" />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
          {g.tag && (
            <span className="absolute left-3 top-3 rounded-lg bg-bg/80 px-2.5 py-1 text-[11px] font-extrabold tracking-wider">
              {g.tag}
            </span>
          )}
          {big && g.meta && (
            <span className="absolute right-3 top-3 text-[11px] font-extrabold tracking-wider text-gold">
              {g.meta}
            </span>
          )}
          {isV && (
            <span className="ping absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-violet text-white">
              <Icon n="play" size={18} fill />
            </span>
          )}
          <span
            className={`absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 ${big ? "" : "flex-col items-start"}`}
          >
            <span>
              {!big && g.meta && (
                <span className="block text-[11px] font-extrabold tracking-wider text-gold">
                  {g.meta}
                </span>
              )}
              <span
                className={`block font-extrabold ${big ? "font-display text-3xl uppercase leading-none" : "text-sm"}`}
              >
                {g.title}
              </span>
            </span>
            {big && g.note && (
              <span className="text-right text-[11px] font-bold uppercase leading-tight">
                {g.note}
              </span>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
export default function CaseModal({ p, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const close = () => ref.current.close();
  const info = [
    ["CLIENT", p.client],
    ["DELIVERABLES", p.deliverables],
    ["CHANNELS", p.channels],
  ].filter(([, v]) => v);
  const gal0 = (p.gallery || []).filter((g) => g.title);
  const coverTile =
    p.cover?.url && !gal0.some((g) => g.media?.url === p.cover.url)
      ? {
          media: p.cover,
          title: p.title,
          meta: p.badge,
          ratio: p.ratio,
          tag: p.cover.type === "video" ? "VIDEO" : undefined,
        }
      : null;
  const gal = coverTile ? [coverTile, ...gal0] : gal0;
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
      aria-label={`Case study: ${p.title}`}
      className="m-auto h-svh w-full max-w-lg overflow-hidden bg-bg p-0 text-cream backdrop:bg-black/85 backdrop:backdrop-blur-sm md:h-[94svh] md:rounded-3xl"
    >
      <div className="h-full overflow-y-auto p-4">
        <div className="rounded-3xl border border-line bg-gradient-to-b from-[#1e1b28] to-panel p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-lg bg-panel2 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-cream/85">
              ● Case study // {p.caseTag || "Project"}
            </span>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-panel2"
            >
              <Icon n="close" size={22} />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-wider">
            {p.featured && (
              <span className="rounded-full bg-violet px-3 py-1.5 text-white">
                Featured campaign
              </span>
            )}
            {p.caseKind && <span className="text-gold">{p.caseKind}</span>}
          </div>
          <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[.95]">
            {p.title}
          </h2>
          {p.desc && (
            <p className="mt-3 text-sm leading-relaxed text-cream/90">
              {p.desc}
            </p>
          )}
          {(info.length > 0 || p.impact) && (
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {info.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-panel2 p-4">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-mute">
                    {k}
                  </dt>
                  <dd className="mt-1 font-bold leading-snug">{v}</dd>
                </div>
              ))}
              {p.impact && (
                <div className="rounded-2xl border border-gold/40 bg-[#2a2415]/60 p-4">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-gold">
                    Verified impact
                  </dt>
                  <dd className="mt-1 font-display text-3xl font-bold text-gold">
                    {p.impact}{" "}
                    <span className="text-xs text-cream/80">
                      {p.impactLabel}
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          )}
          {gal.length > 0 && (
            <>
              <div className="mt-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold uppercase">
                  <i className="h-5 w-1.5 rounded-full bg-violet" />
                  Production gallery
                </h3>
                <span className="rounded-md bg-panel2 px-2 py-1 text-[10px] font-extrabold tracking-wider">
                  MASTER VAULT
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="col-span-2 mx-auto w-full max-w-[300px] md:max-w-sm">
                  <Tile g={gal[0]} big />
                </div>
                {gal.slice(1).map((g, i) => (
                  <Tile key={i} g={g} />
                ))}
              </div>
            </>
          )}
          {p.scope?.length > 0 && (
            <>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-mute">
                Production scope & pipeline
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.scope.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-panel2 px-3 py-2 text-sm font-bold"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link href="/#contact" onClick={close} className="btn-p mt-6 w-full">
            Request similar campaign <Icon n="arrowr" size={16} />
          </Link>
          {p.turnaround && (
            <p className="mt-3 flex items-center gap-2 text-[11px] font-extrabold tracking-wide text-cream/90">
              <Icon n="bolt" size={14} className="text-gold" />
              {p.turnaround}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}

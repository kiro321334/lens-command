'use client';
import { useState } from 'react';
import Image from 'next/image';
import { posterSrc, videoSrc } from '@/lib/cloud';
import Icon from '@/components/ui/Icon';
// ميديا قسم UGC: صورة (بتظهر ثابتة) أو فيديو (بيتشغّل بالضغط) أو فاضي (خلفية)
export default function UgcPlayer({ u, alt }) {
  const [on, setOn] = useState(false);
  const m = u.video, ps = posterSrc(m), isV = m?.type === 'video';
  const box = 'brk relative overflow-hidden rounded-3xl border border-violet/40 bg-black', style = { aspectRatio: u.ratio || '9/16' };
  const media = ps ? <Image src={ps} alt={alt} fill sizes="(min-width:768px) 420px, 90vw" className="object-cover" /> : <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#2a2150,#141220)]" />;
  const shade = <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />;
  const rec = u.rec ? <span className="absolute left-4 top-4 z-[3] flex items-center gap-2 rounded-lg bg-bg/80 px-3 py-1.5 text-[11px] font-extrabold tracking-wider"><i className="blink h-2 w-2 rounded-full bg-[#f9a8b8]" />{u.rec}</span> : null;
  const foot = u.hook || u.time ? <span className="absolute inset-x-5 bottom-5 z-[3] flex justify-between text-[11px] font-extrabold tracking-[.12em]"><span>{u.hook}</span><span>{u.time}</span></span> : null;
  if (!isV) return (<div className={box} style={style}>{media}{shade}{rec}{foot}</div>); // صورة أو فاضي: من غير زرار تشغيل
  return (<div className={box} style={style}>
    {on ? <video src={videoSrc(m)} poster={ps || undefined} controls autoPlay playsInline preload="none" className="h-full w-full object-cover" />
      : <button type="button" onClick={() => setOn(true)} aria-label="Play UGC video" className="group absolute inset-0 block h-full w-full">{media}{shade}{rec}
        <Icon n="volume" size={20} className="absolute right-4 top-4 z-[3]" />
        <span className="ping absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-violet text-white transition group-hover:scale-110"><Icon n="play" size={24} fill /></span>{foot}</button>}
  </div>);
}

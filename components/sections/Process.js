import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
export default function Process({ c }) {
  const p = c.process;
  return (<section id="process" className="mx-auto max-w-3xl px-4 py-12"><Heading eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
    <ol className="relative mt-7 grid gap-6"><span aria-hidden="true" className="absolute bottom-6 left-[15px] top-6 w-px bg-line" />{p.steps.map((s, i) => (
      <li key={s.title} className="reveal relative flex gap-4"><span className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ring-4 ring-bg" style={{ backgroundImage: 'linear-gradient(135deg,#5b2cf5,#8b6cff)' }}>{String(i + 1).padStart(2, '0')}</span>
        <div><h3 className="font-display text-2xl font-bold uppercase leading-tight">{s.title}</h3><p className="mt-1 text-sm leading-relaxed text-cream/85">{s.text}</p></div></li>))}</ol>
    {p.note && <p className="card mt-7 flex items-center gap-4 rounded-2xl p-4 text-sm"><Icon n="bolt" size={22} className="shrink-0 text-gold" />{p.note}</p>}</section>);
}

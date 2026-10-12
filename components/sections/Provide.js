import Icon from '@/components/ui/Icon';
export default function Provide({ c }) {
  const p = c.provide;
  return (<section className="mx-auto max-w-3xl px-4 py-10"><h2 className="reveal font-display text-5xl font-bold uppercase leading-none">{p.title}</h2><p className="mt-2 text-sm font-extrabold uppercase tracking-wide text-gold">{p.sub}</p>
    <div className="card reveal mt-5 rounded-2xl p-5"><ul className="grid gap-4">{p.items.map((i) => <li key={i} className="flex items-start gap-3 text-sm font-medium"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#4a4560]"><Icon n="check" size={13} /></span>{i}</li>)}</ul>
      {p.location && <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[11px] font-extrabold uppercase tracking-wider text-lav"><Icon n="pin" size={14} />{p.location}</p>}</div></section>);
}

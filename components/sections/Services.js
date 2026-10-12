import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
export default function Services({ c }) {
  const s = c.services;
  return (<section id="services" className="mx-auto max-w-5xl px-4 py-12"><Heading eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
    <div className="mt-6 grid gap-4 md:grid-cols-3">{s.items.map((it) => (
      <article key={it.title} className="card reveal rounded-2xl p-5"><div className="flex items-center gap-4 border-b border-line pb-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-violet/50 bg-violet/15 text-lav"><Icon n={it.icon} size={22} /></span><h3 className="font-display text-3xl font-bold uppercase">{it.title}</h3></div>
        <ul className="mt-4 grid gap-3 text-sm">{it.items.map((x) => <li key={x} className="flex items-center gap-3"><Icon n="checkc" size={18} className="shrink-0 text-lav" />{x}</li>)}</ul></article>))}</div></section>);
}

export default function Stats({ c }) {
  return (<section className="mx-auto max-w-md px-4 py-6 md:max-w-3xl"><dl className="reveal grid grid-cols-2 gap-y-6 rounded-3xl border border-line bg-gradient-to-br from-panel to-[#24202f] p-6 md:grid-cols-4">{c.stats.map((s, i) => (
    <div key={i} className={`${i % 2 ? 'border-l border-line pl-5 md:border-l' : ''}`}><dt className={`font-display font-bold uppercase leading-none text-gold ${s.value.length > 6 ? 'text-3xl' : 'text-5xl'}`}>{s.value}</dt><dd className="mt-2 text-[11px] font-bold uppercase tracking-wider text-cream/85">{s.label}</dd></div>))}</dl></section>);
}

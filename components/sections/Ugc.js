import UgcPlayer from '@/components/ui/UgcPlayer';
import Icon from '@/components/ui/Icon';
export default function Ugc({ c }) {
  const u = c.ugc;
  return (<section id="studio" className="px-4 py-12"><div className="card mx-auto max-w-md rounded-[2rem] bg-gradient-to-b from-[#221d30] to-panel p-5 md:max-w-xl">
    <div className="flex items-center justify-between"><span className="rounded-lg border border-violet/60 bg-violet/20 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-lav">{u.badge}</span><span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gold"><Icon n="trend" size={14} />{u.side}</span></div>
    <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05]">{u.title}</h2><p className="mt-4 text-sm leading-relaxed text-cream/90">{u.text}</p>
    <div className="mt-5"><UgcPlayer u={u} alt={`${c.site.name} UGC video`} /></div>
    <ol className="mt-5 grid grid-cols-4 gap-2 text-center">{u.steps.map((s, i) => <li key={s}><span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-panel2 text-sm font-extrabold">{i + 1}</span><span className="mt-2 block text-[10px] font-bold uppercase tracking-wider">{s}</span></li>)}</ol>
    <a href="#contact" className="btn-p mt-6 w-full">{u.cta}</a></div></section>);
}

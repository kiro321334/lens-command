import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
export default function Faq({ c }) {
  return (<section id="faq" className="bg-[#120f1a] px-4 py-12"><div className="mx-auto max-w-3xl"><Heading eyebrow="INQUIRIES" title="QUESTIONS" sub="Common details regarding shoots, logistics, and deliverables." />
    <div className="mt-6 grid gap-3">{c.faq.map((f, i) => (
      <details key={f.q} open={i === 0} className="group rounded-2xl border border-line bg-panel open:border-lav/60"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-xl font-bold uppercase tracking-wide">{f.q}<Icon n="down" size={16} className="shrink-0 transition group-open:rotate-180" /></summary>
        <p className="mx-5 border-t border-line py-4 text-sm leading-relaxed text-cream/85">{f.a}</p></details>))}</div></div></section>);
}

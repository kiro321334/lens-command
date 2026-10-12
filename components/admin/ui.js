'use client';
const inp = 'w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-cream placeholder:text-cream/35 focus:border-violet focus:outline-none';
export const Field = ({ label, hint, children }) => (<label className="grid gap-1.5"><span className="text-[11px] font-bold uppercase tracking-wider text-mute">{label}</span>{children}{hint && <span className="text-[11px] text-cream/45">{hint}</span>}</label>);
export const Input = ({ label, hint, value, onChange, ...p }) => (<Field label={label} hint={hint}><input className={inp} value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...p} /></Field>);
export const Textarea = ({ label, hint, value, onChange, rows = 3 }) => (<Field label={label} hint={hint}><textarea rows={rows} className={inp} value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></Field>);
export const Select = ({ label, value, onChange, options }) => (<Field label={label}><select className={inp} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></Field>);
export const Toggle = ({ label, value, onChange }) => (<label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-violet" />{label}</label>);
export const Card = ({ title, children }) => (<section className="grid gap-4 rounded-2xl border border-line bg-panel p-4">{title && <h3 className="font-display text-2xl font-bold uppercase">{title}</h3>}{children}</section>);
export const Chips = ({ label, options, value = [], onChange }) => (<Field label={label}><div className="flex flex-wrap gap-2">{options.map((o) => { const on = value.includes(o); return <button type="button" key={o} onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])} className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${on ? 'border-transparent bg-violet text-white' : 'border-line text-mute'}`}>{o}</button>; })}</div></Field>);
export function StringList({ label, items = [], onChange, placeholder }) {
  return (<Field label={label}><div className="grid gap-2">{items.map((s, i) => (<div key={i} className="flex gap-2"><input className={inp} value={s} placeholder={placeholder} onChange={(e) => onChange(items.map((x, k) => (k === i ? e.target.value : x)))} /><button type="button" onClick={() => onChange(items.filter((_, k) => k !== i))} className="rounded-xl border border-line px-3 text-red-300" aria-label="Remove">✕</button></div>))}
    <button type="button" onClick={() => onChange([...items, ''])} className="w-fit rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-bold text-lav">+ Add</button></div></Field>);
}
export function ListEditor({ items = [], onChange, render, summary, make, addLabel = 'Add item' }) {
  const upd = (i, patch) => onChange(items.map((x, k) => (k === i ? { ...x, ...patch } : x)));
  const mv = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const a = [...items]; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  const btn = 'rounded-lg border border-line px-2 py-1 text-xs';
  const stop = (fn) => (e) => { e.preventDefault(); e.stopPropagation(); fn(); };
  return (<div className="grid gap-3">{items.map((it, i) => (
    <details key={it.id || i} className="rounded-xl border border-line bg-bg/60"><summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-bold"><span className="flex-1 truncate">{i + 1}. {summary(it, i)}</span>
      <button type="button" className={btn} onClick={stop(() => mv(i, -1))} aria-label="Move up">↑</button><button type="button" className={btn} onClick={stop(() => mv(i, 1))} aria-label="Move down">↓</button>
      <button type="button" className={`${btn} text-red-300`} onClick={stop(() => confirm('Delete this item?') && onChange(items.filter((_, k) => k !== i)))} aria-label="Delete">🗑</button></summary>
      <div className="grid gap-4 border-t border-line p-4">{render(it, (patch) => upd(i, patch), i)}</div></details>))}
    <button type="button" onClick={() => onChange([...items, make()])} className="w-fit rounded-xl bg-violet px-4 py-2.5 text-sm font-extrabold text-white">+ {addLabel}</button></div>);
}

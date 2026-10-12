'use client';
import { useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
const inp = 'mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-cream placeholder:text-cream/45 focus:border-violet focus:outline-none';
const lab = 'block text-[11px] font-extrabold uppercase tracking-[.14em] text-cream/90';
export default function ContactForm({ scopes, dial, flag, whatsapp, successTitle, successText, waMsg, children }) {
  const [st, setSt] = useState('idle'); const [err, setErr] = useState(''); const t0 = useRef(Date.now());
  async function send(e) {
    e.preventDefault(); if (st === 'sending') return; setErr('');
    const form = e.currentTarget, d = new FormData(form);
    const last = Number(localStorage.getItem('msg_t') || 0);
    if (Date.now() - last < 30000) return setErr('استنى شوية قبل ما تبعت رسالة تانية.');
    const body = { name: d.get('name'), phone: `${dial}${String(d.get('phone')).replace(/\D/g, '')}`, scope: d.get('scope'), brief: d.get('brief'), website: d.get('website'), t: Date.now() - t0.current };
    setSt('sending');
    try {
      const r = await fetch('/api/message', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (r.status === 503 && whatsapp) { // الرسائل مش مفعّلة: نفتح واتساب بدل ما نضيّع الرسالة
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi! I'm ${body.name}.\nWhatsApp: ${body.phone}\nProject: ${body.scope}\n\n${body.brief}`)}`, '_blank', 'noopener'); setSt('idle'); return; }
      if (!r.ok) throw new Error(r.status === 429 ? 'محاولات كتيرة، جرّب بعد شوية.' : r.status === 422 ? 'راجع الاسم ورقم الواتساب.' : 'حصلت مشكلة، جرّب تاني.');
      localStorage.setItem('msg_t', String(Date.now())); form.reset(); setSt('done');
    } catch (er) { setErr(er.message || 'حصلت مشكلة، جرّب تاني.'); setSt('idle'); }
  }
  if (st === 'done') return (<div className="card mt-6 grid justify-items-center gap-3 rounded-3xl p-8 text-center" role="status"><span className="grid h-14 w-14 place-items-center rounded-full bg-violet text-white"><Icon n="check" size={26} /></span>
    <h3 className="font-display text-3xl font-bold uppercase">{successTitle}</h3><p className="text-sm text-cream/85">{successText}</p>
    <button type="button" onClick={() => { setSt('idle'); t0.current = Date.now(); }} className="btn-o mt-2 w-auto text-xs">Send another message</button>{children}</div>);
  return (<form onSubmit={send} className="card mt-6 grid gap-5 rounded-3xl p-5">
    <div><label htmlFor="name" className={lab}>Your name / brand</label><input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="e.g. Layla / Solis Leather" className={inp} /></div>
    <div><label htmlFor="phone" className={lab}>WhatsApp contact</label><div className="mt-2 flex gap-2"><span className="grid place-items-center whitespace-nowrap rounded-xl border border-line bg-bg px-4 text-sm font-bold"><small className="mr-1 text-[10px]">{flag}</small>{dial}</span><input id="phone" name="phone" required type="tel" maxLength={20} inputMode="tel" autoComplete="tel-national" placeholder="10 1234 5678" className={`${inp} mt-0 flex-1`} /></div></div>
    <div><label htmlFor="scope" className={lab}>Project scope</label><select id="scope" name="scope" className={inp}>{scopes.map((s) => <option key={s}>{s}</option>)}</select></div>
    <div><label htmlFor="brief" className={lab}>Brief details</label><textarea id="brief" name="brief" rows={3} maxLength={2000} placeholder="Number of products, reference links, or target deadline..." className={inp} /></div>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    {err && <p role="alert" className="text-sm font-bold text-red-300">{err}</p>}
    <button type="submit" disabled={st === 'sending'} className="btn-p w-full disabled:opacity-60">{st === 'sending' ? 'Sending…' : 'Send request'}</button>{children}</form>);
}

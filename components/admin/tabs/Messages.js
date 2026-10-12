'use client';
import { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Icon from '@/components/ui/Icon';
const fmt = (d) => (d ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(d) : '');
export default function Messages({ msgs, err }) {
  const [only, setOnly] = useState(false);
  const list = only ? msgs.filter((m) => !m.read) : msgs;
  const setRead = (m, read) => updateDoc(doc(db, 'messages', m.id), { read }).catch((e) => alert(e.message));
  const del = (m) => confirm(`Delete the message from ${m.name}?`) && deleteDoc(doc(db, 'messages', m.id)).catch((e) => alert(e.message));
  return (<div className="grid gap-4">
    <div className="flex items-center justify-between"><h2 className="font-display text-3xl font-bold uppercase">Inbox <span className="text-base text-mute">({msgs.length})</span></h2>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={only} onChange={(e) => setOnly(e.target.checked)} className="h-4 w-4 accent-violet" />Unread only</label></div>
    {err && <p className="rounded-xl bg-red-500/10 p-3 text-sm font-bold text-red-300">{err} — تأكد من قواعد Firestore (collection messages) ومن إنك داخل بحساب الأدمن.</p>}
    {!err && list.length === 0 && <p className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-mute">{only ? 'No unread messages.' : 'No messages yet. الرسايل اللي الزوار يبعتوها من الفورم هتظهر هنا لحظياً.'}</p>}
    {list.map((m) => { const digits = (m.phone || '').replace(/\D/g, '');
      return (<details key={m.id} onToggle={(e) => e.currentTarget.open && !m.read && setRead(m, true)} className={`rounded-2xl border bg-panel ${m.read ? 'border-line' : 'border-violet/70'}`}>
        <summary className="flex cursor-pointer items-center gap-3 p-4"><i className={`h-2.5 w-2.5 shrink-0 rounded-full ${m.read ? 'bg-line' : 'bg-violet'}`} />
          <span className="min-w-0 flex-1"><span className={`block truncate text-sm ${m.read ? 'font-semibold' : 'font-extrabold'}`}>{m.name}</span><span className="block truncate text-xs text-mute">{m.scope} · {m.phone}</span></span>
          <span className="shrink-0 text-[11px] text-mute">{fmt(m.at)}</span></summary>
        <div className="grid gap-4 border-t border-line p-4">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{m.brief || <em className="text-mute">No details.</em>}</p>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <a href={`https://wa.me/${digits}?text=${encodeURIComponent(`Hi ${m.name}, thanks for contacting us!`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg bg-violet px-3 py-2 text-white"><Icon n="chat" size={14} />Reply on WhatsApp</a>
            <a href={`tel:+${digits}`} className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2"><Icon n="phone" size={14} />Call</a>
            <button type="button" onClick={() => setRead(m, !m.read)} className="rounded-lg border border-line px-3 py-2">{m.read ? 'Mark unread' : 'Mark read'}</button>
            <button type="button" onClick={() => del(m)} className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-red-300"><Icon n="trash" size={14} />Delete</button></div></div></details>); })}</div>);
}

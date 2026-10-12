'use client';
import { Card, Input, Textarea, Select, Toggle, Chips, StringList, ListEditor } from '@/components/admin/ui';
import MediaField from '@/components/admin/MediaField';
const rid = () => Math.random().toString(36).slice(2, 9);
export default function Projects({ c, set }) {
  const setFeatured = (id, on) => set('projects', c.projects.map((p) => ({ ...p, featured: p.id === id ? on : on ? false : p.featured })));
  return (<div className="grid gap-5"><Card title="Projects"><p className="text-xs text-mute">اضغط على المشروع لتعديله. المشروع المميّز (Featured) بيظهر في الكارت الكبير، والباقي في الشبكة. كل مشروع ليه صفحة تفاصيل (Case Study) فيها معرض صور وفيديوهات.</p>
    <ListEditor items={c.projects} onChange={(v) => set('projects', v)} addLabel="Add project" summary={(p) => `${p.featured ? '⭐ ' : ''}${p.title}`}
      make={() => ({ id: rid(), type: 'photo', title: 'NEW PROJECT', sub: '', categories: [], badge: '', ratio: '4/5', cover: null, gallery: [] })}
      render={(p, u) => (<>
        <Input label="Title" value={p.title} onChange={(v) => u({ title: v })} /><Input label="Subtitle" value={p.sub} onChange={(v) => u({ sub: v })} />
        <div className="grid grid-cols-2 gap-3"><Select label="Type" value={p.type} onChange={(v) => u({ type: v })} options={['photo', 'video', 'design']} /><Select label="Card ratio" value={p.ratio || '4/5'} onChange={(v) => u({ ratio: v })} options={['4/5', '9/16', '1/1', '3/4', '16/9']} /></div>
        <Input label="Corner badge (e.g. 4:5 RAW / 00:15)" value={p.badge} onChange={(v) => u({ badge: v })} />
        <Chips label="Categories (filters)" options={c.work.filters} value={p.categories} onChange={(v) => u({ categories: v })} />
        <MediaField label="Cover (image or video)" value={p.cover} onChange={(v) => u({ cover: v })} hint="لو فيديو، بياخد أول فريم تلقائياً. لو سبته فاضي بياخد أول ملف من المعرض." />
        <Toggle label="Featured (big card on top)" value={p.featured} onChange={(on) => setFeatured(p.id, on)} />
        <details className="rounded-xl border border-line"><summary className="cursor-pointer p-3 text-sm font-bold text-lav">Case study details & gallery</summary><div className="grid gap-4 border-t border-line p-4">
          <div className="grid grid-cols-2 gap-3"><Input label="Tag (e.g. 4K DCI)" value={p.caseTag} onChange={(v) => u({ caseTag: v })} /><Input label="Kind (gold text)" value={p.caseKind} onChange={(v) => u({ caseKind: v })} /></div>
          <Textarea label="Description" value={p.desc} onChange={(v) => u({ desc: v })} />
          <div className="grid grid-cols-2 gap-3"><Input label="Client" value={p.client} onChange={(v) => u({ client: v })} /><Input label="Deliverables" value={p.deliverables} onChange={(v) => u({ deliverables: v })} /><Input label="Channels" value={p.channels} onChange={(v) => u({ channels: v })} />
            <div className="grid grid-cols-2 gap-2"><Input label="Impact" value={p.impact} onChange={(v) => u({ impact: v })} /><Input label="Impact label" value={p.impactLabel} onChange={(v) => u({ impactLabel: v })} /></div></div>
          <StringList label="Scope chips" items={p.scope || []} onChange={(v) => u({ scope: v })} /><Input label="Turnaround note" value={p.turnaround} onChange={(v) => u({ turnaround: v })} />
          <p className="text-xs font-bold uppercase text-mute">Gallery — الملف الأول بيظهر كبير</p>
          <ListEditor items={p.gallery || []} onChange={(v) => u({ gallery: v })} addLabel="Add gallery item" summary={(g) => g.title || 'Untitled'} make={() => ({ media: null, title: 'New item', meta: '', tag: '', note: '' })}
            render={(g, gu) => (<><MediaField label="File (image or video)" value={g.media} onChange={(v) => gu({ media: v })} /><Input label="Title" value={g.title} onChange={(v) => gu({ title: v })} /><Input label="Meta (gold, e.g. 00:15 MACRO)" value={g.meta} onChange={(v) => gu({ meta: v })} /><Input label="Tag (e.g. STILL)" value={g.tag} onChange={(v) => gu({ tag: v })} /><Input label="Note (big tile, right side)" value={g.note} onChange={(v) => gu({ note: v })} /></>)} />
        </div></details></>)} /></Card></div>);
}

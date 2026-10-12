'use client';
import { Card, Input, Textarea, Select, StringList, ListEditor } from '@/components/admin/ui';
export default function Services({ c, set }) {
  const s = c.services, p = c.provide;
  return (<div className="grid gap-5"><Card title="Services"><Input label="Eyebrow" value={s.eyebrow} onChange={(v) => set('services.eyebrow', v)} /><Input label="Title" value={s.title} onChange={(v) => set('services.title', v)} /><Textarea label="Subtitle" value={s.sub} onChange={(v) => set('services.sub', v)} />
    <ListEditor items={s.items} onChange={(v) => set('services.items', v)} summary={(i) => i.title} make={() => ({ icon: 'camera', title: 'NEW SERVICE', items: [] })} addLabel="Add service"
      render={(i, u) => (<><Input label="Title" value={i.title} onChange={(v) => u({ title: v })} /><Select label="Icon" value={i.icon} onChange={(v) => u({ icon: v })} options={['camera', 'video', 'sliders', 'design', 'star', 'bolt']} /><StringList label="Bullets" items={i.items} onChange={(v) => u({ items: v })} /></>)} /></Card>
    <Card title="What we provide"><Input label="Title" value={p.title} onChange={(v) => set('provide.title', v)} /><Input label="Gold subtitle" value={p.sub} onChange={(v) => set('provide.sub', v)} /><StringList label="Items" items={p.items} onChange={(v) => set('provide.items', v)} /><Input label="Location line" value={p.location} onChange={(v) => set('provide.location', v)} /></Card></div>);
}

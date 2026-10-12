'use client';
import { Card, Input, ListEditor } from '@/components/admin/ui';
import MediaField from '@/components/admin/MediaField';
export default function Hero({ c, set }) {
  const h = c.hero;
  return (<div className="grid gap-5"><Card title="Hero"><MediaField label="Hero image" kind="image" value={h.image} onChange={(v) => set('hero.image', v || { url: '/hero.jpg', type: 'image' })} hint="يفضل صورة طولية، عرض 1000px أو أكتر" />
    <Input label="Top-left badge" value={h.badge} onChange={(v) => set('hero.badge', v)} /><Input label="Bottom-right meta text" value={h.meta} onChange={(v) => set('hero.meta', v)} /><Input label="Pill text" value={h.pill} onChange={(v) => set('hero.pill', v)} />
    <div className="grid grid-cols-2 gap-3"><Input label="Title – white part" value={h.titleA} onChange={(v) => set('hero.titleA', v)} /><Input label="Title – purple part" value={h.titleB} onChange={(v) => set('hero.titleB', v)} /></div>
    <div className="grid grid-cols-2 gap-3"><Input label="Button 1" value={h.cta1} onChange={(v) => set('hero.cta1', v)} /><Input label="Button 2" value={h.cta2} onChange={(v) => set('hero.cta2', v)} /></div></Card>
    <Card title="Stats"><ListEditor items={c.stats} onChange={(v) => set('stats', v)} summary={(s) => `${s.value} — ${s.label}`} make={() => ({ value: '0', label: 'LABEL' })} addLabel="Add stat"
      render={(s, u) => (<><Input label="Value" value={s.value} onChange={(v) => u({ value: v })} /><Input label="Label" value={s.label} onChange={(v) => u({ label: v })} /></>)} /></Card></div>);
}

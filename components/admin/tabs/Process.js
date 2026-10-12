'use client';
import { Card, Input, Textarea, ListEditor } from '@/components/admin/ui';
export default function Process({ c, set }) {
  const p = c.process;
  return (<Card title="How we work"><Input label="Eyebrow" value={p.eyebrow} onChange={(v) => set('process.eyebrow', v)} /><Input label="Title" value={p.title} onChange={(v) => set('process.title', v)} /><Textarea label="Subtitle" value={p.sub} onChange={(v) => set('process.sub', v)} />
    <ListEditor items={p.steps} onChange={(v) => set('process.steps', v)} summary={(s) => s.title} make={() => ({ title: 'NEW STEP', text: '' })} addLabel="Add step" render={(s, u) => (<><Input label="Title" value={s.title} onChange={(v) => u({ title: v })} /><Textarea label="Text" value={s.text} onChange={(v) => u({ text: v })} /></>)} />
    <Input label="Bottom note" value={p.note} onChange={(v) => set('process.note', v)} /></Card>);
}

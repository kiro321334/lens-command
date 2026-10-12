'use client';
import { Card, Input, Textarea, ListEditor } from '@/components/admin/ui';
export default function Faq({ c, set }) {
  return (<Card title="Questions (FAQ)"><ListEditor items={c.faq} onChange={(v) => set('faq', v)} summary={(f) => f.q} make={() => ({ q: 'NEW QUESTION?', a: '' })} addLabel="Add question" render={(f, u) => (<><Input label="Question" value={f.q} onChange={(v) => u({ q: v })} /><Textarea label="Answer" value={f.a} onChange={(v) => u({ a: v })} /></>)} /></Card>);
}

'use client';
import { Card, Input, Textarea, StringList } from '@/components/admin/ui';
import MediaField from '@/components/admin/MediaField';
export default function Ugc({ c, set }) {
  const u = c.ugc;
  return (<Card title="UGC section"><MediaField label="UGC video (vertical 9:16)" kind="video" value={u.video} onChange={(v) => set('ugc.video', v)} hint="حد الفيديو المجاني 100MB" />
    <div className="grid grid-cols-2 gap-3"><Input label="Badge" value={u.badge} onChange={(v) => set('ugc.badge', v)} /><Input label="Side label (gold)" value={u.side} onChange={(v) => set('ugc.side', v)} /></div>
    <Textarea label="Title" value={u.title} onChange={(v) => set('ugc.title', v)} /><Textarea label="Text" value={u.text} onChange={(v) => set('ugc.text', v)} rows={4} />
    <div className="grid grid-cols-3 gap-3"><Input label="REC label" value={u.rec} onChange={(v) => set('ugc.rec', v)} /><Input label="Hook ratio" value={u.hook} onChange={(v) => set('ugc.hook', v)} /><Input label="Time" value={u.time} onChange={(v) => set('ugc.time', v)} /></div>
    <StringList label="Steps (4)" items={u.steps} onChange={(v) => set('ugc.steps', v)} /><Input label="Button text" value={u.cta} onChange={(v) => set('ugc.cta', v)} /></Card>);
}

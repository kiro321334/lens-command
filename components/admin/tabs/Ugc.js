'use client';
import { Card, Input, Textarea, Select, StringList } from '@/components/admin/ui';
import MediaField from '@/components/admin/MediaField';
const RATIOS = ['9/16', '4/5', '1/1', '16/9'];
export default function Ugc({ c, set }) {
  const u = c.ugc;
  return (<Card title="UGC section"><MediaField label="UGC media (image or video — optional)" kind="both" value={u.video} onChange={(v) => set('ugc.video', v)} hint="ارفع صورة أو فيديو، أو سيبها فاضية. الصورة بتظهر ثابتة، والفيديو بيتشغّل بالضغط (حتى 30MB و60 ثانية)." />
    <Select label="Media shape" value={u.ratio || '9/16'} onChange={(v) => set('ugc.ratio', v)} options={RATIOS} />
    <div className="grid grid-cols-2 gap-3"><Input label="Badge" value={u.badge} onChange={(v) => set('ugc.badge', v)} /><Input label="Side label (gold)" value={u.side} onChange={(v) => set('ugc.side', v)} /></div>
    <Textarea label="Title" value={u.title} onChange={(v) => set('ugc.title', v)} /><Textarea label="Text" value={u.text} onChange={(v) => set('ugc.text', v)} rows={4} />
    <div className="grid grid-cols-3 gap-3"><Input label="REC label" value={u.rec} onChange={(v) => set('ugc.rec', v)} /><Input label="Hook ratio" value={u.hook} onChange={(v) => set('ugc.hook', v)} /><Input label="Time" value={u.time} onChange={(v) => set('ugc.time', v)} /></div>
    <p className="text-xs text-mute">الحقول الثلاثة اللي فوق (REC / Hook / Time) لو فضّيتها بتختفي من على الميديا.</p>
    <StringList label="Steps (4)" items={u.steps} onChange={(v) => set('ugc.steps', v)} /><Input label="Button text" value={u.cta} onChange={(v) => set('ugc.cta', v)} /></Card>);
}

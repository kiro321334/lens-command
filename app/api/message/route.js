// يستقبل رسايل الفورم، يتحقق منها، ويحفظها في Firestore (collection: messages)
const hits = new Map();
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
export async function POST(req) {
  const b = await req.json().catch(() => null);
  if (!b) return Response.json({ error: 'bad_request' }, { status: 400 });
  if (b.website) return Response.json({ ok: true });                       // honeypot: بوت
  if (typeof b.t === 'number' && b.t < 1500) return Response.json({ ok: true }); // اتبعتت أسرع من الإنسان
  const name = clean(b.name, 100), phone = clean(b.phone, 30), scope = clean(b.scope, 100), brief = clean(b.brief, 2000);
  if (!name || phone.replace(/\D/g, '').length < 7) return Response.json({ error: 'invalid' }, { status: 422 });
  const pid = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!pid) return Response.json({ error: 'not_configured' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') || 'x').split(',')[0].trim(), now = Date.now();
  const arr = (hits.get(ip) || []).filter((x) => now - x < 600000);       // 5 رسايل كل 10 دقايق (على قد الإمكان)
  if (arr.length >= 5) return Response.json({ error: 'rate_limited' }, { status: 429 });
  hits.set(ip, [...arr, now]);
  const fields = { name: { stringValue: name }, phone: { stringValue: phone }, scope: { stringValue: scope }, brief: { stringValue: brief }, read: { booleanValue: false }, createdAt: { timestampValue: new Date().toISOString() } };
  const r = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/messages?key=${key}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }), cache: 'no-store' });
  if (!r.ok) return Response.json({ error: 'store_failed' }, { status: 502 });
  return Response.json({ ok: true });
}

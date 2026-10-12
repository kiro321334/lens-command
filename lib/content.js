import defaults from '@/lib/defaults';
import { merge } from '@/lib/merge';
// قراءة المحتوى من Firestore (REST) على السيرفر، مع كاش وإعادة تحقق عند الحفظ من الداشبورد
export async function getContent() {
  const pid = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!pid) return defaults;
  try {
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/site/content?key=${key}`, { next: { tags: ['content'], revalidate: 300 } });
    if (!r.ok) return defaults;
    const d = await r.json();
    const json = d.fields?.json?.stringValue;
    return json ? merge(defaults, JSON.parse(json)) : defaults;
  } catch { return defaults; }
}

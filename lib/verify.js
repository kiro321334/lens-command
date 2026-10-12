// يتأكد إن الطلب جاي من صاحب الداشبورد (Firebase ID token + ADMIN_UID)
export async function verifyAdmin(req) {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token || !process.env.ADMIN_UID) return false;
  try {
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: token }), cache: 'no-store' });
    if (!r.ok) return false;
    const d = await r.json();
    return d.users?.[0]?.localId === process.env.ADMIN_UID;
  } catch { return false; }
}

import crypto from 'node:crypto';
import { verifyAdmin } from '@/lib/verify';
export async function POST(req) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const { publicId, resourceType = 'image' } = await req.json().catch(() => ({}));
  if (!publicId) return Response.json({ error: 'publicId required' }, { status: 400 });
  const timestamp = Math.floor(Date.now() / 1000), secret = process.env.CLOUDINARY_API_SECRET;
  const signature = crypto.createHash('sha1').update(`public_id=${publicId}&timestamp=${timestamp}${secret}`).digest('hex');
  const body = new URLSearchParams({ public_id: publicId, timestamp: String(timestamp), api_key: process.env.CLOUDINARY_API_KEY, signature });
  const r = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType === 'video' ? 'video' : 'image'}/destroy`, { method: 'POST', body });
  return Response.json(await r.json().catch(() => ({})), { status: r.ok ? 200 : 502 });
}

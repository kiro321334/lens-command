import crypto from 'node:crypto';
import { verifyAdmin } from '@/lib/verify';
// توقيع رفع Cloudinary — متاح لصاحب الداشبورد فقط
export async function POST(req) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const { resourceType = 'image' } = await req.json().catch(() => ({}));
  const folder = 'lens-command', timestamp = Math.floor(Date.now() / 1000);
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) return Response.json({ error: 'Cloudinary env missing' }, { status: 500 });
  const signature = crypto.createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest('hex');
  return Response.json({ signature, timestamp, folder, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, resourceType: resourceType === 'video' ? 'video' : 'image' });
}

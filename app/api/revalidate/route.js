import { revalidatePath, revalidateTag } from 'next/cache';
import { verifyAdmin } from '@/lib/verify';
export async function POST(req) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'unauthorized' }, { status: 401 });
  revalidateTag('content'); revalidatePath('/');
  return Response.json({ ok: true });
}

import { load, save, normCode, isAdmin } from '@/lib/store';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Wrong password.' }, { status: 401 });
  const { code } = await req.json().catch(() => ({}));
  save(load().filter(g => g.code !== normCode(code)));
  return Response.json({ ok: true });
}

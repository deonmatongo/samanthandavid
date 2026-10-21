import { load, save, find, isAdmin } from '@/lib/store';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Wrong password.' }, { status: 401 });
  const { code } = await req.json().catch(() => ({}));
  const guests = load();
  const g = find(guests, code);
  if (g) { g.checkedInAt = null; save(guests); }
  return Response.json({ ok: true });
}

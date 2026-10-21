import { load, save, newCode, isAdmin } from '@/lib/store';
export const dynamic = 'force-dynamic';
const deny = () => Response.json({ error: 'Wrong password.' }, { status: 401 });

export async function GET(req) {
  if (!isAdmin(req)) return deny();
  return Response.json(load());
}
export async function POST(req) {
  if (!isAdmin(req)) return deny();
  const { guests: rows = [] } = await req.json().catch(() => ({}));
  const guests = load();
  const added = [];
  for (const r of rows) {
    const name = String(r.name || '').trim();
    if (!name) continue;
    const g = { name, email: String(r.email || '').trim(), code: newCode(guests), rsvp: null, checkedInAt: null };
    guests.push(g); added.push(g);
  }
  save(guests);
  return Response.json(added);
}

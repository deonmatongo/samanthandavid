import { load, save, find, isAdmin, isDemo, DEMO_GUEST } from '@/lib/store';
export const dynamic = 'force-dynamic';

// Usage #2 of the code: at the entrance, one time only.
export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Wrong password.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (isDemo(body.code)) return Response.json({ result: 'ok', name: `${DEMO_GUEST.name} (demo)`, at: new Date().toISOString() });
  const guests = load();
  const g = find(guests, body.code);
  if (!g) return Response.json({ result: 'invalid' }, { status: 404 });
  if (g.checkedInAt) return Response.json({ result: 'used', name: g.name, at: g.checkedInAt }, { status: 409 });
  if ((!g.rsvp || !g.rsvp.attending) && !body.force)
    return Response.json({ result: 'warn', name: g.name, rsvp: g.rsvp ? 'declined' : 'none' });
  g.checkedInAt = new Date().toISOString();
  save(guests);
  return Response.json({ result: 'ok', name: g.name, at: g.checkedInAt });
}

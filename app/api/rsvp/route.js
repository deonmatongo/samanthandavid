import { load, save, find, throttled, tooMany, RSVP_DEADLINE, isDemo, DEMO_GUEST } from '@/lib/store';
export const dynamic = 'force-dynamic';

// Usage #1 of the code. It can RSVP exactly once.
export async function POST(req) {
  if (throttled(req)) return tooMany();
  const body = await req.json().catch(() => ({}));
  if (isDemo(body.code) && typeof body.attending === 'boolean')
    return Response.json({ ok: true, ...DEMO_GUEST, attending: body.attending, demo: true });
  const guests = load();
  const g = find(guests, body.code);
  if (!g) return Response.json({ error: 'Invalid code.' }, { status: 404 });
  if (new Date() > RSVP_DEADLINE) return Response.json({ error: 'RSVPs closed on 14 November 2026.' }, { status: 403 });
  if (g.rsvp) return Response.json({ error: 'This code has already been used to RSVP.' }, { status: 409 });
  if (typeof body.attending !== 'boolean') return Response.json({ error: 'Please choose yes or no.' }, { status: 400 });
  g.rsvp = {
    attending: body.attending,
    dietary: String(body.dietary || '').slice(0, 300),
    message: String(body.message || '').slice(0, 1000),
    at: new Date().toISOString(),
  };
  save(guests);
  return Response.json({ ok: true, name: g.name, code: g.code, attending: g.rsvp.attending });
}

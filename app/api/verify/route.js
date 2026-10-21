import { load, find, throttled, tooMany, RSVP_DEADLINE, isDemo, DEMO_GUEST } from '@/lib/store';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (throttled(req)) return tooMany();
  const { code } = await req.json().catch(() => ({}));
  if (isDemo(code)) return Response.json({ ...DEMO_GUEST, rsvp: null, closed: false, demo: true });
  const g = find(load(), code);
  if (!g) return Response.json({ error: "We couldn't find that code. Please check your invitation email." }, { status: 404 });
  return Response.json({
    name: g.name, code: g.code,
    rsvp: g.rsvp ? { attending: g.rsvp.attending } : null,
    closed: new Date() > RSVP_DEADLINE,
  });
}

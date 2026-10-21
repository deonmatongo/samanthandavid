import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const RSVP_DEADLINE = new Date('2026-11-14T23:59:59+02:00');
const DATA_FILE = path.join(process.cwd(), 'data', 'guests.json');

export function load() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return []; }
}
export function save(guests) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(guests, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}
export const normCode = c => String(c || '').trim().toUpperCase().replace(/\s+/g, '');
export const find = (guests, code) => guests.find(g => g.code === normCode(code));

// "DS" + 4 digits, unique per guest
export function newCode(guests) {
  const taken = new Set(guests.map(g => g.code));
  if (taken.size >= 9000) throw new Error('Out of codes');
  let code;
  do { code = 'DS' + String(crypto.randomInt(1000, 10000)); } while (taken.has(code));
  return code;
}

export function isAdmin(req) {
  const given = Buffer.from(String(req.headers.get('x-admin-password') || ''));
  const real = Buffer.from(process.env.ADMIN_PASSWORD || 'change-me');
  return given.length === real.length && crypto.timingSafeEqual(given, real);
}

// naive per-IP throttle on code guessing
const attempts = new Map();
export function throttled(req) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const list = (attempts.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  list.push(now);
  attempts.set(ip, list);
  return list.length > 30;
}
export const tooMany = () => Response.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });

// Demo guest: DS0000 can be used again and again. It is never saved, and real codes start at DS1000.
export const DEMO_CODE = 'DS0000';
export const DEMO_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DEMO !== 'false';
export const DEMO_GUEST = { name: 'TEST USER', code: DEMO_CODE };
export const isDemo = code => DEMO_ENABLED && normCode(code) === DEMO_CODE;

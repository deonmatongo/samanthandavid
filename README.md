# Samantha & David: Wedding Site (Next.js)

## Run
    npm install
    # set a real password in .env.local  ->  ADMIN_PASSWORD=...
    npm run dev          # http://localhost:3000   admin: /admin
    npm run build && npm start   # production

## How codes work
- Add guests at `/admin` (`Name, email` per line). Each gets a unique code: `DS` + 4 digits.
- "Email invite" opens a pre-written email with the code and RSVP link.
- Use 1: guest enters the code on the site, RSVPs once (a second attempt is refused).
- Use 2: at the entrance, check the code in at `/admin`. A second check-in is refused.
- Guests live in `data/guests.json` (git-ignored). Back it up.

## Before going live
- Put real bank details in `components/Gift.js`.
- Add photos to `public/gallery` and swap the placeholders in `app/page.js`.
- Host on a server with a persistent disk (VPS, Railway/Render with a volume). Serverless hosts like Vercel can't keep `guests.json`.

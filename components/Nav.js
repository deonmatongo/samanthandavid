'use client';
import { useEffect, useState } from 'react';

const LINKS = [['Details', '#details'], ['Dress code', '#dress'], ['Travel', '#travel'], ['Gifting', '#gifting'], ['RSVP', '#rsvp']];

export default function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <nav className={`nav ${open ? 'open' : ''}`}>
      <a href="#top" className="logo" aria-label="Samantha and David, back to top" onClick={() => setOpen(false)}>
        <span className="mono">S<em>&amp;</em>D</span>
      </a>
      <button className="burger" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'}>
        <b /><b /><b />
      </button>
      <div id="menu" className="links">
        {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
      </div>
    </nav>
  );
}

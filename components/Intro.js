'use client';
import { useEffect, useState } from 'react';

// Shown on every visit. Tap the envelope: seal fades, flap opens, letter rises, then the home page is revealed.
export default function Intro() {
  const [state, setState] = useState('closed'); // closed | open | gone

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = state === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [state]);

  const openIt = () => {
    if (state !== 'closed') return;
    setState('open');
    setTimeout(() => { window.scrollTo(0, 0); setState('gone'); }, 2900);
  };

  return (
    <div className={`intro ${state}`} aria-hidden={state === 'gone'}>
      <div className="tag">
        <div className="eyebrow">You are invited</div>
        <div className="script">Samantha &amp; David</div>
      </div>
      <button className="env" onClick={openIt} aria-label="Open the invitation" tabIndex={state === 'gone' ? -1 : 0}>
        <span className="back" />
        <span className="letter">
          <span className="eyebrow">Together with our families</span>
          <span className="script">Samantha<br />&amp; David</span>
          <span className="date">21 · 12 · 2026</span>
        </span>
        <span className="pocket pl" /><span className="pocket pr" /><span className="pocket pb" />
        <span className="flap" />
        <span className="seal">S&amp;D</span>
      </button>
      <div className="hint">Tap the envelope to open</div>
    </div>
  );
}

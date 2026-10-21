'use client';
import { useState } from 'react';

// Fill in your real details here before going live.
const DETAILS = [
  ['Account name', 'Samantha & David — TO BE ADDED'],
  ['Bank', 'TO BE ADDED'],
  ['Account number', 'TO BE ADDED'],
  ['Reference', 'Your name'],
];

export default function Gift() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="cta" onClick={() => setOpen(o => !o)}>{open ? 'Hide' : 'Gifting details'}</button>
      {open && (
        <div className="panel" style={{ color: 'var(--ink)', textAlign: 'left' }}>
          <ul className="facts" style={{ marginTop: 0 }}>
            {DETAILS.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
          </ul>
          <p className="note">Prefer a cash gift on the day? That is warmly welcome too.</p>
        </div>
      )}
    </div>
  );
}

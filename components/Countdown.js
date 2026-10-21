'use client';
import { useEffect, useState } from 'react';

const TARGET = new Date('2026-12-21T12:00:00+02:00').getTime();

export default function Countdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return <div className="count" style={{ height: 80 }} />;
  const d = Math.max(0, TARGET - now);
  const parts = [['Days', Math.floor(d / 864e5)], ['Hours', Math.floor(d / 36e5) % 24], ['Minutes', Math.floor(d / 6e4) % 60], ['Seconds', Math.floor(d / 1e3) % 60]];
  return (
    <div className="count" aria-label="Countdown to the wedding">
      {parts.map(([l, v]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><span>{l}</span></div>)}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';

const PHOTOS = [
  { src: '/gallery/1.jpeg', caption: 'Hand in hand', alt: 'Two hands reaching for each other, a ring catching the light' },
  { src: '/gallery/2.jpeg', caption: 'Running toward forever', alt: 'Samantha and David running across the lawn holding hands' },
  { src: '/gallery/3.jpeg', caption: 'Every step with you', alt: 'Samantha and David walking hand in hand across a stone terrace' },
];

export default function Gallery() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const onKey = e => {
      if (open === null) return;
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen(o => (o + 1) % PHOTOS.length);
      if (e.key === 'ArrowLeft') setOpen(o => (o + PHOTOS.length - 1) % PHOTOS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="polaroids">
        {PHOTOS.map((p, i) => (
          <button key={p.src} className={`polaroid p${i}`} onClick={() => setOpen(i)} aria-label={`Enlarge: ${p.caption}`}>
            <img src={p.src} alt={p.alt} loading="lazy" />
            <span className="script">{p.caption}</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="lb-nav prev" onClick={e => { e.stopPropagation(); setOpen((open + PHOTOS.length - 1) % PHOTOS.length); }} aria-label="Previous">‹</button>
          <figure onClick={e => e.stopPropagation()}>
            <img src={PHOTOS[open].src} alt={PHOTOS[open].alt} />
            <figcaption className="script">{PHOTOS[open].caption}</figcaption>
          </figure>
          <button className="lb-nav next" onClick={e => { e.stopPropagation(); setOpen((open + 1) % PHOTOS.length); }} aria-label="Next">›</button>
          <button className="lb-close" onClick={() => setOpen(null)} aria-label="Close">×</button>
        </div>
      )}
    </>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

const TITLE = 'Wedding of Samantha & David';
const WHERE = 'The Nest At Thirty, 30 Domboshawa Rd, Harare, Zimbabwe';
const DETAILS = 'Please be seated by 11:30 AM for a 12:00 PM start. Dress code: formal, ladies in rich shades of brown, gentlemen in brown or classic black. Bring your invitation code to the entrance.';
// 12:00-22:00 SAST (UTC+2) = 10:00-20:00 UTC
const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(TITLE)}&dates=20261221T100000Z/20261221T200000Z&details=${encodeURIComponent(DETAILS)}&location=${encodeURIComponent(WHERE)}`;
const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(TITLE)}&startdt=2026-12-21T10:00:00Z&enddt=2026-12-21T20:00:00Z&location=${encodeURIComponent(WHERE)}&body=${encodeURIComponent(DETAILS)}`;

export default function AddToCalendar({ align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, []);
  return (
    <div className={`cal ${align}`} ref={ref}>
      <button className="cal-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="menu">Add to calendar</button>
      {open && (
        <div className="cal-menu" role="menu">
          <a role="menuitem" href="/wedding.ics" download="Samantha-and-David-wedding.ics" onClick={() => setOpen(false)}>Apple / iCal</a>
          <a role="menuitem" href={google} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Google</a>
          <a role="menuitem" href={outlook} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Outlook</a>
        </div>
      )}
    </div>
  );
}

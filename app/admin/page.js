'use client';
import { useEffect, useMemo, useState } from 'react';

export default function Admin() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [guests, setGuests] = useState([]);
  const [paste, setPaste] = useState('');
  const [door, setDoor] = useState('');
  const [doorRes, setDoorRes] = useState(null);
  const [err, setErr] = useState('');

  const call = async (url, body) => {
    const r = await fetch(url, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', 'x-admin-password': pw }, body: body && JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, data };
  };
  const refresh = async () => {
    const { ok, data } = await call('/api/admin/guests');
    if (!ok) { setErr(data.error || 'Error'); setAuthed(false); return; }
    setErr(''); setAuthed(true); setGuests(data);
  };

  useEffect(() => { try { const p = sessionStorage.getItem('adminpw'); if (p) setPw(p); } catch {} }, []);
  useEffect(() => { if (pw && !authed && sessionStorage.getItem('adminpw') === pw) refresh(); }, [pw]); // eslint-disable-line

  const login = async e => { e.preventDefault(); try { sessionStorage.setItem('adminpw', pw); } catch {} await refresh(); };

  const addGuests = async () => {
    const rows = paste.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
      const [name, email] = l.split(/[,;\t]/).map(s => s.trim());
      return { name, email };
    });
    await call('/api/admin/guests', { guests: rows });
    setPaste(''); refresh();
  };
  const del = async g => { if (confirm(`Delete ${g.name}?`)) { await call('/api/admin/delete', { code: g.code }); refresh(); } };

  const checkin = async (force = false) => {
    const { data } = await call('/api/admin/checkin', { code: door, force });
    setDoorRes(data);
    if (data.result === 'ok') { setDoor(''); refresh(); }
  };
  const undo = async code => { await call('/api/admin/undo', { code }); refresh(); };

  const stats = useMemo(() => ({
    total: guests.length,
    yes: guests.filter(g => g.rsvp?.attending).length,
    no: guests.filter(g => g.rsvp && !g.rsvp.attending).length,
    waiting: guests.filter(g => !g.rsvp).length,
    in: guests.filter(g => g.checkedInAt).length,
  }), [guests]);

  const mailto = g => {
    const url = `${location.origin}/#rsvp`;
    const body = `Dear ${g.name.split(' ')[0]},\n\nWith joy, we invite you to the wedding of Samantha & David on Monday, 21 December 2026 at The Nest At Thirty, Harare.\n\nYour personal invitation code is: ${g.code}\n\nPlease RSVP by 14 November 2026 at:\n${url}\n\nKeep your code safe. It lets you RSVP once, and you'll present it again at the entrance on the day.\n\nWith love,\nSamantha & David`;
    return `mailto:${g.email}?subject=${encodeURIComponent("You're invited: Samantha & David's Wedding")}&body=${encodeURIComponent(body)}`;
  };

  const csv = () => {
    const rows = [['Name', 'Email', 'Code', 'RSVP', 'Dietary', 'Message', 'Checked in']].concat(guests.map(g => [g.name, g.email, g.code, g.rsvp ? (g.rsvp.attending ? 'Yes' : 'No') : '', g.rsvp?.dietary || '', g.rsvp?.message || '', g.checkedInAt || '']));
    const text = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
    a.download = 'guests.csv'; a.click();
  };

  if (!authed) return (
    <div className="admin" style={{ maxWidth: 420, paddingTop: '20vh' }}>
      <h1>Admin</h1>
      <form onSubmit={login} className="box">
        <label className="f" htmlFor="pw" style={{ marginTop: 0 }}>Password</label>
        <input id="pw" className="t" type="password" value={pw} onChange={e => setPw(e.target.value)} />
        {err && <p className="err">{err}</p>}
        <button className="btn" style={{ marginTop: '1rem' }}>Enter</button>
      </form>
    </div>
  );

  return (
    <div className="admin">
      <h1>Samantha &amp; David · Guest list</h1>
      <div className="box stats">
        {[['Invited', stats.total], ['Attending', stats.yes], ['Declined', stats.no], ['No reply', stats.waiting], ['Arrived', stats.in]].map(([l, v]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
      </div>

      <div className="box">
        <h3>Entrance check-in</h3>
        <form onSubmit={e => { e.preventDefault(); checkin(); }} style={{ display: 'flex', gap: '.6rem', marginTop: '.8rem', flexWrap: 'wrap' }}>
          <input className="t" style={{ maxWidth: 220, textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '.15em' }} value={door} onChange={e => { setDoor(e.target.value); setDoorRes(null); }} placeholder="DS0000" maxLength={6} />
          <button className="btn">Check in</button>
        </form>
        {doorRes?.result === 'ok' && <div className="door ok">✓ Welcome, {doorRes.name}</div>}
        {doorRes?.result === 'invalid' && <div className="door bad">✕ Code not found</div>}
        {doorRes?.result === 'used' && <div className="door bad">✕ {doorRes.name}'s code was already used at {new Date(doorRes.at).toLocaleTimeString()}</div>}
        {doorRes?.result === 'warn' && (
          <div className="door warn">
            {doorRes.name} {doorRes.rsvp === 'declined' ? 'declined the invitation' : 'has not RSVP’d'}.<br />
            <button className="btn sm" onClick={() => checkin(true)}>Let in anyway</button>
          </div>
        )}
      </div>

      <div className="box">
        <h3>Add guests</h3>
        <p className="note">One per line: <code>Name, email</code>. Codes (DS + 4 digits) are generated automatically.</p>
        <textarea rows={4} value={paste} onChange={e => setPaste(e.target.value)} placeholder={'Deon Matongo, deon@example.com\nJane Doe, jane@example.com'} style={{ marginTop: '.6rem' }} />
        <div style={{ display: 'flex', gap: '.6rem', marginTop: '.8rem' }}>
          <button className="btn" onClick={addGuests} disabled={!paste.trim()}>Generate codes</button>
          <button className="btn ghost" onClick={csv}>Export CSV</button>
        </div>
      </div>

      <div className="box scroll">
        <table>
          <thead><tr><th>Guest</th><th>Code</th><th>RSVP</th><th>Entrance</th><th></th></tr></thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.code}>
                <td><b style={{ fontWeight: 500 }}>{g.name}</b><br /><small>{g.email}</small>{g.rsvp?.dietary && <><br /><small>🍽 {g.rsvp.dietary}</small></>}{g.rsvp?.message && <><br /><small>“{g.rsvp.message}”</small></>}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{g.code}</td>
                <td>{g.rsvp ? <span className={`pill ${g.rsvp.attending ? 'yes' : 'no'}`}>{g.rsvp.attending ? 'Attending' : 'Declined'}</span> : <span className="pill">Waiting</span>}</td>
                <td>{g.checkedInAt ? <span className="pill in" title="Click to undo" onClick={() => undo(g.code)} style={{ cursor: 'pointer' }}>Arrived</span> : '—'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {g.email && <a className="btn sm ghost" href={mailto(g)} style={{ textDecoration: 'none' }}>Email invite</a>}{' '}
                  <button className="btn sm ghost" onClick={() => del(g)}>✕</button>
                </td>
              </tr>
            ))}
            {!guests.length && <tr><td colSpan={5} className="note">No guests yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

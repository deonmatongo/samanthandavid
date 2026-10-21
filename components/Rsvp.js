'use client';
import { useState } from 'react';
import AddToCalendar from './AddToCalendar';

const DEMO = process.env.NEXT_PUBLIC_ENABLE_DEMO !== 'false';

async function post(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export default function Rsvp() {
  const [step, setStep] = useState('code'); // code | form | done
  const [code, setCode] = useState('');
  const [guest, setGuest] = useState(null);
  const [attending, setAttending] = useState(null);
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async fn => { setErr(''); setBusy(true); try { await fn(); } catch (e) { setErr(e.message); } setBusy(false); };

  const verify = e => { e.preventDefault(); run(async () => {
    const g = await post('/api/verify', { code });
    setGuest(g);
    setStep(g.rsvp ? 'done' : 'form');
  }); };

  const submit = e => { e.preventDefault(); run(async () => {
    if (attending === null) throw new Error('Please let us know if you can join us.');
    const r = await post('/api/rsvp', { code: guest.code, attending, dietary, message });
    setGuest(g => ({ ...g, rsvp: { attending: r.attending } }));
    setStep('done');
  }); };

  const first = guest?.name?.split(' ')[0];

  return (
    <div className="panel">
      {step === 'code' && (
        <form onSubmit={verify} className="center">
          <div className="eyebrow">Step one</div>
          <p style={{ margin: '.6rem 0 1.4rem' }}>Enter the code from your invitation email.</p>
          <input className="code-input" value={code} onChange={e => setCode(e.target.value)} placeholder="DS0000" maxLength={6} autoComplete="off" aria-label="Invitation code" />
          {err && <p className="err" role="alert">{err}</p>}
          {DEMO && <p className="demo-hint">Want to try it out? Use the demo code <b>DS0000</b>.</p>}
          <button className="cta solid" disabled={busy || code.trim().length < 6}>{busy ? 'Checking…' : 'Find my invitation'}</button>
        </form>
      )}

      {step === 'form' && (
        <form onSubmit={submit}>
          <div className="center">
            <div className="hello">Welcome, {first}</div>
            <p className="note">Your code works for one RSVP, then once more at the entrance. Please choose carefully.</p>
          </div>
          <label className="f">Will you be joining us?</label>
          <div className="choices">
            <button type="button" className={`choice ${attending === true ? 'on' : ''}`} onClick={() => setAttending(true)}>Joyfully accepts<small>I'll be there</small></button>
            <button type="button" className={`choice ${attending === false ? 'on' : ''}`} onClick={() => setAttending(false)}>Regretfully declines<small>I can't make it</small></button>
          </div>
          {attending && (<>
            <label className="f" htmlFor="d">Dietary requirements (optional)</label>
            <input id="d" className="t" value={dietary} onChange={e => setDietary(e.target.value)} maxLength={300} />
          </>)}
          <label className="f" htmlFor="m">A message for the couple (optional)</label>
          <textarea id="m" rows={3} value={message} onChange={e => setMessage(e.target.value)} maxLength={1000} />
          {err && <p className="err" role="alert">{err}</p>}
          <div className="center"><button className="cta solid" disabled={busy}>{busy ? 'Sending…' : 'Send my RSVP'}</button></div>
        </form>
      )}

      {step === 'done' && (
        <div className="center">
          {guest.rsvp.attending ? (<>
            <div className="hello">See you there, {first}!</div>
            <p style={{ marginTop: '.6rem' }}>Your RSVP is in. This is your entrance pass. Show this code at the gate on the day.</p>
            <div className="pass"><div className="s">Entrance code</div><div className="c">{guest.code}</div><div className="s">{guest.name}</div></div>
            <p className="note">Keep this code safe. It can be used once at the entrance.</p>
            <AddToCalendar align="center" />
          </>) : (<>
            <div className="hello">We'll miss you, {first}</div>
            <p style={{ marginTop: '.6rem' }}>Thank you for letting us know. You'll be in our hearts on the day.</p>
          </>)}
        </div>
      )}
    </div>
  );
}

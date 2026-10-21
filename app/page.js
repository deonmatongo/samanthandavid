import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Countdown from '@/components/Countdown';
import Petals from '@/components/Petals';
import Reveal from '@/components/Reveal';
import Rsvp from '@/components/Rsvp';
import Gift from '@/components/Gift';
import Gallery from '@/components/Gallery';
import AddToCalendar from '@/components/AddToCalendar';

const stays = [
  { name: 'Tuli House Boutique Lodge', img: '/stays/tuli-house.jpeg', pos: '50% 70%', addr: '60 Knightsbridge Road, Harare', href: 'https://www.google.com/search?q=Tuli+House+Boutique+Lodge+Harare' },
  { name: '19 On Bay Noakes', img: '/stays/bay-noakes.jpeg', addr: '19 Bay Noakes Rd, Harare', href: 'https://www.google.com/search?q=19+On+Bay+Noakes+Harare' },
  { name: 'Cresta Lodge Harare', img: '/stays/cresta-lodge.jpeg', addr: 'A5, Harare', href: 'https://www.google.com/search?q=Cresta+Lodge+Harare' },
];
const details = [
  ['✦', 'Guests', 'As we are having an intimate celebration, we can only accommodate the guests named on the invitation. We kindly ask that no additional plus ones are added.'],
  ['❀', 'Adults only', 'Children bring so much joy to our lives, however, we have chosen to make our wedding an adults-only celebration. We truly appreciate your understanding.'],
  ['◷', 'Arrival time', 'Please arrive and be seated by 11:30 AM for a 12:00 PM start.'],
  ['⌂', 'Parking & security', 'Parking is available on-site. Please enter through the designated gate and avoid parking along the roadside. Security will be present to keep guests and vehicles safe.'],
];
const swatches = ['#3b2418', '#5a3a28', '#7a4e36', '#9a6b4b', '#b88a5c', '#000000'];

export default function Home() {
  return (
    <main id="top">
      <Intro />
      <Nav />

      <header className="hero">
        <Petals />
        <svg className="ribbons back" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="sat" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" /><stop offset=".45" stopColor="#e6eef5" /><stop offset=".6" stopColor="#ffffff" /><stop offset="1" stopColor="#dbe7f1" />
            </linearGradient>
            <filter id="rs" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#173b5c" floodOpacity=".22" /></filter>
          </defs>
          <g filter="url(#rs)" fill="none" strokeLinecap="round">
            <path d="M-60 880 C 180 640, 360 520, 520 640 S 640 800, 560 700" stroke="url(#sat)" strokeWidth="64" />
            <path d="M1500 120 C 1280 40, 1120 40, 1060 150 S 1180 330, 1330 300 S 1420 470, 1520 540" stroke="url(#sat)" strokeWidth="58" />
          </g>
        </svg>
        <div className="liner" />
        <div className="hero-grid">
          <div className="hero-inner">
            <div className="eyebrow">With joy, we invite you to our wedding</div>
            <h1 className="names">Samantha<small>&amp;</small>David</h1>
            <p className="hero-date">Monday, 21 December 2026</p>
            <p className="hero-place">The Nest At Thirty · Harare, Zimbabwe</p>
            <Countdown />
            <a className="cta solid" href="#rsvp">RSVP</a>
          </div>
          <div className="photo-card">
            <img src="/hero.jpg" alt="Samantha and David holding hands beneath the trees" />
            <svg className="ribbons front" viewBox="0 0 400 200" aria-hidden="true">
              <defs><filter id="rs2" x="-20%" y="-30%" width="140%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#173b5c" floodOpacity=".3" /></filter></defs>
              <path d="M-20 170 C 80 120, 160 190, 260 110 S 380 60, 430 20" fill="none" stroke="url(#sat)" strokeWidth="38" strokeLinecap="round" filter="url(#rs2)" />
            </svg>
          </div>
        </div>
      </header>

      <section id="details">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow">The celebration</div>
            <h2>Love, commitment &amp; the start of forever</h2>
            <p className="lead">Join us as we celebrate love, commitment, and the start of forever.</p>
          </Reveal>
          <div className="two" style={{ marginTop: '3.5rem' }}>
            <Reveal className="venue-art"><div className="big">The Nest<br />at Thirty</div></Reveal>
            <Reveal delay={150}>
              <div className="eyebrow">When &amp; where</div>
              <h2 style={{ marginBottom: 0 }}>21 December</h2>
              <ul className="facts">
                <li><b>Date</b><span>Monday, 21 December 2026</span></li>
                <li><b>Time</b><span>12:00 PM – 10:00 PM (SAST)<br />Be seated by 11:30 AM</span></li>
                <li><b>Venue</b><span>The Nest At Thirty<br />30 Domboshawa Rd, Harare, Harare Province</span></li>
                <li><b>Contact</b><span>Samantha: <a href="tel:+48579213831">+48 579 213 831</a><br />David: <a href="tel:+48739439598">+48 739 439 598</a></span></li>
              </ul>
              <a className="cta solid" href="https://www.google.com/maps/search/?api=1&query=The+Nest+At+Thirty+30+Domboshawa+Rd+Harare" target="_blank" rel="noreferrer">Open in maps</a>
              <AddToCalendar />
            </Reveal>
          </div>
          <div className="grid">
            {details.map(([i, t, p], n) => (
              <Reveal key={t} className="card" delay={n * 100}><div className="icon">{i}</div><h3>{t}</h3><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="dress" className="band center">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Dress code</div>
            <h2>Formal, in shades of brown</h2>
            <p className="lead">We invite you to embrace formal attire: the ladies in shades of rich brown, and the gentlemen in shades of brown or classic black.</p>
            <div className="swatches">{swatches.map(c => <div key={c} className="swatch" style={{ background: c }} />)}</div>
            <div className="swatch-label">Our palette</div>
          </Reveal>
        </div>
      </section>

      <section id="travel">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow">Traveling from abroad</div>
            <h2>Getting to Harare</h2>
            <p className="lead">Guests traveling from outside the country need a visa, either on arrival or in advance. Please fly into <b style={{ fontWeight: 500 }}>Robert Gabriel Mugabe International Airport (HRE)</b>. We're happy to help with any questions.</p>
            <a className="cta solid" href="https://evisa.gov.zw" target="_blank" rel="noreferrer">evisa.gov.zw</a>
          </Reveal>
          <Reveal className="center" >
            <div className="divider">✦</div>
            <div className="eyebrow">Accommodation</div>
            <h2>Where to stay</h2>
            <p className="lead">For guests requiring accommodation, please contact us directly about your booking, as we are coordinating with selected facilities. Prefer an Airbnb? Let us know and we'll recommend a few options.</p>
          </Reveal>
          <div className="grid">
            {stays.map((s, n) => (
              <Reveal key={s.name} className="card stay" delay={n * 100}>
                <div className="stay-img">{s.img ? <img src={s.img} alt={s.name} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} /> : <span className="script">T</span>}</div>
                <h3>{s.name}</h3><p>{s.addr}</p>
                <a href={s.href} target="_blank" rel="noreferrer">Open website →</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gifting" className="band center">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Gifting</div>
            <h2>Your presence is the greatest gift</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>Having you celebrate with us is the greatest gift of all. Should you wish to honour us, you are welcome to contribute towards our future together through a bank transfer or a cash gift. Any gesture, big or small, will be sincerely appreciated.</p>
            <Gift />
          </Reveal>
        </div>
      </section>

      <section id="gallery">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow">Photo gallery</div>
            <h2>Us, so far</h2>
          </Reveal>
          <Reveal><Gallery /></Reveal>
        </div>
      </section>

      <section id="rsvp" className="rsvp center">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">Kindly reply by 14 November 2026</div>
            <h2>RSVP</h2>
            <p className="lead">As we prepare for our celebration, we kindly ask that all responses are received by the deadline. Any outstanding RSVPs after this date will be taken as a confirmation that you are unable to attend.</p>
          </Reveal>
          <Rsvp />
        </div>
      </section>

      <footer>
        <div className="script">Samantha &amp; David</div>
        <p>21 · 12 · 2026 · Harare</p>
        <p style={{ marginTop: '.8rem', textTransform: 'none', letterSpacing: 0 }}>Thank you for being part of this special chapter of our lives.</p>
      </footer>
    </main>
  );
}

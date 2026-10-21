export default function Petals() {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    left: `${(i * 37) % 100}%`, dur: `${11 + (i * 7) % 9}s`, delay: `${-(i * 5) % 14}s`, s: 0.6 + ((i * 13) % 10) / 14,
  }));
  return petals.map((p, i) => (
    <span key={i} className="petal" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay, transform: `scale(${p.s})` }} />
  ));
}

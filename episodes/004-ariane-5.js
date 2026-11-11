// Rocket glyph, nose at (x, y), pointing up before rotation.
function rocket(h, x, y, o = {}) {
  const { C } = h, col = o.color || C.ink, f = o.flame ?? 1;
  return h.g(
    `<path d="M0 0 Q26 40 26 90 L26 300 L-26 300 L-26 90 Q-26 40 0 0Z" fill="${C.panel}" stroke="${col}" stroke-width="6"/>` +
    h.rect(-58, 130, 26, 190, { stroke: col, w: 5, fill: C.panel, r: 8 }) + h.rect(32, 130, 26, 190, { stroke: col, w: 5, fill: C.panel, r: 8 }) +
    (f ? `<path d="M-22 304 L0 ${304 + 120 * f} L22 304Z" fill="${C.warn}" opacity=".9"/>` +
      `<path d="M-56 322 L-45 ${322 + 80 * f} L-34 322Z" fill="${C.warn}" opacity=".8"/><path d="M34 322 L45 ${322 + 80 * f} L56 322Z" fill="${C.warn}" opacity=".8"/>` : ''),
    { transform: `translate(${x} ${y}) rotate(${o.rot || 0} 0 150) scale(${o.s || 1})`, opacity: o.opacity ?? 1 });
}
const clock = (h, s, col) => h.tag(500, 100, 'T+ ' + String(Math.floor(s)).padStart(2, '0') + ' s', { size: 46, color: col || h.C.line });

export default {
  id: '004',
  case: 'ARIANE 5 · FLIGHT 501',
  year: 'KOUROU · 1996',
  hook: ['37 SECONDS.', 'ONE NUMBER TOO BIG.'],
  title: 'A number too big for 16 bits destroyed this rocket',
  description: 'The first Ariane 5 was lost 37 seconds into flight on June 4, 1996. A 64-bit floating point value was converted to a 16-bit signed integer and overflowed, in code reused from Ariane 4.',
  tags: ['space', 'ariane5', 'softwarebugs', 'engineeringfailure', 'programming', 'shorts'],
  sources: [
    'Wikipedia, "Ariane flight V88" — https://en.wikipedia.org/wiki/Ariane_flight_V88 (retrieved November 2026)',
    'J. L. Lions et al., "Ariane 5 Flight 501 Failure: Report by the Inquiry Board" (Paris, July 19, 1996) — the inquiry cited there',
  ],
  scenes: [
    {
      say: 'This rocket was lost {37|thirty-seven} seconds into its first flight, because one number was too big.',
      draw: (h, p, t) => clock(h, Math.min(37, t * 9), t * 9 >= 37 ? h.C.bad : h.C.line) +
        rocket(h, 500, 700 - Math.min(1, t / 4.1) * 480, { flame: 1 + .2 * Math.sin(t * 40), rot: t > 4.1 ? (t - 4.1) * 40 : 0, color: t > 4.1 ? h.C.bad : h.C.ink, s: .9 }),
    },
    {
      say: '{June 4th,|June fourth,} {1996.|nineteen ninety-six.} The first Ariane {5|five} lifts off, carrying four Cluster research satellites.',
      draw: (h, p, t) => {
        let sats = '';
        for (let i = 0; i < 4; i++) sats += h.g(h.circle(0, 0, 36, { stroke: h.C.line, w: 5, fill: h.C.panel }) + h.line(-58, 0, 58, 0, { stroke: h.C.line, w: 4 }),
          { transform: `translate(${700 + (i % 2) * 150} ${330 + Math.floor(i / 2) * 150})`, opacity: h.win(t, 4.6 + i * .3, 5 + i * .3) });
        return rocket(h, 300, 330 - h.win(t, 2.5, 9) * 120, { flame: t > 2.5 ? 1 + .2 * Math.sin(t * 40) : 0 }) + h.line(120, 660, 480, 660, { stroke: h.C.dim, w: 6, opacity: 1 - h.win(t, 2.5, 4) }) +
          sats + h.text(775, 620, '4 × CLUSTER', { size: 34, mono: true, fill: h.C.line, opacity: h.win(t, 5.4, 6) }) +
          h.text(775, 668, 'SATELLITES', { size: 34, mono: true, fill: h.C.line, opacity: h.win(t, 5.4, 6) });
      },
    },
    {
      say: 'Part of its guidance software was reused from the older Ariane {4.|four.} But Ariane {5|five} flew a different path, with much higher horizontal velocity early in the flight.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 1, 3.4), b = h.win(t, 5.4, 8.4);
        return h.line(120, 760, 120, 180, { stroke: C.faint, w: 4 }) + h.line(120, 760, 900, 760, { stroke: C.faint, w: 4 }) +
          h.text(510, 830, 'HORIZONTAL DISTANCE', { size: 26, mono: true, fill: C.dim, ls: 4 }) + h.text(80, 470, 'ALTITUDE', { size: 26, mono: true, fill: C.dim, ls: 4, rot: -90 }) +
          h.path('M120 760 Q170 380 420 200', { stroke: C.dim, w: 7, draw: a }) + h.text(440, 190, 'ARIANE 4', { size: 32, mono: true, fill: C.dim, anchor: 'start', opacity: a }) +
          h.path('M120 760 Q330 500 860 380', { stroke: C.warn, w: 8, draw: b }) + h.text(860, 350, 'ARIANE 5', { size: 32, mono: true, fill: C.warn, anchor: 'end', opacity: b }) +
          h.text(510, 120, 'FLIGHT PATHS · SCHEMATIC', { size: 26, mono: true, fill: C.faint, ls: 4 });
      },
    },
    {
      say: 'A value called horizontal bias was converted from a {64-bit|sixty-four bit} floating point number into a {16-bit|sixteen bit} signed integer. The largest value that fits is {32,767.|thirty-two thousand, seven hundred and sixty-seven.} It overflowed.',
      draw: (h, p, t) => {
        const { C } = h, grow = h.win(t, 9, 14.2), v = Math.round(h.lerp(9000, 41000, grow)), over = v > 32767;
        let bits = '';
        for (let i = 0; i < 16; i++) bits += h.rect(108 + i * 49, 440, 44, 64, { stroke: over ? C.bad : C.line, w: 3, r: 6, fill: (v >> (15 - i)) & 1 ? (over ? C.bad : C.line) : C.panel, opacity: h.win(t, 4.4 + i * .05, 4.8 + i * .05) });
        return h.text(500, 150, 'HORIZONTAL BIAS (BH)', { size: 30, mono: true, fill: C.dim, ls: 4 }) +
          h.tag(300, 260, '64-BIT FLOAT', { size: 34, color: C.ink, opacity: h.win(t, 2, 2.5) }) + h.arrow(450, 262, 540, 262, { draw: h.win(t, 3.6, 4.2), stroke: C.ink }) +
          h.tag(710, 260, '16-BIT INT', { size: 34, opacity: h.win(t, 4.2, 4.7) }) + bits +
          h.g(h.text(500, 640, h.fmt(v), { size: 130, weight: 900, fill: over ? C.bad : C.ink, mono: true }) + h.text(500, 700, 'MAX 32,767', { size: 32, mono: true, fill: C.warn }) + h.text(500, 742, 'ILLUSTRATIVE VALUES', { size: 20, mono: true, fill: C.faint, ls: 3 }), { opacity: h.win(t, 8.6, 9.2) }) +
          h.tag(500, 830, 'OVERFLOW', { size: 46, solid: true, color: C.bad, opacity: over ? 1 : 0 });
      },
    },
    {
      say: 'The error shut down the inertial reference system. The backup ran the same software, so it failed the same way.',
      draw: (h, p, t) => {
        const { C } = h;
        const unit = (x, name, dead, k) => h.g(h.rect(x - 180, 260, 360, 300, { stroke: dead ? C.bad : C.ok, w: 6, r: 16, fill: C.panel }) +
          h.text(x, 330, name, { size: 30, mono: true, fill: C.dim }) + h.text(x, 420, 'INERTIAL', { size: 40, weight: 900 }) + h.text(x, 470, 'REFERENCE', { size: 40, weight: 900 }) +
          h.text(x, 530, dead ? 'HALTED' : 'RUNNING', { size: 30, mono: true, fill: dead ? C.bad : C.ok }), { opacity: k });
        return unit(270, 'PRIMARY', t > 1.2, 1) + unit(730, 'BACKUP', t > 5.2, 1) +
          h.tag(500, 680, 'SAME SOFTWARE · SAME FAILURE', { color: C.bad, opacity: h.win(t, 5.4, 6) });
      },
    },
    {
      say: 'And the code that failed served no purpose after liftoff on Ariane {5.|five.}',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, .4, 2.4);
        return h.line(100, 450, 900, 450, { stroke: C.faint, w: 6 }) + h.text(140, 520, 'LIFTOFF', { size: 26, mono: true, fill: C.dim }) + h.line(140, 420, 140, 480, { stroke: C.ink, w: 6 }) +
          h.rect(140, 380, 520 * k, 50, { fill: C.bad, r: 8, opacity: .85 }) + h.text(400, 350, 'ALIGNMENT FUNCTION STILL RUNNING', { size: 28, mono: true, fill: C.bad, opacity: k }) +
          h.line(660, 420, 660, 480, { stroke: C.bad, w: 6, opacity: k }) + h.text(660, 520, '≈ 40 s', { size: 30, mono: true, fill: C.bad, opacity: k }) +
          h.stat(500, 720, 'NOT NEEDED', 'AFTER LIFTOFF ON ARIANE 5', { size: 100, lsize: 30, opacity: h.win(t, 2.6, 3.2) });
      },
    },
    {
      say: 'The rocket veered off course and was destroyed. The loss: more than {$370 million.|three hundred and seventy million dollars.}',
      draw: (h, p, t) => {
        const { C } = h, boom = h.win(t, 1.8, 2.6);
        let frag = '';
        for (let i = 0; i < 14; i++) { const a = i * 0.449 * Math.PI, r = boom * (120 + (i % 5) * 45); frag += h.line(500 + Math.cos(a) * r * .5, 330 + Math.sin(a) * r * .5, 500 + Math.cos(a) * r, 330 + Math.sin(a) * r, { stroke: i % 2 ? C.warn : C.bad, w: 7, opacity: boom * (1 - h.win(t, 3, 4.4)) }); }
        return rocket(h, 500, 180, { rot: h.win(t, 0, 1.8) * 55, color: C.bad, s: .8, opacity: 1 - boom }) + frag +
          h.stat(500, 660, '$370M+', 'LOST', { size: 190, fill: C.bad, opacity: h.win(t, 4.2, 4.8) });
      },
    },
  ],
};

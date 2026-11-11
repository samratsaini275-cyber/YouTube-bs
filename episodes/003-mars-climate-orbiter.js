// Small spacecraft glyph centred on (x, y).
function probe(h, x, y, o = {}) {
  const { C } = h, col = o.color || C.ink, s = o.s || 1;
  return h.g(h.rect(-16, -16, 32, 32, { fill: col, r: 4 }) + h.rect(-74, -9, 52, 18, { fill: C.line, r: 2 }) + h.rect(22, -9, 52, 18, { fill: C.line, r: 2 }) +
    h.circle(0, -26, 9, { fill: col }), { transform: `translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})`, opacity: o.opacity ?? 1 });
}
// Mars limb at the bottom of the frame, with altitude scale. yOf(km) maps altitude to y.
const yOf = km => 720 - km * 2.0;
function mars(h, o = {}) {
  const { C } = h;
  return `<path d="M-100 900 L-100 760 Q500 680 1100 760 L1100 900Z" fill="#B4532A" opacity="${o.opacity ?? 1}"/>` +
    `<path d="M-100 760 Q500 680 1100 760" fill="none" stroke="#E98A55" stroke-width="5" opacity="${o.opacity ?? 1}"/>` +
    h.text(500, 840, 'MARS', { size: 44, weight: 900, fill: '#3A180A', ls: 16, opacity: o.opacity ?? 1 });
}
const level = (h, km, label, col, k, below) => h.line(90, yOf(km), 90 + 820 * k, yOf(km), { stroke: col, w: 3, dash: '12 10', opacity: k > 0 ? 1 : 0 }) +
  h.text(96, yOf(km) + (below ? 34 : -14), label, { size: 26, mono: true, fill: col, anchor: 'start', opacity: k });

export default {
  id: '003',
  case: 'MARS CLIMATE ORBITER',
  year: 'NASA · 1999',
  title: 'NASA lost a Mars orbiter to a unit conversion',
  description: 'Mars Climate Orbiter was lost on September 23, 1999. One piece of ground software reported thruster impulse in pound-force seconds; the navigation software expected newton-seconds.',
  tags: ['space', 'nasa', 'mars', 'engineeringfailure', 'softwarebugs', 'shorts'],
  sources: [
    'Wikipedia, "Mars Climate Orbiter" — https://en.wikipedia.org/wiki/Mars_Climate_Orbiter (retrieved November 2026)',
    'NASA, "Mars Climate Orbiter Mishap Investigation Board Phase I Report" (November 10, 1999) — the investigation cited there',
  ],
  scenes: [
    {
      say: 'NASA lost a spacecraft at Mars because two pieces of software used different units.',
      draw: (h, p, t) => mars(h) + probe(h, 180 + t * 110, 250 + t * t * 14, { s: 1.5, rot: t * 12 }) +
        h.tag(300, 520, 'POUND-FORCE', { size: 40, opacity: h.win(t, 2.6, 3) }) + h.text(500, 534, '≠', { size: 70, weight: 900, fill: h.C.bad, opacity: h.win(t, 3, 3.4) }) +
        h.tag(700, 520, 'NEWTONS', { size: 40, color: h.C.line, opacity: h.win(t, 3.2, 3.6) }),
    },
    {
      say: 'Mars Climate Orbiter launched in December {1998.|nineteen ninety-eight.} About nine months later, it was due to enter orbit, passing {226|two hundred and twenty-six} kilometers above Mars.',
      draw: (h, p, t) => {
        const k = h.win(t, 5, 9), x = h.lerp(60, 700, k);
        return mars(h) + level(h, 226, 'PLANNED PASS · 226 KM', h.C.ok, h.win(t, 6.5, 7.5)) +
          h.path(`M60 ${yOf(226) - 160} Q400 ${yOf(226) - 40} 700 ${yOf(226)}`, { stroke: h.C.ok, w: 4, draw: k }) +
          probe(h, x, yOf(226) - 160 * (1 - k) * (1 - k), {}) +
          h.stat(500, 170, 'DEC 1998', 'LAUNCH', { size: 110, fill: h.C.ink, opacity: h.win(t, .3, .8) * (1 - h.win(t, 4.4, 5)) });
      },
    },
    {
      say: 'Ground software supplied by Lockheed Martin reported thruster impulse in pound-force seconds. NASA\'s navigation software read those numbers as newton-seconds.',
      draw: (h, p, t) => {
        const { C } = h, flow = h.win(t, 4.2, 5.6);
        const box = (x, top, name, unit, col, k) => h.g(h.rect(x - 200, 250, 400, 300, { stroke: col, w: 5, r: 16, fill: C.panel }) +
          h.text(x, 310, top, { size: 24, mono: true, fill: C.dim, ls: 3 }) + h.text(x, 390, name, { size: 40, weight: 900 }) +
          h.text(x, 480, unit, { size: 58, weight: 900, fill: col, mono: true }), { opacity: k });
        return box(250, 'WRITES', 'CONTRACTOR', 'lbf·s', C.warn, h.win(t, .2, .8)) + box(750, 'READS AS', 'NAVIGATION', 'N·s', C.line, h.win(t, 5.2, 5.8)) +
          h.arrow(455, 400, 545, 400, { draw: flow, stroke: C.ink }) +
          h.tag(500, 690, 'SAME NUMBER · DIFFERENT UNIT', { color: C.bad, opacity: h.win(t, 7.4, 8) });
      },
    },
    {
      say: 'One pound-force second is {4.45|four point four five} newton-seconds. So every thruster firing was underestimated, and the predicted path drifted away from the real one.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 5.4, 10), a = 1 - h.win(t, 4.6, 5.2);
        return h.g(h.stat(500, 330, '× 4.45', '1 lbf·s = 4.45 N·s', { size: 210, lsize: 38, gap: 90 }), { opacity: a }) +
          h.g(mars(h) + h.path('M60 250 Q450 330 940 420', { stroke: C.ok, w: 5, dash: '14 12' }) + h.text(930, 395, 'PREDICTED', { size: 26, mono: true, fill: C.ok, anchor: 'end' }) +
            h.path('M60 250 Q450 420 940 640', { stroke: C.bad, w: 6, draw: k }) + h.text(930, 690, 'ACTUAL', { size: 26, mono: true, fill: C.bad, anchor: 'end', opacity: k }), { opacity: 1 - a });
      },
    },
    {
      say: 'At least two navigators noticed the discrepancy. Their concerns were dismissed, because they had not filled out the right form.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, .3, 1), st = h.win(t, 4.6, 5);
        let lines = '';
        for (let i = 0; i < 5; i++) lines += h.line(330, 390 + i * 56, 330 + 340 * h.win(t, .6 + i * .25, 1.4 + i * .25), 390 + i * 56, { stroke: C.faint, w: 8 });
        return h.g(h.rect(270, 200, 460, 560, { stroke: C.dim, w: 5, r: 10, fill: C.panel }) + h.text(500, 290, 'CONCERN REPORT', { size: 32, mono: true, fill: C.ink }) + lines, { opacity: k }) +
          h.g(h.rect(250, 400, 500, 130, { stroke: C.bad, w: 9, r: 12 }) + h.text(500, 492, 'DISMISSED', { size: 76, weight: 900, fill: C.bad, ls: 6 }),
            { transform: `rotate(-12 500 465) scale(${2 - st})`, opacity: st });
      },
    },
    {
      say: 'On {September 23rd,|September twenty-third,} {1999,|nineteen ninety-nine,} the orbiter came within about {57|fifty-seven} kilometers of the surface. It needed at least {80|eighty} to survive.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 2.4, 6.5), x = h.lerp(60, 760, k), y = h.lerp(yOf(260), yOf(57), k);
        return mars(h) + level(h, 226, 'PLANNED · 226 KM', C.ok, 1) + level(h, 80, 'MINIMUM SURVIVABLE · 80 KM', C.warn, h.win(t, 7, 7.8)) +
          level(h, 57, 'ACTUAL · 57 KM', C.bad, h.win(t, 5.6, 6.4), true) +
          h.path(`M60 ${yOf(260)} L${x} ${y}`, { stroke: C.bad, w: 5 }) + probe(h, x, y, { color: k > .9 ? C.bad : C.ink }) +
          h.tag(500, 120, 'SEPTEMBER 23, 1999', { size: 38, color: C.bad, opacity: h.win(t, .2, .7) });
      },
    },
    {
      say: 'The spacecraft was lost. The orbiter and its companion lander cost {$327 million.|three hundred and twenty-seven million dollars.}',
      draw: (h, p, t) => h.stat(500, 400, '$' + h.fmt(327.6 * h.win(t, 1.6, 3.6), 1) + 'M', 'ORBITER + LANDER PROGRAM COST', { size: 190, lsize: 30, gap: 80, fill: h.C.bad }) +
        h.text(500, 620, 'CHECK THE UNITS.', { size: 60, weight: 900, opacity: h.win(t, 5, 5.6) }),
    },
  ],
};

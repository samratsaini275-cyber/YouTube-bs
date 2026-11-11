// Footbridge seen from above: a long deck that sways sideways. amp in px, people drawn on it.
function deck(h, t, o = {}) {
  const { C } = h, amp = o.amp || 0, n = o.people ?? 0, sync = o.sync ?? 0, col = o.color || C.ink;
  const sway = y => amp * Math.sin(Math.PI * (y - 120) / 660) * Math.sin(t * 5);
  let left = 'M', right = 'M', ppl = '';
  for (let y = 120; y <= 780; y += 30) { left += `${420 + sway(y)} ${y} L`; right += `${580 + sway(y)} ${y} L`; }
  for (let i = 0; i < n; i++) {
    const y = 150 + ((i * 53 + t * 26) % 600), lane = 448 + (i * i * 17 + i * 29) % 106;
    const own = Math.sin(t * 5 + i * 1.7), step = h.lerp(own, Math.sin(t * 5), sync) * 9;
    ppl += h.circle(lane + sway(y) + step, y, 9, { fill: sync > .5 ? C.warn : C.line });
  }
  return h.rect(0, 100, 1000, 700, { fill: '#0B3A5C', opacity: .35 }) + h.text(140, 460, 'THAMES', { size: 26, mono: true, fill: C.faint, ls: 8, rot: -90 }) +
    h.path(left.slice(0, -2), { stroke: col, w: 7 }) + h.path(right.slice(0, -2), { stroke: col, w: 7 }) + ppl;
}

export default {
  id: '013',
  case: 'THE MILLENNIUM BRIDGE',
  year: 'LONDON · 2000',
  hook: ['OPENED.', 'SHUT 2 DAYS LATER.'],
  title: 'This bridge was shut two days after opening — the crowd made it wobble',
  description: 'London\'s Millennium Bridge opened on June 10, 2000 and was closed on June 12 after unexpected sideways vibration. The cause was synchronous lateral excitation: pedestrians unconsciously matching their steps to the sway.',
  tags: ['engineering', 'london', 'millenniumbridge', 'bridges', 'physics', 'shorts'],
  sources: [
    'Wikipedia, "Millennium Bridge, London" — https://en.wikipedia.org/wiki/Millennium_Bridge,_London (retrieved November 2026)',
  ],
  scenes: [
    {
      say: 'This bridge was shut two days after it opened. The problem was the people walking on it.',
      draw: (h, p, t) => deck(h, t, { amp: 30 * h.win(t, .4, 3), people: 26, sync: h.win(t, .4, 3) }) +
        h.tag(780, 200, '2 DAYS', { size: 48, solid: true, color: h.C.bad, opacity: h.win(t, 1.6, 2) }),
    },
    {
      say: '{June 10th,|June tenth,} {2000.|two thousand.} {90,000|Ninety thousand} people cross on opening day, with up to {2,000|two thousand} on the bridge at a time.',
      draw: (h, p, t) => deck(h, t, { people: Math.round(30 * h.win(t, 2, 6)) }) +
        h.stat(800, 330, '90K', 'OPENING DAY', { size: 110, lsize: 24, gap: 44, opacity: h.win(t, 3, 3.5) }) +
        h.stat(800, 580, '2,000', 'AT A TIME', { size: 100, lsize: 24, gap: 44, fill: h.C.line, opacity: h.win(t, 6.6, 7.1) }),
    },
    {
      say: 'The deck begins to sway sideways. Without realizing it, people start to match their footsteps to the sway.',
      draw: (h, p, t) => deck(h, t, { amp: 12 + 10 * h.win(t, 2, 7), people: 30, sync: h.win(t, 3, 6.5) }) +
        h.arrow(700, 450, 640, 450, { w: 5, draw: h.win(t, .6, 1.2) }) + h.arrow(700, 450, 760, 450, { w: 5, draw: h.win(t, .6, 1.2) }) +
        h.text(800, 520, 'SWAY', { size: 30, mono: true, fill: h.C.warn, opacity: h.win(t, .8, 1.4) }) +
        h.tag(790, 250, 'STEPS SYNC UP', { size: 28, opacity: h.win(t, 5.2, 5.8) }),
    },
    {
      say: 'Their steps push the bridge further, which pulls more people into step. This feedback loop is called synchronous lateral excitation.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, .6, 1.8), b = h.win(t, 2.6, 3.8);
        return h.tag(500, 240, 'BRIDGE SWAYS', { size: 38, color: C.line }) + h.tag(500, 620, 'PEOPLE STEP IN TIME', { size: 38, color: C.warn }) +
          h.path('M700 280 Q860 430 700 580', { stroke: C.line, w: 7, draw: a }) + h.arrow(712, 566, 698, 582, { stroke: C.line, draw: a > .95 ? 1 : 0, head: 20 }) +
          h.path('M300 580 Q140 430 300 280', { stroke: C.warn, w: 7, draw: b }) + h.arrow(288, 294, 302, 278, { stroke: C.warn, draw: b > .95 ? 1 : 0, head: 20 }) +
          h.text(500, 445, 'FEEDBACK', { size: 54, weight: 900, fill: C.bad, opacity: h.win(t, 3.8, 4.4) }) +
          h.text(500, 800, 'SYNCHRONOUS LATERAL EXCITATION', { size: 30, mono: true, fill: C.ink, ls: 2, opacity: h.win(t, 6.2, 6.8) });
      },
    },
    {
      say: 'The bridge was closed on {June 12th,|June twelfth,} and stayed closed for almost two years.',
      draw: (h, p, t) => deck(h, t, { color: h.C.dim }) + h.line(400, 300, 600, 300, { stroke: h.C.bad, w: 14 }) + h.line(400, 600, 600, 600, { stroke: h.C.bad, w: 14 }) +
        h.tag(500, 450, 'CLOSED', { size: 60, solid: true, color: h.C.bad, opacity: h.win(t, .4, .8) }) +
        h.stat(800, 450, '≈2', 'YEARS', { size: 150, lsize: 28, opacity: h.win(t, 3.4, 3.9) }),
    },
    {
      say: 'The fix: {37|thirty-seven} fluid dampers and {52|fifty-two} tuned mass dampers, at a cost of {£5 million.|five million pounds.}',
      draw: (h, p, t) => {
        const { C } = h;
        let d1 = '', d2 = '';
        for (let i = 0; i < 37; i++) d1 += h.rect(120 + (i % 13) * 60, 300 + Math.floor(i / 13) * 34, 44, 20, { fill: C.line, r: 6, opacity: h.win(t, .8 + i * .03, 1 + i * .03) });
        for (let i = 0; i < 52; i++) d2 += h.circle(142 + (i % 13) * 60, 530 + Math.floor(i / 13) * 36, 12, { fill: C.warn, opacity: h.win(t, 3 + i * .025, 3.2 + i * .025) });
        return h.text(120, 270, '37 FLUID DAMPERS', { size: 30, mono: true, fill: C.line, anchor: 'start', opacity: h.win(t, .6, 1.2) }) + d1 +
          h.text(120, 495, '52 TUNED MASS DAMPERS', { size: 30, mono: true, fill: C.warn, anchor: 'start', opacity: h.win(t, 2.8, 3.4) }) + d2 +
          h.stat(500, 810, '£5M', 'COST OF THE FIX', { size: 110, lsize: 26, gap: 46, fill: C.ink, opacity: h.win(t, 6, 6.5) });
      },
    },
    {
      say: 'It reopened in February {2002.|two thousand two.} Londoners nicknamed it the Wobbly Bridge.',
      draw: (h, p, t) => deck(h, t, { people: 22, color: h.C.ok }) + h.stat(800, 330, '2002', 'REOPENED', { size: 110, lsize: 24, gap: 44, fill: h.C.ok, opacity: h.win(t, .6, 1.1) }) +
        h.tag(790, 600, '"WOBBLY BRIDGE"', { size: 28, opacity: h.win(t, 3.6, 4.2) }),
    },
  ],
};

// Warship seen from astern (cross-section view), heeled by `heel` degrees about the waterline centre.
const SEA = 600;
function ship(h, heel = 0, o = {}) {
  const { C } = h, col = o.color || C.ink, top = o.top ?? 1;
  let ports = '';
  for (const y of [-40, -120]) for (const sx of [-1, 1]) ports += h.rect(sx * 128 - 13 + (y === -40 ? sx * 8 : 0), y - 13, 26, 26, { fill: y === -40 && o.hot ? C.bad : C.warn, r: 3 });
  const hull = `<path d="M-150 -190 L-162 -40 Q-150 110 0 130 Q150 110 162 -40 L150 -190Z" fill="${C.panel}" stroke="${col}" stroke-width="7" stroke-linejoin="round"/>`;
  const upper = h.g(`<path d="M-150 -190 L-132 -330 L132 -330 L150 -190Z" fill="${C.panel}" stroke="${o.topColor || col}" stroke-width="7" stroke-linejoin="round"/>` +
    h.line(0, -330, 0, -560, { stroke: col, w: 9 }) + h.line(-150, -470, 150, -470, { stroke: col, w: 6 }) + h.line(-110, -545, 110, -545, { stroke: col, w: 5 }), { opacity: top });
  return h.g(upper + hull + ports + (o.extra || ''), { transform: `translate(500 ${SEA + (o.sink || 0)}) rotate(${heel})` });
}
const sea = (h, t, lvl = SEA) => {
  let d = `M-20 ${lvl}`;
  for (let x = 0; x <= 1020; x += 40) d += ` L${x} ${lvl + 7 * Math.sin(x * .02 + t * 2.4)}`;
  return `<path d="${d} L1020 900 L-20 900Z" fill="#0B3A5C" opacity=".72"/><path d="${d}" fill="none" stroke="${h.C.line}" stroke-width="5"/>`;
};

export default {
  id: '007',
  case: 'THE WARSHIP VASA',
  year: 'STOCKHOLM · 1628',
  title: 'This warship sank 1,300 meters into its first voyage',
  description: 'The Swedish warship Vasa sank on August 10, 1628 after sailing roughly 1,300 meters. She was top-heavy, and a stability test had been stopped after three runs for fear she would capsize.',
  tags: ['history', 'vasa', 'engineeringfailure', 'ships', 'sweden', 'shorts'],
  sources: [
    'Wikipedia, "Vasa (ship)" — https://en.wikipedia.org/wiki/Vasa_(ship) (retrieved November 2026)',
  ],
  scenes: [
    {
      say: 'One of the most powerfully armed warships in the world sank {1,300|thirteen hundred} meters into her first voyage.',
      draw: (h, p, t) => {
        const k = h.win(t, 3.2, 6.4);
        return ship(h, k * 62, { sink: k * 210, color: k > .3 ? h.C.bad : h.C.ink }) + sea(h, t) +
          h.stat(215, 150, '1,300 M', 'DISTANCE SAILED', { size: 92, lsize: 24, gap: 46, opacity: h.win(t, 3.4, 3.9) });
      },
    },
    {
      say: '{August 10th,|August tenth,} {1628.|sixteen twenty-eight.} The Vasa leaves Stockholm, with {64|sixty-four} guns on two full gun decks.',
      draw: (h, p, t) => ship(h, Math.sin(t * 1.2) * 2) + sea(h, t) +
        h.tag(500, 60, 'AUGUST 10, 1628', { size: 36, color: h.C.line, opacity: h.win(t, .2, .7) }) +
        h.arrow(820, 480, 690, 480, { draw: h.win(t, 5.6, 6.2), w: 5 }) + h.arrow(820, 560, 690, 560, { draw: h.win(t, 5.8, 6.4), w: 5 }) +
        h.text(880, 500, '64', { size: 80, weight: 900, fill: h.C.warn, opacity: h.win(t, 4.6, 5.2) }) + h.text(880, 550, 'GUNS', { size: 30, mono: true, fill: h.C.warn, opacity: h.win(t, 4.6, 5.2) }),
    },
    {
      say: 'But she was top-heavy, with too much weight in the upper part of the hull.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, .8, 1.6);
        return ship(h, Math.sin(t * 1.6) * 5, { topColor: C.bad, extra: h.circle(0, -250, 34 * k, { fill: C.bad, opacity: .9 }) + h.arrow(0, -250, 0, -120, { stroke: C.bad, draw: k }) }) + sea(h, t) +
          h.tag(770, 330, 'TOO MUCH WEIGHT', { color: C.bad, opacity: h.win(t, 2, 2.6) }) + h.tag(770, 395, 'UP HIGH', { color: C.bad, opacity: h.win(t, 2, 2.6) });
      },
    },
    {
      say: 'Before she sailed, {30|thirty} men ran back and forth across the deck to test her. After only three trips, the admiral stopped the test, fearing she would capsize.',
      draw: (h, p, t) => {
        const { C } = h, run = Math.min(t, 7.2), ph = run * 1.35, amp = Math.min(3, Math.floor(ph / Math.PI) + 1) * 4.5;
        const side = Math.sin(ph), heel = t < 7.2 ? side * amp : side * amp * Math.exp(-(t - 7.2));
        let men = '';
        for (let i = 0; i < 10; i++) men += h.circle(side * 90 + (i - 4.5) * 9, -344 - (i % 2) * 14, 7, { fill: C.warn });
        const trips = Math.min(3, Math.floor(ph / Math.PI));
        return ship(h, heel, { extra: men }) + sea(h, t) +
          h.stat(160, 200, String(trips), 'TRIPS', { size: 170, lsize: 30, opacity: h.win(t, 1, 1.5) }) +
          h.tag(760, 180, 'TEST STOPPED', { size: 40, solid: true, color: C.bad, opacity: h.win(t, 7.2, 7.6) });
      },
    },
    {
      say: 'She was ordered to sea anyway. A gust heeled her over, the open lower gunports went under, and water rushed in.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 2.2, 4.6), heel = k * 24;
        let wind = '';
        for (let i = 0; i < 4; i++) { const x = ((t * 340 + i * 190) % 760) - 260; wind += h.line(x, 120 + i * 70, x + 130, 120 + i * 70, { stroke: C.line, w: 5, opacity: h.win(t, 1.8, 2.4) * .7 }); }
        return wind + ship(h, heel, { hot: k > .7, sink: h.win(t, 6, 9) * 60 }) + sea(h, t) +
          h.tag(770, 520, 'GUNPORTS UNDER', { color: C.bad, opacity: h.win(t, 4.6, 5.2) }) + h.arrow(770, 550, 640, 590, { stroke: C.bad, w: 5, draw: h.win(t, 4.8, 5.4) });
      },
    },
    {
      say: 'About {30|thirty} people died. An inquiry was held, and no one was punished.',
      draw: (h, p, t) => sea(h, t, 700) + h.stat(500, 330, '≈30', 'LIVES LOST', { size: 260, gap: 70, fill: h.C.bad, opacity: h.win(t, 0, .4) }) +
        h.tag(500, 560, 'INQUIRY: NO ONE PUNISHED', { size: 36, color: h.C.ink, opacity: h.win(t, 2.4, 3) }),
    },
    {
      say: 'Four of the builders\' rulers have been found. Two measure in Swedish feet, two in Amsterdam feet. The ship was raised in {1961,|nineteen sixty-one,} with her hull largely intact.',
      draw: (h, p, t) => {
        const { C } = h;
        const ruler = (y, len, n, label, col, k) => { let ticks = ''; for (let i = 0; i <= n; i++) ticks += h.line(150 + i * len / n, y, 150 + i * len / n, y + (i % n === 0 ? 46 : 26), { stroke: C.bg, w: 4 });
          return h.g(h.rect(150, y, len, 60, { fill: col, r: 4 }) + ticks + h.text(150, y - 18, label, { size: 28, mono: true, fill: col, anchor: 'start' }), { opacity: k }); };
        const a = 1 - h.win(t, 7.6, 8.2);
        return h.g(ruler(250, 700, 12, 'SWEDISH FOOT · 29.69 CM · 12 INCHES', C.line, h.win(t, 2.6, 3.2)) + ruler(450, 667, 11, 'AMSTERDAM FOOT · 28.31 CM · 11 INCHES', C.warn, h.win(t, 4.4, 5)) +
          h.line(850, 230, 850, 530, { stroke: C.faint, w: 3, dash: '8 8' }), { opacity: a }) +
          h.stat(500, 480, '1961', 'RAISED FROM STOCKHOLM HARBOR', { size: 220, lsize: 30, gap: 70, fill: C.ok, opacity: 1 - a });
      },
    },
  ],
};

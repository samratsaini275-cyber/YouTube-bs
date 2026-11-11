// One eyebar: a flat bar with a ring (eye) at each end, from (x1,y) to (x2,y).
function eyebar(h, x1, x2, y, o = {}) {
  const col = o.color || h.C.ink;
  return h.g(h.line(x1 + 30, y, x2 - 30, y, { stroke: col, w: o.w || 22 }) + h.circle(x1, y, 34, { stroke: col, w: 16 }) + h.circle(x2, y, 34, { stroke: col, w: 16 }), { opacity: o.opacity ?? 1 });
}
// Eyebar-chain suspension bridge elevation. broken 0..1.
function bridge(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, br = o.broken || 0, col = o.color || C.ink, deckY = 620;
  const chain = [[60, deckY], [150, 520], [250, 360], [350, 470], [500, 540], [650, 470], [750, 360], [850, 520], [940, deckY]];
  let links = '', dots = '';
  for (let i = 0; i < chain.length - 1; i++) {
    const [x1, y1] = chain[i], [x2, y2] = chain[i + 1];
    if (br > 0 && i === 2) continue;
    links += h.line(x1, y1 + br * 60 * (i > 2 ? 1 : 0), x2, y2 + br * 60 * (i >= 2 ? 1 : 0), { stroke: C.line, w: 6, draw: d });
  }
  for (const [x, y] of chain) dots += h.circle(x, y, 9, { fill: C.line, opacity: d * (1 - br) });
  const deck = br > 0
    ? h.line(60, deckY, 250, deckY, { stroke: col, w: 10 }) + h.g(h.line(0, 0, 500, 0, { stroke: C.bad, w: 10 }), { transform: `translate(250 ${deckY}) rotate(${br * 26})` }) + h.line(750 + br * 40, deckY + br * 150, 940, deckY, { stroke: C.bad, w: 10 })
    : h.line(60, deckY, 940, deckY, { stroke: col, w: 10, draw: d });
  return h.line(0, 780, 1000, 780, { stroke: C.faint, w: 3, dash: '14 14' }) + h.text(500, 830, 'OHIO RIVER', { size: 24, mono: true, fill: C.faint, ls: 6 }) +
    h.line(250, 780, 250, 350, { stroke: col, w: 14, draw: d }) + h.line(750, 780, 750 + br * 30, 350 + br * 40, { stroke: col, w: 14, draw: d }) + links + dots + deck + (o.extra || '');
}

export default {
  id: '011',
  case: 'THE SILVER BRIDGE',
  year: 'POINT PLEASANT, WV · 1967',
  hook: ['A 0.1-INCH CRACK.', '46 DEAD.'],
  title: 'A 0.1-inch crack brought down this entire bridge',
  description: 'The Silver Bridge over the Ohio River collapsed on December 15, 1967, killing 46 people. The failure began at a single eyebar, where a crack about 0.1 inches deep had grown through stress corrosion cracking.',
  tags: ['engineering', 'engineeringfailure', 'bridges', 'silverbridge', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Silver Bridge" — https://en.wikipedia.org/wiki/Silver_Bridge (retrieved November 2026)',
  ],
  scenes: [
    {
      say: 'A crack one tenth of an inch deep. That is all it took to bring down this entire bridge.',
      draw: (h, p, t) => bridge(h, { broken: h.win(t, 3, 4.4), color: t > 3 ? h.C.bad : h.C.ink }) +
        h.stat(500, 200, '0.1 IN', 'CRACK DEPTH · 2.5 MM', { size: 150, lsize: 28, opacity: h.win(t, .3, .8) }),
    },
    {
      say: 'The Silver Bridge was built in {1928,|nineteen twenty-eight,} and carried traffic over the Ohio River at Point Pleasant, West Virginia.',
      draw: (h, p, t) => bridge(h, { draw: h.win(t, 0, 1.8) }) + h.stat(500, 200, '1928', 'BUILT', { size: 150, lsize: 28, fill: h.C.ink, opacity: h.win(t, 1.4, 1.9) }),
    },
    {
      say: 'It hung from chains of steel eyebars, not wire cables. Each link in the chain was just two eyebars, side by side.',
      draw: (h, p, t) => {
        const { C } = h, two = h.win(t, 4.4, 5.2);
        return h.text(500, 150, 'ONE CHAIN LINK', { size: 28, mono: true, fill: C.dim, ls: 6 }) +
          eyebar(h, 200, 800, 360) + eyebar(h, 200, 800, 520, { opacity: two }) +
          h.line(200, 300, 200, 580, { stroke: C.line, w: 8, opacity: two }) + h.line(800, 300, 800, 580, { stroke: C.line, w: 8, opacity: two }) +
          h.text(500, 680, 'EYEBAR', { size: 30, mono: true, fill: C.ink, opacity: h.win(t, 1.4, 2) * (1 - two) }) +
          h.stat(500, 760, '2', 'EYEBARS PER LINK', { size: 130, lsize: 28, opacity: two });
      },
    },
    {
      say: 'That left little to no redundancy. At a bearing inside one eyebar, number {330,|three thirty,} a small crack formed, and slowly grew through corrosion.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 5, 10.5), z = h.win(t, 2.6, 3.6);
        return h.g(h.circle(500, 450, 250, { stroke: C.ink, w: 90 }) + h.circle(500, 450, 150, { fill: C.faint }) + h.text(500, 462, 'PIN', { size: 34, mono: true, fill: C.dim }) +
          h.path(`M500 245 L${500 + 6 * k} ${245 - 22 * k} L${500 - 5 * k} ${245 - 40 * k} L${500 + 4 * k} ${245 - 58 * k}`, { stroke: C.bad, w: 7, opacity: k > 0 ? 1 : 0 }) +
          h.circle(500, 222, 60, { stroke: C.warn, w: 5, dash: '12 8', opacity: h.win(t, 5.4, 6) }), { opacity: z }) +
          h.tag(500, 110, 'EYEBAR 330', { size: 38, color: C.warn, opacity: h.win(t, 4, 4.6) }) +
          h.tag(500, 830, 'STRESS CORROSION CRACKING', { color: C.bad, opacity: h.win(t, 8.4, 9) }) +
          h.stat(500, 430, 'LITTLE TO NO REDUNDANCY', null, { size: 58, fill: C.bad, opacity: h.win(t, .3, .8) * (1 - z) });
      },
    },
    {
      say: 'On {December 15th,|December fifteenth,} {1967,|nineteen sixty-seven,} in rush hour traffic, that eyebar broke. The bridge collapsed, and {46|forty-six} people died.',
      draw: (h, p, t) => {
        const br = h.win(t, 5.4, 7), sh = t > 5.2 && t < 6.6 ? h.noise(t * 9) * 6 : 0;
        return h.g(bridge(h, { broken: br, color: br > 0 ? h.C.bad : h.C.ink }), { transform: `translate(${sh} 0)` }) +
          h.tag(500, 130, 'DECEMBER 15, 1967', { size: 38, color: h.C.bad, opacity: h.win(t, .2, .7) }) +
          h.stat(500, 300, '46', 'LIVES LOST', { size: 150, lsize: 28, fill: h.C.bad, opacity: h.win(t, 8.4, 8.9) });
      },
    },
    {
      say: 'Investigators found no sign the bridge had been overloaded. The collapse led to the first national bridge inspection program in the United States, in {1968.|nineteen sixty-eight.}',
      draw: (h, p, t) => h.tag(500, 220, 'NOT OVERLOADED', { size: 44, color: h.C.line, opacity: h.win(t, 1.2, 1.8) }) +
        h.stat(500, 520, '1968', 'FIRST NATIONAL BRIDGE INSPECTION PROGRAM', { size: 240, lsize: 26, gap: 76, fill: h.C.ok, opacity: h.win(t, 5.2, 5.8) }),
    },
  ],
};

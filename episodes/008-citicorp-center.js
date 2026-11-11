// Tower elevation on four mid-side stilts. sway in px at the roof.
function tower(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, sway = o.sway || 0, col = o.color || C.ink;
  const x0 = 340, x1 = 660, top = 150, base = 640, ground = 800;
  const sx = y => sway * Math.pow((ground - y) / (ground - top), 2);
  let braces = '';
  for (let i = 0; i < 4; i++) {
    const ya = top + 60 + i * 110, yb = ya + 110, col2 = o.brace || C.line;
    braces += h.path(`M${x0 + sx(ya)} ${ya} L${500 + sx(yb)} ${yb} L${x1 + sx(ya)} ${ya}`, { stroke: col2, w: 4, opacity: d * (o.braceOpacity ?? .9) });
  }
  const body = `M${x0 + sx(base)} ${base} L${x0 + sx(top + 60)} ${top + 60} L${x1 + sx(top)} ${top - 40} L${x1 + sx(base)} ${base}Z`;
  return h.line(80, ground, 920, ground, { stroke: C.dim, w: 6 }) +
    h.path(body, { stroke: col, w: 7, fill: C.panel, draw: d }) + braces +
    h.line(500 + sx(base), base, 500, ground, { stroke: col, w: 22, opacity: d }) +
    h.line(x0 + 4 + sx(base), base, x0 + 4, ground, { stroke: col, w: 6, opacity: d * .35, dash: '10 10' }) + h.line(x1 - 4 + sx(base), base, x1 - 4, ground, { stroke: col, w: 6, opacity: d * .35, dash: '10 10' }) +
    (o.church ? h.g(h.path('M250 800 L250 720 L290 670 L330 720 L330 800Z', { stroke: C.warn, w: 5, fill: C.panel }) + h.line(290, 670, 290, 635, { stroke: C.warn, w: 5 }) + h.line(277, 650, 303, 650, { stroke: C.warn, w: 5 }), { opacity: o.church }) : '');
}
// Plan view: square tower, columns at mid-sides.
function plan(h, o = {}) {
  const { C } = h;
  let cols = '';
  for (const [x, y] of [[500, 250], [500, 650], [300, 450], [700, 450]]) cols += h.rect(x - 22, y - 22, 44, 44, { fill: C.ink, r: 4 });
  return h.rect(300, 250, 400, 400, { stroke: C.ink, w: 6, fill: C.panel }) + cols + (o.extra || '');
}

export default {
  id: '008',
  case: 'CITICORP CENTER',
  year: 'NEW YORK · 1978',
  title: 'A 59-story tower was quietly repaired at night',
  description: 'In 1978 a structural flaw was found in the newly completed 59-story Citicorp Center in New York. Bolted joints had replaced welded ones, and the tower was vulnerable to quartering winds. It was reinforced at night; the story became public in 1995.',
  tags: ['engineering', 'skyscraper', 'newyork', 'structuralengineering', 'citicorpcenter', 'shorts'],
  sources: [
    'Wikipedia, "Citicorp Center engineering crisis" — https://en.wikipedia.org/wiki/Citicorp_Center_engineering_crisis (retrieved November 2026)',
    'Joe Morgenstern, "The Fifty-Nine-Story Crisis", The New Yorker, May 29, 1995 — the article cited there that first made the story public',
  ],
  scenes: [
    {
      say: 'In {1978,|nineteen seventy-eight,} a brand new {59|fifty-nine} story skyscraper in New York could have been blown over. The public was not told for {17|seventeen} years.',
      draw: (h, p, t) => tower(h, { sway: Math.sin(t * 2.2) * 26 * h.win(t, 2.4, 4.4), color: t > 4 ? h.C.bad : h.C.ink }) +
        h.stat(170, 330, '59', 'STORIES', { size: 150, lsize: 28, opacity: h.win(t, 1.4, 1.9) }) +
        h.stat(840, 330, '17', 'YEARS QUIET', { size: 150, lsize: 28, fill: h.C.line, opacity: h.win(t, 7, 7.5) }),
    },
    {
      say: 'Citicorp Center stands on four stilts. They sit under the middle of each side, not the corners, to leave room for a church.',
      draw: (h, p, t) => tower(h, { draw: h.win(t, 0, 1.4), church: h.win(t, 6.4, 7) }) +
        h.arrow(800, 720, 540, 720, { draw: h.win(t, 2.6, 3.2), w: 5 }) + h.text(810, 700, 'STILTS AT', { size: 26, mono: true, fill: h.C.warn, anchor: 'start', opacity: h.win(t, 2.8, 3.4) }) +
        h.text(810, 735, 'MID-SIDE', { size: 26, mono: true, fill: h.C.warn, anchor: 'start', opacity: h.win(t, 2.8, 3.4) }) +
        h.text(290, 850, 'CHURCH', { size: 26, mono: true, fill: h.C.warn, opacity: h.win(t, 6.6, 7.2) }),
    },
    {
      say: 'Its wind braces were designed with welded joints. To save money, they were built with bolted joints instead.',
      draw: (h, p, t) => {
        const { C } = h, b = h.win(t, 4, 4.8);
        const joint = (x, label, col, inner, k) => h.g(h.line(x - 150, 300, x, 450, { stroke: C.ink, w: 26 }) + h.line(x + 150, 300, x, 450, { stroke: C.ink, w: 26 }) + h.line(x, 450, x, 620, { stroke: C.ink, w: 26 }) + inner +
          h.text(x, 710, label, { size: 34, mono: true, fill: col }), { opacity: k });
        let bolts = '';
        for (const [dx, dy] of [[-40, -40], [40, -40], [-18, -8], [18, -8], [0, 40], [0, 80]]) bolts += h.circle(760 + dx, 450 + dy, 9, { fill: C.warn });
        return joint(240, 'WELDED · DESIGN', C.line, h.path('M190 400 L240 455 L290 400', { stroke: C.line, w: 10 }) + h.line(240, 455, 240, 520, { stroke: C.line, w: 10 }), h.win(t, .4, 1)) +
          joint(760, 'BOLTED · BUILT', C.warn, bolts, b) + h.arrow(440, 450, 560, 450, { draw: b, stroke: C.dim });
      },
    },
    {
      say: 'That year, students studying the tower asked about quartering winds, which strike a corner diagonally. Engineer William LeMessurier rechecked the design.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 3.6, 4.6);
        let wind = '';
        for (let i = 0; i < 3; i++) wind += h.arrow(60 + i * 46, 300 - i * 46, 60 + i * 46 + 170 * a, 300 - i * 46 + 170 * a, { stroke: C.bad, w: 6, draw: a > 0 ? 1 : 0 });
        return h.text(500, 150, 'TOWER, SEEN FROM ABOVE', { size: 28, mono: true, fill: C.dim, ls: 4 }) + plan(h) + wind +
          h.tag(360, 760, 'QUARTERING WIND', { color: C.bad, opacity: a }) +
          h.tag(700, 820, 'HITS TWO FACES AT ONCE', { size: 24, color: C.dim, opacity: h.win(t, 5, 5.6) });
      },
    },
    {
      say: 'His estimate: if a power failure stopped the tower\'s mass damper, a storm strong enough to topple it had a one in {16|sixteen} chance of arriving in any year.',
      draw: (h, p, t) => {
        const { C } = h;
        let dots = '';
        for (let i = 0; i < 16; i++) dots += h.circle(245 + (i % 8) * 73, 470 + Math.floor(i / 8) * 80, 26, { fill: i === 0 ? C.bad : C.faint, opacity: h.win(t, 5.6 + i * .06, 6 + i * .06) });
        return h.stat(500, 330, '1 in 16', 'CHANCE PER YEAR · DAMPER WITHOUT POWER', { size: 170, lsize: 26, gap: 290, fill: C.bad, opacity: h.win(t, 5.4, 5.9) }) + dots +
          h.tag(500, 150, 'TUNED MASS DAMPER NEEDS ELECTRICITY', { size: 28, color: C.line, opacity: h.win(t, 1.6, 2.2) }) +
          h.text(500, 780, 'WITH THE DAMPER WORKING: 1 IN 55', { size: 28, mono: true, fill: C.dim, opacity: h.win(t, 8, 8.6) });
      },
    },
    {
      say: 'Starting that August, crews welded steel plates over the bolted joints, at night. Hurricane Ella threatened New York during the work, then changed course.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 1, 5), ella = h.win(t, 6, 9.6);
        let sparks = '';
        const row = Math.min(3, Math.floor(k * 4)), yy = 265 + row * 110;
        for (let i = 0; i < 6; i++) { const a = i * 1.05 + t * 9; sparks += h.line(500, yy, 500 + Math.cos(a) * 30, yy + Math.sin(a) * 30, { stroke: C.warn, w: 4, opacity: t < 5.4 ? .9 : 0 }); }
        let plates = '';
        for (let i = 0; i < row + (k >= 1 ? 1 : 0); i++) plates += h.rect(478, 250 + i * 110, 44, 30, { fill: C.ok, r: 4 });
        const ex = h.lerp(980, 820, Math.min(1, ella * 2)) + Math.max(0, ella - .5) * 2 * 260, ey = h.lerp(820, 500, Math.min(1, ella * 2)) + Math.max(0, ella - .5) * 2 * -330;
        return tower(h, {}) + plates + sparks +
          h.g(h.circle(0, 0, 44, { stroke: C.bad, w: 8, dash: '30 14' }) + h.circle(0, 0, 12, { fill: C.bad }), { transform: `translate(${ex} ${ey}) rotate(${t * 120})`, opacity: h.win(t, 6, 6.4) }) +
          h.text(830, 880, 'HURRICANE ELLA', { size: 26, mono: true, fill: C.bad, opacity: h.win(t, 6.2, 6.8) }) +
          h.tag(180, 300, 'NIGHT WORK', { color: C.ok, opacity: h.win(t, 3.4, 4) });
      },
    },
    {
      say: 'The repairs were finished that October. The story became public in a New Yorker article in {1995.|nineteen ninety-five.}',
      draw: (h, p, t) => tower(h, { color: h.C.ok, brace: h.C.ok }) +
        h.tag(180, 330, 'OCT 1978', { size: 34, color: h.C.ok, opacity: h.win(t, .6, 1.2) }) + h.text(180, 400, 'REINFORCED', { size: 26, mono: true, fill: h.C.ok, opacity: h.win(t, .6, 1.2) }) +
        h.stat(840, 360, '1995', 'MADE PUBLIC', { size: 110, lsize: 26, fill: h.C.line, opacity: h.win(t, 4.6, 5.2) }),
    },
  ],
};

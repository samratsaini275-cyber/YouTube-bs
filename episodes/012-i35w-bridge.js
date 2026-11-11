// Deck-truss bridge elevation over a river. broken 0..1.
function truss(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, br = o.broken || 0, col = o.color || C.ink, y0 = 420, y1 = 540;
  let web = '';
  for (let i = 0; i < 10; i++) { const x = 100 + i * 80; web += h.line(x, y1, x + 40, y0, { stroke: C.line, w: 4, opacity: d }) + h.line(x + 40, y0, x + 80, y1, { stroke: C.line, w: 4, opacity: d }); }
  const span = h.line(100, y0, 900, y0, { stroke: col, w: 10, draw: d }) + h.line(100, y1, 900, y1, { stroke: col, w: 7, draw: d }) + web + (o.onDeck || '');
  const body = br > 0
    ? h.g(span, { transform: `translate(0 ${br * 210})`, opacity: 1 - br * .25 })
    : span;
  return h.line(0, 760, 1000, 760, { stroke: C.faint, w: 3, dash: '14 14' }) + h.text(500, 810, 'MISSISSIPPI RIVER', { size: 24, mono: true, fill: C.faint, ls: 6 }) +
    h.line(300, 760, 300, y1, { stroke: C.dim, w: 16, opacity: d }) + h.line(700, 760, 700, y1, { stroke: C.dim, w: 16, opacity: d }) + body;
}
// Gusset plate joining three truss members. thick sets plate stroke weight.
function gusset(h, cx, cy, o = {}) {
  const { C } = h, col = o.color || C.warn, tear = o.tear || 0;
  let rivets = '';
  for (let i = 0; i < 7; i++) rivets += h.circle(cx - 108 + i * 36, cy + 30, 7, { fill: C.bg });
  return h.line(cx - 330, cy + 60, cx, cy + 60, { stroke: C.ink, w: 44 }) + h.line(cx, cy + 60, cx + 330, cy + 60, { stroke: C.ink, w: 44 }) +
    h.g(h.line(cx, cy, cx - 200, cy - 280, { stroke: C.ink, w: 40 }) + h.line(cx, cy, cx + 200, cy - 280, { stroke: C.ink, w: 40 }), { transform: `translate(0 ${-tear * 36})` }) +
    h.g(`<path d="M${cx - 170} ${cy + 100} L${cx - 170} ${cy - 40} L${cx - 90} ${cy - 150} L${cx + 90} ${cy - 150} L${cx + 170} ${cy - 40} L${cx + 170} ${cy + 100}Z" fill="${col}" opacity=".88" stroke="${col}" stroke-width="5"/>` + rivets, {}) +
    (tear > 0 ? h.path(`M${cx - 175} ${cy + 30} L${cx - 175 + 350 * tear} ${cy + 30}`, { stroke: C.bg, w: 12 }) : '');
}

export default {
  id: '012',
  case: 'I-35W BRIDGE',
  year: 'MINNEAPOLIS · 2007',
  hook: ['HALF-INCH PLATES.', 'A BRIDGE GONE.'],
  title: 'Half-inch steel plates doomed this highway bridge',
  description: 'The I-35W Mississippi River bridge in Minneapolis collapsed at 6:05 p.m. on August 1, 2007, killing 13 people and injuring 145. The NTSB cited undersized gusset plates, a design error, with the weight on the bridge as a contributing factor.',
  tags: ['engineering', 'engineeringfailure', 'bridges', 'minneapolis', 'ntsb', 'shorts'],
  sources: [
    'Wikipedia, "I-35W Mississippi River bridge" — https://en.wikipedia.org/wiki/I-35W_Mississippi_River_bridge (retrieved November 2026)',
    'National Transportation Safety Board, Highway Accident Report NTSB/HAR-08/03, "Collapse of I-35W Highway Bridge, Minneapolis, Minnesota, August 1, 2007" — the investigation cited there',
  ],
  scenes: [
    {
      say: 'This eight lane highway bridge fell into the Mississippi River, because of steel plates that were too thin.',
      draw: (h, p, t) => truss(h, { broken: h.win(t, 2.6, 4), color: t > 2.6 ? h.C.bad : h.C.ink }) +
        h.stat(500, 230, '½ INCH', 'GUSSET PLATE THICKNESS', { size: 150, lsize: 28, opacity: h.win(t, 4.4, 4.9) }),
    },
    {
      say: 'The I-35W bridge in Minneapolis opened in {1967,|nineteen sixty-seven,} and carried {140,000|a hundred and forty thousand} vehicles a day.',
      draw: (h, p, t) => {
        let cars = '';
        for (let i = 0; i < 7; i++) { const x = ((t * 150 + i * 125) % 800) + 100; cars += h.rect(x - 16, 396, 32, 16, { fill: i % 2 ? h.C.warn : h.C.line, r: 4, opacity: h.win(t, 2, 2.6) }); }
        return truss(h, { draw: h.win(t, 0, 1.6), onDeck: cars }) + h.stat(500, 240, h.fmt(140000 * h.win(t, 4.6, 6.4)), 'VEHICLES PER DAY', { size: 140, lsize: 28, opacity: h.win(t, 4.5, 5) });
      },
    },
    {
      say: 'Its steel truss members were joined by flat plates, called gusset plates. A design error left some of them undersized, at just half an inch thick.',
      draw: (h, p, t) => gusset(h, 500, 520, { color: t > 6 ? h.C.bad : h.C.warn }) +
        h.tag(500, 150, 'GUSSET PLATE', { size: 40, opacity: h.win(t, 2.6, 3.2) }) + h.arrow(500, 190, 500, 350, { draw: h.win(t, 2.8, 3.4), w: 5 }) +
        h.tag(500, 760, 'UNDERSIZED · 0.5 IN THICK', { size: 34, color: h.C.bad, opacity: h.win(t, 6.4, 7) }),
    },
    {
      say: 'The bridge stayed in service for {39|thirty-nine} years. Over that time, two inches of added concrete raised its static load by {20%.|twenty percent.}',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 4.4, 6.6);
        return h.stat(500, 230, '39 YEARS', 'IN SERVICE', { size: 130, lsize: 28, fill: C.ink, opacity: h.win(t, .3, .8) }) +
          h.rect(180, 560, 640, 70, { fill: C.dim, r: 4 }) + h.text(500, 690, 'ORIGINAL DECK', { size: 26, mono: true, fill: C.dim }) +
          h.rect(180, 560 - 34 * k, 640, 34 * k, { fill: C.warn, r: 2 }) + h.text(850, 550, '+2 IN', { size: 34, weight: 900, fill: C.warn, anchor: 'start', opacity: k }) +
          h.stat(500, 830, '+20%', 'STATIC LOAD', { size: 100, lsize: 26, gap: 46, fill: C.bad, opacity: h.win(t, 7.2, 7.8) });
      },
    },
    {
      say: 'On {August 1st,|August first,} {2007,|two thousand seven,} {578,000|five hundred and seventy-eight thousand} pounds of construction materials and equipment sat on the deck.',
      draw: (h, p, t) => {
        const k = h.win(t, 3.4, 4.6);
        const piles = h.rect(330, 420 - 44 * k, 70, 44 * k, { fill: h.C.warn, r: 4 }) + h.rect(410, 420 - 60 * k, 90, 60 * k, { fill: h.C.warn, r: 4 }) + h.rect(510, 420 - 36 * k, 60, 36 * k, { fill: h.C.warn, r: 4 });
        return truss(h, { onDeck: piles }) + h.arrow(450, 250, 450, 340, { stroke: h.C.bad, draw: h.win(t, 4.6, 5.2) }) +
          h.stat(500, 200, h.fmt(578000 * h.win(t, 3.6, 5.4)) + ' LB', 'CONSTRUCTION LOAD ON DECK', { size: 100, lsize: 26, gap: 44, fill: h.C.bad, opacity: h.win(t, 3.5, 4) }) +
          h.tag(500, 660, 'AUGUST 1, 2007', { size: 34, color: h.C.line, opacity: h.win(t, .2, .7) });
      },
    },
    {
      say: 'At {6:05|six oh five} in the evening rush hour, a gusset plate ripped along a line of rivets. {111|A hundred and eleven} vehicles were on the bridge.',
      draw: (h, p, t) => {
        const tear = h.win(t, 3.4, 4.8), sw = h.win(t, 6.4, 7);
        return h.g(gusset(h, 500, 520, { color: h.C.bad, tear }), { opacity: 1 - sw }) + h.g(truss(h, { broken: h.win(t, 7, 8.2), color: h.C.bad }), { opacity: sw }) +
          h.tag(500, 130, '6:05 PM', { size: 46, solid: true, color: h.C.bad, opacity: h.win(t, .2, .6) }) +
          h.stat(500, 300, '111', 'VEHICLES ON THE BRIDGE', { size: 120, lsize: 26, gap: 50, opacity: h.win(t, 8.4, 8.9) });
      },
    },
    {
      say: '{13|Thirteen} people died, and {145|a hundred and forty-five} were injured. A replacement bridge opened in September {2008.|two thousand eight.}',
      draw: (h, p, t) => h.stat(280, 300, '13', 'KILLED', { size: 220, fill: h.C.bad, opacity: h.win(t, 0, .4) }) + h.stat(720, 300, '145', 'INJURED', { size: 220, opacity: h.win(t, 1.6, 2) }) +
        h.stat(500, 640, 'SEPT 2008', 'REPLACEMENT BRIDGE OPENS', { size: 110, lsize: 28, fill: h.C.ok, opacity: h.win(t, 4.4, 5) }),
    },
  ],
};

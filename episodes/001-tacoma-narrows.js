// Bridge elevation. deck(u, side) returns the vertical offset of a deck edge at u in 0..1 of the main span.
function bridge(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, deckY = 600, x0 = 220, x1 = 780, top = 330;
  const off = o.deck || (() => 0), cut = o.cut;
  const pts = side => {
    let s = '';
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      if (cut && u > cut[0] && u < cut[1]) { s += ' '; continue; }
      const cmd = s === '' || s.endsWith(' ') ? 'M' : 'L';
      s += `${cmd}${h.lerp(x0, x1, u).toFixed(1)} ${(deckY + off(u, side)).toFixed(1)}`;
    }
    return s;
  };
  const cable = `M40 ${deckY} L${x0} ${top} Q500 ${deckY + 150} ${x1} ${top} L960 ${deckY}`;
  let hang = '';
  for (let i = 1; i < 14; i++) {
    const u = i / 14;
    if (cut && u > cut[0] && u < cut[1]) continue;
    const x = h.lerp(x0, x1, u), cy = top + (deckY - 75 - top) * 4 * u * (1 - u) * 1 ;
    hang += h.line(x, cy, x, deckY + off(u, 1), { stroke: C.faint, w: 2.5, opacity: d });
  }
  return h.line(0, deckY + 150, 1000, deckY + 150, { stroke: C.faint, w: 3, dash: '14 14' }) +
    h.text(500, deckY + 200, 'PUGET SOUND', { size: 24, mono: true, fill: C.faint, ls: 6 }) +
    hang +
    h.path(cable, { stroke: C.line, w: 5, draw: d }) +
    h.line(x0, deckY + 150, x0, top - 14, { stroke: C.ink, w: 14, draw: d }) +
    h.line(x1, deckY + 150, x1, top - 14, { stroke: C.ink, w: 14, draw: d }) +
    h.line(40, deckY, x0, deckY, { stroke: C.ink, w: 8, draw: d }) + h.line(x1, deckY, 960, deckY, { stroke: C.ink, w: 8, draw: d }) +
    h.path(pts(-1), { stroke: C.dim, w: 6, opacity: o.twist ? d : 0 }) +
    h.path(pts(1), { stroke: o.color || C.ink, w: 8, opacity: d });
}

// Deck cross-section: slab with a solid plate girder on each edge.
function section(h, cx, cy, angle, o = {}) {
  const { C } = h, w = o.w || 380, gh = o.gh || 74, col = o.color || C.ink;
  return h.g(
    h.rect(-w / 2, -8, w, 16, { fill: col }) +
    h.rect(-w / 2 - 8, -gh / 2, 16, gh, { fill: col }) + h.rect(w / 2 - 8, -gh / 2, 16, gh, { fill: col }),
    { transform: `translate(${cx} ${cy}) rotate(${angle})` });
}

export default {
  id: '001',
  case: 'TACOMA NARROWS BRIDGE',
  year: 'WASHINGTON STATE · 1940',
  title: 'The bridge that tore itself apart in a 40 mph wind',
  description: 'The Tacoma Narrows Bridge opened on July 1, 1940 and collapsed on November 7 the same year. The cause was aeroelastic flutter, not simple resonance.',
  tags: ['engineering', 'engineeringfailure', 'tacomanarrows', 'bridges', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Tacoma Narrows Bridge (1940)" — https://en.wikipedia.org/wiki/Tacoma_Narrows_Bridge_(1940) (retrieved November 2026)',
    'Billah & Scanlan, "Resonance, Tacoma Narrows bridge failure, and undergraduate physics textbooks", American Journal of Physics 59 (1991) — cited there for flutter vs. resonance',
  ],
  scenes: [
    { // hook
      say: 'This bridge was {4|four} months old when it tore itself apart, in a wind of just {40|forty} miles an hour.',
      draw: (h, p, t) => {
        const A = 46 * h.win(t, 0, 1.2);
        const deck = (u, side) => side * A * Math.sin(2 * Math.PI * u) * Math.sin(t * 5.2);
        return bridge(h, { deck, twist: true }) +
          h.stat(270, 190, '4', 'MONTHS OLD', { size: 190, opacity: h.win(t, 0.1, 0.5) }) +
          h.stat(720, 190, '40', 'MPH WIND', { size: 190, fill: h.C.line, opacity: h.win(t, 3.4, 3.9) });
      },
    },
    {
      say: 'The Tacoma Narrows Bridge opened in July {1940|nineteen forty}. It was the third longest suspension bridge in the world.',
      draw: (h, p, t) => {
        const d = h.win(t, 0, 1.6);
        return bridge(h, { draw: d }) +
          h.arrow(500, 720, 222, 720, { draw: h.win(t, 1.4, 2), stroke: h.C.warn, w: 5 }) + h.arrow(500, 720, 778, 720, { draw: h.win(t, 1.4, 2), stroke: h.C.warn, w: 5 }) +
          h.tag(500, 690, 'MAIN SPAN 2,800 FT', { opacity: h.win(t, 1.6, 2.1) }) +
          h.stat(500, 200, '#3', 'LONGEST IN THE WORLD, 1940', { size: 180, opacity: h.win(t, 3.4, 3.9) });
      },
    },
    {
      say: 'To keep it slender, the deck was stiffened with solid steel girders only {8|eight} feet deep, instead of the {25|twenty-five} foot open trusses first proposed.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 4.6, 5.2), b = h.win(t, 0.8, 1.4);
        let lattice = '';
        for (let i = 0; i < 6; i++) lattice += h.line(90 + i * 50, 330, 140 + i * 50, 555, { stroke: C.dim, w: 4 }) + h.line(140 + i * 50, 330, 90 + i * 50, 555, { stroke: C.dim, w: 4 });
        const truss = h.g(h.rect(90, 330, 300, 225, { stroke: C.dim, w: 6 }) + lattice +
          h.line(420, 330, 420, 555, { stroke: C.dim, w: 3 }) + h.text(250, 640, '25 FT TRUSS', { size: 34, mono: true, fill: C.dim }) +
          h.text(250, 690, 'PROPOSED', { size: 26, mono: true, fill: C.faint, ls: 4 }), { opacity: a });
        const girder = h.g(section(h, 750, 442, 0, { w: 300, gh: 72, color: C.warn }) +
          h.line(930, 406, 930, 478, { stroke: C.warn, w: 3 }) + h.text(750, 640, '8 FT GIRDER', { size: 34, mono: true, fill: C.warn }) +
          h.text(750, 690, 'AS BUILT', { size: 26, mono: true, fill: C.dim, ls: 4 }), { opacity: b });
        return h.text(500, 200, 'DECK CROSS-SECTION', { size: 30, mono: true, fill: C.dim, ls: 6 }) + truss + girder +
          h.text(500, 460, 'VS', { size: 44, weight: 900, fill: C.faint, opacity: a });
      },
    },
    {
      say: 'The deck bounced in the wind so much that construction workers nicknamed it Galloping Gertie.',
      draw: (h, p, t) => {
        const deck = u => 30 * Math.sin(3 * Math.PI * u) * Math.sin(t * 4.4);
        let wind = '';
        for (let i = 0; i < 4; i++) { const x = ((t * 260 + i * 260) % 1040) - 40; wind += h.line(x, 250 + i * 34, x + 90, 250 + i * 34, { stroke: h.C.line, w: 4, opacity: .5 }); }
        return wind + bridge(h, { deck }) + h.tag(500, 150, '"GALLOPING GERTIE"', { size: 40, opacity: h.win(t, 2.6, 3.1) });
      },
    },
    {
      say: 'On November {7th|seventh}, the motion changed. The deck began to twist. That is aeroelastic flutter. The motion itself draws energy from the wind, so every twist grows.',
      draw: (h, p, t) => {
        const { C } = h, A = h.lerp(4, 34, h.win(t, 1.5, 11)), ang = A * Math.sin(t * 4.2);
        let wind = '';
        for (let i = 0; i < 5; i++) { const x = ((t * 300 + i * 150) % 520) - 60; wind += h.arrow(x, 330 + i * 60, x + 110, 330 + i * 60, { stroke: C.line, w: 4, head: 14, opacity: .7 }); }
        const k = h.win(t, 7.5, 9);
        const loop = h.path('M320 700 A180 70 0 0 0 680 700', { stroke: C.warn, w: 5, draw: k }) + h.arrow(672, 708, 684, 694, { stroke: C.warn, w: 5, draw: k > .95 ? 1 : 0, head: 18 });
        return h.text(500, 150, 'DECK, SEEN END-ON', { size: 30, mono: true, fill: C.dim, ls: 6 }) + wind +
          h.line(240, 450, 760, 450, { stroke: C.faint, w: 2, dash: '8 10' }) +
          section(h, 500, 450, ang, { color: A > 22 ? C.bad : C.ink }) +
          h.tag(500, 250, A > 22 ? 'TWIST GROWING' : 'TWIST', { color: A > 22 ? C.bad : C.line }) + loop +
          h.text(500, 800, 'MOTION FEEDS ITSELF', { size: 30, mono: true, fill: C.warn, ls: 4, opacity: k }) +
          h.tag(500, 630, 'AEROELASTIC FLUTTER', { size: 38, solid: true, opacity: h.win(t, 4.6, 5) });
      },
    },
    {
      say: 'It was not simple resonance, the textbook explanation. That morning, the main span broke up and fell into Puget Sound.',
      draw: (h, p, t) => {
        const { C } = h, fall = h.win(t, 4.6, 6.6), k = h.win(t, .3, .9);
        const amp = 50 * (1 - fall);
        const deck = (u, side) => side * amp * Math.sin(2 * Math.PI * u) * Math.sin(t * 5.2);
        const w = 0.5 * fall;
        const piece = fall > 0 ? h.g(h.line(-140, 0, 140, 0, { stroke: C.bad, w: 8 }), { transform: `translate(500 ${600 + fall * fall * 170}) rotate(${fall * 38})`, opacity: 1 - fall * .6 }) : '';
        return bridge(h, { deck, twist: true, cut: fall > 0 ? [.5 - w * .5 - .001, .5 + w * .5] : null, color: fall > 0 ? C.bad : C.ink }) + piece +
          h.g(h.text(500, 190, 'RESONANCE', { size: 84, weight: 900, fill: C.dim }) + h.line(230, 164, 230 + 540 * h.win(t, .9, 1.5), 164, { stroke: C.bad, w: 10 }), { opacity: k * (1 - h.win(t, 4, 4.5)) }) +
          h.tag(500, 190, 'NOVEMBER 7, 1940', { size: 40, color: C.bad, opacity: h.win(t, 4.5, 5) });
      },
    },
    {
      say: 'The only death was a cocker spaniel named Tubby. A replacement bridge opened ten years later, in {1950|nineteen fifty}.',
      draw: (h, p, t) => {
        const { C } = h, a = 1 - h.win(t, 3.4, 3.9), b = h.win(t, 3.9, 5.2);
        let tr = '';
        for (let i = 0; i < 20; i++) tr += h.line(220 + i * 28, 600, 248 + i * 28, 640, { stroke: C.ok, w: 3, opacity: b }) + h.line(248 + i * 28, 600, 220 + i * 28, 640, { stroke: C.ok, w: 3, opacity: b });
        return h.g(h.stat(500, 430, '1', 'LIFE LOST', { size: 320, gap: 80, lsize: 40 }) + h.text(500, 590, 'A DOG NAMED TUBBY', { size: 34, mono: true, fill: C.ink, ls: 3 }), { opacity: a }) +
          h.g(bridge(h, { draw: b, color: C.ok }) + tr + h.line(220, 640, 780, 640, { stroke: C.ok, w: 5, draw: b }) +
            h.stat(500, 210, '1950', 'REPLACEMENT OPENS', { size: 170, fill: C.ok }), { opacity: b });
      },
    },
  ],
};

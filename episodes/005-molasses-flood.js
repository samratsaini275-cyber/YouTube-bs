const MOL = '#8A4B14', MOL2 = '#C97A2B';

// Storage tank standing on the ground line (y = 720). fill 0..1, burst 0..1.
function tank(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, fill = o.fill ?? 0, col = o.color || C.ink;
  const x = 300, w = 400, top = 300, base = 720, lvl = base - (base - top - 14) * fill;
  let rivets = '';
  for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) rivets += h.circle(x + 24 + i * 44, top + 40 + r * 84, 4, { fill: col, opacity: .45 * d });
  return h.rect(x + 6, lvl, w - 12, base - lvl, { fill: MOL, opacity: fill > 0 ? .95 : 0 }) +
    h.path(`M${x} ${base} L${x} ${top} Q${x + w / 2} ${top - 70} ${x + w} ${top} L${x + w} ${base}`, { stroke: col, w: 8, draw: d }) + rivets +
    h.line(60, base, 940, base, { stroke: C.dim, w: 6 });
}
// Row of small buildings along the street.
function street(h, x0, tilt = 0) {
  let s = '';
  for (let i = 0; i < 3; i++) { const x = x0 + i * 86, hh = 90 + (i % 2) * 40; s += h.g(h.rect(0, -hh, 66, hh, { stroke: h.C.dim, w: 4, fill: h.C.panel }) + h.rect(14, -hh + 16, 14, 18, { fill: h.C.faint }) + h.rect(38, -hh + 16, 14, 18, { fill: h.C.faint }), { transform: `translate(${x} 720) rotate(${tilt * (i + 1) * 4} 66 0)` }); }
  return s;
}

export default {
  id: '005',
  case: 'GREAT MOLASSES FLOOD',
  year: 'BOSTON · 1919',
  hook: ['A 25-FOOT WAVE', 'OF MOLASSES.'],
  title: 'A 25-foot wave of molasses hit Boston at 35 mph',
  description: 'On January 15, 1919, a storage tank holding up to 2.3 million US gallons of molasses burst in Boston\'s North End, killing 21 people and injuring 150.',
  tags: ['history', 'engineeringfailure', 'boston', 'molassesflood', 'engineering', 'shorts'],
  sources: [
    'Wikipedia, "Great Molasses Flood" — https://en.wikipedia.org/wiki/Great_Molasses_Flood (retrieved November 2026)',
    'The 2014 structural analysis is described and cited in the Wikipedia article above',
  ],
  scenes: [
    {
      say: 'A wave of molasses, {25|twenty-five} feet high, moving at {35|thirty-five} miles an hour. This really happened, in Boston, in {1919.|nineteen nineteen.}',
      draw: (h, p, t) => {
        const k = h.win(t, .2, 5.5), x = h.lerp(-200, 620, k);
        const wave = `M-100 720 L-100 470 Q${x - 220} 440 ${x - 60} 470 Q${x + 60} 500 ${x + 40} 600 Q${x + 30} 690 ${x + 150} 720Z`;
        return street(h, 660, k > .8 ? (k - .8) * 5 : 0) + `<path d="${wave}" fill="${MOL}" stroke="${MOL2}" stroke-width="6"/>` + h.line(60, 720, 940, 720, { stroke: h.C.dim, w: 6 }) +
          h.stat(280, 250, '25 FT', 'WAVE HEIGHT AT PEAK', { size: 130, lsize: 26, opacity: h.win(t, 2, 2.5) }) +
          h.stat(740, 250, '35 MPH', 'ESTIMATED SPEED', { size: 130, lsize: 26, fill: h.C.line, opacity: h.win(t, 4.4, 4.9) });
      },
    },
    {
      say: 'The tank stood {50|fifty} feet tall and {90|ninety} feet across, and held up to {2.3|two point three} million gallons.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 1.2, 1.9), b = h.win(t, 2.6, 3.3), f = h.win(t, 4, 7);
        return tank(h, { draw: h.win(t, 0, 1.2), fill: f }) +
          h.arrow(240, 510, 240, 300, { draw: a, w: 5 }) + h.arrow(240, 510, 240, 720, { draw: a, w: 5 }) + h.text(150, 525, '50 FT', { size: 40, weight: 900, fill: C.warn, opacity: a }) +
          h.arrow(500, 780, 300, 780, { draw: b, w: 5 }) + h.arrow(500, 780, 700, 780, { draw: b, w: 5 }) + h.text(500, 845, '90 FT', { size: 40, weight: 900, fill: C.warn, opacity: b }) +
          h.stat(500, 170, h.fmt(2.3 * f, 1) + 'M', 'US GALLONS', { size: 130, lsize: 30, opacity: h.win(t, 4, 4.5) });
      },
    },
    {
      say: 'It leaked so badly that it was painted brown to hide the leaks.',
      draw: (h, p, t) => {
        let drips = '';
        for (let i = 0; i < 7; i++) { const x = 320 + i * 58, y0 = 400 + (i * 67) % 200, k = h.clamp(((t * .55 + i * .23) % 1)); drips += h.line(x, y0, x, y0 + 110 * k, { stroke: MOL2, w: 7, opacity: 1 - k * .6 }); }
        const paint = h.win(t, 2.2, 4.2);
        return tank(h, { fill: .92 }) + drips + h.rect(300, 720 - 430 * paint, 400, 430 * paint, { fill: MOL, opacity: .8 }) +
          h.tag(500, 200, 'PAINTED BROWN', { size: 40, color: MOL2, opacity: h.win(t, 2.4, 3) });
      },
    },
    {
      say: 'A {2014|twenty fourteen} engineering analysis found the steel was half as thick as it should have been, even by the standards of the time.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 2.4, 3.2), b = h.win(t, 3.4, 4.2);
        return h.text(500, 150, 'TANK WALL · CROSS-SECTION', { size: 28, mono: true, fill: C.dim, ls: 4 }) +
          h.g(h.rect(240, 280, 120, 420, { fill: C.dim, r: 4 }) + h.text(300, 760, 'NEEDED', { size: 32, mono: true, fill: C.dim }), { opacity: a }) +
          h.g(h.rect(670, 280, 60, 420, { fill: C.bad, r: 4 }) + h.text(700, 760, 'AS BUILT', { size: 32, mono: true, fill: C.bad }), { opacity: b }) +
          h.stat(500, 520, '½', 'THE THICKNESS', { size: 240, lsize: 30, gap: 70, opacity: h.win(t, 3.6, 4.2) }) +
          h.text(500, 850, 'SCHEMATIC · NOT TO SCALE', { size: 22, mono: true, fill: C.faint, ls: 3 });
      },
    },
    {
      say: 'On {January 15th,|January fifteenth,} after a rapid rise in temperature, the tank burst.',
      draw: (h, p, t) => {
        const { C } = h, temp = h.win(t, 1.6, 3.8), burst = h.win(t, 4.4, 5.4);
        const sh = t > 4.2 && t < 5.2 ? h.noise(t * 9) * 7 : 0;
        const xl = 300 - 330 * burst, xr = 700 + 330 * burst, py = 720 - 300 * (1 - burst * .55);
        const spill = burst > 0 ? `<path d="M${xl} 720 C${xl + 60} 650 380 ${py} 500 ${py} C620 ${py} ${xr - 60} 650 ${xr} 720Z" fill="${MOL}" stroke="${MOL2}" stroke-width="6"/>` : '';
        return h.g(tank(h, { fill: .92 * (1 - burst * .7), color: burst > 0 ? C.bad : C.ink }), { transform: `translate(${sh} 0)` }) + spill +
          h.rect(840, 300, 30, 300, { stroke: C.dim, w: 4, r: 15 }) + h.rect(844, 596 - 230 * temp, 22, 230 * temp, { fill: C.bad, r: 11 }) + h.circle(855, 620, 30, { fill: C.bad }) +
          h.text(855, 270, 'TEMP', { size: 24, mono: true, fill: C.dim }) +
          h.tag(500, 170, 'JANUARY 15, 1919', { size: 40, color: C.bad, opacity: h.win(t, .2, .7) });
      },
    },
    {
      say: '{21|Twenty-one} people were killed, and {150|a hundred and fifty} were injured.',
      draw: (h, p, t) => h.stat(500, 330, '21', 'KILLED', { size: 280, fill: h.C.bad, gap: 70, opacity: h.win(t, 0, .4) }) +
        h.stat(500, 680, '150', 'INJURED', { size: 220, gap: 70, opacity: h.win(t, 1.8, 2.2) }),
    },
    {
      say: 'After three years of hearings, the owner was found responsible, and paid {$628,000|six hundred and twenty-eight thousand dollars} in damages.',
      draw: (h, p, t) => h.stat(500, 300, '3 YEARS', 'OF HEARINGS', { size: 130, fill: h.C.ink, opacity: h.win(t, .2, .7) }) +
        h.tag(500, 470, 'OWNER FOUND RESPONSIBLE', { size: 34, color: h.C.bad, opacity: h.win(t, 2.4, 3) }) +
        h.stat(500, 690, '$' + h.fmt(628000 * h.win(t, 4.2, 6.2)), 'PAID IN DAMAGES', { size: 150, lsize: 30, opacity: h.win(t, 4.1, 4.6) }),
    },
  ],
};

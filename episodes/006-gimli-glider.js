// Airliner in side view, nose to the right, centred on (x, y).
function jet(h, x, y, o = {}) {
  const { C } = h, col = o.color || C.ink;
  return h.g(
    `<path d="M-170 0 Q-170 -22 -120 -24 L110 -24 Q170 -18 185 2 Q170 22 110 24 L-120 24 Q-170 22 -170 0Z" fill="${C.panel}" stroke="${col}" stroke-width="6"/>` +
    `<path d="M-160 -20 L-205 -92 L-150 -92 L-100 -24Z" fill="${C.panel}" stroke="${col}" stroke-width="6" stroke-linejoin="round"/>` +
    `<path d="M-30 10 L-110 86 L-40 86 L60 10Z" fill="${C.panel}" stroke="${col}" stroke-width="6" stroke-linejoin="round"/>` +
    h.rect(-20, 44, 70, 30, { stroke: o.engine || col, w: 5, r: 12, fill: C.panel }) +
    (o.rat ? h.line(-60, 24, -60, 66, { stroke: C.warn, w: 5 }) + h.circle(-60, 78, 13, { stroke: C.warn, w: 5 }) : ''),
    { transform: `translate(${x} ${y}) rotate(${o.rot || 0}) scale(${o.s || 1})`, opacity: o.opacity ?? 1 });
}
// Fuel bar: frac of the needed amount.
const fuel = (h, y, label, frac, col, k) => h.text(120, y - 22, label, { size: 28, mono: true, fill: h.C.dim, anchor: 'start', opacity: k > 0 ? 1 : 0 }) +
  h.rect(120, y, 760, 70, { stroke: h.C.faint, w: 3, r: 10, opacity: k > 0 ? 1 : 0 }) + h.rect(120, y, 760 * frac * k, 70, { fill: col, r: 10 });

export default {
  id: '006',
  case: 'THE GIMLI GLIDER',
  year: 'AIR CANADA FLIGHT 143 · 1983',
  hook: ['OUT OF FUEL', 'AT 41,000 FEET.'],
  title: 'A 767 ran out of fuel at 41,000 feet over a unit mix-up',
  description: 'On July 23, 1983, Air Canada Flight 143, a Boeing 767, ran out of fuel at 41,000 feet after a pounds/kilograms conversion error and glided to a landing at Gimli, Manitoba. All 69 people on board survived.',
  tags: ['aviation', 'gimliglider', 'boeing767', 'engineeringfailure', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Gimli Glider" — https://en.wikipedia.org/wiki/Gimli_Glider (retrieved November 2026)',
    'Conversion check: 1.77 lb/L ÷ 2.2046 lb/kg = 0.803 kg/L; 22,300 lb ÷ 2.2046 = 10,115 kg, i.e. about 45% of 22,300 kg',
  ],
  scenes: [
    {
      say: 'A Boeing {767|seven six seven} ran out of fuel at {41,000|forty-one thousand} feet, because of a unit conversion.',
      draw: (h, p, t) => jet(h, 500, 420 + Math.sin(t * 1.4) * 10, { s: 1.4, engine: t > 2 ? h.C.bad : h.C.ink }) +
        h.stat(500, 200, '41,000 FT', null, { size: 120, fill: h.C.line, opacity: h.win(t, 2.2, 2.7) }) +
        h.tag(500, 700, 'FUEL: 0', { size: 54, solid: true, color: h.C.bad, opacity: h.win(t, 1.2, 1.6) }),
    },
    {
      say: '{July 23rd,|July twenty-third,} {1983.|nineteen eighty-three.} Air Canada Flight {143.|one four three.} The fuel gauges are not working, so the fuel is measured by hand.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 6.4, 8.4);
        return h.tag(500, 130, 'JULY 23, 1983 · FLIGHT 143', { size: 34, color: C.line, opacity: h.win(t, .2, .7) }) +
          h.g(h.rect(200, 250, 600, 200, { stroke: C.dim, w: 5, r: 16, fill: C.panel }) + h.text(500, 320, 'FUEL QUANTITY', { size: 28, mono: true, fill: C.dim, ls: 4 }) +
            h.text(500, 410, '– – – –', { size: 70, weight: 900, fill: C.bad, mono: true }), { opacity: h.win(t, 4.2, 4.8) }) +
          h.rect(260, 560, 480, 240, { stroke: C.ink, w: 6, r: 10 }) + h.rect(266, 680, 468, 114, { fill: C.warn, opacity: .35 }) +
          h.line(500, 520, 500, 520 + 250 * k, { stroke: C.line, w: 10, opacity: k > 0 ? 1 : 0 }) + h.text(780, 690, 'TANK', { size: 26, mono: true, fill: C.dim, anchor: 'start' }) +
          h.text(500, 860, 'MEASURED BY HAND', { size: 30, mono: true, fill: C.line, ls: 3, opacity: k });
      },
    },
    {
      say: 'To turn litres into kilograms, the crew multiplied by {1.77.|one point seven seven.} But that figure was pounds per litre. The right one was about {0.8|zero point eight} kilograms per litre.',
      draw: (h, p, t) => {
        const { C } = h, wrong = h.win(t, 5.2, 5.8);
        return h.text(500, 150, 'LITRES  ×  DENSITY  =  MASS', { size: 34, mono: true, fill: C.dim, ls: 2 }) +
          h.g(h.text(500, 380, '× 1.77', { size: 200, weight: 900, fill: wrong > .5 ? C.bad : C.warn, ls: -3 }), { opacity: h.win(t, 2.6, 3.1) }) +
          h.tag(500, 470, 'POUNDS PER LITRE', { size: 36, color: C.bad, opacity: wrong }) +
          h.g(h.text(500, 700, '× 0.8', { size: 170, weight: 900, fill: C.ok, ls: -3 }) + h.tag(500, 790, 'KILOGRAMS PER LITRE', { size: 36, color: C.ok }), { opacity: h.win(t, 8.4, 9) });
      },
    },
    {
      say: 'The aircraft needed {22,300|twenty-two thousand three hundred} kilograms of fuel. It took off with {22,300|twenty-two thousand three hundred} pounds. Less than half.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, .4, 2.4), b = h.win(t, 4.6, 6.4);
        return fuel(h, 260, 'NEEDED · 22,300 KG', 1, C.ok, a) + fuel(h, 480, 'LOADED · 22,300 LB = 10,100 KG', .453, C.bad, b) +
          h.stat(500, 760, Math.round(45 * h.win(t, 7.6, 8.6)) + '%', 'OF THE FUEL REQUIRED', { size: 170, fill: C.bad, lsize: 30, opacity: h.win(t, 7.5, 8) });
      },
    },
    {
      say: 'Halfway to Edmonton, both engines stopped. A small wind turbine dropped from the fuselage to power the hydraulics.',
      draw: (h, p, t) => {
        const { C } = h, rat = t > 4.2;
        let wind = '';
        for (let i = 0; i < 5; i++) { const x = 1000 - ((t * 420 + i * 230) % 1100); wind += h.line(x, 250 + i * 95, x + 120, 250 + i * 95, { stroke: C.faint, w: 4 }); }
        return wind + jet(h, 500, 430, { s: 1.5, engine: t > 2 ? C.bad : C.ink, rat, rot: 3 }) +
          h.tag(500, 160, 'BOTH ENGINES OUT', { size: 40, color: C.bad, solid: true, opacity: h.win(t, 2, 2.4) }) +
          h.arrow(300, 720, 400, 580, { draw: h.win(t, 4.6, 5.2), w: 5 }) + h.text(290, 770, 'RAM AIR TURBINE', { size: 30, mono: true, fill: C.warn, opacity: h.win(t, 4.8, 5.4) });
      },
    },
    {
      say: 'The captain, an experienced glider pilot, brought the jet down on a former air force runway at Gimli, where a car race was underway.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, .4, 7.2), x = h.lerp(120, 640, k), y = h.lerp(180, 640, k);
        let cars = '';
        for (let i = 0; i < 4; i++) cars += h.rect(760 + i * 44, 690, 30, 16, { fill: C.warn, r: 4, opacity: h.win(t, 6, 6.6) });
        return h.path('M120 180 L640 640', { stroke: C.faint, w: 4, dash: '12 12' }) + jet(h, x, y - 40, { s: .8, rot: 12 * (1 - k * .7), engine: C.bad, rat: true }) +
          h.line(380, 712, 960, 712, { stroke: C.ink, w: 10 }) + h.line(400, 712, 940, 712, { stroke: C.bg, w: 3, dash: '26 22' }) + cars +
          h.text(670, 780, 'GIMLI, MANITOBA', { size: 32, mono: true, fill: C.line, ls: 3 }) +
          h.tag(700, 250, 'NO ENGINE POWER', { color: C.bad, opacity: h.win(t, .6, 1.1) });
      },
    },
    {
      say: 'All {69|sixty-nine} people on board survived. The aircraft was repaired, and flew until {2008.|two thousand eight.}',
      draw: (h, p, t) => h.stat(500, 360, '69', 'ON BOARD · ALL SURVIVED', { size: 300, gap: 80, lsize: 34, fill: h.C.ok, opacity: h.win(t, 0, .4) }) +
        jet(h, 500, 600, { color: h.C.ok, opacity: h.win(t, 3, 3.6) }) +
        h.text(500, 780, 'IN SERVICE UNTIL 2008', { size: 40, mono: true, fill: h.C.ink, ls: 3, opacity: h.win(t, 4.4, 5) }),
    },
  ],
};

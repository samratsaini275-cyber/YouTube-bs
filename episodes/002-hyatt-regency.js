// Connection detail: a box beam (walkway cross-beam) hanging on threaded rods.
// mode 'one' = single continuous rod (as designed), 'two' = two offset rods (as built).
function detail(h, mode, o = {}) {
  const { C } = h, k = o.k ?? 1, drop = o.drop || 0, hot = o.hot;
  const beam = (y, label, col) =>
    h.rect(250, y, 500, 70, { stroke: col, w: 6, fill: C.panel, r: 4 }) +
    h.text(500, y + 47, label, { size: 28, mono: true, fill: col });
  const nut = (x, y, col) => h.rect(x - 26, y, 52, 22, { fill: col, r: 4 });
  const upY = 330, lowY = 640 + drop;
  let s = h.line(120, 140, 880, 140, { stroke: C.dim, w: 10 }) + h.text(500, 110, 'CEILING', { size: 24, mono: true, fill: C.dim, ls: 6 });
  if (mode === 'one') {
    s += h.line(430, 140, 430, lowY + 92, { stroke: C.line, w: 9, draw: k }) +
      beam(upY, '4TH FLOOR WALKWAY', C.ink) + beam(lowY, '2ND FLOOR WALKWAY', C.ink) +
      nut(430, upY + 70, C.line) + nut(430, lowY + 70, C.line);
  } else {
    s += h.line(430, 140, 430, upY + 92 + (hot ? drop : 0), { stroke: C.line, w: 9 }) +
      h.line(570, upY - 22 + drop, 570, lowY + 92, { stroke: C.warn, w: 9, draw: k }) +
      h.g(beam(upY, '4TH FLOOR WALKWAY', hot ? C.bad : C.ink) + nut(570, upY - 22, C.warn), { transform: `translate(0 ${drop})` }) +
      beam(lowY, '2ND FLOOR WALKWAY', C.ink) +
      nut(430, upY + 70 + (hot ? 0 : 0), hot ? C.bad : C.line) + nut(570, lowY + 70, C.warn);
  }
  return s;
}

// Atrium elevation with the two stacked walkways and a crowd.
function atrium(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, drop = o.drop || 0;
  let rods = '', crowd = '';
  for (const x of [330, 500, 670]) rods += h.line(x, 160, x, 330 + (drop ? 30 : 0), { stroke: C.line, w: 4, draw: d }) + (drop ? '' : h.line(x + 14, 330, x + 14, 520, { stroke: C.warn, w: 4, draw: d }));
  for (let i = 0; i < 40; i++) { const x = 130 + ((i * 97) % 740), y = 742 + ((i * 53) % 46); crowd += h.circle(x, y, 7, { fill: C.dim, opacity: d * .9 }); }
  const walk = (y, col, lab) => h.rect(240, y, 520, 26, { fill: col, r: 3, opacity: d }) + h.text(815, y + 22, lab, { size: 24, mono: true, fill: C.dim, anchor: 'start', opacity: d });
  return h.rect(110, 160, 780, 640, { stroke: C.faint, w: 5 }) + h.line(110, 160, 890, 160, { stroke: C.dim, w: 10, draw: d }) + rods +
    h.g(walk(330, drop ? C.bad : C.ink, '4F') + walk(520, drop ? C.bad : C.ink, '2F'), { transform: `translate(0 ${drop})` }) + crowd +
    h.line(110, 800, 890, 800, { stroke: C.dim, w: 6 });
}

export default {
  id: '002',
  case: 'HYATT REGENCY WALKWAYS',
  year: 'KANSAS CITY · 1981',
  title: 'One changed steel rod killed 114 people',
  description: 'On July 17, 1981, two suspended walkways collapsed in the Hyatt Regency hotel in Kansas City, Missouri. A change from one continuous hanger rod to two offset rods doubled the force on a single connection.',
  tags: ['engineering', 'engineeringfailure', 'hyattregency', 'structuralengineering', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Hyatt Regency walkway collapse" — https://en.wikipedia.org/wiki/Hyatt_Regency_walkway_collapse (retrieved November 2026)',
    'National Bureau of Standards, "Investigation of the Kansas City Hyatt Regency Walkways Collapse", NBS Building Science Series 143 (1982) — the federal investigation cited there',
  ],
  scenes: [
    {
      say: 'One small change to a steel rod killed {114|one hundred and fourteen} people.',
      draw: (h, p, t) => h.stat(500, 300, '114', 'PEOPLE KILLED', { size: 300, gap: 80, lsize: 40, fill: h.C.bad, opacity: h.win(t, 0, .4) }) +
        h.line(500, 480, 500, 480 + 330 * h.win(t, .6, 1.8), { stroke: h.C.line, w: 12 }) + h.rect(460, 800, 80, 30, { fill: h.C.line, r: 5, opacity: h.win(t, 1.6, 2) }) +
        h.tag(700, 650, 'HANGER ROD', { opacity: h.win(t, 1.6, 2.1), color: h.C.line }),
    },
    {
      say: '{July 17th,|July seventeenth,} {1981.|nineteen eighty-one.} About {1,600|sixteen hundred} people fill the atrium of the Hyatt Regency in Kansas City for a dance.',
      draw: (h, p, t) => atrium(h, { draw: h.win(t, 0, 1.6) }) + h.tag(500, 860, '≈ 1,600 PEOPLE IN THE ATRIUM', { opacity: h.win(t, 3.2, 3.8) }),
    },
    {
      say: 'Above them hang two walkways, one directly over the other. The design: one continuous rod from the ceiling, through the fourth floor walkway, down to the second.',
      draw: (h, p, t) => detail(h, 'one', { k: h.win(t, 3.6, 6) }) +
        h.arrow(330, 440, 330, 520, { draw: h.win(t, 7, 7.8) }) + h.text(330, 565, '1×', { size: 54, weight: 900, fill: h.C.warn, opacity: h.win(t, 7.4, 8) }) +
        h.tag(500, 850, 'AS DESIGNED · ONE ROD', { color: h.C.line, opacity: h.win(t, 4, 4.6) }),
    },
    {
      say: 'The steel fabricator proposed two shorter rods instead. But now the lower walkway hangs from the upper walkway\'s beam, not from the ceiling.',
      draw: (h, p, t) => detail(h, 'two', { k: h.win(t, .8, 2.6), hot: t > 6 }) + h.tag(500, 850, 'AS BUILT · TWO RODS', { opacity: h.win(t, 1, 1.6) }) +
        h.arrow(690, 440, 690, 600, { draw: h.win(t, 4.2, 5.2), stroke: h.C.bad }) + h.text(800, 520, 'LOAD', { size: 30, mono: true, fill: h.C.bad, opacity: h.win(t, 4.6, 5.2) }),
    },
    {
      say: 'That doubled the force on one connection. The beam could carry only {30%|thirty percent} of the load it now had to hold. Even the original design reached only {60%|sixty percent} of what the building code required.',
      draw: (h, p, t) => {
        const { C } = h, a = h.win(t, 2.6, 4), b = h.win(t, 7.4, 8.8);
        const bar = (y, label, frac, col, k) => h.text(120, y - 24, label, { size: 28, mono: true, fill: C.dim, anchor: 'start' }) +
          h.rect(120, y, 760, 64, { stroke: C.faint, w: 3, r: 8 }) + h.rect(120, y, 760 * frac * k, 64, { fill: col, r: 8 }) +
          h.text(120 + 760 * frac * k + 20, y + 46, Math.round(frac * 100 * k) + '%', { size: 44, weight: 900, fill: col, anchor: 'start' });
        return h.stat(500, 220, '2×', 'FORCE ON THE 4TH FLOOR CONNECTION', { size: 200, fill: C.bad, lsize: 28, opacity: h.win(t, .2, .7) }) +
          h.g(bar(430, 'AS BUILT · STRENGTH vs. LOAD', .3, C.bad, a), { opacity: h.win(t, 2.4, 2.9) }) +
          h.g(bar(620, 'ORIGINAL DESIGN · STRENGTH vs. CODE', .6, C.warn, b), { opacity: h.win(t, 7.2, 7.7) }) +
          h.line(880, 400, 880, 720, { stroke: C.ink, w: 3, dash: '8 8' }) + h.text(880, 770, 'REQUIRED', { size: 24, mono: true, fill: C.ink, anchor: 'end' });
      },
    },
    {
      say: 'At about {7:05|seven oh five} that evening, the connection tore through. Both walkways fell onto the crowded floor.',
      draw: (h, p, t) => {
        const f = h.clamp((t - 2.6) / 1.1), drop = t > 2.6 ? Math.min(250, 250 * f * f) : 0;
        const sh = t > 2.6 && t < 4.4 ? h.noise(t * 9) * 6 : 0;
        return h.g(atrium(h, { drop }), { transform: `translate(${sh} 0)` }) + h.tag(500, 100, '7:05 PM', { size: 44, color: h.C.bad, solid: true, opacity: h.win(t, .3, .7) });
      },
    },
    {
      say: '{114|One hundred and fourteen} people died and {216|two hundred and sixteen} were injured. The engineering firm lost its licenses in three states.',
      draw: (h, p, t) => h.stat(280, 330, '114', 'KILLED', { size: 200, fill: h.C.bad, opacity: h.win(t, 0, .4) }) +
        h.stat(720, 330, '216', 'INJURED', { size: 200, opacity: h.win(t, 1.6, 2) }) +
        h.g(h.rect(170, 520, 660, 200, { stroke: h.C.dim, w: 4, r: 14, fill: h.C.panel }) + h.text(500, 600, 'ENGINEERING LICENSES', { size: 38, mono: true, fill: h.C.ink }) +
          h.text(500, 670, 'REVOKED', { size: 60, weight: 900, fill: h.C.bad, ls: 8 }), { opacity: h.win(t, 4, 4.6) }),
    },
  ],
};

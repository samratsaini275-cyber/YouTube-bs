const WATER = '#0B3A5C';
// Dam in cross-section: reservoir on the left, canyon downstream on the right. level 0..1, broken 0..1.
function dam(h, o = {}) {
  const { C } = h, d = o.draw ?? 1, lvl = o.level ?? .95, br = o.broken || 0, top = 300 - (o.raise || 0), base = 720;
  const wy = base - (base - 310 + (o.raise || 0)) * lvl * (1 - br * .85);
  const body = `M430 ${base} L500 ${top} L540 ${top} L640 ${base}Z`;
  return h.rect(40, wy, 440, base - wy, { fill: WATER, opacity: .85 }) + h.line(40, wy, 470, wy, { stroke: C.line, w: 5 }) +
    h.path('M40 720 L960 720', { stroke: C.dim, w: 6 }) + h.path('M40 720 L40 250', { stroke: C.dim, w: 6 }) +
    h.g(h.path(body, { stroke: o.color || C.ink, w: 7, fill: C.panel, draw: d }), { opacity: 1 - br, transform: `translate(${br * 160} ${br * 40}) rotate(${br * 24} 600 720)` }) +
    (o.extra || '');
}

export default {
  id: '009',
  case: 'ST. FRANCIS DAM',
  year: 'CALIFORNIA · 1928',
  hook: ['DECLARED SAFE.', 'FAILED THAT NIGHT.'],
  title: 'This dam failed hours after it was declared safe',
  description: 'The St. Francis Dam in San Francisquito Canyon, north of Los Angeles, failed two and a half minutes before midnight on March 12, 1928, killing at least 431 people. The dam failed as a result of defective foundations.',
  tags: ['history', 'engineeringfailure', 'dams', 'losangeles', 'civilengineering', 'shorts'],
  sources: [
    'Wikipedia, "St. Francis Dam" — https://en.wikipedia.org/wiki/St._Francis_Dam (retrieved November 2026)',
  ],
  scenes: [
    {
      say: 'The chief engineer inspected this dam, and judged it safe. That same night, it collapsed.',
      draw: (h, p, t) => {
        const br = h.win(t, 3.8, 5), flood = h.win(t, 4, 5.4);
        return dam(h, { broken: br, color: br > 0 ? h.C.bad : h.C.ink }) +
          `<path d="M470 720 L470 ${720 - 330 * flood * (1 - br * .5)} Q${600 + 200 * flood} ${560 - 80 * flood} ${640 + 320 * flood} 720Z" fill="${WATER}" opacity="${flood * .9}"/>` +
          h.tag(500, 160, '"SAFE"', { size: 60, color: h.C.ok, opacity: h.win(t, 1.6, 2) * (1 - h.win(t, 3.6, 4)) });
      },
    },
    {
      say: 'The {St.|Saint} Francis Dam stood in a canyon north of Los Angeles, {185|one hundred and eighty-five} feet above the stream bed.',
      draw: (h, p, t) => dam(h, { draw: h.win(t, 0, 1.5), level: h.win(t, 1, 4) * .95 }) +
        h.arrow(760, 510, 760, 302, { draw: h.win(t, 4.4, 5), w: 5 }) + h.arrow(760, 510, 760, 718, { draw: h.win(t, 4.4, 5), w: 5 }) +
        h.stat(860, 500, '185', 'FEET', { size: 90, lsize: 28, gap: 44, opacity: h.win(t, 4.6, 5.2) }) +
        h.text(250, 560, 'RESERVOIR', { size: 28, mono: true, fill: h.C.line, ls: 4, opacity: h.win(t, 2, 2.6) }),
    },
    {
      say: 'While it was being planned and built, its height was raised by ten feet, to store more water.',
      draw: (h, p, t) => {
        const r = h.win(t, 1.6, 3.6) * 34;
        return dam(h, { raise: r, level: .95 }) + h.line(380, 300, 700, 300, { stroke: h.C.faint, w: 3, dash: '10 10' }) +
          h.text(720, 310, '1923 PLAN', { size: 24, mono: true, fill: h.C.dim, anchor: 'start' }) +
          h.arrow(600, 296, 600, 300 - r - 4, { draw: r > 4 ? 1 : 0, w: 5, head: 14 }) + h.stat(790, 230, '+10 FT', null, { size: 90, opacity: h.win(t, 2.4, 3) });
      },
    },
    {
      say: 'On {March 12th,|March twelfth,} {1928,|nineteen twenty-eight,} William Mulholland inspected a new leak. He concluded it was not dangerous.',
      draw: (h, p, t) => {
        const { C } = h;
        let drips = '';
        for (let i = 0; i < 3; i++) { const k = (t * .7 + i * .33) % 1; drips += h.circle(620 + i * 6 + k * 50, 640 + k * 76, 6, { fill: C.line, opacity: 1 - k }); }
        return dam(h, {}) + drips + h.circle(626, 650, 46, { stroke: C.warn, w: 5, dash: '12 8', opacity: h.win(t, 4.2, 4.8) }) +
          h.text(760, 600, 'NEW LEAK', { size: 30, mono: true, fill: C.warn, anchor: 'start', opacity: h.win(t, 4.4, 5) }) +
          h.tag(500, 140, 'MARCH 12, 1928', { size: 38, color: C.line, opacity: h.win(t, .2, .7) }) +
          h.tag(500, 220, 'JUDGED NOT DANGEROUS', { size: 30, color: C.ok, opacity: h.win(t, 7.2, 7.8) });
      },
    },
    {
      say: 'Two and a half minutes before midnight, the dam failed. {12.4|Twelve point four} billion gallons surged down the canyon, in a wave up to {140|one hundred and forty} feet high.',
      draw: (h, p, t) => {
        const { C } = h, br = h.win(t, 2.4, 3.6), k = h.win(t, 2.6, 8), x = h.lerp(480, 1100, k);
        const wave = `M440 720 L440 ${720 - 300 * (1 - k * .6)} Q${x - 180} ${470} ${x - 40} 500 Q${x + 50} 540 ${x + 30} 640 Q${x + 30} 700 ${x + 110} 720Z`;
        return dam(h, { broken: br, level: .95, color: C.bad }) + (br > 0 ? `<path d="${wave}" fill="${WATER}" stroke="${C.line}" stroke-width="5" opacity=".92"/>` : '') +
          h.tag(500, 110, '11:57 PM', { size: 46, solid: true, color: C.bad, opacity: h.win(t, .2, .6) }) +
          h.stat(270, 250, '12.4B', 'GALLONS', { size: 110, lsize: 26, fill: C.line, opacity: h.win(t, 4, 4.5) }) +
          h.stat(760, 250, '140 FT', 'INITIAL WAVE', { size: 110, lsize: 26, opacity: h.win(t, 7.4, 7.9) });
      },
    },
    {
      say: 'The flood ran {54|fifty-four} miles to the Pacific Ocean, reaching it around {5:30|five thirty} in the morning. At least {431|four hundred and thirty-one} people died.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, .4, 5);
        const river = 'M120 220 Q260 260 300 380 Q340 520 520 520 Q700 520 760 640 Q790 700 880 720';
        return h.path(river, { stroke: C.faint, w: 16 }) + h.path(river, { stroke: C.line, w: 10, draw: k }) +
          h.circle(120, 220, 16, { fill: C.bad }) + h.text(150, 190, 'DAM · 11:57 PM', { size: 26, mono: true, fill: C.bad, anchor: 'start' }) +
          h.text(880, 780, 'PACIFIC · ≈5:30 AM', { size: 26, mono: true, fill: C.line, anchor: 'end', opacity: h.win(t, 4.6, 5.2) }) +
          h.tag(620, 440, '54 MILES', { size: 36, opacity: h.win(t, 1.6, 2.2) }) + h.text(500, 860, 'ROUTE SCHEMATIC', { size: 20, mono: true, fill: C.faint, ls: 3 }) +
          h.g(h.rect(200, 250, 600, 330, { fill: C.bg, r: 20, opacity: .9 }) + h.stat(500, 440, '431+', 'LIVES LOST', { size: 220, gap: 70, fill: C.bad }), { opacity: h.win(t, 7, 7.5) });
      },
    },
    {
      say: 'The dam failed because of defective foundations. Mulholland told the inquest: If there was an error in human judgment, I was the human.',
      draw: (h, p, t) => {
        const { C } = h, q = h.win(t, 3.6, 4.4);
        return h.g(dam(h, { level: .2, color: C.dim }) + h.path('M380 720 Q520 760 700 720 L700 800 L380 800Z', { stroke: C.bad, w: 5, fill: C.panel, dash: '14 10' }) +
          h.tag(540, 850, 'DEFECTIVE FOUNDATION', { color: C.bad }), { opacity: 1 - q }) +
          h.g(h.text(500, 330, '"If there was an error', { size: 56, weight: 800 }) + h.text(500, 410, 'in human judgment,', { size: 56, weight: 800 }) +
            h.text(500, 490, 'I was the human."', { size: 56, weight: 800, fill: C.warn }) + h.text(500, 590, '— WILLIAM MULHOLLAND, 1928 INQUEST', { size: 26, mono: true, fill: C.dim }), { opacity: q });
      },
    },
  ],
};

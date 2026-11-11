// Treatment head pointing down at a table. beam 0..1, target = X-ray target in place.
function machine(h, o = {}) {
  const { C } = h, beam = o.beam || 0, col = o.color || C.ink;
  return h.rect(380, 180, 240, 150, { stroke: col, w: 7, r: 14, fill: C.panel }) + h.path('M440 330 L470 400 L530 400 L560 330', { stroke: col, w: 7, fill: C.panel }) +
    h.text(500, 270, o.label || 'BEAM SOURCE', { size: 24, mono: true, fill: C.dim }) +
    (o.target ? h.rect(450, 420, 100, 16, { fill: C.line, r: 4 }) + h.text(580, 436, 'X-RAY TARGET', { size: 22, mono: true, fill: C.line, anchor: 'start' }) : '') +
    (beam ? `<path d="M485 402 L${500 - (o.wide || 14)} 690 L${500 + (o.wide || 14)} 690 L515 402Z" fill="${o.beamColor || C.warn}" opacity="${beam * .85}"/>` : '') +
    h.rect(250, 700, 500, 26, { fill: C.dim, r: 8 }) + h.rect(330, 660, 340, 40, { stroke: C.ink, w: 5, r: 20, fill: C.panel }) + h.circle(300, 680, 22, { stroke: C.ink, w: 5, fill: C.panel });
}
// Operator terminal.
function screen(h, lines, o = {}) {
  const { C } = h;
  return h.g(h.rect(150, 220, 700, 440, { stroke: o.color || C.ok, w: 6, r: 18, fill: '#03110A' }) +
    lines.map((l, i) => h.text(200, 310 + i * 70, l[0], { size: l[2] || 40, mono: true, fill: l[1] || C.ok, anchor: 'start', weight: 600 })).join(''), { opacity: o.opacity ?? 1 });
}

export default {
  id: '010',
  case: 'THERAC-25',
  year: 'MEDICAL ACCELERATOR · 1985–1987',
  hook: ['100× THE DOSE.', 'A SOFTWARE BUG.'],
  title: 'A software bug gave patients 100× the radiation dose',
  description: 'The Therac-25 radiation therapy machine was involved in at least six overdoses between 1985 and 1987. Race conditions in its software, and the removal of hardware interlocks, let it deliver around 100 times the intended dose.',
  tags: ['softwarebugs', 'therac25', 'engineeringfailure', 'programming', 'medicaldevices', 'shorts'],
  sources: [
    'Wikipedia, "Therac-25" — https://en.wikipedia.org/wiki/Therac-25 (retrieved November 2026)',
    'N. Leveson & C. Turner, "An Investigation of the Therac-25 Accidents", IEEE Computer 26(7), 1993 — the investigation cited there',
  ],
  scenes: [
    {
      say: 'A radiation therapy machine gave patients around {100|one hundred} times the intended dose, because of a software bug.',
      draw: (h, p, t) => machine(h, { beam: h.win(t, 1.6, 2), wide: 14 + 40 * h.win(t, 2, 3), beamColor: h.C.bad, color: t > 2 ? h.C.bad : h.C.ink }) +
        h.stat(170, 520, '100×', 'INTENDED DOSE', { size: 120, lsize: 24, fill: h.C.bad, opacity: h.win(t, 2.6, 3.1) }),
    },
    {
      say: 'The Therac-25, built by Atomic Energy of Canada Limited, was involved in at least six overdoses between {1985|nineteen eighty-five} and {1987.|nineteen eighty-seven.}',
      draw: (h, p, t) => {
        const { C } = h;
        let marks = '';
        for (let i = 0; i < 6; i++) marks += h.circle(210 + i * 116, 620, 34, { fill: C.bad, opacity: h.win(t, 5.4 + i * .25, 5.7 + i * .25) });
        return h.line(140, 420, 860, 420, { stroke: C.faint, w: 6 }) + h.text(160, 380, '1985', { size: 44, weight: 900, anchor: 'start' }) + h.text(840, 380, '1987', { size: 44, weight: 900, anchor: 'end' }) +
          h.line(140, 420, 140 + 720 * h.win(t, 6.4, 9), 420, { stroke: C.bad, w: 8 }) + marks +
          h.stat(500, 250, 'AT LEAST 6', 'OVERDOSE ACCIDENTS', { size: 100, lsize: 30, fill: C.bad, opacity: h.win(t, 5, 5.5) }) +
          h.text(500, 730, 'MAKER: ATOMIC ENERGY OF CANADA LIMITED', { size: 24, mono: true, fill: C.dim, opacity: h.win(t, 1.6, 2.2) });
      },
    },
    {
      say: 'Earlier models had hardware interlocks to block unsafe settings. The Therac-25 removed them, and relied on software checks instead.',
      draw: (h, p, t) => {
        const { C } = h, gone = h.win(t, 4.6, 5.4);
        const lock = (x, col, o) => h.g(h.rect(x - 70, 380, 140, 120, { fill: col, r: 14 }) + h.path(`M${x - 40} 380 L${x - 40} 330 Q${x} 270 ${x + 40} 330 L${x + 40} 380`, { stroke: col, w: 16 }), { opacity: o });
        return h.text(280, 240, 'EARLIER MODELS', { size: 28, mono: true, fill: C.dim, opacity: h.win(t, .2, .8) }) + lock(280, C.ok, h.win(t, .8, 1.4)) + h.text(280, 570, 'HARDWARE INTERLOCK', { size: 26, mono: true, fill: C.ok, opacity: h.win(t, .8, 1.4) }) +
          h.text(720, 240, 'THERAC-25', { size: 28, mono: true, fill: C.dim, opacity: h.win(t, 4, 4.6) }) + lock(720, C.dim, h.win(t, 4, 4.6) * (1 - gone * .8)) +
          h.line(630, 300, 630 + 180 * gone, 300 + 220 * gone, { stroke: C.bad, w: 12, opacity: gone > 0 ? 1 : 0 }) +
          h.text(720, 570, 'SOFTWARE CHECKS ONLY', { size: 26, mono: true, fill: C.warn, opacity: h.win(t, 6.2, 6.8) });
      },
    },
    {
      say: 'If an operator chose X-ray mode, then switched to electron mode within eight seconds, the machine could fire its high-current beam without the X-ray target in place.',
      draw: (h, p, t) => {
        const { C } = h, sw = t > 3.6, fire = h.win(t, 8.4, 9);
        return h.g(screen(h, [['MODE:', C.dim, 30], [sw ? 'ELECTRON' : 'X-RAY', sw ? C.warn : C.ok, 60], ['', C.ok], [sw ? 'EDITED IN ' + Math.min(8, (t - 3.6) * 1.6).toFixed(1) + ' s' : '', C.warn, 34]]), { transform: 'translate(0 40)', opacity: 1 - h.win(t, 7.4, 8) }) +
          h.g(machine(h, { beam: fire, wide: 40, beamColor: C.bad, color: fire > 0 ? C.bad : C.ink, label: 'HIGH CURRENT' }) +
            h.g(h.rect(680, 410, 100, 16, { fill: C.line, r: 4, opacity: .5 }) + h.text(730, 470, 'TARGET', { size: 22, mono: true, fill: C.line }) + h.text(730, 500, 'NOT IN PLACE', { size: 22, mono: true, fill: C.bad }), {}), { opacity: h.win(t, 7.4, 8) }) +
          h.tag(500, 110, '< 8 SECONDS', { size: 40, opacity: h.win(t, 5.2, 5.7) });
      },
    },
    {
      say: 'The screen showed only a short message: Malfunction {54.|fifty-four.}',
      draw: (h, p, t) => screen(h, [['OPERATOR CONSOLE', h.C.dim, 30], ['', h.C.ok], [t > 1.8 && Math.floor(t * 2.5) % 4 !== 3 ? 'MALFUNCTION 54' : '', h.C.bad, 64]], { color: t > 1.8 ? h.C.bad : h.C.ok }),
    },
    {
      say: 'A second bug: a safety flag was set by adding one to it. Occasionally the number overflowed back to zero, and the safety check was skipped.',
      draw: (h, p, t) => {
        const { C } = h, k = h.win(t, 2, 6.4), v = Math.round(h.lerp(248, 256, k)), zero = v >= 256;
        return h.text(500, 190, 'SAFETY FLAG  (0 = SKIP CHECK)', { size: 30, mono: true, fill: C.dim, ls: 2 }) +
          h.rect(280, 260, 440, 240, { stroke: zero ? C.bad : C.line, w: 7, r: 20, fill: C.panel }) +
          h.text(500, 440, String(zero ? 0 : v), { size: 190, weight: 900, mono: true, fill: zero ? C.bad : C.ink }) +
          h.text(790, 400, '+1', { size: 60, weight: 900, fill: C.warn, opacity: zero ? 0 : .4 + .6 * Math.abs(Math.sin(t * 6)) }) +
          h.tag(500, 600, 'OVERFLOW → 0', { size: 40, color: C.bad, opacity: zero ? 1 : 0 }) +
          h.tag(500, 700, 'SAFETY CHECK SKIPPED', { size: 36, solid: true, color: C.bad, opacity: h.win(t, 7.4, 8) }) +
          h.text(500, 830, 'ILLUSTRATIVE VALUES', { size: 20, mono: true, fill: C.faint, ls: 3 });
      },
    },
    {
      say: 'The software was developed by one person, and reused code from older machines. It has been called the worst series of radiation accidents in the {35|thirty-five} year history of medical accelerators.',
      draw: (h, p, t) => h.stat(500, 300, '1', 'PROGRAMMER', { size: 240, gap: 60, fill: h.C.ink, opacity: h.win(t, .4, .9) * (1 - h.win(t, 5.2, 5.8)) }) +
        h.tag(500, 520, 'CODE REUSED FROM OLDER MODELS', { size: 30, opacity: h.win(t, 2.6, 3.2) * (1 - h.win(t, 5.2, 5.8)) }) +
        h.g(h.text(500, 330, '"The worst series of', { size: 52, weight: 800 }) + h.text(500, 405, 'radiation accidents in the', { size: 52, weight: 800 }) + h.text(500, 480, '35-year history of', { size: 52, weight: 800, fill: h.C.warn }) +
          h.text(500, 555, 'medical accelerators"', { size: 52, weight: 800, fill: h.C.warn }), { opacity: h.win(t, 5.8, 6.4) }),
    },
  ],
};

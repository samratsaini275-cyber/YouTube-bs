// Drawing helpers handed to every scene's draw(h, p, t).
// Coordinate space: 1000 x 900. p = scene progress 0..1, t = seconds into scene.

const C = {
  ink: '#E8EEF7', dim: '#7C8CA5', faint: '#33425A', line: '#5FD0FF',
  warn: '#FFB020', bad: '#FF4D4D', ok: '#4ADE80', panel: '#0E1829', bg: '#070D18',
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const out = k => 1 - Math.pow(1 - k, 3);
// progress of a sub-interval [a,b] of p, eased
const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
// progress of a time window [a,b] in seconds, eased
const win = (t, a, b) => ease(clamp((t - a) / (b - a)));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = (v, d = 0) => Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

const text = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.mono ? 'JetBrains Mono' : 'Inter'}" font-size="${o.size || 36}"
    font-weight="${o.weight || 700}" fill="${o.fill || C.ink}" text-anchor="${o.anchor || 'middle'}"
    opacity="${o.opacity ?? 1}" letter-spacing="${o.ls || 0}" ${o.rot ? `transform="rotate(${o.rot} ${x} ${y})"` : ''}>${esc(s)}</text>`;

const drawAttr = d => (d === undefined ? '' : `pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(d)}"`);

const path = (d, o = {}) =>
  `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.stroke || C.line}" stroke-width="${o.w ?? 6}"
    stroke-linecap="round" stroke-linejoin="round" opacity="${o.opacity ?? 1}"
    ${o.dash ? `stroke-dasharray="${o.dash}"` : drawAttr(o.draw)}/>`;

const line = (x1, y1, x2, y2, o = {}) => path(`M${x1} ${y1}L${x2} ${y2}`, o);

const rect = (x, y, w, hh, o = {}) =>
  `<rect x="${x}" y="${y}" width="${Math.max(0, w)}" height="${Math.max(0, hh)}" rx="${o.r ?? 0}" fill="${o.fill || 'none'}"
    stroke="${o.stroke || 'none'}" stroke-width="${o.w ?? 4}" opacity="${o.opacity ?? 1}"
    ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;

const circle = (x, y, r, o = {}) =>
  `<circle cx="${x}" cy="${y}" r="${Math.max(0, r)}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'none'}"
    stroke-width="${o.w ?? 4}" opacity="${o.opacity ?? 1}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;

const g = (inner, o = {}) =>
  `<g ${o.transform ? `transform="${o.transform}"` : ''} opacity="${o.opacity ?? 1}">${inner}</g>`;

// arrow that grows from (x1,y1) towards (x2,y2) with progress o.draw
const arrow = (x1, y1, x2, y2, o = {}) => {
  const k = clamp(o.draw ?? 1);
  if (k <= 0) return '';
  const ex = lerp(x1, x2, k), ey = lerp(y1, y2, k);
  const a = Math.atan2(y2 - y1, x2 - x1), s = o.head || 22;
  const col = o.stroke || C.warn;
  const hx = (da) => `${ex - s * Math.cos(a + da)} ${ey - s * Math.sin(a + da)}`;
  return line(x1, y1, ex, ey, { stroke: col, w: o.w ?? 7, opacity: o.opacity }) +
    `<path d="M${hx(.45)}L${ex} ${ey}L${hx(-.45)}" fill="none" stroke="${col}" stroke-width="${o.w ?? 7}"
      stroke-linecap="round" stroke-linejoin="round" opacity="${o.opacity ?? 1}"/>`;
};

// pill label
const tag = (x, y, s, o = {}) => {
  const size = o.size || 30, w = String(s).length * size * 0.62 + 44, col = o.color || C.warn;
  return g(
    rect(x - w / 2, y - size * 0.95, w, size * 1.6, { r: size * 0.8, fill: o.solid ? col : C.panel, stroke: col, w: 3 }) +
    text(x, y + size * 0.2, s, { size, mono: true, weight: 700, fill: o.solid ? C.bg : col }),
    { opacity: o.opacity ?? 1 });
};

// big statistic with caption underneath
const stat = (x, y, value, label, o = {}) =>
  g(text(x, y, value, { size: o.size || 150, weight: 900, fill: o.fill || C.warn, ls: -3 }) +
    (label ? text(x, y + (o.gap || 62), label, { size: o.lsize || 34, mono: true, weight: 600, fill: C.dim, ls: 2 }) : ''),
    { opacity: o.opacity ?? 1 });

// deterministic pseudo-noise in [-1,1]
const noise = (t, k = 1) => Math.sin(t * 12.9898 * k) * Math.sin(t * 7.233 * k + 1.3) ;

export const h = { C, clamp, lerp, ease, out, seg, win, esc, fmt, text, path, line, rect, circle, g, arrow, tag, stat, noise };

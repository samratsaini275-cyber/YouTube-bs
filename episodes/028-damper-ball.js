// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale; sway is exaggerated.
const IN = [300, 0, 0];   // inside the top floors

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.city = group();
  k.ground('#5B6B5A', 0).visible = true;
  for (let i = 0; i < 26; i++) { const x = ((i * 37) % 120) - 60, z = ((i * 53) % 120) - 60; if (Math.abs(x) < 14 && Math.abs(z) < 14) continue; const h = 8 + (i * 7) % 22; box(8, h, 8, mat(['#AFC2D6', '#C9D3DE', '#8EA3B8'][i % 3]), [x, h / 2, z], w.city); }
  // the tower: stacked flared segments
  w.tower = group([0, 0, 0]);
  const glass = mat('#3E8E7E', { metal: .4, rough: .25 });
  box(14, 20, 14, glass, [0, 10, 0], w.tower);
  for (let i = 0; i < 8; i++) { const s = cyl(6.4, 4.8, 9, glass, [0, 24.5 + i * 9, 0], w.tower, 4); s.rotation.y = Math.PI / 4; }
  cyl(3, 3.4, 8, glass, [0, 100, 0], w.tower, 4).rotation.y = Math.PI / 4;
  cyl(.5, .9, 16, mat('#C9CED6', { metal: .6 }), [0, 112, 0], w.tower, 12);
  // the damper, inside
  w.inside = group(IN);
  box(60, 1, 60, mat('#3A3F48'), [0, -16, 0], w.inside); box(60, 1, 60, mat('#2C3038'), [0, 22, 0], w.inside);
  w.pend = group([0, 22, 0], w.inside);
  for (const [x, z] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) cyl(.25, .25, 26, mat('#B8BEC8', { metal: .7 }), [x * .7, -13, z * .7], w.pend, 8);
  w.ball = ball(5.5, mat('#E8B320', { metal: .8, rough: .25 }), [0, -27, 0], w.pend);
  for (let i = -4; i <= 4; i++) { const r = cyl(5.52 * Math.cos(i / 5.5 * 1.2), 5.52 * Math.cos(i / 5.5 * 1.2), .12, mat('#9A7410', { metal: .8 }), [0, -27 + i * 1.2, 0], w.pend, 48); r.castShadow = false; }
  for (const a of [0, 1, 2, 3, 4, 5, 6, 7]) { const p = cyl(.5, .5, 8, mat('#6B7280', { metal: .5 }), [Math.cos(a * Math.PI / 4) * 9, -27, Math.sin(a * Math.PI / 4) * 9], w.inside, 10); p.rotation.z = Math.PI / 2; p.rotation.y = -a * Math.PI / 4; }
  // wind
  w.wind = group([-50, 70, 0]);
  for (let i = 0; i < 12; i++) { const s = box(10, .4, .4, mat('#DDEBFF', { glow: .8, opacity: .8 }), [0, (i % 6) * 6 - 15, (i % 4) * 8 - 12], w.wind); s.castShadow = false; s.userData.ph = i * .37; }
  return w;
}
const sway = (w, a) => { w.tower.rotation.z = a; };
const swing = (w, a) => { w.pend.rotation.z = a; };
const gust = (w, t) => w.wind.children.forEach(s => { s.position.x = ((t * 30 + s.userData.ph * 40) % 80) - 10; });

export default {
  id: '028',
  style: '3d',
  voice: 'v3',
  case: 'THE DAMPER BALL',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['660 TONNES', 'HANGING ABOVE YOU.'],
  title: 'Why this skyscraper hangs a giant steel ball',
  description: 'In a typhoon, a 660-tonne steel ball swung a full meter inside this skyscraper. That was not a malfunction. It is exactly what it is there for.',
  tags: ['engineering', 'skyscraper', 'whyisitbuiltlikethat', 'taipei101', 'tunedmassdamper', 'shorts'],
  sources: [
    'Wikipedia, "Taipei 101" — https://en.wikipedia.org/wiki/Taipei_101 (retrieved November 2026): 660-metric-ton steel pendulum tuned mass damper, US$4 million, suspended from the 92nd to the 88th floor, reduces up to 40% of the tower\'s movements, 41 steel plates forming a 5.5 m ball, moved 1 m during Typhoon Soudelor on 8 August 2015.',
  ],
  setup,
  scenes: [
    {
      say: 'High inside this skyscraper, a steel ball weighing {660|six hundred and sixty} tonnes hangs on cables. Above the people below.',
      show: ['inside'], sky: '#14181F', lightAt: [300, -20, 0], lightDist: 50,
      cam: { pos: [312, -30, 28], look: [300, -26, 0], fov: 44, to: { pos: [306, -22, 20], look: [300, -27, 0], fov: 38 } },
      update: (w, p, t) => swing(w, .03 * Math.sin(t * 1.4)),
    },
    {
      say: 'This is Taipei {101.|one oh one.} Strong gusts push on the tower, and make it sway.',
      show: ['city', 'tower', 'wind'], sky: '#9AB4CC', lightAt: [0, 50, 0], lightDist: 120,
      cam: { pos: [70, 40, 110], look: [0, 60, 0], fov: 46, to: { pos: [50, 50, 90], look: [0, 64, 0], fov: 44 } },
      update: (w, p, t) => { sway(w, .025 * Math.sin(t * 1.6)); gust(w, t); },
    },
    {
      say: 'So engineers hung a giant pendulum. From the {92nd|ninety-second} floor, down to the {88th.|eighty-eighth.}',
      show: ['inside'], sky: '#1D232D', lightAt: [300, -10, 0], lightDist: 60,
      cam: { pos: [330, 20, 40], look: [300, 0, 0], fov: 46, to: { pos: [322, -6, 44], look: [300, -14, 0], fov: 46 } },
      update: (w, p, t) => swing(w, .03 * Math.sin(t * 1.4)),
    },
    {
      say: 'When the tower leans one way, the ball swings the other way and soaks up the motion. It can cut the sway by up to {40|forty} percent.',
      show: ['city', 'tower', 'wind'], sky: '#7F97AE', lightAt: [0, 50, 0], lightDist: 120,
      cam: { pos: [-80, 50, 90], look: [0, 64, 0], fov: 46, to: { pos: [-60, 60, 80], look: [0, 70, 0], fov: 44 } },
      update: (w, p, t, k) => { const damp = 1 - .4 * k.h.win(t, 3, 6); sway(w, .03 * damp * Math.sin(t * 1.6)); gust(w, t); },
    },
    {
      say: 'The ball is {5.5|five and a half} meters across. Made of {41|forty-one} steel plates, welded together.',
      show: ['inside'], sky: '#2A2416', lightAt: [300, -27, 0], lightDist: 40,
      cam: { pos: [286, -24, 16], look: [300, -27, 0], fov: 40, to: { pos: [292, -30, 13], look: [300, -27, 0], fov: 36 } },
      update: (w, p, t) => swing(w, .02 * Math.sin(t * 1.4)),
    },
    {
      say: 'In {2015,|twenty fifteen,} Typhoon Soudelor hit. The ball swung a full meter. The biggest move it has ever made.',
      show: ['inside'], sky: '#0F141C', lightAt: [300, -20, 0], lightDist: 60,
      cam: { pos: [300, -20, 50], look: [300, -20, 0], fov: 46, to: { pos: [304, -22, 44], look: [300, -22, 0], fov: 46 } },
      shake: (t) => .3,
      update: (w, p, t, k) => swing(w, .07 * Math.sin(t * 2.2) * (.4 + .6 * k.h.win(t, 1, 3))),
    },
    {
      say: 'Quick question. What did the damper cost? A, {400,000|four hundred thousand} dollars. B, {4|four} million dollars. Or C, {40|forty} million dollars. Comment your answer.',
      quiz: { q: 'What did the Taipei 101 damper cost?', options: ['$400,000', '$4 million', '$40 million'], answer: 'B — NT$132 million, about US$4 million.' },
      show: ['city', 'tower'], sky: '#274B73', lightAt: [0, 50, 0], lightDist: 120,
      cam: { pos: [40, 120, 140], look: [0, 20, 0], fov: 46, to: { pos: [-40, 120, 140], look: [0, 20, 0] } },
      update: (w, p, t) => sway(w, .01 * Math.sin(t * 1.6)),
    },
  ],
};

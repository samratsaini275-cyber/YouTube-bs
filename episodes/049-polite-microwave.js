// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the over-cautious microwave is fictional.

function qmark(k, parent, pos, color) {
  const g = k.group(pos, parent), m = k.mat(color, { glow: 1.6 });
  const arc = k.mesh(new k.THREE.TorusGeometry(.5, .14, 10, 24, Math.PI * 1.4), m, [0, .45, 0], g); arc.rotation.z = -Math.PI * .45;
  k.box(.26, .45, .2, m, [0, -.25, 0], g);
  k.ball(.15, m, [0, -.75, 0], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.counter = k.ground('#C9B79C', 0);
  w.wall = box(80, 40, 1, mat('#F2EEE6'), [0, 20, -10], k.scene);
  // the microwave
  w.mw = group([0, 0, 0]);
  box(14, 8, 8, mat('#DADFE6', { metal: .4, rough: .3 }), [0, 4, 0], w.mw);
  box(9, 6.4, .3, mat('#1E2430', { opacity: .85 }), [-2, 4, 4.05], w.mw);
  w.plate = cyl(2.6, 2.6, .2, mat('#F4F6F8', { opacity: .9 }), [-2, 1.4, 1], w.mw, 32);
  w.bag = box(2.6, .6, 2, mat('#E0161E'), [-2, 1.8, 1], w.mw);
  box(3.4, 6.4, .3, mat('#2A2F38'), [4.9, 4, 4.05], w.mw);
  w.screen = box(2.6, 1.4, .1, mat('#0B1A12'), [4.9, 6.1, 4.25], w.mw);
  w.q = qmark(k, w.mw, [4.9, 6.15, 4.35], '#22E06B'); w.q.scale.setScalar(.75);
  w.btn = cyl(.6, .6, .3, mat('#22C55E', { glow: .6 }), [4.9, 2.6, 4.3], w.mw, 24); w.btn.rotation.x = Math.PI / 2;
  // a finger that presses start
  w.finger = group([4.9, 2.6, 9]);
  cyl(.35, .35, 4, mat('#F2C9A0'), [0, 0, 2], w.finger, 12).rotation.x = Math.PI / 2;
  // floating question marks multiplying
  w.qs = group([0, 0, 0]);
  for (let i = 0; i < 12; i++) { const g = qmark(k, w.qs, [((i * 37) % 24) - 12, 9 + (i * 13) % 8, ((i * 7) % 6) - 1], ['#22E06B', '#FFD21F', '#FF6B9A', '#38BDF8'][i % 4]); g.userData.ph = i * .5; }
  // the empty kitchen at the end: a moon in the window
  w.night = group();
  box(8, 10, .3, mat('#0F1B33'), [-14, 18, -9.6], w.night); ball(1.2, mat('#FFF6C9', { glow: 2 }), [-12.5, 20, -9.3], w.night);
  return w;
}

function press(w, t, period = .9) { const p = (t % period) / period; w.finger.position.z = 7 - 2.4 * Math.max(0, Math.sin(p * Math.PI)); w.btn.position.z = 4.3 - .15 * Math.max(0, Math.sin(p * Math.PI)); }
function blinkQ(w, t) { w.q.visible = (t * 2 % 1) < .7; }
const ALL = ['counter', 'wall', 'mw'];

export default {
  id: '049',
  style: '3d',
  voice: 'v3',
  case: 'THE POLITE MICROWAVE',
  year: 'ENGINEERING NONSENSE',
  hook: ['ARE YOU SURE?', 'ARE YOU SURE?'],
  title: 'Engineers made a microwave that double-checks everything',
  description: 'It just wants to be sure. Really sure. Completely, totally sure. (A made-up microwave.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'microwave', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the microwave and its forty-one questions are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This microwave double-checks everything.',
      show: ALL, sky: '#F2EEE6', lightAt: [0, 4, 2], lightDist: 25,
      cam: { pos: [14, 13, 42], look: [0, 5, 0], fov: 44, to: { pos: [10, 11, 34], look: [0.5, 5, 0], fov: 42 } },
      update: (w, p, t) => { w.finger.visible = false; w.qs.visible = w.night.visible = false; w.q.visible = false; },
    },
    {
      say: 'You press start. It asks: are you sure?',
      show: ALL, sky: '#EDE7DA', lightAt: [4, 4, 4], lightDist: 15,
      cam: { pos: [11, 8, 20], look: [4.9, 4.5, 4], fov: 42, to: { pos: [10, 7.5, 17], look: [4.9, 4.5, 4], fov: 40 } },
      update: (w, p, t) => { w.finger.visible = true; press(w, Math.min(t, .9)); w.q.visible = t > 1; },
    },
    {
      say: 'You press again. Are you really sure?',
      show: ALL, sky: '#EDE7DA', lightAt: [4, 4, 4], lightDist: 15,
      cam: { pos: [0, 9, 20], look: [4, 4.5, 4], fov: 42, to: { pos: [1, 8.5, 17], look: [4, 4.5, 4], fov: 40 } },
      update: (w, p, t) => { w.finger.visible = true; press(w, t, 1.2); blinkQ(w, t); },
    },
    {
      say: 'Forty-one questions later, the popcorn is still cold.',
      show: [...ALL, 'qs'], sky: '#E4DCCB', lightAt: [0, 6, 2], lightDist: 25,
      cam: { pos: [-8, 13, 44], look: [0, 8, 0], fov: 46, to: { pos: [-6, 12, 38], look: [0, 8, 0], fov: 44 } },
      update: (w, p, t) => { w.finger.visible = true; press(w, t, .45); blinkQ(w, t); w.qs.visible = true; w.qs.children.forEach(g => { g.visible = t * 3 > g.userData.ph; g.rotation.z = .2 * Math.sin(t * 3 + g.userData.ph); }); },
    },
    {
      say: 'And he has gone to bed.',
      show: [...ALL, 'night'], sky: '#1A1E2A', lightAt: [0, 4, 2], lightDist: 25,
      cam: { pos: [-2, 14, 46], look: [-5, 10, 0], fov: 46, to: { pos: [-2, 13, 40], look: [-5, 10, 0], fov: 44 } },
      update: (w, p, t) => { w.finger.visible = false; w.qs.visible = false; w.night.visible = true; blinkQ(w, t); },
    },
    {
      say: 'Quick question. How many checks is too many? Option A, one. Option B, forty-one. Or option C, are you sure? Comment your answer.',
      quiz: { q: 'How many checks is too many?', options: ['One', 'Forty-one', 'Are you sure?'], answer: 'It is a made-up microwave, so pick any. (We are sure it is C.)' },
      show: [...ALL, 'qs'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 25,
      cam: { pos: [14, 5, 40], look: [0, 12, 0], fov: 46, to: { pos: [-14, 5, 40], look: [0, 12, 0] } },
      update: (w, p, t) => { w.finger.visible = false; w.qs.visible = true; w.qs.children.forEach(g => { g.visible = true; g.rotation.z = .2 * Math.sin(t * 3 + g.userData.ph); }); blinkQ(w, t); },
    },
  ],
};

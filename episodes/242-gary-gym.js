// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#3A3A44', 0);
  w.wall = box(60, 30, .5, mat('#5B6B8A'), [0, 15, -8]); w.mirror = box(16, 7, .1, mat('#BFE3F7', { rough: .05, metal: .3 }), [0, 4.5, -7.7]);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.bar = group(); const rod = cyl(.08, .08, 9, mat('#AAAAAA', { metal: .8 }), [0, 0, 0], w.bar, 10); rod.rotation.z = Math.PI / 2; for (const x of [-3.6, 3.6]) { const pl = cyl(1.4, 1.4, .5, mat('#222222'), [x, 0, 0], w.bar, 24); pl.rotation.z = Math.PI / 2; }
  w.dumb = group(); const dr = cyl(.06, .06, 1.4, mat('#AAAAAA', { metal: .8 }), [0, 0, 0], w.dumb, 8); dr.rotation.z = Math.PI / 2; for (const x of [-.6, .6]) { const pl = cyl(.35, .35, .25, mat('#222222'), [x, 0, 0], w.dumb, 16); pl.rotation.z = Math.PI / 2; }
  w.mill = group(); box(3, .5, 8, mat('#222222'), [0, .25, 0], w.mill); w.belt = box(2.6, .06, 7.6, mat('#555555'), [0, .53, 0], w.mill); box(.2, 4, .2, mat('#444444'), [-1.4, 2, -3.6], w.mill); box(.2, 4, .2, mat('#444444'), [1.4, 2, -3.6], w.mill); box(3, .6, .5, mat('#333333'), [0, 4, -3.6], w.mill);
  w.sweat = group(); for (let i = 0; i < 4; i++) { const d = ball(.08, mat('#7FC8FF', { glow: .3 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  w.crumb = box(.5, .35, .4, mat('#D9A35B'), [0, 0, 0]);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const GYM = ['floor', 'wall', 'mirror'];
const sw = (w, t) => w.sweat.children.forEach(d => { const i = d.userData.i, q = (t * 1.2 + i / 4) % 1; d.position.set(w.g.position.x + (i - 1.5) * .3, w.g.position.y + 1.6 - q * 1.4, w.g.position.z + .3); });

export default {
  id: '242',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GYM GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE GYM.'],
  title: 'Gary the ant went to the gym',
  description: 'The treadmill is a nightmare. The dumbbell will not move. Then Gary finds the one thing he can lift. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'gym', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: in lab tests, an American field ant\'s neck joint withstood forces of roughly 350 to 5,000 times its body weight before failing (Nguyen et al., "Ant neck joint mechanics", Journal of Biomechanics, 2014).'],
  setup,
  scenes: [
    { say: 'Gary went to the gym.', show: [...GYM, 'g'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'The treadmill. Level one.', show: [...GYM, 'g', 'mill', 'sweat'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2.4, 6], look: [0, 1.2, 1], fov: 46, to: { pos: [2.8, 2.4, 5.4], look: [0, 1.2, 1], fov: 44 } },
      update: (w, p, t) => { w.mill.position.set(0, 0, 0); const slip = Math.max(0, p - .4) * 9; gy(w, 0, .56, 1 + slip, Math.PI, t, true); sw(w, t); } },
    { say: 'Then the dumbbell. It did not move.', show: [...GYM, 'g', 'dumb', 'sweat'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 1.6, 6], look: [0, .9, 0], fov: 46, to: { pos: [1.8, 1.6, 5.5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.dumb.position.set(.9, .35, 0); w.dumb.rotation.z = .02 * Math.sin(t * 30); gy(w, -.4, 0, 0, -1.4, t); w.g.rotation.z = .25 * Math.sin(t * 14); sw(w, t); } },
    { say: 'Then he found something his size.', label: '*?*', show: [...GYM, 'g', 'crumb'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.2, 5], look: [.4, .8, 0], fov: 44, to: { pos: [1.4, 1.2, 4.5], look: [.4, .8, 0], fov: 43 } },
      update: (w, p, t) => { w.crumb.position.set(1.2, .18, 0); gy(w, -.6 + p * .8, 0, 0, -1.4, t, p < .8); } },
    { say: 'The barbell. He lifted it with his head.', label: '*NEW RECORD*', show: [...GYM, 'g', 'bar'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [0, 1.4, 10], look: [0, 1.1, 0], fov: 54, to: { pos: [0, 1.4, 9], look: [0, 1.1, 0], fov: 52 } },
      update: (w, p, t) => { const lift = Math.min(1, Math.max(0, p - .35) * 3); w.bar.position.set(.9, .18 + lift * .86, 0); gy(w, 0, 0, 0, 0, t); w.g.position.y = 0; w.g.rotation.z = .05 * Math.sin(t * 20); } },
    { say: 'How much can an ant\'s neck hold: ten, a hundred, or thousands of times its weight? Comment below.',
      quiz: { q: 'How much can an ant\'s neck hold?', options: ['10 times its weight', '100 times', 'Thousands of times'], answer: 'Answer: in one lab test, up to about 5,000 times its weight.' },
      show: [...GYM, 'g', 'bar'], sky: '#5B6B8A', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [1.5, 1.4, 10], look: [0, 1.6, 0], fov: 54, to: { pos: [-1.5, 1.4, 10], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.bar.position.set(.9, 1.04, 0); gy(w, 0, 0, 0, 0, t); } },
  ],
};

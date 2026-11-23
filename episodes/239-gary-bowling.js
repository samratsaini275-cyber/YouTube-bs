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
  w.floor = k.ground('#2A2340', 0);
  w.lane = box(5, .1, 80, mat('#E3B577', { rough: .3 }), [0, .05, -30]); 
  w.gut = group(); for (const x of [-2.8, 2.8]) box(.6, .08, 80, mat('#555555'), [x, .04, -30], w.gut);
  w.back = box(60, 20, .4, mat('#1B1630'), [0, 10, -70]); w.neon = group(); for (let i = 0; i < 3; i++) { const n = box(60, .3, .1, mat(['#FF4FD8', '#3BE8FF', '#FFC21F'][i], { glow: 1 }), [0, 12 + i * 1.6, -69.7], w.neon); n.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.ball = ball(1.2, mat('#2F5BD3', { rough: .15, metal: .2 }), [0, 1.2, 0]);
  w.pins = group([0, 0, -20]); w.pl = []; for (let r = 0; r < 4; r++) for (let i = 0; i <= r; i++) { const p = group([(i - r / 2) * 2.4, 0, -r * 2.1], w.pins); cyl(.55, .75, 3, mat('#FFFFFF', { rough: .3 }), [0, 1.5, 0], p, 14); cyl(.57, .57, .3, mat('#E2453C'), [0, 2.5, 0], p, 14); ball(.5, mat('#FFFFFF', { rough: .3 }), [0, 3.3, 0], p); w.pl.push(p); }
  w.shoe = group(); box(2.2, 1, 1, mat('#E2453C'), [0, .5, 0], w.shoe); box(2.2, .3, 1, mat('#FFFFFF'), [0, .15, 0], w.shoe);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const LANE = ['floor', 'lane', 'gut', 'back', 'neon'];
const up = w => w.pl.forEach(p => p.rotation.set(0, 0, 0));

export default {
  id: '239',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BOWLING GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT BOWLING.'],
  title: 'Gary the ant went bowling',
  description: 'The shoes are too big. The ball is too heavy. So Gary finds another way to get a strike. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'bowling', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: a standard ten-pin bowling pin is 15 inches (38 cm) tall (USBC equipment specifications).'],
  setup,
  scenes: [
    { say: 'Gary went bowling.', show: [...LANE, 'g'], sky: '#1B1630', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, .1, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'The shoes were a bit big.', show: [...LANE, 'g', 'shoe'], sky: '#1B1630', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.4, 2, 7], look: [0, .8, 0], fov: 46, to: { pos: [2.2, 2, 6.4], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.shoe.position.set(-.2, .1, 0); gy(w, 0, 1.1, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
    { say: 'The ball? He couldn\'t move it.', show: [...LANE, 'g', 'ball'], sky: '#1B1630', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2, 8], look: [-.6, 1.2, 0], fov: 48, to: { pos: [2.6, 2, 7.4], look: [-.6, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.ball.position.set(-1.8, 1.3, 0); gy(w, -.3, .1, 0, Math.PI, t, true); w.g.rotation.z = -.2; } },
    { say: 'So he became the ball.', label: '*NEW PLAN*', show: [...LANE, 'g', 'pins'], sky: '#1B1630', lightAt: [0, 6, -10], lightDist: 30,
      cam: { pos: [3, 3, 8], look: [0, 1, -8], fov: 50, to: { pos: [2, 2, 2], look: [0, 1, -14], fov: 50 } },
      update: (w, p, t) => { up(w); const z = -p * 18; gy(w, 0, .1, z, Math.PI, t); w.g.rotation.x = t * 14; w.g.rotation.order = 'YXZ'; } },
    { say: 'Strike.', label: '*STRIKE.*', show: [...LANE, 'g', 'pins'], sky: '#1B1630', lightAt: [0, 6, -20], lightDist: 30,
      cam: { pos: [6, 4, -8], look: [0, 1.5, -22], fov: 50, to: { pos: [5, 4, -10], look: [0, 1.5, -22], fov: 48 } },
      update: (w, p, t) => { w.pl.forEach((q, i) => { const f = Math.min(1, t * 2 - i * .05); q.rotation.set(-1.45 * Math.max(0, f) * Math.cos(i), 0, 1.45 * Math.max(0, f) * Math.sin(i * 1.3)); }); gy(w, .5 * Math.sin(t * 9), .1, -20 - t * 2, Math.PI, t); w.g.rotation.z = t * 6; } },
    { say: 'How tall is a bowling pin: thirty, thirty-eight, or fifty centimetres? Comment below.',
      quiz: { q: 'How tall is a bowling pin?', options: ['30 cm', '38 cm', '50 cm'], answer: 'Answer: 38 cm. That is about 120 Garys.' },
      show: [...LANE, 'g', 'pins'], sky: '#1B1630', lightAt: [0, 6, -20], lightDist: 30,
      cam: { pos: [3, 1.6, -11], look: [0, 2.2, -18.5], fov: 50, to: { pos: [-2.5, 1.6, -11], look: [0, 2.2, -18.5] } },
      update: (w, p, t) => { up(w); gy(w, 1.2, .1, -18.2, -1.2, t); w.g.rotation.x = 0; w.g.rotation.z = .1 * Math.sin(t * 4); } },
  ],
};

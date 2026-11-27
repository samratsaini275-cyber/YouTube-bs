// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary at the top of a staircase.

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

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#A04000', 0);
  w.wall = group(); box(60, 30, .5, mat('#FAE5D3'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.stairs = group(); for (let i = 0; i < 6; i++) { box(14, 2.2, 3, mat(i % 2 ? '#A0522D' : '#8B4513'), [0, 1.1 + i * 2.2, -1.5 - i * 3], w.stairs); box(14, .1, .2, mat('#5D4037'), [0, 2.2 + i * 2.2, -.05 - i * 3], w.stairs); }
  w.rail = group(); seg(k, [-2, 15.4, -16.5], [-2, 4.4, -.5], mat('#6E2C00', { rough: .4 }), w.rail, .25); for (let i = 0; i < 6; i++) seg(k, [-2, 2.2 + i * 2.2, -1.5 - i * 3], [-2, 4.4 + i * 2.2 - .7, -1.5 - i * 3], mat('#6E2C00'), w.rail, .08);
  w.q = group(); const qm = mat('#F4D03F', { glow: .8 }); for (let i = 0; i < 5; i++) { const a = Math.PI * (1.1 - i * .3); ball(.12, qm, [Math.cos(a) * .3, .55 + Math.sin(a) * .3, 0], w.q); } ball(.12, qm, [0, .1, 0], w.q); ball(.12, qm, [0, -.25, 0], w.q).scale.setScalar(.9);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#FAE5D3', lightAt: [0, 9, 6], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '503',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'STAIRS GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT DOWNSTAIRS.'],
  title: 'Gary the ant went downstairs',
  description: 'One step is a cliff. The banister is way too fast. And at the bottom? He forgot why he came down. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'stairs', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: wood ants collect solidified tree resin and bring it into their nests, where it protects the colony against bacteria and fungi (Chapuisat et al., "Wood ants use resin to protect themselves against pathogens", Proceedings of the Royal Society B, 2007; Brütsch et al., "Wood ants produce a potent antimicrobial agent by applying formic acid on tree-collected resin", Ecology and Evolution, 2017).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary went downstairs.',
      show: ['floor', 'wall', 'g', 'stairs'], ...env,
      cam: { pos: [7, 15, -9.5], look: [0, 14.4, -14.5], fov: 50, to: { pos: [6.5, 14.8, -10], look: [0, 14.4, -14.5], fov: 48 } },
      update: (w, p, t) => { hide(w, 'rail', 'q'); gy(w, 0, 13.2, -15.6, -.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'One step? A cliff.',
      show: ['floor', 'wall', 'g', 'stairs'], ...env,
      cam: { pos: [5, 12.6, -11], look: [0, 12, -14.5], fov: 54, to: { pos: [4.6, 12.4, -11.4], look: [0, 12, -14.5], fov: 52 } },
      update: (w, p, t) => { hide(w, 'rail', 'q'); const peek = Math.sin(t * 3) * .05; gy(w, 0, 13.2, -15.25 + peek, -Math.PI / 2, t); w.g.rotation.x = .25; },
    },
    {
      say: 'The banister? Way too fast.',
      show: ['floor', 'wall', 'g', 'stairs', 'rail'], ...env,
      cam: { pos: [10, 15, -12], look: [-2, 13, -14], fov: 56, to: { pos: [10, 6, -2], look: [-2, 4.5, -2], fov: 56 } },
      update: (w, p, t) => { hide(w, 'q'); const s = Math.min(1, p * 1.15), A = [-2, 15.4, -16.5], B = [-2, 4.4, -.5]; w.g.position.set(-2, A[1] + (B[1] - A[1]) * s + .3, A[2] + (B[2] - A[2]) * s); w.g.rotation.set(-Math.atan2(11, 16), Math.PI / 2, 0); w.g.userData.legs.forEach(l => l.rotation.x = .5); },
    },
    {
      say: 'At the bottom? He forgot why he came down.',
      show: ['floor', 'wall', 'g', 'stairs', 'q'], ...env,
      cam: { pos: [1.4, 1.6, 6.5], look: [0, 1.2, 1.8], fov: 46, to: { pos: [1.3, 1.6, 6], look: [0, 1.2, 1.8], fov: 44 } },
      update: (w, p, t) => { hide(w, 'rail'); w.g.rotation.set(0, 0, 0); gy(w, 0, 0, 2.2, -1.5 + Math.sin(t * 2) * .4, t); w.q.visible = p > .4; w.q.position.set(0, 1.4 + Math.sin(t * 3) * .05, 2.2); },
    },
    {
      say: 'Best way down for Gary: walk, slide, or ride the cat? Comment below.',
      quiz: { q: 'What is the best way down for Gary?', options: ['Walk', 'Slide', 'Ride the cat'], answer: 'Fun fact: wood ants carry tree resin into their nests to protect against germs.' },
      show: ['floor', 'wall', 'g', 'stairs', 'q'], sky: '#274B73', lightAt: [0, 9, 6], lightDist: 30,
      cam: { pos: [2.2, 1.8, 7], look: [0, 1.3, 1.8], fov: 46, to: { pos: [-1.2, 1.8, 7], look: [0, 1.3, 1.8] } },
      update: (w, p, t) => { hide(w, 'rail'); w.g.rotation.set(0, 0, 0); gy(w, 0, 0, 2.2, -1.5 + .3 * Math.sin(t * 3), t, true); w.q.position.set(0, 1.4, 2.2); },
    },
  ],
};

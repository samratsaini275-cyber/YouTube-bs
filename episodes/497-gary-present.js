// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a present and a roll of wrapping paper.

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
  w.floor = k.ground('#C39BD3', 0);
  w.wall = group(); box(60, 30, .5, mat('#FEF9E7'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.roll = group(); const r = cyl(1.2, 1.2, 6, mat('#E74C3C'), [0, 1.2, 0], w.roll, 24); r.rotation.x = Math.PI / 2; for (let i = 0; i < 6; i++) { const st = cyl(1.21, 1.21, .25, mat('#F4D03F'), [0, 1.2, -2.5 + i], w.roll, 24); st.rotation.x = Math.PI / 2; }
  w.tape = group(); const tp = k.torus(.9, .35, mat('#D6EAF8', { glow: .2, rough: .2 }), [0, .35, 0], w.tape); w.strip = box(.5, .03, 3.2, mat('#D6EAF8', { glow: .3 }), [0, 0, 0], k.scene);
  w.gift = group(); box(1.5, 1.2, 1.5, mat('#E74C3C'), [0, .6, 0], w.gift); box(1.52, 1.22, .25, mat('#F4D03F'), [0, .6, 0], w.gift); box(.25, 1.22, 1.52, mat('#F4D03F'), [0, .6, 0], w.gift); ball(.3, mat('#F4D03F'), [0, 1.3, 0], w.gift);
  w.eyes = group(); for (const x of [-.25, .25]) { ball(.12, mat('#FFFFFF', { glow: .5 }), [x, 0, 0], w.eyes); ball(.06, mat('#111111'), [x, 0, .1], w.eyes); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#FEF9E7', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '497',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIFT GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WRAPPED A PRESENT.'],
  title: 'Gary the ant wrapped a present',
  description: 'The paper is a whole rolling mountain. The tape sticks to everything, mostly him. And the present? Gary wrapped himself. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'present', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: when a young queen of the ant Lasius japonicus seals herself into a new nest to found a colony, her flight muscles break down while she raises her first workers (Kurihara et al., "Thoracic crop formation is spatiotemporally coordinated with flight muscle histolysis during claustral colony foundation in Lasius japonicus queens", Arthropod Structure & Development, 2022).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary wrapped a present.',
      show: ['floor', 'wall', 'g', 'roll'], ...env,
      cam: { pos: [1.6, 1.6, 7], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.6, 6.4], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'tape', 'strip', 'gift', 'eyes'); w.roll.position.set(-2.6, 0, -2.6); w.roll.rotation.set(0, .4, 0); gy(w, .4, 0, .3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The paper? A rolling mountain.',
      show: ['floor', 'wall', 'g', 'roll'], ...env,
      cam: { pos: [.6, 2.6, 9], look: [0, 1.2, 0], fov: 48, to: { pos: [.6, 2.6, 8.4], look: [0, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'tape', 'strip', 'gift', 'eyes'); const x = -2.8 + p * 1.6; w.roll.position.set(x, 0, 0); w.roll.rotation.set(0, 0, -p * 3); gy(w, x + 2.1, 0, .4, 0, t, true); w.g.rotation.z = 0; },
    },
    {
      say: 'The tape? Stuck to everything. Mostly Gary.',
      show: ['floor', 'wall', 'g', 'tape', 'strip'], ...env,
      cam: { pos: [.4, 2.4, 7], look: [0, .9, 0], fov: 46, to: { pos: [.4, 2.4, 6.4], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'roll', 'gift', 'eyes'); w.tape.position.set(-1.8, 0, -.8); gy(w, .3, 0, .4, -1.4, t, true); w.g.rotation.z = Math.sin(t * 10) * .1; w.strip.position.set(.3, .65, .4); w.strip.rotation.set(0, .3, Math.sin(t * 10) * .1); },
    },
    {
      say: 'The present? He wrapped himself.',
      show: ['floor', 'wall', 'gift', 'eyes'], ...env,
      cam: { pos: [.4, 2.2, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [.4, 2.2, 5.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'roll', 'tape', 'strip'); w.g.visible = false; w.gift.position.set(0, 0, 0); w.gift.rotation.z = Math.sin(t * 7) * .05; w.eyes.position.set(0, .95, .77); w.eyes.visible = p > .4; },
    },
    {
      say: 'Best present for Gary: a crumb, a seed, or a sprinkle? Comment below.',
      quiz: { q: 'What is the best present for Gary?', options: ['A crumb', 'A seed', 'A sprinkle'], answer: 'Fun fact: a new ant queen breaks down her flight muscles after she seals herself into her first nest.' },
      show: ['floor', 'wall', 'gift', 'eyes'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2, 2.2, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [-1, 2.2, 6.5], look: [0, .9, 0] } },
      update: (w, p, t) => { hide(w, 'roll', 'tape', 'strip'); w.g.visible = false; w.gift.position.set(0, 0, 0); w.gift.rotation.z = Math.sin(t * 7) * .05; w.eyes.position.set(0, .95, .77); w.eyes.visible = true; },
    },
  ],
};

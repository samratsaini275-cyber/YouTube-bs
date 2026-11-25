// Narrative 20: "What Would Happen If… (season 10)". Gary premise (every fifth episode: 349, 354, 359, 364).
// Hook: the premise as a question under 2 s; first frame shows Gary snipping tiny scissors.

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
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.floor = k.ground('#E9D8C4', 0);
  w.wall = group(); box(30, 14, .3, mat('#F7D6E0'), [0, 7, -3], w.wall); const mr = box(2.2, 2.6, .05, mat('#CFE8F5', { glow: .35 }), [2.4, 2.6, -2.8], w.wall); box(2.4, 2.8, .04, mat('#E0B84A', { metal: .5 }), [2.4, 2.6, -2.84], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.sc = group([.75, .62, .18], w.g); w.blades = [];
  for (const sgn of [-1, 1]) { const b = group([0, 0, 0], w.sc); box(.42, .03, .03, mat('#C9D1D9', { metal: .8 }), [.2, 0, 0], b); const r = torus(.05, .015, mat('#E2453C'), [-.06, -sgn * .05, 0], b); r.rotation.set(0, 0, 0); w.blades.push(b); }
  w.dog = group(); w.fluff = group([0, 0, 0], w.dog);
  for (let i = 0; i < 40; i++) { const a = i * 2.4, y = (i / 40) * 2 - 1, r = Math.sqrt(1 - y * y); const f = ball(.45, mat(i % 3 ? '#F2EEE6' : '#D8D2C6', { rough: .95 }), [Math.cos(a) * r * 1.1, 1.2 + y * 1.0, Math.sin(a) * r * 1.1], w.fluff); }
  w.bald = ball(1, mat('#F4B6B6', { rough: .6 }), [0, 1.1, 0], w.dog); w.bald.scale.set(1.05, .95, .9);
  w.dEyes = group([0, 0, 0], w.dog); for (const x of [-.32, .32]) { ball(.2, mat('#FFFFFF'), [x, 1.55, 1.15], w.dEyes); ball(.1, mat('#111111'), [x, 1.55, 1.33], w.dEyes); }
  ball(.16, mat('#111111'), [0, 1.2, 1.3], w.dEyes);
  w.clock = group(); const cf = cyl(.9, .9, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 24); cf.rotation.x = Math.PI / 2; const rim = torus(.9, .06, mat('#333333'), [0, 0, 0], w.clock); rim.rotation.set(0, 0, 0); w.hand = group([0, 0, .08], w.clock); box(.06, .7, .03, mat('#E2453C'), [0, .3, 0], w.hand); w.hand2 = group([0, 0, .07], w.clock); box(.08, .45, .03, mat('#222222'), [0, .2, 0], w.hand2);
  w.bits = group(); for (let i = 0; i < 16; i++) { const b = ball(.12, mat('#F2EEE6'), [0, 0, 0], w.bits); b.userData.i = i; b.castShadow = false; }
  w.conf = group(); for (let i = 0; i < 12; i++) { const c = box(.06, .06, .01, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const snip = (w, t, f = 10) => { const a = .25 + .25 * Math.sin(t * f); w.blades[0].rotation.z = a; w.blades[1].rotation.z = -a; };
const dogAt = (w, x, z, s, bald) => { w.dog.position.set(x, 0, z); w.dog.scale.setScalar(s); w.fluff.visible = !bald; w.bald.visible = bald; w.dEyes.position.z = bald ? -.2 : .4; };

export default {
  id: '354',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HAIRDRESSER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'CUT HAIR?'],
  title: 'What would happen if Gary the ant was a hairdresser?',
  description: 'His first customer is a very fluffy dog. One haircut takes all week. And the new look? Totally bald. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'hairdresser', 'funny', 'shorts'],
  sources: ['Quiz fact: ants clean their antennae by pulling them through a comb-like notch on each front leg, called the antenna cleaner (Hackmann et al., "Functional morphology and efficiency of the antenna cleaner in Camponotus rufifemur ants", Royal Society Open Science, 2015).'],
  setup,
  scenes: [
    { say: 'What if Gary cut hair?', show: ['floor', 'wall', 'g', 'sc'], sky: '#F7D6E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .72, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); snip(w, t); } },
    { say: 'His first customer? A very fluffy dog.', show: ['floor', 'wall', 'g', 'sc', 'dog', 'dEyes'], sky: '#F7D6E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2, 7.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -1.1, 0, 1, -.3, t); snip(w, t, 6); dogAt(w, .9, 0, 1, false); w.dog.rotation.y = -.15 + .05 * Math.sin(t * 2); } },
    { say: 'One haircut? It takes all week.', label: 'SNIP… SNIP…', show: ['floor', 'wall', 'g', 'sc', 'dog', 'dEyes', 'clock', 'bits'], sky: '#F7D6E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.6, 8], look: [0, 2.2, 0], fov: 50, to: { pos: [0, 2.6, 7.5], look: [0, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { dogAt(w, 0, 0, 1, false); w.dog.rotation.y = 0; gy(w, .1, 2.35, .4, -1.2, t); snip(w, t, 14); w.clock.position.set(-2.3, 4.2, -2.7); w.hand.rotation.z = -t * 12; w.hand2.rotation.z = -t; w.bits.children.forEach(b => { const i = b.userData.i, q = (t * .8 + i / 16) % 1; b.position.set(.4 + Math.sin(i * 3) * .8, 2.4 - q * 2.4, .9 + Math.cos(i) * .3); }); } },
    { say: 'And the new look? Totally bald.', label: 'TA-DA!', show: ['floor', 'wall', 'g', 'sc', 'dog', 'dEyes', 'conf'], sky: '#F7D6E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2, 7.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { const b = p > .45; dogAt(w, .9, 0, 1, b); w.dEyes.scale.setScalar(b ? 1.25 : 1); w.dog.rotation.y = -.15; gy(w, -1.1, .15 * Math.abs(Math.sin(t * 8)), 1, -.3, t); snip(w, t, 6); w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 12) % 1; c.position.set(-2 + (i * .37) % 4, 3.4 - q * 3.4, .6 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); c.visible = b; }); } },
    { say: 'Hairdresser Gary: talented, tiny, or totally clueless? Comment below.',
      quiz: { q: 'Hairdresser Gary is…', options: ['Talented', 'Tiny', 'Totally clueless'], answer: 'Real ants comb their antennae with a notch on their front legs.' },
      show: ['floor', 'g', 'sc'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); snip(w, t, 6); } },
  ],
};

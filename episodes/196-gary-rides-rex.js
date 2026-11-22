// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Gary-led (every fourth) + dinosaurs (184 combo, 081 1.7K).
// Hook: the premise as a question under 2 s; first frame shows Gary in his yellow hat riding on top of a T-rex's head.

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
function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 14, mat('#555555', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(3, .05, .35, mat('#F5F0D0'), [-120 + i * 6, .05, 0], w.road);
  w.town = group(); for (let i = 0; i < 10; i++) { const h = 12 + (i * 7) % 10, x = -45 + i * 10; box(9, h, 8, mat(['#D9B38C', '#B8C7D9', '#E5C3C3', '#C8D9B8', '#E8DDB5'][i % 5]), [x, h / 2, -14], w.town); }
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.g = gary(k, k.scene, 2.2, '#FFC21F');
  w.school = group(); box(16, 8, 6, mat('#E2B07A'), [0, 4, 0], w.school); box(3, 4, .3, mat('#5A3A1A'), [0, 2, 3.05], w.school);
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = group([0, 0, 0], w.cars); box(4, 1.2, 2, mat(['#3B82F6', '#22C55E', '#F97316', '#8B5CF6'][i]), [0, 1, 0], c); box(2.2, 1, 1.8, mat('#9FD3EE'), [-.3, 2, 0], c); c.userData.i = i; }
  w.dust = group(); for (let i = 0; i < 8; i++) { const d = ball(.9, mat('#D8CFC0'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const ride = (w, x, z, ry, t, run = false, sp = 6) => {
  w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, sp, !run); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0);
  w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(.4, 1.05, 0));
  w.g.position.copy(v); w.g.rotation.set(0, ry, 0); w.g.userData.legs.forEach(l => l.rotation.x = 0);
};
const dust = (w, x, z, t, on) => { w.dust.visible = on; w.dust.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 8) % 1; d.position.set(x - 4 - q * 6, .6 + q * 1.5, z + (i % 3 - 1) * 1.5); d.scale.setScalar(.6 + q); }); };

export default {
  id: '196',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY RIDES A T-REX',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'RODE A T-REX?'],
  title: 'What would happen if Gary the ant rode a T-rex?',
  description: 'The school run takes ten seconds. Traffic moves out of the way. Steering is mostly yelling. And stopping? Gary never learned that part. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'trex', 'dinosaurs', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up. Quiz fact reuses 184 (ants existed before T. rex: oldest ant fossil about 113 million years old; Phys.org 2025).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary rode a T-rex?',
      show: ['ground', 'road', 'town', 'dino', 'g'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [12, 9, 30], look: [1, 13, 0], fov: 46, to: { pos: [11, 9, 28], look: [1, 13, 0], fov: 44 } },
      update: (w, p, t) => { ride(w, -2, 0, -.45, t); },
    },
    {
      say: 'The school run? Ten seconds flat.',
      show: ['ground', 'road', 'town', 'dino', 'g', 'school', 'dust'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [16, 9, 36], look: [2, 10, 0], fov: 50, to: { pos: [15, 9, 34], look: [4, 10, 0], fov: 48 } },
      update: (w, p, t) => { w.school.position.set(14, 0, -9); ride(w, -12 + t * 9, 0, 0, t, true, 10); dust(w, w.dino.position.x, 0, t, true); },
    },
    {
      say: 'Traffic? Everyone moves over.',
      show: ['ground', 'road', 'town', 'dino', 'g', 'cars'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [14, 12, 34], look: [0, 8, 0], fov: 50, to: { pos: [13, 12, 32], look: [2, 8, 0], fov: 48 } },
      update: (w, p, t) => {
        w.dust.visible = false; ride(w, -8 + t * 5, 0, 0, t, true, 8);
        w.cars.children.forEach(c => { const i = c.userData.i, q = Math.min(1, Math.max(0, t * 1.5 - i * .3)); c.position.set(-2 + i * 6, 0, (i % 2 ? -1 : 1) * (1.5 + q * 5)); c.rotation.set(0, (i % 2 ? -1 : 1) * q * .5, 0); });
      },
    },
    {
      say: 'But stopping? Nobody taught him that.',
      show: ['ground', 'road', 'town', 'dino', 'g', 'dust'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [-6, 9, 34], look: [0, 10, 0], fov: 50, to: { pos: [-4, 9, 34], look: [6, 10, 0], fov: 50 } },
      shake: (t) => .08,
      update: (w, p, t) => { ride(w, -6 + t * 9, 0, 0, t, true, 12); w.g.rotation.z = .2 * Math.sin(t * 12); w.g.position.y += .3 * Math.abs(Math.sin(t * 12)); dust(w, w.dino.position.x, 0, t, true); },
    },
    {
      say: 'Gary on a T-rex: epic, dangerous, or legendary? Comment below.',
      quiz: { q: 'Should Gary keep riding the T-rex?', options: ['Epic', 'Dangerous', 'Legendary'], answer: 'Real ants were around before T-rex. The oldest ant fossil is about 113 million years old.' },
      show: ['ground', 'road', 'town', 'dino', 'g'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [14, 9, 26], look: [0, 12, 0], fov: 46, to: { pos: [-10, 9, 28], look: [0, 12, 0] } },
      update: (w, p, t) => { w.dust.visible = false; ride(w, 0, 0, -.3, t); },
    },
  ],
};

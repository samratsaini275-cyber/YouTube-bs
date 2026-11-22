// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary at the zoo gate.

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
function elephant(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const g = mat('#9AA0A8', { rough: .7 });
  const e = { root: group([0, 0, 0], parent) };
  const b = ball(1, g, [0, 1.5, 0], e.root); b.scale.set(1.35, 1, 1);
  e.head = group([1.2, 2, 0], e.root); ball(.75, g, [0, 0, 0], e.head);
  for (const z of [-.3, .3]) { ball(.12, mat('#FFFFFF'), [.55, .2, z], e.head); ball(.06, mat('#111111'), [.65, .2, z], e.head); }
  e.ears = [-1, 1].map(s => { const ear = ball(.7, mat('#B8A0A8', { rough: .7 }), [-.1, .1, s * .7], e.head); ear.scale.set(.8, 1, .15); return ear; });
  e.trunk = []; let prev = e.head;
  for (let i = 0; i < 5; i++) { const t = group(i ? [0, -.32, 0] : [.65, -.2, 0], prev); cyl(.17 - i * .02, .19 - i * .02, .36, g, [0, -.16, 0], t, 10); e.trunk.push(t); prev = t; }
  e.legs = []; for (const x of [-.7, .7]) for (const z of [-.45, .45]) e.legs.push(cyl(.28, .28, 1, g, [x, .5, z], e.root, 10));
  const tail = cyl(.04, .04, .6, g, [-1.4, 1.5, 0], e.root, 6); tail.rotation.z = .6;
  return e;
}
function penguin(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1C1C24', { rough: .5 }), [0, 1.3, 0], p.body); b.scale.set(.85, 1.25, .8);
  const bl = ball(.8, mat('#FFFFFF'), [0, 1.15, .32], p.body); bl.scale.set(.75, 1.1, .6);
  p.head = group([0, 2.55, 0], p.body); ball(.62, mat('#1C1C24', { rough: .5 }), [0, 0, 0], p.head);
  for (const x of [-.24, .24]) { ball(.15, mat('#FFFFFF'), [x, .1, .5], p.head); ball(.08, mat('#111111'), [x, .1, .62], p.head); }
  const bk = cone(.16, .45, mat('#FF9F1C'), [0, -.12, .7], p.head, 10); bk.rotation.x = Math.PI / 2;
  p.flips = [-1, 1].map(s => { const g = group([s * .8, 1.9, 0], p.body); const f = box(.18, 1.3, .55, mat('#1C1C24'), [s * .1, -.6, 0], g); return g; });
  for (const x of [-.35, .35]) box(.4, .12, .6, mat('#FF9F1C'), [x, .06, .2], p.body);
  p.glasses = group([0, .12, .63], p.head); for (const x of [-.24, .24]) box(.32, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], p.glasses); box(.2, .05, .05, mat('#111111'), [0, .04, 0], p.glasses);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B98A', 0);
  w.gate = group(); for (const x of [-3, 3]) cyl(.3, .3, 6, mat('#2E8B4A'), [x, 3, -2], w.gate, 10); box(6.6, 1.2, .3, mat('#2E8B4A'), [0, 6.2, -2], w.gate); box(4.4, .8, .32, mat('#FFC21F'), [0, 6.2, -1.9], w.gate);
  w.fence = group(); for (let i = 0; i < 12; i++) cyl(.08, .08, 2, mat('#8A5A2B'), [-11 + i * 2, 1, -3], w.fence, 6); box(24, .1, .1, mat('#8A5A2B'), [0, 1.8, -3], w.fence);
  w.trees = group(); for (let i = 0; i < 5; i++) { const t = group([-10 + i * 5, 0, -8], w.trees); cyl(.3, .4, 3, mat('#7A5230'), [0, 1.5, 0], t, 8); ball(1.8, mat('#2E8B4A'), [0, 4, 0], t); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.e = elephant(k, k.scene); w.el = w.e.root; w.el.scale.setScalar(3);
  w.pool = cyl(4, 4, .1, mat('#3BA7E0', { rough: .1 }), [0, .06, 0], k.scene, 32); w.pool.castShadow = false;
  w.ice = box(6, .6, 3, mat('#E7F6FF'), [0, .3, -2.4]);
  w.p = penguin(k, k.scene); w.pg = w.p.root; w.p.glasses.visible = false;
  w.pen = group(); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; cyl(.04, .04, .5, mat('#8A5A2B'), [Math.cos(a) * .9, .25, Math.sin(a) * .9], w.pen, 5); } const ring = k.torus(.9, .03, mat('#8A5A2B'), [0, .45, 0], w.pen); ring.rotation.x = Math.PI / 2;
  w.sign = group(); box(1.2, .5, .05, mat('#FFFFFF'), [0, 1.1, 0], w.sign); box(.06, .9, .06, mat('#8A5A2B'), [0, .5, -.05], w.sign); box(.8, .1, .06, mat('#E2453C'), [0, 1.15, .03], w.sign);
  w.crowd = group(); for (let i = 0; i < 4; i++) { const h = ball(.8, mat(['#F2C9A0', '#C68A5A', '#8D5524', '#F2C9A0'][i]), [-3 + i * 2, 4.2, 4], w.crowd); for (const x of [-.25, .25]) { ball(.15, mat('#FFFFFF'), [-3 + i * 2 + x, 4.3, 4.68], w.crowd); ball(.07, mat('#111111'), [-3 + i * 2 + x, 4.3, 4.8], w.crowd); } }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '228',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'ZOO GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE ZOO.'],
  title: 'Gary the ant went to the zoo',
  description: 'The elephant never saw him. The penguin thought he was a raisin. So now Gary has his own enclosure. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'zoo', 'animals', 'funny', 'shorts'],
  sources: [
    'Quiz fact: a 2022 study estimated there are about 20 quadrillion ants on Earth (Schultheiss et al., "The abundance, biomass, and distribution of ants on Earth", PNAS, 2022).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to the zoo.',
      show: ['ground', 'gate', 'trees', 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.4, 1.4, 6.5], look: [0, .55, 0], fov: 46, to: { pos: [1.3, 1.4, 5.9], look: [0, .55, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 1, -1.4, t, true); w.g.position.z = 1 - (t * .4); },
    },
    {
      say: 'The elephant never even saw him.',
      show: ['ground', 'fence', 'trees', 'g', 'el'], sky: '#9ED2F3', lightAt: [0, 7, 3], lightDist: 26,
      cam: { pos: [4, 4, 19], look: [.4, 4.4, 0], fov: 50, to: { pos: [3.8, 4, 18], look: [.4, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { w.el.position.set(-1, 0, -.5); w.el.rotation.y = .3; w.e.trunk.forEach((tk, i) => tk.rotation.z = .15 * Math.sin(t * 2 - i * .5)); gy(w, 2.4, 0, 1.6, -1.3, t); w.g.rotation.z = .1 * Math.sin(t * 8); },
    },
    {
      say: 'The penguin thought he was a raisin.',
      show: ['ground', 'pool', 'ice', 'pg', 'g'], sky: '#BFE3F7', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [1.6, 2.6, 7.5], look: [.5, 1.25, -1], fov: 46, to: { pos: [1.5, 2.6, 6.8], look: [.5, 1.25, -1], fov: 44 } },
      update: (w, p, t) => { w.pg.position.set(-.6, .6, -2.2); w.pg.rotation.set(.35, .5, 0); w.p.head.rotation.x = .3 + .15 * Math.sin(t * 3); gy(w, 1, .6, -1.6, -2, t); w.g.position.x = 1 + Math.min(.6, t * .4); w.g.userData.legs.forEach(l => l.rotation.x = .5 * Math.sin(t * 16)); },
    },
    {
      say: 'So now he has his own exhibit.',
      show: ['ground', 'g', 'pen', 'sign'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1, 2.2, 6], look: [-.3, .7, 0], fov: 46, to: { pos: [.9, 2.2, 5.4], look: [-.3, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.pen.position.set(0, 0, 0); w.sign.position.set(-1.4, 0, .4); gy(w, 0, 0, 0, -1.5, t); w.g.rotation.z = .15 * Math.sin(t * 4); w.crowd.position.set(0, -2.6, -2); w.crowd.rotation.x = .3; },
    },
    {
      say: 'Gary\'s favourite animal: elephant, penguin, or himself? Comment below.',
      quiz: { q: 'What is Gary\'s favourite zoo animal?', options: ['Elephant', 'Penguin', 'Himself'], answer: 'Fun fact: scientists estimate there are about 20 quadrillion ants on Earth.' },
      show: ['ground', 'gate', 'trees', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 4], look: [0, .9, 0], fov: 46, to: { pos: [-2, 1.6, 4.5], look: [0, .9, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, .6, -1.4, t); },
    },
  ],
};

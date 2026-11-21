// Narrative 11: "What Would Happen If… (season 3, with Gary)". Pets are the top-performing topic (081 1.7K, cats could text 363).
// Hook: the premise as a question under 2 s; first frame shows a house-sized cat looming over a street and a tiny person.

function cat(k, parent, color = '#F2994A') {
  const { mat, box, ball, cone, cyl, group } = k;
  const fur = mat(color, { rough: .8 });
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(.7, fur, [0, .55, 0], c.root); b.scale.set(1.4, .75, .9);
  c.head = group([.95, 1.05, 0], c.root);
  ball(.5, fur, [0, 0, 0], c.head);
  for (const z of [-.25, .25]) { cone(.15, .32, fur, [0, .48, z], c.head, 4); ball(.1, mat('#B8F27A', { glow: .6 }), [.4, .08, z * .8], c.head); ball(.05, mat('#111111'), [.48, .08, z * .8], c.head); }
  ball(.06, mat('#FF8FA3'), [.5, -.06, 0], c.head);
  c.tail = cyl(.08, .06, 1.1, fur, [-1.0, 1.0, 0], c.root, 6); c.tail.rotation.z = .6;
  c.crown = group([0, .55, 0], c.head); cyl(.32, .28, .25, mat('#FFD21F', { glow: .6 }), [0, 0, 0], c.crown, 8);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .27, .2, Math.sin(a) * .27], c.crown, 4); }
  return c;
}
function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}
function house(k, parent, wall = '#F2D9B8', roofc = '#B3262E') {
  const { mat, box, cyl, ball, cone, group } = k;
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 2.2, 0], h.root);
  box(4, 3.4, 3.4, mat(wall), [0, 1.7, 0], h.body);
  const r = cone(3.2, 2.2, mat(roofc), [0, 4.5, 0], h.body, 4); r.rotation.y = Math.PI / 4;
  box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], h.body);
  h.eyes = [-1.1, 1.1].map(x => { const g = group([x, 2.4, 1.72], h.body); box(.9, .9, .08, mat('#FFFFFF'), [0, 0, 0], g); ball(.2, mat('#111111'), [0, 0, .08], g); return g; });
  h.legs = [-1, 1].map(x => { const l = group([x, 2.2, 0], h.root); cyl(.28, .28, 2.2, mat('#6B4B2E'), [0, -1.1, 0], l, 10); box(.8, .3, 1.1, mat('#3A2A1A'), [0, -2.2, .25], l); return l; });
  return h;
}
function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 6], w.road);
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false; w.ct.scale.setScalar(6);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root; w.pp.scale.setScalar(.5);
  w.h = house(k, k.scene); w.hs = w.h.root; w.h.legs.forEach(l => l.visible = false); w.h.eyes.forEach(e => e.visible = false); w.h.body.position.y = 0;
  w.h2 = house(k, k.scene, '#CFE3F2', '#2F6FD6'); w.hs2 = w.h2.root; w.h2.legs.forEach(l => l.visible = false); w.h2.eyes.forEach(e => e.visible = false); w.h2.body.position.y = 0;
  w.car = car(k, k.scene); w.cr = w.car.root; w.car.eyes.forEach(e => e.visible = false); w.car.mouth.visible = false;
  w.dot = group(); const d = ball(.5, mat('#FF2020', { glow: 1 }), [0, .1, 0], w.dot); d.scale.y = .15; d.castShadow = false;
  w.trees = group(); for (let i = 0; i < 6; i++) { const t = group([-12 + i * 5, 0, -6], w.trees); cyl(.35, .45, 2.6, mat('#6B4B2E'), [0, 1.3, 0], t, 8); ball(1.6, mat('#2E8B4A'), [0, 3.5, 0], t); }
  w.cuc = group(); const cu = cyl(.35, .35, 2.4, mat('#3E8E3A'), [0, .35, 0], w.cuc, 14); cu.rotation.z = Math.PI / 2;
  w.dust = group(); for (let i = 0; i < 10; i++) { const s = ball(.9, mat('#D8CFC0'), [0, 0, 0], w.dust); s.userData.i = i; s.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.ct.position.set(x, y, z); w.ct.rotation.set(0, ry, 0); w.c.head.rotation.set(0, 0, 0); w.c.tail.rotation.set(0, 0, .6 + .3 * Math.sin(t * 3)); };
const puff = (w, x, z, t, on) => { w.dust.visible = on; w.dust.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, q = Math.min(1, t * 1.5); s.position.set(x + Math.cos(a) * (2 + q * 4), .6 + q, z + Math.sin(a) * (1 + q * 2)); s.scale.setScalar(.5 + q); }); };

export default {
  id: '167',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT CATS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WERE GIANT?'],
  title: 'What would happen if cats were giant?',
  description: 'Every house is a cardboard box. Parked cars get knocked over. A laser pointer flattens the park. And cucumbers are still terrifying. (A comedy what-if.)',
  tags: ['whatif', 'cats', 'funny', 'giant', 'pets', 'shorts'],
  sources: [
    'Comedy what-if. Cats knocking objects off surfaces and chasing laser dots are widely reported cat behaviours.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cats were giant?',
      show: ['ground', 'road', 'ct', 'pp', 'hs'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [3, 3, 30], look: [0, 10, 0], fov: 50, to: { pos: [3, 3, 28], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t) => { pose(w, -2, 0, -2, -1.25, t); w.c.head.rotation.z = .15 * Math.sin(t * 2); w.hs.position.set(7, 0, 0); w.hs.scale.setScalar(1); w.pp.position.set(3, 0, 8); w.pp.rotation.set(0, -.3, 0); w.p.mouth.scale.y = 2.4; },
    },
    {
      say: 'A cardboard box? Now it is a whole house.',
      show: ['ground', 'road', 'ct', 'hs2'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [10, 6, 24], look: [0, 6.5, 0], fov: 50, to: { pos: [9, 6, 22], look: [0, 6.5, 0], fov: 48 } },
      shake: (t) => .05,
      update: (w, p, t) => {
        w.hs2.position.set(0, 0, 0); w.hs2.scale.setScalar(1.3); w.hs2.rotation.set(0, 0, .04 * Math.sin(t * 14));
        pose(w, -1.5, 3.2 + .3 * Math.sin(t * 3), 0, -1.25, t); w.ct.scale.set(6, 4, 6);
      },
    },
    {
      say: 'Knocking things over? Now it is parked cars.',
      show: ['ground', 'road', 'ct', 'cr'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [12, 5, 26], look: [1, 6, 2], fov: 52, to: { pos: [11, 5, 24], look: [1, 6, 2], fov: 50 } },
      update: (w, p, t) => {
        w.ct.scale.setScalar(6); pose(w, -5, 0, 0, -.4, t);
        const q = Math.max(0, t - 1); w.cr.position.set(2 + q * 5, 0, 6 + q * 1.5); w.cr.rotation.set(0, q * 3, -Math.min(1.5, q * 2)); w.cr.position.y = Math.min(1.5, q * 2) * 1.1;
        w.c.head.rotation.z = -.2;
      },
    },
    {
      say: 'A laser pointer? Goodbye, park.',
      show: ['ground', 'ct', 'dot', 'trees', 'dust'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [4, 8, 30], look: [0, 6, 0], fov: 52, to: { pos: [4, 8, 28], look: [0, 6, 0], fov: 50 } },
      shake: (t) => t > 1.1 ? .12 : 0,
      update: (w, p, t) => {
        const jump = Math.min(1, Math.max(0, (t - .6) * 2)), land = t > 1.1;
        w.dot.position.set(4 * Math.sin(t * 5), 0, 2); w.dot.scale.setScalar(2.5);
        pose(w, -8 + jump * 8, Math.sin(jump * Math.PI) * 6, 1, -.6, t);
        w.trees.children.forEach((tr, i) => { tr.rotation.z = land ? (i < 3 ? 1 : -1) * Math.min(1.4, (t - 1.1) * 4) : 0; });
        puff(w, 0, 1, t - 1.1, land);
      },
    },
    {
      say: 'But a cucumber? Still the scariest thing ever.',
      show: ['ground', 'road', 'ct', 'cuc'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [4, 4, 28], look: [0, 9, 0], fov: 52, to: { pos: [4, 4, 26], look: [0, 9, 0], fov: 50 } },
      update: (w, p, t) => {
        w.trees.children.forEach(tr => tr.rotation.z = 0);
        const j = Math.min(1, Math.max(0, (t - .5) * 1.6));
        pose(w, -2, Math.sin(j * Math.PI) * 9, -1, -1.25, t); w.ct.rotation.x = .3 * Math.sin(j * Math.PI);
        w.c.tail.rotation.z = .6 + j * 1.5; w.cuc.position.set(3, 0, 8); w.cuc.scale.setScalar(2.4);
      },
    },
    {
      say: 'A giant cat: cute, a nightmare, or the boss of everyone? Comment below.',
      quiz: { q: 'Would you want a giant cat?', options: ['Cute', 'A nightmare', 'The boss'], answer: 'Cats are not giant. They only act like it.' },
      show: ['ground', 'road', 'ct', 'hs'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [12, 2, 24], look: [0, 8, 0], fov: 46, to: { pos: [-12, 2, 24], look: [0, 8, 0] } },
      update: (w, p, t) => { w.ct.rotation.x = 0; pose(w, -2, 0, -2, -1.25, t); w.hs.position.set(7, 0, 0); },
    },
  ],
};

// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 dinosaurs as pets, 1.7K, channel best).
// Hook: the premise as a question under 2 s; first frame shows a T-rex walking down a town street between buildings, cars at its feet.

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
  w.ground = k.ground('#8A9A7A', 0);
  w.road = group(); box(400, .04, 14, mat('#4F4F55', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(3, .05, .35, mat('#F5F0D0'), [-120 + i * 6, .05, 0], w.road);
  w.town = group(); const cols = ['#D9B38C', '#B8C7D9', '#E5C3C3', '#C8D9B8', '#E8DDB5', '#C9B8E5'];
  for (let i = 0; i < 10; i++) { const h = 14 + (i * 7) % 12, x = -45 + i * 10; box(9, h, 8, mat(cols[i % 6]), [x, h / 2, -13], w.town); for (let r = 0; r < Math.floor(h / 4); r++) for (const dx of [-2.5, 0, 2.5]) box(1.4, 1.6, .1, mat('#5A6E85', { rough: .2 }), [x + dx, 3 + r * 4, -8.95], w.town); }
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = car(k, w.cars); c.root.userData.i = i; c.root.userData.c = c; c.eyes.forEach(e => e.visible = false); c.mouth.visible = false; c.body.children[0].material = mat(['#3B82F6', '#22C55E', '#F97316', '#E2453C'][i], { rough: .3 }); c.body.children[1].material = c.body.children[0].material; }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.stop = group(); cyl(.12, .12, 5, mat('#666666'), [0, 2.5, 0], w.stop, 8); box(1.6, 1, .1, mat('#2F6FD6', { glow: .2 }), [0, 4.8, 0], w.stop); box(4, .2, 1.4, mat('#999999'), [2, 3.6, 0], w.stop); box(4, .15, .8, mat('#7A5A3A'), [2, 1.2, 0], w.stop);
  w.tower = group(); box(10, 26, 8, mat('#B8C7D9'), [0, 13, 0], w.tower); for (let r = 0; r < 6; r++) for (const dx of [-3, 0, 3]) box(2, 2.2, .1, mat(r === 5 && dx === 0 ? '#FFE9A3' : '#5A6E85', { rough: .2, glow: r === 5 && dx === 0 ? .4 : 0 }), [dx, 3 + r * 4, 4.05], w.tower);
  w.shop = group(); box(10, 6, 6, mat('#F2D9B8'), [0, 3, 0], w.shop); box(10.4, .6, 6.4, mat('#E2453C'), [0, 6.3, 0], w.shop); w.door = box(2, 3.2, .1, mat('#3A2A1A'), [0, 1.6, 3.05], w.shop);
  return w;
}

const pose = (w, x, z, ry, t, still = false, sp = 4) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, sp, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); };

export default {
  id: '185',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DINOSAURS IN TOWN',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'LIVED IN TOWN?'],
  title: 'What would happen if dinosaurs lived in town?',
  description: 'Traffic? They just step over it. Bus stops get crowded. Window shopping happens on the top floor. And tiny doors are a big problem. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'funny', 'city', 'shorts'],
  sources: [
    'Comedy what-if; quiz answer uses the T. rex length already cited in 169 (about 12 m, Natural History Museum London, from memory).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs lived in town?',
      show: ['ground', 'road', 'town', 'dino', 'cars'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [12, 6, 34], look: [0, 12.5, 0], fov: 46, to: { pos: [11, 6, 32], look: [1, 12.5, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -4 + t * 1.2, 0, -.35, t); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-10 + i * 7 + t * (i % 2 ? -2 : 2), 0, (i % 2 ? -3.5 : 3.5)); c.rotation.set(0, i % 2 ? Math.PI : 0, 0); }); },
    },
    {
      say: 'Traffic? They just step over it.',
      show: ['ground', 'road', 'town', 'dino', 'cars'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [14, 5, 30], look: [0, 8, 0], fov: 50, to: { pos: [13, 5, 28], look: [1, 8, 0], fov: 48 } },
      update: (w, p, t) => { pose(w, -8 + t * 3, 0, 0, t, false, 5); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-6 + i * 4.6, 0, -1 + (i % 2) * 2.5); c.rotation.set(0, 0, 0); }); },
    },
    {
      say: 'Bus stops? A little bit crowded.',
      show: ['ground', 'road', 'town', 'dino', 'pp', 'stop'], sky: '#9ED2F3', lightAt: [0, 8, 4], lightDist: 30,
      cam: { pos: [6, 6, 34], look: [0, 9, 4], fov: 46, to: { pos: [5.5, 6, 32], look: [0, 9, 4], fov: 44 } },
      update: (w, p, t) => {
        w.stop.position.set(2, 0, 7); w.pp.position.set(4.6, 1.3, 7); w.pp.rotation.set(0, -.3, 0); w.p.mouth.scale.y = 2.4; w.p.head.rotation.set(0, 0, -.2);
        pose(w, -4, 6, -.4, t, true); w.r.neck.rotation.z = -.15 + .05 * Math.sin(t * 2);
      },
    },
    {
      say: 'Window shopping? Top floor only.',
      show: ['ground', 'road', 'dino', 'tower'], sky: '#9ED2F3', lightAt: [0, 12, 0], lightDist: 32,
      cam: { pos: [10, 9, 34], look: [1, 12, -4], fov: 50, to: { pos: [9.5, 9, 32], look: [1, 12, -4], fov: 48 } },
      update: (w, p, t) => { w.tower.position.set(6, 0, -8); w.tower.rotation.set(0, 0, 0); w.tower.scale.set(1, .62, 1); pose(w, -6, -3, 0, t, true); w.r.body.rotation.z = .2; w.r.neck.rotation.z = .25 + .05 * Math.sin(t * 2); },
    },
    {
      say: 'But tiny doors? Not a chance.',
      show: ['ground', 'road', 'dino', 'shop'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 28,
      cam: { pos: [16, 7, 26], look: [1, 7, 0], fov: 50, to: { pos: [15, 7, 24], look: [1, 7, 0], fov: 48 } },
      shake: (t) => .04,
      update: (w, p, t) => {
        w.dino.scale.setScalar(1); w.shop.position.set(6, 0, -2); w.shop.rotation.set(0, -Math.PI / 2, 0);
        pose(w, -5.5, -2, 0, t, true); w.r.body.rotation.z = -.5 + .05 * Math.sin(t * 10); w.r.neck.rotation.z = -.6; w.dino.position.x = -5.5 + .3 * Math.sin(t * 10);
      },
    },
    {
      say: 'Dinosaurs in town: cool, chaotic, or terrifying? Comment below.',
      quiz: { q: 'Would you want a dinosaur neighbour?', options: ['Cool', 'Chaotic', 'Terrifying'], answer: 'A real T-rex was about 12 metres long. Taller than a bus stop. Much taller.' },
      show: ['ground', 'road', 'town', 'dino'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [16, 6, 28], look: [0, 11, 0], fov: 46, to: { pos: [-12, 6, 30], look: [0, 11, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, -.3, t, true); },
    },
  ],
};

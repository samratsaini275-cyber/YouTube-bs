// Narrative 7: "Animals at Work". A made-up comedy sketch: pigeons do not cut hair.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the pigeon holding scissors next to a customer.

function pigeon(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const bd = ball(1, mat('#8A93A6'), [0, 1.4, 0], p.body); bd.scale.set(1.4, 1, 1);
  ball(.62, mat('#6FA3A0', { metal: .3 }), [.9, 2, 0], p.body).scale.set(1, .9, 1);
  p.head = group([1.3, 2.6, 0], p.body);
  ball(.55, mat('#8A93A6'), [0, 0, 0], p.head);
  cone(.18, .55, mat('#FFB020'), [.65, -.05, 0], p.head, 8).rotation.z = -Math.PI / 2;
  for (const z of [-.25, .25]) { ball(.13, mat('#FF8A1F'), [.35, .15, z], p.head); ball(.06, mat('#111111'), [.42, .17, z * 1.1], p.head); }
  p.scissors = group([.9, -.15, 0], p.head);
  for (const s of [-1, 1]) { const b = box(.9, .06, .08, mat('#C0C0C8', { metal: .8 }), [.45, 0, 0], p.scissors); b.rotation.y = s * .25; }
  k.torus(.12, .03, mat('#E2453C'), [0, 0, .12], p.scissors).rotation.x = Math.PI / 2;
  p.wings = [-1, 1].map(s => { const g = group([0, 1.6, s * .9], p.body); box(1.6, .1, .7, mat('#5B6478'), [-.3, 0, s * .2], g); return g; });
  for (const z of [-.3, .3]) cyl(.05, .05, .8, mat('#E2453C'), [0, .4, z], p.root, 6);
  box(1.2, .1, 1, mat('#5B6478'), [-1.6, 1.5, 0], p.body).rotation.z = .3;
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8E2D6', 0);
  w.shop = group();
  box(60, 30, .5, mat('#BFE3EA'), [0, 15, -8], w.shop);
  box(14, 9, .2, mat('#DDEEFF', { metal: .5, rough: .05 }), [0, 9, -7.7], w.shop);
  for (let i = 0; i < 8; i++) { const st = box(.6, 10, .3, mat(i % 2 ? '#E2453C' : '#FFFFFF'), [12, 5, -7 + i * .02], w.shop); st.rotation.z = .4; st.position.y = 1 + i * 1.2; st.scale.y = .12; }
  cyl(.6, .6, 10, mat('#FFFFFF', { opacity: .4 }), [12, 5, -7], w.shop, 16);
  // customer in chair
  w.cust = group([0, 0, 0]);
  box(3.4, 1, 3, mat('#2A2A2A'), [0, 3, 0], w.cust); box(3.4, 4, .6, mat('#2A2A2A'), [0, 5, -1.4], w.cust); cyl(.4, .6, 2.6, mat('#9AA3AE', { metal: .7 }), [0, 1.3, 0], w.cust, 12);
  cyl(1.5, 1.9, 3, mat('#FFFFFF'), [0, 5, 0], w.cust, 16);
  ball(1.05, mat('#F2C9A0'), [0, 7.3, 0], w.cust);
  for (const x of [-.35, .35]) ball(.12, mat('#111111'), [x, 7.45, .95], w.cust);
  w.mouth = box(.4, .08, .05, mat('#8B3A2E'), [0, 6.9, 1], w.cust);
  w.hair = group([0, 7.8, 0], w.cust);
  w.tufts = [];
  for (let i = 0; i < 14; i++) { const a = i * .45, r = .75 + (i % 3) * .1; const t = ball(.45, mat('#6B3A1E', { rough: .9 }), [Math.cos(a) * r * .9, .2 + (i % 4) * .15, Math.sin(a) * r * .8], w.hair); w.tufts.push(t); }
  w.p = pigeon(k, k.scene); w.bird = w.p.root;
  w.flying = group();
  for (let i = 0; i < 10; i++) { const f = ball(.2, mat('#6B3A1E'), [0, 0, 0], w.flying); f.userData = { a: i * .63, ph: (i * .19) % 1 }; f.castShadow = false; }
  w.nest = group([0, 0, 0]);
  const n = k.torus(1.6, .7, mat('#6B3A1E', { rough: 1 }), [0, .6, 0], w.nest); n.rotation.x = Math.PI / 2;
  w.counter = group([0, 0, 0]);
  box(10, 4, 4, mat('#C9A27A'), [0, 2, 0], w.counter);
  w.bread = group([0, 0, 0]);
  for (let i = 0; i < 6; i++) { const b = box(1.6, .3, 1.6, mat('#E8B86A'), [((i * 7) % 3 - 1) * .4, .15 + i * .3, ((i * 5) % 3 - 1) * .3], w.bread); b.rotation.y = i * .5; }
  return w;
}

function peck(p, t, sp = 14) { p.head.rotation.z = -.5 * Math.max(0, Math.sin(t * sp)); p.body.rotation.z = -.15 * Math.max(0, Math.sin(t * sp)); }

export default {
  id: '104',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PIGEON BARBER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS PIGEON', 'BECAME A BARBER.'],
  title: 'This pigeon became a barber',
  description: 'Every haircut is a peck. Every bit of hair goes in the nest. Tips are bread. (A made-up pigeon and a made-up barber shop.)',
  tags: ['animalsatwork', 'funny', 'pigeon', 'barber', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the pigeon barber and his shop are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This pigeon became a barber.',
      show: ['ground', 'shop', 'cust', 'bird'], sky: '#BFE3EA', lightAt: [1, 6, 2], lightDist: 16,
      cam: { pos: [5, 4.5, 17], look: [1, 10.8, 0], fov: 46, to: { pos: [4.6, 4.5, 16], look: [1, 10.7, 0], fov: 44 } },
      update: (w, p, t) => { w.tufts.forEach(x => { x.visible = true; }); w.bird.position.set(2.4, 6.5, 1); w.bird.rotation.y = Math.PI * .9; peck(w.p, 0); w.p.head.rotation.y = .3 * Math.sin(t * 3); },
    },
    {
      say: 'His haircuts? Mostly pecking.',
      show: ['ground', 'shop', 'cust', 'bird', 'flying'], sky: '#BFE3EA', lightAt: [1, 6, 2], lightDist: 16,
      cam: { pos: [5, 6.5, 16], look: [.6, 8.6, 0], fov: 46, to: { pos: [4.6, 6.5, 15], look: [.6, 8.6, 0], fov: 44 } },
      shake: () => .02,
      update: (w, p, t) => {
        w.bird.position.set(1.3, 8.1, .2); w.bird.rotation.y = Math.PI * .95; w.p.head.rotation.y = 0; peck(w.p, t);
        w.tufts.forEach((x, i) => { x.visible = i > Math.floor(t * 4); });
        w.flying.children.forEach(f => { const u = f.userData, q = (t * 1.5 + u.ph) % 1; f.position.set(Math.cos(u.a) * q * 3, 8.5 + q * 2 - q * q * 4, Math.sin(u.a) * q * 2); });
        w.mouth.scale.set(1, 3, 1);
      },
    },
    {
      say: 'He keeps all the hair. It is his new nest.',
      show: ['ground', 'shop', 'counter', 'nest', 'bird'], sky: '#BFE3EA', lightAt: [0, 7, 2], lightDist: 14,
      cam: { pos: [3, 7.5, 11], look: [0, 5.6, 0], fov: 46, to: { pos: [2.7, 7.4, 10], look: [0, 5.6, 0], fov: 44 } },
      update: (w, p, t) => { w.counter.position.set(0, 0, 0); w.nest.position.set(0, 4, 0); w.bird.position.set(-.3, 4.2, 0); w.bird.rotation.y = .4; peck(w.p, 0); w.p.head.rotation.y = .2 * Math.sin(t * 2); w.p.body.position.y = .05 * Math.sin(t * 3); },
    },
    {
      say: 'And every tip is paid in bread. Best job ever.',
      show: ['ground', 'shop', 'counter', 'bread', 'bird'], sky: '#FFE3C2', lightAt: [0, 7, 2], lightDist: 14,
      cam: { pos: [3, 7.5, 12], look: [.5, 5.8, 0], fov: 46, to: { pos: [2.7, 7.4, 11], look: [.5, 5.8, 0], fov: 44 } },
      update: (w, p, t) => {
        w.counter.position.set(0, 0, 0); w.bread.position.set(2, 4, 0); w.bird.position.set(-1.6, 4 + .4 * Math.abs(Math.sin(t * 6)), 0); w.bird.rotation.y = .3; peck(w.p, 0); w.p.body.position.y = 0;
        w.p.wings.forEach((g, i) => { g.rotation.x = (i ? -1 : 1) * .7 * Math.abs(Math.sin(t * 12)); });
      },
    },
    {
      say: 'Pigeon haircut: yes, no, or only a trim? Comment below.',
      quiz: { q: 'Would you let a pigeon cut your hair?', options: ['Yes', 'No', 'Only a trim'], answer: 'It is a made-up barber. Bring your own bread.' },
      show: ['ground', 'shop', 'cust', 'bird'], sky: '#274B73', lightAt: [1, 6, 2], lightDist: 16,
      cam: { pos: [4, 3.5, 15], look: [1, 9.5, 0], fov: 46, to: { pos: [-3, 3.5, 15], look: [1, 9.5, 0] } },
      update: (w, p, t) => { w.tufts.forEach(x => { x.visible = true; }); w.mouth.scale.set(1, 1, 1); w.p.wings.forEach(g => { g.rotation.x = 0; }); w.bird.position.set(2.4, 6.5, 1); w.bird.rotation.y = Math.PI * .9; peck(w.p, 0); w.p.head.rotation.y = .3 * Math.sin(t * 3); },
    },
  ],
};

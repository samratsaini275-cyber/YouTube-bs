// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; combines pets (067, 079) with 074 (homework did itself, ~1.1K views).
// A made-up comedy sketch: pets do not do chores. Hook: the premise as a question under 2 s; first frame shows the dog at the sink.

function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}
function talk(d, t, on = true) { d.mouth.scale.y = on ? 1 + 4 * Math.abs(Math.sin(t * 14)) : 1; d.tail.rotation.x = .7 * Math.sin(t * 15); }

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


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#D9C7A8', 0);
  w.room = group(); box(40, 20, .5, mat('#CDE7F0'), [0, 10, -3], w.room);
  w.sink = group([0, 0, -.6]); box(4, 2.2, 1.6, mat('#F2F2F2'), [0, 1.1, 0], w.sink); box(1.6, .2, 1.1, mat('#9AA5AD'), [0, 2.25, .1], w.sink);
  cyl(.06, .06, .8, mat('#C0C6CC', { metal: .6 }), [0, 2.7, -.5], w.sink, 6);
  w.plates = group(); for (let i = 0; i < 4; i++) { const pl = cyl(.4, .4, .05, mat('#FFFFFF'), [0, 0, 0], w.plates, 18); pl.userData.i = i; }
  w.sparkle = group(); for (let i = 0; i < 5; i++) { const s = ball(.08, mat('#FFFFFF', { glow: 2 }), [0, 0, 0], w.sparkle); s.userData.i = i; s.castShadow = false; }
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.pile = group([0, 0, 0]); const cols = ['#E2453C', '#3B82F6', '#22C55E', '#FFD21F', '#8B5CF6'];
  for (let i = 0; i < 5; i++) box(1.6 - i * .1, .25, 1.2 - i * .05, mat(cols[i], { rough: .9 }), [0, .13 + i * .25, 0], w.pile);
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false;
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.22, .22, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  w.wheel = group([0, 0, 0]); const tor = k.torus(1, .08, mat('#C0C6CC', { metal: .5 }), [0, 0, 0], w.wheel);
  w.ham = group([0, 0, 0]); const hb = ball(.35, mat('#E8B57A'), [0, 0, 0], w.ham); hb.scale.set(1.3, 1, 1); ball(.18, mat('#FFFFFF'), [.3, -.05, 0], w.ham);
  for (const z of [-.15, .15]) { ball(.1, mat('#E8B57A'), [.1, .3, z], w.ham); ball(.05, mat('#111111'), [.38, .1, z * .7], w.ham); }
  w.vac = group([0, 0, 0]); box(1.4, 1, 1, mat('#E2453C'), [0, .5, 0], w.vac); cyl(.08, .08, 2.6, mat('#555555'), [-1, 1.2, 0], w.vac, 6).rotation.z = .9; box(1, .2, .5, mat('#222222'), [-2, .1, 0], w.vac);
  w.cable = cyl(.03, .03, 2, mat('#111111'), [1.6, .6, 0], w.vac, 4); w.cable.rotation.z = Math.PI / 2;
  w.dust = group(); for (let i = 0; i < 8; i++) { const d = ball(.06, mat('#8A7F70'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  w.treats = group(); for (let i = 0; i < 18; i++) { const t = group([0, 0, 0], w.treats); cyl(.07, .07, .5, mat('#C9864A'), [0, 0, 0], t, 6).rotation.z = Math.PI / 2; for (const x of [-.25, .25]) for (const z of [-.06, .06]) ball(.08, mat('#C9864A'), [x, 0, z], t); t.userData.i = i; }
  return w;
}

const pose = (w, x, y, z, ry) => { w.dg.position.set(x, y, z); w.dg.rotation.set(0, ry, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); w.d.body.position.y = 0; };

export default {
  id: '152',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PETS DOING CHORES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PETS', 'DID YOUR CHORES?'],
  title: 'What would happen if pets did your chores?',
  description: 'The dog licks the dishes clean. The cat folds the laundry into a bed. The hamster powers the vacuum. Payday is expensive. (Made-up working pets.)',
  tags: ['whatif', 'funny', 'pets', 'dog', 'cat', 'shorts'],
  sources: [
    'Comedy sketch: pets doing chores is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if pets did your chores?',
      show: ['ground', 'room', 'sink', 'dg', 'plates'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 3, 10], look: [0, 4.3, 0], fov: 46, to: { pos: [.3, 3, 9.2], look: [0, 4.25, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, .4, 2.2, .4, 1.0); talk(w.d, t, false); w.d.tail.rotation.x = .7 * Math.sin(t * 15);
        w.plates.children.forEach(pl => { const i = pl.userData.i; pl.position.set(-1.2 + i * .15, 2.45 + i * .06, .3); pl.rotation.set(0, 0, 0); });
      },
    },
    {
      say: 'Dishes? The dog licks them clean.',
      show: ['ground', 'room', 'sink', 'dg', 'plates', 'sparkle'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, 3.8, 9.5], look: [-.2, 3.4, 0], fov: 46, to: { pos: [.5, 3.7, 8.8], look: [-.2, 3.4, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, .4, 2.2, .4, 1.0); w.d.mouth.scale.y = 1 + 4 * Math.abs(Math.sin(t * 12)); w.d.head.rotation.z = -.3; w.d.tail.rotation.x = .7 * Math.sin(t * 15);
        w.plates.children.forEach(pl => { const i = pl.userData.i; pl.position.set(-.45 + i * .02, 3.3 + i * .05, 1.75); pl.rotation.set(1.3, 0, t * 4 + i); });
        w.sparkle.children.forEach(s => { const q = (t * 1.2 + s.userData.i / 5) % 1; s.position.set(-.45 + Math.cos(s.userData.i * 1.3) * .6, 3.4 + q * .9, 1.9); s.scale.setScalar(1 - q); });
      },
    },
    {
      say: 'Laundry? The cat folds it. Into a bed.',
      show: ['ground', 'room', 'pile', 'ct', 'zz'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, 2.6, 6.5], look: [0, 1.6, 0], fov: 46, to: { pos: [.4, 2.5, 5.8], look: [0, 1.6, 0], fov: 44 } },
      update: (w, p, t) => {
        w.pile.position.set(0, 0, 0); w.ct.position.set(-.1, 1.3, 0); w.ct.rotation.set(0, -1.25, 0); w.c.head.rotation.z = -.3; w.c.tail.rotation.x = .2 * Math.sin(t);
        w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(.5 + q * .5, 2.4 + q * 1.2, .2); z.scale.setScalar(.6 + q); z.rotation.z = .5; });
      },
    },
    {
      say: 'Vacuuming? The hamster powers it. Barely.',
      show: ['ground', 'room', 'wheel', 'ham', 'vac', 'dust'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, 2.2, 8.5], look: [.6, 1.0, 0], fov: 48, to: { pos: [.6, 2.1, 7.8], look: [.6, 1.0, 0], fov: 46 } },
      update: (w, p, t) => {
        w.wheel.position.set(1.6, 1.2, 0); w.wheel.rotation.set(Math.PI / 2, 0, 0); w.vac.position.set(-.8, 0, 0); w.vac.position.x = -.8 - (t % 2) * .05;
        w.ham.scale.setScalar(1.1); w.ham.position.set(1.6, .55 + .06 * Math.abs(Math.sin(t * 20)), 0); w.ham.rotation.set(0, -.5, .1 * Math.sin(t * 20));
        w.dust.children.forEach(d => { const q = (t * .8 + d.userData.i / 8) % 1; d.position.set(-3.2 + q * .6, .1 + q * .3, (d.userData.i % 3 - 1) * .2); });
      },
    },
    {
      say: 'And payday? They all want treats. So many treats.',
      show: ['ground', 'room', 'dg', 'ct', 'treats'], sky: '#FFE3C2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.8, 11], look: [0, 2.0, 0], fov: 48, to: { pos: [0, 2.8, 10.2], look: [0, 2.0, 0], fov: 46 } },
      update: (w, p, t) => {
        pose(w, -1.0, 0, 0, 1.3); talk(w.d, t, false); w.d.tail.rotation.x = .9 * Math.sin(t * 18);
        w.ct.position.set(1.8, 0, .2); w.ct.rotation.set(0, -1.9, 0); w.c.head.rotation.z = .15; w.c.tail.rotation.x = .4 * Math.sin(t * 3);
        w.treats.children.forEach(tr => { const i = tr.userData.i; const q = Math.min(1, Math.max(0, t * 2 - i * .1)); tr.visible = q > 0; tr.position.set(Math.sin(i * 2.4) * .6, 5 - q * (5 - (.1 + Math.floor(i / 6) * .18)), .6 + Math.cos(i * 2.4) * .4); tr.rotation.y = i; });
      },
    },
    {
      say: 'Pets doing chores: genius, great, or a disaster? Comment below.',
      quiz: { q: 'Pets doing your chores would be…', options: ['Genius', 'Great', 'A disaster'], answer: 'Pets doing chores is made up. The dishes are still yours.' },
      show: ['ground', 'room', 'sink', 'dg'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 1.2, 8], look: [0, 4.6, 0], fov: 46, to: { pos: [-1.2, 1.2, 8], look: [0, 4.6, 0] } },
      update: (w, p, t) => { pose(w, .4, 2.2, .4, 1.0); talk(w.d, t, false); w.d.tail.rotation.x = .7 * Math.sin(t * 15); },
    },
  ],
};

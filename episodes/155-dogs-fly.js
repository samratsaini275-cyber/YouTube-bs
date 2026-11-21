// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; combines 067 (dogs could drive, ~1K) and 080 (everyone could fly, ~890).
// A made-up comedy sketch: dogs cannot fly. Hook: the premise as a question under 2 s; first frame shows a winged dog in the air.

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
  w.ground = k.ground('#7FB069', 0);
  w.park = group(); for (let i = 0; i < 5; i++) { cyl(.35, .45, 3, mat('#6B4B2E'), [-9 + i * 4.5, 1.5, -5], w.park, 8); ball(1.6, mat('#2E8B4A'), [-9 + i * 4.5, 3.9, -5], w.park); }
  w.clouds = group(); for (let i = 0; i < 4; i++) { const c = group([-8 + i * 5, 9 + (i % 2), -8], w.clouds); for (let j = 0; j < 3; j++) ball(.9 - j * .15, mat('#FFFFFF'), [j * .9 - .9, 0, 0], c); }
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.wings = [-1, 1].map(s => { const g = group([0, 1.5, s * .55], w.d.body); const wg = box(1.1, .06, .9, mat('#FFFFFF'), [0, 0, s * .45], g); return g; });
  w.ball = ball(.22, mat('#C8F02E'), [0, 0, 0], k.scene);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.leash = cyl(.04, .04, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.geometry.translate(0, .5, 0);
  w.tree = group([0, 0, 0]); cyl(.45, .6, 6, mat('#6B4B2E'), [0, 3, 0], w.tree, 10); ball(2.2, mat('#2E8B4A'), [0, 6.6, 0], w.tree);
  w.squirrel = group([0, 0, 0]); const sq = ball(.3, mat('#A0522D'), [0, 0, 0], w.squirrel); sq.scale.set(1, 1.2, 1); ball(.2, mat('#A0522D'), [0, .4, .1], w.squirrel);
  const tail = ball(.3, mat('#A0522D'), [0, .2, -.35], w.squirrel); tail.scale.set(.7, 1.6, .7);
  for (const x of [-.08, .08]) ball(.05, mat('#111111'), [x, .45, .28], w.squirrel);
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false;
  return w;
}

const fly = (w, x, y, z, ry, t) => {
  w.dg.position.set(x, y + .25 * Math.sin(t * 3), z); w.dg.rotation.set(0, ry, .05 * Math.sin(t * 3)); w.d.head.rotation.set(0, 0, 0); w.d.body.position.y = 0;
  w.wings.forEach((g, i) => { g.rotation.x = (i ? -1 : 1) * .7 * Math.sin(t * 18); }); w.d.legs.forEach((l, i) => { l.rotation.x = .3 * Math.sin(t * 10 + i); }); w.d.tail.rotation.x = .7 * Math.sin(t * 15);
};

export default {
  id: '155',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLYING DOG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'COULD FLY?'],
  title: 'What would happen if dogs could fly?',
  description: 'Fetch never ends. Walks need a kite string. Squirrels have nowhere to hide. And the cat is still not impressed. (A made-up flying dog.)',
  tags: ['whatif', 'funny', 'dog', 'flyingdog', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: dogs cannot fly; this is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs could fly?',
      show: ['ground', 'park', 'clouds', 'dg'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [.5, 3.4, 10.5], look: [0, 5.7, 0], fov: 46, to: { pos: [.4, 3.4, 9.7], look: [0, 5.7, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, -1 + t * .5, 3.4, 0, 1.0, t); talk(w.d, t, false); w.d.mouth.scale.y = 3; },
    },
    {
      say: 'Fetch? The ball never even lands.',
      show: ['ground', 'park', 'clouds', 'dg', 'ball', 'pp'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [1, 4.2, 16], look: [.4, 5.8, 0], fov: 50, to: { pos: [1, 4.2, 15], look: [.4, 6.2, 0], fov: 48 } },
      update: (w, p, t) => {
        w.pp.position.set(-3, 0, 1); w.pp.rotation.set(0, .8, 0); w.p.mouth.scale.y = 1.6;
        const q = Math.min(1, t / 1.2); w.ball.position.set(-2.5 + q * 4.5, 3 + q * 5, .5);
        fly(w, 4 - q * 2, 3 + q * 4.6, .5, Math.PI * .9, t); w.d.mouth.scale.y = 3;
      },
    },
    {
      say: 'Walks? You need a kite string now.',
      show: ['ground', 'park', 'clouds', 'dg', 'pp', 'leash'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [1, 3.6, 13], look: [0, 5, 0], fov: 50, to: { pos: [1, 3.6, 12], look: [0, 5.2, 0], fov: 48 } },
      update: (w, p, t) => {
        w.pp.position.set(-.8 + t * .4, .25 * Math.abs(Math.sin(t * 6)), 1); w.pp.rotation.set(0, .3, 0); w.p.mouth.scale.y = 2;
        fly(w, 1 + t * .4, 7.4, 0, 1.6, t);
        const a = new w.pp.position.constructor(), b = new w.pp.position.constructor(); w.d.body.localToWorld(a.set(-.4, 1.2, 0)); w.pp.localToWorld(b.set(.5, 2.6, .5));
        const d = a.clone().sub(b); w.leash.position.copy(b); w.leash.scale.set(1, d.length(), 1); w.leash.quaternion.setFromUnitVectors(new a.constructor(0, 1, 0), d.normalize());
      },
    },
    {
      say: 'Squirrels? There is nowhere left to hide.',
      show: ['ground', 'clouds', 'tree', 'squirrel', 'dg'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [1.5, 6, 12], look: [.6, 6.6, 0], fov: 48, to: { pos: [1.4, 6, 11], look: [.6, 6.6, 0], fov: 46 } },
      update: (w, p, t) => {
        w.tree.position.set(-1, 0, 0); w.squirrel.position.set(-1, 8.9, .3); w.squirrel.rotation.set(0, .3, .1 * Math.sin(t * 20));
        fly(w, 2.6 - Math.min(1, t / 1.5) * .8, 8.2, .6, Math.PI * .85, t); w.d.mouth.scale.y = 2;
      },
    },
    {
      say: 'And the cat? Still not impressed.',
      show: ['ground', 'park', 'clouds', 'dg', 'ct'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [.5, 3, 11], look: [0, 3.9, 0], fov: 48, to: { pos: [.4, 3, 10.2], look: [0, 3.9, 0], fov: 46 } },
      update: (w, p, t) => {
        fly(w, -1.4 + .4 * Math.sin(t), 4.6, -.6, 1.2, t); w.d.mouth.scale.y = 2;
        w.ct.position.set(1.3, 0, .8); w.ct.rotation.set(0, -1.9, 0); w.c.head.rotation.set(0, 0, .15); w.c.tail.rotation.x = .3 * Math.sin(t * 2);
      },
    },
    {
      say: 'Flying dogs: cool, great, or a disaster? Comment below.',
      quiz: { q: 'Would you want a flying dog?', options: ['Cool', 'Great', 'A disaster'], answer: 'Flying dogs are made up. Keep the leash on.' },
      show: ['ground', 'park', 'clouds', 'dg'], sky: '#274B73', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [.5, 1.6, 9], look: [0, 6, 0], fov: 46, to: { pos: [-1, 1.6, 9], look: [0, 6, 0] } },
      update: (w, p, t) => { fly(w, 0, 3.4, 0, 1.0, t); },
    },
  ],
};

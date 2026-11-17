// Narrative 5: "What Would Happen If…". A made-up comedy sketch: trees stay where they are planted.
// Hook rule: the premise as a question under 2 s, first frame already showing a tree waddling across a park on its roots.

function tree(k, parent, s = 1) {
  const { mat, box, cyl, ball, cone, group } = k;
  const t = { root: group([0, 0, 0], parent) };
  t.root.scale.setScalar(s);
  t.body = group([0, 0, 0], t.root);
  cyl(.9, 1.2, 6, mat('#6B4B2E', { rough: .9 }), [0, 4, 0], t.body, 10);
  t.crown = group([0, 8.5, 0], t.body);
  for (const [x, y, z, r] of [[0, 0, 0, 3.2], [1.8, -.6, .6, 2.2], [-1.8, -.4, -.4, 2.3], [0, 1.6, .4, 2.2]]) ball(r, mat('#2E8B4A', { rough: .8 }), [x, y, z], t.crown);
  for (const x of [-.4, .4]) { ball(.3, mat('#FFFFFF'), [x, 5.6, .9], t.body); ball(.15, mat('#111111'), [x, 5.6, 1.15], t.body); }
  t.mouth = box(.6, .12, .1, mat('#2A1A0E'), [0, 4.9, 1.05], t.body);
  t.legs = [-1, 1].map(sx => { const g = group([sx * .6, 1.3, 0], t.root); const r = cyl(.35, .2, 1.6, mat('#5A3A1E'), [0, -.7, 0], g, 8); for (const a of [-.6, 0, .6]) { const toe = cyl(.15, .08, 1, mat('#5A3A1E'), [0, -1.4, .3], g, 6); toe.rotation.set(1.2, a, 0); } return g; });
  return t;
}
function waddle(t, time, sp = 6, still = false) {
  t.legs.forEach((g, i) => { g.rotation.x = still ? 0 : .6 * Math.sin(time * sp + i * Math.PI); });
  t.body.rotation.z = still ? 0 : .08 * Math.sin(time * sp);
  t.body.position.y = still ? 0 : .2 * Math.abs(Math.sin(time * sp));
  t.crown.rotation.y = .1 * Math.sin(time * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.park = group();
  box(60, .05, 3, mat('#D9C9A3'), [0, .04, 6], w.park).castShadow = false;
  for (let i = 0; i < 3; i++) { box(4, .3, 1.2, mat('#8B5A2B'), [-14 + i * 14, 1.6, 9], w.park); for (const x of [-1.6, 1.6]) box(.3, 1.6, .3, mat('#5A3A1E'), [-14 + i * 14 + x, .8, 9], w.park); }
  w.t1 = tree(k, k.scene); w.tree = w.t1.root;
  w.holes = group();
  for (let i = 0; i < 4; i++) { const h = cyl(1.4, 1.4, .06, mat('#5A3A1E', { rough: 1 }), [-14 + i * 4, .06, -2], w.holes, 20); h.castShadow = false; }
  // pool party
  w.pool = group([60, 0, 0]);
  box(14, .6, 9, mat('#E8E8E8'), [0, .3, 0], w.pool);
  w.water = box(12.6, .1, 7.6, mat('#5BC0EB', { metal: .3, rough: .05, opacity: .85 }), [0, .62, 0], w.pool); w.water.castShadow = false;
  w.t2 = tree(k, w.pool, .8); w.t2.root.position.set(-2, -1.4, 0);
  w.t3 = tree(k, w.pool, .7); w.t3.root.position.set(3, -1.2, 1);
  w.ring = k.torus(1.4, .45, mat('#E2453C'), [3, .9, 1], w.pool);
  // the treehouse leaves
  w.th = tree(k, k.scene, 1.1); w.thtree = w.th.root;
  w.house = group([0, 8.4, 0], w.th.body);
  box(4, 3, 3.4, mat('#B07A4A'), [0, 0, 1.4], w.house);
  const roof = cone(3.2, 1.8, mat('#8B3A2E'), [0, 2.4, 1.4], w.house, 4); roof.rotation.y = Math.PI / 4;
  box(1.2, 1.2, .1, mat('#9ED2F3'), [0, .2, 3.15], w.house);
  w.suitcase = box(1.4, 1, .5, mat('#2F6FD6'), [1.6, 2.4, .8], w.th.body);
  // the dog
  w.dog = group([0, 0, 0]);
  const fur = mat('#C98B4E', { rough: .9 });
  const db = box(2.6, 1.3, 1.2, fur, [0, 1.6, 0], w.dog);
  w.dhead = group([1.6, 2.5, 0], w.dog); ball(.75, fur, [0, 0, 0], w.dhead); ball(.4, mat('#E0B07A'), [.6, -.2, 0], w.dhead); ball(.14, mat('#111111'), [1, -.1, 0], w.dhead);
  for (const z of [-.3, .3]) ball(.1, mat('#111111'), [.55, .25, z], w.dhead);
  for (const z of [-.6, .6]) box(.2, .8, .4, mat('#7A4E2A'), [-.1, -.3, z], w.dhead);
  for (const [x, z] of [[-1, -.4], [1, -.4], [-1, .4], [1, .4]]) cyl(.18, .18, 1, fur, [x, .5, z], w.dog, 8);
  w.dq = group([1.6, 4.2, 0], w.dog);
  box(.3, 1, .1, mat('#FFD21F', { glow: 1 }), [0, .3, 0], w.dq); ball(.2, mat('#FFD21F', { glow: 1 }), [0, -.45, 0], w.dq);
  // the raked yard
  w.yard = group([-60, 0, 0]);
  box(16, .05, 12, mat('#6FA35A'), [0, .04, 0], w.yard).castShadow = false;
  w.pile = group([4, 0, 3], w.yard);
  for (let i = 0; i < 30; i++) { const l = box(.6, .06, .4, mat(['#E2453C', '#FF8A1F', '#FFD21F'][i % 3]), [((i * 37) % 30) / 15 - 1, .1 + (i % 5) * .15, ((i * 23) % 20) / 10 - 1], w.pile); l.rotation.y = i; l.castShadow = false; }
  w.falling = group();
  for (let i = 0; i < 40; i++) { const l = box(.6, .06, .4, mat(['#E2453C', '#FF8A1F', '#FFD21F'][i % 3]), [0, 0, 0], w.falling); l.userData = { x: -66 + (i * 37) % 14, z: -4 + (i * 13) % 10, ph: (i * .17) % 1 }; l.castShadow = false; }
  w.you = group([-55, 0, 4]);
  cyl(.9, 1, 3.4, mat('#E2453C'), [0, 1.7, 0], w.you, 18); ball(.95, mat('#F2C9A0'), [0, 4.2, 0], w.you);
  w.yeyes = [-.33, .33].map(x => ball(.13, mat('#111111'), [x, 4.4, .85], w.you));
  const rake = group([1.2, 2, .3], w.you); cyl(.08, .08, 5, mat('#8B5A2B'), [0, .5, 0], rake, 8); box(1.4, .15, .3, mat('#5A6070'), [0, -2, 0], rake);
  return w;
}

const PARK = ['ground', 'park', 'tree'];

export default {
  id: '075',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WALKING TREES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF TREES', 'COULD WALK?'],
  title: 'What would happen if trees could walk?',
  description: 'They hog the pool. They take the treehouse on holiday. And they know exactly where you raked. (Made-up walking trees.)',
  tags: ['whatif', 'funny', 'trees', 'nature', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: walking trees are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if trees could walk?',
      show: [...PARK, 'holes'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 25,
      cam: { pos: [10, 3, 26], look: [0, 9, 0], fov: 50, to: { pos: [9, 3, 23], look: [0, 9, 0], fov: 48 } },
      update: (w, p, t) => { w.tree.position.set(-3 + t * 2, 0, 0); w.tree.rotation.y = .9; waddle(w.t1, t); },
    },
    {
      say: 'Hot day? They hog the pool.',
      show: ['ground', 'pool'], sky: '#8EC9F0', lightAt: [60, 3, 0], lightDist: 22,
      cam: { pos: [70, 9, 18], look: [60, 4, 0], fov: 50, to: { pos: [68.5, 9, 16], look: [60, 4, 0], fov: 48 } },
      update: (w, p, t) => { waddle(w.t2, t, 2); waddle(w.t3, t + 1, 2); w.t2.body.rotation.z = .25 + .05 * Math.sin(t * 2); w.ring.position.y = .9 + .1 * Math.sin(t * 3); },
    },
    {
      say: 'Your treehouse? Gone on holiday.',
      show: ['ground', 'park', 'thtree'], sky: '#BFE6FF', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [14, 5, 30], look: [2, 10, 0], fov: 50, to: { pos: [13, 5, 27], look: [3, 10, 0], fov: 48 } },
      update: (w, p, t) => { w.th.root.position.set(-4 + t * 3, 0, 0); w.th.root.rotation.y = Math.PI / 2; waddle(w.th, t, 5); },
    },
    {
      say: 'Dogs are deeply confused.',
      show: [...PARK, 'dog'], sky: '#9ED2F3', lightAt: [2, 4, 4], lightDist: 22,
      cam: { pos: [6, 4, 24], look: [-2.5, 5, 2], fov: 54, to: { pos: [5.5, 4, 22], look: [-2.5, 5, 2], fov: 52 } },
      update: (w, p, t) => {
        w.tree.position.set(-1 + t * 1.5, 0, 0); w.tree.rotation.y = .9; waddle(w.t1, t);
        w.dog.position.set(-6, 0, 4); w.dog.rotation.y = .3; w.dhead.rotation.z = .3 * Math.sin(t * 3); w.dq.position.y = 4.2 + .2 * Math.sin(t * 6);
      },
    },
    {
      say: 'And in autumn, they shake leaves onto your yard. On purpose.',
      show: ['ground', 'yard', 'tree', 'falling', 'you'], sky: '#FFD9A8', lightAt: [-60, 5, 0], lightDist: 22,
      cam: { pos: [-50, 6, 22], look: [-60, 6, 0], fov: 50, to: { pos: [-51, 6, 19], look: [-60, 6, 0], fov: 48 } },
      update: (w, p, t) => {
        w.tree.position.set(-63, 0, -2); w.tree.rotation.y = .4; waddle(w.t1, t, 3, true); w.t1.body.rotation.z = .2 * Math.sin(t * 14); w.t1.mouth.scale.x = 1.8;
        w.falling.children.forEach(l => { const u = l.userData, f = (t * .5 + u.ph) % 1; l.position.set(u.x + Math.sin(f * 9) * .8, 10 - f * 10, u.z); l.rotation.set(f * 6, u.ph * 9, f * 4); });
        w.yeyes.forEach(e => e.scale.setScalar(1.6));
      },
    },
    {
      say: 'Walking trees: cool, creepy, or annoying? Comment below.',
      quiz: { q: 'Walking trees would be...', options: ['Cool', 'Creepy', 'Annoying'], answer: 'They are made-up trees, but the leaves part is definitely annoying.' },
      show: PARK, sky: '#274B73', lightAt: [0, 5, 0], lightDist: 25,
      cam: { pos: [14, 2, 24], look: [0, 15, 0], fov: 46, to: { pos: [-12, 2, 24], look: [0, 15, 0] } },
      update: (w, p, t) => { w.tree.position.set(0, 0, 0); w.tree.rotation.y = .3; waddle(w.t1, t); },
    },
  ],
};

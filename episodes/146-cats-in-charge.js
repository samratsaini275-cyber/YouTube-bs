// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082. A made-up comedy sketch: cats are not in charge (officially).
// Hook: the premise as a question under 2 s; first frame shows a crowned cat on a throne.

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
  w.ground = k.ground('#C7A982', 0);
  w.room = group();
  box(40, 20, .5, mat('#E8D5F2'), [0, 10, -4], w.room);
  w.throne = group([0, 0, -.6]); box(2.4, 1.6, 2, mat('#B3262E'), [0, .8, 0], w.throne); box(2.4, 3.6, .4, mat('#B3262E'), [0, 2.4, -.8], w.throne); box(2.6, .2, 2.2, mat('#FFD21F'), [0, 1.65, 0], w.throne);
  w.c = cat(k, k.scene); w.ct = w.c.root;
  w.bed = group([0, 0, 0]); box(4, .8, 2.4, mat('#5B6FD6'), [0, .6, 0], w.bed); box(1, .4, 2, mat('#FFFFFF'), [-1.4, 1.2, 0], w.bed);
  w.sleeper = ball(.6, mat('#F2C9A0'), [-1.3, 1.6, 0], w.bed);
  for (const z of [-.2, .2]) box(.15, .04, .05, mat('#111111'), [-1.3 + .25, 1.75, z + .0], w.bed);
  w.clock = group([0, 0, 0]); const cc = cyl(.45, .45, .25, mat('#E2453C'), [0, 0, 0], w.clock, 16); cc.rotation.x = Math.PI / 2;
  cyl(.38, .38, .27, mat('#FFFFFF'), [0, 0, .01], w.clock, 16).rotation.x = Math.PI / 2; for (const x of [-.3, .3]) ball(.13, mat('#FFD21F'), [x, .45, 0], w.clock);
  w.table = group([0, 0, 0]); box(2.4, .2, 1.6, mat('#8B5A2B'), [0, 1.6, 0], w.table); for (const x of [-1, 1]) box(.15, 1.6, .15, mat('#6B4B2E'), [x, .8, 0], w.table);
  w.cup = group([0, 0, 0]); cyl(.22, .18, .45, mat('#3B82F6'), [0, .22, 0], w.cup, 12);
  w.vase = group([0, 0, 0]); cyl(.2, .3, .7, mat('#22C55E'), [0, .35, 0], w.vase, 12);
  w.box = group([0, 0, 0]); const cb = mat('#C79A5B'); box(2, .1, 1.6, cb, [0, .05, 0], w.box);
  for (const [x, z, sx, sz] of [[0, .8, 2, .1], [0, -.8, 2, .1], [1, 0, .1, 1.6], [-1, 0, .1, 1.6]]) box(sx, 1, sz, cb, [x, .5, z], w.box);
  w.gold = group([0, 0, 0]);
  for (let i = 0; i < 14; i++) { const g = cyl(.25, .25, .08, mat('#FFD21F', { glow: .5 }), [Math.cos(i * 2.4) * (.3 + i * .05), .04 + (i % 4) * .08, Math.sin(i * 2.4) * (.3 + i * .05)], w.gold, 12); }
  w.dog = group([0, 0, 0]); const br = mat('#8B5A3C');
  const db = ball(.7, br, [0, 1.0, 0], w.dog); db.scale.set(1.5, .8, .9); ball(.5, br, [-1.05, 1.6, 0], w.dog); box(.45, .3, .4, br, [-1.5, 1.45, 0], w.dog);
  for (const z of [-.2, .2]) ball(.08, mat('#111111'), [-1.4, 1.75, z], w.dog);
  for (const x of [-.7, .7]) for (const z of [-.3, .3]) cyl(.13, .13, .7, br, [x, .35, z], w.dog, 8);
  w.tray = group([-1.6, 1.95, 0], w.dog); box(.9, .06, .6, mat('#C0C6CC', { metal: .6 }), [0, 0, 0], w.tray); ball(.15, mat('#F97316'), [.1, .15, 0], w.tray);
  box(.25, .05, .1, mat('#111111'), [-1.5, 2.15, 0], w.dog);
  return w;
}

const pose = (w, x, y, z, ry) => { w.ct.position.set(x, y, z); w.ct.rotation.set(0, ry, 0); w.c.head.rotation.set(0, 0, 0); };
const wag = (w, t) => { w.c.tail.rotation.x = .4 * Math.sin(t * 3); };

export default {
  id: '146',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT IN CHARGE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WERE IN CHARGE?'],
  title: 'What would happen if cats were in charge?',
  description: 'Breakfast at 4 a.m. Knocking things off tables becomes the law. And the dog gets a new job. (A made-up cat government.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: cats in charge is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cats were in charge?',
      show: ['ground', 'room', 'throne', 'ct'], sky: '#E8D5F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.3, 2.4, 9], look: [0, 3.55, 0], fov: 46, to: { pos: [.3, 2.4, 8.2], look: [0, 3.5, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -.2, 1.75, -.4, -1.25); wag(w, t); w.c.crown.visible = true; w.c.head.rotation.z = .08 * Math.sin(t * 2); },
    },
    {
      say: 'Breakfast? Served at four in the morning.',
      show: ['ground', 'room', 'bed', 'ct', 'clock'], sky: '#1E2547', lightAt: [0, 4, 3], lightDist: 10,
      cam: { pos: [.4, 3.8, 9.5], look: [0, 1.8, 0], fov: 48, to: { pos: [.4, 3.7, 8.8], look: [0, 1.8, 0], fov: 46 } },
      shake: (t) => .015,
      update: (w, p, t) => {
        pose(w, -.6, 1.15, .1, -1.6); wag(w, t); w.c.crown.visible = false; w.c.head.rotation.z = .1 * Math.sin(t * 9);
        w.clock.position.set(1.6, 1.6 + .05 * Math.sin(t * 40), .6); w.clock.rotation.z = .15 * Math.sin(t * 40); w.sleeper.position.y = 1.6 + .08 * Math.abs(Math.sin(t * 3));
      },
    },
    {
      say: 'Anything on a table? Knocked off. It is the law.',
      show: ['ground', 'room', 'table', 'ct', 'cup', 'vase'], sky: '#E8D5F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, 2.8, 7.5], look: [0, 1.7, 0], fov: 46, to: { pos: [.4, 2.7, 6.8], look: [0, 1.6, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -.3, 1.7, -.2, -1.3); wag(w, t); w.c.crown.visible = true;
        const fall = (t0) => { const q = Math.max(0, t - t0); return { x: q * 1.2, y: Math.max(0, 1.7 - 4.9 * q * q), r: Math.min(1.6, q * 4) }; };
        const a = fall(.8), b = fall(1.8);
        w.cup.position.set(.6 + a.x, a.y, .3); w.cup.rotation.z = -a.r; w.vase.position.set(.9 + b.x, b.y, -.3); w.vase.rotation.z = -b.r;
        w.c.head.rotation.y = -.3 * Math.sin(t * 3);
      },
    },
    {
      say: 'Gold? Worthless. Cardboard boxes are the new money.',
      show: ['ground', 'room', 'box', 'gold', 'ct'], sky: '#E8D5F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, 3.4, 7.5], look: [0, 1.2, 0], fov: 46, to: { pos: [.5, 3.3, 6.8], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.box.position.set(.6, 0, 0); w.gold.position.set(-1.6, 0, .4); pose(w, .5, .45, 0, -1.3); wag(w, t); w.c.crown.visible = true; w.c.head.rotation.z = .1 * Math.sin(t * 2);
        w.ct.scale.setScalar(.95);
      },
    },
    {
      say: 'And the dog? He is the cat’s assistant now.',
      show: ['ground', 'room', 'throne', 'ct', 'dog'], sky: '#E8D5F2', lightAt: [0, 5, 4], lightDist: 13,
      cam: { pos: [1.5, 2.8, 9.5], look: [.6, 2.4, 0], fov: 48, to: { pos: [1.4, 2.7, 8.7], look: [.6, 2.3, 0], fov: 46 } },
      update: (w, p, t) => {
        w.ct.scale.setScalar(1); pose(w, -.2, 1.75, -.4, -1.25); wag(w, t); w.c.crown.visible = true;
        w.dog.position.set(4 - Math.min(1, t / 1.5) * 1.6, .05 * Math.abs(Math.sin(t * 8)), .6); w.dog.rotation.y = 0;
      },
    },
    {
      say: 'Cats in charge: great, already true, or awful? Comment below.',
      quiz: { q: 'Should cats be in charge?', options: ['Great idea', 'Already true', 'Awful'], answer: 'This is a made-up cat government. Probably.' },
      show: ['ground', 'room', 'throne', 'ct'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.3, 1.2, 8], look: [0, 4.2, 0], fov: 46, to: { pos: [-1.2, 1.2, 8], look: [0, 4.2, 0] } },
      update: (w, p, t) => { pose(w, -.2, 1.75, -.4, -1.25); wag(w, t); w.c.crown.visible = true; },
    },
  ],
};

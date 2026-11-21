// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; animal body-change premise like 076 (humans had tails, ~1.1K views).
// A made-up comedy sketch: fish cannot walk. Hook: the premise as a question under 2 s; first frame shows a goldfish walking on legs.

function fish(k, parent, col, s = 1) {
  const f = k.group([0, 0, 0], parent);
  const b = k.ball(.5 * s, k.mat(col), [0, 0, 0], f); b.scale.set(1.6, 1, .6);
  const t = k.cone(.35 * s, .5 * s, k.mat(col), [-.95 * s, 0, 0], f, 4); t.rotation.z = Math.PI / 2;
  for (const z of [-.22, .22]) { k.ball(.12 * s, k.mat('#FFFFFF'), [.45 * s, .12 * s, z * s], f); k.ball(.06 * s, k.mat('#111111'), [.52 * s, .12 * s, z * 1.15 * s], f); }
  f.userData.tail = t; return f;
}

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

function walker(k, parent, col, s = 1) {
  const f = fish(k, parent, col, s);
  f.userData.legs = [-1, 1].map(z => { const l = k.group([0, -.35 * s, z * .18 * s], f); k.cyl(.06 * s, .06 * s, .55 * s, k.mat('#E8A050'), [0, -.27 * s, 0], l, 6); k.box(.22 * s, .06 * s, .14 * s, k.mat('#E8A050'), [.06 * s, -.55 * s, 0], l); return l; });
  return f;
}
const step = (f, t, sp = 10) => { f.userData.legs.forEach((l, i) => { l.rotation.z = .6 * Math.sin(t * sp + i * Math.PI); }); f.userData.tail.rotation.y = .4 * Math.sin(t * 8); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B08A', 0);
  w.room = group(); box(40, 20, .5, mat('#CDE7F0'), [0, 10, -4], w.room);
  w.table = group([0, 0, 0]); box(3, .2, 2, mat('#8B5A2B'), [0, 1.8, 0], w.table); for (const x of [-1.3, 1.3]) box(.15, 1.8, .15, mat('#6B4B2E'), [x, .9, 0], w.table);
  w.bowl = group([0, 0, 0]); const gl = ball(.9, mat('#BFE6F5', { rough: .05 }), [0, .7, 0], w.bowl); gl.material.transparent = true; gl.material.opacity = .35; gl.scale.set(1, .8, 1);
  w.f = walker(k, k.scene, '#FF8A1F', 1.3);
  w.lake = group(); box(40, .05, 12, mat('#3E8FC4', { rough: .2 }), [0, .02, -8], w.lake).castShadow = false;
  w.dock = group([0, 0, 0]); box(4, .3, 2, mat('#8B5A2B'), [0, .5, 0], w.dock);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.rod = cyl(.03, .03, 3, mat('#333333'), [0, 0, 0], k.scene, 6);
  w.pack = group(); for (let i = 0; i < 4; i++) { const g = walker(k, w.pack, ['#3B82F6', '#EC4899', '#22C55E', '#FFD21F'][i], 1); g.userData.i = i; }
  w.pool = group(); box(10, .05, 6, mat('#5DB8F5', { rough: .1 }), [0, .03, -1], w.pool).castShadow = false; box(10.4, .2, .3, mat('#FFFFFF'), [0, .1, 2.1], w.pool);
  w.whistle = group([0, 0, 0]); box(.25, .12, .12, mat('#C0C6CC', { metal: .6 }), [0, 0, 0], w.whistle);
  w.kids = group(); for (let i = 0; i < 2; i++) { const g = group([-1.5 + i * 3, 0, -1.5], w.kids); ball(.55, mat('#F2C9A0'), [0, .5, 0], g); for (const x of [-.4, .4]) cyl(.12, .12, .9, mat('#F2C9A0'), [x, .7, 0], g, 6).rotation.z = x * 2; g.userData.i = i; }
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false;
  return w;
}

export default {
  id: '162',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WALKING FISH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FISH', 'COULD WALK?'],
  title: 'What would happen if fish could walk?',
  description: 'The fish tank is just a suggestion. Fishing goes the other way. Swimming lessons get new teachers. And the cat is finally scared. (A made-up walking fish.)',
  tags: ['whatif', 'funny', 'fish', 'goldfish', 'animals', 'shorts'],
  sources: [
    'Comedy sketch: walking goldfish are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if fish could walk?',
      show: ['ground', 'room', 'table', 'f'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.4, 2.8, 8.5], look: [0, 3.25, 0], fov: 44, to: { pos: [.3, 2.8, 7.9], look: [0, 3.2, 0], fov: 42 } },
      update: (w, p, t) => { w.f.position.set(-.8 + t * .4, 2.68, .2); w.f.rotation.set(0, -.5, 0); step(w.f, t); },
    },
    {
      say: 'The fish tank? It just walks out.',
      show: ['ground', 'room', 'table', 'bowl', 'f'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.6, 3.2, 9.5], look: [.3, 2.7, 0], fov: 46, to: { pos: [.5, 3.1, 8.8], look: [.3, 2.7, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bowl.position.set(-.6, 1.9, 0); const q = Math.min(1, t / 1.4);
        w.f.position.set(-.6 + q * 1.6, 2.6 + Math.sin(q * Math.PI) * .7 + (q >= 1 ? 0 : 0), .2); w.f.rotation.set(0, -.3, 0); step(w.f, t, 14);
      },
    },
    {
      say: 'Fishing? Now the fish chase you.',
      show: ['ground', 'lake', 'dock', 'pp', 'rod', 'pack'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [0, 3.4, 11], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 3.4, 10.2], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => {
        const x = -3 + t * 2.4; w.pp.position.set(x + 2.4, .25 * Math.abs(Math.sin(t * 10)), 1); w.pp.rotation.set(0, Math.PI / 2, -.2); w.p.mouth.scale.y = 2.5;
        w.rod.position.set(x + 2.9, 2.6, 1.5); w.rod.rotation.set(0, 0, -1);
        w.pack.children.forEach(g => { const i = g.userData.i; g.position.set(x - .6 - i * .9, .9, .4 + (i % 2) * .8); g.rotation.set(0, 0, 0); step(g, t + i, 16); });
      },
    },
    {
      say: 'Swimming lessons? The fish teach them now.',
      show: ['ground', 'pool', 'f', 'whistle', 'kids'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 14,
      cam: { pos: [.6, 3.4, 9], look: [0, 1.4, 0], fov: 48, to: { pos: [.5, 3.3, 8.2], look: [0, 1.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.f.position.set(0, 1.0, 2.6); w.f.rotation.set(0, -Math.PI / 2 + .4 * Math.sin(t * 2), 0); step(w.f, t, 4);
        w.whistle.position.set(.9, 1.2, 3.4); w.whistle.rotation.z = .3;
        w.kids.children.forEach(g => { g.position.y = .1 * Math.sin(t * 6 + g.userData.i * 2); g.children.forEach((c, j) => { if (j) c.rotation.x = Math.sin(t * 8 + j) * .8; }); });
      },
    },
    {
      say: 'And the cat? Finally scared of something.',
      show: ['ground', 'room', 'f', 'ct'], sky: '#CDE7F0', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.4, 2.8, 10.5], look: [0, 2.0, 0], fov: 46, to: { pos: [.3, 2.7, 9.8], look: [0, 2.0, 0], fov: 44 } },
      update: (w, p, t) => {
        w.f.position.set(-1.6 + Math.min(1, t / 1.2) * .8, .95, .4); w.f.rotation.set(0, 0, 0); step(w.f, t, 10);
        const jump = t > 1.1; w.ct.position.set(1.4, jump ? Math.max(0, Math.sin((t - 1.1) * 3) * 2.2) : 0, .2); w.ct.rotation.set(0, -2.6, jump ? -.4 : 0); w.c.tail.rotation.x = jump ? 1.2 : .2;
      },
    },
    {
      say: 'Walking fish: cute, great, or a nightmare? Comment below.',
      quiz: { q: 'Walking fish would be…', options: ['Cute', 'Great', 'A nightmare'], answer: 'Walking goldfish are made up. Keep the lid on the tank anyway.' },
      show: ['ground', 'room', 'table', 'f'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.4, 1.6, 6], look: [0, 3.9, 0], fov: 46, to: { pos: [-.8, 1.6, 6], look: [0, 3.9, 0] } },
      update: (w, p, t) => { w.f.position.set(0, 2.68, .2); w.f.rotation.set(0, -.6, 0); step(w.f, t, 6); },
    },
  ],
};

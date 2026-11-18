// Narrative 7: "Animals at Work". A made-up comedy sketch: penguins are not waiters.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the penguin with a bow tie and a tray.

function penguin(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1A1A22', { rough: .4 }), [0, 1.6, 0], p.body); b.scale.set(.95, 1.5, .85);
  const belly = ball(.85, mat('#FFFFFF', { rough: .5 }), [0, 1.45, .3], p.body); belly.scale.set(.85, 1.35, .7);
  p.head = group([0, 3.2, 0], p.body);
  ball(.65, mat('#1A1A22', { rough: .4 }), [0, 0, 0], p.head);
  for (const x of [-.25, .25]) { ball(.15, mat('#FFFFFF'), [x, .1, .52], p.head); ball(.07, mat('#111111'), [x, .1, .64], p.head); }
  cone(.15, .5, mat('#FF8A1F'), [0, -.12, .75], p.head, 8).rotation.x = Math.PI / 2;
  for (const s of [-1, 1]) { const t = cone(.13, .25, mat('#E2453C'), [s * .14, 2.55, .72], p.body, 6); t.rotation.z = s * Math.PI / 2; }
  ball(.08, mat('#E2453C'), [0, 2.55, .74], p.body);
  p.flips = [-1, 1].map(s => { const g = group([s * .85, 2.3, 0], p.body); const f = box(.15, 1.4, .5, mat('#1A1A22'), [0, -.65, 0], g); g.rotation.z = s * .25; return g; });
  for (const x of [-.35, .35]) box(.45, .1, .6, mat('#FF8A1F'), [x, .05, .25], p.body);
  p.tray = group([1.4, 2.6, .3], p.body);
  cyl(.7, .7, .05, mat('#C0C0C8', { metal: .8 }), [0, 0, 0], p.tray, 20);
  const fish = group([0, .15, 0], p.tray); const fb = ball(.25, mat('#5BC0EB', { metal: .4 }), [0, 0, 0], fish); fb.scale.set(1.6, .7, .5); cone(.18, .3, mat('#5BC0EB'), [-.45, 0, 0], fish, 4).rotation.z = Math.PI / 2;
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8E2D6', 0);
  w.rest = group();
  box(80, 30, .5, mat('#7A2E3A'), [0, 15, -10], w.rest);
  for (let i = 0; i < 6; i++) { const lamp = ball(.6, mat('#FFE9A8', { glow: 2 }), [-15 + i * 6, 12, -9.4], w.rest); lamp.castShadow = false; }
  for (let i = 0; i < 20; i++) for (let j = 0; j < 8; j++) if ((i + j) % 2) box(3, .02, 3, mat('#2A2A2A'), [-30 + i * 3, .01, -8 + j * 3], w.rest).castShadow = false;
  w.tables = [];
  for (let i = 0; i < 3; i++) { const tb = group([-6 + i * 8, 0, -3], w.rest); cyl(2, 2, .2, mat('#FFFFFF'), [0, 3.4, 0], tb, 24); cyl(.25, .25, 3.4, mat('#5A3A1E'), [0, 1.7, 0], tb, 8); w.tables.push(tb); }
  w.p = penguin(k, k.scene); w.peng = w.p.root;
  w.sparkle = group();
  for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFFFFF', { glow: 3 }), [0, 0, 0], w.sparkle); s.userData.i = i; s.castShadow = false; }
  w.cake = group([0, 0, 0]);
  cyl(1.3, 1.3, .1, mat('#FFFFFF'), [0, 0, 0], w.cake, 24);
  cyl(.8, .8, .8, mat('#FFB3C7'), [0, .45, 0], w.cake, 20); cyl(.82, .82, .15, mat('#FFFFFF'), [0, .85, 0], w.cake, 20);
  const fish = group([0, 1.1, 0], w.cake); const fb = ball(.35, mat('#5BC0EB', { metal: .4 }), [0, 0, 0], fish); fb.scale.set(1.6, .7, .5); cone(.25, .4, mat('#5BC0EB'), [-.6, 0, 0], fish, 4).rotation.z = Math.PI / 2; fish.rotation.y = .4;
  w.diner = group([0, 0, 0]);
  cyl(.8, .9, 3, mat('#2F6FD6'), [0, 1.5, 0], w.diner, 14); ball(.85, mat('#F2C9A0'), [0, 3.7, 0], w.diner);
  w.deyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 3.85, .78], w.diner));
  return w;
}

export default {
  id: '108',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PENGUIN WAITER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS PENGUIN', 'BECAME A WAITER.'],
  title: 'This penguin became a waiter',
  description: 'He already owned the suit. He slides to every table. Every dish comes with a fish. (A made-up penguin and a made-up restaurant.)',
  tags: ['animalsatwork', 'funny', 'penguin', 'waiter', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the penguin waiter and his restaurant are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This penguin became a waiter.',
      show: ['ground', 'rest', 'peng'], sky: '#7A2E3A', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 2.4, 13.5], look: [.6, 6.3, 1], fov: 46, to: { pos: [1.8, 2.4, 12.5], look: [.6, 6.2, 1], fov: 44 } },
      update: (w, p, t) => { w.peng.position.set(0, 0, 2); w.peng.rotation.set(0, .1, 0); w.p.body.rotation.set(0, 0, .05 * Math.sin(t * 4)); w.p.tray.visible = true; },
    },
    {
      say: 'Good news: he already owns the suit.',
      show: ['ground', 'rest', 'peng', 'sparkle'], sky: '#7A2E3A', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [1.4, 3.6, 7], look: [0, 3.4, 2], fov: 42, to: { pos: [1.2, 3.5, 6.2], look: [0, 3.4, 2], fov: 40 } },
      update: (w, p, t) => {
        w.peng.position.set(0, 0, 2); w.peng.rotation.set(0, -.1, 0); w.p.body.rotation.set(0, 0, 0); w.p.tray.visible = true;
        w.sparkle.children.forEach(s => { const f = (t * 1.2 + s.userData.i / 5) % 1; s.position.set(-1 + s.userData.i * .5, 2.4 + f * 1.4, 2.9); s.scale.setScalar(Math.sin(f * Math.PI) * .6 + .01); });
      },
    },
    {
      say: 'Bad news: he slides to every table. On his belly.',
      show: ['ground', 'rest', 'peng'], sky: '#7A2E3A', lightAt: [2, 4, 0], lightDist: 20,
      cam: { pos: [-2, 6, 15], look: [-2, 2, 0], fov: 54, to: { pos: [5, 6, 14], look: [5, 2, 0], fov: 52 } },
      update: (w, p, t) => {
        const x = -6 + t * 3.2; w.peng.position.set(x, .9, 1); w.peng.rotation.set(0, Math.PI / 2, 0); w.p.body.rotation.set(Math.PI / 2 - .05, 0, 0); w.p.tray.visible = true;
        w.p.flips.forEach((g, i) => { g.rotation.z = (i ? -1 : 1) * 1.3; });
      },
    },
    {
      say: 'And every dish comes with a fish. Even the cake.',
      show: ['ground', 'rest', 'cake', 'diner'], sky: '#7A2E3A', lightAt: [2, 4, -3], lightDist: 12,
      cam: { pos: [2, 6, 3], look: [2, 3.8, -3], fov: 46, to: { pos: [2, 5.8, 2.2], look: [2, 3.7, -3], fov: 44 } },
      update: (w, p, t) => { w.cake.position.set(2, 3.5, -2.8); w.diner.position.set(2, 1.3, -6.2); w.diner.rotation.y = 0; w.deyes.forEach(e => e.scale.setScalar(t > .9 ? 1.7 : 1)); },
    },
    {
      say: 'Tip the penguin: yes, no, or only in fish? Comment below.',
      quiz: { q: 'Would you tip the penguin waiter?', options: ['Yes', 'No', 'Only in fish'], answer: 'He is a made-up waiter. Fish is the house currency.' },
      show: ['ground', 'rest', 'peng'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 1.4, 10.5], look: [.3, 5.8, 0], fov: 46, to: { pos: [-2, 1.4, 10.5], look: [.3, 5.8, 0] } },
      update: (w, p, t) => { w.p.flips.forEach((g, i) => { g.rotation.z = (i ? 1 : -1) * .25; }); w.peng.position.set(0, 0, 2); w.peng.rotation.set(0, .1, 0); w.p.body.rotation.set(0, 0, .05 * Math.sin(t * 4)); w.p.tray.visible = true; },
    },
  ],
};

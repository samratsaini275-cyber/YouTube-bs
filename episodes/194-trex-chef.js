// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K) + a job.
// Hook: the premise as a question under 2 s; first frame shows a T-rex in a white chef's hat behind a giant cooking pot.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#D9D2C3', 0);
  w.wall = box(80, 40, .5, mat('#EAF2F5'), [0, 20, -10]); w.wall.castShadow = false;
  w.tiles = group(); for (let i = 0; i < 20; i++) for (let j = 0; j < 4; j++) box(3.6, 3.6, .1, mat((i + j) % 2 ? '#FFFFFF' : '#CFE3F2'), [-36 + i * 4, 2 + j * 4, -9.7], w.tiles);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.hat = group([.5, 1.4, 0], w.r.head); cyl(1, 1, 1.6, mat('#FFFFFF'), [0, .8, 0], w.hat, 16); ball(1.3, mat('#FFFFFF'), [0, 2, 0], w.hat).scale.set(1, .6, 1);
  w.stove = group(); box(8, 4, 5, mat('#9AA5B1'), [0, 2, 0], w.stove); box(8.2, .2, 5.2, mat('#333333'), [0, 4.1, 0], w.stove);
  w.pot = group(); cyl(1.8, 1.6, 2.4, mat('#555E66', { rough: .3 }), [0, 1.2, 0], w.pot, 24); cyl(1.7, 1.7, .1, mat('#E2853A', { glow: .2 }), [0, 2.3, 0], w.pot, 24);
  w.steam = group(); for (let i = 0; i < 6; i++) { const s = ball(.5, mat('#FFFFFF'), [0, 0, 0], w.steam); s.userData.i = i; s.castShadow = false; s.material.transparent = true; s.material.opacity = .7; }
  w.board = group(); box(5, .3, 3, mat('#C79A5B'), [0, 0, 0], w.board); for (let i = 0; i < 4; i++) ball(.4, mat(['#E2453C', '#22C55E', '#F97316', '#FFD21F'][i]), [-1.6 + i * 1.05, .4, 0], w.board);
  w.knife = box(.15, .1, 2.4, mat('#C9CED6', { rough: .2 }), [0, 0, 0]);
  w.pizza = group(); const pz = cyl(5, 5, .3, mat('#F2B85B'), [0, 0, 0], w.pizza, 32); cyl(4.5, 4.5, .32, mat('#D9502B'), [0, .02, 0], w.pizza, 32); for (let i = 0; i < 10; i++) cyl(.5, .5, .36, mat('#9C2A1A'), [Math.cos(i * 2.4) * (1 + (i % 3) * 1.1), .04, Math.sin(i * 2.4) * (1 + (i % 3) * 1.1)], w.pizza, 12);
  return w;
}

const pose = (w, x, z, ry, t) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };
const steam = (w, x, y, z, t, s = 1) => w.steam.children.forEach(st => { const i = st.userData.i, q = (t * .7 + i / 6) % 1; st.position.set(x + .6 * Math.sin(i * 2 + t), y + q * 4 * s, z + .4 * Math.cos(i)); st.scale.setScalar((.5 + q) * s); });

export default {
  id: '194',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'T-REX CHEF',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'WAS A CHEF?'],
  title: 'What would happen if a T-rex was a chef?',
  description: 'Chopping is impossible with tiny arms. The taste test eats the whole pot. And the pizza is the size of a swimming pool. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'chef', 'funny', 'shorts'],
  sources: [
    'Quiz fact: Tyrannosaurus rex was a meat-eater (general palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex was a chef?',
      show: ['floor', 'wall', 'tiles', 'dino', 'stove', 'pot', 'steam'], sky: '#EAF2F5', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [10, 8, 32], look: [1, 12.6, 0], fov: 46, to: { pos: [9.5, 8, 30], look: [1, 12.6, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -4, -3, -.25, t); w.r.neck.rotation.z = -.2; w.pot.visible = true; w.stove.position.set(4, 0, 1); w.pot.position.set(4, 4.2, 1); steam(w, 4, 7, 1, t); },
    },
    {
      say: 'Chopping? Those tiny arms cannot reach.',
      show: ['floor', 'wall', 'tiles', 'dino', 'stove', 'board', 'knife'], sky: '#EAF2F5', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [8, 9, 26], look: [1, 9.6, 0], fov: 46, to: { pos: [7.5, 9, 24.5], look: [1, 9.6, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -3.5, -1, -.2, t); w.r.neck.rotation.z = -.35; w.r.arms.forEach(a => a.rotation.z = -.5 - .4 * Math.abs(Math.sin(t * 6))); w.stove.position.set(4.5, 0, 0); w.board.position.set(4.5, 4.35, 0);
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.arms[1].localToWorld(v.set(1.1, -.8, 0)); w.knife.position.copy(v); w.knife.rotation.set(0, .5, .3 * Math.sin(t * 6));
      },
    },
    {
      say: 'The taste test? Eats the whole pot.',
      show: ['floor', 'wall', 'tiles', 'dino', 'stove', 'pot', 'steam'], sky: '#EAF2F5', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [10, 8, 28], look: [1, 9.5, 0], fov: 46, to: { pos: [9.5, 8, 26.5], look: [1, 9.5, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -3, -1, -.15, t); w.stove.position.set(4.5, 0, 0); const q = Math.min(1, t / 1.2);
        w.r.body.rotation.z = -.35 * Math.sin(q * Math.PI); w.r.neck.rotation.z = -.8 * Math.sin(q * Math.PI); w.r.jaw.rotation.z = -.7 * Math.sin(q * Math.PI);
        w.pot.visible = t < 1.1; w.pot.position.set(4.5, 4.2, 0); steam(w, 4.5, 7, 0, t, t < 1.1 ? 1 : .01);
      },
    },
    {
      say: 'Pizza night? The size of a pool.',
      show: ['floor', 'wall', 'tiles', 'dino', 'pizza'], sky: '#EAF2F5', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [8, 16, 26], look: [1, 6, 0], fov: 50, to: { pos: [7.5, 15, 24.5], look: [1, 6, 0], fov: 48 } },
      update: (w, p, t) => { pose(w, -5, -4, -.3, t); w.r.neck.rotation.z = -.4; w.r.jaw.rotation.z = -.3 - .1 * Math.sin(t * 4); w.pizza.position.set(3, .2, 3); w.pizza.rotation.y = t * .3; },
    },
    {
      say: 'A T-rex chef: delicious, chaotic, or dangerous? Comment below.',
      quiz: { q: 'Would you eat at a T-rex restaurant?', options: ['Delicious', 'Chaotic', 'Dangerous'], answer: 'Real T-rex was a meat-eater. The salad menu would be very short.' },
      show: ['floor', 'wall', 'tiles', 'dino', 'stove', 'pot'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [14, 8, 26], look: [0, 11, 0], fov: 46, to: { pos: [-10, 8, 28], look: [0, 11, 0] } },
      update: (w, p, t) => { pose(w, -1, -2, -.3, t); w.pot.visible = true; w.stove.position.set(5, 0, 1); w.pot.position.set(5, 4.2, 1); },
    },
  ],
};

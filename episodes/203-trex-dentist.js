// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K) + everyday errand.
// Hook: the premise as a question under 2 s; first frame shows a T-rex in a dentist's chair with its jaws wide open and a tiny dentist on a ladder.

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
  w.floor = k.ground('#E6EEF2', 0);
  w.wall = box(80, 40, .5, mat('#D9EEF5'), [0, 20, -10]); w.wall.castShadow = false;
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.chair = group(); box(10, 2, 6, mat('#3B9EC8'), [0, 1, 0], w.chair); box(2, 8, 6, mat('#3B9EC8'), [-5, 5, 0], w.chair);
  w.lamp = group(); cyl(.2, .2, 14, mat('#9AA5B1'), [0, 7, 0], w.lamp, 8); const lh = cyl(1.4, .6, 1, mat('#FFFFFF', { glow: .8 }), [1.5, 14, 0], w.lamp, 16); lh.rotation.z = .8;
  w.doc = person(k, k.scene, '#FFFFFF'); w.dp = w.doc.root; w.dp.scale.setScalar(.9); cyl(.5, .5, .4, mat('#9FD3EE'), [0, 4.1, 0], w.dp, 12);
  w.ladder = group(); for (const x of [-.6, .6]) box(.15, 10, .15, mat('#C79A5B'), [x, 5, 0], w.ladder); for (let i = 0; i < 10; i++) box(1.2, .12, .12, mat('#C79A5B'), [0, .6 + i, 0], w.ladder);
  w.rope = cyl(.18, .18, 1, mat('#FFFFFF'), [0, 0, 0], k.scene, 6); w.rope.castShadow = false;
  w.brush = group(); cyl(.15, .15, 3, mat('#3B82F6'), [0, 0, 0], w.brush, 8).rotation.z = Math.PI / 2; box(.6, .4, .4, mat('#FFFFFF'), [1.6, .2, 0], w.brush);
  w.sparkle = group(); for (let i = 0; i < 6; i++) { const s = ball(.2, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], w.sparkle); s.userData.i = i; s.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.dino.position.set(x, y, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); };

export default {
  id: '203',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'T-REX AT THE DENTIST',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'HAD A DENTIST?'],
  title: 'What would happen if a T-rex had a dentist?',
  description: '"Open wide" means very, very wide. Flossing needs a rope. Brushing takes all day. And that smile? Blinding. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'dentist', 'funny', 'shorts'],
  sources: [
    'Quiz fact: T. rex, like other theropods, kept growing replacement teeth throughout its life (general palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex had a dentist?',
      show: ['floor', 'wall', 'dino', 'chair', 'lamp', 'dp', 'ladder'], sky: '#D9EEF5', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [12, 8, 32], look: [2, 12.6, 0], fov: 46, to: { pos: [11, 8, 30], look: [2, 12.6, 0], fov: 44 } },
      update: (w, p, t) => { w.chair.position.set(-2, 0, 0); w.lamp.position.set(8, 0, -4); pose(w, -2, 2, 0, -.2, t); w.r.jaw.rotation.z = -.6; w.ladder.position.set(9, 0, 2); w.dp.position.set(9, 8.2, 2.6); w.dp.rotation.set(0, -1.2, 0); },
    },
    {
      say: 'Open wide? Very, very wide.',
      show: ['floor', 'wall', 'dino', 'chair', 'dp', 'ladder'], sky: '#D9EEF5', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [7.5, 10, 26], look: [5.5, 11.8, 0], fov: 46, to: { pos: [7.5, 10, 24.5], look: [5.5, 11.8, 0], fov: 44 } },
      update: (w, p, t) => { w.chair.position.set(-2, 0, 0); pose(w, -2, 2, 0, -.2, t); w.r.jaw.rotation.z = -.3 - .4 * Math.min(1, t); w.ladder.position.set(9, 0, 2); w.dp.position.set(9, 8.2, 2.6); w.dp.rotation.set(0, -1.2, 0); w.doc.mouth.scale.y = 2.4; },
    },
    {
      say: 'Flossing? You need a rope.',
      show: ['floor', 'wall', 'dino', 'chair', 'dp', 'ladder', 'rope'], sky: '#D9EEF5', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [7.5, 10, 26], look: [5.5, 11.8, 0], fov: 46, to: { pos: [7.5, 10, 24.5], look: [5.5, 11.8, 0], fov: 44 } },
      update: (w, p, t) => {
        w.chair.position.set(-2, 0, 0); pose(w, -2, 2, 0, -.2, t); w.r.jaw.rotation.z = -.7; w.ladder.position.set(9, 0, 2); w.dp.position.set(9, 8.2, 2.6); w.dp.rotation.set(0, -1.2, 0);
        w.dino.updateMatrixWorld(true); const A = new w.dino.position.constructor(), B = A.clone(); w.r.head.localToWorld(A.set(1.6, -.6, 1)); B.set(8.6, 10.4, 2.8); A.y += .3 * Math.sin(t * 8);
        w.rope.position.copy(A).add(B).multiplyScalar(.5); w.rope.scale.y = A.distanceTo(B); w.rope.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize());
      },
    },
    {
      say: 'Brushing? It takes all day.',
      show: ['floor', 'wall', 'dino', 'chair', 'brush'], sky: '#F7C99A', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [7.5, 10, 26], look: [5.5, 11.8, 0], fov: 46, to: { pos: [7.5, 10, 24.5], look: [5.5, 11.8, 0], fov: 44 } },
      update: (w, p, t) => { w.chair.position.set(-2, 0, 0); pose(w, -2, 2, 0, -.2, t); w.r.jaw.rotation.z = -.6; w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(1.2, -.5, 1.3)); w.brush.position.set(v.x + .5 * Math.sin(t * 10), v.y, v.z); w.brush.rotation.y = -.2; w.brush.scale.setScalar(1.1); },
    },
    {
      say: 'And the smile? Totally blinding.',
      show: ['floor', 'wall', 'dino', 'sparkle'], sky: '#D9EEF5', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [8, 10, 22], look: [2, 11, 0], fov: 46, to: { pos: [7.5, 10, 20.5], look: [2, 11, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -2, 0, 0, -.5, t); w.r.jaw.rotation.z = -.35; w.r.neck.rotation.z = .1; w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(1.6, -.9, 0));
        w.sparkle.children.forEach(s => { const i = s.userData.i, q = (t * 1.5 + i / 6) % 1; s.position.set(v.x + Math.cos(i) * (.5 + q * 2), v.y + Math.sin(i * 2) * (.5 + q * 1.5), v.z + 1.5); s.scale.setScalar(Math.sin(q * Math.PI) * 1.4); });
      },
    },
    {
      say: 'A T-rex at the dentist: brave, scary, or a bit much? Comment below.',
      quiz: { q: 'Would you be a T-rex dentist?', options: ['Brave', 'Scary', 'A bit much'], answer: 'Fun fact: a T-rex kept growing new teeth all its life when old ones fell out.' },
      show: ['floor', 'wall', 'dino', 'chair'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [14, 8, 26], look: [0, 11.5, 0], fov: 46, to: { pos: [-10, 8, 28], look: [0, 11.5, 0] } },
      update: (w, p, t) => { w.chair.position.set(-2, 0, 0); pose(w, -2, 2, 0, -.3, t); w.r.jaw.rotation.z = -.3; },
    },
  ],
};

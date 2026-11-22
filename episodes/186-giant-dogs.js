// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Pets premise (081 1.7K, dogs and cats are the top topics).
// Hook: the premise as a question under 2 s; first frame shows a house-sized dog wagging its tail over a street, a tiny owner holding the lead.

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
  w.houses = group(); for (let i = 0; i < 6; i++) { const x = -26 + i * 10; box(7, 6, 6, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9', '#FFE3A3', '#E8D7F0'][i]), [x, 3, -12], w.houses); const r = cone(5.4, 3, mat('#B3262E'), [x, 7.5, -12], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.d = dog(k, k.scene); w.dg = w.d.root; w.dg.scale.setScalar(5);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.lead = cyl(.05, .05, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.lead.castShadow = false;
  w.tree = group(); cyl(.5, .7, 8, mat('#6B4B2E'), [0, 0, 0], w.tree, 8).rotation.z = Math.PI / 2; ball(2.6, mat('#2E8B4A'), [-4.5, 0, 0], w.tree);
  w.ladder = group(); for (const x of [-.6, .6]) box(.15, 9, .15, mat('#C79A5B'), [x, 4.5, 0], w.ladder); for (let i = 0; i < 9; i++) box(1.2, .12, .12, mat('#C79A5B'), [0, .6 + i, 0], w.ladder);
  w.mail = person(k, k.scene, '#3A5BA0'); w.mp = w.mail.root; box(.9, .7, .5, mat('#8B5A2B'), [.9, 1.5, .3], w.mp);
  return w;
}

const pose = (w, x, z, ry, t, wag = true) => { w.dg.position.set(x, 0, z); w.dg.rotation.set(0, ry, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); w.d.tail.rotation.x = wag ? .8 * Math.sin(t * 12) : 0; w.d.mouth.scale.y = 1; w.d.legs.forEach(l => l.rotation.z = 0); };
const walkD = (w, t, sp = 6) => w.d.legs.forEach((l, i) => l.rotation.z = .4 * Math.sin(t * sp + (i % 2) * Math.PI));
const leash = (w) => { w.dg.updateMatrixWorld(true); w.pp.updateMatrixWorld(true); const A = new w.dg.position.constructor(), B = A.clone(); w.d.head.localToWorld(A.set(0, -.4, 0)); w.pp.localToWorld(B.set(.9, 1.8, 0));
  w.lead.position.copy(A).add(B).multiplyScalar(.5); w.lead.scale.y = A.distanceTo(B); w.lead.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '186',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT DOGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'WERE GIANT?'],
  title: 'What would happen if dogs were giant?',
  description: 'Walks drag you across town. Fetch uses a whole tree. Belly rubs need a ladder. And the mail carrier is still the enemy. (A comedy what-if.)',
  tags: ['whatif', 'dogs', 'funny', 'giant', 'pets', 'shorts'],
  sources: [
    'Comedy what-if; no factual claims in the quiz answer.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs were giant?',
      show: ['ground', 'houses', 'dg', 'pp', 'lead'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [4, 4, 34], look: [0, 11.6, 0], fov: 46, to: { pos: [3.5, 4, 32], look: [0, 11.6, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, 3.5, -1, 1.0, t); w.d.head.rotation.z = .15 * Math.sin(t * 2); w.pp.position.set(1.5, 0, 8); w.pp.rotation.set(0, .4, 0); w.p.mouth.scale.y = 2.2; leash(w); },
    },
    {
      say: 'Walks? You get dragged across town.',
      show: ['ground', 'houses', 'dg', 'pp', 'lead'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 28,
      cam: { pos: [6, 6, 34], look: [0, 6, 0], fov: 50, to: { pos: [8, 6, 32], look: [3, 6, 0], fov: 48 } },
      update: (w, p, t) => {
        pose(w, -4 + t * 4, 0, Math.PI, t); walkD(w, t, 8); w.dg.position.y = .3 * Math.abs(Math.sin(t * 8));
        w.pp.position.set(w.dg.position.x - 10, 1 + .6 * Math.abs(Math.sin(t * 8)), 4); w.pp.rotation.set(0, Math.PI / 2, -1.2); w.p.mouth.scale.y = 2.6; leash(w);
      },
    },
    {
      say: 'Fetch? The stick is a whole tree.',
      show: ['ground', 'houses', 'dg', 'tree'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [6, 6, 38], look: [-2.5, 8.4, 0], fov: 46, to: { pos: [5.5, 6, 36], look: [-2.5, 8.4, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, 1, 0, .9, t); walkD(w, t, 6); w.dg.position.z = t * 1.2;
        w.dg.updateMatrixWorld(true); const v = new w.dg.position.constructor(); w.d.head.localToWorld(v.set(-.7, -.3, 0)); w.tree.position.copy(v); w.tree.rotation.set(0, .9 + Math.PI, 0);
      },
    },
    {
      say: 'Belly rubs? Bring a ladder.',
      show: ['ground', 'houses', 'dg', 'pp', 'ladder'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [8, 6, 30], look: [0, 6.5, 0], fov: 46, to: { pos: [7.5, 6, 28], look: [0, 6.5, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, 0, 0, 1.0, t); w.d.body.rotation.x = Math.PI * .9; w.dg.position.y = 4.6; w.d.legs.forEach((l, i) => l.rotation.z = .3 * Math.sin(t * 8 + i));
        w.ladder.position.set(1, 0, 5); w.ladder.rotation.set(-.15, 0, 0); w.pp.position.set(1, 5.2, 5.6); w.pp.rotation.set(0, Math.PI, 0); w.pp.position.x = 1 + .2 * Math.sin(t * 8);
      },
    },
    {
      say: 'But the mail carrier? Still the enemy.',
      show: ['ground', 'houses', 'dg', 'mp'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [10, 5, 30], look: [2, 8.6, 0], fov: 46, to: { pos: [9.5, 5, 28], look: [2, 8.6, 0], fov: 44 } },
      shake: (t) => .06,
      update: (w, p, t) => {
        w.d.body.rotation.x = 0; pose(w, -4, 0, Math.PI - .3, t); w.d.mouth.scale.y = 1 + 4 * Math.abs(Math.sin(t * 14)); w.d.head.rotation.z = .2;
        w.mp.position.set(8 + t * 1.5, .4 * Math.abs(Math.sin(t * 12)), 3); w.mp.rotation.set(0, Math.PI / 2, 0); w.mail.mouth.scale.y = 2.4;
      },
    },
    {
      say: 'A giant dog: amazing, too big, or the best ever? Comment below.',
      quiz: { q: 'Would you want a giant dog?', options: ['Amazing', 'Too big', 'Best ever'], answer: 'Dogs stay dog-sized. Belly rubs stay ladder-free.' },
      show: ['ground', 'houses', 'dg'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [14, 5, 24], look: [0, 9, 0], fov: 46, to: { pos: [-10, 5, 26], look: [0, 9, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, 1.0, t); },
    },
  ],
};

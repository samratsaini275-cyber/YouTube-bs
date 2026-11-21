// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; talking-pet premise like 068 (fridge could talk, ~1K) and 079 (cats could text, ~300).
// A made-up comedy sketch: cats do not talk. Hook: the premise as a question under 2 s; first frame shows the cat talking on the sofa.

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
  w.ground = k.ground('#C9B08A', 0);
  w.room = group(); box(40, 20, .5, mat('#E9D8F2'), [0, 10, -4], w.room);
  w.sofa = group([0, 0, -1.6]); box(5, 1, 2, mat('#3B82F6'), [0, .9, 0], w.sofa); box(5, 1.8, .6, mat('#2F6FD6'), [0, 2, -.8], w.sofa);
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false;
  w.cmouth = box(.16, .05, .2, mat('#7A2A2A'), [.48, -.18, 0], w.c.head);
  w.bubbles = group(); for (let i = 0; i < 3; i++) { const s = ball(.35, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubbles); s.scale.set(1.5, 1, .3); s.userData.i = i; s.castShadow = false; }
  w.bowl = group([0, 0, 0]); cyl(.5, .4, .3, mat('#E2453C'), [0, .15, 0], w.bowl, 16); for (let i = 0; i < 6; i++) ball(.08, mat('#8B5A2B'), [Math.cos(i) * .25, .3, Math.sin(i) * .25], w.bowl);
  w.scratch = group(); for (let i = 0; i < 4; i++) { const s = box(.05, .8, .03, mat('#FFFFFF'), [-.3 + i * .2, 0, 0], w.scratch); s.rotation.z = .2; }
  w.p = person(k, k.scene, '#22A06B'); w.pp = w.p.root;
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.notes); ball(.14, mat('#111111'), [0, 0, 0], n); cyl(.03, .03, .4, mat('#111111'), [.12, .2, 0], n, 6); n.userData.i = i; }
  w.box = group([0, 0, 0]); const cb = mat('#C79A5B'); box(1.8, .1, 1.4, cb, [0, .05, 0], w.box);
  for (const [x, z, sx, sz] of [[0, .7, 1.8, .1], [0, -.7, 1.8, .1], [.9, 0, .1, 1.4], [-.9, 0, .1, 1.4]]) box(sx, .9, sz, cb, [x, .45, z], w.box);
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry) => { w.ct.position.set(x, y, z); w.ct.rotation.set(0, ry, 0); w.c.head.rotation.set(0, 0, 0); w.ct.scale.setScalar(1.2); };
const talk = (w, t, on = true) => { w.cmouth.scale.y = on ? 1 + 4 * Math.abs(Math.sin(t * 13)) : 1; w.c.tail.rotation.x = .4 * Math.sin(t * 3); };
const bub = (w, x, y, z, t, on = true) => { w.bubbles.visible = on; w.bubbles.children.forEach(b => { const i = b.userData.i; b.position.set(x + i * .45, y + i * .5 + .06 * Math.sin(t * 6 + i), z); b.scale.set(1.5 * (1 - i * .25), 1 - i * .25, .3); }); };

export default {
  id: '158',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TALKING CAT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF YOUR CAT', 'COULD TALK?'],
  title: 'What would happen if your cat could talk?',
  description: 'Breakfast comes with complaints. The new sofa gets reviewed with claws. Your singing gets honest feedback. And the box is still the best gift. (A made-up talking cat.)',
  tags: ['whatif', 'funny', 'cat', 'talkingcat', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: talking cats are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if your cat could talk?',
      show: ['ground', 'room', 'sofa', 'ct', 'bubbles'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.6, 9], look: [0, 3.3, 0], fov: 46, to: { pos: [0, 2.6, 8.2], look: [0, 3.25, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -.2, 1.4, -1.4, -1.25); talk(w, t, t > .2); bub(w, .4, 3.6, -1.2, t, t > .3); },
    },
    {
      say: 'Breakfast? Complaints. Every single morning.',
      show: ['ground', 'room', 'ct', 'bowl', 'bubbles'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 2.4, 8], look: [0, 1.25, 0], fov: 46, to: { pos: [.3, 2.3, 7.3], look: [0, 1.25, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -.6, 0, 0, -1.0); talk(w, t); w.c.head.rotation.z = -.15; w.bowl.position.set(.9, 0, .6); bub(w, -.4, 2.4, .2, t); },
    },
    {
      say: 'Your new sofa? It leaves a review. With claws.',
      show: ['ground', 'room', 'sofa', 'ct', 'scratch'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 2.6, 8], look: [0, 1.8, -.6], fov: 46, to: { pos: [.9, 2.5, 7.2], look: [0, 1.8, -.6], fov: 44 } },
      update: (w, p, t) => {
        pose(w, .4, 0, -.2, 2.2); w.ct.rotation.x = -.6; talk(w, t, false); w.ct.position.y = .4;
        w.scratch.position.set(-.2, 1.9, -.45); w.scratch.children.forEach((s, i) => { s.visible = i < 1 + t * 2.5; });
      },
    },
    {
      say: 'Your singing? It gets very honest feedback.',
      show: ['ground', 'room', 'sofa', 'ct', 'pp', 'notes', 'bubbles'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.8, 9.5], look: [0, 2.4, 0], fov: 48, to: { pos: [0, 2.8, 8.7], look: [0, 2.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.ct.rotation.x = 0; pose(w, 1.4, 1.4, -1.4, -2.0); talk(w, t, t > 1.1); w.c.head.rotation.z = .2;
        w.pp.position.set(-1.6, 0, .4); w.pp.rotation.set(0, .5, .1 * Math.sin(t * 5)); w.p.mouth.scale.y = t < 1.1 ? 1 + 2 * Math.abs(Math.sin(t * 8)) : 1;
        w.notes.visible = t < 1.2; w.notes.children.forEach(n => { const q = (t * .9 + n.userData.i / 4) % 1; n.position.set(-1.2 + q * 1.4, 3.6 + q * 1.4, .6); });
        bub(w, 1.8, 3.6, -1.2, t, t > 1.1);
      },
    },
    {
      say: 'But the box it came in? Still the best gift ever.',
      show: ['ground', 'room', 'box', 'ct', 'hearts'], sky: '#FFE3C2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 2.6, 7], look: [0, 1.6, 0], fov: 46, to: { pos: [.3, 2.5, 6.3], look: [0, 1.6, 0], fov: 44 } },
      update: (w, p, t) => {
        w.ct.rotation.x = 0; pose(w, .1, .4, 0, -1.3); talk(w, t, false); w.box.position.set(0, 0, 0); w.c.head.rotation.z = .1 * Math.sin(t * 2);
        w.hearts.children.forEach(h => { const q = (t * .7 + h.userData.i / 4) % 1; h.position.set((h.userData.i - 1.5) * .5, 2.3 + q * 1.6, .3); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'A talking cat: fun, great, or a nightmare? Comment below.',
      quiz: { q: 'Would you want a talking cat?', options: ['Fun', 'Great', 'A nightmare'], answer: 'Talking cats are made up. Yours is judging you silently.' },
      show: ['ground', 'room', 'sofa', 'ct'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 1, 7.5], look: [0, 3.8, 0], fov: 46, to: { pos: [-1.2, 1, 7.5], look: [0, 3.8, 0] } },
      update: (w, p, t) => { w.ct.rotation.x = 0; pose(w, -.2, 1.4, -1.4, -1.25); talk(w, t, false); },
    },
  ],
};

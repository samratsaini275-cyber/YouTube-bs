// Narrative 8: "Objects With Opinions". A made-up comedy sketch: bins do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the wheelie bin with a face on a pavement.

function bin(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  box(2.4, 3.6, 2.4, mat('#2E8B4A', { rough: .5 }), [0, 2.1, 0], b.body);
  b.lid = group([0, 3.9, -1.2], b.body); box(2.6, .2, 2.6, mat('#257A3E'), [0, 0, 1.2], b.lid);
  for (const z of [-.9, .9]) { const wh = cyl(.35, .35, .3, mat('#1A1A1A'), [-.9, .35, z], b.body, 14); wh.rotation.x = Math.PI / 2; }
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, 2.9, 1.22], b.body); ball(.12, mat('#111111'), [x, 2.9, 1.38], b.body); }
  b.mouth = box(.6, .1, .05, mat('#5A1E1E'), [0, 2.3, 1.22], b.body);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.street = group();
  box(40, .1, 5, mat('#B8BFC9'), [0, .05, 1], w.street).castShadow = false;
  box(40, .1, 6, mat('#4A4F5A'), [0, .04, 7], w.street).castShadow = false;
  const house = group([0, 0, -6], w.street); box(10, 8, 6, mat('#E8C9A0'), [0, 4, 0], house); const rf = cone(8, 4, mat('#8B3A2E'), [0, 10, 0], house, 4); rf.rotation.y = Math.PI / 4;
  w.b = bin(k, k.scene); w.bn = w.b.root;
  w.bags = group();
  for (let i = 0; i < 5; i++) { const g = ball(.75, mat('#2A2A2A', { rough: .4 }), [((i * 7) % 3 - 1) * .6, 4.2 + Math.floor(i / 2) * .7, ((i * 5) % 3 - 1) * .4], w.bags); g.scale.y = .8; }
  w.truck = group([0, 0, 0]);
  box(9, 4.5, 4, mat('#FFD21F'), [0, 2.8, 0], w.truck); box(3, 3, 4, mat('#E8B60F'), [5.5, 2.3, 0], w.truck); box(2.6, 1.4, 4.1, mat('#BFE6FF', { opacity: .6 }), [5.7, 3, 0], w.truck);
  for (const x of [-3, 3, 5.5]) for (const z of [-2, 2]) { const wh = cyl(1, 1, .5, mat('#1E2430'), [x, 1, z], w.truck, 16); wh.rotation.x = Math.PI / 2; }
  w.arm = group([-4.6, 4, 2], w.truck); box(.3, .3, 2.6, mat('#9AA3AE', { metal: .7 }), [0, 0, 1.3], w.arm);
  w.racc = group([0, 0, 0]);
  const rb = ball(.8, mat('#8A8F98', { rough: .9 }), [0, .8, 0], w.racc); rb.scale.set(1.3, .9, .9);
  w.rhead = group([1.1, 1.4, 0], w.racc); ball(.55, mat('#8A8F98'), [0, 0, 0], w.rhead); box(.6, .25, .9, mat('#2A2A2A'), [.25, .1, 0], w.rhead);
  for (const z of [-.2, .2]) ball(.1, mat('#FFFFFF'), [.5, .12, z], w.rhead);
  ball(.12, mat('#111111'), [.58, -.12, 0], w.rhead); for (const z of [-.3, .3]) cone(.15, .3, mat('#8A8F98'), [-.1, .55, z], w.rhead, 4);
  w.tail = group([-1.1, .9, 0], w.racc); for (let i = 0; i < 5; i++) ball(.3, mat(i % 2 ? '#2A2A2A' : '#C9CED6'), [-i * .35, i * .15, 0], w.tail);
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

export default {
  id: '131',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BIN WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS BIN', 'HAS A COMPLAINT.'],
  title: 'This bin has a complaint',
  description: 'Overstuffed every week. Tipped upside down by a truck. His only real friend? The raccoon. (A made-up talking bin.)',
  tags: ['objectswithopinions', 'funny', 'bin', 'raccoon', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking bins are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This bin has a complaint.',
      show: ['ground', 'street', 'bn'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 2.8, 13], look: [0, 5.9, 0], fov: 46, to: { pos: [1.8, 2.8, 12], look: [0, 5.8, 0], fov: 44 } },
      update: (w, p, t) => { w.bn.position.set(0, 0, 1); w.bn.rotation.set(0, -.2, 0); w.b.lid.rotation.x = 0; talk(w.b, t, t > .2); },
    },
    {
      say: 'Everyone stuffs him until the lid will not shut.',
      show: ['ground', 'street', 'bn', 'bags'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 4, 12], look: [0, 4.4, 0], fov: 46, to: { pos: [2.3, 4, 11], look: [0, 4.4, 0], fov: 44 } },
      update: (w, p, t) => { w.bn.position.set(0, 0, 1); w.bn.rotation.set(0, -.2, 0); talk(w.b, t); const f = Math.min(1, t * .8); w.b.lid.rotation.x = -f * 1; w.bags.position.set(0, -2 + f * 1.6, 1); w.bags.rotation.y = -.2; w.bags.children.forEach((g, i) => { g.visible = i < 1 + f * 5; }); },
    },
    {
      say: 'Once a week, a truck tips him upside down.',
      show: ['ground', 'street', 'bn', 'truck'], sky: '#9ED2F3', lightAt: [0, 5, 3], lightDist: 20,
      cam: { pos: [-16, 6, 6], look: [-2, 4.5, 4], fov: 52, to: { pos: [-15, 6, 6], look: [-2, 4.5, 4], fov: 50 } },
      update: (w, p, t) => {
        w.truck.position.set(1, 0, 7); w.b.lid.rotation.x = Math.min(1.8, Math.max(0, (t - .8) * 3)); const f = Math.min(1, Math.max(0, (t - .5) * 1.2));
        w.bn.position.set(-3.6, f * 6, 2 + f * 3); w.bn.rotation.set(0, -Math.PI / 2, f * 2.6); talk(w.b, t);
      },
    },
    {
      say: 'His only real friend? The raccoon.',
      show: ['ground', 'street', 'bn', 'racc', 'hearts'], sky: '#2A2F5A', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 3.5, 11], look: [.6, 3.6, 1], fov: 46, to: { pos: [2.3, 3.5, 10], look: [.6, 3.6, 1], fov: 44 } },
      update: (w, p, t) => {
        w.bn.position.set(0, 0, 1); w.bn.rotation.set(0, -.2, 0); w.b.lid.rotation.x = -.6; talk(w.b, t, t < 1.5);
        w.racc.position.set(.2, 4.05, 1.2); w.racc.rotation.y = -.3; w.rhead.rotation.z = .15 * Math.sin(t * 3); w.tail.rotation.z = .3 * Math.sin(t * 4);
        w.hearts.children.forEach(h => { const q = (t * .8 + h.userData.i / 4) % 1; h.position.set(.6 + (h.userData.i - 1.5) * .4, 6 + q * 1.6, 1.4); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'Bin day: Monday, Friday, or always forgotten? Comment below.',
      quiz: { q: 'When is bin day where you live?', options: ['Monday', 'Friday', 'Always forgotten'], answer: 'This bin is made up. Ours is always forgotten.' },
      show: ['ground', 'street', 'bn'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 1.5, 12], look: [0, 6.6, 0], fov: 46, to: { pos: [-2, 1.5, 12], look: [0, 6.6, 0] } },
      update: (w, p, t) => { w.bn.position.set(0, 0, 1); w.bn.rotation.set(0, -.2, 0); w.b.lid.rotation.x = 0; talk(w.b, t, false); },
    },
  ],
};

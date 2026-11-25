// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a gorilla taller than a house, beating its chest.

function gorilla(k, parent) {
  const { mat, ball, cyl, group } = k;
  const blk = mat('#2E2E33', { rough: .9 }), face = mat('#55505A'), silver = mat('#8E8E96');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.3, blk, [0, 2.9, 0], g.body); b.scale.set(1.15, 1.1, .85); const back = ball(1, silver, [0, 3, -.5], g.body); back.scale.set(1, .9, .6);
  const ch = ball(.8, face, [0, 3.1, .6], g.body); ch.scale.set(1.1, .9, .4);
  g.head = group([0, 4.6, .3], g.body); ball(.7, blk, [0, 0, 0], g.head); const crest = ball(.5, blk, [0, .45, -.1], g.head); crest.scale.set(.8, .8, 1);
  const fc = ball(.5, face, [0, -.08, .42], g.head); fc.scale.set(1.1, 1, .6);
  for (const x of [-1, 1]) ball(.09, mat('#111111'), [x * .2, .12, .72], g.head);
  const brow = ball(.4, blk, [0, .3, .55], g.head); brow.scale.set(1.4, .35, .4);
  g.mouth = ball(.12, mat('#1A1A1A'), [0, -.3, .72], g.head); g.mouth.scale.set(1.8, .5, .5);
  g.arms = []; for (const x of [-1, 1]) { const a = group([x * 1.3, 3.8, 0], g.body); cyl(.38, .32, 2.6, blk, [0, -1.3, 0], a, 10); ball(.42, face, [0, -2.65, 0], a); a.rotation.z = x * .2; g.arms.push(a); }
  g.legs = []; for (const x of [-1, 1]) { const l = group([x * .6, 1.8, 0], g.body); cyl(.38, .34, 1.6, blk, [0, -.8, 0], l, 10); const f = ball(.4, face, [0, -1.6, .2], l); f.scale.set(1, .45, 1.4); g.legs.push(l); }
  return g;
}
function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));





function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.gr = gorilla(k, k.scene); w.gR = w.gr.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); for (const [x, c] of [[-4, '#E2453C'], [0, '#3E6FD6'], [4, '#F2C94C']]) { const cr = group([x, 0, 3], w.cars); box(2.6, .9, 1.3, mat(c), [0, .65, 0], cr); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], cr); const l = ball(.15, mat('#FF3B30', { glow: 1 }), [-.2, 1.75, 0], cr); l.userData.light = true; }
  w.truck = group(); box(5, 2.4, 2.2, mat('#FFFFFF'), [-.6, 1.6, 0], w.truck); box(1.6, 1.8, 2.2, mat('#3E6FD6'), [2.7, 1.3, 0], w.truck); for (const x of [-2, 1, 2.8]) for (const z of [-1.1, 1.1]) { const wh = cyl(.4, .4, .25, mat('#222222'), [x, .4, z], w.truck, 12); wh.rotation.x = Math.PI / 2; }
  w.nanas = group(); for (let i = 0; i < 12; i++) { const n = cyl(.12, .1, .9, mat('#F2D33C'), [0, 0, 0], w.nanas, 8); n.rotation.z = .6; n.userData.i = i; }
  w.trees = group(); w.treeList = []; for (let i = 0; i < 5; i++) { const tr = group([-6 + i * 3, 0, -3], w.trees); cyl(.25, .3, 2.4, mat('#7A5A3A'), [0, 1.2, 0], tr, 8); ball(1.3, mat('#3E8F3A'), [0, 3.1, 0], tr); w.treeList.push(tr); }
  w.nest = group(); for (let i = 0; i < 10; i++) { const tr = group([Math.cos(i * .63) * 3, .6, Math.sin(i * .63) * 2], w.nest); const tk = cyl(.22, .25, 2.4, mat('#7A5A3A'), [0, 0, 0], tr, 8); tk.rotation.set(Math.PI / 2, 0, i * .63); ball(.9, mat('#3E8F3A'), [0, .3, 0], tr); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const grAt = (w, x, y, z, ry, s) => { w.gR.position.set(x, y, z); w.gR.rotation.set(0, ry, 0); w.gR.scale.setScalar(s); w.gr.body.rotation.set(0, 0, 0); w.gr.head.rotation.set(0, 0, 0); w.gr.mouth.scale.set(1.8, .5, .5); w.gr.arms.forEach((a, i) => a.rotation.set(0, 0, (i ? 1 : -1) * .2)); w.gr.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const beat = (w, t) => { const a = Math.sin(t * 14); w.gr.arms[0].rotation.set(-1.4, 0, .9 + .25 * a); w.gr.arms[1].rotation.set(-1.4, 0, -.9 + .25 * a); w.gr.mouth.scale.set(1.8, 1.6, .5); };

export default {
  id: '363',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT GORILLAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GORILLAS', 'WERE GIANT?'],
  title: 'What would happen if gorillas were giant?',
  description: 'One chest beat sets off every car alarm. Bananas come by the truck. And its bed for the night? Made of your trees. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'gorilla', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant gorillas are made up. Quiz fact: gorillas build a fresh nest of leaves and branches to sleep in almost every night (Encyclopaedia Britannica, "gorilla").'],
  setup,
  scenes: [
    { say: 'What if gorillas were giant?', label: 'THUMP THUMP', show: ['ground', 'gR', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 9.2, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 9.2, 0], fov: 54 } },
      update: (w, p, t) => { grAt(w, -2.6, 0, -4, .25, 2); beat(w, t); w.house.position.set(4.6, 0, -3); stand(w, 2.6, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'One chest beat? Every car alarm goes off.', label: 'WEE-OO WEE-OO', show: ['ground', 'gR', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .12 : 0,
      cam: { pos: [2, 5, 22], look: [0, 4.4, 0], fov: 56, to: { pos: [2, 5, 21], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { grAt(w, 0, 0, -3, 0, 1.4); if (t > .3) beat(w, t); w.cars.children.forEach((c, i) => { c.position.y = t > .5 ? .08 * Math.abs(Math.sin(t * 20 + i)) : 0; c.children.forEach(m => { if (m.userData.light) m.visible = t > .5 && Math.sin(t * 16 + i) > 0; }); }); } },
    { say: 'Bananas? It orders them by the truck.', label: 'NOM NOM', show: ['ground', 'gR', 'truck', 'nanas'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 20], look: [0, 4, 0], fov: 56, to: { pos: [3, 5, 19], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { w.cars.children.forEach(c => c.position.y = 0); grAt(w, -2.8, 0, -1, .3, 1.3); w.truck.position.set(2.6, 0, 1); w.truck.rotation.y = -.3; const lift = Math.min(1, Math.max(0, (p - .3) * 2)); w.gr.arms[1].rotation.set(-lift * 1.2, 0, .2 + lift * .8); w.gr.mouth.scale.set(1.8, lift > .5 ? 1.8 * Math.abs(Math.sin(t * 10)) + .4 : .5, .5); w.nanas.children.forEach(n => { const i = n.userData.i, q = (t * 1.3 + i / 12) % 1; n.position.set(2 - q * 4, 2.4 + q * 3.6, 1 + Math.sin(i) * .5); n.visible = lift > .3; }); } },
    { say: 'And its bed for the night? Made of your trees.', label: 'NIGHT NIGHT', show: ['ground', 'gR', 'trees', 'nest'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 7, 20], look: [0, 2.4, 0], fov: 56, to: { pos: [2, 7, 19], look: [0, 2.4, 0], fov: 54 } },
      update: (w, p, t) => { const done = p > .4; w.trees.visible = !done; w.nest.visible = done; w.nest.position.set(0, 0, 0); if (done) { grAt(w, 0, .6, 0, Math.PI / 2, 1.1); w.gr.body.rotation.z = -1.4; w.gr.body.position.y = .6; w.gr.head.rotation.z = .2; } else { grAt(w, 0, 0, 0, 0, 1.1); w.gr.body.position.y = 0; w.gr.arms[0].rotation.z = -2.4; w.gr.arms[1].rotation.z = 2.4; w.treeList.forEach((tr, i) => tr.rotation.z = Math.sin(t * 8 + i) * .2); } } },
    { say: 'Giant gorillas: cool, cute, or way too loud? Comment below.',
      quiz: { q: 'Giant gorillas are…', options: ['Cool', 'Cute', 'Way too loud'], answer: 'Made up. Real gorillas build a new bed of leaves almost every night.' },
      show: ['ground', 'gR'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 3.5, 10], look: [0, 3.6, 0], fov: 54, to: { pos: [-3, 3.5, 10], look: [0, 3.6, 0] } },
      update: (w, p, t) => { w.gr.body.position.y = 0; grAt(w, 0, 0, 0, 0, 1); w.gr.head.rotation.z = .08 * Math.sin(t * 3); if (p > .6) beat(w, t); } },
  ],
};

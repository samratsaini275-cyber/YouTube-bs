// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a fluffy llama taller than a house.

function llama(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const wool = mat('#F2E6D2', { rough: .95 }), face = mat('#E8D8C0'), dark = mat('#3A2A1A');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const thin = ball(.7, face, [0, 2.4, 0], g.body); thin.scale.set(1.8, .7, .6); g.fluff = []; for (let i = 0; i < 9; i++) { const f = ball(.75, wool, [-1 + (i % 3) * 1, 2.2 + Math.floor(i / 3) * .35, (i % 2 - .5) * .5], g.body); g.fluff.push(f); }
  g.neck = group([1.2, 2.6, 0], g.body); for (let i = 0; i < 5; i++) ball(.45, wool, [i * .1, i * .5, 0], g.neck);
  g.head = group([1.75, 5.2, 0], g.body); const hd = ball(.42, face, [0, 0, 0], g.head); hd.scale.set(1.3, 1, .9); const mz = ball(.25, face, [.45, -.12, 0], g.head);
  for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.25, .15, z * .3], g.head); const ear = cone(.1, .45, face, [-.15, .55, z * .2], g.head, 6); ear.rotation.x = z * .2; }
  g.mouth = box(.15, .03, .2, dark, [.65, -.22, 0], g.head);
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * .9, 1.6, z * .4], g.body); cyl(.14, .12, 1.6, face, [0, -.8, 0], l, 8); cyl(.14, .14, .15, dark, [0, -1.6, 0], l, 8); g.legs.push(l); }
  return g;
}
const hum = (g, t, a = 1) => g.mouth.scale.set(1, 1 + a * 2 * Math.abs(Math.sin(t * 4)), 1);
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
  w.ground = k.ground('#7FB069', 0);
  w.lm = llama(k, k.scene); w.lr = w.lm.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.spit = group(); for (let i = 0; i < 10; i++) { const s = ball(.18, mat('#BFE8F5', { glow: .3 }), [0, 0, 0], w.spit); s.userData.i = i; s.castShadow = false; }
  w.truck = group(); box(5, 2.4, 2.4, mat('#3B6FD6'), [0, 1.6, 0], w.truck); box(1.6, 1.8, 2.3, mat('#2E5FB0'), [3.2, 1.3, 0], w.truck); for (const x of [-1.6, 1.6, 3.2]) for (const z of [-1.2, 1.2]) { const wh = cyl(.45, .45, .3, mat('#222222'), [x, .45, z], w.truck, 12); wh.rotation.x = Math.PI / 2; } w.load = group([0, 3, 0], w.truck); for (let i = 0; i < 6; i++) ball(.9, mat('#F2E6D2', { rough: .95 }), [-1.8 + (i % 3) * 1.8, Math.floor(i / 3) * .7, 0], w.load);
  w.notes = group(); for (let i = 0; i < 6; i++) { const n = group([0, 0, 0], w.notes); ball(.2, mat('#111111'), [0, 0, 0], n); cyl(.04, .04, .6, mat('#111111'), [.18, .3, 0], n, 4); n.userData.i = i; }
  w.crowd = group(); for (let i = 0; i < 4; i++) { const c = person(k, w.crowd, ['#E2453C', '#3FA34D', '#F2B21F', '#9B59B6'][i]); c.root.position.set(-4.5 + i * 3, 0, 4); c.root.rotation.y = Math.PI + (i - 1.5) * .2; c.root.scale.setScalar(.8); c.root.userData.p = c; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const lmAt = (w, x, y, z, ry, s) => { w.lr.position.set(x, y, z); w.lr.rotation.set(0, ry, 0); w.lr.scale.setScalar(s); w.lm.head.rotation.set(0, 0, 0); w.lm.mouth.scale.set(1, 1, 1); w.lm.fluff.forEach(f => f.visible = true); };

export default {
  id: '347',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT LLAMAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF LLAMAS', 'WERE GIANT?'],
  title: 'What would happen if llamas were giant?',
  description: 'Annoy one and your car gets a free wash. One haircut fills a whole truck. And when they hum? The whole town hums along. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'llama', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant llamas are made up. Quiz fact: llamas belong to the camel family, and they often hum to each other (Encyclopaedia Britannica, "llama").'],
  setup,
  scenes: [
    { say: 'What if llamas were giant?', show: ['ground', 'lr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 11.4, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 11.4, 0], fov: 54 } },
      update: (w, p, t) => { lmAt(w, -3.4, 0, -5, -.7, 2.2); w.lm.head.rotation.z = .08 * Math.sin(t * 2); w.house.position.set(3.4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Annoy one? Your car gets a free wash.', label: 'PTOOEY!', show: ['ground', 'lr', 'car', 'spit', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 20], look: [0, 5, 0], fov: 56, to: { pos: [3, 6, 19], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { lmAt(w, -4, 0, -1, 0, 1.6); w.car.position.set(3, 0, 0); w.lr.updateWorldMatrix(true, true); const h = w.lm.mouth.getWorldPosition(new w.k.THREE.Vector3()); const on = p > .4; w.lm.mouth.scale.set(1, on ? 3 : 1, 1); w.spit.children.forEach(s => { const i = s.userData.i, q = (t * 1.6 + i / 10) % 1; s.position.set(h.x + q * (3 - h.x), h.y + Math.sin(q * Math.PI) * 1 - q * (h.y - 1.4), (i % 3 - 1) * .2); s.visible = on; }); stand(w, 5.4, 3.4, -.7); pose(w.p, on ? 2.4 : .3); w.p.mouth.scale.set(1.2, on ? 3 : 1, 1); } },
    { say: 'One haircut? It fills a whole truck.', label: 'SNIP SNIP', show: ['ground', 'lr', 'truck'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 4.6, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { lmAt(w, -4, 0, -1, 0, 1.6); const n = Math.floor(p * 11); w.lm.fluff.forEach((f, i) => { f.visible = i >= n; }); w.truck.position.set(3, 0, 1); w.load.scale.setScalar(Math.min(1, .2 + p * 1.2)); } },
    { say: 'And when they hum? The whole town hums along.', label: 'HMMMM', show: ['ground', 'lr', 'notes', 'crowd', 'house'], sky: '#FFC88A', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 26], look: [0, 6.2, 0], fov: 58, to: { pos: [0, 6, 25], look: [0, 6.2, 0], fov: 56 } },
      update: (w, p, t) => { lmAt(w, 0, 0, -3, -1.2, 1.7); hum(w.lm, t); w.lm.head.rotation.z = .1 * Math.sin(t * 2); w.house.position.set(7, 0, -5); w.lr.updateWorldMatrix(true, true); const h = w.lm.head.getWorldPosition(new w.k.THREE.Vector3()); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .6 + i / 6) % 1; n.position.set(h.x - 3 + (i % 3) * 3 + Math.sin(q * 6) * .5, h.y - 2 + q * 5, h.z + 2); }); w.crowd.children.forEach((c, i) => { c.rotation.z = .08 * Math.sin(t * 3 + i); c.userData.p.mouth.scale.set(1, 1 + Math.abs(Math.sin(t * 4 + i)) * 1.5, 1); }); } },
    { say: 'Giant llamas: cute, fluffy, or way too spitty? Comment below.',
      quiz: { q: 'Giant llamas are…', options: ['Cute', 'Fluffy', 'Way too spitty'], answer: 'Made up. Real llamas are in the camel family, and they hum.' },
      show: ['ground', 'lr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [12, 5, 10], look: [0, 4.6, 0], fov: 54, to: { pos: [14, 5, 2], look: [0, 4.6, 0] } },
      update: (w, p, t) => { lmAt(w, 0, 0, 0, -.7, 1.3); w.lm.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};

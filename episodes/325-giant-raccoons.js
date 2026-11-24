// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized raccoon next to a house.

function raccoon(k, parent) {
  const { mat, ball, cone, group } = k;
  const grey = mat('#8A8580', { rough: .8 }), light = mat('#E8E4DE', { rough: .8 }), black = mat('#1E1C1A', { rough: .8 });
  const r = { root: group([0, 0, 0], parent) };
  const b = ball(1.1, grey, [0, 1.2, 0], r.root); b.scale.set(1.3, 1, 1);
  r.head = group([1.3, 2.1, 0], r.root); ball(.7, grey, [0, 0, 0], r.head); const snout = ball(.35, light, [.55, -.15, 0], r.head); snout.scale.set(1.2, .8, .9); ball(.1, black, [.95, -.1, 0], r.head);
  const mask = ball(.5, black, [.35, .15, 0], r.head); mask.scale.set(.5, .45, 1.45);
  for (const z of [-1, 1]) { ball(.12, mat('#FFFFFF'), [.58, .2, z * .28], r.head); ball(.06, mat('#111111'), [.66, .21, z * .3], r.head); const e = cone(.2, .35, grey, [-.15, .6, z * .4], r.head, 8); const brow = ball(.18, light, [.5, .38, z * .3], r.head); brow.scale.set(.6, .3, 1); }
  r.tail = []; for (let i = 0; i < 6; i++) { const t = ball(.32 - i * .02, i % 2 ? black : grey, [-1.4 - i * .35, .9 + i * .18, 0], r.root); t.scale.set(.8, 1, 1); r.tail.push(t); }
  r.paws = [-1, 1].map(z => ball(.22, black, [1.3, .9, z * .45], r.root));
  for (const z of [-1, 1]) { const f = ball(.28, black, [.2, .15, z * .6], r.root); f.scale.set(1.5, .5, 1); }
  return r;
}
const swish = (r, t) => r.tail.forEach((b, i) => b.position.z = .12 * Math.sin(t * 4 - i * .7) * i);
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
  w.rc = raccoon(k, k.scene); w.rr = w.rc.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.bins = group(); w.lids = []; for (let i = 0; i < 3; i++) { const b = group([-2.2 + i * 2.2, 0, 0], w.bins); cyl(.7, .6, 1.8, mat('#3E8E33'), [0, .9, 0], b, 16); const l = cyl(.75, .75, .15, mat('#2E6E25'), [0, 1.85, 0], b, 16); w.lids.push(l); }
  w.trash = group(); for (let i = 0; i < 10; i++) { const t = box(.35, .35, .35, mat(['#E8E4DE', '#C98B3E', '#E2453C', '#F2B21F'][i % 4]), [0, 0, 0], w.trash); t.userData.i = i; t.castShadow = false; }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.pool = group(); box(7, .3, 4.5, mat('#FFFFFF'), [0, .15, 0], w.pool); box(6.6, .1, 4.1, mat('#4FB3E8', { glow: .15 }), [0, .32, 0], w.pool);
  w.apple = ball(.5, mat('#E2453C'), [0, 0, 0]);
  w.drops = group(); for (let i = 0; i < 10; i++) { const d = ball(.18, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const rcAt = (w, x, y, z, ry, s) => { w.rr.position.set(x, y, z); w.rr.rotation.set(0, ry, 0); w.rr.scale.setScalar(s); w.rc.head.rotation.set(0, 0, 0); w.rc.paws.forEach((p, i) => p.position.set(1.3, .9, (i ? 1 : -1) * .45)); };

export default {
  id: '325',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT RACCOONS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF RACCOONS', 'WERE GIANT?'],
  title: 'What would happen if raccoons were giant?',
  description: 'Your bins? Emptied every night. Your car? Borrowed. And washing their snacks? In your pool. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'raccoon', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant raccoons are made up. Quiz fact: raccoons have very sensitive front paws and often dunk or rub their food in water before eating it (Encyclopaedia Britannica, "raccoon").'],
  setup,
  scenes: [
    { say: 'What if raccoons were giant?', show: ['ground', 'rr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.6, 0], fov: 52 } },
      update: (w, p, t) => { rcAt(w, -3.4, 0, -5, -.8, 2.6); swish(w.rc, t); w.rc.head.rotation.z = .08 * Math.sin(t * 3); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your bins? Emptied every night.', label: 'CRASH!', show: ['ground', 'rr', 'bins', 'trash'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 18], look: [0, 3.6, 0], fov: 54, to: { pos: [2, 6, 17], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { rcAt(w, -3, 0, -3, -.4, 2); swish(w.rc, t); w.rc.paws.forEach((pw, i) => pw.position.set(1.4, 1.2 + .4 * Math.sin(t * 14 + i * Math.PI), (i ? 1 : -1) * .45)); w.bins.position.set(1.2, 0, 0); w.lids.forEach((l, i) => { const off = p > .2 + i * .15; l.position.set(off ? .8 : 0, off ? .2 : 1.85, off ? .8 : 0); l.rotation.x = off ? 1.4 : 0; }); w.trash.children.forEach(c => { const i = c.userData.i, q = (t * 1.2 + i / 10) % 1; c.position.set(1.2 + (i % 3 - 1) * 2.2 + Math.cos(i) * q * 2, 2 + Math.sin(q * Math.PI) * 2.5 - q, Math.sin(i) * q * 1.5); c.rotation.set(t * 3 + i, t * 2, 0); c.visible = p > .25; }); } },
    { say: 'Your car? Borrowed.', label: 'VROOM', show: ['ground', 'rr', 'car', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 20], look: [0, 3.4, 0], fov: 56, to: { pos: [2, 6, 19], look: [0, 3.4, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(-5, 0, -4); const x = -3.5 + Math.max(0, p - .25) * 7; rcAt(w, x, 0, 0, 0, 1.6); swish(w.rc, t); w.car.position.set(x + .4, 4.4 + .2 * Math.sin(t * 8), 0); w.car.rotation.z = .1; w.rc.paws.forEach((pw, i) => pw.position.set(.3, 2.5, (i ? 1 : -1) * .6)); stand(w, 4.6, 2.5, -.7); const gone = p > .5; pose(w.p, gone ? 2.5 : .3); w.p.mouth.scale.set(1.2, gone ? 3 : 1, 1); } },
    { say: 'And washing their snacks? In your pool.', label: '*SPLASH*', show: ['ground', 'rr', 'pool', 'apple', 'drops', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 8, 18], look: [0, 2.6, 0], fov: 54, to: { pos: [2, 8, 17], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { rcAt(w, -4.2, 0, -.5, 0, 1.9); swish(w.rc, t); w.rc.head.rotation.z = -.35; const dunk = .5 + .5 * Math.sin(t * 7); w.rc.paws.forEach((pw, i) => pw.position.set(1.8, .4 + dunk * .8, (i ? 1 : -1) * .3)); w.rr.updateWorldMatrix(true, true); const pw = w.rc.paws[0].getWorldPosition(new w.k.THREE.Vector3()); w.apple.position.set(pw.x + .3, pw.y + .2, 0); w.drops.children.forEach(d => { const i = d.userData.i, a = i / 10 * Math.PI * 2, q = (t * 1.4 + i / 10) % 1; d.position.set(pw.x + Math.cos(a) * q * 2, .5 + Math.sin(q * Math.PI) * 1.6, Math.sin(a) * q * 1.4); }); stand(w, 4.2, 4.5, -.6); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 2.6, 1); } },
    { say: 'Giant raccoons: cute, sneaky, or way too messy? Comment below.',
      quiz: { q: 'Giant raccoons are…', options: ['Cute', 'Sneaky', 'Way too messy'], answer: 'Made up. Real raccoons often dunk their food in water before eating.' },
      show: ['ground', 'rr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3, 0] } },
      update: (w, p, t) => { rcAt(w, 0, 0, 0, -.6, 1.5); swish(w.rc, t); } },
  ],
};

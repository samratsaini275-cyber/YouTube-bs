// Narrative 22: "In This Town… (short format, cats first)". Food rules: 393 lemonade rain; 212 ice cream got 641 views in the window.
// Hook: the rule under 2 s; first frame shows a kid at the table hugging a giant broccoli.

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


function broc(k, parent) {
  const { mat, cyl, ball, group } = k;
  const g = group([0, 0, 0], parent); cyl(.18, .25, .9, mat('#9CCB6A'), [0, .45, 0], g, 8);
  for (const v of [[0, 1.05, 0], [-.35, .9, .1], [.35, .9, .1], [0, .9, -.3], [-.2, 1.15, .25], [.25, 1.15, .2]]) ball(.32, mat('#3E8F3A', { rough: .9 }), v, g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#FCE3A8'), [0, 8, -4], w.wall);
  w.table = group(); box(5, .2, 2.4, mat('#FFFFFF'), [0, 2, 0], w.table); for (const x of [-2.2, 2.2]) for (const z of [-1, 1]) cyl(.08, .08, 2, mat('#7A4E2E'), [x, 1, z], w.table, 6);
  w.kid = person(k, k.scene, '#E2453C'); w.kr = w.kid.root;
  w.mum = person(k, k.scene, '#7C5CC4');
  w.big = broc(k, k.scene);
  w.plate = group(); cyl(.9, .8, .1, mat('#FFFFFF'), [0, 0, 0], w.plate, 20);
  w.small = []; for (let i = 0; i < 3; i++) { const b = broc(k, w.plate); b.scale.setScalar(.35); b.position.set(-.4 + i * .4, .05, 0); w.small.push(b); }
  w.shop = group(); box(6, 2, 1.6, mat('#F49AAE'), [0, 1, -1.4], w.shop); box(6.4, .9, .2, mat('#E2453C'), [0, 5.6, -2.2], w.shop); w.sign = box(4, .6, .05, mat('#FFFFFF'), [0, 5.6, -2.05], w.shop);
  for (let i = 0; i < 3; i++) { const j = cyl(.6, .6, 1.4, mat('#CFEFFF', { glow: .1 }), [-2 + i * 2, 2.7, -1.4], w.shop, 14); j.material.transparent = true; j.material.opacity = .5; for (let c = 0; c < 4; c++) { const cr = cone(.12, .7, mat('#FF8A2A'), [-2 + i * 2 + (c % 2 - .5) * .4, 2.6 + Math.floor(c / 2) * .3, -1.4 + (c % 2 ? .15 : -.15)], w.shop, 8); cr.rotation.x = Math.PI; } }
  w.arm = group(); for (let c = 0; c < 5; c++) { const cr = cone(.14, .9, mat('#FF8A2A'), [(c - 2) * .25, 0, 0], w.arm, 8); cr.rotation.z = Math.PI / 2 + (c - 2) * .15; cone(.1, .3, mat('#3FA34D'), [(c - 2) * .25 + .55, 0, 0], w.arm, 6).rotation.z = -Math.PI / 2; }
  w.dessert = group(); cyl(.9, .8, .1, mat('#FFFFFF'), [0, 0, 0], w.dessert, 20); for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; ball(.22, mat('#6FAE3A'), [Math.cos(a) * .4 * (i % 2 ? 1 : .4), .25 + (i % 3) * .12, Math.sin(a) * .4 * (i % 2 ? 1 : .4)], w.dessert); } ball(.25, mat('#FFFFFF'), [0, .65, 0], w.dessert); ball(.12, mat('#E2453C', { glow: .2 }), [0, .92, 0], w.dessert);
  w.spk = group(); for (let i = 0; i < 5; i++) { const s = ball(.1, mat('#FFE38A', { glow: .9 }), [0, 0, 0], w.spk); s.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const sparkle = (w, t, on, at) => w.spk.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 3; s.position.set(at[0] + Math.cos(a) * .9, at[1] + Math.sin(a) * .5, at[2] + .3); s.scale.setScalar(.7 + .4 * Math.sin(t * 9 + s.userData.i)); s.visible = on; });
const chomp = (q, t) => q.mouth.scale.set(1.2, 1 + 1.6 * Math.abs(Math.sin(t * 10)), 1);

export default {
  id: '401',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'VEGGIES TASTE LIKE CANDY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'VEGGIES TASTE SWEET'],
  title: 'In this town, vegetables taste like candy',
  description: 'Kids beg for broccoli. The candy shop sells carrots. And dessert? Brussels sprouts. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'food', 'whatif', 'comedy', 'shorts'],
  sources: ['Comedy sketch: candy-flavoured vegetables are made up. Quiz fact: broccoli, cabbage, kale, cauliflower and Brussels sprouts are all cultivated forms of one plant species, Brassica oleracea (Encyclopaedia Britannica, "broccoli" and "cabbage").'],
  setup,
  scenes: [
    { say: 'In this town, veggies taste sweet.', show: ['floor', 'wall', 'table', 'big', 'spk'], sky: '#FCE3A8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.4, 9.5], look: [.2, 3.05, 0], fov: 52, to: { pos: [.4, 3.4, 8.9], look: [.2, 3.05, 0], fov: 50 } },
      update: (w, p, t) => { w.mum.root.visible = false; w.plate.visible = false; w.shop.visible = false; w.arm.visible = false; w.dessert.visible = false; w.table.position.set(0, 0, -1.2); pAt(w.kid, -.6, 0, .6, .2, .75); pose(w.kid, .4, 1.2); chomp(w.kid, t); w.kid.eyes.forEach(e => e.scale.y = .3); w.big.position.set(1.1, 2.1, -.6); w.big.scale.setScalar(1.15); w.big.rotation.z = .1 * Math.sin(t * 4); sparkle(w, t, true, [1.1, 3.3, -.4]); } },
    { say: 'Kids beg for broccoli.', label: 'MORE!', show: ['floor', 'wall', 'plate', 'spk'], sky: '#FCE3A8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.8, 11], look: [.4, 3.3, 0], fov: 52, to: { pos: [.4, 3.8, 10.4], look: [.4, 3.3, 0], fov: 50 } },
      update: (w, p, t) => { w.table.visible = false; w.big.visible = false; pAt(w.kid, -1, .3 * Math.abs(Math.sin(t * 9)), .8, .5, .75); pose(w.kid, .3, 2.4); w.kid.mouth.scale.set(1.2, 2.6, 1); w.kid.arms.forEach(a => a.updateWorldMatrix(true, true)); w.plate.position.copy(w.kid.arms[1].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0))); w.plate.position.x -= .4; pAt(w.mum, 1.8, 0, 0, -.6, 1); pose(w.mum, .2, .3); w.mum.head.rotation.x = .3; w.mum.mouth.scale.set(.8, 2, 1); sparkle(w, t, true, [w.plate.position.x, w.plate.position.y + .8, w.plate.position.z]); } },
    { say: 'Candy shop? Sells carrots.', label: 'SWEET', show: ['floor', 'wall', 'shop', 'arm'], sky: '#FCE3A8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 11], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.6, 10.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { w.plate.visible = false; w.spk.visible = false; w.mum.root.visible = false; pAt(w.kid, -1.6 + p * 2.4, 0, 1.6, .3, .75); pose(w.kid, .2, 1.3); w.kid.eyes.forEach(e => e.scale.y = .3); w.kid.mouth.scale.set(1.2, 2.2, 1); w.kr.updateWorldMatrix(true, true); w.arm.position.copy(w.kid.root.localToWorld(new w.k.THREE.Vector3(0, 2.1, 1.3))); w.arm.rotation.set(0, .3, 0); } },
    { say: 'And dessert? Brussels sprouts.', label: 'YUM', show: ['floor', 'wall', 'table', 'dessert', 'spk'], sky: '#FCE3A8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.4, 9], look: [.3, 2.6, 0], fov: 50, to: { pos: [.3, 3.4, 8.5], look: [.3, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.shop.visible = false; w.arm.visible = false; w.table.position.set(0, 0, -.4); pAt(w.kid, -.8, 0, -1.4, .2, .75); pose(w.kid, .5, 1.1); chomp(w.kid, t); w.kid.eyes.forEach(e => e.scale.y = .3); w.dessert.position.set(1.2, 2.15, .3); w.dessert.scale.setScalar(1.3); sparkle(w, t, true, [1.2, 3.6, .3]); } },
    { say: 'Sweet veggies: cool, yummy, or way too weird? Comment below.',
      quiz: { q: 'Candy-flavoured veggies are…', options: ['Cool', 'Yummy', 'Way too weird'], answer: 'Made up. But broccoli, cabbage and kale are all the same plant species.' },
      show: ['floor', 'spk'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.6, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.table.visible = false; w.dessert.visible = false; w.kid.root.visible = false; w.big.visible = true; w.big.position.set(0, 0, 0); w.big.scale.setScalar(2.2); w.big.rotation.z = .1 * Math.sin(t * 2); sparkle(w, t, true, [0, 2.6, 0]); } },
  ],
};

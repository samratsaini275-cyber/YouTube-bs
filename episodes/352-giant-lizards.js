// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a lizard longer than a house.

function lizard(k, parent) {
  const { mat, ball, cyl, group } = k;
  const grn = mat('#5FAE4A', { rough: .7 }), belly = mat('#E6D35A'), dk = mat('#3E7A30');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, grn, [0, 1, 0], g.body); b.scale.set(2.2, .55, .85);
  for (let i = 0; i < 5; i++) { const sp = ball(.16, dk, [-1.4 + i * .7, 1.5, 0], g.body); sp.scale.set(1.4, .6, 1.4); }
  g.head = group([2.3, 1.15, 0], g.body); const hd = ball(.6, grn, [.3, 0, 0], g.head); hd.scale.set(1.5, .7, .9);
  for (const z of [-1, 1]) { const e = ball(.2, mat('#FFFFFF'), [.35, .35, z * .38], g.head); ball(.1, mat('#111111'), [.42, .38, z * .48], g.head); }
  g.tongue = cyl(.06, .06, 1, mat('#E2456A'), [1.2, -.1, 0], g.head, 8); g.tongue.rotation.z = Math.PI / 2; g.tongue.visible = false;
  g.tail = group([-2.1, 1, 0], g.root); g.tailSegs = [];
  let par = g.tail; for (let i = 0; i < 6; i++) { const s = group(i ? [-.7, 0, 0] : [0, 0, 0], par); const c = ball(.4 - i * .055, grn, [-.35, 0, 0], s); c.scale.set(1.6, 1, 1); g.tailSegs.push(s); par = s; }
  g.legs = []; for (const x of [-1.2, 1.2]) for (const z of [-1, 1]) { const l = group([x, .9, z * .7], g.body); const c = cyl(.15, .15, 1.1, grn, [0, -.2, z * .4], l, 8); c.rotation.x = z * 1.1; ball(.22, dk, [0, -.75, z * .75], l); g.legs.push(l); }
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
  w.road = box(40, .05, 5, mat('#555B66'), [0, .03, 3]);
  w.lz = lizard(k, k.scene); w.lr = w.lz.root;
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.house = group(); w.walls = box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.sun = ball(1.4, mat('#FFD54A', { glow: .9 }), [0, 0, 0]);
  w.lost = group(); let par = w.lost; w.lostSegs = []; for (let i = 0; i < 6; i++) { const s = group(i ? [-.7, 0, 0] : [0, 0, 0], par); const c = ball(.4 - i * .055, mat('#5FAE4A', { rough: .7 }), [-.35, 0, 0], s); c.scale.set(1.6, 1, 1); w.lostSegs.push(s); par = s; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const lzAt = (w, x, y, z, ry, s) => { w.lr.position.set(x, y, z); w.lr.rotation.set(0, ry, 0); w.lr.scale.setScalar(s); w.lz.head.rotation.set(0, 0, 0); w.lz.tongue.visible = false; w.lz.tail.visible = true; w.lz.tailSegs.forEach(g => g.rotation.set(0, 0, 0)); w.lz.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const wag = (segs, t, a, f) => segs.forEach((g, i) => g.rotation.y = a * Math.sin(t * f - i * .8));

export default {
  id: '352',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT LIZARDS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF LIZARDS', 'WERE GIANT?'],
  title: 'What would happen if lizards were giant?',
  description: 'It sunbathes on your roof. It licks you. And when it gets scared, it leaves its tail in the street. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'lizard', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant lizards are made up. Quiz fact: many lizards can shed their tail to escape a predator, and the dropped tail keeps wriggling as a distraction (Encyclopaedia Britannica, "lizard"; "autotomy").'],
  setup,
  scenes: [
    { say: 'What if lizards were giant?', show: ['ground', 'road', 'lr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 8, 22], look: [0, 3.2, 0], fov: 56, to: { pos: [1, 8, 20.5], look: [0, 3.2, 0], fov: 54 } },
      update: (w, p, t) => { lzAt(w, -3, 0, -4, -1.0, 2.4); w.lz.head.rotation.y = .15 * Math.sin(t * 2); wag(w.lz.tailSegs, t, .25, 3); w.house.position.set(6.5, 0, -6); w.house.rotation.set(0, 0, 0); w.roof.scale.set(1, 1, 1); w.walls.scale.set(1, 1, 1); stand(w, 4.2, 4, -.3); pose(w.p, .3); w.p.head.rotation.x = -.3; w.p.head.rotation.y = -.7; } },
    { say: 'It sunbathes on your roof.', label: 'CREAK', show: ['ground', 'lr', 'house', 'sun'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 5, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(0, 0, 0); w.house.rotation.set(0, 0, 0); const sq = Math.max(.55, 1 - p * .6); w.walls.scale.set(1, sq, 1); w.walls.position.y = 1.7 * sq; w.roof.position.y = 4.5 - 3.4 * (1 - sq); w.roof.scale.set(1.2, .7, 1.2); lzAt(w, 0, 3.4 * sq + 1.2, 0, 0, 1.4); w.lz.legs.forEach(l => l.rotation.x = .3); w.lz.head.rotation.z = .2; w.sun.position.set(6, 12, -10); } },
    { say: 'One lick? Now you are sticky.', label: 'SHLURP', show: ['ground', 'lr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 4, 17], look: [1, 3.4, 0], fov: 56, to: { pos: [4, 4, 16], look: [1, 3.4, 0], fov: 54 } },
      update: (w, p, t) => { w.walls.scale.set(1, 1, 1); w.walls.position.y = 1.7; w.roof.position.y = 4.5; w.roof.scale.set(1, 1, 1); w.house.position.set(4.6, 0, -1.5); w.house.rotation.y = -.4; lzAt(w, -4.4, 0, 0, 0, 1.4); const lk = p > .3 && p < .7; w.lz.tongue.visible = lk; w.lz.tongue.scale.y = lk ? 2.4 : 1; w.lz.tongue.position.x = lk ? 2 : 1.2; w.lz.head.rotation.z = lk ? .25 : 0; stand(w, 4.6, 4.4, -.6); pose(w.p, lk ? 2.4 : .3); w.p.mouth.scale.set(1.2, lk ? 3 : 1, 1); } },
    { say: 'And when it gets scared, it drops its tail. Still wiggling.', label: 'WIGGLE WIGGLE', show: ['ground', 'road', 'lr', 'lost', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 3.4, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 3.4, 0], fov: 54 } },
      update: (w, p, t) => { lzAt(w, -4 - p * 10, 0, -1, Math.PI, 1.4); w.lz.tail.visible = false; w.lz.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * 14 + i)); w.lost.position.set(1, 1.4, 2); w.lost.scale.setScalar(1.4); w.lost.rotation.set(0, 0, 0); wag(w.lostSegs, t, .5, 8); w.lost.position.y = 1.4 + .3 * Math.abs(Math.sin(t * 8)); stand(w, 3.6, 5, -.6); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.pp.position.y = .3 * Math.abs(Math.sin(t * 10)); } },
    { say: 'Giant lizards: cool, cute, or way too wiggly? Comment below.',
      quiz: { q: 'Giant lizards are…', options: ['Cool', 'Cute', 'Way too wiggly'], answer: 'Made up. But real lizards can drop their tails to escape.' },
      show: ['ground', 'lr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [7, 4, 7], look: [0, 1.6, 0], fov: 54, to: { pos: [8.5, 4, 2], look: [0, 1.6, 0] } },
      update: (w, p, t) => { lzAt(w, 0, 0, 0, -.6, 1.1); w.lz.head.rotation.y = .15 * Math.sin(t * 2); wag(w.lz.tailSegs, t, .25, 3); } },
  ],
};

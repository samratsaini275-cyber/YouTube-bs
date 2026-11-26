// Narrative 24: "In This Town… (season 3: cats say it out loud)". Copies 906 (cats say what they think, 1.1K at 13:40): cats openly review dinner.
// Hook: the rule under 2 s; first frame shows a cat at the dinner table holding up a score card, a person waiting with a pan.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#FFE0B0'), [0, 8, -4], w.wall);
  w.table = group(); box(5, .2, 2.6, mat('#FFFFFF'), [0, 2, 0], w.table); for (const x of [-2.2, 2.2]) for (const z of [-1.1, 1.1]) cyl(.08, .08, 2, mat('#7A4E2E'), [x, 1, z], w.table, 6);
  w.plate = cyl(.8, .7, .08, mat('#EEEEEE'), [0, 2.15, 0], undefined, 20);
  w.chick = group(); const ck = ball(.4, mat('#D49A50'), [0, 0, 0], w.chick); ck.scale.set(1.3, .7, 1); cyl(.06, .06, .5, mat('#F5E6C8'), [.5, .05, 0], w.chick, 6).rotation.z = Math.PI / 2;
  w.broc = group(); cyl(.08, .1, .3, mat('#9CCB6A'), [0, .15, 0], w.broc, 6); for (const v of [[0, .4, 0], [-.15, .35, 0], [.15, .35, 0]]) ball(.15, mat('#3E8F3A'), v, w.broc);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.num = group([0, 0, .04], w.card); w.n5 = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, 0], w.num); w.n0 = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, 0], w.num);
  w.pan = group(); cyl(.6, .55, .25, mat('#333333'), [0, 0, 0], w.pan, 16); box(1, .08, .12, mat('#222222'), [.9, .05, 0], w.pan);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.p = person(k, k.scene, '#7C5CC4');
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .55, at.y + 1.05, at.z + .25); w.card.visible = true; w.n5.visible = good; w.n0.visible = !good; };

export default {
  id: '425',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS REVIEW DINNER',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS REVIEW FOOD'],
  title: 'In this town, cats review your dinner',
  description: 'Chicken? Five stars. Broccoli? Zero stars. Your cooking? The cat walks away. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'food', 'shorts'],
  sources: ['Comedy sketch: cat food critics are made up. Quiz fact: cats have roughly 470 taste buds, far fewer than people have (CatWatch newsletter, Cornell Feline Health Center, "The Feline Sense of Taste").'],
  setup,
  scenes: [
    { say: 'In this town, cats review food.', show: ['floor', 'wall', 'table', 'plate', 'card'], sky: '#FFE0B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.5, 10.5], look: [0, 3.3, 0], fov: 50, to: { pos: [0, 3.5, 10], look: [0, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { w.chick.visible = false; w.broc.visible = false; w.pan.visible = false; w.table.position.set(0, 0, -.6); w.plate.position.set(-.2, 2.15, -.2); ctAt(w, -1.1, 2.1, -.6, -.4, .42); holdCard(w, true); w.n5.visible = false; w.n0.visible = false; pAt(w.p, 2.2, 0, .6, -.6, .85); pose(w.p, .2, .9); w.p.head.rotation.x = .2; } },
    { say: 'Chicken? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'table', 'plate', 'chick', 'card'], sky: '#FFE0B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.2, 3.3, 8], look: [-.3, 3, 0], fov: 50, to: { pos: [-.2, 3.3, 7.5], look: [-.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.p.root.visible = false; w.plate.position.set(.3, 2.15, .2); w.chick.position.set(.3, 2.35, .2); ctAt(w, -.9, 2.1, -.2, -.35, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); holdCard(w, p > .4); if (p <= .4) { w.n5.visible = false; w.n0.visible = false; } w.c.head.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'Broccoli? Zero stars.', label: '0 STARS', show: ['floor', 'wall', 'table', 'plate', 'broc', 'card'], sky: '#FFE0B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.2, 3.3, 8], look: [-.3, 3, 0], fov: 50, to: { pos: [-.2, 3.3, 7.5], look: [-.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.chick.visible = false; const f = Math.max(0, (p - .5) * 2.5); w.broc.position.set(.3 + f * 1.4, Math.max(.05, 2.2 - f * f * 2.5), .2); w.broc.rotation.z = -f * 3; ctAt(w, -.9, 2.1, -.2, -.35, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); holdCard(w, false); if (p > .5) { w.card.visible = false; w.c.paw.position.set(1.8, .7, .9); } } },
    { say: 'Your cooking? It walks away.', label: 'BYE', show: ['floor', 'wall', 'table', 'pan'], sky: '#FFE0B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3, 9], look: [.4, 2.4, 0], fov: 52, to: { pos: [.4, 3, 8.5], look: [.4, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.broc.visible = false; w.card.visible = false; w.plate.visible = false; ctAt(w, -.6 - p * 2, 2.1, -.6, Math.PI, .42); w.cr.rotation.y = Math.PI - .2; w.c.head.rotation.y = -.5; pAt(w.p, 1.8, 0, .8, -.5, .85); pose(w.p, .2, 1.2); w.p.mouth.scale.set(1.2, .5, 1); w.p.head.rotation.x = .25; w.p.arms[0].updateWorldMatrix(true, true); w.pan.position.copy(w.p.arms[0].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0))); } },
    { say: 'Cat food critics: fair, funny, or way too picky? Comment below.',
      quiz: { q: 'Cat food critics are…', options: ['Fair', 'Funny', 'Way too picky'], answer: 'Made up. Fun fact: cats have only about 470 taste buds.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.pan.visible = false; w.p.root.visible = false; w.table.visible = false; w.wall.visible = false; ctAt(w, .4, 0, 0, -.6, .7); holdCard(w, true); } },
  ],
};

// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the Christmas tree complains about the cat.
// Hook: the rule under 2 s; first frame shows a Christmas tree with a face next to a cat holding a score card.

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

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#FDEBD0'), [0, 8, -4], w.wall);
  w.tree = group(); cyl(.2, .25, .5, mat('#6E2C00'), [0, .25, 0], w.tree, 8); const grn = mat('#1E8449');
  cone(1.3, 1.4, grn, [0, 1.1, 0], w.tree, 12); cone(1.05, 1.2, grn, [0, 1.9, 0], w.tree, 12); cone(.75, 1, grn, [0, 2.6, 0], w.tree, 12); ball(.18, mat('#F4D03F', { glow: .8 }), [0, 3.15, 0], w.tree);
  w.orns = []; const cols = ['#E74C3C', '#3498DB', '#F1C40F', '#9B59B6', '#E67E22']; for (let i = 0; i < 7; i++) { const a = i * 1.7, y = .9 + (i % 4) * .5; const r = 1.15 - (y - .9) * .4; const o = ball(.12, mat(cols[i % 5], { glow: .4 }), [Math.cos(a) * r, y, Math.sin(a) * r + .1], w.tree); w.orns.push(o); }
  w.f = face(k, w.tree, [0, 1.2, 1.12], .45);
  w.drop = ball(.14, mat('#E74C3C', { glow: .4 }), [0, 0, 0], k.scene);
  w.sign = group(); box(.05, 1, .05, mat('#6E2C00'), [0, .5, 0], w.sign); box(.9, .55, .05, mat('#FFFFFF'), [0, 1.1, 0], w.sign); box(.6, .1, .06, mat('#E74C3C'), [0, 1.1, .01], w.sign).rotation.z = .6; box(.6, .1, .06, mat('#E74C3C'), [0, 1.1, .01], w.sign).rotation.z = -.6;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const treeOn = (w) => { w.tree.position.set(-.6, 0, -.6); w.orns.forEach(o => o.visible = true); };

export default {
  id: '458',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TREES COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'TREES COMPLAIN'],
  title: 'In this town, Christmas trees complain to cats',
  description: 'Climbed? Every December. The baubles? Batted off. Five stars, says the cat. So the tree puts up a no-cats sign. The cat sits under it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'christmastree', 'shorts'],
  sources: ['Comedy sketch: complaining Christmas trees are made up. Quiz fact: in a study of 44 pet cats whose owners recorded which paw they stepped out with, individual cats often had a favourite paw; males with a preference mostly favoured the left paw and females the right (McDowell, Wells & Hepper, Animal Behaviour, 2018; reported by The Guardian, "Paw choice? Cats show right and left-hand preferences", 2018).'],
  setup,
  scenes: [
    { say: 'In this town, trees complain.', show: ['floor', 'wall', 'tree', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 7.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.7, 7], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { treeOn(w); w.drop.visible = false; w.sign.visible = false; talk(w.f, t); brow(w.f, .4); ctAt(w, .9, 0, .5, -.8, .34); holdCard(w, null); } },
    { say: 'Climbed? Every December.', label: 'CLIMBED', show: ['floor', 'wall', 'tree'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 7.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.7, 7], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.drop.visible = false; w.sign.visible = false; treeOn(w); w.tree.rotation.z = .05 * Math.sin(t * 8); talk(w.f, t); brow(w.f, .55); const up = Math.min(1, p * 1.8); ctAt(w, -.3, .3 + up * 1.4, .2, -.3, .28); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'The baubles? Batted off.', label: '5 STARS', show: ['floor', 'wall', 'tree', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 7.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.7, 7], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.sign.visible = false; treeOn(w); w.tree.rotation.z = 0; w.orns[0].visible = false; talk(w.f, t); brow(w.f, -.3); ctAt(w, .9, 0, .5, -2.3, .34); const k1 = Math.min(1, p * 2.5); w.drop.visible = true; w.drop.position.set(.4 + k1 * .3, .9 - Math.min(.76, k1 * k1 * .9), .7 + k1 * .3); if (p < .45) { w.card.visible = false; w.c.paw.position.set(1.4, 1 + .3 * Math.abs(Math.sin(t * 12)), .9); } else { w.cr.rotation.y = -.8; holdCard(w, true); } } },
    { say: 'So the tree? Puts up a no cats sign.', label: 'NICE TRY', show: ['floor', 'wall', 'tree', 'sign'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 7.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.7, 7], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.drop.visible = false; treeOn(w); w.orns[0].visible = false; w.sign.position.set(.8, 0, .6); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .5); const s = p > .5; ctAt(w, s ? .7 : 2, 0, .9, -.6, .34); if (s) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Christmas tree or cat tree? Comment below.',
      quiz: { q: 'Christmas tree or cat tree?', options: ['Christmas tree', 'Cat tree', 'Same thing'], answer: 'Made up. But in one study, male cats mostly led with the left paw, females the right.' },
      show: ['floor', 'tree', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2, 8], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 2, 8], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.drop.visible = false; w.sign.visible = false; treeOn(w); talk(w.f, t, false); ctAt(w, .9, 0, .5, -.8, .36); holdCard(w, true); } },
  ],
};

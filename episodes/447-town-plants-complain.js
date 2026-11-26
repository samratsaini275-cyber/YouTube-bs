// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the houseplant complains about the cat.
// Hook: the rule under 2 s; first frame shows a potted plant with a face on its pot next to a cat holding a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FADBD8'), [0, 8, -4], w.wall);
  w.plant = group(); cyl(.6, .45, 1, mat('#D35400'), [0, .5, 0], w.plant, 20); cyl(.55, .55, .05, mat('#5D4037'), [0, 1, 0], w.plant, 20);
  w.leaves = []; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; const l = ball(.35, mat('#27AE60'), [Math.cos(a) * .45, 1.5 + (i % 3) * .3, Math.sin(a) * .45], w.plant); l.scale.set(.6, 1.3, .25); l.rotation.set(Math.sin(a) * .5, a, Math.cos(a) * .5); w.leaves.push(l); }
  cyl(.05, .05, 1, mat('#1E8449'), [0, 1.5, 0], w.plant, 6);
  w.f = face(k, w.plant, [0, .55, .56], .55);
  w.shelf = group(); box(2.4, .12, 1, mat('#8D6E63'), [0, 0, 0], w.shelf);
  w.rope = group(); for (const x of [-.5, .5]) cyl(.02, .02, 3, mat('#BDC3C7'), [x, 1.5, 0], w.rope, 4);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const plantAt = (w, x, y, z, rz = 0) => { w.plant.position.set(x, y, z); w.plant.rotation.set(0, 0, rz); w.plant.scale.setScalar(.8); w.leaves.forEach(l => l.visible = true); };

export default {
  id: '447',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PLANTS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'PLANTS COMPLAIN'],
  title: 'In this town, houseplants complain to cats',
  description: 'Leaves? Nibbled. The pot? Pushed off the shelf. So the plant moves to the ceiling. The cat just stares. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'plants', 'shorts'],
  sources: ['Comedy sketch: complaining plants are made up. Quiz fact: cats\' sense of smell is vastly better than that of humans: they have about 200 million odour sensors compared with humans\' 5 million (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, plants complain.', show: ['floor', 'wall', 'plant', 'card'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 7], look: [0, .85, 0], fov: 50, to: { pos: [0, 1.5, 6.5], look: [0, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.rope.visible = false; w.shelf.visible = false; plantAt(w, -.8, 0, 0); talk(w.f, t); brow(w.f, .4); ctAt(w, .9, 0, .4, -.7, .36); holdCard(w, null); } },
    { say: 'Leaves? Nibbled.', label: 'NIBBLE', show: ['floor', 'wall', 'plant'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 7], look: [0, .85, 0], fov: 50, to: { pos: [0, 1.5, 6.5], look: [0, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.rope.visible = false; w.shelf.visible = false; plantAt(w, -.8, 0, 0); w.leaves[0].visible = p < .4; w.leaves[3].visible = p < .7; talk(w.f, t); brow(w.f, .55); ctAt(w, .25, 0, .3, Math.PI * .95, .36); w.c.head.rotation.z = .2 + .1 * Math.sin(t * 12); w.c.eyes.forEach(e => e.scale.y = .3); } },
    { say: 'The pot? Pushed off the shelf.', label: 'OOPS', show: ['floor', 'wall', 'plant', 'shelf', 'card'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 7.5], look: [0, 2.1, 0], fov: 50, to: { pos: [0, 2.6, 7], look: [0, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.rope.visible = false; w.shelf.position.set(0, 1.8, -.3); const k1 = Math.min(1, Math.max(0, (p - .2) * 3)); const fall = Math.max(0, k1 - .4) / .6; plantAt(w, -.7 - k1 * .5, 1.86 - fall * fall * 1.86, -.3, fall * 1.5); talk(w.f, t, p > .2); brow(w.f, -.4); ctAt(w, .5, 1.86, -.3, Math.PI * .95, .32); if (p < .5) { w.card.visible = false; w.c.paw.position.set(1.3 + k1 * .4, .5, .4); } else { w.cr.rotation.y = -.5; holdCard(w, true); } } },
    { say: 'So the plant? Moves to the ceiling.', label: 'NICE TRY', show: ['floor', 'wall', 'plant', 'rope', 'card'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8], look: [0, 1.75, 0], fov: 52, to: { pos: [0, 2, 7.5], look: [0, 1.75, 0], fov: 50 } },
      update: (w, p, t) => { w.shelf.visible = false; plantAt(w, -.4, 2.8 + .05 * Math.sin(t * 2), 0); w.rope.position.set(-.4, 3.2, 0); talk(w.f, t, p < .45); brow(w.f, -.2); ctAt(w, .5, 0, .5, -.6, .36); w.c.head.rotation.z = .5; if (p > .5) holdCard(w, false); else w.card.visible = false; } },
    { say: 'Plant or cat: who wins? Comment below.',
      quiz: { q: 'Who wins?', options: ['The plant', 'The cat', 'The ceiling'], answer: 'Made up. But cats have about 200 million smell sensors. People have 5 million.' },
      show: ['floor', 'plant', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 1.6, 7.5], look: [0, .9, 0], fov: 54, to: { pos: [-2, 1.6, 7.5], look: [0, .9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.rope.visible = false; w.shelf.visible = false; plantAt(w, -.8, 0, 0); talk(w.f, t, false); brow(w.f, .3); ctAt(w, .9, 0, .4, -.7, .38); holdCard(w, true); } },
  ],
};

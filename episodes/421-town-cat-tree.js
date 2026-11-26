// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a cat tree that runs its floors like a hotel.
// Hook: the rule under 2 s; first frame shows a cat tree with a face on its base and a cat on the top platform.

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#CDE4F2'), [0, 8, -4], w.wall);
  w.tree = group(); box(2.4, 1.4, 2, mat('#B8A0D8'), [0, .7, 0], w.tree); cyl(.25, .25, 3.2, mat('#D8C08A', { rough: 1 }), [-.5, 3, 0], w.tree, 12); cyl(.25, .25, 1.8, mat('#D8C08A', { rough: 1 }), [.6, 2.3, 0], w.tree, 12); box(1.6, .2, 1.4, mat('#B8A0D8'), [.6, 3.3, 0], w.tree); box(2, .2, 1.6, mat('#B8A0D8'), [-.5, 4.7, 0], w.tree);
  w.tf = face(k, w.tree, [0, .75, 1.02], .75);
  w.box = group(); box(1.8, 1.2, 1.6, mat('#C9965A'), [0, .6, 0], w.box);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.c2 = cat(k, k.scene); w.c2r = w.c2.root; w.c2r.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = k.mat('#2A2A2A', { rough: .85 }); });
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '421',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT TREE TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CAT TREES TALK'],
  title: 'In this town, cat trees can talk',
  description: 'The top floor? Costs extra. Two cats, one perch? It referees. Nobody home? It gets lonely. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking cat trees are made up. Quiz fact: cats often seek out high spots, especially when stressed, because being up high helps them feel safe and secure (PetMD, "Why Do Cats Like High Places?").'],
  setup,
  scenes: [
    { say: 'In this town, cat trees talk.', show: ['floor', 'wall', 'tree', 'cr'], sky: '#CDE4F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.2, 11], look: [0, 2.9, 0], fov: 52, to: { pos: [.2, 3.2, 10.4], look: [0, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { w.c2r.visible = false; w.box.visible = false; talk(w.tf, t); brow(w.tf, -.2); ctAt(w.c, -.2, 4.8, 0, -.4, .38); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); } },
    { say: 'The top floor? Costs extra.', label: 'VIP', show: ['floor', 'wall', 'tree', 'cr'], sky: '#CDE4F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 11], look: [0, 3.1, 0], fov: 52, to: { pos: [.2, 3.6, 10.5], look: [0, 3.1, 0], fov: 50 } },
      update: (w, p, t) => { const q = Math.min(1, p * 1.6); ctAt(w.c, .9 - q * 1.1, q < .5 ? 3.4 : 4.8, 0, -.4, .38); talk(w.tf, t, p > .3); brow(w.tf, .3); } },
    { say: 'Two cats, one perch? It referees.', label: 'SHARE!', show: ['floor', 'wall', 'tree', 'cr', 'c2r'], sky: '#CDE4F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 10], look: [0, 3.3, 0], fov: 52, to: { pos: [.2, 3.6, 9.5], look: [0, 3.3, 0], fov: 50 } },
      update: (w, p, t) => { const push = .12 * Math.sin(t * 8); ctAt(w.c, -.9 + push, 4.8, 0, -.3, .33); ctAt(w.c2, .35 + push, 4.8, 0, Math.PI + .3, .33); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); w.c2.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); talk(w.tf, t); brow(w.tf, .5); w.tree.rotation.z = .02 * Math.sin(t * 8); } },
    { say: 'Nobody home? It gets lonely.', label: 'SIGH', show: ['floor', 'wall', 'tree', 'box', 'cr', 'c2r'], sky: '#CDE4F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.8, 2.2, 11], look: [.8, 1.55, 0], fov: 52, to: { pos: [.8, 2.2, 10.5], look: [.8, 1.55, 0], fov: 50 } },
      update: (w, p, t) => { w.tree.rotation.z = 0; w.tree.position.set(-1, 0, 0); w.box.position.set(2.4, 0, .4); ctAt(w.c, 2.1, .7, .4, -.4, .3); ctAt(w.c2, 2.8, .7, .5, -.6, .3); w.c.eyes.forEach(e => e.scale.y = .12); w.c2.eyes.forEach(e => e.scale.y = .12); talk(w.tf, t, false); w.tf.mouth.rotation.z = .3; brow(w.tf, .5); w.tf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .6; }); } },
    { say: 'Talking cat tree: fair, funny, or way too bossy? Comment below.',
      quiz: { q: 'The talking cat tree is…', options: ['Fair', 'Funny', 'Way too bossy'], answer: 'Made up. But real cats like high spots because they feel safer up there.' },
      show: ['floor', 'tree', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3.4, 10], look: [0, 2.8, 0], fov: 54, to: { pos: [-2, 3.4, 10], look: [0, 2.8, 0] } },
      update: (w, p, t) => { w.box.visible = false; w.c2r.visible = false; w.wall.visible = false; w.tree.position.set(0, 0, 0); w.tf.mouth.rotation.z = 0; w.tf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); ctAt(w.c, -.2, 4.8, 0, -.4, .38); talk(w.tf, t, Math.sin(t * 2) > 0); brow(w.tf, .2); } },
  ],
};

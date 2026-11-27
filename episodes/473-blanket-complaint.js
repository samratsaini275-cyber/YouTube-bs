// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: a folded blanket complains about the cat.
// Hook: "This blanket has a complaint." under 2 s; first frame shows a folded blanket with a grumpy face and a cat holding a score card.

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
  const { mat, box, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FEF9E7'), [0, 8, -4], w.wall);
  w.bl = group(); for (let i = 0; i < 4; i++) box(1.6, .14, 1.1, mat(i % 2 ? '#2874A6' : '#5DADE2', { rough: .95 }), [0, .07 + i * .14, 0], w.bl);
  w.f = face(k, w.bl, [0, .3, .56], .4);
  w.lump = group(); const lb = ball(.7, mat('#5DADE2', { rough: .95 }), [0, 0, 0], w.lump); lb.scale.set(1.5, .55, 1); const sheet = box(3, .03, 2, mat('#2874A6', { rough: .95 }), [0, -.3, 0], w.lump);
  w.fur = group([0, 0, 0], w.bl); for (let i = 0; i < 10; i++) { const t = ball(.06, mat('#F2A04A'), [(Math.random() - .5) * 1.3, .58, (Math.random() - .5) * .9], w.fur); t.scale.y = .4; }
  w.closet = group(); k.box(2, 3, 1, mat('#A04000'), [0, 1.5, 0], w.closet); k.box(1.7, 2.6, .05, mat('#3B2316'), [0, 1.5, .5], w.closet);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const blOn = (w) => { w.bl.position.set(-.5, 0, .3); w.bl.rotation.set(0, .2, 0); w.bl.visible = true; };

export default {
  id: '473',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BLANKET',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS BLANKET', 'HAS A COMPLAINT'],
  title: 'This blanket has a complaint',
  description: 'Burrowed under? All day. Fur? Woven right in. And the cat? Five stars. So the blanket hid in the closet. The cat napped in the closet. (A made-up comedy sketch.)',
  tags: ['funny', 'blanket', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining blankets are made up. Quiz fact: the resting breathing rate of a cat is about 16 to 40 breaths per minute (Merck Veterinary Manual, "Resting Respiratory Rates" table).'],
  setup,
  scenes: [
    { say: 'This blanket has a complaint.', show: ['floor', 'wall', 'bl', 'card'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 5.5], look: [0, .6, 0], fov: 50, to: { pos: [0, 1.3, 5.1], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { blOn(w); w.lump.visible = false; w.fur.visible = false; w.closet.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .65, 0, -.2, -.9, .3); holdCard(w, null); } },
    { say: 'Burrowed under? All day.', label: 'LUMP', show: ['floor', 'wall', 'lump'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 5.5], look: [0, .5, 0], fov: 50, to: { pos: [0, 1.6, 5.1], look: [0, .5, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.bl.visible = false; w.cr.visible = false; w.lump.position.set(Math.sin(t * 1.5) * .4, .35, 0); w.lump.scale.set(1, 1 + .06 * Math.sin(t * 3), 1); } },
    { say: 'Fur? Woven right in.', label: 'FURRY', show: ['floor', 'wall', 'bl'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 5], look: [0, .5, 0], fov: 50, to: { pos: [0, 1.5, 4.6], look: [0, .5, 0], fov: 48 } },
      update: (w, p, t) => { blOn(w); w.lump.visible = false; w.fur.visible = true; w.fur.children.forEach((c, i) => c.visible = i < 2 + p * 12); talk(w.f, t); brow(w.f, .55); ctAt(w, .7, 0, -.3, -2.4, .3); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'bl', 'card'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 5.5], look: [0, .6, 0], fov: 50, to: { pos: [0, 1.3, 5.1], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { blOn(w); w.lump.visible = false; w.fur.visible = true; talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .65, 0, -.2, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the blanket hid in the closet. The cat napped in the closet.', label: 'FOUND IT', show: ['floor', 'wall', 'bl', 'closet'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 6.1], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.lump.visible = false; w.fur.visible = false; w.closet.position.set(-.3, 0, -1.2); w.bl.position.set(-.3, .25, -.85); w.bl.rotation.set(0, 0, 0); w.bl.scale.setScalar(.8); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .5); const s = p > .5; ctAt(w, s ? -.3 : 1.6, s ? .82 : 0, s ? -.85 : .4, -.4, .28); if (s) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } } },
    { say: 'Grumpy blanket: wash it, fold it, or give it to the cat? Comment below.',
      quiz: { q: 'What do you do with the grumpy blanket?', options: ['Wash it', 'Fold it', 'Give it to the cat'], answer: 'Fun fact: a resting cat takes about 16 to 40 breaths a minute.' },
      show: ['floor', 'bl', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.3, 5.5], look: [0, .6, 0], fov: 54, to: { pos: [-2, 1.3, 5.5], look: [0, .6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.closet.visible = false; w.lump.visible = false; w.bl.scale.setScalar(1); blOn(w); talk(w.f, t, false); ctAt(w, .65, 0, -.2, -.9, .32); holdCard(w, true); } },
  ],
};

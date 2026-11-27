// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the toilet roll complains about the cat.
// Hook: "This toilet roll has a complaint." under 2 s; first frame shows a toilet roll on its holder with a grumpy face and a cat holding a score card.

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
  w.floor = k.ground('#D5DBDB', 0);
  w.wall = group(); box(40, 16, .3, mat('#D6EAF8'), [0, 8, -1.5], w.wall); for (let i = 0; i < 8; i++) box(.02, 16, .02, mat('#AED6F1'), [-3.5 + i, 8, -1.34], w.wall);
  w.holder = group(); cyl(.04, .04, .9, mat('#BDC3C7', { rough: .3 }), [0, 0, 0], w.holder, 8).rotation.z = Math.PI / 2; box(.06, .06, .3, mat('#BDC3C7'), [-.45, 0, -.15], w.holder);
  w.roll = group(); cyl(.42, .42, .7, mat('#FDFEFE'), [0, 0, 0], w.roll, 24).rotation.z = Math.PI / 2; cyl(.12, .12, .72, mat('#A04000'), [0, 0, 0], w.roll, 12).rotation.z = Math.PI / 2;
  w.f = face(k, w.roll, [0, .02, .43], .32);
  w.strip = group(); w.stripM = box(.66, 1, .01, mat('#FDFEFE'), [0, -.5, 0], w.strip);
  w.pile = group(); for (let i = 0; i < 8; i++) { const s = box(.66, .02, .6, mat('#FDFEFE'), [(Math.random() - .5) * 1.2, .02 + i * .03, (Math.random() - .5) * .8], w.pile); s.rotation.y = Math.random() * 3; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const rollOn = (w, len = 0, s = 1) => { w.holder.position.set(-.5, 1.15, -1.2); w.roll.position.set(-.5, 1.15, -1.05); w.roll.scale.set(1, s, s); w.strip.position.set(-.5, 1.15 - .4 * s, -.62); w.stripM.scale.y = Math.max(.05, len); w.stripM.position.y = -.5 * Math.max(.05, len); w.strip.visible = len > .02; };

export default {
  id: '468',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TOILET ROLL',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TOILET ROLL', 'HAS A COMPLAINT'],
  title: 'This toilet roll has a complaint',
  description: 'One little pull? The cat unrolls everything. A paper mountain on the floor. And the cat? Five stars. So the roll hid on the top shelf. The cat found it. (A made-up comedy sketch.)',
  tags: ['funny', 'toiletpaper', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining toilet rolls are made up. Quiz fact: colour perception is not highly developed in cats, probably because detecting a prey animal\'s movements matters more to them than seeing its colours (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'This toilet roll has a complaint.', show: ['floor', 'wall', 'holder', 'roll', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 5.5], look: [0, 1.4, -.5], fov: 50, to: { pos: [0, 1.5, 5.1], look: [0, 1.4, -.5], fov: 48 } },
      update: (w, p, t) => { rollOn(w); w.pile.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .6, 0, -.3, -1.1, .32); holdCard(w, null); } },
    { say: 'One little pull? Everything unrolls.', label: 'SPIN', show: ['floor', 'wall', 'holder', 'roll', 'strip'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 5.5], look: [0, .95, -.5], fov: 50, to: { pos: [0, 1.5, 5.1], look: [0, .95, -.5], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.pile.visible = false; rollOn(w, Math.min(1.1, p * 2), 1 - p * .3); w.roll.rotation.x = t * 12; talk(w.f, t); brow(w.f, -.4); ctAt(w, .55, 0, -.5, Math.PI * .85, .3); w.c.paw.position.set(1.4, 1.3 + .3 * Math.sin(t * 14), .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); } },
    { say: 'A paper mountain on the floor.', label: 'OOPS', show: ['floor', 'wall', 'holder', 'roll', 'strip', 'pile'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 5.5], look: [0, .9, -.5], fov: 50, to: { pos: [0, 1.6, 5.1], look: [0, .9, -.5], fov: 48 } },
      update: (w, p, t) => { rollOn(w, 1.1, .6); w.roll.rotation.x = 0; w.pile.position.set(-.3, 0, -.4); talk(w.f, t); brow(w.f, .55); ctAt(w, .2, .25, -.3, -.6, .32); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'holder', 'roll', 'strip', 'pile', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 5.5], look: [0, .95, -.5], fov: 50, to: { pos: [0, 1.5, 5.1], look: [0, .95, -.5], fov: 48 } },
      update: (w, p, t) => { rollOn(w, 1.1, .6); w.pile.position.set(-.3, 0, -.4); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .6, 0, -.3, -1.1, .32); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the roll hid on the top shelf. The cat found it.', label: 'FOUND IT', show: ['floor', 'wall', 'roll'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6], look: [0, 1.9, -.5], fov: 50, to: { pos: [0, 2.2, 5.6], look: [0, 1.9, -.5], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.pile.visible = false; w.holder.visible = false; w.strip.visible = false; w.roll.scale.set(1, .8, .8); w.roll.position.set(-.5, 2.6, -1); w.roll.rotation.x = 0; talk(w.f, t, p < .5); brow(w.f, p < .5 ? -.2 : -.5); const up = Math.max(0, Math.min(1, (p - .4) * 2.5)); ctAt(w, .4, up < 1 ? Math.sin(up * Math.PI) * 2.4 + up * 2.2 : 2.2, -.9, -.6, .26); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'Grumpy toilet roll: hide it, guard it, or buy more? Comment below.',
      quiz: { q: 'What do you do with the grumpy toilet roll?', options: ['Hide it', 'Guard it', 'Buy more'], answer: 'Fun fact: cats do not see colours very well. Movement matters more to them.' },
      show: ['floor', 'holder', 'roll', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.5, 5.5], look: [0, 1.2, -.5], fov: 54, to: { pos: [-2, 1.5, 5.5], look: [0, 1.2, -.5] } },
      update: (w, p, t) => { w.wall.visible = false; w.pile.visible = false; rollOn(w); talk(w.f, t, false); ctAt(w, .6, 0, -.3, -1.1, .34); holdCard(w, true); } },
  ],
};

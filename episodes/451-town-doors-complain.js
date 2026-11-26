// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the door complains about the cat.
// Hook: the rule under 2 s; first frame shows a door with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#D5F5E3'), [0, 8, -1.2], w.wall);
  w.frame = group(); for (const [x, y, ww, hh] of [[-1.05, 1.7, .15, 3.4], [1.05, 1.7, .15, 3.4], [0, 3.45, 2.25, .15]]) box(ww, hh, .3, mat('#FFFFFF'), [x, y, 0], w.frame);
  w.outside = box(2, 3.3, .02, mat('#82E0AA', { glow: .3 }), [0, 1.65, -.1], w.frame);
  w.hinge = group([-1, 0, 0], k.scene); w.door = group([1, 0, 0], w.hinge); box(1.95, 3.3, .1, mat('#B9770E'), [0, 1.65, 0], w.door); cyl(.07, .07, .1, mat('#F4D03F'), [.75, 1.6, .08], w.door, 10);
  w.f = face(k, w.door, [0, 1.3, .07], .6);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const doorAt = (w, open) => { w.frame.position.set(-.4, 0, -1); w.hinge.position.set(-1.45, 0, -.95); w.hinge.rotation.y = -open * 1.3; };

export default {
  id: '451',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DOORS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'DOORS COMPLAIN'],
  title: 'In this town, doors complain to cats',
  description: 'Open? The cat stays in. Closed? Meow, meow, meow. So the door stays half open. The cat sits in the gap. Perfect. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'door', 'shorts'],
  sources: ['Comedy sketch: complaining doors are made up. Quiz fact: cats held special status in ancient Egypt, and thousands of cat mummies have been discovered there (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, doors complain.', show: ['floor', 'wall', 'frame', 'hinge', 'card'], sky: '#D5F5E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { doorAt(w, 0); talk(w.f, t); brow(w.f, .4); ctAt(w, 1.2, 0, .3, -.9, .36); holdCard(w, null); } },
    { say: 'Open? The cat stays in.', label: 'NOPE', show: ['floor', 'wall', 'frame', 'hinge'], sky: '#D5F5E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; doorAt(w, Math.min(1, p * 3) * .9); talk(w.f, t); brow(w.f, .5); ctAt(w, 1.1, 0, .3, -.4, .36); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Closed? Meow, meow, meow.', label: 'LET ME OUT', show: ['floor', 'wall', 'frame', 'hinge'], sky: '#D5F5E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { doorAt(w, 0); talk(w.f, t, false); brow(w.f, -.4); ctAt(w, .2, 0, -.2, Math.PI * .6, .36); w.c.paw.position.set(1.3, 1.4 + .4 * Math.abs(Math.sin(t * 8)), .9); w.c.head.rotation.z = .4; } },
    { say: 'So the door? Stays half open.', label: 'PERFECT', show: ['floor', 'wall', 'frame', 'hinge', 'card'], sky: '#D5F5E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { doorAt(w, .45); talk(w.f, t, p < .4); brow(w.f, -.3); ctAt(w, .55, 0, -.75, -.5, .36); w.c.eyes.forEach(e => e.scale.y = p > .5 ? 1 : .2); if (p > .5) holdCard(w, true); else w.card.visible = false; } },
    { say: 'Cats and doors: in or out? Comment below.',
      quiz: { q: 'In or out?', options: ['In', 'Out', 'Both, forever'], answer: 'Made up. But thousands of cat mummies have been found in ancient Egypt.' },
      show: ['floor', 'frame', 'hinge', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.3, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.3, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.wall.visible = false; doorAt(w, .45); talk(w.f, t, false); brow(w.f, .2); ctAt(w, .55, 0, -.75, -.5, .38); holdCard(w, true); } },
  ],
};

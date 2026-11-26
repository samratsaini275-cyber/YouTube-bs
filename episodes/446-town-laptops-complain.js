// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the laptop complains about the cat.
// Hook: the rule under 2 s; first frame shows a laptop with a face on its screen next to a cat holding a score card.

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
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#D4E6F1'), [0, 8, -4], w.wall);
  w.desk = group(); box(4.4, .15, 2, mat('#A0522D'), [0, 1.9, 0], w.desk); for (const x of [-2, 2]) for (const z of [-.85, .85]) box(.12, 1.9, .12, mat('#6E3B1F'), [x, .95, z], w.desk);
  w.lap = group(); box(1.8, .08, 1.2, mat('#AAB7B8'), [0, .04, 0], w.lap); for (let r = 0; r < 4; r++) for (let q = 0; q < 9; q++) box(.14, .03, .14, mat('#2C3E50'), [-.72 + q * .18, .09, -.25 + r * .18], w.lap);
  w.scr = group([0, .05, -.6], w.lap); box(1.8, 1.2, .06, mat('#AAB7B8'), [0, .6, 0], w.scr); box(1.66, 1.06, .02, mat('#85C1E9', { glow: .5 }), [0, .6, .04], w.scr); w.scr.rotation.x = -.2;
  w.f = face(k, w.scr, [0, .62, .06], .9);
  w.mini = group(); cyl(.5, .5, .15, mat('#AF7AC5'), [0, .08, 0], w.mini, 20); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; k.ball(.12, mat('#D2B4DE'), [Math.cos(a) * .45, .18, Math.sin(a) * .45], w.mini); }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const deskOn = (w) => { w.desk.position.set(0, 0, -.6); w.lap.position.set(-.5, 1.98, -.5); w.lap.scale.setScalar(1.35); };

export default {
  id: '446',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LAPTOPS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'LAPTOPS COMPLAIN'],
  title: 'In this town, laptops complain to cats',
  description: 'Sat on? Every morning. Warm, though, says the cat. Five stars. So the laptop gets a tiny cat bed. The cat ignores it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'laptop', 'shorts'],
  sources: ['Comedy sketch: complaining laptops are made up. Quiz fact: meowing is mainly a human-directed vocalization in domestic cats (Prato-Previde et al., "What\'s in a Meow? A Study on Human Classification and Interpretation of Domestic Cat Vocalizations", Animals, 2020).'],
  setup,
  scenes: [
    { say: 'In this town, laptops complain.', show: ['floor', 'wall', 'desk', 'lap', 'card'], sky: '#D4E6F1', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 3.5, 8], look: [.5, 3.35, 0], fov: 50, to: { pos: [.5, 3.5, 7.5], look: [.5, 3.35, 0], fov: 48 } },
      update: (w, p, t) => { deskOn(w); talk(w.f, t); brow(w.f, .4); ctAt(w, 1.3, 1.98, -.3, -.7, .32); holdCard(w, null); } },
    { say: 'Sat on? Every morning.', label: 'SQUISH', show: ['floor', 'wall', 'desk', 'lap'], sky: '#D4E6F1', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 7], look: [.2, 2.9, 0], fov: 50, to: { pos: [.2, 3.6, 6.5], look: [.2, 2.9, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; deskOn(w); talk(w.f, t); brow(w.f, .55); ctAt(w, -.2, 2.08, .1, -.3, .3); w.c.body.scale.set(1.6, .8, 1.2); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'Warm, though. Five stars.', label: '5 STARS', show: ['floor', 'wall', 'desk', 'lap', 'card'], sky: '#D4E6F1', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 7], look: [.2, 2.9, 0], fov: 50, to: { pos: [.2, 3.6, 6.5], look: [.2, 2.9, 0], fov: 48 } },
      update: (w, p, t) => { deskOn(w); talk(w.f, t, false); brow(w.f, -.3); w.c.head.position.y = 2.4; ctAt(w, -.2, 2.08, .1, -.3, .3); w.c.body.scale.set(1.5, .85, 1.15); if (p > .35) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the laptop? Gets a tiny cat bed.', label: 'IGNORED', show: ['floor', 'wall', 'desk', 'lap', 'mini'], sky: '#D4E6F1', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 7], look: [.2, 2.9, 0], fov: 50, to: { pos: [.2, 3.6, 6.5], look: [.2, 2.9, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; deskOn(w); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .55); w.mini.position.set(1.5, 1.98, -.2); ctAt(w, -.2, 2.08, .1, -.3, .3); w.c.body.scale.set(1.6, .8, 1.2); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'Laptop or cat bed? Comment below.',
      quiz: { q: 'Where should the cat sleep?', options: ['The laptop', 'The tiny bed', 'Your keyboard'], answer: 'Made up. But real adult cats meow mostly at people, not at other cats.' },
      show: ['floor', 'desk', 'lap', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 3, 8], look: [0, 2.6, 0], fov: 54, to: { pos: [-2, 3, 8], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.mini.visible = false; w.c.head.position.y = 2.4; deskOn(w); talk(w.f, t, false); brow(w.f, .3); ctAt(w, 1.5, 1.98, -.3, -.7, .32); holdCard(w, true); } },
  ],
};

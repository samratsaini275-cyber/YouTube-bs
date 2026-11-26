// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the vacuum cleaner complains about the cat.
// Hook: the rule under 2 s; first frame shows an upright vacuum with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#E8DAEF'), [0, 8, -4], w.wall);
  w.vac = group(); box(1.2, .35, .8, mat('#7D3C98'), [0, .18, 0], w.vac); box(.8, 1.6, .6, mat('#A569BD'), [0, 1.1, -.05], w.vac); cyl(.06, .06, 1.4, mat('#5B2C6F'), [0, 2.5, -.1], w.vac, 8); box(.5, .1, .1, mat('#5B2C6F'), [0, 3.2, -.1], w.vac);
  w.f = face(k, w.vac, [0, 1.25, .26], .55);
  w.robot = group(); cyl(.7, .7, .22, mat('#2C3E50'), [0, .11, 0], w.robot, 24); cyl(.15, .15, .05, mat('#58D68D', { glow: .6 }), [0, .24, .3], w.robot, 12);
  w.lines = group(); for (let i = 0; i < 3; i++) box(.5, .04, .04, mat('#FFFFFF', { glow: .5 }), [0, i * .25, 0], w.lines);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '450',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'VACUUMS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'VACUUMS COMPLAIN'],
  title: 'In this town, vacuums complain to cats',
  description: 'Switched on? The cat runs. The robot one? Used as a taxi. So the vacuum tries whispering. Still a no. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'vacuum', 'shorts'],
  sources: ['Comedy sketch: complaining vacuums are made up. Quiz fact: the gestation period of the domestic cat is about 65 days (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, vacuums complain.', show: ['floor', 'wall', 'vac', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.9, 8], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 1.9, 7.5], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.vac.position.set(-.9, 0, -.2); w.robot.visible = false; w.lines.visible = false; talk(w.f, t); brow(w.f, .4); ctAt(w, .9, 0, .4, -.8, .36); holdCard(w, null); } },
    { say: 'Switched on? The cat runs.', label: 'ZOOM', show: ['floor', 'wall', 'vac'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 8], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.8, 7.5], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.robot.visible = false; w.vac.position.set(-.9, 0, -.2); w.vac.position.x += .03 * Math.sin(t * 40); talk(w.f, t); brow(w.f, -.3); const run = Math.max(0, (p - .3) / .7); ctAt(w, .9 + run * 3, .1 * Math.abs(Math.sin(t * 16)), .4, 0, .36); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); w.lines.visible = run > 0; w.lines.position.set(.4 + run * 3, .5, .4); } },
    { say: 'The robot one? Used as a taxi.', label: '5 STARS', show: ['floor', 'wall', 'robot', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.vac.visible = false; w.lines.visible = false; const x = -1 + p * 2; w.robot.position.set(x, 0, .2); w.robot.rotation.y = t; ctAt(w, x, .22, .2, -.4, .34); w.c.eyes.forEach(e => e.scale.y = .3); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the vacuum? Tries whispering.', label: 'STILL NO', show: ['floor', 'wall', 'vac', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 8], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.8, 7.5], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.robot.visible = false; w.lines.visible = false; w.vac.position.set(-.9, 0, -.2); w.f.mouth.scale.set(.4, 1 + .5 * Math.abs(Math.sin(t * 8)), 1); brow(w.f, -.5); const back = p > .5; ctAt(w, back ? 1.5 : 1, 0, .4, back ? -2.4 : -.8, .36); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .45); if (back) holdCard(w, false); else w.card.visible = false; } },
    { say: 'Vacuum or cat: who is right? Comment below.',
      quiz: { q: 'Who is right?', options: ['The vacuum', 'The cat', 'The robot taxi'], answer: 'Made up. But a real cat pregnancy lasts about 65 days.' },
      show: ['floor', 'vac', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 1.8, 8], look: [0, 1.2, 0], fov: 54, to: { pos: [-2, 1.8, 8], look: [0, 1.2, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.robot.visible = false; w.lines.visible = false; w.f.mouth.scale.set(1, 1, 1); w.vac.position.set(-.9, 0, -.2); brow(w.f, .3); ctAt(w, .9, 0, .4, -.8, .38); holdCard(w, true); } },
  ],
};

// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: a toy ball complains about the cat.
// Hook: the rule under 2 s; first frame shows a ball with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#FADBD8'), [0, 8, -4], w.wall);
  w.bl = group(); w.bb = ball(.42, mat('#E74C3C'), [0, 0, 0], w.bl); box(.86, .08, .1, mat('#F7DC6F'), [0, 0, .38], w.bl);
  w.f = face(k, w.bl, [0, .08, .4], .3);
  w.sofa = group(); box(3.4, .55, 1.6, mat('#2E86C1'), [0, .55, 0], w.sofa); box(3.4, 1.2, .4, mat('#21618C'), [0, 1.3, -.6], w.sofa); for (const x of [-1.5, 1.5]) for (const z of [-.65, .65]) box(.12, .28, .12, mat('#1B2631'), [x, .14, z], w.sofa);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const ballAt = (w, x, y, z) => { w.bl.position.set(x, y + .42, z); w.bl.rotation.set(0, 0, 0); w.bl.visible = true; };

export default {
  id: '463',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BALLS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'BALLS COMPLAIN'],
  title: 'In this town, toy balls complain to cats',
  description: 'Thrown? The cat brings it back. Five stars. Under the sofa? Gone forever. So the ball rolls back by itself. The cat jumps. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'fetch', 'shorts'],
  sources: ['Comedy sketch: complaining balls are made up. Quiz fact: in a survey of owners of cats that play fetch, 94.4% said the fetching began without any explicit training (Forman et al., "Fetching felines: a survey of cat owners on the diversity of cat (Felis catus) fetching behaviour", Scientific Reports, 2023).'],
  setup,
  scenes: [
    { say: 'In this town, balls complain.', show: ['floor', 'wall', 'bl', 'card'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 6], look: [0, .85, 0], fov: 50, to: { pos: [0, 1.3, 5.6], look: [0, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.visible = false; ballAt(w, -.6, 0, .4); talk(w.f, t); brow(w.f, .4); ctAt(w, .6, 0, 0, -.8, .32); holdCard(w, null); } },
    { say: 'Thrown? The cat brings it back.', label: '5 STARS', show: ['floor', 'wall', 'bl', 'card'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.4, 6.5], look: [0, .9, 0], fov: 50, to: { pos: [0, 1.4, 6], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.visible = false; talk(w.f, t); brow(w.f, -.4); if (p < .5) { w.card.visible = false; const q = p / .5; ctAt(w, 1.6 - q * 2, .08 * Math.abs(Math.sin(t * 14)), 0, Math.PI, .32); w.c.head.updateWorldMatrix(true, false); const m = w.c.head.localToWorld(new w.k.THREE.Vector3(1.2, -.8, 0)); w.bl.position.copy(m); w.bl.scale.setScalar(.55); } else { w.bl.scale.setScalar(1); ballAt(w, -.6, 0, .4); ctAt(w, .6, 0, 0, -.8, .32); holdCard(w, true); } } },
    { say: 'Under the sofa? Gone forever.', label: 'LOST', show: ['floor', 'wall', 'bl', 'sofa'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 7], look: [0, .6, 0], fov: 50, to: { pos: [0, 1.3, 6.5], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.sofa.position.set(-.5, 0, -1); const r = Math.min(1, p * 2); ballAt(w, .6 - r * 1.1, 0, .6 - r * 1.6); w.bl.scale.setScalar(.6); w.bl.rotation.z = r * 6; talk(w.f, t); brow(w.f, -.4); ctAt(w, 1.2, 0, .4, -2.4, .32); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (r >= 1 ? 1.5 : 1)); w.c.head.rotation.z = r >= 1 ? .35 : 0; } },
    { say: 'So the ball? Rolls back by itself.', label: 'SPOOKY', show: ['floor', 'wall', 'bl', 'sofa'], sky: '#FADBD8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 7], look: [0, .6, 0], fov: 50, to: { pos: [0, 1.3, 6.5], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.position.set(-.5, 0, -1); const r = Math.min(1, p * 2); ballAt(w, -.5 + r * .9, 0, -1 + r * 1.5); w.bl.scale.setScalar(.6); w.bl.rotation.z = -r * 6; talk(w.f, t, r >= 1); brow(w.f, .3); const jump = r >= 1 ? Math.max(0, Math.sin((p - .5) * 10)) : 0; ctAt(w, 1.2, jump * .8, .4, -2.4, .32); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.6); w.c.body.scale.set(1.2, r >= 1 ? 1.35 : 1, 1); } },
    { say: 'Do cats play fetch? Comment below.',
      quiz: { q: 'Do cats play fetch?', options: ['Yes', 'No', 'Only when they want to'], answer: 'Made up. But most owners of fetching cats say it started with no training.' },
      show: ['floor', 'bl', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.3, 6], look: [0, .85, 0], fov: 54, to: { pos: [-2, 1.3, 6], look: [0, .85, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.sofa.visible = false; w.bl.scale.setScalar(1); ballAt(w, -.6, 0, .4); talk(w.f, t, false); ctAt(w, .6, 0, 0, -.8, .34); holdCard(w, true); } },
  ],
};

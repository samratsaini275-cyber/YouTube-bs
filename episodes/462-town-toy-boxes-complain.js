// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the toy box complains about the cat.
// Hook: the rule under 2 s; first frame shows a toy box with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#D6EAF8'), [0, 8, -4], w.wall);
  w.tbx = group(); w.tin = group([0, 0, 0], w.tbx); box(1.2, 1, .9, mat('#F39C12'), [0, .5, 0], w.tin); box(1.25, .15, .95, mat('#D35400'), [0, 1.05, 0], w.tin); box(.4, .4, .02, mat('#E74C3C'), [-.3, .5, .46], w.tin); box(.3, .3, .02, mat('#3498DB'), [.35, .35, .46], w.tin);
  w.f = face(k, w.tin, [0, .7, .47], .38);
  w.ball = ball(.16, mat('#E74C3C', { glow: .3 }), [0, 0, 0], k.scene);
  w.lines = group(); for (let i = 0; i < 3; i++) { const r = box(.04, .25, .02, mat('#FFFFFF', { glow: .6 }), [i * .15 - .15, 0, 0], w.lines); r.rotation.z = (i - 1) * .3; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const boxAt = (w, shake = 0, flip = 0) => { w.tbx.position.set(-.6, 0, .2); w.tbx.rotation.set(0, .2, shake * Math.sin(w.k.t || 0)); w.tin.rotation.set(0, 0, flip * Math.PI * .9); w.tin.position.set(flip * .6, flip * 1.1, 0); };

export default {
  id: '462',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TOY BOXES COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'TOYS COMPLAIN'],
  title: 'In this town, toy boxes complain to cats',
  description: 'One rattle? The cat comes running. Nothing falls out? A very long stare. A ball drops out? Five stars. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'toys', 'shorts'],
  sources: ['Comedy sketch: complaining toy boxes are made up. Quiz fact: in an experiment, cats heard a container rattle (or stay silent) before it was turned over; they looked longer when what fell out did not match the sound, suggesting they use sounds to predict an unseen object (Takagi et al., "There\'s no ball without noise: cats\' prediction of an object from noise", Animal Cognition, 2016).'],
  setup,
  scenes: [
    { say: 'In this town, toys complain.', show: ['floor', 'wall', 'tbx', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.3, 6.5], look: [.2, .85, 0], fov: 50, to: { pos: [.2, 1.3, 6], look: [.2, .85, 0], fov: 48 } },
      update: (w, p, t) => { boxAt(w); w.ball.visible = false; w.lines.visible = false; talk(w.f, t); brow(w.f, .4); ctAt(w, .6, 0, .5, -.8, .32); holdCard(w, null); } },
    { say: 'One rattle? The cat comes running.', label: 'RATTLE', show: ['floor', 'wall', 'tbx'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.3, 6.5], look: [.2, .85, 0], fov: 50, to: { pos: [.2, 1.3, 6], look: [.2, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.ball.visible = false; boxAt(w); w.tbx.rotation.z = p < .4 ? .15 * Math.sin(t * 30) : 0; w.lines.visible = p < .4; w.lines.position.set(-.6, 1.5, .3); talk(w.f, t); brow(w.f, -.3); const arr = Math.min(1, Math.max(0, (p - .3) * 4)); ctAt(w, 3.2 - arr * 2.4, 0, .5, -2.6 + arr * 1.8, .32); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); } },
    { say: 'Nothing falls out? A long stare.', label: 'CONFUSED', show: ['floor', 'wall', 'tbx', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 6.5], look: [.2, 1, 0], fov: 50, to: { pos: [.2, 1.4, 6], look: [.2, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.lines.visible = false; w.ball.visible = false; boxAt(w, 0, Math.min(1, p * 3)); talk(w.f, t, p < .3); brow(w.f, -.2); ctAt(w, .6, 0, .5, -.8, .32); w.c.head.rotation.z = p > .3 ? .35 : 0; w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); if (p > .55) holdCard(w, false); else w.card.visible = false; } },
    { say: 'A ball drops out? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'tbx', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 6.5], look: [.2, 1, 0], fov: 50, to: { pos: [.2, 1.4, 6], look: [.2, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.lines.visible = false; w.c.head.rotation.z = 0; boxAt(w, 0, 1); const d = Math.min(1, p * 2.5); w.ball.visible = true; w.ball.position.set(-.1 + d * .4, Math.max(.16, 1.3 - d * d * 1.4), .5); talk(w.f, t, p < .3); brow(w.f, .2); ctAt(w, .6, 0, .5, -.8, .32); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'Rattle or no rattle? Comment below.',
      quiz: { q: 'Rattle or no rattle?', options: ['Rattle', 'No rattle', 'Rattle at 3 a.m.'], answer: 'Made up. But real cats expect something to fall out after they hear a rattle.' },
      show: ['floor', 'tbx', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.4, 6.5], look: [0, .9, 0], fov: 54, to: { pos: [-2, 1.4, 6.5], look: [0, .9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.lines.visible = false; w.ball.visible = false; boxAt(w); talk(w.f, t, false); ctAt(w, .8, 0, .5, -.8, .34); holdCard(w, true); } },
  ],
};

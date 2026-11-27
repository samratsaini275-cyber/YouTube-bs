// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the electric fan complains about the cat.
// Hook: "This fan has a complaint." under 2 s; first frame shows a fan with a grumpy face and a cat holding a score card.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#E3F1EC'), [0, 8, -2], w.wall);
  const wh = mat('#F8F9F9', { rough: .4 }), bl = mat('#5DADE2', { rough: .3 });
  w.fan = group(); cyl(.6, .7, .15, wh, [0, .08, 0], w.fan, 24); cyl(.07, .07, 1.6, wh, [0, .9, 0], w.fan, 10);
  w.hd = group([0, 1.9, 0], w.fan); cyl(.25, .25, .4, wh, [0, 0, -.25], w.hd, 16).rotation.x = Math.PI / 2;
  w.blades = group([0, 0, .02], w.hd); for (let i = 0; i < 3; i++) { const b = box(.3, .75, .03, bl, [0, .42, 0], group([0, 0, 0], w.blades)); b.parent.rotation.z = i * 2.094; }
  for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; const rs = box(.25, .04, .04, wh, [Math.cos(a) * .9, Math.sin(a) * .9, .08], w.hd); rs.rotation.z = a + Math.PI / 2; }
  for (let i = 0; i < 8; i++) { const sp = box(.02, 1.8, .02, wh, [0, 0, .09], w.hd); sp.rotation.z = i * Math.PI / 8; }
  ball(.3, wh, [0, 0, .12], w.hd).scale.z = .4;
  w.f = face(k, w.hd, [0, 0, .25], .4);
  w.fur = group(); for (let i = 0; i < 8; i++) ball(.05, mat('#F2A04A'), [0, 0, 0], w.fur);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const fnAt = (w, x, t, spin = 1, ry = .25) => { w.fan.position.set(x, 0, -.4); w.fan.rotation.set(0, ry, 0); w.blades.rotation.z = -t * 14 * spin; w.fur.visible = false; };
const ALL = ['floor', 'wall', 'fan'];
const cam0 = { pos: [0, 2.1, 6], look: [0, 2.35, 0], fov: 50, to: { pos: [0, 2.1, 5.6], look: [0, 2.35, 0], fov: 48 } };
const env = { sky: '#E3F1EC', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '483',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FAN',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS FAN', 'HAS A COMPLAINT'],
  title: 'This fan has a complaint',
  description: 'Stared at? Every spin. Covered in fur? The cat sheds right in front of it. And the cat? Five stars. So the fan switched off. The cat fell asleep in front of it anyway. (A made-up comedy sketch.)',
  tags: ['funny', 'fan', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining fans are made up. Quiz fact: the first Scottish Fold was a barn cat named Susie, found in Scotland in 1961 by the shepherd William Ross (TICA breed profile, "Scottish Fold", tica.org/breed/scottish-fold).'],
  setup,
  scenes: [
    { say: 'This fan has a complaint.', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { fnAt(w, -.6, t); talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 0, .6, -.9, .3); holdCard(w, null); } },
    { say: 'Stared at? Every spin.', label: 'STARE', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; fnAt(w, -.5, t); talk(w.f, t); brow(w.f, .55); ctAt(w, .6, 0, .7, -2.5, .3); w.c.head.rotation.z = .25; w.c.head.rotation.x = Math.sin(t * 14) * .25; w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); } },
    { say: 'Covered in fur? The cat sheds right in front of it.', label: 'FLUFF', show: [...ALL, 'fur'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; fnAt(w, -.5, t); talk(w.f, t); brow(w.f, .6); ctAt(w, .5, 0, .8, -2.4, .3); w.fur.visible = true; w.fur.children.forEach((b, i) => { const q = (t * .8 + i / 8) % 1; b.position.set(.4 - q * 1.3, .7 + q * 1.4 + Math.sin(i * 3 + t * 4) * .15, .5 - q * .4); b.scale.setScalar(1.5); }); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { fnAt(w, -.6, t); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 0, .6, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the fan switched off. The cat fell asleep in front of it anyway.', label: 'ZZZ', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; fnAt(w, -.5, p < .3 ? t * (1 - p / .3) : 0, 1); talk(w.f, t, p < .3 || p > .75); brow(w.f, p > .55 ? .6 : -.3); ctAt(w, .4, 0, .8, -2.6, .3); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p > .45 ? .1 : 1); } },
    { say: 'Grumpy fan: turn it up, turn it off, or point it at the cat? Comment below.',
      quiz: { q: 'What do you do with the grumpy fan?', options: ['Turn it up', 'Turn it off', 'Point it at the cat'], answer: 'Fun fact: the first Scottish Fold was a barn cat named Susie, found in Scotland in 1961.' },
      show: [...ALL, 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 6], look: [0, 1.7, 0], fov: 54, to: { pos: [-2, 2, 6], look: [0, 1.7, 0] } },
      update: (w, p, t) => { w.wall.visible = false; fnAt(w, -.6, t); talk(w.f, t, false); ctAt(w, .7, 0, .6, -.9, .32); holdCard(w, true); } },
  ],
};

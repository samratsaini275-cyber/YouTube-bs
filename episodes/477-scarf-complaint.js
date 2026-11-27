// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the striped scarf complains about the cat.
// Hook: "This scarf has a complaint." under 2 s; first frame shows a red-and-white scarf on a wall peg with a grumpy face and a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#E8EEF7'), [0, 8, -1], w.wall);
  w.peg = group(); cyl(.08, .08, .5, mat('#6D4C41'), [0, 0, .25], w.peg, 8).rotation.x = Math.PI / 2; box(.6, .3, .06, mat('#8D6E63'), [0, 0, 0], w.peg);
  const red = mat('#D64541', { rough: .9 }), wh = mat('#F7F2E8', { rough: .9 });
  w.sc = group(); w.scb = group([0, 0, 0], w.sc);
  for (let i = 0; i < 12; i++) box(.75, .2, .1, i % 2 ? wh : red, [0, -.1 - i * .2, 0], w.scb);
  for (let i = 0; i < 5; i++) cyl(.02, .02, .25, red, [-.3 + i * .15, -2.52, 0], w.scb, 4);
  w.f = face(k, w.scb, [0, -.75, .07], .45);
  w.yarn = group(); ball(.3, red, [0, 0, 0], w.yarn); w.thread = cyl(.02, .02, 1, red, [0, 0, 0], k.scene, 4);
  w.neck = group(); k.torus(.55, .16, red, [0, 0, 0], w.neck).rotation.x = Math.PI / 2;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const scAt = (w, x, y, len = 1, sw = 0) => { w.peg.position.set(x, y + .1, -.8); w.sc.position.set(x, y, -.55); w.sc.rotation.set(0, 0, sw); w.scb.scale.set(1, len, 1); w.f.scale.set(.45, .45 / len, .45); w.thread.visible = false; w.yarn.visible = false; w.neck.visible = false; };
const cam0 = { pos: [0, 2.1, 6.4], look: [0, 2.2, 0], fov: 50, to: { pos: [0, 2.1, 6], look: [0, 2.2, 0], fov: 48 } };
const env = { sky: '#E8EEF7', lightAt: [2, 9, 8], lightDist: 26 };
const ALL = ['floor', 'wall', 'peg', 'sc'];

export default {
  id: '477',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SCARF',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SCARF', 'HAS A COMPLAINT'],
  title: 'This scarf has a complaint',
  description: 'Unravelled? Before breakfast. Worn? By the cat. And the cat? Five stars. So the scarf hung up high on a hook. The cat swung on it. (A made-up comedy sketch.)',
  tags: ['funny', 'scarf', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining scarves are made up. Quiz fact: most cats have about 24 whiskers on their muzzle, 12 on each side, although the exact placement varies from cat to cat (PetMD, "10 Fascinating Facts About Cat Whiskers"; Cat Behavior Associates, "Your Cat\'s Whiskers").'],
  setup,
  scenes: [
    { say: 'This scarf has a complaint.', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { scAt(w, -.7, 2.9); talk(w.f, t); brow(w.f, .45); ctAt(w, .6, 0, .6, -.9, .32); holdCard(w, null); } },
    { say: 'Unravelled? Before breakfast.', label: 'UNRAVEL', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; const len = 1 - .45 * p; scAt(w, -.7, 2.9, len); w.yarn.visible = true; w.thread.visible = true; const yx = .1 + p * .6; w.yarn.position.set(yx, .3, .3); w.yarn.rotation.z = -p * 8; const bx = -.7, by = 2.9 - 2.6 * len, dx = yx - bx, dy = .3 - by; w.thread.position.set((bx + yx) / 2, (by + .3) / 2, -.1); w.thread.scale.y = Math.hypot(dx, dy); w.thread.rotation.set(0, 0, Math.atan2(-dx, dy)); talk(w.f, t); brow(w.f, .6); ctAt(w, yx + .4, 0, .6, -1.4, .3); w.c.paw.position.set(.9, .3 + Math.abs(Math.sin(t * 7)) * .4, .9); } },
    { say: 'Worn? By the cat.', label: 'COZY', show: ['floor', 'wall', 'sc'], ...env,
      cam: { pos: [0, 1.4, 6], look: [0, 1.05, 0], fov: 50, to: { pos: [0, 1.4, 5.6], look: [0, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.peg.visible = false; ctAt(w, -.1, 0, 0, -.5, .42); scAt(w, 0, 0, .55); w.peg.visible = false; w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); w.neck.visible = true; w.neck.position.set(hp.x - .1, hp.y - .45, hp.z); w.neck.scale.setScalar(.8); w.sc.position.set(hp.x - .75, hp.y - .05, hp.z + .8); w.sc.rotation.set(0, -.2, .05); talk(w.f, t); brow(w.f, .55); w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { scAt(w, -.7, 2.9); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .6, 0, .6, -.9, .32); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the scarf hung up high on a hook. The cat swung on it.', label: 'WHEEE', show: [...ALL], ...env,
      cam: { pos: [0, 3, 7.2], look: [0, 2.9, 0], fov: 52, to: { pos: [0, 3, 6.8], look: [0, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { w.card.visible = false; const on = p > .45; const sw = on ? Math.sin(t * 3) * .35 : 0; scAt(w, 0, 4.6, 1, sw); talk(w.f, t, p < .45 || p > .75); brow(w.f, on ? .6 : -.3); if (on) { const bx = Math.sin(sw) * 2.6, by = 4.6 - Math.cos(sw) * 2.6; ctAt(w, bx, by - .85, -.3, -1.57, .32); w.cr.rotation.z = sw; w.c.paw.position.set(1.2, 2.6, .9); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } else { ctAt(w, 1, 0, .4, -1.2, .3); w.c.head.rotation.z = .3; } } },
    { say: 'Grumpy scarf: knit it, wear it, or give it to the cat? Comment below.',
      quiz: { q: 'What do you do with the grumpy scarf?', options: ['Knit it again', 'Wear it', 'Give it to the cat'], answer: 'Fun fact: most cats have about 24 whiskers on their muzzle, 12 on each side.' },
      show: ['floor', 'peg', 'sc', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 6], look: [0, 1.8, 0], fov: 54, to: { pos: [-2, 2, 6], look: [0, 1.8, 0] } },
      update: (w, p, t) => { w.wall.visible = false; scAt(w, -.7, 2.9); talk(w.f, t, false); ctAt(w, .6, 0, .6, -.9, .34); holdCard(w, true); } },
  ],
};

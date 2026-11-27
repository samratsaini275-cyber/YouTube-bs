// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the curtain complains about the cat.
// Hook: "This curtain has a complaint." under 2 s; first frame shows a curtain with a grumpy face and a cat holding a score card.

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
  w.floor = k.ground('#A98467', 0);
  w.wall = group(); box(40, 16, .3, mat('#F6EFE4'), [0, 8, -1.2], w.wall);
  w.win = group(); box(2.2, 2.4, .05, mat('#9ED4F5', { glow: .3 }), [0, 2.4, -1], w.win); box(2.4, .12, .1, mat('#FFFFFF'), [0, 1.2, -.98], w.win); box(2.4, .12, .1, mat('#FFFFFF'), [0, 3.6, -.98], w.win); box(.1, 2.4, .1, mat('#FFFFFF'), [0, 2.4, -.97], w.win);
  w.rod = group(); const rd = cyl(.05, .05, 3.6, mat('#5D4037'), [0, 3.9, -.7], w.rod, 8); rd.rotation.z = Math.PI / 2;
  const cm = mat('#7D3C98', { rough: .95 }), cm2 = mat('#6C3483', { rough: .95 });
  w.pl = group(); w.pr = group();
  for (const [g, m] of [[w.pl, cm], [w.pr, cm2]]) for (let i = 0; i < 5; i++) box(.26, 3.6, .1, i % 2 ? cm2 : cm, [-.5 + i * .25, -1.8, (i % 2) * .08], g);
  w.f = face(k, w.pl, [0, -2.25, .2], .42);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const cuAt = (w, open = 1, sway = 0) => { w.pl.position.set(-.6 - open * .55, 3.9, -.6); w.pr.position.set(.6 + open * .55, 3.9, -.6); w.pl.rotation.set(0, 0, sway); w.pr.rotation.set(0, 0, 0); };
const ALL = ['floor', 'wall', 'win', 'rod', 'pl', 'pr'];
const cam0 = { pos: [0, 2.3, 6.6], look: [0, 1.95, 0], fov: 50, to: { pos: [0, 2.3, 6.2], look: [0, 1.95, 0], fov: 48 } };
const env = { sky: '#F6EFE4', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '480',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CURTAIN',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CURTAIN', 'HAS A COMPLAINT'],
  title: 'This curtain has a complaint',
  description: 'Climbed? Every morning. Swatted? All afternoon. And the cat? Five stars. So the curtain closed tight. The cat was already behind it. (A made-up comedy sketch.)',
  tags: ['funny', 'curtain', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining curtains are made up. Quiz fact: cats do sweat, but only in small amounts from areas such as their paw pads, and sweating is not their main way of cooling down (PetMD, "Do Cats Sweat?").'],
  setup,
  scenes: [
    { say: 'This curtain has a complaint.', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { cuAt(w); talk(w.f, t); brow(w.f, .45); ctAt(w, .4, 0, .7, -.9, .3); holdCard(w, null); } },
    { say: 'Climbed? Every morning.', label: 'CLIMB', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; const sw = Math.sin(t * 5) * .04; cuAt(w, 1, sw); talk(w.f, t); brow(w.f, .6); w.cr.updateWorldMatrix(true, true); ctAt(w, -.95, .2 + p * 1.6, -.2, -Math.PI / 2, .26); w.cr.rotation.z = 0; w.cr.rotation.x = 0; w.c.paw.position.set(.9, 1.6 + Math.sin(t * 9) * .2, .9); } },
    { say: 'Swatted? All afternoon.', label: 'SWAT', show: [...ALL], ...env,
      cam: { pos: [-.6, 1.5, 5.4], look: [-.6, 1.5, 0], fov: 50, to: { pos: [-.6, 1.5, 5], look: [-.6, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; const hit = Math.abs(Math.sin(t * 6)); cuAt(w, 1, hit * .05); talk(w.f, t); brow(w.f, .55); ctAt(w, -.3, 0, .5, -2.6, .3); w.c.paw.position.set(1 + hit * .4, .5 + hit * .9, .9); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { cuAt(w); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .4, 0, .7, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the curtain closed tight. The cat was already behind it.', label: 'SURPRISE', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; const cl = Math.min(1, p * 2.5); cuAt(w, 1 - cl * 1.1); talk(w.f, t, p < .35 || p > .7); brow(w.f, p > .55 ? .6 : -.3); const pk = p > .55; ctAt(w, pk ? .95 : 5, 0, -.8, 0, .28); if (pk) { w.c.body.visible = true; w.c.tail.rotation.z = Math.sin(t * 4) * .3; } } },
    { say: 'Grumpy curtain: open it, close it, or let the cat climb it? Comment below.',
      quiz: { q: 'What do you do with the grumpy curtain?', options: ['Open it', 'Close it', 'Let the cat climb it'], answer: 'Fun fact: cats sweat only a little, mostly from their paw pads.' },
      show: [...ALL, 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.2, 6.4], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.2, 6.4], look: [0, 1.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; cuAt(w); talk(w.f, t, false); ctAt(w, .4, 0, .7, -.9, .32); holdCard(w, true); } },
  ],
};

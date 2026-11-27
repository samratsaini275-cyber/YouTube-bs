// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the printer complains about the cat.
// Hook: "This printer has a complaint." under 2 s; first frame shows a printer with a grumpy face and a cat holding a score card.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8F8F5'), [0, 8, -4], w.wall);
  w.desk = group(); box(3.4, .15, 1.8, mat('#7E5109'), [0, 1.6, 0], w.desk); for (const x of [-1.5, 1.5]) for (const z of [-.75, .75]) box(.12, 1.6, .12, mat('#5D4037'), [x, .8, z], w.desk);
  w.pr = group(); box(1.5, .6, 1, mat('#ECF0F1'), [0, .3, 0], w.pr); box(1.2, .06, .5, mat('#BDC3C7'), [0, .62, -.15], w.pr); box(1, .05, .35, mat('#BDC3C7'), [0, .25, .65], w.pr); box(.12, .06, .02, mat('#2ECC71', { glow: .8 }), [.55, .45, .51], w.pr);
  w.f = face(k, w.pr, [-.2, .35, .51], .35);
  w.sheet = box(.8, .02, 1, mat('#FFFFFF'), [0, 0, 0], k.scene);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const prOn = (w) => { w.desk.position.set(0, 0, -.4); w.pr.position.set(-.5, 1.68, -.4); w.pr.rotation.set(0, .2, 0); };

export default {
  id: '466',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PRINTER',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PRINTER', 'HAS A COMPLAINT'],
  title: 'This printer has a complaint',
  description: 'Warm on top? Slept on. Paper comes out? Attacked. And the cat? Five stars. So the printer printed a cat bed. The cat picked the paper tray. (A made-up comedy sketch.)',
  tags: ['funny', 'printer', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining printers are made up. Quiz fact: offered human social interaction, food, toys and scents, most pet and shelter cats in a study spent the most time with social interaction from a person, followed by food (Vitale Shreve, Mehrkam & Udell, "Social interaction, food, scent or toys? A formal assessment of domestic pet and shelter cat preferences", Behavioural Processes, 2017).'],
  setup,
  scenes: [
    { say: 'This printer has a complaint.', show: ['floor', 'wall', 'desk', 'pr', 'card'], sky: '#E8F8F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.45, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.45, 0], fov: 48 } },
      update: (w, p, t) => { prOn(w); w.sheet.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .8, 1.68, -.3, -.8, .3); holdCard(w, null); } },
    { say: 'Warm on top? Slept on.', label: 'NAP', show: ['floor', 'wall', 'desk', 'pr'], sky: '#E8F8F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.45, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.45, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; prOn(w); w.sheet.visible = false; talk(w.f, t); brow(w.f, .55); ctAt(w, -.4, 2.3, -.45, -.2, .28); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'Paper comes out? Attacked.', label: 'ATTACK', show: ['floor', 'wall', 'desk', 'pr'], sky: '#E8F8F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.3, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { prOn(w); const out = Math.min(1, p * 2); w.sheet.visible = true; w.sheet.position.set(-.4 + out * .2, 1.96 + (p > .5 ? .1 * Math.sin(t * 20) : 0), .1 + out * .5); w.sheet.rotation.set(p > .5 ? .3 * Math.sin(t * 15) : 0, .2, 0); talk(w.f, t); brow(w.f, -.4); ctAt(w, .9, 1.68, .1, Math.PI * .9, .3); w.c.paw.position.set(1.3, .8 + .3 * Math.abs(Math.sin(t * 12)), .6); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'desk', 'pr', 'card'], sky: '#E8F8F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.45, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.45, 0], fov: 48 } },
      update: (w, p, t) => { prOn(w); w.sheet.visible = false; talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .8, 1.68, -.3, -.8, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So it printed a cat bed. The cat picked the tray.', label: 'NICE TRY', show: ['floor', 'wall', 'desk', 'pr'], sky: '#E8F8F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.3, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; prOn(w); w.sheet.visible = true; w.sheet.position.set(.8, 1.7, .2); w.sheet.rotation.set(0, 0, 0); w.sheet.scale.set(1, 4, 1); talk(w.f, t, p < .4); brow(w.f, p < .5 ? -.2 : .5); ctAt(w, -.45, 1.95, .2, -.3, .24); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p > .5 ? .1 : 1); } },
    { say: 'Grumpy printer: fix it, pet it, or give up? Comment below.',
      quiz: { q: 'What do you do with the grumpy printer?', options: ['Fix it', 'Pet the cat', 'Give up'], answer: 'Fun fact: in one study, most cats chose time with a person over food or toys.' },
      show: ['floor', 'desk', 'pr', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.6, 7], look: [0, 2.3, 0], fov: 54, to: { pos: [-2, 2.6, 7], look: [0, 2.3, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.sheet.visible = false; prOn(w); talk(w.f, t, false); brow(w.f, .3); ctAt(w, .8, 1.68, -.3, -.8, .32); holdCard(w, true); } },
  ],
};

// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: a dinner plate complains about the cat.
// Hook: the rule under 2 s; first frame shows a plate with a face on a table next to a cat holding a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FEF5E7'), [0, 8, -4], w.wall);
  w.table = group(); box(3.4, .15, 1.8, mat('#A04000'), [0, 1.6, 0], w.table); for (const x of [-1.5, 1.5]) for (const z of [-.75, .75]) box(.12, 1.6, .12, mat('#6E2C00'), [x, .8, z], w.table);
  w.plate = group(); cyl(.6, .5, .08, mat('#FFFFFF'), [0, .04, 0], w.plate, 24); w.food = group([0, .1, 0], w.plate); for (let i = 0; i < 4; i++) ball(.13, mat(['#F5B041', '#E74C3C', '#27AE60', '#F5B041'][i]), [(i % 2 - .5) * .3, 0, (Math.floor(i / 2) - .5) * .18 - .3], w.food);
  w.f = face(k, w.plate, [0, .1, .22], .3); w.f.rotation.x = -Math.PI / 2;
  w.lid = group(); cyl(.55, .62, .5, mat('#BDC3C7', { rough: .3 }), [0, .25, 0], w.lid, 24); ball(.08, mat('#909497'), [0, .55, 0], w.lid);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const plateOn = (w) => { w.table.position.set(0, 0, -.5); w.plate.position.set(-.5, 2.35, -.35); w.plate.rotation.set(Math.PI / 2 * .85, 0, 0); w.plate.scale.setScalar(1.2); };

export default {
  id: '460',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PLATES COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'PLATES COMPLAIN'],
  title: 'In this town, plates complain to cats',
  description: 'Your dinner? Stared at. Every bite. Licked clean? Five stars, says the cat. So the plate gets a lid. The cat sits on it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'dinner', 'shorts'],
  sources: ['Comedy sketch: complaining plates are made up. Quiz fact: in cats, protein-based compounds activate the taste receptors, but fats seem to be perceived as smells rather than tastes (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, plates complain.', show: ['floor', 'wall', 'table', 'plate', 'card'], sky: '#FEF5E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 6.5], look: [0, 2.55, 0], fov: 50, to: { pos: [0, 3.2, 6], look: [0, 2.55, 0], fov: 48 } },
      update: (w, p, t) => { plateOn(w); w.food.visible = true; talk(w.f, t); brow(w.f, .4); ctAt(w, .7, 1.68, -.4, -.8, .32); holdCard(w, null); } },
    { say: 'Your dinner? Stared at. Every bite.', label: 'STARING', show: ['floor', 'wall', 'table', 'plate'], sky: '#FEF5E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 6.5], look: [0, 2.55, 0], fov: 50, to: { pos: [0, 3.2, 6], look: [0, 2.55, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; plateOn(w); w.food.visible = true; talk(w.f, t); brow(w.f, .55); ctAt(w, .6, 1.68, -.3, Math.PI * .95, .32); w.c.head.rotation.y = .1 * Math.sin(t * 2); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); } },
    { say: 'Licked clean? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'table', 'plate', 'card'], sky: '#FEF5E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 6.5], look: [0, 2.55, 0], fov: 50, to: { pos: [0, 3.2, 6], look: [0, 2.55, 0], fov: 48 } },
      update: (w, p, t) => { plateOn(w); w.food.visible = false; talk(w.f, t, p < .4); brow(w.f, -.3); ctAt(w, .7, 1.68, -.4, -.8, .32); if (p > .4) holdCard(w, true); else { w.card.visible = false; w.c.head.rotation.z = -.3; } } },
    { say: 'So the plate? Gets a lid.', label: 'NICE TRY', show: ['floor', 'wall', 'table', 'plate', 'lid'], sky: '#FEF5E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 6.5], look: [0, 2.55, 0], fov: 50, to: { pos: [0, 3.2, 6], look: [0, 2.55, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; plateOn(w); w.food.visible = true; w.lid.position.set(-.5, 1.72 + Math.max(0, .8 - p * 2), .25); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .5); const hop = Math.max(0, Math.min(1, (p - .5) * 3)); ctAt(w, .7 - hop * 1.2, 1.68 + (hop < 1 ? Math.sin(hop * Math.PI) * .7 : 0) + hop * .55, -.4 + hop * .3, -.6, .3); if (hop >= 1) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Who wins: the plate or the cat? Comment below.',
      quiz: { q: 'Who wins?', options: ['The plate', 'The cat', 'The lid'], answer: 'Made up. But cats seem to smell fat in food rather than taste it.' },
      show: ['floor', 'table', 'plate', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 3.2, 7], look: [0, 2.4, 0], fov: 54, to: { pos: [-2, 3.2, 7], look: [0, 2.4, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.lid.visible = false; plateOn(w); w.food.visible = true; talk(w.f, t, false); ctAt(w, .7, 1.68, -.4, -.8, .34); holdCard(w, true); } },
  ],
};

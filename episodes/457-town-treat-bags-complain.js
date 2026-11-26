// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the treat bag complains about the cat.
// Hook: the rule under 2 s; first frame shows a treat bag with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#FCE4EC'), [0, 8, -4], w.wall);
  w.tb = group(); box(.9, 1.2, .35, mat('#E91E63'), [0, .6, 0], w.tb); box(.92, .15, .37, mat('#AD1457'), [0, 1.22, 0], w.tb); w.fish = ball(.15, mat('#FFEB3B', { glow: .4 }), [0, .35, .19], w.tb); w.fish.scale.set(1.6, .7, .2);
  w.f = face(k, w.tb, [0, .82, .18], .38);
  w.shelf = group(); box(2.2, .12, .8, mat('#8D6E63'), [0, 0, 0], w.shelf);
  w.fridge = group(); box(1.6, 3.4, 1.4, mat('#ECEFF1'), [0, 1.7, 0], w.fridge); box(1.62, .04, 1.42, mat('#B0BEC5'), [0, 2.3, 0], w.fridge); box(.08, .6, .08, mat('#90A4AE'), [.62, 1.7, .72], w.fridge);
  w.treat = group(); for (let i = 0; i < 4; i++) ball(.07, mat('#8D6E63'), [i * .15 - .2, 0, 0], w.treat);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const tbAt = (w, x, y, z, rz = 0) => { w.tb.position.set(x, y, z); w.tb.rotation.set(0, .2, rz); w.tb.visible = true; };

export default {
  id: '457',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TREAT BAGS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'TREAT BAGS COMPLAIN'],
  title: 'In this town, treat bags complain to cats',
  description: 'One tiny shake? The cat appears. Hidden on a high shelf? Found. So the bag hides behind the fridge. The cat just waits. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'treats', 'shorts'],
  sources: ['Comedy sketch: complaining treat bags are made up. Quiz fact: given a choice between food in a puzzle feeder and the same food freely available on a tray, most pet cats in a study ate more of the free food (Delgado, Han & Bain, "Domestic cats (Felis catus) prefer freely available food over food that requires effort", Animal Cognition, 2022).'],
  setup,
  scenes: [
    { say: 'In this town, treat bags complain.', show: ['floor', 'wall', 'card'], sky: '#FCE4EC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 6.5], look: [0, 1.05, 0], fov: 50, to: { pos: [0, 1.5, 6], look: [0, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { tbAt(w, -.7, 0, .3); talk(w.f, t); brow(w.f, .4); ctAt(w, .6, 0, 0, -.8, .34); holdCard(w, null); } },
    { say: 'One tiny shake? The cat appears.', label: 'ZOOM', show: ['floor', 'wall', 'treat'], sky: '#FCE4EC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 6.5], look: [0, 1.05, 0], fov: 50, to: { pos: [0, 1.5, 6], look: [0, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.treat.visible = false; tbAt(w, -.7, .1 * Math.abs(Math.sin(t * 20)) * (p < .35 ? 1 : 0), .3, p < .35 ? .15 * Math.sin(t * 20) : 0); talk(w.f, t); brow(w.f, -.3); const arr = Math.min(1, Math.max(0, (p - .3) * 5)); ctAt(w, 3.5 - arr * 2.9, 0, 0, -2.6 + arr * 1.8, .34); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); } },
    { say: 'Hidden on a high shelf? Found.', label: 'FOUND', show: ['floor', 'wall', 'shelf', 'card'], sky: '#FCE4EC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 7], look: [0, 2.3, 0], fov: 50, to: { pos: [0, 2.6, 6.5], look: [0, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { w.shelf.position.set(0, 2, -.3); tbAt(w, -.5, 2.06, -.3); talk(w.f, t); brow(w.f, -.4); const up = Math.min(1, p * 2.2); ctAt(w, .7, up < 1 ? Math.sin(up * Math.PI) * 2.6 + up * 2.06 : 2.06, -.3, -.6, .3); if (up >= 1) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the bag? Hides behind the fridge.', label: 'WAITING', show: ['floor', 'wall', 'fridge'], sky: '#FCE4EC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 8], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 7.5], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.fridge.position.set(-.5, 0, -1.2); tbAt(w, -1.5, 0, -1.3); w.tb.rotation.y = .9; talk(w.f, t, p < .5); brow(w.f, .3); ctAt(w, .8, 0, .2, -2.3, .34); w.c.body.scale.set(1.35, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.2); w.c.tail.rotation.z = .3 * Math.sin(t * 3); } },
    { say: 'Who wins: the bag or the cat? Comment below.',
      quiz: { q: 'Who wins?', options: ['The treat bag', 'The cat', 'Nobody, it is empty'], answer: 'Made up. But in one study, most cats picked free food over a food puzzle.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.5, 6.5], look: [0, 1, 0], fov: 54, to: { pos: [-2, 1.5, 6.5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.c.tail.rotation.z = 0; tbAt(w, -.7, 0, .3); talk(w.f, t, false); ctAt(w, .6, 0, 0, -.8, .36); holdCard(w, true); } },
  ],
};

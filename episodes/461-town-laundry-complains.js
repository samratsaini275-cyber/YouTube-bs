// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the laundry basket complains about the cat.
// Hook: the rule under 2 s; first frame shows a laundry basket with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#EBF5FB'), [0, 8, -4], w.wall);
  w.bask = group(); const wick = mat('#D4AC6E', { rough: .95 }); box(1.6, .9, .1, wick, [0, .45, .55], w.bask); box(1.6, .9, .1, wick, [0, .45, -.55], w.bask); box(.1, .9, 1.2, wick, [.8, .45, 0], w.bask); box(.1, .9, 1.2, wick, [-.8, .45, 0], w.bask); box(1.6, .08, 1.2, wick, [0, .04, 0], w.bask);
  w.clothes = group([0, 0, 0], w.bask); const cols = ['#5DADE2', '#F5B7B1', '#FFFFFF', '#82E0AA', '#F9E79F']; for (let i = 0; i < 6; i++) { const s = box(.6, .12, .45, mat(cols[i % 5]), [(i % 3 - 1) * .45, .75 + Math.floor(i / 3) * .12, (Math.floor(i / 3) - .5) * .4], w.clothes); s.rotation.y = i * .4; }
  w.fur = group([0, 0, 0], w.bask); for (let i = 0; i < 10; i++) { const t = k.ball(.06, mat('#F2A04A'), [(Math.random() - .5) * 1.2, 1.02, (Math.random() - .5) * .8], w.fur); t.scale.y = .4; }
  w.f = face(k, w.bask, [0, .45, .62], .45);
  w.pile = group(); for (let i = 0; i < 5; i++) { const s = box(.9 - i * .05, .14, .7, mat(cols[i % 5]), [0, .07 + i * .14, 0], w.pile); s.rotation.y = i * .1; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const baskOn = (w) => { w.bask.position.set(-.6, 0, .2); w.bask.rotation.set(0, .15, 0); };

export default {
  id: '461',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LAUNDRY COMPLAINS TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'LAUNDRY COMPLAINS'],
  title: 'In this town, laundry complains to cats',
  description: 'Fresh and folded? Squashed. Fur on every shirt? Five stars, says the cat. So the laundry folds itself into a cat bed. The cat picks the basket. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'laundry', 'shorts'],
  sources: ['Comedy sketch: complaining laundry is made up. Quiz fact: in an experiment where food was hidden under one of two bowls, cats used a person\'s pointing gesture to find the food, and did about as well as dogs (Miklósi et al., "A comparative study of the use of visual communicative signals in interactions between dogs and humans and cats and humans", Journal of Comparative Psychology, 2005).'],
  setup,
  scenes: [
    { say: 'In this town, laundry complains.', show: ['floor', 'wall', 'bask', 'card'], sky: '#EBF5FB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.2, 6.5], look: [.2, .7, 0], fov: 50, to: { pos: [.2, 1.2, 6], look: [.2, .7, 0], fov: 48 } },
      update: (w, p, t) => { baskOn(w); w.fur.visible = false; w.pile.visible = false; talk(w.f, t); brow(w.f, .4); ctAt(w, .75, 0, .5, -.8, .32); holdCard(w, null); } },
    { say: 'Fresh and folded? Squashed.', label: 'SQUASH', show: ['floor', 'wall', 'bask'], sky: '#EBF5FB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 6.5], look: [0, 1.1, 0], fov: 50, to: { pos: [0, 1.7, 6], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; baskOn(w); w.fur.visible = false; talk(w.f, t); brow(w.f, .55); const hop = Math.min(1, p * 2.2); ctAt(w, .9 - hop * 1.5, hop < 1 ? Math.sin(hop * Math.PI) * 1 + hop * .8 : .8, .2, -.3, .32); w.clothes.scale.y = hop >= 1 ? .5 : 1; if (hop >= 1) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .15); } } },
    { say: 'Fur on every shirt? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'bask', 'card'], sky: '#EBF5FB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.2, 6.5], look: [.2, .7, 0], fov: 50, to: { pos: [.2, 1.2, 6], look: [.2, .7, 0], fov: 48 } },
      update: (w, p, t) => { baskOn(w); w.clothes.scale.y = 1; w.fur.visible = true; talk(w.f, t, p < .4); brow(w.f, .5); ctAt(w, .75, 0, .5, -.8, .32); if (p > .4) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the laundry? Folds into a cat bed.', label: 'NOPE', show: ['floor', 'wall', 'bask', 'pile'], sky: '#EBF5FB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1.05, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; baskOn(w); w.fur.visible = false; w.clothes.visible = false; w.pile.position.set(1.1, 0, .3); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .5); const hop = Math.max(0, Math.min(1, (p - .5) * 3)); ctAt(w, .4 - hop * 1, hop < 1 ? Math.sin(hop * Math.PI) * .9 + hop * .1 : .1, .2, -.4, .32); if (hop >= 1) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Basket or cat bed? Comment below.',
      quiz: { q: 'Basket or cat bed?', options: ['Basket', 'Cat bed', 'Your clean shirts'], answer: 'Made up. But real cats can follow a person\'s pointing to find hidden food.' },
      show: ['floor', 'bask', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.5, 6.5], look: [0, 1, 0], fov: 54, to: { pos: [-2, 1.5, 6.5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.clothes.visible = true; w.pile.visible = false; baskOn(w); talk(w.f, t, false); ctAt(w, .8, 0, .2, -.8, .36); holdCard(w, true); } },
  ],
};

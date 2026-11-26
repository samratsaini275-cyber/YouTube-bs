// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: a paper bag complains about the cat.
// Hook: the rule under 2 s; first frame shows a paper bag with a face next to a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#FEF9E7'), [0, 8, -4], w.wall);
  const kraft = mat('#C8A165', { rough: .95 });
  w.bag = group(); w.bagIn = group([0, 0, 0], w.bag); box(1.3, 1.6, .9, kraft, [0, .8, 0], w.bagIn); box(1.32, .12, .92, mat('#B08850'), [0, 1.55, 0], w.bagIn); w.hole = box(.9, .9, .02, mat('#3E2C17'), [0, .45, .46], w.bagIn);
  w.f = face(k, w.bagIn, [0, 1.15, .46], .5);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const bagAt = (w, flat = 0) => { w.bag.position.set(-.7, 0, 0); w.bag.rotation.set(0, .3, 0); w.bagIn.scale.set(1 + flat * .4, 1 - flat * .9, 1); w.hole.visible = flat < .5; };

export default {
  id: '455',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BAGS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'BAGS COMPLAIN'],
  title: 'In this town, paper bags complain to cats',
  description: 'Climbed into? Every time. That crinkle? Five stars, says the cat. So the bag folds itself flat. The cat sits on it anyway. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'paperbag', 'shorts'],
  sources: ['Comedy sketch: complaining bags are made up. Quiz fact: the spines (papillae) on a cat\'s tongue are hollow and wick saliva into the fur when the cat grooms (Noel & Hu, "Cats use hollow papillae to wick saliva into fur", PNAS, 2018).'],
  setup,
  scenes: [
    { say: 'In this town, bags complain.', show: ['floor', 'wall', 'bag', 'card'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { bagAt(w); talk(w.f, t); brow(w.f, .4); ctAt(w, .6, 0, .4, -.8, .36); holdCard(w, null); } },
    { say: 'Climbed into? Every time.', label: 'MINE', show: ['floor', 'wall', 'bag'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; bagAt(w); talk(w.f, t); brow(w.f, .55); const inn = Math.min(1, p * 2); ctAt(w, .9 - inn * 1.4, 0, .4 - inn * .3, Math.PI * .9, .32); w.bag.position.x += inn >= 1 ? .04 * Math.sin(t * 18) : 0; if (inn >= 1) { w.c.head.visible = false; w.c.body.visible = false; } } },
    { say: 'That crinkle? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'bag', 'card'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.c.head.visible = true; w.c.body.visible = true; bagAt(w); w.bag.rotation.z = .08 * Math.sin(t * 20); talk(w.f, t, p < .45); brow(w.f, -.3); ctAt(w, .55, 0, .4, -2.4, .36); if (p < .45) { w.card.visible = false; w.c.paw.position.set(1.4, .9 + .3 * Math.abs(Math.sin(t * 12)), .9); } else { w.cr.rotation.y = -.8; holdCard(w, true); } } },
    { say: 'So the bag? Folds itself flat.', label: 'STILL SITS', show: ['floor', 'wall', 'bag'], sky: '#FEF9E7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 7], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 1.6, 6.5], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.bag.rotation.z = 0; const fl = Math.min(1, p * 2.5); bagAt(w, fl); w.f.visible = fl < .6; talk(w.f, t); const hop = Math.max(0, Math.min(1, (p - .5) * 3)); ctAt(w, .9 - hop * 1.5, hop < 1 ? Math.sin(hop * Math.PI) * .6 + hop * .17 : .17, .4 - hop * .3, -.5, .36); if (hop >= 1) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Paper bag or fancy toy? Comment below.',
      quiz: { q: 'Best cat toy?', options: ['A paper bag', 'A fancy toy', 'The box it came in'], answer: 'Made up. But a cat\'s tongue has hollow spines that soak up spit for grooming.' },
      show: ['floor', 'bag', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 1.7, 7.5], look: [0, 1.1, 0], fov: 54, to: { pos: [-2, 1.7, 7.5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.f.visible = true; bagAt(w); talk(w.f, t, false); ctAt(w, .6, 0, .4, -.8, .38); holdCard(w, true); } },
  ],
};

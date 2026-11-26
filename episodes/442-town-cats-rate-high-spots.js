// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate high places out loud.
// Hook: the rule under 2 s; first frame shows a cat on top of a fridge holding up a score card.

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

function setup(k) {
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#C9B79C', 0);
  w.wall = group(); box(40, 16, .3, mat('#D6EAF8'), [0, 8, -3], w.wall);
  w.fridge = group(); box(1.8, 3.6, 1.6, mat('#F4F6F7'), [0, 1.8, 0], w.fridge); box(1.82, .04, 1.62, mat('#B3B6B7'), [0, 2.4, 0], w.fridge); box(.08, .6, .08, mat('#909497'), [.7, 2.9, .82], w.fridge); box(.08, .8, .08, mat('#909497'), [.7, 1.7, .82], w.fridge);
  w.curt = group(); for (let i = 0; i < 6; i++) box(.32, 4.2, .2, mat(i % 2 ? '#C0392B' : '#E74C3C'), [i * .3, 2.3, 0], w.curt); box(2.4, .12, .12, mat('#7F8C8D'), [.75, 4.45, 0], w.curt);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '442',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE HIGH SPOTS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE HIGH SPOTS'],
  title: 'In this town, cats rate high places',
  description: 'The top of the fridge? Five stars. The floor? One star. The curtains? Climbed. Stuck. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'jump', 'shorts'],
  sources: ['Comedy sketch: cat height reviews are made up. Quiz fact: in jump tests with domestic cats, the take-off speed of each cat\'s best jump was explained by the length of its hind legs and by its body fat relative to lean mass, but not by the size of its leg-straightening muscles (Harris & Steudel, "The relationship between maximum jumping performance and hind limb morphology/physiology in domestic cats", Journal of Experimental Biology, 2002).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate high spots.', show: ['floor', 'wall', 'fridge', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 4.2, 9], look: [0, 4.95, 0], fov: 50, to: { pos: [0, 4.2, 8.5], look: [0, 4.95, 0], fov: 48 } },
      update: (w, p, t) => { w.fridge.position.set(-.2, 0, -1.4); ctAt(w, 0, 3.6, -1.3, -.4, .38); holdCard(w, null); } },
    { say: 'The top of the fridge? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'fridge', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 4.2, 9], look: [0, 4.95, 0], fov: 50, to: { pos: [0, 4.2, 8.5], look: [0, 4.95, 0], fov: 48 } },
      update: (w, p, t) => { w.fridge.position.set(-.2, 0, -1.4); ctAt(w, 0, 3.6, -1.3, -.4, .38); w.c.eyes.forEach(e => e.scale.y = p < .45 ? .2 : 1); w.c.head.rotation.z = .1; if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'The floor? One star.', label: '1 STAR', show: ['floor', 'wall', 'fridge', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 7.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.fridge.position.set(-2.2, 0, -1.4); ctAt(w, .4, 0, 0, -.4, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .4); w.c.head.rotation.z = -.2; if (p > .4) holdCard(w, false); else w.card.visible = false; } },
    { say: 'The curtains? Climbed. Stuck.', label: 'STUCK', show: ['floor', 'wall', 'curt'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 8], look: [0, 3.1, 0], fov: 50, to: { pos: [0, 3.2, 7.5], look: [0, 3.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.curt.position.set(-.8, 0, -1.5); const up = Math.min(1, p * 2); ctAt(w, -.1, .4 + up * 2.4, -1.1, 0, .38); w.cr.rotation.z = Math.PI / 2 * .85; w.c.paw.position.set(1.2, 1.6, .9); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (up >= 1 ? 1.5 : 1)); if (up >= 1) w.cr.position.x += .04 * Math.sin(t * 20); } },
    { say: 'Best cat lookout? Comment below.',
      quiz: { q: 'Best cat lookout?', options: ['Fridge top', 'Bookshelf', 'Your head'], answer: 'Made up. But in tests, cats with longer back legs and less fat jumped best.' },
      show: ['floor', 'fridge', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 4, 9], look: [0, 4, 0], fov: 54, to: { pos: [-2, 4, 9], look: [0, 4, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.curt.visible = false; w.cr.rotation.z = 0; w.fridge.position.set(-.2, 0, -1.4); ctAt(w, 0, 3.6, -1.3, -.6, .42); holdCard(w, true); } },
  ],
};

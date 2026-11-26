// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate where their water comes from.
// Hook: the rule under 2 s; first frame shows a cat on a kitchen counter next to a tap, holding up a score card.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D9CBB5', 0);
  w.wall = group(); box(40, 16, .3, mat('#BFE0D0'), [0, 8, -3], w.wall);
  w.counter = group(); box(6, 1.8, 2, mat('#FFFFFF'), [0, .9, 0], w.counter); box(6.2, .15, 2.2, mat('#6B7B8C'), [0, 1.87, 0], w.counter);
  w.tap = group(); const steel = mat('#C9CED6', { rough: .3 }); cyl(.08, .08, 1, steel, [0, .5, 0], w.tap, 10); const sp = cyl(.07, .07, .6, steel, [0, 1, .25], w.tap, 10); sp.rotation.x = Math.PI / 2;
  w.drips = []; for (let i = 0; i < 3; i++) { const d = ball(.06, mat('#5DADE2', { glow: .4 }), [0, 0, 0], w.tap); w.drips.push(d); }
  w.bowl = group(); cyl(.45, .35, .3, mat('#3498DB'), [0, .15, 0], w.bowl, 18); cyl(.38, .38, .02, mat('#AED6F1', { glow: .2 }), [0, .27, 0], w.bowl, 18);
  w.glass = group(); const gm = mat('#D6EAF8'); gm.transparent = true; gm.opacity = .45; cyl(.22, .2, .7, gm, [0, .35, 0], w.glass, 16); w.wat = cyl(.19, .18, .45, mat('#5DADE2', { glow: .2 }), [0, .24, 0], w.glass, 16);
  w.splash = group(); for (let i = 0; i < 5; i++) ball(.05, mat('#5DADE2', { glow: .4 }), [Math.cos(i * 1.3) * .2, 0, Math.sin(i * 1.3) * .2], w.splash);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const drip = (w, t) => (w.tap.scale.setScalar(1.8), w.drips).forEach((d, i) => { const ph = (t * 1.2 + i / 3) % 1; d.position.set(0, .95 - ph * .9, .55); });

export default {
  id: '437',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE WATER',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE WATER'],
  title: 'In this town, cats rate their water',
  description: 'The water bowl? One star. A dripping tap? Five stars. Your glass? Paw dunk. Mine now. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'water', 'shorts'],
  sources: ['Comedy sketch: cat water reviews are made up. Quiz fact: high-speed filming showed that a cat laps by touching the water with the top of its tongue and pulling it up so quickly that inertia beats gravity, drawing a column of water into its mouth (Reis et al., "How cats lap: water uptake by Felis catus", Science, 2010).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate water.', show: ['floor', 'wall', 'counter', 'tap', 'card'], sky: '#BFE0D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.4, 9], look: [0, 3.25, 0], fov: 50, to: { pos: [0, 3.4, 8.5], look: [0, 3.25, 0], fov: 48 } },
      update: (w, p, t) => { w.tap.position.set(-1, 1.95, -.7); drip(w, t); ctAt(w, .7, 1.95, .2, -.5, .4); holdCard(w, null); } },
    { say: 'The water bowl? One star.', label: '1 STAR', show: ['floor', 'wall', 'bowl', 'card'], sky: '#BFE0D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 8], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.1, 7.5], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.bowl.position.set(-1.2, 0, .6); ctAt(w, .1, 0, .2, -.5, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .4); w.c.head.rotation.y = -.5; holdCard(w, p > .45 ? false : null); } },
    { say: 'A dripping tap? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'counter', 'tap', 'card'], sky: '#BFE0D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.4, 3.4, 7.5], look: [-.4, 3.1, 0], fov: 50, to: { pos: [-.4, 3.4, 7], look: [-.4, 3.1, 0], fov: 48 } },
      update: (w, p, t) => { w.tap.position.set(-1.4, 1.95, -.7); drip(w, t); const drink = p < .5; ctAt(w, -.6, 1.95, -.3, Math.PI * .9, .4); if (drink) { w.card.visible = false; w.c.head.rotation.z = -.5; w.c.eyes.forEach(e => e.scale.y = .2); } else { w.cr.rotation.y = -.5; holdCard(w, true); } } },
    { say: 'Your glass? Paw dunk. Mine now.', label: 'MINE NOW', show: ['floor', 'wall', 'counter', 'glass'], sky: '#BFE0D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.2, 3.3, 7.8], look: [-.2, 3, 0], fov: 50, to: { pos: [-.2, 3.3, 7.3], look: [-.2, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.glass.position.set(.75, 1.95, .75); ctAt(w, -.3, 1.95, .2, -.2, .4); const dunk = p > .3 && p < .7; w.c.paw.position.set(dunk ? 2.3 : 1.4, dunk ? 1.4 + .15 * Math.sin(t * 14) : 1.2, 1.3); w.splash.visible = dunk; w.splash.position.set(.75, 2.65 + .1 * Math.abs(Math.sin(t * 14)), .75); if (p >= .7) w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Where should cats drink? Comment below.',
      quiz: { q: 'Where should cats drink?', options: ['The bowl', 'The tap', 'Your glass'], answer: 'Made up. But real cats drink by pulling water up so fast it beats gravity.' },
      show: ['floor', 'counter', 'tap', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 3.4, 8], look: [0, 2.9, 0], fov: 54, to: { pos: [-2, 3.4, 8], look: [0, 2.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.glass.visible = false; w.splash.visible = false; w.tap.position.set(-1, 1.95, -.7); drip(w, t); ctAt(w, .6, 1.95, .2, -.6, .45); holdCard(w, true); } },
  ],
};

// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Echoes 235 "Gary the ant built a snowman" (93 views, still growing at 18:22). Hook rule: premise under 2 s.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#FDFEFE', 0);
  w.wall = group(); box(80, 30, .5, mat('#D6EAF8'), [0, 15, -9], w.wall);
  w.flakes = group(); for (let i = 0; i < 24; i++) { const f = ball(.06, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.mini = group(); ball(.3, mat('#FFFFFF'), [0, .3, 0], w.mini); ball(.2, mat('#FFFFFF'), [0, .7, 0], w.mini); w.nose = box(.07, .07, .07, mat('#D4A056'), [0, .7, .2], w.mini);
  w.snowcat = group(); const sb = ball(1.5, mat('#FDFEFE', { rough: .9 }), [0, 1.1, 0], w.snowcat); sb.scale.set(1.5, .8, 1); ball(1, mat('#FDFEFE'), [1.8, 1.8, 0], w.snowcat); for (const z of [-.5, .5]) cone(.35, .7, mat('#FDFEFE'), [1.8, 2.8, z], w.snowcat, 4);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const snow = (w, t) => w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .25 + i / 24) % 1; f.position.set(-4 + (i * 1.7) % 8, 6 - q * 6, -3 + (i * 2.3) % 5); });
const env = { sky: '#D6EAF8', lightAt: [2, 9, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '512',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SNOW GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BUILT A SNOWMAN.'],
  title: 'Gary the ant built a snowman with the cat',
  description: 'His snowman is one snowflake tall. The carrot nose is a crumb. And the cat? It lay down in the snow and became a snow cat. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'snowman', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the Norwegian Forest Cat, called "skogkatt" in Norway, has a thick, water-resistant overcoat and a woolly undercoat suited to Scandinavia\'s cold climate (Encyclopaedia Britannica, "Norwegian Forest Cat"; The Cat Fanciers\' Association, Norwegian Forest Cat breed standard).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary built a snowman.',
      show: ['floor', 'wall', 'flakes', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'mini', 'snowcat'); snow(w, t); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The snowman? One snowflake tall.',
      show: ['floor', 'wall', 'flakes', 'g', 'mini'], ...env,
      cam: { pos: [.3, 1.2, 5.4], look: [.1, .6, 0], fov: 46, to: { pos: [.3, 1.2, 5], look: [.1, .6, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'snowcat'); w.cr.visible = false; snow(w, t); w.mini.position.set(.5, 0, .2); w.nose.visible = false; gy(w, -.4, 0, .3, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The carrot nose? A crumb.',
      show: ['floor', 'wall', 'flakes', 'g', 'mini'], ...env,
      cam: { pos: [.4, 1.1, 4.6], look: [.2, .65, 0], fov: 44, to: { pos: [.4, 1.1, 4.2], look: [.2, .65, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'snowcat'); w.cr.visible = false; snow(w, t); w.mini.position.set(.5, 0, .2); w.nose.visible = p > .3; gy(w, -.1, 0, .4, -1.9, t); w.g.rotation.z = p > .3 ? .2 : 0; },
    },
    {
      say: 'The cat lay down in the snow. Snow cat.',
      show: ['floor', 'wall', 'flakes', 'g', 'mini', 'snowcat'], ...env,
      cam: { pos: [.8, 3, 10], look: [.6, 1.6, 0], fov: 50, to: { pos: [.8, 3, 9.4], look: [.6, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); w.mini.position.set(-1.6, 0, 1.4); w.nose.visible = true; const cov = p > .5; w.snowcat.visible = cov; w.snowcat.position.set(.4, 0, -1); w.snowcat.scale.setScalar(.75); if (!cov) { ctAt(w, .4, 0, -1, 0, .75); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); } else w.cr.visible = false; gy(w, -.8, 0, 1.6, -1.4, t); w.g.rotation.z = cov ? Math.sin(t * 6) * .1 : 0; },
    },
    {
      say: 'Best snow buddy for these two: a snowman, a snow cat, or a snow ant? Comment below.',
      quiz: { q: 'What is the best snow buddy for Gary and the cat?', options: ['A snowman', 'A snow cat', 'A snow ant'], answer: 'Fun fact: the Norwegian Forest Cat has a thick, water-resistant coat made for cold winters.' },
      show: ['floor', 'wall', 'flakes', 'g', 'mini', 'snowcat'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 26,
      cam: { pos: [2.4, 3, 10], look: [.6, 1.6, 0], fov: 48, to: { pos: [-1.2, 3, 10], look: [.6, 1.6, 0] } },
      update: (w, p, t) => { snow(w, t); w.cr.visible = false; w.mini.position.set(-1.6, 0, 1.4); w.snowcat.position.set(.4, 0, -1); w.snowcat.scale.setScalar(.75); gy(w, -.8, 0, 1.6, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

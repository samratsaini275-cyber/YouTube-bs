// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a pile of sugar-cube bricks, the cat behind.

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
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#C8B6A6', 0);
  w.wall = group(); box(60, 30, .5, mat('#FDEBD0'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.house = group(); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) box(.38, .38, .38, mat('#FDFEFE', { rough: .9 }), [-.4 + i * .4, .19 + j * .4, 0], w.house); const roof = k.cone(.75, .5, mat('#E74C3C'), [0, 1.45, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(.18, .26, .02, mat('#6E2C00'), [0, .13, .2], w.house);
  w.box = group(); const bm = mat('#C8A165', { rough: .9 }); box(3.2, .1, 2.4, bm, [0, .05, 0], w.box); box(3.2, 1.6, .1, bm, [0, .8, -1.2], w.box); box(3.2, 1.6, .1, bm, [0, .8, 1.2], w.box); for (const x of [-1.6, 1.6]) box(.1, 1.6, 2.4, bm, [x, .8, 0], w.box);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEBD0', lightAt: [2, 9, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '515',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'ARCHITECT GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BUILT THE CAT A HOUSE.'],
  title: 'Gary the ant built the cat a house',
  description: 'The bricks are sugar cubes. The door is the size of one paw. And the cat? It moved into the cardboard box instead. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'house', 'funny', 'shorts'],
  sources: [
    'Quiz fact: in giant nests of the leaf-cutting ant Atta vollenweideri, wind blowing over the mound draws air out of the central tunnels, ventilating the nest; the ants build turrets around the openings (Kleineidam, Ernst & Roces, "Wind-induced ventilation of the giant nests of the leaf-cutting ant Atta vollenweideri", Naturwissenschaften, 2001).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary built the cat a house.',
      show: ['floor', 'wall', 'g', 'house'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'box'); w.house.position.set(.5, 0, .4); ctAt(w, 1.8, 0, -1.8, -2.2, .7); gy(w, -.5, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The bricks? Sugar cubes.',
      show: ['floor', 'wall', 'g', 'house'], ...env,
      cam: { pos: [.4, 1.4, 4.6], look: [.1, .8, 0], fov: 46, to: { pos: [.4, 1.4, 4.2], look: [.1, .8, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'box'); w.cr.visible = false; w.house.position.set(.5, 0, .1); gy(w, -.6, 0, .4, -1.4, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The door? The size of one paw.',
      show: ['floor', 'wall', 'g', 'house'], ...env,
      cam: { pos: [.6, 1.8, 6], look: [.4, 1, 0], fov: 48, to: { pos: [.6, 1.8, 5.5], look: [.4, 1, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'box'); w.house.position.set(0, 0, .2); ctAt(w, 2, 0, -.2, -2.8, .75); const poke = Math.abs(Math.sin(t * 3)); w.c.paw.position.set(1 + poke * .4, .5, .9); gy(w, -.55, 0, 1.2, -1.4, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The cat moved into the box instead.',
      show: ['floor', 'wall', 'g', 'house', 'box'], ...env,
      cam: { pos: [0, 3.2, 9.5], look: [-.1, 1.2, 0], fov: 50, to: { pos: [0, 3.2, 8.9], look: [-.1, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.house.position.set(-1.7, 0, .6); w.box.position.set(1.2, 0, -.6); const inb = p > .35; ctAt(w, inb ? 1.6 : 3.6, inb ? .1 : 0, -.6, Math.PI - .3, .7); if (inb) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .2); } gy(w, -1.2, 0, 1.6, -1.2, t); w.g.rotation.z = inb ? -.15 : 0; },
    },
    {
      say: 'Best home for the cat: a house, a box, or a basket? Comment below.',
      quiz: { q: 'What is the best home for the cat?', options: ['A house', 'A box', 'A basket'], answer: 'Fun fact: giant leaf-cutter ant nests are kept fresh by wind blowing over their tunnels.' },
      show: ['floor', 'wall', 'g', 'house', 'box'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 26,
      cam: { pos: [2.2, 3.2, 9], look: [.4, 1.2, 0], fov: 48, to: { pos: [-1.2, 3.2, 9], look: [.4, 1.2, 0] } },
      update: (w, p, t) => { w.house.position.set(-1.7, 0, .6); w.box.position.set(1.2, 0, -.6); ctAt(w, 1.6, .1, -.6, Math.PI - .3, .7); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, -1.2, 0, 1.6, -1.2 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

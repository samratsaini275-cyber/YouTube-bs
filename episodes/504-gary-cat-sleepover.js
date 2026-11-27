// Narrative 27 finale (504): "Gary's Big World (season 3: home and bedtime, with the cat)". A callback to 237, the 1K sleepover: this time the sleepover is with the cat.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat in a bedroom at night.

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
  const w = { k };
  w.floor = k.ground('#7A5A9A', 0);
  w.wall = box(60, 30, .5, mat('#2C3E6B'), [0, 15, -6]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 14; i++) { const s = ball(.08, mat('#FFF4C2', { glow: 1 }), [-6 + (i * 4.3) % 12, 3 + (i * 2.7) % 6, -5.7], w.stars); s.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.crumb = group(); const cb = box(.6, .4, .5, mat('#D4A056', { rough: 1 }), [0, 0, 0], w.crumb); cb.rotation.set(.3, .5, .2);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.tail.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const zzz = (w, x, y, t) => w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(x + q * 1.2, y + q * 1.6, 0); z.scale.setScalar(.6 + q); });
const env = { sky: '#2C3E6B', lightAt: [0, 6, 3], lightDist: 20 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '504',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SLEEPOVER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'SLEPT OVER AT THE CAT\'S.'],
  title: 'Gary the ant had a sleepover with the cat (season finale)',
  description: 'His sleeping bag is the cat\'s tail. The midnight snack is one crumb, shared. And in the morning? The cat gives him five stars. Season finale. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'sleepover', 'funny', 'shorts'],
  sources: [
    'Quiz fact: in a study of the fire ant Solenopsis invicta, queens averaged about 92 sleep episodes a day, each lasting about 6 minutes, for a total of about 9.4 hours of sleep a day (Cassill et al., "Polyphasic wake/sleep episodes in the fire ant, Solenopsis invicta", Journal of Insect Behavior, 2009; abstract via University of South Florida Digital Commons).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary slept over at the cat\'s.',
      show: ['floor', 'wall', 'stars', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.wall.material.color.set('#2C3E6B'); hide(w, 'crumb', 'zz', 'card'); ctAt(w, 1.4, 0, -2, -2.2, .7); gy(w, -.2, 0, .8, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His sleeping bag? The cat\'s tail.',
      show: ['floor', 'wall', 'stars', 'g', 'zz'], ...env,
      cam: { pos: [-1.6, 2.4, 6.5], look: [-2, 1, 0], fov: 48, to: { pos: [-1.6, 2.4, 6], look: [-2, 1, 0], fov: 46 } },
      update: (w, p, t) => { w.wall.material.color.set('#2C3E6B'); hide(w, 'crumb', 'card'); ctAt(w, 1, 0, -.6, 0, .8); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); w.c.tail.rotation.set(0, 0, 2.25); gy(w, -2.95, 0, -.3, -1.4, t); w.g.rotation.z = 0; zzz(w, -2.6, 1.2, t); },
    },
    {
      say: 'Midnight snack? One crumb, shared.',
      show: ['floor', 'wall', 'stars', 'g', 'crumb'], ...env,
      cam: { pos: [.6, 2.4, 7], look: [.4, 1.2, 0], fov: 48, to: { pos: [.6, 2.4, 6.4], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.wall.material.color.set('#2C3E6B'); hide(w, 'zz', 'card'); ctAt(w, 1.8, 0, -.8, -2.6, .75); w.c.head.rotation.z = -.35; gy(w, -.4, 0, .8, -1.2, t); w.g.rotation.z = 0; w.crumb.visible = true; w.crumb.position.set(.4, .2, .7); },
    },
    {
      say: 'In the morning, the cat gave him five stars.',
      show: ['floor', 'wall', 'g'], sky: '#AED6F1', lightAt: [0, 8, 5], lightDist: 24,
      cam: { pos: [.6, 3.6, 11.5], look: [.4, 2.4, 0], fov: 50, to: { pos: [.6, 3.6, 10.9], look: [.4, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'crumb', 'zz'); w.stars.visible = false; w.wall.material.color.set('#AED6F1'); ctAt(w, 1.8, 0, -1, -2.2, 1.05); if (p > .4) { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.visible = true; w.card.position.set(at.x - .2, at.y + 1.2, at.z + 1.2); w.card.rotation.set(0, -.3, 0); w.card.scale.setScalar(1.8); } else w.card.visible = false; gy(w, .2, 0, 2.2, -1.6, t, p > .5); w.g.rotation.z = 0; },
    },
    {
      say: 'Best sleepover game for Gary and the cat: hide and seek, pillow fight, or naps? Comment below.',
      quiz: { q: 'What is the best sleepover game for Gary and the cat?', options: ['Hide and seek', 'Pillow fight', 'Naps'], answer: 'Fun fact: fire ant queens take about 92 naps a day, each about 6 minutes long.' },
      show: ['floor', 'wall', 'g'], sky: '#274B73', lightAt: [0, 8, 5], lightDist: 24,
      cam: { pos: [2.4, 3.4, 11.5], look: [.4, 2.2, 0], fov: 48, to: { pos: [-1, 3.4, 11.5], look: [.4, 2.2, 0] } },
      update: (w, p, t) => { hide(w, 'crumb', 'zz', 'card'); w.stars.visible = false; ctAt(w, 1.8, 0, -1, -2.2, 1.05); w.c.eyes.forEach(e => e.scale.y = .3); gy(w, .2, 0, 2.2, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

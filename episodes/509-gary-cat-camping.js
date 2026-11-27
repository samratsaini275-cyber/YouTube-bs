// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat outdoors at night.

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
  w.floor = k.ground('#1E8449', 0);
  w.wall = box(80, 30, .5, mat('#1B2631'), [0, 15, -10]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 20; i++) { const s = ball(.07, mat('#FFF4C2', { glow: 1 }), [-8 + (i * 4.3) % 16, 3 + (i * 2.7) % 7, -9.7], w.stars); s.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.tent = group(); const tn = cone(1.1, 1.4, mat('#FDFEFE', { rough: 1 }), [0, .7, 0], w.tent, 4); tn.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#5D6D7E'), [0, .35, .72], w.tent);
  w.match = group(); cyl(.05, .05, 1.2, mat('#E6B87A'), [0, .1, 0], w.match, 6).rotation.z = Math.PI / 2; ball(.08, mat('#C0392B'), [.62, .1, 0], w.match); w.flame = ball(.16, mat('#FF9F1C', { glow: 1.5 }), [.66, .32, 0], w.match); w.flame.scale.y = 1.7;
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const zzz = (w, x, y, t) => w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(x + q * 1.2, y + q * 1.6, 0); z.scale.setScalar(.6 + q); });
const env = { sky: '#1B2631', lightAt: [0, 6, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '509',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAMPER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK THE CAT CAMPING.'],
  title: 'Gary the ant took the cat camping',
  description: 'The tent is a paper napkin. The campfire is one match. And at bedtime? The cat sleeps in the tent. All of it. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'camping', 'funny', 'shorts'],
  sources: [
    'Quiz fact: a kitten\'s first baby (deciduous) teeth, the incisors, begin to come in at 2 to 4 weeks of age (Merck Veterinary Manual, "Dental Development of Cats").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary took the cat camping.',
      show: ['floor', 'wall', 'stars', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'tent', 'match', 'zz'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The tent? A paper napkin.',
      show: ['floor', 'wall', 'stars', 'g', 'tent'], ...env,
      cam: { pos: [.4, 1.6, 5], look: [0, .8, 0], fov: 46, to: { pos: [.4, 1.6, 4.6], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'match', 'zz'); w.cr.visible = false; w.tent.position.set(-.5, 0, -.4); w.tent.scale.setScalar(1); gy(w, .9, 0, .5, -1.9, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The campfire? One match.',
      show: ['floor', 'wall', 'stars', 'g', 'tent', 'match'], ...env,
      cam: { pos: [.4, 1.6, 5], look: [0, .8, 0], fov: 46, to: { pos: [.4, 1.6, 4.6], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'zz'); w.cr.visible = false; w.tent.position.set(-1.2, 0, -.8); w.match.position.set(-.7, 0, .6); w.flame.scale.set(1 + .15 * Math.sin(t * 18), 1.7 + .3 * Math.sin(t * 13), 1); gy(w, 1.1, 0, .9, -2.2, t); w.g.rotation.z = Math.sin(t * 5) * .08; },
    },
    {
      say: 'Bedtime? The cat slept in the tent. All of it.',
      show: ['floor', 'wall', 'stars', 'g', 'tent', 'zz'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [0, 1, 0], fov: 48, to: { pos: [.6, 2.4, 6.9], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'match'); w.tent.position.set(-.3, 1.15, -.3); w.tent.rotation.z = .25; ctAt(w, .9, 0, -.3, -.2, .7); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 1.2, 0, 1.6, -2.4, t); w.g.rotation.z = 0; zzz(w, .4, 2.2, t); },
    },
    {
      say: 'Best camping snack for these two: a crumb, a fish, or a marshmallow? Comment below.',
      quiz: { q: 'What is the best camping snack for Gary and the cat?', options: ['A crumb', 'A fish', 'A marshmallow'], answer: 'Fun fact: a kitten\'s first baby teeth come in when it is just 2 to 4 weeks old.' },
      show: ['floor', 'wall', 'stars', 'g', 'tent'], sky: '#274B73', lightAt: [0, 6, 4], lightDist: 22,
      cam: { pos: [2, 2.4, 7.5], look: [0, 1, 0], fov: 46, to: { pos: [-1, 2.4, 7.5], look: [0, 1, 0] } },
      update: (w, p, t) => { hide(w, 'match', 'zz'); w.tent.position.set(-.3, 1.15, -.3); w.tent.rotation.z = .25; ctAt(w, .9, 0, -.3, -.2, .7); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 1.2, 0, 1.6, -2.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

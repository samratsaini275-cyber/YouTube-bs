// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary holding a thread leash tied to the cat.

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
  w.floor = k.ground('#82E0AA', 0);
  w.wall = group(); box(60, 30, .5, mat('#AED6F1'), [0, 15, -8], w.wall);
  w.path = box(4, .02, 40, mat('#D5C4A1'), [0, .01, -10], k.scene);
  w.bush = group(); for (const [x, z] of [[-3, -4], [3.2, -7], [-3.4, -12]]) { ball(1.2, mat('#27AE60'), [x, 1, z], w.bush); ball(.9, mat('#2ECC71'), [x + .8, .8, z + .4], w.bush); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.leash = cyl(.03, .03, 1, mat('#E74C3C'), [0, 0, 0], k.scene, 6);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const tie = (w, a, b) => { const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, L = Math.hypot(dx, dy, dz); w.leash.visible = true; w.leash.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); w.leash.scale.y = L; w.leash.quaternion.setFromUnitVectors(new w.T.Vector3(0, 1, 0), new w.T.Vector3(dx / L, dy / L, dz / L)); };
const env = { sky: '#AED6F1', lightAt: [2, 9, 6], lightDist: 30 };

export default {
  id: '505',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'WALKIES GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WALKED THE CAT.'],
  title: 'Gary the ant walked the cat',
  description: 'The leash is one thread. The cat stops every two steps. So Gary rides home on the cat. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: Attaphila fungicola, a tiny cockroach that lives in the nests of Texas leaf-cutter ants, hitchhikes on the winged queen ants when they fly off to start new colonies (Phillips, "Emigrating together but not establishing together: a cockroach rides ants and leaves", The American Naturalist, 2021).',
  ],
  setup: (k) => { const w = setup(k); w.T = k.THREE; return w; },
  scenes: [
    {
      say: 'Gary walked the cat.',
      show: ['floor', 'wall', 'path', 'bush', 'g'], ...env,
      cam: { pos: [1.8, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.7, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { ctAt(w, 1.2, 0, -1.6, -2.2, .7); gy(w, -.3, 0, 1, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); w.cr.updateWorldMatrix(true, true); tie(w, new w.T.Vector3(-.1, .5, 1), w.c.head.getWorldPosition(new w.T.Vector3()).add(new w.T.Vector3(0, -.4, 0))); },
    },
    {
      say: 'The leash? One thread.',
      show: ['floor', 'wall', 'path', 'g'], ...env,
      cam: { pos: [.6, 1.4, 5], look: [0, .8, 0], fov: 46, to: { pos: [.6, 1.4, 4.6], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; gy(w, -.3, 0, .5, -1.9, t, true); w.g.rotation.z = -.3; tie(w, new w.T.Vector3(0, .55, .5), new w.T.Vector3(3, 2.4, -1.5)); },
    },
    {
      say: 'The cat? Stopped every two steps.',
      show: ['floor', 'wall', 'path', 'bush', 'g'], ...env,
      cam: { pos: [10, 2.6, .8], look: [0, 1.1, .8], fov: 50, to: { pos: [9.5, 2.6, .8], look: [0, 1.1, .8], fov: 48 } },
      update: (w, p, t) => { const go = Math.sin(t * 4) > 0; ctAt(w, 0, 0, -1.2, Math.PI / 2, .75); if (!go) { w.c.head.rotation.z = -.4; } w.c.body.scale.set(1.4, go ? 1 : .8, 1); gy(w, .3, 0, 2.9, Math.PI / 2, t, true); w.g.rotation.z = -.35; w.cr.updateWorldMatrix(true, true); tie(w, new w.T.Vector3(.3, .55, 2.65), w.c.head.getWorldPosition(new w.T.Vector3()).add(new w.T.Vector3(0, -.35, 0))); },
    },
    {
      say: 'So Gary rode home on the cat.',
      show: ['floor', 'wall', 'path', 'bush', 'g'], ...env,
      cam: { pos: [7, 2.6, -1], look: [0, 1.5, -1], fov: 50, to: { pos: [7, 2.6, -5], look: [0, 1.5, -5], fov: 50 } },
      update: (w, p, t) => { w.leash.visible = false; const z = -1 - p * 4; ctAt(w, 0, Math.abs(Math.sin(t * 6)) * .05, z, Math.PI / 2, .8); w.cr.updateWorldMatrix(true, true); const hp = w.c.body.getWorldPosition(new w.T.Vector3()); gy(w, hp.x, hp.y + .95, hp.z, Math.PI / 2, t); w.g.rotation.z = Math.sin(t * 6) * .08; },
    },
    {
      say: 'Best walk for Gary: on foot, on a leaf, or on the cat? Comment below.',
      quiz: { q: 'What is the best way for Gary to go for a walk?', options: ['On foot', 'On a leaf', 'On the cat'], answer: 'Fun fact: a tiny cockroach hitches rides on flying queen leaf-cutter ants.' },
      show: ['floor', 'wall', 'path', 'bush', 'g'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 30,
      cam: { pos: [3, 3, 7.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-2, 3, 7.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { w.leash.visible = false; ctAt(w, .6, 0, -.8, -2.3, .8); w.cr.updateWorldMatrix(true, true); const hp = w.c.body.getWorldPosition(new w.T.Vector3()); gy(w, hp.x, hp.y + .95, hp.z, -1.4 + .3 * Math.sin(t * 3), t); },
    },
  ],
};

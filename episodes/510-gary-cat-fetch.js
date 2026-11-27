// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary holding a pea in front of the cat.

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
  const { mat, box, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#7DCEA0', 0);
  w.wall = group(); box(60, 30, .5, mat('#FAD7A0'), [0, 15, -7], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.pea = ball(.28, mat('#58D68D', { rough: .5 }), [0, 0, 0], k.scene);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FAD7A0', lightAt: [2, 9, 6], lightDist: 26 };

export default {
  id: '510',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'COACH GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TAUGHT THE CAT TO FETCH.'],
  title: 'Gary the ant taught the cat to fetch',
  description: 'The ball is one pea. Gary\'s best throw goes one centimetre. And the cat? It fetched Gary instead. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'fetch', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the construction of a cat\'s shoulder joints lets it turn its foreleg in almost any direction, allowing quick turns when chasing prey (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary taught the cat to fetch.',
      show: ['floor', 'wall', 'g', 'pea'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); w.pea.position.set(.25, .85, .95); },
    },
    {
      say: 'The ball? One pea.',
      show: ['floor', 'wall', 'g', 'pea'], ...env,
      cam: { pos: [.4, 1.3, 4.5], look: [0, .8, 0], fov: 46, to: { pos: [.4, 1.3, 4.1], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; gy(w, -.2, 0, .2, -1.6, t); w.g.rotation.z = -.15; w.pea.position.set(.3, .95 + Math.sin(t * 4) * .03, .3); },
    },
    {
      say: 'The best throw? One centimetre.',
      show: ['floor', 'wall', 'g', 'pea'], ...env,
      cam: { pos: [.4, 1.3, 4.5], look: [0, .8, 0], fov: 46, to: { pos: [.4, 1.3, 4.1], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; gy(w, -.2, 0, .2, -1.6, t); const th = Math.min(1, p * 2.5); w.g.rotation.z = -.15 + Math.sin(th * Math.PI) * .5; w.pea.position.set(.3 + th * .25, .95 * (1 - th) + .28 * th + Math.sin(th * Math.PI) * .2, .3); },
    },
    {
      say: 'The cat fetched Gary instead.',
      show: ['floor', 'wall', 'g', 'pea'], ...env,
      cam: { pos: [.6, 2.4, 8.5], look: [.4, 1.4, 0], fov: 50, to: { pos: [.6, 2.4, 7.9], look: [.4, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.pea.position.set(.2, .28, 1.2); const run = Math.min(1, p * 1.6); ctAt(w, 3.2 - run * 2.2, 0, -.2, Math.PI - .2, .8); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); if (run < 1) { gy(w, -.6, 0, .9, -1.4, t); } else { gy(w, hp.x - .7, hp.y - .5, hp.z + .3, -1.4, t, true); } w.g.rotation.z = run >= 1 ? .3 : 0; },
    },
    {
      say: 'Best toy for the cat: a ball, a feather, or Gary? Comment below.',
      quiz: { q: 'What is the best toy for the cat?', options: ['A ball', 'A feather', 'Gary'], answer: 'Fun fact: a cat\'s shoulder joints let it turn its front legs in almost any direction.' },
      show: ['floor', 'wall', 'g', 'pea'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 26,
      cam: { pos: [2.2, 2.4, 8.5], look: [.4, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 8.5], look: [.4, 1.4, 0] } },
      update: (w, p, t) => { w.pea.position.set(.2, .28, 1.2); ctAt(w, 1, 0, -.2, Math.PI - .2, .8); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); gy(w, hp.x - .7, hp.y - .5, hp.z + .3, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

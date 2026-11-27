// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat on a beach.

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
  w.floor = k.ground('#F7DC6F', 0);
  w.sea = box(80, .05, 30, mat('#3498DB', { glow: .15, rough: .2 }), [0, .02, -20], k.scene);
  w.wall = group(); box(90, 30, .5, mat('#AED6F1'), [0, 15, -34], w.wall);
  w.sun = ball(1.6, mat('#F9E79F', { glow: 1.5 }), [6, 9, -30], k.scene);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.grain = box(.25, .2, .22, mat('#D4AC0D'), [0, 0, 0], k.scene);
  w.wave = group(); const wv = cyl(1.2, 1.2, 9, mat('#5DADE2', { glow: .2, rough: .2 }), [0, 0, 0], w.wave, 20); wv.rotation.z = Math.PI / 2; wv.scale.set(1, 1, .6); for (let i = 0; i < 8; i++) ball(.3, mat('#FDFEFE'), [-4 + i * 1.1, 1.1, .3], w.wave);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#AED6F1', lightAt: [3, 10, 6], lightDist: 34 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '513',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BEACH GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK THE CAT TO THE BEACH.'],
  title: 'Gary the ant took the cat to the beach',
  description: 'The sandcastle is one grain of sand. A swim? The cat said no. And the wave? It only got Gary. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'beach', 'funny', 'shorts'],
  sources: [
    'Quiz fact: tiny erector muscles attached to a cat\'s hair follicles let it bristle, and bristling creates air pockets that help protect the cat against cold (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary took the cat to the beach.',
      show: ['floor', 'sea', 'wall', 'sun', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'grain', 'wave'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The sandcastle? One grain of sand.',
      show: ['floor', 'sea', 'wall', 'sun', 'g', 'grain'], ...env,
      cam: { pos: [.4, 1.1, 4.4], look: [.1, .6, 0], fov: 46, to: { pos: [.4, 1.1, 4], look: [.1, .6, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'wave'); w.cr.visible = false; w.grain.position.set(.5, .1, .3); gy(w, -.3, 0, .4, -1.7, t); w.g.rotation.z = 0; },
    },
    {
      say: 'A swim? The cat said no.',
      show: ['floor', 'sea', 'wall', 'sun', 'g'], ...env,
      cam: { pos: [.8, 2.2, 7], look: [.4, 1.2, 0], fov: 48, to: { pos: [.8, 2.2, 6.4], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'grain', 'wave'); ctAt(w, 1.4, 0, -.6, -2.4, .75); w.c.head.rotation.y = Math.sin(t * 8) * .35; w.c.eyes.forEach(e => e.scale.y = .5); gy(w, -.4, 0, .9, -1.2, t); w.g.rotation.z = .2; },
    },
    {
      say: 'The wave? It only got Gary.',
      show: ['floor', 'sea', 'wall', 'sun', 'g', 'wave'], ...env,
      cam: { pos: [1, 2.8, 9], look: [.4, 1.2, 0], fov: 50, to: { pos: [1, 2.8, 8.4], look: [.4, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'grain'); ctAt(w, 2.4, 0, .6, -2.6, .75); w.c.eyes.forEach(e => e.scale.y = .3); const wz = -6 + Math.min(1, p * 1.6) * 7.4; w.wave.position.set(-1.8, .3, wz); w.wave.scale.set(.45, 1, 1); const hit = wz > .2; gy(w, -.8, hit ? .4 + Math.sin(t * 6) * .2 : 0, hit ? Math.min(2, wz + .8) : .9, -1.4, t, !hit); w.g.rotation.z = hit ? t * 4 : 0; },
    },
    {
      say: 'Best beach game for these two: sandcastles, kites, or naps? Comment below.',
      quiz: { q: 'What is the best beach game for Gary and the cat?', options: ['Sandcastles', 'Kites', 'Naps'], answer: 'Fun fact: tiny muscles let a cat fluff up its fur, and the trapped air helps keep it warm.' },
      show: ['floor', 'sea', 'wall', 'sun', 'g'], sky: '#274B73', lightAt: [3, 10, 6], lightDist: 34,
      cam: { pos: [2.4, 2.4, 8], look: [.4, 1.2, 0], fov: 48, to: { pos: [-1, 2.4, 8], look: [.4, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'grain', 'wave'); ctAt(w, 1.4, 0, -.6, -2.4, .75); w.c.eyes.forEach(e => e.scale.y = .3); gy(w, -.4, 0, .9, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

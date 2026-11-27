// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a giant laser pointer.

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
  w.floor = k.ground('#AAB7B8', 0);
  w.wall = group(); box(60, 30, .5, mat('#EBDEF0'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.ptr = group(); const body = cyl(.45, .45, 6, mat('#566573', { metal: .6, rough: .3 }), [0, .45, 0], w.ptr, 16); body.rotation.z = Math.PI / 2; w.btn = cyl(.22, .22, .2, mat('#E74C3C'), [.4, .95, 0], w.ptr, 12); const tip = cyl(.3, .3, .1, mat('#FF2D2D', { glow: 1 }), [-3.02, .45, 0], w.ptr, 12); tip.rotation.z = Math.PI / 2;
  w.dot = group(); const dt = cyl(.3, .3, .02, mat('#FF1E1E', { glow: 1.5 }), [0, 0, 0], w.dot, 20); w.dotGlow = cyl(.55, .55, .01, mat('#FF8A8A', { glow: .8 }), [0, -.005, 0], w.dot, 20);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#EBDEF0', lightAt: [0, 7, 4], lightDist: 22 };
const big = (w) => w.c.eyes.forEach((e, i) => { if (i % 2) e.scale.set(1.4, 2.4, 1.4); });

export default {
  id: '496',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LASER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED WITH A LASER.'],
  title: 'Gary the ant played with a laser',
  description: 'To press the button, he has to jump on it. The red dot? The cat noticed. And then the dot lands on Gary. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'laser', 'funny', 'shorts'],
  sources: [
    'Quiz fact: across land animals, species with vertically elongated (slit) pupils, as in domestic cats, are very likely to be ambush predators (Banks et al., "Why do animal eyes have pupils of different shapes?", Science Advances, 2015).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary played with a laser.',
      show: ['floor', 'wall', 'g', 'ptr'], ...env,
      cam: { pos: [1.6, 1.6, 7], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.6, 6.4], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.dot.visible = false; w.ptr.position.set(-1, 0, -2.4); w.ptr.rotation.y = .3; gy(w, .5, 0, .3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The button? He had to jump on it.',
      show: ['floor', 'wall', 'g', 'ptr'], ...env,
      cam: { pos: [.8, 2.8, 6.8], look: [.2, 1.4, 0], fov: 46, to: { pos: [.8, 2.8, 6.3], look: [.2, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.dot.visible = false; w.ptr.position.set(0, 0, 0); w.ptr.rotation.y = 0; const j = Math.abs(Math.sin(t * 5)); gy(w, .4, 1.05 + j * .6, 0, -1.6, t); w.g.rotation.z = 0; w.btn.scale.y = j < .2 ? .4 : 1; },
    },
    {
      say: 'The red dot? The cat noticed.',
      show: ['floor', 'wall', 'g', 'ptr', 'dot'], ...env,
      cam: { pos: [0, 3.4, 10.5], look: [-.3, 1.4, 0], fov: 52, to: { pos: [0, 3.4, 9.9], look: [-.3, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { w.ptr.position.set(2.4, 0, 1.2); w.ptr.rotation.y = .2; gy(w, 1.2, 1.05, 1.4, -1.6, t); w.dot.visible = true; w.dot.position.set(-1.4 + Math.sin(t * 3) * 1.2, .02, .6 + Math.cos(t * 2.3) * .6); ctAt(w, -2.2, 0, -1.6, -.9, .8); w.c.head.rotation.y = Math.sin(t * 3) * .3; big(w); },
    },
    {
      say: 'Then the dot landed on Gary.',
      show: ['floor', 'wall', 'g', 'dot'], ...env,
      cam: { pos: [.6, 3, 9.5], look: [0, 1.4, 0], fov: 50, to: { pos: [.6, 3, 8.9], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.ptr.visible = false; gy(w, .4, 0, 1.4, -1.6, t); w.g.rotation.z = p > .5 ? Math.sin(t * 25) * .06 : 0; w.dot.visible = true; const m = Math.min(1, p * 2); w.dot.position.set(-1.6 + m * 2, m > .98 ? .75 : .02, 1.4); w.dot.rotation.x = m > .98 ? Math.PI / 2 - .2 : 0; ctAt(w, -2.2, 0, -.6, -.5, .85); big(w); w.c.body.scale.set(1.4, .8 + (p > .5 ? .05 * Math.sin(t * 9) : 0), 1); },
    },
    {
      say: 'Best toy for Gary: a laser, a bead, or a crumb? Comment below.',
      quiz: { q: 'What is the best toy for Gary?', options: ['A laser', 'A bead', 'A crumb'], answer: 'Fun fact: animals with slit pupils, like cats, are very likely to be ambush hunters.' },
      show: ['floor', 'wall', 'g', 'dot'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.2, 3, 9.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-1, 3, 9.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { w.ptr.visible = false; w.dot.visible = false; gy(w, .4, 0, 1.4, -1.6 + .3 * Math.sin(t * 3), t, true); ctAt(w, -2.2, 0, -.6, -.5, .85); big(w); },
    },
  ],
};

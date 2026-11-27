// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a ball of yarn, the cat behind.

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
  w.floor = k.ground('#A9CCE3', 0);
  w.wall = group(); box(60, 30, .5, mat('#FDEBD0'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.yarn = group(); ball(1.1, mat('#E74C3C', { rough: 1 }), [0, 1.1, 0], w.yarn); for (let i = 0; i < 5; i++) { const r = k.torus(1.12, .05, mat('#C0392B'), [0, 1.1, 0], w.yarn); r.rotation.set(i * .6, i * 1.1, 0); }
  w.thread = cyl(.04, .04, 4, mat('#E74C3C'), [0, 0, 0], k.scene, 6);
  w.bell = group(); ball(.7, mat('#F4D03F', { metal: .7, rough: .25 }), [0, .7, 0], w.bell); box(.9, .1, .1, mat('#7D6608'), [0, .6, .62], w.bell);
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.notes); ball(.14, mat('#2C3E50'), [0, 0, 0], n); cyl(.03, .03, .45, mat('#2C3E50'), [.12, .22, 0], n, 6); n.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEBD0', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '498',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TOYMAKER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'MADE A CAT TOY.'],
  title: 'Gary the ant made a cat toy',
  description: 'The yarn is a giant red planet. The bell is louder than thunder. And the cat? It played with Gary instead. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: most domestic cats hunt alone (Merck Veterinary Manual, "Normal Social Behavior in Cats", Cat Owners edition).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary made a cat toy.',
      show: ['floor', 'wall', 'g', 'yarn'], ...env,
      cam: { pos: [1.6, 1.6, 7], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.6, 6.4], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'thread', 'bell', 'notes'); w.cr.visible = false; w.yarn.position.set(-2.2, 0, -2); gy(w, .4, 0, .3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The yarn? A giant red planet.',
      show: ['floor', 'wall', 'g', 'yarn', 'thread'], ...env,
      cam: { pos: [.6, 2, 7.5], look: [0, 1.2, 0], fov: 46, to: { pos: [.6, 2, 6.9], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'bell', 'notes'); w.cr.visible = false; w.yarn.position.set(-.8, 0, 0); w.yarn.rotation.y = p * 2; const gx = .5 + p * .5; gy(w, gx, 0, .6, 0, t, true); w.g.rotation.z = 0; w.thread.visible = true; w.thread.position.set((-.8 + 1.05 + gx) / 2 - .1, .45, .5); w.thread.rotation.set(0, 0, Math.PI / 2); w.thread.scale.y = Math.max(.1, (gx - .3) / 4); },
    },
    {
      say: 'The bell? Louder than thunder.',
      show: ['floor', 'wall', 'g', 'bell', 'notes'], ...env,
      cam: { pos: [.4, 1.8, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [.4, 1.8, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'yarn', 'thread'); w.cr.visible = false; w.bell.position.set(-.7, 0, 0); w.bell.rotation.z = Math.sin(t * 18) * .25; gy(w, .9, 0, .6, -1.6, t); w.g.rotation.z = Math.sin(t * 30) * .08; w.g.scale.set(1.3, 1.3 * (1 + .08 * Math.sin(t * 30)), 1.3); w.notes.children.forEach(n => { const q = (t * .8 + n.userData.i / 4) % 1; n.position.set(-.7 + Math.cos(n.userData.i * 1.7) * q * 1.6, 1.4 + q * 1.6, .2); n.scale.setScalar(.6 + q); }); },
    },
    {
      say: 'The cat? It played with Gary instead.',
      show: ['floor', 'wall', 'g', 'yarn'], ...env,
      cam: { pos: [.8, 3.2, 10.5], look: [.4, 1.8, 0], fov: 50, to: { pos: [.8, 3.2, 9.9], look: [.4, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'thread', 'bell', 'notes'); w.g.scale.setScalar(1.3); w.yarn.position.set(-2.6, 0, -1.6); ctAt(w, 2.2, 0, -.6, -2.7, .85); const bat = Math.abs(Math.sin(t * 4)); w.c.paw.position.set(1.2 + bat * .5, .4 + bat * .6, .9); w.c.eyes.forEach((e, i) => { if (i % 2) e.scale.set(1.3, 2.2, 1.3); }); gy(w, .1 + Math.sin(t * 4) * .6, bat * .5, 1.4, -1.6 + Math.sin(t * 4), t, true); w.g.rotation.z = Math.sin(t * 8) * .3; },
    },
    {
      say: 'Best cat toy Gary can make: a crumb ball, a string, or a feather? Comment below.',
      quiz: { q: 'What is the best cat toy Gary can make?', options: ['A crumb ball', 'A string', 'A feather'], answer: 'Fun fact: most pet cats hunt alone.' },
      show: ['floor', 'wall', 'g', 'yarn'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.4, 3.2, 10.5], look: [.4, 1.8, 0], fov: 48, to: { pos: [-1, 3.2, 10.5], look: [.4, 1.8, 0] } },
      update: (w, p, t) => { hide(w, 'thread', 'bell', 'notes'); w.g.scale.setScalar(1.3); w.yarn.position.set(-2.6, 0, -1.6); ctAt(w, 2.2, 0, -.6, -2.7, .85); gy(w, .1, 0, 1.4, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

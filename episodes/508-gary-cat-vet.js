// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat in a vet's waiting room.

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
  w.floor = k.ground('#D5F5E3', 0);
  w.wall = group(); box(60, 30, .5, mat('#EBF5FB'), [0, 15, -6], w.wall); box(3, 2, .1, mat('#FDFEFE'), [2.5, 4, -5.7], w.wall); box(.25, 1.2, .12, mat('#E74C3C'), [2.5, 4, -5.6], w.wall); box(1.2, .25, .12, mat('#E74C3C'), [2.5, 4, -5.6], w.wall);
  w.table = group(); box(4, .2, 2.4, mat('#BDC3C7', { metal: .5, rough: .3 }), [0, 1.8, 0], w.table); for (const x of [-1.8, 1.8]) for (const z of [-1, 1]) cyl(.08, .08, 1.8, mat('#95A5A6', { metal: .6 }), [x, .9, z], w.table, 8);
  w.glass = group(); k.torus(.7, .08, mat('#5D4037'), [0, 0, 0], w.glass).rotation.x = Math.PI / 2; w.lens = cyl(.66, .66, .03, mat('#D6EAF8', { glow: .3, rough: .05 }), [0, 0, 0], w.glass, 24); w.lens.rotation.x = Math.PI / 2; const h = cyl(.08, .08, 1.6, mat('#5D4037'), [.9, 1.1, 0], w.glass, 8); h.rotation.z = -.6;
  w.dogs = group(); for (let i = 0; i < 3; i++) { const d = group([-3 + i * 2, 0, -2.5], w.dogs); const dm = mat(['#8D6E63', '#F5CBA7', '#5D4037'][i]); ball(.8, dm, [0, .9, 0], d).scale.set(1.4, 1, 1); ball(.55, dm, [.9, 1.5, 0], d); for (const z of [-.3, .3]) ball(.2, mat('#3E2723'), [.75, 1.85, z], d).scale.set(.6, 1.4, .6); ball(.1, mat('#111111'), [1.4, 1.5, 0], d); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#EBF5FB', lightAt: [0, 8, 5], lightDist: 24 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '508',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'VET GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK THE CAT TO THE VET.'],
  title: 'Gary the ant took the cat to the vet',
  description: 'The waiting room is full of dogs. The vet needs a magnifying glass to find Gary. And the check-up? The vet checks Gary instead. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'vet', 'funny', 'shorts'],
  sources: [
    'Quiz fact: cats have no flat-crowned crushing teeth and so cannot chew their food; instead they cut it up (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary took the cat to the vet.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'table', 'glass', 'dogs'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The waiting room? Full of dogs.',
      show: ['floor', 'wall', 'g', 'dogs'], ...env,
      cam: { pos: [0, 2.6, 9], look: [0, 1.3, -1], fov: 52, to: { pos: [0, 2.6, 8.4], look: [0, 1.3, -1], fov: 50 } },
      update: (w, p, t) => { hide(w, 'table', 'glass'); ctAt(w, 2.4, 0, 1, -2.4, .7); w.c.eyes.forEach(e => e.scale.y = .5); w.c.body.scale.set(1.4, .85, 1); gy(w, 1.2, 0, 2.2, -1.8, t); w.g.rotation.z = Math.sin(t * 20) * .05; w.dogs.children.forEach((d, i) => { d.rotation.y = -1.2 + Math.sin(t * 2 + i) * .2; }); },
    },
    {
      say: 'The vet needed a magnifying glass to find Gary.',
      show: ['floor', 'wall', 'g', 'table', 'glass'], ...env,
      cam: { pos: [.4, 3.2, 5.5], look: [0, 2, 0], fov: 48, to: { pos: [.4, 3.2, 5], look: [0, 2, 0], fov: 46 } },
      update: (w, p, t) => { w.dogs.visible = false; w.cr.visible = false; gy(w, .3, 1.9, .4, -1.4, t); w.g.rotation.z = 0; w.glass.position.set(.3 + Math.sin(t * 1.5) * .6 * (1 - p), 3, .9); w.glass.rotation.set(-.3, 0, 0); },
    },
    {
      say: 'The check-up? The vet checked Gary instead.',
      show: ['floor', 'wall', 'g', 'table', 'glass'], ...env,
      cam: { pos: [.8, 3.6, 8], look: [.4, 2.2, 0], fov: 50, to: { pos: [.8, 3.6, 7.4], look: [.4, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.dogs.visible = false; ctAt(w, 2.4, 1.9, -.4, -2.6, .6); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, -.6, 1.9, .5, -1.4, t); w.g.rotation.z = Math.sin(t * 4) * .1; w.glass.position.set(-.6, 2.9, 1); w.glass.rotation.set(-.3, 0, 0); },
    },
    {
      say: 'Best treat after the vet: a crumb, a fish, or a nap? Comment below.',
      quiz: { q: 'What is the best treat after the vet?', options: ['A crumb', 'A fish', 'A nap'], answer: 'Fun fact: cats can\'t chew their food. They have no flat crushing teeth, so they cut it up.' },
      show: ['floor', 'wall', 'g', 'table'], sky: '#274B73', lightAt: [0, 8, 5], lightDist: 24,
      cam: { pos: [2.2, 3.6, 8], look: [.4, 2.2, 0], fov: 48, to: { pos: [-1, 3.6, 8], look: [.4, 2.2, 0] } },
      update: (w, p, t) => { w.dogs.visible = false; w.glass.visible = false; ctAt(w, 2.4, 1.9, -.4, -2.6, .6); gy(w, -.6, 1.9, .5, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

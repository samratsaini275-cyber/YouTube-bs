// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat on a lawn.

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
  w.floor = k.ground('#82E0AA', 0);
  w.wall = group(); box(80, 30, .5, mat('#D6EAF8'), [0, 15, -10], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.lines = group(); for (let i = 0; i < 5; i++) { const l = box(.6, .03, .03, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 18); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const speed = (w, x, y, z, t) => w.lines.children.forEach(l => { const i = l.userData.i, q = (t * 2 + i / 5) % 1; l.position.set(x - .8 - q * 1.2, y + (i % 3) * .25, z + (i % 2) * .2); });
const env = { sky: '#D6EAF8', lightAt: [3, 10, 6], lightDist: 30 };

export default {
  id: '516',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TAG GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED TAG WITH THE CAT.'],
  title: 'Gary the ant played tag with the cat',
  description: 'When Gary is it, the chase takes all day. When the cat is it, it takes one step. So Gary hides in the cat\'s fur, and nobody ever finds him. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'tag', 'funny', 'shorts'],
  sources: [
    'Quiz fact: fire ants form a genus (Solenopsis) of nearly 200 species, found in tropical regions such as Central and South America and in some temperate regions such as North America (Encyclopaedia Britannica, "fire ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary played tag with the cat.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.lines.visible = false; ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Gary was it? The chase took all day.',
      show: ['floor', 'wall', 'g', 'lines'], ...env, sky: '#F5B041',
      cam: { pos: [1, 2.4, 9], look: [1, 1, 0], fov: 50, to: { pos: [1.6, 2.4, 9], look: [1.6, 1, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w, 3.6, 0, -.6, 0, .7); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, -.8 + p * 1.6, 0, .6, 0, t, true); speed(w, -.8 + p * 1.6, .3, .6, t); },
    },
    {
      say: 'The cat was it? One step.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [.6, 2.2, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [.6, 2.2, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.lines.visible = false; const st = Math.min(1, Math.max(0, (p - .3) * 4)); ctAt(w, 2.6 - st * 1.6, 0, -.4, Math.PI, .7); w.c.paw.position.set(.8 + st * .6, .5 + Math.sin(st * Math.PI) * .5, .9); gy(w, -.6, 0, .4, -1.4, t); w.g.rotation.z = st >= 1 ? -.4 : 0; },
    },
    {
      say: 'So Gary hid in the cat\'s fur. Never found.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.4, 4.4, 6], look: [1.4, 1.4, -.6], fov: 48, to: { pos: [1.4, 4.2, 5.6], look: [1.4, 1.4, -.6], fov: 46 } },
      update: (w, p, t) => { w.lines.visible = false; ctAt(w, 1.3, 0, -.6, Math.PI, .8); w.c.head.rotation.y = Math.sin(t * 1.6) * .6; w.cr.updateWorldMatrix(true, true); const bp = w.c.body.getWorldPosition(new w.k.THREE.Vector3()); const dive = Math.min(1, p * 2.5); gy(w, bp.x, bp.y + 1.05 - dive * .35, bp.z + .2, -1.2, t); w.g.scale.setScalar(1.3 * (1 - dive * .25)); },
    },
    {
      say: 'Best hiding spot for Gary: a shoe, a sock, or the cat? Comment below.',
      quiz: { q: 'What is the best hiding spot for Gary?', options: ['A shoe', 'A sock', 'The cat'], answer: 'Fun fact: there are nearly 200 species of fire ants.' },
      show: ['floor', 'wall', 'g'], sky: '#274B73', lightAt: [3, 10, 6], lightDist: 30,
      cam: { pos: [2.6, 4.2, 6.5], look: [1.2, 1.4, -.6], fov: 48, to: { pos: [0, 4.2, 6.5], look: [1.2, 1.4, -.6] } },
      update: (w, p, t) => { w.lines.visible = false; ctAt(w, 1.3, 0, -.6, Math.PI, .8); w.c.head.rotation.y = Math.sin(t * 1.6) * .6; w.cr.updateWorldMatrix(true, true); const bp = w.c.body.getWorldPosition(new w.k.THREE.Vector3()); gy(w, bp.x, bp.y + .72, bp.z + .2, -1.2, t); w.g.scale.setScalar(1); },
    },
  ],
};

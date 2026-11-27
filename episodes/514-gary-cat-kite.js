// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat on a windy hill.

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
  w.floor = k.ground('#7DCEA0', 0);
  w.wall = group(); box(90, 40, .5, mat('#AED6F1'), [0, 18, -14], w.wall);
  w.clouds = group(); for (let i = 0; i < 4; i++) { const c = group([-8 + i * 5, 7 + (i % 2) * 2, -12], w.clouds); for (let j = 0; j < 3; j++) ball(.9 - j * .15, mat('#FDFEFE'), [j * .8, j % 2 * .3, 0], c); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.leaf = group(); const lf = ball(.9, mat('#58D68D', { rough: .7 }), [0, 0, 0], w.leaf); lf.scale.set(1, .06, .6); box(1.6, .03, .05, mat('#1E8449'), [0, .04, 0], w.leaf);
  w.str = cyl(.015, .015, 1, mat('#7F8C8D'), [0, 0, 0], k.scene, 4);
  w.wind = group(); for (let i = 0; i < 6; i++) { const l = box(.8, .03, .03, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.wind); l.userData.i = i; l.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const tie = (w, a, b) => { const T = w.k.THREE, d = new T.Vector3().subVectors(b, a), L = d.length(); w.str.visible = true; w.str.position.copy(a).addScaledVector(d, .5); w.str.scale.y = L; w.str.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize()); };
const blow = (w, t) => w.wind.children.forEach(l => { const i = l.userData.i, q = (t * 1.2 + i / 6) % 1; l.position.set(-4 + q * 8, 1 + (i % 3) * 1.2, -.5 + (i % 2)); });
const env = { sky: '#AED6F1', lightAt: [3, 10, 6], lightDist: 34 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '514',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'KITE GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'FLEW A KITE.'],
  title: 'Gary the ant flew a kite with the cat',
  description: 'The kite is one leaf. The string is one cat hair. And the wind? It took Gary. The cat kept the string. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'kite', 'funny', 'shorts'],
  sources: [
    'Quiz fact: army ants (subfamily Dorylinae) are nomadic: instead of keeping one permanent nest, the colony moves from place to place (Encyclopaedia Britannica, "ant" and "army ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary flew a kite.',
      show: ['floor', 'wall', 'clouds', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'leaf', 'str', 'wind'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The kite? One leaf.',
      show: ['floor', 'wall', 'clouds', 'g', 'leaf'], ...env,
      cam: { pos: [.4, 1.6, 5.5], look: [0, 1.2, 0], fov: 46, to: { pos: [.4, 1.6, 5], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'str', 'wind'); w.cr.visible = false; w.leaf.position.set(.3, .95, .4); w.leaf.rotation.set(0, 0, .3); gy(w, -.1, 0, .4, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The string? One cat hair.',
      show: ['floor', 'wall', 'clouds', 'g', 'leaf', 'str'], ...env,
      cam: { pos: [.4, 2.6, 7], look: [.6, 2, 0], fov: 50, to: { pos: [.4, 2.6, 6.5], look: [.6, 2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'wind'); w.cr.visible = false; w.leaf.position.set(1.4 + Math.sin(t * 2) * .3, 3.2 + Math.sin(t * 3) * .2, -.2); w.leaf.rotation.set(.6, 0, Math.sin(t * 2) * .3); gy(w, 0, 0, .6, -1, t); w.g.rotation.z = -.2; tie(w, new w.k.THREE.Vector3(.3, .6, .6), w.leaf.position.clone()); },
    },
    {
      say: 'The wind took Gary. The cat kept the string.',
      show: ['floor', 'wall', 'clouds', 'g', 'leaf', 'str', 'wind'], ...env,
      cam: { pos: [.8, 3.4, 10], look: [.4, 2.8, 0], fov: 52, to: { pos: [.8, 3.8, 10], look: [.6, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { blow(w, t); ctAt(w, -1.6, 0, -.4, -.4, .8); w.c.paw.position.set(1.3, 1.4, .9); w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); const up = Math.min(1, p * 1.5); w.leaf.position.set(1.4 + up * 1.2, 3.2 + up * 2.2, -.2); w.leaf.rotation.set(.6, 0, Math.sin(t * 4) * .3); gy(w, w.leaf.position.x - .2, w.leaf.position.y - .55, -.2, -1, t, true); w.g.rotation.z = Math.sin(t * 5) * .3; tie(w, pw, w.leaf.position.clone()); },
    },
    {
      say: 'Best kite for Gary: a leaf, a petal, or a feather? Comment below.',
      quiz: { q: 'What is the best kite for Gary?', options: ['A leaf', 'A petal', 'A feather'], answer: 'Fun fact: army ants have no permanent home. The whole colony keeps moving.' },
      show: ['floor', 'wall', 'clouds', 'g', 'leaf', 'str'], sky: '#274B73', lightAt: [3, 10, 6], lightDist: 34,
      cam: { pos: [2.4, 3, 10], look: [.4, 2.2, 0], fov: 50, to: { pos: [-1.2, 3, 10], look: [.4, 2.2, 0] } },
      update: (w, p, t) => { w.wind.visible = false; ctAt(w, -1.6, 0, -.4, -.4, .8); w.c.paw.position.set(1.3, 1.4, .9); w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.leaf.position.set(2, 3.7 + Math.sin(t * 2) * .2, -.2); w.leaf.rotation.set(.6, 0, Math.sin(t * 3) * .3); gy(w, 1.8, w.leaf.position.y - .55, -.2, -1, t, true); tie(w, pw, w.leaf.position.clone()); },
    },
  ],
};

// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat at a pond.

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
  const w = { k };
  w.floor = k.ground('#7DCEA0', 0);
  w.wall = group(); box(80, 30, .5, mat('#AED6F1'), [0, 15, -12], w.wall);
  w.pond = cyl(4, 4, .04, mat('#3498DB', { glow: .15, rough: .15 }), [-1, .02, -2.5], k.scene, 32); w.pond.scale.set(1.3, 1, .7);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.rod = group(); cyl(.03, .03, 2.4, mat('#A0522D'), [0, 1.2, 0], w.rod, 6); w.line = cyl(.008, .008, 1.6, mat('#ECF0F1'), [0, 0, 0], k.scene, 4);
  w.fish = group(); const fb = ball(.6, mat('#F39C12', { rough: .4 }), [0, 0, 0], w.fish); fb.scale.set(1.6, .8, .5); const tl = cone(.4, .5, mat('#E67E22'), [-1, 0, 0], w.fish, 3); tl.rotation.z = Math.PI / 2; ball(.1, mat('#111111'), [.65, .15, .25], w.fish);
  w.splash = group(); for (let i = 0; i < 8; i++) { const d = ball(.12, mat('#AED6F1', { glow: .3 }), [0, 0, 0], w.splash); d.userData.i = i; d.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#AED6F1', lightAt: [3, 10, 6], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '518',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FISHING GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT FISHING WITH THE CAT.'],
  title: 'Gary the ant went fishing with the cat',
  description: 'The fishing rod is a toothpick. The fish is ten times bigger than Gary. And when the fish pulled Gary in? The cat fished him out. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'fishing', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the fishing cat, a wild cat of South and Southeast Asia, has partially webbed front toes (Smithsonian\'s National Zoo and Conservation Biology Institute, "Fishing cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary went fishing with the cat.',
      show: ['floor', 'wall', 'pond', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'rod', 'line', 'fish', 'splash'); ctAt(w, 1.6, 0, -.4, -2.6, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The rod? A toothpick.',
      show: ['floor', 'wall', 'pond', 'g', 'rod'], ...env,
      cam: { pos: [.6, 1.6, 5], look: [0, 1.1, 0], fov: 46, to: { pos: [.6, 1.6, 4.6], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'line', 'fish', 'splash'); w.cr.visible = false; gy(w, .2, 0, .6, -1.9, t); w.g.rotation.z = 0; w.rod.position.set(.1, .5, .6); w.rod.rotation.set(-.7 + Math.sin(t * 2) * .05, 0, .2); },
    },
    {
      say: 'The fish? Ten times bigger than Gary.',
      show: ['floor', 'wall', 'pond', 'g', 'fish', 'splash'], ...env,
      cam: { pos: [.4, 2, 6.5], look: [-.4, 1.2, -1], fov: 48, to: { pos: [.4, 2, 6], look: [-.4, 1.2, -1], fov: 46 } },
      update: (w, p, t) => { hide(w, 'rod', 'line'); w.cr.visible = false; const jump = Math.max(0, Math.sin(Math.min(1, p * 1.4) * Math.PI)); w.fish.position.set(-1, .2 + jump * 1.6, -1.2); w.fish.rotation.z = (p - .35) * 2; w.fish.scale.setScalar(1.3); gy(w, .6, 0, .9, -2.2, t); w.g.rotation.z = jump > .5 ? -.3 : 0; w.splash.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 8) % 1; d.position.set(-1 + Math.cos(i * .8) * q * 1.3, .1 + Math.sin(q * Math.PI) * .8, -1.2 + Math.sin(i * .8) * q * .6); }); },
    },
    {
      say: 'The fish pulled Gary in. The cat fished him out.',
      show: ['floor', 'wall', 'pond', 'g', 'splash'], ...env,
      cam: { pos: [.6, 2.6, 8.5], look: [-.2, 1.2, -1], fov: 50, to: { pos: [.6, 2.6, 7.9], look: [-.2, 1.2, -1], fov: 48 } },
      update: (w, p, t) => { hide(w, 'rod', 'line', 'fish'); const out = p > .5; ctAt(w, 1.6, 0, -.6, Math.PI - .1, .75); w.c.paw.position.set(out ? 1.5 : 1, out ? 1.3 : .5, .9); w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); if (out) gy(w, .1, 1.1 + Math.sin(t * 5) * .08, .3, -1.4, t, true); else gy(w, -.6, .05 + Math.sin(t * 6) * .05, -1, -1.4, t, true); w.g.rotation.z = out ? .3 : Math.sin(t * 8) * .2; w.splash.visible = !out; w.splash.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 8) % 1; d.position.set(-.6 + Math.cos(i * .8) * q, .1 + Math.sin(q * Math.PI) * .5, -1 + Math.sin(i * .8) * q * .5); }); },
    },
    {
      say: 'Best catch for these two: a fish, a sock, or a shoe? Comment below.',
      quiz: { q: 'What is the best catch for Gary and the cat?', options: ['A fish', 'A sock', 'A shoe'], answer: 'Fun fact: the fishing cat has partly webbed front toes.' },
      show: ['floor', 'wall', 'pond', 'g'], sky: '#274B73', lightAt: [3, 10, 6], lightDist: 30,
      cam: { pos: [2.2, 2.6, 8.5], look: [-.2, 1.2, -1], fov: 48, to: { pos: [-1.2, 2.6, 8.5], look: [-.2, 1.2, -1] } },
      update: (w, p, t) => { hide(w, 'rod', 'line', 'fish', 'splash'); ctAt(w, 1.6, 0, -.6, Math.PI - .1, .75); w.c.paw.position.set(1.5, 1.3, .9); w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); gy(w, .1, 1.1, .3, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat gliding round a frozen pond with Gary in a red scarf at the edge.

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
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  w.floor = k.ground('#F4F6F7', 0);
  w.ice = cyl(4, 4, .04, mat('#D6EAF8', { rough: .05, glow: .15 }), [0, .02, 0], k.scene, 48); w.ice.castShadow = false;
  w.trees = group(); for (let i = 0; i < 6; i++) { const t = group([-7 + i * 2.8, 0, -5], w.trees); cyl(.12, .15, .6, mat('#6E4B2A'), [0, .3, 0], t, 8); cone(.8, 1.6, mat('#1E8449'), [0, 1.3, 0], t, 10); cone(.6, .5, mat('#FDFEFE'), [0, 1.9, 0], t, 10); }
  w.marks = group(); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const m = box(.5, .005, .03, mat('#AED6F1'), [Math.cos(a) * 1.8, .05, Math.sin(a) * 1.2], w.marks); m.rotation.y = -a + Math.PI / 2; m.castShadow = false; }
  w.flakes = group(); for (let i = 0; i < 30; i++) { const f = box(.05, .05, .05, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.scarf = box(.5, .1, .5, mat('#E74C3C'), [.36, .44, 0], w.g);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const snow = (w, t) => w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .2 + i * .137) % 1; f.position.set(((i * 1.37) % 8) - 4, 4.5 - q * 4.5, ((i * .71) % 3) - 1); });
// Cat glides around an oval; returns its heading.
const glide = (w, a, s = .45) => { const x = Math.cos(a) * 1.8, z = Math.sin(a) * 1.2; ctAt(w, x, 0, z, -a - Math.PI / 2, s); w.cr.rotation.z = .1; return [x, z]; };
const env = { sky: '#AED6F1', lightAt: [3, 10, 8], lightDist: 30 };

export default {
  id: '538',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SKATING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN SKATE'],
  title: 'In this town, cats can skate (Gary the ant and the cat)',
  description: 'The cat did a spin. Gary held on to its tail. Then the cat stopped. Gary did not. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'iceskating', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: skating cats are made up. Quiz fact: ice skating probably developed in Scandinavia as early as 1000 BCE, and the first skates were made from the shank or rib bones of elk, oxen, reindeer and other animals (Encyclopaedia Britannica, "Ice skating").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can skate.',
      show: ['floor', 'ice', 'trees', 'marks', 'flakes', 'g'], ...env,
      cam: { pos: [0, 4.6, 8.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 4.6, 8], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); const [x, z] = glide(w, t * .9 + 1.2); gy(w, -.5, 0, 2.4, -.6, t); w.g.rotation.z = .2; },
    },
    {
      say: 'The cat did a spin.',
      show: ['floor', 'ice', 'trees', 'marks', 'flakes'], ...env,
      cam: { pos: [0, 2.6, 6.5], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); w.g.visible = false; ctAt(w, 0, 0, .6, t * 8, .5); w.c.paw.position.set(.8, 1.4, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); },
    },
    {
      say: 'Gary held on to its tail.',
      show: ['floor', 'ice', 'trees', 'marks', 'flakes', 'g'], ...env,
      cam: { pos: [0, 4.4, 8.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 4.4, 8], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); w.g.visible = true; const a = t * 1.1; glide(w, a); w.cr.updateWorldMatrix(true, true); const tp = w.c.tail.getWorldPosition(w.cr.position.clone()); const b = a - 1.1; gy(w, Math.cos(b) * 1.8, 0, Math.sin(b) * 1.2, -b - Math.PI / 2, t); w.g.rotation.z = .25; },
    },
    {
      say: 'Then the cat stopped. Gary did not.',
      show: ['floor', 'ice', 'trees', 'marks', 'flakes', 'g'], ...env,
      cam: { pos: [.4, 3, 8], look: [.4, 1, 0], fov: 50, to: { pos: [.4, 3, 7.5], look: [.4, 1, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); ctAt(w, -1.4, 0, .6, 0, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); const f = Math.min(1, Math.max(0, (p - .25) / .6)); gy(w, -1.2 + f * 3.4, 0, .9, 0, t); w.g.rotation.z = -.2 - f * .3; w.g.rotation.y = f * 6; },
    },
    {
      say: 'So the cat skated over and caught him.',
      show: ['floor', 'ice', 'trees', 'marks', 'flakes', 'g'], ...env,
      cam: { pos: [.8, 2.8, 7.5], look: [.8, 1.2, 0], fov: 50, to: { pos: [.8, 2.8, 7], look: [.8, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { snow(w, t); const f = Math.min(1, p * 1.5); ctAt(w, -.6 + f * 1.6, 0, .6, 0, .45); w.cr.rotation.z = .1; w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(w.cr.position.clone()); if (f < 1) gy(w, 2.2, 0, .9, 0, t); else gy(w, hp.x - .15, hp.y + .55, hp.z, -.4, t); },
    },
    {
      say: 'Best winter sport: hockey, curling, or sledding? Comment below.',
      quiz: { q: 'What is the best winter sport?', options: ['Hockey', 'Curling', 'Sledding'], answer: 'Fun fact: the first ice skates, around 3,000 years ago, were made from animal bones.' },
      show: ['floor', 'ice', 'trees', 'marks', 'flakes', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 3.2, 8], look: [0, 1.2, 0], fov: 48, to: { pos: [-2.4, 3.2, 8], look: [0, 1.2, 0] } },
      update: (w, p, t) => { snow(w, t); ctAt(w, .6, 0, .2, -2.4, .45); gy(w, -.9, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

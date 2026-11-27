// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary with a tiny drum kit, the cat behind.

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
  w.floor = k.ground('#5D6D7E', 0);
  w.wall = group(); box(60, 30, .5, mat('#2E4053'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.kit = group(); const shell = mat('#E74C3C', { metal: .3, rough: .4 }); cyl(.45, .45, .4, shell, [0, .2, 0], w.kit, 20); cyl(.46, .46, .02, mat('#FDFEFE'), [0, .41, 0], w.kit, 20); cyl(.3, .3, .3, shell, [.75, .45, -.2], w.kit, 16); cyl(.31, .31, .02, mat('#FDFEFE'), [.75, .61, -.2], w.kit, 16); cyl(.03, .03, .9, mat('#BDC3C7', { metal: .7 }), [-.7, .45, -.2], w.kit, 6); w.cym = cyl(.35, .35, .02, mat('#F4D03F', { metal: .8, rough: .2 }), [-.7, .92, -.2], w.kit, 20);
  w.sticks = group(); for (const z of [-.12, .12]) { const s = k.cyl(.02, .02, .7, mat('#E6B87A'), [0, .35, z], w.sticks, 6); s.rotation.z = .5; }
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.notes); ball(.12, mat('#F9E79F', { glow: .8 }), [0, 0, 0], n); cyl(.025, .025, .38, mat('#F9E79F', { glow: .8 }), [.1, .19, 0], n, 6); n.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const notes = (w, x, y, t) => w.notes.children.forEach(n => { const q = (t * .7 + n.userData.i / 4) % 1; n.position.set(x + Math.sin(n.userData.i * 2 + t) * .6, y + q * 2, .3); n.scale.setScalar(.6 + q * .6); });
const env = { sky: '#2E4053', lightAt: [0, 7, 4], lightDist: 20 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '521',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DRUMMER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED DRUMS FOR THE CAT.'],
  title: 'Gary the ant played drums for the cat',
  description: 'The drum kit is a set of thimbles. The drumsticks are two pins. And the cat? It joined in. Best band ever. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'music', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the average mature ideal body weight of domestic cats is about 3.2 kg (7 lb) for toms and 2.8 kg (6 lb) for queens (Merck Veterinary Manual, "Feeding Practices in Small Animals").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary played drums for the cat.',
      show: ['floor', 'wall', 'g', 'kit'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'sticks', 'notes'); w.kit.position.set(.3, 0, .6); w.kit.scale.setScalar(.6); ctAt(w, 1.8, 0, -1.8, -2.2, .7); gy(w, -.5, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The drum kit? Thimbles.',
      show: ['floor', 'wall', 'g', 'kit'], ...env,
      cam: { pos: [0, 1.4, 4.8], look: [-.1, .7, 0], fov: 46, to: { pos: [0, 1.4, 4.4], look: [-.1, .7, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'sticks', 'notes'); w.cr.visible = false; w.kit.position.set(.4, 0, 0); w.kit.scale.setScalar(1); gy(w, -.6, 0, .5, -1.2, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The drumsticks? Two pins.',
      show: ['floor', 'wall', 'g', 'kit', 'sticks', 'notes'], ...env,
      cam: { pos: [0, 1.4, 4.8], look: [-.1, .7, 0], fov: 46, to: { pos: [0, 1.4, 4.4], look: [-.1, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.kit.position.set(.4, 0, 0); w.kit.scale.setScalar(1); gy(w, -.5, 0, .45, -1.2, t); const hit = Math.abs(Math.sin(t * 10)); w.g.rotation.z = hit * .1; w.sticks.position.set(-.1, .5, .45); w.sticks.rotation.z = -hit * .5; w.cym.rotation.x = Math.sin(t * 20) * .1; notes(w, .3, 1, t); },
    },
    {
      say: 'The cat joined in. Best band ever.',
      show: ['floor', 'wall', 'g', 'kit', 'sticks', 'notes'], ...env,
      cam: { pos: [.2, 2.4, 8], look: [0, 1.2, 0], fov: 48, to: { pos: [.2, 2.4, 7.4], look: [0, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.kit.position.set(-.4, 0, .6); w.kit.scale.setScalar(.6); ctAt(w, 1.7, 0, -.4, -2.8, .8); w.c.eyes.forEach(e => e.scale.y = .2); w.c.body.scale.set(1.4 + Math.sin(t * 12) * .02, 1, 1); gy(w, -1, 0, 1, -1.2, t); const hit = Math.abs(Math.sin(t * 10)); w.sticks.position.set(-.6, .5, .95); w.sticks.rotation.z = -hit * .5; notes(w, .4, 1.6, t); },
    },
    {
      say: 'Best music for these two: rock, jazz, or pop? Comment below.',
      quiz: { q: 'What is the best music for Gary and the cat?', options: ['Rock', 'Jazz', 'Pop'], answer: 'Fun fact: an average adult pet cat ideally weighs about 3.2 kg if male and 2.8 kg if female.' },
      show: ['floor', 'wall', 'g', 'kit'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.2, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'sticks', 'notes'); w.kit.position.set(-.4, 0, .6); w.kit.scale.setScalar(.6); ctAt(w, 1.7, 0, -.4, -2.8, .8); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, -1, 0, 1, -1.2 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

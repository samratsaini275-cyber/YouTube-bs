// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

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
  w.floor = k.ground('#7A5A9A', 0);
  w.wall = box(60, 30, .5, mat('#2C3E6B'), [0, 15, -6]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 14; i++) { const s = ball(.08, mat('#FFF4C2', { glow: 1 }), [-6 + (i * 4.3) % 12, 3 + (i * 2.7) % 6, -5.7], w.stars); s.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.mb = group(); box(3.2, .9, 2, mat('#C0392B', { rough: .8 }), [0, .45, 0], w.mb); box(3, .1, 1.8, mat('#F5CBA7'), [0, .9, 0], w.mb); box(3.3, .5, 2.05, mat('#F4D03F'), [0, .45, .02], w.mb).scale.set(1, 1, 1);
  w.tis = box(2.6, .06, 1.7, mat('#FDFEFE', { rough: 1 }), [0, 0, 0], k.scene);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const zzz = (w, x, y, t) => w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(x + q * 1.2, y + q * 1.6, 0); z.scale.setScalar(.6 + q); });
const env = { sky: '#2C3E6B', lightAt: [0, 6, 3], lightDist: 20 };

export default {
  id: '486',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BEDTIME GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO BED.'],
  title: 'Gary the ant went to bed',
  description: 'His bed is a matchbox. His blanket is a tissue. And then the cat takes the whole bed. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: the Dracula ant (Mystrium camillae) snaps its jaws shut at up to 90 metres per second, the fastest known animal appendage (Larabee, Smith & Suarez, "Snap-jaw morphology is specialized for high-speed power amplification in the Dracula ant, Mystrium camillae", Royal Society Open Science, 2018).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary went to bed.',
      show: ['floor', 'wall', 'stars', 'g', 'mb'], ...env,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, .6, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.tis.visible = false; w.mb.position.set(-2.4, 0, -1.5); gy(w, .3, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His bed? A matchbox.',
      show: ['floor', 'wall', 'stars', 'g', 'mb'], ...env,
      cam: { pos: [.6, 3, 7.5], look: [0, .9, 0], fov: 46, to: { pos: [.6, 3, 6.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.tis.visible = false; w.mb.position.set(0, 0, 0); gy(w, -.1, .95, 0, -1.4, t); w.g.rotation.z = -.15; },
    },
    {
      say: 'His blanket? A tissue.',
      show: ['floor', 'wall', 'stars', 'g', 'mb', 'zz'], ...env,
      cam: { pos: [.6, 3, 7.5], look: [0, .9, 0], fov: 46, to: { pos: [.6, 3, 6.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.mb.position.set(0, 0, 0); w.tis.visible = true; const dr = Math.min(1, p * 2); w.tis.position.set(.2, 2.2 - dr * 1.15, .1); w.tis.rotation.set(0, 0, (1 - dr) * .4); gy(w, -.1, .95, 0, -1.4, t); w.g.rotation.z = -.15; zzz(w, .4, 1.6, t); w.zz.visible = p > .5; },
    },
    {
      say: 'Then the cat took the whole bed.',
      show: ['floor', 'wall', 'stars', 'g', 'mb', 'zz'], ...env,
      cam: { pos: [.8, 3.6, 10.5], look: [.3, 1.8, 0], fov: 50, to: { pos: [.8, 3.6, 9.9], look: [.3, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.mb.position.set(0, 0, 0); w.tis.visible = false; ctAt(w, 1.2, .9, -.2, -.3, .75); w.c.body.scale.set(1.5, .8, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 2.3, 0, 1.6, -2.2, t); w.g.rotation.z = 0; zzz(w, 1.6, 3.2, t); },
    },
    {
      say: 'Best bedtime story for Gary: a crumb, a castle, or a cat? Comment below.',
      quiz: { q: 'What is the best bedtime story for Gary?', options: ['A crumb', 'A castle', 'A cat'], answer: 'Fun fact: Dracula ants snap their jaws shut at up to 90 metres per second.' },
      show: ['floor', 'wall', 'stars', 'g', 'mb'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.2, 3.4, 10.5], look: [.6, 1.8, 0], fov: 48, to: { pos: [-.8, 3.4, 10.5], look: [.6, 1.8, 0] } },
      update: (w, p, t) => { w.mb.position.set(0, 0, 0); w.tis.visible = false; ctAt(w, 1.2, .9, -.2, -.3, .75); w.c.body.scale.set(1.5, .8, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 2.3, 0, 1.6, -2.2, t, true); },
    },
  ],
};

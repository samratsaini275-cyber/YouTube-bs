// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bathroom.

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
  w.floor = k.ground('#D6EAF8', 0);
  w.wall = group(); box(60, 30, .5, mat('#AED6F1'), [0, 15, -6], w.wall); for (let i = 0; i < 12; i++) box(.06, 30, .52, mat('#FFFFFF'), [-11 + i * 2, 15, -5.98], w.wall); for (let j = 0; j < 8; j++) box(60, .06, .52, mat('#FFFFFF'), [0, 1 + j * 2, -5.97], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  const st = mat('#D5DBDB', { metal: .7, rough: .25 });
  w.spoon = group(); const bowl = cyl(2.5, 1.9, .6, st, [0, .3, 0], w.spoon, 32); bowl.scale.set(1.15, 1, .85); const hd = box(5, .2, .6, st, [5, .5, 0], w.spoon); hd.rotation.z = .12;
  w.water = cyl(2.35, 2.35, .05, mat('#5DADE2', { glow: .25, rough: .1 }), [0, .62, 0], w.spoon, 32); w.water.scale.set(1.08, 1, .8);
  w.bub = group(); for (let i = 0; i < 6; i++) { const b = ball(.4 + (i % 3) * .2, mat('#EBF5FB', { glow: .4, rough: .05 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#AED6F1', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '485',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BATH TIME GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK A BATH.'],
  title: 'Gary the ant took a bath',
  description: 'His bathtub is a spoon. Every bubble is bigger than he is. And then the cat drinks his bath. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: Saharan silver ants are covered in special triangular hairs that reflect sunlight and help shed heat, which keeps them cool in the desert (Shi et al., "Keeping cool: Enhanced optical reflection and radiative heat dissipation in Saharan silver ants", Science, 2015).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary took a bath.',
      show: ['floor', 'wall', 'g', 'spoon'], ...env,
      cam: { pos: [1.6, 1.6, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.6, 5.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.spoon.position.set(-1.5, 0, -2); w.bub.visible = false; gy(w, .4, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His bathtub? A spoon.',
      show: ['floor', 'wall', 'g', 'spoon'], ...env,
      cam: { pos: [-.3, 4.2, 10.5], look: [-.3, 1, 0], fov: 48, to: { pos: [-.3, 4.2, 9.9], look: [-.3, 1, 0], fov: 46 } },
      update: (w, p, t) => { w.cr.visible = false; w.spoon.position.set(-1.8, 0, 0); w.water.visible = true; gy(w, -1.8, .62 + Math.sin(t * 3) * .05, .3, -1.2, t); w.g.rotation.z = -.15; },
    },
    {
      say: 'Bubbles? Each one bigger than him.',
      show: ['floor', 'wall', 'g', 'spoon', 'bub'], ...env,
      cam: { pos: [.8, 3.6, 9], look: [.4, 1.6, 0], fov: 48, to: { pos: [.8, 3.6, 8.4], look: [.4, 1.6, 0], fov: 46 } },
      update: (w, p, t) => { w.cr.visible = false; w.spoon.position.set(0, 0, 0); gy(w, 0, .62, .3, -1.2, t); w.g.rotation.z = Math.sin(t * 5) * .2; w.bub.children.forEach(b => { const i = b.userData.i, q = (t * .25 + i / 6) % 1; b.position.set(Math.cos(i * 1.7) * 1.9, 1.1 + q * 3, Math.sin(i * 1.7) * .9 - .6); }); },
    },
    {
      say: 'Then the cat drank his bath.',
      show: ['floor', 'wall', 'g', 'spoon'], ...env,
      cam: { pos: [1.4, 3.6, 11], look: [1.2, 2.1, 0], fov: 50, to: { pos: [1.4, 3.6, 10.4], look: [1.2, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.spoon.position.set(0, 0, 0); w.water.visible = p < .7; w.water.scale.set(1.08 * (1 - p * .6), 1, .8 * (1 - p * .6)); gy(w, -.9, .62, .6, -.6, t); w.g.rotation.z = 0; ctAt(w, 3.1, 0, -.4, Math.PI, .9); w.c.head.rotation.z = -.45 - Math.abs(Math.sin(t * 9)) * .12; },
    },
    {
      say: 'Best bath toy for Gary: a crumb, a seed, or a petal? Comment below.',
      quiz: { q: 'What is the best bath toy for Gary?', options: ['A crumb', 'A seed', 'A petal'], answer: 'Fun fact: Saharan silver ants have shiny hairs that reflect sunlight to keep them cool.' },
      show: ['floor', 'wall', 'g', 'spoon'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.4, 3.2, 11], look: [1.2, 2, 0], fov: 46, to: { pos: [-.6, 3.2, 11], look: [1.2, 2, 0] } },
      update: (w, p, t) => { w.water.visible = false; w.spoon.position.set(0, 0, 0); gy(w, -.9, .62, .6, -.6, t); ctAt(w, 3.1, 0, -.4, Math.PI + .3, .9); w.c.eyes.forEach(e => e.scale.y = .3); },
    },
  ],
};

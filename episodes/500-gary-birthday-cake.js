// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover). Episode 500.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a tiny cake, the cat behind.

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
  const w = {};
  w.floor = k.ground('#F5CBA7', 0);
  w.wall = group(); box(60, 30, .5, mat('#D6EAF8'), [0, 15, -6], w.wall); for (let i = 0; i < 9; i++) { const f = cone(.5, .9, mat(['#E74C3C', '#F4D03F', '#2ECC71'][i % 3]), [-8 + i * 2, 7 - (i % 2) * .3, -5.6], w.wall, 3); f.rotation.z = Math.PI; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cake = group(); cyl(.7, .7, .6, mat('#F5B7B1'), [0, .3, 0], w.cake, 20); cyl(.72, .72, .12, mat('#FDFEFE'), [0, .62, 0], w.cake, 20); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; ball(.06, mat(['#E74C3C', '#3498DB', '#F4D03F'][i % 3]), [Math.cos(a) * .5, .7, Math.sin(a) * .5], w.cake); }
  w.candle = group([0, .68, 0], w.cake); cyl(.04, .04, 1.6, mat('#F4D03F'), [0, .8, 0], w.candle, 8); box(.1, .14, .1, mat('#A04000'), [0, 1.66, 0], w.candle); w.flame = ball(.12, mat('#FF9F1C', { glow: 1.4 }), [0, 1.82, 0], w.candle); w.flame.scale.y = 1.6;
  w.puff = group(); for (let i = 0; i < 6; i++) { const b = ball(.18, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.puff); b.userData.i = i; b.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#D6EAF8', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '500',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BIRTHDAY GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BAKED THE CAT A CAKE.'],
  title: 'Gary the ant baked the cat a birthday cake',
  description: 'The cake is one crumb with icing. The candle is a matchstick. And then the cat blows out the candle. And Gary. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'birthday', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the oldest cat ever recorded, Creme Puff, was born on 3 August 1967 and lived until 6 August 2005, 38 years and 3 days (Guinness World Records, "Oldest cat ever").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary baked the cat a cake.',
      show: ['floor', 'wall', 'g', 'cake'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.puff.visible = false; w.cake.position.set(-1, 0, 0); w.flame.visible = true; ctAt(w, 1.6, 0, -2.2, -2.2, .7); gy(w, .2, 0, .8, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The cake? One crumb, with icing.',
      show: ['floor', 'wall', 'g', 'cake'], ...env,
      cam: { pos: [.4, 1.6, 4.6], look: [0, .6, 0], fov: 46, to: { pos: [.4, 1.6, 4.2], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { w.puff.visible = false; w.cr.visible = false; w.cake.position.set(-.5, 0, 0); w.candle.visible = false; gy(w, .8, 0, .3, -1.9, t); w.g.rotation.z = 0; },
    },
    {
      say: 'The candle? A matchstick.',
      show: ['floor', 'wall', 'g', 'cake'], ...env,
      cam: { pos: [.4, 1.9, 5], look: [0, 1.1, 0], fov: 46, to: { pos: [.4, 1.9, 4.6], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { w.puff.visible = false; w.cr.visible = false; w.cake.position.set(-.5, 0, 0); w.candle.visible = true; w.flame.visible = true; w.flame.scale.set(1 + .1 * Math.sin(t * 20), 1.6 + .2 * Math.sin(t * 17), 1); gy(w, .8, 0, .3, -1.9, t); w.g.rotation.z = Math.sin(t * 6) * .1; },
    },
    {
      say: 'The cat blew out the candle. And Gary.',
      show: ['floor', 'wall', 'g', 'cake', 'puff'], ...env,
      cam: { pos: [.4, 2.8, 9.5], look: [.2, 1.6, 0], fov: 50, to: { pos: [.4, 2.8, 8.9], look: [.2, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.cake.position.set(-.2, 0, .6); w.candle.visible = true; const blow = p > .35; w.flame.visible = !blow; ctAt(w, 2.3, 0, .2, -2.9, .85); w.c.head.rotation.z = -.15; const fly = blow ? Math.min(1, (p - .35) * 1.6) : 0; gy(w, -.9 - fly * 2.6, Math.sin(fly * Math.PI) * 1.6, .9, -1.6, t); w.g.rotation.z = fly * 8; w.puff.visible = blow; w.puff.children.forEach(b => { const i = b.userData.i, q = (t * 1.5 + i / 6) % 1; b.position.set(1.2 - q * 2.6, 1.1 + Math.sin(i) * .25, .7 + Math.cos(i) * .2); b.scale.setScalar(.6 + q); }); },
    },
    {
      say: 'Best birthday present for the cat: a box, a nap, or Gary? Comment below.',
      quiz: { q: 'What is the best birthday present for the cat?', options: ['A box', 'A nap', 'Gary'], answer: 'Fun fact: the oldest cat ever, Creme Puff, lived to 38 years and 3 days.' },
      show: ['floor', 'wall', 'g', 'cake'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.2, 2.8, 9.5], look: [.2, 1.6, 0], fov: 48, to: { pos: [-1, 2.8, 9.5], look: [.2, 1.6, 0] } },
      update: (w, p, t) => { w.puff.visible = false; w.cake.position.set(-.2, 0, .6); w.candle.visible = true; w.flame.visible = false; ctAt(w, 2.3, 0, .2, -2.9, .85); w.c.eyes.forEach(e => e.scale.y = .3); gy(w, -1, 0, 1.2, -1.6 + .3 * Math.sin(t * 3), t, true); w.g.rotation.z = 0; },
    },
  ],
};

// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in front of the big orange cat.

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
  w.floor = k.ground('#D7BDE2', 0);
  w.wall = group(); box(60, 30, .5, mat('#FCF3CF'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.pick = cyl(.06, .06, 2.4, mat('#E6B87A'), [0, 0, 0], k.scene, 8);
  w.hair = cyl(.04, .04, 3.4, mat('#F2A04A'), [0, 0, 0], k.scene, 6);
  w.tongue = group(); const tg = ball(.6, mat('#F1948A'), [0, 0, 0], w.tongue); tg.scale.set(1.6, .25, 1);
  w.drops = group(); for (let i = 0; i < 8; i++) { const d = ball(.1, mat('#AED6F1', { glow: .3 }), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FCF3CF', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '494',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GROOMER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'GROOMED THE CAT.'],
  title: 'Gary the ant groomed the cat',
  description: 'His comb is a toothpick. One cat hair is longer than he is. And then the cat grooms him back: one lick. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: most of a cat\'s weight is centred on its front paws while it walks (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary groomed the cat.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pick', 'hair', 'tongue', 'drops'); ctAt(w, 1.2, 0, -2, -2.2, .7); gy(w, -.2, 0, .8, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His comb? A toothpick.',
      show: ['floor', 'wall', 'g', 'pick'], ...env,
      cam: { pos: [.4, 1.8, 6.5], look: [0, 1.1, 0], fov: 46, to: { pos: [.4, 1.8, 5.9], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'hair', 'tongue', 'drops'); ctAt(w, 1.8, 0, -1.6, -2.4, .9); gy(w, -.4, 0, .6, -1.2, t); w.g.rotation.z = 0; w.pick.visible = true; w.pick.position.set(.2, 1.1 + Math.sin(t * 6) * .25, .7); w.pick.rotation.set(0, 0, .5 + Math.sin(t * 6) * .3); },
    },
    {
      say: 'One hair? Longer than he is.',
      show: ['floor', 'wall', 'g', 'hair'], ...env,
      cam: { pos: [.4, 1.8, 6.5], look: [0, 1.1, 0], fov: 46, to: { pos: [.4, 1.8, 5.9], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'pick', 'tongue', 'drops'); w.cr.visible = false; gy(w, -.2, 0, .6, -1.4, t, true); w.g.rotation.z = -.2; w.hair.visible = true; w.hair.position.set(.6, .55, .6); w.hair.rotation.set(0, 0, Math.PI / 2 - .15 + Math.sin(t * 3) * .05); },
    },
    {
      say: 'Then the cat groomed him. One lick.',
      show: ['floor', 'wall', 'g', 'tongue', 'drops'], ...env,
      cam: { pos: [.8, 2.6, 8], look: [.4, 1.5, 0], fov: 48, to: { pos: [.8, 2.6, 7.4], look: [.4, 1.5, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pick', 'hair'); ctAt(w, 1.8, 0, -.5, -2.9, .85); const lk = Math.max(0, Math.sin(Math.min(1, Math.max(0, (p - .3) * 2.5)) * Math.PI)); w.c.head.rotation.z = -.3 * lk; w.tongue.visible = lk > .05; w.tongue.position.set(.5 - lk * .3, .55 + lk * .2, .5); w.tongue.rotation.z = -.4; const wet = p > .55; gy(w, -.4, 0, .6, -1.2, t); if (wet) w.g.scale.set(1.3, 1.05, 1.3); w.g.rotation.z = wet ? Math.sin(t * 20) * .05 : 0; w.drops.visible = wet; w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.2 + i / 8) % 1; d.position.set(-.4 + Math.cos(i) * q * 1.4, 1 + q * .6 - q * q * 1.6, .6 + Math.sin(i) * q); }); },
    },
    {
      say: 'Best brush for Gary: a toothpick, an eyelash, or a feather? Comment below.',
      quiz: { q: 'What is the best brush for Gary?', options: ['A toothpick', 'An eyelash', 'A feather'], answer: 'Fun fact: when a cat walks, most of its weight is on its front paws.' },
      show: ['floor', 'wall', 'g'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.2, 2.4, 8.5], look: [.4, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 8.5], look: [.4, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'pick', 'hair', 'tongue', 'drops'); ctAt(w, 1.8, 0, -.5, -2.9, .85); w.c.eyes.forEach(e => e.scale.y = .3); gy(w, -.4, 0, .6, -1.2 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

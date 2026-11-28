// Narrative 31: "In This Town… (season 6: tiny and giant animals)". Town rules built on the best-performing premise (tiny/giant animals), with Gary and the orange cat.
// Hook: the rule under 2 s; first frame shows an ant-sized dog barking next to Gary.

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

function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#7DBE5A', 0);
  w.path = box(30, .02, 1.6, mat('#D8C9A8'), [0, .01, .6], k.scene); w.path.castShadow = false;
  w.trees = group(); for (let i = 0; i < 5; i++) { const t = group([-6 + i * 3, 0, -4.5], w.trees); cyl(.15, .2, 1.4, mat('#6E4B2A'), [0, .7, 0], t, 8); ball(.9, mat('#1E8449'), [0, 1.9, 0], t); }
  w.fence = group(); for (let i = 0; i < 14; i++) box(.12, .8, .12, mat('#FDFEFE'), [-6.5 + i, .4, -2.5], w.fence); box(14, .1, .08, mat('#FDFEFE'), [0, .6, -2.5], w.fence);
  w.d = dog(k, k.scene);
  w.leash = cyl(.015, .015, 1, mat('#E74C3C'), [0, 0, 0], k.scene, 6); w.leash.castShadow = false;
  w.crumb = box(.16, .1, .12, mat('#E6B85C', { rough: .9 }), [0, .05, 0], k.scene);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.visible = true; w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const dg = (w, x, z, ry, t, move = false, s = .32) => { const d = w.d; d.root.visible = true; d.root.position.set(x, 0, z); d.root.rotation.set(0, ry, 0); d.root.scale.setScalar(s); d.head.rotation.set(0, 0, 0); d.mouth.scale.set(1, 1, 1); if (move) trot(d, t, 22); else d.legs.forEach(l => l.rotation.z = 0); d.tail.rotation.z = -.8 + .4 * Math.sin(t * 12); };
// A red leash from Gary's front to the dog's neck, re-aimed every frame.
const leash = (w) => { const T = w.k.THREE; w.g.updateWorldMatrix(true, true); w.d.root.updateWorldMatrix(true, true); const a = w.g.localToWorld(new T.Vector3(.5, .45, 0)), b = w.d.head.localToWorld(new T.Vector3(.3, -.3, 0)); w.leash.visible = true; w.leash.position.copy(a).add(b).multiplyScalar(.5); w.leash.scale.set(1, a.distanceTo(b), 1); w.leash.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), b.clone().sub(a).normalize()); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '565',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TINY DOGS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'DOGS ARE TINY'],
  title: 'In this town, dogs are tiny (Gary the ant and the cat)',
  description: 'Gary walked a dog his own size. It chased a crumb. Then the cat showed up, and the tiny dog did not back down. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'dog', 'tiny', 'cat', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: ant-sized dogs are made up. Quiz fact: dogs were among the first animals to be domesticated, sometime between about 12,000 and 32,000 years ago (Encyclopaedia Britannica, "Dog" and "Domestication of dogs" summary).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, dogs are tiny.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [0, 2.3, 5.4], look: [0, .6, .6], fov: 44, to: { pos: [0, 2.3, 5], look: [0, .6, .6], fov: 42 } },
      update: (w, p, t) => { hide(w, 'crumb', 'leash'); w.cr.visible = false; gy(w, -.6, 0, .6, -.2, t); dg(w, .95, .7, Math.PI / 2 - .5, t); w.d.mouth.scale.set(1, 2.4, 1); w.d.head.rotation.z = -.2; },
    },
    {
      say: 'Gary walked one on a leash.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'leash'], ...env,
      cam: { pos: [0, 2.5, 6.4], look: [0, .6, .6], fov: 46, to: { pos: [0, 2.5, 6], look: [0, .6, .6], fov: 44 } },
      update: (w, p, t) => { hide(w, 'crumb'); w.cr.visible = false; const x = -1.8 + p * 1.6; gy(w, x, 0, .6, 0, t, true); dg(w, x + 1.8, .6, Math.PI + .5, t, true); leash(w); },
    },
    {
      say: 'It chased a crumb.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'crumb'], ...env,
      cam: { pos: [0, 2, 5], look: [0, .5, .6], fov: 46, to: { pos: [.3, 2, 4.7], look: [.3, .5, .6], fov: 44 } },
      update: (w, p, t) => { hide(w, 'leash'); w.cr.visible = false; const x = -.8 + p * 1.6; w.crumb.position.set(x + .9, .05 + Math.abs(Math.sin(t * 6)) * .08, .7); w.crumb.rotation.z = -t * 6; dg(w, x, .7, Math.PI, t, true); w.d.mouth.scale.set(1, 2.2, 1); gy(w, -1.6, 0, .4, -.4, t); },
    },
    {
      say: 'Then the cat showed up.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [.6, 2.2, 6.8], look: [.7, 1, 0], fov: 50, to: { pos: [.6, 2.2, 6.4], look: [.7, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'crumb', 'leash'); ctAt(w, 2, 0, -.6, Math.PI, .45); w.c.head.rotation.z = -.25; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.3); gy(w, -.9, 0, .6, 0, t); w.g.position.y = Math.abs(Math.sin(t * 9)) * .05; dg(w, -.2, .8, 0, t); w.d.legs.forEach(l => l.rotation.z = .1 * Math.sin(t * 30)); },
    },
    {
      say: 'The tiny dog stood its ground. The cat ran away.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [.6, 2.2, 6.8], look: [.7, 1, 0], fov: 50, to: { pos: [.5, 2.2, 7], look: [.9, 1, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'crumb', 'leash'); const f = Math.max(0, (p - .5) * 2); ctAt(w, 2 + f * 3, Math.abs(Math.sin(t * 9)) * .2 * (f > 0 ? 1 : 0), -.6, f > 0 ? 0 : Math.PI, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.6); dg(w, -.1 + f * .6, .8, 0, t, f > 0); w.d.head.rotation.z = -.3; w.d.mouth.scale.set(1, 2.5 + Math.sin(t * 12), 1); gy(w, -.9, 0, .6, 0, t); w.g.rotation.z = f > 0 ? .3 * Math.sin(t * 8) : 0; },
    },
    {
      say: 'Best tiny dog name: Peanut, Pickles, or Gary Junior? Comment below.',
      quiz: { q: 'Best name for a tiny dog?', options: ['Peanut', 'Pickles', 'Gary Junior'], answer: 'Fun fact: dogs were among the very first domesticated animals.' },
      show: ['floor', 'path', 'trees', 'fence', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [1.4, 2.3, 5.6], look: [0, .6, .6], fov: 46, to: { pos: [-1.4, 2.3, 5.6], look: [0, .6, .6] } },
      update: (w, p, t) => { hide(w, 'crumb', 'leash'); w.cr.visible = false; gy(w, -.6, 0, .6, -.2, t); dg(w, .95, .7, Math.PI / 2 - .5, t); w.d.mouth.scale.set(1, 1.8, 1); },
    },
  ],
};

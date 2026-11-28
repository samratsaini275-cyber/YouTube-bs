// Narrative 31: "In This Town… (season 6: tiny and giant animals)". Town rules built on the best-performing premise (tiny/giant animals), with Gary and the orange cat.
// Hook: the rule under 2 s; first frame shows an ant-sized elephant with its trunk up next to Gary.

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

function elephant(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const g = mat('#9AA0A8', { rough: .7 });
  const e = { root: group([0, 0, 0], parent) };
  const b = ball(1, g, [0, 1.5, 0], e.root); b.scale.set(1.35, 1, 1);
  e.head = group([1.2, 2, 0], e.root); ball(.75, g, [0, 0, 0], e.head);
  for (const z of [-.3, .3]) { ball(.12, mat('#FFFFFF'), [.55, .2, z], e.head); ball(.06, mat('#111111'), [.65, .2, z], e.head); }
  e.ears = [-1, 1].map(s => { const ear = ball(.7, mat('#B8A0A8', { rough: .7 }), [-.1, .1, s * .7], e.head); ear.scale.set(.8, 1, .15); return ear; });
  e.trunk = []; let prev = e.head;
  for (let i = 0; i < 5; i++) { const t = group(i ? [0, -.32, 0] : [.65, -.2, 0], prev); cyl(.17 - i * .02, .19 - i * .02, .36, g, [0, -.16, 0], t, 10); e.trunk.push(t); prev = t; }
  e.legs = []; for (const x of [-.7, .7]) for (const z of [-.45, .45]) e.legs.push(cyl(.28, .28, 1, g, [x, .5, z], e.root, 10));
  const tail = cyl(.04, .04, .6, g, [-1.4, 1.5, 0], e.root, 6); tail.rotation.z = .6;
  return e;
}
const trunk = (e, t, up = .4) => e.trunk.forEach((s, i) => s.rotation.z = up * (1 + .3 * Math.sin(t * 3 + i)));


function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#7DBE5A', 0);
  w.path = box(30, .02, 1.6, mat('#D8C9A8'), [0, .01, .6], k.scene); w.path.castShadow = false;
  w.trees = group(); for (let i = 0; i < 5; i++) { const t = group([-6 + i * 3, 0, -4.5], w.trees); cyl(.15, .2, 1.4, mat('#6E4B2A'), [0, .7, 0], t, 8); ball(.9, mat('#1E8449'), [0, 1.9, 0], t); }
  w.fence = group(); for (let i = 0; i < 14; i++) box(.12, .8, .12, mat('#FDFEFE'), [-6.5 + i, .4, -2.5], w.fence); box(14, .1, .08, mat('#FDFEFE'), [0, .6, -2.5], w.fence);
  w.e = elephant(k, k.scene);
  w.flowers = group(); const fc = ['#E74C3C', '#F1C40F', '#AF7AC5']; for (let i = 0; i < 3; i++) { const f = group([i * .35, 0, (i % 2) * .2], w.flowers); cyl(.02, .02, .5, mat('#27AE60'), [0, .25, 0], f, 6); ball(.1, mat(fc[i]), [0, .52, 0], f); }
  w.drops = group(); for (let i = 0; i < 10; i++) { const d = ball(.05, mat('#5DADE2', { glow: .4 }), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.visible = true; w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const el = (w, x, z, ry, t, s = .26) => { const e = w.e; e.root.visible = true; e.root.position.set(x, 0, z); e.root.rotation.set(0, ry, 0); e.root.scale.setScalar(s); e.legs.forEach(l => l.rotation.z = 0); e.ears.forEach(a => a.rotation.x = .2 * Math.sin(t * 5)); trunk(e, t, .2); };
// Water arcs from the trunk tip to a target point.
const spray = (w, to, t) => { const T = w.k.THREE; w.e.root.updateWorldMatrix(true, true); const a = w.e.trunk[4].localToWorld(new T.Vector3(0, -.32, 0)); w.drops.visible = true; w.drops.children.forEach(d => { const f = (t * 1.6 + d.userData.i / 10) % 1; d.position.set(a.x + (to[0] - a.x) * f, a.y + (to[1] - a.y) * f + Math.sin(f * Math.PI) * .5, a.z + (to[2] - a.z) * f); }); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '567',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TINY ELEPHANTS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'ELEPHANTS ARE TINY'],
  title: 'In this town, elephants are tiny (Gary the ant and the cat)',
  description: 'A tiny elephant watered Gary\'s flowers. Then it watered Gary. Then it watered the cat. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'elephant', 'tiny', 'cat', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: ant-sized elephants are made up. Quiz fact: elephants do not drink through their trunks; they suck water up into the trunk and then squirt it into their mouths (Encyclopaedia Britannica, "What Are Elephant Trunks Used For?" and Britannica Kids, "Elephant").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, elephants are tiny.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [0, 2.5, 6.2], look: [0, .6, .6], fov: 44, to: { pos: [0, 2.5, 5.8], look: [0, .6, .6], fov: 42 } },
      update: (w, p, t) => { hide(w, 'flowers', 'drops'); w.cr.visible = false; gy(w, -.55, 0, .6, -.2, t); el(w, .75, .8, -Math.PI / 2 - .6, t); trunk(w.e, t, -.5); },
    },
    {
      say: 'One watered Gary\'s flowers.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'flowers'], ...env,
      cam: { pos: [0, 2.6, 6.6], look: [0, .6, .5], fov: 44, to: { pos: [0, 2.6, 6.2], look: [0, .6, .5], fov: 42 } },
      update: (w, p, t) => { w.cr.visible = false; w.flowers.position.set(-.3, 0, .2); gy(w, -1.1, 0, .9, -.4, t); el(w, .9, .5, Math.PI - .5, t); trunk(w.e, t, -.3); spray(w, [0, .55, .3], t); },
    },
    {
      say: 'Then it watered Gary.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'flowers'], ...env,
      cam: { pos: [0, 2.4, 6], look: [-.1, .6, .5], fov: 44, to: { pos: [0, 2.4, 5.6], look: [-.1, .6, .5], fov: 42 } },
      update: (w, p, t) => { w.cr.visible = false; w.flowers.position.set(-.3, 0, -.4); gy(w, -.7, 0, .8, 0, t); w.g.rotation.x = .08 * Math.sin(t * 30); el(w, .8, .6, Math.PI - .4, t); trunk(w.e, t, -.4); spray(w, [-.5, .7, .7], t); },
    },
    {
      say: 'Then it watered the cat.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [.2, 2.4, 7.4], look: [.1, 1, 0], fov: 50, to: { pos: [.2, 2.4, 7], look: [.1, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'flowers'); ctAt(w, -.6, 0, -.8, .4, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .4); w.c.head.rotation.z = -.1; gy(w, -1.2, 0, 1.2, 0, t); el(w, 1.1, .8, Math.PI - .5, t); trunk(w.e, t, -.6); spray(w, [.1, 1.1, -.4], t); },
    },
    {
      say: 'Now it hides behind Gary.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [.2, 2.4, 7], look: [.2, .9, 0], fov: 50, to: { pos: [.2, 2.4, 6.6], look: [.2, .9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'flowers', 'drops'); ctAt(w, 1.3, 0, -.8, Math.PI + .3, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .4); w.c.head.rotation.z = -.2; gy(w, -.1, 0, 1, 0, t); el(w, -1.05, .55, -.5, t, .22); w.e.root.position.x += .02 * Math.sin(t * 35); trunk(w.e, t, .6); },
    },
    {
      say: 'Best job for a tiny elephant: gardener, firefighter, or bath buddy? Comment below.',
      quiz: { q: 'Best job for a tiny elephant?', options: ['Gardener', 'Firefighter', 'Bath buddy'], answer: 'Fun fact: elephants don\'t drink through their trunks. They squirt water into their mouths.' },
      show: ['floor', 'path', 'trees', 'fence', 'g', 'flowers'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [1.4, 2.5, 6.4], look: [0, .6, .6], fov: 46, to: { pos: [-1.4, 2.5, 6.4], look: [0, .6, .6] } },
      update: (w, p, t) => { hide(w, 'drops'); w.cr.visible = false; w.flowers.position.set(-.2, 0, -.6); gy(w, -.55, 0, .6, -.2, t); el(w, .75, .8, -Math.PI / 2 - .6, t); trunk(w.e, t, -.5); },
    },
  ],
};

// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Gary premise (every fifth: 369, 374, 379, 384), with a cat patient.
// Hook: the premise as a question under 2 s; first frame shows Gary with a tiny stethoscope.

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
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.floor = k.ground('#DDEFF2', 0);
  w.wall = group(); box(60, 30, .3, mat('#EAF6F2'), [0, 15, -8], w.wall); const cr = box(2.4, 2.4, .05, mat('#FFFFFF'), [5, 6, -7.8], w.wall); box(1.6, .5, .06, mat('#3FA34D'), [5, 6, -7.75], w.wall); box(.5, 1.6, .06, mat('#3FA34D'), [5, 6, -7.75], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.steth = group([.42, .3, 0], w.g); const tube = torus(.15, .022, mat('#3B6FD6'), [0, 0, 0], w.steth); tube.rotation.set(Math.PI / 2, 0, 0); w.bell = cyl(.05, .05, .03, mat('#C9D1D9', { metal: .8 }), [.32, -.22, .08], w.steth, 12); w.bell.rotation.z = Math.PI / 2;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.waves = group(); for (let i = 0; i < 3; i++) { const r = torus(.6, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.waves); r.userData.i = i; }
  w.fur = group(); for (let i = 0; i < 18; i++) { const f = ball(.35, mat(i % 2 ? '#F2A04A' : '#F7B868'), [0, 0, 0], w.fur); f.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, z, ry, s) => { w.cr.position.set(x, 0, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '369',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'VET GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A VET?'],
  title: 'What would happen if Gary the ant was a vet?',
  description: 'His first patient is a cat. A very big cat. He listens to its purr: earthquake. And the cure? A belly rub. Now Gary is lost in the fur. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'vet', 'cat', 'funny', 'shorts'],
  sources: ['Quiz fact: many ants tend aphids, protecting them and collecting the sugary honeydew they produce, a bit like farmers with livestock (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a vet?', show: ['floor', 'wall', 'g', 'steth'], sky: '#EAF6F2', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .72, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); w.steth.rotation.x = .1 * Math.sin(t * 4); } },
    { say: 'His first patient? A cat. A very big cat.', label: 'GULP', show: ['floor', 'wall', 'g', 'steth', 'cr'], sky: '#EAF6F2', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3.5, 2, 11], look: [0, 3, 0], fov: 56, to: { pos: [3.5, 2, 10.5], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { ctAt(w, -2.2, -2.5, -.9, 1.3); w.c.head.rotation.z = -.15 + .05 * Math.sin(t * 2); gy(w, 1.4, 0, 2.2, -1.9, t); w.g.scale.setScalar(1.6); w.g.rotation.z = p > .5 ? .15 * Math.sin(t * 30) : 0; } },
    { say: 'He listens to its purr. Earthquake.', label: 'PRRRRRR', show: ['floor', 'wall', 'g', 'steth', 'cr', 'waves'], sky: '#EAF6F2', lightAt: [2, 10, 8], lightDist: 30, shake: (t) => .12,
      cam: { pos: [3.5, 2.4, 9], look: [0, 2.4, 0], fov: 54, to: { pos: [3.5, 2.4, 8.5], look: [0, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { ctAt(w, -2.4, -1.5, -.5, 1.3); w.c.eyes.forEach(e => e.scale.y = .2); w.c.body.scale.set(1.4, 1 + .03 * Math.sin(t * 30), 1); w.cr.updateWorldMatrix(true, true); const side = w.c.body.getWorldPosition(new w.k.THREE.Vector3()); gy(w, side.x + 3.6, .05 * Math.abs(Math.sin(t * 30)), side.z + 2.4, Math.PI - .3, t); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 3) % 1; r.position.set(side.x + 1, side.y + .5, side.z + 1.5); r.scale.setScalar(.5 + q * 3); }); } },
    { say: 'And the cure? A belly rub. Now Gary is lost in the fur.', label: 'GARY?', show: ['floor', 'wall', 'cr', 'fur', 'g'], sky: '#EAF6F2', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3, 3.6, 9], look: [0, 1.6, 0], fov: 54, to: { pos: [3, 3.6, 8.5], look: [0, 1.6, 0], fov: 52 } },
      update: (w, p, t) => { w.c.body.scale.set(1.4, 1, 1); ctAt(w, -1, -1, -.5, 1.3); w.c.body.rotation.x = -.6; w.c.head.rotation.z = .3; w.c.eyes.forEach(e => e.scale.y = .2); const lost = p > .5; w.g.visible = true; gy(w, .2, lost ? 1.2 : 0, 1.4, -1.2, t, !lost); w.g.visible = !lost || Math.sin(t * 6) > .6; w.fur.children.forEach(f => { const i = f.userData.i; f.position.set(-.6 + (i % 6) * .5, .6 + Math.floor(i / 6) * .4 + .05 * Math.sin(t * 4 + i), 1.1 + (i % 3) * .2); f.visible = lost; }); } },
    { say: 'Vet Gary: brave, tiny, or totally lost? Comment below.',
      quiz: { q: 'Vet Gary is…', options: ['Brave', 'Tiny', 'Totally lost'], answer: 'Real ants look after aphids, like tiny farmers with tiny cows.' },
      show: ['floor', 'g', 'steth'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.c.eyes.forEach(e => e.scale.y = 1); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

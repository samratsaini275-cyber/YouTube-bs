// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)" finale. Gary premise + cat (both the channel's best performers).
// Hook: the premise as a question under 2 s; first frame shows Gary in a tiny cowboy hat on a cat's back.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(60, 30, .3, mat('#EADBC8'), [0, 15, -8], w.wall); box(60, .4, .4, mat('#FFFFFF'), [0, 1.2, -7.7], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.hat = group([.32, .52, 0], w.g); cyl(.26, .26, .03, mat('#8B5A2B'), [0, 0, 0], w.hat, 14); cyl(.13, .15, .2, mat('#8B5A2B'), [0, .1, 0], w.hat, 12);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.dot = ball(.18, mat('#FF2020', { glow: 1 }), [0, 0, 0]);
  w.trail = group(); for (let i = 0; i < 8; i++) { const s = ball(.5, mat('#F2A04A'), [0, 0, 0], w.trail); s.userData.i = i; s.material.transparent = true; s.material.opacity = .4 - i * .04; s.castShadow = false; }
  w.conf = group(); for (let i = 0; i < 14; i++) { const c = box(.12, .12, .02, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const onBack = (w, t, ry, bounce = 0) => { w.cr.updateWorldMatrix(true, true); const top = w.c.body.localToWorld(new w.k.THREE.Vector3(.1, 1.02, 0)); gy(w, top.x, top.y + bounce, top.z, ry, t); };

export default {
  id: '384',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY RIDES A CAT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'RODE A CAT?'],
  title: 'What would happen if Gary the ant rode a cat? (season finale)',
  description: 'He climbs on, and the cat does not even notice. Giddy up? The cat lies down. Then a red dot appears. Hold on, Gary! Season finale. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'cat', 'funny', 'shorts'],
  sources: ['Quiz fact: Saharan silver ants have been measured running at up to 855 millimetres per second, about 108 of their own body lengths every second (Pfeffer et al., "High-speed locomotion in the Saharan silver ant, Cataglyphis bombycina", Journal of Experimental Biology, 2019).'],
  setup,
  scenes: [
    { say: 'What if Gary rode a cat?', show: ['floor', 'wall', 'g', 'hat', 'cr'], sky: '#EADBC8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.5, 3.2, 11], look: [0, 3.6, 0], fov: 50, to: { pos: [1.4, 3.2, 10.4], look: [0, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, -.2, 0, 0, -.25, 1); w.c.head.rotation.z = .08 * Math.sin(t * 2); onBack(w, t, -.25); w.g.rotation.z = .08 * Math.sin(t * 5); } },
    { say: 'He climbs on. The cat does not even notice.', label: 'HELLO?', show: ['floor', 'wall', 'g', 'hat', 'cr'], sky: '#EADBC8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3, 3, 9], look: [0, 2, 0], fov: 50, to: { pos: [3, 3, 8.5], look: [0, 2, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.2, 1); w.c.head.rotation.z = .05 * Math.sin(t * 1.5); const q = Math.min(1, p * 1.6); w.cr.updateWorldMatrix(true, true); const top = w.c.body.localToWorld(new w.k.THREE.Vector3(.1, 1.02, 0)); const side = w.c.body.localToWorld(new w.k.THREE.Vector3(.2, -.3, 1)); gy(w, side.x + (top.x - side.x) * q, side.y * (1 - q) + top.y * q, side.z + (top.z - side.z) * q, -.2, t, q < 1); w.g.rotation.z = q < 1 ? .8 : 0; } },
    { say: 'Giddy up? The cat lies down.', label: 'YAWN', show: ['floor', 'wall', 'g', 'hat', 'cr'], sky: '#EADBC8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3, 3, 9], look: [0, 1.8, 0], fov: 50, to: { pos: [3, 3, 8.5], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { const d = Math.min(1, Math.max(0, (p - .35) * 3)); ctAt(w, -.6, -d * .6, 0, -.2, 1); w.c.eyes.forEach(e => e.scale.y = d > .5 ? .15 : 1); w.c.head.rotation.z = -d * .3; onBack(w, t, -.2, d < 1 ? .1 * Math.abs(Math.sin(t * 10)) : 0); w.g.userData.legs.forEach(l => l.rotation.x = d < 1 ? .4 * Math.sin(t * 20) : 0); } },
    { say: 'Then a red dot appears. Hold on, Gary!', label: 'ZOOOOM!', show: ['floor', 'wall', 'g', 'hat', 'cr', 'dot', 'trail', 'conf'], sky: '#EADBC8', lightAt: [2, 10, 8], lightDist: 30, shake: (t) => t > .9 ? .08 : 0,
      cam: { pos: [0, 4, 13], look: [0, 1.6, 0], fov: 56, to: { pos: [0, 4, 12.5], look: [0, 1.6, 0], fov: 54 } },
      update: (w, p, t) => { const go = t > .9; const x = go ? -5 + ((t - .9) * 9) % 10 : -1; w.dot.position.set(go ? x + 3 : 2.4 + .3 * Math.sin(t * 6), .05, 1); ctAt(w, x, go ? .3 * Math.abs(Math.sin(t * 14)) : 0, 0, 0, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? (go ? .5 : 2) : 1.3); onBack(w, t, 0, go ? .3 * Math.abs(Math.sin(t * 14 + 1)) : 0); w.g.rotation.z = go ? .4 : 0; w.trail.children.forEach(s => { const i = s.userData.i; s.position.set(x - 1.6 - i * .6, 1.2, 0); s.visible = go; }); w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 14) % 1; c.position.set(-4 + (i * .61) % 8, 6 - q * 6, .5 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); c.visible = p > .7; }); } },
    { say: 'Should Gary ride a cat again? Comment below.',
      quiz: { q: 'Gary the cat rider is…', options: ['Brave', 'Tiny', 'Holding on for dear life'], answer: 'Real Saharan silver ants run about 108 body lengths every second.' },
      show: ['floor', 'g', 'hat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.cr.visible = false; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

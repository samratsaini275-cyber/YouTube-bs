// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Gary premise (every fifth: 369, 374, 379, 384), with a cat.
// Hook: the premise as a question under 2 s; first frame shows Gary beside a cat bowl bigger than him.

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
  w.floor = k.ground('#E6D2B0', 0);
  w.wall = group(); box(60, 30, .3, mat('#F2E2EE'), [0, 15, -8], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.bowl = group(); cyl(.9, .7, .5, mat('#E2453C'), [0, .25, 0], w.bowl, 20); cyl(.75, .75, .05, mat('#8A5A34'), [0, .48, 0], w.bowl, 20);
  w.fish = group(); const fb = ball(.6, mat('#9FB8C8', { metal: .3 }), [0, 0, 0], w.fish); fb.scale.set(2, .7, .5); const ft = cone(.5, .6, mat('#9FB8C8'), [-1.4, 0, 0], w.fish, 3); ft.rotation.z = Math.PI / 2; ball(.08, mat('#111111'), [1, .15, .26], w.fish);
  w.yarn = group(); ball(.7, mat('#E85A9A'), [0, 0, 0], w.yarn); for (let i = 0; i < 3; i++) { const r = torus(.7, .04, mat('#C9447E'), [0, 0, 0], w.yarn); r.rotation.set(i, i * .7, 0); }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '374',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAT SITTER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A CAT SITTER?'],
  title: 'What would happen if Gary the ant was a cat sitter?',
  description: 'Dinner? One fish, ten times bigger than Gary. Playtime? The cat plays with Gary. And nap time? The cat sleeps on Gary. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'cat', 'funny', 'shorts'],
  sources: ['Quiz fact: in lab tests, the neck joint of an Allegheny mound ant withstood forces of about 5,000 times the ant\'s body weight before failing (Nguyen et al., Journal of Biomechanics, 2014).'],
  setup,
  scenes: [
    { say: 'What if Gary was a cat sitter?', show: ['floor', 'wall', 'g', 'bowl'], sky: '#F2E2EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.6, 1.3, 6], look: [.3, .72, 0], fov: 46, to: { pos: [1.5, 1.3, 5.4], look: [.3, .72, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, .35, 0, .6, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); w.bowl.position.set(1.9, 0, -.6); } },
    { say: 'Dinner? One fish, ten times bigger than Gary.', label: 'HEAVE…', show: ['floor', 'wall', 'g', 'fish', 'bowl'], sky: '#F2E2EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [2, 2.4, 8], look: [0, 1, 0], fov: 50, to: { pos: [2, 2.4, 7.5], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { const x = -2 + p * 2.4; gy(w, x, 0, .6, 0, t, true); w.fish.position.set(x, 1.3 + .05 * Math.sin(t * 10), .6); w.fish.rotation.z = .08 * Math.sin(t * 5); w.bowl.position.set(2.6, 0, 0); } },
    { say: 'Playtime? The cat plays with Gary.', label: 'BOING BOING', show: ['floor', 'wall', 'g', 'cr', 'yarn'], sky: '#F2E2EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3.5, 2.6, 10], look: [0, 2, 0], fov: 54, to: { pos: [3.5, 2.6, 9.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { ctAt(w, -2.4, 0, -1.5, -.4, 1.2); const b = Math.abs(Math.sin(t * 3)); w.c.paw.position.set(1.1 + b * .5, .5 + b * .8, .9); w.yarn.position.set(1, .7 + b * 2.4, 0); w.yarn.rotation.z = -t * 4; gy(w, 1, 1.4 + b * 2.4, 0, -1.2, t); w.g.rotation.z = t * 4; } },
    { say: 'And nap time? The cat sleeps on Gary.', label: 'HELP…', show: ['floor', 'wall', 'g', 'cr', 'zzz'], sky: '#F2E2EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3, 3, 8.5], look: [0, 1.6, 0], fov: 52, to: { pos: [3, 3, 8], look: [0, 1.6, 0], fov: 50 } },
      update: (w, p, t) => { const down = Math.min(1, p * 2.5); ctAt(w, 1.2, 2.2 - down * 2.1, -.6, -.4, 1.1); w.cr.updateWorldMatrix(true, true); const bw = w.c.body.getWorldPosition(new w.k.THREE.Vector3()); gy(w, bw.x + .3, 0, bw.z + 1.25, -1.4, t); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.2; w.c.body.scale.set(1.4, 1 + .04 * Math.sin(t * 2), 1); w.g.userData.legs.forEach(l => l.rotation.x = .3 * Math.sin(t * 20)); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(1.6 + q, 3 + q * 1.6, .6); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'Is Gary a good cat sitter? Comment below.',
      quiz: { q: 'Cat sitter Gary is…', options: ['Brave', 'Tiny', 'Totally squashed'], answer: 'Real ants are incredibly strong for their size.' },
      show: ['floor', 'g'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.c.eyes.forEach(e => e.scale.y = 1); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

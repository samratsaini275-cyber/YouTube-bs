// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Gary premise (every fifth: 369, 374, 379, 384), with cats.
// Hook: the premise as a question under 2 s; first frame shows Gary wearing paper cat ears.

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
  w.floor = k.ground('#7A2E3A', 0);
  w.wall = group(); box(60, 30, .3, mat('#F2E2C8'), [0, 15, -8], w.wall); w.banner = box(10, 1.6, .1, mat('#3E6FD6'), [0, 7, -7.8], w.wall); for (let i = 0; i < 8; i++) { const st = cone(.25, .3, mat('#F2C94C', { glow: .4 }), [-4.4 + i * 1.25, 7, -7.7], w.wall, 5); st.rotation.x = Math.PI / 2; }
  w.g = gary(k, k.scene, 1.3, null);
  w.ears = group([.36, .62, 0], w.g); for (const z of [-1, 1]) { const e = cone(.1, .22, mat('#F2A04A'), [0, 0, z * .12], w.ears, 4); e.rotation.x = z * .25; } w.whisk = group([.6, .4, 0], w.g); for (let i = 0; i < 4; i++) { const ws = cyl(.006, .006, .35, mat('#FFFFFF'), [0, (i % 2) * .05 - .02, (i < 2 ? -1 : 1) * .12], w.whisk, 4); ws.rotation.x = Math.PI / 2; }
  w.cats = []; for (let i = 0; i < 2; i++) w.cats.push(cat(k, k.scene));
  w.stands = group(); for (let i = 0; i < 3; i++) { const s = group([-4 + i * 4, 0, 0], w.stands); cyl(1.2, 1.3, 1, mat('#FFFFFF'), [0, .5, 0], s, 20); }
  w.glass = group(); const rim = torus(.7, .08, mat('#333333'), [0, 0, 0], w.glass); rim.rotation.set(0, 0, 0); const lens = cyl(.65, .65, .04, mat('#BFE3F7', { glow: .3 }), [0, 0, 0], w.glass, 20); lens.rotation.x = Math.PI / 2; lens.material.transparent = true; lens.material.opacity = .45; const hd = cyl(.08, .08, 1.2, mat('#7A5A3A'), [0, -1.3, 0], w.glass, 8);
  w.trophy = group(); cyl(.2, .14, .35, mat('#F2C94C', { metal: .7 }), [0, .18, 0], w.trophy, 12); const cup = cyl(.32, .16, .4, mat('#F2C94C', { metal: .7 }), [0, .55, 0], w.trophy, 14); for (const z of [-1, 1]) { const h = torus(.12, .03, mat('#F2C94C', { metal: .7 }), [0, .58, z * .34], w.trophy); h.rotation.set(0, 0, 0); }
  w.ribbon = group(); cyl(.3, .3, .05, mat('#3E6FD6'), [0, 0, 0], w.ribbon, 16).rotation.x = Math.PI / 2; box(.15, .5, .02, mat('#3E6FD6'), [-.1, -.4, 0], w.ribbon); box(.15, .5, .02, mat('#3E6FD6'), [.1, -.4, 0], w.ribbon);
  w.conf = group(); for (let i = 0; i < 12; i++) { const c = box(.08, .08, .01, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.rotation.set(0, 0, 0); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '379',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY AT THE CAT SHOW',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'ENTERED A CAT SHOW?'],
  title: 'What would happen if Gary the ant entered a cat show?',
  description: 'He enters as a cat, with paper ears. The judges need a magnifying glass. And first prize? Smallest cat ever. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'cat', 'funny', 'shorts'],
  sources: ['Quiz fact: ants communicate mainly with chemical signals called pheromones, for example laying scent trails that lead nestmates to food (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary entered a cat show?', show: ['floor', 'wall', 'g', 'ears', 'whisk'], sky: '#F2E2C8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .72, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { w.cats.forEach(c => c.root.visible = false); gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'He enters as a cat. With paper ears.', label: 'MEOW?', show: ['floor', 'wall', 'stands', 'g', 'ears', 'whisk'], sky: '#F2E2C8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [0, 3.6, 14], look: [0, 2, 0], fov: 54, to: { pos: [0, 3.6, 13.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { ctAt(w.cats[0], -3.4, 1, -.2, -1.2, .55); ctAt(w.cats[1], 2.6, 1, -.2, -1.8, .55); w.cats[1].head.rotation.y = .4; gy(w, 0, 1, .2, -1.4, t); w.g.position.y = 1 + .08 * Math.abs(Math.sin(t * 6)); } },
    { say: 'The judges? Need a magnifying glass.', label: 'HMMM…', show: ['floor', 'wall', 'stands', 'g', 'ears', 'whisk', 'glass'], sky: '#F2E2C8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.6, 2.6, 5], look: [0, 1.6, 0], fov: 50, to: { pos: [1.6, 2.6, 4.6], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.cats.forEach(c => c.root.visible = false); gy(w, 0, 1, .2, -1.4, t); w.glass.position.set(.4 + .3 * Math.sin(t * 1.5), 2.2, 1.6); w.glass.rotation.set(0, 0, .2 * Math.sin(t)); } },
    { say: 'And first prize? Smallest cat ever.', label: 'WINNER!', show: ['floor', 'wall', 'stands', 'g', 'ears', 'whisk', 'trophy', 'ribbon', 'conf'], sky: '#F2E2C8', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [0, 2.4, 6.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.4, 6], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -.5, 1 + .12 * Math.abs(Math.sin(t * 8)), .4, -1.2, t); w.trophy.position.set(.7, 1, .3); w.ribbon.position.set(-.5, 2.1, .4); w.ribbon.visible = p > .4; w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 12) % 1; c.position.set(-2 + (i * .37) % 4, 4 - q * 3.4, .6 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); c.visible = p > .4; }); } },
    { say: 'Should Gary win the cat show? Comment below.',
      quiz: { q: 'Gary the cat is…', options: ['A winner', 'Tiny', 'Totally not a cat'], answer: 'Real ants talk to each other with smells called pheromones.' },
      show: ['floor', 'g', 'ears', 'whisk'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.cats.forEach(c => c.root.visible = false); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

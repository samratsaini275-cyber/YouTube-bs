// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a kitten.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#E8DAEF', 0);
  w.wall = group(); box(60, 30, .5, mat('#FADBD8'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.house = group(); box(1.6, 1, 1.1, mat('#C0392B'), [0, .5, 0], w.house); box(1.65, .45, 1.15, mat('#F4D03F'), [0, .5, .01], w.house);
  w.kit = cat(k, k.scene); w.mum = cat(k, k.scene);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const put = (c, x, y, z, ry, s, on = true) => { c.root.visible = on; c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FADBD8', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '492',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BABYSITTER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BABYSAT A KITTEN.'],
  title: 'Gary the ant babysat a kitten',
  description: 'The kitten is bigger than his house. At nap time, the kitten naps on him. And when Mum comes home? Five stars. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'kitten', 'cat', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the normal birth weight of a kitten is about 90 to 100 grams (Merck Veterinary Manual, "Feeding Practices in Small Animals").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary babysat a kitten.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.6, 1.6, 7], look: [.4, 1, 0], fov: 46, to: { pos: [1.5, 1.6, 6.4], look: [.4, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.house.visible = false; w.card.visible = false; put(w.mum, 0, 0, 0, 0, 1, false); put(w.kit, 1.1, 0, -1.4, -2.4, .42); gy(w, -.3, 0, .4, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The kitten? Bigger than his house.',
      show: ['floor', 'wall', 'g', 'house'], ...env,
      cam: { pos: [.6, 2.4, 8.5], look: [.4, 1.3, 0], fov: 48, to: { pos: [.6, 2.4, 7.9], look: [.4, 1.3, 0], fov: 46 } },
      update: (w, p, t) => { w.card.visible = false; put(w.mum, 0, 0, 0, 0, 1, false); w.house.visible = true; w.house.position.set(-1.6, 0, 0); put(w.kit, 1.4, 0, -.6, -2.6, .5); w.kit.head.rotation.z = .2 * Math.sin(t * 2); gy(w, -.3, 0, 1, -1.3, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Nap time? The kitten napped on him.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [0, .9, 0], fov: 48, to: { pos: [.6, 2.4, 6.9], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { w.house.visible = false; w.card.visible = false; put(w.mum, 0, 0, 0, 0, 1, false); put(w.kit, .25, 0, .6, -.3, .5); w.kit.body.scale.set(1.5, .8, 1.1); w.kit.eyes.forEach(e => e.scale.y = .1); gy(w, -.55, 0, 1.25, -1.4, t); w.g.scale.set(1.3, 1.3 * (.6 + .05 * Math.sin(t * 3)), 1.3); },
    },
    {
      say: 'Then Mum came home. Five stars.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [.6, 3.6, 11.5], look: [.4, 2.4, 0], fov: 50, to: { pos: [.6, 3.6, 10.9], look: [.4, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { w.house.visible = false; w.g.scale.setScalar(1.3); put(w.kit, -1.2, 0, .8, -1, .45); put(w.mum, 1.8, 0, -1, -2.2, 1.05); if (p > .45) { w.mum.paw.position.set(1.2, 1.9, .9); w.mum.root.updateWorldMatrix(true, true); const at = w.mum.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.visible = true; w.card.position.set(at.x - .2, at.y + 1.2, at.z + 1.2); w.card.rotation.set(0, -.3, 0); w.card.scale.setScalar(1.8); } else w.card.visible = false; gy(w, .2, 0, 2.2, -1.6, t, p > .5); },
    },
    {
      say: 'Best babysitting game for Gary: hide and seek, tag, or naps? Comment below.',
      quiz: { q: 'What is the best babysitting game for Gary?', options: ['Hide and seek', 'Tag', 'Naps'], answer: 'Fun fact: a newborn kitten weighs only about 90 to 100 grams.' },
      show: ['floor', 'wall', 'g'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.4, 3.4, 11.5], look: [.4, 2.2, 0], fov: 48, to: { pos: [-1, 3.4, 11.5], look: [.4, 2.2, 0] } },
      update: (w, p, t) => { w.house.visible = false; w.card.visible = false; put(w.kit, -1.2, 0, .8, -1, .45); put(w.mum, 1.8, 0, -1, -2.2, 1.05); gy(w, .2, 0, 2.2, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

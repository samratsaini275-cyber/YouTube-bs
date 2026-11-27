// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a kitchen counter.

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

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#E5D3B3', 0);
  w.wall = group(); box(60, 30, .5, mat('#FDEBD0'), [0, 15, -6], w.wall); for (let i = 0; i < 10; i++) box(60, .05, .52, mat('#F5CBA7'), [0, 1 + i * 1.5, -5.98], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cap = group(); cyl(1.6, 1.6, .7, mat('#E74C3C', { metal: .3, rough: .4 }), [0, .35, 0], w.cap, 28); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; box(.12, .7, .2, mat('#C0392B'), [Math.cos(a) * 1.62, .35, Math.sin(a) * 1.62], w.cap).rotation.y = -a; } w.capin = cyl(1.45, 1.45, .02, mat('#F5B7B1'), [0, .55, 0], w.cap, 28);
  w.flake = group(); const fl = ball(1.1, mat('#F4C542', { rough: .8 }), [0, 0, 0], w.flake); fl.scale.set(1.2, .18, 1);
  w.milk = cyl(14, 14, .05, mat('#FDFEFE', { rough: .3 }), [0, 0, 0], k.scene, 32);
  w.carton = group(); box(3, 5, 3, mat('#FFFFFF'), [0, 2.5, 0], w.carton); box(3.05, 1.5, 3.05, mat('#3498DB'), [0, 2.5, 0], w.carton); w.stream = cyl(.22, .22, 3.4, mat('#FDFEFE'), [0, 0, 0], k.scene, 12);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#FDEBD0', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '487',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BREAKFAST GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'MADE BREAKFAST.'],
  title: 'Gary the ant made breakfast',
  description: 'His bowl is a bottle cap. One cornflake is too big to lift. And then the milk arrives. All of it. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'breakfast', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: harvester ants of the genus Messor collect, husk and store seeds in their nests (Encyclopaedia Britannica, "harvester ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary made breakfast.',
      show: ['floor', 'wall', 'g', 'cap'], ...env,
      cam: { pos: [1.6, 1.5, 6.5], look: [0, .7, 0], fov: 46, to: { pos: [1.5, 1.5, 5.9], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.milk.visible = false; w.flake.visible = false; w.carton.visible = false; w.stream.visible = false; w.cap.position.set(-2.2, 0, -1.5); gy(w, .3, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His bowl? A bottle cap.',
      show: ['floor', 'wall', 'g', 'cap'], ...env,
      cam: { pos: [.4, 3.6, 7.5], look: [0, .7, 0], fov: 46, to: { pos: [.4, 3.6, 6.9], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.milk.visible = false; w.flake.visible = false; w.cap.position.set(0, 0, 0); gy(w, 0, .56, 0, -1.3, t); w.g.rotation.z = Math.sin(t * 4) * .08; },
    },
    {
      say: 'One cornflake? Too big to lift.',
      show: ['floor', 'wall', 'g', 'cap', 'flake'], ...env,
      cam: { pos: [.4, 3.2, 7.5], look: [0, 1, 0], fov: 46, to: { pos: [.4, 3.2, 6.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.milk.visible = false; w.cap.position.set(0, 0, 0); w.flake.visible = true; const wob = Math.sin(t * 7) * .15; gy(w, 0, .56, .2, -1.3, t, true); w.g.rotation.z = 0; w.flake.position.set(.1, 1.35 + Math.abs(wob) * .3, .2); w.flake.rotation.set(wob, 0, wob * 1.5); },
    },
    {
      say: 'Then the milk came. All of it.',
      show: ['floor', 'wall', 'g', 'flake', 'milk', 'carton', 'stream'], ...env,
      cam: { pos: [.4, 5, 10], look: [0, 1.6, 0], fov: 50, to: { pos: [.4, 5, 9.4], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.cap.visible = false; w.carton.visible = true; w.carton.position.set(1.4, 3.6, -2.5); w.carton.scale.setScalar(.6); w.carton.rotation.z = .9; w.stream.visible = p < .8; w.stream.position.set(.15, 1.9, -2.5); const lv = Math.min(1.2, p * 1.8); w.milk.visible = true; w.milk.position.set(0, lv, 0); const bob = Math.sin(t * 3) * .12; w.flake.visible = true; w.flake.position.set(-.3 + Math.sin(t) * .4, lv + .15 + bob, .5); w.flake.rotation.set(bob, 0, bob); gy(w, -.3 + Math.sin(t) * .4, lv + .35 + bob, .5, -1.2, t); w.g.rotation.z = bob; },
    },
    {
      say: 'Best breakfast for Gary: a crumb, a seed, or a sugar grain? Comment below.',
      quiz: { q: 'What is the best breakfast for Gary?', options: ['A crumb', 'A seed', 'A sugar grain'], answer: 'Fun fact: harvester ants collect seeds, husk them and store them in their nests.' },
      show: ['floor', 'wall', 'g', 'flake', 'milk'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2, 4.4, 10], look: [0, 1.6, 0], fov: 46, to: { pos: [-1, 4.4, 10], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.cap.visible = false; w.carton.visible = false; w.milk.visible = true; w.milk.position.set(0, 1.2, 0); const bob = Math.sin(t * 3) * .12; w.flake.position.set(0, 1.35 + bob, .5); w.flake.rotation.set(bob, 0, bob); gy(w, 0, 1.55 + bob, .5, -1.2, t); },
    },
  ],
};

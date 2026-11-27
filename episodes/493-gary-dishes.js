// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a kitchen counter by the sink.

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
  w.floor = k.ground('#D5DBDB', 0);
  w.wall = group(); box(60, 30, .5, mat('#D1F2EB'), [0, 15, -6], w.wall); for (let i = 0; i < 12; i++) box(.05, 30, .52, mat('#FFFFFF'), [-11 + i * 2, 15, -5.98], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.plate = group(); cyl(3.2, 2.6, .25, mat('#FDFEFE', { rough: .15 }), [0, .12, 0], w.plate, 32); cyl(2.4, 2.4, .02, mat('#EBF5FB', { rough: .1 }), [0, .26, 0], w.plate, 32);
  w.sponge = group(); box(3, 1.6, 2, mat('#F4D03F', { rough: 1 }), [0, .8, 0], w.sponge); box(3.02, .5, 2.02, mat('#27AE60', { rough: .9 }), [0, 1.65, 0], w.sponge); for (let i = 0; i < 10; i++) ball(.12, mat('#D4AC0D'), [-1.3 + (i % 5) * .65, .4 + Math.floor(i / 5) * .7, 1.01], w.sponge).scale.z = .3;
  w.water = cyl(.7, .7, 8, mat('#85C1E9', { glow: .3, rough: .1 }), [0, 0, 0], k.scene, 16);
  w.splash = group(); for (let i = 0; i < 10; i++) { const d = ball(.18, mat('#AED6F1', { glow: .3 }), [0, 0, 0], w.splash); d.userData.i = i; d.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#D1F2EB', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '493',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DISHWASHER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'DID THE DISHES.'],
  title: 'Gary the ant did the dishes',
  description: 'One plate is a skating rink. He gets lost inside the sponge. And then the water comes on. Whoosh. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'dishes', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: leaf-cutting ants have been recorded repairing damage to their nest mound with material recycled from their own refuse dump (Farji-Brener et al., "Trash to treasure: leaf-cutting ants repair nest-mound damage by recycling refuse dump materials", Behavioral Ecology, 2012).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary did the dishes.',
      show: ['floor', 'wall', 'g', 'plate'], ...env,
      cam: { pos: [1.6, 1.5, 6.5], look: [0, .8, 0], fov: 46, to: { pos: [1.5, 1.5, 5.9], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.sponge.visible = false; w.water.visible = false; w.splash.visible = false; w.plate.position.set(-2.6, 0, -2.4); gy(w, .4, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'One plate? A skating rink.',
      show: ['floor', 'wall', 'g', 'plate'], ...env,
      cam: { pos: [.4, 4.2, 8], look: [0, .4, 0], fov: 46, to: { pos: [.4, 4.2, 7.4], look: [0, .4, 0], fov: 44 } },
      update: (w, p, t) => { w.sponge.visible = false; w.water.visible = false; w.splash.visible = false; w.plate.position.set(0, 0, 0); const a = t * 1.6; gy(w, Math.cos(a) * 1.1, .27, Math.sin(a) * 1, -a + Math.PI, t); w.g.rotation.y = t * 4; w.g.rotation.z = .2; },
    },
    {
      say: 'The sponge? He got lost in it.',
      show: ['floor', 'wall', 'g', 'sponge'], ...env,
      cam: { pos: [.4, 2.6, 7.5], look: [0, 1.1, 0], fov: 46, to: { pos: [.4, 2.6, 6.9], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { w.plate.visible = false; w.water.visible = false; w.splash.visible = false; w.sponge.position.set(0, 0, 0); const dive = Math.min(1, p * 2); gy(w, -.3, 1.9 - dive * 1.1, .2, -1.4, t); w.g.rotation.z = dive * .4; },
    },
    {
      say: 'Then the water came on. Whoosh.',
      show: ['floor', 'wall', 'g', 'sponge', 'water', 'splash'], ...env,
      cam: { pos: [1, 3.4, 10], look: [.6, 1.8, 0], fov: 50, to: { pos: [1, 3.4, 9.4], look: [.6, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.plate.visible = false; const on = p > .25; w.water.visible = on; w.water.position.set(-1.6, 4.4, 0); const r = on ? Math.min(1, (p - .25) * 2) : 0; w.sponge.position.set(r * 2.2, 0, 0); w.sponge.rotation.z = -r * .2; gy(w, r * 2.2 - .2, 2.15, .2, -.3, t, on); w.g.rotation.z = -r * .3 + Math.sin(t * 9) * .05 * r; w.splash.visible = on; w.splash.children.forEach(d => { const i = d.userData.i, q = (t * 1.4 + i / 10) % 1; d.position.set(-1.6 + Math.cos(i * 2.3) * q * 2.2, .3 + Math.sin(q * Math.PI) * 1.4, Math.sin(i * 2.3) * q * 1.2); }); },
    },
    {
      say: 'Best dish for Gary to wash: a thimble, a bottle cap, or an acorn cup? Comment below.',
      quiz: { q: 'What is the best dish for Gary to wash?', options: ['A thimble', 'A bottle cap', 'An acorn cup'], answer: 'Fun fact: leaf-cutting ants can fix their nest using bits from their own rubbish heap.' },
      show: ['floor', 'wall', 'g', 'sponge'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2, 3, 8.5], look: [0, 1.2, 0], fov: 46, to: { pos: [-1, 3, 8.5], look: [0, 1.2, 0] } },
      update: (w, p, t) => { w.plate.visible = false; w.water.visible = false; w.splash.visible = false; w.sponge.position.set(0, 0, 0); w.sponge.rotation.z = 0; gy(w, 0, 2.15, .2, -1.4 + .3 * Math.sin(t * 3), t, true); w.g.rotation.z = 0; },
    },
  ],
};

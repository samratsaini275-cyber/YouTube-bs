// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a living-room floor.

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
  w.floor = k.ground('#A3C4BC', 0);
  w.wall = group(); box(60, 30, .5, mat('#F9E79F'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cubes = group(); for (const x of [-1.6, 1.6]) box(1.4, 1.4, 1.4, mat('#FDFEFE', { rough: .9 }), [x, .7, 0], w.cubes);
  w.nap = group([0, 1.42, 0]); const nm = mat('#E74C3C', { rough: 1 }); box(4.6, .05, 2.4, nm, [0, 0, 0], w.nap); for (let i = 0; i < 5; i++) box(.3, .052, 2.4, mat('#FDFEFE'), [-1.8 + i * .9, .001, 0], w.nap);
  w.vac = group(); box(3, 1.6, 2.2, mat('#8E44AD', { metal: .3, rough: .4 }), [0, .8, 0], w.vac); box(3.2, .3, .5, mat('#2C3E50'), [0, .15, 1.2], w.vac); cyl(.18, .18, 8, mat('#95A5A6', { metal: .6 }), [0, 5, -.6], w.vac, 10);
  w.wind = group(); for (let i = 0; i < 6; i++) { const l = box(.6, .04, .04, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.wind); l.userData.i = i; l.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#F9E79F', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '489',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FORT GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BUILT A FORT.'],
  title: 'Gary the ant built a blanket fort',
  description: 'His walls are two sugar cubes. His blanket is a napkin. And then the vacuum cleaner arrives. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'fort', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: the essential work in an ant colony is done by the workers, all of whom are female (Encyclopaedia Britannica, "ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary built a fort.',
      show: ['floor', 'wall', 'g', 'cubes'], ...env,
      cam: { pos: [1.6, 1.5, 6.5], look: [0, .8, 0], fov: 46, to: { pos: [1.5, 1.5, 5.9], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.cubes.position.set(-1.6, 0, -2.5); gy(w, .4, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His walls? Two sugar cubes.',
      show: ['floor', 'wall', 'g', 'cubes'], ...env,
      cam: { pos: [.4, 2.6, 7.5], look: [0, .9, 0], fov: 46, to: { pos: [.4, 2.6, 6.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cubes.position.set(0, 0, 0); gy(w, 0, 0, .3, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'His blanket? A napkin.',
      show: ['floor', 'wall', 'g', 'cubes', 'nap'], ...env,
      cam: { pos: [.4, 2.6, 7.5], look: [0, .9, 0], fov: 46, to: { pos: [.4, 2.6, 6.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cubes.position.set(0, 0, 0); const dr = Math.min(1, p * 2.2); w.nap.position.set(0, 1.42 + (1 - dr) * 2.5, 0); w.nap.rotation.set(0, 0, (1 - dr) * .5); gy(w, 0, 0, .3, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Then the vacuum cleaner came.',
      show: ['floor', 'wall', 'g', 'cubes', 'nap', 'vac', 'wind'], ...env,
      cam: { pos: [2, 3, 11.5], look: [2, 1.6, 0], fov: 50, to: { pos: [2, 3, 10.9], look: [2, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.cubes.position.set(0, 0, 0); w.vac.position.set(5.6 - p * 1.2, 0, -.6); w.vac.rotation.y = -Math.PI / 2; w.vac.scale.setScalar(1.3); const s = Math.min(1, Math.max(0, (p - .35) * 2.2)); w.nap.position.set(s * 4.2, 1.42 + s * 1.2, -.3); w.nap.rotation.set(0, 0, -s * 1.1); gy(w, s * 1.9, s * 1.1, .6, -.2, t, true); w.g.rotation.z = -s * .9; w.wind.children.forEach(l => { const i = l.userData.i, q = (t * 1.5 + i / 6) % 1; l.position.set(4.2 - q * 3.5, .4 + (i % 3) * .5, .3 + (i % 2) * .4 - .2); }); },
    },
    {
      say: 'Best fort for Gary: a matchbox, a teacup, or a shoe? Comment below.',
      quiz: { q: 'What is the best fort for Gary?', options: ['A matchbox', 'A teacup', 'A shoe'], answer: 'Fun fact: all worker ants are female.' },
      show: ['floor', 'wall', 'g', 'cubes', 'nap'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2, 2.8, 8.5], look: [0, 1, 0], fov: 46, to: { pos: [-1, 2.8, 8.5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.cubes.position.set(0, 0, 0); w.nap.position.set(0, 1.42, 0); w.nap.rotation.set(0, 0, 0); gy(w, 0, 0, .3, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

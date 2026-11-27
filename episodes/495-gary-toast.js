// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a kitchen counter next to a toaster.

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
  w.wall = group(); box(60, 30, .5, mat('#FDEDEC'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.toaster = group(); box(4.6, 3.4, 2.6, mat('#BDC3C7', { metal: .7, rough: .25 }), [0, 1.7, 0], w.toaster); for (const z of [-.5, .5]) box(3.4, .05, .35, mat('#1C1C1C'), [0, 3.41, z], w.toaster); box(.3, .7, .3, mat('#2C3E50'), [2.4, 2, 0], w.toaster);
  w.crumb = group(); const cb = box(.9, .6, .7, mat('#D4A056', { rough: 1 }), [0, 0, 0], w.crumb); cb.rotation.set(.3, .4, .2);
  w.jam = group(); const jm = ball(1.2, mat('#C0392B', { rough: .2 }), [0, 0, 0], w.jam); jm.scale.set(1.4, .25, 1.1);
  w.slices = group(); for (const z of [-.5, .5]) box(2.8, 2.4, .3, mat('#D68910', { rough: .9 }), [0, 0, z], w.slices);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#FDEDEC', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '495',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TOAST GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'MADE TOAST.'],
  title: 'Gary the ant made toast',
  description: 'His bread is one crumb. The jam is a sticky trap. And then the toaster pops. So does Gary. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'toast', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: the entomologist Justin O. Schmidt rated the red imported fire ant\'s sting 1.2 on his sting pain index and described it as "sharp, sudden, mildly alarming. Like walking across a shag carpet and reaching for the light switch" (Encyclopaedia Britannica, "fire ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary made toast.',
      show: ['floor', 'wall', 'g', 'toaster'], ...env,
      cam: { pos: [1.6, 1.5, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.5, 5.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'crumb', 'jam', 'slices'); w.toaster.position.set(-2.6, 0, -3); gy(w, .4, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The bread? One crumb.',
      show: ['floor', 'wall', 'g', 'crumb'], ...env,
      cam: { pos: [.4, 1.6, 5.5], look: [0, .6, 0], fov: 46, to: { pos: [.4, 1.6, 5], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'toaster', 'jam', 'slices'); w.crumb.visible = true; w.crumb.position.set(-.1, 1.05, 0); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = Math.sin(t * 8) * .05; },
    },
    {
      say: 'The jam? A sticky trap.',
      show: ['floor', 'wall', 'g', 'jam'], ...env,
      cam: { pos: [.4, 2.6, 6], look: [0, .4, 0], fov: 46, to: { pos: [.4, 2.6, 5.5], look: [0, .4, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'toaster', 'crumb', 'slices'); w.jam.position.set(0, .12, 0); gy(w, .1, .12, .2, -1.4, t, true); w.g.rotation.z = 0; w.g.position.x = .1 + Math.sin(t * 12) * .03; },
    },
    {
      say: 'Then the toaster popped. So did Gary.',
      show: ['floor', 'wall', 'g', 'toaster', 'slices'], ...env,
      cam: { pos: [.6, 4, 12], look: [0, 3.8, 0], fov: 52, to: { pos: [.6, 4, 11.4], look: [0, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'crumb', 'jam'); w.toaster.position.set(0, 0, 0); const pop = p > .3 ? Math.min(1, (p - .3) * 4) : 0; w.slices.position.set(0, 2.4 + pop * 1.6, 0); const fly = Math.max(0, p - .35); gy(w, fly * 2, 3.6 + fly * 9 - fly * fly * 9, .6, -1.4, t, fly > 0); w.g.rotation.z = fly * 10; },
    },
    {
      say: 'Best toast topping for Gary: jam, honey, or one sprinkle? Comment below.',
      quiz: { q: 'What is the best toast topping for Gary?', options: ['Jam', 'Honey', 'One sprinkle'], answer: 'Fun fact: an entomologist said a fire ant sting feels like a static shock after walking on carpet.' },
      show: ['floor', 'wall', 'g', 'toaster', 'slices'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2.4, 4.4, 12], look: [0, 3.6, 0], fov: 50, to: { pos: [-1.2, 4.4, 12], look: [0, 3.6, 0] } },
      update: (w, p, t) => { hide(w, 'crumb', 'jam'); w.toaster.position.set(0, 0, 0); w.slices.position.set(0, 2.6, 0); gy(w, 0, 3.8, .1, -1.4 + .3 * Math.sin(t * 3), t, true); w.g.rotation.z = 0; },
    },
  ],
};

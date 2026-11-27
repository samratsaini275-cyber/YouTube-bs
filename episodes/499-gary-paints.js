// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in front of a giant blank canvas.

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
  w.floor = k.ground('#D5D8DC', 0);
  w.wall = group(); box(60, 30, .5, mat('#EAF2F8'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.canvas = group(); box(7, 5, .2, mat('#FDFEFE'), [0, 3, -2.5], w.canvas); box(7.3, .25, .3, mat('#A0522D'), [0, .55, -2.5], w.canvas); box(7.3, .25, .3, mat('#A0522D'), [0, 5.5, -2.5], w.canvas); for (const x of [-3.6, 3.6]) box(.25, 5.2, .3, mat('#A0522D'), [x, 3, -2.5], w.canvas);
  w.dot = cyl(.07, .07, .02, mat('#E74C3C'), [0, 0, 0], k.scene, 12);
  w.lash = cyl(.03, .015, 1.6, mat('#1C1C1C'), [0, 0, 0], k.scene, 6);
  w.pot = group(); cyl(2.6, 2.4, 1.2, mat('#BDC3C7', { metal: .5 }), [0, .6, 0], w.pot, 28); w.paint = cyl(2.5, 2.5, .05, mat('#3498DB', { rough: .2, glow: .1 }), [0, 1.18, 0], w.pot, 28);
  w.spot = cyl(1.2, 1.2, .01, mat('#FFF9C4', { glow: .9 }), [0, 0, 0], k.scene, 24);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#EAF2F8', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '499',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'ARTIST GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PAINTED A PICTURE.'],
  title: 'Gary the ant painted a picture',
  description: 'His brush is one eyelash. The paint pot is a whole lake. And the finished picture? One tiny dot. A masterpiece. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'art', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: soldiers of turtle ants (Cephalotes) use their plate-shaped heads to block the entrances of their nests and keep intruders out (Field Museum, "Understanding Turtle Ants"; ScienceDaily, "Laborer, doorkeeper, future queen: Neurobiology in turtle ants reflects division of labor", 27 March 2019).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary painted a picture.',
      show: ['floor', 'wall', 'g', 'canvas'], ...env,
      cam: { pos: [1.6, 1.6, 7], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.6, 6.4], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'dot', 'lash', 'pot', 'spot'); gy(w, .4, 0, .3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The brush? One eyelash.',
      show: ['floor', 'wall', 'g', 'lash'], ...env,
      cam: { pos: [.4, 1.4, 5], look: [0, .7, 0], fov: 46, to: { pos: [.4, 1.4, 4.5], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'dot', 'pot', 'spot', 'canvas'); gy(w, -.3, 0, 0, -1.2, t); w.g.rotation.z = 0; w.lash.visible = true; w.lash.position.set(.4, .9, .2); w.lash.rotation.set(0, 0, -.6 + Math.sin(t * 5) * .3); },
    },
    {
      say: 'The paint? A whole lake.',
      show: ['floor', 'wall', 'g', 'pot'], ...env,
      cam: { pos: [.4, 4.4, 7.5], look: [0, 1, 0], fov: 46, to: { pos: [.4, 4.4, 6.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'dot', 'lash', 'spot', 'canvas'); w.pot.position.set(0, 0, 0); gy(w, 0, 1.22 + Math.sin(t * 3) * .05, .4, -1.2, t); w.g.rotation.z = Math.sin(t * 3) * .1; },
    },
    {
      say: 'The picture? One tiny dot. A masterpiece.',
      show: ['floor', 'wall', 'g', 'canvas', 'dot', 'spot'], ...env,
      cam: { pos: [0, 3, 11], look: [0, 2.8, 0], fov: 50, to: { pos: [0, 3, 9.5], look: [0, 2.6, -1], fov: 46 } },
      update: (w, p, t) => { hide(w, 'lash', 'pot'); w.dot.visible = true; w.dot.position.set(.3, 2.6, -2.38); w.dot.rotation.x = Math.PI / 2; w.spot.visible = p > .5; w.spot.position.set(.3, 2.6, -2.39); w.spot.rotation.x = Math.PI / 2; gy(w, .2, 0, .4, -1.6, t); w.g.rotation.z = p > .5 ? Math.sin(t * 6) * .12 : 0; },
    },
    {
      say: 'Best thing for Gary to paint: a crumb, a cat, or himself? Comment below.',
      quiz: { q: 'What is the best thing for Gary to paint?', options: ['A crumb', 'A cat', 'Himself'], answer: 'Fun fact: turtle ant soldiers use their flat heads as doors to block their nest.' },
      show: ['floor', 'wall', 'g', 'canvas', 'dot', 'spot'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [2, 3, 10], look: [0, 2.4, 0], fov: 48, to: { pos: [-2, 3, 10], look: [0, 2.4, 0] } },
      update: (w, p, t) => { hide(w, 'lash', 'pot'); w.dot.position.set(.3, 2.6, -2.38); w.dot.rotation.x = Math.PI / 2; w.spot.position.set(.3, 2.6, -2.39); w.spot.rotation.x = Math.PI / 2; gy(w, .2, 0, .4, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};

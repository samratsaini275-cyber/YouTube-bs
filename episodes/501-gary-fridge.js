// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary at the bottom of a giant fridge door.

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
  w.wall = group(); box(60, 30, .5, mat('#FDF2E9'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.fridge = group(); box(6, 12, 3, mat('#ECF0F1', { metal: .3, rough: .3 }), [0, 6, -2], w.fridge); box(.3, 3, .3, mat('#95A5A6', { metal: .7 }), [2.4, 5, -.4], w.fridge); box(6.02, .08, 3.02, mat('#BDC3C7'), [0, 8, -2], w.fridge);
  w.inside = group(); box(6, 6, .2, mat('#D6EAF8', { glow: .25 }), [0, 3, -2.5], w.inside); box(6, .12, 3, mat('#FDFEFE', { glow: .2 }), [0, 1.5, -1], w.inside); box(6, .12, 3, mat('#FDFEFE', { glow: .2 }), [0, 3.4, -1], w.inside); w.milk = box(.9, 1.6, .9, mat('#FDFEFE'), [-1.6, 2.36, -1.2], w.inside); box(.92, .5, .92, mat('#3498DB'), [-1.6, 2.36, -1.2], w.inside); ball(.5, mat('#E74C3C'), [1.4, 2, -1], w.inside); w.cheese = box(1.2, .6, .9, mat('#F4D03F'), [.2, 1.86, -.8], w.inside);
  w.light = ball(.25, mat('#FFF9C4', { glow: 2 }), [0, 5.6, -1.6], w.inside);
  w.ice = group(); for (let i = 0; i < 6; i++) { const f = box(.06, .3, .06, mat('#D6EAF8', { glow: .5 }), [0, 0, 0], w.ice); f.userData.i = i; }
  w.dark = box(8, 8, .1, mat('#0B0C10'), [0, 3, .9], k.scene);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#FDF2E9', lightAt: [0, 7, 4], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '501',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FRIDGE GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'OPENED THE FRIDGE.'],
  title: 'Gary the ant opened the fridge',
  description: 'The door is a skyscraper. Inside, it is the North Pole. And then the door closes, and the light goes out. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'fridge', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: nurse workers in ant nests move the brood around according to temperature differences in the nest, so the young develop in the best conditions (Kadochová & Frouz, "Thermoregulation strategies in ants in comparison to other social insects, with a focus on red wood ants (Formica rufa group)", F1000Research, 2013).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary opened the fridge.',
      show: ['floor', 'wall', 'g', 'fridge'], ...env,
      cam: { pos: [1.6, 2.4, 10], look: [0, 2.6, 0], fov: 50, to: { pos: [1.5, 2.4, 9.4], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'inside', 'ice', 'dark'); w.fridge.position.set(-.6, 0, -1.5); gy(w, 1.4, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The door? A skyscraper.',
      show: ['floor', 'wall', 'g', 'fridge'], ...env,
      cam: { pos: [.6, .5, 6.5], look: [0, 3.2, -1], fov: 56, to: { pos: [.6, .5, 6.2], look: [0, 3.8, -1], fov: 56 } },
      update: (w, p, t) => { hide(w, 'inside', 'ice', 'dark'); w.fridge.position.set(0, 0, 0); gy(w, .2, 0, .4, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Inside? The North Pole.',
      show: ['floor', 'wall', 'g', 'inside', 'ice'], ...env, sky: '#D6EAF8',
      cam: { pos: [.4, 2.6, 4.5], look: [0, 1.9, -1], fov: 48, to: { pos: [.4, 2.6, 4], look: [0, 1.9, -1], fov: 46 } },
      update: (w, p, t) => { hide(w, 'fridge', 'dark'); w.wall.visible = false; w.inside.position.set(0, 0, 0); gy(w, .4, 1.56, -.4, -1.4, t); w.g.rotation.z = Math.sin(t * 30) * .05; w.ice.children.forEach(f => { const i = f.userData.i, q = (t * .5 + i / 6) % 1; f.position.set(-1 + i * .45, 3.3 - q * 1.8, -.4); f.rotation.z = t + i; }); },
    },
    {
      say: 'Then the door closed. Lights out.',
      show: ['floor', 'g', 'inside'], sky: '#1B2631', lightAt: [0, 4, 2], lightDist: 8,
      cam: { pos: [.4, 2.6, 4.5], look: [0, 1.9, -1], fov: 48, to: { pos: [.4, 2.6, 4.2], look: [0, 1.9, -1], fov: 47 } },
      update: (w, p, t) => { hide(w, 'fridge', 'ice'); w.wall.visible = false; w.inside.position.set(0, 0, 0); const shut = p > .4; w.inside.visible = !shut; w.dark.visible = false; w.floor.visible = !shut; gy(w, .4, 1.56, -.4, -1.4, t); w.g.visible = true; },
    },
    {
      say: 'Best fridge snack for Gary: a pea, a grape, or cheese? Comment below.',
      quiz: { q: 'What is the best fridge snack for Gary?', options: ['A pea', 'A grape', 'Cheese'], answer: 'Fun fact: nurse ants carry their young around the nest to keep them at the best temperature.' },
      show: ['floor', 'g', 'inside', 'ice'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [1.6, 2.6, 4.8], look: [0, 1.9, -1], fov: 48, to: { pos: [-1, 2.6, 4.8], look: [0, 1.9, -1] } },
      update: (w, p, t) => { hide(w, 'fridge', 'dark'); w.wall.visible = false; w.inside.visible = true; w.inside.position.set(0, 0, 0); gy(w, .4, 1.56, -.4, -1.4 + .3 * Math.sin(t * 3), t, true); w.ice.children.forEach(f => { const i = f.userData.i, q = (t * .5 + i / 6) % 1; f.position.set(-1 + i * .45, 3.3 - q * 1.8, -.4); }); },
    },
  ],
};

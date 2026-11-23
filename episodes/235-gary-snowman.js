// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in the snow.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function flake(k, parent, s = 1) { const g = k.group([0, 0, 0], parent); for (let i = 0; i < 3; i++) { const b = k.box(.9 * s, .07 * s, .07 * s, k.mat('#FFFFFF', { glow: .5 }), [0, 0, 0], g); b.rotation.z = i * Math.PI / 3; b.castShadow = false; } k.ball(.12 * s, k.mat('#FFFFFF', { glow: .5 }), [0, 0, 0], g); return g; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.snow = k.ground('#F4FAFF', 0);
  w.trees = group(); for (let i = 0; i < 6; i++) { const t = group([-10 + i * 4, 0, -8 - (i % 2) * 2], w.trees); cone(1.3, 3.6, mat('#2E8B4A'), [0, 2.2, 0], t, 8); cone(.9, 1.6, mat('#FFFFFF'), [0, 3.8, 0], t, 8); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.scarf = k.torus(.32, .08, mat('#E2453C'), [0, 0, 0], k.scene);
  w.man = group(); flake(k, w.man, 1); const f2 = flake(k, w.man, .7); f2.position.y = .75; w.man.children[0] && 0; const n = cone(.06, .3, mat('#F97316'), [0, .78, .1], w.man, 8); n.rotation.x = Math.PI / 2; for (const x of [-.1, .1]) ball(.04, mat('#111111'), [x, .88, .08], w.man);
  w.puddle = cyl(.5, .5, .02, mat('#9FD3EE', { rough: .1 }), [0, .02, 0], k.scene, 20); w.puddle.castShadow = false;
  w.sun = ball(1.4, mat('#FFD21F', { glow: 1 }), [3, 9, -6]); w.sun.castShadow = false;
  w.freezer = group(); box(6, .1, 5, mat('#DDF1FF', { glow: .2 }), [0, 0, 0], w.freezer); box(6, 6, .2, mat('#EEF3F7'), [0, 3, -2.5], w.freezer); for (const x of [-3, 3]) box(.2, 6, 5, mat('#EEF3F7'), [x, 3, 0], w.freezer); box(6, .2, 5, mat('#EEF3F7'), [0, 6, 0], w.freezer);
  w.peas = group(); for (let i = 0; i < 8; i++) ball(.25, mat('#5DBB4A'), [-2 + (i % 4) * .4, .3, -1.5 + Math.floor(i / 4) * .4], w.peas);
  w.fall = group(); for (let i = 0; i < 16; i++) { const f = flake(k, w.fall, .3); f.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(.36, .28, 0); w.g.localToWorld(v); w.scarf.position.copy(v); w.scarf.rotation.set(Math.PI / 2, 0, 0); };
const snowing = (w, t, cx = 0) => w.fall.children.forEach(f => { const i = f.userData.i, q = (t * .3 + i / 16) % 1; f.position.set(cx - 4 + (i % 8) * 1.1, 6 - q * 6, -2 + (i % 3)); f.rotation.z = t + i; });

export default {
  id: '235',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SNOWMAN GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BUILT A SNOWMAN.'],
  title: 'Gary the ant built a snowman',
  description: 'He used one snowflake. It melted in two seconds. So he built the next one in the freezer, next to the peas. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'snowman', 'winter', 'funny', 'shorts'],
  sources: [
    'Quiz fact: in cold winters many ant colonies move deep into their nests and become inactive until the weather warms (Encyclopaedia Britannica, "ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant built a snowman.',
      show: ['snow', 'trees', 'g', 'fall'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.4, 1.6, 6.5], look: [0, .95, 0], fov: 46, to: { pos: [2.2, 1.6, 5.9], look: [0, .95, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.25, t); w.g.rotation.z = .08 * Math.sin(t * 6); w.scarf.position.y += 0; snowing(w, t); },
    },
    {
      say: 'He used one snowflake.',
      show: ['snow', 'trees', 'g', 'man'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.4, 1.3, 5.4], look: [-.2, .85, 0], fov: 46, to: { pos: [1.3, 1.3, 5], look: [-.2, .85, 0], fov: 44 } },
      update: (w, p, t) => { w.man.position.set(-.8, .5, .2); w.man.rotation.y = .3; gy(w, .7, 0, .2, -1.9, t); },
    },
    {
      say: 'It melted in two seconds.',
      show: ['snow', 'trees', 'g', 'man', 'puddle', 'sun'], sky: '#FFD58A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.4, 1.3, 5.4], look: [-.2, .85, 0], fov: 46, to: { pos: [1.3, 1.3, 5], look: [-.2, .85, 0], fov: 44 } },
      update: (w, p, t) => { const m = Math.max(0, 1 - t / 1.4); w.man.position.set(-.8, .5 * m, .2); w.man.scale.set(1, Math.max(.01, m), 1); w.man.visible = m > .02; w.puddle.position.set(-.8, .02, .2); w.puddle.scale.setScalar(1 - m * .7); gy(w, .7, 0, .2, -1.9, t); if (m < .1) w.g.rotation.z = -.15; },
    },
    {
      say: 'So now he builds them in the freezer.',
      show: ['g', 'man', 'freezer', 'peas', 'fall'], sky: '#CFE3F0', lightAt: [0, 5, 3], lightDist: 18,
      cam: { pos: [1.4, 1.8, 6], look: [0, 1.05, 0], fov: 48, to: { pos: [1.3, 1.8, 5.4], look: [0, 1.05, 0], fov: 46 } },
      update: (w, p, t) => { w.man.visible = true; w.man.scale.set(1, 1, 1); w.man.position.set(-.8, .55, .2); w.man.rotation.y = .3; gy(w, .7, .05, .2, -1.6, t); w.g.position.x = .7 + .03 * Math.sin(t * 30); snowing(w, t); w.fall.position.set(0, 0, -1); },
    },
    {
      say: 'Gary\'s snowman name: Flake, Chilly, or Mister Drip? Comment below.',
      quiz: { q: 'What should Gary name his snowman?', options: ['Flake', 'Chilly', 'Mister Drip'], answer: 'Fun fact: in winter, many ants hide deep in their nest and barely move until spring.' },
      show: ['snow', 'trees', 'g', 'man'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 5], look: [0, 1, 0], fov: 46, to: { pos: [-2, 1.6, 5.5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.man.visible = true; w.man.scale.set(1, 1, 1); w.man.position.set(-.8, .5, .2); w.fall.position.set(0, 0, 0); gy(w, .6, 0, .3, -1.4, t); },
    },
  ],
};

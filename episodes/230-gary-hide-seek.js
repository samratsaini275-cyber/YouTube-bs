// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a garden with a kid counting.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#7FB069', 0);
  w.bushes = group(); for (let i = 0; i < 6; i++) ball(1.6, mat('#2E8B4A'), [-10 + i * 4, .9, -6 - (i % 2) * 2], w.bushes);
  w.tree = group(); cyl(.5, .7, 5, mat('#7A5230'), [0, 2.5, 0], w.tree, 10); ball(2.6, mat('#3FA35B'), [0, 6, 0], w.tree);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.kid = person(k, k.scene, '#3B82F6'); w.kp = w.kid.root;
  w.hands = group(); for (const x of [-.3, .3]) box(.45, .5, .2, mat('#F2C9A0'), [x, 0, 0], w.hands);
  w.pebble = ball(.9, mat('#9A9A9A', { rough: 1 }), [0, 0, 0], k.scene); w.pebble.scale.set(1.2, .7, 1);
  w.leaves = group(); for (let i = 0; i < 10; i++) { const l = box(.5, .04, .3, mat(['#E2453C', '#F97316', '#FFC21F'][i % 3]), [0, 0, 0], w.leaves); l.userData.i = i; l.castShadow = false; }
  w.cal = group(); box(1.8, 2.2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.8, .5, .12, mat('#E2453C'), [0, .85, .01], w.cal); for (let i = 0; i < 21; i++) { const x = box(.18, .04, .02, mat('#E2453C'), [-.6 + (i % 7) * .2, .4 - Math.floor(i / 7) * .35, .07], w.cal); x.rotation.z = .8; x.userData.i = i; }
  w.trophy = group(); cyl(.5, .3, .9, mat('#FFC21F', { metal: .8, rough: .2 }), [0, 1.1, 0], w.trophy, 18); cyl(.15, .15, .4, mat('#FFC21F', { metal: .8 }), [0, .45, 0], w.trophy, 10); box(.8, .25, .8, mat('#8A5A2B'), [0, .12, 0], w.trophy);
  w.confetti = group(); for (let i = 0; i < 16; i++) { const c = box(.1, .02, .06, mat(['#E2453C', '#3B82F6', '#FFC21F', '#22C55E'][i % 4], { glow: .4 }), [0, 0, 0], w.confetti); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '230',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HIDE AND SEEK',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED HIDE AND SEEK.'],
  title: 'Gary the ant played hide and seek',
  description: 'He hid behind a pebble. Nobody found him for three weeks. He is still the champion. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'hideandseek', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: worker ants have a "social stomach" (the crop) that stores liquid food to share with other ants (Natural History Museum, London, "How ants work together").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant played hide and seek.',
      show: ['grass', 'bushes', 'tree', 'g', 'kp', 'hands'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.4, 2.4, 10], look: [-.5, 1.9, 0], fov: 50, to: { pos: [1.3, 2.4, 9.3], look: [-.5, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { w.tree.position.set(-3, 0, -2); w.kp.position.set(-2.2, 0, -1); w.kp.rotation.y = Math.PI * .9; w.hands.position.set(-2.2, 3.3, -1.75); gy(w, 1, 0, .6, -1.3, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'He hid behind a pebble.',
      show: ['grass', 'bushes', 'g', 'pebble'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.2, 1.6, 6], look: [.2, .7, 0], fov: 46, to: { pos: [1.1, 1.6, 5.4], look: [.2, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.pebble.position.set(0, .4, 0); gy(w, 1.6 - Math.min(1, t / 1) * 1.1, 0, -1.2, Math.PI, t, t < 1); w.g.lookAt && 0; },
    },
    {
      say: 'Nobody found him. For three weeks.',
      show: ['grass', 'bushes', 'g', 'pebble', 'kp', 'leaves', 'cal'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [1, 3, 13], look: [-.2, 2.4, 0], fov: 52, to: { pos: [.9, 3, 12.2], look: [-.2, 2.4, 0], fov: 50 } },
      update: (w, p, t) => {
        w.pebble.position.set(0, .4, 0); gy(w, .4, 0, -1.2, Math.PI, t); w.kp.position.set(-2.4 + Math.sin(t * 1.2) * .6, 0, 1.4); w.kp.rotation.y = Math.sin(t * 2) * 1.2; w.kid.head.rotation.y = Math.sin(t * 3) * .5;
        w.cal.position.set(2.4, 3.6, -1.5); w.cal.rotation.y = -.3; w.cal.children.forEach(c => { if (c.userData.i !== undefined) c.visible = c.userData.i < p * 21; });
        w.leaves.children.forEach(l => { const i = l.userData.i, q = (t * .3 + i / 10) % 1; l.position.set(-3 + i * .7, 6 - q * 6, -1 + (i % 3) * .5); l.rotation.set(t * 2 + i, i, t); });
      },
    },
    {
      say: 'He is still the champion.',
      show: ['grass', 'bushes', 'g', 'trophy', 'confetti'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.8, 6.5], look: [.2, .95, 0], fov: 46, to: { pos: [1.5, 1.8, 5.9], look: [.2, .95, 0], fov: 44 } },
      update: (w, p, t) => { w.trophy.position.set(-.9, 0, -.4); gy(w, .6, 0, .2, -1.3, t); w.g.position.y = .25 * Math.abs(Math.sin(t * 5)); w.confetti.children.forEach(c => { const i = c.userData.i, q = (t * .5 + i / 16) % 1; c.position.set(-2 + (i % 8) * .5, 3.4 - q * 3.2, -.5 + (i % 3) * .4); c.rotation.set(t * 4 + i, i, 0); }); },
    },
    {
      say: 'Where should Gary hide next: a sock, a sandwich, or a shoe? Comment below.',
      quiz: { q: 'Where should Gary hide next?', options: ['A sock', 'A sandwich', 'A shoe'], answer: 'Fun fact: ants have a second stomach just for sharing food with friends.' },
      show: ['grass', 'bushes', 'g', 'pebble'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 5], look: [.4, .9, 0], fov: 46, to: { pos: [-2, 1.6, 5.5], look: [.4, .9, 0] } },
      update: (w, p, t) => { w.pebble.position.set(-1.2, .4, -.6); gy(w, .6, 0, .3, -1.4, t); },
    },
  ],
};

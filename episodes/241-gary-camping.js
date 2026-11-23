// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

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
  w.grass = k.ground('#3F6B3A', 0);
  w.trees = group(); for (let i = 0; i < 9; i++) { const t = group([-16 + i * 4, 0, -14 - (i % 3) * 3], w.trees); cyl(.4, .5, 4, mat('#5A3A22'), [0, 2, 0], t, 8); cone(2.4, 6, mat('#24502E'), [0, 6.5, 0], t, 8); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.leaf = group(); const lf = box(3.4, .08, 2.4, mat('#5FA83A'), [0, 0, 0], w.leaf); for (const s of [-1, 1]) { const h = box(3.4, .08, 1.7, mat('#5FA83A'), [0, .6, s * .55], w.leaf); h.rotation.x = s * .9; }
  w.fire = group(); for (let i = 0; i < 4; i++) { const st = box(.15, .15, 1.6, mat('#6B4428'), [0, .1, 0], w.fire); st.rotation.y = i * .8; } w.flame = cone(.4, 1, mat('#FF8A1F', { glow: 1 }), [0, .7, 0], w.fire, 10); w.flame.castShadow = false;
  w.mallow = group(); box(1.6, 1.4, 1.6, mat('#FFFFFF', { rough: .9 }), [0, 0, 0], w.mallow); w.stick = cyl(.06, .06, 5, mat('#8A6A3A'), [0, 0, 0], w.mallow, 6); w.stick.rotation.z = Math.PI / 2; w.stick.position.x = -3;
  w.stars = group(); for (let i = 0; i < 20; i++) { const s = ball(.08, mat('#FFF4C2', { glow: 1 }), [-10 + (i * 3.7) % 20, 6 + (i * 2.3) % 6, -18], w.stars); s.castShadow = false; }
  w.bear = group(); box(5, 4, 3, mat('#5A3A22'), [0, 2.4, 0], w.bear); box(2.6, 2.2, 2.2, mat('#5A3A22'), [3.2, 4.2, 0], w.bear); for (const z of [-.8, .8]) ball(.5, mat('#5A3A22'), [3, 5.5, z], w.bear); box(.8, .6, .8, mat('#C8935A'), [4.6, 3.9, 0], w.bear); for (const z of [-.5, .5]) box(.05, .3, .2, mat('#111111'), [4.32, 4.6, z], w.bear);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const CAMP = ['grass', 'trees', 'stars'];
const NIGHT = '#16224A';
const fl = (w, t) => { w.flame.scale.set(1 + .15 * Math.sin(t * 13), 1 + .3 * Math.sin(t * 9), 1 + .15 * Math.sin(t * 11)); };

export default {
  id: '241',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAMPING GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT CAMPING.'],
  title: 'Gary the ant went camping',
  description: 'His tent is a leaf. His marshmallow is the size of a house. And something big is coming to share it. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'camping', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: brown bears have a sense of smell many times stronger than a dog\'s (US National Park Service, "Bear Senses", nps.gov).'],
  setup,
  scenes: [
    { say: 'Gary went camping.', show: [...CAMP, 'g', 'leaf'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.leaf.position.set(-2.4, .05, -1.2); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'His tent? One leaf.', show: [...CAMP, 'g', 'leaf'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 2, 7], look: [-.4, .9, 0], fov: 46, to: { pos: [1.8, 2, 6.4], look: [-.4, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.leaf.position.set(-.6, .05, -.2); gy(w, -.6, .1, .9, -.2, t); } },
    { say: 'He roasted one marshmallow. It took all night.', label: '3:00 AM', show: [...CAMP, 'g', 'fire', 'mallow'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2.4, 8], look: [0, 1.4, 0], fov: 48, to: { pos: [2.6, 2.4, 7.4], look: [0, 1.4, 0], fov: 46 } },
      update: (w, p, t) => { fl(w, t); w.fire.position.set(1.4, 0, 0); w.mallow.position.set(1.4, 2.2, 0); w.mallow.children[0].material.color.setHSL(.08, .7, .95 - .45 * p); gy(w, -1.6, .1, 0, 0, t); w.g.rotation.z = .1 * Math.sin(t * 2); } },
    { say: 'Then something big smelled it.', show: [...CAMP, 'g', 'fire', 'mallow', 'bear'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [4, 3.4, 14], look: [0, 2, 0], fov: 52, to: { pos: [3.4, 3.4, 13], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { fl(w, t); w.fire.position.set(1.4, 0, 0); w.mallow.position.set(1.4, 2.2, 0); w.bear.position.set(-14 + p * 8, 0, -3); gy(w, -1.6, .1, 0, 0, t); w.g.rotation.z = p > .6 ? .4 * Math.sin(t * 12) : 0; } },
    { say: 'Gary gave the bear the marshmallow. The bear gave Gary a crumb.', show: [...CAMP, 'g', 'fire', 'bear'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 2, 12], look: [-1, .7, -1], fov: 52, to: { pos: [2.6, 2, 11.2], look: [-1, .7, -1], fov: 50 } },
      update: (w, p, t) => { fl(w, t); w.fire.position.set(1.4, 0, 0); w.bear.position.set(-6, 0, -3); w.bear.rotation.y = 0; gy(w, -1.2, .1, 0, Math.PI - .4, t); w.g.rotation.z = .1 * Math.sin(t * 4); } },
    { say: 'Best friends: Gary and a bear, a moth, or a mosquito? Comment below.',
      quiz: { q: 'Who is Gary\'s new best friend?', options: ['The bear', 'A moth', 'A mosquito'], answer: 'Fun fact: a bear can smell food from very far away.' },
      show: [...CAMP, 'g', 'fire', 'bear'], sky: NIGHT, lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 4.6, 9], look: [-1.6, 6.4, -2.4], fov: 50, to: { pos: [-2, 4.6, 9], look: [-1.6, 6.4, -2.4] } },
      update: (w, p, t) => { fl(w, t); w.fire.position.set(1.4, 0, 0); w.bear.position.set(-5, 0, -3); gy(w, -1.3, 5.3, -2.4, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};

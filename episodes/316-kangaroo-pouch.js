// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have pouches. Hook: the premise as a question under 2 s; first frame shows a person with a kangaroo pouch on their belly.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#F5E6C8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  const pm = mat('#B07A48', { rough: .9 });
  w.pouch = group([0, 1.05, .62], w.pp); const pb = k.mesh(new k.THREE.SphereGeometry(.75, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), pm, [0, .35, 0], w.pouch); pb.scale.set(1, 1.1, .8); pb.material.side = k.THREE.DoubleSide; const rim = k.torus(.6, .06, mat('#8A5A30'), [0, .35, .0], w.pouch); rim.rotation.set(Math.PI / 2, 0, 0); rim.scale.set(1.2, .8, 1);
  w.books = group(); const cols = ['#E2453C', '#3FA34D', '#F2B21F']; for (let i = 0; i < 3; i++) { const b = box(.6, .12, .45, mat(cols[i]), [0, 0, 0], w.books); b.userData.i = i; }
  w.sand = group(); box(.5, .08, .5, mat('#F2D9A0'), [0, 0, 0], w.sand); box(.52, .06, .52, mat('#5FBF5F'), [0, .07, 0], w.sand); box(.5, .08, .5, mat('#F2D9A0'), [0, .14, 0], w.sand); w.sand.rotation.z = .3;
  w.cat = group(); const cm = mat('#F09A3E'); ball(.42, cm, [0, 0, 0], w.cat); for (const x of [-1, 1]) { cone(.14, .3, cm, [x * .25, .38, 0], w.cat, 6); ball(.09, mat('#FFFFFF'), [x * .15, .08, .36], w.cat); ball(.05, mat('#111111'), [x * .15, .08, .43], w.cat); } ball(.05, mat('#E86A8A'), [0, -.04, .42], w.cat);
  w.desk = group(); box(3, .2, 1.6, mat('#C0703F'), [0, 2.2, 0], w.desk); for (const x of [-1.3, 1.3]) box(.2, 2.2, .2, mat('#C0703F'), [x, 1.1, 0], w.desk);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };

export default {
  id: '316',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KANGAROO POUCH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD POUCHES?'],
  title: 'What would happen if humans had kangaroo pouches?',
  description: 'No more backpacks. Snacks are always on you. And your cat? It moves right in. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'kangaroo', 'pouch', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human pouches are made up. Quiz fact: a newborn kangaroo is under 2.5 centimetres (about an inch) long and crawls into its mother\'s pouch, where it keeps growing for months (Encyclopaedia Britannica, "kangaroo").'],
  setup,
  scenes: [
    { say: 'What if humans had pouches?', show: ['floor', 'wall', 'pp', 'pouch'], sky: '#F5E6C8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 2.6, 11.5], look: [0, 3.9, 0], fov: 50, to: { pos: [0, 2.6, 10.8], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.p.arms.forEach(a => a.rotation.z = a.userData.s * (.3 + .1 * Math.sin(t * 4))); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); w.p.mouth.scale.set(1.3, 1.6, 1); } },
    { say: 'Your backpack? Not needed.', show: ['floor', 'wall', 'pp', 'pouch', 'books'], sky: '#F5E6C8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2, 3, 8], look: [0, 2.6, 0], fov: 50, to: { pos: [1.8, 3, 7.4], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.p.eyes.forEach(e => e.scale.setScalar(1)); stand(w, 0, 0, 0); pose(w.p, .3, .6); w.books.children.forEach(b => { const i = b.userData.i, q = Math.min(1, Math.max(0, p * 2.2 - i * .45)); b.position.set(0, 4.5 - q * 3.1, 1.05 + (1 - q) * .9); b.rotation.set(q * .4, i, (1 - q) * 2); b.visible = q < .98; }); w.p.mouth.scale.set(1.4, 1, 1); } },
    { say: 'Snacks? Always on you.', label: 'CHOMP', show: ['floor', 'wall', 'pp', 'pouch', 'sand'], sky: '#F5E6C8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8], look: [0, 3, 0], fov: 50, to: { pos: [0, 3.4, 7.4], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); const q = Math.min(1, p * 2); const arm = w.p.arms[1]; w.p.arms[0].rotation.set(0, 0, -.3); arm.rotation.set(-q * 2.2, 0, .2 - q * .5); w.sand.position.set(.4 - q * .4, 1.4 + q * 2, 1 + q * .1); const bite = p > .5; w.sand.scale.set(bite ? .6 : 1, 1, 1); w.p.mouth.scale.set(1.2, bite ? 1 + Math.abs(Math.sin(t * 14)) * 2 : 1, 1); } },
    { say: 'And your cat? It moves right in.', label: 'MEOW', show: ['floor', 'wall', 'pp', 'pouch', 'cat', 'desk'], sky: '#F5E6C8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3, 8.5], look: [0, 2.8, 0], fov: 50, to: { pos: [0, 3, 7.9], look: [0, 2.8, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 1.2, 0); pose(w.p, .3); w.desk.position.set(0, 0, -1); const up = Math.min(1, Math.max(0, p - .2) * 3); w.cat.position.set(0, 1.25 + up * .45, 1.95); w.cat.rotation.set(0, 0, .15 * Math.sin(t * 3)); w.cat.visible = up > 0; w.p.eyes.forEach(e => e.scale.setScalar(1 + up * .3)); w.p.head.rotation.x = up * .25; } },
    { say: 'Human pouches: useful, cosy, or way too weird? Comment below.',
      quiz: { q: 'Would you want a pouch?', options: ['Useful', 'Cosy', 'Way too weird'], answer: 'Made up for people. A newborn kangaroo is about an inch long and grows in the pouch.' },
      show: ['floor', 'pp', 'pouch', 'cat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); w.cat.position.set(.15, 1.7, .75); w.cat.visible = true; w.cat.rotation.set(0, .2, 0); } },
  ],
};

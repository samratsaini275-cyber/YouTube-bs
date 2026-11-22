// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in front of giant books.

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
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#B98A5E', 0);
  w.wall = box(60, 30, .5, mat('#E8DCC8'), [0, 15, -6]); w.wall.castShadow = false;
  w.books = group(); const cols = ['#B3262E', '#2F6FD6', '#22C55E', '#FFC21F', '#7A4BC2', '#F97316', '#0E7C86'];
  for (let i = 0; i < 9; i++) { const hgt = 6 + (i % 3) * 1.2; const b = box(1.1, hgt, 4, mat(cols[i % 7], { rough: .7 }), [-5 + i * 1.18, hgt / 2, -3], w.books); box(1.12, .25, 4.02, mat('#FFD21F'), [-5 + i * 1.18, hgt * .8, -3], w.books); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.open = group(); const pg = mat('#FFFDF5', { rough: .9 }); const l = box(4, .2, 5.4, pg, [-2.05, .1, 0], w.open); l.rotation.z = .06; const r = box(4, .2, 5.4, pg, [2.05, .1, 0], w.open); r.rotation.z = -.06;
  w.lines = group([0, .22, 0], w.open); for (let i = 0; i < 10; i++) for (const x of [-2.05, 2.05]) box(3.2, .02, .12, mat('#555555'), [x, 0, -2.2 + i * .48], w.lines);
  w.letter = box(.35, .03, .35, mat('#111111'), [-3.6, .25, -2.2], k.scene);
  w.glow = ball(.3, mat('#FFD21F', { glow: 1 }), [0, 0, 0], k.scene); w.glow.castShadow = false;
  w.lady = group(); box(2.2, 6, 1.4, mat('#7A4BC2'), [0, 3, 0], w.lady); const hd = ball(1.1, mat('#F2C9A0'), [0, 7, 0], w.lady); box(2.2, .9, .1, mat('#111111'), [0, 7.2, 1], w.lady); w.finger = box(.25, 1, .25, mat('#F2C9A0'), [0, 6.6, 1.2], w.lady);
  w.cal = group(); box(1.6, 2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.6, .5, .12, mat('#E2453C'), [0, .8, .01], w.cal);
  w.dust = group(); for (let i = 0; i < 12; i++) { const d = ball(.05, mat('#FFF4C2', { glow: .6 }), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '229',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BOOKWORM GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE LIBRARY.'],
  title: 'Gary the ant went to the library',
  description: 'Every book is taller than a building. He reads one letter a day. He has been on page one since June. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'library', 'books', 'funny', 'shorts'],
  sources: [
    'Quiz fact: ants communicate mainly with chemical signals called pheromones (Encyclopaedia Britannica, "ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to the library.',
      show: ['floor', 'wall', 'books', 'g'], sky: '#E8DCC8', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.2, 1.4, 6.5], look: [0, .82, 0], fov: 46, to: { pos: [1.1, 1.4, 5.9], look: [0, .82, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .5, -1.5, t, true); w.g.position.z = .5 - t * .3; },
    },
    {
      say: 'Every book is taller than a building.',
      show: ['floor', 'wall', 'books', 'g'], sky: '#E8DCC8', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [.8, .8, 7], look: [0, 4, -2], fov: 56, to: { pos: [.8, .8, 6.4], look: [0, 4.6, -2], fov: 56 } },
      update: (w, p, t) => { gy(w, 0, 0, .5, -1.5, t); w.g.rotation.x = 0; w.g.rotation.z = .3; },
    },
    {
      say: 'He reads one letter a day.',
      show: ['floor', 'open', 'g', 'letter', 'glow'], sky: '#E8DCC8', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-1.6, 2.6, 2], look: [-3.4, .6, -1.6], fov: 46, to: { pos: [-1.7, 2.4, 1.6], look: [-3.4, .6, -1.6], fov: 44 } },
      update: (w, p, t) => { w.open.position.set(0, 0, 0); gy(w, -3.6, .2, -1.6, -1.1, t); w.g.rotation.x = 0; w.letter.position.set(-2.9, .25, -.7); w.glow.position.set(-2.9, .55, -.7); w.glow.scale.setScalar(1 + .3 * Math.sin(t * 4)); w.g.children[2] && 0; },
    },
    {
      say: 'He has been on page one since June.',
      show: ['floor', 'open', 'g', 'dust', 'cal'], sky: '#D9CBB0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-1.6, 2.6, 2.6], look: [-3, .7, -1.2], fov: 48, to: { pos: [-1.7, 2.4, 2.2], look: [-3, .7, -1.2], fov: 46 } },
      update: (w, p, t) => {
        w.open.position.set(0, 0, 0); gy(w, -3.4, .2, -1.4, -1.1, t); w.g.position.y = .2; w.g.rotation.z = .25 * Math.sin(t * .8); w.cal.position.set(-1.6, 1.4, -2.4); w.cal.rotation.y = -.4;
        w.dust.children.forEach(d => { const i = d.userData.i, q = (t * .2 + i / 12) % 1; d.position.set(-4.6 + (i % 4) * .8, 3 - q * 2.6, -2 + (i % 3) * .6); });
      },
    },
    {
      say: 'Gary\'s favourite book: Crumbs, Tiny Legs, or Picnic Tales? Comment below.',
      quiz: { q: 'What is Gary reading?', options: ['Crumbs', 'Tiny Legs', 'Picnic Tales'], answer: 'Fun fact: ants mostly talk to each other using smells called pheromones.' },
      show: ['floor', 'wall', 'books', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 5], look: [0, .9, 0], fov: 46, to: { pos: [-2, 1.6, 5.5], look: [0, .9, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, .3, -1.4, t); },
    },
  ],
};

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
  w.floor = k.ground('#3A1E28', 0);
  w.hall = group(); box(80, 30, .5, mat('#2A1420'), [0, 15, -40], w.hall); w.screen = box(40, 18, .3, mat('#BFE3F7', { glow: .8 }), [0, 14, -39.6], w.hall); w.screen.castShadow = false;
  w.seats = group(); for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const sx = -9 + i * 6, sz = -r * 6; const s = group([sx, 0, sz], w.seats); box(4.4, 2, 4, mat('#B3262E', { rough: .9 }), [0, 1, 0], s); box(4.4, 5, 1, mat('#B3262E', { rough: .9 }), [0, 3.5, -2], s); for (const x of [-2.4, 2.4]) box(.6, 3, 4, mat('#5A1420'), [x, 1.5, 0], s); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.pop = group(); for (let i = 0; i < 6; i++) { const b = ball(.5 + (i % 2) * .15, mat('#FFF2C6', { rough: .8 }), [Math.cos(i) * .45, Math.sin(i * 2) * .3, Math.sin(i) * .45], w.pop); }
  w.bum = group(); box(4, 2.4, 3, mat('#2F3A4F'), [0, 0, 0], w.bum);
  w.shh = group(); for (let i = 0; i < 3; i++) { const b = box(.6, .1, .1, mat('#FFFFFF', { glow: .6 }), [0, i * .4, 0], w.shh); b.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const HALL = ['floor', 'hall', 'seats'];
const DARK = '#1A0C12';

export default {
  id: '240',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CINEMA GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE CINEMA.'],
  title: 'Gary the ant went to the cinema',
  description: 'One piece of popcorn is his whole dinner. The seat is a mountain. And then someone sits down. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cinema', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: popcorn pops because water inside the kernel turns to steam and bursts the hull, at around 180 °C (Virot & Ponomarenko, "Popcorn: critical temperature, jump and sound", J. R. Soc. Interface, 2015).'],
  setup,
  scenes: [
    { say: 'Gary went to the cinema.', show: [...HALL, 'g'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 3.4, 7.5], look: [-3, 3.2, 0], fov: 46, to: { pos: [1.5, 3.4, 6.9], look: [-3, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, -3, 2, -.3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'One piece of popcorn. Dinner for a week.', show: [...HALL, 'g', 'pop'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-1, 3.6, 6.5], look: [-3, 2.8, 0], fov: 46, to: { pos: [-1.2, 3.6, 6], look: [-3, 2.8, 0], fov: 44 } },
      update: (w, p, t) => { w.pop.position.set(-1.8, 2.7, -.3); w.pop.scale.setScalar(1 - .2 * p); gy(w, -3.6, 2, -.3, -1.4, t); w.g.rotation.z = .15 * Math.sin(t * 10); } },
    { say: 'Then someone sat down.', show: [...HALL, 'g', 'bum'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 4, 10], look: [-3, 3, 0], fov: 50, to: { pos: [2.6, 4, 9.4], look: [-3, 3, 0], fov: 48 } },
      update: (w, p, t) => { const y = Math.max(3.2, 12 - p * 14); w.bum.position.set(-3, y, 0); gy(w, -3, 2, -.3, -1.4, t); w.g.visible = true; w.g.rotation.z = p > .45 ? .5 * Math.sin(t * 16) : 0; } },
    { say: 'Gary watched the whole film from there.', label: '2 HOURS LATER', show: [...HALL, 'g', 'bum'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-.8, 2.8, 6], look: [-2.4, 2.4, 1], fov: 46, to: { pos: [-1, 2.8, 5.6], look: [-2.4, 2.4, 1], fov: 45 } },
      update: (w, p, t) => { w.bum.position.set(-3, 3.2, 0); gy(w, -2.2, 2, 1.6, -.2, t); w.g.scale.set(1.3, .35, 1.3); w.g.rotation.z = 0; } },
    { say: 'Flatter than a ticket.', label: '*SQUASHED*', show: [...HALL, 'g'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-1.4, 3.2, 5], look: [-3, 2, 0], fov: 46, to: { pos: [-1.6, 3.2, 4.6], look: [-3, 2, 0], fov: 45 } },
      update: (w, p, t) => { gy(w, -3, 2, -.3, -1.4, t); w.g.scale.set(1.3, .3 + .9 * Math.max(0, p - .5) * 2, 1.3); w.g.scale.y = Math.min(1.3, w.g.scale.y); } },
    { say: 'What makes popcorn pop: air, steam, or oil? Comment below.',
      quiz: { q: 'What makes popcorn pop?', options: ['Air', 'Steam', 'Oil'], answer: 'Answer: steam. Water inside the kernel boils and bursts it.' },
      show: [...HALL, 'g', 'pop'], sky: DARK, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1, 3.6, 8], look: [-3, 4.4, 0], fov: 46, to: { pos: [-5, 3.6, 8], look: [-3, 4.4, 0] } },
      update: (w, p, t) => { w.g.scale.setScalar(1.3); w.pop.position.set(-3, 3.3, -.3); w.pop.scale.setScalar(.8); gy(w, -3, 3.9, -.3, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 4); } },
  ],
};

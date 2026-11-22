// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a giant skateboard.

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
  w.ground = k.ground('#9AA5B1', 0);
  w.grass = group(); for (let i = 0; i < 10; i++) { const b = cone(.5, 1.6 + (i % 3) * .5, mat('#5E9450'), [-12 + i * 2.6, .8, -6 - (i % 2) * 2], w.grass, 5); }
  w.board = group(); box(6, .25, 1.8, mat('#E2453C', { rough: .4 }), [0, .85, 0], w.board); box(5.6, .02, 1.6, mat('#222222'), [0, .99, 0], w.board); for (const x of [-2.2, 2.2]) { box(.3, .3, 1.4, mat('#C0C8D0', { metal: .7 }), [x, .6, 0], w.board); for (const z of [-.75, .75]) { const wh = cyl(.38, .38, .3, mat('#FFC21F'), [x, .38, z], w.board, 16); wh.rotation.x = Math.PI / 2; } }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.house = group(); box(1.2, 1, 1.2, mat('#C79A5B'), [0, .5, 0], w.house); const r = cone(1, .8, mat('#B3262E'), [0, 1.4, 0], w.house, 4); r.rotation.y = Math.PI / 4;
  w.hill = group(); const h = box(40, .6, 6, mat('#9AA5B1'), [0, 0, 0], w.hill); w.hill.rotation.z = -.22;
  w.lines = group(); for (let i = 0; i < 6; i++) { const l = box(1.4, .05, .08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.cake = group(); cyl(2.6, 2.6, 1.6, mat('#F6E3C8'), [0, .8, 0], w.cake, 28); cyl(2.62, 2.62, .5, mat('#FF9EC4'), [0, 1.65, 0], w.cake, 28); ball(.35, mat('#E2453C'), [0, 2.1, 0], w.cake);
  w.splat = group(); for (let i = 0; i < 10; i++) { const s = ball(.22, mat('#FF9EC4'), [0, 0, 0], w.splat); s.userData.i = i; s.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '225',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SKATER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT SKATEBOARDING.'],
  title: 'Gary the ant went skateboarding',
  description: 'The board is bigger than his house. The hill is very steep. And the landing? Delicious. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'skateboard', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: some ant species can carry loads many times their own body weight; studies of Asian weaver ants recorded them holding about 100 times their body weight upside down (Journal of Experimental Biology, cited by BBC News, 2014).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went skateboarding.',
      show: ['ground', 'grass', 'board', 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 3.4, 7.5], look: [0, 1.75, 0], fov: 46, to: { pos: [2.8, 3.4, 6.8], look: [0, 1.75, 0], fov: 44 } },
      update: (w, p, t) => { w.board.position.set(0, 0, 0); w.board.rotation.set(0, 0, 0); gy(w, .4, 1, 0, -1.1, t); w.g.rotation.z = .12 * Math.sin(t * 5); },
    },
    {
      say: 'The board is bigger than his house.',
      show: ['ground', 'grass', 'board', 'g', 'house'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 3.8, 9.5], look: [.4, 1.6, 0], fov: 46, to: { pos: [2.8, 3.8, 8.7], look: [.4, 1.6, 0], fov: 44 } },
      update: (w, p, t) => { w.board.position.set(0, 0, 0); gy(w, -.6, 1, 0, -.9, t); w.house.position.set(2.2, 1, 0); w.house.scale.setScalar(.5); },
    },
    {
      say: 'He rolls down the hill. Very fast.',
      show: ['hill', 'board', 'g', 'lines', 'grass'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 4.2, 9], look: [0, 1.5, 0], fov: 50, to: { pos: [2.8, 4.2, 8.4], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => {
        w.hill.position.set(0, .3, 0); w.board.position.set(0, 0, 0); w.board.rotation.z = -.22; gy(w, .4, 1, 0, -1.4, t); w.g.position.y = 1 + .1 * Math.abs(Math.sin(t * 20)); w.g.rotation.z = -.22 + .15; w.g.userData.legs.forEach(l => l.rotation.x = .3 * Math.sin(t * 30));
        w.grass.position.x = -((t * 8) % 2.6); w.lines.children.forEach(l => { const i = l.userData.i, q = (t * 3 + i / 6) % 1; l.position.set(-1 - q * 5, 1.4 + (i % 3) * .5 + q * 1.1, .4 + (i % 2) * .6); });
      },
    },
    {
      say: 'Then he crashed. Into a cake. Best crash ever.',
      show: ['ground', 'board', 'g', 'cake', 'splat'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.6, 4.4, 9], look: [.6, 2.4, 0], fov: 46, to: { pos: [2.4, 4.4, 8.2], look: [.6, 2.4, 0], fov: 44 } },
      update: (w, p, t) => {
        const q = Math.min(1, t / .6); w.cake.position.set(1.6, 0, 0); w.board.position.set(-3 + q * 1.4, 0, 0); w.board.rotation.set(0, 0, q > .95 ? -.2 : 0);
        gy(w, q < 1 ? -2.4 + q * 3.6 : 1.4, q < 1 ? 1 + Math.sin(q * Math.PI) * 1.6 : 2.15, .2, -1.2, t); if (q >= 1) { w.g.rotation.z = .2 * Math.sin(t * 6); }
        w.splat.children.forEach(s => { const i = s.userData.i, f = Math.max(0, t - .6) * 2; s.visible = t > .6 && f < 1.2; s.position.set(1.4 + Math.cos(i * .63) * f * 1.4, 2.2 + Math.sin(i * .63) * f * 1.2 + .3, .4); });
      },
    },
    {
      say: 'Gary\'s skater name: Rollie, Board Bug, or Wheelie Gary? Comment below.',
      quiz: { q: 'What should Gary\'s skater name be?', options: ['Rollie', 'Board Bug', 'Wheelie Gary'], answer: 'Fun fact: some ants can hold about 100 times their own body weight.' },
      show: ['ground', 'grass', 'board', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [5, 3.6, 6], look: [0, 2, 0], fov: 46, to: { pos: [-5, 3.6, 6], look: [0, 2, 0] } },
      update: (w, p, t) => { w.board.position.set(0, 0, 0); w.board.rotation.set(0, 0, 0); gy(w, .4, 1, 0, -1.1, t); },
    },
  ],
};

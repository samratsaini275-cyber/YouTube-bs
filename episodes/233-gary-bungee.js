// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on the edge of a table with a hair tied on.

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
  w.floor = k.ground('#B98A5E', 0);
  w.wall = box(60, 40, .5, mat('#DCE8D0'), [0, 20, -8]); w.wall.castShadow = false;
  w.table = group(); box(10, .5, 6, mat('#8A5A3B'), [-4, 12, 0], w.table); for (const x of [-8.5, .5]) for (const z of [-2.5, 2.5]) box(.5, 12, .5, mat('#6B4428'), [x, 6, z], w.table);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.hair = cyl(.03, .03, 1, mat('#3A2A1A'), [0, 0, 0], k.scene, 4); w.hair.castShadow = false;
  w.cup = group(); cyl(.9, .7, 1.6, mat('#FFFFFF'), [0, .8, 0], w.cup, 18); const h = k.torus(.45, .12, mat('#FFFFFF'), [1, .85, 0], w.cup); h.scale.set(.7, 1, 1);
  w.lines = group(); for (let i = 0; i < 4; i++) { const l = box(.05, 1.2, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.cal = group(); box(1.8, 2.2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.8, .5, .12, mat('#E2453C'), [0, .85, .01], w.cal);
  w.moon = ball(.8, mat('#FFF4C2', { glow: 1 }), [-4, 18, -7.5]); w.moon.castShadow = false;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const rope = (w, A) => { const B = w.g.position.clone(); B.y += .5; w.hair.position.copy(A).add(B).multiplyScalar(.5); w.hair.scale.y = Math.max(.01, A.distanceTo(B)); w.hair.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };
const EDGE = () => ({ x: .8, y: 12.25, z: 0 });

export default {
  id: '233',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BUNGEE GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT BUNGEE JUMPING.'],
  title: 'Gary the ant went bungee jumping',
  description: 'His rope is one hair. His cliff is the kitchen table. He has been bouncing since Tuesday. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'bungee', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: very small animals such as insects fall slowly through air, so a fall from any height rarely hurts them (J. B. S. Haldane, "On Being the Right Size", 1926).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary went bungee jumping.',
      show: ['floor', 'wall', 'table', 'g', 'hair', 'cup'], sky: '#DCE8D0', lightAt: [0, 14, 3], lightDist: 20,
      cam: { pos: [3, 13.6, 6], look: [.2, 13, 0], fov: 46, to: { pos: [2.8, 13.6, 5.4], look: [.2, 13, 0], fov: 44 } },
      update: (w, p, t) => { w.cup.position.set(-2, 12.25, -.6); gy(w, .3, 12.25, 0, -1.3, t); w.g.rotation.z = .1 * Math.sin(t * 7); const A = new w.g.position.constructor(-2, 13.4, -.6); rope(w, A); },
    },
    {
      say: 'His rope? One single hair.',
      show: ['floor', 'wall', 'table', 'g', 'hair', 'cup'], sky: '#DCE8D0', lightAt: [0, 14, 3], lightDist: 20,
      cam: { pos: [-.5, 13.5, 5.2], look: [-.6, 12.95, -.2], fov: 54, to: { pos: [-.5, 13.5, 4.8], look: [-.6, 12.95, -.2], fov: 52 } },
      update: (w, p, t) => { w.cup.position.set(-2, 12.25, -.6); gy(w, .3, 12.25, 0, -1.6, t); const A = new w.g.position.constructor(-2, 13.4, -.6); rope(w, A); },
    },
    {
      say: 'He jumped off the kitchen table.',
      show: ['floor', 'wall', 'table', 'g', 'hair', 'cup', 'lines'], sky: '#DCE8D0', lightAt: [0, 8, 3], lightDist: 26,
      cam: { pos: [4, 7.6, 13], look: [1.2, 7, 0], fov: 54, to: { pos: [3.8, 7.6, 12.4], look: [1.4, 6.6, 0], fov: 52 } },
      update: (w, p, t) => {
        w.cup.position.set(-2, 12.25, -.6); const q = Math.min(1, t / 1.3); const y = 12.25 - q * q * 10.5; gy(w, .3 + q * 1.5, y, 0, -1.3, t); w.g.rotation.z = -q * 3; const A = new w.g.position.constructor(-2, 13.4, -.6); rope(w, A);
        w.lines.children.forEach(l => { const i = l.userData.i; l.visible = q < 1 && q > .1; l.position.set(w.g.position.x - .4 + i * .3, y + 1.6, .3); });
      },
    },
    {
      say: 'He\'s still bouncing. Since Tuesday.',
      show: ['floor', 'wall', 'table', 'g', 'hair', 'cup', 'cal', 'moon'], sky: '#2C3E6B', lightAt: [0, 8, 3], lightDist: 26,
      cam: { pos: [4, 6.6, 11], look: [1.6, 5.6, 0], fov: 54, to: { pos: [3.8, 6.6, 10.4], look: [1.6, 5.6, 0], fov: 52 } },
      update: (w, p, t) => { w.cup.position.set(-2, 12.25, -.6); const b = Math.abs(Math.sin(t * 3)); gy(w, 1.8, 2 + b * 6, 0, -1.3, t); w.g.rotation.z = Math.PI + .2 * Math.sin(t * 3); const A = new w.g.position.constructor(-2, 13.4, -.6); rope(w, A); w.cal.position.set(4.6, 9, -7.6); },
    },
    {
      say: 'Gary\'s next jump: off a spoon, a sofa, or a cat? Comment below.',
      quiz: { q: 'Where should Gary jump next?', options: ['A spoon', 'A sofa', 'A cat'], answer: 'Fun fact: insects fall so slowly that a fall from any height rarely hurts them.' },
      show: ['floor', 'wall', 'table', 'g', 'cup'], sky: '#274B73', lightAt: [0, 14, 3], lightDist: 20,
      cam: { pos: [3.4, 13.6, 5], look: [0, 13, 0], fov: 46, to: { pos: [-1.6, 13.6, 5.5], look: [0, 13, 0] } },
      update: (w, p, t) => { w.cup.position.set(-2, 12.25, -.6); gy(w, .3, 12.25, 0, -1.3, t); },
    },
  ],
};

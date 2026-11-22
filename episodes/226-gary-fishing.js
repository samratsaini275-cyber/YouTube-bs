// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary with a giant fishing rod by a pond.

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
  w.pond = cyl(9, 9, .1, mat('#3BA7E0', { rough: .1 }), [-9, .06, -2], k.scene, 36); w.pond.castShadow = false;
  w.reeds = group(); for (let i = 0; i < 8; i++) { const r = cyl(.06, .06, 2 + (i % 3) * .6, mat('#4E8A3A'), [-1.4 + (i % 4) * .3, 1.1, -4 + i * .9], w.reeds, 5); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.rod = group(); const pole = cyl(.08, .14, 7, mat('#8A5A2B'), [0, 3.5, 0], w.rod, 8); w.rod.rotation.z = .9;
  w.line = cyl(.04, .04, 1, mat('#FFFFFF'), [0, 0, 0], k.scene, 4); w.line.castShadow = false;
  w.worm = group(); for (let i = 0; i < 6; i++) { const s = ball(.28, mat('#F07A8F'), [0, -i * .42, 0], w.worm); s.userData.i = i; } for (const x of [-.1, .1]) ball(.06, mat('#111111'), [x, .1, .26], w.worm);
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.18, mat('#BFE3F7', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.fish = group(); const body = ball(1.4, mat('#FF9F43', { rough: .4 }), [0, 0, 0], w.fish); body.scale.set(1.6, .9, .7); const tail = cone(.8, 1.2, mat('#FF9F43'), [-2.5, 0, 0], w.fish, 4); tail.rotation.z = Math.PI / 2; for (const z of [-.6, .6]) { ball(.25, mat('#FFFFFF'), [1.5, .4, z], w.fish); ball(.12, mat('#111111'), [1.68, .4, z], w.fish); } w.fishMouth = box(.1, .3, .6, mat('#5A1E1E'), [2.2, -.2, 0], w.fish);
  w.ripples = group(); for (let i = 0; i < 3; i++) { const r = k.torus(1, .05, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.ripples); r.rotation.x = Math.PI / 2; r.userData.i = i; r.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const tip = (w) => { w.rod.updateMatrixWorld(true); const v = new w.rod.position.constructor(0, 7, 0); w.rod.localToWorld(v); return v; };
const string = (w, A, B) => { w.line.position.copy(A).add(B).multiplyScalar(.5); w.line.scale.y = A.distanceTo(B); w.line.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '226',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FISHING GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT FISHING.'],
  title: 'Gary the ant went fishing',
  description: 'The worm is bigger than him. The cast goes splash. Then a fish bites, and Gary goes for a swim. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'fishing', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: fire ants can link their bodies together to form floating rafts that survive floods (Mlot, Tovey and Hu, "Fire ants self-assemble into waterproof rafts to survive floods", PNAS, 2011).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went fishing.',
      show: ['grass', 'pond', 'reeds', 'g', 'rod'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2.4, 7], look: [-.4, .75, 0], fov: 46, to: { pos: [2.8, 2.4, 6.3], look: [-.4, .75, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.3, t); w.rod.position.set(.2, .3, .1); w.rod.rotation.z = .9 + .05 * Math.sin(t * 3); w.g.rotation.z = .08 * Math.sin(t * 4); },
    },
    {
      say: 'The worm is bigger than him.',
      show: ['grass', 'pond', 'reeds', 'g', 'worm'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.6, 2.6, 7.5], look: [.1, .85, 0], fov: 46, to: { pos: [2.4, 2.6, 6.8], look: [.1, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, -.6, 0, 0, -.8, t); w.g.position.x = -.6 - .3 * Math.min(1, t); w.worm.position.set(1.2, 2.6, 0); w.worm.children.forEach(s => { if (s.userData.i !== undefined) s.position.x = .25 * Math.sin(t * 4 - s.userData.i * .8); }); },
    },
    {
      say: 'He casts the line. Splash.',
      show: ['grass', 'pond', 'reeds', 'g', 'rod', 'line', 'splash', 'worm'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.5, 4, 11], look: [-2, 1.2, 0], fov: 58, to: { pos: [1.3, 4, 10.2], look: [-2, 1.2, 0], fov: 56 } },
      update: (w, p, t) => {
        gy(w, 0, 0, 0, -1.6, t); w.rod.position.set(.2, .3, .1); const sw = Math.min(1, t / .5); w.rod.rotation.z = .2 + sw * .9; const T = tip(w);
        const q = Math.min(1, Math.max(0, (t - .3) / .7)); const B = new T.constructor(T.x + (-6 - T.x) * q, T.y + (.2 - T.y) * q + Math.sin(q * Math.PI) * 2, 0);
        string(w, T, B); w.worm.position.copy(B); w.worm.scale.setScalar(.7);
        w.splash.children.forEach(s => { const i = s.userData.i, f = Math.max(0, t - 1) * 1.8; s.visible = t > 1 && f < 1.2; s.position.set(-6 + Math.cos(i * .63) * f, .2 + Math.sin(f * Math.PI) * 1.4 * (.6 + (i % 3) * .2), Math.sin(i * .63) * f); });
      },
    },
    {
      say: 'Then a fish bites. Now Gary is swimming.',
      show: ['grass', 'pond', 'reeds', 'g', 'fish', 'ripples'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [-1.5, 4, 11], look: [-4.6, 1.4, 0], fov: 54, to: { pos: [-1.7, 4, 10.2], look: [-4.6, 1.4, 0], fov: 52 } },
      update: (w, p, t) => {
        const q = Math.min(1, t / .8); w.fish.position.set(-5.6, -.4 + Math.sin(Math.min(1, t / .5) * Math.PI) * 3, 0); w.fish.rotation.z = .4 * Math.cos(Math.min(1, t / .5) * Math.PI); w.fishMouth.scale.y = 1 + Math.abs(Math.sin(t * 8));
        gy(w, -1 - q * 3.4, q < 1 ? Math.sin(q * Math.PI) * 2.2 : .05 + .1 * Math.sin(t * 4), 0, -1.6, t); if (q >= 1) w.g.userData.legs.forEach(l => l.rotation.x = .6 * Math.sin(t * 14));
        w.ripples.children.forEach(r => { const i = r.userData.i, f = (t * .8 + i / 3) % 1; r.position.set(-4.4, .1, 0); r.scale.setScalar(.3 + f * 2); });
      },
    },
    {
      say: 'Gary\'s best catch: a fish, a boot, or a cold? Comment below.',
      quiz: { q: 'What will Gary catch next time?', options: ['A fish', 'A boot', 'A cold'], answer: 'Fun fact: fire ants can hold on to each other to make floating rafts.' },
      show: ['grass', 'pond', 'g', 'rod'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [4, 2.6, 5], look: [0, 1.2, 0], fov: 46, to: { pos: [-3, 2.6, 5.5], look: [0, 1.2, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.3, t); w.rod.position.set(.2, .3, .1); w.rod.rotation.z = .9; },
    },
  ],
};

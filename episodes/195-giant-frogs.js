// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Animal + size swap (167 giant cats, 186 giant dogs).
// Hook: the premise as a question under 2 s; first frame shows a house-sized green frog sitting in a street, throat bulging.

function frog(k, parent) {
  const { mat, cyl, ball, box, group } = k;
  const g = mat('#5DBB4A', { rough: .5 });
  const f = { root: group([0, 0, 0], parent) };
  const b = ball(1.4, g, [0, 1.3, 0], f.root); b.scale.set(1.3, .85, 1.1);
  f.belly = ball(1.1, mat('#E8F2B8', { rough: .6 }), [.55, 1.05, 0], f.root); f.belly.scale.set(.9, .7, .9);
  f.throat = ball(.6, mat('#E8F2B8'), [1.35, 1.2, 0], f.root);
  for (const z of [-.6, .6]) { ball(.42, g, [.9, 2.2, z], f.root); ball(.28, mat('#FFFFFF'), [1.05, 2.3, z], f.root); ball(.14, mat('#111111'), [1.28, 2.32, z], f.root); }
  f.mouth = box(.08, .06, 1.6, mat('#2E6B24'), [1.62, 1.55, 0], f.root);
  f.legs = [-1, 1].map(s => { const l = group([-.8, .6, s * 1.1], f.root); const th = ball(.6, g, [0, 0, 0], l); th.scale.set(1.3, .7, .7); box(1.2, .15, .6, g, [.7, -.5, 0], l); return l; });
  for (const z of [-.7, .7]) { cyl(.18, .18, 1, g, [.9, .5, z], f.root, 8); box(.6, .1, .4, g, [1.1, 0, z], f.root); }
  return f;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 12, mat('#555555', { rough: 1 }), [0, .02, 4], w.road);
  w.houses = group(); for (let i = 0; i < 6; i++) { const x = -26 + i * 10; box(7, 6, 6, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9', '#FFE3A3', '#E8D7F0'][i]), [x, 3, -10], w.houses); const r = cone(5.4, 3, mat('#B3262E'), [x, 7.5, -10], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.f = frog(k, k.scene); w.fr = w.f.root; w.fr.scale.setScalar(3.5);
  w.house = group(); box(6, 5, 5, mat('#CFE3F2'), [0, 2.5, 0], w.house); const r = cone(4.6, 2.6, mat('#2F6FD6'), [0, 6.3, 0], w.house, 4); r.rotation.y = Math.PI / 4;
  w.kite = group(); const kd = box(2, 2, .1, mat('#EC4899'), [0, 0, 0], w.kite); kd.rotation.z = Math.PI / 4; cyl(.02, .02, 6, mat('#FFFFFF'), [0, -3, 0], w.kite, 4);
  w.tongue = cyl(.25, .25, 1, mat('#E86A8A'), [0, 0, 0], k.scene, 10); w.tongue.castShadow = false;
  w.rings = group(); for (let i = 0; i < 4; i++) { const r2 = k.torus(1 + i * .7, .1, mat('#FFFFFF', { glow: .7 }), [0, 0, 0], w.rings); r2.rotation.set(0, Math.PI / 2, 0); r2.userData.i = i; r2.castShadow = false; }
  w.car = group(); box(4, 1.2, 2, mat('#E2453C'), [0, 1, 0], w.car); box(2.2, 1, 1.8, mat('#9FD3EE'), [-.3, 2, 0], w.car); w.alarm = ball(.3, mat('#FFB020', { glow: 1 }), [0, 2.7, 0], w.car);
  w.pond = cyl(7, 7, .1, mat('#3A86C8', { rough: .2 }), [0, .06, 0], k.scene, 32); w.pond.scale.z = .7;
  w.pad = group(); const pd = cyl(1.2, 1.2, .1, mat('#3FA35B'), [0, .15, 0], w.pad, 20);
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.fr.position.set(x, y, z); w.fr.rotation.set(0, ry, 0); w.f.throat.scale.setScalar(1 + .25 * Math.sin(t * 4)); w.f.legs.forEach(l => l.rotation.z = 0); };
const tongue = (w, to, on) => { w.tongue.visible = on; if (!on) return; w.fr.updateMatrixWorld(true); const A = new w.fr.position.constructor(); w.fr.localToWorld(A.set(1.6, 1.5, 0)); const B = A.clone().set(...to);
  w.tongue.position.copy(A).add(B).multiplyScalar(.5); w.tongue.scale.y = A.distanceTo(B); w.tongue.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '195',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT FROGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FROGS', 'WERE GIANT?'],
  title: 'What would happen if frogs were giant?',
  description: 'One jump clears a whole house. Catching flies becomes catching kites. Every croak sets off car alarms. And a lily pad needs a lake. (A comedy what-if.)',
  tags: ['whatif', 'frogs', 'funny', 'giant', 'animals', 'shorts'],
  sources: [
    'Quiz fact: many frogs absorb water through their skin instead of drinking with their mouths (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if frogs were giant?',
      show: ['ground', 'road', 'houses', 'fr'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [4, 4, 34], look: [0, 9.8, 0], fov: 46, to: { pos: [3.6, 4, 32], look: [0, 9.8, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -1, 0, 1, -1.2, t); w.tongue.visible = false; },
    },
    {
      say: 'Jumping? Right over a house.',
      show: ['ground', 'road', 'houses', 'fr', 'house'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [6, 8, 34], look: [0, 9, 0], fov: 52, to: { pos: [5.5, 8, 32], look: [0, 9, 0], fov: 50 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -1); const q = Math.min(1, t / 1.4); pose(w, -10 + q * 20, Math.sin(q * Math.PI) * 14, 2, 0, t); w.f.legs.forEach(l => l.rotation.z = -.8 * Math.sin(q * Math.PI)); },
    },
    {
      say: 'Catching flies? Now it catches kites.',
      show: ['ground', 'road', 'houses', 'fr', 'kite'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [6, 6, 28], look: [2, 9, 0], fov: 48, to: { pos: [5.5, 6, 26], look: [2, 9, 0], fov: 46 } },
      update: (w, p, t) => {
        pose(w, -4, 0, 1, -.3, t); const grab = t > .8, back = Math.min(1, Math.max(0, (t - .8) * 2));
        const kx = 7 - back * 8, ky = 13 - back * 5; w.kite.position.set(kx, ky, 0); w.kite.rotation.z = .2 * Math.sin(t * 3);
        tongue(w, [kx, ky - .5, 0], grab && back < 1);
      },
    },
    {
      say: 'Croaking? Every car alarm goes off.',
      show: ['ground', 'road', 'houses', 'fr', 'rings', 'car'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [8, 5, 28], look: [2, 7, 0], fov: 50, to: { pos: [7.5, 5, 26], look: [2, 7, 0], fov: 48 } },
      shake: (t) => .08,
      update: (w, p, t) => {
        w.tongue.visible = false; pose(w, -4, 0, 0, -.4, t); w.f.throat.scale.setScalar(1.4 + .6 * Math.abs(Math.sin(t * 6)));
        w.car.position.set(8, 0, 5); w.alarm.visible = (t * 4 % 1) < .5; w.car.rotation.z = .03 * Math.sin(t * 30);
        w.fr.updateMatrixWorld(true); const v = new w.fr.position.constructor(); w.fr.localToWorld(v.set(1.6, 1.3, 0));
        w.rings.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 4) % 1; r.position.set(v.x + q * 8, v.y, v.z + q * 3); r.scale.setScalar(.5 + q * 1.5); r.rotation.set(0, Math.PI / 2 - .35, 0); });
      },
    },
    {
      say: 'But lily pads? You need a whole lake.',
      show: ['ground', 'fr', 'pond', 'pad'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [6, 8, 24], look: [0, 4.5, 0], fov: 48, to: { pos: [5.5, 8, 22], look: [0, 4.5, 0], fov: 46 } },
      update: (w, p, t) => { w.pond.position.set(0, .06, 0); w.pad.position.set(0, 0, 0); w.pad.scale.setScalar(1.2); pose(w, 0, .3, 0, -.9, t); w.fr.position.y = .3 - .1 * Math.abs(Math.sin(t * 3)); },
    },
    {
      say: 'Giant frogs: cool, amazing, or a bit slimy? Comment below.',
      quiz: { q: 'Would you want a giant frog?', options: ['Cool', 'Amazing', 'A bit slimy'], answer: 'Fun fact: many frogs drink by soaking up water through their skin.' },
      show: ['ground', 'road', 'houses', 'fr'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [10, 4, 22], look: [0, 8, 0], fov: 46, to: { pos: [-8, 4, 24], look: [0, 8, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, 0, -1.2, t); },
    },
  ],
};

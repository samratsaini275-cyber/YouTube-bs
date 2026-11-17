// Angle B (recurring character saga). Narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch:
// Gary the ant, his car and Kevin the blade of grass are all fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (a tiny ant alone in a full-size car).

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}

function ant(k, parent, pos, hat = false) {
  const { mat, ball, group } = k, g = group(pos, parent), black = mat('#141414', { rough: .4 });
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const s of [-1, 1]) {   // eyes
    ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, s * .11], g);
  }
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const s of [-1, 1]) {
    const leg = seg(k, [x, .3, 0], [x + .05, 0, s * .38], black, g, .03); g.userData.legs.push(leg);
  }
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#FFC21F'), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}

function car(k, parent, pos, color) {
  const { mat, box, cyl, ball, group } = k, g = group(pos, parent);
  box(5, 2, 9, mat(color, { metal: .3, rough: .35 }), [0, 1.8, 0], g);
  box(4.4, 1.8, 4.4, mat('#9FD3F5', { opacity: .35 }), [0, 3.7, .4], g).castShadow = false;
  for (const [x, z] of [[-2.5, 3], [2.5, 3], [-2.5, -3], [2.5, -3]]) { const t = cyl(1, 1, .7, mat('#1B1D22'), [x, 1, z], g, 16); t.rotation.z = Math.PI / 2; }
  for (const x of [-1.6, 1.6]) ball(.45, mat('#FFF6C9', { glow: 1.5 }), [x, 2.2, -4.5], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#6FAF5A', 0);
  w.road = box(12, .1, 400, mat('#5C636E'), [0, .05, 0], k.scene); w.road.castShadow = false;
  for (let i = -20; i <= 20; i++) box(.4, .05, 3, mat('#F4F1EA', { glow: .2 }), [0, .12, i * 8], k.scene).castShadow = false;
  // the full-size car, with Gary on the driver's seat
  w.big = car(k, k.scene, [0, 0, 0], '#E2453C');
  w.seat = box(1.6, .3, 1.6, mat('#333333'), [-1, 2.9, .6], w.big);
  w.wheelS = k.torus(.7, .12, mat('#111111'), [-1, 4, -.9], w.big); w.wheelS.rotation.x = Math.PI / 2.4;
  w.gary = ant(k, w.big, [-1, 3.05, .6], true); w.gary.rotation.y = Math.PI / 2;
  w.pedals = group([-1, 1.2, -1.6], w.big); for (const x of [-.4, .4]) box(.5, .8, .15, mat('#C9CED6', { metal: .8 }), [x, 0, 0], w.pedals);
  // the shrunken car
  w.tiny = car(k, k.scene, [300, 0, 0], '#E2453C'); w.tiny.scale.setScalar(.16);
  w.gary2 = ant(k, k.scene, [300, 0, 2.4], true);
  w.shrink = group([300, 0, 0]);
  for (let i = 0; i < 10; i++) { const s = ball(.18, mat('#B388FF', { glow: 3 }), [0, 0, 0], w.shrink); s.castShadow = false; s.userData.a = i / 10 * Math.PI * 2; }
  // the long grass where it gets lost, with Kevin
  w.lawn = group([600, 0, 0]);
  for (let i = 0; i < 140; i++) { const b = cone(.25, 3 + (i % 5) * .5, mat(i % 3 ? '#2E8B2E' : '#3FA63F'), [((i * 37) % 40) - 20, 1.6, ((i * 53) % 30) - 15], w.lawn, 5); b.scale.z = .3; }
  w.kevin = group([602, 0, 2]); const kb = cone(.5, 7, mat('#2E8B2E'), [0, 3.5, 0], w.kevin, 6); kb.scale.z = .25;
  for (const x of [-.14, .14]) ball(.09, mat('#111111'), [x, 4, .16], w.kevin);
  w.lost = car(k, k.scene, [601.2, 0, 2.6], '#E2453C'); w.lost.scale.setScalar(.16);
  w.gary3 = ant(k, k.scene, [594, 0, 6], true);
  return w;
}

function walk(g, t, speed = 1) { g.userData.legs.forEach((l, i) => { l.rotation.x = (i % 2 ? 1 : -1) * .35 * Math.sin(t * 14 * speed); }); }
const ROAD = ['grass', 'road'];

export default {
  id: '059',
  style: '3d',
  voice: 'v3',
  case: 'GARY BUYS A CAR',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['GARY THE ANT', 'BOUGHT A CAR.'],
  title: 'Gary the ant bought a car',
  description: 'Gary is back, and he has made a big purchase. Bigger than he thought. (Gary, the car and Kevin are made up.)',
  tags: ['funny', 'gary', 'ant', 'badideas', 'engineering', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant, his car, the shrink ray and Kevin the blade of grass are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant bought a car.',
      show: [...ROAD, 'big'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [-14, 6, 18], look: [0, 8.5, 0], fov: 48, to: { pos: [-6, 5.5, 7], look: [-1, 5.8, .4], fov: 40 } },
      update: (w, p, t) => { w.big.position.z = Math.sin(t * 30) * .03; walk(w.gary, t, .6); w.wheelS.rotation.z = .3 * Math.sin(t * 3); },
    },
    {
      say: 'He cannot reach the pedals.',
      show: [...ROAD, 'big'], sky: '#A7D8F5', lightAt: [-1, 2, 0], lightDist: 12,
      cam: { pos: [-6, 4, 3], look: [-1, 2.2, -.4], fov: 40, to: { pos: [-5, 3.4, 2], look: [-1, 2, -.8], fov: 38 } },
      update: (w, p, t) => { walk(w.gary, t, 1.5); w.gary.position.y = 3.05 + .08 * Math.abs(Math.sin(t * 8)); },
    },
    {
      say: 'So engineers shrank the car.',
      show: ['grass', 'tiny', 'gary2', 'shrink'], sky: '#E8D9FF', lightAt: [300, 1, 0], lightDist: 12,
      cam: { pos: [306, 5, 9], look: [300, 1.5, 0], fov: 42, to: { pos: [303, 2.4, 5], look: [300, .6, .6], fov: 38 } },
      update: (w, p, t, k) => { const s = 1 - .84 * k.h.ease(Math.min(1, t / 1.4)); w.tiny.scale.setScalar(s); w.shrink.visible = t < 1.8; w.shrink.children.forEach(o => { const r = 6 * s + .5; o.position.set(Math.cos(o.userData.a + t * 5) * r, 1 + 2 * s + Math.sin(t * 9 + o.userData.a), Math.sin(o.userData.a + t * 5) * r); }); walk(w.gary2, t, .4); },
    },
    {
      say: 'Perfect fit. He parked it on the lawn.',
      show: ['grass', 'tiny', 'gary2'], sky: '#9ED2F3', lightAt: [300, 1, 0], lightDist: 10,
      cam: { pos: [303, 1.6, 4], look: [300, .6, .4], fov: 38, to: { pos: [302.5, 1.4, 3.2], look: [300, .6, .4], fov: 36 } },
      update: (w, p, t) => { w.tiny.scale.setScalar(.16); w.tiny.position.set(300 - Math.min(t, 1.6) * .8, 0, 0); w.gary2.position.set(300 - Math.min(t, 1.6) * .8, .42, .1); w.gary2.scale.setScalar(.5); w.gary2.rotation.y = Math.PI / 2; },
    },
    {
      say: 'Now he cannot find it.',
      show: ['grass', 'lawn', 'kevin', 'lost', 'gary3'], sky: '#FFE3C2', lightAt: [600, 2, 0], lightDist: 30,
      cam: { pos: [600, 16, 22], look: [600, 1, 0], fov: 46, to: { pos: [598, 12, 17], look: [597, 1, 3], fov: 44 } },
      update: (w, p, t) => { w.gary3.position.set(594 + Math.sin(t * 1.4) * 3, 0, 6 + Math.cos(t * 1.1) * 2); w.gary3.rotation.y = t * 1.4; walk(w.gary3, t); },
    },
    {
      say: 'It is right behind Kevin.',
      show: ['grass', 'lawn', 'kevin', 'lost', 'gary3'], sky: '#9ED2F3', lightAt: [602, 2, 2], lightDist: 12,
      cam: { pos: [606, 3, 8], look: [601.6, 2, 2.3], fov: 40, to: { pos: [604.5, 2.4, 6], look: [601.5, 1.6, 2.4], fov: 36 } },
      update: (w, p, t) => { w.kevin.rotation.z = .08 * Math.sin(t * 2.2); },
    },
    {
      say: 'Next for Gary: a boat, a plane, or a nap? Comment below.',
      quiz: { q: 'What should Gary get next?', options: ['A boat', 'A plane', 'A nap'], answer: 'Gary is made up, so pick any. (He votes for the nap.)' },
      show: [...ROAD, 'big'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [10, 4, 16], look: [0, 9, 0], fov: 46, to: { pos: [-10, 4, 16], look: [0, 9, 0] } },
      update: (w, p, t) => { walk(w.gary, t, .6); },
    },
  ],
};

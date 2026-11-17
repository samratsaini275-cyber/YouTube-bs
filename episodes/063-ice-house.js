// Narrative 5: "What Would Happen If…". A made-up comedy sketch: nobody here lives in an ice house.
// Hook rule: the premise as a question under 2 s, first frame already showing the ice house sparkling and dripping.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.snow = k.ground('#F2F7FA', .02, 80); w.snow.receiveShadow = true;
  // the house: ice bricks in a brick pattern, a pointed ice roof, a wooden door
  w.house = group([0, 0, 0]);
  w.walls = group([0, 0, 0], w.house);
  const ice = mat('#BFE9FF', { opacity: .75, rough: .08, metal: .1 }), ice2 = mat('#A8DEFA', { opacity: .75, rough: .08, metal: .1 });
  for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) {
    const off = r % 2 ? 1 : 0, m = (r + c) % 2 ? ice : ice2;
    if (!(c === 2 && r < 4)) box(1.9, 1.15, .9, m, [-4 + c * 2 + off - .5, .6 + r * 1.2, 4], w.walls);
    box(1.9, 1.15, .9, m, [-4 + c * 2 + off - .5, .6 + r * 1.2, -4], w.walls);
    box(.9, 1.15, 1.9, m, [-4.5, .6 + r * 1.2, -4 + c * 2 + off - .5 + .5], w.walls);
    box(.9, 1.15, 1.9, m, [4.5, .6 + r * 1.2, -4 + c * 2 + off - .5 + .5], w.walls);
  }
  w.roof = cone(7.2, 4.5, mat('#D7F3FF', { opacity: .8, rough: .05 }), [0, 9.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4;
  w.door = box(1.8, 4.4, .3, mat('#8B5A2B'), [0, 2.2, 4.5], k.scene);
  ball(.15, mat('#E8C547', { metal: .8 }), [.6, 2.2, .2], w.door);
  // drips
  w.drips = group([0, 0, 0]);
  for (let i = 0; i < 12; i++) { const d = ball(.15, mat('#5BC0EB', { glow: .4 }), [0, 0, 0], w.drips); d.userData = { x: -4.5 + (i % 6) * 1.8, z: i < 6 ? 4.6 : -4.6, ph: i * .17 }; d.castShadow = false; }
  w.puddle = cyl(1, 1, .06, mat('#5BC0EB', { metal: .3, rough: .05, opacity: .85 }), [0, .06, 1], k.scene, 48); w.puddle.castShadow = false;
  // the owner, in a scarf
  w.guy = group([7, 0, 6]);
  cyl(.9, 1.1, 4, mat('#2F6FD6'), [0, 2, 0], w.guy, 18); ball(1, mat('#F2C9A0'), [0, 4.9, 0], w.guy);
  cyl(1.05, 1.05, .5, mat('#E2453C'), [0, 4.1, 0], w.guy, 18);
  for (const x of [-.35, .35]) ball(.12, mat('#111111'), [x, 5.1, .92], w.guy);
  w.mouth = box(.6, .15, .1, mat('#111111'), [0, 4.55, .98], w.guy);
  // summer sun
  w.sun = ball(4, mat('#FFE45C', { glow: 3 }), [-20, 30, -30]); w.sun.castShadow = false;
  // the fridge, door open, owner sitting inside to warm up
  w.fridge = group([-30, 0, 0]);
  box(4, 7, .3, mat('#F4F6F8', { metal: .2, rough: .3 }), [0, 3.5, -1.85], w.fridge); for (const x of [-1.9, 1.9]) box(.3, 7, 3.6, mat('#F4F6F8', { metal: .2, rough: .3 }), [x, 3.5, 0], w.fridge); for (const y of [.15, 6.85]) box(4, .3, 3.6, mat('#F4F6F8', { metal: .2, rough: .3 }), [0, y, 0], w.fridge);
  box(3.4, 6.4, .2, mat('#FFF6C9', { glow: .5 }), [0, 3.5, -1.7], w.fridge);
  const fd = group([2, 0, 1.8], w.fridge); box(4, 7, .3, mat('#F4F6F8', { metal: .2, rough: .3 }), [-2, 3.5, 0], fd); fd.rotation.y = 1.9;
  box(3.4, .12, 3, mat('#DDE7EE'), [0, 4.6, .2], w.fridge);
  w.inside = group([0, .5, .6], w.fridge); w.inside.scale.setScalar(.75);
  cyl(.9, 1.1, 3, mat('#2F6FD6'), [0, 1.5, 0], w.inside, 18); ball(1, mat('#F2C9A0'), [0, 3.9, 0], w.inside);
  cyl(1.05, 1.05, .5, mat('#E2453C'), [0, 3.1, 0], w.inside, 18);
  for (const x of [-.35, .35]) ball(.12, mat('#111111'), [x, 4.1, .92], w.inside);
  box(.7, .3, .1, mat('#111111'), [0, 3.5, .98], w.inside);
  w.puddleBig = cyl(9, 9, .06, mat('#5BC0EB', { metal: .3, rough: .05, opacity: .85 }), [0, .06, 0], k.scene, 64); w.puddleBig.castShadow = false;
  return w;
}

// melt: 0 = brand new ice house, 1 = a puddle with a door standing in it
function melt(w, m, t) {
  const s = Math.max(.001, 1 - m); w.snow.position.x = 0;
  w.house.scale.set(1 - m * .3, s, 1 - m * .3); w.house.visible = m < .99;
  w.door.visible = true;
  w.puddle.scale.set(1 + m * 8, 1, 1 + m * 6); w.puddle.visible = m > .02;
  w.drips.children.forEach(d => { const u = d.userData, f = (t * 1.3 + u.ph) % 1; d.position.set(u.x * (1 - m * .3), 7 * s - f * 7 * s, u.z * (1 - m * .3)); });
}
function shiver(w, t, a = 1) { w.guy.position.x = 7 + .07 * a * Math.sin(t * 40); w.mouth.scale.x = 1 + .3 * Math.sin(t * 30); }
const ALL = ['ground', 'house', 'door', 'drips', 'puddle', 'guy'];

export default {
  id: '063',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ICE HOUSE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HOUSES WERE', 'MADE OF ICE?'],
  title: 'What would happen if houses were made of ice?',
  description: 'Free air conditioning. Free water. Free puddle. (A made-up ice house. Please keep your real one.)',
  tags: ['whatif', 'funny', 'icehouse', 'summer', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the ice house, its owner and the puddle are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if houses were made of ice?',
      show: ['ground', 'snow', 'house', 'door', 'drips', 'guy'], sky: '#CFE8F7', lightAt: [0, 3, 2], lightDist: 22,
      cam: { pos: [9, 4, 30], look: [1, 10, 0], fov: 48, to: { pos: [8, 4, 27], look: [1, 10, 0], fov: 46 } },
      update: (w, p, t) => { melt(w, 0, t); shiver(w, t); w.puddle.visible = false; },
    },
    {
      say: 'Free air conditioning. All year.',
      show: ['ground', 'snow', 'house', 'door', 'drips', 'guy'], sky: '#DDEFFA', lightAt: [3.5, 4, 8], lightDist: 12,
      cam: { pos: [13, 6, 17], look: [5, 5.5, 4], fov: 42, to: { pos: [12, 6, 15], look: [5, 5.5, 4], fov: 40 } },
      update: (w, p, t) => { melt(w, 0, t); shiver(w, t, 2.5); w.puddle.visible = false; },
    },
    {
      say: 'Then summer shows up.',
      show: ['ground', 'sun', ...ALL], sky: '#8EC9F0', lightAt: [0, 3, 2], lightDist: 25,
      cam: { pos: [-10, 6, 24], look: [0, 10, 0], fov: 50, to: { pos: [-8, 6, 21], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t, k) => { melt(w, .05 + .25 * k.h.ease(p), t); shiver(w, t, 0); },
    },
    {
      say: 'By August, it is a puddle with a door.',
      show: ['ground', 'sun', ...ALL], sky: '#FFD9A8', lightAt: [0, 2, 2], lightDist: 25,
      cam: { pos: [-6, 9, 24], look: [0, 5, 0], fov: 48, to: { pos: [-5, 9, 21], look: [0, 5, 0], fov: 46 } },
      update: (w, p, t, k) => { melt(w, Math.min(1, .3 + .7 * k.h.ease(Math.min(1, t / 1.6))), t); w.guy.position.set(9, 0, 4); },
    },
    {
      say: 'And in winter, the warmest room is the fridge.',
      show: ['ground', 'snow', 'fridge'], sky: '#CFE8F7', lightAt: [-30, 4, 2], lightDist: 14,
      cam: { pos: [-27, 4.5, 15], look: [-30, 5.5, 0], fov: 46, to: { pos: [-28, 4.5, 12.5], look: [-30, 5.2, 0], fov: 44 } },
      update: (w, p, t) => { w.snow.position.x = -30; w.inside.rotation.z = .04 * Math.sin(t * 3); },
    },
    {
      say: 'Ice house: winter, summer, or never? Comment below.',
      quiz: { q: 'When would you live in an ice house?', options: ['Winter only', 'Summer (briefly)', 'Never'], answer: 'It is a made-up house, so every answer is a little bit wet.' },
      show: ['ground', 'snow', 'house', 'door', 'drips', 'guy'], sky: '#274B73', lightAt: [0, 3, 2], lightDist: 22,
      cam: { pos: [14, 3, 22], look: [0, 13, 0], fov: 46, to: { pos: [-12, 3, 22], look: [0, 13, 0] } },
      update: (w, p, t) => { w.snow.position.x = 0; melt(w, 0, t); shiver(w, t); w.puddle.visible = false; },
    },
  ],
};

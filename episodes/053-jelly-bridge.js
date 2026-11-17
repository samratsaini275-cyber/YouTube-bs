// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: no bridge is made of jelly.
// Hook rule: first line under 2 s, first frame already mid-joke (a car bouncing on a wobbling jelly bridge).

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#6FAF5A', 0);
  w.river = box(30, .2, 400, mat('#3E8FD1', { metal: .3, rough: .1 }), [0, .05, 0], k.scene); w.river.castShadow = false;
  w.banks = group();
  box(20, 6, 30, mat('#8C6B4A'), [-25, 3, 0], w.banks); box(20, 6, 30, mat('#8C6B4A'), [25, 3, 0], w.banks);
  box(20, .3, 8, mat('#5C636E'), [-25, 6.15, 0], w.banks); box(20, .3, 8, mat('#5C636E'), [25, 6.15, 0], w.banks);
  // the jelly bridge: a row of wobbling blocks
  w.jelly = group([0, 0, 0]);
  w.blocks = [];
  for (let i = 0; i < 10; i++) { const b = box(3.2, 3, 8, mat('#FF3D6E', { opacity: .75, rough: .1, metal: .1 }), [-14.4 + i * 3.2, 4.5, 0], w.jelly); w.blocks.push(b); }
  // a car
  w.car = group([-20, 6.3, 0]);
  box(4, 1.6, 2.6, mat('#FFD21F', { metal: .3 }), [0, .9, 0], w.car); box(2.2, 1.2, 2.3, mat('#9FD3F5', { opacity: .7 }), [-.2, 2.2, 0], w.car);
  for (const [x, z] of [[-1.3, 1.35], [1.3, 1.35], [-1.3, -1.35], [1.3, -1.35]]) { const t = cyl(.55, .55, .4, mat('#1B1D22'), [x, .4, z], w.car, 14); t.rotation.x = Math.PI / 2; }
  // the sun for the melting gag
  w.sun = ball(4, mat('#FFE45C', { glow: 2.5 }), [10, 40, -40]); w.sun.castShadow = false;
  w.spoon = group([0, 14, 3]);
  cyl(.3, .3, 9, mat('#C9CED6', { metal: .9, rough: .1 }), [0, 4.5, 0], w.spoon, 10);
  const bowl = ball(1.4, mat('#C9CED6', { metal: .9, rough: .1 }), [0, -.4, 0], w.spoon); bowl.scale.set(1, .4, 1.4);
  return w;
}

function wobble(w, t, amp = 1, melt = 0) {
  w.blocks.forEach((b, i) => { const s = 1 + amp * .12 * Math.sin(t * 9 + i * .8); b.scale.set(1 / Math.sqrt(s), s * (1 - melt * .8), 1 / Math.sqrt(s)); b.position.y = 4.5 * (1 - melt * .8) + amp * .2 * Math.sin(t * 9 + i * .8); });
}
function drive(w, x, t) { w.car.position.x = x; const onJelly = Math.abs(x) < 16; w.car.position.y = 6.3 + (onJelly ? 1.4 * Math.abs(Math.sin(t * 6)) : 0); w.car.rotation.z = onJelly ? .15 * Math.sin(t * 6) : 0; }
const ALL = ['ground', 'river', 'banks', 'jelly', 'car'];

export default {
  id: '053',
  style: '3d',
  voice: 'v3',
  case: 'THE JELLY BRIDGE',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS BRIDGE', 'IS MADE OF JELLY.'],
  title: 'Engineers built a bridge out of jelly',
  description: 'Engineers wanted a flexible bridge. They took that very literally. (A made-up bridge. Please do not eat real bridges.)',
  tags: ['engineering', 'funny', 'badideas', 'bridge', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the jelly bridge and everything that happens on it are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This bridge is made of jelly.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [10, 13, 28], look: [-4, 14, 0], fov: 48, to: { pos: [9, 12.5, 25], look: [-3, 14, 0], fov: 46 } },
      update: (w, p, t) => { wobble(w, t, 1.4); drive(w, -10 + t * 2, t); w.spoon.visible = false; },
    },
    {
      say: 'Engineers wanted it to be flexible.',
      show: ALL, sky: '#A7D8F5', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [-26, 12, 22], look: [0, 6, 0], fov: 46, to: { pos: [-22, 11, 18], look: [0, 6, 0], fov: 44 } },
      update: (w, p, t) => { wobble(w, t, 1.8); drive(w, -6 + t * 2, t); w.spoon.visible = false; },
    },
    {
      say: 'Every car bounces across. Slowly.',
      show: ALL, sky: '#9ED2F3', lightAt: [2, 7, 0], lightDist: 20,
      cam: { pos: [6, 10, 14], look: [2, 8, 0], fov: 42, to: { pos: [8, 10, 12], look: [5, 8, 0], fov: 40 } },
      update: (w, p, t) => { wobble(w, t, 1.2); drive(w, t * 1.6, t); w.spoon.visible = false; },
    },
    {
      say: 'On hot days, it becomes dessert.',
      show: [...ALL, 'sun', 'spoon'], sky: '#FFD9A8', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [0, 20, 32], look: [0, 8, 0], fov: 48, to: { pos: [0, 18, 28], look: [0, 8, 0], fov: 46 } },
      update: (w, p, t, k) => { const m = k.h.ease(Math.min(1, t / 2.2)); wobble(w, t, .6, m); drive(w, 22, t); w.spoon.visible = true; w.spoon.position.set(0, 14 - k.h.win(t, 1.6, 2.4) * 6, 3); w.spoon.rotation.z = -.4; },
    },
    {
      say: 'Quick question. What flavour should the next bridge be? Strawberry? Lime? Or blue raspberry? Comment your answer.',
      quiz: { q: 'What flavour should the next bridge be?', options: ['Strawberry', 'Lime', 'Blue raspberry'], answer: 'It is a made-up bridge, so pick any flavour.' },
      show: ALL, sky: '#274B73', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [16, 6, 34], look: [0, 14, 0], fov: 46, to: { pos: [-16, 6, 34], look: [0, 14, 0] } },
      update: (w, p, t) => { wobble(w, t, 1.4); drive(w, -8 + t * 1.2, t); },
    },
  ],
};

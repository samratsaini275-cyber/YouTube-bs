// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const NIGHT = '#0B1020';

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = {};
  w.ground = k.ground('#3F5E3A', -.05);
  w.road = group();
  box(24, .3, 600, mat('#3A3E45', { rough: 1 }), [0, .15, 0], w.road);
  for (let i = -30; i <= 30; i++) box(.5, .1, 8, mat('#F2D04B', { glow: .3 }), [0, .34, i * 20], w.road).castShadow = false;
  for (const x of [-11.2, 11.2]) box(.4, .1, 600, mat('#F4F4F0', { glow: .3 }), [x, .34, 0], w.road).castShadow = false;
  // milled grooves just outside the edge line and along the centre
  w.strips = group([0, 0, 0], w.road);
  for (let i = -150; i <= 150; i++) { box(1.8, .12, .55, mat('#1E2126'), [12.4, .26, i * 2], w.strips).castShadow = false; box(1.8, .12, .55, mat('#1E2126'), [-12.4, .26, i * 2], w.strips).castShadow = false; box(1.2, .12, .5, mat('#24272D'), [0, .25, i * 2 + 1], w.strips).castShadow = false; }
  box(6, .25, 600, mat('#6C6A63', { rough: 1 }), [15.5, .12, 0], w.road);
  // car
  w.car = group([0, 0, 0]);
  box(5, 2, 10, mat('#E0483A'), [0, 1.9, 0], w.car); box(4.6, 1.8, 5, mat('#F2F2EE'), [0, 3.7, -.6], w.car);
  for (const [x, z] of [[-2.5, 3.2], [2.5, 3.2], [-2.5, -3.2], [2.5, -3.2]]) { const t = cyl(1.1, 1.1, .8, mat('#1B1D22'), [x, 1.1, z], w.car, 16); t.rotation.z = Math.PI / 2; }
  w.beams = group([0, 2, 6], w.car);
  for (const x of [-1.6, 1.6]) { const b = cyl(.2, 4, 40, mat('#FFF4C2', { glow: 1.2, opacity: .12 }), [x, 0, 20], w.beams, 20); b.rotation.x = Math.PI / 2; b.castShadow = false; }
  // vibration rings shown when a tyre is on the grooves
  w.buzz = group([0, 0, 0], w.car);
  for (let i = 0; i < 3; i++) { const r = k.torus(2 + i, .12, mat('#FFD21F', { glow: 1.5 }), [2.5, 1.1, 0], w.buzz); r.castShadow = false; r.rotation.set(0, Math.PI / 2, 0); }
  return w;
}
// lane: car's x position; z: along the road; drift: buzz rings when x is past the edge
function drive(w, x, z, t, yaw = 0) {
  w.car.position.set(x, 0, z); w.car.rotation.y = yaw;
  const on = Math.abs(x) > 9.4;
  w.buzz.visible = on; w.buzz.children.forEach((r, i) => r.scale.setScalar(1 + ((t * 3 + i / 3) % 1) * .8));
  w.car.children[0].position.y = 1.9 + (on ? .08 * Math.sin(t * 60) : 0);
  return on;
}
const ALL = ['ground', 'road', 'car'];

export default {
  id: '029',
  style: '3d',
  voice: 'v3',
  case: 'RUMBLE STRIPS',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['YOU FELL ASLEEP', 'AT THE WHEEL.'],
  title: 'Why highways have rumble strips',
  description: 'Your eyes close for a second. The car starts to drift. These grooves are cut into the road for that exact moment.',
  tags: ['engineering', 'roads', 'whyisitbuiltlikethat', 'roadsafety', 'driving', 'shorts'],
  sources: [
    'Wikipedia, "Rumble strip" — https://en.wikipedia.org/wiki/Rumble_strip (retrieved November 2026): alert inattentive drivers by vibration and audible rumbling; placed along edge lines and centre lines; also known as sleeper lines or alert strips; 2008 Swedish simulator study of 35 sleep-deprived drivers found an alerting effect; crashes reduced by an average of 27% over all crash types and studies, run-off-road crashes by up to 80% in some studies.',
  ],
  setup,
  scenes: [
    {
      say: 'It is late. Your eyes close for a second. And the car starts to drift.',
      show: ALL, sky: NIGHT, lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [-4, 9, -26], look: [2, 2, 10], fov: 44, to: { pos: [-2, 8, -22], look: [4, 2, 12], fov: 42 } },
      update: (w, p, t) => drive(w, 4.5 + t * .9, t * 8, t, .08),
    },
    {
      say: 'Then: this. The whole car shakes, and a loud rumble fills the cabin.',
      show: ALL, sky: NIGHT, lightAt: [11, 0, 40], lightDist: 40,
      cam: { pos: [22, 3, 40], look: [11, 1, 48], fov: 40, to: { pos: [20, 2, 44], look: [11, 1, 50], fov: 38 } },
      shake: (t) => t > .6 ? .35 : 0,
      update: (w, p, t) => drive(w, 9 + Math.min(t, 1) * 1.2, 40 + t * 6, t, .02),
    },
    {
      say: 'Those grooves are rumble strips. They are cut into the road on purpose, to jolt drowsy and distracted drivers.',
      show: ALL, sky: '#1A2238', lightAt: [12, 0, 0], lightDist: 30,
      cam: { pos: [18, 6, -10], look: [12.4, 0, 2], fov: 40, to: { pos: [16, 3, -4], look: [12.4, 0, 4], fov: 36 } },
      update: (w, p, t) => drive(w, -60, 0, t),
    },
    {
      say: 'You find them along the edge of the road, and down the center line. Right where a drifting car would cross.',
      show: ALL, sky: '#22305A', lightAt: [0, 0, 0], lightDist: 80,
      cam: { pos: [0, 70, -30], look: [0, 0, 20], fov: 44, to: { pos: [0, 60, -10], look: [0, 0, 30], fov: 44 } },
      update: (w, p, t) => drive(w, -5 + Math.sin(t * .9) * 4, 10 + t * 6, t, Math.cos(t * .9) * .1),
    },
    {
      say: 'In one Swedish study, sleep-deprived drivers in a simulator perked up after hitting the strip.',
      show: ALL, sky: NIGHT, lightAt: [0, 0, 60], lightDist: 50,
      cam: { pos: [-14, 6, 50], look: [6, 2, 64], fov: 42, to: { pos: [-10, 5, 56], look: [4, 2, 70], fov: 40 } },
      update: (w, p, t, k) => { const x = t < 2.4 ? 6 + t * 1.5 : 9.6 - (t - 2.4) * 2; drive(w, Math.max(4, x), 56 + t * 6, t, t < 2.4 ? .06 : -.08); },
    },
    {
      say: 'Across many studies, crashes dropped by {27|twenty-seven} percent on average. And cars running off the road? Down by up to {80|eighty} percent in some.',
      show: ALL, sky: '#2B3E66', lightAt: [0, 0, 120], lightDist: 60,
      cam: { pos: [26, 30, 90], look: [0, 0, 130], fov: 46, to: { pos: [20, 24, 100], look: [0, 0, 140], fov: 44 } },
      update: (w, p, t) => drive(w, 5, 110 + t * 8, t),
    },
    {
      say: 'Quick question. Rumble strips have another name. Which one? A, sleeper lines. B, wake lanes. Or C, snore strips. Comment your answer.',
      quiz: { q: 'Rumble strips have another name. Which one?', options: ['Sleeper lines', 'Wake lanes', 'Snore strips'], answer: 'A — sleeper lines (they are also called alert strips).' },
      show: ALL, sky: '#274B73', lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [20, 40, 60], look: [0, -20, 0], fov: 46, to: { pos: [-20, 40, 60], look: [0, -20, 0] } },
      update: (w, p, t) => drive(w, 5, 0, t),
    },
  ],
};

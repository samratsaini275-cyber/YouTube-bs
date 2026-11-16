// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the chair and its airbags are fictional.

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#D9D2C3', 0);
  w.room = group();
  box(80, 40, 1, mat('#EDE7DA'), [0, 20, -12], w.room);
  for (let i = -4; i <= 4; i++) box(.3, 40, .3, mat('#D9D0BE'), [i * 8, 20, -11.4], w.room);
  // the chair
  w.chair = group([0, 0, 0]);
  const wood = mat('#B07A4A', { rough: .7 });
  box(6, .8, 6, wood, [0, 4, 0], w.chair); box(6, 7, .8, wood, [0, 8, -2.6], w.chair);
  for (const [x, z] of [[-2.6, -2.6], [2.6, -2.6], [-2.6, 2.6], [2.6, 2.6]]) box(.6, 4, .6, wood, [x, 2, z], w.chair);
  // roll cage
  w.cage = group([0, 0, 0], w.chair);
  const steel = mat('#C9CED6', { metal: .8, rough: .25 });
  for (const x of [-3.4, 3.4]) { cyl(.18, .18, 9, steel, [x, 8.5, -2.8], w.cage, 10); cyl(.18, .18, 9, steel, [x, 8.5, 2.8], w.cage, 10); box(.36, .36, 5.6, steel, [x, 13, 0], w.cage); }
  box(6.8, .36, .36, steel, [0, 13, -2.8], w.cage); box(6.8, .36, .36, steel, [0, 13, 2.8], w.cage);
  // seatbelt
  w.belt = box(.5, 6, .15, mat('#1E2430'), [0, 7, -2.1], w.chair); w.belt.rotation.z = .6;
  // airbags (hidden until they go off)
  w.bags = [];
  for (const [x, y, z] of [[0, 7, 3.5], [-3.6, 6.5, 0], [3.6, 6.5, 0], [0, 12, 0]]) { const b = ball(2.6, mat('#F4F6F8', { rough: .5 }), [x, y, z], w.chair); b.scale.setScalar(.01); w.bags.push(b); }
  // a hopeful sitter
  w.guy = group([0, 0, 9]);
  cyl(1, 1.2, 5, mat('#E2453C'), [0, 2.5, 0], w.guy, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 6.3, -1], w.guy);
  // spotlight cone for the lonely ending
  w.spot = k.mesh(new k.THREE.ConeGeometry(7, 22, 32, 1, true), mat('#FFF4C2', { glow: .6, opacity: .15, double: true }), [0, 11, 0]); w.spot.castShadow = false;
  return w;
}

function bags(w, a) { w.bags.forEach(b => b.scale.setScalar(Math.max(.01, a))); }
const ALL = ['floor', 'room', 'chair'];

export default {
  id: '044',
  style: '3d',
  voice: 'v3',
  case: 'THE SAFEST CHAIR',
  year: 'ENGINEERING NONSENSE',
  hook: ['THE SAFEST', 'CHAIR EVER.'],
  title: 'Engineers built the safest chair in the world',
  description: 'Roll cage. Seatbelt. Four airbags. One tiny flaw. (A made-up chair. Your chair is fine.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'chair', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the chair, its airbags and the failed sitting attempts are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This is the safest chair ever made.',
      show: ALL, sky: '#EDE7DA', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 12, 28], look: [0, 7, 0], fov: 44, to: { pos: [9, 10, 21], look: [0, 7.5, 0], fov: 42 } },
      update: (w, p, t) => { bags(w, 0); w.chair.rotation.y = .2 * Math.sin(t * .6); },
    },
    {
      say: 'Roll cage. Seatbelt. Front and side airbags.',
      show: ALL, sky: '#E4DCCB', lightAt: [0, 9, 0], lightDist: 25,
      cam: { pos: [-10, 15, 16], look: [0, 10, 0], fov: 42, to: { pos: [-8, 12, 13], look: [0, 8, 0], fov: 40 } },
      update: (w, p, t) => { bags(w, 0); w.chair.rotation.y = 0; },
    },
    {
      say: 'You sit down. Gently.',
      show: [...ALL, 'guy'], sky: '#EDE7DA', lightAt: [0, 6, 4], lightDist: 25,
      cam: { pos: [16, 9, 18], look: [0, 6, 3], fov: 44, to: { pos: [14, 8, 15], look: [0, 6, 2], fov: 42 } },
      update: (w, p, t, k) => { bags(w, 0); const a = k.h.ease(Math.min(1, t / 2.2)); w.guy.position.set(0, 4.4 * a * (a > .8 ? 1 : a), 9 - 8.6 * a); w.guy.rotation.y = a > .6 ? Math.PI : 0; },
    },
    {
      say: 'The airbags go off. Every single time.',
      show: [...ALL, 'guy'], sky: '#FFE3E3', lightAt: [0, 6, 4], lightDist: 30,
      cam: { pos: [18, 12, 28], look: [0, 8, 4], fov: 46, to: { pos: [16, 11, 26], look: [0, 9, 6], fov: 46 } },
      shake: (t) => t < .8 ? .6 : 0,
      update: (w, p, t, k) => { bags(w, k.h.ease(Math.min(1, t / .25))); const f = Math.min(t, 1.4); w.guy.position.set(0, 4.4 + f * 6 - f * f * 5, .4 + f * 9); w.guy.rotation.set(-f * 1.2, Math.PI, 0); },
    },
    {
      say: 'Nobody has ever actually sat in it.',
      show: [...ALL, 'spot'], sky: '#1D1A24', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [0, 10, 26], look: [0, 7, 0], fov: 42, to: { pos: [0, 9, 21], look: [0, 7, 0], fov: 40 } },
      update: (w, p, t) => { bags(w, 0); },
    },
    {
      say: 'Quick question. Where would you sit instead? Option A, the floor. Option B, a normal chair. Or option C, inside the airbag. Comment your answer.',
      quiz: { q: 'Where would you sit instead?', options: ['The floor', 'A normal chair', 'Inside the airbag'], answer: 'It is a made-up chair, so all three are fine. (C looks comfy.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 4, 30], look: [0, 14, 0], fov: 46, to: { pos: [-14, 4, 30], look: [0, 14, 0] } },
      update: (w, p, t) => { bags(w, .9 + .05 * Math.sin(t * 3)); },
    },
  ],
};

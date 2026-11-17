// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the square-wheeled car is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (a car thumping along on square wheels).

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.road = k.ground('#5C636E', 0);
  w.side = group();
  box(8, .3, 400, mat('#C9CED6'), [-11, .15, 0], w.side); box(8, .3, 400, mat('#C9CED6'), [11, .15, 0], w.side);
  for (let i = -20; i <= 20; i++) box(.4, .05, 3, mat('#F4F1EA', { glow: .2 }), [0, .03, i * 8], w.side).castShadow = false;
  for (let i = 0; i < 12; i++) { const h = 10 + (i * 5) % 8; box(9, h, 9, mat(['#F2B5A0', '#A8D5BA', '#F7E3A1', '#B9C6F0'][i % 4]), [i % 2 ? 20 : -20, h / 2, -80 + i * 14], w.side); }
  // the car with square wheels
  w.car = group([0, 0, 0]);
  w.body = group([0, 0, 0], w.car);
  box(4.6, 1.8, 8, mat('#E2453C', { metal: .3, rough: .35 }), [0, 2.4, 0], w.body);
  box(4, 1.6, 4, mat('#9FD3F5', { opacity: .7 }), [0, 4.1, .3], w.body);
  for (const x of [-1.4, 1.4]) ball(.4, mat('#FFF6C9', { glow: 1.5 }), [x, 2.6, -4.05], w.body);
  w.wheels = [];
  for (const [x, z] of [[-2.5, 2.8], [2.5, 2.8], [-2.5, -2.8], [2.5, -2.8]]) { const wh = box(.7, 2, 2, mat('#1B1D22'), [x, 1, z], w.car); w.wheels.push(wh); box(.72, .6, .6, mat('#C9CED6', { metal: .8 }), [0, 0, 0], wh); }
  // "parked" sign for the safety gag
  w.sign = group([6, 0, -10]);
  cyl(.12, .12, 5, mat('#5A6070'), [0, 2.5, 0], w.sign, 8);
  box(2.4, 2.4, .15, mat('#2F6FD6'), [0, 5.4, 0], w.sign); box(1.2, 1.4, .05, mat('#FFFFFF'), [0, 5.4, .1], w.sign);
  w.engineer = group([-7, 0, -2]);
  cyl(1.1, 1.3, 5, mat('#F2F2F2'), [0, 2.5, 0], w.engineer, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.engineer);
  for (const x of [-.4, .4]) ball(.13, mat('#111111'), [x, 6.3, 1], w.engineer);
  cyl(1.2, 1.2, .5, mat('#FFD21F'), [0, 7, 0], w.engineer, 16);
  return w;
}

// a square wheel of side 2 rolling: its centre rises and falls each quarter turn
function roll(w, dist, t) {
  const a = dist / 1;   // wheel angle in radians
  const q = ((a % (Math.PI / 2)) + Math.PI / 2) % (Math.PI / 2) - Math.PI / 4;
  const lift = Math.SQRT2 * Math.cos(q) - 1;   // 0 .. 0.414
  w.wheels.forEach(wh => { wh.rotation.x = -a; wh.position.y = 1 + lift; });
  w.body.position.y = lift; w.body.rotation.x = .04 * Math.sin(a * 4);
  w.car.position.z = -dist;
}
const ALL = ['road', 'side', 'car'];

export default {
  id: '056',
  style: '3d',
  voice: 'v3',
  case: 'THE SQUARE WHEELS',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS CAR HAS', 'SQUARE WHEELS.'],
  title: 'Engineers gave a car square wheels',
  description: 'Engineers promised it would never roll away. They kept their promise. (A made-up car.)',
  tags: ['engineering', 'funny', 'badideas', 'car', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the square-wheeled car is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This car has square wheels.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, -2], lightDist: 25,
      cam: { pos: [28, 3.5, -1], look: [0, 8, -2], fov: 46, to: { pos: [28, 3.5, -4], look: [0, 8, -5], fov: 46 } },
      shake: (t) => .12,
      update: (w, p, t) => { roll(w, t * 2.5, t); },
    },
    {
      say: 'Engineers said it would never roll away.',
      show: [...ALL, 'engineer'], sky: '#A7D8F5', lightAt: [-3, 3, -2], lightDist: 25,
      cam: { pos: [-14, 9, 16], look: [-3, 4, -2], fov: 46, to: { pos: [-12, 8, 13], look: [-3, 4, -2], fov: 44 } },
      update: (w, p, t) => { roll(w, 4 + t * .4, t); w.engineer.rotation.y = .4; },
    },
    {
      say: 'They were right.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, -6], lightDist: 25,
      cam: { pos: [24, 3, -6], look: [0, 3.5, -5.5], fov: 44, to: { pos: [22, 3, -6.5], look: [0, 3.5, -6], fov: 42 } },
      shake: (t) => .2,
      update: (w, p, t) => { roll(w, 5 + t * .6, t); },
    },
    {
      say: 'It goes nowhere. Very safely.',
      show: [...ALL, 'sign'], sky: '#FFE3C2', lightAt: [0, 2, -6], lightDist: 30,
      cam: { pos: [0, 30, 10], look: [0, 0, -8], fov: 48, to: { pos: [0, 28, 8], look: [0, 0, -8], fov: 46 } },
      update: (w, p, t) => { roll(w, 6 + .3 * Math.sin(t * 2), t); },
    },
    {
      say: 'Quick question. What shape should they try next? Triangles? Stars? Or circles? Comment your answer.',
      quiz: { q: 'What wheel shape should they try next?', options: ['Triangles', 'Stars', 'Circles'], answer: 'It is a made-up car. (Circles are a bold new idea.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 2, -4], lightDist: 30,
      cam: { pos: [12, 4, 16], look: [0, 9, -4], fov: 46, to: { pos: [-12, 4, 16], look: [0, 9, -4] } },
      update: (w, p, t) => { roll(w, 4 + t * 1.2, t); },
    },
  ],
};

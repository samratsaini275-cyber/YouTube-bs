// Narrative 5: "What Would Happen If…". A comedy sketch with one real fact in it: a square wheel really does roll
// smoothly on a road of evenly spaced inverted catenary bumps (see sources). The coffee, the driver and the
// rebuilt roads are made up.
// Hook rule: the premise as a question under 2 s, first frame already showing the square-wheeled car thumping along.

const A = 1.2;                         // half the side of a square wheel
const P = 2 * A * Math.asinh(1);       // length of one catenary bump that fits that wheel (about 2.12)
const H = 2.2;                         // axle height on the bump road (constant: that is the whole point)
const WB = 2.6;                        // front and rear wheels sit this far either side of the car's middle
const FLATX = 0, BUMPX = 200;          // the two sets: an ordinary flat road and the bump road

// flat road: the square pivots on a corner, so its centre rises and falls once per quarter turn
function flatWheel(d) {
  const q = d / (2 * A), n = Math.floor(q), f = (q - n) * Math.PI / 2;
  const y = A * Math.SQRT2 * Math.sin(3 * Math.PI / 4 - f);
  const dx = A + A * Math.SQRT2 * Math.cos(3 * Math.PI / 4 - f) - 2 * A * (q - n);
  return { y, dx, rot: -(n * Math.PI / 2 + f) };
}
// bump road: road height is H - A*cosh(u/A) inside each bump; the wheel tilts by atan(sinh(u/A)) and the axle stays put
function bumpU(x) { const n = Math.floor((x + P / 2) / P); return { n, u: x - n * P }; }
function roadY(x) { const { u } = bumpU(x); return H - A * Math.cosh(u / A); }
function bumpRot(x) { const { n, u } = bumpU(x); return -(n * Math.PI / 2 + Math.atan(Math.sinh(u / A))); }

function car(k, parent, color, round) {
  const { mat, box, cyl, ball, group } = k;
  const c = { body: group([0, 0, 0], parent), wheels: [] };
  box(7, 1.6, 3.6, mat(color, { metal: .3, rough: .35 }), [0, 1, 0], c.body);
  box(3.6, 1.6, 3.2, mat('#BFE6FF', { opacity: .3, rough: .05 }), [-.3, 2.6, 0], c.body).castShadow = false;
  box(3.8, .2, 3.4, mat(color, { metal: .3, rough: .35 }), [-.3, 3.5, 0], c.body);
  for (const z of [-1.2, 1.2]) box(.5, .3, .2, mat('#FFF6C9', { glow: 1.5 }), [3.5, 1.2, z], c.body);
  c.head = ball(.6, mat('#F2C9A0'), [-.6, 2.5, .6], c.body);
  for (const z of [.3, .9]) ball(.09, mat('#111111'), [-.05, 2.65, z], c.body);
  c.cup = group([.9, 2.1, .6], c.body);
  cyl(.25, .2, .55, mat('#FFFFFF'), [0, 0, 0], c.cup, 16);
  cyl(.22, .22, .05, mat('#5A3A1E'), [0, .26, 0], c.cup, 16);
  c.splat = cyl(.9, .9, .05, mat('#5A3A1E'), [.6, 3.37, .5], c.body, 20);
  for (const [x, z] of [[WB, 2.2], [-WB, 2.2], [WB, -2.2], [-WB, -2.2]]) {
    const g = group([0, 0, 0], parent);
    if (round) { cyl(A, A, .8, mat('#1E2430'), [0, 0, 0], g, 32).rotation.x = Math.PI / 2; box(.5, 2 * A * .8, .82, mat('#C9CED6', { metal: .7 }), [0, 0, 0], g); }
    else { box(2 * A, 2 * A, .8, mat('#1E2430'), [0, 0, 0], g); box(1.2, 1.2, .84, mat('#C9CED6', { metal: .7 }), [0, 0, 0], g).rotation.z = Math.PI / 4; }
    g.userData = { x, z }; c.wheels.push(g);
  }
  return c;
}

function setup(k) {
  const { mat, box, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  // flat road with lines that slide past (the car stays put and the road moves, so the camera can stay close)
  w.road = box(400, .1, 10, mat('#4A4F5A'), [FLATX, .05, 0], k.scene); w.road.castShadow = false;
  w.dashes = group([FLATX, 0, 0]);
  for (let i = 0; i < 30; i++) box(2.4, .02, .3, mat('#FFFFFF'), [-60 + i * 4, .12, 0], w.dashes).castShadow = false;
  for (const z of [-4.6, 4.6]) box(400, .02, .25, mat('#FFFFFF'), [0, .12, z], w.dashes).castShadow = false;
  // the bump road: 40 inverted catenary bumps, each one exactly the length of a wheel side
  const sh = new k.THREE.Shape(), n = 40, x0 = -n / 2 * P;
  sh.moveTo(x0 - P / 2, 0);
  for (let i = 0; i < n; i++) for (let j = 0; j <= 20; j++) { const u = -P / 2 + P * j / 20; sh.lineTo(x0 + i * P + u, H - A * Math.cosh(u / A)); }
  sh.lineTo(x0 + (n - 1) * P + P / 2, 0); sh.closePath();
  const geo = new k.THREE.ExtrudeGeometry(sh, { depth: 6.4, bevelEnabled: false }); geo.translate(0, 0, -3.2);
  w.bumps = group([BUMPX, 0, 0]);
  const r1 = k.mesh(geo, mat('#E2A33B', { rough: .8 }), [0, 0, 0], w.bumps); r1.castShadow = false;
  // a second lane of bumps for the ordinary round-wheeled car
  const r2 = k.mesh(geo, mat('#D08A2A', { rough: .8 }), [0, 0, 9], w.bumps); r2.castShadow = false;
  w.sq = group([0, 0, 0]); w.sqc = car(k, w.sq, '#E2453C', false);
  w.rd = group([0, 0, 0]); w.rdc = car(k, w.rd, '#2F6FD6', true);
  return w;
}

// d = distance driven. On the flat road the car is at FLATX; on the bump road at BUMPX, with the road sliding back.
function driveFlat(w, d, coffee = 0) {
  const c = w.sqc, ys = [];
  c.wheels.forEach(g => { const f = flatWheel(d + g.userData.x + 1.3); g.position.set(FLATX + g.userData.x + f.dx, f.y, g.userData.z); g.rotation.set(0, 0, f.rot); ys[g.userData.x > 0 ? 0 : 1] = f.y; });
  c.body.position.set(FLATX, (ys[0] + ys[1]) / 2, 0); c.body.rotation.z = Math.atan2(ys[0] - ys[1], 2 * WB);
  w.dashes.position.x = FLATX - (d % 4);
  const bob = Math.max(0, (ys[0] + ys[1]) / 2 - A * 1.1);
  c.head.position.y = 2.5 + bob * 1.4;
  cupState(c, coffee);
}
function cupState(c, s) { c.cup.position.y = 2.1 + s * 1.05; c.cup.rotation.x = s * Math.PI; c.splat.visible = s > .95; }
function driveBump(w, cobj, root, d, z = 0) {
  const s = d % P; w.bumps.position.x = BUMPX - s;
  if (cobj === w.sqc) {
    cobj.wheels.forEach(g => { const x = g.userData.x + s; g.position.set(BUMPX + g.userData.x, H, z + g.userData.z); g.rotation.set(0, 0, bumpRot(x)); });
    cobj.body.position.set(BUMPX, H, z); cobj.body.rotation.z = 0; cobj.head.position.y = 2.5;
  } else {
    // a round wheel on bumps: its axle rides up over every hump and drops into every dip
    const ys = [];
    cobj.wheels.forEach(g => { const x = g.userData.x + s; let y = 0; for (let j = -12; j <= 12; j++) { const dx = j / 12 * A; y = Math.max(y, roadY(x + dx) + Math.sqrt(A * A - dx * dx)); } g.position.set(BUMPX + g.userData.x, y, z + g.userData.z); g.rotation.set(0, 0, -d / A); ys[g.userData.x > 0 ? 0 : 1] = y; });
    cobj.body.position.set(BUMPX, (ys[0] + ys[1]) / 2, z); cobj.body.rotation.z = Math.atan2(ys[0] - ys[1], 2 * WB);
    cobj.head.position.y = 2.5 + Math.max(0, (ys[0] + ys[1]) / 2 - H) * 2;
  }
  cupState(cobj, 0);
}
const thump = (d) => { const q = ((d + WB + 1.3) / (2 * A)) % 1; return q < .12 ? .3 : 0; };
const FLAT = ['ground', 'road', 'dashes', 'sq'];
const BUMP = ['ground', 'bumps', 'sq'];
const SPEED = 7;

export default {
  id: '063',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SQUARE WHEELS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CARS HAD', 'SQUARE WHEELS?'],
  title: 'What would happen if cars had square wheels?',
  description: 'Every corner is a bump. Your coffee is on the ceiling. And then there is the one road where it actually works. (Comedy sketch; the bump road is real maths.)',
  tags: ['whatif', 'funny', 'squarewheels', 'car', 'physics', 'comedy', 'shorts'],
  sources: [
    'Wikipedia, "Square wheel": "A square wheel can roll smoothly if the ground consists of evenly shaped inverted catenaries of the right size and curvature." https://en.wikipedia.org/wiki/Square_wheel',
    'Peterson, Ivars (4 April 2004), "Riding on Square Wheels", Science News 165(14) (cited by the Wikipedia article above).',
    'Comedy sketch: the car, the driver, the coffee and the rebuilt roads are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cars had square wheels?',
      show: FLAT, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [12, 5, 19], look: [0, 6, 0], fov: 48, to: { pos: [10, 5, 16], look: [0, 6, 0], fov: 46 } },
      shake: (t) => thump(t * SPEED),
      update: (w, p, t) => driveFlat(w, t * SPEED),
    },
    {
      say: 'Every corner is a bump.',
      show: FLAT, sky: '#A7D8F5', lightAt: [2, 1, 2], lightDist: 12,
      cam: { pos: [10, 2.2, 15], look: [2, 3, 1], fov: 44, to: { pos: [9, 2.2, 13.5], look: [2, 3, 1], fov: 42 } },
      shake: (t) => thump(t * SPEED) * 1.6,
      update: (w, p, t) => driveFlat(w, 20 + t * SPEED),
    },
    {
      say: 'Your coffee ends up on the ceiling.',
      show: FLAT, sky: '#FFE3C2', lightAt: [0, 3, 0], lightDist: 12,
      cam: { pos: [2, 4.6, 12], look: [0, 4.3, 0], fov: 38, to: { pos: [1.6, 4.6, 10.5], look: [0, 4.4, 0], fov: 36 } },
      shake: (t) => thump(t * SPEED),
      update: (w, p, t, k) => driveFlat(w, 40 + t * SPEED, k.h.ease(Math.min(1, Math.max(0, (t - .4) / .35)))),
    },
    {
      say: 'Unless the road is bumpy too.',
      show: BUMP, sky: '#9ED2F3', lightAt: [BUMPX, 2, 0], lightDist: 20,
      cam: { pos: [BUMPX + 3, 4, 20], look: [BUMPX, 5.5, 0], fov: 46, to: { pos: [BUMPX + 1, 4, 17], look: [BUMPX, 5.5, 0], fov: 44 } },
      update: (w, p, t) => driveBump(w, w.sqc, w.sq, t * SPEED * .8),
    },
    {
      say: 'Perfect bumps, and it rides smooth. That part is real.',
      show: BUMP, sky: '#A7D8F5', lightAt: [BUMPX, 2, 2], lightDist: 12,
      cam: { pos: [BUMPX + 9, 2.4, 15], look: [BUMPX + 1, 3.4, 1], fov: 44, to: { pos: [BUMPX + 8, 2.4, 13.5], look: [BUMPX + 1, 3.4, 1], fov: 42 } },
      update: (w, p, t) => driveBump(w, w.sqc, w.sq, 30 + t * SPEED * .8),
    },
    {
      say: 'Now normal cars bounce instead.',
      show: [...BUMP, 'rd'], sky: '#FFE3C2', lightAt: [BUMPX, 2, 4], lightDist: 25,
      cam: { pos: [BUMPX + 9, 5, 30], look: [BUMPX, 6.5, 4.5], fov: 48, to: { pos: [BUMPX + 7, 5, 27], look: [BUMPX, 6.5, 4.5], fov: 46 } },
      shake: (t) => ((t * SPEED * .8) % P) / P < .15 ? .25 : 0,
      update: (w, p, t) => { const d = 60 + t * SPEED * .8; driveBump(w, w.sqc, w.sq, d); driveBump(w, w.rdc, w.rd, d, 9); },
    },
    {
      say: 'Square wheels, or round? Comment below.',
      quiz: { q: 'Which wheels would you pick?', options: ['Square, on a bump road', 'Round, on a flat road', 'No car. Walking.'], answer: 'Both work on the right road. Square wheels roll smoothly on evenly spaced inverted catenary bumps.' },
      show: FLAT, sky: '#274B73', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [14, 3, 20], look: [0, 9, 0], fov: 46, to: { pos: [-10, 3, 20], look: [0, 9, 0] } },
      update: (w, p, t) => driveFlat(w, 80 + t * SPEED),
    },
  ],
};

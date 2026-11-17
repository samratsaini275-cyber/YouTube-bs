// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his bowling night are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary next to a bowling ball far bigger than him.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
// Gary: same build as episodes 032/051/059, with his yellow hard hat
function gary(k, parent, s = 2) {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#FFC21F'), [.36, .5, 0], g); h.castShadow = false;
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); g.position.y = .03 * Math.abs(Math.sin(t * sp)); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#3A2F4A', 0);
  w.lane = group();
  box(80, .4, 7, mat('#D9A35E', { rough: .3 }), [30, .2, 0], w.lane);
  for (let i = 0; i < 16; i++) box(80, .01, .04, mat('#C08A48'), [30, .41, -3.3 + i * .44], w.lane).castShadow = false;
  for (const z of [-4.2, 4.2]) box(80, .3, 1.4, mat('#2A2A2A'), [30, .15, z], w.lane);
  for (let i = 0; i < 5; i++) { const a = box(.12, .02, .8, mat('#5A3A1E'), [8, .42, -1.6 + i * .8], w.lane); a.rotation.y = .6; a.castShadow = false; }
  box(30, 20, .5, mat('#2A1E3A'), [70, 10, -12], w.lane);
  // pins
  w.pins = [];
  const rows = [[0], [-1, 1], [-2, 0, 2], [-3, -1, 1, 3]];
  rows.forEach((row, r) => row.forEach(z => { const p = group([60 + r * 1.8, .4, z * .9], w.lane); cyl(.35, .45, 2.6, mat('#FFFFFF'), [0, 1.3, 0], p, 14); cyl(.37, .37, .25, mat('#E0161E'), [0, 2.1, 0], p, 14); ball(.38, mat('#FFFFFF'), [0, 2.75, 0], p); w.pins.push(p); }));
  // the bowling ball
  w.ball = group([0, 0, 0]);
  w.bmesh = ball(2.4, mat('#2F4FB8', { metal: .3, rough: .15 }), [0, 0, 0], w.ball);
  for (const [y, z] of [[.9, -.35], [.9, .35], [.3, 0]]) { const hole = cyl(.25, .25, .3, mat('#0A0A12'), [2.3 * Math.cos(.4), y, z], w.ball, 12); hole.rotation.z = Math.PI / 2; }
  w.g = gary(k, k.scene, 2.2);
  w.sweat = group();
  for (let i = 0; i < 3; i++) { const d = ball(.12, mat('#5BC0EB', { glow: .8 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  w.confetti = group();
  for (let i = 0; i < 30; i++) { const c = box(.25, .04, .15, mat(['#FFD21F', '#E2453C', '#22C55E', '#2F6FD6'][i % 4], { glow: .5 }), [0, 0, 0], w.confetti); c.userData = { a: i * 2.4, r: .5 + (i % 5) * .4, ph: (i * .13) % 1 }; c.castShadow = false; }
  w.clock = group([-2, 9, -6]);
  const cf = cyl(1.6, 1.6, .3, mat('#FFFFFF'), [0, 0, 0], w.clock, 28); cf.rotation.x = Math.PI / 2;
  w.hand = group([0, 0, .2], w.clock); box(.15, 1.3, .05, mat('#111111'), [0, .6, 0], w.hand);
  return w;
}

const LANE = ['ground', 'lane', 'g', 'ball'];

export default {
  id: '083',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES BOWLING',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT BOWLING.'],
  title: 'Gary the ant went bowling',
  description: 'The ball is slightly bigger than Gary. Everything after that goes about as well as you would expect. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'bowling', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his bowling night are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went bowling.',
      show: LANE, sky: '#2A1E3A', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [-1, 2.5, 15], look: [-.3, 4.6, 0], fov: 50, to: { pos: [-1, 2.5, 13.5], look: [-.3, 4.6, 0], fov: 48 } },
      update: (w, p, t) => { w.ball.position.set(1, 2.8, 0); w.bmesh.rotation.set(0, 0, 0); w.g.position.set(-2.6, .42, 1.2); w.g.rotation.y = -.3; scurry(w.g, t, 10); w.g.position.y += .42; },
    },
    {
      say: 'Step one: push the ball.',
      show: [...LANE, 'sweat'], sky: '#2A1E3A', lightAt: [0, 3, 0], lightDist: 12,
      cam: { pos: [-2.5, 2.2, 8], look: [-1, 2, 0], fov: 46, to: { pos: [-2.3, 2.2, 7], look: [-1, 2, 0], fov: 44 } },
      shake: () => .03,
      update: (w, p, t) => {
        w.ball.position.set(1, 2.8, 0); w.g.position.set(-1.9, .42, 0); w.g.rotation.y = 0; scurry(w.g, t, 40); w.g.position.y += .42;
        w.sweat.children.forEach(d => { const f = (t * 1.5 + d.userData.i / 3) % 1; d.position.set(-1.2 - f * .8, 2 + f * .8 - f * f * 2, (d.userData.i - 1) * .3); });
      },
    },
    {
      say: 'Twenty minutes later, it starts rolling.',
      show: [...LANE, 'clock'], sky: '#2A1E3A', lightAt: [4, 3, 0], lightDist: 18,
      cam: { pos: [-6, 6, 12], look: [4, 2.5, 0], fov: 48, to: { pos: [-4, 6, 11], look: [7, 2.5, 0], fov: 48 } },
      update: (w, p, t) => {
        const x = 1 + Math.max(0, t - .6) * 3; w.ball.position.set(x, 2.8, 0); w.bmesh.rotation.z = -(x - 1) / 2.4;
        w.g.position.set(x - 2.9, .42, 0); w.g.rotation.y = 0; scurry(w.g, t, 40); w.g.position.y += .42; w.hand.rotation.z = -t * 5;
      },
    },
    {
      say: 'It knocks down exactly one pin.',
      show: ['ground', 'lane', 'ball'], sky: '#2A1E3A', lightAt: [60, 3, 0], lightDist: 14,
      cam: { pos: [52, 5, 9], look: [61.5, 2.5, 0], fov: 46, to: { pos: [53, 5, 8], look: [61.5, 2.5, 0], fov: 44 } },
      update: (w, p, t) => {
        const x = Math.min(57.2, 52 + t * 4); w.ball.position.set(x, 2.8, 0); w.bmesh.rotation.z = -x / 2.4;
        const hit = Math.max(0, t - 1.3); w.pins.forEach((pn, i) => { pn.rotation.z = 0; pn.position.y = .4; });
        const wob = w.pins[0]; wob.rotation.z = hit > 0 ? -Math.min(Math.PI / 2, hit * hit * 3 + .15 * Math.sin(hit * 20) * (hit < .6 ? 1 : 0)) : 0;
      },
    },
    {
      say: 'Gary celebrates like it was a strike.',
      show: ['ground', 'lane', 'g', 'confetti'], sky: '#3A2F5A', lightAt: [0, 3, 0], lightDist: 12,
      cam: { pos: [2.5, 2.4, 7], look: [0, 1.8, 0], fov: 42, to: { pos: [2.2, 2.4, 6], look: [0, 1.8, 0], fov: 40 } },
      update: (w, p, t) => {
        w.g.position.set(0, .42 + 1.2 * Math.abs(Math.sin(t * 5)), 0); w.g.rotation.set(0, .6 + t * 3, 0); scurry(w.g, t, 50);
        w.confetti.children.forEach(c => { const u = c.userData, f = (t * .6 + u.ph) % 1; c.position.set(Math.cos(u.a) * u.r * (1 + f), 5 - f * 5, Math.sin(u.a) * u.r); c.rotation.set(f * 9, u.a, f * 5); });
      },
    },
    {
      say: 'Gary\'s next sport: golf, darts, or sumo? Comment below.',
      quiz: { q: 'What sport should Gary try next?', options: ['Golf', 'Darts', 'Sumo'], answer: 'Gary is made up, so any of them. He is leaning towards sumo.' },
      show: LANE, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [3, 2, 16], look: [-.5, 7, 0], fov: 48, to: { pos: [-5, 2, 16], look: [-.5, 7, 0] } },
      update: (w, p, t) => { w.ball.position.set(1, 2.8, 0); w.g.position.set(-2.6, .84, 1.2); w.g.rotation.set(0, -.3, 0); scurry(w.g, t, 10); w.g.position.y += .42; },
    },
  ],
};

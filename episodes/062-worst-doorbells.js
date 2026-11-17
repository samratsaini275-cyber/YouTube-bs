// Angle E (worst-three countdown). Narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: none of these doorbells exist.
// Hook rule: first line under 2 s, first frame already mid-joke (a doorbell button the size of the door, being pressed).

function door(k, parent, pos, color) {
  const g = k.group(pos, parent);
  k.box(8, 16, .6, k.mat(color), [0, 8, 0], g);
  k.box(8.8, 17, .3, k.mat('#6B4B2E'), [0, 8.5, -.35], g);
  k.ball(.4, k.mat('#E8C547', { metal: .8 }), [3, 8, .5], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B9A58A', 0);
  w.wall = box(120, 30, 1, mat('#E8DCC8'), [0, 15, -1], k.scene);
  // #3: the doorbell bigger than the door
  w.d3 = group([0, 0, 0]);
  door(k, w.d3, [-3, 0, 0], '#2F6FD6');
  w.big = group([7, 9, .6], w.d3);
  cyl(4.5, 4.5, .6, mat('#C9CED6', { metal: .7 }), [0, 0, 0], w.big, 40).rotation.x = Math.PI / 2;
  w.bigBtn = cyl(3.4, 3.4, 1, mat('#FFD21F', { glow: .4 }), [0, 0, .5], w.big, 40); w.bigBtn.rotation.x = Math.PI / 2;
  // #2: the doorbell that rings a different house
  w.d2 = group([60, 0, 0]);
  door(k, w.d2, [-8, 0, 0], '#22C55E'); door(k, w.d2, [12, 0, 0], '#E2453C');
  w.btn2 = ball(.45, mat('#FFFFFF', { glow: .6 }), [-3.2, 8, .7], w.d2);
  w.wave2 = group([12, 14, 1], w.d2);
  for (let i = 0; i < 3; i++) { const r = k.torus(1 + i * .8, .12, mat('#FF8A1F', { glow: 2 }), [0, 0, 0], w.wave2); r.rotation.x = 0; }
  // #1: the doorbell that needs a doorbell
  w.d1 = group([120, 0, 0]);
  door(k, w.d1, [-4, 0, 0], '#7A4FD6');
  w.outer = group([4, 0, 2], w.d1);
  box(4, 7, 4, mat('#9AA3AE'), [0, 3.5, 0], w.outer);
  box(3, 4, .2, mat('#5A6070'), [0, 3.8, 2.05], w.outer);
  w.btnA = ball(.35, mat('#FFFFFF', { glow: .6 }), [1.9, 4.4, 2.2], w.outer);
  w.tiny = box(1, 1.4, .2, mat('#C9CED6'), [0, 3.8, 2.2], w.outer);
  w.btnB = ball(.22, mat('#FFD21F', { glow: .8 }), [0, 3.8, 2.35], w.outer);
  // the visitor
  w.guy = group([2, 0, 7]);
  cyl(1, 1.2, 5, mat('#14B8A6'), [0, 2.5, 0], w.guy, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.guy);
  for (const x of [-.4, .4]) ball(.13, mat('#111111'), [x, 6.3, -1], w.guy);
  w.arm = group([.9, 5, 0], w.guy); const a = cyl(.28, .28, 3, mat('#14B8A6'), [0, 0, -1.5], w.arm, 10); a.rotation.x = Math.PI / 2;
  // big numbers for the countdown, built from blocks
  w.num = group([0, 0, 3]);
  return w;
}

function press(btn, t, axis = 'z', depth = .4, period = .9) { const p = (t % period) / period; btn.position[axis] = (btn.userData.base ??= btn.position[axis]) - depth * Math.max(0, Math.sin(p * Math.PI)); }
function rings(g, t, on) { g.visible = on; g.children.forEach((r, i) => { const p = (t * 1.2 + i / 3) % 1; r.scale.setScalar(1 + p * 2.5); }); }
function guy(w, x, z, reach = 0) { w.guy.position.set(x, 0, z); w.arm.rotation.x = -reach; }
const BASE = ['ground', 'wall'];

export default {
  id: '062',
  style: '3d',
  voice: 'v3',
  case: 'THREE WORST DOORBELLS',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THREE WORST', 'DOORBELLS EVER.'],
  title: 'The three worst doorbells ever built',
  description: 'Number one needs its own doorbell. (Three made-up doorbells. Do not install any of them.)',
  tags: ['funny', 'badideas', 'top3', 'doorbell', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: all three doorbells are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Three worst doorbells ever.',
      show: [...BASE, 'd3', 'guy'], sky: '#E8DCC8', lightAt: [3, 8, 2], lightDist: 25,
      cam: { pos: [14, 6, 28], look: [3, 11, 0], fov: 48, to: { pos: [12, 6, 24], look: [3, 11, 0], fov: 46 } },
      update: (w, p, t) => { guy(w, 9, 6, 1); press(w.bigBtn, t, 'z', .5, 1.1); },
    },
    {
      say: 'Number three: bigger than the door.',
      show: [...BASE, 'd3', 'guy'], sky: '#E8DCC8', lightAt: [3, 8, 2], lightDist: 25,
      cam: { pos: [-6, 9, 22], look: [4, 9, 0], fov: 46, to: { pos: [-4, 9, 18], look: [4, 9, 0], fov: 44 } },
      shake: (t) => (t % 1.1) < .3 ? .25 : 0,
      update: (w, p, t) => { guy(w, 9, 6, 1); press(w.bigBtn, t, 'z', .5, 1.1); },
    },
    {
      say: 'Number two: it rings next door.',
      show: [...BASE, 'd2'], sky: '#DCE6EE', lightAt: [62, 8, 2], lightDist: 30,
      cam: { pos: [62, 10, 34], look: [62, 10, 0], fov: 48, to: { pos: [62, 10, 30], look: [62, 10, 0], fov: 46 } },
      update: (w, p, t) => { press(w.btn2, t, 'z', .2, 1); rings(w.wave2, t, true); },
    },
    {
      say: 'Number one: you need to ring the doorbell',
      show: [...BASE, 'd1', 'guy'], sky: '#E8DCC8', lightAt: [122, 5, 3], lightDist: 20,
      cam: { pos: [117, 8, 18], look: [123, 5, 2], fov: 46, to: { pos: [118, 7.5, 15], look: [123.5, 5, 2.5], fov: 44 } },
      update: (w, p, t) => { guy(w, 129, 6, 1); w.guy.rotation.y = .6; press(w.btnA, t, 'z', .15, .9); },
    },
    {
      say: 'to unlock the doorbell.',
      show: [...BASE, 'd1', 'guy'], sky: '#FFE3C2', lightAt: [124, 4, 4], lightDist: 12,
      cam: { pos: [121, 6, 12], look: [124, 4, 3.5], fov: 42, to: { pos: [121.5, 5.6, 10.5], look: [124, 4, 3.5], fov: 40 } },
      update: (w, p, t, k) => { guy(w, 129, 6, 1); w.guy.rotation.y = .6; w.tiny.position.z = 2.2 + k.h.win(t, .3, 1) * .3; press(w.btnB, t, 'z', .1, .7); },
    },
    {
      say: 'Worst one: three, two, or one? Comment below.',
      quiz: { q: 'Which doorbell is the worst?', options: ['#3 Bigger than the door', '#2 Rings next door', '#1 Needs a doorbell'], answer: 'All three are made up, so they are all equally terrible.' },
      show: [...BASE, 'd3', 'guy'], sky: '#274B73', lightAt: [3, 8, 2], lightDist: 25,
      cam: { pos: [16, 4, 26], look: [3, 14, 0], fov: 46, to: { pos: [-8, 4, 26], look: [3, 14, 0] } },
      update: (w, p, t) => { guy(w, 9, 6, 1); press(w.bigBtn, t, 'z', .5, 1.1); },
    },
  ],
};

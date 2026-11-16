// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the one-step escalator is fictional.

function person(k, parent, pos, color) {
  const g = k.group(pos, parent);
  k.cyl(.8, 1, 4.4, k.mat(color), [0, 2.2, 0], g, 16); k.ball(.9, k.mat('#F2C9A0'), [0, 5.3, 0], g);
  for (const x of [-.3, .3]) k.ball(.11, k.mat('#111111'), [x, 5.45, .8], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#CBD2DA', 0);
  w.mall = group();
  box(120, 30, 1, mat('#EEF1F5'), [0, 15, -14], w.mall);
  box(40, 1.8, 26, mat('#B8C0CA'), [11, .9, -1], w.mall);   // the upper level: exactly one step up
  box(40, .1, .4, mat('#FFD21F', { glow: .3 }), [11, 1.82, 11.8], w.mall).castShadow = false;
  for (let i = 0; i < 8; i++) box(4, 8, .3, mat(['#FF6B6B', '#4ECDC4', '#FFD93D'][i % 3], { glow: .2 }), [-40 + i * 12, 20, -13.6], w.mall).castShadow = false;
  // the escalator: a full machine for a one-step rise, running along x into the upper level
  w.esc = group([-14, 0, 0]);
  const slope = Math.atan(1.5 / 10);
  const bed = box(10.2, .5, 4.4, mat('#5A6270'), [0, .9, 0], w.esc); bed.rotation.z = slope;
  for (const z of [-2.6, 2.6]) {
    const side = box(10.6, 3.2, .4, mat('#2A2F38'), [0, 2.6, z], w.esc); side.rotation.z = slope;
    const rail = box(11, .4, .7, mat('#111111'), [0, 4.3, z], w.esc); rail.rotation.z = slope;
  }
  w.steps = [];
  for (let i = 0; i < 6; i++) { const st = box(1.6, .3, 4.2, mat('#C0C7D1', { metal: .6 }), [0, 0, 0], w.esc); w.steps.push(st); }
  w.stop = ball(.5, mat('#E0161E', { glow: .8 }), [-4.6, 3.8, 2.9], w.esc);
  // people
  w.rider = person(k, k.scene, [-18, .4, 0], '#7A4FD6'); w.rider.rotation.y = Math.PI / 2;
  w.walker = person(k, k.scene, [-16, 0, 8], '#3BA55C'); w.walker.rotation.y = Math.PI / 2;
  w.queue = group();
  for (let i = 0; i < 6; i++) { const q = person(k, w.queue, [-22 - i * 2.6, 0, 0], ['#E2453C', '#2F6FD6', '#F59E0B', '#14B8A6', '#EC4899', '#64748B'][i]); q.rotation.y = Math.PI / 2; }
  return w;
}

function belt(w, t, speed = .15) {
  w.steps.forEach((st, i) => { const x = ((i * 1.7 + t * speed * 4) % 10.2) - 5.1; st.position.set(x, .3 + 1.5 * (x + 5) / 10 + .9, 0); });
}
function ride(w, x) { w.rider.position.set(x, 1.4 + 1.5 * (x + 19) / 10, 0); }
const ALL = ['floor', 'mall', 'esc', 'rider'];

export default {
  id: '039',
  style: '3d',
  voice: 'v3',
  case: 'THE ONE-STEP ESCALATOR',
  year: 'ENGINEERING NONSENSE',
  hook: ['AN ESCALATOR', 'FOR ONE STEP.'],
  title: 'Engineers built an escalator that goes up one step',
  description: 'It has handrails, an emergency stop and a four-minute ride. It also has a rival. (A made-up escalator.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'escalator', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the one-step escalator, its four-minute ride and the queue are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This escalator goes up exactly one step.',
      show: ALL, sky: '#EEF1F5', lightAt: [-12, 2, 0], lightDist: 30,
      cam: { pos: [-30, 12, 18], look: [-15, 3, 0], fov: 46, to: { pos: [-27, 10, 15], look: [-15.5, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { belt(w, t); ride(w, -18 + t * .05); w.walker.visible = false; },
    },
    {
      say: 'It has handrails. An emergency stop button. And a safety announcement.',
      show: ALL, sky: '#E4EBF3', lightAt: [-17, 3, 2], lightDist: 20,
      cam: { pos: [-24, 7, 14], look: [-17, 3.5, 1.5], fov: 42, to: { pos: [-22, 6, 11], look: [-18, 3.8, 2.6], fov: 38 } },
      update: (w, p, t) => { belt(w, t); ride(w, -17.6); w.walker.visible = false; w.stop.material.emissiveIntensity = .5 + Math.abs(Math.sin(t * 5)); },
    },
    {
      say: 'The ride takes four minutes.',
      show: ALL, sky: '#D9E2EC', lightAt: [-15, 2, 0], lightDist: 20,
      cam: { pos: [-22, 9, 14], look: [-16.5, 4, 0], fov: 44, to: { pos: [-21, 8.5, 12], look: [-16.3, 4, 0], fov: 42 } },
      update: (w, p, t) => { belt(w, t); ride(w, -17 + t * .12); w.walker.visible = false; },
    },
    {
      say: 'Right next to it, there is a normal step. You just walk up.',
      show: [...ALL, 'walker'], sky: '#EEF1F5', lightAt: [-10, 2, 6], lightDist: 25,
      cam: { pos: [-2, 7, 28], look: [-11, 2, 4], fov: 44, to: { pos: [-3, 6, 24], look: [-11, 2, 4], fov: 42 } },
      update: (w, p, t) => { belt(w, t); ride(w, -16.4); w.walker.visible = true; const x = -16 + Math.min(t, 3.4) * 3; w.walker.position.set(x, x > -9 ? 1.8 : 0, 8); },
    },
    {
      say: 'Nobody uses the step.',
      show: [...ALL, 'queue'], sky: '#EEF1F5', lightAt: [-24, 2, 0], lightDist: 30,
      cam: { pos: [-14, 13, 32], look: [-24, 2, 0], fov: 46, to: { pos: [-16, 11, 28], look: [-24, 2, 0], fov: 44 } },
      update: (w, p, t) => { belt(w, t); ride(w, -16); w.walker.visible = false; w.queue.children.forEach((q, i) => { q.position.y = .1 * Math.abs(Math.sin(t * 3 + i)); }); },
    },
    {
      say: 'Quick question. Which one do you take? Option A, the escalator. Option B, the step. Or option C, wait for the elevator version. Comment your answer.',
      quiz: { q: 'Which one do you take?', options: ['The escalator', 'The step', 'Wait for the elevator version'], answer: 'Made-up escalator, so no wrong answer. (B is quicker.)' },
      show: [...ALL, 'queue'], sky: '#274B73', lightAt: [-16, 2, 0], lightDist: 30,
      cam: { pos: [-2, 8, 36], look: [-16, 12, 0], fov: 46, to: { pos: [-30, 8, 36], look: [-16, 12, 0] } },
      update: (w, p, t) => { belt(w, t); ride(w, -15.5); w.walker.visible = false; },
    },
  ],
};

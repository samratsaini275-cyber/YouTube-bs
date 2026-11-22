// Narrative 11: "What Would Happen If… (season 3, with Gary)". Flying + body change (080 everyone could fly 1.1K, humans had tails 1.1K).
// Hook: the premise as a question under 2 s; first frame shows a person with big white wings flapping over a park.

function person(k, parent, shirt) {
  const { mat, cyl, ball, box, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  p.wings = [-1, 1].map(s => { const g = group([s * .5, 2.2, -.6], p.root); const f = mat('#FFFFFF', { rough: .6 });
    for (let i = 0; i < 4; i++) { const b = ball(.55, f, [s * (.7 + i * .55), .4 - i * .2, 0], g); b.scale.set(1.3, .45 - i * .05, .2); } return g; });
  return p;
}
const flap = (p, t, sp = 9, a = .7, base = 0) => p.wings.forEach((g, i) => g.rotation.z = (i ? -1 : 1) * (base + a * Math.sin(t * sp)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.trees = group(); for (let i = 0; i < 6; i++) { cyl(.4, .5, 3, mat('#6B4B2E'), [-15 + i * 6, 1.5, -8], w.trees, 8); ball(2, mat('#2E8B4A'), [-15 + i * 6, 4.2, -8], w.trees); }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.road = group(); box(400, .04, 8, mat('#555555', { rough: 1 }), [0, .02, 0], w.road);
  w.cars = group(); const cols = ['#E2453C', '#3B82F6', '#22C55E', '#F97316', '#8B5CF6', '#EC4899'];
  for (let i = 0; i < 8; i++) { const c = group([-14 + i * 4, 0, (i % 2) * 3 - 1.5], w.cars); box(3.4, 1, 1.8, mat(cols[i % 6], { rough: .3 }), [0, .9, 0], c); box(1.8, .8, 1.6, mat('#9FD3EE', { rough: .1 }), [-.2, 1.7, 0], c); for (const x of [-1.1, 1.1]) for (const z of [-.9, .9]) { const wh = cyl(.4, .4, .3, mat('#222222'), [x, .4, z], c, 12); wh.rotation.x = Math.PI / 2; } }
  w.wall = group(); box(14, 8, .6, mat('#F2D9B8'), [0, 4, 0], w.wall); w.door = box(2.4, 4.4, .65, mat('#3A2A1A'), [0, 2.2, 0], w.wall);
  w.cloud = group(); for (let i = 0; i < 6; i++) ball(1.8, mat('#9AA7B4'), [-4 + i * 1.6, 0, (i % 2) * .8], w.cloud);
  w.rain = group(); for (let i = 0; i < 40; i++) { const d = box(.05, .5, .05, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.rain); d.userData.i = i; d.castShadow = false; }
  w.drips = group(); for (let i = 0; i < 6; i++) { const d = ball(.1, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.drips); d.userData.i = i; d.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry, mouth = 1) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.mouth.scale.y = mouth; w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '179',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HUMAN WINGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD WINGS?'],
  title: 'What would happen if humans had wings?',
  description: 'The school run goes straight over the traffic. Doorways are a squeeze. And rainy days mean soggy feathers. (A comedy what-if.)',
  tags: ['whatif', 'funny', 'wings', 'flying', 'humans', 'shorts'],
  sources: [
    'Comedy what-if; quiz answer makes no factual claim beyond "humans cannot fly".',
  ],
  setup,
  scenes: [
    {
      say: 'What if humans had wings?',
      show: ['ground', 'trees', 'pp'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 16,
      cam: { pos: [2, 4.5, 12], look: [0, 7.5, 0], fov: 48, to: { pos: [1.8, 4.5, 11.2], look: [0, 7.5, 0], fov: 46 } },
      update: (w, p, t) => { pose(w, 0, 3.5 + .2 * Math.sin(t * 4.5), 0, .25, 2); flap(w.p, t); },
    },
    {
      say: 'The school run? Straight over the traffic.',
      show: ['ground', 'road', 'cars', 'pp'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [5, 7, 15], look: [-1, 8.4, 0], fov: 52, to: { pos: [5, 7, 14], look: [.5, 8.4, 0], fov: 50 } },
      update: (w, p, t) => { pose(w, -3 + t * 2, 6.5 + .3 * Math.sin(t * 4.5), 0, Math.PI / 2 - .5, 1); w.pp.rotation.z = -.25; flap(w.p, t, 10); },
    },
    {
      say: 'Doorways? Wings first. Then you.',
      show: ['ground', 'wall', 'pp'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [3, 4, 10], look: [0, 3.6, 0], fov: 50, to: { pos: [2.8, 4, 9.2], look: [0, 3.6, 0], fov: 48 } },
      shake: (t) => .03,
      update: (w, p, t) => {
        w.wall.position.set(0, 0, -.2); pose(w, 0, 0, .5 + .1 * Math.sin(t * 6), Math.PI, 1);
        flap(w.p, t, 14, .15, .1); w.pp.position.x = .1 * Math.sin(t * 7); w.p.head.rotation.y = Math.PI * .85;
      },
    },
    {
      say: 'But rainy days? Very soggy feathers.',
      show: ['ground', 'trees', 'pp', 'cloud', 'rain', 'drips'], sky: '#8A9AAA', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [2, 3.6, 10], look: [0, 3.5, 0], fov: 50, to: { pos: [1.8, 3.6, 9.2], look: [0, 3.5, 0], fov: 48 } },
      update: (w, p, t) => {
        w.wall.position.set(0, -50, 0); pose(w, 0, 0, 0, .2, .6); w.p.head.rotation.z = .12; flap(w.p, t, 2, .05, -.7);
        w.cloud.position.set(-.5, 9.5, 0); w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 40) % 1; d.position.set(-4 + (i * 1.7) % 8, 9 - q * 9, -2 + (i * .7) % 4); });
        w.drips.children.forEach(d => { const i = d.userData.i, q = (t * 1.2 + i / 6) % 1; d.position.set((i < 3 ? -1 : 1) * (1.2 + (i % 3) * .5), 1.6 - q * 1.5, -.6); });
      },
    },
    {
      say: 'Human wings: cool, weird, or a must-have? Comment below.',
      quiz: { q: 'Would you want wings?', options: ['Cool', 'Weird', 'Must-have'], answer: 'Humans cannot fly. Hang gliders are the closest thing.' },
      show: ['ground', 'trees', 'pp'], sky: '#274B73', lightAt: [0, 5, 0], lightDist: 16,
      cam: { pos: [5, 4.5, 9], look: [0, 6.2, 0], fov: 46, to: { pos: [-5, 4.5, 9], look: [0, 6.2, 0] } },
      update: (w, p, t) => { pose(w, 0, 3 + .3 * Math.sin(t * 4), 0, 0, 1.6); flap(w.p, t, 6, .5); },
    },
  ],
};

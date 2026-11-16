// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the umbrella and its flight are fictional.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.street = k.ground('#7E8794', 0);
  w.town = group();
  box(6, .4, 400, mat('#C9CED6'), [-9, .2, 0], w.town); box(6, .4, 400, mat('#C9CED6'), [9, .2, 0], w.town);
  for (let i = 0; i < 10; i++) { const h = 14 + (i * 7) % 12; box(10, h, 10, mat(['#E2B07A', '#C97B63', '#8FB3D9', '#B9A2D9'][i % 4]), [i % 2 ? 18 : -18, h / 2, -60 + i * 14], w.town); }
  // person + umbrella
  w.guy = group([0, 0, 0]);
  cyl(1, 1.2, 5, mat('#2F6FD6'), [0, 2.5, 0], w.guy, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 6.3, 1], w.guy);
  w.mouth = ball(.25, mat('#111111'), [0, 5.8, 1.05], w.guy);
  w.arm = cyl(.25, .25, 3, mat('#2F6FD6'), [.9, 6.2, 0], w.guy, 8);
  w.umb = group([.9, 7.5, 0], w.guy);
  cyl(.12, .12, 7, mat('#333333', { metal: .6 }), [0, 3, 0], w.umb, 8);
  const canopy = cone(5, 2, mat('#E0161E', { rough: .4, double: true }), [0, 7.2, 0], w.umb, 8); canopy.castShadow = true;
  // wind streaks
  w.wind = group([0, 0, 0]);
  for (let i = 0; i < 16; i++) { const s = box(8, .2, .2, mat('#E6F4FF', { glow: .8, opacity: .8 }), [0, 0, 0], w.wind); s.castShadow = false; s.userData = { y: 2 + (i % 8) * 2.2, z: ((i * 7) % 9) - 4, ph: i * .37 }; }
  // clouds for the flight
  w.clouds = group([0, 60, 0]);
  for (let i = 0; i < 12; i++) { const c = ball(4 + (i % 3) * 1.5, mat('#FFFFFF', { rough: 1 }), [((i * 37) % 60) - 30, ((i * 13) % 10) - 5, ((i * 23) % 40) - 30], w.clouds); c.castShadow = false; }
  return w;
}

function wind(w, t, strong = 1) { w.wind.children.forEach(s => { const d = s.userData; s.position.set(((t * 40 * strong + d.ph * 30) % 60) - 30, d.y, d.z); }); }
const ALL = ['street', 'town', 'guy'];

export default {
  id: '042',
  style: '3d',
  voice: 'v3',
  case: 'THE UNFLIPPABLE UMBRELLA',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS UMBRELLA', 'NEVER FLIPS.'],
  title: 'Engineers built an umbrella that can never flip inside out',
  description: 'Titanium ribs. Wind-tunnel tested. It did exactly what it promised. That was the problem. (A made-up umbrella.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'umbrella', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the umbrella, its tests and its flight are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers built an umbrella that can never flip inside out.',
      show: ALL, sky: '#9FB3C8', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [10, 9, 26], look: [0, 9, 0], fov: 44, to: { pos: [6, 8, 19], look: [0, 10, 0], fov: 42 } },
      update: (w, p, t) => { w.guy.position.set(0, 0, 0); w.guy.rotation.z = 0; w.umb.rotation.z = 0; w.wind.visible = w.clouds.visible = false; },
    },
    {
      say: 'Steel ribs. A reinforced top. Tested in a wind tunnel.',
      show: [...ALL, 'wind'], sky: '#8EA6BE', lightAt: [0, 12, 0], lightDist: 25,
      cam: { pos: [-6, 18, 14], look: [1, 14, 0], fov: 42, to: { pos: [-4, 17, 11], look: [1, 14.5, 0], fov: 40 } },
      update: (w, p, t) => { w.guy.position.set(0, 0, 0); w.umb.rotation.z = .05 * Math.sin(t * 8); wind(w, t); },
    },
    {
      say: 'Its first windy day. It did not flip.',
      show: [...ALL, 'wind'], sky: '#6F8399', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 8, 26], look: [0, 8, 0], fov: 44, to: { pos: [12, 8, 22], look: [0, 9, 0], fov: 44 } },
      shake: (t) => .25,
      update: (w, p, t) => { w.guy.position.set(0, 0, 0); w.guy.rotation.z = -.08 * Math.min(1, t); w.umb.rotation.z = -.25; wind(w, t, 1.6); },
    },
    {
      say: 'Its owner did. They both just took off.',
      show: [...ALL, 'wind'], sky: '#6F8399', lightAt: [0, 10, 0], lightDist: 40,
      cam: { pos: [16, 6, 30], look: [0, 10, 0], fov: 46, to: { pos: [16, 6, 30], look: [0, 30, 0], fov: 50 } },
      update: (w, p, t) => { const up = t * t * 2.2; w.guy.position.set(-t * 1.5, up, 0); w.guy.rotation.z = -.2 + .1 * Math.sin(t * 3); w.mouth.scale.setScalar(1.8); w.umb.rotation.z = -.15; wind(w, t, 1.6); },
    },
    {
      say: 'He has a great view now.',
      show: ['guy', 'clouds'], sky: '#7EC3F2', lightAt: [0, 60, 0], lightDist: 40,
      cam: { pos: [20, 68, 34], look: [0, 65, 0], fov: 44, to: { pos: [14, 66, 28], look: [0, 65, 0], fov: 42 } },
      update: (w, p, t) => { w.guy.position.set(0, 58 + .6 * Math.sin(t), 0); w.guy.rotation.z = .1 * Math.sin(t * .8); w.mouth.scale.setScalar(1); w.umb.rotation.z = 0; w.clouds.position.x = -t * 2; },
    },
    {
      say: 'Quick question. What should come with the next model? Option A, a parachute. Option B, a safety belt. Or option C, flying lessons. Comment your answer.',
      quiz: { q: 'What should come with the next model?', options: ['A parachute', 'A safety belt', 'Flying lessons'], answer: 'It is a made-up umbrella, so pick any. (A seems wise.)' },
      show: ['guy', 'clouds'], sky: '#274B73', lightAt: [0, 60, 0], lightDist: 40,
      cam: { pos: [16, 52, 26], look: [0, 70, 0], fov: 46, to: { pos: [-16, 52, 26], look: [0, 70, 0] } },
      update: (w, p, t) => { w.guy.position.set(0, 58 + .6 * Math.sin(t), 0); w.umb.rotation.z = 0; },
    },
  ],
};

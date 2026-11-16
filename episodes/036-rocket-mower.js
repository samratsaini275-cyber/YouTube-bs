// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the rocket mower and Kevin are fictional.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.lawn = k.ground('#5DBB4F', 0);
  w.stripes = group();
  for (let i = -10; i <= 10; i++) box(6, .02, 400, mat(i % 2 ? '#56B048' : '#66C658'), [i * 6, .01, 0], w.stripes).castShadow = false;
  w.fence = group([0, 0, -40]);
  for (let i = -12; i <= 12; i++) box(1.4, 6, .4, mat('#F4F1EA'), [i * 3, 3, 0], w.fence);
  box(80, .6, .3, mat('#F4F1EA'), [0, 4.5, .3], w.fence);
  // Kevin, the one tall blade of grass
  w.kevin = group([0, 0, 0]);
  const blade = cone(.35, 6, mat('#2E8B2E'), [0, 3, 0], w.kevin, 6); blade.scale.z = .25;
  w.kevinFace = group([0, 3.4, .12], w.kevin);
  for (const x of [-.12, .12]) ball(.07, mat('#111111'), [x, 0, 0], w.kevinFace);
  // the mower with a rocket
  w.mower = group([-8, 0, 0]);
  box(6, 2, 5, mat('#E2453C', { metal: .3, rough: .35 }), [0, 1.6, 0], w.mower);
  for (const [x, z] of [[-2.2, 2.6], [2.2, 2.6], [-2.2, -2.6], [2.2, -2.6]]) { const wh = cyl(.8, .8, .5, mat('#1B1D22'), [x, .8, z], w.mower, 16); wh.rotation.x = Math.PI / 2; }
  const handle = cyl(.15, .15, 6, mat('#C9CED6', { metal: .6 }), [-4.5, 4, 0], w.mower, 8); handle.rotation.z = .9;
  const tube = cyl(1.3, 1.3, 7, mat('#F2F2F2', { metal: .4 }), [0, 6, 0], w.mower, 24);
  cone(1.3, 2.4, mat('#E2453C'), [0, 10.7, 0], w.mower, 24);
  for (let i = 0; i < 3; i++) { const f = box(.2, 2, 1.6, mat('#E2453C'), [0, 3.4, 0], w.mower); f.rotation.y = i * Math.PI * 2 / 3; f.position.x = Math.cos(i * 2.094) * 1.4; f.position.z = -Math.sin(i * 2.094) * 1.4; }
  w.flame = group([0, 2.2, 0], w.mower);
  const fl = cone(.9, 3, mat('#FF8A1F', { glow: 3, opacity: .9 }), [0, -1.5, 0], w.flame, 16); fl.rotation.x = Math.PI; fl.castShadow = false;
  const fl2 = cone(.5, 2, mat('#FFE45C', { glow: 3 }), [0, -1, 0], w.flame, 16); fl2.rotation.x = Math.PI; fl2.castShadow = false;
  w.lights = [];
  for (let i = 0; i < 3; i++) { const l = ball(.35, mat('#555555'), [3.05, 2, -1 + i], w.mower); w.lights.push(l); }
  // smoke puffs
  w.smoke = group([-8, 0, 0]);
  for (let i = 0; i < 14; i++) { const s = ball(1.4 + (i % 3) * .5, mat('#E9E9E9', { opacity: .8 }), [0, 0, 0], w.smoke); s.castShadow = false; s.userData.a = i / 14 * Math.PI * 2; }
  return w;
}

function kevin(w, t, wind = .08) { w.kevin.rotation.z = wind * Math.sin(t * 2.2); }
function flame(w, size) { w.flame.visible = size > 0; w.flame.scale.set(size, size * (1 + .15 * Math.random()), size); }
function lights(w, n) { w.lights.forEach((l, i) => { const on = i < n; l.material.color.set(on ? '#FF2D2D' : '#555555'); l.material.emissive.set(on ? '#FF2D2D' : '#000000'); l.material.emissiveIntensity = on ? 2 : 0; }); }
function smoke(w, a) { w.smoke.visible = a > 0; w.smoke.children.forEach(s => { const r = 3 + a * 8; s.position.set(Math.cos(s.userData.a) * r, .8 + a * 1.5, Math.sin(s.userData.a) * r); }); }
const ALL = ['lawn', 'stripes', 'fence', 'kevin', 'mower', 'smoke'];

export default {
  id: '036',
  style: '3d',
  voice: 'v3',
  case: 'THE ROCKET MOWER',
  year: 'ENGINEERING NONSENSE',
  hook: ['ROCKET MOWER.', 'ONE BLADE.'],
  title: 'Engineers built a rocket lawnmower to cut one blade of grass',
  description: 'One blade of grass. One rocket. Months of planning. It did not go to plan. (A made-up mower. Kevin is also made up.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'rocket', 'lawnmower', 'shorts'],
  sources: [
    'Comedy sketch: the rocket mower, the countdown and Kevin the blade of grass are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This lawnmower has a rocket engine. Its job: cut one blade of grass.',
      show: ALL, sky: '#8EC9F0', lightAt: [-4, 2, 0], lightDist: 30,
      cam: { pos: [10, 8, 26], look: [-4, 5, 0], fov: 44, to: { pos: [6, 5, 16], look: [-2, 4, 0], fov: 42 } },
      update: (w, p, t) => { w.mower.position.y = 0; flame(w, 0); lights(w, 0); smoke(w, 0); kevin(w, t); },
    },
    {
      say: 'Engineers checked the wind. They checked the angle. Then they began the countdown.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [3, 3, 7], look: [0, 3.4, 0], fov: 40, to: { pos: [2, 3.2, 5], look: [0, 3.4, 0], fov: 38 } },
      update: (w, p, t) => { w.mower.position.y = 0; flame(w, 0); lights(w, 0); smoke(w, 0); kevin(w, t, .2); },
    },
    {
      say: 'Three. Two. One.',
      show: ALL, sky: '#FFD9A8', lightAt: [-8, 2, 0], lightDist: 25,
      cam: { pos: [8, 6, 26], look: [-7, 5, 0], fov: 44, to: { pos: [6, 5, 22], look: [-7, 5, 0], fov: 42 } },
      shake: (t) => t > 1.6 ? .4 : 0,
      update: (w, p, t) => { w.mower.position.y = 0; lights(w, Math.min(3, Math.floor(t / .6) + 1)); flame(w, t > 1.6 ? .6 : 0); smoke(w, t > 1.6 ? (t - 1.6) * .3 : 0); kevin(w, t); },
    },
    {
      say: 'The mower left the planet.',
      show: ALL, sky: '#7FB8E8', lightAt: [-8, 10, 0], lightDist: 60,
      cam: { pos: [14, 3, 34], look: [-8, 6, 0], fov: 46, to: { pos: [14, 3, 34], look: [-8, 40, 0], fov: 50 } },
      shake: (t) => .5,
      update: (w, p, t) => { w.mower.position.y = t * t * 9; flame(w, 1.6); lights(w, 3); smoke(w, .4 + t * .3); kevin(w, t); },
    },
    {
      say: 'The blade of grass did not move. It is still there. His name is Kevin.',
      show: ALL, sky: '#8EC9F0', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [0, 4, 9], look: [0, 3.2, 0], fov: 38, to: { pos: [0, 3.6, 6], look: [0, 3.3, 0], fov: 36 } },
      update: (w, p, t) => { w.mower.position.y = 900; flame(w, 0); smoke(w, 0); kevin(w, t, .12); },
    },
    {
      say: 'Quick question. What should cut Kevin next? Option A, scissors. Option B, a bigger rocket. Or option C, nothing. Kevin stays. Comment your answer.',
      quiz: { q: 'What should cut Kevin next?', options: ['Scissors', 'A bigger rocket', 'Nothing. Kevin stays.'], answer: 'Kevin is made up, so every answer is fine. (Team C.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 2, 0], lightDist: 30,
      cam: { pos: [5, 5, 13], look: [0, 8, 0], fov: 46, to: { pos: [-5, 5, 13], look: [0, 8, 0] } },
      update: (w, p, t) => { w.mower.position.y = 900; smoke(w, 0); kevin(w, t); },
    },
  ],
};

// Angle C (second person). Narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the password shower is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (someone shivering outside a shower with a keypad and a red lock light).

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#DCE6EE', 0);
  w.tiles = group();
  for (let i = 0; i < 10; i++) for (let j = 0; j < 7; j++) box(4.8, 4.8, .2, mat((i + j) % 2 ? '#BFE3EA' : '#F4FAFC'), [-22 + i * 5, 2.5 + j * 5, -8], w.tiles).castShadow = false;
  // the shower cabin
  w.shower = group([-3, 0, -2]);
  box(9, .5, 9, mat('#FFFFFF'), [0, .25, 0], w.shower);
  for (const [x, z] of [[-4.3, -4.3], [4.3, -4.3], [-4.3, 4.3], [4.3, 4.3]]) box(.4, 18, .4, mat('#C9CED6', { metal: .8 }), [x, 9, z], w.shower);
  box(9, 17, .15, mat('#BFE6FF', { opacity: .2, rough: .05 }), [0, 9, 4.4], w.shower).castShadow = false;
  box(.15, 17, 9, mat('#BFE6FF', { opacity: .2, rough: .05 }), [4.4, 9, 0], w.shower).castShadow = false;
  cyl(.15, .15, 5, mat('#C9CED6', { metal: .8 }), [0, 15.5, -3.5], w.shower, 8);
  w.head = cyl(1.6, 1.2, .5, mat('#C9CED6', { metal: .8 }), [0, 16, -1.5], w.shower, 20);
  w.water = group([0, 0, -1.5], w.shower);
  for (let i = 0; i < 30; i++) { const d = box(.1, .9, .1, mat('#5BC0EB', { glow: .6 }), [0, 0, 0], w.water); d.castShadow = false; d.userData = { x: ((i * 7) % 9) * .3 - 1.2, z: ((i * 11) % 9) * .3 - 1.2, ph: i * .09 }; }
  // the keypad on a post outside the door
  w.pad = group([4.4, 0, 3.6]);
  box(.5, 9, .5, mat('#5A6070'), [0, 4.5, 0], w.pad);
  box(3, 4.4, .5, mat('#1E2430'), [0, 9.6, 0], w.pad);
  w.screen = box(2.5, 1, .1, mat('#0B1A12'), [0, 11, .3], w.pad);
  w.stars = [];
  for (let i = 0; i < 6; i++) { const s = ball(.14, mat('#22E06B', { glow: 2 }), [-1 + i * .4, 11, .4], w.pad); w.stars.push(s); }
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box(.6, .6, .15, mat('#C9CED6'), [-.8 + c * .8, 9.8 - r * .8, .3], w.pad);
  w.lock = ball(.45, mat('#E0161E', { glow: 2.5 }), [0, 12.3, .3], w.pad);
  // you: wrapped in a towel, shivering
  w.you = group([7, 0, 7]);
  cyl(1.3, 1.5, 5, mat('#FFFFFF', { rough: 1 }), [0, 2.6, 0], w.you, 18); ball(1.2, mat('#F2C9A0'), [0, 6.3, 0], w.you);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 6.5, -1.1], w.you);
  w.mouth = box(.8, .2, .1, mat('#111111'), [0, 5.8, -1.15], w.you);
  w.arm = group([-1.3, 5, 0], w.you); const a = cyl(.3, .3, 3.4, mat('#F2C9A0'), [0, 0, -1.7], w.arm, 10); a.rotation.x = Math.PI / 2;
  // the reset code, glowing inside the locked cabin
  w.code = group([-3, 8.5, -5.5]); w.code.scale.setScalar(1.5);
  box(4, 2.2, .1, mat('#FFFFFF'), [0, 0, 0], w.code);
  for (let i = 0; i < 4; i++) box(.6, 1.2, .08, mat('#111111'), [-1.35 + i * .9, 0, .08], w.code);
  return w;
}

function shiver(w, t, amt = 1) { w.you.position.x = 7 + .08 * amt * Math.sin(t * 40); w.mouth.scale.x = 1 + .3 * Math.sin(t * 30); }
function typing(w, t, n) { w.stars.forEach((s, i) => { s.visible = i < n; }); w.arm.rotation.y = .1 * Math.sin(t * 12); }
function lock(w, t, mode) { const red = mode !== 'open'; w.lock.material.color.set(red ? '#E0161E' : '#22E06B'); w.lock.material.emissive.set(red ? '#E0161E' : '#22E06B'); w.lock.material.emissiveIntensity = mode === 'wrong' ? ((t * 6 % 1) < .5 ? 4 : .5) : 2.5; }
function water(w, t, on) { w.water.visible = on; w.water.children.forEach(d => { const u = d.userData; d.position.set(u.x, 15.5 - ((t * 16 + u.ph * 14) % 15), u.z); }); }
const ALL = ['floor', 'tiles', 'shower', 'pad', 'you'];

export default {
  id: '060',
  style: '3d',
  voice: 'v3',
  case: 'THE PASSWORD SHOWER',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['YOUR SHOWER', 'NEEDS A PASSWORD.'],
  title: 'Your new shower needs a password',
  description: 'You just wanted a shower. The shower wants twelve characters and a symbol. (A made-up shower.)',
  tags: ['funny', 'badideas', 'shower', 'password', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the password-protected shower is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Your shower needs a password.',
      show: ALL, sky: '#F4FAFC', lightAt: [4, 6, 4], lightDist: 25,
      cam: { pos: [16, 8, 26], look: [3, 12, 2], fov: 48, to: { pos: [14, 8, 22], look: [4, 12, 3], fov: 46 } },
      update: (w, p, t) => { shiver(w, t); typing(w, t, 0); lock(w, t, 'locked'); water(w, t, false); w.code.visible = false; },
    },
    {
      say: 'Twelve letters. One number. One symbol.',
      show: ALL, sky: '#EAF6FA', lightAt: [4.4, 10, 4], lightDist: 12,
      cam: { pos: [8, 11, 12], look: [4.4, 10.4, 3.6], fov: 40, to: { pos: [7, 11, 10], look: [4.4, 10.6, 3.6], fov: 38 } },
      update: (w, p, t) => { shiver(w, t, .5); typing(w, t, Math.min(6, Math.floor(t * 2.5))); lock(w, t, 'locked'); water(w, t, false); },
    },
    {
      say: 'You are already cold.',
      show: ALL, sky: '#DDEBF5', lightAt: [7, 4, 7], lightDist: 12,
      cam: { pos: [3, 7, 0], look: [7, 5.6, 7], fov: 40, to: { pos: [4, 6.6, 2], look: [7, 5.8, 7], fov: 38 } },
      update: (w, p, t) => { shiver(w, t, 2.5); typing(w, t, 6); lock(w, t, 'locked'); },
    },
    {
      say: 'Wrong password. Two tries left.',
      show: ALL, sky: '#FFE3E3', lightAt: [4.4, 10, 4], lightDist: 12,
      cam: { pos: [9, 12, 13], look: [4.4, 10.8, 3.6], fov: 42, to: { pos: [8, 11.6, 11], look: [4.4, 11, 3.6], fov: 40 } },
      shake: (t) => t < .6 ? .3 : 0,
      update: (w, p, t) => { shiver(w, t, 2); typing(w, t, t < .8 ? 6 : 0); lock(w, t, 'wrong'); },
    },
    {
      say: 'Forgot it? The reset code is inside the shower.',
      show: [...ALL, 'code'], sky: '#F4FAFC', lightAt: [-3, 8, -3], lightDist: 20,
      cam: { pos: [-8, 10, 22], look: [-3, 8.5, -3], fov: 46, to: { pos: [-6, 9.5, 14], look: [-3, 8.2, -5], fov: 42 } },
      update: (w, p, t) => { shiver(w, t, 2); typing(w, t, 0); lock(w, t, 'locked'); w.code.visible = true; water(w, t, true); },
    },
    {
      say: 'Your password: soap, water, or please? Comment below.',
      quiz: { q: 'What is your shower password?', options: ['Soap', 'Water', 'Please'], answer: 'It is a made-up shower, so any password works here.' },
      show: ALL, sky: '#274B73', lightAt: [4, 6, 4], lightDist: 25,
      cam: { pos: [18, 4, 26], look: [2, 16, 2], fov: 46, to: { pos: [-4, 4, 28], look: [2, 16, 2] } },
      update: (w, p, t) => { shiver(w, t); typing(w, t, Math.floor(t * 2) % 7); lock(w, t, 'locked'); water(w, t, false); w.code.visible = false; },
    },
  ],
};

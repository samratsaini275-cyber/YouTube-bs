// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the bathtub drawbridge is fictional.

function duck(k, parent, pos) {
  const g = k.group(pos, parent), y = k.mat('#FFD21F', { rough: .3 });
  const b = k.ball(1.2, y, [0, .6, 0], g); b.scale.set(1.3, .9, 1);
  k.ball(.75, y, [.9, 1.7, 0], g);
  const beak = k.cone(.3, .7, k.mat('#FF7A1F'), [1.75, 1.6, 0], g, 12); beak.rotation.z = -Math.PI / 2;
  for (const z of [-.3, .3]) k.ball(.1, k.mat('#111111'), [1.3, 1.95, z], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#DCE6EE', 0);
  w.tiles = group();
  for (let i = 0; i < 12; i++) for (let j = 0; j < 7; j++) box(4.8, 4.8, .2, mat((i + j) % 2 ? '#BFE3EA' : '#F4FAFC'), [-28 + i * 5, 2.5 + j * 5, -10], w.tiles).castShadow = false;
  // the tub: an open box with rounded rim
  w.tub = group([0, 0, 0]);
  const white = mat('#FFFFFF', { rough: .2 });
  box(36, 7, 1, white, [0, 3.5, -6.5], w.tub); box(36, 7, 1, white, [0, 3.5, 6.5], w.tub);
  box(1, 7, 14, white, [-18, 3.5, 0], w.tub); box(1, 7, 14, white, [18, 3.5, 0], w.tub);
  box(36, .6, 14, white, [0, .3, 0], w.tub);
  w.water = box(35, .2, 12, mat('#7CCBEF', { opacity: .75, rough: .05 }), [0, 5, 0], w.tub); w.water.castShadow = false;
  cyl(.5, .5, 2, mat('#C9CED6', { metal: .8 }), [-17, 8, 0], w.tub, 12);
  // the drawbridge: two leaves meeting in the middle of the tub
  w.bridge = group([0, 5.6, 0], w.tub);
  w.leafA = group([0, 0, -6], w.bridge); box(3, .5, 6, mat('#8C6B4A'), [0, 0, 3], w.leafA);
  w.leafB = group([0, 0, 6], w.bridge); box(3, .5, 6, mat('#8C6B4A'), [0, 0, -3], w.leafB);
  for (const z of [-6.2, 6.2]) { box(3.4, 4, 1, mat('#9AA3AE'), [0, 2, z], w.bridge); w[z < 0 ? 'lightA' : 'lightB'] = ball(.4, mat('#E0161E', { glow: 2 }), [0, 4.4, z], w.bridge); }
  // the rubber duck
  w.duck = duck(k, w.tub, [-12, 5, 0]);
  // a towel-holding bather waiting
  w.guy = group([3, 0, 13]);
  k.cyl(1.2, 1.4, 6, mat('#F2C9A0'), [0, 3, 0], w.guy, 18); ball(1.2, mat('#F2C9A0'), [0, 7.2, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 7.4, -1.1], w.guy);
  box(3.4, 4, .4, mat('#E2453C'), [0, 3.5, -1.3], w.guy);
  cyl(1.25, 1.25, .8, mat('#9B7BFF'), [0, 8.1, 0], w.guy, 18);   // shower cap
  return w;
}

function open(w, a) { w.leafA.rotation.x = -a * 1.4; w.leafB.rotation.x = a * 1.4; w.lightA.material.emissiveIntensity = w.lightB.material.emissiveIntensity = a > .05 ? 2.5 : .3; }
function float(w, x, t) { w.duck.position.set(x, 5 + .15 * Math.sin(t * 3), 0); w.duck.rotation.z = .05 * Math.sin(t * 2); }
const ALL = ['floor', 'tiles', 'tub'];

export default {
  id: '048',
  style: '3d',
  voice: 'v3',
  case: 'THE BATHTUB DRAWBRIDGE',
  year: 'ENGINEERING NONSENSE',
  hook: ['A DRAWBRIDGE.', 'IN A BATHTUB.'],
  title: 'Engineers built a working drawbridge in a bathtub',
  description: 'It opens for every boat. There is only one boat. It never stops sailing. (A made-up bridge in a made-up bath.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'bridge', 'rubberduck', 'shorts'],
  sources: [
    'Comedy sketch: the bathtub drawbridge, the duck and the bath schedule are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers built a drawbridge. In a bathtub.',
      show: ALL, sky: '#F4FAFC', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [-4, 20, 34], look: [-8, 5, 0], fov: 48, to: { pos: [-5, 16, 27], look: [-8, 5.5, 0], fov: 46 } },
      update: (w, p, t) => { open(w, 0); float(w, -12, t); },
    },
    {
      say: 'When a boat comes, it opens.',
      show: ALL, sky: '#EAF6FA', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [14, 15, 22], look: [0, 7, 0], fov: 44, to: { pos: [12, 14, 19], look: [0, 7, 0], fov: 42 } },
      update: (w, p, t, k) => { open(w, k.h.ease(k.h.win(t, .4, 1.4))); float(w, -12, t); },
    },
    {
      say: 'There is one boat. It is a rubber duck.',
      show: ALL, sky: '#F4FAFC', lightAt: [-8, 5, 0], lightDist: 15,
      cam: { pos: [-2, 9, 10], look: [-8, 6, 0], fov: 40, to: { pos: [-3, 8, 8], look: [-6, 6, 0], fov: 38 } },
      update: (w, p, t) => { open(w, 1); float(w, -10 + t * 1.6, t); },
    },
    {
      say: 'It goes back and forth. All day.',
      show: ALL, sky: '#EAF6FA', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [0, 30, 18], look: [0, 4, 0], fov: 48, to: { pos: [0, 28, 15], look: [0, 4, 0], fov: 46 } },
      update: (w, p, t) => { const x = 12 * Math.sin(t * 1.3); float(w, x, t); w.duck.rotation.y = Math.cos(t * 1.3) > 0 ? 0 : Math.PI; open(w, Math.abs(x) < 5 ? 1 : Math.max(0, 1 - (Math.abs(x) - 5) / 3)); },
    },
    {
      say: 'Nobody in the house has had a bath since March.',
      show: [...ALL, 'guy'], sky: '#F4FAFC', lightAt: [12, 5, 4], lightDist: 30,
      cam: { pos: [-8, 13, 38], look: [1, 6, 7], fov: 48, to: { pos: [-6, 12, 33], look: [1, 6, 7], fov: 46 } },
      update: (w, p, t) => { const x = 12 * Math.sin(t * 1.3); float(w, x, t); w.duck.rotation.y = Math.cos(t * 1.3) > 0 ? 0 : Math.PI; open(w, Math.abs(x) < 5 ? 1 : 0); },
    },
    {
      say: 'Quick question. Who should go first? Option A, the duck. Option B, the bather. Or option C, the bridge. Comment your answer.',
      quiz: { q: 'Who should go first?', options: ['The duck', 'The bather', 'The bridge'], answer: 'It is a made-up bathroom, so any answer works. (A, obviously.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 5, 0], lightDist: 30,
      cam: { pos: [14, 9, 32], look: [0, 11, 0], fov: 46, to: { pos: [-14, 9, 32], look: [0, 11, 0] } },
      update: (w, p, t) => { open(w, .6 + .3 * Math.sin(t * 2)); float(w, -6 + t, t); },
    },
  ],
};

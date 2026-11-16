// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the fishbowl lighthouse is fictional.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.table = k.ground('#8C6B4A', 0);
  w.wall = box(80, 40, 1, mat('#E9F2F7'), [0, 20, -14], k.scene);
  // the bowl
  w.bowl = group([0, 0, 0]);
  k.mesh(new k.THREE.SphereGeometry(9, 48, 32, 0, Math.PI * 2, .35, Math.PI - .35), mat('#CFEFFF', { opacity: .1, rough: .05, double: true }), [0, 8.4, 0], w.bowl).castShadow = false;
  w.water = cyl(8.6, 7, 9, mat('#2E9BD6', { opacity: .18, rough: .05 }), [0, 5, 0], w.bowl, 48); w.water.castShadow = false;
  cyl(6.5, 6.5, .6, mat('#E8D9B0', { rough: 1 }), [0, .7, 0], w.bowl, 40);
  // the single, very small rock
  w.rock = ball(.5, mat('#7A7F87', { rough: 1, flat: true }), [3, 1.3, 2], w.bowl);
  // the lighthouse
  w.house = group([-3, 1, -2], w.bowl);
  for (let i = 0; i < 5; i++) cyl(1.1 - i * .08, 1.18 - i * .08, 1.6, mat(i % 2 ? '#FFFFFF' : '#E0161E'), [0, .8 + i * 1.6, 0], w.house, 24);
  cyl(.8, .8, 1, mat('#FFF7C2', { glow: 1.5, opacity: .9 }), [0, 8.5, 0], w.house, 16);
  cone(1, 1, mat('#222222'), [0, 9.5, 0], w.house, 16);
  w.beam = group([0, 8.5, 0], w.house);
  const b = cone(1.6, 9, mat('#FFF4B0', { glow: 1.6, opacity: .35, double: true }), [4.5, 0, 0], w.beam, 20); b.rotation.z = Math.PI / 2; b.castShadow = false;
  // the fish
  w.fish = group([0, 5, 0], w.bowl);
  const body = ball(1, mat('#FF8A1F', { rough: .4 }), [0, 0, 0], w.fish); body.scale.set(1.5, 1, .7);
  const tail = cone(.8, 1.2, mat('#FF6A00'), [-1.9, 0, 0], w.fish, 3); tail.rotation.z = Math.PI / 2;
  ball(.18, mat('#FFFFFF'), [1, .3, .5], w.fish); ball(.09, mat('#111111'), [1.08, .3, .62], w.fish);
  return w;
}

function swim(w, t, r = 4.5, speed = .9) { const a = t * speed; w.fish.position.set(Math.cos(a) * r, 5 + .4 * Math.sin(t * 2), Math.sin(a) * r); w.fish.rotation.y = -a - Math.PI / 2; w.fish.children[1].rotation.y = .4 * Math.sin(t * 10); }
function sweep(w, t) { w.beam.rotation.y = t * 1.2; }
const ALL = ['table', 'wall', 'bowl'];

export default {
  id: '046',
  style: '3d',
  voice: 'v3',
  case: 'THE FISHBOWL LIGHTHOUSE',
  year: 'ENGINEERING NONSENSE',
  hook: ['A LIGHTHOUSE', 'FOR ONE FISH.'],
  title: 'Engineers built a working lighthouse inside a fishbowl',
  description: 'Zero shipwrecks since it was switched on. A flawless safety record. With one small asterisk. (A made-up lighthouse.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'lighthouse', 'fish', 'shorts'],
  sources: [
    'Comedy sketch: the fishbowl lighthouse and its safety record are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This fishbowl has its own lighthouse.',
      show: ALL, sky: '#E9F2F7', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [10, 14, 26], look: [0, 6, 0], fov: 44, to: { pos: [7, 12, 20], look: [0, 6.5, 0], fov: 42 } },
      update: (w, p, t) => { swim(w, t); sweep(w, t); },
    },
    {
      say: 'It warns the fish about dangerous rocks.',
      show: ALL, sky: '#1E3A5A', lightAt: [-3, 8, -2], lightDist: 20,
      cam: { pos: [-10, 10, 12], look: [-3, 7, -2], fov: 42, to: { pos: [-8, 9.5, 9], look: [-3, 7.5, -2], fov: 40 } },
      update: (w, p, t) => { swim(w, t); sweep(w, t * 1.4); },
    },
    {
      say: 'There is one rock. It is very small.',
      show: ALL, sky: '#E9F2F7', lightAt: [3, 1, 2], lightDist: 12,
      cam: { pos: [6, 3.5, 7], look: [3, 1.4, 2], fov: 38, to: { pos: [5, 3, 5.5], look: [3, 1.4, 2], fov: 34 } },
      update: (w, p, t) => { swim(w, t); sweep(w, t); },
    },
    {
      say: 'Since it was switched on: zero shipwrecks.',
      show: ALL, sky: '#16304D', lightAt: [0, 8, 0], lightDist: 25,
      cam: { pos: [0, 24, 14], look: [0, 4, 0], fov: 46, to: { pos: [0, 22, 11], look: [0, 4, 0], fov: 44 } },
      update: (w, p, t) => { swim(w, t, 4.5, 1.2); sweep(w, t * 1.4); },
    },
    {
      say: 'There has never been a ship.',
      show: ALL, sky: '#E9F2F7', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [2, 7, 16], look: [0, 5, 0], fov: 42, to: { pos: [1, 6.5, 13], look: [0, 5, 0], fov: 40 } },
      update: (w, p, t) => { swim(w, t, 3.5, .6); sweep(w, t); },
    },
    {
      say: 'Quick question. What should the lighthouse get next? Option A, a foghorn. Option B, a tiny ship. Or option C, a second fish. Comment your answer.',
      quiz: { q: 'What should the lighthouse get next?', options: ['A foghorn', 'A tiny ship', 'A second fish'], answer: 'Made-up lighthouse, so any answer works. (C: the fish wants a friend.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 4, 26], look: [0, 12, 0], fov: 46, to: { pos: [-14, 4, 26], look: [0, 12, 0] } },
      update: (w, p, t) => { swim(w, t); sweep(w, t); },
    },
  ],
};

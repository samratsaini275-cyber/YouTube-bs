// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the ladder and its storage spot are fictional.

function ladder(k, parent, pos, folded = false) {
  const g = k.group(pos, parent), al = k.mat('#C9CED6', { metal: .7, rough: .3 });
  for (const x of [-1.1, 1.1]) k.box(.3, 7, .3, al, [x, 3.5, 0], g);
  for (let i = 0; i < 4; i++) k.box(2.5, .25, .9, k.mat('#F59E0B'), [0, 1.2 + i * 1.6, 0], g);
  k.box(2.8, .4, 1.4, k.mat('#E2453C'), [0, 7, 0], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#D9CDB8', 0);
  w.wall = box(80, 50, 1, mat('#EFE6D2'), [0, 25, -6], k.scene);
  // tall shelving
  w.shelves = group([0, 0, -3]);
  const wood = mat('#8C6B4A');
  for (const x of [-7, 7]) box(.6, 36, 5, wood, [x, 18, 0], w.shelves);
  for (const y of [6, 14, 22, 30, 35.7]) box(14.6, .6, 5, wood, [0, y, 0], w.shelves);
  for (let i = 0; i < 6; i++) box(1.6, 3 + (i % 3), 2.4, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FFD21F'][i % 4]), [-5 + i * 2, 6.3 + (3 + (i % 3)) / 2, 0], w.shelves);
  for (let i = 0; i < 5; i++) cyl(.8, .8, 2.6, mat(['#F4F1EA', '#B07A4A'][i % 2]), [-4.5 + i * 2.2, 15.6, 0], w.shelves, 16);
  // the folded ladder, lying on the very top shelf
  w.topLadder = ladder(k, w.shelves, [0, 36, 0]); w.topLadder.rotation.z = Math.PI / 2; w.topLadder.position.set(3.5, 37.2, 0);
  // the ladder shown off in the showroom shot
  w.showLadder = ladder(k, k.scene, [0, 0, 6]);
  w.sparkle = group([0, 4, 6]);
  for (let i = 0; i < 10; i++) { const s = ball(.15, mat('#FFE45C', { glow: 3 }), [0, 0, 0], w.sparkle); s.castShadow = false; s.userData.a = i / 10 * Math.PI * 2; }
  // the person reaching
  w.guy = group([0, 0, 4]);
  cyl(1.2, 1.4, 6, mat('#14B8A6'), [0, 3, 0], w.guy, 18); ball(1.2, mat('#F2C9A0'), [0, 7.2, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 7.6, -1.05], w.guy);
  w.arm = group([1, 6, 0], w.guy); cyl(.3, .3, 4, mat('#14B8A6'), [0, 2, 0], w.arm, 10);
  return w;
}

function sparkle(w, t) { w.sparkle.children.forEach(s => { const r = 3 + .5 * Math.sin(t * 3 + s.userData.a); s.position.set(Math.cos(s.userData.a + t) * r, Math.sin(t * 2 + s.userData.a) * 3, Math.sin(s.userData.a + t) * r * .5); }); }
const ALL = ['floor', 'wall', 'shelves'];

export default {
  id: '050',
  style: '3d',
  voice: 'v3',
  case: 'THE TOP-SHELF LADDER',
  year: 'ENGINEERING NONSENSE',
  hook: ['THE PERFECT', 'STEP LADDER.'],
  title: 'Engineers designed the perfect ladder, then stored it on the top shelf',
  description: 'It folds flat. It stores anywhere. Somebody picked the wrong anywhere. (A made-up ladder.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'ladder', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the ladder, its storage spot and the reaching are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers designed the perfect step ladder.',
      show: ['floor', 'wall', 'showLadder', 'sparkle'], sky: '#EFE6D2', lightAt: [0, 4, 6], lightDist: 20,
      cam: { pos: [8, 8, 22], look: [0, 4, 6], fov: 42, to: { pos: [6, 7, 18], look: [0, 4, 6], fov: 40 } },
      update: (w, p, t) => { w.showLadder.rotation.y = t * .6; sparkle(w, t); },
    },
    {
      say: 'It folds flat. It fits anywhere.',
      show: ['floor', 'wall', 'showLadder', 'sparkle'], sky: '#E4DCCB', lightAt: [0, 4, 6], lightDist: 20,
      cam: { pos: [-8, 10, 24], look: [1.5, 3, 6], fov: 44, to: { pos: [-6, 9, 21], look: [2, 2.5, 6], fov: 42 } },
      update: (w, p, t, k) => { const f = k.h.ease(k.h.win(t, .3, 1.6)); w.showLadder.rotation.set(0, 0, f * Math.PI / 2); w.showLadder.position.set(f * 3.5, f * .4, 6); sparkle(w, t); },
    },
    {
      say: 'So they stored it on the top shelf.',
      show: ALL, sky: '#EFE6D2', lightAt: [0, 30, 0], lightDist: 30,
      cam: { pos: [6, 26, 26], look: [0, 35, -3], fov: 44, to: { pos: [4, 30, 20], look: [0, 36, -3], fov: 42 } },
      update: (w, p, t) => {},
    },
    {
      say: 'To get it down, you need a ladder.',
      show: [...ALL, 'guy'], sky: '#EFE6D2', lightAt: [0, 14, 2], lightDist: 40,
      cam: { pos: [12, 16, 50], look: [0, 21, -1], fov: 50, to: { pos: [10, 15, 46], look: [0, 21, -1], fov: 50 } },
      update: (w, p, t) => { w.guy.position.y = 0; w.arm.rotation.z = Math.PI * .1; },
    },
    {
      say: 'He has been jumping since Thursday.',
      show: [...ALL, 'guy'], sky: '#E4DCCB', lightAt: [0, 14, 2], lightDist: 40,
      cam: { pos: [-12, 15, 50], look: [0, 21, -1], fov: 50, to: { pos: [-10, 15, 45], look: [0, 21, -1], fov: 50 } },
      update: (w, p, t) => { w.guy.position.y = Math.abs(Math.sin(t * 4)) * 3; w.arm.rotation.z = Math.PI * .05 * Math.sin(t * 8); },
    },
    {
      say: 'Quick question. How does he get it down? Option A, keep jumping. Option B, buy a second ladder. Or option C, wait for it to fall. Comment your answer.',
      quiz: { q: 'How does he get the ladder down?', options: ['Keep jumping', 'Buy a second ladder', 'Wait for it to fall'], answer: 'It is a made-up ladder, so any answer works. (B, then store that one on the floor.)' },
      show: [...ALL, 'guy'], sky: '#274B73', lightAt: [0, 14, 2], lightDist: 40,
      cam: { pos: [14, 4, 44], look: [0, 22, 0], fov: 50, to: { pos: [-14, 4, 44], look: [0, 22, 0] } },
      update: (w, p, t) => { w.guy.position.y = Math.abs(Math.sin(t * 4)) * 2; },
    },
  ],
};

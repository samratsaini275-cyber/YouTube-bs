// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: no such fridge exists.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#D8CDBB', 0);
  w.kitchen = group();
  for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) box(4.8, 4.8, .2, mat((i + j) % 2 ? '#F2C6C2' : '#FBF4EC'), [-20 + i * 5, 2.5 + j * 5, -8], w.kitchen).castShadow = false;
  box(14, 9, 7, mat('#8C6B4A'), [14, 4.5, -4], w.kitchen); box(14.4, .6, 7.4, mat('#EDE6DA'), [14, 9.3, -4], w.kitchen);
  // the fridge body (open at the front)
  w.fridge = group([0, 0, -3]);
  const white = mat('#F4F6F8', { rough: .35 });
  box(10, 22, .5, white, [0, 11, -2.75], w.fridge); box(.5, 22, 6, white, [-4.75, 11, 0], w.fridge); box(.5, 22, 6, white, [4.75, 11, 0], w.fridge);
  box(10, .5, 6, white, [0, 21.75, 0], w.fridge); box(10, .5, 6, white, [0, .25, 0], w.fridge);
  for (const y of [6, 12]) box(9, .2, 5.4, mat('#CFE9F7', { opacity: .7 }), [0, y, 0], w.fridge).castShadow = false;
  w.inside = k.mesh(new k.THREE.PlaneGeometry(9, 21), mat('#FFF8D8', { glow: .5 }), [0, 11, -2.4], w.fridge);
  // food: a salad and a cake
  w.salad = group([-2, 6.1, 0], w.fridge);
  cyl(1.8, 1.2, 1.2, mat('#FFFFFF'), [0, .6, 0], w.salad, 24); for (let i = 0; i < 7; i++) ball(.55, mat(i % 2 ? '#4CAF50' : '#7BD15A'), [Math.cos(i) * .9, 1.4, Math.sin(i) * .9], w.salad);
  w.cake = group([2, 12.1, 0], w.fridge);
  cyl(1.8, 1.8, 2, mat('#7A3E1D'), [0, 1, 0], w.cake, 24); cyl(1.85, 1.85, .4, mat('#FFE3EE'), [0, 2.1, 0], w.cake, 24); ball(.4, mat('#E0161E'), [0, 2.6, 0], w.cake);
  // the door, hinged on the left
  w.door = group([-5, 0, 3.2], w.fridge);
  box(10, 22, .8, white, [5, 11, 0], w.door);
  box(.5, 6, .6, mat('#B8BEC8', { metal: .7 }), [9, 13, .6], w.door);
  // face on the door
  w.eyes = [];
  for (const x of [3, 7]) { const e = group([x, 16, .45], w.door); ball(1, mat('#FFFFFF'), [0, 0, 0], e); ball(.45, mat('#111111'), [0, 0, .7], e); w.eyes.push(e); }
  w.brows = [];
  for (const x of [3, 7]) { const b = box(1.8, .3, .2, mat('#333333'), [x, 17.6, .5], w.door); w.brows.push(b); }
  w.mouth = box(3, .3, .2, mat('#333333'), [5, 12.8, .5], w.door);
  // a hand reaching in
  w.hand = group([12, 12, 6]);
  cyl(.6, .6, 9, mat('#F2C9A0'), [0, 0, 0], w.hand, 12).rotation.z = Math.PI / 2;
  ball(.9, mat('#F2C9A0'), [-4.6, 0, 0], w.hand);
  // midnight: every light in the house
  w.lamps = group();
  for (let i = 0; i < 6; i++) { const l = ball(1.6, mat('#FFF3A3', { glow: 3 }), [-14 + i * 5.6, 25, 6], w.lamps); l.castShadow = false; }
  w.dark = k.mesh(new k.THREE.PlaneGeometry(200, 200), mat('#05070F', { opacity: .82 }), [0, 16, 30]); w.dark.castShadow = w.dark.receiveShadow = false;
  return w;
}

function face(w, mood) {   // mood: 1 happy, 0 neutral, -1 judging
  w.brows[0].rotation.z = -mood * .35; w.brows[1].rotation.z = mood * .35;
  w.mouth.scale.x = mood > 0 ? 1.2 : mood < 0 ? .6 : 1;
  w.mouth.rotation.z = 0;
}
function door(w, a) { w.door.rotation.y = -a; }
const ALL = ['floor', 'kitchen', 'fridge'];

export default {
  id: '038',
  style: '3d',
  voice: 'v3',
  case: 'THE JUDGING FRIDGE',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS FRIDGE', 'IS JUDGING YOU.'],
  title: 'Engineers gave a fridge opinions about your snacks',
  description: 'It is fine with salad. It has strong feelings about cake. (A made-up fridge. Your fridge is not watching you.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'fridge', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the judging fridge and everything it does are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This fridge has artificial intelligence. And opinions.',
      show: ALL, sky: '#FBF4EC', lightAt: [0, 10, 0], lightDist: 35,
      cam: { pos: [12, 14, 40], look: [0, 12, 0], fov: 46, to: { pos: [6, 13, 32], look: [0, 13, 0], fov: 44 } },
      update: (w, p, t) => { door(w, 0); face(w, t > 2.2 ? -1 : 0); w.hand.visible = w.lamps.visible = false; w.eyes.forEach(e => { e.children[1].position.x = .3 * Math.sin(t * 2); }); },
    },
    {
      say: 'Open it for a salad? It smiles.',
      show: ALL, sky: '#E8F7E4', lightAt: [0, 10, 2], lightDist: 30,
      cam: { pos: [-14, 13, 30], look: [0, 10, 0], fov: 44, to: { pos: [-12, 12, 26], look: [0, 9, 0], fov: 42 } },
      update: (w, p, t, k) => { door(w, 1.9 * k.h.ease(k.h.win(t, .2, 1))); face(w, 1); w.hand.visible = true; w.hand.position.set(12 - 4 * k.h.win(t, 1, 2), 3.7, 4); },
    },
    {
      say: 'Reach for the cake? The door closes.',
      show: ALL, sky: '#FBE4E4', lightAt: [0, 12, 2], lightDist: 30,
      cam: { pos: [14, 15, 26], look: [1, 12, 0], fov: 44, to: { pos: [12, 14, 22], look: [1, 12, 0], fov: 42 } },
      shake: (t) => t > 1.6 && t < 2.2 ? .5 : 0,
      update: (w, p, t, k) => { door(w, 1.9 * (1 - k.h.win(t, 1.3, 1.6))); face(w, t > 1.3 ? -1 : 0); w.hand.visible = true; w.hand.position.set(12 - 4 * k.h.win(t, .2, 1.2) + 6 * k.h.win(t, 1.3, 1.6), 9.7, 4); },
    },
    {
      say: 'Try again at midnight? It turns on every light in the house.',
      show: [...ALL, 'lamps', 'dark'], sky: '#0B1020', lightAt: [0, 10, 0], lightDist: 35,
      cam: { pos: [0, 16, 40], look: [0, 16, 0], fov: 48, to: { pos: [0, 15, 36], look: [0, 15, 0], fov: 46 } },
      update: (w, p, t) => { door(w, 0); face(w, -1); w.hand.visible = false; const on = t > 1.4; w.lamps.visible = on; w.dark.visible = !on; },
    },
    {
      say: 'Nobody has seen the cake in three years.',
      show: ALL, sky: '#151922', lightAt: [2, 12, 0], lightDist: 15,
      cam: { pos: [6, 15, 14], look: [2, 13, -3], fov: 40, to: { pos: [4, 14, 10], look: [2, 13, -3], fov: 38 } },
      update: (w, p, t) => { door(w, 1.9); face(w, -1); w.hand.visible = false; w.lamps.visible = false; w.cake.rotation.y = t * .6; },
    },
    {
      say: 'Quick question. What should the fridge let you eat? Option A, the salad. Option B, the cake. Or option C, nothing. Comment your answer.',
      quiz: { q: 'What should the fridge let you eat?', options: ['The salad', 'The cake', 'Nothing'], answer: 'It is a made-up fridge, so B is allowed here.' },
      show: ALL, sky: '#274B73', lightAt: [0, 10, 0], lightDist: 35,
      cam: { pos: [14, 8, 36], look: [0, 20, 0], fov: 46, to: { pos: [-14, 8, 36], look: [0, 20, 0] } },
      update: (w, p, t) => { door(w, 0); face(w, Math.sin(t * 2) > 0 ? 1 : -1); w.hand.visible = false; },
    },
  ],
};

// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the door and its manual are fictional.

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#C9B79C', 0);
  w.wall = group();
  box(60, 30, 1, mat('#F1E7D6'), [0, 15, -1], w.wall);
  box(9.6, 17, 1.2, mat('#6B4B2E'), [0, 8.5, -.9], w.wall);   // frame
  // the door swings on a hinge at its left edge
  w.hinge = group([-4, 0, 0]);
  box(8, 16, .6, mat('#2F6FD6', { rough: .5 }), [4, 8, 0], w.hinge);
  for (const y of [4, 12]) box(5, 5, .2, mat('#2A5FB8'), [4, y, .35], w.hinge).castShadow = false;
  w.knob = ball(.5, mat('#E8C547', { metal: .8, rough: .2 }), [7, 8, .7], w.hinge);
  // a second, much smaller door
  w.mini = group([7, 0, -.3]);
  box(1.6, 3, .3, mat('#E2453C'), [0, 1.5, 0], w.mini); ball(.12, mat('#E8C547', { metal: .8 }), [.5, 1.5, .2], w.mini);
  // the person
  w.guy = group([14, 0, 10]);
  cyl(1.1, 1.3, 6, mat('#3BA55C'), [0, 3, 0], w.guy, 20); w.head = ball(1.2, mat('#F2C9A0'), [0, 7.2, 0], w.guy);
  for (const x of [-.4, .4]) ball(.16, mat('#111111'), [x, 7.4, 1.05], w.guy);
  w.arm = group([1.2, 5, 0], w.guy); cyl(.3, .3, 3.4, mat('#3BA55C'), [0, -1.5, 0], w.arm, 10);
  // the manual: a huge book on a lectern
  w.book = group([-13, 0, 7]);
  box(1.2, 6, 1.2, mat('#6B4B2E'), [0, 3, 0], w.book);
  w.cover = group([0, 6.4, 0], w.book); w.cover.rotation.x = .85;
  box(7, .5, 9, mat('#B02E26'), [0, 0, 0], w.cover);
  w.pages = [];
  for (let i = 0; i < 6; i++) { const pg = group([-0.1, .4 + i * .05, 0], w.cover); box(3.3, .04, 8.4, mat('#FBF8EF'), [1.7, 0, 0], pg); w.pages.push(pg); }
  box(3.3, .9, 8.4, mat('#FBF8EF'), [-1.7, .5, 0], w.cover);
  box(3.3, .3, 8.4, mat('#F3EEDF'), [1.7, .2, 0], w.cover);
  return w;
}

function door(w, a) { w.hinge.rotation.y = a; }
function flip(w, t, speed = 3) { w.pages.forEach((pg, i) => { pg.rotation.z = Math.PI * Math.min(1, Math.max(0, (t * speed - i) % 6)); }); }
const ALL = ['floor', 'wall', 'hinge', 'mini', 'guy', 'book'];

export default {
  id: '034',
  style: '3d',
  voice: 'v3',
  case: 'THE DOOR MANUAL',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS DOOR HAS', 'A 40-PAGE MANUAL.'],
  title: 'This door comes with a 40-page instruction manual',
  description: 'Forty steps. One door. Nobody reads to the end. (A made-up door. Please do not ask where to buy it.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'door', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the door, its manual and every step in it are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This door comes with a {40|forty}-page instruction manual.',
      show: ALL, sky: '#F1E7D6', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [-11, 17, 30], look: [-10, 7, 4], fov: 46, to: { pos: [-12, 15, 23], look: [-11, 7, 5], fov: 44 } },
      update: (w, p, t) => { door(w, 0); flip(w, t); w.guy.position.set(14, 0, 10); w.mini.visible = false; },
    },
    {
      say: 'Step one: approach the door. Step two: admire the door.',
      show: ALL, sky: '#F1E7D6', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [20, 10, 30], look: [4, 7, 2], fov: 44, to: { pos: [14, 9, 24], look: [3, 7, 2], fov: 42 } },
      update: (w, p, t) => { door(w, 0); w.mini.visible = false; w.guy.position.set(14 - Math.min(t, 2) * 3, 0, 10 - Math.min(t, 2) * 1.5); w.guy.rotation.y = -.6; w.head.position.y = 7.2 + (t > 2.4 ? .15 * Math.sin(t * 8) : 0); },
    },
    {
      say: 'Step seventeen: consult the smaller door.',
      show: ALL, sky: '#FFE6C7', lightAt: [7, 2, 0], lightDist: 20,
      cam: { pos: [12, 4, 10], look: [7, 2, 0], fov: 40, to: { pos: [10, 3, 7], look: [7, 1.8, 0], fov: 38 } },
      update: (w, p, t) => { door(w, 0); w.mini.visible = true; w.mini.rotation.y = t > 1.5 ? -.5 : 0; w.guy.position.set(8, 0, 7); w.guy.rotation.y = -.6; },
    },
    {
      say: 'Step thirty-nine: push.',
      show: ALL, sky: '#F1E7D6', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [16, 10, 24], look: [4, 7, 1], fov: 44, to: { pos: [14, 10, 20], look: [4, 7, 1], fov: 42 } },
      shake: (t) => t > .6 && t < 1.6 ? .35 : 0,
      update: (w, p, t) => { door(w, 0); w.mini.visible = true; w.mini.rotation.y = 0; w.guy.position.set(7, 0, 3.2); w.guy.rotation.y = Math.PI; w.arm.rotation.x = -1.4 * Math.min(1, t * 3); },
    },
    {
      say: 'Step forty: it was a pull door.',
      show: ALL, sky: '#C7E8FF', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [-22, 12, 30], look: [1, 7, 3], fov: 46, to: { pos: [-18, 11, 26], look: [1, 7, 3], fov: 44 } },
      update: (w, p, t, k) => { door(w, -k.h.ease(k.h.win(t, .9, 1.6)) * 1.4); w.mini.visible = true; w.guy.position.set(7 + k.h.win(t, .9, 1.6) * 2, 0, 3.2); w.guy.rotation.y = Math.PI; w.arm.rotation.x = -1.4; },
    },
    {
      say: 'Quick question. A door says push. What do you do? Option A, push. Option B, pull. Or option C, read the manual. Comment your answer.',
      quiz: { q: 'A door says PUSH. What do you do?', options: ['Push', 'Pull', 'Read the manual'], answer: 'A, push (this door is made up, so it does not count).' },
      show: ALL, sky: '#274B73', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [14, 24, 46], look: [0, -2, 0], fov: 46, to: { pos: [-14, 24, 46], look: [0, -2, 0] } },
      update: (w, p, t) => { door(w, -.3); flip(w, t, 1.5); w.guy.position.set(14, 0, 10); w.guy.rotation.y = 0; w.arm.rotation.x = 0; },
    },
  ],
};

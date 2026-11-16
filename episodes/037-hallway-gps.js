// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the hallway GPS and its user are fictional.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#B9A58A', 0);
  w.hall = group();
  const wallM = mat('#EFE6D2');
  box(1, 14, 60, wallM, [-6, 7, 0], w.hall); box(1, 14, 60, wallM, [6, 7, 0], w.hall);
  box(13, 14, 1, mat('#E2D6BC'), [0, 7, -30], w.hall);
  w.ceil = group();
  box(12, .2, 60, mat('#D9CBAF'), [0, 14, 0], w.ceil).castShadow = false;
  box(4, .3, 56, mat('#B03A2E'), [0, .16, 0], w.hall).castShadow = false;   // runner rug
  for (let i = 0; i < 4; i++) box(2, .2, 2, mat('#FFF6D6', { glow: 1 }), [0, 13.8, -24 + i * 16], w.ceil).castShadow = false;
  // the door, on the right wall, halfway down
  w.door = group([5.4, 0, -4]);
  box(.3, 10, 5, mat('#2F6FD6'), [0, 5, 0], w.door); ball(.3, mat('#E8C547', { metal: .8 }), [-.3, 5, 1.6], w.door);
  box(.2, 10.6, 5.6, mat('#6B4B2E'), [.1, 5.2, 0], w.door);
  // the guy
  w.guy = group([0, 0, 20]);
  cyl(1, 1.2, 5.4, mat('#7A4FD6'), [0, 2.7, 0], w.guy, 20); ball(1.1, mat('#F2C9A0'), [0, 6.5, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 6.7, -1], w.guy);
  w.phone = box(.8, 1.4, .15, mat('#111827', { glow: .2 }), [.6, 4.6, -1.2], w.guy);
  // the floating GPS arrow
  w.arrow = group([0, 9, 10]);
  const head = cone(1.2, 2, mat('#22C55E', { glow: 1.2 }), [0, 0, -1.6], w.arrow, 3); head.rotation.x = -Math.PI / 2;
  box(.9, .3, 2.6, mat('#22C55E', { glow: 1.2 }), [0, 0, .6], w.arrow);
  // a "recalculating" spinner
  w.spin = group([0, 10, 0]);
  for (let i = 0; i < 8; i++) { const d = ball(.35, mat('#38BDF8', { glow: 1.5 }), [Math.cos(i * .785) * 1.6, Math.sin(i * .785) * 1.6, 0], w.spin); d.castShadow = false; }
  return w;
}

function walk(w, z, face = 0) { w.guy.position.z = z; w.guy.rotation.y = face; w.guy.position.y = .15 * Math.abs(Math.sin(z * 2)); }
const ALL = ['floor', 'hall', 'ceil', 'door', 'guy'];

export default {
  id: '037',
  style: '3d',
  voice: 'v3',
  case: 'THE HALLWAY GPS',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS HALLWAY', 'HAS GPS.'],
  title: 'Engineers added turn-by-turn GPS to a hallway',
  description: 'Ten steps. One door. Satellite navigation. He has still not arrived. (A made-up hallway and a made-up man.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'gps', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the hallway, its GPS and the man using it are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This hallway is ten steps long. It comes with GPS.',
      show: [...ALL, 'arrow'], sky: '#EFE6D2', lightAt: [0, 4, 4], lightDist: 30,
      cam: { pos: [-4.5, 11, 34], look: [2, 5, 4], fov: 46, to: { pos: [-4.5, 10, 30], look: [2, 5, 2], fov: 44 } },
      update: (w, p, t) => { walk(w, 20); w.arrow.position.set(0, 9, 14 + .3 * Math.sin(t * 4)); },
    },
    {
      say: 'In five steps, continue straight.',
      show: [...ALL, 'arrow'], sky: '#EFE6D2', lightAt: [0, 4, 10], lightDist: 25,
      cam: { pos: [-4.5, 11, 30], look: [1, 5, 8], fov: 44, to: { pos: [-4.5, 11, 26], look: [1, 5, 4], fov: 44 } },
      update: (w, p, t) => { walk(w, 20 - t * 2.4); w.arrow.position.set(0, 9, w.guy.position.z - 6 + .3 * Math.sin(t * 4)); },
    },
    {
      say: 'In two steps, continue straight.',
      show: [...ALL, 'arrow'], sky: '#EFE6D2', lightAt: [0, 4, 4], lightDist: 25,
      cam: { pos: [-4.5, 11, 20], look: [2, 5, -2], fov: 44, to: { pos: [-4.5, 11, 16], look: [2, 5, -4], fov: 44 } },
      update: (w, p, t) => { walk(w, 12 - t * 2.4); w.arrow.position.set(0, 9, w.guy.position.z - 6 + .3 * Math.sin(t * 4)); },
    },
    {
      say: 'You have missed your door. Recalculating.',
      show: [...ALL, 'spin'], sky: '#3A3550', lightAt: [0, 4, -16], lightDist: 25,
      cam: { pos: [-4.5, 11, 12], look: [2, 5, -10], fov: 46, to: { pos: [-4.5, 11, 8], look: [1, 5, -16], fov: 46 } },
      update: (w, p, t) => { walk(w, Math.max(-26, 4 - t * 4)); w.spin.position.set(0, 10.5, w.guy.position.z); w.spin.rotation.z = -t * 5; },
    },
    {
      say: 'He has been in this hallway since Tuesday.',
      show: ['floor', 'hall', 'door', 'guy'], sky: '#1D2238', lightAt: [0, 4, 0], lightDist: 35,
      cam: { pos: [0, 30, 26], look: [0, 0, -2], fov: 50, to: { pos: [0, 32, 22], look: [0, 0, -3], fov: 50 } },
      update: (w, p, t) => { const z = 18 * Math.sin(t * 2.2); walk(w, z, Math.cos(t * 2.2) > 0 ? Math.PI : 0); },
    },
    {
      say: 'Quick question. What should the GPS say next? Option A, the door is right there. Option B, recalculating. Or option C, turn left into the wall. Comment your answer.',
      quiz: { q: 'What should the hallway GPS say next?', options: ['The door is right there', 'Recalculating', 'Turn left into the wall'], answer: 'A made-up hallway, so any answer works. (A would help.)' },
      show: [...ALL, 'arrow'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [-4.5, 9, 36], look: [0, 16, 0], fov: 46, to: { pos: [4.5, 11, 24], look: [0, 15, -4] } },
      update: (w, p, t) => { walk(w, 6 - Math.sin(t * 1.5) * 4, 0); w.arrow.position.set(0, 9 + .5 * Math.sin(t * 3), 0); w.arrow.rotation.y = t * 2; },
    },
  ],
};

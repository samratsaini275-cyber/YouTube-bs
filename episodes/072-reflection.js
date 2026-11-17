// Narrative 5: "What Would Happen If…". A made-up comedy sketch: reflections do what they are told.
// The "mirror" is a window into a copy of the bathroom with a second person in it, posed as your reflection.
// Hook rule: the premise as a question under 2 s, first frame already showing the reflection doing something different.

function person(k, parent, z, facing) {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, z], parent) };
  p.root.rotation.y = facing;
  cyl(1.1, 1.3, 4, mat('#E2453C'), [0, 2, 0], p.root, 18);
  p.head = group([0, 5.1, 0], p.root);
  ball(1.15, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = [-.42, .42].map(x => ball(.17, mat('#111111'), [x, .25, 1.05], p.head));
  p.mouth = box(.7, .16, .1, mat('#5A1E1E'), [0, -.4, 1.1], p.head);
  p.hair = group([0, .9, 0], p.head);
  for (let i = 0; i < 7; i++) { const s = cone(.25, .9, mat('#3A2A1E'), [0, 0, 0], p.hair, 8); s.position.set(-.7 + i * .23, .1, -.1 + (i % 2) * .3); s.rotation.z = (i - 3) * .25; s.userData.i = i; }
  p.arm = group([1.2, 3.6, 0], p.root);
  cyl(.28, .28, 2.4, mat('#E2453C'), [0, -1, 0], p.arm, 10);
  p.brush = box(.15, 1.1, .15, mat('#5BC0EB'), [0, -2.4, .3], p.arm);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#DCE6EE', 0);
  w.room = group();
  const tile = (x, y, z, rot) => { const t = box(2.9, 2.9, .2, mat((Math.round(x + y) % 2) ? '#BFE3EA' : '#F4FAFC'), [x, y, z], w.room); t.rotation.y = rot; t.castShadow = false; };
  // the mirror wall with a hole for the mirror
  for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) { const x = -9 + i * 3, y = 1.5 + j * 3; if (!(Math.abs(x) < 4 && y > 2 && y < 11)) tile(x, y, 0, 0); }
  w.frame = group([0, 6.5, 0]);
  for (const [x, y, wd, h] of [[0, 4.6, 8.4, .4], [0, -4.6, 8.4, .4], [-4.2, 0, .4, 9.6], [4.2, 0, .4, 9.6]]) box(wd, h, .5, mat('#C9CED6', { metal: .8, rough: .2 }), [x, y, 0], w.frame);
  w.glass = box(8, 9, .05, mat('#BFE6FF', { opacity: .28, rough: .02, metal: .3 }), [0, 0, .1], w.frame); w.glass.castShadow = false;
  box(8, .6, 3, mat('#FFFFFF'), [0, 1.2, 1.6], w.room);
  // the room behind you, and its mirror copy behind the glass
  for (const z of [17, -17]) for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) tile(-9 + i * 3, 1.5 + j * 3, z, 0);
  
  w.you = person(k, k.scene, 4, Math.PI);
  w.refl = person(k, k.scene, -4, 0);
  // the note left behind
  w.note = group([1.5, 7, -.1]);
  box(2, 2, .05, mat('#FFE45C'), [0, 0, 0], w.note);
  for (let i = 0; i < 3; i++) box(1.4 - i * .3, .12, .02, mat('#2A2A2A'), [-.1, .5 - i * .45, -.04], w.note);
  return w;
}

function pose(p, t, o = {}) {
  p.root.position.x = o.x ?? 0;
  p.arm.rotation.x = o.brush ? -1.4 + .25 * Math.sin(t * 14) : 0;
  p.brush.visible = !!o.brush;
  p.mouth.scale.set(o.grin ? 1.5 : 1, o.laugh ? 1 + 3 * Math.abs(Math.sin(t * 12)) : 1, 1);
  p.head.rotation.z = o.tilt ? .15 * Math.sin(t * 10) : 0;
  p.hair.children.forEach(s => { s.rotation.x = o.messy ? (s.userData.i % 2 ? .8 : -.8) : 0; s.scale.y = o.messy ? 1.6 : 1; });
  p.eyes.forEach(e => e.scale.setScalar(o.wide ? 1.6 : 1));
}
const ALL = ['ground', 'room', 'frame', 'you', 'refl'];
// camera over your shoulder looking into the mirror
const OVER = (look = [0, 5.4, -4]) => ({ pos: [5, 6.3, 14], look, fov: 52 });

export default {
  id: '072',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE REFLECTION',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF MIRRORS', 'TALKED BACK?'],
  title: 'What would happen if mirrors talked back?',
  description: 'It copies you. Mostly. It has notes on your hair. And it has had enough. (A made-up mirror.)',
  tags: ['whatif', 'funny', 'mirror', 'reflection', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the talking reflection is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if mirrors talked back?',
      show: ALL, sky: '#F4FAFC', lightAt: [0, 5, 0], lightDist: 18,
      cam: { ...OVER([0, 7, -4]), to: { pos: [4.2, 6.3, 12], look: [0, 7, -4], fov: 50 } },
      update: (w, p, t) => { pose(w.you, t, { brush: true }); pose(w.refl, t, { laugh: true, tilt: true }); },
    },
    {
      say: 'It copies you. Mostly.',
      show: ALL, sky: '#F4FAFC', lightAt: [0, 5, 0], lightDist: 18,
      cam: { ...OVER(), to: { pos: [4.2, 6.3, 12], look: [0, 5.4, -4], fov: 50 } },
      update: (w, p, t) => { const s = Math.sin(t * 3) * 1.5; pose(w.you, t, { x: s }); pose(w.refl, t, { x: Math.sin((t - .5) * 3) * 1.5 }); },
    },
    {
      say: 'Bad hair day? It laughs at you.',
      show: ALL, sky: '#F4FAFC', lightAt: [0, 6, -2], lightDist: 14,
      cam: { pos: [4, 6.2, 11], look: [-.2, 5.6, -4], fov: 34, to: { pos: [3.8, 6.2, 10], look: [-.2, 5.6, -4], fov: 32 } },
      update: (w, p, t) => { pose(w.you, t, { messy: true }); pose(w.refl, t, { messy: true, laugh: true, tilt: true }); },
    },
    {
      say: 'Then one morning, it just walks out.',
      show: ALL, sky: '#F4FAFC', lightAt: [0, 5, -3], lightDist: 18,
      cam: { ...OVER([0, 5, -4]), to: { pos: [4.2, 6.3, 12], look: [0, 5, -4], fov: 50 } },
      update: (w, p, t) => { pose(w.you, t, { wide: t > 1 }); pose(w.refl, t, { x: Math.min(0, -(t - .4) * 6) }); w.refl.root.rotation.y = t > .4 ? -Math.PI / 2 : 0; },
    },
    {
      say: 'It left a note: find a better face.',
      show: [...ALL, 'note'], sky: '#F4FAFC', lightAt: [1, 6, 0], lightDist: 14,
      cam: { pos: [5, 7, 14], look: [.6, 6.4, -1], fov: 46, to: { pos: [4.6, 7, 12.5], look: [.8, 6.6, -1], fov: 42 } },
      update: (w, p, t) => { pose(w.you, t, { wide: true }); w.refl.root.position.x = -30; },
    },
    {
      say: 'Your reflection: friend, rival, or roommate? Comment below.',
      quiz: { q: 'What would your reflection be?', options: ['A friend', 'A rival', 'A roommate'], answer: 'It is a made-up mirror, so yours will keep copying you. Probably.' },
      show: ALL, sky: '#274B73', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [8, 3, 14], look: [0, 10, -2], fov: 46, to: { pos: [-8, 3, 14], look: [0, 10, -2] } },
      update: (w, p, t) => { w.refl.root.rotation.y = 0; pose(w.you, t, { brush: true }); pose(w.refl, t, { laugh: true }); },
    },
  ],
};

// Narrative 5: "What Would Happen If…". A made-up comedy sketch: homework does not do itself (sadly).
// Hook rule: the premise as a question under 2 s, first frame already showing a pencil writing on its own.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B79C', 0);
  w.room = group();
  box(40, 18, .5, mat('#D7E3F0'), [0, 9, -8], w.room);
  box(14, .5, 8, mat('#B07A4A'), [0, 4, -2], w.room);
  for (const x of [-6.5, 6.5]) for (const z of [-5.5, 1.5]) box(.5, 4, .5, mat('#8B5A2B'), [x, 2, z], w.room);
  box(4, 3, .2, mat('#9ED2F3', { glow: .3 }), [-8, 11, -7.7], w.room);
  // notebook
  w.book = group([0, 4.3, -1.5]);
  box(7, .2, 5, mat('#FBF8EF'), [0, 0, 0], w.book);
  for (let i = 0; i < 9; i++) box(6.4, .01, .04, mat('#9FC8E8'), [0, .11, -2 + i * .5], w.book).castShadow = false;
  w.scrib = group([0, .12, 0], w.book);
  for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) { const s = box(.7, .02, .12, mat(c % 3 === 1 ? '#E2453C' : '#2A2A2A'), [-2.6 + c * 1, 0, -1.8 + r * .5], w.scrib); s.rotation.y = Math.sin(r * 3 + c) * .3; s.castShadow = false; s.userData.n = r * 6 + c; }
  w.page = group([0, .2, 0], w.book);
  const pg = box(3.4, .03, 5, mat('#FFFFFF'), [1.7, 0, 0], w.page); pg.castShadow = false;
  // the pencil (it has a face, of course)
  w.pencil = group([0, 0, 0]);
  w.pbody = group([0, 0, 0], w.pencil);
  cyl(.3, .3, 5, mat('#FFC21F'), [0, 2.5, 0], w.pbody, 6);
  cyl(.32, .32, .6, mat('#FF8FA3'), [0, 5.3, 0], w.pbody, 12);
  const tip = cone(.3, .8, mat('#E8C9A0'), [0, -.4, 0], w.pbody, 6); tip.rotation.x = Math.PI;
  for (const x of [-.12, .12]) ball(.07, mat('#111111'), [x, 3.6, .3], w.pbody);
  w.smile = box(.25, .05, .05, mat('#111111'), [0, 3.35, .31], w.pbody);
  // the broom
  w.broom = group([0, 0, 0]);
  cyl(.12, .12, 6, mat('#8B5A2B'), [0, 3.5, 0], w.broom, 8);
  const bristle = cone(.8, 1.4, mat('#E8C547'), [0, .5, 0], w.broom, 10); bristle.rotation.x = Math.PI;
  w.dust = group();
  for (let i = 0; i < 12; i++) { const d = ball(.25, mat('#9A8C7A', { rough: 1 }), [0, 0, 0], w.dust); d.userData = { x: -4 + (i % 6) * 1.4, z: 4 + Math.floor(i / 6), ph: i * .1 }; d.scale.y = .5; }
  // the kid
  w.kid = group([5, 0, 4]);
  cyl(.9, 1, 3.4, mat('#22C55E'), [0, 1.7, 0], w.kid, 18); ball(.95, mat('#F2C9A0'), [0, 4.2, 0], w.kid);
  w.keyes = [-.33, .33].map(x => ball(.13, mat('#111111'), [x, 4.4, .85], w.kid));
  w.kmouth = box(.5, .12, .1, mat('#111111'), [0, 3.85, .9], w.kid);
  for (let i = 0; i < 5; i++) { const h = cone(.2, .6, mat('#3A2A1E'), [-.5 + i * .25, 5.1, 0], w.kid, 6); h.rotation.z = (i - 2) * .3; }
  // report card
  w.card = group([0, 4.4, 1.5]);
  box(3, .05, 4, mat('#FFFFFF'), [0, 0, 0], w.card);
  const a1 = box(.25, .06, 2, mat('#E0161E'), [-.4, .05, 0], w.card); a1.rotation.y = -.35;
  const a2 = box(.25, .06, 2, mat('#E0161E'), [.4, .05, 0], w.card); a2.rotation.y = .35;
  box(.8, .06, .2, mat('#E0161E'), [0, .05, .3], w.card);
  box(.6, .06, .15, mat('#E0161E'), [1.1, .05, -.6], w.card); box(.15, .06, .6, mat('#E0161E'), [1.1, .05, -.6], w.card);
  // allowance jar
  w.jar = group([-2.5, 4.25, 1]);
  cyl(.8, .8, 1.6, mat('#BFE6FF', { opacity: .4, rough: .05 }), [0, .8, 0], w.jar, 20);
  for (let i = 0; i < 5; i++) cyl(.3, .3, .08, mat('#E8C547', { metal: .9, rough: .2 }), [(i % 2) * .2 - .1, .1 + i * .1, 0], w.jar, 14);
  return w;
}

function pen(w, t, o = {}) {
  w.pencil.position.set(o.x ?? 0, o.y ?? 5, o.z ?? -1.5); w.pencil.rotation.set(0, 0, o.tilt ?? .35);
  w.pbody.position.set(o.write ? .6 * Math.sin(t * 16) : 0, o.write ? .15 * Math.abs(Math.sin(t * 32)) : 0, 0);
  w.smile.scale.x = o.grin ? 1.8 : 1;
}
function kid(w, t, o = {}) { w.kid.position.set(o.x ?? 5, 0, o.z ?? 4); w.kid.rotation.y = o.yaw ?? -.6; w.keyes.forEach(e => e.scale.setScalar(o.wide ? 1.6 : 1)); w.kmouth.rotation.z = o.frown ? .35 : 0; w.kmouth.scale.y = o.yell ? 1 + 2.5 * Math.abs(Math.sin(t * 10)) : 1; }
function base(w) { w.page.rotation.z = 0; w.card.visible = false; w.jar.visible = false; w.scrib.children.forEach(s => s.visible = true); }
const ALL = ['ground', 'room', 'book', 'pencil'];

export default {
  id: '074',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HOMEWORK THAT DOES ITSELF',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HOMEWORK', 'DID ITSELF?'],
  title: 'What would happen if homework did itself?',
  description: 'Every answer right. Every chore done. Then it asks for your allowance. (A made-up pencil with ambitions.)',
  tags: ['whatif', 'funny', 'homework', 'school', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the self-writing pencil is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if homework did itself?',
      show: ALL, sky: '#D7E3F0', lightAt: [0, 5, -1], lightDist: 16,
      cam: { pos: [5, 9, 16], look: [0, 9.5, -1.5], fov: 46, to: { pos: [4.5, 9, 14.5], look: [0, 9.5, -1.5], fov: 44 } },
      update: (w, p, t) => { base(w); pen(w, t, { write: true, x: Math.sin(t * 1.3) * 1.5, z: -1.5 + Math.sin(t * .7) }); w.scrib.children.forEach(s => s.visible = s.userData.n < 10 + t * 18); },
    },
    {
      say: 'Math? Done in one second.',
      show: [...ALL, 'kid'], sky: '#DCE6EE', lightAt: [0, 5, -1], lightDist: 16,
      cam: { pos: [-7, 11, 16], look: [1.5, 5.5, 0], fov: 50, to: { pos: [-6, 10.5, 14.5], look: [1.5, 5.5, 0], fov: 48 } },
      update: (w, p, t) => { base(w); pen(w, t, { write: true, x: Math.sin(t * 9) * 2, grin: true }); w.page.rotation.z = (t * 6) % Math.PI; kid(w, t, { wide: true }); },
    },
    {
      say: 'Then it starts doing your chores.',
      show: ['ground', 'room', 'broom', 'dust', 'kid'], sky: '#D7E3F0', lightAt: [0, 3, 4], lightDist: 16,
      cam: { pos: [2, 7, 22], look: [1.5, 3.5, 5], fov: 50, to: { pos: [2, 7, 20], look: [1.5, 3.5, 5], fov: 48 } },
      update: (w, p, t) => {
        w.broom.position.set(-3 + 2 * Math.sin(t * 3), 0, 4.5); w.broom.rotation.z = .4 * Math.sin(t * 6);
        w.dust.children.forEach(d => { const f = Math.min(1, t * .6); d.position.set(d.userData.x * (1 - f) + 4 * f, .15, d.userData.z); });
        kid(w, t, { x: 6, z: 6, yaw: -1.2, wide: true });
      },
    },
    {
      say: 'Report card? Perfect grades.',
      show: [...ALL, 'card', 'kid'], sky: '#FFF3C9', lightAt: [0, 5, 1], lightDist: 14,
      cam: { pos: [1, 11, 7], look: [0, 4.4, 1], fov: 44, to: { pos: [1, 10.5, 6], look: [0, 4.4, 1], fov: 42 } },
      update: (w, p, t) => { base(w); w.card.visible = true; pen(w, t, { x: 2.2, z: 1.5, tilt: .2 * Math.sin(t * 6), grin: true }); kid(w, t, { x: 4, z: 4.5 }); },
    },
    {
      say: 'Your parents? Proud. Of the pencil.',
      show: [...ALL, 'card', 'kid'], sky: '#FFE3C2', lightAt: [3, 4, 3], lightDist: 16,
      cam: { pos: [13, 8, 19], look: [3, 5, 2], fov: 50, to: { pos: [12, 8, 17], look: [3, 5, 2], fov: 48 } },
      update: (w, p, t) => { base(w); w.card.visible = true; pen(w, t, { x: 2.2, y: 5 + .4 * Math.abs(Math.sin(t * 5)), z: 1.5, tilt: 0, grin: true }); kid(w, t, { x: 6, z: 4, frown: true, yaw: -1 }); },
    },
    {
      say: 'Now it wants your allowance.',
      show: [...ALL, 'jar', 'kid'], sky: '#FFD9A8', lightAt: [-2, 5, 1], lightDist: 14,
      cam: { pos: [2, 9, 14], look: [0, 5, 2], fov: 50, to: { pos: [2, 9, 12.5], look: [0, 5, 2], fov: 48 } },
      update: (w, p, t) => { base(w); w.jar.visible = true; pen(w, t, { x: -1, z: 1, tilt: -.5 + .3 * Math.sin(t * 8), grin: true }); kid(w, t, { x: 3, z: 4, yell: true, yaw: -.9 }); },
    },
    {
      say: 'Smart pencil: genius, cheat, or creepy? Comment below.',
      quiz: { q: 'A pencil that does your homework is...', options: ['Genius', 'A cheat', 'Creepy'], answer: 'It is a made-up pencil, so you will have to do your own. Sorry.' },
      show: ALL, sky: '#274B73', lightAt: [0, 5, -1], lightDist: 16,
      cam: { pos: [8, 4, 12], look: [0, 11, -1.5], fov: 46, to: { pos: [-8, 4, 12], look: [0, 11, -1.5] } },
      update: (w, p, t) => { base(w); pen(w, t, { write: true }); },
    },
  ],
};

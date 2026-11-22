// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: beds do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the bed with a face.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function bed(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  const wood = mat('#A0673A', { rough: .7 });
  box(4.4, .6, 7, wood, [0, .9, 0], b.body);
  for (const x of [-2, 2]) for (const z of [-3.3, 3.3]) box(.4, .9, .4, wood, [x, .45, z], b.body);
  b.head = box(4.6, 3.6, .4, wood, [0, 2.4, -3.5], b.body);
  b.foot = box(4.6, 2.2, .4, wood, [0, 1.7, 3.5], b.body);
  b.mattress = box(4.1, .7, 6.6, mat('#F4F7FA', { rough: .9 }), [0, 1.55, 0], b.body);
  b.duvet = box(4.3, .35, 4.2, mat('#3B82F6', { rough: .9 }), [0, 2.05, 1.1], b.body);
  b.pillow = box(2.6, .55, 1.2, mat('#FFFFFF', { rough: .9 }), [0, 2.15, -2.6], b.body);
  b.face = group([0, 1.8, 3.72], b.body);
  for (const x of [-.6, .6]) { ball(.3, mat('#FFFFFF'), [x, .25, 0], b.face); ball(.15, mat('#111111'), [x, .25, .2], b.face); }
  b.brows = [-.6, .6].map(x => box(.45, .07, .05, mat('#111111'), [x, .68, .03], b.face));
  b.mouth = box(.7, .12, .05, mat('#5A1E1E'), [0, -.4, .01], b.face);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(b, a) { b.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#C79A6B', 0);
  w.wall = box(60, 30, .5, mat('#D8CCF0'), [0, 15, -6]); w.wall.castShadow = false;
  w.b = bed(k, k.scene); w.bd = w.b.root;
  w.kid = person(k, k.scene, '#FFC21F'); w.kp = w.kid.root;
  w.crumbs = group(); for (let i = 0; i < 14; i++) { const c = box(.2, .12, .2, mat(i % 2 ? '#D9A35B' : '#B9823F'), [0, 0, 0], w.crumbs); c.userData.i = i; c.castShadow = false; }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.7, .12, .1, m, [0, .3, 0], z); box(.7, .12, .1, m, [0, -.3, 0], z); const d = box(.85, .12, .1, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.moon = ball(1, mat('#FFF4C2', { glow: 1 }), [-6, 11, -5.5]); w.moon.castShadow = false;
  w.sand = cyl(12, 12, .2, mat('#F2D7A6'), [0, .1, 0], k.scene, 32);
  w.sea = box(60, .1, 20, mat('#3BA7E0', { rough: .2 }), [0, .05, -18]); w.sea.castShadow = false;
  return w;
}

const place = (w, x, z, ry, t, on = true) => { w.bd.position.set(x, 0, z); w.bd.rotation.set(0, ry, 0); w.b.body.position.set(0, 0, 0); w.b.body.scale.set(1, 1, 1); talk(w.b, t, on); };

export default {
  id: '213',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BED',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS BED', 'HAS A COMPLAINT'],
  title: 'This bed has a complaint',
  description: 'Jumped on all day. Crumbs in every corner. And the snoring, all night long. So the bed booked a holiday, for one. (A made-up comedy sketch.)',
  tags: ['funny', 'bed', 'sleep', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the U.S. Centers for Disease Control and Prevention recommends 9 to 12 hours of sleep a night for children aged 6 to 12 (CDC, "About Sleep").',
  ],
  setup,
  scenes: [
    {
      say: 'This bed has a complaint.',
      show: ['floor', 'wall', 'bd'], sky: '#D8CCF0', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [4.5, 6.5, 14], look: [0, 1.4, 0], fov: 46, to: { pos: [4.3, 6.3, 13.2], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.b, .35); },
    },
    {
      say: 'All day, kids jump on him.',
      show: ['floor', 'wall', 'bd', 'kp'], sky: '#D8CCF0', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [6, 5, 14], look: [0, 3.4, 0], fov: 50, to: { pos: [5.6, 5, 13], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, t); grump(w.b, .6); const q = (t * 1.6) % 1, h = Math.sin(q * Math.PI); w.kp.position.set(0, 2.4 + h * 3, 0); w.kp.rotation.set(0, .3, 0); w.kid.mouth.scale.y = 2.5;
        const sq = q < .12 || q > .88 ? 1 : 0; w.b.mattress.scale.y = 1 - .3 * sq; w.b.body.position.y = -.1 * sq; w.kp.position.y -= .2 * sq;
      },
    },
    {
      say: 'Crumbs in every corner. Gross.',
      show: ['floor', 'wall', 'bd', 'crumbs'], sky: '#D8CCF0', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [4.5, 6.5, 14], look: [0, 1.4, 0], fov: 46, to: { pos: [4.3, 6.3, 13.2], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.b, -.3); w.b.mouth.scale.y = 2.4; w.crumbs.children.forEach(c => { const i = c.userData.i; c.position.set(Math.cos(i * 2.3) * 1.8, 2.28 + .05 * Math.sin(t * 5 + i), -2 + (i % 7) * .9); c.rotation.y = i; c.visible = i < 2 + p * 13; }); },
    },
    {
      say: 'And all night? Snoring.',
      show: ['floor', 'wall', 'bd', 'kp', 'zz', 'moon'], sky: '#1E2A4A', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [4.5, 6.5, 14], look: [0, 1.4, 0], fov: 46, to: { pos: [4.3, 6.3, 13.2], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, t); grump(w.b, .6); w.b.body.position.y = .04 * Math.sin(t * 6); w.kp.position.set(0, 2.3, -1.6); w.kp.rotation.set(-Math.PI / 2, 0, 0); w.kid.mouth.scale.y = 1 + Math.abs(Math.sin(t * 3));
        w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(.8 + q * 1.6, 4 + q * 3, -2); z.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'So he booked a holiday. For one.',
      show: ['bd', 'sand', 'sea'], sky: '#7EC8F0', lightAt: [0, 7, 4], lightDist: 24,
      cam: { pos: [4.5, 6.5, 14], look: [0, 1.4, 0], fov: 46, to: { pos: [4.3, 6.3, 13.2], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t, false); w.b.body.position.y = .2; w.b.mouth.scale.y = 1.6; grump(w.b, -.35); w.bd.rotation.z = .03 * Math.sin(t * 2); },
    },
    {
      say: 'Grumpy bed: make it, rest it, or let it sleep? Comment below.',
      quiz: { q: 'What do you do with the grumpy bed?', options: ['Make it', 'Rest it', 'Let it sleep'], answer: 'Fun fact: doctors say kids aged 6 to 12 need 9 to 12 hours of sleep a night.' },
      show: ['floor', 'wall', 'bd'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [8, 6.5, 13], look: [0, 1.6, 0], fov: 46, to: { pos: [-8, 6.5, 13], look: [0, 1.6, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, t, false); grump(w.b, -.2); },
    },
  ],
};

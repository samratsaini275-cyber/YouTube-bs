// Narrative 8: "Objects With Opinions". A made-up comedy sketch: fridges do not talk; the leftover only wobbles.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the fridge with a face in a kitchen.

function fridge(k, parent) {
  const { mat, box, ball, group } = k;
  const f = { root: group([0, 0, 0], parent) };
  const white = mat('#EEF3F6', { rough: .3 });
  box(3, 6.4, .2, white, [0, 3.2, -1.2], f.root);
  for (const x of [-1.45, 1.45]) box(.1, 6.4, 2.5, white, [x, 3.2, 0], f.root);
  box(3, .1, 2.5, white, [0, 6.35, 0], f.root); box(3, .3, 2.5, white, [0, .15, 0], f.root);
  box(2.8, 6, .05, mat('#FFFDE8', { glow: .4 }), [0, 3.2, -1.08], f.root);
  for (const y of [1.6, 3.2, 4.8]) box(2.8, .06, 2.3, mat('#CFE8F2'), [0, y, 0], f.root);
  f.food = group([0, 0, 0], f.root);
  box(.7, .9, .6, mat('#3BA4E8'), [-.8, 3.68, .2], f.food); box(.5, 1.1, .5, mat('#F5F5F5'), [.1, 3.78, .4], f.food);
  box(.8, .5, .6, mat('#FFB020'), [.85, 5.08, .3], f.food); ball(.35, mat('#E2453C'), [-.7, 5.18, .4], f.food);
  f.blob = group([.5, 1.63, -.6], f.root);
  box(.9, .5, .7, mat('#9BCF7A', { rough: .9 }), [0, .25, 0], f.blob);
  for (const x of [-.18, .18]) { ball(.09, mat('#FFFFFF'), [x, .38, .36], f.blob); ball(.045, mat('#111111'), [x, .38, .43], f.blob); }
  f.door = group([1.5, 0, 1.3], f.root);
  box(3, 6.4, .25, white, [-1.5, 3.2, 0], f.door);
  box(.15, 1.6, .15, mat('#9AA5AD'), [-2.7, 3.6, .2], f.door);
  for (const x of [-1.95, -1.05]) { ball(.3, mat('#FFFFFF'), [x, 4.9, .15], f.door); ball(.15, mat('#111111'), [x, 4.9, .38], f.door); }
  f.mouth = box(.7, .1, .05, mat('#5A1E1E'), [-1.5, 4.1, .14], f.door);
  return f;
}
function talk(f, t, on = true) { f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#D9D2C5', 0);
  w.room = group();
  box(40, 20, .5, mat('#F6D9A8'), [0, 10, -3], w.room);
  box(5, 3.4, 2.4, mat('#7A9CB8'), [-4.4, 1.7, -1.2], w.room); box(5, .2, 2.5, mat('#E8E2D6'), [-4.4, 3.5, -1.2], w.room);
  w.f = fridge(k, k.scene); w.fr = w.f.root;
  w.person = group([0, 0, 0]);
  cyl(.85, .9, 2.6, mat('#2F6FD6'), [0, 1.3, 0], w.person, 14); w.head = ball(.85, mat('#F2C9A0'), [0, 3.4, 0], w.person);
  w.count = group();
  for (let i = 0; i < 6; i++) box(.12, .7, .05, mat('#E2453C', { glow: 1 }), [i * .3 - .75, 0, 0], w.count).rotation.z = i === 4 ? 1.2 : 0;
  w.qm = group();
  for (let i = 0; i < 3; i++) { const q = ball(.2, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.qm); q.userData.i = i; q.castShadow = false; }
  return w;
}

const idle = (w) => { w.fr.position.set(0, 0, 0); w.fr.rotation.set(0, -.25, 0); w.f.blob.rotation.set(0, 0, 0); w.f.blob.position.x = .5; };

export default {
  id: '137',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FRIDGE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS FRIDGE', 'HAS A COMPLAINT.'],
  title: 'This fridge has a complaint',
  description: 'Opened forty times a day. Stared into. Closed again. And something in the back is moving. (A made-up talking fridge.)',
  tags: ['objectswithopinions', 'funny', 'fridge', 'kitchen', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking fridges are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This fridge has a complaint.',
      show: ['ground', 'room', 'fr'], sky: '#F6D9A8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.5, 2.6, 14], look: [0, 5.4, 0], fov: 46, to: { pos: [1.3, 2.6, 13], look: [0, 5.3, 0], fov: 44 } },
      update: (w, p, t) => { idle(w); w.f.door.rotation.y = 0; talk(w.f, t, t > .2); },
    },
    {
      say: 'People open him forty times a day. Just to stare.',
      show: ['ground', 'room', 'fr', 'person'], sky: '#F6D9A8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [-3, 4.5, 11.5], look: [.4, 4.2, 0], fov: 50, to: { pos: [-5.4, 4.5, 10], look: [0, 4.2, 0], fov: 48 } },
      update: (w, p, t) => {
        idle(w); w.f.door.rotation.y = Math.min(1.9, Math.max(0, (t - .3) * 2.5)); talk(w.f, t);
        w.person.position.set(-2.1, 0, 2.6); w.person.rotation.y = Math.PI - .6; w.head.position.z = -.15 * Math.sin(t * 2);
              },
    },
    {
      say: 'Then they close him. Nothing new appeared.',
      show: ['ground', 'room', 'fr', 'person', 'qm'], sky: '#F6D9A8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [-3, 4, 11], look: [0, 5, 0], fov: 50, to: { pos: [-2.6, 4, 10], look: [0, 5, 0], fov: 48 } },
      update: (w, p, t) => {
        idle(w); w.f.door.rotation.y = Math.max(0, 1.9 - t * 1.6); talk(w.f, t);
        w.person.position.set(-2.2, 0, 3.4); w.person.rotation.y = .4 * Math.sin(t * 2); w.head.position.z = 0;
        w.qm.children.forEach(q => { const s = (t * .7 + q.userData.i / 3) % 1; q.position.set(-2.2 + (q.userData.i - 1) * .6, 4.6 + s * 1.4, 3.4); q.scale.setScalar(1 - s * .5); });
      },
    },
    {
      say: 'And something in the back is three weeks old. It moved.',
      show: ['ground', 'room', 'fr'], sky: '#2E3A2A', lightAt: [0, 3, 3], lightDist: 9,
      cam: { pos: [.6, 2.6, 5], look: [.4, 2.6, -.4], fov: 46, to: { pos: [.5, 2.3, 4], look: [.4, 2.3, -.4], fov: 42 } },
      shake: (t) => t > 1.4 ? .02 : 0,
      update: (w, p, t) => {
        idle(w); w.f.door.rotation.y = 1.9; talk(w.f, t, false);
        w.f.blob.rotation.z = t > 1.4 ? .18 * Math.sin(t * 16) : 0; w.f.blob.position.x = .5 + (t > 2.2 ? Math.min(.5, (t - 2.2) * .4) : 0);
      },
    },
    {
      say: 'Fridge: food, snacks, or a place to stare? Comment below.',
      quiz: { q: 'What do you open the fridge for?', options: ['Food', 'Snacks', 'Just to stare'], answer: 'This fridge is made up. Please clean the back.' },
      show: ['ground', 'room', 'fr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.5, 1.8, 12], look: [0, 6.6, 0], fov: 46, to: { pos: [-1.5, 1.8, 12], look: [0, 6.6, 0] } },
      update: (w, p, t) => { idle(w); w.f.door.rotation.y = 0; talk(w.f, t, false); },
    },
  ],
};

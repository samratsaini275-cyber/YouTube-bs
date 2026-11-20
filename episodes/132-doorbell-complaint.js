// Narrative 8: "Objects With Opinions". A made-up comedy sketch: doorbells do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the doorbell with a face beside a front door.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.house = group();
  box(16, 10, .5, mat('#E8C9A0'), [0, 5, -1], w.house);
  w.door = box(3, 6, .2, mat('#2F6FD6'), [-1, 3, -.65], w.house);
  ball(.15, mat('#D4AF37', { metal: .8 }), [.2, 3, -.5], w.house);
  w.win = box(3, 2.4, .1, mat('#FFE9A8', { glow: 0 }), [4, 5.5, -.7], w.house);
  box(4, .2, 2, mat('#9AA3AE'), [-1, .1, .4], w.house);
  // the doorbell
  w.bell = group([1.4, 4, -.5]);
  box(1.2, 2, .3, mat('#F4F1E8'), [0, 0, 0], w.bell);
  w.btn = cyl(.35, .35, .2, mat('#FFD21F', { glow: .2 }), [0, -.4, .2], w.bell, 18); w.btn.rotation.x = Math.PI / 2;
  for (const x of [-.25, .25]) { ball(.15, mat('#FFFFFF'), [x, .55, .18], w.bell); ball(.07, mat('#111111'), [x, .55, .3], w.bell); }
  w.mouth = box(.35, .06, .04, mat('#5A1E1E'), [0, .2, .18], w.bell);
  w.kid = group([0, 0, 0]);
  w.kbody = group([0, 0, 0], w.kid);
  cyl(.6, .7, 2.2, mat('#E2453C'), [0, 1.1, 0], w.kbody, 12); ball(.65, mat('#F2C9A0'), [0, 2.75, 0], w.kbody);
  w.karm = group([0, 2, 0], w.kid); cyl(.12, .12, 1.2, mat('#E2453C'), [0, .6, 0], w.karm, 6);
  w.note = group([0, 0, 0]); box(1, 1.2, .04, mat('#FFFFFF'), [0, 0, 0], w.note); for (let i = 0; i < 3; i++) box(.7, .07, .05, mat('#333333'), [0, .3 - i * .25, .01], w.note);
  w.box = box(1.4, 1, 1.4, mat('#C9A27A'), [0, 0, 0], k.scene);
  w.rings = group();
  for (let i = 0; i < 3; i++) { const r = k.torus(.5, .05, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.rings); r.userData.i = i; r.castShadow = false; }
  w.moon = ball(.7, mat('#FFF6C2', { glow: 2 }), [-5, 9, -.6], k.scene); w.moon.castShadow = false;
  return w;
}
function talk(w, t, on = true) { w.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function ringFx(w, t, on) { w.rings.children.forEach(r => { const f = (t * 2 + r.userData.i / 3) % 1; r.visible = on; r.position.set(1.4, 4, -.2); r.rotation.x = Math.PI / 2; r.scale.setScalar(.6 + f * 1.6); }); }

export default {
  id: '132',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DOORBELL WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS DOORBELL', 'HAS A COMPLAINT.'],
  title: 'This doorbell has a complaint',
  description: 'Kids ring him and run. Delivery drivers never ring at all. So at night, he rings himself. (A made-up talking doorbell.)',
  tags: ['objectswithopinions', 'funny', 'doorbell', 'home', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking doorbells are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This doorbell has a complaint.',
      show: ['ground', 'house', 'bell'], sky: '#9ED2F3', lightAt: [1, 4, 2], lightDist: 10,
      cam: { pos: [2.5, 3.2, 9.5], look: [1.3, 5.8, -.5], fov: 44, to: { pos: [2.4, 3.2, 8.8], look: [1.3, 5.7, -.5], fov: 42 } },
      update: (w, p, t) => { talk(w, t, t > .2); ringFx(w, t, false); w.btn.position.z = .2; },
    },
    {
      say: 'Kids ring him, then run away.',
      show: ['ground', 'house', 'bell', 'kid', 'rings'], sky: '#9ED2F3', lightAt: [1, 4, 2], lightDist: 14,
      cam: { pos: [5, 4, 11], look: [1, 3.4, 0], fov: 50, to: { pos: [4.6, 4, 10], look: [1, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        talk(w, t); const press = t > .6 && t < 1; w.btn.position.z = press ? .1 : .2; ringFx(w, t, t > .6);
        const run = Math.max(0, t - 1); w.kid.position.set(1.6 + run * 4, 0, 1.2 + run * 1.5); w.kid.rotation.y = run > 0 ? Math.PI / 2 + .3 : Math.PI; w.karm.rotation.x = press ? -1.6 : -.2; w.kbody.rotation.z = run > 0 ? .15 * Math.sin(t * 20) : 0;
      },
    },
    {
      say: 'Delivery drivers never press him. They just leave a note.',
      show: ['ground', 'house', 'bell', 'note', 'box'], sky: '#9ED2F3', lightAt: [1, 4, 2], lightDist: 12,
      cam: { pos: [3, 4, 8], look: [0, 3, -.5], fov: 48, to: { pos: [2.8, 4, 7.2], look: [0, 3, -.5], fov: 46 } },
      update: (w, p, t) => { talk(w, t); ringFx(w, t, false); w.btn.position.z = .2; w.note.position.set(-1, 3.6, -.5); w.note.rotation.z = .1; w.box.position.set(-1.6, .7, .9); w.box.visible = t > .6; },
    },
    {
      say: 'So at night, he rings himself. Just for fun.',
      show: ['ground', 'house', 'bell', 'rings', 'moon'], sky: '#1E2440', lightAt: [1, 4, 2], lightDist: 12,
      cam: { pos: [4, 4.5, 10], look: [1.5, 4.6, -.5], fov: 48, to: { pos: [3.7, 4.5, 9], look: [1.5, 4.6, -.5], fov: 46 } },
      update: (w, p, t) => { talk(w, t, t < 1.8); const on = Math.sin(t * 6) > 0; w.btn.position.z = on ? .1 : .2; ringFx(w, t, on); w.win.material.emissiveIntensity = t > 1 ? 1.5 : 0; },
    },
    {
      say: 'Doorbell: ding, dong, or a knock? Comment below.',
      quiz: { q: 'Which is better?', options: ['Ding', 'Dong', 'A knock'], answer: 'This doorbell is made up. He says ding.' },
      show: ['ground', 'house', 'bell'], sky: '#274B73', lightAt: [1, 4, 2], lightDist: 10,
      cam: { pos: [2.5, 2.4, 6], look: [1.3, 6, -.5], fov: 44, to: { pos: [.5, 2.4, 6], look: [1.3, 6, -.5] } },
      update: (w, p, t) => { talk(w, t, false); ringFx(w, t, false); w.btn.position.z = .2; w.win.material.emissiveIntensity = 0; },
    },
  ],
};

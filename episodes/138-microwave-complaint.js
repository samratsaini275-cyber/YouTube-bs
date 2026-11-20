// Narrative 8: "Objects With Opinions". A made-up comedy sketch: microwaves do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the microwave with a face on a counter.

function microwave(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const m = { root: group([0, 3.6, 0], parent) };
  box(3.2, 1.9, 2.1, mat('#D7DCE0', { rough: .4 }), [0, .95, 0], m.root);
  m.win = box(1.9, 1.3, .05, mat('#2A2F35', { rough: .2 }), [-.5, .95, 1.06], m.root);
  m.glow = box(1.75, 1.15, .05, mat('#FFC870', { glow: 1.2 }), [-.5, .95, 1.07], m.root); m.glow.visible = false;
  m.plate = cyl(.55, .55, .08, mat('#F2F2F2'), [-.5, .45, .2], m.root, 20);
  m.food = box(.5, .25, .4, mat('#E2853C'), [0, .17, 0], m.plate);
  box(.8, 1.7, .05, mat('#B9C0C6'), [1.1, .95, 1.06], m.root);
  m.display = box(.6, .22, .05, mat('#22E06B', { glow: 1.5 }), [1.1, 1.55, 1.09], m.root);
  for (const x of [.9, 1.3]) { ball(.15, mat('#FFFFFF'), [x, 1.15, 1.12], m.root); m['eye' + x] = ball(.075, mat('#111111'), [x, 1.15, 1.25], m.root); }
  m.mouth = box(.4, .06, .05, mat('#5A1E1E'), [1.1, .7, 1.1], m.root);
  return m;
}
function talk(m, t, on = true) { m.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#CFC6B6', 0);
  w.room = group();
  box(40, 20, .5, mat('#BFD9C8'), [0, 10, -2], w.room);
  box(12, 3.4, 2.6, mat('#8C6A4A'), [0, 1.7, 0], w.room); box(12.2, .2, 2.8, mat('#ECE6DA'), [0, 3.5, 0], w.room);
  w.m = microwave(k, k.scene); w.mw = w.m.root;
  w.person = group([0, 0, 0]);
  cyl(.85, .9, 2.6, mat('#2F6FD6'), [0, 1.3, 0], w.person, 14); ball(.85, mat('#F2C9A0'), [0, 3.4, 0], w.person);
  w.person2 = group([0, 0, 0]);
  cyl(.85, .9, 2.6, mat('#D6452F'), [0, 1.3, 0], w.person2, 14); ball(.85, mat('#C99A70'), [0, 3.4, 0], w.person2);
  w.stink = group();
  for (let i = 0; i < 6; i++) { const s = ball(.22, mat('#8BCB4A', { glow: .6 }), [0, 0, 0], w.stink); s.userData.i = i; s.castShadow = false; }
  w.fish = group(); const fb = ball(.3, mat('#9FB4C0'), [0, 0, 0], w.fish); fb.scale.set(1.6, .7, .8);
  return w;
}

const base = (w, t) => { w.m.plate.rotation.y = t * 1.5; };

export default {
  id: '138',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE MICROWAVE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS MICROWAVE', 'HAS A COMPLAINT.'],
  title: 'This microwave has a complaint',
  description: 'Stared at like a TV. Stopped at one second, every time. And then the office fish. (A made-up talking microwave.)',
  tags: ['objectswithopinions', 'funny', 'microwave', 'kitchen', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking microwaves are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This microwave has a complaint.',
      show: ['ground', 'room', 'mw'], sky: '#BFD9C8', lightAt: [0, 6, 4], lightDist: 12,
      cam: { pos: [1.2, 4.4, 8], look: [.4, 4.95, 0], fov: 44, to: { pos: [1.1, 4.4, 7.2], look: [.4, 4.85, 0], fov: 42 } },
      update: (w, p, t) => { base(w, t); w.m.glow.visible = false; talk(w.m, t, t > .2); },
    },
    {
      say: 'People stare at him the whole time. Like a TV.',
      show: ['ground', 'room', 'mw', 'person'], sky: '#BFD9C8', lightAt: [0, 6, 4], lightDist: 12,
      cam: { pos: [-3.5, 5.6, 9.5], look: [0, 4.6, 0], fov: 50, to: { pos: [-3.2, 5.6, 8.7], look: [0, 4.6, 0], fov: 48 } },
      update: (w, p, t) => { base(w, t); w.m.glow.visible = true; talk(w.m, t); w.person.position.set(-1.3, 0, 3.4); w.person.rotation.y = Math.PI; },
    },
    {
      say: 'They stop him at one second. He never gets to beep.',
      show: ['ground', 'room', 'mw', 'person'], sky: '#BFD9C8', lightAt: [0, 6, 4], lightDist: 12,
      cam: { pos: [2, 4.6, 6.5], look: [.6, 4.1, 0], fov: 44, to: { pos: [1.8, 4.6, 5.8], look: [.6, 4.1, 0], fov: 42 } },
      update: (w, p, t) => {
        const on = t < 1.2; base(w, on ? t : 1.2); w.m.glow.visible = on; w.m.display.visible = on || Math.floor(t * 3) % 2 === 0; talk(w.m, t, t > 1.4);
        w.person.position.set(-2.2, 0, 3); w.person.rotation.y = Math.PI - .4;
      },
    },
    {
      say: 'And at the office, someone heats up fish. Every day.',
      show: ['ground', 'room', 'mw', 'stink'], sky: '#9FB59A', lightAt: [0, 6, 4], lightDist: 12,
      cam: { pos: [3, 5, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [2.6, 5, 7.2], look: [0, 4.4, 0], fov: 46 } },
      shake: (t) => t > 1.5 ? .02 : 0,
      update: (w, p, t) => {
        base(w, t); w.m.glow.visible = true; w.m.food.visible = false; talk(w.m, t, t < 1.5);
        w.fish.position.set(-.5, 4.25, .2); w.fish.rotation.y = t * 1.5;
        w.person2.position.set(-3.6, 0, 2.6); w.person2.rotation.y = Math.PI - .7;
        w.stink.children.forEach(s => { const q = (t * .6 + s.userData.i / 6) % 1; s.position.set(-.5 + Math.sin(q * 9 + s.userData.i) * .6, 5.6 + q * 2.2, .9); s.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'Microwave: popcorn, leftovers, or a beep? Comment below.',
      quiz: { q: 'What goes in the microwave?', options: ['Popcorn', 'Leftovers', 'Never fish'], answer: 'This microwave is made up. Let him beep.' },
      show: ['ground', 'room', 'mw'], sky: '#274B73', lightAt: [0, 6, 4], lightDist: 12,
      cam: { pos: [1.2, 3.4, 8], look: [.4, 5.4, 0], fov: 44, to: { pos: [-1.2, 3.4, 8], look: [.4, 5.4, 0] } },
      update: (w, p, t) => { base(w, t); w.m.glow.visible = false; w.m.food.visible = true; talk(w.m, t, false); },
    },
  ],
};

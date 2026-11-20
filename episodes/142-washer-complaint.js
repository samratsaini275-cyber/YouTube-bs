// Narrative 8: "Objects With Opinions" (finale). A made-up comedy sketch: washing machines do not talk.
// Calls back to 123 (the sock with a complaint). Hook rule: first line names the object, under 2 s.

function washer(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const m = { root: group([0, 0, 0], parent) };
  m.body = group([0, 0, 0], m.root);
  box(3, 3.6, 3, mat('#F2F4F6', { rough: .35 }), [0, 1.8, 0], m.body);
  box(3, .9, .06, mat('#D5DCE2'), [0, 3.15, 1.52], m.body);
  for (const x of [-.5, .5]) { ball(.24, mat('#FFFFFF'), [x, 3.2, 1.6], m.body); ball(.12, mat('#111111'), [x, 3.2, 1.8], m.body); }
  m.mouth = box(.6, .07, .05, mat('#5A1E1E'), [0, 2.85, 1.58], m.body);
  ball(.15, mat('#9AA5AD'), [1.15, 3.15, 1.56], m.body);
  m.drum = group([0, 1.5, 1.45], m.body);
  const c1 = box(1.1, .35, .05, mat('#E2453C'), [0, .2, 0], m.drum); const c2 = box(.7, .3, .05, mat('#3B82F6'), [.1, -.25, 0], m.drum); c2.rotation.z = .6;
  box(.4, .4, .05, mat('#FFD21F'), [-.35, -.15, .01], m.drum);
  m.door = group([-1.1, 1.5, 1.52], m.body);
  const ring = cyl(1.1, 1.1, .12, mat('#B9C0C6'), [1.1, 0, .06], m.door, 28); ring.rotation.x = Math.PI / 2;
  const glass = cyl(.88, .88, .14, mat('#9FD3EE', { rough: .05, glow: .15 }), [1.1, 0, .07], m.door, 28); glass.rotation.x = Math.PI / 2; m.glass = glass;
  return m;
}
function talk(m, t, on = true) { m.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#C8D3DA', 0);
  w.room = group();
  box(40, 20, .5, mat('#D8EEF0'), [0, 10, -3], w.room);
  w.m = washer(k, k.scene); w.wa = w.m.root;
  w.pile = group();
  const cols = ['#E2453C', '#22C55E', '#8B5CF6', '#F97316', '#06B6D4', '#EC4899', '#FFD21F', '#3B82F6'];
  for (let i = 0; i < 10; i++) { const c = box(1.2 - (i % 3) * .2, .3, .9, mat(cols[i % 8], { rough: .9 }), [0, 0, 0], w.pile); c.userData.i = i; }
  w.socks = group();
  for (let i = 0; i < 18; i++) { const s = group([0, 0, 0], w.socks); box(.25, .6, .2, mat(cols[i % 8], { rough: .9 }), [0, .3, 0], s); box(.25, .2, .4, mat(cols[i % 8], { rough: .9 }), [0, .1, .1], s); s.userData.i = i; }
  return w;
}

const home = (w, t) => { w.wa.position.set(0, 0, 0); w.wa.rotation.set(0, -.2, 0); w.m.body.scale.set(1, 1, 1); w.m.body.rotation.set(0, 0, 0); w.m.door.rotation.y = 0; w.m.drum.rotation.z = t * 2; };

export default {
  id: '142',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WASHER WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS WASHER', 'HAS A COMPLAINT.'],
  title: 'This washer has a complaint',
  description: 'Stuffed with a week of laundry. Spins so hard he walks. And yes, he has your missing socks. (A made-up talking washing machine.)',
  tags: ['objectswithopinions', 'funny', 'washingmachine', 'socks', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking washing machines are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This washer has a complaint.',
      show: ['ground', 'room', 'wa'], sky: '#D8EEF0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 2.4, 9], look: [0, 3.75, 0], fov: 44, to: { pos: [.9, 2.4, 8.2], look: [0, 3.65, 0], fov: 42 } },
      update: (w, p, t) => { home(w, t); talk(w.m, t, t > .2); },
    },
    {
      say: 'People stuff him with a whole week of laundry.',
      show: ['ground', 'room', 'wa', 'pile'], sky: '#D8EEF0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [4, 3.6, 9], look: [0, 2.4, 0], fov: 50, to: { pos: [3.6, 3.6, 8.2], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => {
        home(w, 0); talk(w.m, t); const b = Math.min(1, t / 2.4); w.m.body.scale.set(1 + .12 * b, 1 + .06 * b, 1 + .12 * b);
        w.pile.children.forEach(c => { const i = c.userData.i; const q = Math.min(1, Math.max(0, t * 3 - i * .7)); c.visible = q < 1; c.position.set(Math.sin(i) * .3, 5.5 - q * 4, 3 - q * 1.5); c.rotation.z = i * .7 + t; });
      },
    },
    {
      say: 'Then he spins so hard, he walks across the room.',
      show: ['ground', 'room', 'wa'], sky: '#D8EEF0', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1, 3.6, 11], look: [0, 2.4, 0], fov: 50, to: { pos: [1, 3.6, 10.4], look: [1, 2.4, 0], fov: 48 } },
      shake: (t) => .03,
      update: (w, p, t) => {
        home(w, 0); w.m.drum.rotation.z = t * 20; talk(w.m, t);
        w.wa.position.x = -1.5 + t * 1.1; w.m.body.rotation.z = .05 * Math.sin(t * 25); w.m.body.position.y = .08 * Math.abs(Math.sin(t * 25));
      },
    },
    {
      say: 'And yes. He has your missing socks. All of them.',
      show: ['ground', 'room', 'wa', 'socks'], sky: '#FFE3C2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2, 3, 9.5], look: [0, 2.6, 0], fov: 50, to: { pos: [1.8, 3, 8.6], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => {
        home(w, t); w.m.body.position.y = 0; talk(w.m, t, t < 1 || t > 1.6);
        w.m.door.rotation.y = -Math.min(1.9, Math.max(0, (t - 1) * 3));
        w.socks.children.forEach(s => { const i = s.userData.i; const q = Math.min(1, Math.max(0, (t - 1.2 - i * .06) * 1.6)); s.visible = q > 0; const a = i * 2.39; s.position.set(Math.cos(a) * q * (1 + (i % 4) * .4), 1.5 * (1 - q) + .02, 1.6 + q * (1.4 + (i % 3) * .5) + Math.sin(a) * q * .4); s.rotation.set(q * (i % 2 ? 1.57 : 0), a, 0); });
      },
    },
    {
      say: 'Missing socks: lost, eaten, or in the washer? Comment below.',
      quiz: { q: 'Where do missing socks go?', options: ['Lost', 'Eaten', 'In the washer'], answer: 'This washer is made up. The socks are still missing.' },
      show: ['ground', 'room', 'wa'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.4, 9], look: [0, 4.6, 0], fov: 44, to: { pos: [-1, 1.4, 9], look: [0, 4.6, 0] } },
      update: (w, p, t) => { home(w, t); talk(w.m, t, false); },
    },
  ],
};

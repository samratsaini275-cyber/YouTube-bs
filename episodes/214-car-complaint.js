// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: cars do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the car with a face.

function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}
function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}

function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function brows(k, c) { c.brows = [-.6, .6].map(z => k.box(.06, .07, .5, k.mat('#111111'), [2.22, 1.72, z], c.body)); }
function grump(c, a) { c.brows.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.road = k.ground('#5E6670', 0);
  w.lines = group(); for (let i = -8; i <= 8; i++) { const l = box(1.6, .02, .2, mat('#FFFFFF'), [i * 3, .02, 0], w.lines); l.castShadow = false; }
  w.c = car(k, k.scene); w.cr = w.c.root; brows(k, w.c);
  w.queue = group(); ['#3B82F6', '#22C55E', '#FFC21F', '#A855F7'].forEach((col, i) => { const g = group([-6 - i * 5.2, 0, 0], w.queue); box(4.4, 1.1, 2.2, mat(col, { rough: .3 }), [0, 1, 0], g); box(2.4, 1, 2, mat(col, { rough: .3 }), [-.3, 2, 0], g); for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], g, 14); wh.rotation.x = Math.PI / 2; } });
  w.front = group([6.2, 0, 0]); box(4.4, 1.1, 2.2, mat('#F97316', { rough: .3 }), [0, 1, 0], w.front); box(2.4, 1, 2, mat('#F97316', { rough: .3 }), [-.3, 2, 0], w.front); for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], w.front, 14); wh.rotation.x = Math.PI / 2; }
  w.crisps = group(); for (let i = 0; i < 12; i++) { const c = ball(.18, mat('#FFC21F'), [0, 0, 0], w.crisps); c.scale.set(1, .25, .8); c.userData.i = i; c.castShadow = false; }
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.prints = group(); for (let i = 0; i < 6; i++) { const p = ball(.16, mat('#C8D3DA', { glow: .2 }), [0, 0, 0], w.prints); p.scale.set(.2, 1, 1); p.userData.i = i; p.castShadow = false; }
  w.sand = cyl(14, 14, .2, mat('#F2D7A6'), [0, .1, 0], k.scene, 32);
  w.sea = box(80, .1, 20, mat('#3BA7E0', { rough: .2 }), [0, .05, -18]); w.sea.castShadow = false;
  w.um = group(); cyl(.08, .08, 5, mat('#FFFFFF'), [0, 2.5, 0], w.um, 8); k.cone(2.4, 1, mat('#22C55E'), [0, 5.2, 0], w.um, 16);
  return w;
}

const drive = (w, x, z, ry, t, on = true) => { w.cr.position.set(x, 0, z); w.cr.rotation.set(0, ry, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.position.set(0, 0, 0); talk(w.c, t, on); };

export default {
  id: '214',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAR',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CAR', 'HAS A COMPLAINT'],
  title: 'This car has a complaint',
  description: 'Stuck in traffic every morning. Crisps in every seat. Nose prints on every window. So the car drove himself to the beach. (A made-up comedy sketch.)',
  tags: ['funny', 'car', 'traffic', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the first Ford Model T went on sale in 1908 (Encyclopaedia Britannica, "Model T").',
  ],
  setup,
  scenes: [
    {
      say: 'This car has a complaint.',
      show: ['road', 'lines', 'cr'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [9, 2.2, 4.5], look: [0, 1.6, 0], fov: 46, to: { pos: [8.2, 2.2, 4.1], look: [0, 1.6, 0], fov: 44 } },
      update: (w, p, t) => { drive(w, 0, 0, -.35, t); grump(w.c, .35); },
    },
    {
      say: 'Every morning, traffic. Again.',
      show: ['road', 'lines', 'cr', 'queue', 'front'], sky: '#B8C4CE', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [9, 6, 13], look: [1.2, 1.4, 0], fov: 50, to: { pos: [8.4, 5.8, 12], look: [1.2, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { drive(w, 0, 0, 0, t); grump(w.c, .6); w.c.body.position.y = .03 * Math.sin(t * 20); w.queue.children.forEach((g, i) => g.position.y = .03 * Math.sin(t * 20 + i)); },
    },
    {
      say: 'Crisps in every seat. Every single one.',
      show: ['road', 'lines', 'cr', 'crisps'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [8, 5.6, 6], look: [.4, 1.0, 0], fov: 50, to: { pos: [7.4, 5.4, 5.5], look: [.4, 1.0, 0], fov: 48 } },
      update: (w, p, t) => { drive(w, 0, 0, -.35, t); grump(w.c, -.3); w.c.mouth.scale.y = 2.4; w.crisps.children.forEach(c => { const i = c.userData.i, q = (t * .9 + i / 12) % 1; c.position.set(-.3 + Math.cos(i * 2.1) * .9, 2.6 + Math.sin(q * Math.PI) * 1.6, Math.sin(i * 2.1) * .8); c.rotation.set(i, t * 3 + i, 0); }); },
    },
    {
      say: 'And the dog? Nose prints. Everywhere.',
      show: ['road', 'lines', 'cr', 'dg', 'prints'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 3, 9], look: [0, 2, 0], fov: 46, to: { pos: [1.9, 3, 8.2], look: [0, 2, 0], fov: 44 } },
      update: (w, p, t) => {
        drive(w, 0, 0, 0, t); grump(w.c, .6); w.dg.position.set(-.3, 1.5, 0); w.dg.rotation.y = Math.PI / 2 + .4; w.dg.scale.setScalar(.7);
        w.prints.children.forEach(pr => { const i = pr.userData.i; pr.visible = i < 1 + p * 6; pr.position.set(-.9 + (i % 3) * .55, 1.8 + Math.floor(i / 3) * .4, 1.04); pr.rotation.y = Math.PI / 2; });
      },
    },
    {
      say: 'So today, he drove himself. To the beach.',
      show: ['cr', 'sand', 'sea', 'um'], sky: '#7EC8F0', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [10, 2.6, 5.5], look: [0, 1.2, 0], fov: 46, to: { pos: [9.2, 2.6, 5.1], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { drive(w, -1 + p * 1.5, 0, -.35, t, false); w.c.mouth.scale.y = 1.6; grump(w.c, -.35); w.c.wheels.forEach(wh => wh.rotation.y = t * 6); w.um.position.set(-3, 0, -3); },
    },
    {
      say: 'Grumpy car: drive it, wash it, or let it park? Comment below.',
      quiz: { q: 'What do you do with the grumpy car?', options: ['Drive it', 'Wash it', 'Let it park'], answer: 'Fun fact: the famous Ford Model T first went on sale in 1908.' },
      show: ['road', 'lines', 'cr'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [9, 3, 6], look: [0, 1.4, 0], fov: 46, to: { pos: [-9, 3, 6], look: [0, 1.4, 0] } },
      update: (w, p, t) => { drive(w, 0, 0, 0, t, false); grump(w.c, -.2); },
    },
  ],
};

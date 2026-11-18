// Narrative 7: "Animals at Work". A made-up comedy sketch: beavers are not carpenters.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the beaver in a tool belt next to a wooden chair.

function beaver(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#7A4E2E', { rough: .85 }), light = mat('#B0825A', { rough: .85 });
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  const bd = ball(1.2, fur, [0, 1.6, 0], b.body); bd.scale.set(.95, 1.25, .9);
  ball(.8, light, [0, 1.4, .5], b.body).scale.set(1, 1.2, .6);
  box(2.1, .3, 1.9, mat('#5A3A1E'), [0, 1, 0], b.body);
  for (const x of [-.6, .2, .7]) box(.2, .5, .15, mat('#9AA3AE', { metal: .7 }), [x, .8, .95], b.body);
  b.head = group([0, 3.2, .2], b.body);
  ball(.75, fur, [0, 0, 0], b.head);
  ball(.38, light, [0, -.2, .55], b.head).scale.set(1.2, .8, .8);
  ball(.12, mat('#2A1A10'), [0, -.05, .9], b.head);
  for (const x of [-.3, .3]) ball(.1, mat('#111111'), [x, .2, .62], b.head);
  for (const x of [-.09, .09]) box(.15, .3, .06, mat('#FFFFFF'), [x, -.5, .8], b.head);
  for (const x of [-.55, .55]) ball(.2, fur, [x, .6, 0], b.head);
  b.tail = group([0, .4, -1], b.root); const tl = box(1.1, .2, 2, mat('#3A2A20', { rough: .6 }), [0, 0, -.9], b.tail);
  b.arms = [-1, 1].map(s => { const g = group([s * .85, 2.2, .3], b.body); cyl(.17, .15, .9, fur, [0, -.4, 0], g, 8); return g; });
  return b;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9A27A', 0);
  w.room = group();
  box(50, 26, .5, mat('#E8D7B0'), [0, 13, -8], w.room);
  box(8, 5, .2, mat('#BFE3F5', { glow: .2 }), [-6, 9, -7.7], w.room).castShadow = false;
  const sofa = group([8, 0, -5], w.room); box(6, 2, 2.5, mat('#8B5CF6'), [0, 1, 0], sofa); box(6, 2.4, .7, mat('#8B5CF6'), [0, 2.6, -1], sofa);
  w.chair = group([0, 0, 0]);
  w.chairLegs = [];
  box(2.2, .25, 2.2, mat('#C08A48'), [0, 2, 0], w.chair); box(2.2, 2.4, .25, mat('#C08A48'), [0, 3.3, -1], w.chair);
  for (const x of [-.9, .9]) for (const z of [-.9, .9]) { const l = box(.25, 2, .25, mat('#A0703A'), [x, 1, z], w.chair); w.chairLegs.push(l); }
  w.table = group([0, 0, 0]);
  w.tableParts = [];
  w.tableParts.push(box(5, .3, 3, mat('#C08A48'), [0, 3.2, 0], w.table));
  for (const x of [-2.2, 2.2]) for (const z of [-1.2, 1.2]) w.tableParts.push(box(.3, 3.1, .3, mat('#A0703A'), [x, 1.55, z], w.table));
  w.b = beaver(k, k.scene); w.bv = w.b.root;
  w.chips = group();
  for (let i = 0; i < 12; i++) { const c = box(.25, .06, .15, mat('#E8C48A'), [0, 0, 0], w.chips); c.userData = { a: i * .52, ph: (i * .13) % 1 }; c.castShadow = false; }
  w.dam = group([0, 0, 0]);
  for (let i = 0; i < 14; i++) { const lg = cyl(.35, .35, 5, mat(['#7A5230', '#8B6340'][i % 2]), [-3 + (i % 5) * .3, .35 + Math.floor(i / 5) * .6, (i % 5) * .2 - .4], w.dam, 10); lg.rotation.z = Math.PI / 2 + (i % 3 - 1) * .1; lg.rotation.y = (i % 4) * .2; }
  w.water = box(30, 1, 16, mat('#5BA8D9', { opacity: .7, rough: .05 }), [6, 0, -1], k.scene); w.water.castShadow = false;
  return w;
}

function chew(b, t, sp = 16) { b.head.rotation.x = .12 * Math.sin(t * sp); }

export default {
  id: '116',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BEAVER CARPENTER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS BEAVER', 'BECAME A CARPENTER.'],
  title: 'This beaver became a carpenter',
  description: 'He builds a chair. He eats the chair. Then he builds a dam in the living room. (A made-up beaver.)',
  tags: ['animalsatwork', 'funny', 'beaver', 'carpenter', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the beaver carpenter is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This beaver became a carpenter.',
      show: ['ground', 'room', 'chair', 'bv'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.2, 2.6, 13.5], look: [.5, 6, 0], fov: 46, to: { pos: [2, 2.6, 12.5], look: [.5, 5.9, 0], fov: 44 } },
      update: (w, p, t) => { w.chairLegs.forEach(l => { l.visible = true; }); w.chair.position.set(2.2, 0, -.5); w.chair.rotation.set(0, -.3, 0); w.bv.position.set(-1, 0, .6); w.bv.rotation.y = .4; chew(w.b, 0); w.b.arms[1].rotation.x = -.6 + .2 * Math.sin(t * 3); },
    },
    {
      say: 'He builds a chair. Then he eats the chair.',
      show: ['ground', 'room', 'chair', 'bv', 'chips'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [3, 3.5, 12], look: [.6, 3.2, 0], fov: 46, to: { pos: [2.8, 3.5, 11], look: [.6, 3.1, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bv.position.set(-.8, 0, .8); w.bv.rotation.y = .6; chew(w.b, t);
        const gone = Math.max(0, t - 1); w.chairLegs.forEach((l, i) => { l.visible = gone < .3 + i * .3; });
        const tilt = Math.min(1, gone * .8); w.chair.position.set(1.6, Math.max(-1.7, -tilt * 2), 0); w.chair.rotation.set(0, -.3, tilt * .4);
        w.chips.children.forEach(c => { const u = c.userData, q = (t * 1.6 + u.ph) % 1; c.visible = t > .9; c.position.set(.2 + Math.cos(u.a) * q * 1.5, 3 - q * 3 + .8 * Math.sin(q * 3), .8 + Math.sin(u.a) * q * 1.2); c.rotation.set(q * 7, u.a, q * 4); });
      },
    },
    {
      say: 'The table? Also a snack.',
      show: ['ground', 'room', 'table', 'bv', 'chips'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [2, 5, 14], look: [-.6, 3.4, 0], fov: 48, to: { pos: [1.8, 5, 13], look: [-.6, 3.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.table.position.set(.8, 0, -1); w.bv.position.set(-2.2, 0, 1); w.bv.rotation.y = .7; chew(w.b, t, 20);
        w.tableParts.forEach((pt, i) => { pt.visible = t < .15 + (w.tableParts.length - i) * .2; });
        w.chips.children.forEach(c => { const u = c.userData, q = (t * 1.6 + u.ph) % 1; c.visible = true; c.position.set(-1.2 + Math.cos(u.a) * q * 2, 3 - q * 3 + .8 * Math.sin(q * 3), 1.4 + Math.sin(u.a) * q * 1.5); });
      },
    },
    {
      say: 'Then he builds a dam. In the living room.',
      show: ['ground', 'room', 'dam', 'water', 'bv'], sky: '#BFD8EE', lightAt: [0, 5, 2], lightDist: 18,
      cam: { pos: [6, 7, 15], look: [0, 2.5, 0], fov: 50, to: { pos: [5.6, 7.4, 14], look: [0, 2.5, 0], fov: 48 } },
      update: (w, p, t) => {
        w.dam.position.set(.5, 0, 0); w.bv.position.set(-1.8, 2.4, .2); w.bv.rotation.y = .3; chew(w.b, 0); w.b.arms.forEach((a, i) => { a.rotation.z = (i ? -1 : 1) * (.8 + .3 * Math.sin(t * 5)); });
        w.water.position.y = -.5 + Math.min(1.8, t * .7); w.water.position.x = 9;
      },
    },
    {
      say: 'Hire the beaver: yes, no, or only outdoors? Comment below.',
      quiz: { q: 'Would you hire the beaver carpenter?', options: ['Yes', 'No', 'Only outdoors'], answer: 'He is a made-up carpenter. Do not leave him alone with the furniture.' },
      show: ['ground', 'room', 'chair', 'bv'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 1.5, 12], look: [.6, 6.4, 0], fov: 46, to: { pos: [-2, 1.5, 12], look: [.6, 6.4, 0] } },
      update: (w, p, t) => { w.b.arms.forEach(a => { a.rotation.set(0, 0, 0); }); w.chairLegs.forEach(l => { l.visible = true; }); w.chair.position.set(2.2, 0, -.5); w.chair.rotation.set(0, -.3, 0); w.bv.position.set(-1, 0, .6); w.bv.rotation.y = .4; chew(w.b, 0); },
    },
  ],
};

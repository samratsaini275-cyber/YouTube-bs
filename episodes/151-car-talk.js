// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise in the family of 068 (your fridge could talk, ~1K views).
// A made-up comedy sketch: cars do not talk. Hook: the premise as a question under 2 s; first frame shows the car with a face.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

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
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 13)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#5A5F66', 0);
  w.lot = group();
  for (let i = 0; i < 6; i++) box(.15, .02, 4, mat('#FFFFFF'), [-7.5 + i * 3, .02, 0], w.lot).castShadow = false;
  box(40, 12, .5, mat('#BFD8E8'), [0, 6, -6], w.lot);
  w.c = car(k, k.scene); w.cr = w.c.root;
  w.cones = group(); for (let i = 0; i < 3; i++) { const cn = cone(.3, .8, mat('#FF8A1F'), [0, .4, 0], w.cones, 10); cn.userData.i = i; }
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); ball(.16, mat('#111111'), [0, 0, 0], n); cyl(.03, .03, .45, mat('#111111'), [.14, .22, 0], n, 6); n.userData.i = i; }
  w.road = group(); box(60, .02, 5, mat('#3A3E44'), [0, .02, 0], w.road).castShadow = false;
  for (let i = 0; i < 12; i++) box(1.2, .03, .15, mat('#FFD21F'), [-25 + i * 4.5, .03, 0], w.road).castShadow = false;
  for (let i = 0; i < 6; i++) { cyl(.3, .4, 2.6, mat('#6B4B2E'), [-12 + i * 5, 1.3, -4], w.road, 8); ball(1.3, mat('#2E8B4A'), [-12 + i * 5, 3.3, -4], w.road); }
  w.wash = group(); for (const x of [-2.9, 2.9]) { const br = cyl(.5, .5, 3, mat('#3B82F6'), [x, 1.6, 0], w.wash, 12); br.userData.x = x; }
  box(5, .3, 4.4, mat('#9AA3AE'), [0, 4.2, 0], w.wash).castShadow = false;
  w.foam = group(); for (let i = 0; i < 16; i++) { const f = ball(.25 + (i % 3) * .1, mat('#FFFFFF'), [0, 0, 0], w.foam); f.userData.i = i; }
  w.keys = group([0, 0, 0]); k.torus(.15, .04, mat('#FFD21F', { metal: .6 }), [0, 0, 0], w.keys); box(.08, .35, .03, mat('#C0C6CC', { metal: .6 }), [0, -.3, 0], w.keys);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  return w;
}

const park = (w, ry = -1.1) => { w.cr.position.set(0, 0, 0); w.cr.rotation.set(0, ry, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.position.y = 0; w.c.eyes.forEach(e => e.scale.set(1, 1, 1)); };

export default {
  id: '151',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TALKING CAR',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF YOUR CAR', 'COULD TALK?'],
  title: 'What would happen if your car could talk?',
  description: 'It judges your parking. It sings on road trips, badly. It giggles in the car wash. And it knows where your keys are. (A made-up talking car.)',
  tags: ['whatif', 'funny', 'car', 'talkingcar', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking cars are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if your car could talk?',
      show: ['ground', 'lot', 'cr'], sky: '#BFD8E8', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [1.2, 2.6, 10], look: [.7, 1.7, 0], fov: 46, to: { pos: [1.1, 2.6, 9.2], look: [.7, 1.65, 0], fov: 44 } },
      update: (w, p, t) => { park(w); talk(w.c, t, t > .2); w.c.body.position.y = .04 * Math.abs(Math.sin(t * 13)); },
    },
    {
      say: 'Parking? It judges every single attempt.',
      show: ['ground', 'lot', 'cr', 'cones'], sky: '#BFD8E8', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [2, 6, 10], look: [0, 1.4, 0], fov: 48, to: { pos: [1.8, 5.8, 9.2], look: [0, 1.4, 0], fov: 46 } },
      update: (w, p, t) => {
        const q = t % 1.6; park(w, -1.1 + .5 * Math.sin(q * 4)); w.cr.position.set(-1 + q * 1.2, 0, .6 * Math.sin(q * 3)); talk(w.c, t);
        w.cones.children.forEach(c => { const i = c.userData.i; const hit = i === 1 && q > .9; c.position.set(1.8 + i * .9, 0, 1.6); c.rotation.z = hit ? -1.4 : 0; });
        w.c.eyes.forEach(e => e.scale.set(1, .6, 1));
      },
    },
    {
      say: 'Road trips? It sings. Very badly.',
      show: ['ground', 'road', 'cr', 'notes'], sky: '#9ED2F3', lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [3.4, 3.4, 10.5], look: [.9, 2.0, 0], fov: 48, to: { pos: [3.2, 3.4, 9.9], look: [.9, 2.0, 0], fov: 46 } },
      update: (w, p, t) => {
        park(w, -.3); w.c.wheels.forEach(wh => wh.rotation.y = t * 10); talk(w.c, t); w.c.body.rotation.z = .04 * Math.sin(t * 8);
        w.road.position.x = -(t * 6) % 4.5;
        w.notes.children.forEach(n => { const q = (t * .8 + n.userData.i / 5) % 1; n.position.set(1.8 + q * 1.4, 2.4 + q * 2.4, .4 + Math.sin(q * 6 + n.userData.i) * .5); n.rotation.z = .3 * Math.sin(t * 6 + n.userData.i); n.scale.setScalar(1 - q * .4); });
      },
    },
    {
      say: 'Car wash? It giggles the whole time.',
      show: ['ground', 'lot', 'cr', 'wash', 'foam'], sky: '#BFD8E8', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [1.4, 3, 9.5], look: [.3, 2.2, 0], fov: 48, to: { pos: [1.3, 3, 8.7], look: [.3, 2.2, 0], fov: 46 } },
      shake: (t) => .015,
      update: (w, p, t) => {
        park(w, -1.1); talk(w.c, t); w.c.body.rotation.x = .05 * Math.sin(t * 18); w.c.eyes.forEach(e => e.scale.set(1, .35, 1));
        w.wash.children.forEach(b => { if (b.userData.x !== undefined) b.rotation.y = t * 12; });
        w.foam.children.forEach(f => { const i = f.userData.i; f.position.set(-1.6 + (i % 6) * .55, 2.7 + Math.floor(i / 6) * .35 + .1 * Math.sin(t * 4 + i), Math.sin(i) * .6); });
      },
    },
    {
      say: 'And it knows where your keys are. It will not tell you.',
      show: ['ground', 'lot', 'cr', 'pp', 'keys'], sky: '#BFD8E8', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [1, 2.8, 10.5], look: [.6, 2.4, 0], fov: 48, to: { pos: [.9, 2.8, 9.7], look: [.6, 2.4, 0], fov: 46 } },
      update: (w, p, t) => {
        park(w, -1.1); talk(w.c, t, t < 1.6); w.c.eyes[1].scale.set(1, t > 2 ? .15 : 1, 1);
        w.keys.position.set(.3, .06, 2.4); w.keys.rotation.set(Math.PI / 2, 0, 0); w.keys.scale.setScalar(1.6);
        w.pp.position.set(3.3, 0, .2); w.pp.rotation.set(0, -.6 + .5 * Math.sin(t * 2), 0); w.p.mouth.scale.y = 1.4;
      },
    },
    {
      say: 'A talking car: fun, loud, or a best friend? Comment below.',
      quiz: { q: 'Would you want a talking car?', options: ['Fun', 'Too loud', 'A best friend'], answer: 'Talking cars are made up. Check under the seat for the keys.' },
      show: ['ground', 'lot', 'cr'], sky: '#274B73', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [1, 1, 8.5], look: [.4, 3.6, 0], fov: 46, to: { pos: [-1, 1, 8.5], look: [.4, 3.6, 0] } },
      update: (w, p, t) => { park(w); talk(w.c, t, false); },
    },
  ],
};

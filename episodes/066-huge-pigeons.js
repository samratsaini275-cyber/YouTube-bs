// Narrative 5: "What Would Happen If…". A made-up comedy sketch: pigeons are normal-sized (and the statue is fine).
// Hook rule: the premise as a question under 2 s, first frame already showing a bus-sized pigeon head-bobbing in a town square.

function pigeon(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const grey = mat('#8A93A6', { rough: .8 }), dark = mat('#5B6478', { rough: .8 });
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(5, grey, [0, 8, 0], p.body); b.scale.set(1, .85, 1.35);
  for (const s of [-1, 1]) { const wg = ball(3.6, dark, [s * 3.8, 8.6, -1], p.body); wg.scale.set(.35, .7, 1.25); }
  const tl = box(4, .8, 5, dark, [0, 8.4, -7.6], p.body); tl.rotation.x = -.3;
  p.neck = group([0, 10, 4.4], p.body);
  const n = cyl(2, 2.6, 4, mat('#6E9A8C', { metal: .4, rough: .4 }), [0, 1.2, 0], p.neck, 20); n.rotation.x = .3;
  p.head = group([0, 3.8, .9], p.neck);
  ball(2.3, grey, [0, 0, 0], p.head);
  cone(.6, 1.8, mat('#3A3A3A'), [0, -.3, 2.6], p.head, 12).rotation.x = Math.PI / 2;
  ball(.5, mat('#F4F6F8'), [0, .2, 2.1], p.head).scale.set(1.2, .6, .6);
  for (const s of [-1, 1]) { const e = group([s * 1.5, .5, 1.3], p.head); ball(.55, mat('#FF8A1F'), [0, 0, 0], e); ball(.28, mat('#111111'), [s * .12, 0, .38], e); }
  p.legs = [-1.6, 1.6].map(x => { const g = group([x, 4, 1], p.root); cyl(.35, .35, 4, mat('#E2695C'), [0, -2, 0], g, 10); for (const a of [-.5, 0, .5]) { const t = box(.3, .3, 2, mat('#E2695C'), [0, -3.9, .9], g); t.rotation.y = a; } return g; });
  return p;
}
function bob(p, t, s = 1) { p.neck.position.z = 4.4 + s * 1.4 * Math.max(0, Math.sin(t * 7)); p.head.rotation.x = .25 * Math.sin(t * 7); }
function walk(p, t) { p.legs.forEach((g, i) => { g.rotation.x = .5 * Math.sin(t * 7 + i * Math.PI); }); p.body.position.y = .3 * Math.abs(Math.sin(t * 7)); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B7AE9E', 0);
  w.square = group();
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) box(5.8, .05, 5.8, mat((i + j) % 2 ? '#CFC7B6' : '#BDB4A2'), [-27 + i * 6, .03, -27 + j * 6], w.square).castShadow = false;
  const cols = ['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4'];
  for (let i = 0; i < 6; i++) { box(9, 14 + (i % 3) * 3, 8, mat(cols[i % 4]), [-27 + i * 10.5, 7 + (i % 3) * 1.5, -34], w.square); for (let r = 0; r < 3; r++) box(6, 1.6, .2, mat('#7FB2D9'), [-27 + i * 10.5, 4 + r * 4, -29.9], w.square).castShadow = false; }
  w.p = pigeon(k, k.scene); w.bird = w.p.root;
  // bread delivery
  w.truck = group([40, 0, 4]);
  box(9, 6, 5, mat('#FFFFFF'), [0, 4, 0], w.truck);
  box(3.6, 4, 5, mat('#2F6FD6'), [6.2, 3, 0], w.truck);
  box(2, 1.6, 5.05, mat('#9FD6F5'), [6.8, 4, 0], w.truck);
  for (const x of [-3, 3, 6.2]) for (const z of [-2.6, 2.6]) cyl(1, 1, .6, mat('#1E2430'), [x, 1, z], w.truck, 18).rotation.x = Math.PI / 2;
  w.loaves = group([0, 0, 0]);
  for (let i = 0; i < 26; i++) { const l = ball(.9, mat('#D9A35E', { rough: .9 }), [0, 0, 0], w.loaves); l.scale.set(1.6, .8, .9); l.userData = { a: i * 1.7, r: (i % 5) * .9, ph: (i * .13) % 1 }; }
  // tiny person who needs to get past
  w.you = group([-3, 0, 14]);
  cyl(.35, .4, 1.4, mat('#E2453C'), [0, .7, 0], w.you, 12); ball(.38, mat('#F2C9A0'), [0, 1.75, 0], w.you);
  w.brief = box(.6, .45, .15, mat('#5A3A1E'), [.5, .6, 0], w.you);
  // the statue
  w.statue = group([60, 0, 0]);
  cyl(3.2, 3.6, 3, mat('#BFC4CC'), [0, 1.5, 0], w.statue, 24);
  w.figure = group([0, 3, 0], w.statue);
  cyl(.9, 1.1, 4.5, mat('#8FA39A', { metal: .4 }), [0, 2.25, 0], w.figure, 16); ball(1, mat('#8FA39A', { metal: .4 }), [0, 5.3, 0], w.figure);
  const arm = cyl(.3, .3, 3, mat('#8FA39A', { metal: .4 }), [1.2, 4.3, 0], w.figure, 8); arm.rotation.z = -1;
  return w;
}

const SQ = ['ground', 'square', 'bird'];

export default {
  id: '066',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUGE PIGEONS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PIGEONS', 'WERE HUGE?'],
  title: 'What would happen if pigeons were huge?',
  description: 'Same attitude. Same head bob. Much, much bigger appetite. (Made-up giant pigeons. No statues were harmed.)',
  tags: ['whatif', 'funny', 'pigeon', 'giant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the giant pigeons are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if pigeons were huge?',
      show: SQ, sky: '#BFD8EE', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [-18, 3, 42], look: [0, 15, 0], fov: 50, to: { pos: [-16, 3, 38], look: [0, 15, 0], fov: 48 } },
      update: (w, p, t) => { w.bird.position.set(-2 + t * 1.5, 0, 0); w.bird.rotation.y = .9; walk(w.p, t); bob(w.p, t); },
    },
    {
      say: 'Feeding them takes a bread truck.',
      show: [...SQ, 'truck', 'loaves'], sky: '#C9DDF0', lightAt: [10, 4, 4], lightDist: 30,
      cam: { pos: [9, 8, 50], look: [9, 9, 2], fov: 52, to: { pos: [9, 8, 46], look: [9, 9, 2], fov: 50 } },
      update: (w, p, t) => {
        w.bird.position.set(2, 0, 2); w.bird.rotation.y = 1.3; walk(w.p, 0); w.p.body.position.y = 0;
        w.p.neck.position.z = 4.4 + 2 * Math.max(0, Math.sin(t * 9)); w.p.head.rotation.x = .7 * Math.max(0, Math.sin(t * 9));
        w.truck.position.set(Math.max(20, 40 - t * 18), 0, 4);
        w.loaves.children.forEach(l => { const u = l.userData, f = Math.min(1, Math.max(0, t - 1 - u.ph)); l.position.set(w.truck.position.x - 5 - f * (3 + u.r), 4 * (1 - f) + .7, 4 + Math.sin(u.a) * u.r); l.rotation.y = u.a; l.visible = t > 1 + u.ph; });
      },
    },
    {
      say: 'They still will not move for you.',
      show: [...SQ, 'you'], sky: '#BFD8EE', lightAt: [-2, 3, 8], lightDist: 25,
      cam: { pos: [6, 2, 26], look: [-1, 6, 6], fov: 50, to: { pos: [5, 2, 23], look: [-1, 6.5, 6], fov: 48 } },
      update: (w, p, t) => {
        w.bird.position.set(-1, 0, 0); w.bird.rotation.y = 0; walk(w.p, 0); w.p.body.position.y = 0;
        w.p.neck.position.z = 4.4; w.p.head.rotation.set(.35, .3 * Math.sin(t * 1.5), 0);
        const side = Math.sin(t * 2.5); w.you.position.set(-1 + side * 3.5, 0, 13); w.p.root.position.x = -1 + side * 3.2;
      },
    },
    {
      say: 'And statues? Never stood a chance.',
      show: ['ground', 'square', 'statue', 'bird'], sky: '#FFE3C2', lightAt: [60, 6, 0], lightDist: 30,
      cam: { pos: [78, 7, 42], look: [60, 12, 0], fov: 50, to: { pos: [75, 7, 38], look: [60, 12, 0], fov: 48 } },
      shake: (t) => t > .9 && t < 1.3 ? .4 : 0,
      update: (w, p, t, k) => {
        const land = k.h.ease(Math.min(1, t / .9));
        const squash = t > .9 ? Math.min(1, (t - .9) * 3) : 0;
        w.bird.position.set(60, (t < .9 ? 9.3 + (1 - land) * 14 : 3 + 6.3 * (1 - .7 * squash)), -1); w.bird.rotation.y = .5; walk(w.p, 0); w.p.body.position.y = 0; bob(w.p, t, .5);
        w.figure.scale.set(1 + squash * .5, 1 - squash * .7, 1 + squash * .5);
      },
    },
    {
      say: 'Giant pigeon: pet, problem, or ride? Comment below.',
      quiz: { q: 'What would a giant pigeon be?', options: ['A pet', 'A problem', 'A ride'], answer: 'It is a made-up giant pigeon, so it is mostly a problem with a very nice head bob.' },
      show: SQ, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [18, 2, 32], look: [0, 16, 0], fov: 50, to: { pos: [-16, 2, 32], look: [0, 16, 0] } },
      update: (w, p, t) => { w.bird.position.set(0, 0, 0); w.bird.rotation.y = .3; walk(w.p, t); bob(w.p, t); },
    },
  ],
};

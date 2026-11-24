// Narrative 15: "What Would Happen If… (season 5)". Animal premise (animal and dinosaur premises are among the channel's best).
// A made-up comedy sketch: cows cannot fly. Hook: the premise as a question under 2 s; first frame shows a cow flying.

function cow(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  const wh = mat('#FFFFFF', { rough: .8 }), bk = mat('#222222', { rough: .8 });
  box(3, 1.6, 1.6, wh, [0, 1.9, 0], c.root); for (const [x, y, z] of [[-.6, 2.3, .81], [.7, 1.7, .81], [.2, 2.4, -.81], [-.9, 1.6, -.81]]) box(.7, .6, .02, bk, [x, y, z], c.root);
  c.head = group([1.8, 2.5, 0], c.root); box(1, 1, 1, wh, [0, 0, 0], c.head); box(.5, .5, .9, mat('#F7B5C5'), [.6, -.25, 0], c.head); for (const z of [-.3, .3]) { ball(.12, mat('#111111'), [.51, .2, z], c.head); const h = cone(.1, .4, mat('#E8D8B0'), [0, .65, z * 1.6], c.head, 8); }
  c.legs = []; for (const x of [-1.1, 1.1]) for (const z of [-.55, .55]) c.legs.push(box(.3, 1.1, .3, wh, [x, .55, z], c.root));
  c.wings = [-1, 1].map(s => { const g = group([0, 2.6, s * .8], c.root); const f = ball(1, mat('#FFFFFF', { rough: .9 }), [0, .3, s * 1.2], g); f.scale.set(1, .12, 1.4); g.userData.s = s; return g; });
  return c;
}
const flap = (c, t, sp = 8) => c.wings.forEach(g => g.rotation.x = g.userData.s * (.2 + .5 * Math.sin(t * sp)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.farm = group(); box(8, 6, 6, mat('#B3262E'), [-6, 3, -10], w.farm); const r = cone(6, 3, mat('#5A2A1A'), [-6, 7.5, -10], w.farm, 4); r.rotation.y = Math.PI / 4; for (let i = 0; i < 10; i++) box(.2, 1.4, .2, mat('#F2E6D0'), [-12 + i * 2.6, .7, -4], w.farm); box(26, .15, .15, mat('#F2E6D0'), [0, 1.1, -4], w.farm);
  w.town = group(); for (let i = 0; i < 6; i++) { const hx = -10 + i * 4; box(3.4, 4 + (i % 2) * 2, 3, mat(['#F2D7A6', '#BFD8EE', '#F7C6C6'][i % 3]), [hx, 2 + (i % 2), -6], w.town); box(1, 1, .1, mat('#BFE3F7'), [hx, 3, -4.45], w.town); }
  w.c = cow(k, k.scene); w.cc = w.c.root; w.c2 = cow(k, k.scene); w.cc2 = w.c2.root; w.c3 = cow(k, k.scene); w.cc3 = w.c3.root;
  w.bottle = group(); cyl(.25, .25, .9, mat('#FFFFFF'), [0, .45, 0], w.bottle, 12); cyl(.26, .26, .15, mat('#3B82F6'), [0, .95, 0], w.bottle, 12);
  w.farmer = group(); cyl(.7, .75, 2.2, mat('#3B6FD6'), [0, 1.1, 0], w.farmer, 12); ball(.6, mat('#F2C9A0'), [0, 2.8, 0], w.farmer); cyl(.9, .9, .08, mat('#E8C48A'), [0, 3.3, 0], w.farmer, 16); cyl(.5, .5, .5, mat('#E8C48A'), [0, 3.55, 0], w.farmer, 16); for (const x of [-.22, .22]) ball(.08, mat('#111111'), [x, 2.95, .55], w.farmer); w.fmouth = box(.25, .06, .05, mat('#5A1E1E'), [0, 2.6, .58], w.farmer);
  w.birds = group(); for (let i = 0; i < 4; i++) { const b = group([0, 0, 0], w.birds); ball(.4, mat('#333333'), [0, 0, 0], b); cone(.1, .3, mat('#FFC21F'), [.45, 0, 0], b, 6).rotation.z = -Math.PI / 2; for (const z of [-1, 1]) { const wg = box(.3, .04, .6, mat('#333333'), [0, .05, z * .4], b); wg.userData.z = z; } b.userData.i = i; }
  return w;
}

const place = (c, x, y, z, ry, s = 1) => { c.position.set(x, y, z); c.rotation.set(0, ry, 0); c.scale.setScalar(s); };

export default {
  id: '254',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLYING COW',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF COWS', 'COULD FLY?'],
  title: 'What would happen if cows could fly?',
  description: 'Milk arrives by air. Farmers need ladders. And the birds are not happy about the traffic. (A made-up animal upgrade.)',
  tags: ['whatif', 'funny', 'cow', 'flying', 'animals', 'shorts'],
  sources: ['Quiz fact: a dairy cow produces on average about 25–30 litres of milk a day in high-yield herds (FAO, "Gateway to dairy production and products"; UK AHDB figures).'],
  setup,
  scenes: [
    { say: 'What if cows could fly?', show: ['ground', 'farm', 'cc'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [2, 3, 13], look: [0, 5.6, 0], fov: 50, to: { pos: [1.8, 3, 12.2], look: [0, 5.6, 0], fov: 48 } },
      update: (w, p, t) => { place(w.cc, 0, 2 + .4 * Math.sin(t * 2), 0, .3); flap(w.c, t); } },
    { say: 'Milk delivery? Straight to your window.', show: ['ground', 'town', 'cc', 'bottle'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [2, 4, 12], look: [0, 3.6, -3], fov: 50, to: { pos: [1.8, 4, 11.2], look: [0, 3.6, -3], fov: 48 } },
      update: (w, p, t) => { const x = -6 + Math.min(1, t / 1.4) * 6; place(w.cc, x, 1.8, -2, 0); flap(w.c, t); w.bottle.position.set(x + 1.8, Math.max(2.6, 3.6 - Math.max(0, t - 1.4) * 4) , -3.8); } },
    { say: 'Farmers? Now they need very long ladders.', show: ['ground', 'farm', 'cc', 'farmer'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 4, 15], look: [0, 4.4, 0], fov: 52, to: { pos: [2.6, 4, 14], look: [0, 4.4, 0], fov: 50 } },
      update: (w, p, t) => { place(w.cc, 0, 6 + .3 * Math.sin(t * 2), -1, -.4); flap(w.c, t); w.farmer.position.set(-2.4, 0, 2); w.farmer.rotation.y = .5; w.fmouth.scale.y = 3; } },
    { say: 'The birds? Not happy about the traffic.', label: '*TRAFFIC JAM*', show: ['ground', 'farm', 'cc', 'cc2', 'cc3', 'birds'], sky: '#9ED2F3', lightAt: [0, 8, 3], lightDist: 30,
      cam: { pos: [3, 7, 18], look: [0, 7, 0], fov: 52, to: { pos: [2.6, 7, 17], look: [0, 7, 0], fov: 50 } },
      update: (w, p, t) => { for (const [c, C, x, y, z, ph] of [[w.cc, w.c, -4, 6, 0, 0], [w.cc2, w.c2, 0, 8, -2, 1], [w.cc3, w.c3, 4, 6.5, -1, 2]]) { place(c, x + .3 * Math.sin(t + ph), y + .3 * Math.sin(t * 2 + ph), z, Math.PI, .8); flap(C, t + ph); } w.birds.children.forEach(b => { const i = b.userData.i; b.position.set(-6 + ((t * 3 + i * 3) % 12), 9 + (i % 2), 2); b.children.forEach(c => { if (c.userData.z) c.rotation.x = c.userData.z * .6 * Math.sin(t * 14); }); }); } },
    { say: 'And umbrellas? Sold out everywhere.', show: ['ground', 'town', 'cc', 'farmer'], sky: '#8FA3B8', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [2, 3, 15], look: [0, 5.2, -1], fov: 52, to: { pos: [1.8, 3, 14.2], look: [0, 5.2, -1], fov: 50 } },
      update: (w, p, t) => { place(w.cc, 1 + .5 * Math.sin(t), 6.2, -2, Math.PI / 2); flap(w.c, t); w.farmer.position.set(-1.6, 0, 1.4); w.farmer.rotation.y = .3; w.farmer.children.forEach(m => {}); w.fmouth.scale.y = 1; w.farmer.rotation.x = 0; w.farmer.position.y = 0; w.farmer.scale.setScalar(1); w.farmer.children[1].position.y = 2.8; } },
    { say: 'How much milk does a cow make a day: one litre, ten, or twenty-five plus? Comment below.',
      quiz: { q: 'How much milk can a dairy cow make in a day?', options: ['About 1 litre', 'About 10 litres', '25 litres or more'], answer: 'Answer: in big dairy herds, often 25 to 30 litres a day.' },
      show: ['ground', 'farm', 'cc'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [3, 3, 12], look: [0, 5, 0], fov: 50, to: { pos: [-3, 3, 12], look: [0, 5, 0] } },
      update: (w, p, t) => { place(w.cc, 0, 2.6 + .4 * Math.sin(t * 2), 0, .3); flap(w.c, t); } },
  ],
};

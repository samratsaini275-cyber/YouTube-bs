// Narrative 5: "What Would Happen If…". A made-up comedy sketch: cows do not fly.
// Hook rule: the premise as a question under 2 s, first frame already showing a cow flapping tiny wings over a farm.

function cow(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  const white = mat('#F4F4F0', { rough: .8 }), black = mat('#1E1E1E', { rough: .8 });
  const body = box(4, 2.2, 2.2, white, [0, 0, 0], c.root);
  for (const [x, y, z, s] of [[-.8, .5, 1.12, .8], [1, -.3, 1.12, .6], [.2, .4, -1.12, .9], [-1.2, -.4, -1.12, .5]]) { const sp = cyl(s, s, .05, black, [x, y, z], c.root, 14); sp.rotation.x = Math.PI / 2; sp.castShadow = false; }
  c.head = group([2.4, .5, 0], c.root);
  box(1.4, 1.3, 1.3, white, [0, 0, 0], c.head);
  box(.6, .8, 1.1, mat('#F7B6C2'), [.85, -.25, 0], c.head);
  for (const z of [-.3, .3]) ball(.13, black, [.6, .3, z * 1.6], c.head);
  for (const z of [-.75, .75]) { cone(.15, .5, mat('#E8D7B0'), [-.2, .85, z], c.head, 8); box(.2, .3, .5, white, [-.3, .4, z * 1.25], c.head); }
  for (const [x, z] of [[-1.5, -.8], [1.5, -.8], [-1.5, .8], [1.5, .8]]) cyl(.25, .25, 1.4, white, [x, -1.7, z], c.root, 8);
  c.wings = [-1, 1].map(s => { const g = group([0, 1.1, s * 1.1], c.root); const wg = box(1.6, .1, 1.4, mat('#FFFFFF', { rough: .5 }), [0, 0, s * .7], g); wg.castShadow = false; return g; });
  c.bell = ball(.25, mat('#E8C547', { metal: .8 }), [1.6, -.6, 0], c.root);
  return c;
}
function flap(c, t, ph = 0) { c.wings.forEach((g, i) => { g.rotation.x = (i ? -1 : 1) * .7 * Math.sin(t * 22 + ph); }); c.root.position.y += .25 * Math.sin(t * 4 + ph); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.farm = group();
  box(10, 7, 8, mat('#B8352E'), [-8, 3.5, -10], w.farm);
  const roof = cone(7.5, 3.5, mat('#6B2A22'), [-8, 8.7, -10], w.farm, 4); roof.rotation.y = Math.PI / 4; roof.scale.z = .85;
  box(3.4, 4, .2, mat('#FFFFFF'), [-8, 2, -5.9], w.farm);
  for (let i = 0; i < 10; i++) box(.3, 1.6, .3, mat('#E8E8E8'), [-20 + i * 4, .8, 6], w.farm);
  box(40, .25, .2, mat('#E8E8E8'), [-2, 1.3, 6], w.farm);
  for (let i = 0; i < 6; i++) { cyl(.5, .7, 3, mat('#6B4B2E'), [12 + (i % 3) * 5, 1.5, -14 + Math.floor(i / 3) * 6], w.farm, 8); ball(2.4, mat('#2E8B4A'), [12 + (i % 3) * 5, 4.4, -14 + Math.floor(i / 3) * 6], w.farm); }
  w.c1 = cow(k, k.scene); w.cow = w.c1.root;
  // milk delivery: bottles on little parachutes
  w.milk = group();
  for (let i = 0; i < 6; i++) { const g = group([-6 + i * 2.6, 0, 2 - (i % 2) * 3], w.milk); cyl(.35, .35, 1.2, mat('#FFFFFF'), [0, 0, 0], g, 14); cyl(.2, .2, .3, mat('#2F6FD6'), [0, .75, 0], g, 10); const ch = ball(1.3, mat(i % 2 ? '#E2453C' : '#FFD21F', { double: true }), [0, 2.6, 0], g); ch.scale.y = .5; for (const s of [-1, 1]) { const l = box(.03, 2, .03, mat('#2A2A2A'), [s * .6, 1.5, 0], g); l.rotation.z = s * -.3; } g.userData.ph = i * .23; }
  w.house = group([4, 0, -2]);
  box(6, 5, 5, mat('#F4F1E8'), [0, 2.5, 0], w.house);
  const hr = cone(4.6, 2.6, mat('#8B3A2E'), [0, 6.3, 0], w.house, 4); hr.rotation.y = Math.PI / 4;
  // the herd over the road
  w.road = group();
  box(300, .1, 12, mat('#4A4F5A'), [0, .05, 30], w.road).castShadow = false;
  for (let i = 0; i < 30; i++) box(3, .02, .35, mat('#FFFFFF'), [-60 + i * 6, .12, 30], w.road).castShadow = false;
  w.herd = group([0, 0, 30]);
  w.herdCows = [];
  for (let i = 0; i < 9; i++) { const c = cow(k, w.herd); c.root.position.set(-12 + (i % 3) * 7, 8 + Math.floor(i / 3) * 4, -3 + (i % 3) * 3); c.root.scale.setScalar(.9); c.home = c.root.position.clone(); w.herdCows.push(c); }
  // the farmer with glowing wands
  w.farmer = group([0, 0, 0]);
  cyl(1, 1.15, 4, mat('#3B5BA9'), [0, 2, 0], w.farmer, 18); ball(1.05, mat('#F2C9A0'), [0, 4.9, 0], w.farmer);
  cyl(1.4, 1.4, .15, mat('#E8C547'), [0, 5.7, 0], w.farmer, 20); cyl(.9, 1, 1, mat('#E8C547'), [0, 6.2, 0], w.farmer, 20);
  for (const x of [-.38, .38]) ball(.14, mat('#111111'), [x, 5.1, .95], w.farmer);
  w.wands = [-1, 1].map(s => { const g = group([s * 1.2, 3.8, 0], w.farmer); cyl(.25, .25, 2, mat('#FF8A1F', { glow: 2.5 }), [0, 1, 0], g, 10); return g; });
  return w;
}

const FARM = ['ground', 'farm', 'cow'];

export default {
  id: '073',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLYING COWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF COWS', 'COULD FLY?'],
  title: 'What would happen if cows could fly?',
  description: 'Fresh milk, delivered by air. Rush hour, delivered by herd. The farmer has a new job. (Made-up flying cows.)',
  tags: ['whatif', 'funny', 'cow', 'farm', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: flying cows are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cows could fly?',
      show: FARM, sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [8, 2, 22], look: [0, 10, 0], fov: 50, to: { pos: [7, 2, 19], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t) => { w.cow.position.set(-3 + t * 1.5, 6.5, 0); w.cow.rotation.set(0, 0, .1); flap(w.c1, t); },
    },
    {
      say: 'Milk now arrives by air.',
      show: ['ground', 'farm', 'house', 'milk', 'cow'], sky: '#A7D8F5', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [6, 5, 24], look: [0, 8, 0], fov: 50, to: { pos: [5, 5, 21], look: [0, 8, 0], fov: 48 } },
      update: (w, p, t) => {
        w.cow.position.set(-6 + t * 4, 14, -2); w.cow.rotation.set(0, 0, 0); flap(w.c1, t);
        w.milk.children.forEach(g => { const f = Math.min(1, Math.max(0, t * .45 - g.userData.ph * .5)); g.position.y = 13 - f * 12.4; g.visible = t * .45 > g.userData.ph * .5; g.rotation.z = .1 * Math.sin(t * 3 + g.userData.ph * 9); });
      },
    },
    {
      say: 'Rush hour? A whole herd.',
      show: ['ground', 'road', 'herd'], sky: '#FFE3C2', lightAt: [0, 8, 30], lightDist: 30,
      cam: { pos: [4, 2, 58], look: [0, 12, 30], fov: 52, to: { pos: [3, 2, 54], look: [0, 12, 30], fov: 50 } },
      update: (w, p, t) => { w.herdCows.forEach((c, i) => { c.root.position.copy(c.home); c.root.position.x += t * 3; flap(c, t, i); }); },
    },
    {
      say: 'Farmers do air traffic control now.',
      show: ['ground', 'farm', 'cow', 'farmer'], sky: '#9ED2F3', lightAt: [0, 4, 4], lightDist: 22,
      cam: { pos: [10, 4, 24], look: [1.5, 6.5, 0], fov: 52, to: { pos: [9, 4, 21.5], look: [1.5, 6.5, 0], fov: 50 } },
      update: (w, p, t, k) => {
        w.farmer.position.set(-1, 0, 4); w.farmer.rotation.y = .3;
        w.wands.forEach((g, i) => { g.rotation.z = (i ? -1 : 1) * (.6 + .6 * Math.sin(t * 5)); });
        const land = k.h.ease(Math.min(1, t / 2));
        w.cow.position.set(6 - land * 3, 11 - land * 8.4, -2); w.cow.rotation.set(0, Math.PI, 0); flap(w.c1, t);
      },
    },
    {
      say: 'Flying cows: cool, scary, or messy? Comment below.',
      quiz: { q: 'What would flying cows be?', options: ['Cool', 'Scary', 'Messy'], answer: 'They are made-up flying cows, so mostly messy.' },
      show: FARM, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [14, 2, 22], look: [0, 16, 0], fov: 46, to: { pos: [-12, 2, 22], look: [0, 16, 0] } },
      update: (w, p, t) => { w.cow.position.set(0, 8, 0); w.cow.rotation.set(0, .4, .1); flap(w.c1, t); },
    },
  ],
};

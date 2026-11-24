// Narrative 17: "What Would Happen If… (season 7)". Big-animal premise (167 giant cats 322, 290 giant mice, 296 giant hedgehogs).
// Hook: the premise as a question under 2 s; first frame shows a car-sized red crab snapping its claws next to a house.

function crab(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const red = mat('#D9442E', { rough: .5 });
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(1, red, [0, 1.2, 0], c.root); b.scale.set(1.4, .55, 1);
  for (const z of [-1, 1]) { cyl(.05, .05, .5, red, [.6, 1.8, z * .3], c.root, 6); ball(.14, mat('#FFFFFF'), [.6, 2.1, z * .3], c.root); ball(.07, mat('#111111'), [.7, 2.12, z * .3], c.root); }
  c.mouth = box(.05, .1, .4, mat('#7A1E1E'), [1.3, 1.1, 0], c.root);
  c.legs = []; for (const z of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([-.5 + i * .5, 1, z * .8], c.root); const l1 = cyl(.07, .06, .9, red, [0, 0, z * .4], g, 6); l1.rotation.x = z * 1.1; const l2 = cyl(.06, .03, 1, red, [0, -.55, z * .85], g, 6); g.userData.z = z; c.legs.push(g); }
  c.claws = [-1, 1].map(z => { const g = group([1.1, 1.3, z * .9], c.root); const arm = cyl(.1, .1, .8, red, [.35, 0, 0], g, 6); arm.rotation.z = Math.PI / 2; const top = ball(.35, red, [.85, .12, 0], g); top.scale.set(1.3, .5, .6); const jaw = group([.6, -.05, 0], g); const bot = ball(.3, red, [.25, -.08, 0], jaw); bot.scale.set(1.2, .4, .5); g.userData.jaw = jaw; return g; });
  return c;
}
const snap = (c, t) => c.claws.forEach((g, i) => g.userData.jaw.rotation.z = -.5 * Math.abs(Math.sin(t * 6 + i)));
const scuttle = (c, t) => c.legs.forEach((g, i) => g.rotation.x = g.userData.z * .25 * Math.sin(t * 14 + i));
function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.sand = k.ground('#E8D29A', .005);
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-80 + i * 4, .03, 0], w.road);
  w.cr = crab(k, k.scene); w.cc = w.cr.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); for (let i = 0; i < 3; i++) { const c = group([0, 0, 0], w.cars); box(2.4, .8, 1.2, mat(['#3B6FD6', '#FFC21F', '#5FBF5F'][i]), [0, .6, 0], c); box(1.2, .6, 1.1, mat('#9FD3EE'), [-.2, 1.2, 0], c); c.userData.i = i; }
  w.hedge = group(); for (let i = 0; i < 8; i++) { const h = box(1.2, 1.6, 1, mat('#2F7A3A'), [-4.2 + i * 1.2, .8, 0], w.hedge); h.userData.i = i; }
  w.castle = group(); const sm = mat('#E0C27A'); box(3, 2, 2, sm, [0, 1, 0], w.castle); for (const x of [-1.3, 1.3]) { cyl(.5, .5, 3, sm, [x, 1.5, .8], w.castle, 8); cone(.6, .8, sm, [x, 3.4, .8], w.castle, 8); }
  w.chips = group(); for (let i = 0; i < 6; i++) { const ch = box(.8, .3, .3, mat('#F2C94C'), [0, 0, 0], w.chips); ch.userData.i = i; } box(1.6, 1, 1, mat('#E2453C'), [0, .5, 0], w.chips);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };

export default {
  id: '298',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT CRABS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CRABS', 'WERE GIANT?'],
  title: 'What would happen if crabs were giant?',
  description: 'Traffic now moves sideways. Hedge trimming takes one snip. Sandcastles become crab castles. And your beach snack? Gone. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'crab', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: car-sized crabs are made up. Quiz fact: the Japanese spider crab can have a leg span of about 3.7 metres, the largest of any known arthropod (Encyclopaedia Britannica).'],
  setup,
  scenes: [
    { say: 'What if crabs were giant?', show: ['ground', 'cc', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-1, 4.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-1, 4.2, 0], fov: 52 } },
      update: (w, p, t) => { w.cc.scale.setScalar(3.6); w.cc.position.set(-4, 0, -5); w.cc.rotation.y = -.9; snap(w.cr, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Traffic? Everyone goes sideways.', show: ['ground', 'road', 'cc', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [8, 8, 18], look: [0, 2.4, 0], fov: 56, to: { pos: [7, 8, 17], look: [0, 2.4, 0], fov: 54 } },
      update: (w, p, t) => { w.cc.scale.setScalar(2.4); w.cc.position.set(-1 + p * 3, 0, 0); w.cc.rotation.y = Math.PI / 2; scuttle(w.cr, t); snap(w.cr, t * .5); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-1 + p * 3 + (i - 1) * 3, 0, -2.4 - (i % 2) * .4); c.rotation.y = Math.PI / 2; }); } },
    { say: 'Hedge trimming? One snip.', label: '*SNIP*', show: ['ground', 'cc', 'hedge'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 16], look: [0, 2.6, 0], fov: 54, to: { pos: [0, 6, 15], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { w.hedge.position.set(0, 0, 0); w.cc.scale.setScalar(2); const x = -5 + p * 10; w.cc.position.set(x, 0, -3); w.cc.rotation.y = Math.PI / 2; scuttle(w.cr, t); snap(w.cr, t * 2); w.hedge.children.forEach(h => { const i = h.userData.i, done = (-4.2 + i * 1.2) < x; h.scale.y = done ? .55 : 1; h.position.y = done ? .44 : .8; }); } },
    { say: 'Sandcastles? Now they are crab castles.', show: ['sand', 'cc', 'castle'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 15], look: [0, 3, 0], fov: 54, to: { pos: [1.8, 4, 14.2], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.castle.position.set(0, 0, -1); w.castle.scale.setScalar(1.6); w.cc.scale.setScalar(1.5); w.cc.position.set(0, 3.2 + .1 * Math.sin(t * 3), -1); w.cc.rotation.y = -1.1; snap(w.cr, t); } },
    { say: 'And your beach snack? Gone.', show: ['sand', 'cc', 'pp', 'chips'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 15], look: [0, 3.4, 0], fov: 54, to: { pos: [0, 5, 14.2], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { w.chips.position.set(-.6, 0, 1); w.chips.children.forEach(ch => { const i = ch.userData.i; if (i === undefined) return; const q = Math.min(1, Math.max(0, (p - .2) * 3 - i * .1)); ch.position.set(Math.sin(i) * .3 + q * 3.6, 1.1 + Math.sin(q * Math.PI) * 2, Math.cos(i) * .3 - q * 2); ch.visible = q < .97; }); w.cc.scale.setScalar(2.2); w.cc.position.set(3.4, 0, -2); w.cc.rotation.y = Math.PI + .5; snap(w.cr, t * 1.5); stand(w, -2.6, .6, .4); pose(w.p, p > .5 ? 2.4 : .3); w.p.mouth.scale.set(1, p > .5 ? 2.6 : 1, 1); } },
    { say: 'Giant crabs: cool, scary, or way too snappy? Comment below.',
      quiz: { q: 'Would you want giant crabs?', options: ['Cool', 'Scary', 'Way too snappy'], answer: 'Made up. The Japanese spider crab spans about 3.7 m.' },
      show: ['sand', 'cc'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.4, 8], look: [0, 3, 0], fov: 48, to: { pos: [-1, 1.4, 8], look: [0, 3, 0] } },
      update: (w, p, t) => { w.cc.scale.setScalar(1.4); w.cc.position.set(0, 0, 0); w.cc.rotation.y = -Math.PI / 2 + .5; snap(w.cr, t); } },
  ],
};

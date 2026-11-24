// Narrative 16: "What Would Happen If… (season 6)". Big-animal premise (167 giant cats 284, 265 giant bunnies).
// Hook: the premise as a question under 2 s; first frame shows a house-sized penguin waddling past a house.

function penguin(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const blk = mat('#1E2430', { rough: .5 }), wht = mat('#F5F5F5'), org = mat('#F5A623');
  const pg = { root: group([0, 0, 0], parent) };
  pg.body = group([0, 0, 0], pg.root);
  const b = ball(1, blk, [0, 1.3, 0], pg.body); b.scale.set(.9, 1.3, .85);
  const bl = ball(.85, wht, [0, 1.2, .3], pg.body); bl.scale.set(.85, 1.2, .7);
  pg.head = group([0, 2.75, 0], pg.body); ball(.55, blk, [0, 0, 0], pg.head); for (const s of [-1, 1]) { ball(.16, wht, [s * .22, .08, .44], pg.head); ball(.08, mat('#111111'), [s * .22, .08, .56], pg.head); }
  const bk = cone(.12, .4, org, [0, -.1, .6], pg.head, 8); bk.rotation.x = Math.PI / 2;
  pg.flippers = [-1, 1].map(s => { const f = group([s * .85, 1.8, 0], pg.body); const fm = ball(.35, blk, [0, -.5, 0], f); fm.scale.set(.25, 1.4, .6); f.userData.s = s; return f; });
  for (const s of [-1, 1]) { const ft = box(.35, .1, .5, org, [s * .35, .05, .3], pg.root); }
  return pg;
}
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
const waddle = (pg, t) => { pg.body.rotation.z = .12 * Math.sin(t * 5); pg.flippers.forEach(f => f.rotation.z = f.userData.s * (.2 + .2 * Math.abs(Math.sin(t * 5)))); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.snow = k.ground('#EEF4FA', .005);
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 20; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-40 + i * 4, .03, 0], w.road);
  w.pg = penguin(k, k.scene); w.pr = w.pg.root;
  w.p = person(k, k.scene, '#2FA36B'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = group([0, 0, 0], w.cars); box(2.6, .8, 1.4, mat(['#E2453C', '#3B6FD6', '#FFC21F', '#8E44AD'][i]), [0, .6, 0], c); box(1.4, .6, 1.3, mat('#9FD3EE'), [-.2, 1.2, 0], c); c.userData.i = i; }
  w.hill = group(); const hb = cone(14, 9, mat('#EEF4FA'), [0, 4.5, 0], w.hill, 24);
  w.fish = group(); for (let i = 0; i < 4; i++) { const f = group([0, 0, 0], w.fish); const fb = ball(.35, mat('#9FB8C8'), [0, 0, 0], f); fb.scale.set(1.6, .7, .4); const tl = cone(.25, .4, mat('#9FB8C8'), [-.6, 0, 0], f, 4); tl.rotation.z = Math.PI / 2; f.userData.i = i; }
  w.stall = group(); box(4, .2, 2, mat('#8B5A2B'), [0, 2, 0], w.stall); for (const x of [-1.9, 1.9]) box(.15, 4, .15, mat('#6B4B2E'), [x, 2, -.9], w.stall); box(4.4, .2, 2.4, mat('#E2453C'), [0, 4.1, -.4], w.stall); for (const [x, z] of [[-1.9, .9], [1.9, .9]]) box(.15, 2, .15, mat('#6B4B2E'), [x, 1, z], w.stall);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };

export default {
  id: '273',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PENGUINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PENGUINS', 'WERE GIANT?'],
  title: 'What would happen if penguins were giant?',
  description: 'Traffic jams, but slower. Every snowy hill becomes a slide. The fish shop sells out in one gulp. And their hugs are the coldest in the world. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'penguin', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant penguins are made up. Quiz fact: emperor penguins, the largest living penguins, can stand over a metre tall (British Antarctic Survey).'],
  setup,
  scenes: [
    { say: 'What if penguins were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 22], look: [-1, 6.2, 0], fov: 52, to: { pos: [2, 3, 20.5], look: [-1, 6.2, 0], fov: 50 } },
      update: (w, p, t) => { w.pr.scale.setScalar(4); w.pr.position.set(-3 + t * .8, 0, -6); w.pr.rotation.y = .5; waddle(w.pg, t); w.house.position.set(5, 0, -2); stand(w, 1.5, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.5; } },
    { say: 'Traffic? Even slower.', label: '*WADDLE*', show: ['ground', 'road', 'pr', 'cars'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 6, 20], look: [-4, 4, 0], fov: 54, to: { pos: [5, 6, 19], look: [-4, 4, 0], fov: 52 } },
      update: (w, p, t) => { w.pr.scale.setScalar(3.4); w.pr.position.set(-2 + p * 1.5, 0, 0); w.pr.rotation.y = Math.PI / 2; waddle(w.pg, t); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-7 - i * 3.2 + p * 1.5, 0, (i % 2) * .4 - .2); }); } },
    { say: 'Snowy hills? The best slide ever.', show: ['snow', 'pr', 'hill'], sky: '#DCEBF7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 24], look: [0, 5, 0], fov: 56, to: { pos: [0, 6, 22.5], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.hill.position.set(-6, 0, -8); const q = p; w.pr.scale.setScalar(2.4); w.pr.position.set(-6 + q * 9, Math.max(.6, 9 * (1 - q * 1.4)), -8 + q * 7); w.pr.rotation.set(Math.PI / 2 - .2, 0, 0); w.pr.rotation.order = 'YXZ'; w.pr.rotation.y = Math.PI / 2 - .6; w.pg.flippers.forEach(f => f.rotation.z = f.userData.s * 1.2); w.pg.body.rotation.z = 0; } },
    { say: 'The fish shop? Sold out in one gulp.', show: ['ground', 'pr', 'stall', 'fish', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 17], look: [0, 5, 0], fov: 54, to: { pos: [3, 5, 16], look: [0, 5, 0], fov: 52 } },
      update: (w, p, t) => { w.pr.rotation.order = 'XYZ'; w.pr.rotation.set(0, .4, 0); w.pr.scale.setScalar(3); w.pr.position.set(-3, 0, -3); waddle(w.pg, t * .5); w.pg.head.rotation.x = p > .4 && p < .6 ? -.5 : 0; w.stall.position.set(2.4, 0, 0); stand(w, 4, 2.4, -.6); pose(w.p, p > .6 ? 2.4 : .2); w.p.mouth.scale.set(1, p > .6 ? 2.6 : 1, 1); w.fish.children.forEach(f => { const i = f.userData.i, q = Math.min(1, Math.max(0, (p - .3) * 4 - i * .25)); f.position.set(1.4 + i * .6 + q * (-4.4 - i * .6), 2.4 + q * 6, .2 - q * 3); f.visible = q < .98; }); } },
    { say: 'And penguin hugs? The coldest in the world.', label: '*BRRR*', show: ['snow', 'pr', 'pp'], sky: '#DCEBF7', lightAt: [4, 14, 10], lightDist: 40, shake: () => .04,
      cam: { pos: [1, 5, 15], look: [0, 5.6, 0], fov: 52, to: { pos: [1, 5, 14], look: [0, 5.6, 0], fov: 50 } },
      update: (w, p, t) => { w.pr.rotation.order = 'XYZ'; w.pr.rotation.set(0, 0, 0); w.pr.scale.setScalar(3.2); w.pr.position.set(0, 0, -2.2); w.pg.body.rotation.z = 0; w.pg.flippers.forEach(f => f.rotation.set(-1.1, 0, f.userData.s * .6)); stand(w, 0, 1.2, 0); w.pp.position.y = 2.4; w.pp.rotation.z = .06 * Math.sin(t * 30); pose(w.p, .2); w.p.mouth.scale.set(1, .5, 1); w.p.eyes.forEach(e => e.scale.set(1, .4, 1)); } },
    { say: 'Giant penguins: cute, scary, or way too cold? Comment below.',
      quiz: { q: 'Would you want a giant penguin?', options: ['Cute', 'Scary', 'Way too cold'], answer: 'Made up. Emperor penguins can stand over a metre tall.' },
      show: ['snow', 'pr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.pr.rotation.order = 'XYZ'; w.pr.rotation.set(0, 0, 0); w.pr.scale.setScalar(1.5); w.pr.position.set(0, 0, 0); waddle(w.pg, t); } },
  ],
};

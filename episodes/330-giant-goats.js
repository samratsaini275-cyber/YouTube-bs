// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a giant goat standing on a house roof.

function goat(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const fur = mat('#F2EEE6', { rough: .8 }), horn = mat('#8A7A60'), hoof = mat('#3A2A1A');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, fur, [0, 2.1, 0], g.body); b.scale.set(1.5, .85, .8);
  g.head = group([1.5, 2.9, 0], g.body); const hd = ball(.5, fur, [0, 0, 0], g.head); hd.scale.set(1.3, .9, .8); const muz = ball(.3, mat('#E8DCC8'), [.55, -.15, 0], g.head); muz.scale.set(1, .8, .9);
  for (const z of [-1, 1]) { const e = ball(.13, mat('#F2C94C'), [.3, .18, z * .3], g.head); const pu = box(.14, .05, .03, mat('#111111'), [.36, .18, z * .41], g.head); const h = cone(.08, .6, horn, [-.15, .5, z * .18], g.head, 8); h.rotation.z = .6; const ear = ball(.15, fur, [-.1, .1, z * .45], g.head); ear.scale.set(1.4, .4, .8); }
  const beard = cone(.12, .35, mat('#E8DCC8'), [.6, -.5, 0], g.head, 6); beard.rotation.x = Math.PI;
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * .9, 1.5, z * .4], g.body); cyl(.13, .11, 1.3, fur, [0, -.65, 0], l, 8); cyl(.13, .13, .2, hoof, [0, -1.35, 0], l, 8); g.legs.push(l); }
  return g;
}
const trot = (g, t, a = .3) => g.legs.forEach((l, i) => l.rotation.z = a * Math.sin(t * 8 + (i === 0 || i === 3 ? 0 : Math.PI)));
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
  w.gt = goat(k, k.scene); w.gr = w.gt.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(5, 4, 4, mat('#F2D9B8'), [0, 2, 0], w.house); const roof = cone(4, 2.6, mat('#B3262E'), [0, 5.3, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1.1, 2, .1, mat('#8B5A2B'), [0, 1, 2.02], w.house);
  w.line = group(); for (const x of [-4, 4]) cyl(.08, .08, 3.5, mat('#888888'), [x, 1.75, 0], w.line, 6); cyl(.02, .02, 8, mat('#EEEEEE'), [0, 3.4, 0], w.line, 4).rotation.z = Math.PI / 2; w.clothes = []; const cc = ['#E2453C', '#3B6FD6', '#F2B21F', '#9B59B6']; for (let i = 0; i < 4; i++) { const c = box(1, 1.2, .05, mat(cc[i]), [-2.7 + i * 1.8, 2.75, 0], w.line); w.clothes.push(c); }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; } w.dent = ball(.3, mat('#A8302A'), [-1.2, .7, 0], w.car); w.dent.scale.set(.3, 1, 1);
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFE45C', { glow: .8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const gtAt = (w, x, y, z, ry, s) => { w.gr.position.set(x, y, z); w.gr.rotation.set(0, ry, 0); w.gr.scale.setScalar(s); w.gt.body.rotation.set(0, 0, 0); w.gt.head.rotation.set(0, 0, 0); w.gt.legs.forEach(l => l.rotation.z = 0); };

export default {
  id: '330',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT GOATS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GOATS', 'WERE GIANT?'],
  title: 'What would happen if goats were giant?',
  description: 'Your roof becomes their mountain. Your washing line? Lunch. And one headbutt leaves a dent in your car. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'goat', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant goats are made up. Quiz fact: goats have sideways rectangular pupils, which give them a very wide view of the ground around them (Banks et al., Science Advances, 2015).'],
  setup,
  scenes: [
    { say: 'What if goats were giant?', show: ['ground', 'gr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 25], look: [0, 11, 0], fov: 54, to: { pos: [1, 4, 23.5], look: [0, 11, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -2); gtAt(w, -.8, 5.2, -2, -1, 2); w.gt.head.rotation.z = .1 * Math.sin(t * 3); stand(w, 2.4, 4, -.3); pose(w.p, .3); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.4; w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Your roof? Their mountain.', show: ['ground', 'gr', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 22], look: [0, 6, 0], fov: 54, to: { pos: [3, 7, 21], look: [0, 6, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -1); const q = Math.min(1, p * 1.3); gtAt(w, -6 + q * 5.4, Math.sin(Math.min(1, q * 1.4) * Math.PI / 2) * 5.6 + (q < .7 ? 0 : 0), -1, 0, 1.3); trot(w.gt, t); w.gt.body.rotation.z = q < .7 ? .25 : 0; } },
    { say: 'Your washing line? Lunch.', label: 'MUNCH', show: ['ground', 'gr', 'line', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 3.6, 0], fov: 54, to: { pos: [2, 5, 17], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { gtAt(w, -5.5, 0, -.8, 0, 1.3); w.gt.head.rotation.z = -.2 + .1 * Math.sin(t * 12); const eaten = Math.floor(p * 5); w.clothes.forEach((c, i) => { c.visible = i >= eaten; c.rotation.y = .2 * Math.sin(t * 3 + i); }); w.gr.position.x = -5.5 + eaten * 1.8; stand(w, 4.6, 3.6, -.6); pose(w.p, eaten > 1 ? 2.4 : .3); w.p.mouth.scale.set(1.2, eaten > 1 ? 3 : 1, 1); } },
    { say: 'And one headbutt? Your car gets a dent.', label: '*BONK*', show: ['ground', 'gr', 'car', 'stars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .9 && t < 1.2 ? .3 : 0,
      cam: { pos: [1, 4.5, 15], look: [0, 2.8, 0], fov: 54, to: { pos: [1, 4.5, 14.2], look: [0, 2.8, 0], fov: 52 } },
      update: (w, p, t) => { w.clothes.forEach(c => c.visible = true); const run = Math.min(1, t / .9); gtAt(w, -6 + run * 3, 0, 0, 0, 1.3); trot(w.gt, t, run < 1 ? .4 : 0); w.gt.head.rotation.z = run < 1 ? -.4 : .2; const hit = t > .9; w.car.position.set(1.4 + (hit ? Math.min(.6, (t - .9) * 3) : 0), 0, 0); w.car.rotation.z = hit ? .06 * Math.sin((t - .9) * 30) * Math.max(0, 1 - (t - .9)) : 0; w.dent.visible = hit; w.stars.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 4; s.position.set(-.8 + Math.cos(a) * .8, 5 + Math.sin(a) * .3, Math.sin(a) * .8); s.visible = hit; }); } },
    { say: 'Giant goats: cute, cool, or way too hungry? Comment below.',
      quiz: { q: 'Giant goats are…', options: ['Cute', 'Cool', 'Way too hungry'], answer: 'Made up. Real goats have sideways rectangle-shaped pupils.' },
      show: ['ground', 'gr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.2, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.2, 0] } },
      update: (w, p, t) => { gtAt(w, 0, 0, 0, -.6, 1.2); w.gt.head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};

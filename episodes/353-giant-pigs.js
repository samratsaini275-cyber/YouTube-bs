// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a pig bigger than a house, facing the camera.

function pig(k, parent) {
  const { mat, ball, cyl, cone, torus, group } = k;
  const pink = mat('#F4A6B8', { rough: .7 }), dk = mat('#D97A92');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.3, pink, [0, 1.9, 0], g.body); b.scale.set(1.5, 1, 1);
  g.head = group([1.9, 2.3, 0], g.body); ball(.85, pink, [0, 0, 0], g.head);
  const sn = cyl(.38, .38, .3, dk, [.85, -.1, 0], g.head, 16); sn.rotation.z = Math.PI / 2;
  for (const z of [-1, 1]) { ball(.07, mat('#6B2E3E'), [1.01, -.1, z * .14], g.head); ball(.11, mat('#111111'), [.62, .32, z * .36], g.head); const e = cone(.28, .5, pink, [.05, .8, z * .45], g.head, 8); e.rotation.x = z * .4; }
  g.mouth = ball(.14, mat('#6B2E3E'), [.72, -.48, 0], g.head); g.mouth.scale.set(.6, .5, 1.8);
  const tl = torus(.18, .05, dk, [-2, 2.3, 0], g.body); tl.rotation.set(0, Math.PI / 2, 0);
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * 1.1, 1.1, z * .6], g.body); cyl(.25, .22, 1.1, pink, [0, -.55, 0], l, 10); cyl(.23, .23, .15, mat('#7A4A3A'), [0, -1.05, 0], l, 10); g.legs.push(l); }
  g.mud = []; for (let i = 0; i < 7; i++) { const m = ball(.35, mat('#6B4A2E'), [-1.4 + (i % 4) * .8, 1.5 + (i % 3) * .5, (i % 2 ? .95 : -.95)], g.body); m.scale.set(1.2, .7, .4); m.visible = false; g.mud.push(m); }
  return g;
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





function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.pg = pig(k, k.scene); w.pr = w.pg.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); w.walls = box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.win = []; for (const x of [-1.2, 1.2]) { const g = box(.9, .9, .08, mat('#9FD3EE', { glow: .2 }), [x, 2.3, 1.72], w.house); w.win.push(g); }
  w.puddle = cyl(6, 6, .1, mat('#6B4A2E'), [0, .06, 0], undefined, 28);
  w.splat = group(); for (let i = 0; i < 18; i++) { const s = ball(.3, mat('#6B4A2E'), [0, 0, 0], w.splat); s.userData.i = i; }
  w.shards = group(); for (let i = 0; i < 14; i++) { const s = box(.25, .25, .05, mat('#9FD3EE', { glow: .3 }), [0, 0, 0], w.shards); s.userData.i = i; }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.dirt = cyl(2.4, 2.4, .12, mat('#7A5A3A'), [0, .07, 0], undefined, 20);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pgAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pg.body.rotation.set(0, 0, 0); w.pg.head.rotation.set(0, 0, 0); w.pg.mouth.scale.set(.6, .5, 1.8); w.pg.legs.forEach(l => l.rotation.set(0, 0, 0)); w.pg.mud.forEach(m => m.visible = false); };

export default {
  id: '353',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PIGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PIGS', 'WERE GIANT?'],
  title: 'What would happen if pigs were giant?',
  description: 'One roll in the mud splatters the whole street. One oink breaks every window. And it digs up your car looking for snacks. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'pig', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant pigs are made up. Quiz fact: pigs have very few working sweat glands, so they wallow in mud to cool down (Encyclopaedia Britannica, "pig").'],
  setup,
  scenes: [
    { say: 'What if pigs were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 8.4, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 8.4, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -2.8, 0, -4, -1.15, 2.3); w.pg.head.rotation.z = .06 * Math.sin(t * 3); w.house.position.set(4.6, 0, -2); w.house.rotation.set(0, 0, 0); w.win.forEach(g => g.visible = true); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'One roll in the mud? The whole street is brown.', label: 'SPLOOSH', show: ['ground', 'pr', 'puddle', 'splat', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 && t < .9 ? .2 : 0,
      cam: { pos: [2, 7, 24], look: [0, 3.4, 0], fov: 56, to: { pos: [2, 7, 23], look: [0, 3.4, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -1.5, 0, 0, 0, 1.5); const r = Math.min(1, t / .6); w.pg.body.rotation.x = r * Math.PI * (t < 1.2 ? 1 : 0); w.pg.body.position.y = 0; w.pr.position.y = t < 1.2 ? r * 0 : 0; w.pg.mud.forEach(m => m.visible = t > .5); w.house.position.set(6.5, 0, -2); w.walls.material.color.set(t > .6 ? '#A88A64' : '#F2D9B8'); w.splat.children.forEach(s => { const i = s.userData.i, q = Math.min(1, Math.max(0, (t - .5) * 1.5)); const a = i / 18 * Math.PI * 2; s.position.set(-1.5 + Math.cos(a) * q * 9, .5 + Math.sin(q * Math.PI) * 4 * (1 + (i % 3) * .3), Math.sin(a) * q * 5); s.visible = t > .5 && t < 1.8; }); } },
    { say: 'One oink? Every window breaks.', label: 'OINK!', show: ['ground', 'pr', 'house', 'shards'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.5 ? .25 : 0,
      cam: { pos: [3, 5, 20], look: [1, 4, 0], fov: 56, to: { pos: [3, 5, 19], look: [1, 4, 0], fov: 54 } },
      update: (w, p, t) => { w.walls.material.color.set('#F2D9B8'); pgAt(w, -3.4, 0, -1, -.6, 1.4); const o = t > 1; w.pg.mouth.scale.set(o ? 1.4 : .6, o ? 2.2 : .5, 1.8); w.pg.head.rotation.z = o ? .25 : 0; w.house.position.set(4.8, 0, -3); w.house.rotation.y = -.35; w.win.forEach(g => g.visible = !o); w.shards.children.forEach(s => { const i = s.userData.i, q = Math.max(0, t - 1); s.position.set(4.8 + (i % 2 ? -1.1 : 1.1) * .9 + Math.cos(i) * q * 2, 2.3 - q * q * 5 + Math.sin(i * 3) * .4, -1.2 + q * 3); s.rotation.set(t * 5 + i, t * 3, 0); s.visible = o && 2.3 - q * q * 5 > 0; }); stand(w, 2.4, 6, -.5); pose(w.p, o ? 2.4 : .3); w.p.mouth.scale.set(1.2, o ? 3 : 1, 1); } },
    { say: 'And when it digs for snacks? It finds your car.', label: 'SNIFF SNIFF', show: ['ground', 'pr', 'dirt', 'car', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3.2, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3.2, 0], fov: 54 } },
      update: (w, p, t) => { w.win.forEach(g => g.visible = true); pgAt(w, -3.6, 0, 0, 0, 1.3); w.pg.body.rotation.z = -.25; w.pg.head.rotation.z = -.3 + .1 * Math.sin(t * 12); w.dirt.position.set(.6, .07, 0); const up = Math.min(1, Math.max(0, (p - .35) * 2.5)); w.car.position.set(.8, -1 + up * 2.4, 0); w.car.rotation.set(0, 0, up * .5); stand(w, 3, 3.4, -.6); pose(w.p, up > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, up > .5 ? 3 : 1, 1); } },
    { say: 'Giant pigs: cool, cute, or way too muddy? Comment below.',
      quiz: { q: 'Giant pigs are…', options: ['Cool', 'Cute', 'Way too muddy'], answer: 'Made up. Real pigs roll in mud to cool down.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [8, 4, 8], look: [0, 2.6, 0], fov: 54, to: { pos: [10, 4, 2], look: [0, 2.6, 0] } },
      update: (w, p, t) => { pgAt(w, 0, 0, 0, -.6, 1.1); w.pg.head.rotation.z = .06 * Math.sin(t * 3); } },
  ],
};

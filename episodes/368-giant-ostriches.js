// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows an ostrich taller than a house.

function ostrich(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const blk = mat('#2A2A2E', { rough: .9 }), wht = mat('#F4F1EA'), pink = mat('#E8B0A0');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.2, blk, [0, 3.4, 0], g.body); b.scale.set(1.3, .9, 1); const tl = ball(.6, wht, [-1.4, 3.6, 0], g.body); tl.scale.set(1, .8, 1.2);
  g.neck = group([1.1, 3.8, 0], g.body); cyl(.15, .22, 2.6, pink, [0, 1.3, 0], g.neck, 8);
  g.head = group([1.1, 6.5, 0], g.body); ball(.38, pink, [0, 0, 0], g.head);
  for (const z of [-1, 1]) { ball(.15, mat('#FFFFFF'), [.18, .1, z * .26], g.head); ball(.08, mat('#111111'), [.25, .1, z * .32], g.head); }
  g.beak = cone(.14, .45, mat('#E8A23A'), [.5, -.05, 0], g.head, 8); g.beak.rotation.z = -Math.PI / 2;
  g.legs = []; for (const z of [-1, 1]) { const l = group([.1, 2.7, z * .4], g.body); cyl(.13, .1, 2.7, pink, [0, -1.35, 0], l, 8); const f = ball(.2, pink, [.2, -2.7, 0], l); f.scale.set(1.6, .4, 1); g.legs.push(l); }
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
  w.road = box(80, .05, 6, mat('#555B66'), [0, .03, 3]); w.lines = group(); for (let i = 0; i < 20; i++) box(1.5, .06, .15, mat('#FFFFFF'), [-38 + i * 4, .05, 3], w.lines);
  w.os = ostrich(k, k.scene); w.osr = w.os.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.dust = group(); for (let i = 0; i < 10; i++) { const d = ball(.3, mat('#D8C8A0'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  w.pan = group(); cyl(4, 4, .4, mat('#333333'), [0, .2, 0], w.pan, 28); const hd = box(4, .3, .6, mat('#333333'), [6, .3, 0], w.pan); w.white = cyl(3.4, 3.4, .1, mat('#FFFFFF'), [0, .45, 0], w.pan, 24); w.yolk = ball(1.3, mat('#F2B233', { glow: .2 }), [0, .5, 0], w.pan); w.yolk.scale.y = .4;
  w.egg = ball(1, mat('#F4EEDC'), [0, 0, 0]); w.egg.scale.set(1, 1.3, 1);
  w.pole = group(); cyl(.15, .15, 6, mat('#555555'), [0, 3, 0], w.pole, 8); box(1.2, .2, .4, mat('#555555'), [.5, 6, 0], w.pole); ball(.25, mat('#FFE9A0', { glow: .8 }), [1, 5.8, 0], w.pole);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const osAt = (w, x, y, z, ry, s) => { w.osr.position.set(x, y, z); w.osr.rotation.set(0, ry, 0); w.osr.scale.setScalar(s); w.os.body.rotation.set(0, 0, 0); w.os.neck.rotation.set(0, 0, 0); w.os.head.position.set(1.1, 6.5, 0); w.os.head.rotation.set(0, 0, 0); w.os.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const run = (w, t, f = 14) => w.os.legs.forEach((l, i) => l.rotation.z = .7 * Math.sin(t * f + i * Math.PI));

export default {
  id: '368',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT OSTRICHES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OSTRICHES', 'WERE GIANT?'],
  title: 'What would happen if ostriches were giant?',
  description: 'It races your car, and wins. One egg feeds the whole town. And hide and seek? It hides behind a lamp post. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'ostrich', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant ostriches are made up. Quiz fact: ostriches do not bury their heads in the sand; that is a myth. They lower their heads to the ground to turn their eggs in the nest or to lie low (San Diego Zoo Wildlife Alliance, "Ostrich"; Encyclopaedia Britannica, "ostrich").'],
  setup,
  scenes: [
    { say: 'What if ostriches were giant?', show: ['ground', 'osr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 11.6, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 11.6, 0], fov: 54 } },
      update: (w, p, t) => { osAt(w, -3, 0, -5, -1.0, 2); w.os.neck.rotation.z = -.9; w.os.head.position.set(3.14, 5.5, 0); w.os.head.rotation.z = -.3 + .1 * Math.sin(t * 3); w.house.position.set(4.6, 0, -2); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'It races your car. And wins.', label: 'ZOOOM', show: ['ground', 'road', 'lines', 'osr', 'car', 'dust'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 4.6, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { w.lines.position.x = -(t * 14) % 4; w.car.position.set(-1.5 - p * 3, .03 * Math.abs(Math.sin(t * 20)), 4); osAt(w, -1 + p * 3, 0, 1, 0, 1.2); run(w, t, 16); w.os.body.rotation.z = -.15; w.dust.children.forEach(d => { const i = d.userData.i, q = (t * 2 + i / 10) % 1; d.position.set(-1 + p * 3 - 1 - q * 4, .3 + q, 1 + Math.sin(i) * .6); d.scale.setScalar(.5 + q * 1.5); }); } },
    { say: 'One egg? Breakfast for the whole town.', label: 'SIZZLE', show: ['ground', 'pan', 'egg', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 9, 18], look: [0, 1, 0], fov: 56, to: { pos: [3, 9, 17], look: [0, 1, 0], fov: 54 } },
      update: (w, p, t) => { w.pan.position.set(-1, 0, 0); const crack = p > .4; w.egg.position.set(-1, crack ? -5 : 5 - Math.min(1, p * 2.5) * 3, 0); w.egg.visible = !crack; w.white.visible = crack; w.yolk.visible = crack; w.yolk.scale.set(1 + .03 * Math.sin(t * 10), .4, 1); stand(w, 3.6, 3.4, -.7); pose(w.p, crack ? 2.4 : .4); w.p.mouth.scale.set(1.2, crack ? 3 : 1, 1); } },
    { say: 'And hide and seek? It hides behind a lamp post.', label: 'FOUND YOU', show: ['ground', 'osr', 'pole', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 20], look: [0, 5, 0], fov: 56, to: { pos: [2, 5, 19], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.pole.position.set(0, 0, 1); osAt(w, -1, 0, -.5, 0, 1.2); w.os.head.position.set(1.1, 6.5, 0); w.os.head.rotation.y = .3 * Math.sin(t * 2); stand(w, 4.2, 4, -.6); pose(w.p, p > .5 ? 1.6 : .3, p > .5 ? 1.2 : 0); w.p.mouth.scale.set(1.2, p > .5 ? 2.4 : 1, 1); } },
    { say: 'Giant ostriches: cool, cute, or way too fast? Comment below.',
      quiz: { q: 'Giant ostriches are…', options: ['Cool', 'Cute', 'Way too fast'], answer: 'Made up. And real ostriches never bury their heads in sand. That is a myth.' },
      show: ['ground', 'osr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [9, 5, 9], look: [0, 5.2, 0], fov: 54, to: { pos: [11, 5, 2], look: [0, 5.2, 0] } },
      update: (w, p, t) => { osAt(w, 0, 0, 0, -.6, 1); w.os.head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};

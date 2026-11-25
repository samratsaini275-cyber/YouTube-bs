// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a monkey taller than a house, facing the camera.

function monkey(k, parent) {
  const { mat, ball, cyl, group } = k;
  const br = mat('#8A5A34', { rough: .85 }), tan = mat('#E8C9A0');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, br, [0, 2.6, 0], g.body); b.scale.set(.9, 1.15, .8); const bl = ball(.7, tan, [0, 2.5, .35], g.body); bl.scale.set(.8, 1.1, .6);
  g.head = group([0, 4.2, 0], g.body); ball(.8, br, [0, 0, 0], g.head); const fc = ball(.6, tan, [0, -.1, .4], g.head); fc.scale.set(1.1, .9, .7);
  for (const x of [-1, 1]) { ball(.12, mat('#111111'), [x * .24, .1, .82], g.head); const e = ball(.3, br, [x * .85, .1, 0], g.head); e.scale.z = .5; ball(.18, tan, [x * .87, .1, .06], g.head); }
  g.mouth = ball(.16, mat('#5A2E1E'), [0, -.35, .82], g.head); g.mouth.scale.set(1.6, .5, .5);
  g.arms = []; for (const x of [-1, 1]) { const a = group([x * .8, 3.3, 0], g.body); cyl(.18, .16, 2.2, br, [0, -1.1, 0], a, 8); ball(.26, tan, [0, -2.2, 0], a); a.rotation.z = x * .25; g.arms.push(a); }
  g.legs = []; for (const x of [-1, 1]) { const l = group([x * .45, 1.6, 0], g.body); cyl(.2, .18, 1.4, br, [0, -.7, 0], l, 8); const f = ball(.25, tan, [0, -1.45, .15], l); f.scale.set(1, .5, 1.4); g.legs.push(l); }
  g.tail = group([0, 1.9, -.6], g.body); let par = g.tail; for (let i = 0; i < 6; i++) { const s = group(i ? [0, .45, -.05] : [0, 0, 0], par); cyl(.09, .09, .5, br, [0, .22, 0], s, 6); s.rotation.x = -.35; par = s; }
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
  w.mk = monkey(k, k.scene); w.mr = w.mk.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.poles = group(); for (const x of [-7, 7]) { cyl(.15, .15, 9, mat('#7A5A3A'), [x, 4.5, 0], w.poles, 8); box(1.6, .15, .15, mat('#7A5A3A'), [x, 8.6, 0], w.poles); }
  w.wire = cyl(.05, .05, 14, mat('#222222'), [0, 8.7, 0], w.poles, 6); w.wire.rotation.z = Math.PI / 2;
  w.sparks = group(); for (let i = 0; i < 10; i++) { const s = ball(.12, mat('#FFE14A', { glow: 1 }), [0, 0, 0], w.sparks); s.userData.i = i; s.castShadow = false; }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); w.carTop = group([0, 1.1, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, .25, 0], w.carTop); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const mkAt = (w, x, y, z, ry, s) => { w.mr.position.set(x, y, z); w.mr.rotation.set(0, ry, 0); w.mr.scale.setScalar(s); w.mk.head.rotation.set(0, 0, 0); w.mk.mouth.scale.set(1.6, .5, .5); w.mk.arms.forEach((a, i) => a.rotation.set(0, 0, (i ? 1 : -1) * .25)); w.mk.legs.forEach(l => l.rotation.set(0, 0, 0)); };

export default {
  id: '356',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT MONKEYS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF MONKEYS', 'WERE GIANT?'],
  title: 'What would happen if monkeys were giant?',
  description: 'It swings on the power lines. It peels your car like a banana. And it copies everything you do. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'monkey', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant monkeys are made up. Quiz fact: some monkeys in Central and South America, such as spider monkeys and howler monkeys, have prehensile tails that can grip branches (Encyclopaedia Britannica, "monkey").'],
  setup,
  scenes: [
    { say: 'What if monkeys were giant?', show: ['ground', 'mr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 9.4, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 9.4, 0], fov: 54 } },
      update: (w, p, t) => { mkAt(w, -2.6, 0, -4, .25, 2.2); w.mk.head.rotation.z = .1 * Math.sin(t * 3); w.mk.arms[0].rotation.z = -2.6 + .3 * Math.sin(t * 6); w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'It swings on the power lines.', label: 'ZAP!', show: ['ground', 'mr', 'poles', 'sparks'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .8 && t < 1.2 ? .2 : 0,
      cam: { pos: [0, 6, 22], look: [0, 6, 0], fov: 56, to: { pos: [0, 6, 21], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { const sw = Math.sin(t * 3) * .5; mkAt(w, 0, 0, 0, 0, 1.3); w.mr.position.set(Math.sin(sw) * 4, 8.7 - Math.cos(sw) * 4 * 0 - 1.3 * 5.8, 0); w.mr.rotation.z = sw; w.mk.arms.forEach(a => a.rotation.z = (a === w.mk.arms[0] ? -1 : 1) * 2.9); w.mk.legs.forEach((l, i) => l.rotation.x = .4 * Math.sin(t * 4 + i)); w.wire.position.y = 8.7 - .4 * Math.abs(Math.sin(t * 3)); w.sparks.children.forEach(s => { const i = s.userData.i, q = ((t - .8) * 1.5 + i / 10) % 1; s.position.set(-6.8 + (i % 2) * 13.6, 8.7 + q * 1.5 * Math.sin(i), Math.cos(i * 3) * q); s.visible = t > .8; }); } },
    { say: 'Your car? Peeled like a banana.', label: 'RRRIP', show: ['ground', 'mr', 'car', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3.6, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3.6, 0], fov: 54 } },
      update: (w, p, t) => { w.mr.rotation.z = 0; mkAt(w, -2.4, 0, -1, .4, 1.2); w.car.position.set(1, 0, .8); const pe = Math.min(1, Math.max(0, (p - .35) * 2.5)); w.carTop.rotation.z = pe * 2.4; w.carTop.position.set(-pe * .8, 1.1 + pe * .6, 0); w.mk.arms[1].rotation.z = .25 + pe * 1.2; w.mk.mouth.scale.set(1.6, pe > .5 ? 1.5 : .5, .5); stand(w, 3.6, 3.4, -.6); pose(w.p, pe > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, pe > .5 ? 3 : 1, 1); } },
    { say: 'And it copies everything you do.', label: 'MONKEY SEE…', show: ['ground', 'mr', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 20], look: [0, 4.4, 0], fov: 56, to: { pos: [2, 4, 19], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { mkAt(w, -2.2, 0, -2, .3, 1.5); stand(w, 2.4, 3.5, -.4); const ph = Math.floor(t / .9) % 3; const up = ph === 0 ? 2.6 : ph === 1 ? .2 : 1.4; pose(w.p, up); w.p.head.rotation.z = ph === 2 ? .3 : 0; const lag = Math.floor(Math.max(0, t - .35) / .9) % 3; const mu = lag === 0 ? 2.6 : lag === 1 ? .2 : 1.4; w.mk.arms[0].rotation.z = -mu; w.mk.arms[1].rotation.z = mu; w.mk.head.rotation.z = lag === 2 ? .3 : 0; } },
    { say: 'Giant monkeys: cool, cute, or way too cheeky? Comment below.',
      quiz: { q: 'Giant monkeys are…', options: ['Cool', 'Cute', 'Way too cheeky'], answer: 'Made up. Some real monkeys can grip branches with their tails.' },
      show: ['ground', 'mr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 3.5, 10], look: [0, 3.4, 0], fov: 54, to: { pos: [-3, 3.5, 10], look: [0, 3.4, 0] } },
      update: (w, p, t) => { mkAt(w, 0, 0, 0, 0, 1.1); w.mk.head.rotation.z = .1 * Math.sin(t * 3); w.mk.arms[0].rotation.z = -2.6 + .3 * Math.sin(t * 6); } },
  ],
};

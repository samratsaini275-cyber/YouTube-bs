// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a mole bursting out of a hill bigger than a house.

function mole(k, parent) {
  const { mat, ball, cyl, cone, group, box } = k;
  const fur = mat('#4A4048', { rough: .95 }), pink = mat('#F4A6B8');
  const g = { root: group([0, 0, 0], parent) };
  g.body = ball(1.4, fur, [0, 1.4, 0], g.root); g.body.scale.set(1, 1.2, .95);
  g.head = group([0, 3, .4], g.root); const hd = ball(.9, fur, [0, 0, 0], g.head); hd.scale.set(1, .9, 1);
  g.nose = cone(.35, .9, pink, [0, -.1, 1.1], g.head, 12); g.nose.rotation.x = Math.PI / 2; ball(.2, pink, [0, -.1, 1.55], g.head);
  for (const x of [-1, 1]) ball(.07, mat('#111111'), [x * .35, .25, .8], g.head);
  g.glasses = group([0, .25, .85], g.head); for (const x of [-1, 1]) { const l = cyl(.25, .25, .05, mat('#111111', { metal: .4 }), [x * .32, 0, 0], g.glasses, 16); l.rotation.x = Math.PI / 2; } box(.3, .05, .05, mat('#111111'), [0, 0, 0], g.glasses); g.glasses.visible = false;
  g.paws = []; for (const x of [-1, 1]) { const p = group([x * 1.1, 2, .9], g.root); const pw = ball(.5, pink, [0, 0, 0], p); pw.scale.set(1.2, .5, 1); for (let i = 0; i < 4; i++) { const c = cone(.06, .3, mat('#F2EEE6'), [-.3 + i * .2, 0, .5], p, 6); c.rotation.x = Math.PI / 2; } g.paws.push(p); }
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
  w.ml = mole(k, k.scene); w.mr = w.ml.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.hill = cone(6, 7, mat('#6B4A2E', { rough: 1 }), [0, 3.5, 0], undefined, 20);
  w.mound = cone(3.2, 2.4, mat('#6B4A2E', { rough: 1 }), [0, 1.2, 0], undefined, 16);
  w.road = box(40, .05, 6, mat('#555B66'), [0, .03, 2]); w.hole = cyl(2.6, 2.6, .08, mat('#1A1410'), [0, .06, 2], undefined, 20);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.sun = ball(1.6, mat('#FFD54A', { glow: 1 }), [0, 0, 0]);
  w.rays = group(); for (let i = 0; i < 8; i++) { const r = box(.15, 1.2, .1, mat('#FFE97A', { glow: 1 }), [0, 0, 0], w.rays); r.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const mlAt = (w, x, y, z, ry, s) => { w.mr.position.set(x, y, z); w.mr.rotation.set(0, ry, 0); w.mr.scale.setScalar(s); w.ml.head.rotation.set(0, 0, 0); w.ml.glasses.visible = false; w.ml.paws.forEach(p => p.rotation.set(0, 0, 0)); };

export default {
  id: '371',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT MOLES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF MOLES', 'WERE GIANT?'],
  title: 'What would happen if moles were giant?',
  description: 'Molehills? Now they are mountains. It digs under the road, and the road is gone. And the sun? Too bright. It needs giant sunglasses. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'mole', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant moles are made up. Quiz fact: the star-nosed mole can find and eat a piece of food in as little as about 120 milliseconds, among the fastest foraging times measured in mammals (Catania and Remple, "Asymptotic prey profitability drives star-nosed moles to the foraging speed limit", Nature, 2005).'],
  setup,
  scenes: [
    { say: 'What if moles were giant?', show: ['ground', 'mr', 'mound', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 8.2, 0], fov: 56, to: { pos: [1, 4, 20.5], look: [0, 8.2, 0], fov: 54 } },
      update: (w, p, t) => { w.mound.position.set(-2.6, 1.2, -4); w.mound.scale.setScalar(1.6); mlAt(w, -2.6, 1.4 + Math.min(1, t * 2) * 1, -4, 0, 1.8); w.ml.paws.forEach((pw, i) => pw.rotation.z = (i ? -1 : 1) * .3 * Math.sin(t * 6)); w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Molehills? Now they are mountains.', label: 'RUMBLE', show: ['ground', 'hill', 'house', 'mr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t < 1 ? .15 : 0,
      cam: { pos: [2, 6, 26], look: [0, 6, 0], fov: 56, to: { pos: [2, 6, 25], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { w.mound.scale.setScalar(1); const g = Math.min(1, p * 1.8); w.hill.position.set(-1, 3.5 * g, -4); w.hill.scale.set(1, g, 1); w.house.position.set(5.6, 0, -1); mlAt(w, -1, 7 * g - 1.2, -4, 0, 1.2); w.mr.visible = g > .9; } },
    { say: 'It digs under the road. The road is gone.', label: 'CRUNCH', show: ['ground', 'road', 'hole', 'car', 'mr', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 20], look: [0, 2, 0], fov: 56, to: { pos: [3, 7, 19], look: [0, 2, 0], fov: 54 } },
      update: (w, p, t) => { w.mr.visible = true; const o = Math.min(1, Math.max(0, (p - .2) * 3)); w.hole.scale.set(o + .01, 1, o + .01); w.hole.visible = o > 0; const fall = Math.max(0, p - .55) * 3; w.car.position.set(-4 + Math.min(1, p * 1.6) * 4, -fall * fall * 2, 2); w.car.rotation.z = -fall * .8; w.car.visible = w.car.position.y > -2.5; mlAt(w, 0, -.6 + (p > .8 ? (p - .8) * 6 : 0), 2, 0, .9); w.mr.visible = p > .8; stand(w, 5, 5.4, -.6); pose(w.p, fall > .3 ? 2.4 : .4); w.p.mouth.scale.set(1.2, fall > .3 ? 3 : 1, 1); } },
    { say: 'And the sun? Too bright. It needs giant sunglasses.', label: 'COOL', show: ['ground', 'mr', 'mound', 'sun', 'rays'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 16], look: [0, 4, 0], fov: 54, to: { pos: [2, 4, 15], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { w.mound.position.set(0, 1.2, 0); w.mound.scale.setScalar(1.2); mlAt(w, 0, 1.6, 0, 0, 1.3); const on = p > .55; w.ml.glasses.visible = on; w.ml.paws.forEach((pw, i) => pw.rotation.x = on ? 0 : -1.2); w.ml.head.rotation.x = on ? -.1 : .3; w.sun.position.set(5, 10, -6); w.rays.children.forEach(r => { const i = r.userData.i, a = i / 8 * Math.PI * 2 + t * .5; r.position.set(5 + Math.cos(a) * 2.6, 10 + Math.sin(a) * 2.6, -6); r.rotation.z = a - Math.PI / 2; }); } },
    { say: 'Giant moles: cool, cute, or way too messy? Comment below.',
      quiz: { q: 'Giant moles are…', options: ['Cool', 'Cute', 'Way too messy'], answer: 'Made up. Real star-nosed moles can eat a snack in about a tenth of a second.' },
      show: ['ground', 'mr', 'mound'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 3.5, 10], look: [0, 3, 0], fov: 54, to: { pos: [-3, 3.5, 10], look: [0, 3, 0] } },
      update: (w, p, t) => { w.mound.position.set(0, 1.2, 0); w.mound.scale.setScalar(1); mlAt(w, 0, 1.4, 0, 0, 1); w.ml.glasses.visible = true; w.ml.paws.forEach((pw, i) => pw.rotation.z = (i ? -1 : 1) * .3 * Math.sin(t * 6)); } },
  ],
};

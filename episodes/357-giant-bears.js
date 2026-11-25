// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a bear taller than a house, waving.

function bear(k, parent) {
  const { mat, ball, cyl, group } = k;
  const br = mat('#6E4A2E', { rough: .9 }), tan = mat('#C9A27A');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.2, br, [0, 2.5, 0], g.body); b.scale.set(1, 1.2, .9); const bl = ball(.8, tan, [0, 2.3, .5], g.body); bl.scale.set(.9, 1.1, .5);
  g.head = group([0, 4.3, 0], g.body); ball(.85, br, [0, 0, 0], g.head); const mz = ball(.4, tan, [0, -.2, .72], g.head); mz.scale.set(1.1, .8, .7);
  ball(.13, mat('#111111'), [0, -.05, 1.0], g.head);
  for (const x of [-1, 1]) { ball(.1, mat('#111111'), [x * .3, .22, .76], g.head); ball(.3, br, [x * .6, .7, 0], g.head); ball(.15, tan, [x * .6, .72, .14], g.head); }
  g.mouth = ball(.12, mat('#4A2A1A'), [0, -.42, .88], g.head); g.mouth.scale.set(1.5, .5, .5);
  g.arms = []; for (const x of [-1, 1]) { const a = group([x * 1, 3.3, 0], g.body); cyl(.32, .28, 1.8, br, [0, -.9, 0], a, 10); ball(.34, br, [0, -1.85, 0], a); a.rotation.z = x * .3; g.arms.push(a); }
  g.legs = []; for (const x of [-1, 1]) { const l = group([x * .55, 1.3, 0], g.body); cyl(.38, .34, 1.2, br, [0, -.6, 0], l, 10); const f = ball(.4, br, [0, -1.2, .2], l); f.scale.set(1, .5, 1.3); g.legs.push(l); }
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
  w.br = bear(k, k.scene); w.bR = w.br.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.garage = group(); box(5, 3, 4, mat('#D9D2C4'), [0, 1.5, 0], w.garage); box(5.4, .3, 4.4, mat('#7A7A7A'), [0, 3.1, 0], w.garage); w.gdoor = box(3.6, 2.4, .1, mat('#B0B7C0'), [0, 1.2, 2.02], w.garage);
  w.snow = group(); for (let i = 0; i < 30; i++) { const s = ball(.08, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.snow); s.userData.i = i; s.castShadow = false; }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.18, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  w.fridge = group(); w.fBody = box(2, 3.6, 1.6, mat('#EEF2F5'), [0, 1.8, 0], w.fridge); w.fDoor = group([-1, 0, .82], w.fridge); box(2, 3.6, .1, mat('#DDE3E8'), [1, 1.8, 0], w.fDoor);
  w.food = group(); const jar = cyl(.35, .35, .6, mat('#F2B233', { glow: .3 }), [0, 0, 0], w.food, 12); const lid = cyl(.37, .37, .12, mat('#C0392B'), [0, .35, 0], w.food, 12);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const brAt = (w, x, y, z, ry, s) => { w.bR.position.set(x, y, z); w.bR.rotation.set(0, ry, 0); w.bR.scale.setScalar(s); w.br.body.rotation.set(0, 0, 0); w.br.head.rotation.set(0, 0, 0); w.br.mouth.scale.set(1.5, .5, .5); w.br.arms.forEach((a, i) => a.rotation.set(0, 0, (i ? 1 : -1) * .3)); w.br.legs.forEach(l => l.rotation.set(0, 0, 0)); };

export default {
  id: '357',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BEARS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BEARS', 'WERE GIANT?'],
  title: 'What would happen if bears were giant?',
  description: 'It sleeps in your garage all winter. It finds your fridge from a mile away. And a bear hug? Way too big. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'bear', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant bears are made up. Quiz fact: black bears can spend months in their winter dens without eating or drinking (Encyclopaedia Britannica, "bear"; "hibernation").'],
  setup,
  scenes: [
    { say: 'What if bears were giant?', show: ['ground', 'bR', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 9.4, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 9.4, 0], fov: 54 } },
      update: (w, p, t) => { brAt(w, -2.6, 0, -4, .25, 2.1); w.br.head.rotation.z = .08 * Math.sin(t * 3); w.br.arms[1].rotation.z = 2.5 + .3 * Math.sin(t * 6); w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Winter? It sleeps in your garage. For months.', label: 'ZZZ…', show: ['ground', 'bR', 'garage', 'snow', 'zzz'], sky: '#B8C8D8', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 20], look: [0, 3, 0], fov: 56, to: { pos: [2, 5, 19], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.garage.position.set(0, 0, 0); w.gdoor.visible = false; brAt(w, 0, 0, .3, 0, 1.05); w.br.head.rotation.z = .35; w.br.head.rotation.x = .25; w.br.body.scale.set(1, 1 + .03 * Math.sin(t * 2), 1); w.snow.children.forEach(s => { const i = s.userData.i, q = (t * .3 + i / 30) % 1; s.position.set(-8 + (i * 1.7) % 16, 10 - q * 10, -2 + (i % 5) * 1.6); }); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(1.4 + q * 1.2, 5 + q * 2.5, 1.4); z.scale.setScalar(.6 + q * 1.4); }); } },
    { say: 'It smells your fridge from a mile away.', label: 'SNIFF SNIFF', show: ['ground', 'bR', 'fridge', 'food', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3.8, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3.8, 0], fov: 54 } },
      update: (w, p, t) => { w.br.body.scale.set(1, 1, 1); w.gdoor.visible = true; brAt(w, -3, 0, -1, .5, 1.3); w.br.head.rotation.x = .15 * Math.sin(t * 12); const op = Math.min(1, Math.max(0, (p - .4) * 3)); w.fridge.position.set(1.6, 0, 0); w.fridge.rotation.y = -.3; w.fDoor.rotation.y = -op * 1.8; w.br.arms[1].rotation.z = .3 + op * 1.1; w.food.position.set(1.4 - op * 2.6, 2.4 + op * 1.6, .6); w.food.visible = op > .1; w.br.mouth.scale.set(1.5, op > .5 ? 1.6 : .5, .5); stand(w, 4.2, 3.6, -.6); pose(w.p, op > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, op > .5 ? 3 : 1, 1); } },
    { say: 'And a bear hug? Way too big.', label: 'SQUEEEZE', show: ['ground', 'bR', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 18], look: [0, 4.2, 0], fov: 56, to: { pos: [2, 4, 16.5], look: [0, 4.2, 0], fov: 54 } },
      update: (w, p, t) => { brAt(w, 0, 0, -1, 0, 1.5); const hug = Math.min(1, Math.max(0, (p - .3) * 3)); w.br.arms[0].rotation.set(-hug * 1.3, 0, -.3 + hug * 1.0); w.br.arms[1].rotation.set(-hug * 1.3, 0, .3 - hug * 1.0); w.br.head.rotation.z = hug * .15 * Math.sin(t * 5); stand(w, 0, 1.2, 0); w.pp.position.y = hug * 1.1; w.pp.scale.set(1 - hug * .25, 1 + hug * .15, 1 - hug * .3); pose(w.p, hug > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, hug > .5 ? 3 : 1, 1); } },
    { say: 'Giant bears: cool, cute, or way too cuddly? Comment below.',
      quiz: { q: 'Giant bears are…', options: ['Cool', 'Cute', 'Way too cuddly'], answer: 'Made up. Real black bears can go months in their dens without eating.' },
      show: ['ground', 'bR'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 3.5, 10], look: [0, 3.6, 0], fov: 54, to: { pos: [-3, 3.5, 10], look: [0, 3.6, 0] } },
      update: (w, p, t) => { brAt(w, 0, 0, 0, 0, 1.1); w.br.head.rotation.z = .08 * Math.sin(t * 3); w.br.arms[1].rotation.z = 2.5 + .3 * Math.sin(t * 6); } },
  ],
};

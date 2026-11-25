// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a moose taller than a house.

function moose(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const fur = mat('#5A3A22', { rough: .85 }), dark = mat('#3A2414'), antM = mat('#D8C49A', { rough: .6 });
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, fur, [0, 2.6, 0], g.body); b.scale.set(1.7, .95, .85); const hump = ball(.6, fur, [.8, 3.3, 0], g.body); hump.scale.set(1, .6, .8);
  g.head = group([2, 3.3, 0], g.body); const hd = ball(.5, fur, [0, 0, 0], g.head); hd.scale.set(1.2, .9, .8); const sn = ball(.42, mat('#4A2E1A'), [.65, -.25, 0], g.head); sn.scale.set(1.3, .9, .9); const bell = ball(.2, dark, [.1, -.6, 0], g.head); bell.scale.set(.6, 1.4, .6);
  for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.3, .18, z * .32], g.head); const ant = group([-.1, .35, z * .3], g.head); const palm = ball(.55, antM, [0, .05, z * .4], ant); palm.scale.set(.9, .25, 1.1); for (let i = 0; i < 4; i++) cyl(.04, .03, .35, antM, [-.3 + i * .2, .25, z * .8], ant, 5); ant.rotation.x = -z * .3; }
  g.legs = []; for (const x of [-1.1, 1.1]) for (const z of [-1, 1]) { const l = group([x, 2.1, z * .45], g.body); cyl(.15, .12, 2.1, fur, [0, -1.05, 0], l, 8); cyl(.13, .13, .2, dark, [0, -2.1, 0], l, 8); g.legs.push(l); }
  return g;
}
const walk = (g, t, a = .3) => g.legs.forEach((l, i) => l.rotation.z = a * Math.sin(t * 5 + (i === 0 || i === 3 ? 0 : Math.PI)));
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
  w.ms = moose(k, k.scene); w.mr = w.ms.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.road = box(60, .04, 6, mat('#555B66'), [0, .02, 0]); w.lines = group(); for (let i = 0; i < 12; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-26 + i * 4.8, .05, 0], w.lines);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.washing = group(); cyl(.02, .02, 7, mat('#EEEEEE'), [0, 0, 0], w.washing, 4).rotation.z = Math.PI / 2; w.clothes = []; for (let i = 0; i < 4; i++) { const c = box(.8, 1, .05, mat(['#E2453C', '#3B6FD6', '#F2B21F', '#9B59B6'][i]), [-2.4 + i * 1.6, -.5, 0], w.washing); w.clothes.push(c); }
  w.lake = box(30, .2, 14, mat('#3E8FCF', { glow: .1 }), [0, .1, -2]);
  w.ripples = group(); for (let i = 0; i < 4; i++) { const r = k.torus(1, .06, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.ripples); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const msAt = (w, x, y, z, ry, s) => { w.mr.position.set(x, y, z); w.mr.rotation.set(0, ry, 0); w.mr.scale.setScalar(s); w.ms.body.rotation.set(0, 0, 0); w.ms.head.rotation.set(0, 0, 0); w.ms.legs.forEach(l => l.rotation.z = 0); };

export default {
  id: '340',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT MOOSE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF MOOSE', 'WERE GIANT?'],
  title: 'What would happen if moose were giant?',
  description: 'Traffic drives right under them. Your washing line gets stuck in their antlers. And a swim across the lake? Easy. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'moose', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant moose are made up. Quiz fact: moose are strong swimmers; they can swim many kilometres and even dip underwater to eat water plants (Encyclopaedia Britannica, "moose").'],
  setup,
  scenes: [
    { say: 'What if moose were giant?', show: ['ground', 'mr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 11.4, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 11.4, 0], fov: 54 } },
      update: (w, p, t) => { msAt(w, -3.6, 0, -5, -.7, 2.6); w.ms.head.rotation.z = .08 * Math.sin(t * 2); w.house.position.set(3.4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Traffic? It drives right under them.', label: 'VROOM', show: ['ground', 'mr', 'road', 'lines', 'car'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 20], look: [0, 4.4, 0], fov: 56, to: { pos: [2, 4, 19], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { msAt(w, -2.6, 0, 0, 0, 1.8); walk(w.ms, t, .15); w.car.position.set(-8 + p * 16, 0, 0); } },
    { say: 'Your washing line? Stuck in their antlers.', show: ['ground', 'mr', 'washing', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 6, 20], look: [0, 6.4, 0], fov: 56, to: { pos: [3.8, 6, 19], look: [0, 6.4, 0], fov: 54 } },
      update: (w, p, t) => { msAt(w, -4 + Math.min(p, .5) * 3, 0, 0, 0, 1.8); walk(w.ms, t, p < .5 ? .3 : 0); w.mr.updateWorldMatrix(true, true); const h = w.ms.head.getWorldPosition(new w.k.THREE.Vector3()); const caught = p > .45; w.washing.position.set(caught ? h.x : 1.5, caught ? h.y + 1.1 : 5, 0); w.washing.rotation.z = caught ? .2 * Math.sin(t * 3) : 0; stand(w, 4.6, 4, -.6); pose(w.p, caught ? 2.4 : .3); w.p.mouth.scale.set(1.2, caught ? 3 : 1, 1); } },
    { say: 'And a swim across the lake? Easy.', label: 'SPLASH', show: ['ground', 'mr', 'lake', 'ripples'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 8, 22], look: [0, 3, -2], fov: 56, to: { pos: [0, 8, 21], look: [0, 3, -2], fov: 54 } },
      update: (w, p, t) => { msAt(w, -5 + p * 6.5, -2.2 + .15 * Math.sin(t * 3), -2, 0, 1.8); walk(w.ms, t, .4); w.ripples.children.forEach(r => { const i = r.userData.i, q = (t * .8 + i / 4) % 1; r.position.set(w.mr.position.x - 1 - q * 3, .25, -2); r.scale.setScalar(1 + q * 2.5); r.material.opacity = 1 - q; }); } },
    { say: 'Giant moose: cool, cute, or way too tall? Comment below.',
      quiz: { q: 'Giant moose are…', options: ['Cool', 'Cute', 'Way too tall'], answer: 'Made up. Real moose are strong swimmers and can dip underwater to eat.' },
      show: ['ground', 'mr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [12, 4, 10], look: [0, 4.4, 0], fov: 52, to: { pos: [14, 4, 2], look: [0, 4.4, 0] } },
      update: (w, p, t) => { msAt(w, 0, 0, 0, -.7, 1.4); w.ms.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};

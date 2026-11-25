// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a butterfly with house-sized wings over a house.

function butterfly(k, parent) {
  const { mat, ball, cyl, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  const body = cyl(.15, .12, 2, mat('#2A1E16'), [0, 0, 0], b.root, 8); body.rotation.z = Math.PI / 2; ball(.25, mat('#2A1E16'), [1.1, 0, 0], b.root);
  for (const z of [-1, 1]) { const a = group([1.2, .2, z * .1], b.root); const ant = cyl(.02, .02, .8, mat('#2A1E16'), [.2, .35, z * .15], a, 4); ant.rotation.z = -.5; ball(.06, mat('#2A1E16'), [.4, .7, z * .2], a); }
  b.wings = [-1, 1].map(z => { const w = group([0, 0, z * .1], b.root); const up = ball(1.4, mat('#F29A1F', { rough: .4 }), [.4, 0, z * 1.3], w); up.scale.set(1, .06, 1); const lo = ball(1, mat('#F29A1F', { rough: .4 }), [-.7, 0, z * 1], w); lo.scale.set(1, .06, 1); for (const [x, zz, r] of [[.6, 1.6, .35], [-.6, 1.1, .25], [.1, 2.1, .2]]) { const sp = ball(r, mat('#1E1E22'), [x, .05, z * zz], w); sp.scale.y = .1; const dot = ball(r * .45, mat('#FFFFFF'), [x, .08, z * zz], w); dot.scale.y = .1; } w.userData.z = z; return w; });
  return b;
}
const flutter = (b, t, sp = 9, a = .7) => b.wings.forEach(w => w.rotation.x = w.userData.z * (a * Math.sin(t * sp) + .2));
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
  w.bf = butterfly(k, k.scene); w.br = w.bf.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.gust = group(); for (let i = 0; i < 8; i++) { const l = box(1.6, .08, .08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gust); l.userData.i = i; l.castShadow = false; }
  w.hat = group(); cyl(.9, .9, .06, mat('#E2453C'), [0, 0, 0], w.hat, 20); cyl(.5, .55, .5, mat('#E2453C'), [0, .25, 0], w.hat, 20);
  w.flowers = group(); for (let i = 0; i < 5; i++) { const f = group([-4 + i * 2, 0, 0], w.flowers); cyl(.08, .08, 2, mat('#3FA34D'), [0, 1, 0], f, 6); for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2; ball(.35, mat(['#FF5FA2', '#F2B21F', '#9B59B6'][i % 3]), [Math.cos(a) * .4, 2.1, Math.sin(a) * .4], f).scale.y = .4; } ball(.25, mat('#F2C94C'), [0, 2.15, 0], f); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const bfAt = (w, x, y, z, ry, s) => { w.br.position.set(x, y, z); w.br.rotation.set(0, ry, 0); w.br.scale.setScalar(s); };

export default {
  id: '342',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BUTTERFLIES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BUTTERFLIES', 'WERE GIANT?'],
  title: 'What would happen if butterflies were giant?',
  description: 'One flap and your hat is gone. A sunny day turns shady. And landing in your garden? Every flower gets squashed. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'butterfly', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant butterflies are made up. Quiz fact: butterflies taste with their feet; sensors on their legs tell them whether a leaf is good for laying eggs (Natural History Museum, London).'],
  setup,
  scenes: [
    { say: 'What if butterflies were giant?', show: ['ground', 'br', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 8.6, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 8.6, 0], fov: 54 } },
      update: (w, p, t) => { bfAt(w, -.4, 8.2 + .3 * Math.sin(t * 3), 0, -.25, 2); w.br.rotation.x = 1.05; flutter(w.bf, t, 4, .12); w.house.position.set(1, 0, -2); stand(w, 3, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.6; w.p.head.rotation.y = -.4; } },
    { say: 'One flap? Your hat is gone.', label: 'WHOOSH', show: ['ground', 'br', 'pp', 'gust', 'hat'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 16], look: [0, 4.4, 0], fov: 56, to: { pos: [0, 5, 15.2], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { bfAt(w, -2.6, 6.4, -2, 0, 1.5); w.br.rotation.x = .8; flutter(w.bf, t, 8, .9); stand(w, 1.6, 2, -.4); pose(w.p, p > .4 ? 2.4 : .3); w.p.mouth.scale.set(1.2, p > .4 ? 3 : 1, 1); const q = Math.max(0, p - .3) * 1.6; w.hat.position.set(1.6 + q * 6, 4.4 + q * 4, 2); w.hat.rotation.set(q * 3, 0, q * 5); w.gust.children.forEach(l => { const i = l.userData.i, r = (t * 1.5 + i / 8) % 1; l.position.set(-3 + r * 8, 2 + (i % 4) * 1.2, 0); }); } },
    { say: 'A sunny day? Suddenly shady.', show: ['ground', 'br', 'pp', 'house'], sky: '#7FA8C8', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 3, 14], look: [0, 6, 0], fov: 60, to: { pos: [0, 3, 13.2], look: [0, 6, 0], fov: 58 } },
      update: (w, p, t) => { w.hat.position.set(0, -10, 0); w.house.position.set(4, 0, -3); bfAt(w, -6 + p * 10, 10, -1, 0, 3); w.br.rotation.x = 0; flutter(w.bf, t, 4, .4); stand(w, 0, 3, 0); pose(w.p, .3); w.p.head.rotation.x = -.6; w.p.eyes.forEach(e => e.scale.setScalar(1.3)); } },
    { say: 'And landing in your garden? Every flower gets squashed.', label: 'SQUISH', show: ['ground', 'br', 'flowers', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 18], look: [0, 3.4, 0], fov: 56, to: { pos: [2, 6, 17.2], look: [0, 3.4, 0], fov: 54 } },
      update: (w, p, t) => { w.p.eyes.forEach(e => e.scale.setScalar(1)); const q = Math.min(1, p * 1.6); bfAt(w, 0, 8 - q * 6, 0, 0, 2.2); flutter(w.bf, t, q < 1 ? 6 : 1.5, q < 1 ? .6 : .2); w.flowers.children.forEach((f, i) => { const squash = q >= 1 && Math.abs(f.position.x) < 3.5; f.scale.set(1, squash ? .25 : 1, 1); }); stand(w, 5.2, 4, -.6); pose(w.p, q >= 1 ? 2.4 : .3); w.p.mouth.scale.set(1.2, q >= 1 ? 3 : 1, 1); } },
    { say: 'Giant butterflies: pretty, cool, or way too big? Comment below.',
      quiz: { q: 'Giant butterflies are…', options: ['Pretty', 'Cool', 'Way too big'], answer: 'Made up. Real butterflies taste with their feet.' },
      show: ['ground', 'br'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [8, 6, 10], look: [0, 3.4, 0], fov: 52, to: { pos: [10, 6, 4], look: [0, 3.4, 0] } },
      update: (w, p, t) => { w.flowers.children.forEach(f => f.scale.set(1, 1, 1)); bfAt(w, 0, 3.4 + .3 * Math.sin(t * 2), 0, -.5, 1.4); flutter(w.bf, t, 5, .5); } },
  ],
};

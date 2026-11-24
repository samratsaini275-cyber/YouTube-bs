// Narrative 16: "What Would Happen If… (season 6)". Big-animal premise (167 giant cats 284, 147 trunks 855).
// Hook: the premise as a question under 2 s; first frame shows a house-sized bunny next to a house and a small person.

function bunny(k, parent) {
  const { mat, ball, cyl, group } = k;
  const fur = mat('#F4EFE8', { rough: .9 }), pink = mat('#FFB6C8');
  const b = { root: group([0, 0, 0], parent) };
  const body = ball(1, fur, [0, 1, 0], b.root); body.scale.set(1.2, 1, 1);
  b.head = group([0, 2.2, .55], b.root); ball(.65, fur, [0, 0, 0], b.head);
  b.ears = [-1, 1].map(s => { const e = group([s * .25, .5, -.1], b.head); const o = ball(.22, fur, [0, .6, 0], e); o.scale.set(1, 3, .6); const i = ball(.12, pink, [0, .6, .1], e); i.scale.set(1, 2.8, .4); e.rotation.z = s * -.15; return e; });
  for (const s of [-1, 1]) { ball(.12, mat('#111111'), [s * .28, .12, .55], b.head); ball(.04, mat('#FFFFFF', { glow: .5 }), [s * .28 + .04, .17, .65], b.head); }
  b.nose = ball(.08, pink, [0, -.05, .65], b.head);
  b.teeth = k.box(.16, .14, .04, mat('#FFFFFF'), [0, -.25, .6], b.head);
  for (const s of [-1, 1]) { const f = ball(.35, fur, [s * .55, .25, .6], b.root); f.scale.set(.8, .6, 1.4); }
  ball(.3, fur, [0, .9, -1.05], b.root);
  return b;
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
  w.ground = k.ground('#7FB069', 0);
  w.b = bunny(k, k.scene); w.bb = w.b.root;
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house); for (const x of [-1.1, 1.1]) box(.9, .9, .08, mat('#BFE3F7'), [x, 2.4, 1.72], w.house);
  w.trees = group(); for (let i = 0; i < 3; i++) { const t = group([0, 0, 0], w.trees); cyl(.3, .4, 3, mat('#7A4A22'), [0, 1.5, 0], t, 8); ball(1.6, mat('#3FA34D'), [0, 3.8, 0], t); t.userData.i = i; }
  w.fence = group(); for (let i = 0; i < 12; i++) box(.2, 1.4, .2, mat('#FFFFFF'), [-6 + i * 1.1, .7, 0], w.fence); box(13, .2, .1, mat('#FFFFFF'), [0, 1, 0], w.fence);
  w.carrot = group(); const cc = cone(1.2, 9, mat('#FF7F2A'), [0, 4.5, 0], w.carrot, 16); cc.rotation.x = Math.PI; for (const r2 of [-.4, 0, .4]) { const l = cyl(.15, .1, 3, mat('#3FA34D'), [Math.sin(r2) * 1.2, 10.3, 0], w.carrot, 6); l.rotation.z = r2; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const hm = mat('#FF4F7B', { glow: .8 }); ball(.3, hm, [-.17, 0, 0], h); ball(.3, hm, [.17, 0, 0], h); const c = cone(.42, .55, hm, [0, -.3, 0], h, 10); c.rotation.z = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  w.cracks = group(); for (let i = 0; i < 6; i++) { const c = box(3, .03, .15, mat('#3A2A1A'), [0, .02, 0], w.cracks); c.rotation.y = i / 6 * Math.PI; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '265',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BUNNIES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BUNNIES', 'WERE GIANT?'],
  title: 'What would happen if bunnies were giant?',
  description: 'Your garden disappears in one bite. Every hop is an earthquake. Carrots grow as tall as rockets. And the cuddles? Unbeatable. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'bunny', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant bunnies are made up. Quiz fact: a rabbit\'s front teeth never stop growing, so rabbits chew all day to wear them down.'],
  setup,
  scenes: [
    { say: 'What if bunnies were giant?', show: ['ground', 'bb', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 24], look: [-1, 7.4, 0], fov: 52, to: { pos: [2, 3, 22.5], look: [-1, 7.4, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(5.5); w.bb.position.set(-3, 0, -6); w.bb.rotation.y = .25; w.b.nose.scale.setScalar(1 + .3 * Math.abs(Math.sin(t * 10))); w.b.ears.forEach((e, i) => e.rotation.x = .1 * Math.sin(t * 3 + i)); w.house.position.set(5, 0, -1); stand(w, 1.5, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.y = -.5; w.p.head.rotation.x = -.4; } },
    { say: 'Your garden? Gone in one bite.', show: ['ground', 'bb', 'trees', 'fence'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 22], look: [0, 8, 0], fov: 52, to: { pos: [0, 6, 20.5], look: [0, 8, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(5); w.bb.position.set(0, 0, -7); w.bb.rotation.y = 0; w.b.head.rotation.x = .2 * Math.max(0, Math.sin(t * 8)); w.fence.position.set(0, 0, 3); w.trees.children.forEach(tr => { const i = tr.userData.i, eaten = p > .25 + i * .2; tr.position.set(-5 + i * 5, 0, 0); tr.scale.setScalar(eaten ? .001 : 1); }); } },
    { say: 'One hop? Earthquake.', label: '*BOOM*', show: ['ground', 'bb', 'pp', 'house', 'cracks'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => (t % 1.2) > .55 && (t % 1.2) < .8 ? .35 : 0,
      cam: { pos: [4, 4, 22], look: [0, 6, 0], fov: 54, to: { pos: [4, 4, 21], look: [0, 6, 0], fov: 52 } },
      update: (w, p, t) => { const c = t % 1.2, h = c < .6 ? Math.sin(c / .6 * Math.PI) * 5 : 0; w.bb.scale.setScalar(5); w.bb.position.set(-4, h, -6); w.bb.rotation.y = .4; w.cracks.position.set(-4, 0, -2); w.cracks.scale.setScalar(2.5); w.house.position.set(6, c > .6 && c < .8 ? .3 : 0, -2); stand(w, 2.5, 4, -.4); w.pp.position.y = c > .6 && c < .9 ? 1.2 * Math.sin((c - .6) / .3 * Math.PI) : 0; pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 2.4, 1); } },
    { say: 'Carrots? As big as rockets.', show: ['ground', 'pp', 'carrot'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 2.5, 14], look: [-.5, 5.5, 0], fov: 56, to: { pos: [3, 2.5, 13], look: [-.5, 5.5, 0], fov: 54 } },
      update: (w, p, t) => { w.carrot.position.set(-2, 0, -1); w.carrot.rotation.y = t * .2; stand(w, 2, 1.5, -.5); pose(w.p, .3); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.5; w.p.eyes.forEach(e => e.scale.setScalar(1.4)); } },
    { say: 'And the cuddles? Unbeatable.', show: ['ground', 'bb', 'pp', 'hearts'], sky: '#FFC2D6', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 5, 18], look: [0, 6.5, 0], fov: 52, to: { pos: [1, 5, 16.8], look: [0, 6.5, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(4.2); w.bb.position.set(0, 0, -4.4); w.bb.rotation.y = 0; w.b.head.rotation.z = .1 * Math.sin(t * 2); stand(w, 0, 1.4, 0); w.pp.position.y = 3.2; w.pp.rotation.x = -.2; pose(w.p, 1.3, .6); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .4 + i / 5) % 1; h.position.set((i % 2 ? 1 : -1) * (3.6 + i * .3), 7 + q * 5, 1); h.scale.setScalar(1 - q * .5); }); } },
    { say: 'Giant bunnies: cute, scary, or a total disaster? Comment below.',
      quiz: { q: 'Would you want a giant bunny?', options: ['Cute', 'Scary', 'Total disaster'], answer: 'Made up. Real rabbit teeth never stop growing.' },
      show: ['ground', 'bb'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.6, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.6, 0] } },
      update: (w, p, t) => { w.bb.scale.setScalar(1.3); w.bb.position.set(0, 0, 0); w.bb.rotation.y = 0; w.b.nose.scale.setScalar(1 + .3 * Math.abs(Math.sin(t * 10))); } },
  ],
};

// Narrative 16: "What Would Happen If… (season 6)". Big-animal premise (167 giant cats 284, 265 giant bunnies, 273 giant penguins).
// Hook: the premise as a question under 2 s; first frame shows a car-sized bee hovering over a garden.

function bee(k, parent) {
  const { mat, ball, cone, box, group, cyl } = k;
  const yel = mat('#FFC21F', { rough: .7 }), blk = mat('#1E1E1E');
  const b = { root: group([0, 0, 0], parent) };
  const ab = ball(1, yel, [-.9, 0, 0], b.root); ab.scale.set(1.3, .9, .9);
  for (const x of [-1.4, -.7]) { const s = cyl(.95, .95, .25, blk, [x, 0, 0], b.root, 20); s.rotation.z = Math.PI / 2; s.scale.set(.92, 1, .92); }
  const st = cone(.15, .5, blk, [-2.3, 0, 0], b.root, 8); st.rotation.z = Math.PI / 2;
  ball(.6, blk, [.4, 0, 0], b.root);
  b.head = group([1.2, .1, 0], b.root); ball(.55, yel, [0, 0, 0], b.head); for (const z of [-1, 1]) { ball(.22, blk, [.3, .15, z * .3], b.head); ball(.06, mat('#FFFFFF', { glow: .4 }), [.42, .22, z * .36], b.head); const an = cyl(.03, .03, .6, blk, [.2, .6, z * .18], b.head, 6); an.rotation.z = -.4; ball(.07, blk, [.33, .88, z * .18], b.head); }
  b.wings = [-1, 1].map(z => { const wg = ball(.9, mat('#E6F4FF', { opacity: .55 }), [0, 0, z * .9], group([.2, .6, 0], b.root)); wg.scale.set(.6, .08, 1); wg.parent.userData.z = z; return wg.parent; });
  return b;
}
const buzz = (b, t) => b.wings.forEach(w => w.rotation.x = w.userData.z * .5 * Math.sin(t * 60));
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
  w.b = bee(k, k.scene); w.bb = w.b.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.flowers = group(); for (let i = 0; i < 5; i++) { const f = group([0, 0, 0], w.flowers); cyl(.08, .08, 1.6, mat('#3FA34D'), [0, .8, 0], f, 6); for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2; ball(.25, mat(['#FF5FA2', '#FFFFFF', '#E2453C', '#8E44AD', '#FF7F2A'][i]), [Math.cos(a) * .3, 1.7, Math.sin(a) * .3], f); } ball(.2, mat('#FFC21F'), [0, 1.72, 0], f); f.userData.i = i; }
  w.jar = group(); cyl(1.2, 1.2, 2.6, mat('#FFB830', { opacity: .85, rough: .2 }), [0, 1.3, 0], w.jar, 20); cyl(1.25, 1.25, .3, mat('#E2453C'), [0, 2.75, 0], w.jar, 20);
  w.tree = group(); cyl(.5, .7, 5, mat('#7A4A22'), [0, 2.5, 0], w.tree, 10); w.blooms = group([0, 6, 0], w.tree); for (let i = 0; i < 14; i++) { const bl = ball(.5, mat('#FFFFFF'), [Math.sin(i * 2.4) * 2.2, Math.cos(i * 1.7) * 1.2, Math.cos(i * 2.4) * 2.2], w.blooms); bl.userData.i = i; } ball(2.6, mat('#3FA34D'), [0, 0, 0], w.blooms);
  w.lines = group(); for (let i = 0; i < 6; i++) { const l = box(1.2, .07, .07, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const hm = mat('#FF4F7B', { glow: .8 }); ball(.25, hm, [-.14, 0, 0], h); ball(.25, hm, [.14, 0, 0], h); const c = cone(.35, .45, hm, [0, -.25, 0], h, 10); c.rotation.z = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };

export default {
  id: '281',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BEES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BEES', 'WERE GIANT?'],
  title: 'What would happen if bees were giant?',
  description: 'The buzz is louder than a plane. One trip and the whole tree is done. Honey comes by the barrel. And they make very fuzzy friends. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'bee', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant bees are made up. Quiz fact: a single worker honeybee makes only about one twelfth of a teaspoon of honey in her lifetime (National Honey Board).'],
  setup,
  scenes: [
    { say: 'What if bees were giant?', show: ['ground', 'bb', 'flowers', 'pp'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [1, 3, 15], look: [0, 4.6, 0], fov: 52, to: { pos: [1, 3, 14], look: [0, 4.6, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(2.2); w.bb.position.set(.6 + .3 * Math.sin(t * 2), 8.2 + .3 * Math.sin(t * 3), -3); w.bb.rotation.set(0, -.4, .05 * Math.sin(t * 4)); buzz(w.b, t); w.flowers.children.forEach(f => { const i = f.userData.i; f.position.set(-4 + i * 2, 0, -1); f.scale.setScalar(1.2); }); stand(w, 2.4, 3, -.3); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.eyes.forEach(e => e.scale.setScalar(1.4)); } },
    { say: 'The buzz? Louder than a plane.', label: '*BZZZZZ*', show: ['ground', 'bb', 'pp', 'lines'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30, shake: () => .12,
      cam: { pos: [0, 4, 14], look: [0, 4.8, 0], fov: 52, to: { pos: [0, 4, 13], look: [0, 4.8, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(2.2); w.bb.position.set(0, 8 + .2 * Math.sin(t * 5), -3); w.bb.rotation.set(0, -Math.PI / 2 + .2, 0); buzz(w.b, t); stand(w, 0, 2.2, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.7)); w.p.mouth.scale.set(1, 2.4, 1); w.lines.children.forEach(l => { const i = l.userData.i, s = i % 2 ? 1 : -1, q = (t * 2 + i / 6) % 1; l.position.set(s * (3 + q * 2), 7 + (i % 3) * .8, -2); }); } },
    { say: 'Flowers? A whole tree in one stop.', show: ['ground', 'bb', 'tree'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [0, 5, 18], look: [0, 6, 0], fov: 54, to: { pos: [0, 5, 17], look: [0, 6, 0], fov: 52 } },
      update: (w, p, t) => { w.tree.position.set(-1.5, 0, -2); w.blooms.children.forEach(bl => { if (bl.userData.i !== undefined) bl.visible = p < .3 + bl.userData.i * .04; }); w.bb.scale.setScalar(2); w.bb.position.set(2.6, 7 + .3 * Math.sin(t * 3), 0); w.bb.rotation.set(0, Math.PI - .3, 0); buzz(w.b, t); } },
    { say: 'Honey? By the barrel.', show: ['ground', 'bb', 'pp', 'jar'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [1, 4, 13], look: [0, 3.6, 0], fov: 52, to: { pos: [1, 4, 12.2], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { w.jar.position.set(-1.6, 0, 0); w.jar.scale.setScalar(1.3); w.bb.scale.setScalar(1.6); w.bb.position.set(1.8, 6.4 + .2 * Math.sin(t * 3), -2); w.bb.rotation.set(0, Math.PI + .5, 0); buzz(w.b, t); stand(w, 1.6, 2, -.4); pose(w.p, 1.6, .2); w.p.mouth.scale.set(1.3, 2.2, 1); } },
    { say: 'And friends? Very, very fuzzy.', show: ['ground', 'bb', 'pp', 'hearts'], sky: '#FFE08A', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [0, 4, 12], look: [0, 3.8, 0], fov: 52, to: { pos: [0, 4, 11.2], look: [0, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { w.bb.scale.setScalar(1.5); w.bb.position.set(2.4, 2.8 + .15 * Math.sin(t * 3), -.6); w.bb.rotation.set(0, Math.PI, 0); buzz(w.b, t); stand(w, -1.4, 0, .5); pose(w.p, 1.4, .8); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(-1.5 + i * .8, 5 + q * 2.5, 0); h.scale.setScalar(1 - q * .5); }); } },
    { say: 'Giant bees: cute, scary, or way too buzzy? Comment below.',
      quiz: { q: 'Would you want giant bees?', options: ['Cute', 'Scary', 'Way too buzzy'], answer: 'Made up. A real bee makes about 1/12 teaspoon of honey in its life.' },
      show: ['ground', 'bb'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 9], look: [0, 3.6, 0], fov: 48, to: { pos: [-1, 1, 9], look: [0, 3.6, 0] } },
      update: (w, p, t) => { w.bb.scale.setScalar(1.3); w.bb.position.set(0, 1.4 + .2 * Math.sin(t * 3), 0); w.bb.rotation.set(0, -Math.PI / 2 + .6, 0); buzz(w.b, t); } },
  ],
};

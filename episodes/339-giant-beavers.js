// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized beaver next to a house.

function beaver(k, parent) {
  const { mat, ball, box, group } = k;
  const fur = mat('#7A4E2A', { rough: .85 }), dark = mat('#3A2A1A'), tailM = mat('#3A3A3A', { rough: .5 });
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  const bd = ball(1.2, fur, [0, 1.2, 0], b.body); bd.scale.set(1.3, 1, 1);
  b.head = group([1.4, 1.8, 0], b.body); ball(.65, fur, [0, 0, 0], b.head); const sn = ball(.35, mat('#9A6A42'), [.5, -.15, 0], b.head); sn.scale.set(1, .8, 1.1);
  for (const z of [-1, 1]) { ball(.1, mat('#111111'), [.4, .2, z * .3], b.head); ball(.12, fur, [-.1, .55, z * .4], b.head); }
  ball(.1, dark, [.82, -.05, 0], b.head); b.teeth = box(.08, .28, .26, mat('#F2A23A'), [.75, -.4, 0], b.head);
  b.tail = group([-1.5, .4, 0], b.body); const tl = ball(.8, tailM, [-.6, 0, 0], b.tail); tl.scale.set(1.3, .18, .8);
  b.paws = [-1, 1].map(z => ball(.22, dark, [1.3, .9, z * .45], b.body));
  for (const z of [-1, 1]) { const f = ball(.3, dark, [.3, .15, z * .7], b.root); f.scale.set(1.6, .4, 1); }
  return b;
}
const gnaw = (b, t) => { b.head.rotation.z = .1 * Math.sin(t * 18); };
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
  w.bv = beaver(k, k.scene); w.br = w.bv.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.fence = group(); w.posts = []; for (let i = 0; i < 8; i++) { const pst = box(.3, 1.6, .15, mat('#E8D2A8'), [-3.5 + i, .8, 0], w.fence); w.posts.push(pst); } box(8, .15, .1, mat('#E8D2A8'), [0, 1.2, 0], w.fence);
  w.chips = group(); for (let i = 0; i < 10; i++) { const c = box(.2, .06, .15, mat('#E8D2A8'), [0, 0, 0], w.chips); c.userData.i = i; c.castShadow = false; }
  w.water = box(40, .3, 30, mat('#4FB3E8', { glow: .15 }), [0, 0, 0]); w.water.material.transparent = true; w.water.material.opacity = .8;
  w.street = group(); for (let i = 0; i < 3; i++) { const h = group([-6 + i * 6, 0, -4], w.street); box(3, 2.6, 2.6, mat('#F2D9B8'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#B3262E'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; } w.dam = group(); for (let i = 0; i < 9; i++) { const lg = cyl(.3, .3, 4, mat('#7A4E2A'), [-4 + i, .5 + (i % 2) * .5, 2], w.dam, 8); lg.rotation.x = Math.PI / 2 + (i % 3 - 1) * .2; }
  w.splash = group(); for (let i = 0; i < 14; i++) { const s = ball(.3, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const bvAt = (w, x, y, z, ry, s) => { w.br.position.set(x, y, z); w.br.rotation.set(0, ry, 0); w.br.scale.setScalar(s); w.bv.head.rotation.set(0, 0, 0); w.bv.tail.rotation.set(0, 0, 0); };

export default {
  id: '339',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BEAVERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BEAVERS', 'WERE GIANT?'],
  title: 'What would happen if beavers were giant?',
  description: 'Your fence? Snack time. One dam floods your whole street. And a tail slap sounds like thunder. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'beaver', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant beavers are made up. Quiz fact: when a beaver senses danger it slaps its flat tail on the water, making a loud warning smack for other beavers (Encyclopaedia Britannica, "beaver").'],
  setup,
  scenes: [
    { say: 'What if beavers were giant?', show: ['ground', 'br', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6, 0], fov: 52 } },
      update: (w, p, t) => { bvAt(w, -3.6, 0, -5, -.8, 2.6); gnaw(w.bv, t * .3); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your fence? Snack time.', label: 'CHOMP', show: ['ground', 'br', 'fence', 'chips', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 16], look: [0, 2.8, 0], fov: 54, to: { pos: [2, 5, 15.2], look: [0, 2.8, 0], fov: 52 } },
      update: (w, p, t) => { const gone = Math.floor(p * 9); bvAt(w, -5.6 + gone * .75, 0, -1.4, 0, 1.4); gnaw(w.bv, t); w.posts.forEach((pst, i) => pst.visible = i >= gone); w.chips.children.forEach(c => { const i = c.userData.i, q = (t * 2 + i / 10) % 1; c.position.set(w.br.position.x + 1.6 + Math.cos(i) * q, 1.2 + Math.sin(q * Math.PI) * 1.2, -1.4 + Math.sin(i) * q); c.rotation.set(t * 5 + i, t * 3, 0); }); stand(w, 4.6, 3.4, -.6); pose(w.p, gone > 3 ? 2.4 : .3); w.p.mouth.scale.set(1.2, gone > 3 ? 3 : 1, 1); } },
    { say: 'One dam? Your whole street floods.', label: 'SPLASH', show: ['ground', 'br', 'water', 'street', 'dam'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 9, 22], look: [0, 2.6, 0], fov: 56, to: { pos: [0, 9, 21], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { w.posts.forEach(pst => pst.visible = true); bvAt(w, 4.5, .8, 2.6, Math.PI, 1.4); gnaw(w.bv, t * .4); w.water.position.set(0, -.2 + Math.min(1, p * 1.4) * 1.6, -6); } },
    { say: 'And a tail slap? It sounds like thunder.', label: '*KA-BOOM*', show: ['ground', 'br', 'water', 'splash'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .8 && t < 1.3 ? .35 : 0,
      cam: { pos: [-1.5, 5, 18], look: [-1.2, 2.6, 0], fov: 54, to: { pos: [-1.4, 5, 17.2], look: [-1.2, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { w.water.position.set(0, .1, 0); bvAt(w, .6, .3, 0, 0, 1.8); const up = t < .8; w.bv.tail.rotation.z = up ? Math.min(1, t / .8) * 1.2 : 0; const hit = !up; w.splash.children.forEach(s => { const i = s.userData.i, a = i / 14 * Math.PI * 2, r = hit ? ((t - .8) * 4) % 4 : 0; s.position.set(-3.4 + Math.cos(a) * r, .6 + Math.sin(r / 4 * Math.PI) * 3.5, Math.sin(a) * r * .7); s.visible = hit; }); } },
    { say: 'Giant beavers: cute, cool, or way too busy? Comment below.',
      quiz: { q: 'Giant beavers are…', options: ['Cute', 'Cool', 'Way too busy'], answer: 'Made up. Real beavers slap their tails on the water as a warning.' },
      show: ['ground', 'br'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 2.6, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 2.6, 0] } },
      update: (w, p, t) => { bvAt(w, 0, 0, 0, -.6, 1.3); gnaw(w.bv, t * .4); } },
  ],
};

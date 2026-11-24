// Narrative 17: "What Would Happen If… (season 7)". Big-animal premise (167 giant cats 322, 265 giant bunnies, 281 giant bees).
// Hook: the premise as a question under 2 s; first frame shows a house-sized grey mouse peeking over a house.

function mouse(k, parent) {
  const { mat, ball, cyl, cone, group, box } = k;
  const fur = mat('#A8A8B0', { rough: .8 }), pink = mat('#FFB6C8');
  const m = { root: group([0, 0, 0], parent) };
  const b = ball(1, fur, [0, .9, 0], m.root); b.scale.set(1.4, .85, .9);
  m.head = group([1.3, 1.3, 0], m.root); const hd = ball(.55, fur, [0, 0, 0], m.head); hd.scale.set(1.3, 1, 1); ball(.1, pink, [.75, -.05, 0], m.head);
  for (const z of [-1, 1]) { const e = ball(.38, fur, [-.05, .5, z * .45], m.head); e.scale.set(.3, 1, 1); const ei = ball(.26, pink, [.02, .5, z * .45], m.head); ei.scale.set(.2, .9, .9); ball(.08, mat('#111111'), [.45, .15, z * .22], m.head); for (const a of [-.2, 0, .2]) { const wh = cyl(.008, .008, .6, mat('#333333'), [.65, -.05 + a * .3, z * .3], m.head, 4); wh.rotation.set(0, 0, Math.PI / 2 + a); wh.rotation.y = z * .4; } }
  m.tail = group([-1.35, .8, 0], m.root); const tl = cyl(.05, .02, 2.2, pink, [-1, 0, 0], m.tail, 6); tl.rotation.z = Math.PI / 2;
  for (const [x, z] of [[-.6, -.5], [-.6, .5], [.6, -.5], [.6, .5]]) ball(.2, pink, [x, .12, z], m.root).scale.set(1.4, .5, 1);
  return m;
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
  w.m = mouse(k, k.scene); w.mm = w.m.root;
  w.p = person(k, k.scene, '#FF7F2A'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cheese = group(); const ch = cyl(3, 3, 2, mat('#FFD23F'), [0, 1, 0], w.cheese, 32, ); for (let i = 0; i < 6; i++) { const hole = ball(.35 + (i % 2) * .2, mat('#E8B820'), [Math.cos(i) * 2.98, .5 + (i % 3) * .5, Math.sin(i) * 2.98], w.cheese); hole.scale.set(.3, 1, 1); hole.lookAt(0, hole.position.y, 0); }
  w.cat = group(); const cf = mat('#F2994A'); const cb = ball(.8, cf, [0, .9, 0], w.cat); cb.scale.set(1.4, .8, .8); w.catHead = group([1, 1.4, 0], w.cat); ball(.5, cf, [0, 0, 0], w.catHead); for (const z of [-.25, .25]) { cone(.15, .32, cf, [0, .45, z], w.catHead, 4); ball(.1, mat('#FFFFFF'), [.4, .08, z * .8], w.catHead); ball(.05, mat('#111111'), [.48, .08, z * .8], w.catHead); } for (const [x, z] of [[-.7, -.3], [-.7, .3], [.7, -.3], [.7, .3]]) cyl(.12, .1, .7, cf, [x, .35, z], w.cat, 8);
  w.hole = group(); const arch = k.mesh(new k.THREE.CircleGeometry(4, 32, 0, Math.PI), mat('#1A1410'), [0, 0, 0], w.hole); w.wallBig = box(30, 14, .5, mat('#E8DCC8'), [0, 7, -.3], w.hole);
  w.ele = group(); const em = mat('#9AA3AD'); const eb = ball(1.6, em, [0, 2.4, 0], w.ele); eb.scale.set(1.3, 1, 1); ball(1, em, [1.9, 3, 0], w.ele); for (const z of [-1, 1]) { const ea = ball(.9, em, [1.6, 3.1, z * .9], w.ele); ea.scale.set(.15, 1.1, 1); ball(.1, mat('#111111'), [2.7, 3.3, z * .4], w.ele); } const tr = cyl(.25, .15, 2, em, [2.8, 2, 0], w.ele, 8); tr.rotation.z = .3; for (const [x, z] of [[-1, -.6], [-1, .6], [1, -.6], [1, .6]]) cyl(.35, .35, 1.6, em, [x, .8, z], w.ele, 10);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };
const sniff = (w, t) => { w.m.head.rotation.z = .08 * Math.sin(t * 12); w.m.tail.rotation.y = .3 * Math.sin(t * 2); };

export default {
  id: '290',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT MICE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF MICE', 'WERE GIANT?'],
  title: 'What would happen if mice were giant?',
  description: 'Cheese comes by the truckload. Now the cat runs away. Mouse holes become tunnels. And elephants? Still terrified. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'mouse', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant mice are made up. The idea that elephants fear mice is a popular myth, not established science. Quiz fact: a house mouse can squeeze through a gap about the width of a pencil (Natural History Museum, London).'],
  setup,
  scenes: [
    { say: 'What if mice were giant?', show: ['ground', 'mm', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-1, 7.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-1, 7.2, 0], fov: 52 } },
      update: (w, p, t) => { w.mm.scale.setScalar(4.6); w.mm.position.set(-6, 0, -8); w.mm.rotation.y = -.9; sniff(w, t); w.house.position.set(4, 0, -1); stand(w, 1, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.5; } },
    { say: 'Cheese? By the truckload.', show: ['ground', 'mm', 'cheese'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 20], look: [0, 4.4, 0], fov: 52, to: { pos: [0, 5, 18.6], look: [0, 4.4, 0], fov: 50 } },
      update: (w, p, t) => { w.cheese.position.set(2.5, 0, -1); w.cheese.scale.setScalar(1.3 - p * .3); w.mm.scale.setScalar(3.4); w.mm.position.set(-3.6, 0, -1); w.mm.rotation.y = 0; sniff(w, t); w.m.head.rotation.z = -.2 - .1 * Math.abs(Math.sin(t * 8)); } },
    { say: 'The cat? Now the cat runs away.', label: '*EEK*', show: ['ground', 'mm', 'cat'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 20], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 5, 19], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { const x = 4 - p * 9; w.cat.position.set(x, .3 * Math.abs(Math.sin(t * 12)), 1); w.cat.rotation.y = Math.PI; w.catHead.rotation.y = -.6; w.mm.scale.setScalar(3); w.mm.position.set(x + 7, 0, -1); w.mm.rotation.y = Math.PI; sniff(w, t); } },
    { say: 'Mouse holes? Now they are tunnels.', show: ['ground', 'pp', 'hole'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4, 14], look: [0, 3, 0], fov: 54, to: { pos: [2.6, 4, 13.2], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.hole.position.set(0, 0, -3); stand(w, -2 + p * 2.2, -1 - p * 1.6, Math.PI - .3); pose(w.p, .4 * Math.sin(t * 6)); w.p.head.rotation.y = Math.PI * .7; } },
    { say: 'And elephants? Still terrified.', show: ['ground', 'mm', 'ele'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: () => .06,
      cam: { pos: [0, 5, 22], look: [0, 4, 0], fov: 58, to: { pos: [0, 5, 21], look: [0, 4, 0], fov: 56 } },
      update: (w, p, t) => { w.mm.scale.setScalar(2.6); w.mm.position.set(-4.8, 0, 0); w.mm.rotation.y = 0; sniff(w, t); w.ele.position.set(4.6, 1.4 + .3 * Math.abs(Math.sin(t * 10)), -1); w.ele.rotation.set(0, Math.PI, .25); } },
    { say: 'Giant mice: cute, scary, or way too squeaky? Comment below.',
      quiz: { q: 'Would you want giant mice?', options: ['Cute', 'Scary', 'Way too squeaky'], answer: 'Made up. Real mice squeeze through pencil-width gaps.' },
      show: ['ground', 'mm'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 3, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 3, 0] } },
      update: (w, p, t) => { w.mm.scale.setScalar(1.4); w.mm.position.set(0, 0, 0); w.mm.rotation.y = -1.1; sniff(w, t); } },
  ],
};

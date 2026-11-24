// Narrative 17: "What Would Happen If… (season 7)". Animal-scale premise (167 giant cats 322; 270 tiny dogs, 276 tiny giraffes).
// Hook: the premise as a question under 2 s; first frame shows a lion the size of a mug, roaring on a desk.

function lion(k, parent) {
  const { mat, ball, cyl, cone, group, box } = k;
  const fur = mat('#E8A94A', { rough: .8 }), mane = mat('#A0522D', { rough: .9 });
  const l = { root: group([0, 0, 0], parent) };
  const b = ball(.8, fur, [0, 1.1, 0], l.root); b.scale.set(1.5, .8, .8);
  for (const [x, z] of [[-.8, -.3], [-.8, .3], [.8, -.3], [.8, .3]]) cyl(.15, .13, .9, fur, [x, .45, z], l.root, 8);
  l.tail = cyl(.05, .05, 1.2, fur, [-1.5, 1.3, 0], l.root, 6); l.tail.rotation.z = .8; ball(.12, mane, [-1.95, 1.75, 0], l.root);
  l.head = group([1.3, 1.6, 0], l.root); const mn = ball(.75, mane, [0, 0, 0], l.head); mn.scale.set(.7, 1, 1); ball(.5, fur, [.25, 0, 0], l.head); for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.6, .15, z * .18], l.head); ball(.12, fur, [.1, .45, z * .35], l.head); }
  ball(.07, mat('#3A2A1A'), [.74, 0, 0], l.head); l.mouth = box(.1, .08, .25, mat('#7A2A2A'), [.68, -.2, 0], l.head);
  return l;
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
  w.desk = k.ground('#C8955A', 0);
  w.floor = k.ground('#D8C9A8', .005);
  w.wall = group(); box(30, 14, .3, mat('#EEE4D2'), [0, 7, -3], w.wall);
  w.li = lion(k, k.scene); w.lr = w.li.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.mug = group(); cyl(.9, .8, 1.8, mat('#E2453C'), [0, .9, 0], w.mug, 18);
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = group([0, 0, 0], w.notes); const nm = mat('#FFFFFF', { glow: .8 }); ball(.12, nm, [0, 0, 0], n).scale.set(1.2, .9, .5); box(.04, .45, .04, nm, [.12, .22, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.yarn = ball(.6, mat('#FF5FA2'), [0, 0, 0], k.scene);
  w.bowl = group(); cyl(.9, .7, .4, mat('#3B6FD6'), [0, .2, 0], w.bowl, 18); for (let i = 0; i < 6; i++) box(.15, .1, .15, mat('#8B5A2B'), [Math.sin(i) * .4, .42, Math.cos(i * 2) * .4], w.bowl);
  w.crown = group(); cyl(.32, .28, .25, mat('#FFD21F', { glow: .6 }), [0, 0, 0], w.crown, 8); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .27, .2, Math.sin(a) * .27], w.crown, 4); }
  w.catpal = group(); const cf = mat('#888888'); const cb = ball(.8, cf, [0, 1.1, 0], w.catpal); cb.scale.set(1.4, .8, .8); ball(.55, cf, [1.1, 1.6, 0], w.catpal); for (const z of [-.25, .25]) { cone(.15, .32, cf, [1.1, 2.1, z], w.catpal, 4); ball(.08, mat('#B8F27A', { glow: .6 }), [1.5, 1.7, z * .8], w.catpal); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const roar = (w, a) => { w.li.mouth.scale.set(1, 1 + a * 3, 1 + a * .5); w.li.head.rotation.z = a * .2; };

export default {
  id: '285',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY LIONS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF LIONS', 'WERE TINY?'],
  title: 'What would happen if lions were tiny?',
  description: 'The mighty roar is a squeak. The hunt? A ball of yarn. Dinner is one bowl of crunchies. And the king of the jungle answers to the house cat. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'lion', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: tiny lions are made up. Quiz fact: a real lion\'s roar can be heard up to about 8 kilometres away (Smithsonian National Zoo).'],
  setup,
  scenes: [
    { say: 'What if lions were tiny?', show: ['desk', 'wall', 'lr', 'mug'], sky: '#EEE4D2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 2.6, 9], look: [.4, 2.8, 0], fov: 48, to: { pos: [1, 2.6, 8.3], look: [.4, 2.8, 0], fov: 46 } },
      update: (w, p, t) => { w.lr.position.set(-.8, 0, .6); w.lr.rotation.y = -.9; w.lr.scale.setScalar(1); roar(w, Math.max(0, Math.sin(t * 4))); w.mug.position.set(2.6, 0, -1.6); w.mug.scale.setScalar(2.6); } },
    { say: 'The mighty roar? A tiny squeak.', label: '*squeak*', show: ['desk', 'wall', 'lr', 'notes'], sky: '#EEE4D2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1.4, 2.4, 6.6], look: [.6, 2, 0], fov: 46, to: { pos: [1.3, 2.4, 6], look: [.6, 2, 0], fov: 44 } },
      update: (w, p, t) => { w.mug.scale.setScalar(1); w.lr.position.set(-.6, 0, 0); w.lr.rotation.y = -.8; const a = p > .3 ? Math.abs(Math.sin(t * 6)) : 0; roar(w, a); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .8 + i / 3) % 1; n.position.set(1.6 + q * 1.2, 2 + q * 1.4 + i * .2, .2); n.visible = p > .3; n.scale.setScalar(.5); }); } },
    { say: 'The hunt? A ball of yarn.', show: ['floor', 'wall', 'lr', 'yarn'], sky: '#EEE4D2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 2.4, 9], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2.4, 8.4], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { const yx = 1.6 - p * 2.6; w.yarn.position.set(yx, .6, .3); w.yarn.rotation.z = p * 6; const jump = (t % 1.2) / 1.2; w.lr.position.set(yx - 1.9 + jump * .6, Math.sin(jump * Math.PI) * 1.2, .3); w.lr.rotation.set(0, 0, -.3 + jump * .5); roar(w, .3); } },
    { say: 'Dinner? One bowl of crunchies.', show: ['floor', 'wall', 'lr', 'bowl'], sky: '#EEE4D2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 2.4, 7.4], look: [.4, 1.3, 0], fov: 48, to: { pos: [.9, 2.4, 6.8], look: [.4, 1.3, 0], fov: 46 } },
      update: (w, p, t) => { w.lr.rotation.set(0, 0, 0); w.bowl.position.set(1.4, 0, .3); w.lr.position.set(-1.1, 0, .2); w.lr.rotation.y = -.2; w.li.head.rotation.z = -.4 - .15 * Math.abs(Math.sin(t * 8)); w.li.mouth.scale.set(1, 1.5, 1); } },
    { say: 'And the king of the jungle? Bows to the house cat.', show: ['floor', 'wall', 'lr', 'catpal', 'crown'], sky: '#EEE4D2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [-.6, 3, 10.5], look: [-.6, 2.2, 0], fov: 52, to: { pos: [-.6, 3, 9.9], look: [-.6, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.catpal.position.set(1.8, 0, -.4); w.catpal.rotation.y = Math.PI; w.catpal.scale.setScalar(1.8); w.crown.position.set(-.18, 3.95, -.4); w.lr.position.set(-2.6, 0, .6); w.lr.rotation.set(0, 0, p > .4 ? -.25 : 0); w.li.head.rotation.z = p > .4 ? -.5 : 0; roar(w, 0); } },
    { say: 'Tiny lions: cute, fierce, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny lion?', options: ['Cute', 'Fierce', 'Best pet ever'], answer: 'Made up. A real lion\'s roar carries about 8 km.' },
      show: ['desk', 'lr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .6, 6], look: [0, 2.6, 0], fov: 46, to: { pos: [-.6, .6, 6], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.lr.position.set(0, 0, 0); w.lr.rotation.set(0, -.9, 0); roar(w, Math.max(0, Math.sin(t * 3))); } },
  ],
};

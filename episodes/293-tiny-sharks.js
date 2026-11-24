// Narrative 17: "What Would Happen If… (season 7)". Animal-scale premise (270 tiny dogs, 285 tiny lions, 288 tiny cows).
// Hook: the premise as a question under 2 s; first frame shows a shark the size of a finger circling in a fishbowl.

function shark(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const g = mat('#7F95A8', { rough: .5 }), w = mat('#F2F2F2');
  const s = { root: group([0, 0, 0], parent) };
  const b = ball(1, g, [0, 0, 0], s.root); b.scale.set(2, .7, .7);
  const bl = ball(.9, w, [.1, -.2, 0], s.root); bl.scale.set(1.8, .5, .62);
  const df = cone(.45, 1, g, [.1, .9, 0], s.root, 4); df.scale.z = .25; df.rotation.z = -.3;
  s.tail = group([-1.9, 0, 0], s.root); const t1 = cone(.35, 1, g, [-.4, .45, 0], s.tail, 4); t1.scale.z = .25; t1.rotation.z = 1; const t2 = cone(.3, .8, g, [-.35, -.35, 0], s.tail, 4); t2.scale.z = .25; t2.rotation.z = 2.2;
  for (const z of [-1, 1]) { const pf = cone(.3, .9, g, [.4, -.4, z * .55], s.root, 4); pf.scale.z = .2; pf.rotation.set(z * .9, 0, 2); ball(.08, mat('#111111'), [1.5, .15, z * .4], s.root); }
  s.mouth = box(.6, .05, .5, mat('#5A2A3A'), [1.45, -.25, 0], s.root);
  for (let i = 0; i < 5; i++) box(.06, .1, .05, w, [1.25 + i * .07, -.2, (i - 2) * .1], s.root);
  return s;
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
const swim = (s, t) => { s.tail.rotation.y = .4 * Math.sin(t * 8); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.table = k.ground('#C8955A', 0);
  w.floor = k.ground('#E0E8EC', .005);
  w.wall = group(); box(30, 14, .3, mat('#DDEAF0'), [0, 7, -3], w.wall);
  w.sh = shark(k, k.scene); w.sr = w.sh.root;
  w.bowl = group(); const bw = ball(1.6, mat('#BFE3F7', { opacity: .35, rough: .05 }), [0, 1.6, 0], w.bowl); bw.scale.y = .9; const wt = ball(1.5, mat('#4AA3DF', { opacity: .45 }), [0, 1.45, 0], w.bowl); wt.scale.y = .75; w.bowl.traverse(o => o.castShadow = false);
  w.tub = group(); const tb = box(5, 1.6, 2.6, mat('#FFFFFF'), [0, .8, 0], w.tub); box(4.6, .1, 2.2, mat('#7CC8F2', { opacity: .85 }), [0, 1.45, 0], w.tub); for (let i = 0; i < 6; i++) ball(.25, mat('#FFFFFF'), [-1.5 + i * .6, 1.6, (i % 2) * .5 - .25], w.tub);
  w.duck = group(); ball(.45, mat('#FFD23F'), [0, 0, 0], w.duck).scale.set(1.2, .8, 1); ball(.3, mat('#FFD23F'), [.35, .4, 0], w.duck); box(.2, .07, .16, mat('#FF9F1C'), [.62, .38, 0], w.duck);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = group([0, 0, 0], w.notes); const nm = mat('#333344'); ball(.14, nm, [0, 0, 0], n).scale.set(1.2, .9, .5); box(.04, .5, .04, nm, [.14, .25, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.cracker = group(); for (let i = 0; i < 4; i++) { box(.4, .1, .14, mat('#D9963A'), [i * .3, 0, (i % 2) * .2 - .1], w.cracker); }
  w.pool = box(14, .7, 8, mat('#4AA3DF', { opacity: .7 }), [0, .35, 0], k.scene);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '293',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY SHARKS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SHARKS', 'WERE TINY?'],
  title: 'What would happen if sharks were tiny?',
  description: 'The ocean? A fishbowl. The scary music plays for a shark the size of a finger. Bath time gets a new friend. And their favourite snack is fish sticks. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'shark', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: finger-sized sharks are made up. Quiz fact: the dwarf lanternshark, one of the smallest sharks, grows to only about 20 centimetres long (Florida Museum of Natural History).'],
  setup,
  scenes: [
    { say: 'What if sharks were tiny?', show: ['table', 'wall', 'bowl', 'sr'], sky: '#DDEAF0', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 2.6, 6.4], look: [0, 2.2, 0], fov: 46, to: { pos: [0, 2.6, 5.8], look: [0, 2.2, 0], fov: 44 } },
      update: (w, p, t) => { w.bowl.position.set(0, 0, 0); w.sr.scale.setScalar(.28); const a = t * 1.6; w.sr.position.set(Math.cos(a) * .8, 1.45 + .1 * Math.sin(t * 3), Math.sin(a) * .5); w.sr.rotation.set(0, -a - Math.PI / 2, 0); swim(w.sh, t); } },
    { say: 'The scary music? For this.', label: 'DUN DUN', show: ['table', 'wall', 'bowl', 'sr', 'notes'], sky: '#2A3A5A', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 2, 3.4], look: [0, 1.6, 0], fov: 44, to: { pos: [0, 2, 2.6], look: [0, 1.6, 0], fov: 40 } },
      update: (w, p, t) => { w.sr.scale.setScalar(.28); w.sr.position.set(0, 1.5, .3); w.sr.rotation.set(0, -Math.PI / 2 + .3, 0); swim(w.sh, t); w.sh.mouth.scale.set(1, 1 + 3 * Math.abs(Math.sin(t * 4)), 1); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .6 + i / 3) % 1; n.position.set(-1 + i * .9, 2.6 + q * .6, .2); n.scale.setScalar(.6); }); } },
    { say: 'Bath time? A brand new friend.', show: ['floor', 'wall', 'tub', 'sr', 'duck'], sky: '#DDEAF0', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 3.4, 6], look: [0, 1.5, 0], fov: 48, to: { pos: [.9, 3.4, 5.5], look: [0, 1.5, 0], fov: 46 } },
      update: (w, p, t) => { w.tub.position.set(0, 0, 0); w.duck.position.set(.8, 1.65 + .05 * Math.sin(t * 2), .2); w.duck.rotation.y = -.4; w.sr.scale.setScalar(.25); const x = -1.2 + Math.sin(t * .8) * .4; w.sr.position.set(x, 1.6, .2); w.sr.rotation.set(0, .2 * Math.sin(t * .8), 0); swim(w.sh, t); } },
    { say: 'Their favourite snack? Fish sticks.', show: ['table', 'wall', 'sr', 'cracker'], sky: '#DDEAF0', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.8, 1.2, 3.6], look: [.2, .7, 0], fov: 44, to: { pos: [.7, 1.2, 3.2], look: [.2, .7, 0], fov: 42 } },
      update: (w, p, t) => { w.cracker.position.set(.2, .1, 0); w.cracker.children.forEach((c, i) => c.visible = i >= Math.floor(p * 4)); w.sr.scale.setScalar(.25); w.sr.position.set(-.4 + p * 1.2, .4 + .1 * Math.sin(t * 3), 0); w.sr.rotation.set(0, 0, .1 * Math.sin(t * 6)); swim(w.sh, t); w.sh.mouth.scale.set(1, 1 + 2 * Math.abs(Math.sin(t * 10)), 1); } },
    { say: 'And the swimming pool? Nobody even notices.', show: ['floor', 'wall', 'pp', 'sr', 'pool'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 3.6, 9], look: [0, 2.6, 0], fov: 50, to: { pos: [0, 3.6, 8.4], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.p.mouth.scale.set(1.2, .6, 1); w.sr.scale.setScalar(.25); w.sr.position.set(Math.cos(t * 2) * 1.4, .45, Math.sin(t * 2) * 1.4 + .2); w.sr.rotation.set(0, -t * 2 - Math.PI / 2, 0); swim(w.sh, t); } },
    { say: 'Tiny sharks: cute, scary, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny shark?', options: ['Cute', 'Scary', 'Best pet ever'], answer: 'Made up. The dwarf lanternshark is only about 20 cm long.' },
      show: ['table', 'bowl', 'sr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .8, 5.6], look: [0, 2.2, 0], fov: 46, to: { pos: [-.6, .8, 5.6], look: [0, 2.2, 0] } },
      update: (w, p, t) => { w.sr.scale.setScalar(.35); const a = t * 1.2; w.sr.position.set(Math.cos(a) * .7, 1.45, Math.sin(a) * .4); w.sr.rotation.set(0, -a - Math.PI / 2, 0); swim(w.sh, t); } },
  ],
};

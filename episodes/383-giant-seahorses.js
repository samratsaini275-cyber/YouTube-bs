// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a seahorse taller than a house rising out of the sea.

function seahorse(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const yl = mat('#F2B233', { rough: .6 }), og = mat('#E8862A');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, yl, [0, 3, 0], g.body); b.scale.set(.8, 1.5, .7); const belly = ball(.7, mat('#F7D27A'), [.35, 2.8, 0], g.body); belly.scale.set(.6, 1.3, .7);
  for (let i = 0; i < 5; i++) { const r = cyl(.82 - Math.abs(i - 2) * .1, .82 - Math.abs(i - 2) * .1, .06, og, [0, 2.2 + i * .4, 0], g.body, 16); r.scale.z = .85; }
  g.head = group([.1, 4.9, 0], g.body); const hd = ball(.6, yl, [0, 0, 0], g.head); hd.scale.set(1, .9, .8); const sn = cyl(.18, .14, 1, yl, [.75, -.15, 0], g.head, 10); sn.rotation.z = Math.PI / 2 + .2;
  for (const z of [-1, 1]) { ball(.14, mat('#FFFFFF'), [.2, .15, z * .42], g.head); ball(.07, mat('#111111'), [.26, .16, z * .5], g.head); }
  const crown = cone(.3, .6, og, [-.1, .6, 0], g.head, 5);
  g.fin = cone(.4, .8, mat('#F7D27A', { glow: .2 }), [-.75, 3.2, 0], g.body, 3); g.fin.rotation.z = Math.PI / 2; g.fin.scale.z = .2;
  g.tail = group([0, 1.6, 0], g.body); g.tailSegs = []; let par = g.tail; for (let i = 0; i < 7; i++) { const s = group(i ? [0, -.4, 0] : [0, 0, 0], par); const c = ball(.38 - i * .04, yl, [0, -.2, 0], s); g.tailSegs.push(s); par = s; }
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
  w.ground = k.ground('#F2DFA8', 0);
  w.sea = box(80, .1, 40, mat('#3E8FCF', { glow: .1 }), [0, .05, -22]);
  w.sh = seahorse(k, k.scene); w.shr = w.sh.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.track = group(); box(30, .05, 6, mat('#8CC56A'), [0, .03, 0], w.track); for (let i = 0; i < 5; i++) box(.15, 1.2, .15, mat('#FFFFFF'), [-12 + i * 6, .6, 3], w.track); box(30, .1, .1, mat('#FFFFFF'), [0, 1.2, 3], w.track);
  w.horses = group(); for (let i = 0; i < 2; i++) { const h = group([0, 0, -1.5 + i * 3], w.horses); const hb = ball(.9, mat(i ? '#6E4A2E' : '#2A2A2E'), [0, 2, 0], h); hb.scale.set(1.6, .8, .7); const hh = ball(.45, mat(i ? '#6E4A2E' : '#2A2A2E'), [1.6, 2.8, 0], h); hh.scale.set(1.4, .8, .7); for (const x of [-.9, .9]) for (const z of [-.3, .3]) cyl(.1, .1, 1.6, mat(i ? '#6E4A2E' : '#2A2A2E'), [x, .8, z], h, 6); }
  w.pole = group(); cyl(.18, .18, 7, mat('#555555'), [0, 3.5, 0], w.pole, 8); box(1.4, .2, .4, mat('#555555'), [.6, 7, 0], w.pole); ball(.3, mat('#FFE9A0', { glow: .8 }), [1.2, 6.8, 0], w.pole);
  w.splash = group(); for (let i = 0; i < 12; i++) { const s = ball(.3, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const shAt = (w, x, y, z, ry, s) => { w.shr.position.set(x, y, z); w.shr.rotation.set(0, ry, 0); w.shr.scale.setScalar(s); w.sh.body.rotation.set(0, 0, 0); w.sh.head.rotation.set(0, 0, 0); w.sh.tailSegs.forEach((g, i) => g.rotation.set(0, 0, -.25)); };
const curl = (w, a) => w.sh.tailSegs.forEach((g, i) => g.rotation.z = -a);

export default {
  id: '383',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT SEAHORSES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SEAHORSES', 'WERE GIANT?'],
  title: 'What would happen if seahorses were giant?',
  description: 'One wave, and it surfs onto the beach. The horse race? Wrong kind of horse. And its tail grabs a lamp post and will not let go. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'seahorse', 'sea', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant seahorses are made up. Quiz fact: in seahorses, the male carries the eggs in a brood pouch and gives birth to the young (Encyclopaedia Britannica, "seahorse").'],
  setup,
  scenes: [
    { say: 'What if seahorses were giant?', show: ['ground', 'sea', 'shr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 10.8, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 10.8, 0], fov: 54 } },
      update: (w, p, t) => { shAt(w, -3, 1 + .3 * Math.sin(t * 2), -6, -.25, 2); curl(w, .35 + .1 * Math.sin(t * 2)); w.house.position.set(4.6, 0, -2); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'One wave? It surfs onto the beach.', label: 'SPLASH!', show: ['ground', 'sea', 'shr', 'splash', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 22], look: [0, 4, -2], fov: 56, to: { pos: [3, 6, 21], look: [0, 4, -2], fov: 54 } },
      update: (w, p, t) => { const q = Math.min(1, p * 1.4); shAt(w, -1, 1 + Math.sin(q * Math.PI) * 3, -10 + q * 9, -.25, 1.3); w.sh.body.rotation.z = -.3 * Math.sin(q * Math.PI); curl(w, .5); w.splash.children.forEach(s => { const i = s.userData.i, d = Math.max(0, p - .7) * 3, a = i / 12 * Math.PI * 2; s.position.set(-1 + Math.cos(a) * d * 3, .3 + d * 2 - d * d * 1.6, -1 + Math.sin(a) * d * 2); s.visible = p > .7 && s.position.y > 0; }); stand(w, 4.6, 4, -.5); pose(w.p, p > .7 ? 2.4 : .4); w.p.mouth.scale.set(1.2, p > .7 ? 3 : 1, 1); } },
    { say: 'The horse race? Wrong kind of horse.', label: 'AND THEY\'RE OFF', show: ['ground', 'track', 'horses', 'shr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 3, 0], fov: 56, to: { pos: [2, 5, 17], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.horses.position.set(-4 + p * 8, 0, 0); w.horses.children.forEach((h, i) => h.position.y = .2 * Math.abs(Math.sin(t * 10 + i))); shAt(w, -6 + p * 3, .3 * Math.abs(Math.sin(t * 4)), 0, -Math.PI / 2 + .2, .8); curl(w, .4 + .3 * Math.abs(Math.sin(t * 4))); } },
    { say: 'And its tail grabs a lamp post. And will not let go.', label: 'MINE', show: ['ground', 'shr', 'pole', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 4, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { w.pole.position.set(.4, 0, 0); shAt(w, -1.4, 2.4, -.3, 0, 1.1); curl(w, 1.05); w.sh.head.rotation.z = .1 * Math.sin(t * 2); stand(w, 3.6, 3.6, -.6); pose(w.p, 1.2, 1); w.p.mouth.scale.set(1.2, 2, 1); w.pp.position.x = 3.6 - .05 * Math.abs(Math.sin(t * 8)); } },
    { say: 'Giant seahorses: cool, cute, or way too clingy? Comment below.',
      quiz: { q: 'Giant seahorses are…', options: ['Cool', 'Cute', 'Way too clingy'], answer: 'Made up. Fun fact: seahorse dads are the ones who give birth.' },
      show: ['ground', 'shr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [6, 4, 8], look: [0, 3.4, 0], fov: 54, to: { pos: [8, 4, 2], look: [0, 3.4, 0] } },
      update: (w, p, t) => { shAt(w, 0, .6 + .2 * Math.sin(t * 2), 0, .3, .9); curl(w, .4); } },
  ],
};

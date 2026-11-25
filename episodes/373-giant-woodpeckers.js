// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a woodpecker taller than a house, pecking its door.

function woodpecker(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const blk = mat('#1E1E22', { rough: .8 }), wht = mat('#F4F4F0'), red = mat('#D8322E');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, blk, [0, 2.6, 0], g.body); b.scale.set(.8, 1.4, .8); const bl = ball(.7, wht, [.35, 2.4, 0], g.body); bl.scale.set(.6, 1.1, .7);
  for (let i = 0; i < 3; i++) { const sp = ball(.15, wht, [-.3, 2.2 + i * .45, .72], g.body); sp.scale.set(1, .6, .3); const sp2 = ball(.15, wht, [-.3, 2.2 + i * .45, -.72], g.body); sp2.scale.set(1, .6, .3); }
  const tl = box(.3, 1.4, .6, blk, [-.6, 1.3, 0], g.body); tl.rotation.z = -.3;
  g.head = group([.2, 4.2, 0], g.body); ball(.65, blk, [0, 0, 0], g.head); const cap = ball(.5, red, [-.1, .35, 0], g.head); cap.scale.set(1.1, .8, 1); const ch = ball(.45, wht, [.2, -.15, 0], g.head); ch.scale.set(.8, .6, 1.25);
  for (const z of [-1, 1]) { ball(.12, mat('#FFFFFF'), [.35, .15, z * .48], g.head); ball(.06, mat('#111111'), [.42, .15, z * .55], g.head); }
  g.beak = cone(.16, 1.1, mat('#5A5A60'), [1.05, 0, 0], g.head, 8); g.beak.rotation.z = -Math.PI / 2;
  g.feet = []; for (const z of [-1, 1]) { const f = cone(.12, .6, mat('#6A6A70'), [.3, 1.3, z * .4], g.body, 6); f.rotation.z = -1.2; g.feet.push(f); }
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
  w.wp = woodpecker(k, k.scene); w.wr = w.wp.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4; w.door = box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house); w.hole = box(.9, 1.6, .12, mat('#1A1410'), [0, .9, 1.73], w.house);
  w.pole = group(); w.poleMesh = cyl(.25, .25, 8, mat('#8B6A44'), [0, 4, 0], w.pole, 10); box(2, .2, .2, mat('#8B6A44'), [0, 7.6, 0], w.pole);
  w.chips = group(); for (let i = 0; i < 16; i++) { const c = box(.2, .08, .1, mat('#C9A06A'), [0, 0, 0], w.chips); c.userData.i = i; c.castShadow = false; }
  w.moon = ball(1, mat('#F4F1D8', { glow: 1 }), [0, 0, 0]);
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = box(.6, .12, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.notes); n.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const wpAt = (w, x, y, z, ry, s) => { w.wr.position.set(x, y, z); w.wr.rotation.set(0, ry, 0); w.wr.scale.setScalar(s); w.wp.body.rotation.set(0, 0, 0); w.wp.head.rotation.set(0, 0, 0); };
const peck = (w, t, f = 14, a = .35) => { const q = Math.max(0, Math.sin(t * f)); w.wp.head.rotation.z = -q * a; w.wp.body.rotation.z = -q * a * .3; return q; };

export default {
  id: '373',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT WOODPECKERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WOODPECKERS', 'WERE GIANT?'],
  title: 'What would happen if woodpeckers were giant?',
  description: 'It knocks on your door, straight through it. Telephone poles become toothpicks. And at six in the morning? Drumming on your roof. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'woodpecker', 'bird', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant woodpeckers are made up. Quiz fact: a woodpecker\'s tongue is so long that, when pulled in, it wraps around the back of the skull (Encyclopaedia Britannica, "woodpecker"; Cornell Lab of Ornithology).'],
  setup,
  scenes: [
    { say: 'What if woodpeckers were giant?', label: 'KNOCK KNOCK', show: ['ground', 'wr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4, 22], look: [0, 6.8, 0], fov: 56, to: { pos: [3, 4, 20.5], look: [0, 6.8, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(2.4, 0, -2); w.hole.visible = false; wpAt(w, -2.8, 0, 0, -.3, 1.6); peck(w, t, 10); stand(w, 4.6, 4, -.4); w.pp.scale.setScalar(.8); pose(w.p, .3); w.p.head.rotation.y = -.6; w.p.head.rotation.x = -.3; } },
    { say: 'It knocks on your door. Straight through it.', label: 'THUNK!', show: ['ground', 'wr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 4, 16], look: [0, 3, 0], fov: 54, to: { pos: [6, 4, 15], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(1.4, 0, -2); w.house.rotation.y = 0; const through = p > .55; w.door.visible = !through; w.hole.visible = through; wpAt(w, -1.6, -2.3, .7, .3, 1); peck(w, t, 9, .5); stand(w, 5, .8, -.6); pose(w.p, through ? 2.4 : .4); w.p.mouth.scale.set(1.2, through ? 3 : 1, 1); } },
    { say: 'Telephone poles? Toothpicks.', label: 'RAT-A-TAT-TAT', show: ['ground', 'wr', 'pole', 'chips'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 4.4, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { w.door.visible = true; w.hole.visible = false; w.pole.position.set(1.6, 0, 0); const thin = Math.max(.15, 1 - p * 1.1); w.poleMesh.scale.set(thin, 1, thin); wpAt(w, -1.5, 0, 0, 0, 1.2); peck(w, t, 22, .4); w.chips.children.forEach(c => { const i = c.userData.i, q = (t * 2 + i / 16) % 1; c.position.set(1.6 + Math.cos(i * 2) * q * 2, 5 - q * 5 + Math.sin(q * Math.PI) * 1, Math.sin(i * 3) * q * 1.5); c.rotation.set(t * 8 + i, t * 5, 0); }); } },
    { say: 'And at six in the morning? Drumming on your roof.', label: 'DRRRRRRUM', show: ['ground', 'wr', 'house', 'moon', 'notes'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => .1,
      cam: { pos: [3, 7, 22], look: [0, 6, 0], fov: 56, to: { pos: [3, 7, 21], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -2); wpAt(w, -.4, 5.4, -2, 0, .9); peck(w, t, 26, .3); w.moon.position.set(-6, 12, -10); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .8 + i / 4) % 1; n.position.set(1.5 + q * 3, 8 + q * 3, -2); n.rotation.z = .4 * Math.sin(t * 6 + i); }); } },
    { say: 'Giant woodpeckers: cool, cute, or way too loud? Comment below.',
      quiz: { q: 'Giant woodpeckers are…', options: ['Cool', 'Cute', 'Way too loud'], answer: 'Made up. A real woodpecker\'s tongue wraps around the back of its skull.' },
      show: ['ground', 'wr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [6, 4, 8], look: [0, 3.6, 0], fov: 54, to: { pos: [8, 4, 2], look: [0, 3.6, 0] } },
      update: (w, p, t) => { wpAt(w, 0, 0, 0, -.6, 1); if (p > .5) peck(w, t, 10); } },
  ],
};

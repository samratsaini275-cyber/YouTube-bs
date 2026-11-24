// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized squirrel next to a house.

function squirrel(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const fur = mat('#B5652E', { rough: .8 }), light = mat('#F0D2A8');
  const s = { root: group([0, 0, 0], parent) };
  const b = ball(1, fur, [0, 1.2, 0], s.root); b.scale.set(.9, 1.1, .8);
  const belly = ball(.75, light, [.35, 1.1, 0], s.root); belly.scale.set(.6, 1, .8);
  s.head = group([.5, 2.4, 0], s.root); ball(.6, fur, [0, 0, 0], s.head);
  for (const z of [-1, 1]) { cone(.15, .35, fur, [-.1, .55, z * .3], s.head); ball(.13, mat('#FFFFFF'), [.42, .15, z * .25], s.head); ball(.07, mat('#111111'), [.52, .16, z * .25], s.head); }
  ball(.08, mat('#3A1E10'), [.6, -.05, 0], s.head); s.teeth = box(.05, .14, .14, mat('#FFFFFF'), [.55, -.25, 0], s.head);
  s.tail = []; let prev = [-.8, .6, 0]; for (let i = 0; i < 6; i++) { const a = i / 5 * 2.4; const pos = [-1 - Math.sin(a) * .9, .7 + i * .5, 0]; const tb = ball(.55 + i * .05, fur, pos, s.root); s.tail.push(tb); }
  s.paws = [-1, 1].map(z => ball(.18, fur, [.75, 1.6, z * .35], s.root));
  s.feet = [-1, 1].map(z => { const f = ball(.3, fur, [.2, .2, z * .5], s.root); f.scale.set(1.6, .6, 1); return f; });
  return s;
}
const wag = (s, t) => s.tail.forEach((b, i) => { b.position.z = .15 * Math.sin(t * 4 - i * .6) * i; });
const nibble = (s, t) => { s.head.rotation.z = .08 * Math.sin(t * 20); s.teeth.scale.y = 1 + .3 * Math.sin(t * 20); };
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
  w.sq = squirrel(k, k.scene); w.sr = w.sq.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#3B6FD6'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.dirt = group(); for (let i = 0; i < 10; i++) { const d = ball(.18, mat('#6B4A2A'), [0, 0, 0], w.dirt); d.userData.i = i; d.castShadow = false; } w.mound = ball(1.6, mat('#6B4A2A'), [0, 0, 0]); w.mound.scale.y = .4;
  w.feeder = group(); cyl(.08, .08, 4, mat('#555555'), [0, 2, 0], w.feeder, 8); box(1, .8, 1, mat('#E8D29A'), [0, 4.2, 0], w.feeder); cone(.8, .5, mat('#B3262E'), [0, 4.85, 0], w.feeder, 4).rotation.y = Math.PI / 4;
  w.wire = group(); for (const x of [-9, 9]) { cyl(.15, .15, 8, mat('#7A4E2A'), [x, 4, 0], w.wire, 8); box(1.4, .15, .15, mat('#7A4E2A'), [x, 7.6, 0], w.wire); } cyl(.03, .03, 18, mat('#222222'), [0, 7.75, 0], w.wire, 6).rotation.z = Math.PI / 2;
  w.acorns = group(); for (let i = 0; i < 12; i++) { const a = group([0, 0, 0], w.acorns); ball(.3, mat('#A0632E'), [0, 0, 0], a).scale.y = 1.2; const cp = ball(.32, mat('#5A3A1E'), [0, .2, 0], a); cp.scale.y = .5; a.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); };
const sqAt = (w, x, y, z, ry, s) => { w.sr.position.set(x, y, z); w.sr.rotation.set(0, ry, 0); w.sr.scale.setScalar(s); };

export default {
  id: '305',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT SQUIRRELS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SQUIRRELS', 'WERE GIANT?'],
  title: 'What would happen if squirrels were giant?',
  description: 'Your car gets buried for winter. The bird feeder? One gulp. Power lines become a highway. And acorns rain on your roof. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'squirrel', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant squirrels are made up. Quiz fact: squirrels bury nuts to eat later and do not find them all; forgotten acorns can sprout into new oak trees (National Wildlife Federation, "Eastern Gray Squirrel").'],
  setup,
  scenes: [
    { say: 'What if squirrels were giant?', show: ['ground', 'sr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.2, 0], fov: 52 } },
      update: (w, p, t) => { sqAt(w, -2.6, 0, -5, .5, 2.6); wag(w.sq, t); nibble(w.sq, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your car? Buried for winter.', show: ['ground', 'sr', 'car', 'dirt', 'mound', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 3.6, 0], fov: 54, to: { pos: [2, 5, 17], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); sqAt(w, -3.4, 0, -1, .2, 2); wag(w.sq, t); w.sq.head.rotation.set(0, 0, -.4); w.sq.paws.forEach((pw, i) => pw.position.set(.85, 1.2 + .3 * Math.sin(t * 16 + i * Math.PI), (i ? 1 : -1) * .35)); const q = Math.min(1, Math.max(0, p - .3) * 1.8); w.car.position.set(1, -q * 1.6, 0); w.mound.position.set(1, 0, 0); w.mound.scale.set(1.4, .2 + q * .5, 1); w.mound.visible = q > .25; w.dirt.children.forEach(d => { const i = d.userData.i, r = (t * 2 + i / 10) % 1; d.position.set(-.6 + r * 2, 1 + Math.sin(r * Math.PI) * 2, (i % 3 - 1) * .6); d.visible = q < 1; }); stand(w, 3.6, 3, -.6); pose(w.p, .4); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'The bird feeder? One gulp.', label: 'GULP', show: ['ground', 'sr', 'feeder'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 15], look: [0, 4.4, 0], fov: 54, to: { pos: [3, 5, 14], look: [0, 4.4, 0], fov: 52 } },
      update: (w, p, t) => { w.car.position.y = 0; sqAt(w, -1.6, 0, 0, 0, 2); wag(w.sq, t); w.sq.head.rotation.set(0, 0, 0); w.feeder.position.set(1.4, 0, 0); const eaten = p > .55; w.feeder.children[1].visible = !eaten; w.feeder.children[2].visible = !eaten; nibble(w.sq, t * (eaten ? .3 : 1)); w.sq.paws.forEach((pw, i) => pw.position.set(.95, 2 + .1 * Math.sin(t * 10 + i), (i ? 1 : -1) * .3)); w.sr.scale.set(2 * (eaten ? 1.1 : 1), 2, 2 * (eaten ? 1.1 : 1)); } },
    { say: 'Power lines? A highway.', show: ['ground', 'sr', 'wire'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 20], look: [0, 7.4, 0], fov: 54, to: { pos: [0, 6, 19], look: [0, 7.4, 0], fov: 52 } },
      update: (w, p, t) => { w.sq.paws.forEach((pw, i) => pw.position.set(.75, 1.6, (i ? 1 : -1) * .35)); sqAt(w, -7 + p * 14, 7.75 + .15 * Math.abs(Math.sin(t * 12)), 0, 0, 1.4); w.sr.rotation.z = -.1; wag(w.sq, t * 2); w.sq.feet.forEach((f, i) => f.position.x = .2 + .3 * Math.sin(t * 16 + i * Math.PI)); } },
    { say: 'And acorns? They rain on your roof.', label: '*BONK*', show: ['ground', 'sr', 'house', 'pp', 'acorns'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: () => .08,
      cam: { pos: [2, 5, 18], look: [0, 5.4, 0], fov: 56, to: { pos: [2, 5, 17], look: [0, 5.4, 0], fov: 54 } },
      update: (w, p, t) => { sqAt(w, -5, 0, -4, .3, 2.6); w.sr.rotation.z = 0; wag(w.sq, t); nibble(w.sq, t); w.house.position.set(1.5, 0, 0); stand(w, 3.8, 3.4, -.6); pose(w.p, 2.6); w.p.mouth.scale.set(1.2, 2, 1); w.acorns.children.forEach(a => { const i = a.userData.i, q = (t * .9 + i / 12) % 1; a.position.set(-1 + (i % 6) * .9, 11 - q * 7, -1 + (i % 3)); a.rotation.z = t * 3 + i; a.scale.setScalar(1.6); }); } },
    { say: 'Giant squirrels: cute, cool, or way too nutty? Comment below.',
      quiz: { q: 'Giant squirrels are…', options: ['Cute', 'Cool', 'Way too nutty'], answer: 'Made up. Real squirrels forget some buried acorns, and those can grow into oak trees.' },
      show: ['ground', 'sr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.2, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.2, 0] } },
      update: (w, p, t) => { sqAt(w, 0, 0, 0, .3, 1.6); wag(w.sq, t); nibble(w.sq, t); } },
  ],
};

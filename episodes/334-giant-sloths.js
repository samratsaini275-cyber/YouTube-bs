// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized sloth hanging from a giant branch over a house.

function sloth(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const fur = mat('#8A7258', { rough: .9 }), face = mat('#E8D8B8'), dark = mat('#3A2A1A');
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  const b = ball(1, fur, [0, 0, 0], s.body); b.scale.set(.9, 1.3, .8);
  s.head = group([0, 1.35, .25], s.body); ball(.55, fur, [0, 0, 0], s.head); const f = ball(.42, face, [0, -.02, .25], s.head); f.scale.set(1, .85, .7);
  for (const x of [-1, 1]) { const m = ball(.14, dark, [x * .17, .05, .52], s.head); m.scale.set(1.4, .7, .5); m.rotation.z = -x * .4; ball(.05, mat('#111111'), [x * .17, .07, .56], s.head); }
  ball(.07, dark, [0, -.1, .6], s.head); s.smile = cyl(.12, .12, .02, dark, [0, -.25, .55], s.head, 12); s.smile.rotation.x = Math.PI / 2; s.smile.scale.set(1, 1, .3);
  s.arms = [-1, 1].map(x => { const a = group([x * .6, .8, 0], s.body); cyl(.15, .12, 1.8, fur, [0, .9, 0], a, 8); for (let c = 0; c < 3; c++) { const cl = cone(.04, .3, mat('#D8C8A8'), [(c - 1) * .07, 1.9, .05], a, 5); cl.rotation.x = .6; } a.rotation.z = x * .25; a.userData.x = x; return a; });
  s.legs = [-1, 1].map(x => { const l = group([x * .45, -1, 0], s.body); cyl(.16, .13, 1.2, fur, [0, -.6, 0], l, 8); l.userData.x = x; return l; });
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



function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.sl = sloth(k, k.scene); w.sr = w.sl.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.tree = group(); cyl(.6, .8, 10, mat('#7A4E2A'), [-6, 5, -1], w.tree, 12); w.branch = cyl(.35, .35, 14, mat('#7A4E2A'), [0, 10, -1], w.tree, 10); w.branch.rotation.z = Math.PI / 2; for (let i = 0; i < 6; i++) ball(1.6, mat('#3E8E33'), [-7 + i * 2.6, 11.2 + (i % 2) * .6, -1.4], w.tree);
  w.road = box(60, .04, 6, mat('#555B66'), [0, .02, 0]); w.lines = group(); for (let i = 0; i < 12; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-26 + i * 4.8, .05, 0], w.lines);
  w.cars = group(); for (const s of [-1, 1]) { const c = group([s * 4.2, 0, s * 1.4], w.cars); box(2.6, .9, 1.3, mat(s < 0 ? '#E2453C' : '#F2B21F'), [0, .65, 0], c); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], c); c.rotation.y = s > 0 ? Math.PI : 0; }
  w.sun = ball(1.2, mat('#FFE45C', { glow: 1 }), [0, 0, -10]);
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF5FA2', { glow: .6 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const slAt = (w, x, y, z, ry, s) => { w.sr.position.set(x, y, z); w.sr.rotation.set(0, ry, 0); w.sr.scale.setScalar(s); w.sl.body.rotation.set(0, 0, 0); w.sl.arms.forEach(a => a.rotation.set(0, 0, a.userData.x * .25)); w.sl.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const hang = (w) => { w.sl.arms.forEach(a => a.rotation.set(0, 0, a.userData.x * .15)); w.sl.legs.forEach(l => l.rotation.set(0, 0, Math.PI - l.userData.x * .2)); };

export default {
  id: '334',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT SLOTHS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SLOTHS', 'WERE GIANT?'],
  title: 'What would happen if sloths were giant?',
  description: 'Crossing the road takes all day. Your tree becomes their hammock. And one hug? You are stuck for hours. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'sloth', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant sloths are made up. Quiz fact: sloths spend almost all their time in trees and climb down only about once a week to go to the toilet (Smithsonian\'s National Zoo, "Two-toed sloth").'],
  setup,
  scenes: [
    { say: 'What if sloths were giant?', show: ['ground', 'sr', 'house', 'tree', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 9.2, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 9.2, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(1.5, 0, -1); slAt(w, -.6, 5, -1, 0, 2.3); w.sl.arms.forEach(a => a.rotation.set(0, 0, a.userData.x * .1)); w.sr.rotation.z = .05 * Math.sin(t * 1.5); stand(w, 3.6, 4, -.3); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.5; } },
    { say: 'Crossing the road? It takes all day.', label: 'HONK!', show: ['ground', 'sr', 'road', 'lines', 'cars', 'sun'], sky: '#F2B07A', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 20], look: [0, 3.4, 0], fov: 56, to: { pos: [0, 6, 19], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { slAt(w, -1 + p * .5, 1.1, 0, 0, 1.3); w.sl.body.rotation.z = -1.35; w.sl.arms.forEach((a, i) => a.rotation.set(-.3 + .2 * Math.sin(t * .8 + i * Math.PI), 0, a.userData.x * .5)); w.sun.position.set(-8 + p * 16, 9 - Math.abs(p - .5) * 6, -12); w.cars.children.forEach((c, i) => c.position.y = .04 * Math.abs(Math.sin(t * 20 + i))); } },
    { say: 'Your tree? Their hammock.', label: 'ZZZ', show: ['ground', 'sr', 'tree', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 8, 22], look: [0, 8.4, 0], fov: 56, to: { pos: [0, 8, 21], look: [0, 8.4, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(5, 0, -4); slAt(w, 0, 8.6, -1, 0, 1.4); w.sl.body.rotation.z = Math.PI / 2; w.sl.arms.forEach(a => a.rotation.set(0, 0, a.userData.x * .1)); w.sr.position.y = 8.4 + .1 * Math.sin(t * 1.2); w.sr.rotation.x = .05 * Math.sin(t * 1.2); } },
    { say: 'And one hug? You are stuck for hours.', label: 'HELP!', show: ['ground', 'sr', 'pp', 'hearts'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 14], look: [0, 3.6, 0], fov: 54, to: { pos: [2.8, 5, 13.2], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { slAt(w, 0, 3.2, -.4, 0, 1.4); w.sl.arms.forEach(a => a.rotation.set(-1.3, 0, -a.userData.x * .6)); stand(w, 0, .9, 0); pose(w.p, .2); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (.4 + .3 * Math.sin(t * 10)))); w.p.mouth.scale.set(1.2, 2.6, 1); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 4) % 1; h.position.set(-1 + i * .7, 6 + q * 2, -.4); }); } },
    { say: 'Giant sloths: cute, cuddly, or way too slow? Comment below.',
      quiz: { q: 'Giant sloths are…', options: ['Cute', 'Cuddly', 'Way too slow'], answer: 'Made up. Real sloths climb down only about once a week to use the toilet.' },
      show: ['ground', 'sr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [6, 3, 10], look: [0, 3.2, 0], fov: 52, to: { pos: [8, 3, 5], look: [0, 3.2, 0] } },
      update: (w, p, t) => { slAt(w, 0, 2.2, 0, .5, 1.2); w.sl.arms.forEach(a => a.rotation.set(0, 0, a.userData.x * (.6 + .1 * Math.sin(t)))); } },
  ],
};

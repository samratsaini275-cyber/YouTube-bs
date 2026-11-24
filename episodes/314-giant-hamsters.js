// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized hamster next to a house.

function hamster(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const fur = mat('#E0A050', { rough: .8 }), light = mat('#FFF1DC');
  const h = { root: group([0, 0, 0], parent) };
  h.body = ball(1.2, fur, [0, 1.1, 0], h.root); h.body.scale.set(1.2, .95, 1);
  const belly = ball(.9, light, [.55, .95, 0], h.root); belly.scale.set(.7, .9, .9);
  h.head = group([1.1, 1.55, 0], h.root); ball(.75, fur, [0, 0, 0], h.head);
  h.cheeks = [-1, 1].map(z => ball(.38, light, [.3, -.25, z * .45], h.head));
  for (const z of [-1, 1]) { const e = ball(.22, mat('#E8A0A0'), [-.2, .62, z * .42], h.head); e.scale.set(.6, 1, 1); ball(.12, mat('#111111', { rough: .2 }), [.58, .2, z * .3], h.head); ball(.04, mat('#FFFFFF', { glow: .6 }), [.68, .25, z * .28], h.head); }
  ball(.09, mat('#E86A8A'), [.75, -.02, 0], h.head);
  h.feet = [-1, 1].map(z => { const f = ball(.25, mat('#F2B8A8'), [.6, .15, z * .55], h.root); f.scale.set(1.4, .5, 1); return f; });
  h.paws = [-1, 1].map(z => ball(.16, mat('#F2B8A8'), [1.35, 1, z * .3], h.root));
  return h;
}
const sniff = (h, t) => { h.head.rotation.z = .05 * Math.sin(t * 14); };
const puff = (h, s) => h.cheeks.forEach((c, i) => { c.scale.setScalar(s); c.position.z = (i ? 1 : -1) * (.45 + (s - 1) * .3); });
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
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.hm = hamster(k, k.scene); w.hr = w.hm.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.wheel = group(); w.spin = group([0, 6, 0], w.wheel); const wm = mat('#4FB3E8'); for (const z of [-1.8, 1.8]) { const r = torus(5.5, .25, wm, [0, 0, z], w.spin); r.rotation.set(0, 0, 0); } for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const bar = cyl(.1, .1, 3.6, mat('#9AD8F5'), [Math.cos(a) * 5.5, Math.sin(a) * 5.5, 0], w.spin, 6); bar.rotation.x = Math.PI / 2; }
  for (const x of [-3, 3]) { const l = box(.4, 6.5, .4, mat('#2E7FB0'), [x * .5, 3, -2.2], w.wheel); l.rotation.z = -x * .08; }
  w.moon = ball(1.2, mat('#FFF3C4', { glow: .9 }), [6, 14, -10]);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const hmAt = (w, x, y, z, ry, s) => { w.hr.position.set(x, y, z); w.hr.rotation.set(0, ry, 0); w.hr.scale.setScalar(s); };

export default {
  id: '314',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT HAMSTERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HAMSTERS', 'WERE GIANT?'],
  title: 'What would happen if hamsters were giant?',
  description: 'Your car? Stuffed in its cheeks. The running wheel is the size of a Ferris wheel. And at night? Squeak, squeak, squeak. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'hamster', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant hamsters are made up. Quiz fact: hamsters carry food in stretchy cheek pouches that reach back to their shoulders (Encyclopaedia Britannica, "hamster").'],
  setup,
  scenes: [
    { say: 'What if hamsters were giant?', show: ['ground', 'hr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.6, 0], fov: 52 } },
      update: (w, p, t) => { hmAt(w, -3.4, 0, -5, -.5, 2.8); sniff(w.hm, t); puff(w.hm, 1); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your car? Stuffed in its cheeks.', show: ['ground', 'hr', 'car', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 3.8, 0], fov: 54, to: { pos: [2, 5, 17], look: [0, 3.8, 0], fov: 52 } },
      update: (w, p, t) => { hmAt(w, -3.6, 0, -1, 0, 2.2); sniff(w.hm, t); const q = Math.min(1, Math.max(0, p - .3) * 2.5); w.car.position.set(1.2 - q * 1.2, q * 2.4, 0); w.car.scale.setScalar(1 - q * .9); w.car.visible = q < 1; puff(w.hm, 1 + (q >= 1 ? .9 : 0)); stand(w, 3.6, 3, -.6); pose(w.p, q >= 1 ? 2.4 : .4); w.p.mouth.scale.set(1.2, q >= 1 ? 3 : 1, 1); } },
    { say: 'Its running wheel? A Ferris wheel.', show: ['ground', 'hr', 'wheel'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 24], look: [0, 6, 0], fov: 54, to: { pos: [0, 6, 22.5], look: [0, 6, 0], fov: 52 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); puff(w.hm, 1); w.spin.rotation.z = -t * 1.6; hmAt(w, 0, .75 + .2 * Math.abs(Math.sin(t * 10)), 0, 0, 1.8); w.hm.feet.forEach((f, i) => f.position.x = .6 + .35 * Math.sin(t * 14 + i * Math.PI)); sniff(w.hm, t); } },
    { say: 'And at night? Squeak, squeak, squeak.', label: 'SQUEAK!', show: ['ground', 'hr', 'wheel', 'house', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: () => .04,
      cam: { pos: [6, 5, 26], look: [0, 6, 0], fov: 56, to: { pos: [6, 5, 24.5], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { w.spin.rotation.z = -t * 2.2; hmAt(w, 0, .75 + .2 * Math.abs(Math.sin(t * 12)), 0, 0, 1.8); w.hm.feet.forEach((f, i) => f.position.x = .6 + .35 * Math.sin(t * 18 + i * Math.PI)); w.house.position.set(9, 0, 3); w.house.rotation.y = -.5; } },
    { say: 'Giant hamsters: cute, cool, or way too squeaky? Comment below.',
      quiz: { q: 'Giant hamsters are…', options: ['Cute', 'Cool', 'Way too squeaky'], answer: 'Made up. Real hamsters stuff food in cheek pouches that reach their shoulders.' },
      show: ['ground', 'hr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3, 0] } },
      update: (w, p, t) => { w.house.rotation.y = 0; hmAt(w, 0, 0, 0, .3, 1.3); sniff(w.hm, t); puff(w.hm, 1.3); } },
  ],
};

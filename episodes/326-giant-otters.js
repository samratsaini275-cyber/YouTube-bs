// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized sea otter floating on its back next to a house.

function otter(k, parent) {
  const { mat, ball, group } = k;
  const brown = mat('#7A5032', { rough: .8 }), face = mat('#D8C0A0', { rough: .8 }), dark = mat('#2A1A10');
  const o = { root: group([0, 0, 0], parent) };
  o.body = group([0, 0, 0], o.root);
  const b = ball(1, brown, [0, 1, 0], o.body); b.scale.set(1.9, .8, .9);
  o.head = group([1.9, 1.35, 0], o.body); ball(.62, brown, [0, 0, 0], o.head); const f = ball(.5, face, [.2, -.05, 0], o.head); f.scale.set(.9, .9, 1.05);
  for (const z of [-1, 1]) { ball(.1, dark, [.48, .18, z * .2], o.head); ball(.035, mat('#FFFFFF', { glow: .6 }), [.56, .22, z * .19], o.head); ball(.12, brown, [-.1, .5, z * .38], o.head); }
  ball(.1, dark, [.68, .02, 0], o.head);
  o.paws = [-1, 1].map(z => ball(.2, brown, [1.1, 1.6, z * .35], o.body));
  o.feet = [-1, 1].map(z => { const ft = ball(.3, brown, [-1.9, 1.1, z * .4], o.body); ft.scale.set(1.4, .4, 1); return ft; });
  const tail = ball(.3, brown, [-2.3, .9, 0], o.body); tail.scale.set(2, .5, .8);
  return o;
}
const bob = (o, t) => { o.body.position.y = .1 * Math.sin(t * 2.5); o.body.rotation.x = .05 * Math.sin(t * 2); };
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
  w.ot = otter(k, k.scene); w.or = w.ot.root;
  w.ot2 = otter(k, k.scene); w.or2 = w.ot2.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.lake = cyl(14, 14, .1, mat('#3E8FCF', { glow: .1 }), [0, .05, 0], undefined, 40);
  w.bath = group(); cyl(3.4, 3, 1.6, mat('#FFFFFF'), [0, .8, 0], w.bath, 24); cyl(3.2, 3.2, .1, mat('#9AD8F5', { glow: .2 }), [0, 1.5, 0], w.bath, 24); for (let i = 0; i < 8; i++) ball(.5, mat('#FFFFFF', { glow: .3 }), [Math.cos(i) * 2.2, 1.7, Math.sin(i * 1.7) * 2], w.bath);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.shell = ball(.35, mat('#C9A0D0'), [0, 0, 0]); w.shell.scale.set(1.3, .6, 1);
  w.bits = group(); for (let i = 0; i < 8; i++) { const b = box(.15, .1, .15, mat('#C9A0D0'), [0, 0, 0], w.bits); b.userData.i = i; b.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const otAt = (o, x, y, z, ry, s, back = true) => { o.root.position.set(x, y, z); o.root.rotation.set(back ? 0 : 0, ry, 0); o.root.scale.setScalar(s); o.head.rotation.set(0, 0, back ? .5 : 0); };

export default {
  id: '326',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT OTTERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OTTERS', 'WERE GIANT?'],
  title: 'What would happen if otters were giant?',
  description: 'Your bath? Their hot tub. At night they hold hands so they do not drift off. And their snacks get cracked open on your car. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'otter', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant otters are made up. Quiz fact: sea otters use rocks as tools, floating on their backs and cracking open shellfish against a stone held on their chest (Monterey Bay Aquarium, "Sea otter").'],
  setup,
  scenes: [
    { say: 'What if otters were giant?', show: ['ground', 'or', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.2, 0], fov: 52 } },
      update: (w, p, t) => { otAt(w.ot, -3.6, 0, -4, -.5, 2.4, false); w.ot.body.rotation.z = .5; w.ot.body.position.y = .6; w.ot.head.rotation.z = -.4; w.ot.paws.forEach((pw, i) => pw.position.set(1.1, 1.6 + .2 * Math.sin(t * 6 + i), (i ? 1 : -1) * .35)); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your bath? Their hot tub.', label: 'AHHH', show: ['ground', 'or', 'bath', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 7, 16], look: [0, 2.6, 0], fov: 54, to: { pos: [2, 7, 15.2], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { w.ot.body.rotation.z = 0; otAt(w.ot, 0, .7, 0, -.4, 1.1); bob(w.ot, t); stand(w, 4.6, 3, -.6); pose(w.p, .3, .8); w.p.mouth.scale.set(1.2, 2.4, 1); } },
    { say: 'At night? They hold hands so they do not drift away.', label: 'AWW', show: ['ground', 'or', 'or2', 'lake'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 10, 16], look: [0, 1.4, 0], fov: 54, to: { pos: [0, 10, 15.2], look: [0, 1.4, 0], fov: 52 } },
      update: (w, p, t) => { otAt(w.ot, 0, -.3, -1.6, -.15, 1.4); otAt(w.ot2, 0, -.3, 1.6, .15, 1.4); bob(w.ot, t); bob(w.ot2, t + 1); w.ot.paws[1].position.set(1.1, 1.5, .9); w.ot2.paws[0].position.set(1.1, 1.5, -.9); w.ot.head.rotation.z = .5; w.ot2.head.rotation.z = .5; w.or.rotation.y = -.15 + .05 * Math.sin(t); w.or2.rotation.y = .15 - .05 * Math.sin(t); } },
    { say: 'And their snacks? Cracked open on your car.', label: '*CLONK*', show: ['ground', 'or', 'car', 'shell', 'bits', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => Math.sin(t * 8) > .9 ? .12 : 0,
      cam: { pos: [2, 6, 16], look: [0, 3, 0], fov: 54, to: { pos: [2, 6, 15.2], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { otAt(w.ot, -1.5, 0, 0, 0, 1.6); bob(w.ot, t); w.car.position.set(-1.4, 3.75, .2); w.car.rotation.set(0, 0, Math.PI); w.car.scale.setScalar(.7); const hit = Math.max(0, Math.sin(t * 8)); w.ot.paws.forEach((pw, i) => pw.position.set(.6, 2.6 + hit * .8, (i ? 1 : -1) * .3)); w.or.updateWorldMatrix(true, true); const pw = w.ot.paws[0].getWorldPosition(new w.k.THREE.Vector3()); w.shell.position.set(pw.x, pw.y + .2, pw.z + .3); w.bits.children.forEach(b => { const i = b.userData.i, q = (t * 1.5 + i / 8) % 1; b.position.set(pw.x + Math.cos(i) * q * 1.5, pw.y + Math.sin(q * Math.PI) * 1.2, Math.sin(i) * q); }); stand(w, 4.4, 3.5, -.6); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); } },
    { say: 'Giant otters: cute, cuddly, or way too splashy? Comment below.',
      quiz: { q: 'Giant otters are…', options: ['Cute', 'Cuddly', 'Way too splashy'], answer: 'Made up. Real sea otters crack shellfish open on a rock held on their chest.' },
      show: ['ground', 'or'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 4, 8], look: [0, 1.8, 0], fov: 52, to: { pos: [12, 4, 1], look: [0, 1.8, 0] } },
      update: (w, p, t) => { w.car.scale.setScalar(1); w.car.rotation.set(0, 0, 0); otAt(w.ot, 0, 0, 0, -.6, 1.4); bob(w.ot, t); w.ot.paws.forEach((pw, i) => pw.position.set(1.3, 1.25, (i ? 1 : -1) * .4)); } },
  ],
};

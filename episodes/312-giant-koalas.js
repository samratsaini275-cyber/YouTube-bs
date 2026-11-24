// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized koala hugging a house.

function koala(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const fur = mat('#9A9AA0', { rough: .9 }), pale = mat('#E6E6E6'), dark = mat('#2A2A2E');
  const q = { root: group([0, 0, 0], parent) };
  const b = ball(1, fur, [0, 1.3, 0], q.root); b.scale.set(1, 1.15, .9);
  const belly = ball(.7, pale, [0, 1.2, .4], q.root); belly.scale.set(.9, 1.2, .6);
  q.head = group([0, 2.75, .1], q.root); ball(.75, fur, [0, 0, 0], q.head);
  q.ears = [-1, 1].map(s => { const e = group([s * .7, .35, 0], q.head); const o = ball(.42, fur, [0, 0, 0], e); o.scale.z = .5; const i = ball(.28, pale, [0, 0, .12], e); i.scale.z = .4; return e; });
  const nose = ball(.24, dark, [0, -.08, .7], q.head); nose.scale.set(.9, 1.3, .7);
  q.eyes = [-1, 1].map(s => { const e = group([s * .3, .15, .62], q.head); ball(.09, dark, [0, 0, 0], e); return e; });
  q.arms = [-1, 1].map(s => { const a = group([s * .8, 1.9, .2], q.root); const c = cyl(.24, .22, 1.1, fur, [0, -.5, 0], a, 10); ball(.25, fur, [0, -1.05, 0], a); a.userData.s = s; return a; });
  q.legs = [-1, 1].map(s => { const l = ball(.4, fur, [s * .55, .35, .3], q.root); l.scale.set(1, .8, 1.3); return l; });
  return q;
}
const blink = (q, t, sleepy = false) => q.eyes.forEach(e => e.scale.y = sleepy ? .15 : (Math.sin(t * 2.3) > .95 ? .1 : 1));
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
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-80 + i * 4, .03, 0], w.road);
  w.ko = koala(k, k.scene); w.kr = w.ko.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.trees = group(); for (let i = 0; i < 4; i++) { const tr = group([-6 + i * 4, 0, -2], w.trees); cyl(.3, .4, 4, mat('#C9B8A0'), [0, 2, 0], tr, 10); const c = group([0, 4.6, 0], tr); for (let j = 0; j < 5; j++) ball(.8, mat('#6E9E78'), [Math.cos(j * 1.3) * .9, (j % 2) * .5, Math.sin(j * 1.3) * .6], c); tr.userData.crown = c; tr.userData.i = i; }
  w.cars = group(); for (let i = 0; i < 3; i++) { const c = group([0, 0, 0], w.cars); box(2.4, .8, 1.2, mat(['#3B6FD6', '#FFC21F', '#5FBF5F'][i]), [0, .6, 0], c); box(1.2, .6, 1.1, mat('#9FD3EE'), [-.2, 1.2, 0], c); c.userData.i = i; }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zzz); const zm = mat('#FFFFFF', { glow: .6 }); box(.5, .08, .08, zm, [0, .25, 0], z); box(.5, .08, .08, zm, [0, -.25, 0], z); const d = box(.66, .08, .08, zm, [0, 0, 0], z); d.rotation.z = Math.PI / 4.2; z.userData.i = i; }
  w.car1 = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car1); w.carTop = box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car1);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); };
const koAt = (w, x, y, z, ry, s) => { w.kr.position.set(x, y, z); w.kr.rotation.set(0, ry, 0); w.kr.scale.setScalar(s); };
const snooze = (w, t, x, y, z) => w.zzz.children.forEach(zz => { const i = zz.userData.i, q = (t * .5 + i / 3) % 1; zz.position.set(x + q * 1.5, y + q * 2.5, z); zz.scale.setScalar(.6 + q); });

export default {
  id: '312',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT KOALAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF KOALAS', 'WERE GIANT?'],
  title: 'What would happen if koalas were giant?',
  description: 'Your house becomes its tree. Whole forests vanish for lunch. It naps on the highway. And your car? Now it is a pillow. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'koala', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant koalas are made up. Quiz fact: koalas sleep or rest for about 18 to 22 hours a day, partly because their eucalyptus diet gives them little energy (Australian Koala Foundation).'],
  setup,
  scenes: [
    { say: 'What if koalas were giant?', show: ['ground', 'kr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 8.3, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [0, 8.3, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -3); koAt(w, 0, 0, -5.4, 0, 2.6); w.ko.arms.forEach(a => a.rotation.set(-1.1, 0, a.userData.s * -.35)); blink(w.ko, t); w.ko.head.rotation.z = .08 * Math.sin(t * 1.5); stand(w, 3, 4, -.4); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.4; } },
    { say: 'Your house? Now it is a tree.', show: ['ground', 'kr', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: () => .05,
      cam: { pos: [6, 6, 17], look: [0, 5.4, 0], fov: 54, to: { pos: [5.6, 6, 16], look: [0, 5.4, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(0, 0, 0); koAt(w, -.4, 2.2 + .2 * Math.sin(t * 2), -.6, .6, 1.8); w.kr.rotation.z = -.25; w.ko.arms.forEach(a => a.rotation.set(-1.4, 0, a.userData.s * -.5)); blink(w.ko, t, true); w.ko.head.rotation.set(.2, 0, .3); } },
    { say: 'Lunch? A whole forest.', label: 'MUNCH', show: ['ground', 'kr', 'trees'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 5, 0], fov: 56, to: { pos: [2, 5, 17], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.kr.rotation.z = 0; koAt(w, 0, 0, -4, 0, 2.4); blink(w.ko, t); w.ko.head.rotation.set(0, 0, .08 * Math.sin(t * 14)); w.ko.arms[0].rotation.set(-1.2, 0, .3); w.ko.arms[1].rotation.set(-.4 - .8 * Math.abs(Math.sin(t * 4)), 0, -.4); w.trees.children.forEach(tr => { tr.userData.crown.visible = p < .2 + tr.userData.i * .2; }); } },
    { say: 'Nap time? On the highway.', label: 'HONK', show: ['ground', 'road', 'kr', 'cars', 'zzz'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 9, 15], look: [0, 1.2, 0], fov: 54, to: { pos: [2.8, 9, 14], look: [0, 1.2, 0], fov: 52 } },
      update: (w, p, t) => { koAt(w, 1.5, 1.3, 2.4, 0, 1.6); w.kr.rotation.set(-Math.PI / 2, 0, 0); blink(w.ko, t, true); w.ko.arms.forEach(a => a.rotation.set(0, 0, 0)); w.ko.head.rotation.set(0, 0, 0); w.kr.scale.z = 1.6 + .06 * Math.sin(t * 2); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-3 - i * 3, 0, 0); }); snooze(w, t, 1.5, 3.4, -1.6); } },
    { say: 'And your car? Now it is a pillow.', show: ['ground', 'kr', 'car1', 'pp', 'zzz'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 8, 15], look: [0, 1.6, -.6], fov: 54, to: { pos: [3.6, 8, 14], look: [0, 1.6, -.6], fov: 52 } },
      update: (w, p, t) => { w.car1.position.set(1.3, 0, -3.3); w.car1.rotation.y = .5; w.car1.scale.set(1, .7, 1); koAt(w, 0, 1.3, 1.4, 0, 1.6); w.kr.rotation.set(-Math.PI / 2 + .25, 0, 0); blink(w.ko, t, true); w.kr.scale.z = 1.6 + .06 * Math.sin(t * 2); snooze(w, t, 0, 3.6, -2.6); stand(w, 4, 3, -.7); pose(w.p, .3); w.p.mouth.scale.set(1.2, 2, 1); w.p.head.rotation.y = -.3; } },
    { say: 'Giant koalas: cute, cuddly, or way too sleepy? Comment below.',
      quiz: { q: 'Giant koalas are…', options: ['Cute', 'Cuddly', 'Way too sleepy'], answer: 'Made up. Real koalas sleep or rest about 18 to 22 hours a day.' },
      show: ['ground', 'kr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [4, 2.6, 11], look: [0, 3, 0], fov: 52, to: { pos: [-4, 2.6, 11], look: [0, 3, 0] } },
      update: (w, p, t) => { koAt(w, 0, 0, 0, 0, 1.4); w.kr.rotation.set(0, 0, 0); w.kr.scale.z = 1.4; w.ko.arms.forEach(a => a.rotation.set(-.3, 0, a.userData.s * .2)); blink(w.ko, t); w.ko.head.rotation.set(0, 0, .1 * Math.sin(t * 2)); } },
  ],
};

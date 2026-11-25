// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a camel towering over a house.

function camel(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const tan = mat('#D8A868', { rough: .85 }), dark = mat('#8A6038');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, tan, [0, 2.8, 0], g.body); b.scale.set(1.6, .8, .8); const hump = ball(.75, tan, [-.1, 3.6, 0], g.body); hump.scale.set(1, .9, .8);
  g.neck = group([1.4, 3, 0], g.body); const nk = cyl(.28, .35, 1.8, tan, [.4, .8, 0], g.neck, 10); nk.rotation.z = -.5;
  g.head = group([2.3, 4.4, 0], g.body); const hd = ball(.4, tan, [0, 0, 0], g.head); hd.scale.set(1.6, .8, .7);
  for (const z of [-1, 1]) { ball(.07, mat('#111111'), [.15, .15, z * .25], g.head); ball(.1, tan, [-.25, .3, z * .2], g.head); ball(.04, dark, [.6, 0, z * .1], g.head); }
  g.lips = ball(.18, dark, [.6, -.18, 0], g.head); g.lips.scale.set(1, .5, 1);
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * .9, 2.3, z * .35], g.body); cyl(.12, .1, 2.3, tan, [0, -1.15, 0], l, 8); const f = ball(.2, dark, [0, -2.3, 0], l); f.scale.set(1.3, .4, 1.2); g.legs.push(l); }
  return g;
}
const walk = (g, t, a = .3) => g.legs.forEach((l, i) => l.rotation.z = a * Math.sin(t * 5 + (i === 0 || i === 1 ? 0 : Math.PI)));
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
  w.ground = k.ground('#E8D2A0', 0);
  w.cm = camel(k, k.scene); w.cr = w.cm.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.lake = cyl(5, 5, .15, mat('#3E8FCF', { glow: .1 }), [0, .08, 0], undefined, 32);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); w.carTop = box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.sand = group(); for (let i = 0; i < 20; i++) { const s = ball(.3, mat('#E8C890'), [0, 0, 0], w.sand); s.userData.i = i; s.castShadow = false; s.material.transparent = true; s.material.opacity = .8; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const cmAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cm.neck.rotation.set(0, 0, 0); w.cm.head.rotation.set(0, 0, 0); w.cm.head.position.set(2.3, 4.4, 0); w.cm.legs.forEach(l => l.rotation.z = 0); };

export default {
  id: '351',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT CAMELS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CAMELS', 'WERE GIANT?'],
  title: 'What would happen if camels were giant?',
  description: 'One drink empties the whole lake. Your car becomes a footstool. And one sneeze? A sandstorm. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'camel', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant camels are made up. Quiz fact: a camel\'s hump stores fat, not water; the fat can be used for energy when food is scarce (Encyclopaedia Britannica, "camel").'],
  setup,
  scenes: [
    { say: 'What if camels were giant?', show: ['ground', 'cr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 10.4, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 10.4, 0], fov: 54 } },
      update: (w, p, t) => { cmAt(w, -3.6, 0, -5, -.7, 2.2); w.cm.head.rotation.z = .08 * Math.sin(t * 2); w.house.position.set(3.4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'One drink? The whole lake is gone.', label: 'SLURP', show: ['ground', 'cr', 'lake'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 22], look: [0, 4, 0], fov: 56, to: { pos: [3, 7, 21], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { cmAt(w, -4.5, 0, 0, 0, 1.6); w.cm.neck.rotation.z = -1.3; w.cm.head.position.set(3.15, 2.63, 0); w.cm.head.rotation.z = -.9; w.lake.position.set(2.2, .08, 0); const q = Math.min(1, p * 1.2); w.lake.scale.set(1 - q * .9, 1, 1 - q * .9); } },
    { say: 'Your car? A footstool.', label: 'CRUNCH', show: ['ground', 'cr', 'car', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3.6, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3.6, 0], fov: 54 } },
      update: (w, p, t) => { w.lake.scale.set(1, 1, 1); cmAt(w, -2, 0, 0, 0, 1.4); w.car.position.set(1.2, 0, .5); const step = p > .4; w.cm.legs[2].rotation.z = step ? -.5 : 0; w.car.scale.set(1, step ? .6 : 1, 1); w.carTop.scale.y = step ? .3 : 1; stand(w, 3.3, 3, -.6); pose(w.p, step ? 2.4 : .3); w.p.mouth.scale.set(1.2, step ? 3 : 1, 1); } },
    { say: 'And one sneeze? A sandstorm.', label: '*ACHOO*', show: ['ground', 'cr', 'sand', 'house'], sky: '#D8C090', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .9 && t < 1.4 ? .25 : 0,
      cam: { pos: [2, 6, 24], look: [0, 6, 0], fov: 56, to: { pos: [2, 6, 23], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { w.car.scale.set(1, 1, 1); w.carTop.scale.y = 1; cmAt(w, -4, 0, -1, 0, 1.8); const hit = t > .9; w.cm.head.rotation.z = hit ? -.3 : .25 * Math.min(1, t); w.house.position.set(5, 0, -2); w.house.rotation.z = hit ? .04 * Math.sin(t * 20) : 0; w.cr.updateWorldMatrix(true, true); const h = w.cm.lips.getWorldPosition(new w.k.THREE.Vector3()); w.sand.children.forEach(s => { const i = s.userData.i, q = ((t - .9) * .8 + i / 20) % 1; s.position.set(h.x + q * 12, h.y - q * 3 + Math.sin(i) * q * 2, h.z + Math.cos(i * 2) * q * 3); s.scale.setScalar(1 + q * 3); s.visible = hit; }); } },
    { say: 'Giant camels: cool, cute, or way too sandy? Comment below.',
      quiz: { q: 'Giant camels are…', options: ['Cool', 'Cute', 'Way too sandy'], answer: 'Made up. A real camel\'s hump stores fat, not water.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [12, 5, 10], look: [0, 4.6, 0], fov: 54, to: { pos: [14, 5, 2], look: [0, 4.6, 0] } },
      update: (w, p, t) => { w.house.rotation.z = 0; cmAt(w, 0, 0, 0, -.7, 1.3); w.cm.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};

// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized frog next to a house.

function frog(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const skin = mat('#4FB548', { rough: .5 }), belly = mat('#D8F0A8');
  const f = { root: group([0, 0, 0], parent) };
  f.body = group([0, 0, 0], f.root);
  const b = ball(1.2, skin, [0, 1, 0], f.body); b.scale.set(1.2, .8, 1.1);
  const bl = ball(1, belly, [.45, .85, 0], f.body); bl.scale.set(.9, .6, 1);
  f.throat = ball(.55, mat('#F0F5C8'), [1.05, .75, 0], f.body); f.throat.scale.set(.6, .5, .9);
  for (const z of [-1, 1]) { const e = ball(.38, skin, [.65, 1.75, z * .55], f.body); ball(.26, mat('#FFFFFF'), [.85, 1.85, z * .58], f.body); ball(.14, mat('#111111'), [1.05, 1.88, z * .58], f.body); }
  const m = box(.05, .05, 1.3, mat('#2E6E2A'), [1.32, 1.05, 0], f.body); m.rotation.y = 0;
  f.tongue = group([1.3, 1.05, 0], f.body); const tg = cyl(.12, .12, 1, mat('#E86A8A'), [0, .5, 0], f.tongue, 8); f.tip = ball(.25, mat('#E86A8A'), [0, 1, 0], f.tongue); f.tongue.rotation.z = -Math.PI / 2;
  f.legs = [-1, 1].map(z => { const l = ball(.55, skin, [-.6, .45, z * 1.05], f.root); l.scale.set(1.5, .7, .7); return l; });
  for (const z of [-1, 1]) { const ft = ball(.3, skin, [.9, .12, z * .7], f.root); ft.scale.set(1.3, .3, 1); }
  return f;
}
const zap = (f, len) => { f.tongue.scale.set(1, Math.max(.01, len), 1); f.tongue.visible = len > .05; f.tip.scale.set(1, 1 / Math.max(.01, len), 1); };
const croak = (f, t, a = 1) => { const s = 1 + a * .8 * Math.max(0, Math.sin(t * 9)); f.throat.scale.set(.6 * s, .5 * s, .9 * s); };
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
  w.fg = frog(k, k.scene); w.fr = w.fg.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house); w.win = box(.9, .9, .1, mat('#FFE9A8', { glow: .9 }), [1.2, 2.3, 1.72], w.house);
  w.pool = group(); box(7, .3, 4.5, mat('#FFFFFF'), [0, .15, 0], w.pool); w.water = box(6.6, .1, 4.1, mat('#4FB3E8', { glow: .15 }), [0, .32, 0], w.pool);
  w.splash = group(); for (let i = 0; i < 14; i++) { const d = ball(.25, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); d.userData.i = i; d.castShadow = false; }
  w.drone = group(); box(.8, .2, .8, mat('#333333'), [0, 0, 0], w.drone); for (const x of [-.6, .6]) for (const z of [-.6, .6]) { const r = cyl(.35, .35, .03, mat('#AAAAAA'), [x, .15, z], w.drone, 12); r.userData.r = 1; }
  w.moon = ball(1.2, mat('#FFF3C4', { glow: .9 }), [-6, 14, -10]);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const fgAt = (w, x, y, z, ry, s) => { w.fr.position.set(x, y, z); w.fr.rotation.set(0, ry, 0); w.fr.scale.setScalar(s); w.fg.body.rotation.set(0, 0, 0); zap(w.fg, 0); };

export default {
  id: '320',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT FROGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FROGS', 'WERE GIANT?'],
  title: 'What would happen if frogs were giant?',
  description: 'Your pool becomes their pond. Delivery drones? Lunch. And at night? Ribbit, ribbit, all night long. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'frog', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant frogs are made up. Quiz fact: most frogs do not drink with their mouths; they soak up water through their skin (Encyclopaedia Britannica, "amphibian").'],
  setup,
  scenes: [
    { say: 'What if frogs were giant?', show: ['ground', 'fr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { fgAt(w, -3.2, 0, -5, -.9, 2.6); croak(w.fg, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your pool? Their pond.', label: '*SPLASH*', show: ['ground', 'fr', 'pool', 'splash', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .8 && t < 1.2 ? .2 : 0,
      cam: { pos: [2, 7, 18], look: [0, 3, 0], fov: 54, to: { pos: [2, 7, 17], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, t / .8); fgAt(w, -7 + q * 7, Math.sin(q * Math.PI) * 6, 0, -.3, 1.6); w.fg.legs.forEach(l => l.scale.set(1.5 + (q < 1 ? 1 : 0), .7, .7)); const hit = q >= 1; w.splash.children.forEach(d => { const i = d.userData.i, a = i / 14 * Math.PI * 2, r = hit ? (t - .8) * 6 : 0; d.position.set(Math.cos(a) * r, .4 + Math.sin(Math.min(1, r / 4) * Math.PI) * 3, Math.sin(a) * r * .6); d.visible = hit && r < 5; }); stand(w, 4.6, 4.5, -.6); pose(w.p, hit ? 2.4 : .3); w.p.mouth.scale.set(1.2, hit ? 3 : 1, 1); } },
    { say: 'Delivery drones? Lunch.', label: 'GULP', show: ['ground', 'fr', 'drone', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 5, 18], look: [1.6, 5, 0], fov: 54, to: { pos: [3.8, 5, 17], look: [1.6, 5, 0], fov: 52 } },
      update: (w, p, t) => { w.fg.legs.forEach(l => l.scale.set(1.5, .7, .7)); fgAt(w, -1.4, 0, 0, 0, 2); w.house.position.set(5, 0, -4); w.fg.body.rotation.z = .55; const V = w.k.THREE.Vector3; zap(w.fg, 2.2); w.fr.updateWorldMatrix(true, true); const tgt = w.fg.tip.getWorldPosition(new V()); const shot = Math.max(0, Math.min(1, (p - .45) * 6)), back = Math.max(0, Math.min(1, (p - .62) * 5)); const len = shot * (1 - back) * 2.2; zap(w.fg, len); w.fr.updateWorldMatrix(true, true); const tip = w.fg.tip.getWorldPosition(new V()); if (back > 0) w.drone.position.copy(tip); else w.drone.position.set(tgt.x + (1 - Math.min(1, p / .45)) * 2, tgt.y + .2 * Math.sin(t * 6), tgt.z); w.drone.rotation.y = t * 2; w.drone.visible = back < .95; croak(w.fg, t, back >= .95 ? 1 : 0); } },
    { say: 'And at night? Ribbit, ribbit, ribbit.', label: 'RIBBIT!', show: ['ground', 'fr', 'house', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => Math.sin(t * 9) > .8 ? .12 : 0,
      cam: { pos: [3, 5, 22], look: [0, 5, 0], fov: 56, to: { pos: [3, 5, 21], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.drone.visible = false; fgAt(w, -3, 0, -2, -.6, 2.6); croak(w.fg, t, 1.4); w.house.position.set(4, 0, 1); w.house.rotation.z = .03 * Math.sin(t * 18); w.win.material.emissiveIntensity = 1; } },
    { say: 'Giant frogs: cute, cool, or way too loud? Comment below.',
      quiz: { q: 'Giant frogs are…', options: ['Cute', 'Cool', 'Way too loud'], answer: 'Made up. Real frogs soak up water through their skin instead of drinking.' },
      show: ['ground', 'fr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3, 0] } },
      update: (w, p, t) => { w.house.rotation.z = 0; fgAt(w, 0, 0, 0, -1, 1.6); croak(w.fg, t, .6); } },
  ],
};

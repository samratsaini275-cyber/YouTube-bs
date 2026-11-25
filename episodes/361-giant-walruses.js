// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a walrus bigger than a house, facing the camera.

function walrus(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const brn = mat('#A8785A', { rough: .8 }), dk = mat('#7A5440'), ivory = mat('#F5EEDC');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.4, brn, [-.6, 1.3, 0], g.body); b.scale.set(1.6, .9, 1);
  g.head = group([1.2, 2.2, 0], g.body); const hd = ball(.85, brn, [0, 0, 0], g.head);
  for (const z of [-1, 1]) { ball(.09, mat('#111111'), [.45, .4, z * .38], g.head); const m = ball(.38, mat('#C9A080'), [.62, -.2, z * .26], g.head); m.scale.set(.8, .8, 1); const tk = cone(.09, 1.2, ivory, [.75, -.9, z * .22], g.head, 8); tk.rotation.x = Math.PI; }
  g.whisk = group([.85, -.2, 0], g.head); for (let i = 0; i < 8; i++) { const wsk = cyl(.012, .012, .5, mat('#EEE4D0'), [.2, -.05 + (i % 4) * .05, (i < 4 ? -1 : 1) * (.15 + (i % 4) * .08)], g.whisk, 4); wsk.rotation.z = Math.PI / 2; wsk.rotation.y = (i < 4 ? 1 : -1) * .5; }
  g.flips = []; for (const z of [-1, 1]) { const f = group([.4, .5, z * 1.1], g.body); const fl = ball(.5, dk, [.2, 0, z * .2], f); fl.scale.set(1.2, .25, .8); g.flips.push(f); }
  const tl = ball(.5, dk, [-2.8, .4, 0], g.body); tl.scale.set(.8, .25, 1.5);
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
  w.sea = box(60, .1, 30, mat('#3E8FCF', { glow: .1 }), [0, .05, -22]);
  w.wl = walrus(k, k.scene); w.wr = w.wl.root;
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.splash = group(); for (let i = 0; i < 20; i++) { const s = ball(.35, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.boat = group(); const hull = box(4, .9, 1.8, mat('#FFFFFF'), [0, .45, 0], w.boat); box(4.1, .2, 1.85, mat('#E2453C'), [0, .2, 0], w.boat); cyl(.06, .06, 3, mat('#8B5A2B'), [0, 2, 0], w.boat, 6); const sail = cone(1.2, 2.4, mat('#FFFFFF'), [.5, 2.1, 0], w.boat, 3); sail.scale.z = .05;
  w.water = box(30, .1, 20, mat('#3E8FCF', { glow: .1 }), [0, .05, 0]);
  w.leaves = group(); for (let i = 0; i < 14; i++) { const l = ball(.25, mat(i % 2 ? '#C9842E' : '#8A5A2E'), [0, 0, 0], w.leaves); l.scale.y = .3; l.userData.i = i; }
  w.road = box(40, .05, 6, mat('#555B66'), [0, .03, 2]);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const wlAt = (w, x, y, z, ry, s) => { w.wr.position.set(x, y, z); w.wr.rotation.set(0, ry, 0); w.wr.scale.setScalar(s); w.wl.body.rotation.set(0, 0, 0); w.wl.head.rotation.set(0, 0, 0); w.wl.whisk.rotation.set(0, 0, 0); w.wl.flips.forEach(f => f.rotation.set(0, 0, 0)); };

export default {
  id: '361',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT WALRUSES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WALRUSES', 'WERE GIANT?'],
  title: 'What would happen if walruses were giant?',
  description: 'One belly flop soaks the whole beach. It climbs onto your boat. And its moustache? A street sweeper. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'walrus', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant walruses are made up. Quiz fact: walruses use their long tusks to haul themselves out of the water onto the ice (Encyclopaedia Britannica, "walrus").'],
  setup,
  scenes: [
    { say: 'What if walruses were giant?', show: ['ground', 'sea', 'wr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 4.9, 0], fov: 56, to: { pos: [1, 4, 20.5], look: [0, 4.9, 0], fov: 54 } },
      update: (w, p, t) => { wlAt(w, -2.6, 0, -4, -1.1, 2.2); w.wl.head.rotation.z = .08 * Math.sin(t * 3); w.wl.flips[1].rotation.x = -.4 * Math.abs(Math.sin(t * 5)); w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'One belly flop? The whole beach is soaked.', label: 'SPLOOSH!', show: ['ground', 'sea', 'wr', 'splash', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.4 ? .3 : 0,
      cam: { pos: [3, 7, 22], look: [0, 3.4, -4], fov: 56, to: { pos: [3, 7, 21], look: [0, 3.4, -4], fov: 54 } },
      update: (w, p, t) => { const q = Math.min(1, t); wlAt(w, -4 + q * 3, Math.sin(q * Math.PI) * 5, -8, 0, 1.4); w.wl.body.rotation.z = -q * .5; w.splash.children.forEach(s => { const i = s.userData.i, d = Math.max(0, t - 1), a = i / 20 * Math.PI * 2; s.position.set(-1 + Math.cos(a) * d * 8, .3 + d * 7 - d * d * 6 + (i % 3) * .4, -8 + Math.sin(a) * d * 6 + d * 6); s.visible = t > 1 && s.position.y > 0; }); stand(w, 5.2, 4.5, -.5); pose(w.p, t > 1.4 ? 2.4 : .4); w.p.mouth.scale.set(1.2, t > 1.4 ? 3 : 1, 1); } },
    { say: 'Your boat? It climbs on board.', label: 'GLUG GLUG', show: ['water', 'wr', 'boat'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 20], look: [0, 2.6, 0], fov: 56, to: { pos: [3, 6, 19], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { w.boat.position.set(1, 0, 0); const up = Math.min(1, Math.max(0, (p - .2) * 2)); w.boat.position.y = .2 - up * 1.6; w.boat.rotation.z = -up * .25 + .03 * Math.sin(t * 3); wlAt(w, 1.2 - (1 - up) * 3.5, -1.2 + up * 1.4, 0, 0, 1.1); w.wl.head.rotation.z = -.2 + up * .2; w.wl.flips.forEach(f => f.rotation.z = .5 * Math.sin(t * 6)); } },
    { say: 'And its moustache? A street sweeper.', label: 'SWISH SWISH', show: ['ground', 'road', 'wr', 'leaves', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { wlAt(w, -4 + p * 3, 0, 1, 0, 1.2); w.wl.head.rotation.z = -.35; w.wl.head.rotation.y = .3 * Math.sin(t * 6); w.wl.whisk.scale.set(4, 4, 4); w.leaves.children.forEach(l => { const i = l.userData.i, fx = -1 + (i % 7) * 1.1, sweep = -4 + p * 3 + 3.4; const pushed = fx < sweep; l.position.set(pushed ? sweep + (i % 3) * .2 : fx, .1 + (pushed ? (i % 4) * .2 : 0), 1.6 + (i % 2 ? .5 : -.5)); }); stand(w, 4.8, 2.6, -.6); pose(w.p, 1.6); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Giant walruses: cool, cute, or way too splashy? Comment below.',
      quiz: { q: 'Giant walruses are…', options: ['Cool', 'Cute', 'Way too splashy'], answer: 'Made up. Real walruses use their tusks to climb onto ice.' },
      show: ['ground', 'wr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [7, 3.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [8.5, 3.5, 2], look: [0, 2, 0] } },
      update: (w, p, t) => { wlAt(w, 0, 0, 0, -.6, 1); w.wl.whisk.scale.set(1, 1, 1); w.wl.head.rotation.z = .08 * Math.sin(t * 3); } },
  ],
};

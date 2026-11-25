// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized cow next to a house.

function cow(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const white = mat('#F7F4EC', { rough: .8 }), black = mat('#1E1E22', { rough: .8 }), pink = mat('#F2A8B8');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, white, [0, 2.1, 0], g.body); b.scale.set(1.7, .95, .9);
  for (const [x, y, z, r] of [[-.6, 2.5, .6, .45], [.5, 1.9, .7, .35], [-1, 1.8, -.7, .4], [.3, 2.6, -.75, .4]]) { const s = ball(r, black, [x, y, z], g.body); s.scale.set(1.2, .9, .4); }
  g.head = group([1.9, 2.6, 0], g.body); const hd = ball(.55, white, [0, 0, 0], g.head); hd.scale.set(1.2, 1, .9); const mz = ball(.4, pink, [.55, -.2, 0], g.head); mz.scale.set(.8, .7, 1);
  for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.35, .2, z * .35], g.head); const h = cone(.07, .35, mat('#E8DCC8'), [-.1, .55, z * .3], g.head, 6); h.rotation.x = z * .4; const ear = ball(.15, white, [-.2, .25, z * .55], g.head); ear.scale.set(1.2, .4, .8); ball(.04, mat('#5A2A2A'), [.9, -.15, z * .12], g.head); }
  g.mouth = box(.2, .03, .25, mat('#5A2A2A'), [.75, -.4, 0], g.head);
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * 1.1, 1.5, z * .45], g.body); cyl(.15, .13, 1.3, white, [0, -.65, 0], l, 8); cyl(.15, .15, .2, black, [0, -1.35, 0], l, 8); g.legs.push(l); }
  const ud = ball(.3, pink, [-.3, 1.2, 0], g.body); ud.scale.set(1.2, .7, 1);
  return g;
}
const walk = (g, t, a = .3) => g.legs.forEach((l, i) => l.rotation.z = a * Math.sin(t * 6 + (i === 0 || i === 3 ? 0 : Math.PI)));
const moo = (g, t, a = 1) => { g.mouth.scale.set(1, 1 + a * 5 * Math.max(0, Math.sin(t * 6)), 1); g.head.rotation.z = a * .3; };
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
  w.cw = cow(k, k.scene); w.cr = w.cw.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.glass = group(); cyl(1.6, 1.4, 3.2, mat('#DDEEFF', { glow: .1 }), [0, 1.6, 0], w.glass, 24); w.milk = cyl(1.5, 1.35, .1, mat('#FFFFFF'), [0, .1, 0], w.glass, 24); w.glass.children[0].material.transparent = true; w.glass.children[0].material.opacity = .35;
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8, .1, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  w.town = group(); for (let i = 0; i < 4; i++) { const h = group([-9 + i * 6, 0, -6 - (i % 2) * 2], w.town); box(3, 2.6, 2.6, mat('#F2D9B8'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#B3262E'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.fence = box(.2, 1.4, 12, mat('#E8D2A8'), [0, .7, 0]);
  w.lawn = group(); w.tufts = []; for (let i = 0; i < 24; i++) { const g = cone(.25, .9, mat('#3E8E33'), [-6 + (i % 12) * 1.1, .45, -1 + Math.floor(i / 12) * 2], w.lawn, 5); w.tufts.push(g); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const cwAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cw.body.rotation.set(0, 0, 0); w.cw.head.rotation.set(0, 0, 0); w.cw.mouth.scale.set(1, 1, 1); w.cw.legs.forEach(l => l.rotation.z = 0); };

export default {
  id: '345',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT COWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF COWS', 'WERE GIANT?'],
  title: 'What would happen if cows were giant?',
  description: 'One glass of milk? The size of a swimming pool. One moo shakes the town. And lunch? Your lawn and the neighbours\' too. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cow', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant cows are made up. Quiz fact: a cow\'s stomach has four compartments (rumen, reticulum, omasum and abomasum), and cows bring food back up to chew it again as cud (Encyclopaedia Britannica, "ruminant").'],
  setup,
  scenes: [
    { say: 'What if cows were giant?', show: ['ground', 'cr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 8.4, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 8.4, 0], fov: 54 } },
      update: (w, p, t) => { cwAt(w, -3.6, 0, -5, -.7, 2.6); w.cw.head.rotation.z = .08 * Math.sin(t * 2); w.house.position.set(3.6, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'One glass of milk? It fills a pool.', label: 'GLUG GLUG', show: ['ground', 'cr', 'glass', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 4, 0], fov: 54, to: { pos: [2, 5, 17.2], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { cwAt(w, -4.5, 0, -2, 0, 1.8); w.glass.position.set(3, 0, 0); const q = Math.min(1, p * 1.3); w.milk.position.y = .1 + q * 2.9; w.milk.scale.setScalar(1 + q * .1); stand(w, 4.6, 3.2, -.5); pose(w.p, q > .7 ? 2.4 : .3); w.p.mouth.scale.set(1.2, q > .7 ? 3 : 1, 1); } },
    { say: 'One moo? It shakes the whole town.', label: 'MOOOO!', show: ['ground', 'cr', 'waves', 'town'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .18 : 0,
      cam: { pos: [0, 6, 24], look: [0, 5, 0], fov: 56, to: { pos: [0, 6, 23], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { cwAt(w, 0, 0, 0, -1.2, 2.2); const on = t > .5; moo(w.cw, t, on ? 1 : 0); w.cr.updateWorldMatrix(true, true); const h = w.cw.head.getWorldPosition(new w.k.THREE.Vector3()); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 4) % 1; r.position.copy(h); r.rotation.set(0, 0, 0); r.scale.setScalar(.6 + q * 6); r.material.opacity = 1 - q; r.visible = on; }); w.town.children.forEach((hs, i) => hs.rotation.z = on ? .05 * Math.sin(t * 25 + i) : 0); } },
    { say: 'And lunch? Your lawn, and your neighbour\'s too.', label: 'MUNCH', show: ['ground', 'cr', 'lawn', 'fence', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 8, 18], look: [0, 2.8, 0], fov: 56, to: { pos: [2, 8, 17], look: [0, 2.8, 0], fov: 54 } },
      update: (w, p, t) => { w.town.children.forEach(hs => hs.rotation.z = 0); const x = -8 + p * 11; cwAt(w, x, 0, 0, 0, 1.4); walk(w.cw, t, .2); w.cw.head.rotation.z = -.7 + .1 * Math.sin(t * 10); w.tufts.forEach(g => g.visible = g.position.x > x + 2.6); stand(w, 5, 3.6, -.6); pose(w.p, p > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, p > .5 ? 3 : 1, 1); } },
    { say: 'Giant cows: cute, cool, or way too loud? Comment below.',
      quiz: { q: 'Giant cows are…', options: ['Cute', 'Cool', 'Way too loud'], answer: 'Made up. A real cow\'s stomach has four parts.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [12, 4, 10], look: [0, 3.4, 0], fov: 52, to: { pos: [14, 4, 2], look: [0, 3.4, 0] } },
      update: (w, p, t) => { cwAt(w, 0, 0, 0, -.7, 1.3); w.cw.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};

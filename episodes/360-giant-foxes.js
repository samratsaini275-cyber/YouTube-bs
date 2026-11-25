// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a fox taller than a house, facing the camera.

function fox(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#E8742A', { rough: .8 }), wht = mat('#FFF6EA'), blk = mat('#2A1E18');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, org, [0, 1.9, 0], g.body); b.scale.set(1.5, .75, .7);
  g.head = group([1.6, 2.6, 0], g.body); const hd = ball(.6, org, [0, 0, 0], g.head); hd.scale.set(1, .9, .95);
  const sn = cone(.32, .8, org, [.65, -.12, 0], g.head, 12); sn.rotation.z = -Math.PI / 2; const ch = cone(.26, .7, wht, [.55, -.25, 0], g.head, 12); ch.rotation.z = -Math.PI / 2;
  ball(.1, blk, [1.05, -.12, 0], g.head);
  for (const z of [-1, 1]) { ball(.09, blk, [.35, .2, z * .3], g.head); const e = cone(.22, .55, org, [-.05, .62, z * .3], g.head, 8); cone(.13, .35, blk, [-.03, .78, z * .3], g.head, 8); }
  g.mouth = ball(.08, blk, [.75, -.35, 0], g.head); g.mouth.scale.set(1.6, .5, 2); g.mouth.visible = false;
  g.tail = group([-1.4, 2.1, 0], g.body); const tl = ball(.5, org, [-.8, .1, 0], g.tail); tl.scale.set(1.9, .7, .7); const tip = ball(.32, wht, [-1.65, .15, 0], g.tail); tip.scale.set(1.2, .9, .9);
  g.legs = []; for (const x of [-.9, .9]) for (const z of [-1, 1]) { const l = group([x, 1.5, z * .35], g.body); cyl(.13, .11, 1.4, org, [0, -.7, 0], l, 8); cyl(.13, .13, .35, blk, [0, -1.3, 0], l, 8); g.legs.push(l); }
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
  w.fx = fox(k, k.scene); w.fr = w.fx.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.win = []; for (const x of [-1.2, 1.2]) w.win.push(box(.9, .9, .08, mat('#FFE9A0', { glow: .8 }), [x, 2.3, 1.72], w.house));
  w.crater = cyl(3, 3.4, .2, mat('#6B4A2E'), [0, .05, 0], undefined, 24);
  w.dirt = group(); for (let i = 0; i < 16; i++) { const d = ball(.3, mat('#6B4A2E'), [0, 0, 0], w.dirt); d.userData.i = i; }
  w.shoes = group(); const cols = ['#E2453C', '#3E6FD6', '#F2C94C', '#FFFFFF', '#222222', '#3FA34D']; for (let i = 0; i < 14; i++) { const s = group([Math.cos(i * 2.2) * 1.4 * (i / 14 + .3), .25 + Math.floor(i / 5) * .45, Math.sin(i * 2.2) * 1.2 * (i / 14 + .3)], w.shoes); const sh = ball(.4, mat(cols[i % 6]), [0, 0, 0], s); sh.scale.set(1.6, .6, .7); s.rotation.y = i * 1.3; }
  w.moon = ball(1.2, mat('#F4F1D8', { glow: 1 }), [0, 0, 0]);
  w.waves = group(); for (let i = 0; i < 3; i++) { const r = k.torus(1, .07, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.waves); r.rotation.set(0, 0, 0); r.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const fxAt = (w, x, y, z, ry, s) => { w.fr.position.set(x, y, z); w.fr.rotation.set(0, ry, 0); w.fr.scale.setScalar(s); w.fx.body.rotation.set(0, 0, 0); w.fx.head.rotation.set(0, 0, 0); w.fx.mouth.visible = false; w.fx.tail.rotation.set(0, 0, 0); w.fx.legs.forEach(l => l.rotation.set(0, 0, 0)); };

export default {
  id: '360',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT FOXES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FOXES', 'WERE GIANT?'],
  title: 'What would happen if foxes were giant?',
  description: 'It dives head first into your garden. It steals every shoe in town. And at night? It screams. Very loudly. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'fox', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant foxes are made up. Quiz fact: red foxes hunt mice under snow by listening for them, then leaping high and diving head first into the snow (Encyclopaedia Britannica, "red fox"). Red foxes are also known for loud screaming calls, especially in the breeding season.'],
  setup,
  scenes: [
    { say: 'What if foxes were giant?', show: ['ground', 'fr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 7.4, 0], fov: 56, to: { pos: [1, 4, 20.5], look: [0, 7.4, 0], fov: 54 } },
      update: (w, p, t) => { fxAt(w, -3, 0, -4, -1.1, 2.3); w.fx.head.rotation.z = .08 * Math.sin(t * 3); w.fx.tail.rotation.y = .3 * Math.sin(t * 4); w.house.position.set(4.6, 0, -3); w.win.forEach(g => g.visible = false); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'It dives head first into your garden.', label: 'BOOF!', show: ['ground', 'fr', 'crater', 'dirt'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1.1 && t < 1.5 ? .3 : 0,
      cam: { pos: [2, 6, 22], look: [0, 4, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { const q = Math.min(1, t / 1.1); fxAt(w, -4 + q * 4, Math.sin(q * Math.PI) * 6 + (t > 1.1 ? -1.6 : 0), 0, 0, 1.5); w.fx.body.rotation.z = t > 1.1 ? -1.3 : -q * 1.2; w.fx.legs.forEach(l => l.rotation.z = .6); w.crater.visible = t > 1.1; w.crater.position.set(1.5, .05, 0); w.dirt.children.forEach(d => { const i = d.userData.i, s = Math.max(0, t - 1.1), a = i / 16 * Math.PI * 2; d.position.set(1.5 + Math.cos(a) * s * 5, .3 + s * 6 - s * s * 8 + (i % 3) * .3, Math.sin(a) * s * 3); d.visible = t > 1.1 && d.position.y > 0; }); } },
    { say: 'It steals every shoe in town.', label: 'MINE!', show: ['ground', 'fr', 'shoes', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 3.2, 0], fov: 56, to: { pos: [3, 5, 17], look: [0, 3.2, 0], fov: 54 } },
      update: (w, p, t) => { w.crater.visible = false; fxAt(w, -2.6, 0, -1.5, .3, 1.3); w.fx.body.rotation.z = 0; w.fx.tail.rotation.y = .4 * Math.sin(t * 6); w.shoes.position.set(-1.6, 0, 1.8); w.shoes.scale.setScalar(Math.min(1.7, .4 + p * 2)); stand(w, 3.2, 3.6, -.6); pose(w.p, p > .5 ? 2.4 : .6); w.p.mouth.scale.set(1.2, p > .5 ? 3 : 1, 1); w.p.feet && (w.p.feet.visible = false); } },
    { say: 'And at night? It screams. Very loudly.', label: 'AAAAAAH!', show: ['ground', 'fr', 'house', 'moon', 'waves'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .7 ? .15 : 0,
      cam: { pos: [2, 5, 22], look: [0, 4.8, 0], fov: 56, to: { pos: [2, 5, 21], look: [0, 4.8, 0], fov: 54 } },
      update: (w, p, t) => { fxAt(w, -3.2, 0, -1, .2, 1.6); const sc = t > .7; w.fx.head.rotation.z = sc ? .6 : 0; w.fx.mouth.visible = sc; w.house.position.set(4.2, 0, -2); w.win.forEach(g => g.visible = sc); w.moon.position.set(5, 11, -10); w.fr.updateWorldMatrix(true, true); const h = w.fx.head.getWorldPosition(new w.k.THREE.Vector3()); w.waves.children.forEach(r => { const i = r.userData.i, q = ((t - .7) * 1.2 + i / 3) % 1; r.position.set(h.x + 1, h.y + 1.2, h.z); r.scale.setScalar(.5 + q * 4); r.visible = sc; }); } },
    { say: 'Giant foxes: cool, cute, or way too loud? Comment below.',
      quiz: { q: 'Giant foxes are…', options: ['Cool', 'Cute', 'Way too loud'], answer: 'Made up. Real foxes dive head first into snow to catch mice.' },
      show: ['ground', 'fr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [7, 3.5, 7], look: [0, 2.4, 0], fov: 54, to: { pos: [8.5, 3.5, 2], look: [0, 2.4, 0] } },
      update: (w, p, t) => { w.win.forEach(g => g.visible = false); fxAt(w, 0, 0, 0, -.6, 1.1); w.fx.head.rotation.z = .08 * Math.sin(t * 3); w.fx.tail.rotation.y = .3 * Math.sin(t * 4); } },
  ],
};

// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized chicken next to a house.

function chicken(k, parent) {
  const { mat, ball, cone, cyl, box, group } = k;
  const white = mat('#F7F4EC', { rough: .7 }), red = mat('#E2453C'), yel = mat('#F2B21F');
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const b = ball(1.1, white, [0, 1.8, 0], c.body); b.scale.set(1.3, 1, 1);
  const tail = ball(.6, white, [-1.3, 2.4, 0], c.body); tail.scale.set(.6, 1.2, .8);
  c.head = group([1.1, 3.1, 0], c.body); ball(.5, white, [0, 0, 0], c.head); const bk = cone(.14, .35, yel, [.55, -.05, 0], c.head, 8); bk.rotation.z = -Math.PI / 2;
  for (let i = 0; i < 3; i++) ball(.14, red, [-.1 + i * .15, .5, 0], c.head); const wat = ball(.12, red, [.4, -.3, 0], c.head); wat.scale.y = 1.6;
  for (const z of [-1, 1]) { ball(.1, mat('#FFFFFF'), [.3, .15, z * .33], c.head); ball(.05, mat('#111111'), [.36, .16, z * .38], c.head); }
  c.wings = [-1, 1].map(z => { const w = group([0, 2, z * .9], c.body); const m = ball(.55, white, [-.2, -.2, 0], w); m.scale.set(1.3, .8, .3); w.userData.z = z; return w; });
  c.legs = [-1, 1].map(z => { const l = group([.1, .8, z * .4], c.root); cyl(.07, .07, .8, yel, [0, 0, 0], l, 6); for (let t = -1; t <= 1; t++) { const toe = cyl(.05, .05, .4, yel, [.18, -.4, t * .12], l, 5); toe.rotation.z = Math.PI / 2; } l.userData.z = z; return l; });
  return c;
}
const flap = (c, t, a = 1) => c.wings.forEach(w => w.rotation.x = -w.userData.z * a * (.2 + 1 * Math.abs(Math.sin(t * 12))));
const peck = (c, t) => { const a = Math.max(0, Math.sin(t * 8)); c.body.rotation.z = -a * .5; };
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
  w.ck = chicken(k, k.scene); w.cr = w.ck.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.egg = ball(1.4, mat('#F2E2C8'), [0, 0, 0]); w.egg.scale.set(1, 1.3, 1);
  w.crowd = group(); for (let i = 0; i < 5; i++) { const c = person(k, w.crowd, ['#E2453C', '#3FA34D', '#F2B21F', '#9B59B6', '#3B6FD6'][i]); c.root.position.set(3.2 + (i % 3) * 1.4, 0, -2.6 + Math.floor(i / 3) * 1.6); c.root.rotation.y = -1; c.root.scale.setScalar(.7); }
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8, .1, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  w.sunrise = ball(1.6, mat('#FFB040', { glow: 1 }), [6, 2, -14]);
  w.town = group(); for (let i = 0; i < 4; i++) { const h = group([-9 + i * 6, 0, -6 - (i % 2) * 2], w.town); box(3, 2.6, 2.6, mat('#F2D9B8'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#B3262E'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.dirt = group(); for (let i = 0; i < 12; i++) { const d = ball(.35, mat('#6B4A2A'), [0, 0, 0], w.dirt); d.userData.i = i; d.castShadow = false; } w.hole = cyl(2.6, 2.6, .05, mat('#3A2A1A'), [0, .03, 0], undefined, 24);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ckAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.ck.body.rotation.set(0, 0, 0); w.ck.head.rotation.set(0, 0, 0); w.ck.wings.forEach(wg => wg.rotation.x = 0); };

export default {
  id: '337',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT CHICKENS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CHICKENS', 'WERE GIANT?'],
  title: 'What would happen if chickens were giant?',
  description: 'One egg feeds the whole town. The morning alarm shakes every house. And scratching for worms? Your garden becomes a crater. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'chicken', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant chickens are made up. Quiz fact: birds, chickens included, are living dinosaurs; they evolved from small feathered meat-eating dinosaurs (Natural History Museum, London, "Are birds dinosaurs?").'],
  setup,
  scenes: [
    { say: 'What if chickens were giant?', show: ['ground', 'cr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.6, 0], fov: 52 } },
      update: (w, p, t) => { ckAt(w, -3.4, 0, -5, -.8, 2.4); w.ck.head.rotation.z = .15 * Math.sin(t * 6); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'One egg? Breakfast for the whole town.', label: 'YUM!', show: ['ground', 'cr', 'egg', 'crowd'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 22], look: [0, 4.4, 0], fov: 56, to: { pos: [0, 6, 21], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { ckAt(w, -3, 0, -2, -.6, 2); const lay = Math.min(1, Math.max(0, (p - .2) * 3)); w.egg.position.set(-3 + lay * 4.2, 1.8, -2 + lay * 2.4); w.egg.visible = lay > 0; w.crowd.children.forEach((c, i) => { c.position.y = lay >= 1 ? .3 * Math.abs(Math.sin(t * 10 + i)) : 0; }); } },
    { say: 'The morning alarm? It shakes every house.', label: 'COCK-A-DOODLE-DOO!', show: ['ground', 'cr', 'waves', 'sunrise', 'town'], sky: '#F2B07A', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .2 : 0,
      cam: { pos: [0, 6, 24], look: [0, 5.4, 0], fov: 56, to: { pos: [0, 6, 23], look: [0, 5.4, 0], fov: 54 } },
      update: (w, p, t) => { w.egg.visible = false; ckAt(w, 0, 0, 0, -1.2, 2.4); w.ck.head.rotation.z = .6; flap(w.ck, t, t > .5 ? 1 : 0); w.cr.updateWorldMatrix(true, true); const h = w.ck.head.getWorldPosition(new w.k.THREE.Vector3()); const on = t > .5; w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 4) % 1; r.position.copy(h); r.rotation.set(0, 0, 0); r.scale.setScalar(.6 + q * 6); r.material.opacity = 1 - q; r.visible = on; }); w.town.children.forEach((hs, i) => hs.rotation.z = on ? .05 * Math.sin(t * 25 + i) : 0); } },
    { say: 'And scratching for worms? Your garden becomes a crater.', label: 'SCRATCH', show: ['ground', 'cr', 'dirt', 'hole', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 7, 18], look: [0, 3, 0], fov: 54, to: { pos: [2, 7, 17], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.town.children.forEach(hs => hs.rotation.z = 0); ckAt(w, -1.5, 0, -1, 0, 1.8); peck(w.ck, t); w.ck.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * 10 + i * Math.PI)); w.hole.position.set(1.4, .03, 0); w.hole.scale.setScalar(.3 + Math.min(1, p * 1.5)); w.dirt.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 12) % 1; d.position.set(1.4 - q * 4, .3 + Math.sin(q * Math.PI) * 3, (i % 4 - 1.5) * .8); }); stand(w, 5, 3.4, -.6); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); } },
    { say: 'Giant chickens: cute, cool, or way too loud? Comment below.',
      quiz: { q: 'Giant chickens are…', options: ['Cute', 'Cool', 'Way too loud'], answer: 'Made up. Real chickens are birds, and birds are living dinosaurs.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.6, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.6, 0] } },
      update: (w, p, t) => { ckAt(w, 0, 0, 0, -.8, 1.3); w.ck.head.rotation.z = .15 * Math.sin(t * 6); } },
  ],
};

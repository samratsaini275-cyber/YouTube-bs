// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a crow taller than a house, staring down.

function crow(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const blk = mat('#1C1C24', { rough: .6, metal: .2 }), dk = mat('#2A2A36');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.2, blk, [0, 2.8, 0], g.body); b.scale.set(1.3, 1, .9);
  g.wings = []; for (const z of [-1, 1]) { const wg = group([0, 3.1, z * .8], g.body); const m = ball(.9, dk, [-.3, 0, 0], wg); m.scale.set(1.5, .4, .3); g.wings.push(wg); }
  const tl = box(1.3, .2, .8, blk, [-1.8, 2.6, 0], g.body); tl.rotation.z = .3;
  g.head = group([1.3, 3.9, 0], g.body); ball(.7, blk, [0, 0, 0], g.head);
  for (const z of [-1, 1]) { ball(.16, mat('#FFFFFF'), [.35, .2, z * .5], g.head); ball(.08, mat('#111111'), [.42, .22, z * .58], g.head); }
  g.beakTop = group([.55, -.05, 0], g.head); const bt = cone(.22, .9, mat('#2E2E36'), [.4, 0, 0], g.beakTop, 8); bt.rotation.z = -Math.PI / 2;
  g.beakBot = group([.55, -.15, 0], g.head); const bb = cone(.16, .7, mat('#2E2E36'), [.3, 0, 0], g.beakBot, 8); bb.rotation.z = -Math.PI / 2;
  g.legs = []; for (const z of [-1, 1]) { const l = group([.1, 1.9, z * .4], g.body); cyl(.07, .07, 1.6, mat('#333333'), [0, -.8, 0], l, 6); const f = cone(.12, .5, mat('#333333'), [.2, -1.6, 0], l, 6); f.rotation.z = -Math.PI / 2; g.legs.push(l); }
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
  w.cr = crow(k, k.scene); w.crr = w.cr.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#C9D1D9', { metal: .7 }), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.sparkle = group(); for (let i = 0; i < 6; i++) { const s = ball(.12, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], w.sparkle); s.userData.i = i; }
  w.photo = group(); box(2.2, 2.8, .1, mat('#FFFFFF'), [0, 0, 0], w.photo); box(1.8, 2.2, .12, mat('#F2C9A0'), [0, .15, 0], w.photo); for (const x of [-.35, .35]) ball(.1, mat('#111111'), [x, .4, .1], w.photo); box(.5, .06, .05, mat('#5A2A1A'), [0, -.2, .1], w.photo); box(1.8, .3, .13, mat('#3A2A1A'), [0, 1.1, 0], w.photo); const ring = k.torus(1.5, .08, mat('#E2453C'), [0, 0, .1], w.photo); ring.rotation.set(0, 0, 0);
  w.lights = []; w.houses = group(); for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -4], w.houses); box(3, 2.6, 2.6, mat('#E8D2B0'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; const lt = box(.8, .8, .05, mat('#FFE9A0', { glow: .9 }), [0, 1.5, 1.32], h); w.lights.push(lt); }
  w.waves = group(); for (let i = 0; i < 3; i++) { const r = k.torus(1, .07, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.waves); r.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const crAt = (w, x, y, z, ry, s) => { w.crr.position.set(x, y, z); w.crr.rotation.set(0, ry, 0); w.crr.scale.setScalar(s); w.cr.body.rotation.set(0, 0, 0); w.cr.head.rotation.set(0, 0, 0); w.cr.beakBot.rotation.set(0, 0, 0); w.cr.wings.forEach(g => g.rotation.set(0, 0, 0)); w.cr.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const flap = (w, t, f = 10) => w.cr.wings.forEach((g, i) => g.rotation.x = (i ? -1 : 1) * .9 * Math.sin(t * f));

export default {
  id: '376',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT CROWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CROWS', 'WERE GIANT?'],
  title: 'What would happen if crows were giant?',
  description: 'Shiny things? It takes your whole car. It remembers your face, forever. And one caw wakes up the whole town. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'crow', 'bird', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant crows are made up. Quiz fact: wild American crows learned to recognise the faces of people who had trapped them and kept scolding those faces for years (Marzluff et al., "Lasting recognition of threatening people by wild American crows", Animal Behaviour, 2010).'],
  setup,
  scenes: [
    { say: 'What if crows were giant?', label: 'CAW!', show: ['ground', 'crr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 8.2, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 8.2, 0], fov: 54 } },
      update: (w, p, t) => { crAt(w, -2.8, 0, -4, -1.0, 2); w.cr.beakBot.rotation.z = Math.sin(t * 6) > 0 ? -.4 : 0; w.cr.head.rotation.z = -.15; w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Shiny things? It takes your whole car.', label: 'MINE!', show: ['ground', 'crr', 'car', 'sparkle', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 4.6, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { const up = Math.max(0, p - .45) * 2; crAt(w, -1 + up * 2, up * 6, -1, 0, 1.3); if (up > 0) flap(w, t, 14); w.car.position.set(-1 + up * 2 + 1.6, up * 6 + (up > 0 ? .6 : 0), -1); w.car.rotation.z = up * .2; w.sparkle.children.forEach(s => { const i = s.userData.i, a = t * 3 + i; s.position.set(w.car.position.x + Math.cos(a) * 1.6, w.car.position.y + 1.4 + Math.sin(a * 2) * .3, w.car.position.z + Math.sin(a) * .9); s.visible = up === 0; }); stand(w, 4.4, 4, -.6); pose(w.p, up > .2 ? 2.4 : .4); w.p.mouth.scale.set(1.2, up > .2 ? 3 : 1, 1); } },
    { say: 'It remembers your face. Forever.', label: 'I SEE YOU', show: ['ground', 'crr', 'photo', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4.6, 16], look: [0, 4, 0], fov: 54, to: { pos: [3, 4.6, 15], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { crAt(w, -2.6, 0, -1, -.3, 1.2); w.cr.head.rotation.y = -.3; w.cr.head.scale.setScalar(1 + .05 * Math.sin(t * 6)); w.photo.position.set(2.4, 5.2, -2); w.photo.rotation.y = -.4; stand(w, 3.2, 2.8, -.4); pose(w.p, .3); w.p.head.rotation.y = -.5; w.pp.position.x = 3.2 + .05 * Math.sin(t * 20); } },
    { say: 'And one caw? The whole town wakes up.', label: 'CAAAAW!', show: ['ground', 'crr', 'houses', 'waves'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .6 ? .12 : 0,
      cam: { pos: [2, 7, 24], look: [0, 5, 0], fov: 56, to: { pos: [2, 7, 23], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.cr.head.scale.setScalar(1); crAt(w, -.5, 4.2, -4, 0, 1.1); const cw = t > .6; w.cr.beakBot.rotation.z = cw ? -.6 : 0; w.cr.head.rotation.z = cw ? .4 : 0; w.lights.forEach((l, i) => l.visible = cw && t > .6 + i * .2); w.crr.updateWorldMatrix(true, true); const h = w.cr.head.getWorldPosition(new w.k.THREE.Vector3()); w.waves.children.forEach(r => { const i = r.userData.i, q = ((t - .6) * 1.2 + i / 3) % 1; r.rotation.set(0, 0, 0); r.position.set(h.x + 1.2, h.y + .6, h.z); r.scale.setScalar(.5 + q * 4); r.visible = cw; }); } },
    { say: 'Giant crows: cool, cute, or way too smart? Comment below.',
      quiz: { q: 'Giant crows are…', options: ['Cool', 'Cute', 'Way too smart'], answer: 'Made up. But real crows can remember human faces for years.' },
      show: ['ground', 'crr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [7, 4, 8], look: [0, 3.4, 0], fov: 54, to: { pos: [9, 4, 2], look: [0, 3.4, 0] } },
      update: (w, p, t) => { crAt(w, 0, 0, 0, -.6, 1); w.cr.head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};

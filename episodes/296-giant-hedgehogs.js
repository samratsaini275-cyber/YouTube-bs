// Narrative 17: "What Would Happen If… (season 7)". Big-animal premise (167 giant cats 322, 265 giant bunnies, 290 giant mice).
// Hook: the premise as a question under 2 s; first frame shows a house-sized hedgehog with huge spikes next to a house.

function hedgehog(k, parent) {
  const { mat, ball, cone, group } = k;
  const sp = mat('#6B4B2E', { rough: .9 }), face = mat('#E8C8A0');
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 0, 0], h.root);
  const b = ball(1, sp, [0, .9, 0], h.body); b.scale.set(1.3, .9, 1);
  for (let i = 0; i < 70; i++) { const phi = Math.acos(1 - (i + .5) / 70), th = Math.PI * (1 + Math.sqrt(5)) * i; const d = new k.THREE.Vector3(Math.sin(phi) * Math.cos(th) * 1.3, Math.cos(phi) * .9, Math.sin(phi) * Math.sin(th)); if (d.x > .9) continue; const s = cone(.08, .5, sp, [0, 0, 0], h.body, 4); s.position.set(d.x, d.y + .9, d.z); s.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), d.clone().normalize()); s.translateY(.2); }
  h.head = group([1.2, .7, 0], h.root); const hd = ball(.5, face, [0, 0, 0], h.head); hd.scale.set(1.3, .9, .9); ball(.1, mat('#111111'), [.65, -.05, 0], h.head); for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.35, .2, z * .25], h.head); ball(.1, face, [.05, .4, z * .3], h.head); }
  for (const [x, z] of [[-.6, -.6], [-.6, .6], [.6, -.6], [.6, .6]]) ball(.15, face, [x, .1, z], h.root);
  return h;
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
  w.ground = k.ground('#7FB069', 0);
  w.hh = hedgehog(k, k.scene); w.hr = w.hh.root;
  w.p = person(k, k.scene, '#2FA36B'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.balloons = group(); for (let i = 0; i < 5; i++) { const bg = group([0, 0, 0], w.balloons); ball(.5, mat(['#E2453C', '#FFC21F', '#3B6FD6', '#FF5FA2', '#5FBF5F'][i]), [0, 0, 0], bg).scale.y = 1.2; cyl(.01, .01, 1.6, mat('#FFFFFF'), [0, -1.4, 0], bg, 4); bg.userData.i = i; }
  w.pops = group(); for (let i = 0; i < 10; i++) { const s = box(.3, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.pops); s.userData.i = i; s.castShadow = false; }
  w.apples = group(); for (let i = 0; i < 8; i++) { const a = ball(.5, mat('#E2453C'), [0, 0, 0], w.apples); a.userData.i = i; }
  w.tree = group(); cyl(.5, .7, 5, mat('#7A4A22'), [0, 2.5, 0], w.tree, 10); ball(3, mat('#3FA34D'), [0, 6.5, 0], w.tree);
  w.hill = group(); const hl = ball(10, mat('#6FA859'), [0, -7, 0], w.hill); hl.scale.set(2, 1, 1);
  w.cars = group(); for (let i = 0; i < 2; i++) { const c = group([0, 0, 0], w.cars); box(2.4, .8, 1.2, mat(['#3B6FD6', '#FFC21F'][i]), [0, .6, 0], c); box(1.2, .6, 1.1, mat('#9FD3EE'), [-.2, 1.2, 0], c); c.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };

export default {
  id: '296',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT HEDGEHOGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HEDGEHOGS', 'WERE GIANT?'],
  title: 'What would happen if hedgehogs were giant?',
  description: 'Birthday balloons do not stand a chance. Apple picking happens all at once. Hills become a bowling alley. And hugs? Very carefully. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'hedgehog', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant hedgehogs are made up. Quiz fact: a hedgehog has around 5,000 to 7,000 spines and rolls into a ball when scared (Natural History Museum, London). Real hedgehogs do not carry fruit on their spines; that is an old myth.'],
  setup,
  scenes: [
    { say: 'What if hedgehogs were giant?', show: ['ground', 'hr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-1, 6.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-1, 6.6, 0], fov: 52 } },
      update: (w, p, t) => { w.hr.scale.setScalar(4.4); w.hr.position.set(-4.4, 0, -6); w.hr.rotation.y = -.7; w.hh.head.rotation.z = .1 * Math.sin(t * 6); w.house.position.set(4, 0, -1); stand(w, 1, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.5; } },
    { say: 'Birthday balloons? They do not stand a chance.', label: '*POP*', show: ['ground', 'hr', 'balloons', 'pops'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 18], look: [0, 4.6, 0], fov: 54, to: { pos: [0, 5, 17], look: [0, 4.6, 0], fov: 52 } },
      update: (w, p, t) => { w.hr.scale.setScalar(3); w.hr.position.set(-1 + p * 1.5, 0, -1); w.hr.rotation.y = 0; w.balloons.children.forEach(b => { const i = b.userData.i, popped = p > .25 + i * .12; b.position.set(-2.4 + i * 1.3, 7.4 + .2 * Math.sin(t * 2 + i), -1); b.visible = !popped; }); w.pops.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2; s.position.set(-.4 + Math.cos(a) * 1.4, 7.4 + Math.sin(a) * 1.4, -.4); s.rotation.z = a; s.visible = (p * 12 % 1.5) < .5; }); } },
    { say: 'Apple picking? All at once.', show: ['ground', 'hr', 'tree', 'apples'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 20], look: [0, 5, 0], fov: 54, to: { pos: [0, 6, 19], look: [0, 5, 0], fov: 52 } },
      update: (w, p, t) => { w.tree.position.set(-3.4, 0, -3); w.hr.scale.setScalar(2.6); w.hr.position.set(2.4, 0, 0); w.hr.rotation.y = Math.PI - .4; w.apples.children.forEach(a => { const i = a.userData.i, onSpike = p > .4; const tx = -3.4 + Math.cos(i) * 2.4, ty = 6.4 + Math.sin(i * 2) * 1.4, tz = -3 + Math.sin(i) * 1.6; const hx = 2.4 + Math.cos(i * 1.3) * 2, hy = 3.4 + Math.sin(i * .9) * 1, hz = 1.4 + Math.sin(i * 1.3) * .6; const q = onSpike ? Math.min(1, (p - .4) * 3) : 0; a.position.set(tx + (hx - tx) * q, ty + (hy - ty) * q, tz + (hz - tz) * q); }); } },
    { say: 'Hills? Instant bowling alley.', label: 'STRIKE', show: ['ground', 'hr', 'hill', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 6, 20], look: [0, 3, 0], fov: 56, to: { pos: [5, 6, 19], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.hill.position.set(-14, 0, -6); w.hh.head.visible = p < .1; w.hr.scale.setScalar(2.6); const x = -8 + p * 14; w.hr.position.set(x, 2 + Math.max(0, (-x - 2) * .2), 0); w.hr.rotation.set(0, 0, -t * 4); w.cars.children.forEach(c => { const i = c.userData.i, hit = x > 2 + i * 1.5; c.position.set(3 + i * 2.6, hit ? 1.5 + Math.sin(t * 6 + i) * .6 : 0, -.4 + i * .8); c.rotation.set(hit ? t * 2 : 0, 0, hit ? t * 3 : 0); }); } },
    { say: 'And hugs? Very, very carefully.', show: ['ground', 'hr', 'pp'], sky: '#FFD6E0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 14], look: [0, 3.6, 0], fov: 52, to: { pos: [0, 4, 13.2], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { w.hh.head.visible = true; w.hr.rotation.set(0, Math.PI, 0); w.hr.scale.setScalar(2.4); w.hr.position.set(2.2, 0, -.6); stand(w, -1.4 + Math.min(1, p * 1.6) * .6, .6, Math.PI / 2); w.p.arms.forEach(a => a.rotation.set(-1.4, 0, a.userData.s * .3)); w.p.mouth.scale.set(1, .5, 1); w.p.eyes.forEach(e => e.scale.set(1, .4, 1)); } },
    { say: 'Giant hedgehogs: cute, scary, or way too spiky? Comment below.',
      quiz: { q: 'Would you want a giant hedgehog?', options: ['Cute', 'Scary', 'Way too spiky'], answer: 'Made up. Real hedgehogs have about 5,000 to 7,000 spines.' },
      show: ['ground', 'hr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 3, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 3, 0] } },
      update: (w, p, t) => { w.hr.scale.setScalar(1.5); w.hr.position.set(0, 0, 0); w.hr.rotation.set(0, -1, 0); w.hh.head.rotation.z = .1 * Math.sin(t * 6); } },
  ],
};

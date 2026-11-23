// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.sand = k.ground('#EED9A4', 0);
  w.sea = box(200, .2, 60, mat('#3BA7E0', { rough: .15 }), [0, .05, -36]); w.sea.castShadow = false;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.grain = group(); for (let i = 0; i < 5; i++) { const b = box(.5, .5, .5, mat('#E8CF90'), [0, .25 + i * .5, 0], w.grain); b.rotation.y = i * .4; }
  w.castle = group(); box(4, 3, 4, mat('#E8CF90'), [0, 1.5, 0], w.castle); for (const x of [-1.6, 1.6]) for (const z of [-1.6, 1.6]) cyl(.7, .7, 4.4, mat('#E8CF90'), [x, 2.2, z], w.castle, 12); box(.8, 1.4, .2, mat('#8A6A3A'), [0, .7, 2.05], w.castle);
  w.wave = group(); const wv = cyl(3, 3, 60, mat('#5EC4F2', { rough: .1 }), [0, 0, 0], w.wave, 24); wv.rotation.z = Math.PI / 2; wv.scale.set(1, 1, .6); for (let i = 0; i < 10; i++) ball(.6, mat('#FFFFFF'), [-25 + i * 5.5, 2.6, .8], w.wave);
  w.gull = group(); box(1.4, .6, .6, mat('#FFFFFF'), [0, 0, 0], w.gull); box(.4, .2, .2, mat('#FFC21F'), [.85, 0, 0], w.gull); for (const z of [-1, 1]) { const wg = box(.6, .08, 1.6, mat('#DDDDDD'), [0, .1, z * .9], w.gull); wg.userData.z = z; } ball(.12, mat('#111111'), [.55, .15, .25], w.gull);
  w.towel = box(3, .05, 1.6, mat('#E2453C'), [0, .03, 0]);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const flap = (w, t) => w.gull.children.forEach(c => { if (c.userData.z) c.rotation.x = c.userData.z * .5 * Math.sin(t * 10); });

export default {
  id: '238',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BEACH GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE BEACH.'],
  title: 'Gary the ant went to the beach',
  description: 'He builds a sandcastle one grain at a time. Then the wave comes. Then the seagull. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'beach', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: some ants can carry objects many times their own body weight (studies of Oecophylla and other species report loads well over ten times body mass; see e.g. Federle et al., "Biomechanics of ant adhesive pads", 2002, on weaver ants holding heavy loads).'],
  setup,
  scenes: [
    { say: 'Gary went to the beach.', show: ['sand', 'sea', 'g', 'towel'], sky: '#9ED8F7', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, .6, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { w.towel.position.set(-1.5, 0, -1); w.towel.scale.set(.3, 1, .3); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'He built a sandcastle. One grain at a time.', show: ['sand', 'sea', 'g', 'grain'], sky: '#9ED8F7', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.4, 2, 7.5], look: [.4, 1.2, 0], fov: 46, to: { pos: [2.2, 2, 7], look: [.4, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { w.grain.position.set(1.4, 0, 0); w.grain.children.forEach((c, i) => c.visible = i < 1 + Math.floor(p * 5)); gy(w, -.4, 0, .3, -1.4 + .3 * Math.sin(t * 4), t, true); } },
    { say: 'It took him three weeks.', label: 'DAY 21', show: ['sand', 'sea', 'g', 'castle'], sky: '#F7B98A', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [4, 3, 10], look: [0, 2.4, 0], fov: 50, to: { pos: [3.6, 3, 9.2], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { w.castle.position.set(0, 0, -1); w.castle.scale.setScalar(1); gy(w, 0, 4.5, -1, -1.2, t); w.g.rotation.z = .15 * Math.sin(t * 8); } },
    { say: 'Then the wave came.', show: ['sand', 'sea', 'g', 'castle', 'wave'], sky: '#9ED8F7', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [7, 3.4, 12], look: [0, 2.4, -2], fov: 52, to: { pos: [6.4, 3.4, 11], look: [0, 2.4, -2], fov: 50 } },
      update: (w, p, t) => { w.castle.position.set(0, 0, -1); w.castle.scale.set(1, Math.max(.05, 1 - Math.max(0, p - .6) * 3), 1); w.wave.position.set(0, 1.5, -18 + p * 20); gy(w, 0, 4.5 * w.castle.scale.y, -1, -1.2, t); w.g.rotation.z = p > .5 ? .6 * Math.sin(t * 14) : 0; } },
    { say: 'Then a seagull took him for lunch.', show: ['sand', 'sea', 'g', 'gull'], sky: '#9ED8F7', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [2, 2.4, 9], look: [0, 2.2, 0], fov: 50, to: { pos: [2, 3.6, 9], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { flap(w, t); const q = Math.max(0, p - .4) / .6; const x = -6 + Math.min(1, p / .4) * 6; w.gull.position.set(x, 1.9 + q * 2.4, 0); w.gull.rotation.set(0, 0, 0); w.gull.scale.setScalar(1.5); gy(w, .3, q > 0 ? w.gull.position.y - 1.3 : 0, 0, -1.4, t); w.g.rotation.z = q > 0 ? .4 * Math.sin(t * 9) : 0; } },
    { say: 'Who won: Gary, the seagull, or the wave? Comment below.',
      quiz: { q: 'Who won the day at the beach?', options: ['Gary', 'The seagull', 'The wave'], answer: 'Fun fact: some ants carry loads many times their own weight.' },
      show: ['sand', 'sea', 'g', 'gull'], sky: '#9ED8F7', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 2, 8], look: [0, 2.2, 0], fov: 48, to: { pos: [-2, 2, 8.5], look: [0, 2.2, 0] } },
      update: (w, p, t) => { flap(w, t * .3); w.gull.position.set(0, 1.1, 0); w.gull.rotation.set(0, 0, Math.PI); w.gull.scale.setScalar(1.5); gy(w, 0, 0, 0, -1.4, t); w.gull.position.set(0, 1.55, 0); w.gull.scale.setScalar(1); w.gull.rotation.set(0, 0, Math.PI); } },
  ],
};

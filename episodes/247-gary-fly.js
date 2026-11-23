// Narrative 15: "What Would Happen If… (season 5)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary with wings.

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
  w.grass = k.ground('#7FB069', 0);
  w.house = group(); box(14, 10, 8, mat('#F2D7A6'), [0, 5, -10], w.house); w.win = box(4, 3.4, .1, mat('#BFE3F7', { rough: .05, metal: .2 }), [0, 4, -5.95], w.house); box(4.4, .3, .3, mat('#FFFFFF'), [0, 5.8, -5.9], w.house);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.wings = [-1, 1].map(s => { const g = group([0, 0, 0], w.g); const f = ball(.6, mat('#DDEEFF', { opacity: .6 }), [0, .3, s * .7], g); f.scale.set(1.2, .08, .9); g.userData.s = s; g.position.set(0, 1, 0); return g; });
  w.blanket = group(); box(6, .05, 4, mat('#E2453C'), [0, .03, 0], w.blanket); for (let i = 0; i < 4; i++) box(.4, .06, 4, mat('#FFFFFF'), [-2.2 + i * 1.4, .04, 0], w.blanket); cyl(.9, .9, .4, mat('#F2C68A'), [1.2, .2, .4], w.blanket, 20); box(1.4, .5, 1, mat('#D9A35B'), [-1.2, .25, -.6], w.blanket);
  w.bird = group(); const bb = ball(1, mat('#3B6FD6'), [0, 0, 0], w.bird); bb.scale.set(1.4, 1, 1); ball(.6, mat('#3B6FD6'), [1.2, .6, 0], w.bird); cone(.2, .6, mat('#FFC21F'), [1.9, .55, 0], w.bird, 8).rotation.z = -Math.PI / 2; for (const z of [-.3, .3]) ball(.12, mat('#111111'), [1.6, .8, z], w.bird); for (const z of [-1, 1]) { const wg = box(.9, .08, 1.8, mat('#2F5BB0'), [0, .2, z * 1], w.bird); wg.userData.z = z; }
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFE21F', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const buzz = (w, t, on = true) => w.wings.forEach(g => { g.visible = on; g.rotation.x = g.userData.s * (.3 + .4 * Math.sin(t * 40)); });
const flapB = (w, t) => w.bird.children.forEach(c => { if (c.userData.z) c.rotation.x = c.userData.z * .6 * Math.sin(t * 9); });
const dizzy = (w, t, on) => w.stars.children.forEach(s => { s.visible = on; const a = t * 4 + s.userData.i * 1.26; s.position.set(w.g.position.x + Math.cos(a) * .7, w.g.position.y + 1.5, w.g.position.z + Math.sin(a) * .7); });

export default {
  id: '247',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'COULD FLY?'],
  title: 'What would happen if Gary the ant could fly?',
  description: 'First flight: straight into a window. Second flight: the picnic. Third flight: someone was waiting for him. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'flying', 'funny', 'shorts'],
  sources: ['Quiz fact: in many ant species, young queens and males have wings and fly out of the nest to mate; the queens then shed their wings (Hölldobler & Wilson, "The Ants", 1990).'],
  setup,
  scenes: [
    { say: 'What if Gary could fly?', show: ['grass', 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.6, 6.5], look: [0, 1.2, 0], fov: 46, to: { pos: [1.5, 1.6, 5.9], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { w.stars.visible = false; gy(w, 0, .2 * Math.abs(Math.sin(t * 3)), 0, -1.4, t); buzz(w, t); } },
    { say: 'First flight? Straight into a window.', label: '*BONK*', show: ['grass', 'house', 'g', 'stars'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [4, 4, 4], look: [0, 3.6, -5], fov: 50, to: { pos: [3.6, 4, 3.4], look: [0, 3.6, -5], fov: 48 } },
      update: (w, p, t) => { const hit = t > 1.1; const z = hit ? -5.6 + Math.min(.6, (t - 1.1)) : 2 - t * 6.9; gy(w, 0, hit ? Math.max(0, 3.6 - (t - 1.1) * 6) : 3.6, z, Math.PI, t); buzz(w, t, !hit); w.g.rotation.z = hit ? 1.2 : 0; dizzy(w, t, hit); } },
    { say: 'Second flight? The picnic. From above.', show: ['grass', 'g', 'blanket'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 7, 7], look: [0, 1, 0], fov: 50, to: { pos: [2.6, 6.4, 6.4], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.stars.visible = false; gy(w, -3 + p * 4, 3 - p * 2.3, 0, -1.6, t); buzz(w, t); } },
    { say: 'Third flight? A bird was waiting.', show: ['grass', 'g', 'bird'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [2, 4.4, 9], look: [0, 4.4, 0], fov: 50, to: { pos: [1.8, 4.4, 8.2], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { w.stars.visible = false; flapB(w, t); w.bird.position.set(4 - p * 3.4, 4.6, 0); w.bird.rotation.y = Math.PI; gy(w, -1 + p * .4, 4.2, 0, -1.4, t); buzz(w, t); w.g.rotation.z = p > .6 ? .3 * Math.sin(t * 20) : 0; } },
    { say: 'Gary walks now. Everywhere.', label: '*NO MORE FLYING*', show: ['grass', 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.5], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.stars.visible = false; gy(w, -.6 + p * .9, 0, 0, -1.6, t, true); buzz(w, t, false); } },
    { say: 'Can real ants fly: never, some of them, or all of them? Comment below.',
      quiz: { q: 'Can real ants fly?', options: ['Never', 'Some of them', 'All of them'], answer: 'Answer: some. Young queens and males have wings.' },
      show: ['grass', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1, 6.5], look: [0, 2.2, 0], fov: 46, to: { pos: [-1.6, 1, 6.5], look: [0, 2.2, 0] } },
      update: (w, p, t) => { w.stars.visible = false; gy(w, 0, .4 + .2 * Math.sin(t * 3), 0, -1.4, t); buzz(w, t); } },
  ],
};

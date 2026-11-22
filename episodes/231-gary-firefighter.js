// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a red helmet.

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
  w.table = k.ground('#E9E2D3', 0);
  w.wall = box(60, 30, .5, mat('#F7D7E6'), [0, 15, -6]); w.wall.castShadow = false;
  w.g = gary(k, k.scene, 1.3, '#E2453C');
  w.cake = group(); cyl(3.4, 3.4, 2.2, mat('#F6E3C8'), [0, 1.1, 0], w.cake, 32); cyl(3.42, 3.42, .5, mat('#FF9EC4'), [0, 2.35, 0], w.cake, 32); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; ball(.25, mat(['#3B82F6', '#FFC21F', '#22C55E'][i % 3]), [Math.cos(a) * 3.1, 2.65, Math.sin(a) * 3.1], w.cake); }
  w.candle = group([0, 2.6, 0], w.cake); cyl(.22, .22, 2.4, mat('#3B82F6'), [0, 1.2, 0], w.candle, 14); for (let i = 0; i < 5; i++) { const s = box(.46, .1, .46, mat('#FFFFFF'), [0, .3 + i * .45, 0], w.candle); s.rotation.y = .6; }
  w.flame = group([0, 2.75, 0], w.candle); const f1 = cone(.3, .9, mat('#FF9F1A', { glow: 1 }), [0, .35, 0], w.flame, 14); const f2 = cone(.16, .5, mat('#FFE45C', { glow: 1 }), [0, .25, 0], w.flame, 12); f1.castShadow = f2.castShadow = false;
  w.drop = ball(.14, mat('#3BA7E0', { glow: .4 }), [0, 0, 0], k.scene); w.drop.scale.y = 1.3; w.drop.castShadow = false;
  w.ladder = group(); for (const x of [-.25, .25]) box(.06, 3, .06, mat('#C0C8D0', { metal: .6 }), [x, 1.5, 0], w.ladder); for (let i = 0; i < 8; i++) box(.5, .05, .05, mat('#C0C8D0', { metal: .6 }), [0, .2 + i * .38, 0], w.ladder);
  w.face = group(); ball(2.4, mat('#F2C9A0'), [0, 0, 0], w.face); for (const x of [-.8, .8]) ball(.3, mat('#111111'), [x, .6, 2.2], w.face); w.lips = ball(.5, mat('#C2685A'), [0, -.8, 2.2], w.face); w.lips.scale.set(1, .6, .6);
  w.puffs = group(); for (let i = 0; i < 8; i++) { const p = ball(.3, mat('#FFFFFF', { glow: .2 }), [0, 0, 0], w.puffs); p.material.transparent = true; p.material.opacity = .7; p.userData.i = i; p.castShadow = false; }
  w.smoke = group(); for (let i = 0; i < 6; i++) { const s = ball(.2, mat('#BBBBBB'), [0, 0, 0], w.smoke); s.userData.i = i; s.castShadow = false; }
  w.medal = group(); cyl(.16, .16, .05, mat('#FFC21F', { metal: .8, rough: .2 }), [0, 0, 0], w.medal, 20).rotation.x = Math.PI / 2;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const fl = (w, t, on = true) => { w.flame.visible = on; w.flame.scale.set(1 + .1 * Math.sin(t * 17), 1 + .15 * Math.sin(t * 13), 1); w.flame.rotation.z = .1 * Math.sin(t * 9); };

export default {
  id: '231',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FIREFIGHTER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BECAME A FIREFIGHTER.'],
  title: 'Gary the ant became a firefighter',
  description: 'His first fire: a birthday candle. His equipment: one drop of water. His result: total victory, sort of. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'firefighter', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: many ants in the subfamily Formicinae, such as wood ants, defend themselves by spraying formic acid (Encyclopaedia Britannica, "formic acid").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary became a firefighter.',
      show: ['table', 'wall', 'g'], sky: '#F7D7E6', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.4, 1.4, 6], look: [0, .82, 0], fov: 46, to: { pos: [2.2, 1.4, 5.4], look: [0, .82, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.25, t); w.g.rotation.z = .08 * Math.sin(t * 6); },
    },
    {
      say: 'His first fire? A birthday candle.',
      show: ['table', 'wall', 'cake', 'g'], sky: '#F7D7E6', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 4.6, 11], look: [0, 4.2, 0], fov: 48, to: { pos: [1.9, 4.6, 10.2], look: [0, 4.2, 0], fov: 46 } },
      update: (w, p, t) => { w.cake.position.set(0, 0, 0); fl(w, t); gy(w, 1.6, 2.6, 1.8, -1.9, t); },
    },
    {
      say: 'He brought one drop of water.',
      show: ['table', 'wall', 'cake', 'g', 'drop', 'ladder'], sky: '#F7D7E6', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 4.6, 6], look: [.5, 4.2, 0], fov: 46, to: { pos: [1.5, 4.6, 5.4], look: [.5, 4.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.cake.position.set(0, 0, 0); fl(w, t); w.ladder.position.set(.7, 2.6, 0); const up = Math.min(1, t / 1.2); gy(w, .7, 2.6 + up * 2.4, .2, -1.6, t); w.g.rotation.z = 0; w.g.userData.legs.forEach(l => l.rotation.x = .6 * Math.sin(t * 14) * (1 - up));
        w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(.3, 1.05, 0); w.g.localToWorld(v); w.drop.position.copy(v);
      },
    },
    {
      say: 'It did nothing. Then a kid blew it out.',
      show: ['table', 'wall', 'cake', 'g', 'ladder', 'face', 'puffs', 'smoke'], sky: '#F7D7E6', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.2, 5.4, 12], look: [-1.2, 5.2, 0], fov: 54, to: { pos: [1.1, 5.4, 11.2], look: [-1.2, 5.2, 0], fov: 52 } },
      update: (w, p, t) => {
        w.cake.position.set(0, 0, 0); const out = p > .55; fl(w, t, !out); w.ladder.position.set(.7, 2.6, 0); gy(w, .7, 5, .2, -1.6, t); w.face.position.set(-4.6, 6.2, -.5); w.face.rotation.y = Math.PI / 2;
        w.lips.scale.set(p > .4 ? .6 : 1, p > .4 ? .6 : .6, .6);
        w.puffs.children.forEach(pf => { const i = pf.userData.i, q = Math.max(0, (p - .4) * 3 - i * .08); pf.visible = q > 0 && q < 1.2; pf.position.set(-2.2 + q * 2.2, 5.6 + Math.sin(i) * .3, Math.cos(i * 2) * .3); pf.scale.setScalar(.6 + q); });
        w.smoke.children.forEach(s => { const i = s.userData.i, q = (t * .6 + i / 6) % 1; s.visible = out; s.position.set(Math.sin(i * 2) * .3, 5.6 + q * 2.6, 0); s.scale.setScalar(.5 + q); });
      },
    },
    {
      say: 'Gary took the credit anyway.',
      show: ['table', 'wall', 'cake', 'g', 'medal', 'smoke'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 3.6, 7], look: [.6, 3.4, 1], fov: 46, to: { pos: [1.5, 3.6, 6.4], look: [.6, 3.4, 1], fov: 44 } },
      update: (w, p, t) => { w.cake.position.set(0, 0, 0); fl(w, t, false); gy(w, .8, 2.6, 1.2, -1.2, t); w.g.position.y = 2.6 + .2 * Math.abs(Math.sin(t * 5)); w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(.4, .1, 0); w.g.localToWorld(v); w.medal.position.copy(v); w.medal.position.z += .35; w.smoke.children.forEach(s => { const i = s.userData.i, q = (t * .4 + i / 6) % 1; s.position.set(Math.sin(i * 2) * .3, 5.6 + q * 2.6, 0); s.scale.setScalar(.4 + q * .6); }); },
    },
    {
      say: 'Gary\'s fire truck: a leaf, a matchbox, or a skateboard? Comment below.',
      quiz: { q: 'What should Gary\'s fire truck be?', options: ['A leaf', 'A matchbox', 'A skateboard'], answer: 'Fun fact: wood ants can defend themselves by spraying formic acid.' },
      show: ['table', 'wall', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 5], look: [.2, .9, 0], fov: 46, to: { pos: [-2, 1.6, 5.5], look: [.2, .9, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.3, t); },
    },
  ],
};

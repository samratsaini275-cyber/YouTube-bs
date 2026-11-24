// Narrative 17: "What Would Happen If… (season 7)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a white coat and head mirror.

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


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.desk = k.ground('#E8F0F4', 0);
  w.grass = k.ground('#7FB069', .005);
  w.wall = group(); box(30, 14, .3, mat('#DDEEF4'), [0, 7, -3], w.wall); box(1.2, 1.2, .05, mat('#E2453C'), [2.4, 3, -2.84], w.wall); box(.4, 1.2, .06, mat('#FFFFFF'), [2.4, 3, -2.8], w.wall); box(1.2, .4, .06, mat('#FFFFFF'), [2.4, 3, -2.8], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.mirror = group([.36, .58, 0], w.g); const mr = cyl(.09, .09, .02, mat('#E8F4FF', { metal: .5, rough: .1 }), [.18, .02, 0], w.mirror, 16); mr.rotation.z = Math.PI / 2; const band = box(.03, .04, .44, mat('#DDDDDD'), [.1, -.02, 0], w.mirror);
  w.coat = group([0, .3, 0], w.g); const cb = ball(.3, mat('#FFFFFF'), [0, 0, 0], w.coat); cb.scale.set(1.2, .9, .9);
  w.steth = group(); const tube = k.torus(.25, .025, mat('#333333'), [0, 0, 0], w.steth); tube.rotation.set(0, 0, 0); cyl(.08, .08, .04, mat('#C9D1D9', { metal: .4 }), [0, -.3, 0], w.steth, 12);
  w.line = group(); w.patients = []; for (let i = 0; i < 4; i++) { const a = gary(k, w.line, 1.1, ['#E2453C', '#5FBF5F', null, '#8E44AD'][i]); a.position.set(-1 - i * 1.3, 0, -.6); a.rotation.y = 0; w.patients.push(a); }
  w.plaster = group(); box(1.6, .05, .5, mat('#F2C9A0'), [0, 0, 0], w.plaster); box(.5, .06, .45, mat('#FFFFFF'), [0, 0, 0], w.plaster); for (let i = 0; i < 6; i++) box(.04, .065, .04, mat('#D9A880'), [-.65 + (i % 3) * .1, 0, -.12 + Math.floor(i / 3) * .24], w.plaster);
  w.dog = group(); const dm = mat('#C98A4B'); const db = ball(2, dm, [0, 2.8, 0], w.dog); db.scale.set(1.5, .8, .8); for (const [x, z] of [[-2, -.7], [-2, .7], [2, -.7], [2, .7]]) cyl(.35, .3, 2, dm, [x, 1, z], w.dog, 8); ball(1.2, dm, [3, 4, 0], w.dog);
  w.candy = group(); cyl(.02, .02, .4, mat('#FFFFFF'), [0, .2, 0], w.candy, 6); w.crystal = box(.06, .06, .06, mat('#FF5FA2', { glow: .6 }), [0, .43, 0], w.candy);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '287',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DOCTOR GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A DOCTOR?'],
  title: 'What would happen if Gary the ant was a doctor?',
  description: 'His waiting room is the whole colony. One bandage covers him completely. A check-up on a dog takes all day. And the lollipop? One sugar crystal. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'doctor', 'funny', 'shorts'],
  sources: ['Quiz fact: some ants care for injured nestmates by licking and cleaning their wounds (Frank et al., "Wound treatment and selective help in a termite-hunting ant", Proceedings of the Royal Society B, 2018).'],
  setup,
  scenes: [
    { say: 'What if Gary was a doctor?', show: ['desk', 'wall', 'g', 'mirror', 'coat'], sky: '#DDEEF4', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); } },
    { say: 'The waiting room? The whole colony.', show: ['desk', 'wall', 'g', 'mirror', 'coat', 'line'], sky: '#DDEEF4', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [1, 2.2, 6.6], look: [-1.4, .6, -.4], fov: 52, to: { pos: [.9, 2.2, 6.1], look: [-1.4, .6, -.4], fov: 50 } },
      update: (w, p, t) => { gy(w, .6, 0, -.3, Math.PI, t); w.patients.forEach((a, i) => { a.rotation.z = .1 * Math.sin(t * 6 + i); a.position.y = .05 * Math.max(0, Math.sin(t * 8 + i)); }); } },
    { say: 'One bandage? Covers him completely.', show: ['desk', 'wall', 'g', 'plaster'], sky: '#DDEEF4', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.6, 4.8], look: [0, .6, 0], fov: 46, to: { pos: [.7, 1.6, 4.3], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .2, -1.4, t); const q = Math.min(1, Math.max(0, (p - .2) * 3)); w.plaster.position.set(.1, .9 - q * .25, .2); w.plaster.rotation.set(0, -1.4, -q * .3); w.plaster.scale.set(1, 1, 1); w.g.rotation.z = .2 * Math.sin(t * 12) * q; } },
    { say: 'A check-up on a dog? That takes all day.', label: '9 AM → 5 PM', show: ['grass', 'g', 'steth', 'dog'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 24,
      cam: { pos: [0, 2.4, 9], look: [0, 1.8, 0], fov: 54, to: { pos: [0, 2.4, 8.4], look: [0, 1.8, 0], fov: 52 } },
      update: (w, p, t) => { w.dog.position.set(0, 0, -2.4); const x = 1.6 - p * 3; gy(w, x, 0, .3, Math.PI, t, true); w.steth.position.set(x - .6, .6, .5); w.steth.rotation.set(0, 0, 0); } },
    { say: 'And the lollipop? One sugar crystal.', show: ['desk', 'wall', 'g', 'mirror', 'coat', 'candy'], sky: '#DDEEF4', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.3, 4.6], look: [.2, .7, 0], fov: 44, to: { pos: [.7, 1.3, 4.1], look: [.2, .7, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, -.3, 0, .2, -.9, t); w.candy.position.set(.45, .3, .8); w.candy.rotation.z = -.3; w.crystal.rotation.y = t * 2; w.g.rotation.z = .08 * Math.sin(t * 5); } },
    { say: 'Doctor Gary: helpful, tiny, or both? Comment below.',
      quiz: { q: 'Doctor Gary is…', options: ['Helpful', 'Tiny', 'Both'], answer: 'Some real ants treat injured nestmates by cleaning their wounds.' },
      show: ['desk', 'g', 'mirror', 'coat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

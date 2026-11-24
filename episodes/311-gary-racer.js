// Narrative 18: "What Would Happen If… (season 8)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a racing helmet.

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
  w.floor = k.ground('#B9B2A6', 0);
  w.wall = group(); box(30, 14, .3, mat('#F0E3CF'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.helmet = group([.3, .5, 0], w.g); const hm = mat('#E2453C', { metal: .3, rough: .3 }); k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI * .55), hm, [0, 0, 0], w.helmet); box(.26, .03, .03, mat('#FFFFFF'), [0, .17, 0], w.helmet);
  w.car = group(); const cap = cyl(.6, .6, .28, mat('#3B6FD6', { metal: .7, rough: .3 }), [0, .38, 0], w.car, 20); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; box(.06, .28, .1, mat('#2A55B0', { metal: .7 }), [Math.cos(a) * .6, .38, Math.sin(a) * .6], w.car).rotation.y = -a; } w.wheels = []; for (const x of [-.4, .4]) for (const z of [-.62, .62]) { const wh = ball(.2, mat('#5FBF5F'), [x, .2, z], w.car); w.wheels.push(wh); } box(.04, .5, .04, mat('#888888'), [-.5, .75, 0], w.car); w.flagC = box(.3, .2, .02, mat('#FFC21F'), [-.35, .95, 0], w.car);
  w.sn = group(); const shell = mat('#B5652E'); const sb = ball(.4, shell, [0, .55, 0], w.sn); sb.scale.z = .6; const ft = ball(.5, mat('#C9B48A'), [0, .15, 0], w.sn); ft.scale.set(1.6, .3, .5); for (const z of [-1, 1]) { const st = cyl(.03, .03, .4, mat('#C9B48A'), [.7, .45, z * .08], w.sn, 5); st.rotation.z = -.3; ball(.06, mat('#FFFFFF'), [.78, .65, z * .08], w.sn); }
  w.crumb = group(); const cm = mat('#C98B3E'); box(.5, .35, .4, cm, [0, .18, 0], w.crumb).rotation.set(.3, .5, .2);
  w.crack = box(.12, .02, 8, mat('#3A3A3A'), [0, .01, 0]);
  w.checker = group(); for (let i = 0; i < 8; i++) box(.4, .02, .4, mat(i % 2 ? '#111111' : '#FFFFFF'), [(i % 2) * .4, .015, -1.6 + i * .4], w.checker);
  w.sprinkle = group(); const sp = cyl(.06, .06, .35, mat('#FF5FA2', { glow: .2 }), [0, 0, 0], w.sprinkle, 8); sp.rotation.z = Math.PI / 2;
  w.speed = group(); for (let i = 0; i < 5; i++) { const l = box(.6, .02, .02, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.speed); l.userData.i = i; l.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const drive = (w, x, z, ry, t, spin = true) => { w.car.position.set(x, 0, z); w.car.rotation.set(0, ry, 0); w.wheels.forEach(wh => wh.rotation.z = spin ? -t * 10 : 0); gy(w, 0, 0, 0, 0, t); w.car.updateWorldMatrix(true, false); const p = new w.k.THREE.Vector3(-.05, .52, 0).applyMatrix4(w.car.matrixWorld); w.g.position.copy(p); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); };

export default {
  id: '311',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'RACER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'RACED CARS?'],
  title: 'What would happen if Gary the ant raced cars?',
  description: 'His race car is a bottle cap. A snail overtakes him. His pit stop is a snack break. And the trophy? One sprinkle. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'racing', 'funny', 'shorts'],
  sources: ['Quiz fact: Saharan silver ants can run at about 0.86 metres per second, roughly 108 of their own body lengths every second (Pfeffer et al., Journal of Experimental Biology, 2019).'],
  setup,
  scenes: [
    { say: 'What if Gary raced cars?', show: ['floor', 'wall', 'g', 'helmet'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.scale.setScalar(1.3); w.g.rotation.z = .06 * Math.sin(t * 5); } },
    { say: 'His race car? A bottle cap.', label: 'VROOM', show: ['floor', 'wall', 'g', 'helmet', 'car'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.6, 1.6, 4.6], look: [0, .7, 0], fov: 46, to: { pos: [1.4, 1.6, 4.1], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => { drive(w, -.3 + p * .6, 0, -.5, t); w.flagC.rotation.y = .4 * Math.sin(t * 8); } },
    { say: 'Top speed? A snail beats him.', show: ['floor', 'wall', 'g', 'helmet', 'car', 'sn'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [-.4, 1.6, 6.5], look: [-.4, .6, 0], fov: 48, to: { pos: [-.4, 1.6, 6], look: [-.4, .6, 0], fov: 46 } },
      update: (w, p, t) => { drive(w, -1.6 + p * 1.2, .6, 0, t * .3); w.sn.position.set(-1.8 + p * 3.6, 0, -.4); w.g.rotation.z = p > .6 ? -.15 : 0; } },
    { say: 'Pit stop? Snack break.', label: 'CRUNCH', show: ['floor', 'wall', 'g', 'helmet', 'car', 'crumb'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 4.4], look: [0, .6, 0], fov: 46, to: { pos: [1.3, 1.2, 4], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { drive(w, -.8, -.3, 0, t, false); gy(w, .2, 0, .4, -.9, t); w.g.scale.setScalar(1.3); w.crumb.position.set(.8, 0, .5); w.crumb.scale.setScalar(Math.max(.2, 1 - p * .9)); w.g.rotation.z = .1 * Math.sin(t * 16); } },
    { say: 'And the trophy? One sprinkle.', label: 'WINNER', show: ['floor', 'wall', 'g', 'helmet', 'car', 'checker', 'sprinkle', 'speed'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1, 1.4, 5], look: [.3, .9, 0], fov: 46, to: { pos: [.9, 1.4, 4.5], look: [.3, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.crumb.scale.setScalar(1); w.checker.position.set(-.1, 0, 0); const q = Math.min(1, p * 2); if (q < 1) drive(w, -1.6 + q * 1.9, 0, 0, t); else { drive(w, .3, 0, 0, t, false); w.g.rotation.z = .1 * Math.sin(t * 8); } w.sprinkle.position.copy(w.g.position).add(new w.k.THREE.Vector3(.4, .9 + .05 * Math.sin(t * 6), 0)); w.sprinkle.rotation.set(0, 0, q >= 1 ? .5 * Math.sin(t * 5) : 0); w.sprinkle.visible = q >= 1; w.speed.children.forEach(l => { const i = l.userData.i; l.position.set(w.car.position.x - .9 - ((t * 3 + i / 5) % 1) * .6, .3 + i * .1, 0); l.visible = q < 1; }); } },
    { say: 'Racer Gary: fast, tiny, or totally lost? Comment below.',
      quiz: { q: 'Racer Gary is…', options: ['Fast', 'Tiny', 'Totally lost'], answer: 'Saharan silver ants run about 108 body lengths every second.' },
      show: ['floor', 'g', 'helmet'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.scale.setScalar(1.3); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

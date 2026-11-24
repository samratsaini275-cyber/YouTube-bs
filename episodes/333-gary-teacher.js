// Narrative 19: "What Would Happen If… (season 9)". Gary premise (every fifth episode: 328, 333, 338, 343).
// Hook: the premise as a question under 2 s; first frame shows Gary in tiny round glasses.

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
  w.floor = k.ground('#C9B48A', 0);
  w.wall = group(); box(30, 14, .3, mat('#E8F0E0'), [0, 7, -3], w.wall);
  w.board = group(); box(5, 2.6, .1, mat('#2E4A3A'), [0, 2.2, -2.8], w.board); box(5.2, .15, .3, mat('#8B5A2B'), [0, .85, -2.75], w.board);
  w.g = gary(k, k.scene, 1.3, null);
  w.specs = group([.62, .42, 0], w.g); for (const z of [-1, 1]) { const r = k.torus(.07, .012, mat('#222222'), [0, 0, z * .11], w.specs); r.rotation.set(0, Math.PI / 2, 0); } box(.01, .01, .08, mat('#222222'), [0, 0, 0], w.specs);
  w.chalk = cyl(.015, .015, .14, mat('#FFFFFF'), [.6, .35, .15], w.g, 6); w.chalk.rotation.z = 1.2;
  w.dot = ball(.04, mat('#FFFFFF', { glow: .4 }), [0, 0, 0]);
  w.desks = group(); for (let i = 0; i < 3; i++) { const d = group([-1.4 + i * 1.4, 0, 1.4], w.desks); box(.9, .08, .6, mat('#C0703F'), [0, .55, 0], d); for (const x of [-.4, .4]) box(.06, .55, .06, mat('#C0703F'), [x, .27, 0], d); const s = gary(k, d, .7, null); s.position.set(0, .6, 0); s.rotation.y = Math.PI / 2 + Math.PI; s.userData.kid = true; }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = box(.18, .18, .02, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; z.castShadow = false; }
  w.apple = group(); ball(.5, mat('#E2453C'), [0, .5, 0], w.apple); cyl(.03, .03, .2, mat('#5A3A1E'), [0, 1.05, 0], w.apple, 6); const lf = ball(.12, mat('#3FA34D'), [.12, 1.05, 0], w.apple); lf.scale.set(1.5, .4, .8);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '333',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TEACHER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A TEACHER?'],
  title: 'What would happen if Gary the ant was a teacher?',
  description: 'His writing is one tiny dot. The class falls asleep. And an apple for the teacher? Bigger than him. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'teacher', 'funny', 'shorts'],
  sources: ['Quiz fact: some ants teach: a Temnothorax ant leading a nestmate to food slows down and waits for it to keep up, a behaviour scientists call tandem running (Franks & Richardson, Nature, 2006).'],
  setup,
  scenes: [
    { say: 'What if Gary was a teacher?', show: ['floor', 'wall', 'g', 'specs'], sky: '#E8F0E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.chalk.visible = false; w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His writing? One tiny dot.', show: ['floor', 'wall', 'board', 'g', 'specs', 'dot'], sky: '#E8F0E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.7, 3.2], look: [0, 1.3, -2.6], fov: 42, to: { pos: [0, 1.7, 2.8], look: [0, 1.3, -2.6], fov: 40 } },
      update: (w, p, t) => { w.chalk.visible = true; gy(w, -.5, .92, -2.6, -.25, t); w.dot.position.set(.45, 1.35, -2.74); w.dot.visible = p > .35; w.chalk.rotation.z = 1.2 + .3 * Math.sin(t * 10) * (p < .35 ? 1 : 0); } },
    { say: 'The class? Fast asleep.', label: 'ZZZ', show: ['floor', 'wall', 'board', 'g', 'specs', 'desks'], sky: '#E8F0E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.6, 6], look: [0, .9, 0], fov: 52, to: { pos: [0, 2.6, 5.5], look: [0, .9, 0], fov: 50 } },
      update: (w, p, t) => { gy(w, 0, .92, -2.5, -1.4 + .3 * Math.sin(t * 2), t); w.chalk.visible = true; w.desks.children.forEach((d, i) => { const kid = d.children.find(c => c.userData.kid); if (kid) kid.rotation.z = .3 + .05 * Math.sin(t * 2 + i); }); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(-1.2 + q * .5, 1.1 + q * 1.2, 1.4); z.scale.setScalar(.5 + q); }); } },
    { say: 'And an apple for the teacher? Bigger than him.', label: 'OOF', show: ['floor', 'wall', 'g', 'specs', 'apple'], sky: '#E8F0E0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.6, 5.4], look: [0, .9, 0], fov: 48, to: { pos: [0, 1.6, 5], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { w.chalk.visible = false; const q = Math.min(1, p * 2); w.apple.position.set(.6, 2.6 - q * 2.6, 0); w.apple.scale.setScalar(1); gy(w, -.6, 0, .3, -1.1, t, q >= 1); if (q >= 1) { w.g.position.x = -.6 - (p - .5) * 1.4; w.g.rotation.y = -1.1 + Math.PI * .3; } } },
    { say: 'Teacher Gary: smart, tiny, or totally lost? Comment below.',
      quiz: { q: 'Teacher Gary is…', options: ['Smart', 'Tiny', 'Totally lost'], answer: 'Some real ants teach: they slow down so a follower can keep up.' },
      show: ['floor', 'g', 'specs'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

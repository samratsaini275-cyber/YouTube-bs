// Narrative 19: "What Would Happen If… (season 9)". Gary premise (every fifth episode: 328, 333, 338, 343).
// Hook: the premise as a question under 2 s; first frame shows Gary in a yellow hard hat.

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
  w.wall = group(); box(30, 14, .3, mat('#E8F0F5'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cubes = group(); w.cl = []; for (let i = 0; i < 3; i++) { const c = box(.7, .7, .7, mat('#FFFFFF', { rough: .9 }), [0, .35 + i * .7, 0], w.cubes); w.cl.push(c); }
  w.crane = group(); const mast = cyl(.03, .03, 3, mat('#F2C94C'), [0, 1.5, 0], w.crane, 6); const jib = cyl(.025, .025, 2.4, mat('#F2C94C'), [.8, 3, 0], w.crane, 6); jib.rotation.z = Math.PI / 2; w.hook = cyl(.01, .01, 1, mat('#999999'), [1.8, 2.5, 0], w.crane, 4); w.jib = jib;
  w.mouse = group(); const mb = ball(.8, mat('#9A9AA8'), [0, .8, 0], w.mouse); mb.scale.set(1.4, 1, 1); ball(.4, mat('#9A9AA8'), [1.1, 1.1, 0], w.mouse); for (const z of [-1, 1]) { ball(.3, mat('#E8B0B8'), [.9, 1.55, z * .35], w.mouse).scale.z = .4; ball(.06, mat('#111111'), [1.4, 1.25, z * .18], w.mouse); } const tail = cyl(.04, .02, 1.5, mat('#E8B0B8'), [-1.5, .7, 0], w.mouse, 5); tail.rotation.z = 1.2;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '343',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BUILDER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A BUILDER?'],
  title: 'What would happen if Gary the ant was a builder?',
  description: 'His bricks are sugar cubes. His crane is one spaghetti noodle. And his skyscraper? A mouse knocks it over. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'builder', 'funny', 'shorts'],
  sources: ['Quiz fact: leafcutter ants build huge underground nests, and a single colony can hold millions of ants (Encyclopaedia Britannica, "leafcutter ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a builder?', show: ['floor', 'wall', 'g'], sky: '#E8F0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His bricks? Sugar cubes.', show: ['floor', 'wall', 'g', 'cubes'], sky: '#E8F0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.8, 5.5], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { w.cubes.position.set(.8, 0, -.3); const n = Math.min(3, 1 + Math.floor(p * 3)); w.cl.forEach((c, i) => c.visible = i < n); gy(w, -.8, 0, .2, -.6, t, true); w.g.position.x = -.8 + .2 * Math.sin(t * 3); } },
    { say: 'His crane? One spaghetti noodle.', label: 'BOING', show: ['floor', 'wall', 'g', 'cubes', 'crane'], sky: '#E8F0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 7], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.2, 6.5], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.cl.forEach(c => c.visible = true); w.cubes.position.set(1.6, 0, -.3); w.crane.position.set(-.4, 0, -.3); const sag = Math.min(1, p * 1.5); w.jib.rotation.z = Math.PI / 2 + sag * .9 + .1 * Math.sin(t * 6); w.hook.position.set(1.8 - sag * .6, 2.5 - sag * 1.6, 0); gy(w, -1.3, 0, .4, -.8, t); w.g.rotation.z = .1 * Math.sin(t * 8); } },
    { say: 'And his skyscraper? A mouse knocks it over.', label: 'CRASH!', show: ['floor', 'wall', 'g', 'cubes', 'mouse'], sky: '#E8F0F5', lightAt: [0, 6, 3], lightDist: 18, shake: (t) => t > 1 && t < 1.3 ? .2 : 0,
      cam: { pos: [0, 2.6, 8], look: [0, 1.6, 0], fov: 52, to: { pos: [0, 2.6, 7.5], look: [0, 1.6, 0], fov: 50 } },
      update: (w, p, t) => { w.cubes.position.set(.6, 0, -.3); const hit = t > 1; w.mouse.position.set(4 - Math.min(t, 1) * 2.6, 0, -.3); w.mouse.rotation.y = Math.PI; w.cl.forEach((c, i) => { const q = hit ? Math.min(1, (t - 1) * 1.5) : 0; c.position.set(q * (i - 1) * 1.2 - q * .8, .35 + i * .7 - q * (i * .7), q * (i - 1) * .5); c.rotation.set(q * i, q * 2 * i, q * i); }); gy(w, -1.4, 0, .5, -.6, t); w.g.position.y = hit ? .2 * Math.abs(Math.sin(t * 10)) : 0; } },
    { say: 'Builder Gary: strong, tiny, or totally lost? Comment below.',
      quiz: { q: 'Builder Gary is…', options: ['Strong', 'Tiny', 'Totally lost'], answer: 'Real leafcutter ant colonies can hold millions of ants underground.' },
      show: ['floor', 'g'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

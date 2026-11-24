// Narrative 18: "What Would Happen If… (season 8)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a straw hat.

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
  w.floor = k.ground('#B9D98A', 0);
  w.wall = group(); box(30, 14, .3, mat('#CFE6F2'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  const straw = mat('#E8C55A', { rough: .9 });
  w.hat = group([.36, .5, 0], w.g); cyl(.3, .3, .02, straw, [0, 0, 0], w.hat, 20); cyl(.14, .16, .14, straw, [0, .07, 0], w.hat, 16); cyl(.165, .165, .03, mat('#E2453C'), [0, .03, 0], w.hat, 16);
  w.pot = group(); cyl(.9, .65, 1.2, mat('#C8643A'), [0, .6, 0], w.pot, 20); cyl(.85, .85, .05, mat('#5A3A1E'), [0, 1.18, 0], w.pot, 20); w.sprout = group([0, 1.2, 0], w.pot); cyl(.02, .02, .3, mat('#3FA34D'), [0, .15, 0], w.sprout, 6); for (const s of [-1, 1]) { const lf = ball(.08, mat('#5FBF5F'), [s * .08, .3, 0], w.sprout); lf.scale.set(1.4, .5, .8); }
  w.pea = ball(.45, mat('#7AC943', { rough: .5 }), [0, .45, 0]);
  w.seed = ball(.25, mat('#F5EBD0'), [0, 0, 0]); w.seed.scale.set(1.6, .6, 1);
  w.crowd = group(); for (let i = 0; i < 4; i++) { const a = gary(k, w.crowd, .9, null); a.position.set(-2.2 + i * .5 + (i > 1 ? 2.8 : 0), 0, -.8 + (i % 2) * .3); a.rotation.y = i > 1 ? -2.4 : -.7; }
  w.conf = group(); for (let i = 0; i < 12; i++) { const c = box(.06, .06, .01, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '319',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FARMER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A FARMER?'],
  title: 'What would happen if Gary the ant was a farmer?',
  description: 'His farm is one flower pot. His tractor is a pea. And harvest day? One sesame seed, and the whole colony cheers. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'farmer', 'funny', 'shorts'],
  sources: ['Quiz fact: leafcutter ants cut leaves to feed underground fungus gardens, and the fungus is what they eat (Encyclopaedia Britannica, "leafcutter ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a farmer?', show: ['floor', 'wall', 'g', 'hat'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); } },
    { say: 'His farm? One flower pot.', show: ['floor', 'wall', 'g', 'hat', 'pot'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 6.5], look: [0, 1.3, 0], fov: 48, to: { pos: [0, 2.2, 6], look: [0, 1.3, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, -.4 + Math.sin(t * 1.5) * .25, 1.2, .3, -1.4 + Math.sin(t * 1.5) * .6, t, true); w.sprout.rotation.z = .1 * Math.sin(t * 3); } },
    { say: 'His tractor? A pea.', show: ['floor', 'wall', 'g', 'hat', 'pea'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 7.5], look: [0, .9, 0], fov: 48, to: { pos: [0, 1.8, 7], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { const x = -1.5 + p * 1.4; w.pea.position.set(x + .95, .45, 0); w.pea.rotation.z = -x * 2.2; gy(w, x, 0, 0, 0, t, true); w.g.rotation.z = -.2; } },
    { say: 'And harvest day? One sesame seed.', label: 'HOORAY!', show: ['floor', 'wall', 'g', 'hat', 'seed', 'crowd', 'conf'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 1.8, 6], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.g.rotation.z = 0; const hop = .25 * Math.abs(Math.sin(t * 8)); gy(w, 0, hop, .4, -1.4, t); w.seed.position.set(.2, 1.15 + hop, .4); w.seed.rotation.z = .2 * Math.sin(t * 8); w.crowd.children.forEach((a, i) => a.position.y = .2 * Math.abs(Math.sin(t * 8 + i))); w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 12) % 1; c.position.set(-2 + (i * .37) % 4, 2.8 - q * 3, -.4 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); }); } },
    { say: 'Farmer Gary: hard working, tiny, or totally lost? Comment below.',
      quiz: { q: 'Farmer Gary is…', options: ['Hard working', 'Tiny', 'Totally lost'], answer: 'Real leafcutter ants farm: they grow fungus gardens to eat.' },
      show: ['floor', 'g', 'hat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

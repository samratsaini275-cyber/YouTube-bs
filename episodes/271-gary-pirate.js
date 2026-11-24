// Narrative 16: "What Would Happen If… (season 6)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a pirate hat and eye patch.

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
  w.grass = k.ground('#7FB069', 0);
  w.water = group(); const wm = cyl(4, 4, .04, mat('#4A90C8', { rough: .2 }), [0, .02, 0], w.water, 40); wm.scale.z = .7;
  w.g = gary(k, k.scene, 1.3, null);
  w.phat = group([.36, .52, 0], w.g); const hb = cyl(.28, .28, .05, mat('#1A1A1A'), [0, 0, 0], w.phat, 16); const ht = cyl(.16, .2, .18, mat('#1A1A1A'), [0, .1, 0], w.phat, 16); box(.08, .06, .01, mat('#FFFFFF'), [.17, .1, 0], w.phat).rotation.y = Math.PI / 2;
  w.patch = box(.02, .12, .12, mat('#111111'), [.56, .42, .11], w.g);
  w.leaf = group(); const lf = ball(1, mat('#3FA34D'), [0, 0, 0], w.leaf); lf.scale.set(1.4, .1, .6); const mast = cyl(.03, .03, 1.2, mat('#7A4A22'), [0, .6, 0], w.leaf, 6); const sail = box(.02, .6, .7, mat('#F5F0E0'), [0, .75, 0], w.leaf); sail.rotation.y = Math.PI / 2; w.flag = box(.3, .18, .01, mat('#111111'), [.15, 1.15, 0], w.leaf);
  w.crumb = group(); box(.5, .3, .4, mat('#D9A35B'), [0, .15, 0], w.crumb); w.shine = group(); for (let i = 0; i < 6; i++) { const s = ball(.04, mat('#FFE07A', { glow: 1 }), [0, 0, 0], w.shine); s.userData.i = i; s.castShadow = false; }
  w.fly = group(); ball(.15, mat('#2A6B3A'), [0, 0, 0], w.fly); for (const z of [-1, 1]) { const wg = ball(.12, mat('#DDEEFF', { opacity: .6 }), [0, .1, z * .14], w.fly); wg.scale.set(1, .2, .7); wg.userData.z = z; } for (const z of [-1, 1]) ball(.05, mat('#E2453C'), [.12, .04, z * .06], w.fly);
  w.drop = ball(.9, mat('#9FD3EE', { opacity: .75, rough: .1 }), [0, 0, 0], k.scene);
  w.map = group(); box(.9, .02, .7, mat('#E8D3A0'), [0, .01, 0], w.map); const x1 = box(.25, .025, .04, mat('#E2453C'), [.2, .02, .1], w.map); x1.rotation.y = .8; const x2 = box(.25, .025, .04, mat('#E2453C'), [.2, .02, .1], w.map); x2.rotation.y = -.8; for (let i = 0; i < 4; i++) box(.06, .025, .02, mat('#7A4A22'), [-.3 + i * .12, .02, -.1 + i * .05], w.map);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const buzz = (w, t) => w.fly.children.forEach(c => { if (c.userData.z) c.rotation.x = c.userData.z * .8 * Math.sin(t * 50); });

export default {
  id: '271',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PIRATE GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A PIRATE?'],
  title: 'What would happen if Gary the ant was a pirate?',
  description: 'His ship is a leaf. His ocean is a puddle. His parrot is a fly. And the treasure? One crumb. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'pirate', 'funny', 'shorts'],
  sources: ['Quiz fact: fire ants can link their bodies together to make living rafts that float on floodwater (Mlot, Tovey and Hu, PNAS, 2011).'],
  setup,
  scenes: [
    { say: 'What if Gary was a pirate?', show: ['grass', 'g', 'phat', 'patch'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
    { say: 'His ship? A leaf. His ocean? A puddle.', show: ['grass', 'water', 'leaf', 'g', 'phat', 'patch'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2.6, 7], look: [0, .9, 0], fov: 50, to: { pos: [0, 2.6, 6.4], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { const y = .12 + .05 * Math.sin(t * 2.5); w.leaf.position.set(.6 - p * 1.2, y, .3); w.leaf.rotation.set(.06 * Math.sin(t * 2), 0, .06 * Math.sin(t * 2.6)); gy(w, w.leaf.position.x - .5, y + .1, .3, -1.2, t); w.g.rotation.z = w.leaf.rotation.z; w.flag.rotation.y = .3 * Math.sin(t * 6); } },
    { say: 'His parrot? A fly.', show: ['grass', 'g', 'phat', 'patch', 'fly'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.2, 1.3, 5.2], look: [0, .72, 0], fov: 46, to: { pos: [1.1, 1.3, 4.7], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .3, -1.3, t); w.fly.position.set(-.4 + .05 * Math.sin(t * 9), 1.05 + .04 * Math.sin(t * 13), .3); w.fly.rotation.y = -1.2; buzz(w, t); w.g.rotation.z = .05 * Math.sin(t * 4); } },
    { say: 'A storm? One raindrop.', label: '*SPLASH*', show: ['grass', 'water', 'leaf', 'g', 'phat', 'patch', 'drop'], sky: '#6E7A88', lightAt: [0, 6, 3], lightDist: 18, shake: (t) => t > 1.1 && t < 1.5 ? .25 : 0,
      cam: { pos: [0, 2.6, 7], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 2.6, 6.4], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { const hit = t > 1.1; w.drop.position.set(0, hit ? -2 : 6 - t * 4.6, .3); w.drop.scale.set(1, 1.2, 1); const y = .12 + (hit ? .3 * Math.abs(Math.sin(t * 9)) * Math.max(0, 2 - t) : 0); w.leaf.position.set(0, y, .3); w.leaf.rotation.set(0, 0, hit ? .3 * Math.sin(t * 8) * Math.max(0, 2 - t) : 0); gy(w, -.5, y + .1, .3, -1.2, t); w.g.rotation.z = w.leaf.rotation.z; } },
    { say: 'And the treasure? One crumb.', label: '*RICH*', show: ['grass', 'g', 'phat', 'patch', 'crumb', 'shine', 'map'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.2, 1.4, 5.4], look: [.2, .7, 0], fov: 46, to: { pos: [1.1, 1.4, 4.9], look: [.2, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.crumb.position.set(.8, 0, 0); w.map.position.set(-.2, 0, .9); gy(w, -.4, .3 * Math.abs(Math.sin(t * 6)), .3, -1, t); w.shine.children.forEach(s => { const i = s.userData.i, a = i / 6 * Math.PI * 2 + t * 1.5; s.position.set(.8 + Math.cos(a) * .45, .35 + Math.sin(a * 2) * .15, Math.sin(a) * .45); }); } },
    { say: 'Pirate Gary: captain, cool, or a total landlubber? Comment below.',
      quiz: { q: 'Pirate Gary is…', options: ['Captain', 'Cool', 'Total landlubber'], answer: 'Real fire ants link up into living rafts that float.' },
      show: ['grass', 'g', 'phat', 'patch'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

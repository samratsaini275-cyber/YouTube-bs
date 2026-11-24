// Narrative 17: "What Would Happen If… (season 7)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a red lifeguard cap.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.sand = k.ground('#EAD49C', 0);
  w.sea = box(40, .1, 14, mat('#4FA9D8', { rough: .3 }), [0, .02, -12]);
  w.g = gary(k, k.scene, 1.3, '#E8352B');
  w.whistle = ball(.05, mat('#FFD23F', { metal: .5 }), [.52, .3, .1], w.g);
  w.tower = group(); const st = mat('#D9A35C'); box(.3, 2.4, .08, st, [0, 1.2, 0], w.tower); box(1, .06, .5, st, [0, 2.4, 0], w.tower); w.flag = box(.4, .25, .02, mat('#E8352B'), [.2, 3, 0], w.tower); seg(k, [0, 2.4, 0], [0, 3.2, 0], mat('#666666'), w.tower, .02);
  w.puddle = cyl(2.2, 2.2, .04, mat('#5DB7E6', { rough: .2 }), [0, .03, 0], undefined, 32);
  w.leaf = group(); const lf = ball(.5, mat('#4CAF50'), [0, 0, 0], w.leaf); lf.scale.set(1.4, .12, .7);
  w.wave = group(); for (let i = 0; i < 7; i++) { const b = ball(1.1, mat(i % 2 ? '#7CC8EE' : '#4FA9D8'), [i * 1.3 - 3.9, .6, 0], w.wave); b.scale.y = 1.4; } for (let i = 0; i < 7; i++) ball(.45, mat('#FFFFFF'), [i * 1.3 - 3.9, 2, .3], w.wave);
  w.crumb = group(); const cm = mat('#C98B3E'); box(.4, .3, .35, cm, [0, 0, 0], w.crumb).rotation.set(.3, .5, .2); ball(.12, cm, [.2, .15, .1], w.crumb);
  w.drips = group(); for (let i = 0; i < 8; i++) { const d = ball(.07, mat('#7CC8EE'), [0, 0, 0], w.drips); d.userData.i = i; d.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '299',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LIFEGUARD GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A LIFEGUARD?'],
  title: 'What would happen if Gary the ant was a lifeguard?',
  description: 'His tower is a popsicle stick. His pool is a puddle. A wave means run. And the big rescue? A crumb. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'lifeguard', 'funny', 'shorts'],
  sources: ['Quiz fact: fire ants link their bodies together into floating rafts to survive floods (Mlot, Tovey & Hu, PNAS 2011, "Fire ants self-assemble into waterproof rafts to survive floods").'],
  setup,
  scenes: [
    { say: 'What if Gary was a lifeguard?', show: ['sand', 'sea', 'g', 'whistle'], sky: '#9FD6F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .6, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); } },
    { say: 'His tower? A popsicle stick.', show: ['sand', 'sea', 'g', 'whistle', 'tower'], sky: '#9FD6F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1, 2.4, 6], look: [0, 2.1, 0], fov: 48, to: { pos: [1, 2.4, 5.4], look: [0, 2.1, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, 0, 2.43, 0, -1.4, t); w.tower.rotation.z = .04 * Math.sin(t * 3); w.flag.rotation.y = .3 * Math.sin(t * 6); } },
    { say: 'His pool? A puddle.', show: ['sand', 'g', 'whistle', 'puddle', 'leaf'], sky: '#9FD6F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 3, 6], look: [0, .6, 0], fov: 50, to: { pos: [0, 2.8, 5.4], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -.5 + .2 * Math.sin(t * 2), 0, 1.8, -1.2, t, true); w.leaf.position.set(.4 + .3 * Math.sin(t), .07, -.2); w.leaf.rotation.y = t * .4; } },
    { say: 'A wave? Run!', label: '*SPLASH*', show: ['sand', 'sea', 'g', 'whistle', 'wave'], sky: '#9FD6F5', lightAt: [0, 6, 3], lightDist: 18, shake: () => .08,
      cam: { pos: [4, 2, 7], look: [0, 1.2, 0], fov: 54, to: { pos: [4, 2, 6.4], look: [0, 1.2, 0], fov: 52 } },
      update: (w, p, t) => { gy(w, -2 + p * 3, 0, .8, 0, t, true); w.wave.position.set(0, 0, -6 + p * 6); w.wave.rotation.x = .1 * Math.sin(t * 4); } },
    { say: 'The big rescue? A crumb.', show: ['sand', 'g', 'whistle', 'puddle', 'crumb', 'drips'], sky: '#9FD6F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.2, 1.4, 4.6], look: [0, .7, 0], fov: 46, to: { pos: [1.1, 1.4, 4.1], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => { const q = Math.min(1, p * 1.8); w.puddle.position.set(-2.6, 0, -.6); gy(w, -.9 + q * .9, 0, .2, -1.4 + Math.PI, t, q < 1); w.g.rotation.y = q < 1 ? Math.PI : -1.4; w.crumb.position.set(-1.3 + q * 1.8, .25 + (q < 1 ? 0 : .1 * Math.sin(t * 6)), .2); w.drips.children.forEach(d => { const i = d.userData.i, r = ((t * 1.5 + i / 8) % 1); d.position.set(w.crumb.position.x + Math.cos(i) * .2, .5 - r * .5, .2 + Math.sin(i) * .2); d.visible = q >= 1; }); } },
    { say: 'Lifeguard Gary: brave, tiny, or totally soaked? Comment below.',
      quiz: { q: 'Lifeguard Gary is…', options: ['Brave', 'Tiny', 'Totally soaked'], answer: 'Fire ants link together into floating rafts to survive floods.' },
      show: ['sand', 'g', 'whistle'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

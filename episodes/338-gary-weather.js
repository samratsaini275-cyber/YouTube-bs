// Narrative 19: "What Would Happen If… (season 9)". Gary premise (every fifth episode: 328, 333, 338, 343).
// Hook: the premise as a question under 2 s; first frame shows Gary in a tiny bow tie next to a weather map.

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
  w.floor = k.ground('#9FBF6A', 0);
  w.wall = group(); box(30, 14, .3, mat('#CFE6F2'), [0, 7, -3], w.wall);
  w.map = group(); box(3.2, 2, .08, mat('#4FB3E8'), [0, 1.6, -2.8], w.map); for (let i = 0; i < 3; i++) { const c = ball(.25, mat('#FFFFFF'), [-.8 + i * .8, 1.9, -2.72], w.map); c.scale.set(1.4, .8, .3); } w.sunIcon = ball(.3, mat('#FFE45C', { glow: .6 }), [1, 1.2, -2.72], w.map);
  w.g = gary(k, k.scene, 1.3, null);
  w.tie = group([.62, .26, 0], w.g); for (const z of [-1, 1]) { const t = cone(.05, .1, mat('#E2453C'), [0, 0, z * .05], w.tie, 6); t.rotation.x = z * Math.PI / 2; }
  w.drop = group(); const d = ball(.9, mat('#4FB3E8', { glow: .2 }), [0, 0, 0], w.drop); d.scale.y = 1.2; cone(.6, .9, mat('#4FB3E8', { glow: .2 }), [0, 1.1, 0], w.drop, 16); w.drop.children.forEach(c => { c.material.transparent = true; c.material.opacity = .85; });
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.12, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.gust = group(); for (let i = 0; i < 6; i++) { const l = box(1.2, .05, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gust); l.userData.i = i; l.castShadow = false; }
  w.leaf = group(); const lf = ball(.4, mat('#E8A23A'), [0, 0, 0], w.leaf); lf.scale.set(1.5, .15, 1);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '338',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'WEATHER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'DID THE WEATHER?'],
  title: 'What would happen if Gary the ant did the weather forecast?',
  description: 'Sunny with a chance of crumbs. One raindrop is a tidal wave. And a light breeze? Off he goes. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'weather', 'funny', 'shorts'],
  sources: ['Quiz fact: ants have no lungs; air reaches their body through tiny holes along their sides called spiracles (Encyclopaedia Britannica, "insect: respiratory system").'],
  setup,
  scenes: [
    { say: 'What if Gary did the weather?', show: ['floor', 'wall', 'map', 'g', 'tie'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'Today? Sunny, with a chance of crumbs.', show: ['floor', 'wall', 'map', 'g', 'tie'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 5.5], look: [0, 1.3, -1.5], fov: 50, to: { pos: [0, 1.8, 5], look: [0, 1.3, -1.5], fov: 48 } },
      update: (w, p, t) => { gy(w, -1.1, 0, -1.6, -.4, t); w.sunIcon.scale.setScalar(1 + .15 * Math.sin(t * 4)); w.g.rotation.z = .08 * Math.sin(t * 6); } },
    { say: 'One raindrop? A tidal wave.', label: '*SPLOOSH*', show: ['floor', 'wall', 'g', 'tie', 'drop', 'splash'], sky: '#8AA8C0', lightAt: [0, 6, 3], lightDist: 16, shake: (t) => t > .9 && t < 1.2 ? .2 : 0,
      cam: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 5.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { const fall = Math.min(1, t / .9); w.drop.position.set(.3, 6 - fall * 5.2, 0); w.drop.visible = fall < 1; const hit = fall >= 1; gy(w, hit ? -.4 - Math.min(1, (t - .9)) * .8 : -.4, 0, .3, hit ? Math.PI : -1.4, t, hit); w.splash.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, r = hit ? (t - .9) * 3 : 0; s.position.set(.3 + Math.cos(a) * r, .2 + Math.sin(Math.min(1, r / 2) * Math.PI) * 1.2, Math.sin(a) * r * .6); s.visible = hit && r < 2.5; }); } },
    { say: 'And a light breeze? Off he goes.', label: 'WHOOSH', show: ['floor', 'wall', 'g', 'tie', 'gust', 'leaf'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 7], look: [0, 1.8, 0], fov: 52, to: { pos: [0, 2.2, 6.5], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { const q = Math.max(0, p - .25); w.leaf.position.set(-1.5 + q * 3, .1 + q * 3, 0); w.leaf.rotation.set(Math.sin(t * 6) * .3, 0, Math.sin(t * 4) * .3); gy(w, -1.5 + q * 3, .2 + q * 3, 0, 0, t, true); w.g.rotation.z = .3 * Math.sin(t * 8); w.gust.children.forEach(l => { const i = l.userData.i, r = (t * 1.5 + i / 6) % 1; l.position.set(-3 + r * 6, .6 + (i % 3) * .8 + q * 2, -.5); }); } },
    { say: 'Weather Gary: smart, tiny, or totally lost? Comment below.',
      quiz: { q: 'Weather Gary is…', options: ['Smart', 'Tiny', 'Totally lost'], answer: 'Real ants have no lungs; they breathe through tiny holes in their sides.' },
      show: ['floor', 'g', 'tie'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

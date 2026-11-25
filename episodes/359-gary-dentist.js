// Narrative 20: "What Would Happen If… (season 10)". Gary premise (every fifth episode: 349, 354, 359, 364).
// Hook: the premise as a question under 2 s; first frame shows Gary with a tiny dentist mirror.

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
  w.floor = k.ground('#DDEFF2', 0);
  w.wall = group(); box(30, 14, .3, mat('#F2FAFB'), [0, 7, -3], w.wall); const cr = box(1.8, 1.8, .05, mat('#FFFFFF'), [2.6, 4, -2.8], w.wall); const cx1 = box(1.2, .35, .06, mat('#E2453C'), [2.6, 4, -2.76], w.wall); const cx2 = box(.35, 1.2, .06, mat('#E2453C'), [2.6, 4, -2.76], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.mirror = group([.75, .5, .15], w.g); const st = cyl(.015, .015, .45, mat('#C9D1D9', { metal: .8 }), [0, .2, 0], w.mirror, 6); st.rotation.z = -.6; const mr = cyl(.08, .08, .015, mat('#E8F4FF', { glow: .5, metal: .6 }), [.18, .38, 0], w.mirror, 12); mr.rotation.x = Math.PI / 2;
  w.croc = group(); const grn = mat('#4E8F3A', { rough: .7 }), lgt = mat('#8CC06A');
  const cb = box(4, 1, 1.6, grn, [-1.5, .6, 0], w.croc); for (let i = 0; i < 6; i++) { const r = box(.3, .2, 1.2, mat('#3C7A2C'), [-3.2 + i * .65, 1.2, 0], w.croc); }
  const tl = box(2.4, .6, 1, grn, [-4.6, .45, 0], w.croc); tl.rotation.y = .2;
  w.lowJaw = group([.5, .45, 0], w.croc); box(2.6, .3, 1.4, grn, [1.3, 0, 0], w.lowJaw); box(2.4, .05, 1.1, mat('#E87A8A'), [1.25, .16, 0], w.lowJaw);
  w.upJaw = group([.5, .75, 0], w.croc); box(2.6, .4, 1.4, grn, [1.3, .1, 0], w.upJaw); for (const z of [-1, 1]) { ball(.22, lgt, [.15, .45, z * .45], w.upJaw); ball(.11, mat('#111111'), [.25, .55, z * .45], w.upJaw); }
  for (let i = 0; i < 6; i++) for (const z of [-1, 1]) { const tt = cone(.08, .25, mat('#FFFFFF'), [.4 + i * .38, -.18, z * .6], w.upJaw, 6); tt.rotation.x = Math.PI; cone(.07, .2, mat('#FFFFFF'), [.5 + i * .38, .25, z * .6], w.lowJaw, 6); }
  w.legsC = []; for (const x of [-2.8, -.4]) for (const z of [-1, 1]) w.legsC.push(box(.35, .5, .35, grn, [x, .2, z * .9], w.croc));
  w.crumb = group(); const cm = ball(.15, mat('#C98B3E'), [0, .1, 0], w.crumb); cm.scale.set(1.3, .8, 1);
  w.stars = group(); for (let i = 0; i < 6; i++) { const s = ball(.06, mat('#FFE14A', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const jaw = (w, a) => { w.upJaw.rotation.z = a; };

export default {
  id: '359',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DENTIST GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A DENTIST?'],
  title: 'What would happen if Gary the ant was a dentist?',
  description: 'His first patient is a crocodile. He says "open wide"... and it closes. And the payment? One crumb. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'dentist', 'funny', 'shorts'],
  sources: ['Quiz fact: trap-jaw ants snap their jaws shut at 35 to 64 metres per second, among the fastest movements recorded in animals (Patek et al., "The fastest animal mandibles: a test of the power amplification hypothesis", PNAS, 2006).'],
  setup,
  scenes: [
    { say: 'What if Gary was a dentist?', show: ['floor', 'wall', 'g', 'mirror'], sky: '#F2FAFB', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .72, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); w.mirror.rotation.z = .2 * Math.sin(t * 4); } },
    { say: 'His first patient? A crocodile.', label: 'GULP', show: ['floor', 'wall', 'g', 'mirror', 'croc'], sky: '#F2FAFB', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [3.2, 2.4, 7.5], look: [1.8, 1, 0], fov: 50, to: { pos: [3.2, 2.4, 7], look: [1.8, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.croc.position.set(-.5, 0, -.6); w.croc.rotation.y = -.4; jaw(w, .15 + .05 * Math.sin(t * 2)); gy(w, 2.7, 0, 1.2, Math.PI - .5, t); w.g.rotation.z = p > .5 ? .2 * Math.sin(t * 30) : 0; } },
    { say: 'He says, open wide. And it closes.', label: 'CHOMP!', show: ['floor', 'wall', 'g', 'mirror', 'croc'], sky: '#F2FAFB', lightAt: [0, 6, 3], lightDist: 16, shake: (t) => t > 1.5 && t < 1.8 ? .1 : 0,
      cam: { pos: [3.2, 2.4, 7], look: [1.8, 1, 0], fov: 50, to: { pos: [3.2, 2.4, 6.5], look: [1.8, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.croc.position.set(-.5, 0, -.6); w.croc.rotation.y = -.4; const open = t < 1.5; jaw(w, open ? Math.min(.9, t * 1.2) : 0); const walk = Math.min(1, t / 1.3); gy(w, 3.2 - walk * 1.5, .1 * walk, 1.2 - walk * .8, Math.PI - .4, t, t < 1.3); w.g.visible = open; } },
    { say: 'And the payment? One crumb.', label: 'THANKS…?', show: ['floor', 'wall', 'g', 'mirror', 'croc', 'crumb', 'stars'], sky: '#F2FAFB', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [3.2, 2.4, 7], look: [1.8, 1, 0], fov: 50, to: { pos: [3.2, 2.4, 6.5], look: [1.8, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.croc.position.set(-.5, 0, -.6); w.croc.rotation.y = -.4; jaw(w, t < .5 ? t * 1.6 : .8); const out = Math.min(1, t / .6); gy(w, 1.6 + out * 1.1, 0, .6 + out * .6, -1.1, t, t < .6); w.g.rotation.z = .1 * Math.sin(t * 8); w.crumb.position.set(2.2, 0, 1.6); w.stars.children.forEach(s => { const i = s.userData.i, a = t * 4 + i; s.position.set(3 + Math.cos(a) * .4, 1.1 + Math.sin(a * 2) * .05, 1.2 + Math.sin(a) * .4); }); } },
    { say: 'Is Gary a good dentist? Comment below.',
      quiz: { q: 'Dentist Gary is…', options: ['Brave', 'Tiny', 'Totally lost'], answer: 'Real trap-jaw ants snap their jaws faster than almost any animal.' },
      show: ['floor', 'g', 'mirror'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};

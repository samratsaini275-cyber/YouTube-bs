// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy story (Gary and his bridge are fictional);
// the one real fact (army ants build bridges from their own bodies) is sourced below.
const LIVE = [300, 0, 0];   // the real living ant bridge, far from the main set
const DECK_Y = 6;

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}

function ant(k, parent, pos, hat = false) {
  const { mat, ball, group } = k, g = group(pos, parent), black = mat('#141414', { rough: .4 });
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const s of [-1, 1]) {   // eyes
    ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, s * .11], g);
  }
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const s of [-1, 1]) {
    const leg = seg(k, [x, .3, 0], [x + .05, 0, s * .38], black, g, .03); g.userData.legs.push(leg);
  }
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#FFC21F'), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.grass = k.ground('#6FAF5A', 0);
  // the puddle
  w.puddle = cyl(18, 18, .2, mat('#4FA9E0', { metal: .3, rough: .1 }), [0, .06, 0], k.scene, 64); w.puddle.scale.set(1.25, 1, .7); w.puddle.castShadow = false;
  // the bridge
  w.bridge = group();
  const steel = mat('#E2453C', { metal: .4, rough: .35 }), cable = mat('#F2F2F2', { metal: .7 });
  box(64, .6, 4, mat('#9AA3AE', { rough: .8 }), [0, DECK_Y, 0], w.bridge);
  for (const x of [-15, 15]) {
    for (const z of [-2.4, 2.4]) box(.9, 20, .9, steel, [x, 10, z], w.bridge);
    box(.9, .9, 5.7, steel, [x, 19.5, 0], w.bridge); box(.9, .9, 5.7, steel, [x, 13, 0], w.bridge);
  }
  // main cables (sagging) and hangers
  const cy = x => Math.abs(x) <= 15 ? DECK_Y + 2 + 11.5 * (x / 15) ** 2 : 19.5 - (Math.abs(x) - 15) * (12.5 / 17);
  for (const z of [-2.4, 2.4]) {
    for (let x = -32; x < 32; x += 2) seg(k, [x, cy(x), z], [x + 2, cy(x + 2), z], cable, w.bridge);
    for (let x = -30; x <= 30; x += 2) if (cy(x) - DECK_Y > 1) seg(k, [x, DECK_Y + .3, z], [x, cy(x), z], cable, w.bridge, .05);
  }
  // toll booth with a barrier arm
  w.booth = group([-25, DECK_Y + .3, -3.4], w.bridge);
  box(2, 3, 2, mat('#FFFFFF'), [0, 1.5, 0], w.booth); box(2.3, .3, 2.3, mat('#E2453C'), [0, 3.15, 0], w.booth);
  box(1.4, 1, .1, mat('#1E2A38', { glow: .2 }), [0, 1.9, 1.01], w.booth);
  w.arm = group([1, 1, 1.4], w.booth);
  box(.25, .25, 3.6, mat('#FFFFFF'), [0, 0, 1.8], w.arm); for (let i = 0; i < 4; i++) box(.27, .27, .4, mat('#E2453C'), [0, 0, .5 + i * .9], w.arm);
  // opening-day ribbon
  w.ribbon = group([-20, DECK_Y + .3, 0], w.bridge);
  for (const z of [-1.8, 1.8]) cyl(.08, .08, 1.6, mat('#D4AF37', { metal: .6 }), [0, .8, z], w.ribbon, 10);
  w.ribL = box(.06, .25, 1.8, mat('#E0161E'), [0, 1.3, -.9], w.ribbon); w.ribR = box(.06, .25, 1.8, mat('#E0161E'), [0, 1.3, .9], w.ribbon);
  w.confetti = group([-20, DECK_Y, 0]);
  const cols = ['#FF4D6D', '#FFD60A', '#3A86FF', '#06D6A0', '#FB5607'];
  for (let i = 0; i < 70; i++) { const c = box(.18, .02, .12, mat(cols[i % 5], { glow: .4 }), [0, 0, 0], w.confetti); c.castShadow = false; c.userData = { x: ((i * 37) % 13) - 6.5, z: ((i * 23) % 9) - 4.5, h: 6 + (i % 7), sp: .6 + (i % 5) * .15 }; }
  // Gary
  w.gary = ant(k, k.scene, [-28, DECK_Y + .3, 0], true);
  // real living ant bridge
  w.live = group(LIVE);
  box(14, 8, 10, mat('#7A6A58', { rough: 1, flat: true }), [-12, 4, 0], w.live); box(14, 8, 10, mat('#7A6A58', { rough: 1, flat: true }), [12, 4, 0], w.live);
  box(60, .2, 30, mat('#3F5E3A'), [0, -.1, 0], w.live);
  w.chain = [];
  for (let i = 0; i < 12; i++) { const x = -5 + i * (10 / 11); const a = ant(k, w.live, [x, 8 - Math.sin(i / 11 * Math.PI) * 1.4, ((i % 3) - 1) * .5]); a.scale.setScalar(1.3); w.chain.push(a); }
  w.walker = ant(k, w.live, [-9, 8.05, 0]); w.walker.scale.setScalar(1.3);
  return w;
}

function walk(g, t, speed = 1) {
  g.userData.legs.forEach((l, i) => { l.rotation.x = (i % 2 ? 1 : -1) * .35 * Math.sin(t * 14 * speed); });
}
function confetti(w, t) {
  w.confetti.children.forEach(c => { const d = c.userData; c.position.set(d.x + .3 * Math.sin(t * 3 + d.h), Math.max(.4, d.h - t * d.sp * 3), d.z); c.rotation.set(t * 5 + d.h, t * 3, 0); });
}
const SET = ['grass', 'puddle', 'bridge', 'gary'];

export default {
  id: '032',
  style: '3d',
  voice: 'v3',
  case: 'THE ANT BRIDGE',
  year: 'ENGINEERING NONSENSE',
  hook: ['A BRIDGE.', 'FOR ONE ANT.'],
  title: 'Engineers built a whole bridge for one ant',
  description: 'One ant. One puddle. A team of engineers who did not know when to stop. (A made-up story, with one real fact at the end.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'bridge', 'ants', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant, his bridge, the toll booth and the opening day are made up.',
    'Reid, C. R. et al. (2015), "Army ants dynamically adjust living bridges in response to a cost–benefit trade-off", PNAS 112(49):15113–15118, https://doi.org/10.1073/pnas.1512241112 (abstract on PubMed, https://pubmed.ncbi.nlm.nih.gov/26598673/, retrieved November 2026): "Army ants (Eciton) form collective assemblages out of their own bodies"; they build bridges of linked individuals to span gaps.',
  ],
  setup,
  scenes: [
    {
      say: 'This is a suspension bridge. It was built for exactly one ant. His name is Gary.',
      show: SET, sky: '#8EC9F0', lightAt: [0, 6, 0], lightDist: 60,
      cam: { pos: [40, 30, 70], look: [0, 10, 0], fov: 46, to: { pos: [-24.6, 7.8, 1.4], look: [-28, 6.7, 0], fov: 32 } },
      update: (w, p, t) => { w.gary.position.x = -28; w.gary.rotation.y = 0; walk(w.gary, 0); },
    },
    {
      say: 'Gary needed to cross a puddle. The engineers looked at the puddle. And they overthought it.',
      show: SET, sky: '#A7D8F5', lightAt: [0, 6, 0], lightDist: 70,
      cam: { pos: [0, 80, 30], look: [0, 0, 0], fov: 50, to: { pos: [0, 66, 22], look: [0, 0, 0], fov: 50 } },
      update: (w, p, t) => { w.gary.position.x = -28; walk(w.gary, 0); },
    },
    {
      say: 'Two towers. Steel cables. A toll booth. Gary does not have money.',
      show: SET, sky: '#FFD9A8', lightAt: [-20, 6, 0], lightDist: 40,
      cam: { pos: [-15, 26, 18], look: [-15, 16, 0], fov: 44, to: { pos: [-21, 9, 8], look: [-25.5, 7.3, -.8], fov: 40 } },
      update: (w, p, t, k) => { w.gary.position.x = -28 + Math.min(t, 2.5) * .6; walk(w.gary, t, t < 2.5 ? 1 : 0); w.arm.rotation.x = -k.h.win(t, 3, 3.6) * 1.3; },
    },
    {
      say: 'Opening day. One ribbon. A crowd of zero.',
      show: [...SET, 'confetti'], sky: '#FFE7F0', lightAt: [-20, 6, 0], lightDist: 30,
      cam: { pos: [-12, 9, 7], look: [-20, 7, 0], fov: 38, to: { pos: [-13, 8.5, 5], look: [-20, 7, 0], fov: 34 } },
      update: (w, p, t, k) => { w.gary.position.x = -22.5 + Math.min(t, 1.2) * 1.8; walk(w.gary, t, t < 1.2 ? 1 : 0); const cut = t > 1.2 ? 1 : 0; w.ribL.rotation.x = -cut * 1.2; w.ribR.rotation.x = cut * 1.2; confetti(w, t); },
    },
    {
      say: 'Gary walks out to the middle. Looks down. And walks back.',
      show: SET, sky: '#9ED2F3', lightAt: [-6, 6, 0], lightDist: 40,
      cam: { pos: [-6, 12, 16], look: [-8, 6.5, 0], fov: 42, to: { pos: [-6, 10, 12], look: [-8, 6.5, 0], fov: 40 } },
      update: (w, p, t) => { const out = Math.min(t, 2.6), back = Math.max(0, t - 3.4); w.gary.position.x = -18 + out * 4.2 - back * 4.2; w.gary.rotation.y = t > 3.2 ? Math.PI : 0; w.gary.rotation.z = t > 2.6 && t < 3.2 ? -.4 : 0; walk(w.gary, t, (t < 2.6 || t > 3.4) ? 1 : 0); },
    },
    {
      say: 'Real fact: army ants build bridges out of their own bodies. Gary could have just called his friends.',
      show: ['live'], sky: '#2E5A3A', lightAt: [300, 8, 0], lightDist: 30,
      cam: { pos: [300, 16, 38], look: [300, 6, 0], fov: 44, to: { pos: [302, 13, 30], look: [300, 6.5, 0], fov: 42 } },
      update: (w, p, t) => { w.chain.forEach((a, i) => walk(a, t + i, .3)); w.walker.position.x = -9 + Math.min(t * 2.4, 18); const wx = w.walker.position.x; w.walker.position.y = Math.abs(wx) < 5 ? 8.5 - Math.sin((wx + 5) / 10 * Math.PI) * 1.4 : 8.05; walk(w.walker, t); },
    },
    {
      say: 'Quick question. What should the toll be? Option A, one crumb. Option B, two crumbs. Or option C, Gary rides free forever. Comment your answer.',
      quiz: { q: 'What should the toll on Gary\'s bridge be?', options: ['One crumb', 'Two crumbs', 'Gary rides free forever'], answer: 'No wrong answers here; it is a made-up bridge. (Gary votes C.)' },
      show: SET, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 70,
      cam: { pos: [30, 40, 70], look: [0, -14, 0], fov: 46, to: { pos: [-30, 40, 70], look: [0, -14, 0] } },
      update: (w, p, t) => { w.gary.position.x = -20; w.gary.rotation.set(0, 0, 0); walk(w.gary, 0); },
    },
  ],
};

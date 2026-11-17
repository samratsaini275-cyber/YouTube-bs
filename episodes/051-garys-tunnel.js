// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch, a callback to episode 032:
// Gary, his bridge and his tunnel are all fictional.
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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#6FAF5A', 0);
  w.puddle = cyl(18, 18, .2, mat('#4FA9E0', { metal: .3, rough: .1 }), [0, .06, 0], k.scene, 64); w.puddle.scale.set(1.25, 1, .7); w.puddle.castShadow = false;
  w.mud = cyl(18, 18, .1, mat('#8C6B4A', { rough: 1 }), [0, .03, 0], k.scene, 64); w.mud.scale.set(1.25, 1, .7); w.mud.castShadow = false;
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
  // the tunnel: two portals either side of the puddle, joined underground
  w.tunnel = group();
  for (const z of [-16, 16]) {
    const p = group([0, 0, z], w.tunnel);
    box(9, 6, 2, mat('#9AA3AE', { rough: .9 }), [0, 3, 0], p);
    const hole = cyl(2.6, 2.6, 2.2, mat('#151515'), [0, 2.2, 0], p, 32); hole.rotation.x = Math.PI / 2;
    box(5.2, 2.2, 2.2, mat('#151515'), [0, 1.1, 0], p);
    box(9.4, .8, 2.4, mat('#FFD21F'), [0, 6.2, 0], p);
    for (const x of [-5.5, 5.5]) cone(.6, 1.6, mat('#FF7A1F'), [x, .8, z < 0 ? -2 : 2], w.tunnel, 12);
  }
  // a crane for the long build
  w.crane = group([12, 0, -14]);
  box(1.2, 24, 1.2, mat('#FFD21F'), [0, 12, 0], w.crane);
  w.jib = group([0, 24, 0], w.crane); box(20, .8, .8, mat('#FFD21F'), [-6, 0, 0], w.jib);
  const hook = cyl(.05, .05, 8, mat('#333333'), [-12, -4, 0], w.jib, 6); hook.castShadow = false;
  w.sun = ball(3, mat('#FFE45C', { glow: 2 }), [0, 50, -60]); w.sun.castShadow = false;
  w.gary = ant(k, k.scene, [-20, DECK_Y + .3, 0], true);
  return w;
}

function walk(g, t, speed = 1) { g.userData.legs.forEach((l, i) => { l.rotation.x = (i % 2 ? 1 : -1) * .35 * Math.sin(t * 14 * speed); }); }
function dry(w, d) { w.puddle.scale.set(1.25 * (1 - d) + .001, 1, .7 * (1 - d) + .001); w.puddle.visible = d < .99; }
const SET = ['grass', 'puddle', 'mud', 'bridge', 'tunnel', 'gary'];

export default {
  id: '051',
  style: '3d',
  voice: 'v3',
  case: 'GARY\'S TUNNEL',
  year: 'ENGINEERING NONSENSE',
  hook: ['GARY IS BACK.', 'NOW WITH A TUNNEL.'],
  title: 'Engineers built Gary the ant a tunnel too',
  description: 'The ant with his own bridge got an upgrade. It took all summer. Summer had other plans. (Gary is made up.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'tunnel', 'ants', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (from episode 032), his tunnel and the dried-up puddle are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Remember Gary? The ant with his own bridge?',
      show: SET, sky: '#8EC9F0', lightAt: [0, 6, 0], lightDist: 60,
      cam: { pos: [40, 26, 66], look: [0, 8, 0], fov: 46, to: { pos: [-14, 9, 8], look: [-20, 6.6, 0], fov: 32 } },
      update: (w, p, t) => { dry(w, 0); w.gary.position.set(-20, DECK_Y + .3, 0); w.gary.rotation.y = 0; walk(w.gary, t, .4); },
    },
    {
      say: 'Engineers also built him a tunnel. Under the puddle.',
      show: [...SET, 'crane'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 50,
      cam: { pos: [22, 12, -40], look: [0, 3, -16], fov: 46, to: { pos: [17, 9, -34], look: [0, 3, -16], fov: 44 } },
      update: (w, p, t) => { dry(w, 0); w.jib.rotation.y = t * .6; w.gary.position.set(-20, DECK_Y + .3, 0); },
    },
    {
      say: 'It took all summer.',
      show: [...SET, 'crane', 'sun'], sky: '#FFD9A8', lightAt: [0, 3, 0], lightDist: 50,
      cam: { pos: [26, 14, 40], look: [0, 6, -10], fov: 48, to: { pos: [22, 13, 36], look: [0, 6, -10], fov: 48 } },
      update: (w, p, t) => { dry(w, Math.min(.5, t * .2)); w.jib.rotation.y = t * 3; w.sun.position.set(-60 + t * 40, 30 + 20 * Math.sin(t * 1.4), -60); },
    },
    {
      say: 'On opening day, the puddle had dried up.',
      show: [...SET], sky: '#FFE7B0', lightAt: [0, 3, 0], lightDist: 50,
      cam: { pos: [0, 50, 30], look: [0, 0, 0], fov: 50, to: { pos: [0, 46, 26], look: [0, 0, 0], fov: 50 } },
      update: (w, p, t, k) => { dry(w, .5 + .5 * k.h.ease(Math.min(1, t / 1.6))); w.gary.position.set(0, 0, -21); },
    },
    {
      say: 'Gary just walked straight across.',
      show: SET, sky: '#FFE7B0', lightAt: [0, 1, 0], lightDist: 25,
      cam: { pos: [4.5, 2.2, -3], look: [0, .4, -5.5], fov: 40, to: { pos: [4.5, 2.2, 3], look: [0, .4, .5], fov: 40 } },
      update: (w, p, t) => { dry(w, 1); w.gary.position.set(0, .02, -6 + t * 3.2); w.gary.rotation.y = -Math.PI / 2; walk(w.gary, t); },
    },
    {
      say: 'Quick question. What should the engineers build Gary next? Option A, a lift. Option B, an airport. Or option C, leave Gary alone. Comment your answer.',
      quiz: { q: 'What should the engineers build Gary next?', options: ['A lift', 'An airport', 'Leave Gary alone'], answer: 'Gary is made up, so build him anything. (He votes C.)' },
      show: SET, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 70,
      cam: { pos: [30, 40, 70], look: [0, -14, 0], fov: 46, to: { pos: [-30, 40, 70], look: [0, -14, 0] } },
      update: (w, p, t) => { dry(w, 1); w.gary.position.set(0, .02, 6); walk(w.gary, t, .5); },
    },
  ],
};

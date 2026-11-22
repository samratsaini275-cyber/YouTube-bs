// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a giant golf ball.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#5FAE4E', 0);
  w.hills = group(); for (let i = 0; i < 4; i++) { const h = ball(6, mat(i % 2 ? '#6FBF5B' : '#58A24A'), [-12 + i * 8, -3.6, -14], w.hills); h.scale.y = .5; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.ball = group(); ball(1.6, mat('#FFFFFF', { rough: .4 }), [0, 0, 0], w.ball); for (let i = 0; i < 40; i++) { const u = Math.acos(1 - 2 * (i + .5) / 40), v = Math.PI * (1 + Math.sqrt(5)) * i; const d = ball(.16, mat('#DADADA'), [Math.sin(u) * Math.cos(v) * 1.55, Math.cos(u) * 1.55, Math.sin(u) * Math.sin(v) * 1.55], w.ball); d.scale.set(1, 1, 1); d.castShadow = false; }
  w.club = group(); cyl(.04, .04, 2.2, mat('#C0C8D0', { metal: .8 }), [0, 1.1, 0], w.club, 8); box(.35, .14, .14, mat('#C0C8D0', { metal: .8 }), [.12, 0, 0], w.club);
  w.hole = cyl(1.9, 1.9, .05, mat('#111111'), [0, .03, 0], k.scene, 28); w.hole.castShadow = false;
  w.flag = group(); cyl(.08, .08, 9, mat('#FFFFFF'), [0, 4.5, 0], w.flag, 8); box(2, 1.2, .05, mat('#E2453C'), [1, 8.3, 0], w.flag);
  w.cal = group(); box(1.8, 2.2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.8, .5, .12, mat('#E2453C'), [0, .85, .01], w.cal); for (let i = 0; i < 21; i++) { const x = box(.18, .04, .02, mat('#E2453C'), [-.6 + (i % 7) * .2, .4 - Math.floor(i / 7) * .35, .07], w.cal); x.rotation.z = .8; x.userData.i = i; }
  w.sweat = group(); for (let i = 0; i < 4; i++) { const d = ball(.07, mat('#7FC8E8', { glow: .3 }), [0, 0, 0], w.sweat); d.scale.y = 1.4; d.userData.i = i; d.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '234',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GOLFER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED GOLF.'],
  title: 'Gary the ant played golf',
  description: 'The ball is bigger than him. His best swing does nothing. So he pushes it. One hole takes three weeks. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'golf', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: ants have no lungs; air enters their bodies through small openings called spiracles (Encyclopaedia Britannica, "spiracle").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant played golf.',
      show: ['grass', 'hills', 'g', 'ball', 'club'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2, 8], look: [-.2, 1.05, 0], fov: 46, to: { pos: [2.8, 2, 7.3], look: [-.2, 1.05, 0], fov: 44 } },
      update: (w, p, t) => { w.ball.position.set(-1.6, 1.6, -.4); gy(w, .8, 0, .4, -1.3, t); w.club.position.set(.5, 0, .9); w.club.rotation.set(0, 0, .3); },
    },
    {
      say: 'The ball is bigger than him.',
      show: ['grass', 'hills', 'g', 'ball'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.4, .9, 6.5], look: [-.6, 1.15, 0], fov: 50, to: { pos: [1.3, .9, 6], look: [-.6, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { w.ball.position.set(-1.6, 1.6, -.4); gy(w, .2, 0, .4, -2.2, t); w.g.rotation.x = 0; },
    },
    {
      say: 'He swung as hard as he could. Nothing.',
      show: ['grass', 'hills', 'g', 'ball', 'club'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2, 8], look: [-.2, 1.05, 0], fov: 46, to: { pos: [2.8, 2, 7.3], look: [-.2, 1.05, 0], fov: 44 } },
      update: (w, p, t) => { w.ball.position.set(-1.6, 1.6, -.4); gy(w, .8, 0, .4, -1.3, t); const sw = Math.sin(Math.min(1, t / .9) * Math.PI); w.club.position.set(.2, .7, .5); w.club.rotation.set(0, 0, 2.2 - sw * 3.4); if (t > 1) w.g.rotation.z = .15 * Math.sin(t * 20) * Math.max(0, 1.6 - t); },
    },
    {
      say: 'So he pushed it. One hole took three weeks.',
      show: ['grass', 'hills', 'g', 'ball', 'flag', 'hole', 'cal', 'sweat'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 3.6, 13], look: [-1, 2.6, 0], fov: 50, to: { pos: [2.8, 3.6, 12.2], look: [-1, 2.6, 0], fov: 48 } },
      update: (w, p, t) => {
        const x = 2 - p * 4; w.ball.position.set(x - 1.75, 1.6, 0); w.ball.rotation.z = p * 4; gy(w, x, 0, 0, Math.PI, t, true); w.hole.position.set(-5, .03, 0); w.flag.position.set(-5, 0, 0);
        w.cal.position.set(2.6, 5, -2); w.cal.rotation.y = -.3; w.cal.children.forEach(c => { if (c.userData.i !== undefined) c.visible = c.userData.i < p * 21; });
        w.sweat.children.forEach(d => { const i = d.userData.i, q = (t * 1.4 + i / 4) % 1; d.position.set(x + .4 + Math.sin(i) * .2, .9 + q * .4, .3); });
      },
    },
    {
      say: 'Gary\'s golf score: a birdie, a hundred, or still going? Comment below.',
      quiz: { q: 'What is Gary\'s golf score?', options: ['A birdie', 'A hundred', 'Still going'], answer: 'Fun fact: ants have no lungs. They breathe through tiny holes in their sides.' },
      show: ['grass', 'hills', 'g', 'ball', 'club'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3.4, 2, 7], look: [-.2, 1.3, 0], fov: 46, to: { pos: [-1.6, 2, 7.5], look: [-.2, 1.3, 0] } },
      update: (w, p, t) => { w.ball.position.set(-1.6, 1.6, -.4); gy(w, .8, 0, .4, -1.3, t); w.club.position.set(.5, 0, .9); w.club.rotation.set(0, 0, .3); },
    },
  ],
};

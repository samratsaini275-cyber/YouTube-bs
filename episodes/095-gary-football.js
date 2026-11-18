// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his football match are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on the pitch next to a giant football.

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
  const w = {};
  w.ground = k.ground('#4E9A3C', 0);
  w.pitch = group();
  for (let i = 0; i < 8; i++) box(6, .02, 60, mat(i % 2 ? '#5AA845' : '#4E9A3C'), [-21 + i * 6, .02, 0], w.pitch).castShadow = false;
  box(48, .03, .4, mat('#FFFFFF'), [0, .04, -6], w.pitch).castShadow = false;
  // football (giant to Gary): panels as a dark-patched sphere
  w.ball = group([3, 3, -1]);
  ball(3, mat('#FFFFFF', { rough: .5 }), [0, 0, 0], w.ball);
  for (let i = 0; i < 10; i++) { const a = i * 2.4, b = Math.acos(1 - 2 * (i + .5) / 10); const p = ball(.9, mat('#1E1E1E'), [Math.sin(b) * Math.cos(a) * 2.6, Math.cos(b) * 2.6, Math.sin(b) * Math.sin(a) * 2.6], w.ball); p.scale.set(1, 1, .5); p.lookAt(0, 0, 0); }
  w.g = gary(k, k.scene, 2);
  w.boot = group([0, 0, 0]);
  box(5, 3, 2.6, mat('#1E2430'), [0, 1.5, 0], w.boot); box(3, 7, 2.6, mat('#E2453C'), [-1, 6, 0], w.boot);
  w.whistle = group([0, 0, 0]);
  cyl(.15, .15, .5, mat('#C9CED6', { metal: .9 }), [0, 0, 0], w.whistle, 10).rotation.z = Math.PI / 2;
  w.notes = group();
  for (let i = 0; i < 3; i++) { const n = ball(.15, mat('#FFFFFF', { glow: 2 }), [0, 0, 0], w.notes); n.userData.i = i; n.castShadow = false; }
  // the goal
  w.goal = group([0, 0, 60]);
  const post = mat('#FFFFFF');
  for (const x of [-7, 7]) cyl(.25, .25, 6, post, [x, 3, 0], w.goal, 10);
  const bar = cyl(.25, .25, 14, post, [0, 6, 0], w.goal, 10); bar.rotation.z = Math.PI / 2;
  w.net = group([0, 0, 0], w.goal);
  for (let i = 0; i < 15; i++) { const v = box(.05, 6, 3, mat('#E8E8E8', { opacity: .6 }), [-7 + i, 3, -1.5], w.net); v.castShadow = false; }
  w.hammock = group([0, 0, 0]);
  const hm = cyl(1.4, 1.4, .1, mat('#E8E8E8', { opacity: .9, double: true }), [0, 0, 0], w.hammock, 20); hm.scale.set(1.6, 1, .8);
  return w;
}

const PITCH = ['ground', 'pitch', 'g'];

export default {
  id: '095',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY PLAYS FOOTBALL',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED FOOTBALL.'],
  title: 'Gary the ant played football',
  description: 'The ball is a planet. The kick does nothing. Gary finds his true calling anyway. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'football', 'soccer', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his football match are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant played football.',
      show: [...PITCH, 'ball'], sky: '#9ED2F3', lightAt: [1, 3, 0], lightDist: 16,
      cam: { pos: [-1, 2.5, 13], look: [1.5, 4.2, -1], fov: 50, to: { pos: [-1, 2.5, 11.5], look: [1.5, 4.2, -1], fov: 48 } },
      update: (w, p, t) => { w.ball.position.set(3, 3, -1); w.ball.rotation.set(0, 0, 0); w.g.position.set(-1.5, 0, 1); w.g.rotation.y = 0; scurry(w.g, t, 12); },
    },
    {
      say: 'He kicks the ball. Nothing happens.',
      show: [...PITCH, 'ball'], sky: '#A7D8F5', lightAt: [1, 3, 0], lightDist: 12,
      cam: { pos: [-3, 2, 8], look: [1, 2, -1], fov: 46, to: { pos: [-2.7, 2, 7], look: [1, 2, -1], fov: 44 } },
      shake: (t) => (t % .7) < .08 ? .1 : 0,
      update: (w, p, t) => { w.ball.position.set(3, 3, -1); const k2 = (t % .7) / .7; w.g.position.set(-.7 + .5 * Math.sin(k2 * Math.PI), 0, -.6); w.g.rotation.y = .1; scurry(w.g, t, 30); },
    },
    {
      say: 'So he became the referee.',
      show: [...PITCH, 'boot', 'whistle', 'notes'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [4, 2.5, 12], look: [0, 3, -1], fov: 50, to: { pos: [3.5, 2.5, 10.5], look: [0, 3, -1], fov: 48 } },
      update: (w, p, t) => {
        w.boot.position.set(-4 + Math.sin(t * 2) * .5, 0, -4); w.g.position.set(1.5, 0, 1); w.g.rotation.y = Math.PI * .8; scurry(w.g, t, 6);
        w.whistle.position.set(.4, 1, 1.4); w.notes.children.forEach(n => { const f = (t * 1.5 + n.userData.i / 3) % 1; n.position.set(-.2 - f * 1.5, 1.4 + f * 1.2, 1.4); n.scale.setScalar(.5 + f); });
      },
    },
    {
      say: 'And the goal net? His new hammock.',
      show: ['ground', 'pitch', 'goal', 'g', 'hammock'], sky: '#FFD9A8', lightAt: [0, 3, 58], lightDist: 14,
      cam: { pos: [3, 4.5, 70], look: [0, 3.5, 60], fov: 46, to: { pos: [2.7, 4.4, 68], look: [0, 3.5, 60], fov: 44 } },
      update: (w, p, t) => { const sw = .3 * Math.sin(t * 2); w.hammock.position.set(sw, 3.2, 61); w.hammock.rotation.set(0, 0, sw * .3); w.g.position.set(sw, 3.27, 61); w.g.rotation.set(0, .3, sw * .3 - .1); scurry(w.g, t, 1); },
    },
    {
      say: 'Gary\'s position: striker, goalie, or a mascot? Comment below.',
      quiz: { q: 'What position should Gary play?', options: ['Striker', 'Goalie', 'Mascot'], answer: 'Gary is made up, so any of them. He has already ordered the mascot costume.' },
      show: [...PITCH, 'ball'], sky: '#274B73', lightAt: [1, 3, 0], lightDist: 16,
      cam: { pos: [3, 1.5, 17], look: [.5, 5.5, -1], fov: 48, to: { pos: [-4, 1.5, 17], look: [.5, 5.5, -1] } },
      update: (w, p, t) => { w.ball.position.set(3, 3, -1); w.g.position.set(-1.5, 0, 1); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 12); },
    },
  ],
};

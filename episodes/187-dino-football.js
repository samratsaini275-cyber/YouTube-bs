// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K) + sport.
// Hook: the premise as a question under 2 s; first frame shows a T-rex on a football pitch with a ball at its feet.

function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#4FA04A', 0);
  w.lines = group(); box(.4, .05, 60, mat('#FFFFFF'), [0, .03, 0], w.lines); const c = k.torus(6, .2, mat('#FFFFFF'), [0, .04, 0], w.lines); c.rotation.x = Math.PI / 2;
  for (let i = 0; i < 8; i++) box(120, .02, 7.5, mat(i % 2 ? '#4FA04A' : '#5AAE52'), [0, .01, -30 + i * 7.5], w.lines);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.ball = group(); ball(1, mat('#FFFFFF'), [0, 0, 0], w.ball); for (let i = 0; i < 6; i++) { const p = ball(.35, mat('#111111'), [Math.cos(i * 1.05) * .85, Math.sin(i * 2.1) * .4, Math.sin(i * 1.05) * .85], w.ball); p.scale.setScalar(.8); }
  w.goal = group(); const gm = mat('#FFFFFF'); for (const z of [-7, 7]) cyl(.3, .3, 8, gm, [0, 4, z], w.goal, 10); const bar = cyl(.3, .3, 14.6, gm, [0, 8, 0], w.goal, 10); bar.rotation.x = Math.PI / 2;
  const net = box(.1, 8, 14, mat('#FFFFFF'), [-3, 4, 0], w.goal); net.material.transparent = true; net.material.opacity = .25;
  w.trail = group(); for (let i = 0; i < 8; i++) { const s = ball(.4, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.trail); s.userData.i = i; s.castShadow = false; }
  w.stars = group(); for (let i = 0; i < 20; i++) { const s = ball(.15, mat('#FFFFFF', { glow: 1 }), [(i * 7.3) % 40 - 20, 40 + (i * 3.1) % 20, -20], w.stars); s.castShadow = false; }
  return w;
}

const pose = (w, x, z, ry, t, still = true, sp = 4) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, sp, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.legs.forEach(l => l.rotation.set(0, 0, l.rotation.z)); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };

export default {
  id: '187',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DINO FOOTBALL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'PLAYED FOOTBALL?'],
  title: 'What would happen if dinosaurs played football?',
  description: 'Kick-off sends the ball into space. The goalkeeper fills the whole goal. And throw-ins are impossible with those tiny arms. (A comedy what-if. Birds are living dinosaurs.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'football', 'funny', 'shorts'],
  sources: [
    'Quiz fact: birds are living dinosaurs, descended from theropod dinosaurs (widely accepted in palaeontology; e.g. Natural History Museum, London; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinos played football?',
      show: ['ground', 'lines', 'dino', 'ball'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [14, 7, 32], look: [2, 12.4, 0], fov: 46, to: { pos: [13, 7, 30], look: [2, 12.4, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -3, 0, -.4, t); w.ball.position.set(4.5, 1, 3); w.ball.rotation.set(0, t, 0); w.r.neck.rotation.z = -.2 + .05 * Math.sin(t * 2); },
    },
    {
      say: 'Kick-off? The ball goes into space.',
      show: ['ground', 'lines', 'dino', 'ball', 'trail', 'stars'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [16, 7, 34], look: [2, 14, 0], fov: 50, to: { pos: [16, 12, 34], look: [4, 26, 0], fov: 52 } },
      update: (w, p, t) => {
        pose(w, -3, 0, -.4, t); const kick = Math.min(1, t * 3); w.r.legs[1].rotation.z = -1.2 * Math.sin(kick * Math.PI);
        const q = Math.max(0, t - .3); w.ball.position.set(4.5 + q * 4, 1 + q * q * 30, 3 - q * 2); w.ball.rotation.set(t * 10, t * 8, 0);
        w.trail.children.forEach(s => { const i = s.userData.i, d = Math.max(0, q - i * .05); s.position.set(4.5 + d * 4, 1 + d * d * 30, 3 - d * 2); s.visible = q > 0; s.scale.setScalar(1 - i * .1); });
      },
    },
    {
      say: 'The goalkeeper? Fills the whole goal.',
      show: ['ground', 'lines', 'dino', 'goal', 'ball'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [30, 8, 6], look: [0, 8, 0], fov: 50, to: { pos: [28, 8, 6], look: [0, 8, 0], fov: 48 } },
      update: (w, p, t) => { w.goal.position.set(-2, 0, 0); pose(w, 0, 0, -Math.PI / 2, t); w.r.body.rotation.y = .3 * Math.sin(t * 3); w.ball.position.set(20 - t * 12, 3 + Math.sin(Math.min(1, t / 1.3) * Math.PI) * 4, 1); if (t > 1.3) w.ball.position.set(8 + (t - 1.3) * 10, 4, 4 + (t - 1.3) * 6); },
    },
    {
      say: 'Throw-ins? Those tiny arms cannot reach.',
      show: ['ground', 'lines', 'dino', 'ball'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [10, 9, 26], look: [1, 10, 0], fov: 46, to: { pos: [9.5, 9, 24.5], look: [1, 10, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -2, 0, -.6, t); w.r.arms.forEach(a => a.rotation.z = -.4 - .5 * Math.abs(Math.sin(t * 5))); w.r.neck.rotation.z = -.5;
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(1.8, -1.2, 0)); w.ball.position.copy(v); w.ball.rotation.set(0, 0, 0);
      },
    },
    {
      say: 'Dino football: epic, chaotic, or unfair? Comment below.',
      quiz: { q: 'Would you play football with a T-rex?', options: ['Epic', 'Chaotic', 'Unfair'], answer: 'Fun fact: birds are living dinosaurs. So pigeons are basically tiny T-rex cousins.' },
      show: ['ground', 'lines', 'dino', 'ball'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [16, 7, 26], look: [0, 10.5, 0], fov: 46, to: { pos: [-12, 7, 28], look: [0, 10.5, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, -.3, t); w.ball.position.set(4, 1, 3); },
    },
  ],
};

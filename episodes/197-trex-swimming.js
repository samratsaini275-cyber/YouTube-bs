// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K) + everyday activity.
// Hook: the premise as a question under 2 s; first frame shows a T-rex in a rubber ring standing at the edge of a swimming pool.

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
  w.ground = k.ground('#E8E2D0', 0);
  w.pool = group(); box(30, .4, 18, mat('#CFE3F2'), [0, -.2, 0], w.pool); w.water = box(28, .2, 16, mat('#4FB3E8', { rough: .1, glow: .1 }), [0, .02, 0], w.pool);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.ring = group([0, 7, 0], w.r.body); const rg = k.torus(3.4, .9, mat('#FFD21F', { rough: .3 }), [0, 0, 0], w.ring); rg.rotation.x = Math.PI / 2; for (let i = 0; i < 4; i++) { const st = k.torus(3.4, .92, mat('#E2453C', { rough: .3 }), [0, 0, 0], w.ring); st.rotation.x = Math.PI / 2; st.scale.set(1, 1, .3); st.rotation.z = i * Math.PI / 2; }
  w.splash = group(); for (let i = 0; i < 14; i++) { const s = ball(.7, mat('#BFE6FF', { glow: .4 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.board = group(); box(2, 6, 2, mat('#9AA5B1'), [0, 3, 0], w.board); w.plank = box(8, .4, 2, mat('#3B82F6'), [4, 6.2, 0], w.board);
  w.wave = box(30, 3, 2, mat('#4FB3E8', { glow: .2 }), [0, 0, 0]); w.wave.castShadow = false;
  w.duck = group(); ball(.8, mat('#FFD21F'), [0, .6, 0], w.duck); ball(.5, mat('#FFD21F'), [.6, 1.3, 0], w.duck); cone(.2, .4, mat('#F97316'), [1.1, 1.25, 0], w.duck, 8).rotation.z = -Math.PI / 2;
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.dino.position.set(x, y, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };
const splash = (w, x, z, t, s = 1, on = true) => { w.splash.visible = on; w.splash.children.forEach(sp => { const i = sp.userData.i, a = i / 14 * Math.PI * 2, q = (t * 1.2 + (i % 3) / 3) % 1; sp.position.set(x + Math.cos(a) * q * 6 * s, Math.sin(q * Math.PI) * 4 * s, z + Math.sin(a) * q * 4 * s); sp.scale.setScalar(.6 + q * .6); }); };

export default {
  id: '197',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'T-REX SWIMMING',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'WENT SWIMMING?'],
  title: 'What would happen if a T-rex went swimming?',
  description: 'Swimming with tiny arms is mostly splashing. One jump empties the pool. And the diving board? It does not survive. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'swimming', 'funny', 'shorts'],
  sources: [
    'Quiz fact: fossil trackways show some large theropod dinosaurs moving through water (e.g. swim-track finds reported in scientific literature); no claim is made that T. rex itself swam.',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex went swimming?',
      show: ['ground', 'pool', 'dino', 'duck'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [12, 7, 32], look: [1, 12.4, 0], fov: 46, to: { pos: [11, 7, 30], look: [1, 12.4, 0], fov: 44 } },
      update: (w, p, t) => { w.ring.visible = true; pose(w, -2, 0, -10, -.4, t); w.dino.position.z = -2; w.r.neck.rotation.z = -.15; w.duck.position.set(5, .1, 4); w.duck.rotation.y = t; w.splash.visible = false; },
    },
    {
      say: 'Swimming? Tiny arms. Lots of splashing.',
      show: ['ground', 'pool', 'dino', 'splash'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 28,
      cam: { pos: [10, 10, 30], look: [0, 6.5, 0], fov: 48, to: { pos: [9.5, 10, 28], look: [0, 6.5, 0], fov: 46 } },
      shake: (t) => .05,
      update: (w, p, t) => { pose(w, 0, -4.5, 0, -.3, t); w.r.arms.forEach((a, i) => a.rotation.x = (i ? 1 : -1) * .9 * Math.sin(t * 14)); w.r.neck.rotation.z = .2; splash(w, 3, 1, t, .7); },
    },
    {
      say: 'The pool? One jump. Now it is empty.',
      show: ['ground', 'pool', 'dino', 'splash', 'wave'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 12, 38], look: [0, 6, 0], fov: 50, to: { pos: [13, 12, 36], look: [0, 6, 0], fov: 48 } },
      shake: (t) => (t > .8 && t < 1.3) ? .2 : 0,
      update: (w, p, t) => {
        const q = Math.min(1, t / .8); pose(w, -16 + q * 16, Math.sin(q * Math.PI) * 6 - (t > .8 ? 4 : 0), 0, 0, t);
        w.water.scale.y = t > .9 ? Math.max(.05, 1 - (t - .9) * 2) : 1; w.water.position.y = t > .9 ? -.15 : .02;
        splash(w, 0, 0, t, 1.6, t > .8); w.wave.visible = t > .8; w.wave.position.set(0, 1.5, -9 - (t - .8) * 6); w.wave.scale.y = Math.max(.1, 1.5 - (t - .8));
      },
    },
    {
      say: 'The diving board? Snap.',
      show: ['ground', 'pool', 'dino', 'board'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 28,
      cam: { pos: [8, 8, 30], look: [-4, 8, 0], fov: 48, to: { pos: [7.5, 8, 28], look: [-4, 8, 0], fov: 46 } },
      shake: (t) => t > 1 ? .12 : 0,
      update: (w, p, t) => {
        w.water.scale.y = 1; w.water.position.y = .02; w.board.position.set(-10, 0, 0); const bend = Math.min(1, t);
        w.plank.rotation.z = t < 1 ? -.35 * bend : -1.2; w.plank.position.set(4, t < 1 ? 6.2 - bend * 1.2 : 3, 0);
        pose(w, -5.2, t < 1 ? 6.4 - bend * 1.6 : 1, 0, 0, t); w.dino.scale.setScalar(.6); w.r.arms.forEach(a => a.rotation.z = -.6);
      },
    },
    {
      say: 'A T-rex at the pool: fun, chaotic, or a disaster? Comment below.',
      quiz: { q: 'Would you swim with a T-rex?', options: ['Fun', 'Chaotic', 'A disaster'], answer: 'Fossil footprints show some big meat-eating dinosaurs did wade and paddle through water.' },
      show: ['ground', 'pool', 'dino', 'duck'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [14, 7, 26], look: [0, 11, 0], fov: 46, to: { pos: [-10, 7, 28], look: [0, 11, 0] } },
      update: (w, p, t) => { w.dino.scale.setScalar(1); pose(w, 0, 0, -6, -.3, t); w.duck.position.set(5, .1, 3); },
    },
  ],
};

// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Reverse of the channel best (081 dinosaurs as pets, 1.7K).
// Hook: the premise as a question under 2 s; first frame shows a T-rex looking down at a tiny puppy on a red lead.

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
function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.trees = group(); for (let i = 0; i < 6; i++) { cyl(.8, 1, 6, mat('#6B4B2E'), [-30 + i * 12, 3, -30], w.trees, 8); ball(4, mat('#1F6B36'), [-30 + i * 12, 8, -30], w.trees); }
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.d = dog(k, k.scene); w.dg = w.d.root; w.dg.scale.setScalar(1.3);
  w.lead = cyl(.05, .05, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.lead.castShadow = false;
  w.stick = cyl(.1, .12, 2, mat('#6B4B2E'), [0, 0, 0], k.scene, 8); w.stick.rotation.z = Math.PI / 2;
  w.bark = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.25 + i * .15, .04, mat('#FFFFFF', { glow: .7 }), [0, 0, 0], w.bark); r.rotation.set(0, Math.PI / 2, 0); r.userData.i = i; r.castShadow = false; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.3, m, [-.2, 0, 0], h); ball(.3, m, [.2, 0, 0], h); const c = cone(.42, .6, m, [0, -.34, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const rx = (w, x, z, ry, t, still = true) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };
const dp = (w, x, z, ry, t, run = false) => { w.dg.position.set(x, 0, z); w.dg.rotation.set(0, ry, 0); w.d.tail.rotation.x = .8 * Math.sin(t * 14); w.d.legs.forEach((l, i) => l.rotation.z = run ? .5 * Math.sin(t * 14 + (i % 2) * Math.PI) : 0); w.d.mouth.scale.y = 1; w.d.head.rotation.set(0, 0, 0); };
const lead = (w) => { w.dino.updateMatrixWorld(true); w.dg.updateMatrixWorld(true); const A = new w.dg.position.constructor(), B = A.clone(); w.r.arms[1].localToWorld(A.set(1.1, -.9, 0)); w.d.head.localToWorld(B.set(0, -.4, 0));
  w.lead.position.copy(A).add(B).multiplyScalar(.5); w.lead.scale.y = A.distanceTo(B); w.lead.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '201',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'T-REX GETS A PET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'HAD A PET?'],
  title: 'What would happen if a T-rex had a pet dog?',
  description: 'Walkies on a very short lead. Fetch is hard with tiny arms. One small bark and the T-rex runs. But cuddles? The best. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'dogs', 'funny', 'shorts'],
  sources: [
    'Quiz fact reuses 190: T. rex disappeared in the mass extinction about 66 million years ago (general palaeontology); domestic dogs came tens of millions of years later (general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex had a pet?',
      show: ['ground', 'trees', 'dino', 'dg', 'lead'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [12, 5, 30], look: [2, 10.4, 0], fov: 46, to: { pos: [11, 5, 28], look: [2, 10.4, 0], fov: 44 } },
      update: (w, p, t) => { rx(w, -3, -2, -.3, t); w.r.neck.rotation.z = -.55; w.r.body.rotation.z = -.15; dp(w, 6, 2, 1.2, t); w.d.head.rotation.z = .3; lead(w); w.bark.visible = false; },
    },
    {
      say: 'Fetch? Those tiny arms throw it one metre.',
      show: ['ground', 'trees', 'dino', 'dg', 'stick'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [12, 7, 30], look: [2, 8.5, 0], fov: 48, to: { pos: [11, 7, 28], look: [2, 8.5, 0], fov: 46 } },
      update: (w, p, t) => {
        rx(w, -3, -1, -.3, t); w.r.arms.forEach(a => a.rotation.z = t < .5 ? -1 : -.2); w.r.neck.rotation.z = -.4;
        const q = Math.min(1, Math.max(0, (t - .4) * 2)); w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.arms[1].localToWorld(v.set(1.1, -.9, 0));
        w.stick.position.set(v.x + q * 1.2, v.y - q * (v.y - .2), v.z + q * .5); dp(w, 6, 2, 1.2, t); w.d.head.rotation.z = .2 * Math.sin(t * 3);
      },
    },
    {
      say: 'One tiny bark? The T-rex runs away.',
      show: ['ground', 'trees', 'dino', 'dg', 'bark'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 28,
      cam: { pos: [6, 6, 34], look: [0, 7, 0], fov: 50, to: { pos: [5.5, 6, 32], look: [-2, 7, 0], fov: 48 } },
      shake: (t) => t > .6 ? .05 : 0,
      update: (w, p, t) => {
        dp(w, 5, 3, 1.4, t); w.d.mouth.scale.y = 1 + 3 * Math.abs(Math.sin(t * 12)); w.bark.visible = t < 1.2;
        w.dg.updateMatrixWorld(true); const v = new w.dg.position.constructor(); w.d.head.localToWorld(v.set(-.9, -.2, 0)); w.bark.children.forEach(b => { const i = b.userData.i, q = (t * 2 + i / 3) % 1; b.position.set(v.x - q * 1.5, v.y, v.z - q * .5); b.scale.setScalar(.6 + q); b.rotation.set(0, 1.4 + Math.PI / 2, 0); });
        const run = Math.max(0, t - .6); rx(w, -2 - run * 6, -2, run > 0 ? Math.PI : -.3, t, run === 0); w.r.jaw.rotation.z = -.5;
      },
    },
    {
      say: 'But cuddles? The best in the world.',
      show: ['ground', 'trees', 'dino', 'dg', 'hearts'], sky: '#F7C6D0', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [10, 6, 24], look: [2, 6.5, 0], fov: 46, to: { pos: [9.5, 6, 22.5], look: [2, 6.5, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bark.visible = false; rx(w, -3, 0, -.2, t); w.r.body.rotation.z = -.55; w.r.neck.rotation.z = -1.1; w.r.jaw.rotation.z = -.1;
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(1.6, 1.1, 0)); dp(w, v.x, v.z, 1.2, t); w.dg.position.y = v.y;
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(v.x - 2 + i * 1, v.y + 1.5 + q * 4, v.z + 1); h.scale.setScalar(.6 + q * .6); });
      },
    },
    {
      say: 'A T-rex with a puppy: cute, chaotic, or a bit much? Comment below.',
      quiz: { q: 'Should a T-rex get a puppy?', options: ['Cute', 'Chaotic', 'A bit much'], answer: 'Real T-rex died out about 66 million years ago. Dogs came along much, much later.' },
      show: ['ground', 'trees', 'dino', 'dg'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [14, 6, 26], look: [1, 9.5, 0], fov: 46, to: { pos: [-10, 6, 28], look: [1, 9.5, 0] } },
      update: (w, p, t) => { rx(w, -2, -1, -.3, t); w.r.neck.rotation.z = -.4; dp(w, 5, 2, 1.2, t); },
    },
  ],
};

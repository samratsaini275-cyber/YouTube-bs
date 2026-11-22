// Narrative 11: "What Would Happen If… (season 3, with Gary)". Dinosaurs (081 dinosaurs as pets, 1.7K, channel best) + talking animals.
// Hook: the premise as a question under 2 s; first frame shows a T-rex in a park with speech bubbles rising from its open mouth.

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
  w.ground = k.ground('#7FB069', 0);
  w.trees = group(); for (let i = 0; i < 6; i++) { cyl(.8, 1, 6, mat('#6B4B2E'), [-40 + i * 16, 3, -45], w.trees, 8); ball(4, mat('#1F6B36'), [-40 + i * 16, 8, -45], w.trees); }
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.r2 = rex(k, k.scene); w.dino2 = w.r2.root; w.r2.collar.visible = false;
  w.bub = group(); for (let i = 0; i < 3; i++) { const b = ball(.6, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.phone = box(1.2, 2.2, .2, mat('#3B82F6', { glow: .3 }), [0, 0, 0]); w.phone.castShadow = false;
  w.mic = group(); cyl(.12, .12, 1.4, mat('#333333'), [0, 0, 0], w.mic, 8); ball(.3, mat('#888888', { rough: .3 }), [0, .8, 0], w.mic);
  w.rings = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8 + i * .5, .07, mat('#FFD21F', { glow: .8 }), [0, 0, 0], w.rings); r.rotation.set(0, Math.PI / 2, 0); r.userData.i = i; r.castShadow = false; }
  w.stage = group(); box(24, 1, 12, mat('#3A2A4A'), [0, .5, 0], w.stage); for (let i = 0; i < 5; i++) ball(.7, mat(['#FF4D4D', '#FFD21F', '#4DA6FF', '#22C55E', '#EC4899'][i], { glow: 1 }), [-8 + i * 4, 18, -4], w.stage);
  return w;
}

const pose = (w, x, z, ry, t, still = true, sp = 4) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, sp, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };
const talk = (w, t, on = true) => { w.bub.visible = on; if (!on) return; w.r.jaw.rotation.z = -.2 - .35 * Math.abs(Math.sin(t * 9)); w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(3, .5, 0));
  w.bub.children.forEach(b => { const i = b.userData.i, q = (t * 1.1 + i / 3) % 1; b.position.set(v.x + q * 2, v.y + q * 3, v.z); b.scale.setScalar(.4 + q * 1.2); }); };

export default {
  id: '181',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TALKING DINOSAURS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'COULD TALK?'],
  title: 'What would happen if dinosaurs could talk?',
  description: 'That scary roar just means hello. Phone calls are hard with tiny arms. Karaoke is extremely loud. And clapping is still impossible. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'funny', 'talking', 'shorts'],
  sources: [
    'Quiz answer: no one has recordings of dinosaur sounds; how they sounded is still studied and debated (general palaeontology; no specific claim made).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs could talk?',
      show: ['ground', 'trees', 'dino', 'bub'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [14, 8, 28], look: [2, 12.4, 0], fov: 46, to: { pos: [13, 8, 26], look: [2, 12.4, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -2, 0, -.45, t); talk(w, t); },
    },
    {
      say: 'That scary roar? It just means hello.',
      show: ['ground', 'trees', 'dino', 'bub'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [12, 9, 24], look: [2, 12.2, 0], fov: 46, to: { pos: [11.5, 9, 22.5], look: [2, 12.2, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -2, 0, -.6, t); talk(w, t, t > .6); w.r.neck.rotation.z = .15 * Math.sin(t * 3); w.r.arms.forEach((a, i) => a.rotation.x = (i ? 1 : -1) * .5 * Math.abs(Math.sin(t * 6))); },
    },
    {
      say: 'Phone calls? Those tiny arms cannot reach.',
      show: ['ground', 'trees', 'dino', 'phone'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [11, 9, 21], look: [2, 11, 0], fov: 46, to: { pos: [10.5, 9, 20], look: [2, 11, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bub.visible = false; pose(w, -2, 0, -.5, t); w.r.arms.forEach(a => a.rotation.z = -.6 - .3 * Math.abs(Math.sin(t * 5))); w.r.neck.rotation.z = -.35;
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.arms[1].localToWorld(v.set(1, -.8, 0)); w.phone.position.copy(v); w.phone.rotation.set(0, -.5, .3 * Math.sin(t * 5));
      },
    },
    {
      say: 'Karaoke? Extremely, extremely loud.',
      show: ['ground', 'stage', 'dino', 'mic', 'rings'], sky: '#1E2A44', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [12, 9, 24], look: [2, 11.5, 0], fov: 48, to: { pos: [11, 9, 22], look: [2, 11.5, 0], fov: 46 } },
      shake: (t) => .12,
      update: (w, p, t) => {
        w.stage.position.set(0, 0, 0); pose(w, -2, 0, -.45, t); w.dino.position.y = 1; w.r.jaw.rotation.z = -.6; w.r.neck.rotation.z = .2 + .1 * Math.sin(t * 8);
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.arms[1].localToWorld(v.set(1, -.6, 0)); w.mic.position.copy(v); w.mic.rotation.set(0, 0, -.5);
        const h = new w.dino.position.constructor(); w.r.head.localToWorld(h.set(3, 0, 0)); w.rings.children.forEach(r => { const i = r.userData.i, q = (t * 1.4 + i / 4) % 1; r.position.set(h.x + q * 6, h.y, h.z + q * 2); r.scale.setScalar(.5 + q * 1.8); r.rotation.set(0, Math.PI / 2 - .45, 0); });
      },
    },
    {
      say: 'But clapping? Still impossible.',
      show: ['ground', 'trees', 'dino'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [12, 9, 40], look: [1.5, 9.6, 0], fov: 42, to: { pos: [11.5, 9, 38], look: [1.5, 9.6, 0], fov: 41 } },
      update: (w, p, t) => {
        w.bub.visible = false; pose(w, -1, 0, -.95, t); w.r.neck.rotation.z = -.3; w.r.jaw.rotation.z = -.25;
        w.r.arms.forEach((a, i) => { a.rotation.set((i ? 1 : -1) * (.25 + .25 * Math.sin(t * 12)), 0, -.5); });
      },
    },
    {
      say: 'Talking dinosaurs: amazing, terrifying, or hilarious? Comment below.',
      quiz: { q: 'Would you chat with a T-rex?', options: ['Amazing', 'Terrifying', 'Hilarious'], answer: 'Nobody has a recording of a real dinosaur. Scientists still debate what they sounded like.' },
      show: ['ground', 'trees', 'dino', 'bub'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 26,
      cam: { pos: [16, 8, 20], look: [0, 10, 0], fov: 46, to: { pos: [-12, 8, 22], look: [0, 10, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, -.3, t); talk(w, t); },
    },
  ],
};

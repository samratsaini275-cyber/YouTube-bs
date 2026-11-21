// Narrative 11: "What Would Happen If… (season 3, with Gary)". Follow-up to the channel's best video (081 dinosaurs as pets, 1.7K).
// Hook: the premise as a question under 2 s; first frame shows a palm-sized T-rex roaring next to a coffee mug on a kitchen table.

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
function cat(k, parent, color = '#F2994A') {
  const { mat, box, ball, cone, cyl, group } = k;
  const fur = mat(color, { rough: .8 });
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(.7, fur, [0, .55, 0], c.root); b.scale.set(1.4, .75, .9);
  c.head = group([.95, 1.05, 0], c.root);
  ball(.5, fur, [0, 0, 0], c.head);
  for (const z of [-.25, .25]) { cone(.15, .32, fur, [0, .48, z], c.head, 4); ball(.1, mat('#B8F27A', { glow: .6 }), [.4, .08, z * .8], c.head); ball(.05, mat('#111111'), [.48, .08, z * .8], c.head); }
  ball(.06, mat('#FF8FA3'), [.5, -.06, 0], c.head);
  c.tail = cyl(.08, .06, 1.1, fur, [-1.0, 1.0, 0], c.root, 6); c.tail.rotation.z = .6;
  c.crown = group([0, .55, 0], c.head); cyl(.32, .28, .25, mat('#FFD21F', { glow: .6 }), [0, 0, 0], c.crown, 8);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .27, .2, Math.sin(a) * .27], c.crown, 4); }
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#C9A27A', 0);
  w.wall = box(60, 30, .5, mat('#F3E6CF'), [0, 15, -8]); w.wall.castShadow = false;
  w.table = group(); box(14, .4, 8, mat('#8B5A2B'), [0, 3, 0], w.table); for (const x of [-6, 6]) for (const z of [-3, 3]) cyl(.25, .25, 3, mat('#6B4423'), [x, 1.5, z], w.table, 8);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.dino.scale.setScalar(.1); w.r.collar.visible = false;
  w.mug = group(); cyl(.7, .6, 1.5, mat('#3B82F6'), [0, 3.95, 0], w.mug, 24); const hd = k.torus(.4, .1, mat('#3B82F6'), [.75, 4, 0], w.mug); hd.rotation.x = 0;
  w.pea = ball(.32, mat('#5CB85C', { rough: .5 }), [0, 0, 0]);
  w.c = cat(k, k.scene, '#7A7A7A'); w.ct = w.c.root; w.c.crown.visible = false; w.ct.scale.setScalar(2.2);
  w.cup = group(); cyl(.8, .5, .9, mat('#FFFFFF', { rough: .3 }), [0, 3.65, 0], w.cup, 24); cyl(1.4, 1.4, .08, mat('#FFFFFF'), [0, 3.24, 0], w.cup, 24);
  const ch = k.torus(.3, .08, mat('#FFFFFF'), [.85, 3.7, 0], w.cup); ch.rotation.x = 0;
  w.roar = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.08 + i * .06, .012, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.roar); r.rotation.set(0, Math.PI / 2, 0); r.userData.i = i; r.castShadow = false; }
  return w;
}

const pose = (w, x, z, ry, t, still = false, sp = 6) => { w.dino.position.set(x, 3.2, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, sp, still); };
const roar = (w, on, t) => { w.roar.visible = on; const r = w.r; r.jaw.rotation.z = on ? -.7 : r.jaw.rotation.z; if (!on) return;
  const hp = new w.r.head.parent.parent.parent.position.constructor(); w.r.head.getWorldPosition(hp);
  w.roar.children.forEach(c => { const q = (t * 1.5 + c.userData.i / 3) % 1; c.position.set(hp.x + .3 + q * .5, hp.y, hp.z + q * .2); c.scale.setScalar(.6 + q * .8); }); };

export default {
  id: '169',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TINY DINOSAURS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'WERE TINY?'],
  title: 'What would happen if dinosaurs were tiny?',
  description: 'The mighty roar is a squeak. One pea is a whole meal. The house cat is the real monster. And a T-rex fits in a teacup. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'funny', 'tiny', 'shorts'],
  sources: [
    'Quiz fact: Tyrannosaurus rex grew to about 12 m long (Natural History Museum, London, T. rex profile; cited from memory).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs were tiny?',
      show: ['floor', 'wall', 'table', 'dino', 'mug', 'roar'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.5, 4.4, 4.2], look: [0, 4.5, 0], fov: 44, to: { pos: [1.3, 4.4, 3.8], look: [0, 4.5, 0], fov: 42 } },
      update: (w, p, t) => { w.mug.position.set(-1.6, 0, -.6); pose(w, -.2, 0, -.5, t, true); roar(w, true, t); },
    },
    {
      say: 'His mighty roar? Basically a squeak.',
      show: ['floor', 'wall', 'table', 'dino', 'mug', 'roar'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.2, 4.1, 3.4], look: [.1, 4.4, 0], fov: 40, to: { pos: [1.1, 4.1, 3.1], look: [.1, 4.4, 0], fov: 38 } },
      update: (w, p, t) => { w.mug.position.set(-1.6, 0, -.6); pose(w, -.2, 0, -.2, t, true); roar(w, t > .4, t); },
    },
    {
      say: 'Dinner? One single pea. Way too big.',
      show: ['floor', 'wall', 'table', 'dino', 'pea'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [.4, 4.2, 4], look: [-.6, 4.4, 0], fov: 42, to: { pos: [.3, 4.2, 3.6], look: [-.5, 4.4, 0], fov: 40 } },
      update: (w, p, t) => { roar(w, false, t); pose(w, -1.2 + t * .15, 0, 0, t, false, 8); w.pea.position.set(w.dino.position.x + .75, 3.52, 0); w.pea.rotation.z = -t * 2; },
    },
    {
      say: 'The house cat? Now that is the scary dinosaur.',
      show: ['floor', 'wall', 'table', 'dino', 'ct'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 12,
      cam: { pos: [1.5, 4.6, 8], look: [-.5, 5.6, 0], fov: 48, to: { pos: [1.5, 4.6, 7.2], look: [-.3, 5.6, 0], fov: 46 } },
      shake: (t) => .03,
      update: (w, p, t) => {
        roar(w, false, t); pose(w, .3 + t * .35, 1, 0, t, false, 16); w.r.jaw.rotation.z = -.6;
        w.ct.position.set(-3.4 + t * .5, 3.2, -.5); w.ct.rotation.set(0, -.3, 0); w.c.head.rotation.set(0, 0, .1 * Math.sin(t * 2)); w.c.tail.rotation.z = .6 + .3 * Math.sin(t * 4);
      },
    },
    {
      say: 'But a T-rex in a teacup? Adorable.',
      show: ['floor', 'wall', 'table', 'dino', 'cup'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.3, 5.2, 3.6], look: [0, 4.15, 0], fov: 42, to: { pos: [1.2, 5.1, 3.3], look: [0, 4.15, 0], fov: 40 } },
      update: (w, p, t) => { roar(w, false, t); w.cup.position.set(0, 0, 0); w.dino.position.set(0, 3.45, 0); w.dino.rotation.set(0, -.6, 0); stomp(w.r, t, 4, true); w.r.jaw.rotation.z = -.15; w.r.neck.rotation.z = .1 * Math.sin(t * 2); w.r.tail.forEach((s, i) => s.rotation.y = .3 * Math.sin(t * 6 - i * .5)); },
    },
    {
      say: 'A tiny T-rex: cute, terrifying, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny T-rex?', options: ['Cute', 'Terrifying', 'Best pet ever'], answer: 'The real T-rex grew to about 12 metres long. Not teacup size.' },
      show: ['floor', 'wall', 'table', 'dino', 'mug'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [2.5, 4, 3.5], look: [0, 4.4, 0], fov: 42, to: { pos: [-2.5, 4, 3.5], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.r.neck.rotation.z = 0; pose(w, 0, 0, -.5, t, true); },
    },
  ],
};

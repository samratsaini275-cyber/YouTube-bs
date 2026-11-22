// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Gary-led (every fourth) + dinosaurs (184 combo, 081 1.7K).
// Hook: the premise as a question under 2 s; first frame shows Gary next to a speckled egg bigger than him, a crack running up it.

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
  w.ferns = group(); for (let i = 0; i < 12; i++) { const f = cone(.5, 2.4 + (i % 3) * .8, mat(i % 2 ? '#2E8B4A' : '#3FA35B'), [-12 + i * 2.2, 1.2, -6 - (i % 3) * 2], w.ferns, 6); f.rotation.z = .15 * Math.sin(i); }
  w.nest = group(); const n = k.torus(1.6, .45, mat('#8B6B43', { rough: 1 }), [0, .3, 0], w.nest); n.rotation.x = Math.PI / 2;
  w.egg = group(); const e = ball(1.2, mat('#F4EBD8', { rough: .6 }), [0, 1.5, 0], w.egg); e.scale.set(.85, 1.15, .85); for (let i = 0; i < 8; i++) ball(.12, mat('#9C8A6A'), [Math.cos(i * 2.3) * .8, 1 + (i % 4) * .4, Math.sin(i * 2.3) * .8 + .1], w.egg);
  w.crack = box(.05, 1.2, .05, mat('#3A2A1A'), [0, 1.8, 1], w.egg); w.crack.rotation.z = .3;
  w.shell = group(); for (let i = 0; i < 6; i++) { const s = ball(.4, mat('#F4EBD8'), [0, 0, 0], w.shell); s.scale.set(1, .4, .8); s.userData.i = i; }
  w.g = gary(k, k.scene, 1.6, '#FFC21F');
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.crumb = box(.25, .18, .25, mat('#D9A95B', { glow: .2 }), [0, 0, 0]);
  w.book = group(); box(.9, .08, .7, mat('#E2453C'), [0, 0, 0], w.book); box(.85, .1, .65, mat('#FFFFFF'), [0, .06, 0], w.book);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.4, .09, .06, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 16); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const baby = (w, x, z, ry, s, t, still = true) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); w.dino.scale.setScalar(s); stomp(w.r, t, 6, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); };

export default {
  id: '192',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY FINDS AN EGG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY FOUND', 'A DINO EGG?'],
  title: 'What would happen if Gary the ant found a dinosaur egg?',
  description: 'It hatches, and the baby thinks Gary is its parent. One crumb is not enough for dinner. Bedtime stories work. But then it grows up. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'dinosaurs', 'trex', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: dinosaurs hatched from eggs, as birds do; fossil dinosaur eggs and nests are known (general palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary found a dino egg?',
      show: ['ground', 'ferns', 'nest', 'egg', 'g'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [0, 5.5, 12], look: [-.3, 1.2, 0], fov: 44, to: { pos: [0, 5.3, 11.3], look: [-.3, 1.2, 0], fov: 42 } },
      update: (w, p, t) => { w.egg.visible = true; w.egg.position.set(.6, 0, 0); w.egg.rotation.z = .06 * Math.sin(t * 9); w.nest.position.set(.6, 0, 0); gy(w, -1.6, .05, 1.2, -.4, t); w.g.rotation.z = .1 * Math.sin(t * 3); },
    },
    {
      say: 'It hatches. The baby thinks Gary is mum.',
      show: ['ground', 'ferns', 'nest', 'g', 'dino', 'shell'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [0, 5.5, 12.5], look: [-.3, .9, 0], fov: 46, to: { pos: [0, 5.3, 11.7], look: [-.3, .9, 0], fov: 44 } },
      update: (w, p, t) => {
        w.nest.position.set(.6, 0, 0); baby(w, 1, 0, Math.PI - .4, .22, t); w.r.neck.rotation.z = -.2 + .1 * Math.sin(t * 4); w.r.jaw.rotation.z = -.3;
        w.shell.children.forEach(s => { const i = s.userData.i, a = i / 6 * Math.PI * 2; s.position.set(.6 + Math.cos(a) * 1.4, .2, Math.sin(a) * 1.2); s.rotation.set(i, i * 2, 0); });
        gy(w, -1.6, .05, 1.2, -.2, t); w.g.rotation.z = -.15;
      },
    },
    {
      say: 'Dinner? One crumb is not enough.',
      show: ['ground', 'ferns', 'g', 'dino', 'crumb'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [0, 5.5, 12.5], look: [-.3, .9, 0], fov: 46, to: { pos: [0, 5.3, 11.7], look: [-.3, .9, 0], fov: 44 } },
      update: (w, p, t) => {
        baby(w, 1.2, -.3, Math.PI - .3, .26, t); w.r.jaw.rotation.z = -.2 - .4 * Math.abs(Math.sin(t * 6)); w.r.neck.rotation.z = -.3;
        gy(w, -1.6, .05, 1, -.2, t, t < .8); const q = Math.min(1, t / .8); w.crumb.position.set(-1 + q * 1.6, .3 + Math.sin(q * Math.PI) * 1.3, 1 - q * .6); w.crumb.visible = t < 1;
      },
    },
    {
      say: 'Bedtime story? It works. Every time.',
      show: ['ground', 'ferns', 'nest', 'g', 'dino', 'book', 'zz'], sky: '#26355C', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [0, 5.5, 11.5], look: [-.2, .8, 0], fov: 46, to: { pos: [0, 5.3, 10.7], look: [-.2, .8, 0], fov: 44 } },
      update: (w, p, t) => {
        w.nest.position.set(.8, 0, -.2); baby(w, .8, -.2, Math.PI - .3, .22, t); w.r.body.rotation.z = -.35; w.r.neck.rotation.z = -.4; w.r.jaw.rotation.z = -.05;
        gy(w, -1.2, .05, 1.1, -.4, t); w.book.position.set(-.6, .55, 1.3); w.book.rotation.set(-.6, -.4, 0);
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.getWorldPosition(v); w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(v.x + .3 + q * .6, v.y + .4 + q * 1.4, v.z); z.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'But growing up? Uh oh.',
      show: ['ground', 'ferns', 'g', 'dino'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [3, 2.4, 14], look: [0, 4.5, 0], fov: 50, to: { pos: [4, 3, 22], look: [0, 7, 0], fov: 50 } },
      shake: (t) => .05,
      update: (w, p, t) => { const s = .26 + Math.min(1, t / 1.6) * .6; baby(w, 1.5, -2, Math.PI - .5, s, t); w.r.neck.rotation.z = -.4; gy(w, -1.2, .05, 2, -.3, t); w.g.rotation.z = .2; },
    },
    {
      say: 'Gary as a dino parent: cute, brave, or doomed? Comment below.',
      quiz: { q: 'Can Gary raise a T-rex?', options: ['Cute', 'Brave', 'Doomed'], answer: 'Real dinosaurs hatched from eggs, just like birds. Fossil nests have been found.' },
      show: ['ground', 'ferns', 'g', 'dino'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [3, 2.4, 11], look: [-.2, 2.4, 0], fov: 44, to: { pos: [-3, 2.4, 11], look: [-.2, 2.4, 0] } },
      update: (w, p, t) => { baby(w, 1.1, -.3, Math.PI - .4, .24, t); w.r.neck.rotation.z = -.2; gy(w, -1.4, .05, 1, -.3, t); },
    },
  ],
};

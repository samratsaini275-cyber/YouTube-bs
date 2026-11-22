// Narrative 11 finale: "What Would Happen If… (season 3, with Gary)". Combines the two strongest formats: Gary (846) and dinosaurs (081, 1.7K).
// Hook: the premise as a question under 2 s; first frame shows tiny Gary looking up at a huge T-rex's face bending down to him.

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
  w.ferns = group(); for (let i = 0; i < 12; i++) { const f = cone(.8, 3 + (i % 3), mat(i % 2 ? '#2E8B4A' : '#3FA35B'), [-24 + i * 4.2, 1.6, -14 - (i % 3) * 3], w.ferns, 6); f.rotation.z = .15 * Math.sin(i); }
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.g = gary(k, k.scene, 2.4, '#FFC21F');
  w.rings = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.3 + i * .2, .04, mat('#FFFFFF', { glow: .7 }), [0, 0, 0], w.rings); r.userData.i = i; r.castShadow = false; }
  w.rock = group(); cyl(1.1, 1.6, 7.5, mat('#9A8F80', { rough: 1 }), [0, 3.75, 0], w.rock, 10);
  w.crumb = box(.5, .35, .5, mat('#D9A95B', { glow: .2 }), [0, 0, 0]);
  w.leaf = group(); const lf = ball(1.4, mat('#3FA35B'), [0, .5, 0], w.leaf); lf.scale.set(1.4, .35, 1);
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.25, m, [-.16, 0, 0], h); ball(.25, m, [.16, 0, 0], h); const c = cone(.34, .5, m, [0, -.28, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const rx = (w, x, z, ry, t, still = true) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, still); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); };
const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '184',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY MEETS T-REX',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'MET A T-REX?'],
  title: 'What would happen if Gary the ant met a T-rex?',
  description: 'The T-rex roars. Gary roars back. They share one crumb. Gary wins every game of hide and seek. And now they are best friends. (Gary is made up. Season 3 finale.)',
  tags: ['whatif', 'garytheant', 'trex', 'dinosaurs', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: ants already existed in the Late Cretaceous, when Tyrannosaurus rex lived; ant fossils in amber predate T. rex (general palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary met a T-rex?',
      show: ['ground', 'ferns', 'dino', 'g', 'rock'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [2, 8.4, 24], look: [1, 11, 0], fov: 44, to: { pos: [1.8, 8.4, 22.5], look: [1, 11, 0], fov: 42 } },
      update: (w, p, t) => { w.rock.position.set(3.4, 0, 0); rx(w, -6.2, 0, 0, t); w.r.neck.rotation.z = -.35; gy(w, 3.4, 7.55, 0, Math.PI - .5, t); w.g.rotation.z = .1 * Math.sin(t * 2); },
    },
    {
      say: 'The T-rex roars? Gary roars back.',
      show: ['ground', 'ferns', 'dino', 'g', 'rock', 'rings'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [4, 8.4, 22], look: [1, 10.8, 0], fov: 46, to: { pos: [3.6, 8.4, 20.5], look: [1, 10.8, 0], fov: 44 } },
      shake: (t) => t < .9 ? .1 : .03,
      update: (w, p, t) => {
        w.rock.position.set(3.4, 0, 0); rx(w, -6.2, 0, 0, t); w.r.neck.rotation.z = -.35; w.r.jaw.rotation.z = t < .9 ? -.7 : -.15;
        gy(w, 3.4, 7.55, 0, Math.PI - .5, t); w.g.position.y = 7.55 + (t > .9 ? .3 * Math.abs(Math.sin(t * 10)) : 0);
        w.rings.visible = t > .9; w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(); w.g.localToWorld(v.set(.7, .5, 0));
        w.rings.children.forEach(r => { const i = r.userData.i, q = ((t - .9) * 1.5 + i / 3) % 1; r.position.set(v.x - q * 1.5, v.y + q * .4, v.z); r.scale.setScalar(.5 + q); r.rotation.set(0, Math.PI / 2, 0); });
      },
    },
    {
      say: 'Snack time? They share one crumb.',
      show: ['ground', 'ferns', 'dino', 'g', 'rock', 'crumb'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [3, 9, 20], look: [1.2, 10.3, 0], fov: 44, to: { pos: [2.8, 9, 18.5], look: [1.2, 10.3, 0], fov: 42 } },
      update: (w, p, t) => {
        w.rings.visible = false; w.rock.position.set(3.4, 0, 0); rx(w, -6.2, 0, 0, t); w.r.neck.rotation.z = -.4; w.r.jaw.rotation.z = -.2 - .15 * Math.abs(Math.sin(t * 4));
        gy(w, 3.9, 7.55, 0, Math.PI, t); w.crumb.position.set(2.7, 7.7, 0); w.crumb.scale.setScalar(1 - Math.min(.6, t * .25));
      },
    },
    {
      say: 'Hide and seek? Gary wins every time.',
      show: ['ground', 'ferns', 'dino', 'leaf'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 24,
      cam: { pos: [8, 6, 22], look: [0, 6, 0], fov: 50, to: { pos: [7.5, 6, 21], look: [0, 6, 0], fov: 48 } },
      update: (w, p, t) => { rx(w, -3, -2, .2 + .6 * Math.sin(t * 1.5), t); w.r.neck.rotation.z = -.3; w.r.neck.rotation.y = .4 * Math.sin(t * 2); w.leaf.position.set(4, 0, 3); w.leaf.rotation.y = .3; },
    },
    {
      say: 'Best friends? Absolutely.',
      show: ['ground', 'ferns', 'dino', 'g', 'hearts'], sky: '#F7C6D0', lightAt: [0, 6, 0], lightDist: 24,
      cam: { pos: [10, 9, 26], look: [1, 10.6, 0], fov: 46, to: { pos: [9.5, 9, 24.5], look: [1, 10.6, 0], fov: 44 } },
      update: (w, p, t) => {
        rx(w, -2, 0, -.45, t, false); w.dino.position.x = -2 + t * .5; w.dino.updateMatrixWorld(true);
        const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(.4, 1.05, 0)); gy(w, v.x, v.y, v.z, -.45, t); w.g.scale.setScalar(1.6);
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(v.x - 1 + i * .5, v.y + 1 + q * 3, v.z); h.scale.setScalar(.6 + q * .6); });
      },
    },
    {
      say: 'Gary and the T-rex: cute, epic, or chaotic? Comment below.',
      quiz: { q: 'Gary and the T-rex: best duo?', options: ['Cute', 'Epic', 'Chaotic'], answer: 'Fun fact: real ants were already around when T-rex lived!' },
      show: ['ground', 'ferns', 'dino', 'g'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 24,
      cam: { pos: [14, 8, 24], look: [0, 10, 0], fov: 46, to: { pos: [-10, 8, 26], look: [0, 10, 0] } },
      update: (w, p, t) => {
        w.g.scale.setScalar(1.6); rx(w, 0, 0, -.3, t); w.dino.updateMatrixWorld(true);
        const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(.4, 1.05, 0)); gy(w, v.x, v.y, v.z, -.3, t);
      },
    },
  ],
};

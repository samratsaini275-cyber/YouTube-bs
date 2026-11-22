// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Gary-led (every fourth) + dinosaurs (081 1.7K).
// Hook: the premise as a question under 2 s; first frame shows Gary in a green T-rex costume with back spikes and a snout.

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
  w.ferns = group(); for (let i = 0; i < 14; i++) { const f = cone(.5, 2.4 + (i % 3) * .8, mat(i % 2 ? '#2E8B4A' : '#3FA35B'), [-14 + i * 2.2, 1.2, -6 - (i % 3) * 2], w.ferns, 6); f.rotation.z = .15 * Math.sin(i); }
  w.g = gary(k, k.scene, 2.2, null);
  const gm = mat('#4FA04A', { rough: .6 });
  w.suit = group([0, 0, 0], w.g);
  for (let i = 0; i < 5; i++) cone(.08, .2, mat('#2E7A2A'), [-.5 + i * .22, .55, 0], w.suit, 4);
  w.snout = group([.42, .4, 0], w.suit); box(.35, .2, .26, gm, [.15, 0, 0], w.snout); for (let i = 0; i < 4; i++) cone(.02, .05, mat('#FFFFFF'), [.05 + i * .07, -.11, .1], w.snout, 4).rotation.x = Math.PI;
  const hood = k.mesh(new k.THREE.SphereGeometry(.26, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), gm, [.36, .48, 0], w.suit);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.ants = group(); for (let i = 0; i < 4; i++) { const a = gary(k, w.ants, 1.2, ['#E2453C', '#3B82F6', '#22C55E', '#8B5CF6'][i]); a.userData.i = i; }
  w.rings = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.15 + i * .1, .02, mat('#FFFFFF', { glow: .7 }), [0, 0, 0], w.rings); r.rotation.set(0, Math.PI / 2, 0); r.userData.i = i; r.castShadow = false; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.25, m, [-.16, 0, 0], h); ball(.25, m, [.16, 0, 0], h); const c = cone(.34, .5, m, [0, -.28, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 16); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const roar = (w, t, on) => { w.rings.visible = on; if (!on) return; w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(); w.snout.localToWorld(v.set(.35, 0, 0)); w.snout.rotation.z = .2;
  w.rings.children.forEach(r => { const i = r.userData.i, q = (t * 1.5 + i / 3) % 1; r.position.set(v.x + q * .8, v.y, v.z + q * .3); r.scale.setScalar(.6 + q); r.rotation.set(0, Math.PI / 2 + w.g.rotation.y, 0); }); };

export default {
  id: '200',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DINO GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'BECAME A DINOSAUR?'],
  title: 'What would happen if Gary the ant became a dinosaur?',
  description: 'His mighty roar is a squeak. The other ants are scared for about a second. A real T-rex thinks he is family. And tiny arms? Gary has six legs. (Gary is made up. Episode 200.)',
  tags: ['whatif', 'garytheant', 'dinosaurs', 'trex', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up. Quiz answer: insects have six legs (general biology).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary became a dinosaur?',
      show: ['ground', 'ferns', 'g'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [1.2, 5, 9.5], look: [0, 1.1, 0], fov: 44, to: { pos: [1.1, 4.8, 8.8], look: [0, 1.1, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, 0, .05, 1, -.6, t); w.g.rotation.z = .08 * Math.sin(t * 3); w.rings.visible = false; },
    },
    {
      say: 'His mighty roar? A tiny squeak.',
      show: ['ground', 'ferns', 'g', 'rings'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [1.2, 4.6, 8.5], look: [.3, 1.1, 0], fov: 42, to: { pos: [1.1, 4.4, 7.8], look: [.3, 1.1, 0], fov: 40 } },
      update: (w, p, t) => { gy(w, 0, .05, 1, -.5, t); w.g.rotation.z = .15; roar(w, t, t > .5); },
    },
    {
      say: 'The other ants? Scared. For one second.',
      show: ['ground', 'ferns', 'g', 'ants'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [1, 4, 11], look: [0, 1.3, 0], fov: 48, to: { pos: [1, 4, 10.2], look: [0, 1.3, 0], fov: 46 } },
      update: (w, p, t) => {
        w.rings.visible = false; w.snout.rotation.z = 0; gy(w, -1.6, .05, 0, 0, t); const scared = t < .9;
        w.ants.children.forEach(a => { const i = a.userData.i, run = scared ? t * 3 : 2.7 - (t - .9) * 3; a.position.set(1 + Math.max(0, run) + i * .3, .2 * Math.abs(Math.sin(t * 9 + i)) * (scared ? 1 : 0), -1 + i * .8); a.rotation.set(0, scared ? 0 : Math.PI, 0); if (scared) scurry(a, t, 20); a.rotation.z = scared ? 0 : .3 * Math.sin(t * 8 + i); });
      },
    },
    {
      say: 'A real T-rex? Thinks he is family.',
      show: ['ground', 'ferns', 'g', 'dino', 'hearts'], sky: '#F7C6D0', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [6, 5, 22], look: [-.5, 5.6, 0], fov: 50, to: { pos: [5.5, 5, 20.5], look: [-.5, 5.6, 0], fov: 48 } },
      update: (w, p, t) => {
        gy(w, 2.2, .05, 3, Math.PI - .4, t); w.dino.position.set(-5, 0, -1); w.dino.rotation.set(0, .25, 0); stomp(w.r, t, 4, true); w.r.body.rotation.z = -.5; w.r.neck.rotation.z = -1;
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(-1 + i * .7, 5 + q * 4, 1); h.scale.setScalar(.6 + q * .6); });
      },
    },
    {
      say: 'But tiny arms? Gary has six legs.',
      show: ['ground', 'ferns', 'g'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [1.2, 5.5, 9.5], look: [0, .3, 0], fov: 44, to: { pos: [1.1, 5.3, 8.8], look: [0, .3, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, 0, .05, .8, -.5, t, true); w.g.position.y = .05 + .1 * Math.abs(Math.sin(t * 8)); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Dino Gary: cute, fierce, or ridiculous? Comment below.',
      quiz: { q: 'Is Gary a real dinosaur now?', options: ['Cute', 'Fierce', 'Ridiculous'], answer: 'Gary is still an ant. Insects have six legs. T-rex had two (plus tiny arms).' },
      show: ['ground', 'ferns', 'g'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [3, 3.6, 8], look: [0, 1.6, 0], fov: 44, to: { pos: [-3, 3.6, 8], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, .05, 1, -Math.PI / 2 + .9, t); },
    },
  ],
};

// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

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
  w.floor = k.ground('#1E1A2E', 0);
  w.stage = group(); box(40, 2.4, 10, mat('#2A2340'), [0, 1.2, -12], w.stage); box(60, 30, .4, mat('#120E1E'), [0, 15, -18], w.stage); for (let i = 0; i < 6; i++) { const l = cone(1, 14, mat(['#FF4FD8', '#3BE8FF', '#FFC21F'][i % 3], { glow: .6, opacity: .25 }), [-15 + i * 6, 9, -10], w.stage, 16); l.castShadow = false; l.rotation.x = Math.PI; l.userData.i = i; }
  w.speaker = group(); box(6, 9, 4, mat('#111111'), [0, 4.5, 0], w.speaker); for (const [y, r] of [[6.5, 2], [2.6, 1.4]]) { const c = cyl(r, r, .2, mat('#333333'), [0, y, 2.05], w.speaker, 24); c.rotation.x = Math.PI / 2; const d = cyl(r * .4, r * .4, .3, mat('#555555'), [0, y, 2.1], w.speaker, 16); d.rotation.x = Math.PI / 2; }
  w.amp = group(); box(2.2, 2, 2, mat('#2B2B2B'), [0, 1, 0], w.amp); box(1.8, .3, .1, mat('#FFC21F', { glow: .4 }), [0, 1.6, 1.01], w.amp);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(1 + i, .06, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.waves); r.rotation.set(0, 0, 0); r.userData.i = i; r.castShadow = false; }
  w.plug = group(); for (const x of [-.25, .25]) box(.15, .6, .15, mat('#FFC21F'), [x, 0, 0], w.plug);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const HALL = ['floor', 'stage'];
const beams = (w, t) => w.stage.children.forEach(c => { if (c.userData.i !== undefined) c.rotation.z = .4 * Math.sin(t * 1.5 + c.userData.i); });
const pulse = (w, x, y, z, t, on = true) => { w.waves.visible = on; w.waves.position.set(x, y, z); w.waves.children.forEach(r => { const q = (t * 1.6 + r.userData.i / 4) % 1; r.scale.setScalar(.5 + q * 3); r.material.opacity = 1 - q; r.material.transparent = true; }); };

export default {
  id: '243',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CONCERT GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO A CONCERT.'],
  title: 'Gary the ant went to a concert',
  description: 'He got the best spot in the house: right in front of the speaker. Then the band started. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'concert', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: ants have no ears; many species sense vibration through their legs instead (Hölldobler & Wilson, "The Ants", 1990; vibration sensing via subgenual organs).'],
  setup,
  scenes: [
    { say: 'Gary went to a concert.', show: [...HALL, 'g'], sky: '#120E1E', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { beams(w, t); w.waves.visible = false; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'He got the best spot. Right by the speaker.', show: [...HALL, 'g', 'speaker', 'amp'], sky: '#120E1E', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [4, 3, 12], look: [-1, 3, 0], fov: 50, to: { pos: [3.6, 3, 11], look: [-1, 3, 0], fov: 48 } },
      update: (w, p, t) => { beams(w, t); w.waves.visible = false; w.speaker.position.set(-3, 0, -2); w.amp.position.set(-2.5, 0, 1.6); gy(w, -2.5, 2, 1.6, -.3, t); } },
    { say: 'Then the band started.', label: '*BOOM*', show: [...HALL, 'g', 'speaker', 'waves', 'amp'], sky: '#2A1240', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [4, 3, 12], look: [-1, 3, 0], fov: 50, to: { pos: [4.4, 3.2, 12.4], look: [-1, 3, 0], fov: 52 }, }, shake: l => l > .3 ? .25 : 0,
      update: (w, p, t) => { beams(w, t * 3); w.speaker.position.set(-3, 0, -2); w.speaker.scale.set(1 + .03 * Math.sin(t * 40), 1, 1); pulse(w, -3, 4.6, .2, t, t > .3); w.amp.position.set(-2.5, 0, 1.6); gy(w, -2.5, 2, 1.6, -.3, t); } },
    { say: 'Gary flew to the back row.', show: [...HALL, 'g', 'speaker', 'waves', 'amp'], sky: '#2A1240', lightAt: [0, 6, 3], lightDist: 30,
      cam: { pos: [8, 5, 18], look: [0, 3, 6], fov: 56, to: { pos: [8, 5, 22], look: [0, 3, 12], fov: 56 } },
      update: (w, p, t) => { beams(w, t * 3); w.speaker.position.set(-3, 0, -2); pulse(w, -3, 4.6, .2, t); const z = 1.6 + p * 16; w.amp.position.set(-2.5, 0, 1.6); gy(w, -2.5 + p * 3, 2 + Math.sin(p * Math.PI) * 6 - p * 2, z, -.3, t); w.g.rotation.x = t * 8; w.g.rotation.order = 'YXZ'; } },
    { say: 'Best seat in the house. He just could not hear anything.', label: 'BACK ROW', show: [...HALL, 'g', 'plug'], sky: '#2A1240', lightAt: [0, 6, 20], lightDist: 20,
      cam: { pos: [1.6, 1.4, 24.5], look: [.5, 1, 18], fov: 46, to: { pos: [1.5, 1.4, 23.9], look: [.5, 1, 18], fov: 44 } },
      update: (w, p, t) => { beams(w, t); w.waves.visible = false; gy(w, .5, 0, 18, -1.1, t); w.g.rotation.x = 0; w.g.rotation.z = .25 * Math.sin(t * 2); w.plug.position.set(.2, 1.6, 18.3); w.plug.rotation.z = .3; } },
    { say: 'How do ants hear music: with their ears, their legs, or their nose? Comment below.',
      quiz: { q: 'How do ants "hear" music?', options: ['Their ears', 'Their legs', 'Their nose'], answer: 'Answer: their legs. Ants feel vibrations through them.' },
      show: [...HALL, 'g', 'speaker', 'waves', 'amp'], sky: '#2A1240', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [1.5, 3.4, 9], look: [-2.5, 3.6, 1.6], fov: 50, to: { pos: [-4.5, 3.4, 9], look: [-2.5, 3.6, 1.6] } },
      update: (w, p, t) => { beams(w, t * 2); w.speaker.position.set(-3, 0, -2); pulse(w, -3, 4.6, .2, t); w.amp.position.set(-2.5, 0, 1.6); gy(w, -2.5, 2, 1.6, -.3, t); w.g.rotation.x = 0; w.g.rotation.z = .3 * Math.sin(t * 12); } },
  ],
};

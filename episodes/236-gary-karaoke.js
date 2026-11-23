// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a stage under a spotlight.

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
  w.stage = k.ground('#5A2A3A', 0);
  w.back = box(60, 30, .5, mat('#1E1430'), [0, 15, -6]); w.back.castShadow = false;
  w.curtain = group(); for (const x of [-4, 4]) for (let i = 0; i < 5; i++) { const c = cyl(.4, .4, 10, mat('#B3262E'), [x + (x < 0 ? -i * .7 : i * .7), 5, -5], w.curtain, 10); }
  w.spot = cyl(1.8, 1.8, .03, mat('#FFF4C2', { glow: .7 }), [0, .02, 0], k.scene, 28); w.spot.castShadow = false;
  w.beam = cyl(.2, 1.8, 10, mat('#FFF4C2', { glow: .5 }), [0, 5, 0], k.scene, 24); w.beam.material.transparent = true; w.beam.material.opacity = .14; w.beam.castShadow = false;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.mic = group(); cyl(.06, .06, 6, mat('#333333', { metal: .6 }), [0, 3, 0], w.mic, 8); cyl(.8, .8, .1, mat('#333333', { metal: .6 }), [0, .05, 0], w.mic, 18); ball(.45, mat('#888888', { metal: .7, rough: .3 }), [0, 6.3, 0], w.mic);
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = group([0, 0, 0], w.notes); const m = mat('#FFD21F', { glow: .6 }); ball(.05, m, [0, 0, 0], n); box(.015, .16, .015, m, [.045, .08, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.crowd = group(); for (let i = 0; i < 6; i++) { const h = ball(.9, mat('#2A2A3A'), [-5 + i * 2, 1.4, 5], w.crowd); }
  w.lady = group(); const sh = ball(.35, mat('#E2453C', { rough: .3 }), [0, .25, 0], w.lady); sh.scale.y = .6; ball(.18, mat('#111111'), [.32, .2, 0], w.lady); for (let i = 0; i < 4; i++) { const d = ball(.06, mat('#111111'), [-.12 + (i % 2) * .2, .45, -.12 + Math.floor(i / 2) * .24], w.lady); d.castShadow = false; } for (const z of [-.08, .08]) ball(.04, mat('#FFFFFF'), [.45, .25, z], w.lady);
  w.hearts = group(); for (let i = 0; i < 3; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.08, m, [-.05, 0, 0], h); ball(.08, m, [.05, 0, 0], h); const c = cone(.11, .15, m, [0, -.08, 0], h, 10); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const sing = (w, t) => w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .9 + i / 3) % 1; n.position.set(w.g.position.x + .6 + q * .4, w.g.position.y + .7 + q * .6, w.g.position.z + .1); n.scale.setScalar(Math.sin(q * Math.PI)); });

export default {
  id: '236',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'KARAOKE GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'SANG KARAOKE.'],
  title: 'Gary the ant sang karaoke',
  description: 'The microphone is a tower. Nobody can hear a thing. And yet: a standing ovation, from one very kind ladybug. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'karaoke', 'singing', 'funny', 'shorts'],
  sources: [
    'Quiz fact: many ants make faint sounds by stridulation, rubbing one body part against another (Encyclopaedia Britannica, "stridulation").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant sang karaoke.',
      show: ['stage', 'back', 'curtain', 'spot', 'beam', 'g'], sky: '#1E1430', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, .55, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, .55, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .12 * Math.sin(t * 7); sing(w, t); },
    },
    {
      say: 'The microphone is a tower.',
      show: ['stage', 'back', 'curtain', 'spot', 'beam', 'g', 'mic'], sky: '#1E1430', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1, .9, 7], look: [0, 3, 0], fov: 60, to: { pos: [1, .9, 6.4], look: [0, 3.6, 0], fov: 60 } },
      update: (w, p, t) => { w.mic.position.set(-.6, 0, -.3); gy(w, .4, 0, .3, -1.9, t); w.g.rotation.z = .3; },
    },
    {
      say: 'Nobody could hear a thing.',
      show: ['stage', 'back', 'curtain', 'spot', 'beam', 'g', 'mic', 'crowd', 'notes'], sky: '#1E1430', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [0, 6.5, 12], look: [0, .3, 0], fov: 46, to: { pos: [0, 6.3, 11.2], look: [0, .3, 0], fov: 44 } },
      update: (w, p, t) => { w.mic.position.set(-.6, 0, -.3); gy(w, .4, 0, .3, -1.6, t); w.g.rotation.z = .12 * Math.sin(t * 7); sing(w, t); w.crowd.children.forEach((h, i) => h.rotation.z = .2 * Math.sin(t + i)); },
    },
    {
      say: 'Still, a standing ovation. From one ladybug.',
      show: ['stage', 'back', 'curtain', 'spot', 'beam', 'g', 'lady', 'hearts'], sky: '#2A1E40', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.2, 1.3, 5.4], look: [-.1, .5, 0], fov: 46, to: { pos: [1.1, 1.3, 4.9], look: [-.1, .5, 0], fov: 44 } },
      update: (w, p, t) => {
        gy(w, .7, 0, -.3, -2.2, t); w.g.rotation.z = -.15; w.lady.position.set(-.7, .2 * Math.abs(Math.sin(t * 6)), .5); w.lady.rotation.y = -.6;
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .7 + i / 3) % 1; h.position.set(-.7 + (i - 1) * .25, .7 + q * .9, .5); h.scale.setScalar(Math.sin(q * Math.PI) * 1.4); });
      },
    },
    {
      say: 'Gary\'s song: Six Legs, Crumb Love, or Tiny Voice? Comment below.',
      quiz: { q: 'What should Gary sing next?', options: ['Six Legs', 'Crumb Love', 'Tiny Voice'], answer: 'Fun fact: some ants make tiny sounds by rubbing parts of their body together.' },
      show: ['stage', 'back', 'curtain', 'spot', 'beam', 'g'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.6, 5], look: [0, .9, 0], fov: 46, to: { pos: [-2, 1.6, 5.5], look: [0, .9, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); },
    },
  ],
};
